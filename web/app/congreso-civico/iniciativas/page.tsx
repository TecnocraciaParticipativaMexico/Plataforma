import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";
type EstadoIniciativa = "Recibida" | "En análisis" | "Con observaciones" | "Lista para seguimiento";

type IniciativaCivica = {
  id: string;
  titulo: string;
  tema: string;
  estado: EstadoIniciativa;
  comiteTecnico: string;
  expertosRevisores: string[];
  apoyoCiudadano: number;
  fechaActualizacion: string;
  resumen: string;
  color: string;
};

const iniciativasCivicas: IniciativaCivica[] = [
  {
    id: "agua-y-servicios-locales",
    titulo: "Agua y servicios locales verificables",
    tema: "Agua",
    estado: "En análisis",
    comiteTecnico: "Comité de Presupuesto Territorial",
    expertosRevisores: ["Mariana Soto", "Rocío Padilla"],
    apoyoCiudadano: 84,
    fechaActualizacion: "2 junio 2026",
    resumen: "Propone seguimiento ciudadano a servicios de agua, mantenimiento y reportes territoriales.",
    color: "bg-[#0EA5E9] text-white",
  },
  {
    id: "votaciones-legislativas-abiertas",
    titulo: "Votaciones legislativas abiertas",
    tema: "Transparencia",
    estado: "Con observaciones",
    comiteTecnico: "Comité de Transparencia Legislativa",
    expertosRevisores: ["Ana Paula Rivera", "Luis Fernando Mora"],
    apoyoCiudadano: 91,
    fechaActualizacion: "29 mayo 2026",
    resumen: "Busca explicar votaciones públicas con fichas claras, trazabilidad y lenguaje ciudadano.",
    color: "bg-[#E4007C] text-white",
  },
  {
    id: "participacion-accesible-barrios",
    titulo: "Participación accesible por barrios",
    tema: "Participación",
    estado: "Recibida",
    comiteTecnico: "Comité de Derechos y Participación",
    expertosRevisores: ["Daniela Chávez", "Mateo Núñez"],
    apoyoCiudadano: 76,
    fechaActualizacion: "24 mayo 2026",
    resumen: "Plantea formatos simples para consultar propuestas ciudadanas por colonia y comunidad.",
    color: "bg-[#16A34A] text-white",
  },
  {
    id: "presupuesto-visible-distrito",
    titulo: "Presupuesto visible por distrito",
    tema: "Presupuesto público",
    estado: "Lista para seguimiento",
    comiteTecnico: "Comité de Presupuesto Territorial",
    expertosRevisores: ["Mariana Soto", "Ernesto Galván"],
    apoyoCiudadano: 88,
    fechaActualizacion: "18 mayo 2026",
    resumen: "Ordena información presupuestal por territorio para facilitar revisión ciudadana.",
    color: "bg-[#F97316] text-white",
  },
];

const filtros = [
  { label: "Tema", opciones: ["Todos", "Agua", "Transparencia", "Participación", "Presupuesto público"] },
  { label: "Estado", opciones: ["Todos", "Recibida", "En análisis", "Con observaciones", "Lista para seguimiento"] },
  { label: "Comité", opciones: ["Todos", "Transparencia Legislativa", "Presupuesto Territorial", "Derechos y Participación"] },
] as const;

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando iniciativas",
    descripcion: "La lista de iniciativas cívicas se está preparando para consulta ciudadana.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Sin iniciativas disponibles",
    descripcion: "Cuando existan iniciativas demostrativas aparecerán en esta sección.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar la información",
    descripcion: "Esta vista no se conecta a servicios externos; el estado sirve como referencia visual.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

export default function CongresoCivicoIniciativasPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Cívico
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Congreso Cívico</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Iniciativas Cívicas</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Consulta propuestas ciudadanas, comités técnicos relacionados, revisión experta y apoyo ciudadano demostrativo.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Datos locales demo</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta vista es frontend-only. No crea registros ni conecta con servicios externos todavía.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            { label: "Iniciativas", valor: iniciativasCivicas.length, clase: "bg-[#E4007C] text-white" },
            { label: "Temas", valor: 4, clase: "bg-[#0EA5E9] text-white" },
            { label: "Comités técnicos", valor: 3, clase: "bg-[#F2C300] text-[#1F2937]" },
            { label: "Apoyo promedio", valor: "85%", clase: "bg-[#16A34A] text-white" },
          ].map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <h2 className="text-2xl font-bold text-[#E4007C]">Filtros visuales</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Controles mock para preparar búsqueda por tema, estado y comité técnico.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {filtros.map((filtro) => (
              <label key={filtro.label} className="block">
                <span className="text-sm font-bold text-[#0A4E84]">{filtro.label}</span>
                <select className="mt-2 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]" defaultValue={filtro.opciones[0]}>
                  {filtro.opciones.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2">
          {iniciativasCivicas.map((iniciativa) => (
            <article key={iniciativa.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${iniciativa.color} p-5`}>
                <div className="mb-6 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">{iniciativa.estado}</div>
                <h2 className="text-2xl font-bold leading-tight">{iniciativa.titulo}</h2>
                <p className="mt-2 text-sm opacity-95">{iniciativa.tema}</p>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-slate-700">{iniciativa.resumen}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 text-sm"><strong>Comité:</strong> {iniciativa.comiteTecnico}</div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 text-sm"><strong>Apoyo:</strong> {iniciativa.apoyoCiudadano}%</div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 text-sm"><strong>Actualización:</strong> {iniciativa.fechaActualizacion}</div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 text-sm"><strong>Revisores:</strong> {iniciativa.expertosRevisores.join(", ")}</div>
                </div>
                <Link href={`/congreso-civico/iniciativas/${iniciativa.id}`} className="mt-5 inline-flex rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9006B]">
                  Ver iniciativa -&gt;
                </Link>
              </div>
            </article>
          ))}
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
