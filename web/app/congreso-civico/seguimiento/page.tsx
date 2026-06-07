import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";
type EstadoSeguimiento =
  | "Activa"
  | "Revisión técnica"
  | "Con observaciones técnicas"
  | "Lista para votación"
  | "Aprobada"
  | "Rechazada";

type IniciativaSeguimiento = {
  id: string;
  titulo: string;
  estado: EstadoSeguimiento;
  comiteResponsable: string;
  expertosParticipantes: string[];
  apoyoCiudadano: number;
  ultimaActualizacion: string;
  resumen: string;
  color: string;
};

const iniciativasSeguimiento: IniciativaSeguimiento[] = [
  {
    id: "agua-y-servicios-locales",
    titulo: "Agua y servicios locales verificables",
    estado: "Activa",
    comiteResponsable: "Comité de Presupuesto Territorial",
    expertosParticipantes: ["Mariana Soto", "Rocío Padilla"],
    apoyoCiudadano: 84,
    ultimaActualizacion: "2 junio 2026",
    resumen: "Seguimiento ciudadano a servicios de agua, mantenimiento y reportes territoriales.",
    color: "bg-[#0EA5E9] text-white",
  },
  {
    id: "votaciones-legislativas-abiertas",
    titulo: "Votaciones legislativas abiertas",
    estado: "Revisión técnica",
    comiteResponsable: "Comité de Transparencia Legislativa",
    expertosParticipantes: ["Ana Paula Rivera", "Luis Fernando Mora"],
    apoyoCiudadano: 91,
    ultimaActualizacion: "29 mayo 2026",
    resumen: "Fichas claras para explicar votaciones públicas, trazabilidad y lenguaje ciudadano.",
    color: "bg-[#E4007C] text-white",
  },
  {
    id: "participacion-accesible-barrios",
    titulo: "Participación accesible por barrios",
    estado: "Con observaciones técnicas",
    comiteResponsable: "Comité de Derechos y Participación",
    expertosParticipantes: ["Daniela Chávez", "Mateo Núñez"],
    apoyoCiudadano: 76,
    ultimaActualizacion: "24 mayo 2026",
    resumen: "Formatos simples para consultar propuestas ciudadanas por colonia y comunidad.",
    color: "bg-[#16A34A] text-white",
  },
  {
    id: "presupuesto-visible-distrito",
    titulo: "Presupuesto visible por distrito",
    estado: "Lista para votación",
    comiteResponsable: "Comité de Presupuesto Territorial",
    expertosParticipantes: ["Mariana Soto", "Ernesto Galván"],
    apoyoCiudadano: 88,
    ultimaActualizacion: "18 mayo 2026",
    resumen: "Información presupuestal por territorio para facilitar revisión ciudadana.",
    color: "bg-[#F97316] text-white",
  },
  {
    id: "movilidad-segura-colonias",
    titulo: "Movilidad segura por colonias",
    estado: "Aprobada",
    comiteResponsable: "Comité de Derechos y Participación",
    expertosParticipantes: ["Claudia Ríos", "Mateo Núñez"],
    apoyoCiudadano: 82,
    ultimaActualizacion: "11 mayo 2026",
    resumen: "Ruta demostrativa para priorizar cruces, banquetas y traslados seguros.",
    color: "bg-[#8B5CF6] text-white",
  },
  {
    id: "registro-publico-sesiones",
    titulo: "Registro público de sesiones locales",
    estado: "Rechazada",
    comiteResponsable: "Comité de Transparencia Legislativa",
    expertosParticipantes: ["Luis Fernando Mora", "Ana Paula Rivera"],
    apoyoCiudadano: 63,
    ultimaActualizacion: "6 mayo 2026",
    resumen: "Propuesta demostrativa para publicar síntesis ciudadanas de sesiones y acuerdos.",
    color: "bg-[#64748B] text-white",
  },
];

const etapasSeguimiento: Array<{ estado: EstadoSeguimiento; descripcion: string; color: string }> = [
  { estado: "Activa", descripcion: "La iniciativa está abierta para seguimiento ciudadano.", color: "bg-[#0EA5E9] text-white" },
  { estado: "Revisión técnica", descripcion: "Un comité revisa alcance, evidencia y claridad.", color: "bg-[#E4007C] text-white" },
  { estado: "Con observaciones técnicas", descripcion: "Hay comentarios técnicos para mejorar la propuesta.", color: "bg-[#F97316] text-white" },
  { estado: "Lista para votación", descripcion: "La propuesta está lista para una etapa de decisión cívica.", color: "bg-[#F2C300] text-[#1F2937]" },
  { estado: "Aprobada", descripcion: "La iniciativa concluyó con resultado favorable en esta vista demo.", color: "bg-[#16A34A] text-white" },
  { estado: "Rechazada", descripcion: "La iniciativa concluyó sin avanzar en esta etapa demostrativa.", color: "bg-[#64748B] text-white" },
];

