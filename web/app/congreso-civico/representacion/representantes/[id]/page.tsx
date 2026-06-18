import Link from "next/link";
import { notFound } from "next/navigation";

type TipoRepresentacion =
  | "Elegido por voto directo"
  | "Representación proporcional"
  | "Representación en disputa ciudadana"
  | "Curul socialmente impugnada"
  | "Representante ciudadano por voto popular"
  | "Legislador en funciones";

type Nivel = "Alta" | "Media" | "Baja";
type EstadoIniciativa = "En discusión" | "En análisis" | "En votación" | "Aprobada" | "Archivada";
type TipoIniciativa = "apoyada" | "presentada" | "seguimiento";
type VotoEmitido = "A favor" | "En contra" | "Abstención";
type EstadoRespuesta = "Recibida" | "En revisión" | "Respondida" | "Canalizada" | "Sin respuesta registrada";
type CategoriaAlerta = "Asistencia" | "Votación" | "Respuesta ciudadana" | "Transparencia" | "Alineación territorial";
type EstadoAlerta = "En observación" | "Requiere seguimiento" | "Atendida" | "En revisión";
type CategoriaPrioridad = "Agua" | "Seguridad" | "Salud" | "Educación" | "Movilidad" | "Presupuesto público" | "Medio ambiente";
type EstadoSeguimiento = "Atendida" | "En seguimiento" | "Pendiente de respuesta" | "En análisis";

type Iniciativa = {
  titulo: string;
  categoria: string;
  estado: EstadoIniciativa;
  fecha: string;
  impactoTerritorial: string;
  tipo: TipoIniciativa;
};

type Votacion = {
  tema: string;
  fecha: string;
  votoEmitido: VotoEmitido;
  participacionCiudadanaRelacionada: Nivel;
};

type PropuestaCiudadana = {
  titulo: string;
  categoria: string;
  fechaRecepcion: string;
  firmasCiudadanas: number;
  estadoRespuesta: EstadoRespuesta;
  prioridadCiudadana: Nivel;
  resumen: string;
};

type AlertaCivica = {
  titulo: string;
  categoria: CategoriaAlerta;
  severidad: Nivel;
  fecha: string;
  estado: EstadoAlerta;
  resumenCiudadano: string;
  accionSugerida: string;
};

type PrioridadTerritorial = {
  tema: string;
  categoria: CategoriaPrioridad;
  prioridadCiudadana: Nivel;
  actividadRelacionada: string;
  estadoSeguimiento: EstadoSeguimiento;
  alineacion: Nivel;
};

type RepresentanteMock = {
  id: string;
  nombre: string;
  iniciales: string;
  cargo: string;
  estado: string;
  distrito: string;
  partidoGrupo: string;
  tipoRepresentacion: TipoRepresentacion;
  calificacionCiudadana: number;
  asistencia: number;
  inasistencias: number;
  retardos: number;
  votosAFavor: number;
  votosEnContra: number;
  abstenciones: number;
  alineacionTerritorial: number;
  actividadEnPlataforma: string;
  iniciativas: Iniciativa[];
  votaciones: Votacion[];
  propuestasCiudadanas: PropuestaCiudadana[];
  alertas: AlertaCivica[];
  prioridadesTerritoriales: PrioridadTerritorial[];
  comparativoCiudadano: Array<{ titulo: string; descripcion: string; color: string }>;
  indicadoresParticipacion: {
    asistencia: number;
    alineacionTerritorial: number;
    participacionCiudadana: number;
    transparenciaLegislativa: number;
  };
  timeline: Array<{ evento: string; fecha: string; descripcion: string }>;
};

const tipoConfig: Record<TipoRepresentacion, string> = {
  "Elegido por voto directo": "bg-[#FCE7F3] text-[#BE185D]",
  "Representación proporcional": "bg-[#E0F2FE] text-[#0369A1]",
  "Representación en disputa ciudadana": "bg-[#FFEDD5] text-[#C2410C]",
  "Curul socialmente impugnada": "bg-[#FEF3C7] text-[#92400E]",
  "Representante ciudadano por voto popular": "bg-[#EDE9FE] text-[#6D28D9]",
  "Legislador en funciones": "bg-[#DCFCE7] text-[#15803D]",
};

const nivelConfig: Record<Nivel, { badge: string; bar: string; text: string }> = {
  Alta: { badge: "bg-[#DCFCE7] text-[#15803D]", bar: "bg-[#16A34A]", text: "text-[#15803D]" },
  Media: { badge: "bg-[#FEF3C7] text-[#92400E]", bar: "bg-[#F97316]", text: "text-[#C2410C]" },
  Baja: { badge: "bg-[#FCE7F3] text-[#BE185D]", bar: "bg-[#E4007C]", text: "text-[#BE185D]" },
};

const estadoIniciativaConfig: Record<EstadoIniciativa, string> = {
  "En discusión": "bg-[#E0F2FE] text-[#0369A1]",
  "En análisis": "bg-[#EDE9FE] text-[#6D28D9]",
  "En votación": "bg-[#FEF3C7] text-[#92400E]",
  Aprobada: "bg-[#DCFCE7] text-[#15803D]",
  Archivada: "bg-slate-100 text-slate-600",
};

