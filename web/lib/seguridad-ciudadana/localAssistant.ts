import type { LocalAssistantResult, PrivacyRisk } from "./types";

type AnalyzeCitizenNarrativeInput = {
  narrative: string;
  category?: string;
  language?: string;
  evidenceCount?: number;
};

const DATE_PATTERNS = [
  /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/g,
  /\b(?:lunes|martes|miercoles|jueves|viernes|sabado|domingo)\b/gi,
  /\b(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/gi,
  /\b(?:ayer|hoy|antier|anoche|madrugada|manana|tarde|noche)\b/gi,
];

const PLACE_PATTERNS = [
  /\b(?:colonia|barrio|municipio|alcaldia|comunidad|localidad|zona)\s+[a-z0-9\s.-]{2,48}/gi,
  /\b(?:calle|avenida|av\.|carretera|parque|mercado|escuela|hospital)\s+[a-z0-9\s.-]{2,48}/gi,
];

const PRIVACY_RULES: Array<{ id: string; label: string; severity: PrivacyRisk["severity"]; pattern: RegExp; message: string }> = [
  {
    id: "email",
    label: "Correo electronico",
    severity: "media",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    message: "Evita incluir correos personales si no son indispensables para entender los hechos.",
  },
  {
    id: "telefono",
    label: "Telefono",
    severity: "media",
    pattern: /(?:\+?52\s*)?(?:\(?\d{2,3}\)?[\s.-]*)?\d{3,4}[\s.-]?\d{4}\b/,
    message: "Considera retirar numeros telefonicos de terceros o sustituirlos por una descripcion general.",
  },
  {
    id: "curp",
    label: "CURP o identificador similar",
    severity: "alta",
    pattern: /\b[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d\b/i,
    message: "No incluyas CURP u otros identificadores personales en esta version local.",
  },
  {
    id: "ine",
    label: "INE o documento de identidad",
    severity: "alta",
    pattern: /\b(?:ine|ife|credencial de elector|pasaporte|licencia)\b/i,
    message: "Evita capturar documentos de identidad salvo que una autoridad u orientacion profesional lo indique.",
  },
  {
    id: "direccion_exacta",
    label: "Direccion exacta",
    severity: "alta",
    pattern: /\b(?:calle|av\.|avenida|privada|andador)\s+[^.,\n]{3,45}\s+(?:num\.?|numero|#)?\s*\d{1,5}\b/i,
    message: "Prefiere referencias generales como colonia o municipio en lugar de direcciones exactas.",
  },
];

function unique(values: string[], limit = 6): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).slice(0, limit);
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function sentenceCandidates(narrative: string): string[] {
  return narrative
    .split(/[.!?\n]+/)
    .map(normalizeText)
    .filter((sentence) => sentence.length >= 24)
    .slice(0, 5);
}

function detectDates(narrative: string): string[] {
  return unique(DATE_PATTERNS.flatMap((pattern) => narrative.match(pattern) || []));
}

function detectPlaces(narrative: string): string[] {
  const matches = PLACE_PATTERNS.flatMap((pattern) => narrative.match(pattern) || []);
  return unique(matches.map((match) => match.replace(/\d+/g, "").replace(/\s+/g, " ").trim()));
}

function detectPrivacyRisks(narrative: string): PrivacyRisk[] {
  return PRIVACY_RULES.filter((rule) => rule.pattern.test(narrative)).map((rule) => ({
    id: rule.id,
    label: rule.label,
    severity: rule.severity,
    message: rule.message,
  }));
}

function buildEvidenceSuggestions(category: string | undefined, evidenceCount: number): string[] {
  const suggestions = [
    "Fotos, videos o capturas relevantes, conservando los archivos originales.",
    "Documentos, recibos, oficios o mensajes relacionados con fecha visible.",
    "Notas personales con hora aproximada, lugar general y contexto de cada archivo.",
  ];

  if (category === "corrupcion" || category === "abuso_autoridad") {
    suggestions.push("Registro de tramites, folios administrativos o comunicaciones institucionales disponibles.");
  }

  if (category === "extorsion") {
    suggestions.push("Capturas de mensajes o llamadas registradas, evitando publicar datos personales innecesarios.");
  }

  if (evidenceCount === 0) {
    suggestions.unshift("Agregar al menos una evidencia local si existe y si hacerlo no aumenta el riesgo.");
  }

  return suggestions.slice(0, 5);
}

function buildQuestions(input: AnalyzeCitizenNarrativeInput, dates: string[], places: string[], privacyRisks: PrivacyRisk[]): string[] {
  const questions = [
    input.narrative.trim().length < 160 ? "Que ocurrio antes, durante y despues del hecho principal?" : "",
    dates.length === 0 ? "Puedes agregar una fecha, dia u horario aproximado sin inventar precision?" : "",
    places.length === 0 ? "Puedes indicar una ubicacion general como colonia, municipio o referencia amplia?" : "",
    !input.category ? "La categoria seleccionada describe suficientemente el tipo de hecho?" : "",
    (input.evidenceCount || 0) === 0 ? "Existe alguna evidencia local que puedas inventariar sin subirla a servidores?" : "",
    privacyRisks.length > 0 ? "Puedes sustituir datos personales de terceros por descripciones menos identificantes?" : "",
  ];

  return questions.filter(Boolean).slice(0, 6);
}

function calculateCompleteness(input: AnalyzeCitizenNarrativeInput, dates: string[], places: string[], privacyRisks: PrivacyRisk[]): number {
  const checks = [
    input.narrative.trim().length >= 80,
    input.narrative.trim().length >= 240,
    Boolean(input.category),
    Boolean(input.language),
    dates.length > 0,
    places.length > 0,
    (input.evidenceCount || 0) > 0,
    privacyRisks.length === 0,
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function analyzeCitizenNarrative(input: AnalyzeCitizenNarrativeInput): LocalAssistantResult {
  const narrative = normalizeText(input.narrative);
  const dates = detectDates(narrative);
  const places = detectPlaces(narrative);
  const privacyRisks = detectPrivacyRisks(narrative);
  const sentences = sentenceCandidates(narrative);
  const resumenCiudadano = sentences[0]
    ? `${sentences[0].slice(0, 220)}${sentences[0].length > 220 ? "..." : ""}`
    : "Aun no hay suficiente narrativa para construir un resumen local.";

  return {
    resumenCiudadano,
    hechosDetectados: sentences.length ? sentences : ["Agrega una narrativa mas amplia para detectar hechos de forma local."],
    posiblesFechas: dates.length ? dates : ["Sin fecha detectada en la narrativa."],
    posiblesLugares: places.length ? places : ["Sin lugar general detectado en la narrativa."],
    riesgosPrivacidad: privacyRisks,
    datosSensiblesDetectados: privacyRisks.map((risk) => risk.label),
    evidenciasSugeridas: buildEvidenceSuggestions(input.category, input.evidenceCount || 0),
    preguntasParaMejorarReporte: buildQuestions(input, dates, places, privacyRisks),
    nivelCompletitud: calculateCompleteness(input, dates, places, privacyRisks),
    advertenciasPrudentes: [
      "Este analisis es heuristico y local; puede omitir contexto importante.",
      "No clasifica delitos ni sustituye orientacion profesional.",
      "No presentes estas sugerencias como conclusion automatica sobre personas o instituciones.",
    ],
  };
}
