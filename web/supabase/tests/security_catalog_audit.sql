-- Run only against a disposable Supabase local database after all migrations.
begin;
create extension if not exists pgtap with schema extensions;
select plan(15);

select ok(not exists (
  select 1
  from unnest(array[
    'profiles','platform_roles','user_platform_roles','committee_memberships',
    'committee_member_conflicts','civic_processes','process_events','citizen_reports',
    'evidence_pointers','committee_applications','committee_exam_attempts',
    'committee_proposals','proposal_votes','committee_reports',
    'committee_report_observations','committee_technical_votes',
    'committee_quorum_rules','reputation_events','security_audit_events'
  ]) as expected(table_name)
  left join pg_class c on c.oid = to_regclass('public.' || expected.table_name)
  where c.oid is null or not c.relrowsecurity
), 'every sensitive table exists and has RLS enabled');

select ok(not exists (
  select 1 from information_schema.role_table_grants
  where grantee = 'anon' and table_schema = 'public'
    and privilege_type in ('INSERT','UPDATE','DELETE','TRUNCATE')
    and table_name in (
      'profiles','user_platform_roles','committee_memberships','committee_member_conflicts',
      'civic_processes','process_events','citizen_reports','evidence_pointers',
      'committee_applications','committee_exam_attempts','committee_proposals',
      'proposal_votes','committee_reports','committee_report_observations',
      'committee_technical_votes','committee_quorum_rules','reputation_events',
      'security_audit_events'
    )
) and not exists (
  select 1 from pg_policies
  where schemaname = 'storage' and tablename = 'objects'
    and policyname like 'evidence_%' and 'anon' = any(roles)
), 'anon has no sensitive public-table writes or evidence policy');

select ok(not exists (
  select 1 from information_schema.role_table_grants
  where grantee = 'authenticated' and table_schema = 'public'
    and table_name in (
      'user_platform_roles','committee_memberships','committee_member_conflicts',
      'process_events','evidence_pointers','committee_applications',
      'committee_exam_attempts','committee_proposals','proposal_votes',
      'committee_reports','committee_report_observations','committee_technical_votes',
      'committee_quorum_rules','reputation_events','security_audit_events'
    ) and privilege_type in ('INSERT','UPDATE','DELETE','TRUNCATE')
), 'authenticated has no direct writes on RPC-governed tables');

select ok(not exists (
  select 1 from pg_policies
  where schemaname = 'public'
    and tablename <> 'platform_roles'
    and (coalesce(qual, '') ~* '(^|[^a-z])true([^a-z]|$)'
      or coalesce(with_check, '') ~* '(^|[^a-z])true([^a-z]|$)')
), 'sensitive public policies contain no unconditional true predicate');

select is((select public from storage.buckets where id = 'evidence'), false,
  'evidence bucket is private');
select is((select file_size_limit from storage.buckets where id = 'evidence'), 10485760::bigint,
  'evidence bucket enforces the configured size limit');

select ok(not exists (
  select 1 from pg_policies
  where schemaname = 'storage' and tablename = 'objects'
    and policyname like 'evidence_%' and cmd in ('UPDATE','DELETE','ALL')
), 'evidence clients have no overwrite or delete policy');

select ok(not has_schema_privilege('anon','private','USAGE')
  and not has_schema_privilege('authenticated','private','USAGE'),
  'private helpers cannot be called directly through schema access');

select ok(not exists (
  select 1
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  cross join lateral aclexplode(coalesce(p.proacl, acldefault('f',p.proowner))) acl
  where p.prosecdef and n.nspname in ('public','private') and acl.grantee = 0
), 'no SECURITY DEFINER function grants EXECUTE to PUBLIC');

select ok(not exists (
  select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
  where p.prosecdef and n.nspname in ('public','private')
    and not coalesce(p.proconfig, '{}'::text[])::text[] && array[
      'search_path=pg_catalog, public, private',
      'search_path=pg_catalog, public'
    ]::text[]
), 'all privileged functions have an approved fixed search_path');

select ok(not has_function_privilege('anon',
  'public.cast_citizen_vote(uuid,text,uuid,uuid,uuid)','EXECUTE')
  and not has_function_privilege('anon',
  'public.close_committee_report(uuid,bigint,uuid)','EXECUTE'),
  'anon cannot execute critical public RPCs');

select ok(has_function_privilege('authenticated',
  'public.cast_citizen_vote(uuid,text,uuid,uuid,uuid)','EXECUTE')
  and has_function_privilege('authenticated',
  'public.close_committee_report(uuid,bigint,uuid)','EXECUTE'),
  'authenticated can execute only the guarded critical RPC entry points');

select ok(not has_function_privilege('authenticated',
  'public.create_committee_exam_attempt(uuid,smallint,text,timestamptz,jsonb,jsonb)','EXECUTE')
  and not has_function_privilege('authenticated',
  'public.create_committee_application_with_attempt(uuid,uuid,smallint,jsonb)','EXECUTE'),
  'inherited exam RPCs remain service-role only');

select ok(not exists (
  select 1 from pg_policies
  where schemaname = 'public' and tablename in ('append_only_event','citizen_report_index')
), 'optional unowned historical tables receive no reopening policy');

select ok(not exists (
  select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public'
    and p.proname in ('create_process_with_event','add_process_event','verify_chain_integrity_for_process')
    and (has_function_privilege('anon',p.oid,'EXECUTE')
      or has_function_privilege('authenticated',p.oid,'EXECUTE'))
), 'unsafe inherited RPCs are never executable by anon or authenticated');

select * from finish();
rollback;
