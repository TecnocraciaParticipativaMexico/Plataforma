-- Phase 2 security foundation. Additive only: no historical data is reassigned.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(display_name) between 1 and 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_roles (
  role_name text primary key check (role_name in (
    'citizen','committee_member','committee_reviewer','committee_admin','platform_auditor','platform_admin'
  )),
  description text not null,
  created_at timestamptz not null default now()
);
insert into public.platform_roles(role_name, description) values
  ('citizen','Authenticated platform participant'),
  ('committee_member','Active committee participant'),
  ('committee_reviewer','Committee report reviewer'),
  ('committee_admin','Committee membership administrator'),
  ('platform_auditor','Read-only security auditor'),
  ('platform_admin','Platform security administrator')
on conflict (role_name) do nothing;

create table if not exists public.user_platform_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role_name text not null references public.platform_roles(role_name),
  granted_by uuid not null references auth.users(id),
  granted_at timestamptz not null default now(),
  valid_until timestamptz,
  revoked_at timestamptz,
  revoked_by uuid references auth.users(id),
  primary key (user_id, role_name),
  check (valid_until is null or valid_until > granted_at),
  check ((revoked_at is null and revoked_by is null) or (revoked_at is not null and revoked_by is not null)),
  check (user_id <> granted_by)
);

create table if not exists public.committee_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id smallint not null check (module_id between 1 and 30),
  membership_role text not null check (membership_role in ('member','reviewer','admin')),
  status text not null default 'pending' check (status in ('pending','active','suspended','revoked','expired')),
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_by uuid not null references auth.users(id),
  revoked_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_until is null or valid_until > valid_from),
  check (user_id <> created_by)
);
create unique index if not exists committee_memberships_one_active_idx
  on public.committee_memberships(user_id, module_id, membership_role)
  where status = 'active';

create table if not exists public.committee_member_conflicts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id smallint not null check (module_id between 1 and 30),
  proposal_id uuid,
  status text not null check (status in ('active','cleared')),
  reason_code text not null,
  recorded_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  cleared_at timestamptz,
  check (user_id <> recorded_by),
  check ((status = 'active' and cleared_at is null) or (status = 'cleared' and cleared_at is not null))
);

create table if not exists public.civic_processes (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete restrict,
  legacy_actor_hash text,
  process_type text not null,
  title text,
  status text not null default 'draft' check (status in ('draft','submitted','under_review','resolved','rejected','closed')),
  state_version bigint not null default 1 check (state_version > 0),
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_user_id, idempotency_key)
);

create table if not exists public.process_events (
  id uuid primary key default gen_random_uuid(),
  process_id uuid not null references public.civic_processes(id) on delete restrict,
  actor_user_id uuid references auth.users(id) on delete restrict,
  event_type text not null check (event_type in ('process_created','citizen_note_added','state_transitioned','evidence_registered')),
  payload jsonb not null default '{}'::jsonb,
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  unique(process_id, idempotency_key),
  check (jsonb_typeof(payload) = 'object')
);

create table if not exists public.citizen_reports (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete restrict,
  legacy_actor_hash text,
  process_id uuid not null references public.civic_processes(id) on delete restrict,
  title text not null,
  category text not null,
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  unique(owner_user_id, idempotency_key),
  unique(owner_user_id, process_id)
);

create table if not exists public.evidence_pointers (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete restrict,
  process_id uuid not null references public.civic_processes(id) on delete restrict,
  storage_bucket text not null default 'evidence' check (storage_bucket = 'evidence'),
  storage_path text not null unique,
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 52428800),
  mime_type text not null check (mime_type in ('image/jpeg','image/png','application/pdf','audio/mpeg','audio/mp4','video/mp4')),
  review_status text not null default 'pending' check (review_status in ('pending','quarantined','accepted','rejected')),
  created_at timestamptz not null default now(),
  check (storage_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
);

