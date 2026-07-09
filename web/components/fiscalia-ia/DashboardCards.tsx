import type { EvidenceRecord, StructuredCase } from "@/lib/fiscalia-ia/types";

type DashboardCardsProps = {
  structuredCase: StructuredCase | null;
  evidenceCount: number;
};

export function DashboardCards({ structuredCase, evidenceCount }: DashboardCardsProps) {
  const checklistDone = structuredCase?.checklist.filter((item) => item.complete).length ?? 0;

  return (
    <section className="grid gap-3 md:grid-cols-4 print:hidden">
      {[
        { label: "Folio ciudadano", value: structuredCase?.folio ?? "Pendiente", color: "#E5007D" },
        { label: "Evidencia local", value: `${evidenceCount} archivo(s)`, color: "#39B54A" },
        { label: "Checklist", value: structuredCase ? `${checklistDone}/${structuredCase.checklist.length}` : "Sin generar", color: "#FFC20E" },
        { label: "Version", value: structuredCase ? `v${structuredCase.version}` : "v0", color: "#702F8A" },
      ].map((card) => (
        <article key={card.label} className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4 shadow-lg shadow-black/30">
          <div className="mb-3 h-1.5 w-12 rounded-full" style={{ backgroundColor: card.color }} />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{card.label}</p>
          <p className="mt-1 break-words text-lg font-black text-white">{card.value}</p>
        </article>
      ))}
    </section>
  );
}

export function EvidenceMiniList({ evidence }: { evidence: EvidenceRecord[] }) {
  if (!evidence.length) {
    return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-slate-400">Aún no hay archivos locales. Puedes trabajar con referencias descriptivas.</div>;
  }

  return (
    <div className="space-y-2">
      {evidence.map((item) => (
        <div key={item.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-white">{item.name}</span>
            <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-300">hash local</span>
          </div>
          <p className="mt-1 break-all font-mono text-[10px] text-slate-400">{item.sha256}</p>
        </div>
      ))}
    </div>
  );
}
