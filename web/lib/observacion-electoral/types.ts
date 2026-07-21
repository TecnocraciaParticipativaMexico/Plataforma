export type ReviewStatus = "pendiente" | "analisis" | "sin_hallazgos" | "inconsistencia" | "informacion_requerida";
export type AlertCode = "PARTICIPACION_INCOMPATIBLE" | "SUMATORIA_INCONSISTENTE" | "CONCENTRACION_ALTA" | "INFORMACION_INSUFICIENTE";

export type ElectionRecord = {
  id: string; folio: string; createdAt: string; version: number; process: string; electionType: string;
  state: string; district: string; municipality: string; section: string; pollingPlace: string;
  votesA: number; votesB: number; votesC: number; unregistered: number; nullVotes: number;
  declaredTotal?: number; nominalList: number; notes: string; incident: string;
  file?: { name: string; type: string; size: number }; alerts: AlertCode[]; status: ReviewStatus;
  hash?: string; previousHash?: string; history: { at: string; status: ReviewStatus; note: string }[]; demo?: boolean;
};

export type RecordDraft = Omit<ElectionRecord, "id" | "folio" | "createdAt" | "version" | "alerts" | "status" | "hash" | "history" | "demo">;
