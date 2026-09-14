# Phase 4 production hardening

This phase is implemented on `codex/security-production-hardening` and is validated only against disposable local Supabase. It does not link, push to, or otherwise access a remote Supabase project.

## Enabled boundaries

- Distributed rate limiting is stored in `private.rate_limit_buckets` and consumed atomically by `consume_rate_limit`. Policies are fixed server-side per authenticated user, action, optional resource and time window. The API returns `429` and a bounded `Retry-After`; it does not expose counters.
- Evidence upload accepts only JPEG, PNG and PDF, up to 10 MiB. The server verifies extension coherence and magic bytes, calculates SHA-256 over the received bytes, generates an opaque object name, writes through the server-only Storage client and confirms the pointer. Browser Storage policies were removed.
- Evidence enters `pending_scan`. Because no production malware scanner is configured, quarantined content cannot be downloaded or represented as validated. The scanner adapter explicitly reports `not_configured`. A failed Storage/confirmation step removes any written object and marks the pointer rejected.
- Evidence downloads require a user JWT, ownership, an `accepted` pointer, a distributed limit and an audit event. The resulting signed URL expires after 300 seconds and requests attachment disposition. SHA-256 is an integrity checksum, not a digital signature.
- Process events are sealed in a per-process SHA-256 chain with sequence and previous-hash linkage. `verify_process_chain` returns only `valid`, `broken` or `not_verifiable` after ownership or auditor/admin authorization. This proves internal record consistency, not legal identity or electronic signature.
- Application review is enabled only through `review_committee_application`. An active same-module reviewer/admin may request an action; the RPC enforces the transition matrix, expected version, idempotency and no self-review.

## Still blocked

- Committee proposal creation remains `403`. Existing code and institutional documentation do not unambiguously assign proposal-creator authority to citizen, member, reviewer or administrator. No role was invented.
- Reputation mutation remains `503`, the unsafe map remains `403`, and legacy application mutation remains `410` as documented in prior phases.
- Quarantined evidence remains unavailable until an actual scanner promotes it through a separately authorized workflow. This phase does not claim productive antivirus.

## Direct legacy grants

Staging replay found inherited `INSERT`, `UPDATE`, `DELETE` and `TRUNCATE`
grants for `anon` and `authenticated` on `civic_reputation` and
`committee_report_events`. RLS kept both tables fail-closed, but the grants
violated defense in depth. `20260914195151_revoke_legacy_direct_writes.sql`
revokes only those 16 privilege/role/table combinations. It intentionally
preserves `SELECT` and does not change the planned grants on `citizen_reports`,
`civic_processes` or `profiles`.

No authenticated RPC writes either legacy table. Canonical mutations use other
tables through guarded owner-privileged functions, while any compatibility write
must remain server-side through `service_role`.

## Authenticated SECURITY DEFINER matrix

All 13 functions deny `anon`, derive the caller with `auth.uid()`, and fix
`search_path` to `pg_catalog, public, private`. Their residual risk is that an
implementation defect executes with owner privileges; catalog, authorization,
idempotency and state-machine tests therefore remain release gates.

