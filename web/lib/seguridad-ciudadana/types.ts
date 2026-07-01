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

export type SecurityTab = "reporte" | "comites" | "trazabilidad" | "impresion";

export type PrintableSectionId = "all" | "cover" | "narrative" | "evidence" | "trace" | "committees" | "privacy";

export type DossierQualityLevel = "borrador" | "basico" | "completo" | "listo_revision";

export type SectionStatus = "Completa" | "Incompleta" | "Pendiente";

export type TraceEventType =
  | "draft_created"
  | "draft_saved"
  | "evidence_added"
  | "evidence_removed"
  | "report_compiled"
  | "export_generated";

export type CommitteeLevel = "colonia" | "municipal" | "estatal" | "federal";

export type SecurityReport = {
  category: ReportCategory | "";
  approximateDate: string;
  location: string;
  relatedPeopleInstitutions: string;
  narrative: string;
  evidenceAbsenceExplanation: string;
  originalLanguage: string;
  riskLevel: RiskLevel | "";
  consentAccepted: boolean;
  falseReportWarningAccepted: boolean;
  thirdPartyPrivacyAccepted: boolean;
};

export type EvidenceItem = {
  id: string;
  localId: string;
  name: string;
  size: number;
  type: string;
  sha256: string;
  addedAt: string;
  sourceContext: string;
  localStatus: "registrada_en_dispositivo";
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
  previousDossierHash: string;
  updatedAt: string;
};

export type CommitteeReview = {
  level: CommitteeLevel;
  name: string;
  status: "orientacion" | "revision_civica" | "priorizacion" | "seguimiento";
  description: string;
  nextStep: string;
};

export type ValidationResult = {
  isValid: boolean;
  missingFields: string[];
  completedFields: string[];
  qualityLevel: DossierQualityLevel;
  qualityLabel: string;
  integrityLevel: "Pendiente" | "Medio" | "Alto";
};