const respuestaConfig: Record<EstadoRespuesta, string> = {
  Recibida: "bg-[#E0F2FE] text-[#0369A1]",
  "En revisión": "bg-[#FEF3C7] text-[#92400E]",
  Respondida: "bg-[#DCFCE7] text-[#15803D]",
  Canalizada: "bg-[#EDE9FE] text-[#6D28D9]",
  "Sin respuesta registrada": "bg-[#FCE7F3] text-[#BE185D]",
};

const estadoAlertaConfig: Record<EstadoAlerta, string> = {
  "En observación": "bg-[#E0F2FE] text-[#0369A1]",
  "Requiere seguimiento": "bg-[#FEF3C7] text-[#92400E]",
  Atendida: "bg-[#DCFCE7] text-[#15803D]",
  "En revisión": "bg-[#EDE9FE] text-[#6D28D9]",
};

const estadoSeguimientoConfig: Record<EstadoSeguimiento, string> = {
  Atendida: "bg-[#DCFCE7] text-[#15803D]",
  "En seguimiento": "bg-[#E0F2FE] text-[#0369A1]",
  "Pendiente de respuesta": "bg-[#FCE7F3] text-[#BE185D]",
  "En análisis": "bg-[#EDE9FE] text-[#6D28D9]",
};

const tabsVisuales = [
  "Resumen",
  "Actividad legislativa",
  "Votaciones",
  "Propuestas ciudadanas",
  "Alertas cívicas",
  "Transparencia",
  "Alineación territorial",
  "Timeline personal",
] as const;

const filtrosPropuestas = ["Todas", "Recibidas", "En revisión", "Respondidas", "Sin respuesta registrada"] as const;
const filtrosAlertas = ["Todas", "Asistencia", "Votación", "Respuesta ciudadana", "Transparencia", "Alineación territorial"] as const;

function crearIniciativas(territorio: string): Iniciativa[] {
  return [
    { titulo: `Transparencia de votaciones públicas en ${territorio}`, categoria: "Transparencia legislativa", estado: "En discusión", fecha: "12 mayo 2026", impactoTerritorial: "Mejora seguimiento ciudadano de decisiones públicas.", tipo: "presentada" },
    { titulo: "Presupuesto territorial participativo", categoria: "Presupuesto público", estado: "En análisis", fecha: "28 abril 2026", impactoTerritorial: "Ordena prioridades de inversión local documentadas.", tipo: "apoyada" },
    { titulo: "Registro de compromisos legislativos", categoria: "Rendición de cuentas", estado: "En votación", fecha: "10 abril 2026", impactoTerritorial: "Permite comparar compromisos con actividad pública.", tipo: "presentada" },
    { titulo: "Cruces seguros cerca de escuelas", categoria: "Movilidad y seguridad vial", estado: "Aprobada", fecha: "02 abril 2026", impactoTerritorial: "Prioriza zonas escolares con reportes ciudadanos.", tipo: "seguimiento" },
    { titulo: "Reporte abierto de sesiones de comisión", categoria: "Acceso a información", estado: "En análisis", fecha: "21 marzo 2026", impactoTerritorial: "Facilita consulta pública de trabajo legislativo.", tipo: "apoyada" },
    { titulo: "Mesa ciudadana de seguimiento trimestral", categoria: "Participación ciudadana", estado: "Archivada", fecha: "08 marzo 2026", impactoTerritorial: "Deja antecedentes para rediseño de participación local.", tipo: "seguimiento" },
  ];
}

function crearVotaciones(): Votacion[] {
  return [
    { tema: "Transparencia pública", votoEmitido: "A favor", fecha: "12 mayo 2026", participacionCiudadanaRelacionada: "Alta" },
    { tema: "Movilidad segura", votoEmitido: "A favor", fecha: "04 mayo 2026", participacionCiudadanaRelacionada: "Media" },
    { tema: "Gasto territorial", votoEmitido: "En contra", fecha: "18 abril 2026", participacionCiudadanaRelacionada: "Alta" },
    { tema: "Audiencias ciudadanas", votoEmitido: "A favor", fecha: "11 abril 2026", participacionCiudadanaRelacionada: "Alta" },
    { tema: "Datos abiertos legislativos", votoEmitido: "A favor", fecha: "05 abril 2026", participacionCiudadanaRelacionada: "Media" },
    { tema: "Reglas de seguimiento de comisiones", votoEmitido: "Abstención", fecha: "29 marzo 2026", participacionCiudadanaRelacionada: "Baja" },
    { tema: "Evaluación de programas locales", votoEmitido: "A favor", fecha: "20 marzo 2026", participacionCiudadanaRelacionada: "Media" },
    { tema: "Agenda de seguridad vial", votoEmitido: "A favor", fecha: "14 marzo 2026", participacionCiudadanaRelacionada: "Alta" },
    { tema: "Informe trimestral de compromisos", votoEmitido: "En contra", fecha: "07 marzo 2026", participacionCiudadanaRelacionada: "Media" },
    { tema: "Canal digital de propuestas", votoEmitido: "A favor", fecha: "28 febrero 2026", participacionCiudadanaRelacionada: "Alta" },
  ];
}

