import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  lenguajeSeguroCongresoCivico,
  propositoCongresoCivico,
  representantesCongresoCivico,
  timelineCongresoCivico,
} from "../lib/congresoCivico";

const estadoLabel = {
  observacion: "Observacion",
  analisis: "Analisis",
  dictamen: "Dictamen civico",
};

const alineacionLabel = {
  alta: "Alta alineacion territorial",
  media: "Alineacion territorial media",
  baja: "Baja alineacion territorial",
};

const severidadLabel = {
  informativa: "Informativa",
  media: "Media",
  alta: "Alta",
};

export default function CongresoCivicoPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/" className="mb-5 inline-block text-sm font-semibold">
          ← Volver al inicio
        </Link>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
              Modulo civico legislativo
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              {propositoCongresoCivico.titulo}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-650">
              {propositoCongresoCivico.descripcion}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {propositoCongresoCivico.alcance}
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="mb-3 text-sm font-bold text-[#C2187A]">
              Lenguaje institucional seguro
            </div>
            <div className="grid gap-2">
              {lenguajeSeguroCongresoCivico.map((termino) => (
                <div
                  key={termino}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  {termino}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
                Iniciativas mock
              </div>
              <h2 className="mt-1 text-2xl font-bold">Seguimiento legislativo inicial</h2>
            </div>
            <div className="text-sm font-semibold text-slate-500">Solo lectura</div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {iniciativasCongresoCivico.map((iniciativa) => (
              <article key={iniciativa.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#C2187A]">
                  {estadoLabel[iniciativa.estado]}
                </div>
                <h3 className="text-xl font-bold text-[#0A4E84]">{iniciativa.titulo}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">{iniciativa.tema}</p>
                <p className="mt-3 text-sm leading-6 text-slate-650">{iniciativa.descripcion}</p>
                <p className="mt-4 rounded-2xl bg-blue-50 p-3 text-sm leading-6 text-blue-900">
                  {iniciativa.riesgoInstitucional}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
              Representantes mock
            </div>
            <div className="space-y-4">
              {representantesCongresoCivico.map((representante) => (
                <article key={representante.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {representante.territorio}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{representante.nombre}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#C2187A]">{representante.rol}</p>
                  <p className="mt-3 text-sm font-bold text-slate-700">
                    {alineacionLabel[representante.alineacionTerritorial]}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{representante.observacion}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
              Alertas civicas mock
            </div>
            <div className="space-y-4">
              {alertasCongresoCivico.map((alerta) => (
                <article key={alerta.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{alerta.tipo}</h3>
                    <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                      {severidadLabel[alerta.severidad]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-650">{alerta.descripcion}</p>
                  <p className="mt-3 rounded-2xl border border-slate-200 p-3 text-sm leading-6 text-slate-600">
                    {alerta.criterioSeguro}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Timeline basico
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {timelineCongresoCivico.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-[#0A4E84]">{item.fase}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
