import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
} from "../../lib/congresoCivico";

const estadoLabel = {
  observacion: "Observacion",
  analisis: "Analisis legislativo",
  dictamen: "Dictamen civico",
};

const prioridadLabel = {
  baja: "Prioridad baja",
  media: "Prioridad media",
  alta: "Prioridad alta",
};

const severidadLabel = {
  informativa: "Informativa",
  media: "Media",
  alta: "Alta",
};

function obtenerAlertasRelacionadas(alertaIds: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

export default function CongresoCivicoIniciativasPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold">
          ← Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Iniciativas legislativas mock
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Seguimiento civico de iniciativas
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Vista read-only para observar materia, estado legislativo, prioridad,
            alineacion ciudadana y alertas relacionadas. El lenguaje es institucional,
            no acusatorio y no produce efectos juridicos vinculantes.
          </p>
        </section>

        <section className="grid gap-5">
          {iniciativasCongresoCivico.map((iniciativa) => {
            const alertas = obtenerAlertasRelacionadas(iniciativa.alertasRelacionadas);

            return (
              <article key={iniciativa.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">
                        {estadoLabel[iniciativa.estado]}
                      </span>
                      <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                        {prioridadLabel[iniciativa.prioridad]}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#0A4E84]">
                      {iniciativa.titulo}
                    </h2>
                    <p className="mt-2 text-sm font-semibold text-[#C2187A]">
                      Tema / materia: {iniciativa.tema}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {iniciativa.descripcion}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4 lg:min-w-56">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Indice de alineacion ciudadana
                    </div>
                    <div className="mt-2 text-3xl font-bold text-[#0A4E84]">
                      {iniciativa.indiceAlineacionCiudadana ?? "Sin dato"}
                      {typeof iniciativa.indiceAlineacionCiudadana === "number" ? "/100" : ""}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Indicador mock de contraste entre agenda, territorio y evidencia disponible.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
                  {iniciativa.riesgoInstitucional}
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                    Alertas relacionadas
                  </h3>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {alertas.length > 0 ? (
                      alertas.map((alerta) => (
                        <div key={alerta.id} className="rounded-2xl border border-slate-200 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="font-bold text-[#0A4E84]">{alerta.tipo}</h4>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                              {severidadLabel[alerta.severidad]}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {alerta.descripcion}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            {alerta.criterioSeguro}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                        Sin alertas relacionadas en el mock actual.
                      </div>
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
