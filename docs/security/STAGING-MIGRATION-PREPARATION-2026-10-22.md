# Staging security migration preparation — 2026-10-22

Status: **READ-ONLY PREPARATION COMPLETE — NO REMOTE MIGRATION PENDING**

Target reviewed: `TecnocraciaParticipativaMexico-Staging`
(`jlbcgmgkmpiwrstkwcer`). Production was not accessed or modified. This report
does not authorize a remote migration, merge, deployment, permission change, or
paid resource.

## 1. Verified recovery point

The encrypted backup at
`C:\Users\susan\AppData\Local\TPM2030\backups\staging-20261021-224728`
was rechecked without exposing or committing its contents:

- all five retained DPAPI artifact hashes match the signed manifest;
- the restore-verification file hash matches the manifest;
- no plaintext dump or disposable database remains;
- a fresh PostgreSQL 17 restore rehearsal completed successfully on
  `127.0.0.1` and the disposable cluster was removed afterward;
- the restored catalog again matched 23 public tables, 283 columns, 103
  constraints, 47 indexes, 21 public functions, 21 policies, RLS on all 23
  public tables, 3 synthetic Auth users, 8 migration-history rows, and 0
  Storage objects.

This is a tested Staging recovery point. It is not a Production backup and the
local PostgreSQL restore does not reproduce every managed Supabase service.
Hosted `supabase_admin` role-membership semantics remain a documented local
restore limitation; the password-free roles export itself is intact.

## 2. GitHub validation at the reviewed SHA

Commit `b5555150e69f61ed3262778317b5ba412532e1a6` completed
`Security Supabase validation` successfully:

- run: https://github.com/TecnocraciaParticipativaMexico/Plataforma/actions/runs/39690121437;
- 31 authorization/RLS pgTAP assertions;
- 31 catalog/grant pgTAP assertions;
- 25 legacy-bridge pgTAP assertions;
- 30 production-hardening pgTAP assertions;
- exact SQL total: 117/117;
- duplicate-vote concurrency and distributed rate-limit concurrency;
- 22 Phase 3 HTTP authorization tests and 19 Phase 4 HTTP hardening tests;
- Node tests, TypeScript, Next.js build, changed-stack ESLint, diff check,
  sensitive-signature scan, and critical runtime dependency audit.

The workflow rebuilt a disposable Supabase project from the historical fixture
and canonical migrations. It did not link to or access remote Supabase. This is
the forward-migration rehearsal; it complements, but does not replace, the
read-only Staging inventory or an authorized real-environment smoke test.

## 3. Migration history comparison

Staging contains eight migration-history rows. The first is a synthetic
Staging-only baseline-shape fixture. The remaining seven correspond to every
canonical migration in this PR.

| Remote order and recorded name | Canonical repository file | Result |
| --- | --- | --- |
| `staging_committee_applications_production_shape` | none | Staging-only fixture; never promote |
| `committee_exam_attempts` | `20260730000000_committee_exam_attempts.sql` | normalized SQL hash matches |
| `legacy_security_bridge` | `20260804000000_legacy_security_bridge.sql` | canonical content matches |
| `security_core_schema` | `20260805000100_security_core_schema.sql` | canonical content matches |
| `security_rls_and_storage` | `20260805000200_security_rls_and_storage.sql` | canonical content matches |
| `security_transactional_rpcs` | `20260805000300_security_transactional_rpcs.sql` | canonical content matches |
| `production_hardening` | `20260818174804_production_hardening.sql` | canonical content matches |
| `revoke_legacy_direct_writes` | `20260914195151_revoke_legacy_direct_writes.sql` | canonical content matches |

The management API recorded execution timestamps rather than repository
timestamps for six security migrations. Comparison therefore used migration
name, order, canonicalized statement bytes and SHA-256, not timestamp alone.
Line-ending normalization accounts for CRLF/LF representation; no substantive
SQL difference was found.

**Pending migrations on Staging: zero.** Reapplying any of these files would be
incorrect and would not model the migration runner, which applies only missing
history entries. No `db push`, `migration repair`, linked reset, DDL, DML, grant,
or policy operation was executed.

## 4. Read-only catalog and security comparison

The live read-only catalog is consistent with the reviewed migration and test
expectations:

- 23/23 public tables have RLS; 21 public policies exist.
- Six tables intentionally have RLS and no policy, so browser roles remain
  fail-closed: `append_only_event`, `citizen_report_index`, `civic_reputation`,
  `committee_exam_attempts`, `committee_quorum_rules`, and
  `committee_report_events`.
