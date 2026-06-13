import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";

type MetricaDashboard = {
  label: string;
  valor: string | number;
  detalle: string;
  clase: string;
};

type ActividadCiudadana = {
  titulo: string;
  descripcion: string;
  fecha: string;
  color: string;
};

const metricasCiudadanas: MetricaDashboard[] = [
  {
    label: "Iniciativas apoyadas",
    valor: 8,
    detalle: "Propuestas ciudadanas con seguimiento personal",
    clase: "bg-[#E4007C] text-white",
  },
  {
    label: "Alertas activas",
    valor: 5,
    detalle: "Temas que requieren observación cívica",
    clase: "bg-[#F97316] text-white",
  },
  {
    label: "Comités observados",
    valor: 4,
    detalle: "Equipos técnicos seguidos por la ciudadanía",
    clase: "bg-[#0EA5E9] text-white",
  },
  {
    label: "Representantes vinculados",
    valor: 6,
    detalle: "Perfiles asociados al territorio ciudadano",
    clase: "bg-[#16A34A] text-white",
  },
];

const iniciativasSeguidas = [
  { titulo: "Votaciones legislativas abiertas", estado: "Con observaciones", avance: 72, href: "/congreso-civico/iniciativas/votaciones-legislativas-abiertas" },
  { titulo: "Presupuesto visible por distrito", estado: "Lista para seguimiento", avance: 88, href: "/congreso-civico/iniciativas/presupuesto-visible-distrito" },
  { titulo: "Participación accesible por barrios", estado: "Recibida", avance: 54, href: "/congreso-civico/iniciativas/participacion-accesible-barrios" },
];

const representantesSeguidos = [
  { nombre: "María Teresa López García", rol: "Diputada Federal", territorio: "Jalisco - Distrito 10", alineacion: 78, href: "/congreso-civico/representacion/representantes/maria-teresa-lopez-garcia" },
  { nombre: "Senadora Metropolitana Norte", rol: "Senado de la República", territorio: "Circunscripción norte", alineacion: 82, href: "/congreso-civico/representacion/representantes/senadora-metropolitana-norte" },
  { nombre: "Representante ciudadano Jalisco", rol: "Representante ciudadano", territorio: "Jalisco", alineacion: 91, href: "/congreso-civico/representacion/representantes/representante-ciudadano-jalisco" },
];

const comitesSeguidos = [
  { nombre: "Comité de Transparencia Legislativa", enfoque: "Votaciones y asistencia", estado: "Activo", href: "/congreso-civico/comites/transparencia-legislativa" },
  { nombre: "Comité de Presupuesto Territorial", enfoque: "Gasto público local", estado: "En revisión", href: "/congreso-civico/comites/presupuesto-territorial" },
  { nombre: "Comité de Derechos y Participación", enfoque: "Accesibilidad y lenguaje claro", estado: "En formación", href: "/congreso-civico/comites/derechos-y-participacion" },
];

const alertasRecientes = [
  { titulo: "Seguimiento de respuesta ciudadana", severidad: "Media", descripcion: "Una propuesta requiere actualización pública de estado.", color: "bg-[#FFF1A8] text-[#0A4E84]" },
  { titulo: "Actualización de fuente documental", severidad: "Baja", descripcion: "Se sugiere revisar fecha y origen de evidencia disponible.", color: "bg-[#E0F2FE] text-[#0369A1]" },
  { titulo: "Alineación territorial en observación", severidad: "Alta", descripcion: "Un tema prioritario del territorio necesita seguimiento adicional.", color: "bg-[#FCE7F3] text-[#BE185D]" },
];

const actividadReciente: ActividadCiudadana[] = [
  {
    titulo: "Nueva iniciativa agregada a seguimiento",
    descripcion: "Presupuesto visible por distrito fue marcada para revisión ciudadana.",
    fecha: "Hoy",
    color: "bg-[#E4007C]",
  },
  {
    titulo: "Perfil de representante consultado",
    descripcion: "Se revisó actividad legislativa y alineación territorial.",
    fecha: "Ayer",
    color: "bg-[#0EA5E9]",
  },
  {
    titulo: "Comité técnico observado",
    descripcion: "Transparencia Legislativa quedó agregado al tablero personal.",
    fecha: "Hace 2 días",
    color: "bg-[#8B5CF6]",
  },
];

const proximosPasos = [
  { titulo: "Ver actividad ciudadana", descripcion: "Consulta apoyos, alertas e historial de participación.", href: "/congreso-civico/actividad" },
  { titulo: "Buscar mi representante", descripcion: "Ubica perfiles por estado, municipio, colonia o código postal.", href: "/congreso-civico/representacion/buscar" },
  { titulo: "Revisar iniciativas", descripcion: "Consulta propuestas ciudadanas y su avance cívico.", href: "/congreso-civico/iniciativas" },
  { titulo: "Explorar comités", descripcion: "Conoce equipos ciudadanos de revisión técnica.", href: "/congreso-civico/comites" },
];

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando dashboard",
    descripcion: "La información ciudadana se está preparando para consulta.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Sin actividad ciudadana",
    descripcion: "Cuando sigas iniciativas, representantes o comités aparecerán aquí.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar el tablero",
    descripcion: "Esta vista usa datos demostrativos y no realiza conexión con servicios externos.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

export default function CongresoCivicoDashboardPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Cívico
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Dashboard Ciudadano</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Tu seguimiento del Congreso Cívico</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Un tablero demostrativo para ver iniciativas, representantes, comités y alertas cívicas en un solo lugar.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Datos locales demo</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta primera versión no guarda información personal ni conecta con servicios externos. Sirve para visualizar el flujo ciudadano.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricasCiudadanas.map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-800">{metrica.label}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{metrica.detalle}</p>
            </article>
          ))}
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Participación ciudadana</div>
                  <h2 className="mt-1 text-2xl font-bold">Resumen de seguimiento</h2>
                </div>
                <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">Vista demostrativa</span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  { label: "Temas observados", valor: "12", color: "text-[#E4007C]" },
                  { label: "Actualizaciones", valor: "21", color: "text-[#F97316]" },
                  { label: "Próximas revisiones", valor: "4", color: "text-[#16A34A]" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <div className={`text-3xl font-bold ${item.color}`}>{item.valor}</div>
                    <div className="mt-2 text-sm font-bold text-slate-700">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
              <h2 className="text-2xl font-bold text-[#E4007C]">Iniciativas seguidas</h2>
              <div className="mt-5 space-y-4">
                {iniciativasSeguidas.map((iniciativa) => (
                  <Link key={iniciativa.titulo} href={iniciativa.href} className="block rounded-2xl bg-[#F8FAFC] p-4 transition hover:bg-[#FCE7F3]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-[#0A4E84]">{iniciativa.titulo}</h3>
                        <p className="mt-1 text-sm text-slate-600">{iniciativa.estado}</p>
                      </div>
                      <span className="rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold text-white">{iniciativa.avance}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-[#E4007C]" style={{ width: `${iniciativa.avance}%` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
                <h2 className="text-2xl font-bold text-[#E4007C]">Representantes seguidos</h2>
                <div className="mt-5 space-y-3">
                  {representantesSeguidos.map((representante) => (
                    <Link key={representante.nombre} href={representante.href} className="block rounded-2xl bg-[#F8FAFC] p-4 transition hover:bg-[#E0F2FE]">
                      <div className="font-bold text-[#0A4E84]">{representante.nombre}</div>
                      <div className="mt-1 text-sm text-slate-600">{representante.rol} - {representante.territorio}</div>
                      <div className="mt-3 text-sm font-bold text-[#16A34A]">Alineación territorial: {representante.alineacion}%</div>
                    </Link>
                  ))}
                </div>
              </article>

              <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
                <h2 className="text-2xl font-bold text-[#E4007C]">Expertos y comités seguidos</h2>
                <div className="mt-5 space-y-3">
                  {comitesSeguidos.map((comite) => (
                    <Link key={comite.nombre} href={comite.href} className="block rounded-2xl bg-[#F8FAFC] p-4 transition hover:bg-[#FFF1A8]">
                      <div className="font-bold text-[#0A4E84]">{comite.nombre}</div>
                      <div className="mt-1 text-sm text-slate-600">{comite.enfoque}</div>
                      <div className="mt-3 inline-flex rounded-full bg-[#8B5CF6] px-3 py-1 text-xs font-bold text-white">{comite.estado}</div>
                    </Link>
                  ))}
                </div>
              </article>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
              <h2 className="text-2xl font-bold text-[#E4007C]">Alertas cívicas recientes</h2>
              <div className="mt-5 space-y-3">
                {alertasRecientes.map((alerta) => (
                  <div key={alerta.titulo} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <span className={`${alerta.color} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>{alerta.severidad}</span>
                    <h3 className="mt-3 font-bold text-[#0A4E84]">{alerta.titulo}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{alerta.descripcion}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
              <h2 className="text-2xl font-bold text-[#E4007C]">Actividad reciente</h2>
              <div className="mt-5 space-y-4">
                {actividadReciente.map((actividad) => (
                  <div key={actividad.titulo} className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                    <div className={`${actividad.color} mt-1 h-3 w-3 shrink-0 rounded-full`} />
                    <div>
                      <div className="text-xs font-bold uppercase text-slate-500">{actividad.fecha}</div>
                      <h3 className="mt-1 font-bold text-[#0A4E84]">{actividad.titulo}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{actividad.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
              <h2 className="text-2xl font-bold text-[#F2C300]">Próximos pasos sugeridos</h2>
              <div className="mt-5 space-y-3">
                {proximosPasos.map((paso) => (
                  <Link key={paso.href} href={paso.href} className="block rounded-2xl bg-white/10 p-4 transition hover:bg-white/15">
                    <div className="font-bold">{paso.titulo}</div>
                    <p className="mt-1 text-sm leading-6 text-white/85">{paso.descripcion}</p>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
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
