-- LOCAL TEST FIXTURE ONLY. Never copy this file into migrations/ or apply it remotely.
--
-- The repository's first versioned migration depends on committee_applications,
-- but the historical DDL for that table is absent. Every column below is limited
-- to a type that can be derived from the insert/select references cited inline.
-- No production policy, trigger, institutional rule, or historical data is modeled.

create table public.committee_applications (
  id uuid primary key default gen_random_uuid(),
  -- Inferred from 20260730000000_committee_exam_attempts.sql:175-203 and
  -- app/api/comites/solicitudes/route.ts:8-11.
  user_id uuid not null references auth.users(id) on delete cascade,
  actor_hash text,
  module_id smallint not null,
  module_name text not null,
  level text not null,
  municipality text,
  state text,
  participation_type text not null,
  visibility_level text,
  public_name text,
  expertise_area text not null,
  experience_summary text not null,
  motivation text not null,
  conflict_interest text not null,
  curriculum_evidence text,
  ethics_accepted boolean not null,
  is_public_figure boolean not null default false,
  review_status text not null,
  created_at timestamptz not null default now()
);

comment on table public.committee_applications is
  'LOCAL TEST FIXTURE inferred from repository references; not production DDL';
