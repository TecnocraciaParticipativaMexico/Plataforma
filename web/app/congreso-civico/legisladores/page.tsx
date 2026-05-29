import Link from "next/link";
import {
  alertasCongresoCivico,
  representantesCongresoCivico,
} from "../../lib/congresoCivico";

const tipoRepresentacionLabel = {
  "legislador-funciones": "Legislador en funciones",
  "representante-ciudadano": "Representante ciudadano por voto popular",
  "representacion-cuestionada": "Representacion cuestionada",
};

const seccionesRepresentacion = [
  {
    tipo: "legislador-funciones",
    titulo: "Legisladores en funciones",
    descripcion:
      "Personas que actualmente ocupan una curul o escano institucional y cuentan con actividad publica verificable.",
  },
  {
    tipo: "representante-ciudadano",
    titulo: "Representantes ciudadanos por voto popular",
    descripcion:
      "Personas reconocidas por votacion ciudadana dentro de la plataforma o por respaldo territorial documentado.",
  },
  {
    tipo: "representacion-cuestionada",
    titulo: "Representacion cuestionada por sobrerrepresentacion",
    descripcion:
      "Perfiles donde existe una diferencia publica entre voto ciudadano territorial y representacion institucional. La lectura es institucional, no acusatoria.",
  },
] as const;

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

function obtenerAlertasRelacionadas(alertaIds: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

export default function CongresoCivicoLegisladoresPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold">
          Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Representacion legislativa mock
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Legisladores y representacion ciudadana
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Vista read-only para distinguir legislador en funciones,
            representante ciudadano por voto popular y representacion cuestionada
            mediante indices mock de alineacion ciudadana, participacion y alertas
            civicas vinculadas.
          </p>
        </section>

        <section className="space-y-8">
          {seccionesRepresentacion.map((seccion) => {
            const representantes = representantesCongresoCivico.filter(
              (representante) => representante.tipoRepresentacion === seccion.tipo,
            );

            return (
              <section key={seccion.tipo}>
                <div className="mb-4 max-w-3xl">
                  <h2 className="text-2xl font-bold text-[#0A4E84]">{seccion.titulo}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{seccion.descripcion}</p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {representantes.map((representante) => {
                    const alertas = obtenerAlertasRelacionadas(representante.alertasRelacionadas);

                    return (
                      <article key={representante.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">
                            {tipoRepresentacionLabel[representante.tipoRepresentacion]}
                          </span>
                          <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                            {alineacionLabel[representante.alineacionTerritorial]}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-[#0A4E84]">
                          {representante.nombre}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-[#C2187A]">
                          {representante.camaraAmbito}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {representante.estadoDistritoSeccion}
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                          <div className="rounded-2xl border border-slate-200 p-4">
                            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                              Indice de alineacion ciudadana
                            </div>
                            <div className="mt-2 text-3xl font-bold text-[#0A4E84]">
                              {representante.indiceAlineacionCiudadana}/100
                            </div>
                          </div>

                          <div className="rounded-2xl border border-slate-200 p-4">
                            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                              Asistencia o participacion
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {representante.asistenciaParticipacion}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
                          {representante.observacion}
                        </p>

                        <div className="mt-4">
                          <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                            Alertas civicas vinculadas
                          </h4>
                          <div className="mt-3 space-y-3">
                            {alertas.length > 0 ? (
                              alertas.map((alerta) => (
                                <div key={alerta.id} className="rounded-2xl border border-slate-200 p-4">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="font-bold text-[#0A4E84]">{alerta.tipo}</div>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                      {severidadLabel[alerta.severidad]}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-xs leading-5 text-slate-500">
                                    {alerta.criterioSeguro}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                                Sin alertas civicas vinculadas en el mock actual.
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </section>
      </div>
    </main>
  );
}
