# Final accumulated security review

Review date: 2026-08-18. Current `origin/main`: `960c10afe8a42f6b485928d7a47143b8b4f25b93`. Reviewed stack head before this report: `f5e7225691ff2e728834c5de45f05581e4210adf`.

## Decision

**APTA PARA INTEGRACIÓN CONTROLADA**, subject to the production gates and separate remote-database phase in this document.

### Remote-baseline addendum

The original accumulated release passed its disposable baseline, but the subsequent authorized read-only production preflight found a materially different historical schema. Production therefore requires `20260804000000_legacy_security_bridge.sql` before the four security migrations. The bridge preserves ownerless history, quarantines legacy evidence, reconciles required legacy columns, blocks ambiguous states and removes client execution from three inherited `SECURITY DEFINER` RPCs. See `REMOTE-SUPABASE-PREFLIGHT.md` and `LEGACY-SCHEMA-BRIDGE.md`.

This addendum does not authorize a remote migration or merge. The production gate remains `BACKUP NO VERIFICADO` until an encrypted logical backup has been restored successfully in a disposable environment.

No se identificaron rutas conocidas que permitan reproducir las vulnerabilidades auditadas bajo las pruebas ejecutadas.

This conclusion does not mean that the platform is invulnerable. It means the accumulated Fases 1–4 are internally coherent, are a direct descendant of current `main`, and satisfy the documented tests. No merge, production deployment, Supabase link, remote migration or remote policy change was performed during this review.

## Initial vulnerability model

The audit began with the “Saberes” class of weaknesses: browser-controlled identity, score, progress, weight, final state, approval, membership, quorum or document issuance; horizontal access by replacing a UUID; replay of sensitive operations; public/private-object confusion; and privileged keys reaching the client.

The accumulated controls now derive identity from a verified Bearer token, use ownership RLS or transactional RPCs, compute scores/weights and state transitions on the server, enforce idempotency/version/quorum rules, keep evidence private, and centralize the service key in a `server-only` module.

## Stack integrity

| PR | Branch | Base | Reviewed head | Exclusive commits | State |
|---|---|---|---|---:|---|
| #108 | `codex/security-critical-containment` | `main` | `e6e329662f6f42102babb69d1fe631841426fc74` | 1 | Open Draft |
| #109 | `codex/security-foundation-supabase` | #108 branch | `c751cf8f50a75fb29878c43b75adc72ce757f62f` | 7 | Open Draft |
| #110 | `codex/security-route-reactivation` | #109 branch | `9c4a1d006ba97be60406a1cfe37ec5256de43e10` | 4 | Open Draft |
| #111 | `codex/security-production-hardening` | #110 branch | `f5e7225691ff2e728834c5de45f05581e4210adf` | 7 | Open Draft |

Git ancestry proves `main → #108 → #109 → #110 → #111`. There are no merge commits in the stack, no patch-equivalent duplicate against current `main`, and no unrelated commit was identified. Current `main` is an ancestor of #108, so the local `security/final-main-validation` branch required no conflict resolution.

The accumulated pre-report diff contains 62 files: security HTTP handlers/helpers, four security migrations, local fixtures/tests, disposable CI, dependency lock/configuration, security headers, documentation, and only the UI adjustments necessary to request server-authorized review actions. No `.env`, dump, log, temporary build output, private key or token signature is included.

## Risk matrix

| Risk | Before | Current control | Residual risk |
|---|---|---|---|
| Identity/IDOR | Client identifiers and legacy hashes could reach data operations | Verified Bearer user, client-authority rejection, ownership RLS/RPC | Legacy tables still require careful remote baseline verification |
| Score/weight | Browser could submit comprehension or technical values | Exam graded server-side; vote RPC derives approved attempt and weight | Legacy UI still sends rejected fields on contained paths |
| State/approval | Client could request privileged final values | Explicit action/transition matrices, expected version, role/module checks | Institutional proposal-creator authority is undefined |
| Replay/races | Sensitive operations could repeat | Idempotency keys, unique indexes, row locks and concurrency tests | Retention for idempotency/audit data must be operationalized |
| Quorum | Browser/backend could accept a declared outcome | Closure RPC computes active rule and votes | Quorum configuration remains an administrative prerequisite |
| Evidence | Public/predictable Storage and trusted MIME/hash | Private bucket, opaque name, byte detection, server SHA-256, quarantine, short signed attachment URL | No productive malware scanner yet |
| Integrity chain | Browser-visible state without canonical verification | Trigger-sealed sequence/previous hash and authenticated verification RPC | Hash chain is internal integrity evidence, not legal signature |
| Privileged key | Broad route-local privileged access | One `server-only` client; no `NEXT_PUBLIC_` service key | Server compromise still exposes service credentials |
| Dependency supply chain | 10 audit findings (9 high, 1 low) | Compatible Next/transitive updates and committed lockfile | Advisories can change after review |

