-- Phase 4 production hardening: distributed limits, verifiable chains,
-- evidence quarantine, and separation-of-duties application review.
create extension if not exists pgcrypto with schema extensions;

create table private.rate_limit_policies (
  action text primary key,
  request_limit integer not null check (request_limit between 1 and 1000),
  window_seconds integer not null check (window_seconds between 1 and 86400)
);
revoke all on private.rate_limit_policies from public, anon, authenticated;

insert into private.rate_limit_policies(action,request_limit,window_seconds) values
  ('process.create',10,60),
  ('vote.citizen',10,60),
  ('vote.technical',10,60),
  ('application.create',3,3600),
  ('report.create',10,300),
  ('report.close',5,300),
  ('evidence.upload',10,3600),
  ('evidence.download',30,300),
  ('process.verify',30,300),
  ('application.review',20,300)
on conflict (action) do update set
  request_limit=excluded.request_limit,window_seconds=excluded.window_seconds;

create table private.rate_limit_buckets (
  id bigint generated always as identity primary key,
  actor_user_id uuid not null references auth.users(id) on delete cascade,
  action text not null references private.rate_limit_policies(action),
  resource_id uuid,
  window_started_at timestamptz not null,
  consumed integer not null check (consumed > 0)
);
create unique index rate_limit_buckets_resource_idx
  on private.rate_limit_buckets(actor_user_id,action,resource_id,window_started_at)
  where resource_id is not null;
create unique index rate_limit_buckets_without_resource_idx
  on private.rate_limit_buckets(actor_user_id,action,window_started_at)
  where resource_id is null;
revoke all on private.rate_limit_buckets from public, anon, authenticated;

create or replace function public.consume_rate_limit(
  p_action text,p_resource_id uuid default null,p_request_id uuid default null
)
returns table(allowed boolean,retry_after integer)
language plpgsql
security definer
set search_path=pg_catalog,public,private
as $$
declare
  v_user uuid:=auth.uid(); v_policy private.rate_limit_policies%rowtype;
  v_window timestamptz; v_consumed integer;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select * into v_policy from private.rate_limit_policies where action=p_action;
  if not found then raise exception 'RATE_LIMIT_POLICY_REQUIRED' using errcode='42501'; end if;
  v_window:=to_timestamp(floor(extract(epoch from clock_timestamp())/v_policy.window_seconds)*v_policy.window_seconds);
  if p_resource_id is null then
    insert into private.rate_limit_buckets(actor_user_id,action,resource_id,window_started_at,consumed)
    values(v_user,p_action,null,v_window,1)
    on conflict(actor_user_id,action,window_started_at) where resource_id is null
    do update set consumed=private.rate_limit_buckets.consumed+1 returning consumed into v_consumed;
  else
    insert into private.rate_limit_buckets(actor_user_id,action,resource_id,window_started_at,consumed)
    values(v_user,p_action,p_resource_id,v_window,1)
    on conflict(actor_user_id,action,resource_id,window_started_at) where resource_id is not null
    do update set consumed=private.rate_limit_buckets.consumed+1 returning consumed into v_consumed;
  end if;
  allowed:=v_consumed<=v_policy.request_limit;
  retry_after:=greatest(1,ceil(extract(epoch from v_window+make_interval(secs=>v_policy.window_seconds)-clock_timestamp()))::integer);
  if not allowed then
    perform private.write_security_audit(v_user,'rate_limit.'||p_action,'rate_limit',p_resource_id,'denied','RATE_LIMITED',p_request_id);
  end if;
  return next;
end;
$$;
revoke all on function public.consume_rate_limit(text,uuid,uuid) from public,anon,authenticated;
grant execute on function public.consume_rate_limit(text,uuid,uuid) to authenticated;

create or replace function public.record_security_rejection(
  p_actor_user_id uuid,p_action text,p_resource_type text,p_resource_id uuid,p_reason_code text,p_request_id uuid
) returns void language plpgsql security definer set search_path=pg_catalog,public,private as $$
begin
  perform private.write_security_audit(p_actor_user_id,left(p_action,120),left(p_resource_type,80),p_resource_id,
    'denied',left(p_reason_code,80),p_request_id);
end $$;
revoke all on function public.record_security_rejection(uuid,text,text,uuid,text,uuid) from public,anon,authenticated;
grant execute on function public.record_security_rejection(uuid,text,text,uuid,text,uuid) to service_role;

alter table public.civic_processes add column chain_event_count bigint not null default 0 check(chain_event_count>=0);
alter table public.civic_processes add column chain_head_hash text check(chain_head_hash is null or chain_head_hash~'^[0-9a-f]{64}$');
alter table public.process_events add column event_sequence bigint;
alter table public.process_events add column previous_event_hash text;
alter table public.process_events add column event_hash text;

