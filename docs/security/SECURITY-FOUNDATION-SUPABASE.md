# Supabase security foundation

Phase 2 establishes a reviewable database security model without reactivating the HTTP features disabled by Phase 1. Nothing in these migrations has been applied to a remote project.

## Threat model

The design assumes an attacker can control every browser field, UUID, request order, retry, timestamp, role label, score, MIME declaration, and `actor_hash`. Authentication is necessary but not sufficient: authorization is evaluated against database ownership, active memberships and separately granted platform roles. UUID secrecy and hashes are never authorization mechanisms. Historical records without a verified owner remain inaccessible.

Primary threats addressed:

- BOLA/IDOR across processes, reports, votes, evidence and committee resources.
- Client-selected identity, roles, scores, weights and state transitions.
- Self-assigned privilege or membership.
- Duplicate/replayed writes and concurrent voting/closure.
- RLS bypass caused by privileged server clients or broad grants.
- Public, enumerable or overwriteable evidence objects.
- Mutable reputation and audit totals.

## Inventory and baseline limitation

Before this phase the repository contained one migration only: `20260730000000_committee_exam_attempts.sql`. Application code referenced at least twelve tables, five RPCs and the `evidence` bucket whose original DDL was not versioned. There was no `supabase/config.toml` and no Supabase CLI in the execution environment.

The existing exam migration itself references `committee_applications`, proving it depends on an omitted historical baseline. Consequently a clean `supabase db reset` cannot be claimed until that baseline is pulled and reviewed. These migrations are additive and use nullable ownership for historical compatibility; they never infer ownership from `actor_hash`.

## Migrations

1. `20260805000100_security_core_schema.sql`
   - Profiles, platform roles, role grants and committee memberships.
   - Canonical civic processes/events/reports and evidence metadata.
   - Committee proposals, reports, observations, votes, conflict registry and versioned quorum rules.
   - Append-only reputation and security audit ledgers.
   - Nullable `owner_user_id` additions to known legacy tables when present.
2. `20260805000200_security_rls_and_storage.sql`
   - Private membership/role predicates.
   - RLS and explicit grants/revokes.
   - Private `evidence` bucket and owner-bound object policies.
3. `20260805000300_security_transactional_rpcs.sql`
   - Process creation/notes/transitions, evidence preparation, voting and committee report workflows.
   - Hardened search paths for previously versioned exam RPCs.

## Relationship diagram

```text
auth.users 1--1 profiles
auth.users 1--* user_platform_roles *--1 platform_roles
auth.users 1--* committee_memberships -- module_id
auth.users 1--* committee_member_conflicts -- committee_proposals

auth.users 1--* civic_processes 1--* process_events
                             1--* citizen_reports
                             1--* evidence_pointers 1--1 storage.objects(evidence/name)

auth.users 1--* committee_exam_attempts
auth.users 1--* committee_proposals 1--* proposal_votes
committee_proposals 1--1 committee_reports
committee_reports 1--* committee_report_observations
committee_reports 1--* committee_technical_votes

auth.users 1--* reputation_events
auth.users 1--* security_audit_events (actor only; ledger is not user-writable)
```

## Role matrix

| Role | Scope | Assignment |
|---|---|---|
| citizen | Own profile and owned civic resources | Derived from valid authentication; no privileged row required |
| committee_member | Active module membership; observations and technical votes | Separate membership, granted by another verified authority |
| committee_reviewer | Create/review committee reports | Separate membership |
| committee_admin | Committee administration/closure | Separate membership; no self-approval |
| platform_auditor | Read security audit data | `user_platform_roles`, never user-editable |
| platform_admin | Platform-level transitions and future grants | `user_platform_roles`, never automatic |

Membership is valid only when `status='active'`, `valid_from <= now()` and `valid_until` is null or in the future. An active partial unique index prevents duplicate equivalent memberships. No client role has INSERT/UPDATE/DELETE grants on role, membership, conflict, quorum or audit administration.

## RLS matrix

`SR` means service role bypasses RLS but remains responsible for application authorization. `—` means no policy/grant.

| Table | anon | authenticated owner | committee member | admin/auditor | SR |
|---|---:|---:|---:|---:|---:|
| profiles | — | select/insert/update self | self | self | all |
| platform_roles | — | catalog read | catalog read | catalog read | all |
| user_platform_roles | — | read self | read self | auditor/admin read | all |
| committee_memberships | — | read self | read self | auditor/admin read | all |
| committee_member_conflicts | — | read self | read self | auditor/admin read | all |
| civic_processes | — | select/insert own | own only | RPC transitions | all |
| process_events | — | read own process | own only | future authorized projection | all |
| citizen_reports | — | select/insert own | own only | future authorized projection | all |
| evidence_pointers | — | read own | future authorized read | future authorized read | all |
| committee_applications | — | read own | — | no write policy yet | all |
| committee_exam_attempts | — | RPC only | RPC only | RPC only | all |
| committee_proposals | — | authenticated read | authenticated read | authenticated read | all |
| proposal_votes | — | read own | read own | no broad read | all |
| committee_reports | — | — | active module member read | active module member read | all |
| committee observations | — | — | active module member read | active module member read | all |
| technical votes | — | — | active module member read | active module member read | all |
| quorum rules | — | — | — | no client policy | all |
| reputation_events | — | read own | read own | no broad policy | all |
| security_audit_events | — | — | — | verified auditor/admin read | all |

