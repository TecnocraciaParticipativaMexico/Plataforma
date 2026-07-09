import { useMemo, useState } from "react";
import { factTypes, mockCases } from "@/lib/fiscalia-ia/data/mock";
import type { RiskLevel, ReviewStatus, TerritorialLevel } from "@/lib/fiscalia-ia/types";

const statusLabels: Record<ReviewStatus, string> = {
  borrador: "Borrador",
  en_revision: "En revisión",
  observaciones: "Observaciones",
  presentable: "Presentable para revisión",
};

export function CasesExplorer() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<RiskLevel | "todos">("todos");
  const [level, setLevel] = useState<TerritorialLevel | "todos">("todos");
  const [type, setType] = useState("todos");

  const filtered = useMemo(() => {
    return mockCases.filter((item) => {
      const text = `${item.folio} ${item.state} ${item.municipality} ${item.factType}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (risk === "todos" || item.riskLevel === risk) &&
        (level === "todos" || item.territorialLevel === level) &&
        (type === "todos" || item.factType === type)
      );
    });
  }, [level, query, risk, type]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 shadow-xl shadow-black/40">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-black uppercase text-white">Expedientes ciudadanos mock</h2>
          <p className="mt-1 text-xs text-slate-400">Lista local para preparar buscador, filtros y panel administrativo futuro.</p>
        </div>
        <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-bold uppercase text-slate-300">{filtered.length} resultado(s)</span>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar folio, estado o municipio" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]" />
        <select value={risk} onChange={(event) => setRisk(event.target.value as RiskLevel | "todos")} className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]">
          <option value="todos">Todos los riesgos</option>
          <option value="bajo">Bajo</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
          <option value="critico">Crítico</option>
        </select>
        <select value={level} onChange={(event) => setLevel(event.target.value as TerritorialLevel | "todos")} className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]">
          <option value="todos">Todos los niveles</option>
          <option value="colonia">Colonia/comunidad</option>
          <option value="municipal">Municipal</option>
          <option value="estatal">Estatal</option>
          <option value="federal">Federal</option>
        </select>
        <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]">
          <option value="todos">Todos los tipos</option>
          {factTypes.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="mt-5 grid gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center text-sm text-slate-400">No hay expedientes mock con esos filtros.</div>
        ) : (
          filtered.map((item) => (
            <article key={item.folio} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#0054A6] px-3 py-1 text-xs font-black text-white">{item.folio}</span>
                    <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold text-slate-300">{statusLabels[item.status]}</span>
                    <span className="rounded-full bg-pink-950 px-3 py-1 text-xs font-bold text-pink-200">Riesgo {item.riskLevel}</span>
                  </div>
                  <h3 className="mt-3 font-bold text-white">{item.factType}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.municipality}, {item.state} · {item.date}</p>
                </div>
                <p className="max-w-lg text-sm leading-6 text-slate-300">{item.committeeReview}</p>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-500">Última actualización: {item.updatedAt}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
