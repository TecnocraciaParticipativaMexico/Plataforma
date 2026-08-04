import assert from "node:assert/strict";
import test from "node:test";
import { preguntasEticasGlobales, preguntasTecnicasPorModulo } from "./bancos";
import { validateQuestionBanks } from "./validation";
import { sampleSecure, shuffleSecure } from "./server/random";
import { gradeAttempt } from "./server/grading";
import {
  assertApplicationAttempt,
  assertSubmittableAttempt,
} from "./server/policies";
import { parseModuleParam, toPublicQuestion } from "./public";

test("valida 30 éticas y 900 técnicas con IDs únicos", () => {
  const report = validateQuestionBanks();
  assert.equal(report.ethics, 30);
  assert.equal(report.technical, 900);
  assert.equal(report.total, 930);
  for (let moduleId = 1; moduleId <= 30; moduleId += 1) {
    assert.equal(preguntasTecnicasPorModulo[moduleId].length, 30);
  }
});

test("selecciona 5 + 5 sin repeticiones", () => {
  const selected = [
    ...sampleSecure(preguntasEticasGlobales, 5),
    ...sampleSecure(preguntasTecnicasPorModulo[30], 5),
  ];
  assert.equal(selected.length, 10);
  assert.equal(new Set(selected.map((question) => question.id)).size, 10);
  assert.equal(selected.filter((question) => question.tipo === "etica").length, 5);
  assert.equal(
    selected.filter((question) => question.tipo === "tecnica").length,
    5,
  );
});

test("Fisher-Yates conserva elementos y cambia órdenes", () => {
  const source = [0, 1, 2, 3];
  const orders = new Set<string>();
  for (let index = 0; index < 20; index += 1) {
    const shuffled = shuffleSecure(source);
    assert.deepEqual([...shuffled].sort(), source);
    orders.add(shuffled.join(","));
  }
  assert.ok(orders.size > 1);
});

test("califica 7/10 en servidor como aprobado", () => {
  const questions = [
    ...preguntasEticasGlobales.slice(0, 5),
    ...preguntasTecnicasPorModulo[1].slice(0, 5),
  ];
  const selection = questions.map(({ id, tipo }) => ({ id, tipo }));
  const order = Object.fromEntries(
    questions.map((question) => [question.id, [0, 1, 2, 3]]),
  );
  const responses = Object.fromEntries(
    questions.map((question, index) => [
      question.id,
      index < 7
        ? question.respuestaCorrecta
        : (question.respuestaCorrecta + 1) % 4,
    ]),
  );
  const result = gradeAttempt(selection, order, responses);
  assert.equal(result.score, 7);
  assert.equal(result.approved, true);
});

test("rechaza envíos incompletos", () => {
  const questions = [
    ...preguntasEticasGlobales.slice(0, 5),
    ...preguntasTecnicasPorModulo[1].slice(0, 5),
  ];
  assert.throws(
    () =>
      gradeAttempt(
        questions.map(({ id, tipo }) => ({ id, tipo })),
        Object.fromEntries(questions.map(({ id }) => [id, [0, 1, 2, 3]])),
        {},
      ),
    /INCOMPLETE_RESPONSES/,
  );
});

const validAttempt = {
  user_id: "user-1",
  module_id: 4,
  status: "submitted",
  approved: true,
  expires_at: "2099-01-01T00:00:00.000Z",
  application_id: null,
};

test("rechaza intento ajeno, vencido, reenviado o de otro módulo", () => {
  assert.throws(
    () => assertApplicationAttempt(validAttempt, "user-2", 4),
    /FORBIDDEN/,
  );
  assert.throws(
    () => assertApplicationAttempt(validAttempt, "user-1", 5),
    /MODULE_MISMATCH/,
  );
  assert.throws(
    () =>
      assertApplicationAttempt(
        { ...validAttempt, expires_at: "2020-01-01T00:00:00.000Z" },
        "user-1",
        4,
      ),
    /ATTEMPT_EXPIRED/,
  );
  assert.throws(
    () =>
      assertSubmittableAttempt(
        { ...validAttempt, status: "submitted" },
        "user-1",
      ),
    /ALREADY_SUBMITTED/,
  );
});

test("acepta intento aprobado del mismo usuario y módulo", () => {
  assert.doesNotThrow(() =>
    assertApplicationAttempt(validAttempt, "user-1", 4),
  );
});

test("el payload público no revela metadatos de calificación", () => {
  const question = preguntasEticasGlobales[0];
  const payload = toPublicQuestion(question, [3, 1, 0, 2]);
  assert.deepEqual(Object.keys(payload).sort(), [
    "id",
    "opciones",
    "pregunta",
    "tipo",
  ]);
  const serialized = JSON.stringify(payload);
  assert.doesNotMatch(
    serialized,
    /respuestaCorrecta|correctIndex|distractores|option_order/i,
  );
  assert.deepEqual(payload.opciones, [
    question.opciones[3],
    question.opciones[1],
    question.opciones[0],
    question.opciones[2],
  ]);
});

test("acepta módulos 01–30 y rechaza parámetros ambiguos", () => {
  assert.equal(parseModuleParam("01"), 1);
  assert.equal(parseModuleParam("30"), 30);
  for (const invalid of [null, "", "00", "-1", "1.5", "31", "texto"]) {
    assert.equal(parseModuleParam(invalid), null);
  }
});
