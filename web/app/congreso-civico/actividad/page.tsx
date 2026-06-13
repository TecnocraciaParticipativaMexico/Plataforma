import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";

type ItemSeguimiento = {
  titulo: string;
  descripcion: string;
  detalle: string;
  href: string;
  color: string;
};

const metricasActividad = [
  { label: "Apoyos registrados", valor: 1248, clase: "bg-[#E4007C] text-white" },
  { label: "Iniciativas seguidas", valor: 12, clase: "bg-[#0EA5E9] text-white" },
  { label: "Alertas activas", valor: 5, clase: "bg-[#F97316] text-white" },
  { label: "Comités observados", valor: 4, clase: "bg-[#16A34A] text-white" },
] as const;

const iniciativasApoyadas: ItemSeguimiento[] = [
  {
    titulo: "Votaciones legislativas abiertas",
    descripcion: "Fichas claras para explicar votaciones públicas y trazabilidad ciudadana.",
    detalle: "91% de apoyo demo",
    href: "/congreso-civico/iniciativas/votaciones-legislativas-abiertas",
    color: "bg-[#E4007C] text-white",
  },
  {
    titulo: "Presupuesto visible por distrito",
    descripcion: "Información presupuestal territorial para facilitar revisión ciudadana.",
    detalle: "88% de apoyo demo",
    href: "/congreso-civico/iniciativas/presupuesto-visible-distrito",
    color: "bg-[#F97316] text-white",
  },
  {
    titulo: "Participación accesible por barrios",
    descripcion: "Formatos simples para consultar propuestas ciudadanas por comunidad.",
    detalle: "76% de apoyo demo",
    href: "/congreso-civico/iniciativas/participacion-accesible-barrios",
    color: "bg-[#16A34A] text-white",
  },
];

const representantesSeguidos: ItemSeguimiento[] = [
  {
    titulo: "María Teresa López García",
    descripcion: "Diputada Federal - Jalisco Distrito 10.",
    detalle: "Alineación territorial 78%",
    href: "/congreso-civico/representacion/representantes/maria-teresa-lopez-garcia",
    color: "bg-[#0EA5E9] text-white",
  },
  {
    titulo: "Senadora Metropolitana Norte",
    descripcion: "Senado de la República - circunscripción norte.",
    detalle: "Alineación territorial 82%",
    href: "/congreso-civico/representacion/representantes/senadora-metropolitana-norte",
    color: "bg-[#8B5CF6] text-white",
  },
];

const comitesSeguidos: ItemSeguimiento[] = [
  {
    titulo: "Comité de Transparencia Legislativa",
    descripcion: "Revisión de votaciones, asistencia y rendición de cuentas.",
    detalle: "Activo",
    href: "/congreso-civico/comites/transparencia-legislativa",
    color: "bg-[#E4007C] text-white",
  },
  {
    titulo: "Comité de Presupuesto Territorial",
    descripcion: "Seguimiento de gasto público, prioridades locales y evidencia territorial.",
    detalle: "En revisión",
    href: "/congreso-civico/comites/presupuesto-territorial",
    color: "bg-[#0A4E84] text-white",
  },
];

const expertosSeguidos: ItemSeguimiento[] = [
  {
    titulo: "Ana Paula Rivera",
    descripcion: "Especialidad en transparencia legislativa y datos públicos.",
    detalle: "Especialista Senior",
    href: "/congreso-civico/comites/expertos/ana-paula-rivera",
    color: "bg-[#F2C300] text-[#1F2937]",
  },
  {
    titulo: "Mariana Soto",
    descripcion: "Especialidad en presupuesto territorial y seguimiento ciudadano.",
    detalle: "Experta",
    href: "/congreso-civico/comites/expertos/mariana-soto",
    color: "bg-[#16A34A] text-white",
  },
];

