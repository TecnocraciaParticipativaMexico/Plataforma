import type { CaseDraft, CitizenCase, ExpertCommittee, InterfaceState, MainSectionId, PerfilJudicial, TabId } from "./types";

export const tabs: { id: TabId; label: string; description: string }[] = [
  { id: "panorama", label: "Panorama", description: "Indicadores generales del observatorio." },
  { id: "directorio", label: "Directorio", description: "Perfiles y trayectorias verificables." },
  { id: "dictamen", label: "Dictamen", description: "Documento ciudadano no vinculante." },
  { id: "evidencia", label: "Evidencia", description: "Fuentes documentales demostrativas." },
];

export const mainSections: { id: MainSectionId; label: string; description: string }[] = [
  { id: "mi-caso", label: "Mi caso", description: "Organiza hechos, evidencias y borradores." },
  { id: "mis-casos", label: "Mis casos", description: "Consulta expedientes ciudadanos mock." },
  { id: "comites", label: "Comités expertos", description: "Solicita revisión ciudadana no vinculante." },
  { id: "observatorio", label: "Observatorio judicial", description: "Revisa trayectorias y criterios." },
];

export const matterOptions = [
  "Civil y familiar",
  "Laboral",
  "Administrativo",
  "Agrario",
  "Constitucional y derechos humanos",
  "Penal, únicamente como orientación y organización de información",
  "No sé qué tipo de asunto es",
];

export const languageOptions = ["Náhuatl", "Maya", "Mixteco", "Zapoteco", "Otomí", "Tseltal", "Tsotsil", "Otra lengua"];

export const emptyCaseDraft: CaseDraft = {
  matterType: "No sé qué tipo de asunto es",
  needsHelpChoosing: true,
  facts: "",
  voiceNoteStatus: "sin_nota",
  languageMode: "Español",
  indigenousLanguage: "Náhuatl",
  promoter: "",
  counterpart: "",
  authority: "",
  institution: "",
  community: "",
  conflictStart: "",
  hasExistingFile: "No sé",
  hearingOrDeadline: "",
  urgentRisk: false,
  actionsTaken: "",
  evidence: [],
  aiSummary: "",
  generatedResult: "",
};

export const mockCases: CitizenCase[] = [
  {
    id: "case-001",
    folio: "SCJ-06-2026-001",
    title: "Conflicto por acceso a expediente administrativo",
    matter: "Administrativo",
    createdAt: "2026-07-18",
    updatedAt: "2026-07-20",
    status: "listo_revision",
    nextAction: "Revisar borrador ciudadano antes de solicitar comité.",
    summary: "La persona busca ordenar hechos, oficios y respuestas pendientes sobre una solicitud administrativa.",
    timeline: ["Caso creado", "Hechos organizados", "Documento agregado", "Borrador generado"],
    participants: ["Persona promovente", "Autoridad administrativa relacionada"],
    documents: ["Oficio de solicitud", "Respuesta parcial", "Cronología ciudadana"],
    notes: ["Evitar incluir domicilios completos en anexos públicos.", "Confirmar si existe plazo legal cercano."],
    versions: ["v0.1 Borrador inicial", "v0.2 Resumen corregido por la persona usuaria"],
    opinions: ["Sin dictamen ciudadano emitido todavía."],
  },
  {
    id: "case-002",
    folio: "SCJ-06-2026-002",
    title: "Organización de pruebas para asunto agrario comunitario",
    matter: "Agrario",
    createdAt: "2026-07-15",
    updatedAt: "2026-07-19",
    status: "dictamen_disponible",
    nextAction: "Leer dictamen ciudadano y preparar preguntas para asesoría jurídica.",
    summary: "Expediente ciudadano con actas, mapas y testimonios para revisión técnica no vinculante.",
    timeline: ["Caso creado", "Hechos organizados", "Documento agregado", "Solicitud de revisión ciudadana", "Dictamen ciudadano recibido"],
    participants: ["Colectivo promovente", "Autoridad agraria relacionada", "Comité experto ciudadano"],
    documents: ["Acta comunitaria", "Mapa demostrativo", "Lista de evidencias"],
    notes: ["Solicitar revisión de intérprete si se integran testimonios en lengua indígena."],
    versions: ["v0.1 Captura inicial", "v0.2 Evidencias clasificadas", "v0.3 Dictamen ciudadano agregado"],
    opinions: ["Opinión técnica ciudadana: existen elementos para solicitar revisión profesional prioritaria."],
  },
];

