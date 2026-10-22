# Production security migration runbook

Status: **PLAN ONLY — BACKUP NO VERIFICADO**

Production target: `TecnocraciaParticipativaMexico` (`evxokjcuzpeaoxrfumyh`)

Validated laboratory: `TecnocraciaParticipativaMexico-Staging` (`jlbcgmgkmpiwrstkwcer`)

Release: Draft PR #112, base `main`

This document is an execution plan, not authorization to change Production. It
contains no credentials, personal data, object names, or private URLs. Production
must not receive DDL, migrations, grants, policies, RPC changes, Storage changes,
merge, or deployment until the backup gate and change-window approvals are
recorded.

## 1. Confirmed starting state

Read-only verification on 2026-09-14 identified both projects by ID and name.
Production is healthy and records only
`20260730000000_committee_exam_attempts`; it has not received the security
release. The `evidence` bucket is already private in Production and its 43
objects must remain untouched. PostgreSQL dumps contain Storage metadata, not
the object bytes, so those objects require an independent backup and restore
test.

Staging remains healthy, available, and intentionally migrated. It is a
synthetic compatibility reproduction, not a clone or backup of Production. Its
migration history is:

1. `staging_committee_applications_production_shape` — Staging fixture only;
   never apply to Production.
2. `committee_exam_attempts`.
3. `legacy_security_bridge`.
4. `security_core_schema`.
5. `security_rls_and_storage`.
6. `security_transactional_rpcs`.
7. `production_hardening`.
8. `revoke_legacy_direct_writes`.

The Staging management API assigned execution timestamps different from the
repository filenames. Production must use the canonical repository versions
listed in section 4; migration identity must be verified by name and reviewed
SQL checksum, never inferred from Staging timestamps.

### Staging controls and retained history

- SQL: 117/117 — 31 authorization/RLS, 31 catalog (including the 16 grant
  regressions), 25 bridge, and 30 production-hardening assertions. The prior
  101 assertions and all 16 additions pass.
- RLS: enabled on 23 public tables. There are 21 explicit authenticated
  policies. Six tables intentionally have no policies and remain fail-closed:
  `append_only_event`, `citizen_report_index`, `civic_reputation`,
  `committee_exam_attempts`, `committee_quorum_rules`, and
  `committee_report_events`.
- Policies: self/owner reads and narrowly scoped writes exist for profiles,
  citizen reports, civic processes, applications, proposals, process events,
  evidence pointers, votes, reports, observations, memberships, conflicts,
  roles, reputation events, and auditor-visible audit events. There are no
  browser Storage policies.
- Direct legacy grants: zero `INSERT`, `UPDATE`, `DELETE`, or `TRUNCATE` grants
  to `anon`/`authenticated` on `civic_reputation` and
  `committee_report_events`; their four existing `SELECT` role/table grants are
  preserved.
- Privileged functions: 21 public `SECURITY DEFINER` functions exist. Thirteen
  are deliberately executable by `authenticated`; none by `anon`. The 13
  derive identity from `auth.uid()`, use fixed `search_path`, and enforce
  ownership or role, state, idempotency/version/quorum/rate-limit, and audit
  controls as applicable. The three inherited unsafe RPCs are retained only for
  service compatibility and are revoked from `PUBLIC`, `anon`, and
  `authenticated`.
- Storage: `evidence` exists and is private. Staging has no Storage objects; its
  43 synthetic `evidence_pointers` are metadata-only compatibility fixtures.
- Legacy states: three synthetic proposals remain `En estudio`; two reports
  remain `Dictamen preliminar`. They are not auto-mapped and canonical RPCs do
  not accept them.
- Legacy evidence: all 43 synthetic pointers remain `legacy_unverified`; three
  retain non-allowlisted MIME values in quarantine. None is accepted or
  downloadable.
- Unknown ownership: four applications, all 43 evidence pointers, all 237
  append-only events, and all three citizen-report indexes retain `NULL`
  ownership. `actor_hash` is never treated as identity.
- Remaining security advisors: six informational `RLS enabled/no policy`
  notices for the intentional fail-closed tables; 13 warnings for the reviewed
  authenticated `SECURITY DEFINER` RPCs; and leaked-password protection
  disabled in Auth. These are acknowledged residual items, not reasons to add
  permissive policies.

Do not restore Staging before Production execution and post-release comparison
are complete.

