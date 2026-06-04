import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  representantesCongresoCivico,
} from "../../lib/congresoCivico";

const comparacionesMock = {
  "rep-001": {
    iniciativaId: "ini-001",
    posturaCiudadana:
      "Solicitud territorial de mayor explicacion publica sobre votos y compromisos presupuestales.",
  },
  "rep-002": {
    iniciativaId: "ini-003",
    posturaCiudadana:
      "Respaldo territorial a la memoria institucional y seguimiento civico de compromisos publicos.",
  },
  "rep-003": {
    iniciativaId: "ini-002",
    posturaCiudadana:
      "Prioridad comunitaria centrada en presupuesto territorial, servicios cercanos y seguimiento institucional.",
  },
} as const;

const rangosAlineacion = [
  {
    etiqueta: "Alta alineacion",
    descripcion: "75 a 100 puntos: consistencia alta entre territorio, postura publica y seguimiento.",
    clase: "bg-emerald-600",
  },
  {
    etiqueta: "Alineacion media",
    descripcion: "55 a 74 puntos: consistencia parcial con aspectos pendientes de explicacion.",
    clase: "bg-sky-600",
  },
  {
    etiqueta: "Baja alineacion",
    descripcion: "40 a 54 puntos: distancia relevante entre prioridades territoriales y seguimiento.",
    clase: "bg-amber-500",
  },
  {
    etiqueta: "Divergencia significativa",
    descripcion: "0 a 39 puntos: divergencia ciudadana-legislativa que requiere observacion civica.",
    clase: "bg-[#C2187A]",
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
  return comparacionesMock[representanteId as keyof typeof comparacionesMock];
}

function obtenerIniciativa(iniciativaId: string) {
  return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === iniciativaId);
}

function obtenerAlertas(alertasRelacionadas: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertasRelacionadas.includes(alerta.id));
}

export default function CongresoCivicoAlineacionPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold">
          Volver a Congreso Civico
        </Link>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
              Alineacion ciudadana-territorial
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              Lectura civica de alineacion territorial
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">
              Vista read-only para observar la relacion entre representantes, prioridades territoriales,
              iniciativas y alertas civicas. El indice es mock, institucional y no produce efectos juridicos
              vinculantes.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="text-sm font-bold text-[#C2187A]">Rangos visuales</div>
            <div className="mt-4 grid gap-3">
              {rangosAlineacion.map((rango) => (
                <div key={rango.etiqueta} className="rounded-2xl border border-slate-200 p-3">
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
              <article key={representante.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">
                        {representante.tipoRepresentacion.replaceAll("-", " ")}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${rango.clase}`}>
                        {rango.etiqueta}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#0A4E84]">{representante.nombre}</h2>
                    <p className="mt-1 text-sm font-semibold text-[#C2187A]">
                      {representante.estadoDistritoSeccion}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{representante.observacion}</p>

                    <div className="mt-5">
                      <div className="flex items-end justify-between gap-4">
                        <div className="text-sm font-bold text-slate-600">
                          Indice de alineacion ciudadana-territorial
                        </div>
                        <div className="text-3xl font-bold text-[#0A4E84]">
                          {representante.indiceAlineacionCiudadana}
                        </div>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${rango.clase}`}
                          style={{ width: `${representante.indiceAlineacionCiudadana}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{rango.descripcion}</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                        Comparacion mock
                      </h3>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C2187A]">
                            Postura ciudadana territorial
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {comparacion?.posturaCiudadana ?? "Sin postura territorial vinculada en el mock actual."}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-blue-50 p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.14em] text-blue-900">
                            Iniciativa relacionada
                          </div>
                          {iniciativa ? (
                            <div>
                              <Link
                                href={`/congreso-civico/iniciativas/${iniciativa.id}`}
                                className="mt-2 block text-sm font-bold text-[#0A4E84]"
                              >
                                {iniciativa.titulo}
                              </Link>
                              <p className="mt-2 text-xs leading-5 text-slate-600">
                                {iniciativa.riesgoInstitucional}
                              </p>
                            </div>
                          ) : (
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              Sin iniciativa vinculada en el mock actual.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                        Alertas vinculadas
                      </h3>
                      {alertas.length > 0 ? (
                        <div className="mt-3 grid gap-3">
                          {alertas.map((alerta) => (
                            <div key={alerta.id} className="rounded-2xl bg-slate-50 p-3">
                              <div className="text-sm font-bold text-[#0A4E84]">{alerta.tipo}</div>
                              <p className="mt-2 text-sm leading-6 text-slate-700">{alerta.descripcion}</p>
                              <p className="mt-2 text-xs leading-5 text-slate-500">
                                {alerta.criterioSeguro}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          Sin alerta civica vinculada en el mock actual.
                        </p>
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
