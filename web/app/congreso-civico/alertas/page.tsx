import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  representantesCongresoCivico,
  timelineCongresoCivico,
} from "../../lib/congresoCivico";

const severidadLabel = {
  informativa: "Informativa",
  media: "Media",
  alta: "Alta",
};

const severidadDescripcion = {
  informativa: "Seguimiento institucional documental",
  media: "Divergencia ciudadana-legislativa en observacion",
  alta: "Baja alineacion territorial prioritaria",
};

function obtenerIniciativasRelacionadas(alertaId: string) {
  return iniciativasCongresoCivico.filter((iniciativa) =>
    iniciativa.alertasRelacionadas.includes(alertaId),
  );
}

function obtenerEtapaTimeline(tipo: string) {
  const esSeguimiento = tipo.toLowerCase().includes("seguimiento");
  const faseBuscada = esSeguimiento ? "4." : "3.";

  return timelineCongresoCivico.find((item) => item.fase.startsWith(faseBuscada));
}

function obtenerRepresentanteRelacionado(tipo: string) {
  const esBajaAlineacion = tipo.toLowerCase().includes("baja alineacion");

  if (!esBajaAlineacion) {
    return undefined;
  }

  return representantesCongresoCivico.find(
    (representante) => representante.alineacionTerritorial === "baja",
  );
}

export default function CongresoCivicoAlertasPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold">
          Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Alertas civicas mock
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Seguimiento institucional de alertas civicas
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Vista read-only para revisar nivel de alerta, causa institucional,
            relaciones documentales y etapa de seguimiento. El lenguaje es legal
            seguro, no acusatorio y no produce efectos juridicos vinculantes.
          </p>
        </section>

        <section className="grid gap-5">
          {alertasCongresoCivico.map((alerta) => {
            const iniciativasRelacionadas = obtenerIniciativasRelacionadas(alerta.id);
            const etapaTimeline = obtenerEtapaTimeline(alerta.tipo);
            const representanteRelacionado = obtenerRepresentanteRelacionado(alerta.tipo);

            return (
              <article key={alerta.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                        Nivel: {severidadLabel[alerta.severidad]}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">
                        {severidadDescripcion[alerta.severidad]}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#0A4E84]">
                      {alerta.tipo}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {alerta.descripcion}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4 lg:min-w-64">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Etapa del timeline
                    </div>
                    <div className="mt-2 text-lg font-bold text-[#0A4E84]">
                      {etapaTimeline?.fase ?? "Sin etapa asignada"}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {etapaTimeline?.descripcion ??
                        "El mock actual no incluye fecha o etapa especifica para esta alerta civica."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
                    <h3 className="mb-2 font-bold text-[#0A4E84]">Causa institucional</h3>
                    <p>{alerta.criterioSeguro}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      Iniciativa relacionada
                    </h3>
                    {iniciativasRelacionadas.length > 0 ? (
                      <div className="space-y-3">
                        {iniciativasRelacionadas.map((iniciativa) => (
                          <div key={iniciativa.id}>
                            <div className="font-bold text-[#0A4E84]">{iniciativa.titulo}</div>
                            <div className="mt-1 text-sm font-semibold text-[#C2187A]">
                              {iniciativa.tema}
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {iniciativa.riesgoInstitucional}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm leading-6 text-slate-600">
                        Sin iniciativa relacionada en el mock actual.
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      Representante relacionado
                    </h3>
                    {representanteRelacionado ? (
                      <div>
                        <div className="font-bold text-[#0A4E84]">
                          {representanteRelacionado.nombre}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-[#C2187A]">
                          {representanteRelacionado.territorio}
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Referencia mock para seguimiento institucional de baja alineacion territorial.
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm leading-6 text-slate-600">
                        Sin representante relacionado en el mock actual.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 p-4 text-sm leading-6 text-slate-600">
                  Esta alerta civica se presenta como seguimiento institucional y
                  explicacion metodologica. No formula imputaciones personales,
                  penales ni administrativas.
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