## 2. Roles and decision authority

Assign named people before the window: release commander, database operator,
backup custodian, application operator, security verifier, and rollback
decision-maker. Use two-person confirmation for target project ID, backup gate,
each migration, merge, and rollback. Capture only sanitized timestamps,
checksums, aggregate counts, tool versions, and outcomes in the release record.

## 3. Mandatory backup gate

The gate remains **BACKUP NO VERIFICADO**. Perform this work in a separate,
approved backup session before scheduling migrations:

1. Confirm the connection resolves to Production project
   `evxokjcuzpeaoxrfumyh`, database name, PostgreSQL version, and expected
   aggregate schema inventory. Abort on any mismatch.
2. Use a protected, process-local connection value with Session Pooler or direct
   connection as supported by the current Supabase documentation. Never put the
   URI on a command line, in Git, logs, shell history, or an artifact manifest.
3. Create separate logical outputs for roles, schema, and data using the current
   official Supabase CLI/PostgreSQL 17 clients. Use stop-on-error, no owner
   reassignment, and no remote writes. Record tool versions and exit codes.
4. Encrypt each output immediately and store it outside the repository, CI, and
   the Supabase project. Calculate SHA-256 over the retained encrypted artifacts
   and record size, timestamp, custodian, and retention location.
5. Export all 43 `evidence` objects independently through an authorized
   server-side Storage path without logging object names. Preserve bytes and
   metadata in an encrypted manifest/archive; calculate SHA-256 for the archive
   and object-by-object integrity values inside the encrypted manifest.
6. Restore roles, schema, and data into an isolated disposable PostgreSQL
   17/Supabase-compatible target. It must not share credentials, URLs, or
   Storage with Production or Staging. Restore with stop-on-error; use one
   transaction where supported. Restore Storage objects only to a disposable
   private bucket and never make it public.
7. Compare source and restored target: schemas, tables, columns/types/defaults,
   constraints, indexes, sequences, functions/signatures/owners/search paths,
   triggers, RLS flags, policies, grants, migration history, extensions, and
   aggregate row counts. Compare the Storage object count, aggregate bytes, and
   encrypted integrity manifest without revealing paths.
8. Run read-only integrity queries and the security catalog suite against the
   restored copy. A complete restore with exact aggregate comparisons is
   required; “dump command succeeded” is insufficient.
9. Have the backup custodian and security verifier sign the sanitized evidence.
   Only then change the gate to **BACKUP VERIFICADO**.

**STOP B0:** any missing roles/schema/data artifact, checksum mismatch, restore
error, aggregate mismatch, missing Storage object, byte mismatch, exposed
credential, or target ambiguity keeps the release blocked. Do not migrate.

Supabase documents that database backups exclude Storage object bytes and
recommends regular logical exports for Free-plan projects. See
https://supabase.com/docs/guides/platform/backups.

## 4. Canonical Production migration order

Only files reviewed at the final approved PR SHA may be used. Calculate and
record each file's SHA-256 before the window and re-check it immediately before
execution.

| Order | Canonical repository migration | Production state | Dependency |
|---:|---|---|---|
| 1 | `20260730000000_committee_exam_attempts.sql` | Already applied; verify checksum/catalog, do not rerun | Historical `committee_applications` |
| 2 | `20260804000000_legacy_security_bridge.sql` | Pending | Order 1 and attested legacy baseline |
| 3 | `20260805000100_security_core_schema.sql` | Pending | Bridge compatibility columns/states |
| 4 | `20260805000200_security_rls_and_storage.sql` | Pending | Core schema; existing private `evidence` bucket |
| 5 | `20260805000300_security_transactional_rpcs.sql` | Pending | Core tables, roles, RLS helpers |
| 6 | `20260818174804_production_hardening.sql` | Pending | Transactional RPC surface |
| 7 | `20260914195151_revoke_legacy_direct_writes.sql` | Pending | Hardened schema and legacy tables |

The Staging-only shape migration is excluded. Never mark a pending migration as
applied merely to reconcile history. Before applying order 2, capture the remote
migration list and establish that order 1 is the sole applied repository
migration. If its SQL/catalog effect cannot be attested, stop and reconcile it
without rerunning it.

## 5. Window preparation and execution sequence

Estimated times are planning ranges for the currently small known dataset;
measure database size and rehearse to replace them with approved values.

