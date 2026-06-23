import type { CommitteeReview } from "./types";

export const committeeReviews: CommitteeReview[] = [
  {
    level: "colonia",
    name: "Comité de colonia",
    status: "orientacion",
    description: "Revisión vecinal inicial para ordenar hechos, ubicar riesgos comunitarios y sugerir rutas de apoyo.",
    nextStep: "Orientar a la persona reportante para conservar evidencias y acudir ante la autoridad competente.",
  },
  {
    level: "municipal",
    name: "Comité municipal",
    status: "pendiente",
    description: "Mesa cívica demostrativa para identificar patrones locales y necesidades de seguimiento institucional.",
    nextStep: "Canalizar el registro ciudadano auxiliar a instancias municipales cuando la persona decida presentarlo.",
  },
  {
    level: "estatal",
    name: "Comité estatal",
    status: "escalamiento",
    description: "Posible escalamiento cívico para casos con riesgo alto, impacto regional o repetición de hechos.",
    nextStep: "Preparar una aportación organizada sin sustituir denuncia oficial ni peritaje oficial.",
  },
  {
    level: "federal",
    name: "Comité federal",
    status: "pendiente",
    description: "Vista mock para casos que pudieran requerir coordinación amplia o análisis público agregado futuro.",
    nextStep: "Mantener trazabilidad local verificable y evitar publicar datos personales innecesarios.",
  },
];

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
