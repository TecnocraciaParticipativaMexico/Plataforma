# Security route reactivation

Phase 3 reconnects HTTP handlers only where Phase 2 provides an RLS policy or a transactional RPC that remains the authorization boundary. It does not contact or modify remote Supabase environments.

## Reactivated routes

| Route | Operation | Database boundary | Authorization |
|---|---|---|---|
| `/api/process/create` | POST | `create_civic_process` | Authenticated actor, server-derived through `auth.uid()`; idempotent RPC. |
| `/api/process/mine` | POST | RLS on `civic_processes` | Own processes only. |
| `/api/process/[processId]/events` | GET | RLS on `civic_processes` and `process_events` | Process must be visible to the actor. |
| `/api/process/[processId]/event` | POST | `add_civic_process_note` | Owner-only citizen note; direct state events are rejected. |
| `/api/process/[processId]/state` | POST | `transition_civic_process_state` | RPC checks authority, transition matrix, and expected version. |
| `/api/comites/votos` | GET/POST | RLS / `cast_citizen_vote` | Own vote reads; qualification, weight, duplicate and membership rules are server-side. |
| `/api/comites/propuestas` | GET | RLS on `committee_proposals` | Authenticated minimal-column projection. |
| `/api/comites/solicitudes` | GET/POST | RLS / `create_committee_application_with_attempt` | Own reads; POST consumes an authenticated user's approved attempt transactionally. |
| `/api/comites/dictamenes` | GET/POST | RLS / `create_committee_report` | Verifiable committee membership. |
| `/api/comites/dictamenes/observaciones` | GET/POST | RLS / `add_committee_observation` | Report visibility and committee membership. |
| `/api/comites/dictamenes/votos` | GET/POST | RLS / `cast_technical_vote` | Membership, conflict and weight are server-derived. |
| `/comites/dictamenes/cerrar` | POST | `close_committee_report` | Administrative membership, active quorum policy and transactional result. |
| `/api/reputacion` | GET | RLS on `reputation_events` | Authenticated actor's calculated total only. |
| `/api/process/[processId]/evidence/[evidenceId]/download` | GET | RLS on `evidence_pointers` and private Storage | Own visible evidence; returns a signed URL valid for 300 seconds. |

The committee application POST is the sole inherited exception to the user-JWT client preference. It calls only the existing transactional `create_committee_application_with_attempt` RPC through the server-only client because that RPC requires its confirmed `p_user_id`; the handler first validates the Bearer token and supplies only the confirmed user's ID. It does not perform direct table writes.

## Routes still closed

| Route or operation | Status | Reason |
|---|---:|---|
| `/comites/solicitudes` POST/PATCH | 410 | Retired legacy surface. |
| `/api/comites/solicitudes` PATCH | 403 | No administrative review RPC and explicit role boundary. |
| `/api/comites/propuestas` POST | 403 | Proposal-creation authority is not defined. |
| `/api/process/[processId]/verify` | 503 | No canonical verification RPC. |
| `/api/process/[processId]/evidence/upload` | 503 | No complete byte validation, quarantine and compensating rollback flow. |
| `/api/reputacion` POST | 503 | No server-verifiable source event is supplied by this route. |
| `/api/mapa/reportes` | 403 | No explicitly public, anonymous aggregate projection. |

## Request authority and errors

Handlers reject client-supplied `user_id`, `userId`, `actor_hash`, `role`, `voter_type`, scores, weights, reputation values, quorum, final results/status, and chain hashes with HTTP 400. Identity comes from a validated Bearer token and database authorization comes from RLS or the named RPC.

Safe response mapping is: 400 malformed or client authority; 401 missing/invalid authentication; 403 authorization failure; 404 absent or invisible resource; 409 duplicate, idempotency or version conflict; 422 unmet active quorum; 429 reserved for the deployed rate-limit boundary; and 503 unavailable secure infrastructure or unclassified database failure. SQL messages, policies and stack traces are not returned.

## Rate limiting

Sensitive handlers call a shared rate-limit boundary for process creation, citizen votes, committee applications and report closure. In production, they fail closed unless `SECURITY_RATE_LIMIT_PROVIDER=upstream` confirms that a distributed upstream limiter is configured. Local process memory is deliberately not treated as production protection. Evidence upload remains closed and therefore cannot bypass this control.

## Evidence

The `evidence` bucket remains private. Downloads first select an authorized pointer under the user's JWT and RLS, then issue a five-minute signed URL. The API exposes neither bucket listing nor a public object URL. Upload remains unavailable until content signatures, a conservative type policy, malware quarantine/sanitization, existence confirmation and compensating cleanup form one complete workflow.

## Verification

`web/supabase/tests/security_http_phase3.sh` starts the application against disposable local Supabase and exercises 22 HTTP controls: authentication failures, client identity rejection, cross-user process access, forbidden state events, valid/duplicate/concurrent voting, attempt ownership, committee membership/conflict/quorum, reputation input, private Storage, own/foreign signed URLs, the retired legacy route, and the closed map.

The GitHub workflow also retains the 31 authorization tests, 14 catalog tests, database vote concurrency test, Node tests, TypeScript and production build. It uses only generated local users and disposable local services.

## Remaining risks

- A distributed rate-limit provider must be configured before production use of sensitive reactivated writes.
- Process-chain verification needs a canonical, authorized RPC.
- Proposal administration and application review need explicit role-scoped RPCs.
- Evidence upload needs content-level inspection and rollback, not only Storage MIME restrictions.
- A public map requires a deliberately anonymous aggregate projection.
- Application submission should eventually gain a user-JWT-compatible RPC signature so the inherited server-role exception can be removed.