| Phase | Estimate | Required action and gate |
|---|---:|---|
| Backup/export | 20–45 min | Logical roles/schema/data plus separate encrypted Storage export |
| Disposable restore/compare | 30–60 min | Exact integrity and aggregate comparison; declare backup gate |
| Preflight/freeze | 10–15 min | Final project-ID, baseline, health, locks, connections, checksums; place mutating application routes in approved maintenance/contained mode |
| Six migrations | 20–35 min | Apply exactly one canonical migration at a time; validate and STOP between files |
| DB/security smoke tests | 15–25 min | 117 SQL tests where safe, two-user authorization, RPC/concurrency, advisors, Storage and aggregates |
| Ready/merge/deploy | 10–20 min | Mark #112 Ready only after database approval; controlled merge; observe Vercel Production |
| Post-release observation | 30–60 min | HTTP/security smoke tests, logs/alerts, integrity and aggregate recheck |

Total planned operator window: approximately 2–4 hours, excluding remediation
or restore. Schedule enough time for a full restore; do not compress STOP gates.

Execution procedure after **BACKUP VERIFICADO** and explicit change approval:

1. Record Production health, migration history, schema fingerprint, aggregate
   counts, private bucket metadata, 43-object count/bytes, and active deployment.
2. Freeze or contain mutating routes. Confirm no long-running transactions or
   conflicting DDL locks. Read paths may remain only if the approved window says
   they are safe.
3. Use the pinned Supabase CLI and the reviewed repository checkout. Apply one
   pending canonical file at a time so its repository timestamp is recorded.
   Do not use ad-hoc Dashboard SQL or a tool that substitutes another migration
   version. Never pass credentials as command arguments.
4. After each file, verify migration history contains exactly that version,
   confirm its success checks below, compare protected aggregate counts, and
   obtain two-person go/no-go approval before continuing.
5. After order 7, run the full SQL/catalog/authorization suite in a manner proven
   non-destructive. Any destructive test must run inside an explicit transaction
   with `ROLLBACK`; verify no test users or rows remain.
6. Run two-user/role separation, duplicate-vote concurrency, rate-limit
   concurrency, evidence quarantine/download denial, state transition,
   idempotency, quorum, and inherited-RPC denial smoke tests.
7. Run security advisors. Review differences from Staging; do not add policies
   merely to silence intentional fail-closed notices.
8. Verify `evidence` remains present/private with exactly the pre-window object
   count and aggregate bytes. Do not download content during smoke tests; use a
   controlled known fixture only if separately approved.
9. Verify all public tables' RLS state, policies, grants, function EXECUTE,
   `SECURITY DEFINER` search paths, trigger state, and absence of direct legacy
   writes. Confirm all application/server secrets remain server-side.

**STOP P0:** target ID/name, baseline, checksum, migration history, bucket
privacy/count, or maintenance-mode mismatch. Do not start DDL.

**STOP P1–P6:** after each pending migration, stop on any SQL error, unexpected
catalog delta, row-count decrease, automatic legacy-state mapping, non-null
invented ownership, unexpected grant/policy, missing object, or failed required
test. Do not apply the next file.

**STOP P7:** do not mark the PR Ready while any required test, advisor review,
Storage comparison, or rollback readiness is unresolved.

## 6. Per-migration success, abort, and recovery

None of the migration files contains explicit `BEGIN`/`COMMIT`. Execute each
through a runner proven in rehearsal to wrap that single migration atomically
and stop on the first error. PostgreSQL catalog DDL is transactional, but
external Storage object bytes and application deployments are not. Confirm the
runner's behavior before the window; do not assume it.

