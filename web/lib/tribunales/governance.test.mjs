import test from "node:test";
import assert from "node:assert/strict";
import {
  validatePanel,
  evaluateConsensus,
  nextPhase,
  priorityCommand,
  validateRotation,
  substituteMember,
} from "./governance.ts";
const id = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const now = "2026-10-13T12:00:00Z";
function panel(size = 9) {
  return {
    caseId: id(100),
    court: "Constitucional",
    mode: "standard",
    thresholdPercent: 66,
    configuredAt: "2026-10-01T12:00:00Z",
    deliberationStartsAt: "2026-10-02T12:00:00Z",
    crossReview: false,
    doubleMethodValidation: false,
    assignments: Array.from({ length: size }, (_, i) => ({
      expert: {
        userId: id(i + 1),
        specialties: ["Constitucional"],
        status: "accredited",
        accreditedBy: id(900),
        validUntil: "2027-01-01T00:00:00Z",
        ethicsAccepted: true,
      },
      conflict: {
        userId: id(i + 1),
        caseId: id(100),
        status: "clear",
        declaredAt: "2026-09-20T00:00:00Z",
        reviewedBy: id(901),
      },
      kind: "member",
      termEndsAt: "2026-12-01T00:00:00Z",
      previousCaseId: null,
      weight: 1,
    })),
  };
}
const votes = (p, support = 6) =>
  p.assignments.map((a, i) => ({
    userId: a.expert.userId,
    caseId: p.caseId,
    panelVersion: 1,
    position: i < support ? "strong_inconsistency" : "consistent",
    opinion: i < support ? "majority" : "dissent",
    reasoning:
      "Razonamiento técnico fundado y aportado por una persona experta. Requiere contraste humano de las fuentes públicas citadas.",
    sources: ["https://example.org/precedente"],
  }));
test("admite 9–15 integrantes y 5–7 sólo con revisión reforzada", () => {
  for (const size of [9, 15])
    assert.doesNotThrow(() => validatePanel(panel(size), now));
  for (const size of [4, 8, 16])
    assert.throws(() => validatePanel(panel(size), now));
  const p = panel(5);
  p.mode = "reinforced";
  assert.throws(() => validatePanel(p, now));
  p.crossReview = true;
  p.doubleMethodValidation = true;
  assert.doesNotThrow(() => validatePanel(p, now));
});
test("rechaza conflictos, autoacreditación, vencimientos, duplicados y ponderación excesiva", () => {
  for (const mutate of [
    (p) => (p.assignments[0].conflict.status = "declared"),
    (p) =>
      (p.assignments[0].expert.accreditedBy = p.assignments[0].expert.userId),
    (p) => (p.assignments[0].expert.status = "suspended"),
    (p) => (p.assignments[0].termEndsAt = "2020-01-01"),
    (p) => (p.assignments[0].weight = 9),
    (p) => (p.assignments[1] = structuredClone(p.assignments[0])),
    (p) => (p.assignments[0].previousCaseId = p.caseId),
  ]) {
    const p = panel();
    mutate(p);
    assert.throws(() => validatePanel(p, now));
  }
});
test("umbral ex ante: 60–70%, sin regla retrospectiva", () => {
  for (const thresholdPercent of [59, 71, NaN])
    assert.throws(() => validatePanel({ ...panel(), thresholdPercent }, now));
  const p = panel();
  p.configuredAt = p.deliberationStartsAt;
  assert.throws(() => validatePanel(p, now));
});
test("requiere voto de cada integrante, doble mayoría y publica diversidad razonada sin decisión oficial", () => {
  const p = panel();
  const v = votes(p);
  assert.equal(evaluateConsensus(p, v, 1, now).eligibleForHumanReview, true);
  assert.equal(
    evaluateConsensus(p, v.slice(0, 8), 1, now).eligibleForHumanReview,
    false,
  );
  assert.equal(evaluateConsensus(p, v, 1, now).officialDecision, false);
  assert.equal(evaluateConsensus(p, v, 1, now).opinions.length, 9);
  p.assignments.forEach((a, i) => (a.weight = i < 6 ? 0.8 : 1.2));
  assert.equal(evaluateConsensus(p, v, 1, now).eligibleForHumanReview, false);
});
test("rechaza doble voto, suplente, versión obsoleta y razonamiento sin fuentes", () => {
  const p = panel();
  const v = votes(p);
  assert.throws(() => evaluateConsensus(p, [...v, v[0]], 1, now));
  assert.throws(() => evaluateConsensus(p, v, 2, now));
  v[0].sources = [];
  assert.throws(() => evaluateConsensus(p, v, 1, now));
  const outsider = votes(p);
  outsider[0].userId = id(999);
  assert.throws(() => evaluateConsensus(p, outsider, 1, now));
});
test("publicación exige revisión humana, privacidad y versión esperada", () => {
  const checks = {
    authenticated: true,
    authorized: true,
    expectedVersion: 1,
    storedVersion: 1,
    panelValid: true,
    individualComplete: true,
    crossReviewComplete: true,
    votesComplete: true,
    privacyReview: true,
    humanApproval: false,
  };
  assert.throws(() => nextPhase("human_publication_review", checks));
  assert.equal(
    nextPhase("human_publication_review", { ...checks, humanApproval: true }),
    "published",
  );
  assert.throws(() => nextPhase("draft", { ...checks, expectedVersion: 2 }));
  assert.throws(() => nextPhase("draft", { ...checks, authorized: false }));
});
test("priorización no acepta identidad ni peso del navegador", () => {
  const command = {
    caseId: id(100),
    expectedVersion: 1,
    idempotencyKey: id(200),
  };
  assert.deepEqual(priorityCommand(command), command);
  for (const field of ["userId", "role", "weight", "actor_hash", "published"])
    assert.throws(() => priorityCommand({ ...command, [field]: "manipulado" }));
});
test("rotación rechaza bloques idénticos y asignaciones previas aún vigentes", () => {
  const p = panel();
  const prior = panel();
  prior.caseId = id(101);
  assert.throws(() => validateRotation(p, [prior], now));
  prior.assignments = prior.assignments.slice(0, 8);
  assert.throws(() => validateRotation(p, [prior], now));
  prior.assignments.forEach((a) => (a.termEndsAt = "2026-09-01T00:00:00Z"));
  assert.equal(validateRotation(p, [prior], now), true);
});
test("suplencia exige acreditación y se bloquea después de votos o deliberación", () => {
  const p = panel();
  const alternate = structuredClone(p.assignments[0]);
  alternate.expert.userId = id(50);
  alternate.conflict.userId = id(50);
  alternate.kind = "alternate";
  p.assignments.push(alternate);
  const next = substituteMember(p, id(1), id(50), [], "2026-10-01T18:00:00Z");
  assert.equal(
    next.assignments.find((a) => a.expert.userId === id(50)).kind,
    "member",
  );
  assert.throws(() =>
    substituteMember(p, id(1), id(50), votes(p), "2026-10-01T18:00:00Z"),
  );
  assert.throws(() => substituteMember(p, id(1), id(50), [], now));
});
