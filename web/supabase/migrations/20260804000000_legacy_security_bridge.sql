-- Reconcile the observed legacy production schema before installing the canonical
-- security model. This migration preserves historical values and never treats an
-- actor_hash as an authenticated identity.

alter table if exists public.committee_applications
  add column if not exists owner_user_id uuid references auth.users(id) on delete restrict;

-- user_id is authoritative only when the referenced auth.users row exists.
-- Unknown applications deliberately remain ownerless and fail closed under RLS.
update public.committee_applications as application
set owner_user_id = application.user_id
where application.owner_user_id is null
  and application.user_id is not null
  and exists (select 1 from auth.users as account where account.id = application.user_id);

alter table if exists public.append_only_event
  add column if not exists owner_user_id uuid references auth.users(id) on delete restrict;

alter table if exists public.citizen_report_index
  add column if not exists owner_user_id uuid references auth.users(id) on delete restrict;

alter table if exists public.evidence_pointers
  add column if not exists owner_user_id uuid references auth.users(id) on delete restrict;
alter table if exists public.evidence_pointers
  add column if not exists review_status text;
alter table if exists public.evidence_pointers
  alter column actor_hash drop not null;

-- Existing pointers were never reviewed by the canonical workflow. They remain
-- retained but cannot satisfy the signed-download authorization RPC.
update public.evidence_pointers
set review_status = 'legacy_unverified'
where review_status is null;

alter table if exists public.evidence_pointers
  alter column review_status set default 'pending';
alter table if exists public.evidence_pointers
  alter column review_status set not null;
create unique index if not exists evidence_pointers_storage_path_secure_idx
  on public.evidence_pointers(storage_path);

alter table if exists public.committee_proposals
  add column if not exists owner_user_id uuid references auth.users(id) on delete restrict;
alter table if exists public.committee_proposals
  add column if not exists updated_at timestamptz not null default now();
-- Preserve legacy presentation values, but do not require canonical guarded
-- writes to fabricate fields that are no longer part of the authority model.
alter table if exists public.committee_proposals alter column module_name drop not null;
alter table if exists public.committee_proposals alter column level drop not null;
alter table if exists public.committee_proposals alter column problem drop not null;
alter table if exists public.committee_proposals alter column proposed_solution drop not null;
update public.committee_proposals as proposal
set owner_user_id = proposal.user_id
where proposal.owner_user_id is null
  and proposal.user_id is not null
  and exists (select 1 from auth.users as account where account.id = proposal.user_id);
alter table if exists public.committee_proposals alter column status set default 'draft';

-- Legacy vote columns are retained for historical reads but are not authority.
-- Canonical writes use choice/computed_weight derived by the guarded RPC.
alter table if exists public.proposal_votes add column if not exists choice text;
alter table if exists public.proposal_votes add column if not exists qualification_attempt_id uuid
  references public.committee_exam_attempts(id) on delete restrict;
alter table if exists public.proposal_votes add column if not exists computed_weight numeric(6,4);
alter table if exists public.proposal_votes add column if not exists idempotency_key uuid;
alter table if exists public.proposal_votes add column if not exists updated_at timestamptz not null default now();
alter table if exists public.proposal_votes alter column vote drop not null;
alter table if exists public.proposal_votes alter column comprehension_score drop not null;
alter table if exists public.proposal_votes alter column vote_weight drop not null;

alter table if exists public.committee_reports add column if not exists state_version bigint not null default 1;
alter table if exists public.committee_reports add column if not exists consensus_result text;
alter table if exists public.committee_reports add column if not exists closed_at timestamptz;
alter table if exists public.committee_reports alter column status set default 'draft';

-- actor_hash and observation_type are legacy presentation fields. New authority
-- is author_user_id plus committee membership checked by the RPC.
alter table if exists public.committee_report_observations add column if not exists author_user_id uuid
  references auth.users(id) on delete restrict;
alter table if exists public.committee_report_observations add column if not exists idempotency_key uuid;
alter table if exists public.committee_report_observations alter column actor_hash drop not null;
alter table if exists public.committee_report_observations alter column observation_type drop not null;

-- proposal_id/actor_hash/vote belong to the former proposal-scoped vote model.
-- Canonical technical votes are report-scoped and use user_id/choice.
alter table if exists public.committee_technical_votes add column if not exists user_id uuid
  references auth.users(id) on delete restrict;
alter table if exists public.committee_technical_votes add column if not exists choice text;
alter table if exists public.committee_technical_votes add column if not exists computed_weight numeric(6,4) default 1;
alter table if exists public.committee_technical_votes add column if not exists conflict_declared boolean not null default false;
alter table if exists public.committee_technical_votes add column if not exists idempotency_key uuid;
alter table if exists public.committee_technical_votes alter column proposal_id drop not null;
alter table if exists public.committee_technical_votes alter column actor_hash drop not null;
alter table if exists public.committee_technical_votes alter column vote drop not null;

-- Keep legacy implementations only for server-side compatibility. They must not
-- remain public APIs and must not resolve attacker-controlled objects first.
do $bridge$
declare
  signature text;
begin
  foreach signature in array array[
    'public.create_process_with_event(text,text)',
    'public.add_process_event(text,text,text,jsonb)',
    'public.verify_chain_integrity_for_process(text)'
  ] loop
    if to_regprocedure(signature) is not null then
      execute format('revoke all on function %s from public, anon, authenticated', signature);
      execute format('alter function %s set search_path = pg_catalog, public', signature);
    end if;
  end loop;
end
$bridge$;
