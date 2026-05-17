type ModuleTheme = {
  module_id: number;
  keywords: string[];
  warningBelow: number;
};

const DEFAULT_WARNING_BELOW = 35;

const MODULE_THEMES: ModuleTheme[] = [
  { module_id: 1, keywords: ["seguridad", "policia", "prevencion", "delito", "corrupcion", "comunidad", "justicia civica"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 2, keywords: ["fiscalia", "forense", "peritaje", "investigacion", "criminalistica", "evidencia", "ia"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 3, keywords: ["legislativa", "congreso", "ley", "parlamento", "evaluacion", "normativa", "politica publica"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 4, keywords: ["derechos humanos", "garantias", "victimas", "contrapeso", "institucional", "abusos", "ombud"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 5, keywords: ["busqueda", "forense", "desaparecidos", "familias", "victimas", "campo", "identificacion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 6, keywords: ["judicial", "jueces", "carrera", "merito", "tribunales", "derecho", "sentencias"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 7, keywords: ["tribunal", "integridad", "anticorrupcion", "debido proceso", "magistratura", "justicia", "etica"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 8, keywords: ["auditoria", "gobierno", "municipal", "estatal", "fiscalizacion", "obra publica", "cuentas"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 9, keywords: ["etica", "conflicto de interes", "puertas giratorias", "integridad", "servidor publico", "compliance"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 10, keywords: ["salud", "bienestar", "hospital", "medicina", "clinica", "digital", "pacientes"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 11, keywords: ["educacion", "capacitacion", "docencia", "escuela", "aprendizaje", "competencias", "formacion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 12, keywords: ["infraestructura", "vivienda", "mantenimiento", "obra", "ingenieria", "servicios urbanos", "construccion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 13, keywords: ["movilidad", "transporte", "ciudad", "urbanismo", "peaton", "bicicleta", "transito"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 14, keywords: ["dif", "proteccion social", "familia", "infancia", "cuidados", "asistencia", "vulnerabilidad"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 15, keywords: ["juventud", "deporte", "futuro", "intergeneracional", "prevencion", "jovenes", "recreacion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 16, keywords: ["cultura", "arte", "patrimonio", "turismo", "comunitario", "museo", "tradicion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 17, keywords: ["economia", "inversion", "regional", "empleo", "empresa", "desarrollo", "finanzas"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 18, keywords: ["energia", "soberania", "recursos", "petroleo", "electricidad", "estrategico", "renovable"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 19, keywords: ["licitacion", "mipyme", "proveedores", "contratacion", "compras", "transparencia", "empresa"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 20, keywords: ["ciencia", "tecnologia", "innovacion", "datos", "software", "investigacion", "publica"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 21, keywords: ["electoral", "ine", "observacion", "voto", "democracia", "elecciones", "participacion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 22, keywords: ["anticorrupcion", "financiera", "lavado", "inteligencia", "fiscalizacion", "riesgo", "auditoria"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 23, keywords: ["sistemas", "codigo", "software", "seguridad", "auditoria", "datos", "infraestructura digital"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 24, keywords: ["prensa", "periodismo", "verdad", "desinformacion", "medios", "libertad", "verificacion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 25, keywords: ["memoria", "verdad historica", "archivo", "reparacion", "no repeticion", "historia", "victimas"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 26, keywords: ["agricultura", "campo", "pesca", "alimentaria", "rural", "productores", "soberania"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 27, keywords: ["agua", "hidrica", "territorio", "cuenca", "saneamiento", "pozo", "sequía"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 28, keywords: ["medio ambiente", "clima", "sustentabilidad", "ecologia", "biodiversidad", "residuos", "conservacion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 29, keywords: ["emergencia", "proteccion civil", "resiliencia", "desastre", "riesgo", "bomberos", "prevencion"], warningBelow: DEFAULT_WARNING_BELOW },
  { module_id: 30, keywords: ["internacional", "diaspora", "derechos humanos", "migracion", "relaciones", "tratados", "cooperacion"], warningBelow: DEFAULT_WARNING_BELOW },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function evaluarCoherenciaTematica(params: {
  module_id: number;
  expertise_area?: string | null;
  experience_summary?: string | null;
  motivation?: string | null;
  curriculum_evidence?: string | null;
}) {
  const theme = MODULE_THEMES.find((item) => item.module_id === Number(params.module_id));
  const text = normalize([
    params.expertise_area,
    params.experience_summary,
    params.motivation,
    params.curriculum_evidence,
  ].filter(Boolean).join(" "));

  if (!theme || !text) {
    return {
      thematic_score: 0,
      thematic_matches: [] as string[],
      thematic_alerts: ["No hay texto suficiente para evaluar coherencia temática."],
      thematic_warning: true,
    };
  }

  const matches = theme.keywords.filter((keyword) => text.includes(normalize(keyword)));
  const uniqueMatches = Array.from(new Set(matches));
  const rawScore = Math.round((uniqueMatches.length / Math.max(theme.keywords.length, 1)) * 100);
  const thematic_score = Math.min(100, rawScore);
  const thematic_alerts: string[] = [];

  if (thematic_score < theme.warningBelow) {
    thematic_alerts.push(
      "La experiencia declarada parece tener baja relación temática con el módulo seleccionado. Revisar antes de aprobar."
    );
  }

  if (uniqueMatches.length === 0) {
    thematic_alerts.push("No se detectaron palabras clave del módulo en la experiencia, motivación o evidencia curricular.");
  }

  return {
    thematic_score,
    thematic_matches: uniqueMatches,
    thematic_alerts,
    thematic_warning: thematic_alerts.length > 0,
  };
}
