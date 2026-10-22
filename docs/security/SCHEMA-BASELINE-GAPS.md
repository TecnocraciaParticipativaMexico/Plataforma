# Historical schema dependency inventory

This inventory originally separated versioned objects from code references. An authorized read-only remote preflight on 2026-08-18 subsequently confirmed the historical shapes summarized in `REMOTE-SUPABASE-PREFLIGHT.md`; no row content or personal data was read.

Classification:

- **A**: created by the current versioned migrations.
- **B**: created by an earlier versioned migration.
- **C**: referenced by code but absent from versioned DDL.
- **D**: optional and guarded by an existence check.
- **E**: blocking for a clean migration run.

## Blocking baseline

| Object | Class | Exact references | Finding |
|---|---|---|---|
| `public.committee_applications` table | C, E | `web/supabase/migrations/20260730000000_committee_exam_attempts.sql:21,42,47,175-203`; `web/app/api/comites/solicitudes/route.ts:8-11` | The first migration references the table before any versioned migration creates it. A clean reset must fail unless a historical baseline precedes it. |
| `committee_applications.id` | C, E | exam migration `:21,47,205` | Required as UUID primary/unique identity by two foreign-key directions. |
| Application payload columns | C, E | exam migration `:175-203`; solicitudes route `:8-11,35-48` | Names and primitive types are derivable; historical constraints, triggers, defaults and policies are not. |

The local-only fixture at `web/supabase/tests/fixtures/historical_baseline.sql` is now a sanitized synthetic reconstruction of the confirmed shapes and aggregate conflict counts. It is not a remote dump, contains no production rows and must never be applied remotely.

## Versioned Phase 2 objects

| Objects | Class | Exact definition |
|---|---|---|
| `committee_exam_attempts`, its indexes, RLS and two exam RPCs | B | `web/supabase/migrations/20260730000000_committee_exam_attempts.sql:3-222` |
| `profiles`, platform roles/grants, memberships and conflicts | A | `20260805000100_security_core_schema.sql:5-73` |
| Civic processes, events, citizen reports and evidence pointers | A | same migration `:75-126` |
| Proposals, citizen votes, reports, observations and technical votes | A | same migration `:128-220` |
| Quorum rules, reputation events and security audit events | A | same migration `:222-266` |
| Private authorization helpers, RLS policies and `evidence` bucket | A | `20260805000200_security_rls_and_storage.sql:2-191` |
| Transactional process, evidence, voting and report RPCs | A | `20260805000300_security_transactional_rpcs.sql:2-301` |

## Optional historical compatibility objects

| Object | Class | Exact references | Behavior |
|---|---|---|---|
| `public.append_only_event` | C, D | core migration `:269-271`; RLS migration `:148-150`; `web/lib/security/processOwnership.ts:8`; process routes | `owner_user_id` and deny-by-default RLS are applied only when the table exists. No ownership policy is added. |
| `public.citizen_report_index` | C, D | core migration `:272-274`; RLS migration `:152-154`; citizen report API `:12,32` | Same closed historical behavior. |
| `committee_applications.owner_user_id` | A-on-C, D | core migration `:275-277`; RLS migration `:108-109` | Added only when the historical table exists; no inferred backfill. |

## Code-only objects not needed to compile Phase 2

| Object | Class | Exact references | Status |
|---|---|---|---|
| `public.civic_reputation` | C | `web/app/api/reputacion/route.ts:11` | No versioned DDL; the mutating route remains contained with 503. Not used by Phase 2 migrations. |
| `create_process_with_event` | C | `web/app/api/process/create/route.ts:13` | Legacy RPC absent from migrations; Phase 2 introduces `create_civic_process` but does not reactivate/integrate the route. |
| `add_process_event` | C | `web/app/api/process/[processId]/event/route.ts:23` | Legacy RPC absent; not required by migrations. |
| `verify_chain_integrity_for_process` | C | `web/app/api/process/[processId]/verify/route.ts:11` | Legacy RPC absent; not required by migrations. |

## Platform-provided dependencies

| Object | Class | Use |
|---|---|---|
| `auth.users`, `auth.uid()` | Supabase platform | Foreign keys and authenticated identity throughout all migrations. |
| `anon`, `authenticated`, `service_role` | Supabase platform | Grants, revokes and test role switching. |
| `storage.buckets`, `storage.objects` | Supabase Storage platform | Private bucket configuration and object RLS. |
| `extensions.pgtap` | Local Supabase test image | SQL authorization and catalog tests. |
| `gen_random_uuid`, `hashtextextended` | PostgreSQL/Supabase platform | Identifiers and exam concurrency lock. No repository migration explicitly enables a provider extension. |

## Unknowns that a local fixture cannot resolve

- Exact deployed column types, nullability, defaults, constraints, indexes, policies and triggers on every class C object.
- Whether remotely existing Phase 2-named tables have type-compatible columns. `CREATE TABLE IF NOT EXISTS` does not reconcile an incompatible existing table.
- Function signatures or policies that may already use the same names remotely.
- PostgreSQL major version of the remote project; local config uses the CLI default PostgreSQL 17 and makes no compatibility claim.
- Existing `storage.objects` policies that could combine permissively with the new policies.

These are blockers to claiming remote compatibility. The safe next input is a reviewed, secret-free historical schema export supplied through an approved process—not an automatic remote pull from this task.
