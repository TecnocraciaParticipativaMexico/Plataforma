import Link from "next/link";

type EstadoComite = "Activo" | "En formación" | "En revisión";
type EstadoCarga = "loading" | "ready" | "empty" | "error";

type ComiteExperto = {
  id: string;
  nombre: string;
  enfoque: string;
  descripcion: string;
  estado: EstadoComite;
  integrantes: number;
  dictamenes: number;
  propuestasEnRevision: number;
  color: string;
  territorio: string;
};

const estadoCarga: EstadoCarga = "ready";

const comitesExpertosCiudadanos: ComiteExperto[] = [
  {
    id: "transparencia-legislativa",
    nombre: "Comité de Transparencia Legislativa",
    enfoque: "Votaciones, asistencia y rendición de cuentas",
    descripcion: "Revisa información pública para explicar de forma clara cómo participan los representantes.",
    estado: "Activo",
    integrantes: 7,
    dictamenes: 12,
    propuestasEnRevision: 5,
    color: "bg-[#E4007C] text-white",
    territorio: "Nacional",
  },
  {
    id: "presupuesto-territorial",
    nombre: "Comité de Presupuesto Territorial",
    enfoque: "Gasto público, prioridades locales y seguimiento ciudadano",
    descripcion: "Organiza evidencia de presupuesto, proyectos y necesidades territoriales para consulta ciudadana.",
    estado: "En revisión",
    integrantes: 5,
    dictamenes: 8,
    propuestasEnRevision: 6,
    color: "bg-[#0A4E84] text-white",
    territorio: "Estados piloto",
  },
  {
    id: "derechos-y-participacion",
    nombre: "Comité de Derechos y Participación",
    enfoque: "Iniciativas ciudadanas, accesibilidad y lenguaje claro",
    descripcion: "Acompaña propuestas ciudadanas para que sean comprensibles, trazables y respetuosas de derechos.",
    estado: "En formación",
    integrantes: 4,
    dictamenes: 3,
    propuestasEnRevision: 9,
    color: "bg-[#16A34A] text-white",
    territorio: "Comunidades participantes",
  },
];

const resumenComites = [
  { label: "Comités activos", valor: comitesExpertosCiudadanos.filter((comite) => comite.estado === "Activo").length, clase: "bg-[#E4007C] text-white" },
  { label: "Personas expertas", valor: comitesExpertosCiudadanos.reduce((total, comite) => total + comite.integrantes, 0), clase: "bg-[#0EA5E9] text-white" },
  { label: "Dictámenes demo", valor: comitesExpertosCiudadanos.reduce((total, comite) => total + comite.dictamenes, 0), clase: "bg-[#F2C300] text-[#1F2937]" },
  { label: "Propuestas en revisión", valor: comitesExpertosCiudadanos.reduce((total, comite) => total + comite.propuestasEnRevision, 0), clase: "bg-[#8B5CF6] text-white" },
] as const;

function EstadoModulo({ tipo }: { tipo: Exclude<EstadoCarga, "ready"> }) {
  const contenido = {
    loading: {
      titulo: "Cargando comités",
      descripcion: "Estamos preparando la información demostrativa de comités ciudadanos.",
      clase: "bg-[#E0F2FE] text-[#0369A1]",
    },
    empty: {
      titulo: "Sin comités disponibles",
      descripcion: "Cuando existan comités demostrativos aparecerán en esta sección.",
      clase: "bg-[#FFF1A8] text-[#0A4E84]",
    },
    error: {
      titulo: "No se pudo mostrar la información",
      descripcion: "Intenta consultar de nuevo. Esta vista no realiza conexión con servicios externos.",
      clase: "bg-[#FCE7F3] text-[#BE185D]",
    },
  }[tipo];

  return (
    <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
      <span className={`${contenido.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{tipo}</span>
      <h2 className="mt-4 text-2xl font-bold text-[#0A4E84]">{contenido.titulo}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{contenido.descripcion}</p>
    </section>
  );
}

export default function CongresoCivicoComitesPage() {
  if (estadoCarga !== "ready") {
    return (
      <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
            {"<-"} Volver a Congreso Cívico
          </Link>
          <EstadoModulo tipo={estadoCarga} />
        </div>
      </main>
    );
  }

  if (comitesExpertosCiudadanos.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
            {"<-"} Volver a Congreso Cívico
          </Link>
          <EstadoModulo tipo="empty" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Cívico
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="p-6 md:p-8">
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Congreso Cívico</div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Comités de Expertos Ciudadanos</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
              Grupos ciudadanos con perfiles técnicos que ayudan a revisar iniciativas, alertas cívicas y prioridades territoriales con lenguaje claro.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Esta vista usa datos demostrativos. En una etapa posterior podrá conectarse con registros verificados y trazabilidad pública.
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {resumenComites.map((item) => (
            <article key={item.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${item.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{item.valor}</div>
              <div className="text-sm font-bold text-slate-700">{item.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comitesExpertosCiudadanos.map((comite) => (
            <article key={comite.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${comite.color} p-5`}>
                <div className="mb-8 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">{comite.estado}</div>
                <h2 className="text-2xl font-bold leading-tight">{comite.nombre}</h2>
                <p className="mt-3 text-sm leading-6 opacity-95">{comite.enfoque}</p>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-slate-700">{comite.descripcion}</p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs font-bold text-slate-600">
                  <div className="rounded-2xl bg-[#F8FAFC] p-3"><div className="text-lg text-[#E4007C]">{comite.integrantes}</div>integrantes</div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3"><div className="text-lg text-[#0EA5E9]">{comite.dictamenes}</div>dictámenes</div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3"><div className="text-lg text-[#8B5CF6]">{comite.propuestasEnRevision}</div>revisión</div>
                </div>
                <Link href={`/congreso-civico/comites/${comite.id}`} className="mt-5 inline-flex rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9006B]">
                  Ver comité -&gt;
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#F2C300]">Cómo funcionan</div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Revisan evidencia pública y ciudadana.",
              "Preparan criterios de lectura clara y neutral.",
              "Sugieren seguimiento sin sustituir autoridades.",
            ].map((texto) => (
              <div key={texto} className="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/90">{texto}</div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
