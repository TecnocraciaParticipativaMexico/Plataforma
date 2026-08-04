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
  constraint attempt_expiry_after_creation check (expires_at > created_at),
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
revoke all on public.committee_exam_attempts from public, anon, authenticated;

alter table public.committee_applications
  add column if not exists exam_attempt_id uuid
  references public.committee_exam_attempts(id);

create unique index if not exists committee_applications_exam_attempt_unique_idx
  on public.committee_applications (exam_attempt_id)
  where exam_attempt_id is not null;

-- Las reglas de reintento se evalúan dentro de la misma transacción que inserta:
-- todos los intentos iniciados cuentan para el máximo móvil de 3 en 24 horas;
-- el enfriamiento de 30 minutos comienza al enviar el último intento reprobado.
create or replace function public.create_committee_exam_attempt(
  p_user_id uuid,
  p_module_id smallint,
  p_bank_version text,
  p_expires_at timestamptz,
  p_question_selection jsonb,
  p_option_order jsonb
)
returns public.committee_exam_attempts
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  recent_count integer;
  latest_failed_at timestamptz;
  next_attempt_number integer;
  created_attempt public.committee_exam_attempts;
begin
  if p_module_id not between 1 and 30 then
    raise exception 'INVALID_MODULE';
  end if;
  if p_expires_at <= now() then
    raise exception 'INVALID_EXPIRY';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(p_user_id::text || ':' || p_module_id::text, 0)
  );

  select count(*), max(attempt_number)
    into recent_count, next_attempt_number
  from public.committee_exam_attempts
  where user_id = p_user_id
    and module_id = p_module_id
    and created_at >= now() - interval '24 hours';

  if recent_count >= 3 then
    raise exception 'ATTEMPT_LIMIT';
  end if;

  select submitted_at
    into latest_failed_at
  from public.committee_exam_attempts
  where user_id = p_user_id
    and module_id = p_module_id
    and status = 'submitted'
    and approved = false
  order by submitted_at desc
  limit 1;

  if latest_failed_at is not null
     and latest_failed_at + interval '30 minutes' > now() then
    raise exception 'RETRY_COOLDOWN';
  end if;

  select coalesce(max(attempt_number), 0) + 1
    into next_attempt_number
  from public.committee_exam_attempts
  where user_id = p_user_id and module_id = p_module_id;

  insert into public.committee_exam_attempts (
    user_id, module_id, bank_version, status, started_at, expires_at,
    question_selection, option_order, attempt_number
  ) values (
    p_user_id, p_module_id, p_bank_version, 'started', now(), p_expires_at,
    p_question_selection, p_option_order, next_attempt_number
  )
  returning * into created_attempt;

  return created_attempt;
end;
$$;

revoke all on function public.create_committee_exam_attempt(
  uuid, smallint, text, timestamptz, jsonb, jsonb
) from public, anon, authenticated;
grant execute on function public.create_committee_exam_attempt(
  uuid, smallint, text, timestamptz, jsonb, jsonb
) to service_role;

-- Inserta la solicitud y consume el intento aprobado en una sola transacción.
create or replace function public.create_committee_application_with_attempt(
  p_user_id uuid,
  p_attempt_id uuid,
  p_module_id smallint,
  p_payload jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  selected_attempt public.committee_exam_attempts;
  created_application_id uuid;
  selected_review_status text;
begin
  select *
    into selected_attempt
  from public.committee_exam_attempts
  where id = p_attempt_id
  for update;

  if not found
     or selected_attempt.user_id <> p_user_id
     or selected_attempt.module_id <> p_module_id
     or selected_attempt.status <> 'submitted'
     or selected_attempt.approved is not true
     or selected_attempt.expires_at <= now() then
    raise exception 'INVALID_APPROVED_ATTEMPT';
  end if;
  if selected_attempt.application_id is not null then
    raise exception 'ATTEMPT_ALREADY_USED';
  end if;

  selected_review_status := case
    when coalesce((p_payload ->> 'is_public_figure')::boolean, false)
      then 'Revisión ética avanzada'
    else 'Revisión ética'
  end;

  insert into public.committee_applications (
    user_id, actor_hash, exam_attempt_id, module_id, module_name, level,
    municipality, state, participation_type, visibility_level, public_name,
    expertise_area, experience_summary, motivation, conflict_interest,
    curriculum_evidence, ethics_accepted, is_public_figure, review_status
  ) values (
    p_user_id,
    p_payload ->> 'actor_hash',
    selected_attempt.id,
    p_module_id,
    p_payload ->> 'module_name',
    p_payload ->> 'level',
    nullif(p_payload ->> 'municipality', ''),
    nullif(p_payload ->> 'state', ''),
    p_payload ->> 'participation_type',
    coalesce(
      nullif(p_payload ->> 'visibility_level', ''),
      p_payload ->> 'participation_type'
    ),
    nullif(p_payload ->> 'public_name', ''),
    p_payload ->> 'expertise_area',
    p_payload ->> 'experience_summary',
    p_payload ->> 'motivation',
    p_payload ->> 'conflict_interest',
    nullif(p_payload ->> 'curriculum_evidence', ''),
    (p_payload ->> 'ethics_accepted')::boolean,
    coalesce((p_payload ->> 'is_public_figure')::boolean, false),
    selected_review_status
  )
  returning id into created_application_id;

  update public.committee_exam_attempts
  set application_id = created_application_id
  where id = selected_attempt.id;

  return jsonb_build_object(
    'application_id', created_application_id,
    'review_status', selected_review_status
  );
end;
$$;

revoke all on function public.create_committee_application_with_attempt(
  uuid, uuid, smallint, jsonb
) from public, anon, authenticated;
grant execute on function public.create_committee_application_with_attempt(
  uuid, uuid, smallint, jsonb
) to service_role;
