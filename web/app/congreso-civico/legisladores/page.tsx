import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  representantesCongresoCivico,
} from "../../lib/congresoCivico";

const tipoRepresentacionLabel = {
  "legislador-funciones": "Legislador en funciones",
  "representante-ciudadano": "Representante ciudadano",
  "representacion-cuestionada": "Representacion cuestionada",
};

const seccionesRepresentacion = [
  {
    tipo: "legislador-funciones",
    titulo: "Legisladores en funciones",
    descripcion: "Personas con curul o escano institucional.",
    color: "bg-[#0A4E84] text-white",
  },
  {
    tipo: "representante-ciudadano",
    titulo: "Representantes ciudadanos",
    descripcion: "Personas con respaldo ciudadano o territorial registrado.",
    color: "bg-[#16A34A] text-white",
  },
  {
    tipo: "representacion-cuestionada",
    titulo: "Representacion cuestionada",
    descripcion: "Casos donde conviene revisar mejor la relacion con el territorio.",
    color: "bg-[#E4007C] text-white",
  },
] as const;

const alineacionLabel = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

const propuestaRelacionada = {
  "rep-001": "ini-001",
  "rep-002": "ini-003",
  "rep-003": "ini-002",
} as const;

function obtenerAlertasRelacionadas(alertaIds: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

function obtenerIniciativaRelacionada(representanteId: string) {
  const iniciativaId = propuestaRelacionada[representanteId as keyof typeof propuestaRelacionada];

  return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === iniciativaId);
}

export default function CongresoCivicoLegisladoresPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
            Representantes
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Quien participa y como se alinea
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Revisa nombre, rol, territorio, calificacion ciudadana, propuestas relacionadas y alertas civicas.
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
                  <span className={`${seccion.color} rounded-full px-3 py-1 text-xs font-bold`}>
                    {seccion.titulo}
                  </span>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{seccion.descripcion}</p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {representantes.map((representante) => {
                    const alertas = obtenerAlertasRelacionadas(representante.alertasRelacionadas);
                    const iniciativa = obtenerIniciativaRelacionada(representante.id);

                    return (
                      <article key={representante.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
                        <div className="h-2 bg-gradient-to-r from-[#E4007C] via-[#0EA5E9] to-[#F2C300]" />
                        <div className="p-5">
                          <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                            {tipoRepresentacionLabel[representante.tipoRepresentacion]}
                          </span>

                          <h3 className="mt-4 text-xl font-bold text-[#0A4E84]">{representante.nombre}</h3>
                          <p className="mt-2 text-sm font-semibold text-[#E4007C]">{representante.rol}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{representante.territorio}</p>

                          <div className="mt-4 rounded-2xl bg-[#E0F2FE] p-4">
                            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0A4E84]">
                              Calificacion ciudadana
                            </div>
                            <div className="mt-2 text-3xl font-bold text-[#0A4E84]">
                              {representante.indiceAlineacionCiudadana}/100
                            </div>
                            <p className="mt-1 text-sm text-slate-700">
                              Alineacion: {alineacionLabel[representante.alineacionTerritorial]}
                            </p>
                          </div>

                          <div className="mt-4 rounded-2xl border border-[#F7C9DD] p-4">
                            <div className="text-sm font-bold text-[#8B5CF6]">Propuesta relacionada</div>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {iniciativa?.titulo ?? "Sin propuesta vinculada por ahora."}
                            </p>
                          </div>

                          <div className="mt-4">
                            <div className="text-sm font-bold text-[#E4007C]">Alertas civicas</div>
                            <div className="mt-2 space-y-2">
                              {alertas.length > 0 ? (
                                alertas.map((alerta) => (
                                  <div key={alerta.id} className="rounded-2xl bg-[#FFF1A8] p-3 text-sm text-slate-700">
                                    {alerta.tipo}
                                  </div>
                                ))
                              ) : (
                                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                                  Sin alertas civicas.
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-5 rounded-2xl bg-slate-100 px-5 py-3 text-center text-sm font-bold text-slate-600">
                            Perfil proximamente
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
