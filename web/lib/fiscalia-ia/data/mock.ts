import type { CommitteeLevelInfo, FiscaliaFormState, MockCase } from "../types";

export const initialFiscaliaForm: FiscaliaFormState = {
  identityMode: "anonimo",
  optionalName: "",
  factType: "",
  date: "",
  time: "",
  state: "",
  municipality: "",
  involvedRoles: "",
  narrative: "",
  evidenceReference: "",
  riskLevel: "",
  privacyConsent: false,
};

export const factTypes = [
  "Abuso de autoridad",
  "Uso indebido de recursos",
  "Omisión institucional",
  "Trato discriminatorio",
  "Riesgo comunitario",
  "Otro hecho cívico",
];

export const mexicanStates = ["Oaxaca", "Ciudad de Mexico", "Jalisco", "Nuevo Leon", "Puebla", "Yucatan", "Veracruz", "Otro"];

export const mockCases: MockCase[] = [
  {
    folio: "FFC-2026-0184",
    status: "en_revision",
    state: "Oaxaca",
    municipality: "Oaxaca de Juarez",
    factType: "Abuso de autoridad",
    date: "2026-07-02",
    riskLevel: "medio",
    committeeReview: "Comite municipal: consistencia narrativa en revision",
    updatedAt: "2026-07-08 18:42",
    territorialLevel: "municipal",
  },
  {
    folio: "FFC-2026-0211",
    status: "presentable",
    state: "Jalisco",
    municipality: "Zapopan",
    factType: "Omisión institucional",
    date: "2026-06-28",
    riskLevel: "alto",
    committeeReview: "Comite estatal: acompanamiento civico sugerido",
    updatedAt: "2026-07-07 12:10",
    territorialLevel: "estatal",
  },
  {
    folio: "FFC-2026-0237",
    status: "observaciones",
    state: "Yucatan",
    municipality: "Merida",
    factType: "Riesgo comunitario",
    date: "2026-06-20",
    riskLevel: "bajo",
    committeeReview: "Comite colonia/comunidad: ampliar evidencia referenciada",
    updatedAt: "2026-07-06 09:25",
    territorialLevel: "colonia",
  },
];

export const committeeLevels: CommitteeLevelInfo[] = [
  {
    level: "colonia",
    name: "Colonia / comunidad",
    accent: "#E5007D",
    description: "Primer acompanamiento civico para ordenar hechos y proteger datos personales.",
    canReview: ["consistencia narrativa", "contexto territorial", "necesidad de acompanamiento", "alertas de privacidad"],
  },
  {
    level: "municipal",
    name: "Municipal",
    accent: "#FFC20E",
    description: "Revision de patrones locales y rutas de orientacion ante instituciones competentes.",
    canReview: ["integridad documental", "cronologia", "duplicados aparentes", "seguimiento comunitario"],
  },
  {
    level: "estatal",
    name: "Estatal",
    accent: "#F7931E",
    description: "Priorizacion civica para casos con alcance regional o necesidad de acompanamiento especializado.",
    canReview: ["riesgo percibido", "patrones regionales", "derivacion a asesoria", "proteccion de victimas"],
  },
  {
    level: "federal",
    name: "Federal",
    accent: "#0054A6",
    description: "Vista de coordinacion futura sin facultades oficiales ni recepcion automatica.",
    canReview: ["tendencias agregadas", "rutas institucionales", "resguardo documental", "alertas de abuso coordinado"],
  },
  {
    level: "expertos",
    name: "Expertos ciudadanos",
    accent: "#702F8A",
    description: "Revision tecnica no oficial por perfiles ciudadanos o acompanantes autorizados por la persona.",
    canReview: ["checklist documental", "claridad de hechos", "lenguaje prudente", "calidad del expediente"],
  },
  {
    level: "auditoria",
    name: "Auditoria civica",
    accent: "#39B54A",
    description: "Preparacion para panel administrativo futuro con bitacora, duplicados y control de abuso.",
    canReview: ["spam", "duplicados", "denuncias maliciosas", "historial de cambios"],
  },
];
