import assert from "node:assert/strict";
import test from "node:test";
import { aggregateVotes, consolidateRecords, coverage, isEligibleForResults, pollingStationIdentity } from "./consolidation.ts";

const record = (overrides = {}) => ({ id: "a", folio: "OEC-1", createdAt: "2026-01-01T00:00:00.000Z", version: 1, process: "2026", electionType: "Ayuntamiento", state: "Jalisco", district: "1", municipality: "Guadalajara", section: "10", pollingPlace: "Básica 1", votesA: 60, votesB: 30, votesC: 10, unregistered: 0, nullVotes: 0, declaredTotal: 100, nominalList: 500, notes: "", incident: "", alerts: [], status: "sin_hallazgos", history: [], ...overrides });

test("identidad lógica estable de casilla", () => assert.equal(pollingStationIdentity(record()), pollingStationIdentity(record({ id: "b" }))));
test("evidencias coincidentes no duplican votos", () => { const consolidated = consolidateRecords([record(), record({ id: "b" })]); assert.equal(consolidated.length, 1); assert.equal(aggregateVotes(consolidated)[0].votes, 60); assert.equal(consolidated[0].evidences.length, 2); });
test("discrepancias se excluyen del cálculo", () => { const consolidated = consolidateRecords([record(), record({ id: "b", votesA: 61 })]); assert.equal(consolidated[0].status, "con_discrepancia"); assert.equal(aggregateVotes(consolidated).reduce((sum, item) => sum + item.votes, 0), 0); });
test("suma, porcentajes y diferencia", () => { const result = aggregateVotes(consolidateRecords([record()])); assert.equal(result[0].votes, 60); assert.equal(result[0].percentage, 60); assert.equal(result[0].difference, 30); });
test("cobertura documental", () => assert.deepEqual(coverage(consolidateRecords([record()]), 4), { included: 1, expected: 4, percentage: 25 }));
test("estados elegibles centralizados", () => { assert.equal(isEligibleForResults("verificada_visualmente"), true); assert.equal(isEligibleForResults("con_discrepancia"), false); });
