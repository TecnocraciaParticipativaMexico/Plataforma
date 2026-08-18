-- Deny-by-default RLS, narrowly scoped helper predicates, and private evidence Storage.
create or replace function private.has_platform_role(p_roles text[])
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, private
as $$
  select auth.uid() is not null and exists (
    select 1 from public.user_platform_roles r
    where r.user_id = auth.uid()
      and r.role_name = any(p_roles)
      and r.revoked_at is null
      and (r.valid_until is null or r.valid_until > now())
  );
$$;
revoke all on function private.has_platform_role(text[]) from public, anon, authenticated;
grant execute on function private.has_platform_role(text[]) to authenticated, service_role;

create or replace function private.has_committee_membership(
  p_module_id integer,
  p_roles text[] default array['member','reviewer','admin']::text[]
)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, private
as $$
  select auth.uid() is not null and exists (
    select 1 from public.committee_memberships m
    where m.user_id = auth.uid()
      and m.module_id = p_module_id
      and m.membership_role = any(p_roles)
      and m.status = 'active'
      and m.valid_from <= now()
      and (m.valid_until is null or m.valid_until > now())
  );
$$;
revoke all on function private.has_committee_membership(integer, text[]) from public, anon, authenticated;
grant execute on function private.has_committee_membership(integer, text[]) to authenticated, service_role;

do $$
declare t text;
begin
  foreach t in array array[
    'profiles','platform_roles','user_platform_roles','committee_memberships','committee_member_conflicts',
    'civic_processes','process_events','citizen_reports','evidence_pointers',
    'committee_applications','committee_exam_attempts','committee_proposals','proposal_votes',
    'committee_reports','committee_report_observations','committee_technical_votes',
    'committee_quorum_rules','reputation_events','security_audit_events'
  ] loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I enable row level security', t);
      execute format('revoke all on table public.%I from public, anon, authenticated', t);
    end if;
  end loop;
end $$;

grant select, insert, update on public.profiles to authenticated;
create policy "profiles_select_self" on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "profiles_insert_self" on public.profiles for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "profiles_update_self" on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select on public.platform_roles to authenticated;
create policy "platform_roles_authenticated_catalog" on public.platform_roles for select to authenticated
  using ((select auth.uid()) is not null);

grant select on public.user_platform_roles to authenticated;
create policy "platform_role_select_self_or_auditor" on public.user_platform_roles for select to authenticated
  using ((select auth.uid()) = user_id or private.has_platform_role(array['platform_auditor','platform_admin']));

grant select on public.committee_memberships to authenticated;
create policy "membership_select_self_or_admin" on public.committee_memberships for select to authenticated
  using ((select auth.uid()) = user_id or private.has_platform_role(array['platform_auditor','platform_admin']));

grant select on public.committee_member_conflicts to authenticated;
create policy "conflict_select_self_or_auditor" on public.committee_member_conflicts for select to authenticated
  using ((select auth.uid()) = user_id or private.has_platform_role(array['platform_auditor','platform_admin']));

grant select, insert on public.civic_processes to authenticated;
create policy "process_owner_select" on public.civic_processes for select to authenticated
  using ((select auth.uid()) = owner_user_id);
create policy "process_owner_insert" on public.civic_processes for insert to authenticated
  with check ((select auth.uid()) = owner_user_id and status = 'draft' and state_version = 1);

grant select on public.process_events to authenticated;
create policy "process_event_owner_select" on public.process_events for select to authenticated
  using (exists (select 1 from public.civic_processes p where p.id = process_id and p.owner_user_id = (select auth.uid())));

grant select, insert on public.citizen_reports to authenticated;
create policy "citizen_report_owner_select" on public.citizen_reports for select to authenticated
  using ((select auth.uid()) = owner_user_id);
create policy "citizen_report_owner_insert" on public.citizen_reports for insert to authenticated
  with check ((select auth.uid()) = owner_user_id and exists (
    select 1 from public.civic_processes p where p.id = process_id and p.owner_user_id = (select auth.uid())
  ));

grant select on public.evidence_pointers to authenticated;
create policy "evidence_owner_select" on public.evidence_pointers for select to authenticated
  using ((select auth.uid()) = owner_user_id);

grant select on public.committee_applications to authenticated;
create policy "application_owner_select" on public.committee_applications for select to authenticated
  using ((select auth.uid()) = coalesce(owner_user_id, user_id));

-- Exam attempts stay RPC-only; no authenticated table grants.
grant select on public.committee_proposals to authenticated;
create policy "proposal_authenticated_select" on public.committee_proposals for select to authenticated
  using ((select auth.uid()) is not null);

grant select on public.proposal_votes to authenticated;
create policy "citizen_vote_select_self" on public.proposal_votes for select to authenticated
  using ((select auth.uid()) = user_id);

grant select on public.committee_reports to authenticated;
create policy "committee_report_member_select" on public.committee_reports for select to authenticated
  using (private.has_committee_membership(module_id));

grant select on public.committee_report_observations to authenticated;
create policy "committee_observation_member_select" on public.committee_report_observations for select to authenticated
  using (exists (
    select 1 from public.committee_reports r
    where r.id = report_id and private.has_committee_membership(r.module_id)
  ));

grant select on public.committee_technical_votes to authenticated;
create policy "technical_vote_member_select" on public.committee_technical_votes for select to authenticated
  using (exists (
    select 1 from public.committee_reports r
    where r.id = report_id and private.has_committee_membership(r.module_id)
  ));

grant select on public.reputation_events to authenticated;
create policy "reputation_select_self" on public.reputation_events for select to authenticated
  using ((select auth.uid()) = user_id);

grant select on public.security_audit_events to authenticated;
create policy "audit_select_verified_auditor" on public.security_audit_events for select to authenticated
  using (private.has_platform_role(array['platform_auditor','platform_admin']));

-- Existing legacy event/index tables remain closed unless a verified owner was populated later.
do $$ begin
  if to_regclass('public.append_only_event') is not null then
    execute 'alter table public.append_only_event enable row level security';
    execute 'revoke all on public.append_only_event from public, anon, authenticated';
  end if;
  if to_regclass('public.citizen_report_index') is not null then
    execute 'alter table public.citizen_report_index enable row level security';
    execute 'revoke all on public.citizen_report_index from public, anon, authenticated';
  end if;
end $$;

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values (
  'evidence','evidence',false,52428800,
  array['image/jpeg','image/png','application/pdf','audio/mpeg','audio/mp4','video/mp4']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "evidence_insert_pre_authorized" on storage.objects;
create policy "evidence_insert_pre_authorized" on storage.objects for insert to authenticated
with check (
  bucket_id = 'evidence'
  and exists (
    select 1 from public.evidence_pointers e
    where e.storage_bucket = bucket_id
      and e.storage_path = name
      and e.owner_user_id = (select auth.uid())
      and e.review_status = 'pending'
  )
);

drop policy if exists "evidence_select_owner" on storage.objects;
create policy "evidence_select_owner" on storage.objects for select to authenticated
using (
  bucket_id = 'evidence'
  and exists (
    select 1 from public.evidence_pointers e
    where e.storage_bucket = bucket_id
      and e.storage_path = name
      and e.owner_user_id = (select auth.uid())
      and e.review_status in ('pending','accepted')
  )
);
-- Deliberately no UPDATE or DELETE policy: clients cannot overwrite or delete evidence.
