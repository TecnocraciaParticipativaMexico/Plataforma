import Link from "next/link";
import type { SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { formatDate, priorityLabels, statusLabels } from "@/lib/madres-buscadoras/utils";

type Props = {
  dataset: SearchCaseDataset;
  onOpenCase: (caseId: string) => void;
  onNewCase: () => void;
};

export function Dashboard({ dataset, onOpenCase, onNewCase }: Props) {
  const activeCases = dataset.cases.filter((item) => item.status === "active" || item.status === "institutional_followup").length;
  const pendingActions = dataset.institutionalActions.filter((item) => item.status === "pending" || item.status === "needs_follow_up").length;
  const committeeReviews = dataset.reviews.filter((item) => item.status !== "concluded").length;
  const recentDocuments = dataset.documents.filter((item) => item.status === "ready" || item.status === "draft").length;
  const states = Array.from(new Set(dataset.cases.map((item) => item.state)));
  const maxByState = Math.max(...states.map((state) => dataset.cases.filter((item) => item.state === state).length), 1);
  const recentActivity = [...dataset.events].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)).slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
        <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
        <div className="grid gap-6 p-5 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Sistema civico de busqueda y acompanamiento</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#0A4E84] md:text-5xl">
              Documentacion responsable para familias, colectivos y comites ciudadanos.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700 md:text-base">
              Este MVP organiza expedientes, cronologias, evidencias, gestiones, revisiones y documentos civicos de apoyo. No sustituye denuncias,
              investigaciones, peritajes, autoridades, laboratorios ni procedimientos competentes.
            </p>
          </div>
          <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
            <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-black uppercase text-white">Datos demostrativos del entorno de prueba</div>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Las cifras se calculan solo con el dataset mock de esta pantalla. No representan estadisticas nacionales ni registros externos.
            </p>
            <button type="button" onClick={onNewCase} className="mt-5 min-h-11 rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#083E69] focus:outline-none focus:ring-2 focus:ring-[#E4007C]">
              Iniciar registro
            </button>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Expedientes activos", activeCases, "bg-[#E4007C] text-white"],
          ["Seguimientos pendientes", pendingActions, "bg-[#F97316] text-white"],
          ["Revisiones de comite", committeeReviews, "bg-[#16A34A] text-white"],
          ["Documentos recientes", recentDocuments, "bg-[#0EA5E9] text-white"],
        ].map(([label, value, color]) => (
          <article key={label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
            <div className={`${color} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-black`}>{value}</div>
            <div className="text-sm font-bold text-slate-700">{label}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-black text-[#0A4E84]">Distribucion por entidad</h3>
            <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">Filtro territorial demostrativo</span>
          </div>
          <div className="mt-5 space-y-3">
            {states.map((state) => {
              const count = dataset.cases.filter((item) => item.state === state).length;
              return (
                <div key={state}>
                  <div className="mb-1 flex justify-between text-sm font-bold text-slate-700">
                    <span>{state}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#E4007C]" style={{ width: `${(count / maxByState) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <h3 className="text-xl font-black text-[#0A4E84]">Alertas</h3>
          <div className="mt-4 space-y-3">
            {dataset.alerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FFF7ED] px-2.5 py-1 text-xs font-black uppercase text-[#9A3412]">{alert.severity}</span>
                  <span className="text-xs font-bold text-slate-500">{formatDate(alert.createdAt)}</span>
                </div>
                <h4 className="mt-2 font-black text-slate-900">{alert.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{alert.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <h3 className="text-xl font-black text-[#0A4E84]">Actividad reciente</h3>
          <div className="mt-4 space-y-3">
            {recentActivity.map((event) => {
              const item = dataset.cases.find((candidate) => candidate.id === event.caseId);
              return (
                <button key={event.id} type="button" onClick={() => onOpenCase(event.caseId)} className="block w-full rounded-2xl bg-[#F8FAFC] p-4 text-left transition hover:bg-[#FCE7F3] focus:outline-none focus:ring-2 focus:ring-[#E4007C]">
                  <div className="text-xs font-bold uppercase text-slate-500">{formatDate(event.occurredAt)} | {item?.folio}</div>
                  <div className="mt-1 font-black text-[#0A4E84]">{event.title}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{event.description}</p>
                </button>
              );
            })}
          </div>
        </article>

        <article className="rounded-[28px] bg-[#0A4E84] p-5 text-white shadow-sm">
          <h3 className="text-xl font-black text-[#F2C300]">Acciones rapidas</h3>
          <div className="mt-4 grid gap-3">
            <button type="button" onClick={onNewCase} className="rounded-2xl bg-white/10 p-4 text-left font-bold transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white">Crear expediente de busqueda</button>
            <button type="button" onClick={() => onOpenCase(dataset.cases[0].id)} className="rounded-2xl bg-white/10 p-4 text-left font-bold transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white">Abrir expediente prioritario</button>
            {[
              ["/fiscalia-ia", "Fiscalia IA"],
              ["/seguridad-ciudadana", "Seguridad Ciudadana"],
              ["/congreso-civico/comites", "Comites de Expertos"],
              ["/congreso-civico/alertas", "Alertas Civicas"],
              ["/mapa", "Mapa Civico"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-2xl bg-white/10 p-4 text-sm font-bold transition hover:bg-white/15">
                {label}: preparado para integracion
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {dataset.cases.slice(0, 3).map((item) => (
          <button key={item.id} type="button" onClick={() => onOpenCase(item.id)} className="rounded-[24px] bg-white p-5 text-left shadow-sm ring-1 ring-[#F7C9DD] transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#E4007C]">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#E4007C]/10 px-3 py-1 text-xs font-black text-[#B00061]">{statusLabels[item.status]}</span>
              <span className="rounded-full bg-[#F97316]/10 px-3 py-1 text-xs font-black text-[#9A3412]">{priorityLabels[item.priority]}</span>
            </div>
            <h4 className="mt-3 text-lg font-black text-[#0A4E84]">{item.displayName}</h4>
            <p className="mt-1 text-sm text-slate-600">{item.folio} | {item.municipality}, {item.state}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
