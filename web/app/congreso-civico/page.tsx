import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  propositoCongresoCivico,
  representantesCongresoCivico,
  timelineCongresoCivico,
} from "../lib/congresoCivico";

const estadoLabel = {
  observacion: "En observacion",
  analisis: "En analisis",
  dictamen: "Con dictamen civico",
};

const alineacionLabel = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

const severidadLabel = {
  informativa: "Seguimiento",
  media: "Atencion media",
  alta: "Atencion alta",
};

const accesosCongresoCivico = [
  {
    href: "/congreso-civico/iniciativas",
    titulo: "Iniciativas",
    descripcion: "Consulta que se propone, quien participa y como va avanzando.",
    color: "bg-[#E4007C] text-white",
  },
  {
    href: "/congreso-civico/alertas",
    titulo: "Alertas civicas",
    descripcion: "Ve que temas necesitan explicacion, seguimiento o mas claridad publica.",
    color: "bg-[#F97316] text-white",
  },
  {
    href: "/congreso-civico/legisladores",
    titulo: "Representantes",
    descripcion: "Revisa rol, territorio, calificacion ciudadana y alertas relacionadas.",
    color: "bg-[#0A4E84] text-white",
  },
  {
    href: "/congreso-civico/timeline",
    titulo: "Timeline civico",
    descripcion: "Sigue las etapas principales de cada tema en una linea simple.",
    color: "bg-[#8B5CF6] text-white",
  },
  {
    href: "/congreso-civico/alineacion",
    titulo: "Alineacion ciudadana",
    descripcion: "Compara prioridades ciudadanas con decisiones y propuestas publicas.",
    color: "bg-[#16A34A] text-white",
  },
] as const;

export default function CongresoCivicoPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al inicio
        </Link>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
            Modulo 03
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Congreso Civico
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            {propositoCongresoCivico.titulo} ayuda a seguir iniciativas, representantes,
            alertas y alineacion ciudadana en un solo lugar.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            La idea es simple: saber que se propone, quien participa, como avanza y que temas
            necesitan mas explicacion publica.
          </p>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {accesosCongresoCivico.map((acceso) => (
            <Link
              key={acceso.href}
              href={acceso.href}
              className={`${acceso.color} rounded-[24px] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="text-lg font-bold">{acceso.titulo}</div>
              <p className="mt-3 text-sm leading-6 opacity-95">{acceso.descripcion}</p>
            </Link>
          ))}
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
                Iniciativas
              </div>
              <h2 className="mt-1 text-2xl font-bold">Que se esta revisando</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {iniciativasCongresoCivico.map((iniciativa, index) => (
              <article key={iniciativa.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                  {estadoLabel[iniciativa.estado]}
                </div>
                <h3 className="text-xl font-bold text-[#0A4E84]">{iniciativa.titulo}</h3>
                <p className="mt-2 text-sm font-semibold text-[#E4007C]">{iniciativa.tema}</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {index === 0
                    ? "Busca que las votaciones sean faciles de consultar y explicar."
                    : index === 1
                      ? "Da seguimiento a recursos y necesidades del territorio."
                      : "Ordena compromisos para que la ciudadania pueda revisarlos."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
              Representantes
            </div>
            <div className="space-y-4">
              {representantesCongresoCivico.map((representante) => (
                <article key={representante.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0EA5E9]">
                    {representante.territorio}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{representante.nombre}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#E4007C]">{representante.rol}</p>
                  <p className="mt-3 text-sm font-bold text-slate-700">
                    Calificacion ciudadana: {representante.indiceAlineacionCiudadana}/100
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Alineacion territorial: {alineacionLabel[representante.alineacionTerritorial]}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
              Alertas civicas
            </div>
            <div className="space-y-4">
              {alertasCongresoCivico.map((alerta) => (
                <article key={alerta.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{alerta.tipo}</h3>
                    <span className="rounded-full bg-[#FF6B6B] px-3 py-1 text-xs font-bold text-white">
                      {severidadLabel[alerta.severidad]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{alerta.descripcion}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#F2C300]">
            Como avanza
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {timelineCongresoCivico.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white/10 p-4">
                <h3 className="font-bold">{item.fase}</h3>
                <p className="mt-2 text-sm leading-6 text-white/85">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
