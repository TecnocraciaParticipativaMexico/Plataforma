-- Run only against the disposable sanitized legacy baseline after all migrations.
begin;
create extension if not exists pgtap with schema extensions;
select plan(25);

select is((select count(*) from public.committee_applications where id::text like '71000000-%' and owner_user_id is not null),3::bigint,
  'only three applications with verified auth users receive owners');
select is((select count(*) from public.committee_applications where id::text like '71000000-%' and owner_user_id is null),4::bigint,
  'four unverifiable applications remain ownerless');
select ok(not exists(select 1 from public.committee_applications where owner_user_id is not null and owner_user_id is distinct from user_id),
  'application ownership is never derived from actor_hash');

select is((select count(*) from public.append_only_event where event_id::text like '72000000-%'),237::bigint,
  'all 237 legacy events survive');
select is((select count(*) from public.append_only_event where event_id::text like '72000000-%' and owner_user_id is not null),0::bigint,
  'legacy events receive no invented owner');
select is((select count(*) from public.citizen_report_index where id::text like '73000000-%'),3::bigint,
  'all three legacy report indexes survive');
select is((select count(*) from public.citizen_report_index where id::text like '73000000-%' and owner_user_id is not null),0::bigint,
  'legacy report indexes receive no invented owner');

select is((select count(*) from public.evidence_pointers where id::text like '79000000-%'),43::bigint,
  'all 43 legacy evidence pointers survive');
select is((select count(*) from public.evidence_pointers where id::text like '79000000-%' and review_status='legacy_unverified'),43::bigint,
  'all historical evidence is quarantined as legacy_unverified');
select is((select count(*) from public.evidence_pointers where id::text like '79000000-%' and mime_type='application/octet-stream'),3::bigint,
  'three incompatible MIME records survive unchanged');
select is((select count(*) from public.evidence_pointers where id::text like '79000000-%' and review_status='accepted'),0::bigint,
  'no historical evidence is silently accepted');

select throws_ok(
  $$insert into public.evidence_pointers(id,owner_user_id,process_id,storage_path,sha256,size_bytes,mime_type,review_status)
    values('7b000000-0000-4000-8000-000000000001','61000000-0000-4000-8000-000000000001',
    '7c000000-0000-4000-8000-000000000001','7b000000-0000-4000-8000-000000000001',repeat('b',64),10,
    'application/octet-stream','pending')$$,
  '23514',null,'new disallowed MIME is rejected');
select lives_ok(
  $$insert into public.evidence_pointers(id,owner_user_id,process_id,storage_path,sha256,size_bytes,mime_type,review_status)
    values('7b000000-0000-4000-8000-000000000002','61000000-0000-4000-8000-000000000001',
    '7c000000-0000-4000-8000-000000000002','7b000000-0000-4000-8000-000000000002',repeat('c',64),10,
    'image/png','pending')$$,
  'new allowed MIME remains insertable by trusted database code');

set local role authenticated;
select set_config('request.jwt.claim.sub','61000000-0000-4000-8000-000000000001',true);
select throws_ok(
  $$select public.authorize_evidence_download('79000000-0000-4000-8000-000000000001','7a000000-0000-4000-8000-000000000001')$$,
  'P0002',null,'legacy_unverified evidence cannot receive a signed download path');
select is((select count(*) from public.committee_applications where id='71000000-0000-4000-8000-000000000004'),0::bigint,
  'ownerless application is invisible to ordinary users');
select throws_ok(
  $$update public.committee_applications set owner_user_id='61000000-0000-4000-8000-000000000001'
    where id='71000000-0000-4000-8000-000000000004'$$,
  '42501',null,'actor knowledge cannot claim an ownerless application');
reset role;

select is((select count(*) from public.committee_proposals where id::text like '75000000-%' and status='En estudio'),3::bigint,
  'ambiguous proposal states remain unchanged');
select is((select count(*) from public.committee_reports where id::text like '77000000-%' and status='Dictamen preliminar'),2::bigint,
  'ambiguous report states remain unchanged');
set local role authenticated;
select set_config('request.jwt.claim.sub','61000000-0000-4000-8000-000000000001',true);
select throws_ok(
  $$select public.cast_citizen_vote('75000000-0000-4000-8000-000000000001','for',
    '71100000-0000-4000-8000-000000000001',gen_random_uuid(),null)$$,
  'P0002',null,'ambiguous legacy proposal cannot enter a privileged transition');
reset role;

select ok((select bool_and(is_nullable='YES') from information_schema.columns
  where table_schema='public' and (table_name,column_name) in (
    ('committee_applications','actor_hash'),
    ('committee_proposals','module_name'),('committee_proposals','level'),
    ('committee_proposals','problem'),('committee_proposals','proposed_solution'),
    ('proposal_votes','vote'),('proposal_votes','comprehension_score'),('proposal_votes','vote_weight'),
    ('committee_report_observations','actor_hash'),('committee_report_observations','observation_type'),
    ('committee_technical_votes','proposal_id'),('committee_technical_votes','actor_hash'),('committee_technical_votes','vote')
  )),'redundant legacy columns are retained but nullable');

select ok(not has_function_privilege('anon','public.create_process_with_event(text,text)','EXECUTE')
  and not has_function_privilege('anon','public.add_process_event(text,text,text,jsonb)','EXECUTE')
  and not has_function_privilege('anon','public.verify_chain_integrity_for_process(text)','EXECUTE'),
  'anon cannot execute any unsafe legacy RPC');
select ok(not has_function_privilege('authenticated','public.create_process_with_event(text,text)','EXECUTE')
  and not has_function_privilege('authenticated','public.add_process_event(text,text,text,jsonb)','EXECUTE')
  and not has_function_privilege('authenticated','public.verify_chain_integrity_for_process(text)','EXECUTE'),
  'authenticated cannot directly execute unsafe legacy RPCs');
select ok(not exists(select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public' and p.proname in('create_process_with_event','add_process_event','verify_chain_integrity_for_process')
  and not coalesce(p.proconfig,'{}'::text[]) @> array['search_path=pg_catalog, public']),
  'legacy privileged RPCs have a fixed approved search_path');

set local role authenticated;
select set_config('request.jwt.claim.sub','61000000-0000-4000-8000-000000000001',true);
select throws_ok(
  $$select public.add_process_event('known-process','StatusChanged','forged','{"status":"Published"}'::jsonb)$$,
  '42501',null,'citizen cannot invoke inherited StatusChanged');
reset role;

select ok(not has_table_privilege('authenticated','public.append_only_event','SELECT')
  and not has_table_privilege('authenticated','public.citizen_report_index','SELECT'),
  'unowned historical event and report indexes remain closed');

select * from finish();
rollback;