export const expertCommittees: ExpertCommittee[] = [
  {
    id: "committee-agrario",
    name: "Comité Ciudadano de Tierra, Comunidad y Territorio",
    specialty: "Agrario y derechos colectivos",
    members: 5,
    reviewStatus: "Evaluación técnica demostrativa en curso",
    conflicts: "Declaración de conflictos requerida antes de revisar cada caso.",
    estimatedTime: "Análisis preliminar estimado: 24-72 horas, sujeto a disponibilidad y complejidad.",
    description: "Revisa cronologías, documentos comunitarios y preguntas para asesoría especializada.",
  },
  {
    id: "committee-ddhh",
    name: "Comité Ciudadano de Derechos Humanos y Amparo",
    specialty: "Constitucional y derechos humanos",
    members: 7,
    reviewStatus: "Proceso de revisión de competencias",
    conflicts: "Sin conflictos declarados en datos mock.",
    estimatedTime: "Análisis preliminar estimado: 48-96 horas, sujeto a disponibilidad y complejidad.",
    description: "Ordena hechos, autoridades relacionadas y posibles preguntas para defensa profesional.",
  },
  {
    id: "committee-laboral",
    name: "Comité Ciudadano de Trabajo y Seguridad Social",
    specialty: "Laboral",
    members: 4,
    reviewStatus: "Disponible para revisión ciudadana",
    conflicts: "Revisión de conflictos previa a cada expediente.",
    estimatedTime: "Análisis preliminar estimado: 24-72 horas, sujeto a disponibilidad y complejidad.",
    description: "Apoya la clasificación de hechos, documentos laborales y próximos pasos no oficiales.",
  },
];

