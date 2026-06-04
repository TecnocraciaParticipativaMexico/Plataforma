export type CongresoCivicoCamara = "diputados" | "senado";

export type CongresoCivicoVistaRepresentacion =
  | "camara-diputados-nacional"
  | "senado-nacional"
  | "diputados-por-estado";

export type CongresoCivicoTipoRepresentacion =
  | "voto-directo"
  | "representacion-proporcional"
  | "disputa-ciudadana"
  | "curul-socialmente-impugnada"
  | "representante-ciudadano"
  | "legislador-funciones";

export type CongresoCivicoOrigenPerfil = "representante" | "comite-ciudadano";

export type CongresoCivicoEstadoRepresentante = {
  clave: string;
  nombre: string;
  region: string;
};

export type CongresoCivicoTerritorioBusqueda = {
  estado: string;
  municipio?: string;
  colonia?: string;
  codigoPostal?: string;
  distrito?: string;
};

export type CongresoCivicoCurulEscano = {
  id: string;
  camara: CongresoCivicoCamara;
  vista: CongresoCivicoVistaRepresentacion;
  estado?: string;
  distrito?: string;
  numeroVisual: number;
  representanteId?: string;
  tipoRepresentacion: CongresoCivicoTipoRepresentacion;
};

export type CongresoCivicoVotoLegislativo = {
  id: string;
  titulo: string;
  tema: string;
  fecha: string;
  resultado: "a-favor" | "en-contra" | "abstencion" | "pendiente";
  representanteIds: string[];
};

export type CongresoCivicoPropuestaCiudadana = {
  id: string;
  titulo: string;
  tema: string;
  territorio: CongresoCivicoTerritorioBusqueda;
  firmasCiudadanas: number;
  representanteIds: string[];
};

export type CongresoCivicoAlertaRepresentacion = {
  id: string;
  titulo: string;
  nivel: "seguimiento" | "atencion-media" | "atencion-alta";
  descripcion: string;
  representanteIds: string[];
};

export type CongresoCivicoRepresentanteMapa = {
  id: string;
  nombre: string;
  avatarUrl?: string;
  camara: CongresoCivicoCamara;
  tipoRepresentacion: CongresoCivicoTipoRepresentacion;
  tipoRepresentacionLabel: string;
  territorio: CongresoCivicoTerritorioBusqueda;
  partidoGrupo?: string;
  asientoId: string;
  asistencia: number;
  inasistencias: number;
  retardos: number;
  votosEmitidos: number;
  votosAFavor: number;
  votosEnContra: number;
  abstenciones: number;
  propuestasLegislativasRelacionadas: string[];
  propuestasCiudadanasRecibidas: string[];
  firmasCiudadanasRecibidas: number;
  respuestasACiudadanos: number;
  votacionSobreProyectosCiudadanos: number;
  alertasCivicas: string[];
  calificacionCiudadana: number;
  alineacionTerritorial: "alta" | "media" | "baja" | "divergencia-significativa";
  participaActivamenteEnPlataforma: boolean;
  perfilCompletadoPor: CongresoCivicoOrigenPerfil;
};

export const categoriasRepresentacionSeguras = [
  {
    id: "voto-directo",
    label: "Elegido por voto directo",
  },
  {
    id: "representacion-proporcional",
    label: "Representacion proporcional",
  },
  {
    id: "disputa-ciudadana",
    label: "Representacion en disputa ciudadana",
  },
  {
    id: "curul-socialmente-impugnada",
    label: "Curul socialmente impugnada",
  },
  {
    id: "representante-ciudadano",
    label: "Representante ciudadano por voto popular",
  },
  {
    id: "legislador-funciones",
    label: "Legislador en funciones",
  },
] as const satisfies ReadonlyArray<{
  id: CongresoCivicoTipoRepresentacion;
  label: string;
}>;

export const estadosRepresentacionCongresoCivico: CongresoCivicoEstadoRepresentante[] = [
  { clave: "CDMX", nombre: "Ciudad de Mexico", region: "Centro" },
  { clave: "JAL", nombre: "Jalisco", region: "Occidente" },
  { clave: "NL", nombre: "Nuevo Leon", region: "Norte" },
  { clave: "OAX", nombre: "Oaxaca", region: "Sur" },
];