// TODO: reemplazar propuestas mock por datos reales vinculados a representantes y territorio.
function crearPropuestasCiudadanas(territorio: string): PropuestaCiudadana[] {
  return [
    { titulo: `Cruces seguros cerca de escuelas en ${territorio}`, categoria: "Movilidad segura", fechaRecepcion: "09 mayo 2026", firmasCiudadanas: 1246, estadoRespuesta: "Respondida", prioridadCiudadana: "Alta", resumen: "Solicita priorizar pasos peatonales, señalética y reducción de velocidad en zonas escolares." },
    { titulo: "Reporte abierto de sesiones y votaciones", categoria: "Transparencia", fechaRecepcion: "02 mayo 2026", firmasCiudadanas: 690, estadoRespuesta: "En revisión", prioridadCiudadana: "Media", resumen: "Pide publicar de forma clara asistencia, votaciones y participación en comisiones." },
    { titulo: "Semáforo de compromisos públicos", categoria: "Rendición de cuentas", fechaRecepcion: "25 abril 2026", firmasCiudadanas: 438, estadoRespuesta: "Recibida", prioridadCiudadana: "Media", resumen: "Propone dar seguimiento visual a compromisos territoriales y avances documentados." },
    { titulo: "Mesa territorial de seguimiento ciudadano", categoria: "Participación ciudadana", fechaRecepcion: "18 abril 2026", firmasCiudadanas: 238, estadoRespuesta: "Canalizada", prioridadCiudadana: "Baja", resumen: "Sugiere abrir reuniones periódicas para revisar propuestas locales con evidencia pública." },
    { titulo: "Presupuesto para agua comunitaria", categoria: "Servicios públicos", fechaRecepcion: "10 abril 2026", firmasCiudadanas: 860, estadoRespuesta: "En revisión", prioridadCiudadana: "Alta", resumen: "Solicita revisar inversión prioritaria en infraestructura básica y reportes de avance." },
    { titulo: "Informe de respuestas pendientes", categoria: "Seguimiento ciudadano", fechaRecepcion: "03 abril 2026", firmasCiudadanas: 312, estadoRespuesta: "Sin respuesta registrada", prioridadCiudadana: "Alta", resumen: "Busca identificar propuestas recibidas que aún no cuentan con actualización pública." },
  ];
}

// TODO: reemplazar alertas mock por datos reales de seguimiento ciudadano, asistencia, votaciones y respuestas públicas.
function crearAlertasCivicas(territorio: string): AlertaCivica[] {
  return [
    { titulo: "Seguimiento de asistencia reciente", categoria: "Asistencia", severidad: "Media", fecha: "15 mayo 2026", estado: "En observación", resumenCiudadano: "Se registran variaciones recientes en asistencia que conviene revisar con el calendario público.", accionSugerida: "Consultar sesiones y solicitar actualización de asistencia verificable." },
    { titulo: "Votación con alta participación ciudadana", categoria: "Votación", severidad: "Alta", fecha: "12 mayo 2026", estado: "Requiere seguimiento", resumenCiudadano: "Una votación relevante para el territorio tuvo alta participación ciudadana relacionada.", accionSugerida: "Revisar postura pública y contrastarla con prioridades ciudadanas registradas." },
    { titulo: `Respuesta pendiente en ${territorio}`, categoria: "Respuesta ciudadana", severidad: "Media", fecha: "09 mayo 2026", estado: "En revisión", resumenCiudadano: "Hay propuestas ciudadanas que todavía requieren una actualización pública de seguimiento.", accionSugerida: "Pedir claridad sobre estado, plazo estimado y canal de respuesta." },
    { titulo: "Actualización de información pública", categoria: "Transparencia", severidad: "Baja", fecha: "02 mayo 2026", estado: "Atendida", resumenCiudadano: "La ficha recibió una actualización demostrativa de datos de actividad y votaciones.", accionSugerida: "Mantener el historial visible para consulta ciudadana." },
    { titulo: "Diferencia de prioridad territorial", categoria: "Alineación territorial", severidad: "Media", fecha: "25 abril 2026", estado: "En observación", resumenCiudadano: "Algunos temas locales aparecen con menor seguimiento en la actividad pública registrada.", accionSugerida: "Observar próximas votaciones y documentar si aumenta la alineación territorial." },
  ];
}

// TODO: reemplazar alineación mock por cálculo real usando propuestas, votaciones, respuestas ciudadanas y datos territoriales.
function crearPrioridadesTerritoriales(territorio: string): PrioridadTerritorial[] {
  return [
    { tema: `Abasto de agua en zonas prioritarias de ${territorio}`, categoria: "Agua", prioridadCiudadana: "Alta", actividadRelacionada: "Seguimiento a propuesta de presupuesto para agua comunitaria.", estadoSeguimiento: "En seguimiento", alineacion: "Media" },
    { tema: "Entornos seguros y prevención comunitaria", categoria: "Seguridad", prioridadCiudadana: "Alta", actividadRelacionada: "Revisión de reportes ciudadanos y solicitudes de coordinación local.", estadoSeguimiento: "En análisis", alineacion: "Media" },
    { tema: "Atención preventiva y acceso básico a salud", categoria: "Salud", prioridadCiudadana: "Media", actividadRelacionada: "Solicitud de diagnóstico territorial sobre servicios disponibles.", estadoSeguimiento: "Pendiente de respuesta", alineacion: "Baja" },
    { tema: "Escuelas con cruces seguros y mejor conectividad", categoria: "Educación", prioridadCiudadana: "Media", actividadRelacionada: "Iniciativa de cruces seguros cerca de escuelas.", estadoSeguimiento: "Atendida", alineacion: "Alta" },
    { tema: "Movilidad peatonal y transporte accesible", categoria: "Movilidad", prioridadCiudadana: "Alta", actividadRelacionada: "Votaciones vinculadas a movilidad segura y reportes ciudadanos.", estadoSeguimiento: "En seguimiento", alineacion: "Alta" },
    { tema: "Claridad del gasto público territorial", categoria: "Presupuesto público", prioridadCiudadana: "Alta", actividadRelacionada: "Reporte abierto de sesiones, votaciones y gasto territorial.", estadoSeguimiento: "En seguimiento", alineacion: "Media" },
    { tema: "Monitoreo ambiental de zonas comunitarias", categoria: "Medio ambiente", prioridadCiudadana: "Baja", actividadRelacionada: "Seguimiento documental de reportes ambientales locales.", estadoSeguimiento: "En análisis", alineacion: "Media" },
  ];
}