No sensitive table uses `USING (true)`. The authenticated catalog policy for `platform_roles` is explicitly justified because it contains only fixed role names/descriptions and conveys no grants.

## Transactional RPCs

| RPC | Authorization and integrity |
|---|---|
| `create_civic_process` | `auth.uid()`, owner assigned server-side, owner/idempotency uniqueness, audit |
| `add_civic_process_note` | owner lock, allowed states, per-process idempotency, audit |
| `transition_civic_process_state` | row lock, expected version, explicit transition matrix, owner may only `draft -> submitted`; admin required otherwise |
| `prepare_evidence_upload` | owner check, opaque UUID path, metadata bounds, pre-authorized pointer |
| `cast_citizen_vote` | active proposal, authenticated user's approved/unexpired attempt, server-computed weight, unique user/proposal and attempt |
| `create_committee_report` | active proposal, reviewer/admin membership, no active conflict, one report/proposal |
| `add_committee_observation` | open report, same-module active membership, no active conflict, idempotency |
| `cast_technical_vote` | open report, active same-module membership, no active conflict, server weight, unique user/report |
| `close_committee_report` | report row lock, expected version, committee admin, enabled versioned quorum rule, minimum two votes, audit |

Every new `SECURITY DEFINER` function fixes `search_path`, schema-qualifies tables, checks `auth.uid()`, revokes execution from `PUBLIC`/`anon`/`authenticated`, and then grants only the intended authenticated entry points. The private audit writer is not granted to client roles.

## State matrix

States were derived from the Phase 1 process UI (`Draft`, `Review`, `Published`) and normalized to the safer canonical workflow below. Legacy labels are not accepted by the RPC.

| From | To | Actor |
|---|---|---|
| draft | submitted | owner |
| submitted | under_review | platform_admin |
| under_review | resolved | platform_admin |
| under_review | rejected | platform_admin |
| resolved/rejected | closed | platform_admin |

No direct UPDATE grant exists for process state or ownership.

## Idempotency and concurrency

- Process creation: unique `(owner_user_id, idempotency_key)`.
- Process events: unique `(process_id, idempotency_key)`.
- Citizen votes: unique `(user_id, proposal_id)`, unique qualification attempt and per-user idempotency.
- Technical votes: unique `(user_id, report_id)` and per-user idempotency.
- Report closure and state transitions use `SELECT ... FOR UPDATE` plus optimistic `state_version`.
- PostgreSQL unique indexes, not “check then insert”, arbitrate simultaneous requests.

## Reputation and audit

`reputation_events` is append-only to clients: no INSERT/UPDATE/DELETE policy exists. Points are not accepted by any client RPC in this phase. A source/rule uniqueness constraint prevents duplicate credit and compensation must be a separate negative event with its own versioned source.

`security_audit_events` stores actor, action, resource, result/reason, request ID and limited metadata. A check rejects common secret/content keys. Users cannot insert, edit or delete it; only verified auditor/admin roles can read it.

## Private evidence Storage

The migration forces `evidence.public=false`, a 50 MiB limit and a MIME allowlist. Object names are UUIDs and must have a pre-authorized `evidence_pointers` row owned by `auth.uid()`. Owners may read their own pending/accepted evidence. There is no client UPDATE or DELETE policy, so overwrite and deletion are denied.

MIME policy is not byte validation, antivirus, decompression protection, metadata removal or content moderation. Phase 1 upload remains 503 until a server pipeline verifies bytes, quarantines content, completes/invalidates pointers transactionally and generates short-lived signed URLs after authorization.

## Historical data

- `actor_hash` remains legacy data and is never a credential.
- Known legacy tables receive nullable `owner_user_id` only when present.
- No automatic backfill occurs.
- Rows with null ownership fail owner policies and remain closed until a separately reviewed reconciliation process proves ownership.

## Local validation

Expected commands after restoring a complete baseline and installing/configuring the CLI:

```sh
supabase db reset
supabase test db
npm test
npm run lint
npm run typecheck
npm run build
```

`web/supabase/tests/security_authorization.sql` contains 26 pgTAP assertions covering RLS, ownership, role/membership escalation, audit immutability, vote uniqueness, server weight, foreign attempts, cross-committee access, report closure, private Storage and historical rows.

In the current environment `supabase` and `npm` are unavailable, and the missing historical schema prevents a truthful clean reset. SQL was therefore reviewed statically but not asserted against a running database. Never run these migrations first against production; restore/pull the baseline into version control, reset a disposable local project, run tests and inspect `supabase db diff` and advisors.

## Application state and remaining risks

All Phase 1 403/410/503 controls remain. No HTTP route is reactivated by these migrations. Remaining work includes:

- restore and review the omitted baseline schema/RPC/grants;
- resolve compatibility with columns already present remotely;
- run local migrations, pgTAP and database advisors;
- build evidence scanning/quarantine/signed-URL services;
- design secure administrative grant/revocation workflows;
- define and approve actual quorum rules (none are enabled automatically);
- add event producers for reputation; and
- integrate Phase 3 server routes with these RPCs.

## Rollback

No automatic destructive down migration is supplied. Before remote application, take a schema/data backup and validate in an isolated project. Operational rollback is to revoke EXECUTE on the new public RPCs and keep Phase 1 routes closed. Dropping new tables or columns can destroy future data and requires a separately reviewed migration; historical ownership columns must not be removed casually.