export const votosLegislativosCongresoCivico: CongresoCivicoVotoLegislativo[] = [
  {
    id: "voto-001",
    titulo: "Transparencia de votaciones publicas",
    tema: "Rendicion de cuentas",
    fecha: "2026-02-10",
    resultado: "a-favor",
    representanteIds: ["rep-map-001", "rep-map-002", "rep-map-004"],
  },
  {
    id: "voto-002",
    titulo: "Presupuesto territorial participativo",
    tema: "Presupuesto publico",
    fecha: "2026-02-17",
    resultado: "en-contra",
    representanteIds: ["rep-map-003", "rep-map-005"],
  },
  {
    id: "voto-003",
    titulo: "Registro de compromisos legislativos",
    tema: "Memoria publica",
    fecha: "2026-03-01",
    resultado: "a-favor",
    representanteIds: ["rep-map-001", "rep-map-006"],
  },
  {
    id: "voto-004",
    titulo: "Consulta territorial de prioridades",
    tema: "Participacion ciudadana",
    fecha: "2026-03-14",
    resultado: "abstencion",
    representanteIds: ["rep-map-002", "rep-map-003"],
  },
  {
    id: "voto-005",
    titulo: "Seguimiento publico de respuestas ciudadanas",
    tema: "Atencion ciudadana",
    fecha: "2026-04-02",
    resultado: "pendiente",
    representanteIds: ["rep-map-004", "rep-map-005", "rep-map-006"],
  },
];

export const propuestasCiudadanasCongresoCivico: CongresoCivicoPropuestaCiudadana[] = [
  {
    id: "prop-ciu-001",
    titulo: "Cruces seguros cerca de escuelas",
    tema: "Movilidad segura",
    territorio: { estado: "CDMX", municipio: "Coyoacan", colonia: "Del Carmen", codigoPostal: "04100" },
    firmasCiudadanas: 1240,
    representanteIds: ["rep-map-001", "rep-map-002"],
  },
  {
    id: "prop-ciu-002",
    titulo: "Presupuesto para agua comunitaria",
    tema: "Servicios publicos",
    territorio: { estado: "JAL", municipio: "Zapopan", colonia: "Centro", codigoPostal: "45100" },
    firmasCiudadanas: 860,
    representanteIds: ["rep-map-003"],
  },
  {
    id: "prop-ciu-003",
    titulo: "Reporte abierto de sesiones",
    tema: "Transparencia",
    territorio: { estado: "NL", municipio: "Monterrey", colonia: "Obispado", codigoPostal: "64060" },
    firmasCiudadanas: 970,
    representanteIds: ["rep-map-004"],
  },
  {
    id: "prop-ciu-004",
    titulo: "Clinica movil rural",
    tema: "Salud territorial",
    territorio: { estado: "OAX", municipio: "Tlacolula", colonia: "Centro", codigoPostal: "70400" },
    firmasCiudadanas: 1510,
    representanteIds: ["rep-map-005", "rep-map-006"],
  },
  {
    id: "prop-ciu-005",
    titulo: "Semaforo de respuestas publicas",
    tema: "Atencion ciudadana",
    territorio: { estado: "CDMX", municipio: "Iztapalapa", colonia: "San Miguel", codigoPostal: "09360" },
    firmasCiudadanas: 720,
    representanteIds: ["rep-map-001", "rep-map-004"],
  },
];

export const alertasRepresentacionCongresoCivico: CongresoCivicoAlertaRepresentacion[] = [
  {
    id: "alerta-map-001",
    titulo: "Baja respuesta a propuestas ciudadanas",
    nivel: "atencion-media",
    descripcion: "Hay propuestas con pocas respuestas publicas registradas.",
    representanteIds: ["rep-map-003", "rep-map-005"],
  },
  {
    id: "alerta-map-002",
    titulo: "Divergencia en presupuesto territorial",
    nivel: "atencion-alta",
    descripcion: "La votacion observada se aleja de prioridades ciudadanas territoriales.",
    representanteIds: ["rep-map-003"],
  },
  {
    id: "alerta-map-003",
    titulo: "Seguimiento pendiente de compromisos",
    nivel: "seguimiento",
    descripcion: "Hay compromisos sin cierre o avance visible todavia.",
    representanteIds: ["rep-map-006"],
  },
  {
    id: "alerta-map-004",
    titulo: "Asistencia por revisar",
    nivel: "atencion-media",
    descripcion: "El registro de asistencia requiere seguimiento ciudadano adicional.",
    representanteIds: ["rep-map-002", "rep-map-005"],
  },
  {
    id: "alerta-map-005",
    titulo: "Alta participacion ciudadana recibida",
    nivel: "seguimiento",
    descripcion: "El representante tiene alto volumen de firmas y propuestas ciudadanas recibidas.",
    representanteIds: ["rep-map-001", "rep-map-004"],
  },
];

