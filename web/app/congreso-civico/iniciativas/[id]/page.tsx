import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  timelineCongresoCivico,
} from "../../../lib/congresoCivico";

const estadoLabel = {
  observacion: "Observacion",
  analisis: "Analisis legislativo",
  dictamen: "Dictamen civico",
};

const prioridadLabel = {
  baja: "Prioridad baja",
  media: "Prioridad media",
  alta: "Prioridad alta",
};

const severidadLabel = {
  informativa: "Informativa",
  media: "Media",
  alta: "Alta",
};

function obtenerIniciativa(id: string) {
  return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === id);
}

function obtenerAlertasRelacionadas(alertaIds: string[]) {
  return alertasCongresoCivico.filter((alerta) => alertaIds.includes(alerta.id));
}

function obtenerEtapasRelacionadas(alertaIds: string[]) {
  const tieneAlertas = alertaIds.length > 0;

  if (!tieneAlertas) {
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
      <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link
            href="/congreso-civico/iniciativas"
            className="mb-5 inline-block text-sm font-semibold"
          >
            ← Volver a iniciativas
          </Link>

          <section className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
              Seguimiento legislativo
            </div>
            <h1 className="text-3xl font-bold">Iniciativa no encontrada</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              El identificador consultado no corresponde a una iniciativa ciudadana
              disponible en el mock actual. Puedes volver al listado para consultar
              informacion read-only vigente.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const alertas = obtenerAlertasRelacionadas(iniciativa.alertasRelacionadas);
  const etapas = obtenerEtapasRelacionadas(iniciativa.alertasRelacionadas);

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/iniciativas" className="mb-5 inline-block text-sm font-semibold">
          ← Volver a iniciativas
        </Link>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
              Detalle read-only de iniciativa ciudadana
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">
                {estadoLabel[iniciativa.estado]}
              </span>
              <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                {prioridadLabel[iniciativa.prioridad]}
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {iniciativa.titulo}
            </h1>
            <p className="mt-3 text-sm font-semibold text-[#C2187A]">
              Tema / materia: {iniciativa.tema}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-700">{iniciativa.descripcion}</p>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Indice de alineacion ciudadana
            </div>
            <div className="mt-2 text-4xl font-bold text-[#0A4E84]">
              {iniciativa.indiceAlineacionCiudadana ?? "Sin dato"}
              {typeof iniciativa.indiceAlineacionCiudadana === "number" ? "/100" : ""}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Indicador mock de seguimiento legislativo y alineacion territorial
              basado en contraste entre agenda publica, territorio y evidencia disponible.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-[28px] bg-blue-50 p-5 text-sm leading-6 text-blue-900">
          <h2 className="mb-2 text-xl font-bold text-[#0A4E84]">Explicacion institucional segura</h2>
          <p>{iniciativa.riesgoInstitucional}</p>
          <p className="mt-3">
            Esta lectura se presenta como seguimiento legislativo ciudadano. No emite
            efectos juridicos vinculantes ni formula imputaciones personales,
            administrativas o penales.
          </p>
        </section>

        <section className="mb-8">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Alertas relacionadas
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {alertas.length > 0 ? (
              alertas.map((alerta) => (
                <article key={alerta.id} className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#0A4E84]">{alerta.tipo}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {severidadLabel[alerta.severidad]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{alerta.descripcion}</p>
                  <p className="mt-3 rounded-2xl border border-slate-200 p-3 text-xs leading-5 text-slate-500">
                    {alerta.criterioSeguro}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-[24px] bg-white p-5 text-sm text-slate-600 shadow-sm">
                Sin alertas relacionadas en el mock actual.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Timeline o etapas relacionadas
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {etapas.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-[#0A4E84]">{item.fase}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
