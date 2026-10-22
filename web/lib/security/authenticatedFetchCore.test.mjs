import test from "node:test";
import assert from "node:assert/strict";
import { fetchWithSession } from "./authenticatedFetchCore.ts";

test("session transport refuses external destinations before reading a token", async () => {
  for (const path of ["https://example.com/api/x", "//example.com/api/x", "/api/\\example.com"]) {
    await assert.rejects(fetchWithSession(path, {}, () => { throw new Error("token accessed"); }, fetch), /Invalid API path/);
  }
});
test("no session produces 401 without a network request", async () => {
  const response = await fetchWithSession("/api/comites/solicitudes", {}, async () => null, () => { throw new Error("network used"); });
  assert.equal(response.status, 401);
});
test("session transport preserves the body and adds verified-server transport credentials", async () => {
  await fetchWithSession("/api/comites/solicitudes", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: "{}" }, async () => "test-session", async (path, init) => {
    assert.equal(path, "/api/comites/solicitudes");
    assert.equal(init.headers.get("Authorization"), "Bearer test-session");
    assert.equal(init.headers.get("Content-Type"), "application/json");
    assert.equal(init.body, "{}");
    assert.equal(init.cache, "no-store");
    return Response.json({ ok: true });
  });
});
