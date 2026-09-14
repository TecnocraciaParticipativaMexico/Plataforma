-- Transactional entry points. Direct writes stay revoked by the RLS migration.
create or replace function private.write_security_audit(
  p_actor uuid, p_action text, p_resource_type text, p_resource_id uuid,
  p_result text, p_reason_code text, p_request_id uuid, p_metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
begin
  insert into public.security_audit_events(
    actor_user_id, action, resource_type, resource_id, result, reason_code, request_id, metadata
  ) values (
    p_actor, p_action, p_resource_type, p_resource_id, p_result, p_reason_code, p_request_id,
    coalesce(p_metadata, '{}'::jsonb) - array['authorization','token','cookie','password','document']
  );
end;
$$;
revoke all on function private.write_security_audit(uuid,text,text,uuid,text,text,uuid,jsonb)
  from public, anon, authenticated;

create or replace function public.create_civic_process(
  p_process_type text, p_title text, p_idempotency_key uuid, p_request_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid := auth.uid(); v_process uuid;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode = '28000'; end if;
  if p_idempotency_key is null or nullif(btrim(p_process_type), '') is null then
    raise exception 'INVALID_INPUT' using errcode = '22023';
  end if;
  insert into public.civic_processes(owner_user_id, process_type, title, idempotency_key)
  values (v_user, btrim(p_process_type), nullif(btrim(p_title), ''), p_idempotency_key)
  on conflict (owner_user_id, idempotency_key) do update set idempotency_key = excluded.idempotency_key
  returning id into v_process;
  insert into public.process_events(process_id, actor_user_id, event_type, payload, idempotency_key)
  values (v_process, v_user, 'process_created', jsonb_build_object('process_type', btrim(p_process_type)), p_idempotency_key)
  on conflict (process_id, idempotency_key) do nothing;
  perform private.write_security_audit(v_user,'process.create','civic_process',v_process,'allowed','CREATED',p_request_id);
  return v_process;
end;
$$;
revoke all on function public.create_civic_process(text,text,uuid,uuid) from public, anon, authenticated;
grant execute on function public.create_civic_process(text,text,uuid,uuid) to authenticated;

create or replace function public.add_civic_process_note(
  p_process_id uuid, p_note text, p_idempotency_key uuid, p_request_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid := auth.uid(); v_event uuid;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode = '28000'; end if;
  if char_length(btrim(coalesce(p_note,''))) not between 1 and 5000 then
    raise exception 'INVALID_NOTE' using errcode = '22023';
  end if;
  perform 1 from public.civic_processes
   where id = p_process_id and owner_user_id = v_user and status in ('draft','submitted','under_review')
   for update;
  if not found then raise exception 'PROCESS_NOT_FOUND' using errcode = 'P0002'; end if;
  insert into public.process_events(process_id, actor_user_id, event_type, payload, idempotency_key)
  values (p_process_id, v_user, 'citizen_note_added', jsonb_build_object('note',btrim(p_note)),p_idempotency_key)
  on conflict (process_id,idempotency_key) do update set idempotency_key=excluded.idempotency_key
  returning id into v_event;
  perform private.write_security_audit(v_user,'process.note','civic_process',p_process_id,'allowed','NOTE_ADDED',p_request_id);
  return v_event;
end;
$$;
revoke all on function public.add_civic_process_note(uuid,text,uuid,uuid) from public, anon, authenticated;
grant execute on function public.add_civic_process_note(uuid,text,uuid,uuid) to authenticated;

create or replace function public.prepare_evidence_upload(
  p_process_id uuid,p_sha256 text,p_size_bytes bigint,p_mime_type text,p_request_id uuid default null
)
returns table(evidence_id uuid, object_name text)
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid:=auth.uid(); v_id uuid:=gen_random_uuid();
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  perform 1 from public.civic_processes where id=p_process_id and owner_user_id=v_user for share;
  if not found then raise exception 'PROCESS_NOT_FOUND' using errcode='P0002'; end if;
  if p_sha256 !~ '^[0-9a-f]{64}$' or p_size_bytes not between 1 and 52428800 or
     p_mime_type not in ('image/jpeg','image/png','application/pdf','audio/mpeg','audio/mp4','video/mp4') then
    raise exception 'INVALID_EVIDENCE_METADATA' using errcode='22023';
  end if;
  insert into public.evidence_pointers(id,owner_user_id,process_id,storage_path,sha256,size_bytes,mime_type)
   values(v_id,v_user,p_process_id,v_id::text,p_sha256,p_size_bytes,p_mime_type);
  perform private.write_security_audit(v_user,'evidence.prepare','evidence',v_id,'allowed','UPLOAD_AUTHORIZED',p_request_id,
    jsonb_build_object('process_id',p_process_id,'size_bytes',p_size_bytes,'mime_type',p_mime_type));
  evidence_id:=v_id; object_name:=v_id::text; return next;
end;
$$;
revoke all on function public.prepare_evidence_upload(uuid,text,bigint,text,uuid) from public, anon, authenticated;
grant execute on function public.prepare_evidence_upload(uuid,text,bigint,text,uuid) to authenticated;

create or replace function public.transition_civic_process_state(
  p_process_id uuid, p_target_status text, p_expected_version bigint,
  p_idempotency_key uuid, p_request_id uuid default null
)
returns table(status text, state_version bigint)
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid := auth.uid(); v_current public.civic_processes%rowtype; v_authorized boolean := false;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select * into v_current from public.civic_processes where id=p_process_id for update;
  if not found then raise exception 'PROCESS_NOT_FOUND' using errcode='P0002'; end if;
  if v_current.state_version <> p_expected_version then raise exception 'VERSION_CONFLICT' using errcode='40001'; end if;
  -- Citizens may submit only their own draft. Administrative transitions require verified roles.
  if v_current.owner_user_id=v_user and v_current.status='draft' and p_target_status='submitted' then
    v_authorized := true;
  elsif private.has_platform_role(array['platform_admin']) and (
    (v_current.status='submitted' and p_target_status='under_review') or
    (v_current.status='under_review' and p_target_status in ('resolved','rejected')) or
    (v_current.status in ('resolved','rejected') and p_target_status='closed')
  ) then
    v_authorized := true;
  end if;
  if not v_authorized then raise exception 'TRANSITION_FORBIDDEN' using errcode='42501'; end if;
  if exists(select 1 from public.process_events where process_id=p_process_id and idempotency_key=p_idempotency_key) then
    return query select v_current.status,v_current.state_version; return;
  end if;
  update public.civic_processes set status=p_target_status,state_version=state_version+1,updated_at=now()
   where id=p_process_id returning civic_processes.status,civic_processes.state_version into status,state_version;
  insert into public.process_events(process_id,actor_user_id,event_type,payload,idempotency_key)
   values(p_process_id,v_user,'state_transitioned',jsonb_build_object('from',v_current.status,'to',p_target_status),p_idempotency_key);
  perform private.write_security_audit(v_user,'process.transition','civic_process',p_process_id,'allowed','STATE_CHANGED',p_request_id,
    jsonb_build_object('from',v_current.status,'to',p_target_status));
  return next;
end;
$$;
revoke all on function public.transition_civic_process_state(uuid,text,bigint,uuid,uuid) from public, anon, authenticated;
grant execute on function public.transition_civic_process_state(uuid,text,bigint,uuid,uuid) to authenticated;

create or replace function public.cast_citizen_vote(
  p_proposal_id uuid, p_choice text, p_qualification_attempt_id uuid,
  p_idempotency_key uuid, p_request_id uuid default null
)
returns table(vote_id uuid, computed_weight numeric)
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid := auth.uid(); v_score smallint; v_module smallint;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  if p_choice not in ('for','against','changes','abstain') then raise exception 'INVALID_CHOICE' using errcode='22023'; end if;
  select module_id into v_module from public.committee_proposals where id=p_proposal_id and status='active' for share;
  if not found then raise exception 'PROPOSAL_NOT_ACTIVE' using errcode='P0002'; end if;
  select score into v_score from public.committee_exam_attempts
   where id=p_qualification_attempt_id and user_id=v_user and module_id=v_module
     and status='submitted' and approved is true and expires_at>now()
   for update;
  if not found then raise exception 'QUALIFICATION_INVALID' using errcode='42501'; end if;
  insert into public.proposal_votes(user_id,proposal_id,choice,qualification_attempt_id,computed_weight,idempotency_key)
   values(v_user,p_proposal_id,p_choice,p_qualification_attempt_id,least(1,greatest(0,v_score::numeric/10)),p_idempotency_key)
   returning id,proposal_votes.computed_weight into vote_id,computed_weight;
  perform private.write_security_audit(v_user,'vote.cast','committee_proposal',p_proposal_id,'allowed','VOTE_RECORDED',p_request_id);
  return next;
exception when unique_violation then
  raise exception 'VOTE_CONFLICT' using errcode='23505';
end;
$$;
revoke all on function public.cast_citizen_vote(uuid,text,uuid,uuid,uuid) from public, anon, authenticated;
grant execute on function public.cast_citizen_vote(uuid,text,uuid,uuid,uuid) to authenticated;

create or replace function public.create_committee_report(
  p_proposal_id uuid, p_request_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid:=auth.uid(); v_module smallint; v_report uuid;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select module_id into v_module from public.committee_proposals where id=p_proposal_id and status='active' for share;
  if not found then raise exception 'PROPOSAL_NOT_ACTIVE' using errcode='P0002'; end if;
  if not private.has_committee_membership(v_module,array['reviewer','admin']) then raise exception 'MEMBERSHIP_REQUIRED' using errcode='42501'; end if;
  if exists(select 1 from public.committee_member_conflicts where user_id=v_user and module_id=v_module and status='active' and (proposal_id is null or proposal_id=p_proposal_id)) then
    raise exception 'ACTIVE_CONFLICT' using errcode='42501';
  end if;
  insert into public.committee_reports(proposal_id,module_id,created_by)
  values(p_proposal_id,v_module,v_user) returning id into v_report;
  perform private.write_security_audit(v_user,'committee_report.create','committee_report',v_report,'allowed','REPORT_CREATED',p_request_id);
  return v_report;
exception when unique_violation then raise exception 'REPORT_EXISTS' using errcode='23505';
end;
$$;
revoke all on function public.create_committee_report(uuid,uuid) from public, anon, authenticated;
grant execute on function public.create_committee_report(uuid,uuid) to authenticated;

create or replace function public.add_committee_observation(
  p_report_id uuid,p_content text,p_idempotency_key uuid,p_request_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid:=auth.uid(); v_module smallint; v_observation uuid;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select module_id into v_module from public.committee_reports where id=p_report_id and status in ('draft','under_review') for share;
  if not found then raise exception 'REPORT_NOT_OPEN' using errcode='P0002'; end if;
  if not private.has_committee_membership(v_module) then raise exception 'MEMBERSHIP_REQUIRED' using errcode='42501'; end if;
  if exists(select 1 from public.committee_member_conflicts c join public.committee_reports r on r.proposal_id=c.proposal_id
    where c.user_id=v_user and r.id=p_report_id and c.status='active') then raise exception 'ACTIVE_CONFLICT' using errcode='42501'; end if;
  insert into public.committee_report_observations(report_id,author_user_id,content,idempotency_key)
   values(p_report_id,v_user,btrim(p_content),p_idempotency_key)
   on conflict(author_user_id,idempotency_key) where idempotency_key is not null
   do update set idempotency_key=excluded.idempotency_key
   returning id into v_observation;
  perform private.write_security_audit(v_user,'committee_report.observe','committee_report',p_report_id,'allowed','OBSERVATION_ADDED',p_request_id);
  return v_observation;
end;
$$;
revoke all on function public.add_committee_observation(uuid,text,uuid,uuid) from public, anon, authenticated;
grant execute on function public.add_committee_observation(uuid,text,uuid,uuid) to authenticated;

create or replace function public.cast_technical_vote(
  p_report_id uuid,p_choice text,p_reasoning text,p_idempotency_key uuid,p_request_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid:=auth.uid(); v_module smallint; v_proposal uuid; v_vote uuid;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  if p_choice not in ('approve','revise','reject') then raise exception 'INVALID_CHOICE' using errcode='22023'; end if;
  select module_id,proposal_id into v_module,v_proposal from public.committee_reports where id=p_report_id and status in ('draft','under_review') for share;
  if not found then raise exception 'REPORT_NOT_OPEN' using errcode='P0002'; end if;
  if not private.has_committee_membership(v_module,array['member','reviewer','admin']) then raise exception 'MEMBERSHIP_REQUIRED' using errcode='42501'; end if;
  if exists(select 1 from public.committee_member_conflicts where user_id=v_user and module_id=v_module and status='active' and (proposal_id is null or proposal_id=v_proposal)) then
    raise exception 'ACTIVE_CONFLICT' using errcode='42501';
  end if;
  insert into public.committee_technical_votes(report_id,user_id,choice,reasoning,computed_weight,conflict_declared,idempotency_key)
   values(p_report_id,v_user,p_choice,btrim(p_reasoning),1,false,p_idempotency_key)
   returning id into v_vote;
  perform private.write_security_audit(v_user,'technical_vote.cast','committee_report',p_report_id,'allowed','VOTE_RECORDED',p_request_id);
  return v_vote;
exception when unique_violation then raise exception 'VOTE_CONFLICT' using errcode='23505';
end;
$$;
revoke all on function public.cast_technical_vote(uuid,text,text,uuid,uuid) from public, anon, authenticated;
grant execute on function public.cast_technical_vote(uuid,text,text,uuid,uuid) to authenticated;

create or replace function public.close_committee_report(
  p_report_id uuid,p_expected_version bigint,p_request_id uuid default null
)
returns text
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare v_user uuid:=auth.uid(); v_report public.committee_reports%rowtype; v_quorum smallint; v_count integer; v_result text;
begin
  if v_user is null then raise exception 'UNAUTHENTICATED' using errcode='28000'; end if;
  select * into v_report from public.committee_reports where id=p_report_id for update;
  if not found or v_report.status='closed' then raise exception 'REPORT_NOT_OPEN' using errcode='P0002'; end if;
  if v_report.state_version<>p_expected_version then raise exception 'VERSION_CONFLICT' using errcode='40001'; end if;
  if not private.has_committee_membership(v_report.module_id,array['admin']) then raise exception 'COMMITTEE_ADMIN_REQUIRED' using errcode='42501'; end if;
  select minimum_votes into v_quorum from public.committee_quorum_rules
   where module_id=v_report.module_id and enabled and valid_from<=now() and (valid_until is null or valid_until>now())
   order by valid_from desc limit 1;
  if v_quorum is null then raise exception 'QUORUM_RULE_NOT_CONFIGURED' using errcode='55000'; end if;
  select count(*) into v_count from public.committee_technical_votes where report_id=p_report_id and conflict_declared=false;
  if v_count<v_quorum then raise exception 'QUORUM_NOT_MET' using errcode='55000'; end if;
  select case choice when 'approve' then 'approved' when 'revise' then 'revision_required' else 'rejected' end into v_result
   from public.committee_technical_votes where report_id=p_report_id and conflict_declared=false
   group by choice order by count(*) desc,choice limit 1;
  update public.committee_reports set status='closed',consensus_result=v_result,closed_at=now(),state_version=state_version+1,updated_at=now()
   where id=p_report_id;
  perform private.write_security_audit(v_user,'committee_report.close','committee_report',p_report_id,'allowed','REPORT_CLOSED',p_request_id,
    jsonb_build_object('quorum_rule',v_quorum,'valid_votes',v_count));
  return v_result;
end;
$$;
revoke all on function public.close_committee_report(uuid,bigint,uuid) from public, anon, authenticated;
grant execute on function public.close_committee_report(uuid,bigint,uuid) to authenticated;

-- Harden previously versioned exam functions without changing their signatures.
alter function public.create_committee_exam_attempt(uuid,smallint,text,timestamptz,jsonb,jsonb)
  set search_path = pg_catalog, public;
alter function public.create_committee_application_with_attempt(uuid,uuid,smallint,jsonb)
  set search_path = pg_catalog, public;