function crearComparativoCiudadano(territorio: string) {
  return [
    { titulo: "Lo que más pide el territorio", descripcion: `En ${territorio} destacan movilidad segura, agua comunitaria y claridad en el uso de recursos públicos.`, color: "bg-[#E0F2FE] text-[#0369A1]" },
    { titulo: "Lo que más atiende el representante", descripcion: "La actividad registrada se concentra en movilidad, transparencia legislativa y seguimiento de propuestas ciudadanas.", color: "bg-[#DCFCE7] text-[#15803D]" },
    { titulo: "Brechas de seguimiento", descripcion: "Salud preventiva, agua comunitaria y presupuesto público mantienen puntos abiertos para revisión documental.", color: "bg-[#FCE7F3] text-[#BE185D]" },
  ];
}

const REPRESENTANTES_MOCK: RepresentanteMock[] = [
  {
    id: "maria-teresa-lopez-garcia",
    nombre: "María Teresa López García",
    iniciales: "ML",
    cargo: "Diputada Federal",
    estado: "Jalisco",
    distrito: "Distrito 10",
    partidoGrupo: "Movimiento Ciudadano",
    tipoRepresentacion: "Elegido por voto directo",
    calificacionCiudadana: 92,
    asistencia: 94,
    inasistencias: 3,
    retardos: 4,
    votosAFavor: 58,
    votosEnContra: 21,
    abstenciones: 8,
    alineacionTerritorial: 78,
    actividadEnPlataforma: "Activa en la plataforma",
    iniciativas: crearIniciativas("Jalisco"),
    votaciones: crearVotaciones(),
    propuestasCiudadanas: crearPropuestasCiudadanas("Jalisco"),
    alertas: crearAlertasCivicas("Jalisco"),
    prioridadesTerritoriales: crearPrioridadesTerritoriales("Jalisco"),
    comparativoCiudadano: crearComparativoCiudadano("Jalisco"),
    indicadoresParticipacion: { asistencia: 94, alineacionTerritorial: 78, participacionCiudadana: 82, transparenciaLegislativa: 88 },
    timeline: [
      { evento: "Perfil creado", fecha: "02 abril 2026", descripcion: "Se abrió ficha pública de seguimiento ciudadano." },
      { evento: "Última actualización", fecha: "12 mayo 2026", descripcion: "Se integraron métricas de votación y asistencia." },
      { evento: "Última votación registrada", fecha: "12 mayo 2026", descripcion: "Votación sobre transparencia de decisiones públicas." },
      { evento: "Última respuesta ciudadana", fecha: "09 mayo 2026", descripcion: "Respuesta registrada a propuesta sobre movilidad segura." },
    ],
  },
  {
    id: "senadora-metropolitana-norte",
    nombre: "Senadora Metropolitana Norte",
    iniciales: "SM",
    cargo: "Senadora de la República",
    estado: "Nuevo León",
    distrito: "Ámbito estatal",
    partidoGrupo: "Grupo institucional verde",
    tipoRepresentacion: "Legislador en funciones",
    calificacionCiudadana: 88,
    asistencia: 95,
    inasistencias: 2,
    retardos: 3,
    votosAFavor: 38,
    votosEnContra: 9,
    abstenciones: 5,
    alineacionTerritorial: 84,
    actividadEnPlataforma: "Activa en la plataforma",
    iniciativas: crearIniciativas("Nuevo León"),
    votaciones: crearVotaciones(),
    propuestasCiudadanas: crearPropuestasCiudadanas("Nuevo León"),
    alertas: crearAlertasCivicas("Nuevo León"),
    prioridadesTerritoriales: crearPrioridadesTerritoriales("Nuevo León"),
    comparativoCiudadano: crearComparativoCiudadano("Nuevo León"),
    indicadoresParticipacion: { asistencia: 95, alineacionTerritorial: 84, participacionCiudadana: 79, transparenciaLegislativa: 91 },
    timeline: [
      { evento: "Perfil creado", fecha: "11 marzo 2026", descripcion: "Ficha inicial de Senado registrada." },
      { evento: "Última actualización", fecha: "06 mayo 2026", descripcion: "Actualización de respuestas ciudadanas." },
      { evento: "Última votación registrada", fecha: "06 mayo 2026", descripcion: "Voto sobre seguimiento público de respuestas." },
      { evento: "Última respuesta ciudadana", fecha: "03 mayo 2026", descripcion: "Respuesta a propuesta de sesiones abiertas." },
    ],
  },
  {
    id: "representante-ciudadano-jalisco",
    nombre: "Representante Ciudadano Jalisco",
    iniciales: "RJ",
    cargo: "Representante ciudadano",
    estado: "Jalisco",
    distrito: "Distrito ciudadano 03",
    partidoGrupo: "Comité ciudadano territorial",
    tipoRepresentacion: "Representante ciudadano por voto popular",
    calificacionCiudadana: 76,
    asistencia: 89,
    inasistencias: 4,
    retardos: 5,
    votosAFavor: 24,
    votosEnContra: 6,
    abstenciones: 3,
    alineacionTerritorial: 81,
    actividadEnPlataforma: "Perfil completado por comité ciudadano",
    iniciativas: crearIniciativas("Jalisco ciudadano"),
    votaciones: crearVotaciones(),
    propuestasCiudadanas: crearPropuestasCiudadanas("Jalisco ciudadano"),
    alertas: crearAlertasCivicas("Jalisco ciudadano"),
    prioridadesTerritoriales: crearPrioridadesTerritoriales("Jalisco ciudadano"),
    comparativoCiudadano: crearComparativoCiudadano("Jalisco ciudadano"),
    indicadoresParticipacion: { asistencia: 89, alineacionTerritorial: 81, participacionCiudadana: 86, transparenciaLegislativa: 80 },
    timeline: [
      { evento: "Perfil creado", fecha: "18 marzo 2026", descripcion: "Registro ciudadano territorial inicial." },
      { evento: "Última actualización", fecha: "01 mayo 2026", descripcion: "Integración de propuestas comunitarias." },
      { evento: "Última votación registrada", fecha: "01 mayo 2026", descripcion: "Postura sobre presupuesto para agua comunitaria." },
      { evento: "Última respuesta ciudadana", fecha: "27 abril 2026", descripcion: "Respuesta a mesa territorial de seguimiento." },
    ],
  },
];

