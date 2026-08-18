-- Run only against disposable local Supabase after every versioned migration.
begin;
create extension if not exists pgtap with schema extensions;
select plan(30);

select has_table('private','rate_limit_buckets','distributed rate buckets exist in private schema');
select ok(not has_table_privilege('authenticated','private.rate_limit_buckets','SELECT'),'users cannot inspect rate counters');
select ok(has_function_privilege('authenticated','public.consume_rate_limit(text,uuid,uuid)','EXECUTE'),'authenticated may consume fixed server policies');
select ok(not has_function_privilege('anon','public.consume_rate_limit(text,uuid,uuid)','EXECUTE'),'anonymous users cannot consume authenticated limits');
select ok(not exists(select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname like 'evidence_%'),
  'browser receives no direct evidence Storage policy');
select is((select allowed_mime_types from storage.buckets where id='evidence'),array['image/jpeg','image/png','application/pdf']::text[],
  'evidence bucket has conservative MIME allowlist');

insert into auth.users(id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at) values
 ('41000000-0000-4000-8000-000000000001','authenticated','authenticated','hard-a@example.test','x',now(),now(),now()),
 ('42000000-0000-4000-8000-000000000002','authenticated','authenticated','hard-b@example.test','x',now(),now(),now()),
 ('43000000-0000-4000-8000-000000000003','authenticated','authenticated','hard-c@example.test','x',now(),now(),now())
on conflict(id) do nothing;

create temporary table hardening_ids(process_id uuid not null);
grant select on hardening_ids to authenticated;

set local role authenticated;
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select lives_ok($$select public.create_civic_process('hardening','Chain',gen_random_uuid(),gen_random_uuid())$$,'process creation seals first event');
reset role;
insert into hardening_ids select id from public.civic_processes where owner_user_id='41000000-0000-4000-8000-000000000001';
select is((select chain_event_count from public.civic_processes where owner_user_id='41000000-0000-4000-8000-000000000001'),1::bigint,'process tracks event count');
select ok((select chain_head_hash~'^[0-9a-f]{64}$' from public.civic_processes where owner_user_id='41000000-0000-4000-8000-000000000001'),'process tracks SHA-256 chain head');

set local role authenticated;
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select is((select public.verify_process_chain(process_id) from hardening_ids),'valid','valid chain verifies');
reset role;
create temporary table hardening_event_backup as
  select * from public.process_events where process_id=(select process_id from hardening_ids);
grant select on hardening_event_backup to authenticated;
update public.process_events set payload='{"tampered":true}' where process_id=(select id from public.civic_processes where owner_user_id='41000000-0000-4000-8000-000000000001');
set local role authenticated;
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select is((select public.verify_process_chain(id) from public.civic_processes where owner_user_id='41000000-0000-4000-8000-000000000001'),'broken','altered event is detected');
reset role;
update public.process_events e set payload=b.payload,event_hash=b.event_hash
from hardening_event_backup b where e.id=b.id;
update public.process_events set previous_event_hash=repeat('0',64) where process_id=(select process_id from hardening_ids);
set local role authenticated;
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select is((select public.verify_process_chain(process_id) from hardening_ids),'broken','incorrect previous hash is detected');
reset role;
update public.process_events e set previous_event_hash=b.previous_event_hash from hardening_event_backup b where e.id=b.id;
delete from public.process_events where process_id=(select process_id from hardening_ids);
set local role authenticated;
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select is((select public.verify_process_chain(process_id) from hardening_ids),'broken','deleted event is detected');
select set_config('request.jwt.claim.sub','42000000-0000-4000-8000-000000000002',true);
select throws_ok((select format('select public.verify_process_chain(%L)',process_id) from hardening_ids),
  'P0002',null,'foreign user cannot verify chain');
reset role;

insert into public.evidence_pointers(id,owner_user_id,process_id,storage_path,sha256,size_bytes,mime_type,review_status)
values
 ('48000000-0000-4000-8000-000000000008','41000000-0000-4000-8000-000000000001',(select process_id from hardening_ids),'48000000-0000-4000-8000-000000000008',repeat('a',64),8,'image/png','accepted'),
 ('49000000-0000-4000-8000-000000000009','41000000-0000-4000-8000-000000000001',(select process_id from hardening_ids),'49000000-0000-4000-8000-000000000009',repeat('b',64),8,'image/png','pending');
