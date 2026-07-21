export type PerfilTipo = "Jueza" | "Fiscal" | "Magistrada" | "Magistrado";
export type RiesgoEtico = "Excelente" | "Observación" | "Revisión prioritaria";
export type TabId = "panorama" | "directorio" | "dictamen" | "evidencia";
export type InterfaceState = "loading" | "empty" | "error";
export type MainSectionId = "mi-caso" | "mis-casos" | "comites" | "observatorio";
export type CaseStepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CaseStatus = "borrador" | "informacion_pendiente" | "listo_revision" | "comite_ciudadano" | "dictamen_disponible" | "seguimiento" | "cerrado";

export type EvidenceDraft = {
  id: string;
  type: "PDF" | "Imagen" | "Documento" | "Audio" | "Descripción manual";
  name: string;
  description: string;
};

export type CaseDraft = {
  matterType: string;
  needsHelpChoosing: boolean;
  facts: string;
  voiceNoteStatus: "sin_nota" | "simulada";
  languageMode: string;
  indigenousLanguage: string;
  promoter: string;
  counterpart: string;
  authority: string;
  institution: string;
  community: string;
  conflictStart: string;
  hasExistingFile: string;
  hearingOrDeadline: string;
  urgentRisk: boolean;
  actionsTaken: string;
  evidence: EvidenceDraft[];
  aiSummary: string;
  generatedResult: string;
};

export type CitizenCase = {
  id: string;
  folio: string;
  title: string;
  matter: string;
  createdAt: string;
  updatedAt: string;
  status: CaseStatus;
  nextAction: string;
  summary: string;
  timeline: string[];
  participants: string[];
  documents: string[];
  notes: string[];
  versions: string[];
  opinions: string[];
};

export type ExpertCommittee = {
  id: string;
  name: string;
  specialty: string;
  members: number;
  reviewStatus: string;
  conflicts: string;
  estimatedTime: string;
  description: string;
};

export type Resolucion = {
  titulo: string;
  materia: string;
  criterio: string;
  impacto: string;
};

export type PerfilJudicial = {
  id: string;
  nombre: string;
  tipo: PerfilTipo;
  cargo: string;
  entidad: string;
  materia: string;
  experiencia: number;
  formacion: string[];
  desempeno: number;
  etica: number;
  transparencia: number;
  riesgoEtico: RiesgoEtico;
  sintesis: string;
  resoluciones: Resolucion[];
  evidencias: string[];
  observaciones: string[];
};
