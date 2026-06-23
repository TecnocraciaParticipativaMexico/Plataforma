export type ReportCategory =
  | "robo"
  | "extorsion"
  | "violencia"
  | "desaparicion"
  | "corrupcion"
  | "abuso_autoridad"
  | "riesgo_comunitario"
  | "otro";

export type RiskLevel = "bajo" | "medio" | "alto" | "critico";

export type TraceEventType =
  | "draft_created"
  | "evidence_added"
  | "evidence_removed"
  | "report_compiled"
  | "export_generated";

export type CommitteeLevel = "colonia" | "municipal" | "estatal" | "federal";

export type SecurityReport = {
  category: ReportCategory | "";
  approximateDate: string;
  location: string;
  narrative: string;
  originalLanguage: string;
  riskLevel: RiskLevel | "";
  consentAccepted: boolean;
  falseReportWarningAccepted: boolean;
  thirdPartyPrivacyAccepted: boolean;
};

export type EvidenceItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  sha256: string;
  addedAt: string;
};

export type TraceEvent = {
  id: string;
  type: TraceEventType;
  label: string;
  detail: string;
  timestamp: string;
};

export type LocalDraft = {
  folio: string;
  report: SecurityReport;
  evidence: EvidenceItem[];
  trace: TraceEvent[];
  dossierHash: string;
  updatedAt: string;
};

export type CommitteeReview = {
  level: CommitteeLevel;
  name: string;
  status: "pendiente" | "orientacion" | "escalamiento" | "cerrado";
  description: string;
  nextStep: string;
};

export type ValidationResult = {
  isValid: boolean;
  missingFields: string[];
};
