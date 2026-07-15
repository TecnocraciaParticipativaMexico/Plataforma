import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";

type AccesoPortal = {
  href: string;
  titulo: string;
  descripcion: string;
  etiqueta: string;
  color: string;
};

const accesosPortal: AccesoPortal[] = [
  {
    href: "/congreso-civico/dashboard",
    titulo: "Dashboard ciudadano",
    descripcion: "ReÃºne tus iniciativas, representantes, comitÃ©s y alertas cÃ­vicas en seguimiento.",
    etiqueta: "Vista general",
    color: "bg-[#E4007C] text-white",
  },
  {
    href: "/congreso-civico/actividad",
    titulo: "Actividad ciudadana",
    descripcion: "Consulta apoyos, seguimientos, alertas e historial de participaciÃ³n.",
    etiqueta: "ParticipaciÃ³n",
    color: "bg-[#14B8A6] text-white",
  },
  {
    href: "/congreso-civico/representacion",
    titulo: "Mapa de RepresentaciÃ³n",
    descripcion: "Encuentra quiÃ©n te representa, cÃ³mo participa y quÃ© ha votado.",
    etiqueta: "Representantes",
    color: "bg-[#0EA5E9] text-white",
  },
  {
    href: "/congreso-civico/comites",
    titulo: "ComitÃ©s ciudadanos",
    descripcion: "Consulta comitÃ©s de revisiÃ³n tÃ©cnica y seguimiento cÃ­vico.",
    etiqueta: "RevisiÃ³n tÃ©cnica",
    color: "bg-[#16A34A] text-white",
  },
  {
    href: "/congreso-civico/comites/expertos",
    titulo: "Expertos ciudadanos",
    descripcion: "Explora perfiles tÃ©cnicos, Ã¡reas de experiencia y participaciÃ³n reciente.",
    etiqueta: "Directorio",
    color: "bg-[#8B5CF6] text-white",
  },
  {
    href: "/congreso-civico/iniciativas",
    titulo: "Iniciativas cÃ­vicas",
    descripcion: "Consulta propuestas, comitÃ©s relacionados, apoyo ciudadano y avance.",
    etiqueta: "Propuestas",
    color: "bg-[#F97316] text-white",
  },
  {
    href: "/congreso-civico/seguimiento",
    titulo: "Seguimiento legislativo",
    descripcion: "Revisa etapas, observaciones tÃ©cnicas, votaciÃ³n, resultados y seguimiento.",
    etiqueta: "Proceso vivo",
    color: "bg-[#0A4E84] text-white",
  },
  {
    href: "/congreso-civico/proceso-legislativo",
    titulo: "Proceso legislativo cÃ­vico",
    descripcion: "Entiende cÃ³mo avanza una propuesta desde su registro hasta seguimiento pÃºblico.",
    etiqueta: "GuÃ­a de etapas",
    color: "bg-[#F2C300] text-[#1F2937]",
  },
];

const metricasPortal = [
  { label: "Iniciativas en seguimiento", valor: 18, clase: "bg-[#E4007C] text-white" },
  { label: "Representantes vinculados", valor: 6, clase: "bg-[#0EA5E9] text-white" },
  { label: "ComitÃ©s observados", valor: 4, clase: "bg-[#16A34A] text-white" },
  { label: "Alertas cÃ­vicas activas", valor: 5, clase: "bg-[#F97316] text-white" },
] as const;

const actividadReciente = [
  {
    titulo: "Nueva iniciativa en revisiÃ³n tÃ©cnica",
    descripcion: "Votaciones legislativas abiertas recibiÃ³ observaciones de comitÃ©.",
    fecha: "Hoy",
    color: "bg-[#E4007C]",
  },
  {
    titulo: "Representante consultado",
    descripcion: "Se revisÃ³ alineaciÃ³n territorial y actividad pÃºblica registrada.",
    fecha: "Ayer",
    color: "bg-[#0EA5E9]",
  },
  {
    titulo: "ComitÃ© actualizado",
    descripcion: "Transparencia Legislativa agregÃ³ seguimiento demostrativo.",
    fecha: "Hace 2 dÃ­as",
    color: "bg-[#8B5CF6]",
  },
];

const proximosPasos = [
  {
    titulo: "Empieza por el dashboard",
    descripcion: "ObtÃ©n una vista rÃ¡pida del seguimiento ciudadano.",
    href: "/congreso-civico/dashboard",
  },
  {
    titulo: "Revisa tu actividad",
    descripcion: "Consulta apoyos, alertas e historial de participaciÃ³n.",
    href: "/congreso-civico/actividad",
  },
  {
    titulo: "Busca representaciÃ³n",
    descripcion: "Explora representantes, curules, escaÃ±os y perfiles pÃºblicos.",
    href: "/congreso-civico/representacion",
  },
  {
    titulo: "Revisa el proceso",
    descripcion: "Comprende cÃ³mo una propuesta avanza por etapas cÃ­vicas.",
    href: "/congreso-civico/proceso-legislativo",
  },
];

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando portal",
    descripcion: "La informaciÃ³n del Congreso CÃ­vico se estÃ¡ preparando para consulta.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Sin informaciÃ³n disponible",
    descripcion: "Cuando existan mÃ³dulos cÃ­vicos activos aparecerÃ¡n en esta vista.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar el portal",
    descripcion: "Esta vista usa datos demostrativos y no realiza conexiÃ³n con servicios externos.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

export default function CongresoCivicoPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">MÃ³dulo 03</div>
              <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Portal de evaluación legislativa</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Portal ciudadano para consultar iniciativas, representantes, comitÃ©s, seguimiento legislativo y alertas cÃ­vicas en un solo lugar.
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Es un MVP cÃ­vico en desarrollo: usa datos demostrativos y prepara la experiencia para integraciÃ³n futura con datos verificables.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">MVP cÃ­vico</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta versiÃ³n no sustituye procesos formales. Organiza informaciÃ³n demostrativa para seguimiento ciudadano neutral.
              </p>
              <Link href="/congreso-civico/dashboard" className="mt-5 inline-flex rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#083E69]">
                Ir al dashboard -&gt;
              </Link>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricasPortal.map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Accesos principales</div>
              <h2 className="mt-1 text-2xl font-bold">Explora el Congreso CÃ­vico</h2>
            </div>
            <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">8 rutas conectadas</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {accesosPortal.map((acceso) => (
              <Link key={acceso.href} href={acceso.href} className="group overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD] transition hover:-translate-y-0.5 hover:shadow-md">
                <div className={`${acceso.color} p-5`}>
                  <span className="mb-8 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">{acceso.etiqueta}</span>
                  <h3 className="text-2xl font-bold leading-tight">{acceso.titulo}</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-slate-700">{acceso.descripcion}</p>
                  <div className="mt-4 text-sm font-bold text-[#E4007C]">Abrir mÃ³dulo -&gt;</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
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
          </article>

          <article className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
            <h2 className="text-2xl font-bold text-[#F2C300]">PrÃ³ximos pasos sugeridos</h2>
            <div className="mt-5 space-y-3">
              {proximosPasos.map((paso) => (
                <Link key={paso.href} href={paso.href} className="block rounded-2xl bg-white/10 p-4 transition hover:bg-white/15">
                  <div className="font-bold">{paso.titulo}</div>
                  <p className="mt-1 text-sm leading-6 text-white/85">{paso.descripcion}</p>
                </Link>
              ))}
            </div>
          </article>
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
