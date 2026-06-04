import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  timelineCongresoCivico,
} from "../../lib/congresoCivico";

const tipoEventoPorFase = {
  "1.": "Registro publico",
  "2.": "Contraste civico",
  "3.": "Alerta civica",
  "4.": "Seguimiento civico",
};

function obtenerTipoEvento(fase: string) {
  const clave = Object.keys(tipoEventoPorFase).find((prefijo) => fase.startsWith(prefijo));

  return clave ? tipoEventoPorFase[clave as keyof typeof tipoEventoPorFase] : "Seguimiento civico";
}

function obtenerIniciativaRelacionada(fase: string) {
  if (fase.startsWith("1.")) {
    return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-003");
  }

  if (fase.startsWith("2.")) {
    return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-001");
  }

  if (fase.startsWith("3.")) {
    return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-002");
  }

  return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-003");
}

function obtenerAlertaRelacionada(fase: string) {
  if (fase.startsWith("3.")) {
    return alertasCongresoCivico.find((alerta) => alerta.id === "alt-001");
  }

  if (fase.startsWith("4.")) {
    return alertasCongresoCivico.find((alerta) => alerta.id === "alt-003");
  }

  return undefined;
}

export default function CongresoCivicoTimelinePage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold">
          Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Timeline legislativo civico mock
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Trazabilidad legislativa y seguimiento civico
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Vista read-only para consultar etapas, eventos, iniciativas y alertas
            civicas relacionadas. La informacion es institucional, no acusatoria
            y no produce efectos juridicos vinculantes.
          </p>
        </section>

        <section className="grid gap-5">
          {timelineCongresoCivico.map((item) => {
            const iniciativa = obtenerIniciativaRelacionada(item.fase);
            const alerta = obtenerAlertaRelacionada(item.fase);
            const tipoEvento = obtenerTipoEvento(item.fase);

            return (
              <article key={item.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">
                        Etapa: {item.fase}
                      </span>
                      <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                        {tipoEvento}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#0A4E84]">
                      {item.fase}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {item.descripcion}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4 lg:min-w-64">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Tipo de evento
                    </div>
                    <div className="mt-2 text-xl font-bold text-[#0A4E84]">{tipoEvento}</div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Clasificacion mock para lectura de seguimiento civico y trazabilidad legislativa.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      Iniciativa relacionada
                    </h3>
                    {iniciativa ? (
                      <div>
                        <Link
                          href={`/congreso-civico/iniciativas/${iniciativa.id}`}
                          className="font-bold text-[#0A4E84]"
                        >
                          {iniciativa.titulo}
                        </Link>
                        <p className="mt-1 text-sm font-semibold text-[#C2187A]">
                          {iniciativa.tema}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {iniciativa.riesgoInstitucional}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm leading-6 text-slate-600">
                        Sin iniciativa relacionada en el mock actual.
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      Alerta relacionada
                    </h3>
                    {alerta ? (
                      <div>
                        <div className="font-bold text-[#0A4E84]">{alerta.tipo}</div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {alerta.descripcion}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {alerta.criterioSeguro}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm leading-6 text-slate-600">
                        Sin alerta civica relacionada en esta etapa del mock actual.
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
