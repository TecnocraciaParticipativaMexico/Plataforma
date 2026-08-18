import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = (path) => readFileSync(resolve(process.cwd(), path), "utf8");
const migration = source("supabase/migrations/20260818174804_production_hardening.sql");
const workflow = source("../.github/workflows/security-supabase-validation.yml");

test("distributed limiter is private, atomic and server-policy controlled", () => {
  assert.match(migration, /create table private\.rate_limit_buckets/);
  assert.match(migration, /on conflict\(actor_user_id,action,resource_id,window_started_at\)/);
  assert.match(migration, /RATE_LIMIT_POLICY_REQUIRED/);
  assert.match(source("lib/security/routeSecurity.ts"), /status: 429/);
  assert.match(source("lib/security/routeSecurity.ts"), /Retry-After/);
});

test("evidence upload trusts server bytes and quarantines without browser Storage grants", () => {
  const validation = source("lib/security/evidenceValidation.ts");
  const upload = source("app/api/process/[processId]/evidence/upload/route.ts");
  assert.match(validation, /crypto\.subtle\.digest\("SHA-256", bytes\)/);
  assert.match(validation, /pending_scan/);
  assert.match(validation, /0x25, 0x50, 0x44, 0x46, 0x2d/);
  assert.match(upload, /upsert: false/);
  assert.match(upload, /\.remove\(\[pointer\.object_name\]\)/);
  assert.match(migration, /drop policy if exists "evidence_insert_pre_authorized"/);
});

test("chain verification and review use narrow SECURITY DEFINER RPCs", () => {
  assert.match(migration, /function public\.verify_process_chain/);
  assert.match(migration, /event_sequence<>v_seq/);
  assert.match(migration, /function public\.review_committee_application/);
  assert.match(migration, /SELF_REVIEW_FORBIDDEN/);
  assert.match(migration, /VERSION_CONFLICT/);
  assert.match(migration, /has_committee_membership\(v_app\.module_id,array\['reviewer','admin'\]\)/);
});

test("proposal creation stays closed while authority is undefined", () => {
  const proposal = source("app/api/comites/propuestas/route.ts");
  assert.match(proposal, /status:\s*403/);
  assert.doesNotMatch(proposal, /\.insert\(|create_committee_proposal/);
});

test("headers are restrictive and sensitive handlers do not opt into wildcard CORS", () => {
  const config = source("next.config.ts");
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /X-Content-Type-Options/);
  assert.doesNotMatch(config, /unsafe-eval/);
  for (const path of [
    "app/api/process/create/route.ts",
    "app/api/process/[processId]/evidence/upload/route.ts",
    "app/api/process/[processId]/verify/route.ts",
    "app/api/comites/solicitudes/route.ts",
  ]) assert.doesNotMatch(source(path), /Access-Control-Allow-Origin/);
});

test("disposable CI covers the expanded Phase 4 surface", () => {
  assert.match(workflow, /Run 30 production-hardening pgTAP assertions/);
  assert.match(workflow, /Run 19 Phase 4 HTTP hardening tests/);
  assert.match(workflow, /security_rate_limit_concurrency\.sh/);
  assert.match(workflow, /Expected SQL total: 75/);
});
