"use client";

import { HEALTH_LIMITATION_NOTICE, OFFICIAL_MODULE_DESCRIPTION, OFFICIAL_MODULE_NAME } from "@/lib/salud-publica/constants";
import type { CitizenTriageResult, HealthCase, HealthDataset, HealthTab } from "@/lib/salud-publica/types";
import { HealthTriageAssistant } from "./HealthTriageAssistant";

type Props = {
  dataset: HealthDataset;
  selectedCase: HealthCase;
  onTabChange: (tab: HealthTab) => void;
  onOpenCase: (caseId: string) => void;
  onSaveTriageResult: (result: CitizenTriageResult) => void;
  onPrint: () => void;
};

const accents = ["bg-[#E4007C]", "bg-[#0EA5E9]", "bg-[#FFC20E] text-slate-950", "bg-[#22C55E]", "bg-[#702F8A]"];

export function HealthDashboard({ dataset, selectedCase, onTabChange, onOpenCase, onSaveTriageResult, onPrint }: Props) {
  const metrics = dataset.metrics;
  const cards = [
    { group: "Mi salud", label: "Orientaciones personales", value: metrics.orientations },
    { group: "Mi salud", label: "Seguimientos de salud", value: metrics.pendingFollowups },
    { group: "Servicios y abasto", label: "Alertas de abasto", value: metrics.supplyAlerts },
    { group: "Evaluación pública", label: "Políticas en evaluación", value: metrics.policiesInEvaluation },
    { group: "Red solidaria", label: "Solicitudes solidarias", value: metrics.solidarityRequests },
  ];

  return (
    <div className="space-y-5">
      <HealthTriageAssistant selectedCase={selectedCase} onSaveResult={onSaveTriageResult} onOpenDirectory={() => onTabChange("directorio")} onPrint={onPrint} />

      <section className="space-y-5">
        <div className="rounded-2xl bg-gradient-to-r from-[#0A4E84] via-[#702F8A] to-[#E4007C] p-5 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">{OFFICIAL_MODULE_NAME}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Sistema Ciudadano de Salud, Bienestar, Teleorientación, Abasto, Evaluación Pública y Solidaridad Comunitaria.</h2>
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
            <p className="mt-4 rounded-xl bg-[#FFF7ED] p-3 text-xs font-semibold leading-5 text-[#9A3412]">Datos demostrativos. Información simulada para el MVP. Sin conexión a sistemas sanitarios oficiales.</p>
          </section>
        </div>

        <section className="grid gap-3 md:grid-cols-5">
          {[
            ["Próximas teleorientaciones", metrics.telehealthAppointments, "telemedicina"],
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
    </div>
  );
}
