import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const migration = (name) => readFileSync(resolve(process.cwd(), "supabase/migrations", name), "utf8");
const core = migration("20260805000100_security_core_schema.sql");
const bridge = migration("20260804000000_legacy_security_bridge.sql");
const rls = migration("20260805000200_security_rls_and_storage.sql");
const rpc = migration("20260805000300_security_transactional_rpcs.sql");
const sqlTests = readFileSync(resolve(process.cwd(), "supabase/tests/security_authorization.sql"), "utf8");
const catalogTests = readFileSync(resolve(process.cwd(), "supabase/tests/security_catalog_audit.sql"), "utf8");
const baselineFixture = readFileSync(resolve(process.cwd(), "supabase/tests/fixtures/historical_baseline.sql"), "utf8");
const bridgeTests = readFileSync(resolve(process.cwd(), "supabase/tests/security_legacy_bridge.sql"), "utf8");
const ciWorkflow = readFileSync(resolve(process.cwd(), "../.github/workflows/security-supabase-validation.yml"), "utf8");
const concurrencyTest = readFileSync(resolve(process.cwd(), "supabase/tests/security_vote_concurrency.sh"), "utf8");
const httpTests = readFileSync(resolve(process.cwd(), "supabase/tests/security_http_phase3.sh"), "utf8");

test("ownership is auth-user based and legacy hashes are not credentials", () => {
  assert.match(core, /owner_user_id uuid references auth\.users/);
  assert.match(core, /legacy_actor_hash text/);
  assert.doesNotMatch(rls, /actor_hash\s*=\s*auth\.uid/);
});

test("roles and memberships are separate from editable profiles", () => {
  assert.match(core, /create table if not exists public\.user_platform_roles/);
  assert.match(core, /create table if not exists public\.committee_memberships/);
  assert.doesNotMatch(core.match(/create table if not exists public\.profiles[\s\S]*?\);/)?.[0] ?? "", /role/);
});

test("sensitive tables enable RLS and revoke client access by default", () => {
  assert.match(rls, /enable row level security/);
  assert.match(rls, /revoke all on table/);
  assert.doesNotMatch(rls, /using\s*\(\s*true\s*\)/i);
});

test("security definer functions fix search path and revoke before grants", () => {
  const definers = [...rpc.matchAll(/security definer/g)].length + [...rls.matchAll(/security definer/g)].length;
  const paths = [...rpc.matchAll(/set search_path = pg_catalog, public, private/g)].length + [...rls.matchAll(/set search_path = pg_catalog, public, private/g)].length;
  assert.ok(definers >= 10);
  assert.equal(paths, definers);
  assert.match(rpc, /revoke all on function public\.cast_citizen_vote/);
});

test("votes rely on unique indexes and server-computed weight", () => {
  assert.match(core, /unique\(user_id, proposal_id\)/);
  assert.match(rpc, /v_score::numeric\/10/);
  assert.doesNotMatch(rpc, /p_.*weight/);
});

test("state transitions use row locks, expected version and explicit matrix", () => {
  assert.match(rpc, /where id=p_process_id for update/);
  assert.match(rpc, /VERSION_CONFLICT/);
  assert.match(rpc, /v_current\.status='draft' and p_target_status='submitted'/);
});

test("committee closure requires configured quorum greater than one", () => {
  assert.match(core, /minimum_votes smallint not null check \(minimum_votes >= 2\)/);
  assert.match(rpc, /QUORUM_RULE_NOT_CONFIGURED/);
  assert.match(rpc, /QUORUM_NOT_MET/);
});

test("reputation and audit are append-only to clients", () => {
  assert.match(core, /create table if not exists public\.reputation_events/);
  assert.match(core, /create table if not exists public\.security_audit_events/);
  assert.doesNotMatch(rls, /policy .*reputation.* for (insert|update|delete)/i);
  assert.doesNotMatch(rls, /policy .*audit.* for (insert|update|delete)/i);
});

test("evidence bucket is private with no overwrite or delete policy", () => {
  assert.match(rls, /'evidence','evidence',false/);
  assert.match(rls, /evidence_insert_pre_authorized/);
  assert.doesNotMatch(rls, /storage\.objects for (update|delete)/i);
});

