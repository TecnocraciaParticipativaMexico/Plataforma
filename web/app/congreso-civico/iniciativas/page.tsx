import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
} from "../../lib/congresoCivico";

const estadoLabel = {
  observacion: "En observacion",
  analisis: "En analisis",
  dictamen: "Con dictamen civico",
};

const prioridadLabel = {
  baja: "Prioridad baja",
  media: "Prioridad media",
  alta: "Prioridad alta",
};

const propuestaPor = {
  "ini-001": "Mesa ciudadana de rendicion de cuentas",
  "ini-002": "Comunidad territorial de presupuesto publico",
  "ini-003": "Equipo civico de memoria legislativa",
} as const;

const resumenSimple = {
  "ini-001": "Que cada voto importante pueda consultarse y explicarse de forma clara.",
  "ini-002": "Dar seguimiento a recursos publicos y necesidades reales del territorio.",
  "ini-003": "Guardar compromisos y avances para que no se pierdan en el tiempo.",
} as const;

function obtenerAlertasRelacionadas(alertaIds: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

export default function CongresoCivicoIniciativasPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
            Iniciativas
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Que se propone y como va
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Consulta que se propone, quien participa, que tan importante es y si tiene alertas civicas.
          </p>
        </section>

        <section className="grid gap-5">
          {iniciativasCongresoCivico.map((iniciativa) => {
            const alertas = obtenerAlertasRelacionadas(iniciativa.alertasRelacionadas);

            return (
              <article key={iniciativa.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
                <div className="h-2 bg-gradient-to-r from-[#E4007C] via-[#F97316] to-[#F2C300]" />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#0EA5E9] px-3 py-1 text-xs font-bold text-white">
                      Iniciativa
                    </span>
                    <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                      {estadoLabel[iniciativa.estado]}
                    </span>
                    <span className="rounded-full bg-[#16A34A] px-3 py-1 text-xs font-bold text-white">
                      {prioridadLabel[iniciativa.prioridad]}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <p className="text-sm font-bold text-[#E4007C]">
                        Quien la propuso: {propuestaPor[iniciativa.id as keyof typeof propuestaPor]}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-[#0A4E84]">{iniciativa.titulo}</h2>
                      <p className="mt-2 text-sm font-semibold text-[#8B5CF6]">{iniciativa.tema}</p>
                      <p className="mt-4 text-base leading-7 text-slate-700">
                        {resumenSimple[iniciativa.id as keyof typeof resumenSimple]}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#E0F2FE] p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0A4E84]">
                        Alineacion ciudadana
                      </div>
                      <div className="mt-2 text-4xl font-bold text-[#0A4E84]">
                        {iniciativa.indiceAlineacionCiudadana ?? "Sin dato"}
                        {typeof iniciativa.indiceAlineacionCiudadana === "number" ? "/100" : ""}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        Ayuda a comparar la propuesta con prioridades ciudadanas.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {alertas.length > 0 ? (
                      alertas.map((alerta) => (
                        <div key={alerta.id} className="rounded-2xl border border-[#F7C9DD] p-4">
                          <div className="font-bold text-[#E4007C]">{alerta.tipo}</div>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{alerta.descripcion}</p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-[#F7C9DD] p-4 text-sm text-slate-600">
                        Sin alertas civicas por ahora.
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/congreso-civico/iniciativas/${iniciativa.id}`}
                    className="mt-5 inline-block rounded-2xl bg-[#E4007C] px-5 py-3 text-sm font-bold text-white shadow-sm"
                  >
                    Ver iniciativa
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