create or replace function private.process_event_digest(
  p_process uuid,p_sequence bigint,p_previous text,p_actor uuid,p_type text,p_payload jsonb,p_created timestamptz
) returns text language sql immutable set search_path=pg_catalog,public,private as $$
  select encode(extensions.digest(convert_to(concat_ws('|',p_process::text,p_sequence::text,coalesce(p_previous,''),
    coalesce(p_actor::text,''),p_type,p_payload::text,to_char(p_created at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.US"Z"')),'UTF8'),'sha256'),'hex');
$$;
revoke all on function private.process_event_digest(uuid,bigint,text,uuid,text,jsonb,timestamptz) from public,anon,authenticated;

do $$
declare p record; e record; v_seq bigint; v_prev text; v_hash text;
begin
  for p in select id from public.civic_processes order by id loop
    v_seq:=0; v_prev:=null;
    for e in select * from public.process_events where process_id=p.id order by created_at,id loop
      v_seq:=v_seq+1;
      v_hash:=private.process_event_digest(e.process_id,v_seq,v_prev,e.actor_user_id,e.event_type,e.payload,e.created_at);
      update public.process_events set event_sequence=v_seq,previous_event_hash=v_prev,event_hash=v_hash where id=e.id;
      v_prev:=v_hash;
    end loop;
    update public.civic_processes set chain_event_count=v_seq,chain_head_hash=v_prev where id=p.id;
  end loop;
end $$;
alter table public.process_events alter column event_sequence set not null;
alter table public.process_events alter column event_hash set not null;
alter table public.process_events add constraint process_events_sequence_positive check(event_sequence>0);
alter table public.process_events add constraint process_events_previous_hash_format check(previous_event_hash is null or previous_event_hash~'^[0-9a-f]{64}$');
alter table public.process_events add constraint process_events_hash_format check(event_hash~'^[0-9a-f]{64}$');
create unique index process_events_sequence_idx on public.process_events(process_id,event_sequence);

create or replace function private.seal_process_event() returns trigger
language plpgsql security definer set search_path=pg_catalog,public,private as $$
declare v_count bigint; v_head text;
begin
  select chain_event_count,chain_head_hash into v_count,v_head from public.civic_processes where id=new.process_id for update;
  if not found then raise exception 'PROCESS_NOT_FOUND' using errcode='P0002'; end if;
  new.event_sequence:=v_count+1; new.previous_event_hash:=v_head; new.created_at:=coalesce(new.created_at,clock_timestamp());
  new.event_hash:=private.process_event_digest(new.process_id,new.event_sequence,new.previous_event_hash,new.actor_user_id,new.event_type,new.payload,new.created_at);
  return new;
end $$;
revoke all on function private.seal_process_event() from public,anon,authenticated;
create trigger seal_process_event before insert on public.process_events for each row execute function private.seal_process_event();

create or replace function private.advance_process_chain() returns trigger
language plpgsql security definer set search_path=pg_catalog,public,private as $$
begin
  update public.civic_processes set chain_event_count=new.event_sequence,chain_head_hash=new.event_hash where id=new.process_id;
  return null;
end $$;
revoke all on function private.advance_process_chain() from public,anon,authenticated;
create trigger advance_process_chain after insert on public.process_events for each row execute function private.advance_process_chain();

create or replace function public.verify_process_chain(p_process_id uuid,p_request_id uuid default null)
returns text language plpgsql security definer set search_path=pg_catalog,public,private as $$
declare v_user uuid:=auth.uid(); v_process public.civic_processes%rowtype; e record;
  v_seq bigint:=0; v_prev text:=null; v_expected text; v_result text:='valid';
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select * into v_process from public.civic_processes where id=p_process_id;
  if not found or (v_process.owner_user_id<>v_user and not private.has_platform_role(array['platform_auditor','platform_admin'])) then
    raise exception 'PROCESS_NOT_FOUND' using errcode='P0002';
  end if;
  for e in select * from public.process_events where process_id=p_process_id order by event_sequence loop
    v_seq:=v_seq+1;
    v_expected:=private.process_event_digest(e.process_id,e.event_sequence,e.previous_event_hash,e.actor_user_id,e.event_type,e.payload,e.created_at);
    if e.event_sequence<>v_seq or e.previous_event_hash is distinct from v_prev or e.event_hash<>v_expected then v_result:='broken'; exit; end if;
    v_prev:=e.event_hash;
  end loop;
  if v_result='valid' and (v_seq<>v_process.chain_event_count or v_prev is distinct from v_process.chain_head_hash) then v_result:='broken'; end if;
  if v_seq=0 and v_process.chain_event_count=0 then v_result:='not_verifiable'; end if;
  perform private.write_security_audit(v_user,'process.verify','civic_process',p_process_id,'allowed',upper(v_result),p_request_id);
  return v_result;
end $$;
revoke all on function public.verify_process_chain(uuid,uuid) from public,anon,authenticated;
grant execute on function public.verify_process_chain(uuid,uuid) to authenticated;

-- Browsers cannot upload directly; the server-only client is the sole Storage writer.
drop policy if exists "evidence_insert_pre_authorized" on storage.objects;
drop policy if exists "evidence_select_owner" on storage.objects;
update storage.buckets set public=false,file_size_limit=10485760,
  allowed_mime_types=array['image/jpeg','image/png','application/pdf'] where id='evidence';
alter table public.evidence_pointers drop constraint if exists evidence_pointers_mime_type_check;
alter table public.evidence_pointers add constraint evidence_pointers_mime_type_check check(mime_type in('image/jpeg','image/png','application/pdf'));
alter table public.evidence_pointers drop constraint if exists evidence_pointers_size_bytes_check;
alter table public.evidence_pointers add constraint evidence_pointers_size_bytes_check check(size_bytes>0 and size_bytes<=10485760);
alter table public.evidence_pointers drop constraint if exists evidence_pointers_review_status_check;
alter table public.evidence_pointers add constraint evidence_pointers_review_status_check check(review_status in('pending','pending_scan','accepted','rejected'));

create or replace function public.prepare_evidence_upload(
  p_process_id uuid,p_sha256 text,p_size_bytes bigint,p_mime_type text,p_request_id uuid default null
) returns table(evidence_id uuid,object_name text)
language plpgsql security definer set search_path=pg_catalog,public,private as $$
declare v_user uuid:=auth.uid(); v_id uuid:=gen_random_uuid();
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  perform 1 from public.civic_processes where id=p_process_id and owner_user_id=v_user for share;
  if not found then raise exception 'PROCESS_NOT_FOUND' using errcode='P0002'; end if;
  if p_sha256!~'^[0-9a-f]{64}$' or p_size_bytes not between 1 and 10485760 or p_mime_type not in('image/jpeg','image/png','application/pdf') then
    raise exception 'INVALID_EVIDENCE_METADATA' using errcode='22023';
  end if;
  insert into public.evidence_pointers(id,owner_user_id,process_id,storage_path,sha256,size_bytes,mime_type,review_status)
  values(v_id,v_user,p_process_id,v_id::text,p_sha256,p_size_bytes,p_mime_type,'pending');
  perform private.write_security_audit(v_user,'evidence.prepare','evidence',v_id,'allowed','UPLOAD_PREPARED',p_request_id,
    jsonb_build_object('process_id',p_process_id,'size_bytes',p_size_bytes,'mime_type',p_mime_type));
  evidence_id:=v_id; object_name:=v_id::text; return next;
end $$;
revoke all on function public.prepare_evidence_upload(uuid,text,bigint,text,uuid) from public,anon,authenticated;
grant execute on function public.prepare_evidence_upload(uuid,text,bigint,text,uuid) to authenticated;

create or replace function public.confirm_evidence_upload(p_evidence_id uuid,p_owner_user_id uuid,p_request_id uuid default null)
returns void language plpgsql security definer set search_path=pg_catalog,public,private as $$
declare v_evidence public.evidence_pointers%rowtype;
begin
  select * into v_evidence from public.evidence_pointers where id=p_evidence_id and owner_user_id=p_owner_user_id and review_status='pending' for update;
  if not found then raise exception 'EVIDENCE_NOT_FOUND' using errcode='P0002'; end if;
  if not exists(select 1 from storage.objects where bucket_id='evidence' and name=v_evidence.storage_path) then
    raise exception 'EVIDENCE_OBJECT_MISSING' using errcode='55000';
  end if;
  update public.evidence_pointers set review_status='pending_scan' where id=p_evidence_id;
  perform private.write_security_audit(p_owner_user_id,'evidence.confirm','evidence',p_evidence_id,'allowed','PENDING_SCAN',p_request_id);
end $$;
revoke all on function public.confirm_evidence_upload(uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.confirm_evidence_upload(uuid,uuid,uuid) to service_role;

create or replace function public.reject_evidence_upload(p_evidence_id uuid,p_owner_user_id uuid,p_request_id uuid default null)
returns void language plpgsql security definer set search_path=pg_catalog,public,private as $$
begin
  update public.evidence_pointers set review_status='rejected'
  where id=p_evidence_id and owner_user_id=p_owner_user_id and review_status in('pending','pending_scan');
  if found then
    perform private.write_security_audit(p_owner_user_id,'evidence.reject','evidence',p_evidence_id,'error','UPLOAD_ROLLBACK',p_request_id);
  end if;
end $$;
revoke all on function public.reject_evidence_upload(uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.reject_evidence_upload(uuid,uuid,uuid) to service_role;

create or replace function public.authorize_evidence_download(
  p_evidence_id uuid,p_process_id uuid,p_request_id uuid default null
) returns text language plpgsql security definer set search_path=pg_catalog,public,private as $$
declare v_user uuid:=auth.uid(); v_path text;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select storage_path into v_path from public.evidence_pointers
  where id=p_evidence_id and process_id=p_process_id and owner_user_id=v_user and review_status='accepted';
  if not found then raise exception 'EVIDENCE_NOT_READY' using errcode='P0002'; end if;
  perform private.write_security_audit(v_user,'evidence.download','evidence',p_evidence_id,'allowed','SIGNED_URL_ISSUED',p_request_id);
  return v_path;
end $$;
revoke all on function public.authorize_evidence_download(uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.authorize_evidence_download(uuid,uuid,uuid) to authenticated;

alter table public.committee_applications add column if not exists state_version bigint not null default 1;
alter table public.committee_applications add column if not exists reviewed_by uuid references auth.users(id) on delete restrict;
alter table public.committee_applications add column if not exists reviewed_at timestamptz;
alter table public.committee_applications add column if not exists review_idempotency_key uuid;
create unique index committee_application_review_idempotency_idx on public.committee_applications(reviewed_by,review_idempotency_key) where review_idempotency_key is not null;

create or replace function public.review_committee_application(
  p_application_id uuid,p_action text,p_expected_version bigint,p_idempotency_key uuid,p_request_id uuid default null
) returns table(review_status text,state_version bigint)
language plpgsql security definer set search_path=pg_catalog,public,private as $$
declare v_user uuid:=auth.uid(); v_app public.committee_applications%rowtype; v_target text;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select * into v_app from public.committee_applications where id=p_application_id for update;
  if not found then raise exception 'APPLICATION_NOT_FOUND' using errcode='P0002'; end if;
  if not private.has_committee_membership(v_app.module_id,array['reviewer','admin']) then raise exception 'REVIEWER_REQUIRED' using errcode='42501'; end if;
  if coalesce(v_app.owner_user_id,v_app.user_id)=v_user then raise exception 'SELF_REVIEW_FORBIDDEN' using errcode='42501'; end if;
  if v_app.reviewed_by=v_user and v_app.review_idempotency_key=p_idempotency_key then
    return query select v_app.review_status,v_app.state_version; return;
  end if;
  if v_app.state_version<>p_expected_version then raise exception 'VERSION_CONFLICT' using errcode='40001'; end if;
  v_target:=case p_action when 'request_document_review' then 'Revisión documental' when 'request_community_observation' then 'Observación comunitaria'
    when 'qualify' then 'Apta' when 'integrate' then 'Integrada' when 'waitlist' then 'Lista de espera'
    when 'suspend' then 'Suspendida' when 'reject' then 'Rechazada' else null end;
  if v_target is null then raise exception 'INVALID_REVIEW_ACTION' using errcode='22023'; end if;
  if not ((v_app.review_status in('Revisión ética','Revisión ética avanzada','Revisión documental','Observación comunitaria') and v_target in('Revisión documental','Observación comunitaria','Apta','Rechazada'))
    or (v_app.review_status='Apta' and v_target in('Integrada','Lista de espera','Rechazada'))
    or (v_app.review_status in('Integrada','Lista de espera') and v_target='Suspendida')
    or (v_app.review_status='Suspendida' and v_target in('Integrada','Rechazada'))) then
    raise exception 'INVALID_STATE_TRANSITION' using errcode='22023';
  end if;
  update public.committee_applications as app
    set review_status=v_target,state_version=app.state_version+1,reviewed_by=v_user,
      reviewed_at=clock_timestamp(),review_idempotency_key=p_idempotency_key
    where app.id=p_application_id
    returning app.review_status,app.state_version into review_status,state_version;
  perform private.write_security_audit(v_user,'application.review','committee_application',p_application_id,'allowed','STATE_CHANGED',p_request_id,
    jsonb_build_object('action',p_action,'module_id',v_app.module_id));
  return next;
end $$;
revoke all on function public.review_committee_application(uuid,text,bigint,uuid,uuid) from public,anon,authenticated;
grant execute on function public.review_committee_application(uuid,text,bigint,uuid,uuid) to authenticated;