export const representantesMapaCongresoCivico: CongresoCivicoRepresentanteMapa[] = [
  {
    id: "rep-map-001",
    nombre: "Representante Norte Metropolitano",
    avatarUrl: "/avatars/congreso-civico/representante-001.png",
    camara: "diputados",
    tipoRepresentacion: "voto-directo",
    tipoRepresentacionLabel: "Elegido por voto directo",
    territorio: { estado: "CDMX", municipio: "Coyoacan", colonia: "Del Carmen", codigoPostal: "04100", distrito: "Distrito 01" },
    partidoGrupo: "Grupo civico azul",
    asientoId: "curul-dip-001",
    asistencia: 92,
    inasistencias: 3,
    retardos: 4,
    votosEmitidos: 48,
    votosAFavor: 31,
    votosEnContra: 12,
    abstenciones: 5,
    propuestasLegislativasRelacionadas: ["voto-001", "voto-003"],
    propuestasCiudadanasRecibidas: ["prop-ciu-001", "prop-ciu-005"],
    firmasCiudadanasRecibidas: 1960,
    respuestasACiudadanos: 34,
    votacionSobreProyectosCiudadanos: 18,
    alertasCivicas: ["alerta-map-005"],
    calificacionCiudadana: 82,
    alineacionTerritorial: "alta",
    participaActivamenteEnPlataforma: true,
    perfilCompletadoPor: "representante",
  },
  {
    id: "rep-map-002",
    nombre: "Representante Sierra Urbana",
    avatarUrl: "/avatars/congreso-civico/representante-002.png",
    camara: "diputados",
    tipoRepresentacion: "representacion-proporcional",
    tipoRepresentacionLabel: "Representacion proporcional",
    territorio: { estado: "CDMX", municipio: "Iztapalapa", colonia: "San Miguel", codigoPostal: "09360", distrito: "Circunscripcion 04" },
    partidoGrupo: "Grupo plural ciudadano",
    asientoId: "curul-dip-002",
    asistencia: 86,
    inasistencias: 6,
    retardos: 7,
    votosEmitidos: 44,
    votosAFavor: 25,
    votosEnContra: 14,
    abstenciones: 5,
    propuestasLegislativasRelacionadas: ["voto-001", "voto-004"],
    propuestasCiudadanasRecibidas: ["prop-ciu-001"],
    firmasCiudadanasRecibidas: 1240,
    respuestasACiudadanos: 19,
    votacionSobreProyectosCiudadanos: 11,
    alertasCivicas: ["alerta-map-004"],
    calificacionCiudadana: 68,
    alineacionTerritorial: "media",
    participaActivamenteEnPlataforma: true,
    perfilCompletadoPor: "comite-ciudadano",
  },
  {
    id: "rep-map-003",
    nombre: "Representante Occidente Presupuestal",
    camara: "diputados",
    tipoRepresentacion: "curul-socialmente-impugnada",
    tipoRepresentacionLabel: "Curul socialmente impugnada",
    territorio: { estado: "JAL", municipio: "Zapopan", colonia: "Centro", codigoPostal: "45100", distrito: "Distrito 03" },
    partidoGrupo: "Grupo territorial naranja",
    asientoId: "curul-dip-003",
    asistencia: 73,
    inasistencias: 12,
    retardos: 9,
    votosEmitidos: 39,
    votosAFavor: 16,
    votosEnContra: 19,
    abstenciones: 4,
    propuestasLegislativasRelacionadas: ["voto-002", "voto-004"],
    propuestasCiudadanasRecibidas: ["prop-ciu-002"],
    firmasCiudadanasRecibidas: 860,
    respuestasACiudadanos: 7,
    votacionSobreProyectosCiudadanos: 5,
    alertasCivicas: ["alerta-map-001", "alerta-map-002"],
    calificacionCiudadana: 41,
    alineacionTerritorial: "baja",
    participaActivamenteEnPlataforma: false,
    perfilCompletadoPor: "comite-ciudadano",
  },
  {
    id: "rep-map-004",
    nombre: "Senadora Metropolitana Norte",
    avatarUrl: "/avatars/congreso-civico/representante-004.png",
    camara: "senado",
    tipoRepresentacion: "legislador-funciones",
    tipoRepresentacionLabel: "Legislador en funciones",
    territorio: { estado: "NL", municipio: "Monterrey", colonia: "Obispado", codigoPostal: "64060" },
    partidoGrupo: "Grupo institucional verde",
    asientoId: "escano-sen-001",
    asistencia: 95,
    inasistencias: 2,
    retardos: 3,
    votosEmitidos: 52,
    votosAFavor: 38,
    votosEnContra: 9,
    abstenciones: 5,
    propuestasLegislativasRelacionadas: ["voto-001", "voto-005"],
    propuestasCiudadanasRecibidas: ["prop-ciu-003", "prop-ciu-005"],
    firmasCiudadanasRecibidas: 1690,
    respuestasACiudadanos: 42,
    votacionSobreProyectosCiudadanos: 22,
    alertasCivicas: ["alerta-map-005"],
    calificacionCiudadana: 88,
    alineacionTerritorial: "alta",
    participaActivamenteEnPlataforma: true,
    perfilCompletadoPor: "representante",
  },
  {
    id: "rep-map-005",
    nombre: "Senador Comunitario Sur",
    camara: "senado",
    tipoRepresentacion: "disputa-ciudadana",
    tipoRepresentacionLabel: "Representacion en disputa ciudadana",
    territorio: { estado: "OAX", municipio: "Tlacolula", colonia: "Centro", codigoPostal: "70400" },
    partidoGrupo: "Grupo comunitario morado",
    asientoId: "escano-sen-002",
    asistencia: 71,
    inasistencias: 14,
    retardos: 8,
    votosEmitidos: 37,
    votosAFavor: 15,
    votosEnContra: 17,
    abstenciones: 5,
    propuestasLegislativasRelacionadas: ["voto-002", "voto-005"],
    propuestasCiudadanasRecibidas: ["prop-ciu-004"],
    firmasCiudadanasRecibidas: 1510,
    respuestasACiudadanos: 9,
    votacionSobreProyectosCiudadanos: 6,
    alertasCivicas: ["alerta-map-001", "alerta-map-004"],
    calificacionCiudadana: 39,
    alineacionTerritorial: "divergencia-significativa",
    participaActivamenteEnPlataforma: false,
    perfilCompletadoPor: "comite-ciudadano",
  },
  {
    id: "rep-map-006",
    nombre: "Representante Ciudadana Rural",
    avatarUrl: "/avatars/congreso-civico/representante-006.png",
    camara: "diputados",
    tipoRepresentacion: "representante-ciudadano",
    tipoRepresentacionLabel: "Representante ciudadano por voto popular",
    territorio: { estado: "OAX", municipio: "Tlacolula", colonia: "Centro", codigoPostal: "70400", distrito: "Distrito ciudadano 02" },
    partidoGrupo: "Comite ciudadano rural",
    asientoId: "curul-dip-006",
    asistencia: 89,
    inasistencias: 4,
    retardos: 5,
    votosEmitidos: 33,
    votosAFavor: 24,
    votosEnContra: 6,
    abstenciones: 3,
    propuestasLegislativasRelacionadas: ["voto-003", "voto-005"],
    propuestasCiudadanasRecibidas: ["prop-ciu-004"],
    firmasCiudadanasRecibidas: 1510,
    respuestasACiudadanos: 28,
    votacionSobreProyectosCiudadanos: 16,
    alertasCivicas: ["alerta-map-003"],
    calificacionCiudadana: 76,
    alineacionTerritorial: "alta",
    participaActivamenteEnPlataforma: true,
    perfilCompletadoPor: "comite-ciudadano",
  },
];

