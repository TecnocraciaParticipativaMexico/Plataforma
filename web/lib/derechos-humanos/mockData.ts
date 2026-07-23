import type {
  Committee,
  CommitteeReview,
  Dossier,
  HumanRightsCase,
  SolidarityProject,
  StructuralPattern,
} from "./types";

export const demoNotice = "Ejemplos demostrativos. No corresponden a expedientes reales.";

export const humanRightsCases: HumanRightsCase[] = [
  {
    id: "DDHH-2026-001",
    title: "Expediente demostrativo 001",
    caseType: "Uso indebido de fuerza en contexto civil",
    status: "revision_pendiente",
    privacyLevel: "anonimizado",
    location: "Municipio reservado, Sierra Sur",
    date: "2026-06-18",
    summary:
      "Relato ciudadano sobre una intervención de seguridad en espacio público con posibles afectaciones a integridad, libertad personal y debido proceso.",
    affectedGroup: "Personas vecinas y familiares",
    integrityHash: "4d8f7d1d7d0c46f5a1ed672a9c0bd7d4f0c57619c7c9d5576c0e4a17d8f3d991",
    publicVersionReady: true,
    patternIds: ["PAT-01", "PAT-02"],
    committeeReviewId: "REV-01",
    evidence: [
      {
        id: "EVD-001",
        type: "testimonio",
        label: "Testimonio reservado",
        description: "Narrativa voluntaria con datos personales omitidos.",
        receivedAt: "2026-06-19",
        privacyNote: "Publicable solo en versión anonimizada.",
        localHash: "c4a3b7e8f1d9601a2a7466930c0fd31b2d09094d7fb36d01b7a8ac1a6b87d8c2",
      },
      {
        id: "EVD-002",
        type: "documento",
        label: "Nota de contexto",
        description: "Cronología ciudadana sin nombres completos.",
        receivedAt: "2026-06-20",
        privacyNote: "Reservar ubicación exacta.",
        localHash: "4ac12b6fdc3d0a9d8e5b7b8bcb5dd29993795fa5de99f44f6272e46194e39216",
      },
    ],
    timeline: [
      {
        id: "T-001",
        type: "registro",
        label: "Registro inicial",
        date: "2026-06-19",
        detail: "Se abrió expediente técnico ciudadano con consentimiento informado.",
      },
      {
        id: "T-002",
        type: "privacidad",
        label: "Versión pública",
        date: "2026-06-21",
        detail: "Se preparó una versión anonimizada sin datos personales directos.",
      },
    ],
  },
  {
    id: "DDHH-2026-002",
    title: "Caso demostrativo Sierra Sur",
    caseType: "Obstaculización a personas defensoras o periodistas",
    status: "registrado",
    privacyLevel: "reservado",
    location: "Ubicación general protegida",
    date: "2026-07-02",
    summary:
      "Registro demostrativo sobre restricciones de acceso a información pública local y presiones a acompañantes comunitarios.",
    affectedGroup: "Personas defensoras comunitarias",
    integrityHash: "a15d9037214c47038471be2efac2c4b4021f4d8286c9f84a1d4bd7e402739b28",
    publicVersionReady: false,
    patternIds: ["PAT-03"],
    evidence: [],
    timeline: [
      {
        id: "T-003",
        type: "registro",
        label: "Captura inicial",
        date: "2026-07-03",
        detail: "Se registró narrativa mínima y se dejó evidencia pendiente.",
      },
    ],
  },
];

export const structuralPatterns: StructuralPattern[] = [
  {
    id: "PAT-01",
    title: "Intervenciones repetidas en espacios civiles",
    description: "Señales de recurrencia territorial y temporal que ameritan revisión metodológica.",
    signals: ["Hechos similares en dos fechas", "Misma zona general", "Afectaciones a libertad personal"],
    relatedCaseIds: ["DDHH-2026-001"],
    riskLevel: "alto",
  },
  {
    id: "PAT-02",
    title: "Déficit de información pública",
    description: "La documentación ciudadana detecta ausencia de respuestas claras a solicitudes básicas.",
    signals: ["Solicitudes sin respuesta", "Cronología incompleta", "Familiares sin información suficiente"],
    relatedCaseIds: ["DDHH-2026-001"],
    riskLevel: "medio",
  },
  {
    id: "PAT-03",
    title: "Presión a acompañamiento comunitario",
    description: "Patrón demostrativo de obstáculos a defensa, documentación y acompañamiento ciudadano.",
    signals: ["Restricción de acceso", "Riesgo a personas defensoras", "Necesidad de anonimización"],
    relatedCaseIds: ["DDHH-2026-002"],
    riskLevel: "medio",
  },
];

export const committees: Committee[] = [
  {
    id: "COM-DDHH-01",
    name: "Comité de Ciudadanos Expertos en documentación",
    scope: "Metodología y consistencia",
    specialties: ["Derechos humanos", "Protección de datos", "Entrevista no revictimizante"],
    queue: 4,
    note: "Emite observaciones técnicas no vinculantes.",
  },
  {
    id: "COM-DDHH-02",
    name: "Comité de contexto y patrones",
    scope: "Análisis estructural",
    specialties: ["Contexto territorial", "Patrones de recurrencia", "Versiones públicas"],
    queue: 2,
    note: "Ayuda a ordenar información sin sustituir investigaciones de autoridad.",
  },
];

export const committeeReviews: CommitteeReview[] = [
  {
    id: "REV-01",
    caseId: "DDHH-2026-001",
    committeeId: "COM-DDHH-01",
    status: "observaciones_emitidas",
    observations: [
      "Separar hechos observados de interpretaciones.",
      "Mantener ubicación exacta fuera de la versión pública.",
      "Agregar explicación de ausencia de documentos de autoridad, si aplica.",
    ],
    nextStep: "Preparar dossier internacional público anonimizado.",
  },
];

export const solidarityProjects: SolidarityProject[] = [
  {
    id: "RED-01",
    title: "Acompañamiento psicosocial demostrativo",
    linkedCaseId: "DDHH-2026-001",
    need: "Canalización voluntaria a red externa de atención.",
    status: "referible",
    publicNote: "La plataforma solo prepara información de referencia; no gestiona fondos ni servicios.",
  },
  {
    id: "RED-02",
    title: "Orientación para preservación de testimonios",
    linkedCaseId: "DDHH-2026-002",
    need: "Guía externa sobre documentación segura y consentimiento.",
    status: "evaluacion",
    publicNote: "Pendiente de autorización expresa de la persona que documenta.",
  },
];

export const dossiers: Dossier[] = [
  {
    id: "DOS-001",
    caseId: "DDHH-2026-001",
    title: "Dossier público anonimizado",
    version: "v1.0-demo",
    status: "preparado",
    preparedAt: "2026-07-10",
    sections: ["Resumen", "Cronología", "Evidencia voluntaria", "Patrones", "Avisos de alcance"],
  },
];