## Exact validation results

The successful disposable GitHub Actions run is `32172316350`.

| Suite | Result |
|---|---:|
| Authorization pgTAP | 31/31 |
| Catalog/RLS/grants pgTAP | 15/15 after bridge validation |
| Legacy bridge pgTAP | 25/25 after bridge validation |
| Production-hardening pgTAP | 30/30 |
| SQL total | 101/101 after bridge validation |
| Phase 3 HTTP | 22/22 |
| Phase 4 HTTP | 19/19 |
| Node security tests | 34/34 |
| Duplicate-vote concurrency | Pass |
| Distributed-rate-limit concurrency | Pass: 10 allowed, 10 denied, 20 consumed |
| TypeScript | Pass |
| Production build | Pass |
| Changed-stack lint | Pass |
| `git diff --check` | Pass |
| Sensitive-signature scan | Pass, zero matching files |
| Vercel check | Success |

The final local perspective at the same application/schema head also passed Node 34/34, TypeScript, changed-stack lint, Bash syntax, production build and a fresh npm 11.6.0 audit with 0 critical, 0 high, 0 moderate and 0 low findings. The historical baseline is runner-only and remains under `supabase/tests/fixtures`, not `supabase/migrations`.

## Migration review and later remote inventory

The four new migrations are chronologically ordered, unique and free of test-object dependencies:

1. `20260805000100_security_core_schema.sql` — ownership columns, platform roles, committee memberships/conflicts, civic processes/events/evidence, proposals/votes/reports/quorum/reputation/audit.
2. `20260805000200_security_rls_and_storage.sql` — RLS, explicit grants/revokes, private helper functions, legacy-table closure and private evidence bucket/policies.
3. `20260805000300_security_transactional_rpcs.sql` — audited transactional process, evidence, vote, report and state RPCs.
4. `20260818174804_production_hardening.sql` — atomic distributed limits, event hash chain, server-only evidence pipeline, accepted-only downloads and administrative review.

The repository already contains `20260730000000_committee_exam_attempts.sql`, which precedes them. It and the security migrations depend on real historical tables, especially `committee_applications`, `append_only_event` and `citizen_report_index`, whose complete historical DDL is absent from version control and recorded in `SCHEMA-BASELINE-GAPS.md`. The local fixture models only the minimum missing `committee_applications` shape. Before any remote operation, a read-only schema inventory must prove that the target objects, columns, constraints and types match the documented baseline.

Remote changes required later, in a separate approved phase:

- schema: ownership, roles/memberships/conflicts, process/event/evidence, proposal/vote/report/quorum, reputation/audit and rate-limit objects;
- RLS: enable/force intended row controls and keep unowned historical records closed;
- RPC: deploy fixed-search-path functions with default `PUBLIC` execute revoked and narrow role grants;
- Storage: keep `evidence` private, 10 MiB, JPEG/PNG/PDF only, and remove browser object policies;
- grants: explicitly opt required public tables/RPCs into the Data API because grants and RLS are separate controls;
- rate limiting: deploy private policy/bucket tables and atomic consume RPC, plus later retention;
- evidence: deploy pointer states, prepare/confirm/reject/authorize RPCs and server-only Storage access.

No remote step may run until backup, staging replay, baseline comparison, change window, rollback owner and post-migration authorization tests are approved.

## Service-role review

All runtime uses import `web/lib/supabaseServer.ts`, which is marked `server-only`; the secret is never a `NEXT_PUBLIC_` value.

| Consumer | Operation and justification | Prior boundary |
|---|---|---|
| `lib/security/auth.ts` | `auth.getUser(token)`; canonical token verification | Bearer token required |
| `lib/security/processOwnership.ts` and `api/citizen/reports` | Read legacy creation event and maintain legacy closed index where client grants are intentionally revoked | Verified user plus server comparison to creation actor; client identity rejected |
| `app/lib/comites/examenes/server/attempts.ts` | Create/read/update protected exam state and server-computed result; question keys must not be client-readable | Verified exam user; selected attempt ownership policy; server grading |
| `api/comites/solicitudes` POST | Call inherited service-only RPC that accepts a user ID but verifies attempt ownership/module/result/expiry transactionally | Verified user ID supplied by server, client authority rejected, rate limited |
| evidence upload | Write/remove private Storage object and confirm/reject pointer | Verified owner through user-JWT prepare RPC, byte validation, opaque path |
| evidence download | Create a 300-second attachment signed URL | User-JWT authorize RPC proves owner and accepted state; rate limited/audited |
| `lib/security/securityAudit.ts` | Persist a sanitized rejection after the rejected transaction has rolled back | Actor came from verified token; fixed service-only audit RPC; no secret/document payload |

