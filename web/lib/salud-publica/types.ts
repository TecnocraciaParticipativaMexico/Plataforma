export type HealthLanguage = "es" | "nah" | "maya" | "zapoteco";
export type HealthCaseStatus = "borrador" | "orientacion_iniciada" | "seguimiento" | "listo_consulta" | "cerrado" | "archivado";
export type AttentionLevel = "orientacion_general" | "seguimiento_recomendado" | "consulta_prioritaria" | "posible_emergencia";
export type CareOrientationLevel = "autocuidado_vigilancia" | "consulta_general" | "consulta_prioritaria" | "urgencias";
export type CarePlace =
  | "autocuidado"
  | "medicina_general"
  | "consultorio_anexo_farmacia"
  | "centro_salud"
  | "teleorientacion"
  | "urgencias"
  | "emergencias_911";
export type InformationOrigin = "ciudadano" | "reglas_locales" | "asistente" | "sin_validar";
export type HealthTab =
  | "dashboard"
  | "expedientes"
  | "orientacion"
  | "telemedicina"
  | "abasto"
  | "politicas"
  | "impacto"
  | "red_solidaria"
  | "compromisos"
  | "nueva"
  | "seguimiento"
  | "plan"
  | "documentos"
  | "idiomas"
  | "directorio"
  | "comites"
  | "indicadores"
  | "auditoria"
  | "privacidad";

export type RiskSignal = {
  id: string;
  label: string;
  matchedTerms: string[];
  severity: AttentionLevel;
  explanation: string;
};

export type RecommendedAction = {
  id: string;
  title: string;
  description: string;
  priority: "informativa" | "pronta" | "prioritaria" | "urgente";
  origin: InformationOrigin;
};

export type MedicationEntry = {
  id: string;
  name: string;
  dose?: string;
  frequency?: string;
  lastTakenAt?: string;
  startedAt?: string;
  reason?: string;
  source: "prescripcion" | "automedicacion" | "suplemento" | "remedio_tradicional" | "no_especificado";
};

export type PotentialAdverseEffect = {
  id: string;
  trigger: string;
  explanation: string;
  cautionLevel: "informativo" | "precaucion" | "revision_prioritaria";
};

export type PotentialInteractionWarning = {
  id: string;
  trigger: string;
  explanation: string;
  cautionLevel: "informativo" | "precaucion" | "revision_prioritaria";
};

export type MedicationSafetyResult = {
  id: string;
  declaredMedications: MedicationEntry[];
  adverseEffects: PotentialAdverseEffect[];
  interactionWarnings: PotentialInteractionWarning[];
  missingData: string[];
  recommendedAction: string;
  limitation: string;
  generatedAt: string;
};

export type MedicationQuestion = {
  id: string;
  label: string;
  helper: string;
};

export type MedicationSafetyRule = {
  id: string;
  trigger: string;
  explanation: string;
  cautionLevel: PotentialInteractionWarning["cautionLevel"];
  categories?: string[];
};

export interface MedicationSafetyProvider {
  review(input: { symptoms: string; allergies: string; medications: MedicationEntry[] }): MedicationSafetyResult;
}

export type CitizenTriageResult = {
  id: string;
  level: CareOrientationLevel;
  title: string;
  explanation: string;
  consideredSignals: string[];
  suggestedPlace: CarePlace;
  suggestedTimeframe: string;
  nextSteps: string[];
  escalationSignals: string[];
  guidance: GuidanceResult;
  medicationSafety: MedicationSafetyResult;
};

export type GuidanceResult = {
  id: string;
  caseId?: string;
  level: AttentionLevel;
  title: string;
  summary: string;
  signals: RiskSignal[];
  actions: RecommendedAction[];
  explanation: string;
  generatedAt: string;
  provider: "local-rules";
};

export type TriageRule = {
  id: string;
  terms: string[];
  signal: Omit<RiskSignal, "matchedTerms">;
  action: RecommendedAction;
};

