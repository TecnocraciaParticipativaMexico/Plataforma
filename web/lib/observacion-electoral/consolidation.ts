import type { ElectionRecord } from "./types";
import type { ConsolidatedPollingStation, VerificationStatus } from "./resultsTypes";

const normalized = (value: string) => value.trim().toLocaleLowerCase("es-MX").replace(/\s+/g, "-");

export function splitPollingPlace(value: string) {
  const match = value.trim().match(/^(.+?)(?:\s+(\d+))?$/);
  return { type: match?.[1]?.trim() || "no-declarada", number: match?.[2] || "sin-número" };
}

export function pollingStationIdentity(record: ElectionRecord) {
  const polling = splitPollingPlace(record.pollingPlace);
  return [record.process, record.electionType, record.state, record.district, record.municipality, record.section, polling.type, polling.number]
    .map(normalized)
    .join("|");
}

export function statusFromRecord(record: ElectionRecord): VerificationStatus {
  if (record.status === "sin_hallazgos") return "verificada_visualmente";
  if (record.status === "inconsistencia") return "con_discrepancia";
  if (record.status === "informacion_requerida") return "incompleta";
  return record.status === "analisis" ? "pendiente_revision" : "recibida";
}

export const isEligibleForResults = (status: VerificationStatus) =>
  status === "verificada_visualmente" || status === "coincidencia_multiple" || status === "cotejada_fuente_publica";

const sameVotes = (a: ElectionRecord, b: ElectionRecord) =>
  a.votesA === b.votesA && a.votesB === b.votesB && a.votesC === b.votesC && a.nullVotes === b.nullVotes && a.unregistered === b.unregistered;

export function consolidateRecords(records: ElectionRecord[]): ConsolidatedPollingStation[] {
  const groups = new Map<string, ElectionRecord[]>();
  for (const record of records) {
    const id = pollingStationIdentity(record);
    groups.set(id, [...(groups.get(id) ?? []), record]);
  }

  return [...groups.entries()].map(([id, sources]) => {
    const first = sources[0];
    const polling = splitPollingPlace(first.pollingPlace);
    const hasDiscrepancy = sources.some((record) => !sameVotes(first, record));
    const statuses = sources.map(statusFromRecord);
    const status: VerificationStatus = hasDiscrepancy
      ? "con_discrepancia"
      : sources.length > 1 && statuses.every(isEligibleForResults)
        ? "coincidencia_multiple"
        : statuses[0];

    return {
      id,
      process: first.process,
      electionType: first.electionType,
      state: first.state,
      district: first.district,
      municipality: first.municipality,
      section: first.section,
      pollingPlaceType: polling.type,
      pollingPlaceNumber: polling.number,
      votes: { "Partido A": first.votesA, "Partido B": first.votesB, "Partido C": first.votesC },
      nullVotes: first.nullVotes,
      unregistered: first.unregistered,
      status,
      sourceRecords: sources,
      evidences: sources.map((record) => ({
        id: `evidencia-${record.id}`,
        pollingStationId: id,
        fileName: record.file?.name,
        size: record.file?.size,
        mimeType: record.file?.type,
        receivedAt: record.createdAt,
        hashingVersion: "sha256-original-bytes-v1",
        validationStatus: statusFromRecord(record),
        anchor: { status: "pendiente_infraestructura" },
      })),
    };
  });
}

export function aggregateVotes(records: ConsolidatedPollingStation[]) {
  const eligible = records.filter((record) => isEligibleForResults(record.status));
  const totals = { "Partido A": 0, "Partido B": 0, "Partido C": 0 };
  for (const record of eligible) for (const option of Object.keys(totals) as (keyof typeof totals)[]) totals[option] += record.votes[option];
  const validTotal = Object.values(totals).reduce((sum, votes) => sum + votes, 0);
  return (Object.entries(totals) as [keyof typeof totals, number][])
    .map(([name, votes]) => ({ name, votes, percentage: validTotal ? (votes / validTotal) * 100 : 0, records: eligible.filter((record) => record.votes[name] > 0).length }))
    .sort((a, b) => b.votes - a.votes)
    .map((item, index, sorted) => ({ ...item, difference: item.votes - (sorted[index + 1]?.votes ?? 0) }));
}

export function coverage(records: ConsolidatedPollingStation[], expected?: number) {
  const included = records.filter((record) => isEligibleForResults(record.status)).length;
  return { included, expected, percentage: expected && expected > 0 ? (included / expected) * 100 : undefined };
}
