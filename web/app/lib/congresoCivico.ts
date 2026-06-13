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
  tipoRepresentacion:
    | "legislador-funciones"
    | "representante-ciudadano"
    | "representacion-cuestionada";
  camaraAmbito: string;
  estadoDistritoSeccion: string;
  indiceAlineacionCiudadana: number;
  asistenciaParticipacion: string;
  alertasRelacionadas: string[];
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
  titulo: "Congreso Civico",
  descripcion:
    "Un espacio para seguir iniciativas, representantes, alertas civicas y alineacion ciudadana.",
  alcance:
    "Ayuda a saber que se propone, quien participa, como avanza y que temas necesitan mas explicacion.",
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
      "Busca que las votaciones importantes puedan consultarse y explicarse con claridad.",
    riesgoInstitucional:
      "Puede haber divergencia ciudadana-legislativa si el voto no se explica de forma publica.",
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
      "Revisa si los recursos publicos responden a necesidades reales del territorio.",
    riesgoInstitucional:
      "Hay baja alineacion territorial cuando las prioridades publicas no coinciden con la comunidad.",
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
      "Guarda compromisos, avances y pendientes para que puedan consultarse despues.",
    riesgoInstitucional:
      "La representacion puede ser cuestionada cuando faltan avances o explicaciones claras.",
  },
];

export const representantesCongresoCivico: CongresoCivicoRepresentante[] = [
  {
    id: "rep-001",
    nombre: "Representante Distrito Norte",
    territorio: "Zona metropolitana norte",
    rol: "Seguimiento presupuestal",
    alineacionTerritorial: "media",
    tipoRepresentacion: "legislador-funciones",
    camaraAmbito: "Camara de Diputados",
    estadoDistritoSeccion: "Distrito Norte, seccion urbana 04",
    indiceAlineacionCiudadana: 62,
    asistenciaParticipacion: "Participacion media en sesiones y votaciones publicas",
    alertasRelacionadas: ["alt-001"],
    observacion:
      "Tiene actividad publica, pero puede explicar mejor algunas prioridades del territorio.",
  },
  {
    id: "rep-002",
    nombre: "Representante Region Centro",
    territorio: "Corredor urbano central",
    rol: "Revision de iniciativas",
    alineacionTerritorial: "alta",
    tipoRepresentacion: "representante-ciudadano",
    camaraAmbito: "Ambito ciudadano territorial",
    estadoDistritoSeccion: "Region Centro, consulta civica territorial",
    indiceAlineacionCiudadana: 81,
    asistenciaParticipacion: "Participacion alta en mesas de seguimiento y revision publica",
    alertasRelacionadas: ["alt-003"],
    observacion:
      "Mantiene participacion constante y comunicacion clara con su territorio.",
  },
  {
    id: "rep-003",
    nombre: "Representante Distrito Rural",
    territorio: "Municipios de baja densidad",
    rol: "Vinculacion comunitaria",
    alineacionTerritorial: "baja",
    tipoRepresentacion: "representacion-cuestionada",
    camaraAmbito: "Representacion legislativa territorial",
    estadoDistritoSeccion: "Distrito Rural, secciones comunitarias dispersas",
    indiceAlineacionCiudadana: 37,
    asistenciaParticipacion: "Participacion baja en seguimiento territorial",
    alertasRelacionadas: ["alt-002"],
    observacion:
      "Necesita mostrar mas seguimiento a necesidades rurales priorizadas por la comunidad.",
  },
];

export const alertasCongresoCivico: CongresoCivicoAlerta[] = [
  {
    id: "alt-001",
    tipo: "Alerta civica de explicacion insuficiente",
    severidad: "media",
    descripcion:
      "Una votacion relevante necesita una explicacion publica mas clara.",
    criterioSeguro:
      "Se presenta como solicitud de explicacion, no como acusacion.",
  },
  {
    id: "alt-002",
    tipo: "Alerta civica de baja alineacion territorial",
    severidad: "alta",
    descripcion:
      "La prioridad observada se aleja de necesidades frecuentes del territorio.",
    criterioSeguro:
      "Se basa en comparar agenda publica, territorio y datos disponibles.",
  },
  {
    id: "alt-003",
    tipo: "Alerta civica de seguimiento pendiente",
    severidad: "informativa",
    descripcion:
      "Existe un compromiso publico sin avance o cierre claro todavia.",
    criterioSeguro:
      "Se mantiene como seguimiento hasta contar con nueva informacion.",
  },
];

export const timelineCongresoCivico: CongresoCivicoTimeline[] = [
  {
    id: "time-001",
    fase: "1. Registro publico",
    descripcion: "Se registran iniciativas, compromisos, representantes y fuentes.",
  },
  {
    id: "time-002",
    fase: "2. Revision ciudadana",
    descripcion: "Se compara agenda legislativa, territorio y prioridades ciudadanas.",
  },
  {
    id: "time-003",
    fase: "3. Alerta civica",
    descripcion: "Se marca un tema que necesita explicacion, atencion o seguimiento.",
  },
  {
    id: "time-004",
    fase: "4. Memoria y seguimiento",
    descripcion: "Se actualizan avances, respuestas publicas y pendientes.",
  },
];