export const curulesDiputadosCongresoCivico: CongresoCivicoCurulEscano[] = [
  { id: "curul-dip-001", camara: "diputados", vista: "camara-diputados-nacional", estado: "CDMX", distrito: "Distrito 01", numeroVisual: 1, representanteId: "rep-map-001", tipoRepresentacion: "voto-directo" },
  { id: "curul-dip-002", camara: "diputados", vista: "camara-diputados-nacional", estado: "CDMX", distrito: "Circunscripcion 04", numeroVisual: 2, representanteId: "rep-map-002", tipoRepresentacion: "representacion-proporcional" },
  { id: "curul-dip-003", camara: "diputados", vista: "camara-diputados-nacional", estado: "JAL", distrito: "Distrito 03", numeroVisual: 3, representanteId: "rep-map-003", tipoRepresentacion: "curul-socialmente-impugnada" },
  { id: "curul-dip-004", camara: "diputados", vista: "camara-diputados-nacional", estado: "NL", distrito: "Distrito 04", numeroVisual: 4, tipoRepresentacion: "legislador-funciones" },
  { id: "curul-dip-005", camara: "diputados", vista: "camara-diputados-nacional", estado: "JAL", distrito: "Distrito 05", numeroVisual: 5, tipoRepresentacion: "representacion-proporcional" },
  { id: "curul-dip-006", camara: "diputados", vista: "diputados-por-estado", estado: "OAX", distrito: "Distrito ciudadano 02", numeroVisual: 6, representanteId: "rep-map-006", tipoRepresentacion: "representante-ciudadano" },
  { id: "curul-dip-007", camara: "diputados", vista: "diputados-por-estado", estado: "CDMX", distrito: "Distrito 07", numeroVisual: 7, tipoRepresentacion: "voto-directo" },
  { id: "curul-dip-008", camara: "diputados", vista: "diputados-por-estado", estado: "NL", distrito: "Distrito 08", numeroVisual: 8, tipoRepresentacion: "legislador-funciones" },
  { id: "curul-dip-009", camara: "diputados", vista: "diputados-por-estado", estado: "OAX", distrito: "Distrito 09", numeroVisual: 9, tipoRepresentacion: "disputa-ciudadana" },
  { id: "curul-dip-010", camara: "diputados", vista: "camara-diputados-nacional", estado: "JAL", distrito: "Distrito 10", numeroVisual: 10, tipoRepresentacion: "voto-directo" },
  { id: "curul-dip-011", camara: "diputados", vista: "camara-diputados-nacional", estado: "CDMX", distrito: "Distrito 11", numeroVisual: 11, tipoRepresentacion: "representacion-proporcional" },
  { id: "curul-dip-012", camara: "diputados", vista: "camara-diputados-nacional", estado: "NL", distrito: "Distrito 12", numeroVisual: 12, tipoRepresentacion: "legislador-funciones" },
];

export const escanosSenadoCongresoCivico: CongresoCivicoCurulEscano[] = [
  { id: "escano-sen-001", camara: "senado", vista: "senado-nacional", estado: "NL", numeroVisual: 1, representanteId: "rep-map-004", tipoRepresentacion: "legislador-funciones" },
  { id: "escano-sen-002", camara: "senado", vista: "senado-nacional", estado: "OAX", numeroVisual: 2, representanteId: "rep-map-005", tipoRepresentacion: "disputa-ciudadana" },
  { id: "escano-sen-003", camara: "senado", vista: "senado-nacional", estado: "CDMX", numeroVisual: 3, tipoRepresentacion: "voto-directo" },
  { id: "escano-sen-004", camara: "senado", vista: "senado-nacional", estado: "JAL", numeroVisual: 4, tipoRepresentacion: "representacion-proporcional" },
  { id: "escano-sen-005", camara: "senado", vista: "senado-nacional", estado: "NL", numeroVisual: 5, tipoRepresentacion: "legislador-funciones" },
  { id: "escano-sen-006", camara: "senado", vista: "senado-nacional", estado: "OAX", numeroVisual: 6, tipoRepresentacion: "representante-ciudadano" },
];
