import Link from "next/link";
import { notFound } from "next/navigation";

type TipoRepresentacion =
  | "Elegido por voto directo"
  | "Representación proporcional"
  | "Representación en disputa ciudadana"
  | "Curul socialmente impugnada"
  | "Representante ciudadano por voto popular"
  | "Legislador en funciones";

type SeveridadAlerta = "baja" | "media" | "alta";
type EstadoIniciativa = "En discusión" | "En análisis" | "En votación" | "Aprobada" | "Archivada";
type TipoIniciativa = "apoyada" | "presentada" | "seguimiento";
type VotoEmitido = "A favor" | "En contra" | "Abstención";
type EstadoRespuesta = "Recibida" | "En revisión" | "Respondida";

type IniciativaLegislativa = {
  titulo: string;
  categoria: string;
  estado: EstadoIniciativa;
  fecha: string;
  impactoTerritorial: string;
  tipo: TipoIniciativa;
};

type VotacionReciente = {
  tema: string;
  fecha: string;
  votoEmitido: VotoEmitido;
  participacionCiudadanaRelacionada: string;
};

type RespuestaCiudadana = {
  propuestaRecibida: string;
  fecha: string;
  estadoRespuesta: EstadoRespuesta;
};

type IndicadoresParticipacion = {
  asistencia: number;
  alineacionTerritorial: number;
  participacionCiudadana: number;
  transparenciaLegislativa: number;
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
  votosEmitidos: number;
  votosAFavor: number;
  votosEnContra: number;
  abstenciones: number;
  iniciativasApoyadas: number;
  propuestasCiudadanasRecibidas: number;
  firmasCiudadanasRecibidas: number;
  respuestasACiudadanos: number;
  alertasCivicas: number;
  alineacionTerritorial: number;
  actividadEnPlataforma: string;
  iniciativas: IniciativaLegislativa[];
  votaciones: VotacionReciente[];
  respuestasCiudadanas: RespuestaCiudadana[];
  indicadoresParticipacion: IndicadoresParticipacion;
  alertas: Array<{ titulo: string; severidad: SeveridadAlerta; descripcion: string }>;
  timeline: Array<{ evento: string; fecha: string; descripcion: string }>;
};

const tipoConfig: Record<TipoRepresentacion, { badge: string; dot: string }> = {
  "Elegido por voto directo": { badge: "bg-[#FCE7F3] text-[#BE185D]", dot: "bg-[#E4007C]" },
  "Representación proporcional": { badge: "bg-[#E0F2FE] text-[#0369A1]", dot: "bg-[#0EA5E9]" },
  "Representación en disputa ciudadana": { badge: "bg-[#FFEDD5] text-[#C2410C]", dot: "bg-[#F97316]" },
  "Curul socialmente impugnada": { badge: "bg-[#FEF3C7] text-[#92400E]", dot: "bg-[#F2C300]" },
  "Representante ciudadano por voto popular": { badge: "bg-[#EDE9FE] text-[#6D28D9]", dot: "bg-[#8B5CF6]" },
  "Legislador en funciones": { badge: "bg-[#DCFCE7] text-[#15803D]", dot: "bg-[#16A34A]" },
};

const alertaConfig: Record<SeveridadAlerta, string> = {
  baja: "bg-[#E0F2FE] text-[#0369A1]",
  media: "bg-[#FEF3C7] text-[#92400E]",
  alta: "bg-[#FFEDD5] text-[#C2410C]",
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
};

const tabsVisuales = [
  "Resumen",
  "Actividad legislativa",
  "Votaciones",
  "Respuestas ciudadanas",
  "Transparencia",
  "Alertas cívicas",
  "Alineación territorial",
  "Timeline personal",
] as const;

function crearIniciativas(territorio: string): IniciativaLegislativa[] {
  return [
    {
      titulo: `Transparencia de votaciones públicas en ${territorio}`,
      categoria: "Transparencia legislativa",
      estado: "En discusión",
      fecha: "12 mayo 2026",
      impactoTerritorial: "Mejora seguimiento ciudadano de decisiones públicas.",
      tipo: "presentada",
    },
    {
      titulo: "Presupuesto territorial participativo",
      categoria: "Presupuesto público",
      estado: "En análisis",
      fecha: "28 abril 2026",
      impactoTerritorial: "Ordena prioridades de inversión local documentadas.",
      tipo: "apoyada",
    },
    {
      titulo: "Registro de compromisos legislativos",
      categoria: "Rendición de cuentas",
      estado: "En votación",
      fecha: "10 abril 2026",
      impactoTerritorial: "Permite comparar compromisos con actividad pública.",
      tipo: "presentada",
    },
    {
      titulo: "Cruces seguros cerca de escuelas",
      categoria: "Movilidad y seguridad vial",
      estado: "Aprobada",
      fecha: "02 abril 2026",
      impactoTerritorial: "Prioriza zonas escolares con reportes ciudadanos.",
      tipo: "seguimiento",
    },
    {
      titulo: "Reporte abierto de sesiones de comisión",
      categoria: "Acceso a información",
      estado: "En análisis",
      fecha: "21 marzo 2026",
      impactoTerritorial: "Facilita consulta pública de trabajo legislativo.",
      tipo: "apoyada",
    },
    {
      titulo: "Mesa ciudadana de seguimiento trimestral",
      categoria: "Participación ciudadana",
      estado: "Archivada",
      fecha: "08 marzo 2026",
      impactoTerritorial: "Deja antecedentes para rediseño de participación local.",
      tipo: "seguimiento",
    },
  ];
}

