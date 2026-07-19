import type { HealthCaseStatus, HealthLanguage, HealthTab } from "./types";

export const HEALTH_ROUTE = "/salud-publica";
export const OFFICIAL_MODULE_NAME = "Módulo 10: Salud y Bienestar Digital";

export const HEALTH_LIMITATION_NOTICE =
  "Orientación informativa. No diagnostica, no prescribe, no sustituye a profesionales autorizados y no contacta servicios externos.";

export const OFFICIAL_MODULE_DESCRIPTION =
  "Integración de telemedicina, seguimiento de abasto, evaluación de políticas públicas de salud y análisis de su impacto sobre la población, con soluciones solidarias verificables y mecanismos de seguimiento ciudadano.";

export const URGENT_NOTICE =
  "Esta información puede corresponder a una situación urgente. Busca ayuda presencial inmediata y utiliza los números oficiales de emergencia disponibles en tu localidad.";

export const LEGAL_BASIS =
  "Fundamento legal: artículo 4.º de la Constitución Política de los Estados Unidos Mexicanos; derecho a la salud, participación ciudadana, libertad de asociación y protección de datos personales; Ley General de Salud y legislación aplicable en materia de privacidad. En el ámbito internacional, se relaciona con la no discriminación, la progresividad, la debida diligencia y la cooperación social y comunitaria. No implica certificación sanitaria ni vinculación automática con autoridades.";

export const LEGAL_BASIS_FULL = [
  "El módulo se sustenta en el derecho a la protección de la salud reconocido en el artículo 4.º constitucional, así como en los derechos de participación ciudadana, libertad de asociación y protección de datos personales. La canalización solidaria de recursos y esfuerzos es jurídicamente válida cuando es voluntaria, transparente y complementaria, y no sustituye ni invade funciones públicas, sino que fortalece la corresponsabilidad social en la garantía de derechos.",
  "El diseño del módulo prioriza la protección de la información sensible y el respeto a la dignidad de las personas, asegurando un enfoque no discriminatorio y basado en evidencia.",
  "A nivel internacional, el módulo se alinea con el derecho al más alto nivel posible de salud, los principios de no discriminación, progresividad y debida diligencia, así como con estándares de cooperación social y comunitaria para la realización efectiva de derechos reconocidos en tratados y marcos internacionales de derechos humanos.",
];

export const TRANSLATION_WARNING =
  "Las traducciones demostrativas deben ser revisadas por hablantes y especialistas antes de utilizarse para decisiones de salud.";

export const PRIVACY_NOTICE =
  "Este MVP utiliza datos demostrativos y almacenamiento local simulado. La arquitectura esta preparada para incorporar controles de seguridad y privacidad verificables en una fase posterior.";

export const languageLabels: Record<HealthLanguage, string> = {
  es: "Espanol",
  nah: "Nahuatl demostrativo",
  maya: "Maya demostrativo",
  zapoteco: "Zapoteco demostrativo",
};

export const statusLabels: Record<HealthCaseStatus, string> = {
  borrador: "Borrador",
  orientacion_iniciada: "Orientación iniciada",
  seguimiento: "Seguimiento",
  listo_consulta: "Listo para consulta",
  cerrado: "Cerrado",
  archivado: "Archivado",
};

export const healthTabs: { id: HealthTab; label: string; mark: string }[] = [
  { id: "dashboard", label: "Inicio", mark: "01" },
  { id: "expedientes", label: "Mi salud", mark: "02" },
  { id: "orientacion", label: "Orientación", mark: "03" },
  { id: "telemedicina", label: "Telemedicina", mark: "04" },
  { id: "abasto", label: "Abasto", mark: "05" },
  { id: "politicas", label: "Políticas públicas", mark: "06" },
  { id: "impacto", label: "Impacto", mark: "07" },
  { id: "red_solidaria", label: "Red solidaria", mark: "08" },
  { id: "compromisos", label: "Compromisos", mark: "09" },
  { id: "comites", label: "Comités", mark: "10" },
  { id: "documentos", label: "Documentos", mark: "11" },
  { id: "auditoria", label: "Auditoría", mark: "12" },
  { id: "privacidad", label: "Privacidad", mark: "13" },
];

export const documentTypeLabels = {
  resumen_ciudadano: "Resumen ciudadano de salud",
  resumen_consulta: "Resumen para consulta",
  evolucion_sintomas: "Evolución de síntomas",
  historial_orientaciones: "Historial de orientaciones",
  plan_preventivo: "Plan preventivo",
  reporte_seguimiento: "Reporte de seguimiento",
  ficha_declarada: "Ficha de información declarada",
  bitacora_integridad: "Bitácora de integridad",
  resumen_teleorientacion: "Resumen de teleorientación",
  reporte_abasto: "Reporte ciudadano de abasto",
  ficha_incidencia: "Ficha de incidencia",
  evaluacion_politica: "Evaluación ciudadana de política pública",
  informe_impacto: "Informe de impacto",
  seguimiento_compromiso: "Seguimiento de compromiso",
  ficha_solidaria: "Ficha de iniciativa solidaria",
  transparencia_comunitaria: "Informe de transparencia comunitaria",
} as const;