export type HealthDocumentType =
  | "resumen_ciudadano"
  | "resumen_consulta"
  | "evolucion_sintomas"
  | "historial_orientaciones"
  | "plan_preventivo"
  | "reporte_seguimiento"
  | "ficha_declarada"
  | "bitacora_integridad"
  | "resumen_teleorientacion"
  | "reporte_abasto"
  | "ficha_incidencia"
  | "evaluacion_politica"
  | "informe_impacto"
  | "seguimiento_compromiso"
  | "ficha_solidaria"
  | "transparencia_comunitaria";

export type HealthDocument = {
  id: string;
  caseId: string;
  type: HealthDocumentType;
  title: string;
  createdAt: string;
  version: string;
  status: "generado" | "borrador" | "no_generado";
  hash: string;
};

export type HealthAuditEvent = {
  id: string;
  caseId?: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: string;
  version: string;
  category:
    | "expediente"
    | "orientacion"
    | "documento"
    | "privacidad"
    | "seguimiento"
    | "sistema"
    | "telemedicina"
    | "abasto"
    | "politica_publica"
    | "impacto"
    | "solidaridad"
    | "compromiso";
  origin: InformationOrigin;
  detail: string;
  hash: string;
};

export type HealthTimelineEvent = {
  id: string;
  caseId: string;
  timestamp: string;
  actor: string;
  origin: InformationOrigin;
  category: HealthAuditEvent["category"];
  description: string;
  version: string;
};

export type HealthCase = {
  id: string;
  folio: string;
  alias: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: HealthCaseStatus;
  attentionLevel: AttentionLevel;
  tags: string[];
  language: HealthLanguage;
  progress: number;
  reason: string;
  symptoms: string[];
  duration: string;
  evolution: string;
  declaredHistory: string[];
  declaredAllergies: string[];
  declaredMedications: string[];
  citizenNotes: string;
  privacyMode: "visible" | "oculto" | "alias";
  guidance: GuidanceResult[];
  timeline: HealthTimelineEvent[];
  documents: HealthDocument[];
  versions: { version: string; date: string; summary: string; origin: InformationOrigin }[];
};

export type PreventiveItem = {
  id: string;
  caseId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  origin: InformationOrigin;
};

export type DirectoryEntry = {
  id: string;
  state: string;
  municipality: string;
  type: "centro_salud" | "hospital" | "telefono" | "comunitaria" | "comite" | "emergencia";
  name: string;
  description: string;
  phone: string;
  demoOnly: boolean;
};

export type HealthCommittee = {
  id: string;
  name: string;
  specialty: string;
  scope: "colonia" | "municipal" | "estatal" | "federal" | "expertos" | "auditoria";
  state: string;
  matters: number;
  nextSession: string;
  indicators: string[];
};

export type HealthMetrics = {
  activeCases: number;
  orientations: number;
  pendingFollowups: number;
  documents: number;
  alerts: number;
  closedCases: number;
  telehealthAppointments: number;
  supplyAlerts: number;
  policiesInEvaluation: number;
  publicCommitments: number;
  solidarityRequests: number;
  activeCommittees: number;
  byStatus: Record<HealthCaseStatus, number>;
  byLanguage: Record<HealthLanguage, number>;
  preventiveTopics: { label: string; value: number }[];
};

export type ConsultationStatus = "borrador" | "solicitada" | "en_revision_local" | "agenda_simulada" | "cancelada" | "reprogramada" | "cerrada";

export type HealthProfessional = {
  id: string;
  name: string;
  specialty: string;
  languages: HealthLanguage[];
  modality: "teleorientacion" | "presencial_referencial" | "hibrida_demo";
  simulatedAvailability: string;
  demoOnly: boolean;
};

export type AppointmentRequest = {
  id: string;
  caseId?: string;
  professionalId: string;
  reason: string;
  preferredDate: string;
  consentAccepted: boolean;
  status: ConsultationStatus;
};

export type ConsultationSummary = {
  id: string;
  appointmentId: string;
  title: string;
  preparedFor: string;
  notes: string[];
  origin: InformationOrigin;
};

export type TelehealthAppointment = {
  id: string;
  folio: string;
  request: AppointmentRequest;
  professionalId: string;
  scheduledAt: string;
  status: ConsultationStatus;
  waitingRoomStatus: string;
  preparation: string[];
  history: HealthTimelineEvent[];
  postNotes: string[];
};

