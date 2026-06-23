import type { CommitteeReview, PrintableSectionId } from "./types";

export const committeeReviews: CommitteeReview[] = [
  {
    level: "auditoria",
    name: "Comité de Auditoría Administrativa",
    status: "revision_civica",
    description: "Revisión cívica de bitácoras, fechas, montos narrados y posibles patrones administrativos sin emitir dictamen oficial.",
    nextStep: "Priorizar preguntas de seguimiento y ordenar documentos para una aportación organizada.",
  },
  {
    level: "tecnologico",
    name: "Comité de Análisis Tecnológico",
    status: "orientacion",
    description: "Orientación sobre integridad digital local, hashes SHA-256 y conservación de archivos originales en el dispositivo.",
    nextStep: "Recomendar resguardo local y evitar lectura de metadatos internos de imagen o ubicación automática.",
  },
  {
    level: "derechos_humanos",
    name: "Comité de Derechos Humanos",
    status: "priorizacion",
    description: "Priorización cívica de riesgos para personas reportantes, víctimas u ofendidos, sin sustituir asesoría legal.",
    nextStep: "Sugerir lenguaje prudente, minimización de datos personales y orientación ante autoridad competente.",
  },
  {
    level: "territorial",
    name: "Comité Territorial Ciudadano",
    status: "seguimiento",
    description: "Revisión vecinal o comunitaria de contexto territorial usando solo la información capturada voluntariamente.",
    nextStep: "Identificar si conviene escalar la orientación a nivel municipal, estatal o federal como flujo mock.",
  },
];

export const printableSections: { id: PrintableSectionId; label: string; shortLabel: string }[] = [
  { id: "all", label: "Ver paquete completo", shortLabel: "Todo" },
  { id: "section1", label: "Sección 1 · Acta ciudadana de hechos", shortLabel: "Sección 1" },
  { id: "section2", label: "Sección 2 · Orientación general de derechos", shortLabel: "Sección 2" },
  { id: "section3", label: "Sección 3 · Inventario local de evidencias", shortLabel: "Sección 3" },
  { id: "section4", label: "Sección 4 · Resumen descriptivo de consistencia", shortLabel: "Sección 4" },
  { id: "section5", label: "Sección 5 · Guía de presentación ante autoridad", shortLabel: "Sección 5" },
];

export const languageQuickOptions = ["Español", "Náhuatl", "Maya", "Otro"] as const;

export const reportCategories = [
  { value: "robo", label: "Robo o despojo" },
  { value: "extorsion", label: "Extorsión o amenaza" },
  { value: "violencia", label: "Violencia o agresión" },
  { value: "desaparicion", label: "Desaparición o ausencia" },
  { value: "corrupcion", label: "Corrupción" },
  { value: "abuso_autoridad", label: "Abuso de autoridad" },
  { value: "riesgo_comunitario", label: "Riesgo comunitario" },
  { value: "otro", label: "Otro hecho relevante" },
] as const;

export const riskLevels = [
  { value: "bajo", label: "Bajo" },
  { value: "medio", label: "Medio" },
  { value: "alto", label: "Alto" },
  { value: "critico", label: "Crítico" },
] as const;
