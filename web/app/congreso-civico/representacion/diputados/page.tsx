import Link from "next/link";
import {
  alertasRepresentacionCongresoCivico,
  curulesDiputadosCongresoCivico,
  representantesMapaCongresoCivico,
  type CongresoCivicoTipoRepresentacion,
} from "../../../lib/congresoCivicoRepresentacion";

const tipoRepresentacionConfig: Record<
  CongresoCivicoTipoRepresentacion | "sin-datos",
  { label: string; dot: string; badge: string; text: string }
> = {
  "voto-directo": {
    label: "Elegido por voto directo",
    dot: "bg-[#E4007C]",
    badge: "bg-[#FCE7F3] text-[#BE185D]",
    text: "text-[#E4007C]",
  },
  "representacion-proporcional": {
    label: "Representacion proporcional",
    dot: "bg-[#0EA5E9]",
    badge: "bg-[#E0F2FE] text-[#0369A1]",
    text: "text-[#0EA5E9]",
  },
  "disputa-ciudadana": {
    label: "Representacion en disputa ciudadana",
    dot: "bg-[#F97316]",
    badge: "bg-[#FFEDD5] text-[#C2410C]",
    text: "text-[#F97316]",
  },
  "curul-socialmente-impugnada": {
    label: "Curul socialmente impugnada",
    dot: "bg-[#F2C300]",
    badge: "bg-[#FEF3C7] text-[#92400E]",
    text: "text-[#D97706]",
  },
  "representante-ciudadano": {
    label: "Representante ciudadano por voto popular",
    dot: "bg-[#8B5CF6]",
    badge: "bg-[#EDE9FE] text-[#6D28D9]",
    text: "text-[#8B5CF6]",
  },
  "legislador-funciones": {
    label: "Legislador en funciones",
    dot: "bg-[#16A34A]",
    badge: "bg-[#DCFCE7] text-[#15803D]",
    text: "text-[#16A34A]",
  },
  "sin-datos": {
    label: "Sin datos",
    dot: "bg-[#CBD5E1]",
    badge: "bg-slate-100 text-slate-600",
    text: "text-slate-500",
  },
};

const alineacionLabel = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
  "divergencia-significativa": "Divergencia significativa",
} as const;

const curulesConRepresentante = curulesDiputadosCongresoCivico.filter((curul) => curul.representanteId);
const curulesSinDatos = curulesDiputadosCongresoCivico.filter((curul) => !curul.representanteId);
const representantesDiputados = representantesMapaCongresoCivico.filter((representante) => representante.camara === "diputados");
const curulInicial = curulesConRepresentante[0] ?? curulesDiputadosCongresoCivico[0];
const representanteInicial = representantesMapaCongresoCivico.find((representante) => representante.id === curulInicial?.representanteId);
const hemicicloFilas = [
  curulesDiputadosCongresoCivico.slice(0, 3),
  curulesDiputadosCongresoCivico.slice(3, 7),
  curulesDiputadosCongresoCivico.slice(7, 12),
];

function obtenerRepresentante(representanteId?: string) {
  return representantesMapaCongresoCivico.find((representante) => representante.id === representanteId);
}

