# Critical security containment

This change is Phase 1 containment. It intentionally prefers loss of insecure functionality over accepting client-controlled identity, roles, scores, state, or ownership.

## Implemented controls

- Central Bearer authentication validates tokens with `supabase.auth.getUser(token)` and returns only the confirmed user.
- `service_role` is centralized in a `server-only` module. Route handlers authenticate before privileged queries.
- Client-supplied `user_id`, `actor_hash`, `role`, scores, and weights are rejected where applicable.
- New civic processes use the authenticated Supabase user ID as the legacy ownership value. Existing records without a demonstrable link are intentionally inaccessible.
- Process reads, citizen notes, integrity verification, report indexing, and evidence entry points verify ownership first.
- Citizen process events are restricted to `CitizenNoteAdded`; `StatusChanged` and all other administrative events are denied.
- PII rejection no longer echoes a sample of the submitted content.
- Public Storage URL construction has been removed.

## Routes changed

| Route | Containment behavior |
|---|---|
| `/comites/solicitudes` | Legacy POST/PATCH return 410 Gone. |
| `/api/comites/solicitudes` | GET returns only the authenticated user's records; POST retains transactional approved-attempt consumption and derives identity from auth; PATCH authenticates then returns 403. |
| `/api/comites/votos` | GET is authenticated and user-scoped; POST rejects client identity/scores and returns 503 until a server-verifiable qualification is linked. |
| `/api/comites/propuestas` | Auth required; POST derives identity from the confirmed user. |
| `/api/comites/dictamenes` and children | Auth required, then 403 because versioned committee membership is unavailable. |
| `/comites/dictamenes/cerrar` | Auth required, then 403 because committee authority is unavailable. |
| `/api/process/create` | Auth required; server assigns ownership. |
| `/api/process/mine` | Auth required; ignores no client identity and queries by confirmed user. |
| `/api/process/[processId]/event` | Auth + owner check; only citizen notes allowed. |
| `/api/process/[processId]/events` | Auth + owner check; owner-scoped response. |
| `/api/process/[processId]/verify` | Auth + owner check. |
| `/api/process/[processId]/evidence/upload` | Auth + owner check, then 503 until the bucket is verifiably private. |
| `/api/mapa/reportes` | Auth required, then 403 until a privacy-safe public projection is defined. |
| `/api/reputacion` | Authenticated self-read; POST rejects client score and returns 503. |
| `/api/citizen/reports` | Authenticated owner-only read/write; duplicate insert returns 409. |

## Temporary fail-closed decisions

- Technical reports, observations, votes, and closure are unavailable because committee membership/authority is not versioned locally.
- Citizen voting is unavailable because no trustworthy server-side link from an approved qualification to the proposal vote is versioned.
- Reputation mutation is unavailable because no server-verifiable source event is defined.
- Evidence upload is unavailable because the repository cannot prove that `evidence` Storage is private.
- UI consumers that do not yet attach Bearer authorization will receive 401. Availability was not allowed to override the containment requirement.

## Required future database work

- Version complete DDL, grants, RLS policies, Storage policies, and all process RPC definitions.
- Add durable `user_id` ownership to processes/reports rather than overloading the legacy `actor_hash` field.
- Add transactional unique constraints for `(user_id, proposal_id)` votes and idempotency keys for sensitive writes.
- Add committee membership and administrative role tables whose authorization data cannot be edited by the user.
- Move voting, transitions, reputation events, and document closure into transactional RPCs with explicit authorization.
- Make evidence Storage private, issue short-lived signed URLs after authorization, validate file signatures, quarantine/sanitize content, and add compensating deletion.

## Local verification

From `web/` run:

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

The security tests use local doubles and source-contract checks. They do not call Supabase or any other external system. Pre-existing repository failures (including missing `react-leaflet`, unrelated lint findings, and test-runner incompatibilities in older tests) must be reported separately from regressions introduced here.

No production system, real user, remote database, Storage bucket, or third-party service was tested or modified.

## Phase 2 follow-up

The stacked security-foundation work is documented in `docs/security/SECURITY-FOUNDATION-SUPABASE.md`. It versions ownership, roles, memberships, RLS, private Storage, idempotency and transactional RPCs. Phase 1 fail-closed responses remain in place until a separate Phase 3 deliberately integrates and tests the HTTP routes.
