"use client";

import { useMemo, useState } from "react";
import { languageLabels, statusLabels, URGENT_NOTICE } from "@/lib/salud-publica/constants";
import type { HealthCase, HealthCaseStatus, HealthDataset } from "@/lib/salud-publica/types";
import { UiState } from "./UiState";

type Props = {
  dataset: HealthDataset;
  selectedCase: HealthCase;
  onSelectCase: (caseId: string) => void;
  onPrint: () => void;
};

const statuses: Array<HealthCaseStatus | "todos"> = ["todos", "borrador", "orientacion_iniciada", "seguimiento", "listo_consulta", "cerrado", "archivado"];

export function CasesWorkspace({ dataset, selectedCase, onSelectCase, onPrint }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<HealthCaseStatus | "todos">("todos");
  const [sort, setSort] = useState<"reciente" | "avance" | "folio">("reciente");

  const cases = useMemo(() => {
    const text = query.trim().toLowerCase();
    return dataset.cases
      .filter((item) => status === "todos" || item.status === status)
      .filter((item) => !text || `${item.folio} ${item.alias} ${item.tags.join(" ")}`.toLowerCase().includes(text))
      .sort((a, b) => {
        if (sort === "avance") return b.progress - a.progress;
        if (sort === "folio") return a.folio.localeCompare(b.folio);
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [dataset.cases, query, sort, status]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar folio, alias o etiqueta" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#E4007C] md:col-span-1" />
          <select value={status} onChange={(event) => setStatus(event.target.value as HealthCaseStatus | "todos")} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#E4007C]">
            {statuses.map((item) => (
              <option key={item} value={item}>{item === "todos" ? "Todos los estados" : statusLabels[item]}</option>
            ))}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value as "reciente" | "avance" | "folio")} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#E4007C]">
            <option value="reciente">Más reciente</option>
            <option value="avance">Mayor progreso</option>
            <option value="folio">Folio</option>
          </select>
        </div>

        <div className="grid gap-3">
          <UiState kind="carga" title="Carga simulada">El repositorio mock responde localmente sin internet.</UiState>
          {cases.length === 0 ? <UiState kind="sin_resultados" title="Sin resultados">No hay expedientes para el filtro seleccionado.</UiState> : null}
          {cases.map((item) => (
            <button key={item.id} type="button" onClick={() => onSelectCase(item.id)} className={`rounded-2xl border p-4 text-left transition ${selectedCase.id === item.id ? "border-[#E4007C] bg-[#FDF2F8]" : "border-slate-200 bg-white hover:border-[#0EA5E9]"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase text-[#E4007C]">{item.folio}</p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">{item.alias}</h3>
                  <p className="text-sm text-slate-600">{item.type} / {languageLabels[item.language]}</p>
                </div>
                <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-black text-[#0369A1]">{statusLabels[item.status]}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{tag}</span>
                ))}
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-[#22C55E]" style={{ width: `${item.progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500">Creado {item.createdAt.slice(0, 10)} / Actualizado {item.updatedAt.slice(0, 10)}</p>
            </button>
          ))}
          <UiState kind="error" title="Error simulado">Vista preparada para errores de repositorio remoto futuro.</UiState>
          <UiState kind="vacio" title="Estado vacío">Cuando no existan expedientes se mostrará una invitación a crear borrador.</UiState>
        </div>
      </section>

      <CaseDetail selectedCase={selectedCase} dataset={dataset} onPrint={onPrint} />
    </div>
  );
}

function OriginBadge({ label }: { label: string }) {
  return <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black uppercase text-slate-600">{label}</span>;
}

function CaseDetail({ selectedCase, dataset, onPrint }: { selectedCase: HealthCase; dataset: HealthDataset; onPrint: () => void }) {
  const latestGuidance = selectedCase.guidance[0];

  return (
    <section className="space-y-4">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-[#E4007C]">{selectedCase.folio}</p>
            <h2 className="text-2xl font-black text-[#0A4E84]">{selectedCase.alias}</h2>
            <p className="text-sm leading-6 text-slate-600">{selectedCase.reason}</p>
          </div>
          <button type="button" onClick={onPrint} className="rounded-xl bg-[#0A4E84] px-4 py-2 text-xs font-black uppercase text-white print:hidden">Imprimir</button>
        </div>
      </article>

      {selectedCase.attentionLevel === "posible_emergencia" || latestGuidance?.level === "posible_emergencia" ? (
        <section className="rounded-2xl border-l-4 border-[#E4007C] bg-[#FDF2F8] p-4 text-sm leading-6 text-[#9D174D]">
          <h3 className="font-black uppercase">Posible señal de alarma</h3>
          <p>{URGENT_NOTICE}</p>
          <button type="button" className="mt-3 rounded-xl border border-[#E4007C] bg-white px-3 py-2 text-xs font-black uppercase text-[#E4007C]">Cerrar advertencia y continuar</button>
        </section>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Síntomas declarados", selectedCase.symptoms, "ciudadano"],
          ["Antecedentes declarados", selectedCase.declaredHistory, "ciudadano"],
          ["Alergias declaradas", selectedCase.declaredAllergies, "ciudadano"],
          ["Medicamentos declarados", selectedCase.declaredMedications, "ciudadano"],
        ].map(([title, values, origin]) => (
          <article key={title as string} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-black text-[#0A4E84]">{title as string}</h3>
              <OriginBadge label={origin as string} />
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {(values as string[]).map((value) => <li key={value} className="rounded-xl bg-slate-50 p-2">{value}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-black text-[#0A4E84]">Orientación, acciones y notas</h3>
          <OriginBadge label="reglas locales / asistente / sin validar" />
        </div>
        <p className="mt-3 rounded-xl bg-[#F8FAFC] p-3 text-sm leading-6 text-slate-700">{selectedCase.citizenNotes}</p>
        {latestGuidance ? (
          <div className="mt-3 rounded-xl border border-[#0EA5E9]/30 bg-[#E0F2FE] p-3 text-sm leading-6 text-[#0A4E84]">
            <strong>{latestGuidance.title}.</strong> {latestGuidance.summary}
            <ul className="mt-2 space-y-1">
              {latestGuidance.actions.map((action) => <li key={action.id}>{action.title}: {action.description}</li>)}
            </ul>
          </div>
        ) : (
          <UiState kind="proveedor_no_disponible" title="Sin orientación generada">Puedes usar el asistente local para estructurar una orientación informativa.</UiState>
        )}
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-black text-[#0A4E84]">Timeline</h3>
          <div className="mt-3 space-y-3">
            {selectedCase.timeline.map((event) => (
              <div key={event.id} className="border-l-4 border-[#E4007C] bg-slate-50 p-3 text-sm">
                <p className="font-bold text-slate-800">{event.description}</p>
                <p className="text-xs text-slate-500">{event.timestamp} / {event.actor} / {event.origin} / v{event.version}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-black text-[#0A4E84]">Documentos, versiones y auditoría</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            {selectedCase.documents.map((doc) => <p key={doc.id} className="rounded-xl bg-slate-50 p-3">{doc.title} / {doc.version} / hash {doc.hash}</p>)}
            {selectedCase.versions.map((version) => <p key={version.version} className="rounded-xl bg-[#F8FAFC] p-3">v{version.version}: {version.summary} / {version.origin}</p>)}
            {dataset.audit.filter((event) => event.caseId === selectedCase.id).map((event) => <p key={event.id} className="rounded-xl bg-[#FDF2F8] p-3">{event.action}: {event.detail}</p>)}
          </div>
          <UiState kind="advertencia" title="Privacidad">Controles simulados: ocultar información sensible, cambiar alias, exportar y eliminar expediente.</UiState>
        </article>
      </div>
    </section>
  );
}