function obtenerRepresentante(id: string) {
  return REPRESENTANTES_MOCK.find((representante) => representante.id === id);
}

export function generateStaticParams() {
  return REPRESENTANTES_MOCK.map((representante) => ({ id: representante.id }));
}

function contarIniciativas(iniciativas: Iniciativa[], tipo: TipoIniciativa) {
  return iniciativas.filter((iniciativa) => iniciativa.tipo === tipo).length;
}

function contarPorEstado<T extends { estado?: string; estadoRespuesta?: string; estadoSeguimiento?: string }>(items: T[], estado: string) {
  return items.filter((item) => item.estado === estado || item.estadoRespuesta === estado || item.estadoSeguimiento === estado).length;
}

function sumarFirmas(propuestas: PropuestaCiudadana[]) {
  return propuestas.reduce((total, propuesta) => total + propuesta.firmasCiudadanas, 0);
}

function obtenerNivelAlineacion(valor: number): Nivel {
  if (valor >= 80) return "Alta";
  if (valor >= 60) return "Media";
  return "Baja";
}

function MetricCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <article className="rounded-[18px] bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
      <div className={`${color} rounded-2xl px-3 py-2 text-2xl font-black`}>{value}</div>
      <div className="mt-2 text-[11px] font-bold uppercase leading-4 text-slate-600">{label}</div>
    </article>
  );
}

