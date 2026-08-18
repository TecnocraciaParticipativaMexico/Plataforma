# Legacy schema security bridge

Date: 2026-08-18. This document describes the compatibility layer required by the read-only remote preflight. It contains no citizen data, remote object identifiers, credentials or connection strings.

## Purpose and order

`20260804000000_legacy_security_bridge.sql` runs after the already-applied committee exam migration and before the canonical security schema:

1. `20260730000000_committee_exam_attempts.sql`
2. `20260804000000_legacy_security_bridge.sql`
3. `20260805000100_security_core_schema.sql`
4. `20260805000200_security_rls_and_storage.sql`
5. `20260805000300_security_transactional_rpcs.sql`
6. `20260818174804_production_hardening.sql`

The bridge is additive and preservation-oriented. It does not delete rows, rewrite hashes, infer identity from `actor_hash`, normalize ambiguous states, create the Storage bucket or make legacy evidence downloadable.

## Reconciliation matrix

| Table | Confirmed legacy condition | Bridge decision |
|---|---|---|
| `committee_applications` | 7 rows; 3 `user_id` values match real `auth.users`; 4 lack `user_id` | Add nullable `owner_user_id`. Backfill only when the same `user_id` currently exists in `auth.users`; four remain `NULL`. No claim-by-ID policy or direct update grant. |
| `append_only_event` | 237 ownerless events and an independent MD5-era chain | Add nullable `owner_user_id`; no backfill and no hash rewrite. Table remains without a citizen policy. Historical validity is not asserted by the new SHA-256 chain verifier. |
| `citizen_report_index` | 3 ownerless indexes | Add nullable `owner_user_id`; no backfill. Table remains closed to client roles. |
| `evidence_pointers` | 43 pointers, no owner/review state; 3 MIME values outside the new allowlist | Add nullable owner; mark pre-existing rows `legacy_unverified`; set future default to `pending`; relax only legacy `actor_hash` authority. Conditional MIME constraint permits the isolated historical rows but rejects any new non-allowlisted MIME. Download RPC continues to require `accepted`. |
| `committee_proposals` | 3 rows in ambiguous `En estudio` state | Add/backfill owner only through a matching `auth.users` row and add `updated_at`. Preserve state; change only the default for future rows to `draft`. New voting RPC requires `active`, so legacy rows cannot transition silently. |
| `proposal_votes` | Legacy `vote`, `comprehension_score`, `vote_weight` are `NOT NULL`; 1/2 rows lacks `user_id` | Preserve fields and values but make the redundant fields nullable. Canonical RPC writes `choice`, qualification attempt and server-computed weight. Unknown historical ownership remains unknown. |
| `committee_reports` | 2 rows in `Dictamen preliminar`; legacy `created_by` values do not match `auth.users` | Preserve status and creator text; add version/closure fields; future default becomes `draft`. Existing ambiguous rows are not accepted by canonical transition RPCs. |
| `committee_report_observations` | `actor_hash` and `observation_type` required by old model | Preserve columns but make them nullable. Canonical authority is `author_user_id` plus committee membership. |
| `committee_technical_votes` | Proposal-scoped `proposal_id`, `actor_hash` and `vote` are required | Preserve them but make them nullable. Canonical votes are report-scoped and use verified `user_id`, `choice`, conflict declaration and server weight. |

## Legacy column classification

| Column | Class | Decision |
|---|---|---|
| `proposal_votes.vote` | B: redundant with canonical `choice` | Retain historical values; nullable for new RPC writes; remove only in a future separately reviewed migration. |
| `proposal_votes.comprehension_score` | B/C: historical score; canonical value derives from a protected exam attempt | Retain historical values; nullable for new writes. Never accept it from the browser. |
| `proposal_votes.vote_weight` | B/C: replaced by server `computed_weight` | Retain historical values; nullable for new writes. |
| `committee_report_observations.actor_hash` | B/E: unauthenticated legacy identity | Retain, nullable, never authorize with it; candidate for future removal. |
| `committee_report_observations.observation_type` | A/D: presentation classification not required by current institutional rule | Retain, nullable. Do not invent a constant classification. |
| `committee_technical_votes.proposal_id` | B/C: derivable through canonical report | Retain, nullable for report-scoped new writes. |
| `committee_technical_votes.actor_hash` | B/E: unauthenticated legacy identity | Retain, nullable, never authorize with it. |
| `committee_technical_votes.vote` | B: replaced by canonical `choice` | Retain historical values; nullable for new writes. |

## State matrix

Only equivalences proven by the current workflow are eligible for canonical writes. No historical row is updated by this bridge.

