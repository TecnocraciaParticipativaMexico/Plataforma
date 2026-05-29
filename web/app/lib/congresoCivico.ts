export type CongresoCivicoIniciativa = {
  id: string;
  titulo: string;
  tema: string;
  estado: "observacion" | "analisis" | "dictamen";
  prioridad: "baja" | "media" | "alta";
  indiceAlineacionCiudadana?: number;
  alertasRelacionadas: string[];
  descripcion: string;
  riesgoInstitucional: string;
};

export type CongresoCivicoRepresentante = {
  id: string;
  nombre: string;
  territorio: string;
  rol: string;
  alineacionTerritorial: "alta" | "media" | "baja";
  observacion: string;
};

export type CongresoCivicoAlerta = {
  id: string;
  tipo: string;
  severidad: "informativa" | "media" | "alta";
  descripcion: string;
  criterioSeguro: string;
};

export type CongresoCivicoTimeline = {
  id: string;
  fase: string;
  descripcion: string;
};

export const propositoCongresoCivico = {
  titulo: "Congreso Civico de Evaluacion Legislativa",
  descripcion:
    "Modulo ciudadano de lectura, contraste y seguimiento legislativo con datos publicos, lenguaje institucional y trazabilidad civica. No sustituye al Congreso formal ni emite efectos juridicos vinculantes.",
  alcance:
    "Permite observar representacion cuestionada, divergencia ciudadana-legislativa, baja alineacion territorial y alertas civicas con criterios verificables.",
} as const;

export const lenguajeSeguroCongresoCivico = [
  "representacion cuestionada",
  "divergencia ciudadana-legislativa",
  "alerta civica",
  "baja alineacion territorial",
] as const;

export const iniciativasCongresoCivico: CongresoCivicoIniciativa[] = [
  {
    id: "ini-001",
    titulo: "Transparencia de votaciones nominales",
    tema: "Rendicion de cuentas",
    estado: "analisis",
    prioridad: "alta",
    indiceAlineacionCiudadana: 64,
    alertasRelacionadas: ["alt-001", "alt-003"],
    descripcion:
      "Contrasta votaciones publicas con compromisos territoriales previamente documentados.",
    riesgoInstitucional:
      "Posible divergencia ciudadana-legislativa si el sentido del voto no se explica con evidencia publica.",
  },
  {
    id: "ini-002",
    titulo: "Seguimiento a presupuesto territorial",
    tema: "Presupuesto publico",
    estado: "observacion",
    prioridad: "media",
    indiceAlineacionCiudadana: 48,
    alertasRelacionadas: ["alt-002"],
    descripcion:
      "Monitorea asignaciones regionales y su coherencia con necesidades publicas verificables.",
    riesgoInstitucional:
      "Baja alineacion territorial cuando beneficios, costos o prioridades no corresponden al territorio afectado.",
  },
  {
    id: "ini-003",
    titulo: "Registro civico de compromisos legislativos",
    tema: "Memoria institucional",
    estado: "dictamen",
    prioridad: "baja",
    indiceAlineacionCiudadana: 72,
    alertasRelacionadas: ["alt-003"],
    descripcion:
      "Organiza compromisos, intervenciones y resultados legislativos para consulta ciudadana.",
    riesgoInstitucional:
      "Representacion cuestionada cuando el historial publico muestra inconsistencias persistentes sin explicacion suficiente.",
  },
];

export const representantesCongresoCivico: CongresoCivicoRepresentante[] = [
  {
    id: "rep-001",
    nombre: "Representante Distrito Norte",
    territorio: "Zona metropolitana norte",
    rol: "Seguimiento presupuestal",
    alineacionTerritorial: "media",
    observacion:
      "Actividad publica documentada, con oportunidades de mejora en explicacion territorial de prioridades.",
  },
  {
    id: "rep-002",
    nombre: "Representante Region Centro",
    territorio: "Corredor urbano central",
    rol: "Revision de iniciativas",
    alineacionTerritorial: "alta",
    observacion:
      "Participacion consistente en temas territoriales y comunicacion publica verificable.",
  },
  {
    id: "rep-003",
    nombre: "Representante Distrito Rural",
    territorio: "Municipios de baja densidad",
    rol: "Vinculacion comunitaria",
    alineacionTerritorial: "baja",
    observacion:
      "Se requiere mayor evidencia publica de seguimiento a necesidades rurales priorizadas por la comunidad.",
  },
];

export const alertasCongresoCivico: CongresoCivicoAlerta[] = [
  {
    id: "alt-001",
    tipo: "Alerta civica de explicacion insuficiente",
    severidad: "media",
    descripcion:
      "Una votacion relevante requiere justificacion publica mas clara frente a compromisos territoriales documentados.",
    criterioSeguro:
      "Se formula como solicitud de explicacion y no como imputacion personal o juridica.",
  },
  {
    id: "alt-002",
    tipo: "Alerta civica de baja alineacion territorial",
    severidad: "alta",
    descripcion:
      "La prioridad legislativa observada se aparta de necesidades territoriales recurrentes en datos publicos.",
    criterioSeguro:
      "Se basa en contraste entre agenda publica, territorio y evidencia disponible.",
  },
  {
    id: "alt-003",
    tipo: "Alerta civica de seguimiento pendiente",
    severidad: "informativa",
    descripcion:
      "Existe compromiso publico sin evidencia suficiente de avance, respuesta o cierre documentado.",
    criterioSeguro:
      "Se mantiene como seguimiento documental hasta contar con nueva informacion.",
  },
];

export const timelineCongresoCivico: CongresoCivicoTimeline[] = [
  {
    id: "time-001",
    fase: "1. Registro publico",
    descripcion: "Carga inicial de iniciativas, compromisos, representantes y fuentes verificables.",
  },
  {
    id: "time-002",
    fase: "2. Contraste civico",
    descripcion: "Comparacion entre agenda legislativa, territorio, compromisos y evidencia ciudadana.",
  },
  {
    id: "time-003",
    fase: "3. Alerta civica",
    descripcion: "Emision de observaciones institucionales con lenguaje seguro y alcance no vinculante.",
  },
  {
    id: "time-004",
    fase: "4. Memoria y seguimiento",
    descripcion: "Actualizacion de resultados, respuestas publicas y cambios de alineacion territorial.",
  },
];