function crearVotaciones(): VotacionReciente[] {
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

function crearRespuestas(): RespuestaCiudadana[] {
  return [
    { propuestaRecibida: "Cruces seguros cerca de escuelas", fecha: "09 mayo 2026", estadoRespuesta: "Respondida" },
    { propuestaRecibida: "Reporte abierto de sesiones", fecha: "02 mayo 2026", estadoRespuesta: "En revisión" },
    { propuestaRecibida: "Semáforo de compromisos públicos", fecha: "25 abril 2026", estadoRespuesta: "Recibida" },
    { propuestaRecibida: "Audiencias ciudadanas trimestrales", fecha: "18 abril 2026", estadoRespuesta: "Respondida" },
    { propuestaRecibida: "Mesa territorial de seguimiento", fecha: "10 abril 2026", estadoRespuesta: "En revisión" },
  ];
}

// TODO: sustituir estos datos mock por fuentes oficiales y registros ciudadanos normalizados en una integración posterior.
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
    votosEmitidos: 87,
    votosAFavor: 58,
    votosEnContra: 21,
    abstenciones: 8,
    iniciativasApoyadas: 7,
    propuestasCiudadanasRecibidas: 18,
    firmasCiudadanasRecibidas: 1246,
    respuestasACiudadanos: 18,
    alertasCivicas: 2,
    alineacionTerritorial: 78,
    actividadEnPlataforma: "Activa en la plataforma",
    iniciativas: crearIniciativas("Jalisco"),
    votaciones: crearVotaciones(),
    respuestasCiudadanas: crearRespuestas(),
    indicadoresParticipacion: { asistencia: 94, alineacionTerritorial: 78, participacionCiudadana: 82, transparenciaLegislativa: 88 },
    alertas: [
      { titulo: "Seguimiento de respuesta pendiente", severidad: "media", descripcion: "Una propuesta ciudadana requiere actualización pública de avance." },
      { titulo: "Diferencia de prioridad territorial", severidad: "baja", descripcion: "Hay temas locales con seguimiento legislativo todavía limitado." },
    ],
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
    votosEmitidos: 52,
    votosAFavor: 38,
    votosEnContra: 9,
    abstenciones: 5,
    iniciativasApoyadas: 6,
    propuestasCiudadanasRecibidas: 12,
    firmasCiudadanasRecibidas: 1690,
    respuestasACiudadanos: 42,
    alertasCivicas: 1,
    alineacionTerritorial: 84,
    actividadEnPlataforma: "Activa en la plataforma",
    iniciativas: crearIniciativas("Nuevo León"),
    votaciones: crearVotaciones(),
    respuestasCiudadanas: crearRespuestas(),
    indicadoresParticipacion: { asistencia: 95, alineacionTerritorial: 84, participacionCiudadana: 79, transparenciaLegislativa: 91 },
    alertas: [
      { titulo: "Alta participación ciudadana recibida", severidad: "baja", descripcion: "El volumen de propuestas exige seguimiento público constante." },
    ],
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
    votosEmitidos: 33,
    votosAFavor: 24,
    votosEnContra: 6,
    abstenciones: 3,
    iniciativasApoyadas: 5,
    propuestasCiudadanasRecibidas: 14,
    firmasCiudadanasRecibidas: 1510,
    respuestasACiudadanos: 28,
    alertasCivicas: 1,
    alineacionTerritorial: 81,
    actividadEnPlataforma: "Perfil completado por comité ciudadano",
    iniciativas: crearIniciativas("Jalisco ciudadano"),
    votaciones: crearVotaciones(),
    respuestasCiudadanas: crearRespuestas(),
    indicadoresParticipacion: { asistencia: 89, alineacionTerritorial: 81, participacionCiudadana: 86, transparenciaLegislativa: 80 },
    alertas: [
      { titulo: "Seguimiento pendiente de compromisos", severidad: "media", descripcion: "Hay compromisos ciudadanos que requieren cierre documental." },
    ],
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

function contarIniciativas(iniciativas: IniciativaLegislativa[], tipo: TipoIniciativa) {
  return iniciativas.filter((iniciativa) => iniciativa.tipo === tipo).length;
}

export default function CongresoCivicoRepresentantePerfilPage({ params }: { params: { id: string } }) {
  const representante = obtenerRepresentante(params.id);

  if (!representante) {
    notFound();
  }

  const tipo = tipoConfig[representante.tipoRepresentacion];
  const resumenActividad = [
    { label: "Iniciativas apoyadas", valor: contarIniciativas(representante.iniciativas, "apoyada"), color: "bg-[#DCFCE7] text-[#15803D]" },
    { label: "Iniciativas presentadas", valor: contarIniciativas(representante.iniciativas, "presentada"), color: "bg-[#E0F2FE] text-[#0369A1]" },
    { label: "Votos emitidos", valor: representante.votaciones.length, color: "bg-[#EDE9FE] text-[#6D28D9]" },
    { label: "Respuestas ciudadanas", valor: representante.respuestasCiudadanas.length, color: "bg-[#FFF1A8] text-[#0A4E84]" },
    { label: "Alertas activas", valor: representante.alertas.length, color: "bg-[#FFEDD5] text-[#C2410C]" },
  ];
  const metricas = [
    { label: "Calificación ciudadana", valor: `${representante.calificacionCiudadana}/100`, color: "bg-[#FFF1A8] text-[#0A4E84]" },
    { label: "Asistencia", valor: `${representante.asistencia}%`, color: "bg-[#DCFCE7] text-[#15803D]" },
    { label: "Inasistencias", valor: representante.inasistencias, color: "bg-[#FCE7F3] text-[#BE185D]" },
    { label: "Retardos", valor: representante.retardos, color: "bg-[#FFEDD5] text-[#C2410C]" },
    { label: "Votos a favor", valor: representante.votosAFavor, color: "bg-[#E0F2FE] text-[#0369A1]" },
    { label: "Votos en contra", valor: representante.votosEnContra, color: "bg-[#FEF3C7] text-[#92400E]" },
    { label: "Abstenciones", valor: representante.abstenciones, color: "bg-slate-100 text-slate-600" },
  ];
  const indicadores = [
    { label: "Asistencia", valor: representante.indicadoresParticipacion.asistencia, color: "bg-[#16A34A]" },
    { label: "Alineación territorial", valor: representante.indicadoresParticipacion.alineacionTerritorial, color: "bg-[#8B5CF6]" },
    { label: "Participación ciudadana", valor: representante.indicadoresParticipacion.participacionCiudadana, color: "bg-[#0EA5E9]" },
    { label: "Transparencia legislativa", valor: representante.indicadoresParticipacion.transparenciaLegislativa, color: "bg-[#E4007C]" },
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
                <span className={`${tipo.badge} inline-flex rounded-full px-4 py-2 text-xs font-black uppercase`}>{representante.tipoRepresentacion}</span>
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
          {resumenActividad.map((item) => (
            <article key={item.label} className="rounded-[18px] bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
              <div className={`${item.color} rounded-2xl px-3 py-2 text-2xl font-black`}>{item.valor}</div>
              <div className="mt-2 text-[11px] font-bold uppercase leading-4 text-slate-600">{item.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {metricas.map((metrica) => (
            <article key={metrica.label} className="rounded-[18px] bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
              <div className={`${metrica.color} rounded-2xl px-3 py-2 text-2xl font-black`}>{metrica.valor}</div>
              <div className="mt-2 text-[11px] font-bold uppercase leading-4 text-slate-600">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-5 overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Navegación del perfil</div>
          <div className="flex gap-2 overflow-x-auto p-4">
            {tabsVisuales.map((tab, index) => (
              <span key={tab} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-black ${index === 0 ? "bg-[#E4007C] text-white" : "bg-[#F8FAFC] text-slate-600"}`}>{tab}</span>
            ))}
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
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#0A4E84]">{iniciativa.tipo}</span>
                          <span className={`${estadoIniciativaConfig[iniciativa.estado]} rounded-full px-3 py-1 text-xs font-black`}>{iniciativa.estado}</span>
                        </div>
                        <h2 className="mt-3 text-lg font-black text-[#111827]">{iniciativa.titulo}</h2>
                        <p className="mt-1 text-sm font-semibold text-slate-600">{iniciativa.categoria} · {iniciativa.fecha}</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{iniciativa.impactoTerritorial}</p>
                      </div>
                    </div>
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
                        <td className="py-3"><span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-black text-[#15803D]">{votacion.participacionCiudadanaRelacionada}</span></td>
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
                      <span>{indicador.valor}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className={`${indicador.color} h-full rounded-full`} style={{ width: `${indicador.valor}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Respuestas ciudadanas</div>
              <div className="grid gap-3 p-5">
                {representante.respuestasCiudadanas.map((respuesta) => (
                  <article key={`${respuesta.propuestaRecibida}-${respuesta.fecha}`} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <span className={`${respuestaConfig[respuesta.estadoRespuesta]} rounded-full px-3 py-1 text-xs font-black`}>{respuesta.estadoRespuesta}</span>
                    <h2 className="mt-3 font-black text-[#111827]">{respuesta.propuestaRecibida}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{respuesta.fecha}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Alertas cívicas</div>
              <div className="grid gap-3 p-5">
                {representante.alertas.map((alerta) => (
                  <article key={alerta.titulo} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <span className={`${alertaConfig[alerta.severidad]} rounded-full px-3 py-1 text-xs font-black uppercase`}>{alerta.severidad}</span>
                    <h2 className="mt-3 font-black text-[#111827]">{alerta.titulo}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{alerta.descripcion}</p>
                  </article>
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