const metricasSeguimiento = [
  {
    label: "Iniciativas activas",
    valor: iniciativasSeguimiento.filter((iniciativa) => iniciativa.estado === "Activa").length,
    clase: "bg-[#0EA5E9] text-white",
  },
  {
    label: "Revisiones técnicas abiertas",
    valor: iniciativasSeguimiento.filter((iniciativa) => iniciativa.estado === "Revisión técnica" || iniciativa.estado === "Con observaciones técnicas").length,
    clase: "bg-[#E4007C] text-white",
  },
  {
    label: "Listas para votación",
    valor: iniciativasSeguimiento.filter((iniciativa) => iniciativa.estado === "Lista para votación").length,
    clase: "bg-[#F2C300] text-[#1F2937]",
  },
  {
    label: "Iniciativas concluidas",
    valor: iniciativasSeguimiento.filter((iniciativa) => iniciativa.estado === "Aprobada" || iniciativa.estado === "Rechazada").length,
    clase: "bg-[#16A34A] text-white",
  },
] as const;

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando seguimiento",
    descripcion: "La información legislativa cívica se está preparando para consulta.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Sin iniciativas en seguimiento",
    descripcion: "Cuando existan iniciativas cívicas aparecerán en esta sección.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar el seguimiento",
    descripcion: "Esta vista usa datos demostrativos y no realiza conexión con servicios externos.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

function iniciativasPorEstado(estado: EstadoSeguimiento) {
  return iniciativasSeguimiento.filter((iniciativa) => iniciativa.estado === estado);
}

export default function CongresoCivicoSeguimientoPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Cívico
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Seguimiento Legislativo Cívico</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Centro de seguimiento ciudadano</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Consulta en qué etapa está cada iniciativa, qué comité participa, quién revisa y cuándo fue su última actualización.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Datos locales demo</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta vista no sustituye procesos formales. Organiza información demostrativa para seguimiento ciudadano neutral.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricasSeguimiento.map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <h2 className="text-2xl font-bold text-[#E4007C]">Etapas del seguimiento</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {etapasSeguimiento.map((etapa) => (
              <article key={etapa.estado} className="rounded-2xl bg-[#F8FAFC] p-4">
                <span className={`${etapa.color} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>{etapa.estado}</span>
                <p className="mt-3 text-sm leading-6 text-slate-600">{etapa.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-5 xl:grid-cols-2">
          {etapasSeguimiento.map((etapa) => {
            const iniciativas = iniciativasPorEstado(etapa.estado);
            return (
              <article key={etapa.estado} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-[#0A4E84]">{etapa.estado}</h2>
                  <span className={`${etapa.color} rounded-full px-3 py-1 text-xs font-bold`}>{iniciativas.length}</span>
                </div>

                <div className="mt-5 space-y-4">
                  {iniciativas.map((iniciativa) => (
                    <Link
                      key={iniciativa.id}
                      href={`/congreso-civico/iniciativas/${iniciativa.id}`}
                      className="block rounded-2xl bg-[#F8FAFC] p-4 transition hover:bg-[#FCE7F3]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-[#0A4E84]">{iniciativa.titulo}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{iniciativa.resumen}</p>
                        </div>
                        <span className={`${iniciativa.color} shrink-0 rounded-full px-3 py-1 text-xs font-bold`}>{iniciativa.apoyoCiudadano}% apoyo</span>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <div className="rounded-xl bg-white p-3"><strong>Comité:</strong> {iniciativa.comiteResponsable}</div>
                        <div className="rounded-xl bg-white p-3"><strong>Expertos:</strong> {iniciativa.expertosParticipantes.join(", ")}</div>
                        <div className="rounded-xl bg-white p-3"><strong>Actualización:</strong> {iniciativa.ultimaActualizacion}</div>
                        <div className="rounded-xl bg-white p-3"><strong>Estado:</strong> {iniciativa.estado}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <h2 className="text-xl font-bold text-[#E4007C]">Estados de interfaz</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {(Object.keys(estadosVisuales) as EstadoVisual[]).map((tipo) => {
              const estado = estadosVisuales[tipo];
              return (
                <div key={tipo} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <span className={`${estado.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{tipo}</span>
                  <div className="mt-3 font-bold text-[#0A4E84]">{estado.titulo}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{estado.descripcion}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
