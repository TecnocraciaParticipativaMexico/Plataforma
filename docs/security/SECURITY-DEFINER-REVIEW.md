# SECURITY DEFINER review

This is a source review. Runtime owner, ACL and catalog values remain subject to `security_catalog_audit.sql` on disposable local Supabase. With migrations run by the normal local owner, these functions are expected to be owned by the migration role (`postgres`). No function grants `EXECUTE` to `PUBLIC` or `anon` in migration source.

| Function | Definer / fixed search path | Caller | Identity and authorization | Writes / concurrency / result |
|---|---|---|---|---|
| `private.has_platform_role(text[])` | Yes / `pg_catalog, public, private` | Used by policy; function ACL authenticated + service role, but private schema has no client `USAGE` | `auth.uid()`, active nonexpired DB grant | Read-only boolean. Stable. |
| `private.has_committee_membership(integer,text[])` | Yes / same | Used by policy; accepts both legacy integer and canonical smallint module identifiers | `auth.uid()`, module, role, active validity window | Read-only boolean. Stable. |
| `private.write_security_audit(...)` | Yes / same | No client grant | Caller RPC supplies actor already obtained from `auth.uid()` | Inserts one audit event; returns UUID; rejects sensitive metadata keys through table constraint. |
| `public.create_civic_process(...)` | Yes / same | authenticated | Requires `auth.uid()`; ignores client identity | Inserts owned process/event/audit. Unique idempotency; returns process UUID. |
| `public.add_civic_process_note(...)` | Yes / same | authenticated | Owner from locked process must equal `auth.uid()` | `FOR UPDATE`; allowed state; unique event idempotency; returns event UUID. |
| `public.prepare_evidence_upload(...)` | Yes / same | authenticated | Process ownership from DB | Inserts opaque evidence pointer/audit; size, MIME and UUID path constraints; returns pointer/path JSON. |
| `public.transition_civic_process_state(...)` | Yes / same | authenticated | Owner only for draft→submitted; other transitions require stored platform-admin role | `FOR UPDATE` plus expected version and transition matrix; returns new version. |
| `public.cast_citizen_vote(...)` | Yes / same | authenticated | `auth.uid()` must own approved, submitted, unexpired stored attempt for proposal module | DB-computed weight; unique user/proposal, attempt and idempotency constraints arbitrate races; returns vote/weight JSON. |
| `public.create_committee_report(...)` | Yes / same | authenticated | Reviewer/admin membership in proposal module; no active conflict | Active proposal lock/read and unique report/proposal; returns report UUID. |
| `public.add_committee_observation(...)` | Yes / same | authenticated | Same-module membership; no active conflict | Open-report check and idempotent insert; returns observation UUID. |
| `public.cast_technical_vote(...)` | Yes / same | authenticated | Same-module membership; no active conflict | Server weight 1; unique user/report and idempotency; maps uniqueness to `VOTE_CONFLICT`; returns vote UUID. |
| `public.close_committee_report(...)` | Yes / same | authenticated | Committee admin membership for report module | `FOR UPDATE`, expected version, enabled temporal quorum, stored vote count; returns computed consensus. |
| `public.create_committee_exam_attempt(...)` (inherited) | Yes; initially `public, pg_temp`, hardened later to `pg_catalog, public` | service_role only | Accepts `p_user_id`; therefore authorization remains the server caller's responsibility | Advisory transaction lock per user/module; limits/cooldown; returns the full attempt row, including protected question state to service role. |
| `public.create_committee_application_with_attempt(...)` (inherited) | Yes; hardened to `pg_catalog, public` | service_role only | Accepts `p_user_id`, locks attempt and verifies ownership/module/result/expiry | Consumes attempt and inserts application in one transaction; returns application ID/review status. Payload typing errors fail explicitly. |

## Escalation review

- New public entry points all obtain the actor from `auth.uid()` and never accept a user ID.
- Administrative authority comes from private database tables, not `user_metadata` or a client role string.
- Direct client writes are revoked from the tables governed by these functions.
- The two inherited exam functions deliberately remain service-role-only. They accept identity parameters and must not be granted to authenticated users.
- Private helper functions need function-level execution during RLS evaluation, but direct client resolution is blocked because `USAGE` on schema `private` is revoked. The catalog audit checks this separately.
- No generic `EXCEPTION WHEN OTHERS THEN NULL` exists. Integrity and authorization errors remain visible and transactional.

## Runtime checks still required

The catalog audit must confirm actual owner, `prosecdef`, `proconfig` and ACL values after a real reset. Static source review cannot prove catalog state or reveal pre-existing overloads/policies in an unversioned remote baseline.
