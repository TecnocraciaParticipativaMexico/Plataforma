-- Módulo 07: additive, deny-by-default foundation. Never apply remotely without approval.
-- Requires the complete security release #112 and its verified auth/role contracts.
-- This migration enables no API writes or productive voting/publication RPCs.
do $$ begin
  if to_regprocedure('private.has_platform_role(text[])') is null
     or to_regprocedure('private.has_committee_membership(integer,text[])') is null then
    raise exception 'MODULE07_REQUIRES_VERIFIED_SECURITY_RELEASE_112';
  end if;
end $$;

create table public.tai_cases (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete restrict,
  court text not null check (court in ('Constitucional','Electoral','Administrativo y de Política Pública')),
  phase text not null default 'draft' check (phase in ('draft','admissibility','individual_analysis','cross_review','deliberation','human_publication_review','published')),
  state_version bigint not null default 1 check (state_version > 0),
  created_at timestamptz not null default now()
);
create table public.tai_versions (
  case_id uuid not null references public.tai_cases(id) on delete restrict,
  version bigint not null check (version > 0),
  payload jsonb not null check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 100000),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{64}$'),
  previous_hash text check (previous_hash is null or previous_hash ~ '^[0-9a-f]{64}$'),
  actor_user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  primary key (case_id,version),
  check ((version = 1 and previous_hash is null) or (version > 1 and previous_hash is not null))
);
create table public.tai_experts (
  user_id uuid primary key references auth.users(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending','accredited','suspended')),
  specialties text[] not null check (cardinality(specialties) between 1 and 3 and specialties <@ array['Constitucional','Electoral','Administrativo y de Política Pública']::text[]),
  ethics_accepted_at timestamptz,
  accredited_by uuid references auth.users(id),
  valid_until timestamptz,
  check (accredited_by is null or accredited_by <> user_id),
  check (status <> 'accredited' or (accredited_by is not null and ethics_accepted_at is not null and valid_until is not null))
);
create table public.tai_conflicts (
  case_id uuid not null references public.tai_cases(id),
  user_id uuid not null references public.tai_experts(user_id),
  status text not null check (status in ('clear','declared','recused')),
  declared_at timestamptz not null default now(),
  reviewed_by uuid not null references auth.users(id),
  primary key (case_id,user_id),
  check (reviewed_by <> user_id)
);
create table public.tai_panels (
  case_id uuid not null references public.tai_cases(id),
  version bigint not null check (version > 0),
  mode text not null check (mode in ('standard','reinforced')),
  member_count integer not null,
  threshold_percent integer not null check (threshold_percent between 60 and 70),
  cross_review boolean not null default false,
  double_method_validation boolean not null default false,
  configured_at timestamptz not null,
  deliberation_starts_at timestamptz not null,
  primary key(case_id,version),
  check (configured_at < deliberation_starts_at),
  check ((mode = 'standard' and member_count between 9 and 15)
    or (mode = 'reinforced' and member_count between 5 and 7 and cross_review and double_method_validation))
);
create table public.tai_assignments (
  case_id uuid not null,
  panel_version bigint not null,
  user_id uuid not null references public.tai_experts(user_id),
  kind text not null check (kind in ('member','alternate')),
  technical_weight numeric(3,2) not null default 1 check (technical_weight between 0.8 and 1.2),
  valid_until timestamptz not null,
  revoked_at timestamptz,
  primary key (case_id,panel_version,user_id),
  foreign key (case_id,panel_version) references public.tai_panels(case_id,version),
  foreign key (case_id,user_id) references public.tai_conflicts(case_id,user_id)
);
create table public.tai_technical_votes (
  case_id uuid not null,
  panel_version bigint not null,
  user_id uuid not null,
  position text not null check (position in ('consistent','strong_inconsistency','abstain')),
  opinion text not null check (opinion in ('majority','concurrent','dissent')),
  reasoning text not null check (char_length(reasoning) between 80 and 12000),
  sources jsonb not null check (jsonb_typeof(sources) = 'array' and jsonb_array_length(sources) between 1 and 20),
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  primary key (case_id,panel_version,user_id),
  unique (user_id,idempotency_key),
  foreign key (case_id,panel_version,user_id) references public.tai_assignments(case_id,panel_version,user_id)
);
create table public.tai_priorities (
  case_id uuid not null references public.tai_cases(id),
  user_id uuid not null references auth.users(id),
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  primary key(case_id,user_id),
  unique(user_id,idempotency_key)
);
create table public.tai_audit_events (
  case_id uuid not null references public.tai_cases(id),
  sequence bigint not null check (sequence > 0),
  actor_user_id uuid not null references auth.users(id),
  action text not null check (action in ('case_created','version_saved','expert_assigned','conflict_reviewed','vote_recorded','priority_recorded','human_review','publication')),
  request_id uuid not null,
  event_hash text not null check (event_hash ~ '^[0-9a-f]{64}$'),
  previous_hash text check (previous_hash is null or previous_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now(),
  primary key (case_id,sequence),
  unique(case_id,request_id)
);
create index tai_cases_owner_idx on public.tai_cases(owner_user_id);
create index tai_assignments_user_case_idx on public.tai_assignments(user_id,case_id) where revoked_at is null;

do $$ declare t text; begin
  foreach t in array array['tai_cases','tai_versions','tai_experts','tai_conflicts','tai_panels','tai_assignments','tai_technical_votes','tai_priorities','tai_audit_events'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('alter table public.%I force row level security', t);
    execute format('revoke all on public.%I from public, anon, authenticated, service_role', t);
  end loop;
end $$;
-- Policies are prepared but no SELECT or write grants are activated.
create policy tai_assignment_self on public.tai_assignments for select to authenticated
  using (user_id = (select auth.uid()) and revoked_at is null and valid_until > now()
    and private.has_committee_membership(7));
create policy tai_case_owner_or_assigned on public.tai_cases for select to authenticated
  using (owner_user_id = (select auth.uid()) or exists (select 1 from public.tai_assignments a where a.case_id = id and a.user_id = (select auth.uid()) and a.revoked_at is null and a.valid_until > now()));
create policy tai_version_case_access on public.tai_versions for select to authenticated
  using (exists (select 1 from public.tai_cases c where c.id = case_id));
create policy tai_expert_self on public.tai_experts for select to authenticated using (user_id = (select auth.uid()));
create policy tai_conflict_self on public.tai_conflicts for select to authenticated using (user_id = (select auth.uid()));
create policy tai_panel_case_access on public.tai_panels for select to authenticated using (exists (select 1 from public.tai_cases c where c.id = case_id));
create policy tai_vote_case_access on public.tai_technical_votes for select to authenticated using (exists (select 1 from public.tai_cases c where c.id = case_id));
create policy tai_priority_self on public.tai_priorities for select to authenticated using (user_id = (select auth.uid()));
create policy tai_audit_verified_auditor on public.tai_audit_events for select to authenticated using (private.has_platform_role(array['platform_auditor']::text[]));
-- No permissive INSERT/UPDATE/DELETE policies, no SECURITY DEFINER functions,
-- no public projection of case payloads, and no Storage bucket in this phase.
-- Future RPCs MUST derive auth.uid(), lock cases FOR UPDATE, enforce expected_version,
-- validate accreditation/conflicts/rotation and panel size against actual assignments,
-- compute hashes and votes server-side, consume distributed rate limit and append audit
-- atomically. These APIs are intentionally not granted or implemented by this foundation.
