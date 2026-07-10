import type { AuditEvent, EvidenceItem, SearchCase, SearchCaseDataset } from "./types";
import { createId, sha256File, sha256Text } from "./utils";

const DRAFT_KEY = "tp-madres-buscadoras-draft-v1";

export type NewCaseDraft = {
  consentAccepted: boolean;
  privacyLevel: SearchCase["privacyLevel"];
  protectedName: boolean;
  personName: string;
  age: string;
  gender: string;
  state: string;
  municipality: string;
  lastSeenDate: string;
  lastSeenPlace: string;
  narrative: string;
  testimony: string;
  indications: string;
  actionsTaken: string;
  collective: string;
};

export const emptyDraft: NewCaseDraft = {
  consentAccepted: false,
  privacyLevel: "family_private",
  protectedName: false,
  personName: "",
  age: "",
  gender: "",
  state: "",
  municipality: "",
  lastSeenDate: "",
  lastSeenPlace: "",
  narrative: "",
  testimony: "",
  indications: "",
  actionsTaken: "",
  collective: "",
};

export function readDraft(): NewCaseDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    return stored ? ({ ...emptyDraft, ...JSON.parse(stored) } as NewCaseDraft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: NewCaseDraft): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

export async function createCaseFromDraft(draft: NewCaseDraft, currentCount: number): Promise<SearchCase> {
  const now = new Date().toISOString();
  const number = String(currentCount + 1).padStart(3, "0");
  const id = createId("case");
  const summaryHash = await sha256Text(`${draft.personName}-${draft.lastSeenDate}-${draft.lastSeenPlace}-${now}`);

  return {
    id,
    folio: `TP-M5-2026-${number}`,
    protectedName: draft.protectedName,
    personName: draft.protectedName ? "Nombre protegido" : draft.personName.trim(),
    displayName: draft.protectedName ? "Persona con nombre protegido" : draft.personName.trim(),
    age: draft.age ? Number(draft.age) : null,
    gender: draft.gender.trim() || "No indicado",
    status: "draft",
    priority: "medium",
    privacyLevel: draft.privacyLevel,
    state: draft.state.trim(),
    municipality: draft.municipality.trim(),
    collective: draft.collective.trim() || "Borrador familiar",
    committeeId: null,
    summary: `Borrador generado localmente. Huella demostrativa: ${summaryHash.slice(0, 12)}.`,
    narrative: [draft.narrative, draft.testimony, draft.indications, draft.actionsTaken].filter(Boolean).join("\n\n"),
    lastSeenDate: draft.lastSeenDate,
    lastSeenPlace: draft.lastSeenPlace.trim(),
    createdAt: now,
    updatedAt: now,
    tags: ["borrador local"],
    relatedCaseIds: [],
  };
}

export async function filesToEvidence(files: FileList | null, caseId: string, privacyLevel: SearchCase["privacyLevel"]): Promise<EvidenceItem[]> {
  if (!files?.length) return [];
  const selected = Array.from(files).slice(0, 6);
  return Promise.all(
    selected.map(async (file) => ({
      id: createId("evidence"),
      caseId,
      name: file.name,
      category: "other" as const,
      fileType: file.type || "tipo no declarado",
      sizeBytes: file.size,
      addedAt: new Date().toISOString(),
      privacyLevel,
      reviewStatus: "pending" as const,
      localStatus: "Archivo seleccionado localmente",
      hash: await sha256File(file),
      note: "Pendiente de procesamiento seguro. La sanitizacion real requerira el servicio de procesamiento.",
    })),
  );
}

export function appendAudit(dataset: SearchCaseDataset, event: Omit<AuditEvent, "id" | "occurredAt">): SearchCaseDataset {
  return {
    ...dataset,
    auditEvents: [
      {
        ...event,
        id: createId("audit"),
        occurredAt: new Date().toISOString(),
      },
      ...dataset.auditEvents,
    ],
  };
}
