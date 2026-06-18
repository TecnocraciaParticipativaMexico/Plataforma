import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  representantesCongresoCivico,
} from "../../lib/congresoCivico";

const comparaciones = {
  "rep-001": {
    iniciativaId: "ini-001",
    posturaCiudadana: "Piden explicar mejor votos y compromisos presupuestales.",
  },
  "rep-002": {
    iniciativaId: "ini-003",
    posturaCiudadana: "Apoyan guardar compromisos y revisar avances publicos.",
  },
  "rep-003": {
    iniciativaId: "ini-002",
    posturaCiudadana: "Prioridad en presupuesto territorial y servicios cercanos.",
  },
} as const;

const rangosAlineacion = [
  {
    etiqueta: "Alta alineacion",
    descripcion: "75 a 100: responde bien a prioridades ciudadanas.",
    clase: "bg-[#16A34A]",
  },
  {
    etiqueta: "Alineacion media",
    descripcion: "55 a 74: hay avances, pero faltan explicaciones.",
    clase: "bg-[#0EA5E9]",
  },
  {
    etiqueta: "Baja alineacion",
    descripcion: "40 a 54: conviene revisar mejor la relacion con el territorio.",
    clase: "bg-[#F97316]",
  },
  {
    etiqueta: "Divergencia significativa",
    descripcion: "0 a 39: hay distancia importante con prioridades ciudadanas.",
    clase: "bg-[#E4007C]",
  },
] as const;

function obtenerRango(indice: number) {
  if (indice >= 75) {
    return rangosAlineacion[0];
  }

  if (indice >= 55) {
    return rangosAlineacion[1];
  }

  if (indice >= 40) {
    return rangosAlineacion[2];
  }

  return rangosAlineacion[3];
}

function obtenerComparacion(representanteId: string) {
  return comparaciones[representanteId as keyof typeof comparaciones];
}

function obtenerIniciativa(iniciativaId: string) {
  return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === iniciativaId);
}

function obtenerAlertas(alertasRelacionadas: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertasRelacionadas.includes(alerta.id));
}

export default function CongresoCivicoAlineacionPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Civico
        </Link>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
              Alineacion ciudadana
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              Que tan cerca esta cada representante de su territorio
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
              Compara calificacion ciudadana, propuesta relacionada y alertas civicas en una sola vista.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
            <div className="text-sm font-bold text-[#E4007C]">Rangos</div>
            <div className="mt-4 grid gap-3">
              {rangosAlineacion.map((rango) => (
                <div key={rango.etiqueta} className="rounded-2xl border border-[#F7C9DD] p-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${rango.clase}`} />
                    <span className="text-sm font-bold text-[#0A4E84]">{rango.etiqueta}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{rango.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          {representantesCongresoCivico.map((representante) => {
            const rango = obtenerRango(representante.indiceAlineacionCiudadana);
            const comparacion = obtenerComparacion(representante.id);
            const iniciativa = comparacion ? obtenerIniciativa(comparacion.iniciativaId) : undefined;
            const alertas = obtenerAlertas(representante.alertasRelacionadas);

            return (
              <article key={representante.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
                <div className="h-2 bg-gradient-to-r from-[#E4007C] via-[#F97316] to-[#16A34A]" />
                <div className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr]">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                        {representante.tipoRepresentacion.replaceAll("-", " ")}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${rango.clase}`}>
                        {rango.etiqueta}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#0A4E84]">{representante.nombre}</h2>
                    <p className="mt-1 text-sm font-semibold text-[#E4007C]">{representante.territorio}</p>

                    <div className="mt-5">
                      <div className="flex items-end justify-between gap-4">
                        <div className="text-sm font-bold text-slate-600">Calificacion ciudadana</div>
                        <div className="text-3xl font-bold text-[#0A4E84]">
                          {representante.indiceAlineacionCiudadana}/100
                        </div>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${rango.clase}`}
                          style={{ width: `${representante.indiceAlineacionCiudadana}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-2xl bg-[#E0F2FE] p-4">
                      <h3 className="text-sm font-bold text-[#0A4E84]">Comparacion ciudadana</h3>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl bg-white p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#E4007C]">
                            La gente pide
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {comparacion?.posturaCiudadana ?? "Sin postura vinculada por ahora."}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8B5CF6]">
                            Propuesta relacionada
                          </div>
                          {iniciativa ? (
                            <Link
                              href={`/congreso-civico/iniciativas/${iniciativa.id}`}
                              className="mt-2 block text-sm font-bold text-[#0A4E84]"
                            >
                              {iniciativa.titulo}
                            </Link>
                          ) : (
                            <p className="mt-2 text-sm leading-6 text-slate-700">Sin propuesta vinculada.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#F7C9DD] p-4">
                      <h3 className="text-sm font-bold text-[#E4007C]">Alertas civicas</h3>
                      {alertas.length > 0 ? (
                        <div className="mt-3 grid gap-3">
                          {alertas.map((alerta) => (
                            <div key={alerta.id} className="rounded-2xl bg-[#FFF1A8] p-3 text-sm text-slate-700">
                              {alerta.tipo}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 text-sm leading-6 text-slate-600">Sin alertas civicas.</p>
                      )}
                    </div>
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