export interface TelehealthProvider {
  requestAppointment(request: AppointmentRequest): TelehealthAppointment;
  cancelAppointment(appointmentId: string): ConsultationStatus;
  rescheduleAppointment(appointmentId: string, date: string): ConsultationStatus;
}

export type SupplyStatus = "disponible" | "disponibilidad_limitada" | "desabasto_reportado" | "en_verificacion" | "reposicion_anunciada" | "seguimiento_cerrado";

export type SupplyItem = {
  id: string;
  folio: string;
  category: "medicamento" | "vacuna" | "material_curacion" | "equipo" | "personal" | "capacidad";
  name: string;
  unitName: string;
  state: string;
  municipality: string;
  institution: string;
  reportedAt: string;
  trend: "mejora" | "estable" | "empeora" | "sin_datos";
  availability: SupplyStatus;
  citizenReports: number;
  incidents: string[];
  evidence: string[];
  timeline: HealthTimelineEvent[];
};

export interface SupplyRepository {
  listSupplyItems(): SupplyItem[];
  getSupplyItem(itemId: string): SupplyItem | undefined;
}

export type PolicyEvaluationStatus = "registrada" | "recopilando_evidencia" | "en_evaluacion" | "observaciones_publicadas" | "seguimiento_activo" | "concluida";

export type HealthPolicyEvaluation = {
  id: string;
  folio: string;
  name: string;
  responsibleAuthority: string;
  scope: "municipal" | "estatal" | "federal" | "comunitario";
  targetPopulation: string;
  declaredObjective: string;
  simulatedBudget: string;
  coverage: string;
  indicators: { label: string; target: string; result: string; source: ImpactSource }[];
  citizenPerception: number;
  evidence: string[];
  expertObservations: string[];
  alerts: string[];
  version: string;
  status: PolicyEvaluationStatus;
  timeline: HealthTimelineEvent[];
};

export type ImpactSource = "dato_simulado" | "reporte_ciudadano" | "encuesta" | "documento_publico" | "evaluacion_expertos";

export type ImpactIndicator = {
  id: string;
  label: string;
  value: string;
  state: string;
  municipality: string;
  period: string;
  topic: string;
  population: string;
  institution: string;
  source: ImpactSource;
  trend: "mejora" | "estable" | "empeora";
};

export type SolidarityStatus = "borrador" | "revision_comunitaria" | "publicada" | "apoyo_comprometido" | "seguimiento" | "completada" | "cancelada";

export type SolidarityInitiative = {
  id: string;
  folio: string;
  purpose: string;
  generalLocation: string;
  committee: string;
  status: SolidarityStatus;
  need: string;
  goal: string;
  committedResources: string;
  deliveredResources: string;
  verification: string;
  transparency: string[];
  timeline: HealthTimelineEvent[];
};

export type PublicCommitmentStatus = "registrado" | "en_progreso" | "con_retraso" | "cumplido_parcial" | "cumplido" | "sin_actualizacion";

export type PublicCommitment = {
  id: string;
  folio: string;
  commitment: string;
  institution: string;
  date: string;
  territory: string;
  topic: string;
  progress: number;
  publicEvidence: string[];
  citizenReports: number;
  deadline: string;
  delays: string;
  status: PublicCommitmentStatus;
  observations: string;
};

export type HealthDataset = {
  cases: HealthCase[];
  preventiveItems: PreventiveItem[];
  directory: DirectoryEntry[];
  committees: HealthCommittee[];
  professionals: HealthProfessional[];
  appointments: TelehealthAppointment[];
  supplyItems: SupplyItem[];
  policyEvaluations: HealthPolicyEvaluation[];
  impactIndicators: ImpactIndicator[];
  solidarityInitiatives: SolidarityInitiative[];
  publicCommitments: PublicCommitment[];
  audit: HealthAuditEvent[];
  metrics: HealthMetrics;
};

export interface HealthGuidanceProvider {
  generate(input: { caseId?: string; text: string; answers?: string[] }): GuidanceResult;
}

export interface HealthCaseRepository {
  listCases(): HealthCase[];
  getCase(caseId: string): HealthCase | undefined;
  saveCase(healthCase: HealthCase): HealthCase;
  deleteCase(caseId: string): void;
}
