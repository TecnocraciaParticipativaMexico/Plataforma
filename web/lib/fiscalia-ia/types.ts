export type FiscaliaTab = "generador" | "expedientes" | "comites" | "trazabilidad" | "documento";

export type IdentityMode = "anonimo" | "nombre_opcional";

export type RiskLevel = "bajo" | "medio" | "alto" | "critico";

export type ReviewStatus = "borrador" | "en_revision" | "observaciones" | "presentable";

export type TerritorialLevel = "colonia" | "municipal" | "estatal" | "federal" | "expertos" | "auditoria";

export type FiscaliaFormState = {
  identityMode: IdentityMode;
  optionalName: string;
  factType: string;
  date: string;
  time: string;
  state: string;
  municipality: string;
  involvedRoles: string;
  narrative: string;
  evidenceReference: string;
  riskLevel: RiskLevel;
  privacyConsent: boolean;
};

export type EvidenceRecord = {
  id: string;
  name: string;
  size: number;
  type: string;
  sha256: string;
  registeredAt: string;
  source: string;
};

export type TimelineEvent = {
  id: string;
  label: string;
  date: string;
  time: string;
  detail: string;
};

export type RoleReference = {
  id: string;
  label: string;
  description: string;
  caution: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
  hint: string;
};

export type TraceEvent = {
  id: string;
  timestamp: string;
  label: string;
  detail: string;
};

export type StructuredCase = {
  folio: string;
  timestamp: string;
  version: number;
  contentHash: string;
  summary: string;
  structuredNarrative: string;
  preliminaryClassification: string;
  timeline: TimelineEvent[];
  roles: RoleReference[];
  evidence: EvidenceRecord[];
  checklist: ChecklistItem[];
  alerts: string[];
  suggestedNextStep: string;
  trace: TraceEvent[];
};

export type MockCase = {
  folio: string;
  status: ReviewStatus;
  state: string;
  municipality: string;
  factType: string;
  date: string;
  riskLevel: RiskLevel;
  committeeReview: string;
  updatedAt: string;
  territorialLevel: TerritorialLevel;
};

export type CommitteeLevelInfo = {
  level: TerritorialLevel;
  name: string;
  accent: string;
  description: string;
  canReview: string[];
};
