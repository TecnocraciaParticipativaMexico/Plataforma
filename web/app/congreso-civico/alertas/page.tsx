import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  representantesCongresoCivico,
  timelineCongresoCivico,
} from "../../lib/congresoCivico";

const severidadLabel = {
  informativa: "Seguimiento",
  media: "Atencion media",
  alta: "Atencion alta",
};

const severidadColor = {
  informativa: "bg-[#0EA5E9] text-white",
  media: "bg-[#F97316] text-white",
  alta: "bg-[#E4007C] text-white",
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
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
            Alertas civicas
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Temas que necesitan atencion
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Revisa que requiere seguimiento, que iniciativa toca el tema y si hay representantes relacionados.
          </p>
        </section>

        <section className="grid gap-5">
          {alertasCongresoCivico.map((alerta) => {
            const iniciativasRelacionadas = obtenerIniciativasRelacionadas(alerta.id);
            const etapaTimeline = obtenerEtapaTimeline(alerta.tipo);
            const representanteRelacionado = obtenerRepresentanteRelacionado(alerta.tipo);

            return (
              <article key={alerta.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
                <div className="h-2 bg-gradient-to-r from-[#E4007C] via-[#FF6B6B] to-[#F97316]" />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${severidadColor[alerta.severidad]}`}>
                      {severidadLabel[alerta.severidad]}
                    </span>
                    <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                      Alerta civica
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-[#0A4E84]">{alerta.tipo}</h2>
                  <p className="mt-3 text-base leading-7 text-slate-700">{alerta.descripcion}</p>

                  <div className="mt-5 grid gap-4 lg:grid-cols-3">
                    <div className="rounded-2xl bg-[#E0F2FE] p-4 text-sm leading-6 text-slate-700">
                      <h3 className="mb-2 font-bold text-[#0A4E84]">Por que importa</h3>
                      <p>{alerta.criterioSeguro}</p>
                    </div>

                    <div className="rounded-2xl border border-[#F7C9DD] p-4">
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#E4007C]">
                        Iniciativas
                      </h3>
                      {iniciativasRelacionadas.length > 0 ? (
                        <div className="space-y-3">
                          {iniciativasRelacionadas.map((iniciativa) => (
                            <div key={iniciativa.id}>
                              <div className="font-bold text-[#0A4E84]">{iniciativa.titulo}</div>
                              <div className="mt-1 text-sm font-semibold text-[#8B5CF6]">
                                {iniciativa.tema}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm leading-6 text-slate-600">Sin iniciativa relacionada.</p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-[#F7C9DD] p-4">
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#E4007C]">
                        Representante
                      </h3>
                      {representanteRelacionado ? (
                        <div>
                          <div className="font-bold text-[#0A4E84]">{representanteRelacionado.nombre}</div>
                          <div className="mt-1 text-sm font-semibold text-[#16A34A]">
                            {representanteRelacionado.territorio}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-6 text-slate-600">Sin representante vinculado.</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#0A4E84] p-4 text-sm leading-6 text-white">
                    Etapa: {etapaTimeline?.fase ?? "Seguimiento pendiente"}
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
