import { useState } from "react";
import type { CasePriority, CaseStatus, PrivacyLevel, SearchCase, SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { formatDate, privacyLabels, priorityLabels, statusLabels } from "@/lib/madres-buscadoras/utils";

type Props = {
  cases: SearchCase[];
  dataset: SearchCaseDataset;
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
};

type SortKey = "updatedAt" | "priority" | "state";

const priorityRank: Record<CasePriority, number> = { critical: 4, high: 3, medium: 2, low: 1 };

export function CasesList({ cases, dataset, selectedCaseId, onSelectCase }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CaseStatus | "all">("all");
  const [priority, setPriority] = useState<CasePriority | "all">("all");
  const [territory, setTerritory] = useState("all");
  const [privacy, setPrivacy] = useState<PrivacyLevel | "all">("all");
  const [committee, setCommittee] = useState("all");
  const [sort, setSort] = useState<SortKey>("updatedAt");

  const states = Array.from(new Set(cases.map((item) => item.state))).sort();

  const normalized = query.trim().toLowerCase();
  const filtered = cases
    .filter((item) => {
      const committeeMatch = committee === "all" || item.committeeId === committee;
      const queryMatch =
        !normalized ||
        [item.folio, item.displayName, item.state, item.municipality, item.collective, item.summary, item.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return (
        queryMatch &&
        (status === "all" || item.status === status) &&
        (priority === "all" || item.priority === priority) &&
        (territory === "all" || item.state === territory) &&
        (privacy === "all" || item.privacyLevel === privacy) &&
        committeeMatch
      );
    })
    .sort((a, b) => {
      if (sort === "priority") return priorityRank[b.priority] - priorityRank[a.priority];
      if (sort === "state") return a.state.localeCompare(b.state);
      return b.updatedAt.localeCompare(a.updatedAt);
    });

  return (
    <section className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Expedientes</p>
          <h2 className="mt-1 text-2xl font-black text-[#0A4E84]">Busqueda y seguimiento</h2>
        </div>
        <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">{filtered.length} resultado(s)</span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-slate-700">Buscar</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Folio, nombre, colectivo, municipio o etiqueta" className="mt-1 min-h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/20" />
        </label>
        <Select label="Estado" value={status} onChange={(value) => setStatus(value as CaseStatus | "all")} options={[["all", "Todos"], ...Object.entries(statusLabels)]} />
        <Select label="Prioridad" value={priority} onChange={(value) => setPriority(value as CasePriority | "all")} options={[["all", "Todas"], ...Object.entries(priorityLabels)]} />
        <Select label="Territorio" value={territory} onChange={setTerritory} options={[["all", "Todos"], ...states.map((item) => [item, item] as [string, string])]} />
        <Select label="Privacidad" value={privacy} onChange={(value) => setPrivacy(value as PrivacyLevel | "all")} options={[["all", "Todas"], ...Object.entries(privacyLabels)]} />
        <Select label="Comite" value={committee} onChange={setCommittee} options={[["all", "Todos"], ...dataset.committees.map((item) => [item.id, item.name] as [string, string])]} />
        <Select label="Ordenar" value={sort} onChange={(value) => setSort(value as SortKey)} options={[["updatedAt", "Actualizacion"], ["priority", "Prioridad"], ["state", "Entidad"]]} />
      </div>

      <div className="mt-5 space-y-3">
        {cases.length === 0 ? (
          <StateMessage title="Sin expedientes" copy="Cuando exista un registro local aparecera aqui." tone="info" />
        ) : filtered.length === 0 ? (
          <StateMessage title="Sin coincidencias" copy="Ajusta busqueda o filtros para ver otros expedientes demostrativos." tone="warning" />
        ) : (
          filtered.map((item) => {
            const review = dataset.reviews.find((candidate) => candidate.caseId === item.id);
            const isSelected = selectedCaseId === item.id;
            return (
              <button key={item.id} type="button" onClick={() => onSelectCase(item.id)} className={`w-full rounded-[24px] border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${isSelected ? "border-[#E4007C] bg-[#FCE7F3]" : "border-slate-200 bg-[#F8FAFC] hover:bg-white"}`}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E4007C] px-3 py-1 text-xs font-black text-white">{item.folio}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0A4E84] ring-1 ring-slate-200">{statusLabels[item.status]}</span>
                      <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-bold text-[#9A3412]">{priorityLabels[item.priority]}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-black text-[#0A4E84]">{item.displayName}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.municipality}, {item.state} | Ultima vez: {formatDate(item.lastSeenDate)}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.summary}</p>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-white p-3 text-sm ring-1 ring-slate-200 lg:w-56">
                    <div className="font-bold text-slate-700">{privacyLabels[item.privacyLevel]}</div>
                    <div className="mt-1 text-slate-500">{review ? `Revision: ${review.status}` : "Sin comite asignado"}</div>
                    <div className="mt-1 text-slate-500">Actualizado: {formatDate(item.updatedAt)}</div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 min-h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-sm outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/20">
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}

function StateMessage({ title, copy, tone }: { title: string; copy: string; tone: "info" | "warning" }) {
  return (
    <div className={`rounded-2xl border-l-4 p-4 text-sm leading-6 ${tone === "info" ? "border-[#0EA5E9] bg-[#E0F2FE] text-[#0369A1]" : "border-[#F97316] bg-[#FFF7ED] text-[#9A3412]"}`}>
      <strong>{title}.</strong> {copy}
    </div>
  );
}
