export type CaseStatus = "borrador" | "registrado" | "revision_pendiente" | "version_publica" | "dossier_preparado";

export type PrivacyLevel = "reservado" | "anonimizado" | "publico";

export type EvidenceType = "testimonio" | "documento" | "imagen" | "audio" | "video" | "nota_contexto";

export type TimelineEntryType = "registro" | "evidencia" | "revision" | "privacidad" | "dossier";

export type HumanRightsCase = {
  id: string;
  title: string;
  caseType: string;
  status: CaseStatus;
  privacyLevel: PrivacyLevel;
  location: string;
  date: string;
  summary: string;
  affectedGroup: string;
  evidence: EvidenceItem[];
  timeline: TimelineEntry[];
  committeeReviewId?: string;
  patternIds: string[];
  integrityHash: string;
  publicVersionReady: boolean;
};

export type EvidenceItem = {
  id: string;
  type: EvidenceType;
  label: string;
  description: string;
  receivedAt: string;
  privacyNote: string;
  localHash: string;
};

export type TimelineEntry = {
  id: string;
  type: TimelineEntryType;
  label: string;
  date: string;
  detail: string;
};

export type Committee = {
  id: string;
  name: string;
  scope: string;
  specialties: string[];
  queue: number;
  note: string;
};

export type CommitteeReview = {
  id: string;
  caseId: string;
  committeeId: string;
  status: "pendiente" | "en_revision" | "observaciones_emitidas";
  observations: string[];
  nextStep: string;
};

export type StructuralPattern = {
  id: string;
  title: string;
  description: string;
  signals: string[];
  relatedCaseIds: string[];
  riskLevel: "bajo" | "medio" | "alto";
};

export type SolidarityProject = {
  id: string;
  title: string;
  linkedCaseId: string;
  need: string;
  status: "evaluacion" | "referible" | "enlace_preparado";
  publicNote: string;
};

export type Dossier = {
  id: string;
  caseId: string;
  title: string;
  version: string;
  status: "borrador" | "preparado";
  sections: string[];
  preparedAt: string;
};

export type IntegrityRecord = {
  folio: string;
  version: string;
  hash: string;
  generatedAt: string;
  note: string;
};

export type ModuleTab = "expedientes" | "patrones" | "comites" | "red" | "dossiers";

export type NewCaseForm = {
  title: string;
  caseType: string;
  location: string;
  date: string;
  summary: string;
  affectedGroup: string;
  privacyAccepted: boolean;
  sensitiveDataAccepted: boolean;
};
