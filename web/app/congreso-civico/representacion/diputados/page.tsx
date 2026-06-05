import Link from "next/link";
import {
  alertasRepresentacionCongresoCivico,
  curulesDiputadosCongresoCivico,
  representantesMapaCongresoCivico,
  type CongresoCivicoTipoRepresentacion,
} from "../../../lib/congresoCivicoRepresentacion";

const tipoRepresentacionConfig: Record<
  CongresoCivicoTipoRepresentacion | "sin-datos",
  { label: string; dot: string; badge: string }
> = {
  "voto-directo": {
    label: "Elegido por voto directo",
    dot: "bg-[#E4007C]",
    badge: "bg-[#FCE7F3] text-[#BE185D]",
  },
  "representacion-proporcional": {
    label: "Representacion proporcional",
    dot: "bg-[#0EA5E9]",
    badge: "bg-[#E0F2FE] text-[#0369A1]",
  },
  "disputa-ciudadana": {
    label: "Representacion en disputa ciudadana",
    dot: "bg-[#F97316]",
    badge: "bg-[#FFEDD5] text-[#C2410C]",
  },
  "curul-socialmente-impugnada": {
    label: "Curul socialmente impugnada",
    dot: "bg-[#F2C300]",
    badge: "bg-[#FEF3C7] text-[#92400E]",
  },
  "representante-ciudadano": {
    label: "Representante ciudadano por voto popular",
    dot: "bg-[#8B5CF6]",
    badge: "bg-[#EDE9FE] text-[#6D28D9]",
  },
  "legislador-funciones": {
    label: "Legislador en funciones",
    dot: "bg-[#16A34A]",
    badge: "bg-[#DCFCE7] text-[#15803D]",
  },
  "sin-datos": {
    label: "Sin datos",
    dot: "bg-[#CBD5E1]",
    badge: "bg-slate-100 text-slate-600",
  },
};

function obtenerRepresentante(representanteId?: string) {
  return representantesMapaCongresoCivico.find((representante) => representante.id === representanteId);
}

function obtenerAlertas(alertaIds: string[] = []) {
  return alertasRepresentacionCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

function obtenerTipoVisual(curulTipo: CongresoCivicoTipoRepresentacion, representante?: { tipoRepresentacion: CongresoCivicoTipoRepresentacion }) {
  return representante?.tipoRepresentacion ?? curulTipo ?? "sin-datos";
}

export default function CongresoCivicoDiputadosPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representacion
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_0.75fr] md:p-8 md:items-end">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
                Mapa de Representacion
              </div>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">Camara de Diputados</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
                Consulta las curules y quien ocupa cada espacio.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-[#E4007C] p-4 text-white">
                <div className="text-3xl font-bold">{curulesDiputadosCongresoCivico.length}</div>
                <div className="mt-1 text-xs font-bold">Curules</div>
              </div>
              <div className="rounded-2xl bg-[#0EA5E9] p-4 text-white">
                <div className="text-3xl font-bold">{representantesMapaCongresoCivico.filter((rep) => rep.camara === "diputados").length}</div>
                <div className="mt-1 text-xs font-bold">Con representante</div>
              </div>
              <div className="rounded-2xl bg-[#F2C300] p-4 text-[#1F2937]">
                <div className="text-3xl font-bold">
                  {curulesDiputadosCongresoCivico.filter((curul) => !curul.representanteId).length}
                </div>
                <div className="mt-1 text-xs font-bold">Sin datos</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Tablero de curules</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Cada circulo representa una curul registrada.</p>
            </div>
            <div className="rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white">Vista inicial</div>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-6 gap-3 rounded-[28px] bg-[#F8FAFC] p-5 md:grid-cols-12">
            {curulesDiputadosCongresoCivico.map((curul) => {
              const representante = obtenerRepresentante(curul.representanteId);
              const tipoVisual = obtenerTipoVisual(curul.tipoRepresentacion, representante);
              const config = tipoRepresentacionConfig[representante ? tipoVisual : "sin-datos"];

              return (
                <div key={curul.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`${config.dot} flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-4 ring-white`}
                    title={representante?.nombre ?? "Curul sin datos"}
                  >
                    {curul.numeroVisual}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{curul.estado ?? "--"}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <h2 className="mb-5 text-2xl font-bold">Leyenda de colores</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {Object.entries(tipoRepresentacionConfig).map(([id, config]) => (
              <div key={id} className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-3">
                <span className={`${config.dot} h-4 w-4 rounded-full`} />
                <span className="text-sm font-bold text-slate-700">{config.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <div className="mb-1">
            <h2 className="text-2xl font-bold">Curules registradas</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Listado basico para revisar cada espacio sin complicaciones.</p>
          </div>

          {curulesDiputadosCongresoCivico.map((curul) => {
            const representante = obtenerRepresentante(curul.representanteId);
            const tipoVisual = obtenerTipoVisual(curul.tipoRepresentacion, representante);
            const config = tipoRepresentacionConfig[representante ? tipoVisual : "sin-datos"];
            const alertas = obtenerAlertas(representante?.alertasCivicas);

            return (
              <article key={curul.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
                <div className={`${config.dot} h-2`} />
                <div className="grid gap-5 p-5 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`${config.badge} rounded-full px-3 py-1 text-xs font-bold`}>{config.label}</span>
                      <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">
                        Curul {curul.numeroVisual}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-[#0A4E84]">
                      {representante?.nombre ?? "Curul sin representante cargado"}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#E4007C]">
                      {[curul.estado, curul.distrito].filter(Boolean).join(" - ") || "Territorio por registrar"}
                    </p>
                  </div>

                  {representante ? (
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl bg-[#FFF1A8] p-4">
                        <div className="text-xs font-bold text-slate-600">Calificacion ciudadana</div>
                        <div className="mt-2 text-2xl font-bold text-[#0A4E84]">{representante.calificacionCiudadana}/100</div>
                      </div>
                      <div className="rounded-2xl bg-[#DCFCE7] p-4">
                        <div className="text-xs font-bold text-slate-600">Asistencia</div>
                        <div className="mt-2 text-2xl font-bold text-[#15803D]">{representante.asistencia}%</div>
                      </div>
                      <div className="rounded-2xl bg-[#EDE9FE] p-4">
                        <div className="text-xs font-bold text-slate-600">Votos emitidos</div>
                        <div className="mt-2 text-2xl font-bold text-[#6D28D9]">{representante.votosEmitidos}</div>
                      </div>
                      <div className="rounded-2xl bg-[#FFEDD5] p-4 md:col-span-2">
                        <div className="text-xs font-bold text-slate-600">Alertas civicas</div>
                        <div className="mt-2 text-sm font-bold text-[#C2410C]">
                          {alertas.length > 0 ? alertas.map((alerta) => alerta.titulo).join(" / ") : "Sin alertas civicas"}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-[#F8FAFC] p-4">
                        <div className="text-xs font-bold text-slate-600">Perfil completado por</div>
                        <div className="mt-2 text-sm font-bold text-[#0A4E84]">
                          {representante.perfilCompletadoPor === "representante" ? "Representante" : "Comite ciudadano"}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-[#F8FAFC] p-4 text-sm font-semibold text-slate-600">
                      Informacion pendiente para esta curul.
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