| Migration | Success condition | Abort condition | Immediate response |
|---|---|---|---|
| Legacy bridge | Historical row counts preserved; nullable owner columns added; only verified `user_id` matches backfilled; evidence becomes `legacy_unverified`; legacy states unchanged; three inherited RPCs revoked/fixed | Any deletion, invented owner, hash rewrite, MIME rejection of retained rows, state rewrite, or callable inherited RPC | Roll back the migration transaction. Keep writes contained. Compare with backup; restore if any partial effect exists |
| Core schema | Expected ownership/role/process/evidence/vote/report/audit objects, constraints, and indexes exist; no historical loss | Type/constraint conflict, duplicate/index failure, count change, or unexpected privilege | Transaction rollback; preserve diagnostics; correct only in a new reviewed PR/rehearsal |
| RLS and Storage | Expected RLS/grants/policies exist; `evidence` remains private; no object count/byte change; no public object policy | Bucket becomes public, objects change, broad policy/grant, RLS disabled, or policy compilation failure | Roll back metadata transaction if possible; immediately deny application evidence paths. Never make the bucket public as rollback |
| Transactional RPCs | Expected signatures, owners, fixed search paths and exact EXECUTE grants; negative authorization tests pass | `PUBLIC`/`anon` execute, missing `auth.uid()` guard, unsafe state/ownership behavior, or signature conflict | Transaction rollback; keep new routes disabled; do not grant table writes as workaround |
| Production hardening | Rate limits, chain sealing, evidence quarantine/download authorization, review transitions and audits pass catalog/concurrency tests | Chain mismatch, unbounded access, evidence accepted without scanner, quorum/version/idempotency failure, or test residue | Transaction rollback; keep affected routes fail-closed; restore only if rollback/compensation cannot reproduce baseline |
| Revoke legacy direct writes | Zero target write grants for both client roles; SELECT and intended grants on `citizen_reports`, `civic_processes`, and `profiles` unchanged | Any target write grant remains or any unrelated grant changes | Transaction rollback, inspect exact grant origin, correct in reviewed migration; never add direct client writes |

If a single-file transaction fails cleanly, confirm no migration-history entry or
catalog effect remains and stop the window. If a runner commits partially,
external effects diverge, post-commit validation fails, or data integrity is
uncertain, disable mutating application paths and invoke the approved recovery
decision-maker. Prefer a reviewed forward compensating migration only when it
can exactly preserve data. Otherwise restore the verified database and separate
Storage backup into the approved recovery target, re-compare checksums/counts,
and repoint/reopen service only after validation. Never improvise destructive
down migrations.

## 7. Historical-data invariants

Every post-file and final check must prove:

- unknown `owner_user_id` remains `NULL`; no bulk ownership inference occurs;
- `actor_hash` remains historical data and is never converted to identity or an
  authorization credential;
- legacy non-allowlisted MIME metadata is preserved only under
  `legacy_unverified`, remains quarantined, and cannot receive a signed URL;
- `En estudio` and `Dictamen preliminar` remain unchanged until a separate
  human-authorized mapping exists;
- inherited `create_process_with_event`, `add_process_event`, and
  `verify_chain_integrity_for_process` remain non-executable by `PUBLIC`, `anon`,
  and `authenticated`;
- no historical evidence pointer, Storage object, report, vote, event,
  application, or index is deleted or renamed.

## 8. Release, merge, and post-release validation

Only after STOP P7 is cleared may the release manager mark PR #112 Ready. Re-run
required GitHub checks at the exact head SHA, require successful disposable
Supabase CI and Vercel Preview, and confirm the PR is mergeable/clean. Obtain the
separate merge approval, merge once, and observe the automatic Vercel Production
deployment; do not trigger a manual deployment unless the approved release plan
explicitly calls for it.

Post-release checks at the production edge:

- authentication and two-user IDOR denials;
- expected closed routes for proposal creation, reputation mutation, unsafe map,
  legacy application mutation, and unscanned evidence;
- authorized process/application/report/vote flows and duplicate/idempotency
  behavior;
- HTTP Phase 3 and Phase 4 safe smoke subset;
- headers/CORS, sanitized errors, audit events, chain verification and alerts;
- private Storage, unchanged 43-object count/bytes, and no public URL behavior;
- migration history, RLS, policies, grants, RPC signatures/search paths, advisors,
  and protected aggregate counts.

**STOP R1:** if merge checks or Vercel fail, do not expose new routes. If the
application is incompatible but the database is sound, roll the application
back to the prior immutable deployment while keeping the hardened database and
fail-closed routes. If database integrity is uncertain, invoke section 6 recovery.

## 9. Current release decision

- Staging: validated and intentionally retained.
- Production migration history: committee exam migration applied; six security
  migrations pending.
- PR #112: open Draft, base `main`; it must remain unmerged in this phase.
- Backup gate: **BACKUP NO VERIFICADO**.
- Production authorization: **DENIED until BACKUP VERIFICADO and explicit
  change-window approval**.
