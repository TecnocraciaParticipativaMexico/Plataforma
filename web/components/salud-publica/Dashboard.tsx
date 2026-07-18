"use client";

import { HEALTH_LIMITATION_NOTICE, OFFICIAL_MODULE_DESCRIPTION, OFFICIAL_MODULE_NAME } from "@/lib/salud-publica/constants";
import type { HealthCase, HealthDataset, HealthTab } from "@/lib/salud-publica/types";

type Props = {
  dataset: HealthDataset;
  selectedCase: HealthCase;
  onTabChange: (tab: HealthTab) => void;
  onOpenCase: (caseId: string) => void;
};

const accents = ["bg-[#E4007C]", "bg-[#0EA5E9]", "bg-[#FFC20E] text-slate-950", "bg-[#22C55E]", "bg-[#702F8A]"];

export function HealthDashboard({ dataset, selectedCase, onTabChange, onOpenCase }: Props) {
  const metrics = dataset.metrics;
  const cards = [
    { group: "Mi salud", label: "Orientaciones personales", value: metrics.orientations },
    { group: "Mi salud", label: "Seguimientos de salud", value: metrics.pendingFollowups },
    { group: "Servicios y abasto", label: "Alertas de abasto", value: metrics.supplyAlerts },
    { group: "Evaluacion publica", label: "Politicas en evaluacion", value: metrics.policiesInEvaluation },
    { group: "Red solidaria", label: "Solicitudes solidarias", value: metrics.solidarityRequests },
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)_320px]">
      <aside className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-black uppercase text-[#0A4E84]">Accesos rapidos</h2>
        {[
          ["expedientes", "Mi salud"],
          ["nueva", "Nueva orientacion"],
          ["orientacion", "Orientacion"],
          ["telemedicina", "Telemedicina"],
          ["abasto", "Abasto"],
          ["politicas", "Politicas publicas"],
          ["impacto", "Impacto poblacional"],
          ["red_solidaria", "Red solidaria"],
          ["compromisos", "Compromisos"],
          ["seguimiento", "Timeline"],
          ["plan", "Plan preventivo"],
          ["idiomas", "Idiomas y accesibilidad"],
          ["directorio", "Directorio demo"],
        ].map(([tab, label]) => (
          <button key={tab} type="button" onClick={() => onTabChange(tab as HealthTab)} className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-[#E0F2FE]">
            {label}
          </button>
        ))}
        <button type="button" onClick={() => onTabChange("directorio")} className="w-full rounded-xl bg-gradient-to-r from-[#E4007C] to-[#EF4444] px-3 py-4 text-left text-sm font-black uppercase text-white shadow-sm">
          Orientacion urgente
          <span className="mt-1 block text-[11px] font-semibold normal-case text-white/90">No contacta servicios externos.</span>
        </button>
      </aside>

      <section className="space-y-5">
        <div className="rounded-2xl bg-gradient-to-r from-[#0A4E84] via-[#702F8A] to-[#E4007C] p-5 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">{OFFICIAL_MODULE_NAME}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Sistema Ciudadano de Salud, Bienestar, Teleorientacion, Abasto, Evaluacion Publica y Solidaridad Comunitaria.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90">{OFFICIAL_MODULE_DESCRIPTION}</p>
          <p className="mt-2 max-w-3xl text-xs leading-5 text-white/80">{HEALTH_LIMITATION_NOTICE}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card, index) => (
            <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`mb-3 h-1.5 rounded-full ${accents[index]}`} />
              <div className="mb-1 text-[10px] font-black uppercase tracking-wide text-slate-400">{card.group}</div>
              <div className="text-2xl font-black text-[#0A4E84]">{card.value}</div>
              <div className="text-xs font-bold uppercase leading-5 text-slate-500">{card.label}</div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-black text-[#0A4E84]">Mi salud y documentos recientes</h3>
            <div className="mt-3 space-y-3">
              {dataset.cases.map((item) => (
                <button key={item.id} type="button" onClick={() => onOpenCase(item.id)} className="block w-full rounded-xl border border-slate-100 bg-[#F8FAFC] p-3 text-left hover:border-[#E4007C]">
                  <span className="text-xs font-black uppercase text-[#E4007C]">{item.folio}</span>
                  <span className="mt-1 block font-bold text-slate-800">{item.alias}</span>
                  <span className="text-xs text-slate-500">{item.tags.join(" / ")}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-black text-[#0A4E84]">Indicadores comunitarios simulados</h3>
            <div className="mt-3 space-y-3">
              {metrics.preventiveTopics.map((topic) => (
                <div key={topic.label}>
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>{topic.label}</span>
                    <span>{topic.value}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-[#0EA5E9]" style={{ width: `${Math.min(topic.value * 4, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-[#FFF7ED] p-3 text-xs font-semibold leading-5 text-[#9A3412]">Datos demostrativos. Informacion simulada para el MVP. Sin conexion a sistemas sanitarios oficiales.</p>
          </section>
        </div>

        <section className="grid gap-3 md:grid-cols-5">
          {[
            ["Proximas teleorientaciones", metrics.telehealthAppointments, "telemedicina"],
            ["Compromisos en seguimiento", metrics.publicCommitments, "compromisos"],
            ["Comites activos", metrics.activeCommittees, "comites"],
            ["Documentos recientes", metrics.documents, "documentos"],
            ["Actividad regional", dataset.impactIndicators.length, "impacto"],
          ].map(([label, value, tab]) => (
            <button key={label as string} type="button" onClick={() => onTabChange(tab as HealthTab)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-[#E4007C]">
              <div className="text-2xl font-black text-[#0A4E84]">{value}</div>
              <div className="text-xs font-bold uppercase leading-5 text-slate-500">{label}</div>
            </button>
          ))}
        </section>
      </section>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-black uppercase text-[#0A4E84]">Expediente activo</h3>
          <p className="mt-2 text-lg font-black text-slate-900">{selectedCase.alias}</p>
          <p className="text-xs font-bold text-[#E4007C]">{selectedCase.folio}</p>
          <div className="mt-3 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-[#22C55E]" style={{ width: `${selectedCase.progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-500">Privacidad: {selectedCase.privacyMode}. Actividad reciente local y demostrativa.</p>
        </section>

        <section className="rounded-2xl border-l-4 border-[#E4007C] bg-[#FDF2F8] p-4 text-sm leading-6 text-[#9D174D]">
          <h3 className="font-black uppercase">Ayuda urgente visible</h3>
          <p className="mt-1">Si hay senales de alarma, busca ayuda presencial inmediata y usa los numeros oficiales de emergencia de tu localidad.</p>
          <button type="button" onClick={() => onTabChange("directorio")} className="mt-3 rounded-xl bg-[#E4007C] px-4 py-2 text-xs font-black uppercase text-white">Ver directorio demo</button>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-black uppercase text-[#0A4E84]">Actividad reciente</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            {dataset.audit.slice(0, 3).map((event) => (
              <p key={event.id} className="rounded-xl bg-slate-50 p-3">{event.action}: {event.detail}</p>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
