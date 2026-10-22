-- LOCAL TEST FIXTURE ONLY. Never copy this file into migrations/ or apply it remotely.
-- Sanitized reconstruction of the read-only remote catalog. All rows and values
-- are synthetic; counts and incompatible shapes intentionally mirror the preflight.

insert into auth.users(id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at)
values
 ('61000000-0000-4000-8000-000000000001','authenticated','authenticated','bridge-1@example.test','x',now(),now(),now()),
 ('61000000-0000-4000-8000-000000000002','authenticated','authenticated','bridge-2@example.test','x',now(),now(),now()),
 ('61000000-0000-4000-8000-000000000003','authenticated','authenticated','bridge-3@example.test','x',now(),now(),now())
on conflict(id) do nothing;

create table public.committee_applications (
  id uuid primary key default gen_random_uuid(), actor_hash text not null,
  module_id integer not null, module_name text not null, level text not null,
  participation_type text not null, expertise_area text not null, public_name text,
  experience_summary text not null, motivation text not null,
  created_at timestamptz not null default now(), municipality text, state text,
  user_id uuid, visibility_level text, conflict_interest text, curriculum_evidence text,
  ethics_accepted boolean default false, is_public_figure boolean default false,
  review_status text default 'Revisión ética'
);

create table public.committee_exam_attempts (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  module_id smallint not null check(module_id between 1 and 30), bank_version text not null,
  status text not null check(status in('started','submitted','expired')),
  created_at timestamptz not null default now(), started_at timestamptz not null default now(),
  submitted_at timestamptz, expires_at timestamptz not null, score smallint check(score between 0 and 10),
  ethics_score smallint check(ethics_score between 0 and 5), technical_score smallint check(technical_score between 0 and 5),
  approved boolean, question_selection jsonb not null, option_order jsonb not null,
  responses jsonb, attempt_number integer not null check(attempt_number>0), application_id uuid,
  constraint submitted_attempt_has_result check(status<>'submitted' or (submitted_at is not null and score is not null and approved is not null))
);

