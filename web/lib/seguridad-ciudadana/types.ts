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

export type PrintableSectionId = "all" | "section1" | "section2" | "section3" | "section4" | "section5";

export type TraceEventType =
  | "draft_created"
  | "draft_saved"
  | "evidence_added"
  | "evidence_removed"
  | "report_compiled"
  | "export_generated";

export type CommitteeLevel = "auditoria" | "tecnologico" | "derechos_humanos" | "territorial";

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
};

export type PrivacyRisk = {
  id: string;
  label: string;
  severity: "baja" | "media" | "alta";
  message: string;
};

export type LocalAssistantResult = {
  resumenCiudadano: string;
  hechosDetectados: string[];
  posiblesFechas: string[];
  posiblesLugares: string[];
  riesgosPrivacidad: PrivacyRisk[];
  datosSensiblesDetectados: string[];
  evidenciasSugeridas: string[];
  preguntasParaMejorarReporte: string[];
  nivelCompletitud: number;
  advertenciasPrudentes: string[];
};

export type AbuseGuardResult = {
  id: string;
  label: string;
  severity: "suave" | "media";
  message: string;
};

export type LocalVerificationRoot = {
  evidenceCount: number;
  evidenceCombinedHash: string;
  rootHash: string;
  calculatedAt: string;
  method: "merkle_simplificada_local";
};
