import type { EvidenceItem, LocalDraft, SecurityReport, TraceEvent, TraceEventType } from "./types";

const STORAGE_KEY = "tp-mx2030-seguridad-ciudadana-draft-v1";

export const emptySecurityReport: SecurityReport = {
  category: "",
  approximateDate: "",
  location: "",
  relatedPeopleInstitutions: "",
  narrative: "",
  evidenceAbsenceExplanation: "",
  originalLanguage: "Español",
  riskLevel: "",
  consentAccepted: false,
  falseReportWarningAccepted: false,
  thirdPartyPrivacyAccepted: false,
};

export function createId(prefix: string): string {
  const randomValue = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase();
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${randomValue}`;
}

export function createLocalFolio(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `CCI-${yyyy}${mm}${dd}-${createId("LOCAL").slice(-8)}`;
}

export function createTraceEvent(type: TraceEventType, detail: string): TraceEvent {
  const labels: Record<TraceEventType, string> = {
    draft_created: "Borrador creado",
    draft_saved: "Borrador guardado",
    evidence_added: "Evidencia agregada",
    evidence_removed: "Evidencia eliminada",
    report_compiled: "Expediente compilado",
    export_generated: "Exportación generada",
  };

  return {
    id: createId("evt"),
    type,
    label: labels[type],
    detail,
    timestamp: new Date().toISOString(),
  };
}

export function createEvidenceLocalId(index: number): string {
  return `IND-${String(index + 1).padStart(3, "0")}`;
}

function normalizeEvidenceItem(item: Partial<EvidenceItem>, index: number): EvidenceItem {
  return {
    id: item.id || createId("ev"),
    localId: item.localId || createEvidenceLocalId(index),
    name: item.name || "archivo-sin-nombre",
    size: item.size || 0,
    type: item.type || "tipo no declarado",
    sha256: item.sha256 || "hash-pendiente",
    addedAt: item.addedAt || new Date().toISOString(),
    sourceContext: item.sourceContext || "Contexto no indicado",
    localStatus: "registrada_en_dispositivo",
  };
}

export function normalizeLocalDraft(rawDraft: Partial<LocalDraft>): LocalDraft {
  const evidence = Array.isArray(rawDraft.evidence) ? rawDraft.evidence.map(normalizeEvidenceItem) : [];

  return {
    folio: rawDraft.folio || createLocalFolio(),
    report: { ...emptySecurityReport, ...(rawDraft.report || {}) },
    evidence,
    trace: Array.isArray(rawDraft.trace) ? rawDraft.trace : [],
    dossierHash: rawDraft.dossierHash || "",
    previousDossierHash: rawDraft.previousDossierHash || "",
    updatedAt: rawDraft.updatedAt || new Date().toISOString(),
  };
}

export function readLocalDraft(): LocalDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeLocalDraft(JSON.parse(raw) as Partial<LocalDraft>) : null;
  } catch {
    return null;
  }
}

export function saveLocalDraft(draft: LocalDraft): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearLocalDraft(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
