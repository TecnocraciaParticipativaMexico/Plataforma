import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  timelineCongresoCivico,
} from "../../../lib/congresoCivico";

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

function obtenerIniciativa(id: string) {
  return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === id);
}

function obtenerAlertasRelacionadas(alertaIds: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

function obtenerEtapasRelacionadas(alertaIds: string[]) {
  if (alertaIds.length === 0) {
    return timelineCongresoCivico.filter((item) => item.fase.startsWith("1."));
  }

  return timelineCongresoCivico.filter(
    (item) => item.fase.startsWith("2.") || item.fase.startsWith("3.") || item.fase.startsWith("4."),
  );
}

export default function CongresoCivicoIniciativaDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const iniciativa = obtenerIniciativa(params.id);

  if (!iniciativa) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link
            href="/congreso-civico/iniciativas"
            className="mb-5 inline-block text-sm font-semibold text-[#E4007C]"
          >
            {"<-"} Volver a iniciativas
          </Link>

          <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
              Iniciativas
            </div>
            <h1 className="text-3xl font-bold">Iniciativa no encontrada</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              No encontramos esa iniciativa. Vuelve al listado para consultar las disponibles.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const alertas = obtenerAlertasRelacionadas(iniciativa.alertasRelacionadas);
  const etapas = obtenerEtapasRelacionadas(iniciativa.alertasRelacionadas);

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/iniciativas" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a iniciativas
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-2 bg-gradient-to-r from-[#E4007C] via-[#F97316] to-[#F2C300]" />
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#0EA5E9] px-3 py-1 text-xs font-bold text-white">
                  {estadoLabel[iniciativa.estado]}
                </span>
                <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                  {prioridadLabel[iniciativa.prioridad]}
                </span>
              </div>
              <p className="text-sm font-bold text-[#E4007C]">
                Quien la propuso: {propuestaPor[iniciativa.id as keyof typeof propuestaPor]}
              </p>
              <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
                {iniciativa.titulo}
              </h1>
              <p className="mt-3 text-sm font-semibold text-[#8B5CF6]">{iniciativa.tema}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">
                {resumenSimple[iniciativa.id as keyof typeof resumenSimple]}
              </p>
            </div>

            <div className="rounded-[24px] bg-[#E0F2FE] p-5">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0A4E84]">
                Alineacion ciudadana
              </div>
              <div className="mt-2 text-4xl font-bold text-[#0A4E84]">
                {iniciativa.indiceAlineacionCiudadana ?? "Sin dato"}
                {typeof iniciativa.indiceAlineacionCiudadana === "number" ? "/100" : ""}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Que tan cerca esta la propuesta de las prioridades ciudadanas registradas.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2">
          {alertas.length > 0 ? (
            alertas.map((alerta) => (
              <article key={alerta.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                <div className="text-sm font-bold text-[#E4007C]">Alerta civica</div>
                <h2 className="mt-2 text-xl font-bold text-[#0A4E84]">{alerta.tipo}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{alerta.descripcion}</p>
              </article>
            ))
          ) : (
            <div className="rounded-[24px] bg-white p-5 text-sm text-slate-600 shadow-sm">
              Sin alertas civicas por ahora.
            </div>
          )}
        </section>

        <section className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#F2C300]">
            Como avanza
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {etapas.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white/10 p-4">
                <h3 className="font-bold">{item.fase}</h3>
                <p className="mt-2 text-sm leading-6 text-white/85">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