set local role authenticated;
select set_config('request.jwt.claim.sub','42000000-0000-4000-8000-000000000002',true);
select throws_ok($$select public.authorize_evidence_download('48000000-0000-4000-8000-000000000008',(select process_id from hardening_ids))$$,
  'P0002',null,'foreign user cannot authorize an accepted evidence download');
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select is((select public.authorize_evidence_download('48000000-0000-4000-8000-000000000008',(select process_id from hardening_ids))),
  '48000000-0000-4000-8000-000000000008','owner can authorize accepted evidence');
reset role;
set local role service_role;
select lives_ok($$select public.reject_evidence_upload('49000000-0000-4000-8000-000000000009','41000000-0000-4000-8000-000000000001')$$,
  'server rollback invalidates a pending evidence pointer');
reset role;
select is((select review_status from public.evidence_pointers where id='49000000-0000-4000-8000-000000000009'),'rejected',
  'rolled-back evidence remains rejected');

set local role authenticated;
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select ok((select allowed from public.consume_rate_limit('process.create')),'normal rate-limit consumption succeeds');
select ok((select allowed from public.consume_rate_limit('vote.citizen',gen_random_uuid())),'resource-scoped rate-limit consumption succeeds');
select ok((select bool_and(allowed) from generate_series(1,9) gs,lateral public.consume_rate_limit('process.create'||left(gs::text,0))),'requests through configured limit succeed');
select ok(not (select allowed from public.consume_rate_limit('process.create')),'request above configured limit is rejected');
select set_config('request.jwt.claim.sub','42000000-0000-4000-8000-000000000002',true);
select ok((select allowed from public.consume_rate_limit('process.create')),'different user has independent bucket');
reset role;

insert into public.committee_memberships(user_id,module_id,membership_role,status,created_by) values
 ('41000000-0000-4000-8000-000000000001',1,'reviewer','active','43000000-0000-4000-8000-000000000003'),
 ('42000000-0000-4000-8000-000000000002',1,'reviewer','active','43000000-0000-4000-8000-000000000003'),
 ('43000000-0000-4000-8000-000000000003',2,'reviewer','active','41000000-0000-4000-8000-000000000001');
insert into public.committee_applications(
 id,user_id,owner_user_id,module_id,module_name,level,participation_type,expertise_area,experience_summary,motivation,
 conflict_interest,ethics_accepted,is_public_figure,review_status
) values ('44000000-0000-4000-8000-000000000004','42000000-0000-4000-8000-000000000002','42000000-0000-4000-8000-000000000002',1,
 'Module 1','national','technical','security','Long enough experience','Valid motivation','None',true,false,'Revisión ética');

set local role authenticated;
select set_config('request.jwt.claim.sub','43000000-0000-4000-8000-000000000003',true);
select throws_ok($$select public.review_committee_application('44000000-0000-4000-8000-000000000004','qualify',1,gen_random_uuid())$$,
  '42501',null,'reviewer from another module cannot review');
select set_config('request.jwt.claim.sub','42000000-0000-4000-8000-000000000002',true);
select throws_ok($$select public.review_committee_application('44000000-0000-4000-8000-000000000004','qualify',1,gen_random_uuid())$$,
  '42501',null,'reviewer cannot approve own application');
select set_config('request.jwt.claim.sub','41000000-0000-4000-8000-000000000001',true);
select throws_ok($$select public.review_committee_application('44000000-0000-4000-8000-000000000004','integrate',1,gen_random_uuid())$$,
  '22023',null,'invalid application transition is rejected');
select lives_ok($$select public.review_committee_application('44000000-0000-4000-8000-000000000004','qualify',1,'45000000-0000-4000-8000-000000000005')$$,
  'authorized same-module reviewer can qualify');
select lives_ok($$select public.review_committee_application('44000000-0000-4000-8000-000000000004','qualify',1,'45000000-0000-4000-8000-000000000005')$$,
  'review replay is idempotent');
select lives_ok($$select public.review_committee_application('44000000-0000-4000-8000-000000000004','integrate',2,'46000000-0000-4000-8000-000000000006')$$,
  'authorized reviewer can integrate qualified application');
reset role;
select is((select state_version from public.committee_applications where id='44000000-0000-4000-8000-000000000004'),3::bigint,
  'idempotent replay does not advance version twice');

select * from finish();
rollback;