test("SQL authorization tests cover negative access paths", () => {
  assert.match(sqlTests, /select plan\(31\)/);
  assert.match(sqlTests, /user A cannot read process B/);
  assert.match(sqlTests, /anon cannot read civic processes/);
  assert.match(sqlTests, /user cannot self-assign a role/);
  assert.match(sqlTests, /duplicate citizen vote is rejected transactionally/);
  assert.match(sqlTests, /member of committee A cannot act in committee B/);
  assert.match(sqlTests, /member with an active conflict cannot vote/);
  assert.match(sqlTests, /cannot close without a configured quorum rule/);
  assert.match(sqlTests, /unowned historical data stays closed/);
});

test("catalog audit checks runtime RLS, grants, definers and private Storage", () => {
  assert.match(catalogTests, /select plan\(15\)/);
  assert.match(catalogTests, /every sensitive table exists and has RLS enabled/);
  assert.match(catalogTests, /anon has no sensitive public-table writes or evidence policy/);
  assert.match(catalogTests, /no SECURITY DEFINER function grants EXECUTE to PUBLIC/);
  assert.match(catalogTests, /evidence bucket is private/);
});

test("historical baseline is sanitized, local-only and reproduces bridge conflicts", () => {
  assert.match(baselineFixture, /LOCAL TEST FIXTURE ONLY/);
  assert.match(baselineFixture, /create table public\.committee_applications/);
  assert.match(baselineFixture, /generate_series\(1,237\)/);
  assert.match(baselineFixture, /generate_series\(1,43\)/);
  assert.match(baselineFixture, /application\/octet-stream/);
  assert.doesNotMatch(baselineFixture, /storage\.buckets|@gmail\.|@hotmail\.|@outlook\./i);
  assert.doesNotMatch(core, /create table if not exists public\.committee_applications/);
});

test("legacy bridge preserves unknown ownership and closes inherited RPCs", () => {
  assert.match(bridge, /owner_user_id is null[\s\S]*exists \(select 1 from auth\.users/);
  assert.doesNotMatch(bridge, /actor_hash\s*::\s*uuid|owner_user_id\s*=\s*[^;]*actor_hash/);
  assert.match(bridge, /legacy_unverified/);
  assert.match(bridge, /revoke all on function %s from public, anon, authenticated/);
  assert.match(bridge, /set search_path = pg_catalog, public/);
  assert.match(bridgeTests, /select plan\(25\)/);
  assert.match(bridgeTests, /citizen cannot invoke inherited StatusChanged/);
});

test("CI validation is disposable, secret-free and preserves real migrations", () => {
  assert.match(ciWorkflow, /runs-on: ubuntu-latest/);
  assert.match(ciWorkflow, /contents: read/);
  assert.match(ciWorkflow, /SUPABASE_CLI_VERSION: 2\.111\.0/);
  assert.match(ciWorkflow, /20260729000000_local_historical_baseline\.sql/);
  assert.match(ciWorkflow, /db reset --local --no-seed/);
  assert.match(ciWorkflow, /Tests=31/);
  assert.match(ciWorkflow, /Tests=15/);
  assert.match(ciWorkflow, /Tests=25/);
  assert.doesNotMatch(ciWorkflow, /supabase (link|db push|migration repair)/);
  assert.doesNotMatch(ciWorkflow, /secrets\./);
});

test("concurrency validation requires one success and one persisted vote", () => {
  assert.match(concurrencyTest, /run_vote for[\s\S]*&/);
  assert.match(concurrencyTest, /run_vote against[\s\S]*&/);
  assert.match(concurrencyTest, /first_status -eq 0 && \$second_status -ne 0/);
  assert.match(concurrencyTest, /persisted.*count\(\*\)/s);
  assert.match(concurrencyTest, /"\$persisted" != "1"/);
});

test("Phase 3 HTTP validation covers all 22 required controls", () => {
  for (let index = 1; index <= 22; index += 1) {
    assert.match(httpTests, new RegExp(`[' ]${index} `));
  }
  assert.match(httpTests, /HTTP_PHASE3_TESTS=22 PASS/);
  assert.match(ciWorkflow, /Run 22 Phase 3 HTTP authorization tests/);
});