These operations cannot all be replaced directly by JWT+RLS: legacy tables are deliberately closed, exam question state is privileged, Storage browser policies are removed, and a rejected transaction cannot persist its own denial audit. Any expansion beyond this list blocks integration.

## “Saberes” review conclusions

- `user_id`/`actor_hash`: request bodies are rejected; server code uses the verified user. Legacy storage of `actor_hash = user.id` is compatibility data, not authentication.
- comprehension/technical score and weight: exam grading and RPCs compute them server-side. UI occurrences do not grant authority and contained endpoints reject the fields.
- reputation: direct mutation remains unavailable; only self-read is active.
- state/final result/quorum: RPCs lock rows and apply explicit matrices, expected versions and configured quorum. Direct `StatusChanged` is rejected.
- membership/roles: separate protected tables; no self-assignment or self-review; module separation is tested.
- evidence/document: no public URL API is used; quarantine cannot be signed; accepted evidence is owner-authorized and downloaded as attachment.
- direct `.insert()`/`.update()` calls are confined to justified server-only compatibility/exam operations; active citizen/process/committee mutations use user JWT plus RLS/RPC.

## Functions deliberately closed

- Proposal creation remains `403` because the institution has not selected citizen, committee member, reviewer or administrator as the authoritative creator.
- Direct reputation mutation remains `503` until a server-verifiable source event exists.
- The map remains authenticated and `403` because no safe anonymous projection exists.
- `pending`/`pending_scan` evidence is not downloadable; only `accepted` evidence can be signed.
- Legacy unsafe application mutation remains `410`; administrative review uses the new action RPC.

## Accepted production limitations

- Malware: `queueEvidenceScan` explicitly reports `not_configured`; evidence remains `pending_scan` until a real scanner and promotion workflow are deployed and monitored.
- CSP: `unsafe-inline` remains temporarily for existing Next.js hydration/styles. `unsafe-eval` is absent. Move to nonces/hashes only after UI regression validation.
- Cleanup: schedule and test retention for expired rate buckets, rejected/failed evidence pointers, orphan checks and expired quarantine objects. Do not introduce an unvalidated cron during integration.
- Alerts: add operational thresholds for broken chains, repeated 403s, rate-limit spikes, integrity/hash failures, failed evidence cleanup and anomalous/duplicate vote attempts.
- Baseline: version or independently attest the historical production schema before applying security migrations.

## Recommended integration strategy

Prefer **Strategy B: a consolidated release**. Current `main` is already an ancestor of the complete stack, so a clean release branch can point to the reviewed accumulated head while preserving all 19 security commits. One accumulated PR/diff and one final CI run minimize repeated rebases, stacked-base mistakes, duplicate conflict resolution and partial deployment of HTTP code without its schema.

Do not merge yet. In the integration phase:

1. fetch and freeze the approved `main` SHA;
2. create a clean release branch from that SHA and fast-forward/apply the exact reviewed security commit sequence;
3. verify the accumulated diff matches this review except approved review-document updates;
4. run the full disposable workflow and require success;
5. obtain security/release approval and merge as one auditable unit;
6. deploy application and Supabase changes only through a separately approved, ordered change plan.

Sequential PR merges are possible but higher risk: every squash/rebase changes ancestry, forces four validation cycles and creates intermediate application/schema states. If organizational policy requires Strategy A, merge #108 → #109 → #110 → #111, rebase each next branch onto the new `main`, and require the complete security workflow after every rebase.

## Rollback and production criteria

Application rollback: retain the prior immutable deployment and revert the consolidated merge if authorization regressions appear. Database rollback must be forward-only and rehearsed: take a verified backup, prefer additive migrations, disable new entry points first, and use reviewed compensating migrations for policies/grants/functions. Never make the evidence bucket public as rollback. Preserve audit/event data unless the approved recovery plan explicitly covers it.

Production entry requires: consolidated CI success at the final `main` SHA; remote baseline attestation; backup/restore evidence; staged migration replay; explicit Data API grants plus RLS verification; service-key custody; real evidence scanning or continued quarantine; cleanup/alert ownership; authorization smoke tests with two users and role separation; and a documented rollback decision-maker.