function obtenerAlertas(alertaIds: string[] = []) {
  return alertasRepresentacionCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

function obtenerIniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export default function CongresoCivicoDiputadosPage() {
  const alertasIniciales = obtenerAlertas(representanteInicial?.alertasCivicas);
  const tipoInicial = representanteInicial?.tipoRepresentacion ?? "sin-datos";
  const configInicial = tipoRepresentacionConfig[tipoInicial];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representacion
        </Link>

        <section className="mb-5 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-[#E4007C]" />
          <div className="grid gap-5 p-5 md:grid-cols-[1.15fr_0.85fr] md:p-7 md:items-end">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Mapa de Representacion</div>
              <h1 className="mt-2 text-4xl font-black leading-tight text-[#111827] md:text-6xl">Camara de Diputados</h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-700">Consulta las curules y quien ocupa cada espacio.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#E4007C] p-4 text-center text-white shadow-sm">
                <div className="text-3xl font-black">{curulesDiputadosCongresoCivico.length}</div>
                <div className="text-xs font-bold">Curules</div>
              </div>
              <div className="rounded-2xl bg-[#0EA5E9] p-4 text-center text-white shadow-sm">
                <div className="text-3xl font-black">{representantesDiputados.length}</div>
                <div className="text-xs font-bold">Con representante</div>
              </div>
              <div className="rounded-2xl bg-[#F2C300] p-4 text-center text-[#1F2937] shadow-sm">
                <div className="text-3xl font-black">{curulesSinDatos.length}</div>
                <div className="text-xs font-bold">Sin datos</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="flex items-center justify-between gap-4 bg-[#E4007C] px-5 py-3 text-white">
              <h2 className="text-sm font-black uppercase tracking-[0.12em]">Tablero de curules</h2>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Vista inicial</span>
            </div>

            <div className="px-4 py-6 md:px-7">
              <div className="mx-auto max-w-2xl rounded-[32px] bg-[#F8FAFC] px-4 py-6 shadow-inner">
                <div className="space-y-3">
                  {hemicicloFilas.map((fila, filaIndex) => (
                    <div key={filaIndex} className="flex justify-center gap-3 md:gap-4">
                      {fila.map((curul) => {
                        const representante = obtenerRepresentante(curul.representanteId);
                        const tipo = representante?.tipoRepresentacion ?? "sin-datos";
                        const config = tipoRepresentacionConfig[tipo];
                        const esInicial = curul.id === curulInicial?.id;

                        return (
                          <div key={curul.id} className="flex flex-col items-center gap-1">
                            <div
                              className={`${config.dot} flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-black text-white shadow-sm ring-4 ${esInicial ? "ring-[#E4007C]/25" : "ring-white"} md:h-11 md:w-11`}
                              title={representante?.nombre ?? "Curul sin datos"}
                            >
                              {curul.numeroVisual}
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">{curul.estado ?? "--"}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mx-auto mt-5 h-10 max-w-[180px] rounded-t-full bg-[#0A4E84] shadow-sm" />
                <p className="mt-3 text-center text-xs font-bold text-slate-500">Hemiciclo compacto de referencia</p>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">
              Ficha de representante
            </div>

            {representanteInicial ? (
              <div className="p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E4007C] to-[#8B5CF6] text-2xl font-black text-white shadow-sm">
                      {obtenerIniciales(representanteInicial.nombre)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#111827]">{representanteInicial.nombre}</h2>
                      <p className="mt-1 text-sm font-bold text-[#0A4E84]">Diputacion Federal</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {[representanteInicial.territorio.estado, representanteInicial.territorio.distrito].filter(Boolean).join(" - ")}
                      </p>
                    </div>
                  </div>
                  <div className={`${configInicial.badge} rounded-full px-4 py-2 text-xs font-black`}>{configInicial.label}</div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-2xl bg-[#FFF1A8] p-4">
                    <div className="text-xs font-bold text-slate-600">Calificacion ciudadana</div>
                    <div className="mt-1 text-3xl font-black text-[#0A4E84]">{representanteInicial.calificacionCiudadana}/100</div>
                  </div>
                  <div className="rounded-2xl bg-[#DCFCE7] p-4">
                    <div className="text-xs font-bold text-slate-600">Asistencia</div>
                    <div className="mt-1 text-3xl font-black text-[#16A34A]">{representanteInicial.asistencia}%</div>
                  </div>
                  <div className="rounded-2xl bg-[#EDE9FE] p-4">
                    <div className="text-xs font-bold text-slate-600">Votos emitidos</div>
                    <div className="mt-1 text-3xl font-black text-[#8B5CF6]">{representanteInicial.votosEmitidos}</div>
                  </div>
                  <div className="rounded-2xl bg-[#E0F2FE] p-4">
                    <div className="text-xs font-bold text-slate-600">Propuestas ciudadanas</div>
                    <div className="mt-1 text-3xl font-black text-[#0EA5E9]">{representanteInicial.propuestasCiudadanasRecibidas.length}</div>
                  </div>
                  <div className="rounded-2xl bg-[#FFEDD5] p-4">
                    <div className="text-xs font-bold text-slate-600">Alertas civicas</div>
                    <div className="mt-1 text-3xl font-black text-[#F97316]">{alertasIniciales.length}</div>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-4">
                    <div className="text-xs font-bold text-slate-600">Alineacion territorial</div>
                    <div className="mt-1 text-lg font-black text-[#0A4E84]">{alineacionLabel[representanteInicial.alineacionTerritorial]}</div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-[#E5E7EB] p-4">
                    <div className="text-xs font-bold text-slate-500">Perfil completado por</div>
                    <div className="mt-1 text-sm font-black text-[#111827]">
                      {representanteInicial.perfilCompletadoPor === "representante" ? "Representante" : "Comite ciudadano"}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#E5E7EB] p-4">
                    <div className="text-xs font-bold text-slate-500">Curul seleccionada</div>
                    <div className="mt-1 text-sm font-black text-[#111827]">Curul {curulInicial?.numeroVisual}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 text-sm font-semibold text-slate-600">No hay representante cargado para la vista inicial.</div>
            )}
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#E5E7EB]">
            <h2 className="text-lg font-black text-[#111827]">Leyenda de colores</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Object.entries(tipoRepresentacionConfig).map(([id, config]) => (
                <div key={id} className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-3">
                  <span className={`${config.dot} h-4 w-4 shrink-0 rounded-full`} />
                  <span className="text-xs font-bold text-slate-700">{config.label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#E5E7EB]">
            <h2 className="text-lg font-black text-[#111827]">Curules sin datos</h2>
            <p className="mt-2 text-sm text-slate-600">Se muestran como puntos grises en el tablero.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {curulesSinDatos.map((curul) => (
                <span key={curul.id} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
                  Curul {curul.numeroVisual} - {curul.estado ?? "Por registrar"}
                </span>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
