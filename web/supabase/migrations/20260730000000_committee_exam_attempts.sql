-- Aplicar manualmente en Supabase antes de habilitar el flujo.
-- No contiene operaciones destructivas.
create table if not exists public.committee_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id smallint not null check (module_id between 1 and 30),
  bank_version text not null,
  status text not null check (status in ('started', 'submitted', 'expired')),
  created_at timestamptz not null default now(),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  expires_at timestamptz not null,
  score smallint check (score between 0 and 10),
  ethics_score smallint check (ethics_score between 0 and 5),
  technical_score smallint check (technical_score between 0 and 5),
  approved boolean,
  question_selection jsonb not null,
  option_order jsonb not null,
  responses jsonb,
  attempt_number integer not null check (attempt_number > 0),
  application_id uuid references public.committee_applications(id),
  constraint submitted_attempt_has_result check (
    status <> 'submitted'
    or (submitted_at is not null and score is not null and approved is not null)
  )
);

create index if not exists committee_exam_attempts_user_module_created_idx
  on public.committee_exam_attempts (user_id, module_id, created_at desc);

create unique index if not exists committee_exam_attempts_application_unique_idx
  on public.committee_exam_attempts (application_id)
  where application_id is not null;

alter table public.committee_exam_attempts enable row level security;

-- El backend usa service_role y valida la sesión del usuario antes de cada operación.
-- No se concede acceso directo al cliente sobre intentos ni respuestas.
revoke all on public.committee_exam_attempts from anon, authenticated;

alter table public.committee_applications
  add column if not exists exam_attempt_id uuid
  references public.committee_exam_attempts(id);

create unique index if not exists committee_applications_exam_attempt_unique_idx
  on public.committee_applications (exam_attempt_id)
  where exam_attempt_id is not null;
