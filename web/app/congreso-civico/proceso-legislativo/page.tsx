import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";

type EtapaProceso = {
  numero: number;
  titulo: string;
  descripcion: string;
  metrica: string;
  progreso: number;
  color: string;
};

const etapasProceso: EtapaProceso[] = [
  {
    numero: 1,
    titulo: "Propuesta ciudadana",
    descripcion: "Una persona o comunidad registra una idea con problema público, propuesta y territorio relacionado.",
    metrica: "18 propuestas recibidas",
    progreso: 100,
    color: "bg-[#E4007C] text-white",
  },
  {
    numero: 2,
    titulo: "Revisión inicial",
    descripcion: "Se revisa que la propuesta tenga datos básicos, lenguaje claro y alcance cívico entendible.",
    metrica: "14 en revisión inicial",
    progreso: 88,
    color: "bg-[#F97316] text-white",
  },
  {
    numero: 3,
    titulo: "Comité técnico",
    descripcion: "La propuesta se asigna a un comité ciudadano experto según tema y necesidad pública.",
    metrica: "6 comités vinculados",
    progreso: 76,
    color: "bg-[#0EA5E9] text-white",
  },
  {
    numero: 4,
    titulo: "Expertos revisores",
    descripcion: "Personas expertas revisan evidencia, riesgos, viabilidad y posibles mejoras técnicas.",
    metrica: "24 revisores participantes",
    progreso: 70,
    color: "bg-[#8B5CF6] text-white",
  },
  {
    numero: 5,
    titulo: "Observaciones técnicas",
    descripcion: "Se registran comentarios para mejorar claridad, trazabilidad y calidad de la iniciativa.",
    metrica: "32 observaciones abiertas",
    progreso: 64,
    color: "bg-[#F2C300] text-[#1F2937]",
  },
  {
    numero: 6,
    titulo: "Iniciativa cívica",
    descripcion: "La propuesta se convierte en una iniciativa cívica preparada para seguimiento público.",
    metrica: "9 iniciativas formadas",
    progreso: 58,
    color: "bg-[#16A34A] text-white",
  },
  {
    numero: 7,
    titulo: "Apoyo ciudadano",
    descripcion: "La ciudadanía puede observar, apoyar y dar seguimiento a prioridades territoriales.",
    metrica: "1,248 apoyos demo",
    progreso: 52,
    color: "bg-[#E4007C] text-white",
  },
  {
    numero: 8,
    titulo: "Lista para votación",
    descripcion: "La iniciativa queda preparada para una etapa de decisión cívica o revisión pública ampliada.",
    metrica: "3 listas para votación",
    progreso: 42,
    color: "bg-[#0A4E84] text-white",
  },
  {
    numero: 9,
    titulo: "Resultado",
    descripcion: "Se muestra el resultado de la etapa cívica con estado, fecha y explicación breve.",
    metrica: "5 resultados registrados",
    progreso: 30,
    color: "bg-[#64748B] text-white",
  },
  {
    numero: 10,
    titulo: "Seguimiento",
    descripcion: "La iniciativa conserva historial, alertas cívicas y actualizaciones para consulta ciudadana.",
    metrica: "11 temas en seguimiento",
    progreso: 24,
    color: "bg-[#14B8A6] text-white",
  },
];

const metricasProceso = [
  { label: "Etapas cívicas", valor: etapasProceso.length, clase: "bg-[#E4007C] text-white" },
  { label: "Propuestas recibidas", valor: 18, clase: "bg-[#0EA5E9] text-white" },
  { label: "Revisiones técnicas", valor: 14, clase: "bg-[#F2C300] text-[#1F2937]" },
  { label: "Iniciativas en seguimiento", valor: 11, clase: "bg-[#16A34A] text-white" },
] as const;

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando proceso",
    descripcion: "Las etapas del proceso legislativo cívico se están preparando para consulta.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Sin etapas disponibles",
    descripcion: "Cuando exista información demostrativa del proceso aparecerá en esta sección.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar el proceso",
    descripcion: "Esta vista usa datos demostrativos y no realiza conexión con servicios externos.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

export default function CongresoCivicoProcesoLegislativoPage() {
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
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Proceso Legislativo Cívico</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">De propuesta ciudadana a seguimiento público</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Una vista sencilla para entender cómo una propuesta puede avanzar por revisión, comité técnico, apoyo ciudadano y seguimiento.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Datos locales demo</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta ruta describe un flujo cívico demostrativo. No sustituye procesos legislativos formales ni conecta con servicios externos.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricasProceso.map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E4007C]">Mapa de etapas</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Cada etapa muestra una métrica demostrativa y un indicador visual de avance.</p>
            </div>
            <Link href="/congreso-civico/seguimiento" className="rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#083E69]">
              Ver seguimiento -&gt;
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {etapasProceso.map((etapa) => (
              <article key={etapa.numero} className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`${etapa.color} inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-bold`}>{etapa.numero}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A4E84]">{etapa.titulo}</h3>
                      <p className="mt-1 text-xs font-bold uppercase text-slate-500">{etapa.metrica}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#E4007C] ring-1 ring-[#F7C9DD]">{etapa.progreso}%</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-700">{etapa.descripcion}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-[#E4007C]" style={{ width: `${etapa.progreso}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-3">
          {[
            {
              titulo: "Participación clara",
              descripcion: "El flujo permite ubicar dónde está cada propuesta sin lenguaje técnico pesado.",
              color: "bg-[#E4007C] text-white",
            },
            {
              titulo: "Revisión experta",
              descripcion: "Los comités y revisores ayudan a ordenar evidencia, riesgos y observaciones.",
              color: "bg-[#0EA5E9] text-white",
            },
            {
              titulo: "Seguimiento ciudadano",
              descripcion: "Cada resultado conserva historial y próximos pasos para consulta pública.",
              color: "bg-[#16A34A] text-white",
            },
          ].map((bloque) => (
            <article key={bloque.titulo} className={`${bloque.color} rounded-[24px] p-5 shadow-sm`}>
              <h2 className="text-xl font-bold">{bloque.titulo}</h2>
              <p className="mt-3 text-sm leading-6 opacity-95">{bloque.descripcion}</p>
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