create table if not exists public.committee_proposals (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete restrict,
  user_id uuid references auth.users(id) on delete restrict,
  module_id smallint not null check (module_id between 1 and 30),
  title text not null,
  status text not null default 'draft' check (status in ('draft','active','closed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.committee_proposals add column if not exists owner_user_id uuid references auth.users(id) on delete restrict;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'committee_member_conflicts_proposal_fk') then
    alter table public.committee_member_conflicts
      add constraint committee_member_conflicts_proposal_fk
      foreign key (proposal_id) references public.committee_proposals(id) on delete cascade;
  end if;
end $$;

create table if not exists public.proposal_votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  proposal_id uuid not null references public.committee_proposals(id) on delete restrict,
  choice text not null check (choice in ('for','against','changes','abstain')),
  qualification_attempt_id uuid not null references public.committee_exam_attempts(id) on delete restrict,
  computed_weight numeric(6,4) not null check (computed_weight between 0 and 1),
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, proposal_id),
  unique(user_id, idempotency_key),
  unique(qualification_attempt_id)
);
alter table public.proposal_votes add column if not exists user_id uuid references auth.users(id) on delete restrict;
alter table public.proposal_votes add column if not exists choice text;
alter table public.proposal_votes add column if not exists qualification_attempt_id uuid references public.committee_exam_attempts(id) on delete restrict;
alter table public.proposal_votes add column if not exists computed_weight numeric(6,4);
alter table public.proposal_votes add column if not exists idempotency_key uuid;
create unique index if not exists proposal_votes_user_proposal_secure_idx on public.proposal_votes(user_id,proposal_id) where user_id is not null;
create unique index if not exists proposal_votes_attempt_secure_idx on public.proposal_votes(qualification_attempt_id) where qualification_attempt_id is not null;
create unique index if not exists proposal_votes_idempotency_secure_idx on public.proposal_votes(user_id,idempotency_key) where idempotency_key is not null;

create table if not exists public.committee_reports (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.committee_proposals(id) on delete restrict,
  module_id smallint not null check (module_id between 1 and 30),
  created_by uuid not null references auth.users(id) on delete restrict,
  status text not null default 'draft' check (status in ('draft','under_review','closed')),
  state_version bigint not null default 1,
  consensus_result text,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(proposal_id)
);
alter table public.committee_reports add column if not exists state_version bigint not null default 1;
alter table public.committee_reports add column if not exists consensus_result text;
alter table public.committee_reports add column if not exists closed_at timestamptz;
create unique index if not exists committee_reports_proposal_secure_idx on public.committee_reports(proposal_id);

create table if not exists public.committee_report_observations (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.committee_reports(id) on delete restrict,
  author_user_id uuid not null references auth.users(id) on delete restrict,
  content text not null check (char_length(content) between 20 and 5000),
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  unique(author_user_id, idempotency_key)
);
alter table public.committee_report_observations add column if not exists author_user_id uuid references auth.users(id) on delete restrict;
alter table public.committee_report_observations add column if not exists idempotency_key uuid;
create unique index if not exists committee_observation_idempotency_secure_idx
  on public.committee_report_observations(author_user_id,idempotency_key) where idempotency_key is not null;

create table if not exists public.committee_technical_votes (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.committee_reports(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  choice text not null check (choice in ('approve','revise','reject')),
  reasoning text not null check (char_length(reasoning) between 20 and 5000),
  computed_weight numeric(6,4) not null default 1 check (computed_weight = 1),
  conflict_declared boolean not null default false,
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  unique(user_id, report_id),
  unique(user_id, idempotency_key)
);
alter table public.committee_technical_votes add column if not exists user_id uuid references auth.users(id) on delete restrict;
alter table public.committee_technical_votes add column if not exists choice text;
alter table public.committee_technical_votes add column if not exists computed_weight numeric(6,4) default 1;
alter table public.committee_technical_votes add column if not exists idempotency_key uuid;
create unique index if not exists technical_votes_user_report_secure_idx on public.committee_technical_votes(user_id,report_id) where user_id is not null;
create unique index if not exists technical_votes_idempotency_secure_idx on public.committee_technical_votes(user_id,idempotency_key) where idempotency_key is not null;

create table if not exists public.committee_quorum_rules (
  id uuid primary key default gen_random_uuid(),
  module_id smallint not null check (module_id between 1 and 30),
  rule_version text not null,
  minimum_votes smallint not null check (minimum_votes >= 2),
  valid_from timestamptz not null,
  valid_until timestamptz,
  enabled boolean not null default false,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique(module_id, rule_version),
  check (valid_until is null or valid_until > valid_from)
);

create table if not exists public.reputation_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  event_type text not null,
  points integer not null check (points between -1000 and 1000 and points <> 0),
  source_type text not null,
  source_id uuid not null,
  rule_version text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete restrict,
  idempotency_key uuid not null unique,
  metadata jsonb not null default '{}'::jsonb,
  unique(user_id, source_type, source_id, rule_version),
  check (jsonb_typeof(metadata) = 'object')
);

create table if not exists public.security_audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete restrict,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  result text not null check (result in ('allowed','denied','error')),
  reason_code text not null,
  request_id uuid,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  check (jsonb_typeof(metadata) = 'object'),
  check (not (metadata ?| array['authorization','token','cookie','password','document']))
);

-- Legacy tables gain nullable ownership only. NULL historical rows remain inaccessible.
do $$ begin
  if to_regclass('public.append_only_event') is not null then
    execute 'alter table public.append_only_event add column if not exists owner_user_id uuid references auth.users(id) on delete restrict';
  end if;
  if to_regclass('public.citizen_report_index') is not null then
    execute 'alter table public.citizen_report_index add column if not exists owner_user_id uuid references auth.users(id) on delete restrict';
  end if;
  if to_regclass('public.committee_applications') is not null then
    execute 'alter table public.committee_applications add column if not exists owner_user_id uuid references auth.users(id) on delete restrict';
  end if;
end $$;
