import type { LocalDraft, SecurityReport, TraceEvent, TraceEventType } from "./types";

const STORAGE_KEY = "tp-mx2030-seguridad-ciudadana-draft-v1";

export const emptySecurityReport: SecurityReport = {
  category: "",
  approximateDate: "",
  location: "",
  narrative: "",
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
  return `CFC-${yyyy}${mm}${dd}-${createId("LOCAL").slice(-8)}`;
}

export function createTraceEvent(type: TraceEventType, detail: string): TraceEvent {
  const labels: Record<TraceEventType, string> = {
    draft_created: "Borrador creado",
    evidence_added: "Evidencia agregada",
    evidence_removed: "Evidencia eliminada",
    report_compiled: "Reporte compilado",
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

export function readLocalDraft(): LocalDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalDraft) : null;
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