export const perfiles: PerfilJudicial[] = [
  {
    id: "scj-001",
    nombre: "Dra. Elvia Rosaura Ortiz Macías",
    tipo: "Jueza",
    cargo: "Jueza de Distrito especializada en control constitucional",
    entidad: "Ciudad de México",
    materia: "Constitucional y amparo",
    experiencia: 24,
    formacion: ["Doctorado en Derecho Constitucional", "Especialidad en argumentación judicial", "Curso de independencia judicial"],
    desempeno: 96,
    etica: 98,
    transparencia: 94,
    riesgoEtico: "Excelente",
    sintesis: "Trayectoria consistente en criterios de debido proceso, publicidad de actuaciones y protección judicial efectiva.",
    resoluciones: [
      {
        titulo: "Amparo en materia de acceso a información judicial",
        materia: "Transparencia",
        criterio: "Máxima publicidad con protección de datos personales",
        impacto: "Fortalece consulta pública de expedientes anonimizados.",
      },
      {
        titulo: "Suspensión en caso de dilación procesal",
        materia: "Acceso a la justicia",
        criterio: "La demora irrazonable puede constituir afectación autónoma",
        impacto: "Establece parámetros comparables para revisar retrasos.",
      },
    ],
    evidencias: ["Versión pública de sentencia", "Síntesis curricular oficial", "Registro de cursos judiciales"],
    observaciones: ["No registra sanciones administrativas en el conjunto mock.", "Lenguaje de sentencias claro y motivado."],
  },
  {
    id: "scj-002",
    nombre: "Mtro. Javier Alejandro Becerra Flores",
    tipo: "Fiscal",
    cargo: "Fiscal especializado en litigio administrativo y agrario",
    entidad: "Oaxaca",
    materia: "Administrativa y agraria",
    experiencia: 19,
    formacion: ["Maestría en Derecho Administrativo", "Diplomado en derecho agrario", "Capacitación en evidencia digital"],
    desempeno: 91,
    etica: 93,
    transparencia: 88,
    riesgoEtico: "Excelente",
    sintesis: "Perfil con experiencia en expedientes territoriales complejos, comunidades agrarias y preservación de evidencia.",
    resoluciones: [
      {
        titulo: "Criterio técnico sobre restitución de tierras comunales",
        materia: "Agraria",
        criterio: "Valoración reforzada de pruebas históricas y periciales",
        impacto: "Ordena cronologías probatorias más legibles para partes afectadas.",
      },
    ],
    evidencias: ["Currículum público", "Actas de audiencia", "Bitácora de cadena de custodia demostrativa"],
    observaciones: ["Requiere mejorar publicación sistemática de criterios.", "Alta consistencia en integración de expedientes."],
  },
  {
    id: "scj-003",
    nombre: "Mtra. Ximena Guadalupe Flores Ríos",
    tipo: "Magistrada",
    cargo: "Magistrada con experiencia en derechos humanos",
    entidad: "Jalisco",
    materia: "Derechos humanos",
    experiencia: 15,
    formacion: ["Maestría en Derechos Humanos", "Peritaje internacional", "Justicia con perspectiva de género"],
    desempeno: 87,
    etica: 82,
    transparencia: 90,
    riesgoEtico: "Observación",
    sintesis: "Perfil sólido en estándares internacionales, con una observación ciudadana abierta por tiempos de respuesta.",
    resoluciones: [
      {
        titulo: "Protección judicial a víctimas indirectas",
        materia: "Derechos humanos",
        criterio: "Debida diligencia reforzada y trato digno",
        impacto: "Mejora parámetros de motivación en medidas de protección.",
      },
    ],
    evidencias: ["Sentencia pública anonimizada", "Informe ciudadano de demora", "Cédula profesional verificada"],
    observaciones: ["Una observación se encuentra en revisión documental.", "Buen nivel de transparencia curricular."],
  },
  {
    id: "scj-004",
    nombre: "Lic. Carlos Alberto Méndez Luna",
    tipo: "Magistrado",
    cargo: "Magistrado civil y mercantil de carrera judicial",
    entidad: "Nuevo León",
    materia: "Civil y mercantil",
    experiencia: 21,
    formacion: ["Licenciatura en Derecho", "Especialidad en justicia oral mercantil", "Ética judicial aplicada"],
    desempeno: 94,
    etica: 97,
    transparencia: 91,
    riesgoEtico: "Excelente",
    sintesis: "Trayectoria estable en resoluciones mercantiles, cumplimiento de plazos y trato procesal equilibrado.",
    resoluciones: [
      {
        titulo: "Criterio sobre ejecución mercantil proporcional",
        materia: "Mercantil",
        criterio: "Control de proporcionalidad en medidas de apremio",
        impacto: "Evita afectaciones excesivas sin debilitar ejecución de resoluciones.",
      },
    ],
    evidencias: ["Estadística de tiempos procesales", "Versión pública de criterio", "Constancias de capacitación"],
    observaciones: ["Sin alertas éticas en los datos demostrativos.", "Buen desempeño comparado por materia."],
  },
];

export const estados: Record<InterfaceState, { title: string; description: string; tone: string }> = {
  loading: {
    title: "Cargando observatorio",
    description: "La interfaz simula una carga de perfiles, criterios y evidencia documental.",
    tone: "border-sky-200 bg-sky-50 text-sky-800",
  },
  empty: {
    title: "Sin resultados",
    description: "Ajusta la búsqueda o cambia el filtro para consultar otros perfiles demostrativos.",
    tone: "border-amber-200 bg-amber-50 text-amber-800",
  },
  error: {
    title: "No se pudo consultar",
    description: "Este estado muestra cómo se vería una falla futura sin conectar servicios reales.",
    tone: "border-rose-200 bg-rose-50 text-rose-800",
  },
};

export function promedio(perfil: PerfilJudicial) {
  return Math.round((perfil.desempeno + perfil.etica + perfil.transparencia) / 3);
}

export function riskClass(riesgo: PerfilJudicial["riesgoEtico"]) {
  if (riesgo === "Excelente") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (riesgo === "Observación") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-rose-50 text-rose-700 ring-rose-200";
}

export function scoreClass(score: number) {
  if (score >= 92) return "bg-[#0A4E84] text-white";
  if (score >= 85) return "bg-[#F2C300] text-slate-900";
  return "bg-[#E4007C] text-white";
}