| Function | Why authenticated invokes it | Internal controls | Tables modified | Residual risk |
|---|---|---|---|---|
| `add_civic_process_note` | Owner adds a process note | owner, state, idempotency, audit | `process_events` | privileged event append |
| `add_committee_observation` | authorized committee observation | membership, module, conflict, state, audit | `committee_report_observations` | role/configuration error |
| `authorize_evidence_download` | owner requests accepted evidence | owner/process match, accepted state, rate limit, audit | none | authorization predicate error |
| `cast_citizen_vote` | citizen casts one qualified vote | owner attempt, active proposal, weight calculation, idempotency | `proposal_votes` | qualification calculation error |
| `cast_technical_vote` | committee member votes | membership, conflict, report state, idempotency | `committee_technical_votes` | committee configuration error |
| `close_committee_report` | authorized closure | membership, conflict, version, quorum, audit | `committee_reports` | quorum/configuration error |
| `consume_rate_limit` | guarded endpoints consume quota | caller/action policy, atomic bucket update | `private.rate_limit_buckets` | policy tuning error |
| `create_civic_process` | citizen opens an allowed process | type allowlist, ownership, idempotency, audit | `civic_processes`, `process_events` | type-policy error |
| `create_committee_report` | committee opens a report | membership, proposal state, conflict, audit | `committee_reports` | membership/configuration error |
| `prepare_evidence_upload` | owner reserves an upload | ownership, MIME/size/hash validation, rate limit | `evidence_pointers` | upload/pointer divergence |
| `review_committee_application` | reviewer performs an action | reviewer role, module, no self-review, version, transition matrix | `committee_applications` | reviewer configuration error |
| `transition_civic_process_state` | owner requests allowed transition | ownership, version, transition matrix, idempotency | `civic_processes`, `process_events` | transition-matrix error |
| `verify_process_chain` | owner/auditor verifies integrity | owner or privileged role, bounded result, audit | none | verifier implementation error |

## Intentionally fail-closed tables

| Table | Reason for no policy | Future enabling condition |
|---|---|---|
| `append_only_event` | ownerless MD5-era history | audited ownership reconciliation and read model |
| `citizen_report_index` | ownerless compatibility index | verified owner backfill or server-only retirement |
| `civic_reputation` | no authoritative mutation source | server-verifiable reputation event workflow |
| `committee_exam_attempts` | answers and grading are privileged | remains service-role/RPC only |
| `committee_quorum_rules` | protected administrative configuration | separately authorized administrative workflow |
| `committee_report_events` | superseded ownerless legacy event model | verified migration to the canonical event/audit model |

## Headers, CORS and CSRF

Every Next.js path receives CSP, `nosniff`, strict referrer policy, permissions policy, frame denial and HSTS. CSP allows only the configured Supabase origin and the existing OpenStreetMap/unpkg image/frame resources. It excludes `unsafe-eval`. `unsafe-inline` remains temporarily for Next.js hydration and existing inline styles; reduction requires nonce/hash adoption and a UI regression pass.

Sensitive Route Handlers do not emit permissive CORS headers. They are same-origin by default. Authorization remains an explicit Bearer token verified with Supabase `getUser`; no sensitive handler derives authority from implicit cookies and no mutating operation uses GET. Therefore classic cookie-based CSRF is not the current authority model. Any future cookie session must add origin/token CSRF controls before activation.

## Audit and error model

Sensitive success, denial, conflict, rate-limit, vote, closure, review, evidence and verification paths write sanitized audit events with a correlation UUID. The audit payload excludes tokens, passwords, full documents and unnecessary PII. Transactional RPC audit writes commit or roll back with their state change. Best-effort recording of rejected database calls uses the server-only service client so a rejected transaction cannot erase its own denial event.

Client responses use stable codes such as `AUTH_REQUIRED`, `FORBIDDEN`, `RATE_LIMITED`, `CONFLICT`, `INVALID_STATE`, `QUORUM_NOT_MET` and `EVIDENCE_NOT_READY`; PostgreSQL/Supabase messages and stack traces are not returned by these sensitive routes.

## Validation and residual production work

CI recreates the historical fixture plus all versioned migrations in disposable Supabase, exercises 75 SQL assertions, 22 Phase 3 HTTP tests, 19 Phase 4 HTTP tests, concurrent voting and concurrent distributed limiting, Storage, Node tests, TypeScript, build, changed-file lint, diff checks and secret signatures, then stops Supabase without backup.

Before production integration: deploy and monitor a real malware scanner; define who may create proposals; replace CSP inline allowances with nonces/hashes; establish retention/cleanup for rate buckets and rejected/orphan evidence; alert on chain failures and significant denials; and validate headers and signed-download behavior at the production edge. No Phase 4 migration has been applied remotely.