const alertasRecientes = [
  {
    titulo: "Respuesta ciudadana pendiente",
    descripcion: "Una propuesta requiere actualización pública de estado.",
    severidad: "Media",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  {
    titulo: "Fuente documental por actualizar",
    descripcion: "Se recomienda revisar fecha y origen de evidencia disponible.",
    severidad: "Baja",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  {
    titulo: "Alineación territorial en observación",
    descripcion: "Un tema prioritario del territorio necesita seguimiento adicional.",
    severidad: "Alta",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
];

const historialParticipacion = [
  {
    fecha: "Hoy",
    titulo: "Apoyo registrado en iniciativa",
    descripcion: "Se agregó seguimiento demostrativo a Presupuesto visible por distrito.",
    color: "bg-[#E4007C]",
  },
  {
    fecha: "Ayer",
    titulo: "Perfil de representante consultado",
    descripcion: "Se revisó actividad pública, votaciones y alineación territorial.",
    color: "bg-[#0EA5E9]",
  },
  {
    fecha: "Hace 2 días",
    titulo: "Comité agregado a observación",
    descripcion: "Transparencia Legislativa quedó marcado para seguimiento ciudadano.",
    color: "bg-[#8B5CF6]",
  },
  {
    fecha: "Hace 3 días",
    titulo: "Alerta cívica revisada",
    descripcion: "Se consultó una alerta relacionada con respuesta ciudadana.",
    color: "bg-[#F97316]",
  },
];

const proximosPasos = [
  {
    titulo: "Revisar dashboard ciudadano",
    descripcion: "Consulta una vista resumida de módulos y seguimiento.",
    href: "/congreso-civico/dashboard",
  },
  {
    titulo: "Buscar representación",
    descripcion: "Encuentra representantes relacionados con tu territorio.",
    href: "/congreso-civico/representacion/buscar",
  },
  {
    titulo: "Explorar proceso legislativo",
    descripcion: "Comprende las etapas de una propuesta cívica.",
    href: "/congreso-civico/proceso-legislativo",
  },
];

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando actividad",
    descripcion: "La actividad ciudadana se está preparando para consulta.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Sin actividad registrada",
    descripcion: "Cuando sigas iniciativas, representantes o comités aparecerán en esta vista.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar la actividad",
    descripcion: "Esta vista usa datos demostrativos y no realiza conexión con servicios externos.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

function TarjetaSeguimiento({ item }: { item: ItemSeguimiento }) {
  return (
    <Link href={item.href} className="block rounded-2xl bg-[#F8FAFC] p-4 transition hover:bg-[#FCE7F3]">
      <span className={`${item.color} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>{item.detalle}</span>
      <h3 className="mt-3 font-bold text-[#0A4E84]">{item.titulo}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.descripcion}</p>
    </Link>
  );
}

export default function CongresoCivicoActividadPage() {
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
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Actividad Ciudadana</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Centro de Actividad Ciudadana</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Consulta apoyos, seguimientos, alertas y participación demostrativa dentro del Congreso Cívico.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Datos locales demo</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta vista organiza actividad cívica de ejemplo. No guarda datos personales ni conecta con servicios externos.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricasActividad.map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E4007C]">Resumen de actividad ciudadana</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Una vista rápida de lo que la ciudadanía sigue, consulta y revisa dentro del módulo.</p>
            </div>
            <Link href="/congreso-civico/dashboard" className="rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#083E69]">
              Ver dashboard -&gt;
            </Link>
          </div>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-2">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Iniciativas apoyadas</h2>
            <div className="mt-5 space-y-3">
              {iniciativasApoyadas.map((item) => <TarjetaSeguimiento key={item.titulo} item={item} />)}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Representantes seguidos</h2>
            <div className="mt-5 space-y-3">
              {representantesSeguidos.map((item) => <TarjetaSeguimiento key={item.titulo} item={item} />)}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Comités seguidos</h2>
            <div className="mt-5 space-y-3">
              {comitesSeguidos.map((item) => <TarjetaSeguimiento key={item.titulo} item={item} />)}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Expertos seguidos</h2>
            <div className="mt-5 space-y-3">
              {expertosSeguidos.map((item) => <TarjetaSeguimiento key={item.titulo} item={item} />)}
            </div>
          </article>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Alertas recientes</h2>
            <div className="mt-5 space-y-3">
              {alertasRecientes.map((alerta) => (
                <div key={alerta.titulo} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <span className={`${alerta.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>{alerta.severidad}</span>
                  <h3 className="mt-3 font-bold text-[#0A4E84]">{alerta.titulo}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{alerta.descripcion}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Historial de participación</h2>
            <div className="mt-5 space-y-4">
              {historialParticipacion.map((evento) => (
                <div key={`${evento.fecha}-${evento.titulo}`} className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                  <div className={`${evento.color} mt-1 h-3 w-3 shrink-0 rounded-full`} />
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-500">{evento.fecha}</div>
                    <h3 className="mt-1 font-bold text-[#0A4E84]">{evento.titulo}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{evento.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mb-8 rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
          <h2 className="text-2xl font-bold text-[#F2C300]">Próximos pasos sugeridos</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {proximosPasos.map((paso) => (
              <Link key={paso.href} href={paso.href} className="block rounded-2xl bg-white/10 p-4 transition hover:bg-white/15">
                <div className="font-bold">{paso.titulo}</div>
                <p className="mt-2 text-sm leading-6 text-white/85">{paso.descripcion}</p>
              </Link>
            ))}
          </div>
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
