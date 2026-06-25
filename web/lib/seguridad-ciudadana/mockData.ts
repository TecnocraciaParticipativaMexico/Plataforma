import type { CommitteeReview, PrintableSectionId } from "./types";

export const committeeReviews: CommitteeReview[] = [
  {
    level: "colonia",
    name: "Comité ciudadano de colonia",
    status: "revision_civica",
    description: "Revisión cívica inicial de consistencia, contexto barrial y datos mínimos sin acusar ni sustituir a la autoridad.",
    nextStep: "Sugerir preguntas de seguimiento, proteger datos personales y ordenar ampliaciones futuras.",
  },
  {
    level: "municipal",
    name: "Comité municipal",
    status: "orientacion",
    description: "Orientación futura para detectar patrones locales y sugerir rutas institucionales disponibles.",
    nextStep: "Priorizar privacidad, consistencia temporal y conservación de evidencias originales.",
  },
  {
    level: "estatal",
    name: "Comité estatal",
    status: "priorizacion",
    description: "Priorización mock de riesgos, posibles recurrencias y necesidades de acompañamiento ciudadano.",
    nextStep: "Sugerir rutas de orientación y escalamiento cívico sin emitir conclusiones oficiales.",
  },
  {
    level: "federal",
    name: "Comité federal",
    status: "seguimiento",
    description: "Vista futura de coordinación cívica para patrones amplios, protección de privacidad y rutas institucionales.",
    nextStep: "No acusa, no radica y no sustituye autoridades; solo organiza criterios de revisión ciudadana.",
  },
];

export const printableSections: { id: PrintableSectionId; label: string; shortLabel: string }[] = [
  { id: "all", label: "Ver paquete completo", shortLabel: "Todo" },
  { id: "cover", label: "Portada del expediente", shortLabel: "Portada" },
  { id: "narrative", label: "Narrativa de hechos", shortLabel: "Narrativa" },
  { id: "evidence", label: "Evidencias aportadas", shortLabel: "Evidencias" },
  { id: "trace", label: "Registro de trazabilidad local", shortLabel: "Trazabilidad" },
  { id: "committees", label: "Revisión preliminar de comités ciudadanos mock", shortLabel: "Comités" },
  { id: "privacy", label: "Aviso de privacidad y límites legales", shortLabel: "Límites" },
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
