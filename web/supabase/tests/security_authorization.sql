-- Run only against disposable Supabase local test DB: `supabase test db`.
begin;
create extension if not exists pgtap with schema extensions;
select plan(26);

select has_table('public','civic_processes','canonical process table exists');
select has_table('public','committee_memberships','committee membership table exists');
select has_table('public','reputation_events','append-only reputation ledger exists');
select has_table('public','security_audit_events','security audit table exists');
select ok((select relrowsecurity from pg_class where oid='public.civic_processes'::regclass),'processes have RLS');
select ok((select relrowsecurity from pg_class where oid='public.proposal_votes'::regclass),'votes have RLS');
select ok((select public=false from storage.buckets where id='evidence'),'evidence bucket is private');
select ok(not has_function_privilege('anon','public.cast_citizen_vote(uuid,text,uuid,uuid,uuid)','EXECUTE'),'anon cannot cast votes');
select ok(not has_function_privilege('anon','public.close_committee_report(uuid,bigint,uuid)','EXECUTE'),'anon cannot close reports');
select ok(not has_function_privilege('authenticated','private.write_security_audit(uuid,text,text,uuid,text,text,uuid,jsonb)','EXECUTE'),'users cannot forge audit');
select ok(exists(select 1 from pg_indexes where schemaname='public' and tablename='proposal_votes' and indexdef ilike '%unique%user_id%proposal_id%'),'vote uniqueness is database-enforced for concurrent requests');

insert into auth.users(id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at)
values
 ('10000000-0000-4000-8000-000000000001','authenticated','authenticated','a@example.test','x',now(),now(),now()),
 ('20000000-0000-4000-8000-000000000002','authenticated','authenticated','b@example.test','x',now(),now(),now()),
 ('30000000-0000-4000-8000-000000000003','authenticated','authenticated','admin@example.test','x',now(),now(),now())
on conflict(id) do nothing;

insert into public.civic_processes(id,owner_user_id,process_type,title,idempotency_key)
values
 ('a0000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','test','A','a1000000-0000-4000-8000-000000000001'),
 ('b0000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','test','B','b1000000-0000-4000-8000-000000000002');

set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
select is((select count(*) from public.civic_processes where id='b0000000-0000-4000-8000-000000000002'),0::bigint,'user A cannot read process B');
select throws_ok(
  $$update public.civic_processes set owner_user_id='10000000-0000-4000-8000-000000000001' where id='b0000000-0000-4000-8000-000000000002'$$,
  '42501',null,'user A cannot take ownership of process B'
);
select throws_ok(
  $$update public.civic_processes set status='resolved' where id='a0000000-0000-4000-8000-000000000001'$$,
  '42501',null,'owner cannot update administrative state directly'
);
select throws_ok(
  $$insert into public.user_platform_roles(user_id,role_name,granted_by) values ('10000000-0000-4000-8000-000000000001','platform_admin','20000000-0000-4000-8000-000000000002')$$,
  '42501',null,'user cannot self-assign a role'
);
select throws_ok(
  $$insert into public.committee_memberships(user_id,module_id,membership_role,status,created_by) values ('10000000-0000-4000-8000-000000000001',1,'admin','active','20000000-0000-4000-8000-000000000002')$$,
  '42501',null,'user cannot create active membership'
);
select throws_ok(
  $$update public.security_audit_events set reason_code='tampered'$$,
  '42501',null,'user cannot edit audit records'
);
select throws_ok(
  $$delete from public.security_audit_events$$,
  '42501',null,'user cannot delete audit records'
);
reset role;

insert into public.committee_proposals(id,owner_user_id,user_id,module_id,title,status)
values ('c0000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001',1,'Test proposal','active');
insert into public.committee_exam_attempts(
 id,user_id,module_id,bank_version,status,expires_at,score,approved,question_selection,option_order,attempt_number,submitted_at
) values (
 'd0000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001',1,'test','submitted',now()+interval '1 day',10,true,'[]','{}',1,now()
);
insert into public.committee_exam_attempts(
 id,user_id,module_id,bank_version,status,expires_at,score,approved,question_selection,option_order,attempt_number,submitted_at
) values (
 'd0000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002',1,'test','submitted',now()+interval '1 day',10,true,'[]','{}',1,now()
);

set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
select lives_ok(
  $$select public.cast_citizen_vote('c0000000-0000-4000-8000-000000000001','for','d0000000-0000-4000-8000-000000000001','e0000000-0000-4000-8000-000000000001',null)$$,
  'first verified citizen vote succeeds'
);
select throws_ok(
  $$select public.cast_citizen_vote('c0000000-0000-4000-8000-000000000001','against','d0000000-0000-4000-8000-000000000001','e0000000-0000-4000-8000-000000000002',null)$$,
  '23505',null,'duplicate citizen vote is rejected transactionally'
);
select is((select computed_weight from public.proposal_votes where proposal_id='c0000000-0000-4000-8000-000000000001'),1::numeric,'vote weight is computed from stored attempt');
select throws_ok(
  $$select public.cast_citizen_vote('c0000000-0000-4000-8000-000000000001','for','d0000000-0000-4000-8000-000000000002','e0000000-0000-4000-8000-000000000003',null)$$,
  '42501',null,'another user qualification attempt cannot be used'
);
reset role;

insert into public.committee_memberships(user_id,module_id,membership_role,status,created_by)
values ('10000000-0000-4000-8000-000000000001',1,'member','active','30000000-0000-4000-8000-000000000003');
insert into public.committee_proposals(id,owner_user_id,user_id,module_id,title,status)
values ('c0000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002',2,'Other committee','active');
insert into public.committee_reports(id,proposal_id,module_id,created_by,status)
values ('ca000000-0000-4000-8000-000000000001','c0000000-0000-4000-8000-000000000001',1,'30000000-0000-4000-8000-000000000003','under_review');
set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
select throws_ok(
  $$select public.create_committee_report('c0000000-0000-4000-8000-000000000002',null)$$,
  '42501',null,'member of committee A cannot act in committee B'
);
select throws_ok(
  $$select public.close_committee_report('ca000000-0000-4000-8000-000000000001',1,null)$$,
  '42501',null,'ordinary committee member cannot close a report'
);
reset role;

insert into public.civic_processes(id,owner_user_id,process_type,title,idempotency_key)
values ('f0000000-0000-4000-8000-000000000001',null,'historical','Unreconciled','f1000000-0000-4000-8000-000000000001');
set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
select is((select count(*) from public.civic_processes where id='f0000000-0000-4000-8000-000000000001'),0::bigint,'unowned historical data stays closed');
select is((select count(*) from storage.objects where bucket_id='evidence'),0::bigint,'user cannot list foreign evidence');

select * from finish();
rollback;