create table public.append_only_event (
  event_id uuid primary key default gen_random_uuid(), parent_event_hash text,
  current_event_hash text not null, event_type text not null, entity_type text,
  entity_id text, actor_hash text, payload_json jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create table public.citizen_report_index (
  id uuid primary key default gen_random_uuid(), actor_hash text not null,
  process_id uuid not null unique, title text not null, category text,
  created_at timestamptz not null default now()
);
create table public.civic_reputation (
  id uuid primary key default gen_random_uuid(), actor_hash text not null,
  technical_score numeric default 0, citizen_score numeric default 0,
  spam_flags integer default 0, ethical_flags integer default 0,
  inactivity_flags integer default 0, suspension_until timestamptz,
  created_at timestamptz default now()
);
create table public.committee_proposals (
  id uuid primary key default gen_random_uuid(), user_id uuid, actor_hash text,
  module_id integer not null, module_name text not null, level text not null,
  municipality text, state text, title text not null, problem text not null,
  proposed_solution text not null, evidence text, expected_impact text,
  urgency text default 'Media', estimated_cost text, risks text, ai_summary text,
  status text default 'Borrador', created_at timestamptz default now()
);
create table public.proposal_votes (
  id uuid primary key default gen_random_uuid(), proposal_id uuid not null,
  user_id uuid, actor_hash text, voter_type text default 'ciudadano',
  vote text not null, comprehension_score integer not null, vote_weight numeric not null,
  created_at timestamptz default now(), proposal_title text, module_id integer,
  module_name text, time_spent_seconds integer, spam_flag boolean default false,
  suspicious_flag boolean default false, risk_score integer default 0,
  review_status text default 'normal'
);
create unique index one_vote_per_actor_per_proposal on public.proposal_votes(proposal_id,actor_hash);
create unique index unique_vote_per_actor on public.proposal_votes(proposal_id,actor_hash);
create table public.committee_reports (
  id uuid primary key default gen_random_uuid(), proposal_id uuid not null,
  module_id integer, module_name text, report_type text not null default 'preliminar',
  status text not null default 'En revisión', technical_summary text, risks text,
  impact_analysis text, recommendations text, consensus_result text, created_by text,
  created_at timestamptz default now(), proposal_title text, folio text,
  report_version integer default 1, facts text, evidence_summary text, methodology text,
  technical_analysis text, legal_human_rights_basis text, dissent_notes text,
  public_summary text, final_conclusion text, conflict_of_interest_review text,
  chain_of_custody_summary text, document_hash text, previous_version_hash text,
  chain_head_hash text, locked boolean default false, updated_at timestamptz default now()
);
create table public.committee_report_events (
  id uuid primary key default gen_random_uuid(), report_id uuid, proposal_id uuid,
  event_type text not null default 'EVENTO', actor_hash text, event_payload jsonb,
  previous_hash text, event_hash text, created_at timestamptz default now()
);
create table public.committee_report_observations (
  id uuid primary key default gen_random_uuid(), report_id uuid not null,
  actor_hash text not null, module_id integer, observation_type text not null,
  content text not null, created_at timestamptz default now(), proposal_id uuid
);
create table public.committee_technical_votes (
  id uuid primary key default gen_random_uuid(), proposal_id uuid not null,
  actor_hash text not null, vote text not null, technical_weight numeric default 1,
  reasoning text, created_at timestamptz default now(), report_id uuid
);
create table public.evidence_pointers (
  id uuid primary key default gen_random_uuid(), process_id uuid not null,
  actor_hash text not null, storage_bucket text not null default 'evidence',
  storage_path text not null, sha256 text not null, mime_type text,
  size_bytes bigint, created_at timestamptz not null default now()
);

insert into public.committee_applications(id,actor_hash,module_id,module_name,level,participation_type,expertise_area,experience_summary,motivation,user_id,review_status)
select ('71000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,'legacy-application-'||gs,
  1,'Synthetic module','legacy','legacy','legacy','Synthetic historical experience','Synthetic historical motivation',
  case when gs<=3 then ('61000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid end,
  case when gs<=2 then 'Integrada' else 'Revisión ética' end from generate_series(1,7) gs;
insert into public.committee_exam_attempts(id,user_id,module_id,bank_version,status,submitted_at,expires_at,score,approved,question_selection,option_order,attempt_number)
select ('71100000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,
 ('61000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,1,'legacy','submitted',now(),now()+interval '1 day',10,true,'[]','{}',1
from generate_series(1,2) gs;
insert into public.append_only_event(event_id,current_event_hash,event_type,entity_type,entity_id,actor_hash)
select ('72000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,md5('synthetic-event-'||gs),
 'CitizenNoteAdded','ProcesoCivico',gs::text,'legacy-event-'||gs from generate_series(1,237) gs;
insert into public.citizen_report_index(id,actor_hash,process_id,title,category)
select ('73000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,'legacy-report-'||gs,
 ('73100000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,'Synthetic report','synthetic' from generate_series(1,3) gs;
insert into public.civic_reputation(id,actor_hash)
select ('74000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,'legacy-reputation-'||gs from generate_series(1,2) gs;
insert into public.committee_proposals(id,user_id,actor_hash,module_id,module_name,level,title,problem,proposed_solution,status)
select ('75000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,
 ('61000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,'legacy-proposal-'||gs,
 1,'Synthetic module','legacy','Synthetic proposal','Synthetic problem','Synthetic solution','En estudio' from generate_series(1,3) gs;
insert into public.proposal_votes(id,proposal_id,user_id,actor_hash,vote,comprehension_score,vote_weight) values
 ('76000000-0000-4000-8000-000000000001','75000000-0000-4000-8000-000000000001','61000000-0000-4000-8000-000000000001','legacy-vote-1','A favor',8,0.8),
 ('76000000-0000-4000-8000-000000000002','75000000-0000-4000-8000-000000000002',null,'legacy-vote-2','En contra',7,0.7);
insert into public.committee_reports(id,proposal_id,module_id,status,created_by) values
 ('77000000-0000-4000-8000-000000000001','75000000-0000-4000-8000-000000000001',1,'Dictamen preliminar','79000000-0000-4000-8000-000000000001'),
 ('77000000-0000-4000-8000-000000000002','75000000-0000-4000-8000-000000000002',1,'Dictamen preliminar','79000000-0000-4000-8000-000000000002');
insert into public.committee_report_events(id,report_id,proposal_id,event_type,actor_hash)
select ('78000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,
 ('77000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,
 ('75000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,'EVENTO','legacy-report-event-'||gs from generate_series(1,2) gs;
insert into public.evidence_pointers(id,process_id,actor_hash,storage_path,sha256,mime_type,size_bytes)
select ('79000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,
 ('7a000000-0000-4000-8000-'||lpad(gs::text,12,'0'))::uuid,'legacy-evidence-'||gs,
 ('79000000-0000-4000-8000-'||lpad(gs::text,12,'0')),repeat('a',64),
 case when gs<=3 then 'application/octet-stream' else 'image/png' end,1024 from generate_series(1,43) gs;

create or replace function public.create_process_with_event(text,text)
returns table(out_process_id uuid,out_event_id uuid,out_current_event_hash text)
language sql security definer as $$ select null::uuid,null::uuid,null::text where false $$;
create or replace function public.add_process_event(text,text,text,jsonb)
returns table(out_event_id uuid,out_current_event_hash text)
language sql security definer as $$ select null::uuid,null::text where false $$;
create or replace function public.verify_chain_integrity_for_process(text)
returns table(ok boolean,checked_events integer,first_event_id uuid,last_event_id uuid,last_hash text,violation boolean,message text)
language sql security definer as $$ select true,0,null::uuid,null::uuid,null::text,false,'synthetic' $$;
revoke all on function public.create_process_with_event(text,text) from public;
revoke all on function public.add_process_event(text,text,text,jsonb) from public;
revoke all on function public.verify_chain_integrity_for_process(text) from public;
grant execute on function public.create_process_with_event(text,text) to anon,authenticated,service_role;
grant execute on function public.add_process_event(text,text,text,jsonb) to anon,authenticated,service_role;
grant execute on function public.verify_chain_integrity_for_process(text) to anon,authenticated,service_role;

alter table public.append_only_event enable row level security;
alter table public.citizen_report_index enable row level security;
alter table public.civic_reputation enable row level security;
alter table public.committee_applications enable row level security;
alter table public.committee_exam_attempts enable row level security;
alter table public.committee_proposals enable row level security;
alter table public.proposal_votes enable row level security;
alter table public.committee_reports enable row level security;
alter table public.committee_report_events enable row level security;
alter table public.committee_report_observations enable row level security;
alter table public.committee_technical_votes enable row level security;
alter table public.evidence_pointers enable row level security;

comment on table public.committee_applications is
  'SANITIZED LOCAL FIXTURE reconstructed from read-only catalog metadata';