- The intended authenticated `INSERT` grant on `civic_processes` remains paired
  with its owner-only insert policy. The hardening migration's target legacy
  write grants on `civic_reputation` and `committee_report_events` are absent.
- There are 21 public `SECURITY DEFINER` functions. Thirteen are intentionally
  executable by `authenticated`, none by `anon`; two non-exposed `private`
  authorization helpers are also executable by `authenticated` for policy
  evaluation. All 26 reviewed definer functions across `public` and `private`
  have a fixed `search_path`.
- The three inherited RPCs `create_process_with_event`, `add_process_event`,
  and `verify_chain_integrity_for_process` remain present for compatibility but
  are not executable by `PUBLIC`, `anon`, or `authenticated`.
- The `evidence` bucket exists, is private, has no browser object policies, and
  contains 0 objects/0 bytes. Upload and download use guarded server/RPC flows.

No schema, grant, role, RPC, RLS, policy, or Storage drift requiring a migration
was identified. Application handlers at the reviewed SHA call the expected
guarded RPC signatures; direct reads remain governed by the tested RLS model.
The successful Node, typecheck, build, lint, HTTP and database suites are the
compatibility evidence for existing modules.

## 5. Residual risks

The current Supabase security advisors still report:

1. six informational `RLS enabled/no policy` findings for the intentional
   fail-closed tables above;
2. thirteen warnings for reviewed authenticated public `SECURITY DEFINER`
   RPCs. These are privileged entry points by design and remain high-impact if
   their internal authorization regresses;
3. leaked-password protection disabled in Auth.

Additional retained conditions:

- evidence remains quarantined until a real malware scanner exists;
- proposal-creator authority is still undefined, so proposal creation remains
  closed;
- legacy unknown ownership remains `NULL`; `actor_hash` is never identity;
- legacy MIME and ambiguous state values remain preserved and unpromoted;
- CSP still permits limited inline behavior pending nonce/hash adoption;
- rate-limit retention, orphan-evidence cleanup, alert ownership and edge-level
  signed-download validation remain operational work.

The advisor findings must be reviewed, not silenced with permissive policies or
broad grants. Current Supabase guidance confirms that RLS tests should exercise
negative cross-user cases and run transactionally, and that local migration
replay does not replace remote validation:

- https://supabase.com/docs/guides/local-development/testing/overview
- https://supabase.com/docs/guides/local-development/database-migrations
- https://supabase.com/docs/guides/local-development/restoring-downloaded-backup

## 6. Rollback and recovery rehearsal

No rollback is required now because no remote change is pending. Recovery was
nevertheless rehearsed from the encrypted backup and produced exact catalog
parity.

For any future Staging migration:

1. STOP before DDL if target ID, backup hashes, migration history, SQL checksum,
   bucket privacy, or aggregate counts differ.
2. Apply exactly one reviewed migration through a transaction-capable runner;
   never rerun an already-recorded migration or repair history merely to force
   alignment.
3. Validate migration history, schema fingerprint, protected aggregates, RLS,
   grants, RPC execute rights, Storage privacy and smoke tests before proceeding.
4. If the transaction fails, confirm it left no history row or catalog effect
   and stop. Do not improvise a destructive down migration.
5. If a post-commit check fails, contain mutating routes. Prefer a separately
   reviewed forward fix only when data preservation is provable; otherwise
   invoke the recovery decision-maker and restore from the verified backup to
   an approved target.
6. A remote restore must also recreate managed role/configuration semantics and
   revalidate Auth and Storage services. The plain PostgreSQL rehearsal alone
   cannot authorize reopening Staging.

## 7. Exact authorization boundary

There is currently **no migration authorization to request**, because Staging
already contains the complete reviewed migration set and no drift was found.
The safe next action is an authorized, non-mutating Staging smoke-test window,
not a migration replay.

If a future correction produces a new migration, execution requires a separate
human authorization naming all of the following:

- target `TecnocraciaParticipativaMexico-Staging`
  (`jlbcgmgkmpiwrstkwcer`), explicitly excluding Production;
- exact new migration filename, SHA-256 and PR head SHA;
- approved change window and named rollback decision-maker;
- confirmation that the encrypted backup hashes are still valid;
- permission to apply that migration once, followed by the specified
  read-only catalog checks and transactional smoke tests.

That authorization must not include `db reset --linked`, migration-history
repair, seed application, Production access, merge of PR #112/#113, deployment,
or any paid Supabase resource unless separately and explicitly approved.

