import test from "node:test";
import assert from "node:assert/strict";
import {
  SecurityHttpError,
  assertCitizenEvent,
  assertNoClientIdentity,
  assertNoClientScore,
  assertOwner,
  authenticateBearer,
} from "./authCore.ts";

const statusOf = (fn, expected) => assert.throws(fn, (error) => {
  assert.ok(error instanceof SecurityHttpError);
  assert.equal(error.status, expected);
  return true;
});

test("sin Bearer token devuelve 401 antes de consultar Supabase", async () => {
  let called = false;
  await assert.rejects(
    authenticateBearer(null, async () => { called = true; throw new Error("unexpected"); }),
    (error) => error instanceof SecurityHttpError && error.status === 401,
  );
  assert.equal(called, false);
});

test("token inválido devuelve 401", async () => {
  await assert.rejects(
    authenticateBearer("Bearer invalid", async () => ({ data: { user: null }, error: new Error("invalid") })),
    (error) => error instanceof SecurityHttpError && error.status === 401,
  );
});

test("token válido devuelve exclusivamente el usuario confirmado", async () => {
  const user = { id: "user-a" };
  assert.equal((await authenticateBearer("Bearer valid", async (token) => {
    assert.equal(token, "valid");
    return { data: { user }, error: null };
  })).id, "user-a");
});

test("identidad enviada por cliente se rechaza", () => {
  statusOf(() => assertNoClientIdentity({ user_id: "user-b" }), 400);
  statusOf(() => assertNoClientIdentity({ actor_hash: "forged" }), 400);
  statusOf(() => assertNoClientIdentity({ role: "admin" }), 400);
});

test("usuario A no puede leer ni modificar recurso de usuario B", () => {
  statusOf(() => assertOwner("user-b", "user-a"), 404);
});

test("puntaje o peso fabricado se rechaza", () => {
  statusOf(() => assertNoClientScore({ comprehension_score: 10 }), 400);
  statusOf(() => assertNoClientScore({ technical_weight: 999 }), 400);
});

test("eventos administrativos ciudadanos se rechazan", () => {
  statusOf(() => assertCitizenEvent("StatusChanged"), 403);
  assert.doesNotThrow(() => assertCitizenEvent("CitizenNoteAdded"));
});