export default function CongresoCivicoRepresentantePerfilPage({ params }: { params: { id: string } }) {
  const representante = obtenerRepresentante(params.id);

  if (!representante) {
    notFound();
  }

  const propuestas = representante.propuestasCiudadanas;
  const alertas = representante.alertas;
  const prioridades = representante.prioridadesTerritoriales;
  const nivelAlineacion = obtenerNivelAlineacion(representante.alineacionTerritorial);
  const nivelAlineacionConfig = nivelConfig[nivelAlineacion];
  const nivelRespuestaCiudadana = 68;
  const nivelAtencionAlertas = 72;

  const resumenActividad = [
    { label: "Iniciativas apoyadas", value: contarIniciativas(representante.iniciativas, "apoyada"), color: "bg-[#DCFCE7] text-[#15803D]" },
    { label: "Iniciativas presentadas", value: contarIniciativas(representante.iniciativas, "presentada"), color: "bg-[#E0F2FE] text-[#0369A1]" },
    { label: "Votos emitidos", value: representante.votaciones.length, color: "bg-[#EDE9FE] text-[#6D28D9]" },
    { label: "Propuestas ciudadanas", value: propuestas.length, color: "bg-[#FFF1A8] text-[#0A4E84]" },
    { label: "Alertas activas", value: alertas.filter((alerta) => alerta.estado !== "Atendida").length, color: "bg-[#FFEDD5] text-[#C2410C]" },
  ];

  const metricasBase = [
    { label: "Calificación ciudadana", value: `${representante.calificacionCiudadana}/100`, color: "bg-[#FFF1A8] text-[#0A4E84]" },
    { label: "Asistencia", value: `${representante.asistencia}%`, color: "bg-[#DCFCE7] text-[#15803D]" },
    { label: "Inasistencias", value: representante.inasistencias, color: "bg-[#FCE7F3] text-[#BE185D]" },
    { label: "Retardos", value: representante.retardos, color: "bg-[#FFEDD5] text-[#C2410C]" },
    { label: "Votos a favor", value: representante.votosAFavor, color: "bg-[#E0F2FE] text-[#0369A1]" },
    { label: "Votos en contra", value: representante.votosEnContra, color: "bg-[#FEF3C7] text-[#92400E]" },
    { label: "Abstenciones", value: representante.abstenciones, color: "bg-slate-100 text-slate-600" },
  ];

  const metricasAlineacion = [
    { label: "Alineación territorial", value: `${representante.alineacionTerritorial}%`, color: "bg-[#EDE9FE] text-[#6D28D9]" },
    { label: "Prioridades atendidas", value: contarPorEstado(prioridades, "Atendida"), color: "bg-[#DCFCE7] text-[#15803D]" },
    { label: "Prioridades en seguimiento", value: contarPorEstado(prioridades, "En seguimiento"), color: "bg-[#E0F2FE] text-[#0369A1]" },
    { label: "Participación territorial", value: `${representante.indicadoresParticipacion.participacionCiudadana}%`, color: "bg-[#FFF1A8] text-[#0A4E84]" },
    { label: "Última actualización", value: representante.timeline[1]?.fecha ?? "Sin fecha", color: "bg-[#FCE7F3] text-[#BE185D]" },
  ];

  const metricasPropuestas = [
    { label: "Propuestas recibidas", value: propuestas.length, color: "bg-[#E0F2FE] text-[#0369A1]" },
    { label: "Firmas acumuladas", value: sumarFirmas(propuestas).toLocaleString("es-MX"), color: "bg-[#FFF1A8] text-[#0A4E84]" },
    { label: "Respuestas emitidas", value: contarPorEstado(propuestas, "Respondida"), color: "bg-[#DCFCE7] text-[#15803D]" },
    { label: "En revisión", value: contarPorEstado(propuestas, "En revisión"), color: "bg-[#FEF3C7] text-[#92400E]" },
    { label: "Sin respuesta registrada", value: contarPorEstado(propuestas, "Sin respuesta registrada"), color: "bg-[#FCE7F3] text-[#BE185D]" },
  ];

  const metricasAlertas = [
    { label: "Alertas activas", value: alertas.filter((alerta) => alerta.estado !== "Atendida").length, color: "bg-[#FFEDD5] text-[#C2410C]" },
    { label: "En observación", value: contarPorEstado(alertas, "En observación"), color: "bg-[#E0F2FE] text-[#0369A1]" },
    { label: "Requieren seguimiento", value: contarPorEstado(alertas, "Requiere seguimiento"), color: "bg-[#FEF3C7] text-[#92400E]" },
    { label: "Atendidas", value: contarPorEstado(alertas, "Atendida"), color: "bg-[#DCFCE7] text-[#15803D]" },
    { label: "Última actualización", value: alertas[0]?.fecha ?? "Sin fecha", color: "bg-[#EDE9FE] text-[#6D28D9]" },
  ];

  const indicadores = [
    { label: "Asistencia", value: representante.indicadoresParticipacion.asistencia, color: "bg-[#16A34A]" },
    { label: "Alineación territorial", value: representante.indicadoresParticipacion.alineacionTerritorial, color: "bg-[#8B5CF6]" },
    { label: "Participación ciudadana", value: representante.indicadoresParticipacion.participacionCiudadana, color: "bg-[#0EA5E9]" },
    { label: "Transparencia legislativa", value: representante.indicadoresParticipacion.transparenciaLegislativa, color: "bg-[#E4007C]" },
  ];

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representación
        </Link>

        <section className="mb-5 overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="h-3 bg-[#E4007C]" />
          <div className="grid gap-5 p-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E4007C] via-[#8B5CF6] to-[#0EA5E9] text-3xl font-black text-white shadow-sm">
                {representante.iniciales}
              </div>
              <div>
                <span className={`${tipoConfig[representante.tipoRepresentacion]} inline-flex rounded-full px-4 py-2 text-xs font-black uppercase`}>{representante.tipoRepresentacion}</span>
                <h1 className="mt-3 text-4xl font-black leading-tight text-[#111827] md:text-5xl">{representante.nombre}</h1>
                <p className="mt-2 text-base font-bold text-[#0A4E84]">{representante.cargo}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {representante.estado} · {representante.distrito} · {representante.partidoGrupo}
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-[22px] bg-[#F8FAFC] p-4 md:grid-cols-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Actividad</div>
                <div className="mt-1 text-lg font-black text-[#111827]">{representante.actividadEnPlataforma}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Votos registrados</div>
                <div className="mt-1 text-lg font-black text-[#111827]">{representante.votaciones.length}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Alineación</div>
                <div className="mt-1 text-lg font-black text-[#16A34A]">{representante.alineacionTerritorial}%</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {resumenActividad.map((item) => <MetricCard key={item.label} {...item} />)}
        </section>

        <section className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {metricasBase.map((item) => <MetricCard key={item.label} {...item} />)}
        </section>

        <section className="mb-5 overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Navegación del perfil</div>
          <div className="flex gap-2 overflow-x-auto p-4">
            {tabsVisuales.map((tab, index) => (
              <span key={tab} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-black ${index === 0 ? "bg-[#E4007C] text-white" : "bg-[#F8FAFC] text-slate-600"}`}>{tab}</span>
            ))}
          </div>
        </section>

        <section className="mb-5 overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Alineación territorial</div>
          <div className="grid gap-5 p-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="rounded-[18px] bg-[#F8FAFC] p-4 text-sm font-semibold leading-6 text-slate-600 ring-1 ring-slate-100">
                Este indicador compara prioridades ciudadanas del territorio con la actividad pública registrada del representante.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {metricasAlineacion.map((item) => <MetricCard key={item.label} {...item} />)}
              </div>

              <article className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-[#0A4E84]">¿Cómo se calcula?</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  En esta versión demostrativa, el indicador usa datos de ejemplo. En una etapa posterior podrá calcularse con propuestas ciudadanas, votaciones, asistencia, respuestas públicas y prioridades territoriales verificadas.
                </p>
              </article>
            </div>

            <div className="space-y-4">
              <article className="rounded-[20px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-black text-[#111827]">Nivel de alineación territorial</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">Lectura demostrativa para seguimiento ciudadano.</p>
                  </div>
                  <span className={`${nivelAlineacionConfig.badge} inline-flex rounded-full px-4 py-2 text-xs font-black uppercase`}>{nivelAlineacion}</span>
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <span className={`text-5xl font-black ${nivelAlineacionConfig.text}`}>{representante.alineacionTerritorial}%</span>
                  <span className="pb-2 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Alineación</span>
                </div>
                <div className="mt-4 h-5 overflow-hidden rounded-full bg-white ring-1 ring-slate-100">
                  <div className={`${nivelAlineacionConfig.bar} h-full rounded-full`} style={{ width: `${representante.alineacionTerritorial}%` }} />
                </div>
              </article>

              <div>
                <h2 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-[#0A4E84]">Comparativo ciudadano</h2>
                <div className="grid gap-3 md:grid-cols-3">
                  {representante.comparativoCiudadano.map((item) => (
                    <article key={item.titulo} className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                      <span className={`${item.color} rounded-full px-3 py-1 text-[11px] font-black uppercase`}>{item.titulo}</span>
                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.descripcion}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-[#0A4E84]">Prioridades territoriales</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {prioridades.map((prioridad) => (
                    <article key={`${prioridad.tema}-${prioridad.categoria}`} className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0A4E84] ring-1 ring-slate-100">{prioridad.categoria}</span>
                        <span className={`${nivelConfig[prioridad.prioridadCiudadana].badge} rounded-full px-3 py-1 text-xs font-black`}>Prioridad {prioridad.prioridadCiudadana}</span>
                        <span className={`${estadoSeguimientoConfig[prioridad.estadoSeguimiento]} rounded-full px-3 py-1 text-xs font-black`}>{prioridad.estadoSeguimiento}</span>
                        <span className={`${nivelConfig[prioridad.alineacion].badge} rounded-full px-3 py-1 text-xs font-black`}>Alineación {prioridad.alineacion}</span>
                      </div>
                      <h3 className="mt-3 text-base font-black text-[#111827]">{prioridad.tema}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{prioridad.actividadRelacionada}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Alertas cívicas del representante</div>
          <div className="grid gap-5 p-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {metricasAlertas.map((item) => <MetricCard key={item.label} {...item} />)}
              </div>

              <article className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-[#0A4E84]">¿Qué es una alerta cívica?</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  Una alerta cívica es un aviso ciudadano y documental para dar seguimiento a actividad pública relevante. No constituye acusación ni sanción; sirve para observar, revisar y pedir claridad.
                </p>
              </article>

              <article className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                <div className="flex items-center justify-between gap-3 text-sm font-black text-[#111827]">
                  <span>Nivel de atención a alertas</span>
                  <span>{nivelAtencionAlertas}%</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#E4007C] via-[#F97316] to-[#16A34A]" style={{ width: `${nivelAtencionAlertas}%` }} />
                </div>
              </article>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {filtrosAlertas.map((filtro, index) => (
                  <span key={filtro} className={`rounded-full px-3 py-2 text-xs font-black ${index === 0 ? "bg-[#E4007C] text-white" : "bg-[#F8FAFC] text-slate-600 ring-1 ring-slate-100"}`}>{filtro}</span>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {alertas.map((alerta) => (
                  <article key={`${alerta.titulo}-${alerta.fecha}`} className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                    <div className="flex flex-wrap gap-2">
                      <span className={`${nivelConfig[alerta.severidad].badge} rounded-full px-3 py-1 text-xs font-black`}>{alerta.severidad}</span>
                      <span className={`${estadoAlertaConfig[alerta.estado]} rounded-full px-3 py-1 text-xs font-black`}>{alerta.estado}</span>
                    </div>
                    <h2 className="mt-3 text-base font-black text-[#111827]">{alerta.titulo}</h2>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#0A4E84]">{alerta.categoria} · {alerta.fecha}</p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{alerta.resumenCiudadano}</p>
                    <div className="mt-4 rounded-2xl bg-white p-3 text-sm font-semibold leading-6 text-slate-700 ring-1 ring-slate-100">
                      <span className="font-black text-[#E4007C]">Acción sugerida: </span>{alerta.accionSugerida}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Propuestas ciudadanas recibidas</div>
          <div className="grid gap-5 p-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {metricasPropuestas.map((item) => <MetricCard key={item.label} {...item} />)}
              </div>

              <article className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-[#0A4E84]">¿Qué significa esto?</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  Esta sección muestra las propuestas ciudadanas que han sido registradas para seguimiento territorial. La información es demostrativa y servirá para medir respuesta pública, participación y alineación territorial cuando existan datos reales.
                </p>
              </article>

              <article className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                <div className="flex items-center justify-between gap-3 text-sm font-black text-[#111827]">
                  <span>Nivel de respuesta ciudadana</span>
                  <span>{nivelRespuestaCiudadana}%</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#E4007C] via-[#F97316] to-[#16A34A]" style={{ width: `${nivelRespuestaCiudadana}%` }} />
                </div>
              </article>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {filtrosPropuestas.map((filtro, index) => (
                  <span key={filtro} className={`rounded-full px-3 py-2 text-xs font-black ${index === 0 ? "bg-[#E4007C] text-white" : "bg-[#F8FAFC] text-slate-600 ring-1 ring-slate-100"}`}>{filtro}</span>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {propuestas.map((propuesta) => (
                  <article key={`${propuesta.titulo}-${propuesta.fechaRecepcion}`} className="rounded-[18px] bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
                    <div className="flex flex-wrap gap-2">
                      <span className={`${respuestaConfig[propuesta.estadoRespuesta]} rounded-full px-3 py-1 text-xs font-black`}>{propuesta.estadoRespuesta}</span>
                      <span className={`${nivelConfig[propuesta.prioridadCiudadana].badge} rounded-full px-3 py-1 text-xs font-black`}>Prioridad {propuesta.prioridadCiudadana}</span>
                    </div>
                    <h2 className="mt-3 text-base font-black text-[#111827]">{propuesta.titulo}</h2>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#0A4E84]">{propuesta.categoria} · {propuesta.fechaRecepcion}</p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{propuesta.resumen}</p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="rounded-2xl bg-white px-3 py-2 text-sm font-black text-[#111827] ring-1 ring-slate-100">
                        {propuesta.firmasCiudadanas.toLocaleString("es-MX")} firmas
                      </span>
                      <Link href="/congreso-civico/iniciativas" className="rounded-full bg-[#E4007C] px-4 py-2 text-center text-xs font-black uppercase text-white shadow-sm">
                        Ver propuesta
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Resumen ciudadano</div>
              <div className="p-5">
                <p className="text-base font-semibold leading-7 text-slate-700">
                  Este perfil concentra información pública y ciudadana sobre actividad legislativa, asistencia, votaciones, propuestas recibidas y nivel de alineación territorial.
                </p>
              </div>
            </section>

            <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Actividad legislativa</div>
              <div className="grid gap-3 p-5">
                {representante.iniciativas.map((iniciativa) => (
                  <article key={iniciativa.titulo} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#0A4E84]">{iniciativa.tipo}</span>
                      <span className={`${estadoIniciativaConfig[iniciativa.estado]} rounded-full px-3 py-1 text-xs font-black`}>{iniciativa.estado}</span>
                    </div>
                    <h2 className="mt-3 text-lg font-black text-[#111827]">{iniciativa.titulo}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{iniciativa.categoria} · {iniciativa.fecha}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{iniciativa.impactoTerritorial}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Votaciones recientes</div>
              <div className="overflow-x-auto p-5">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="text-xs uppercase text-slate-500">
                    <tr>
                      <th className="pb-3">Tema</th>
                      <th className="pb-3">Fecha</th>
                      <th className="pb-3">Voto emitido</th>
                      <th className="pb-3">Participación ciudadana relacionada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {representante.votaciones.map((votacion) => (
                      <tr key={`${votacion.tema}-${votacion.fecha}`}>
                        <td className="py-3 font-bold text-[#111827]">{votacion.tema}</td>
                        <td className="py-3 text-slate-600">{votacion.fecha}</td>
                        <td className="py-3 font-semibold text-[#0A4E84]">{votacion.votoEmitido}</td>
                        <td className="py-3"><span className={`${nivelConfig[votacion.participacionCiudadanaRelacionada].badge} rounded-full px-3 py-1 text-xs font-black`}>{votacion.participacionCiudadanaRelacionada}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#0A4E84] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Transparencia y participación</div>
              <div className="grid gap-4 p-5">
                {indicadores.map((indicador) => (
                  <div key={indicador.label}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm font-black text-[#111827]">
                      <span>{indicador.label}</span>
                      <span>{indicador.value}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className={`${indicador.color} h-full rounded-full`} style={{ width: `${indicador.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Timeline personal</div>
              <div className="grid gap-3 p-5">
                {representante.timeline.map((item) => (
                  <article key={`${item.evento}-${item.fecha}`} className="border-l-4 border-[#E4007C] bg-[#F8FAFC] px-4 py-3">
                    <h2 className="font-black text-[#111827]">{item.evento}</h2>
                    <p className="mt-1 text-xs font-bold text-[#0A4E84]">{item.fecha}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.descripcion}</p>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