| Historical value | Canonical value | Decision and justification |
|---|---|---|
| `committee_proposals.En estudio` | None | Ambiguous. Preserve as legacy; canonical vote/report RPCs require `active`, so no privileged transition occurs. |
| `committee_reports.Dictamen preliminar` | None | Ambiguous. Preserve as legacy; observation/vote/close RPCs accept only canonical open states. |
| `committee_applications.Revisión ética` | Same institutional state | Already explicitly supported by the reviewed administrative transition matrix. Preserve unchanged. |
| `committee_applications.Integrada` | Same institutional state | Already explicitly supported as a reviewed terminal/administrative state. Preserve unchanged. |
| `evidence_pointers` with no state | `legacy_unverified` | Safe quarantine classification, not approval. It is excluded from signed downloads and new Storage policies. |

## MIME strategy

The production-hardening constraint is conditional:

- `legacy_unverified` rows may retain their original MIME so history is not falsified or deleted;
- every `pending`, `pending_scan`, `accepted` or `rejected` row must use JPEG, PNG or PDF;
- all future inserts default to `pending`, so an invalid MIME cannot exploit the legacy exception;
- only `accepted` evidence with verified owner/process can receive a signed download path.

`NOT VALID` is not used as a permanent exception. The constraint is fully validated and expresses the intended historical quarantine rule.

## Inherited privileged RPCs

The bridge does not drop the three legacy functions because runtime dependencies may still exist during deployment. Instead it:

- revokes all execution from `PUBLIC`, `anon` and `authenticated`;
- preserves service-only compatibility;
- fixes `search_path` to `pg_catalog, public`;
- adds pgTAP catalog tests for both roles and a direct `StatusChanged` denial test.

Affected signatures:

- `create_process_with_event(text,text)`
- `add_process_event(text,text,text,jsonb)`
- `verify_chain_integrity_for_process(text)`

The release application uses the new authenticated RPC surface. Removal of legacy wrappers is deferred until post-deployment dependency observation confirms zero use.

## Sanitized baseline and tests

`supabase/tests/fixtures/historical_baseline.sql` is a reduced synthetic reconstruction. It contains no remote dump or personal data and models:

- 43 evidence pointers, including 3 incompatible MIME rows;
- 7 applications, including 4 without user identity;
- 237 ownerless legacy events;
- 3 ownerless citizen report indexes;
- legacy `NOT NULL` columns and ambiguous states;
- the three inherited `SECURITY DEFINER` signatures with their pre-bridge grants.

The 25 bridge assertions prove preservation, quarantine, ownership rules, invalid-MIME rejection, RLS closure, ambiguous-state blocking, nullable compatibility columns, fixed search paths and inherited RPC denial. The catalog plan adds an explicit regression assertion, bringing total SQL coverage to 101.

## Backup and controlled migration procedure

The gate remains **BACKUP NO VERIFICADO**. No backup is created by this release.

Before any remote migration:

1. Freeze writes or enter a documented maintenance window.
2. Use the official Supabase CLI from a controlled operator host to create separate role, schema and data dumps. Supply the database URL through protected process state; never echo it or place it in shell history.
3. Encrypt outputs immediately and store them outside the repository and outside GitHub Actions artifacts.
4. Record cryptographic checksums, retention, access owner and timestamp without recording credentials.
5. Inventory/export Storage objects separately; database dumps include only Storage metadata.
6. Restore roles, schema and data into a disposable PostgreSQL 17/Supabase environment using a single-transaction, stop-on-error procedure.
7. Verify migration history, aggregate row counts, constraints, indexes, functions, policies, grants and Storage metadata.
8. Run the full bridge replay and security suite against the restored copy.
9. Declare `BACKUP VERIFICADO` only after the restoration evidence is reviewed.

## Future production sequence

After the backup gate and an approved change window:

1. Keep mutating routes in maintenance/contained mode.
2. Apply the bridge and four unapplied security migrations in chronological order.
3. Run catalog, ownership, evidence, RPC, concurrency and two-user authorization smoke tests immediately.
4. Merge/deploy the application release without a prolonged schema/application mismatch.
5. Keep proposal creation, reputation mutation, unsafe map projection, quarantined evidence downloads and legacy application mutations closed.

## Remaining risks

- Four applications, all legacy events/report indexes and all legacy evidence remain deliberately unreconciled until a human, audited process exists.
- Three MIME-incompatible evidence records remain retained but unusable by the new download flow.
- Ambiguous proposal/report states require institutional review before canonical transition.
- Legacy RPCs remain present for service-only compatibility until dependency retirement; their grants/search path are tested.
- A real encrypted backup and successful restoration are still mandatory before production migration.
