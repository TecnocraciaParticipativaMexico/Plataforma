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
        { label: "Folio ciudadano", value: structuredCase?.folio ?? "Pendiente", color: "#E4007C" },
        { label: "Evidencia local", value: `${evidenceCount} archivo(s)`, color: "#16A34A" },
        { label: "Checklist", value: structuredCase ? `${checklistDone}/${structuredCase.checklist.length}` : "Sin generar", color: "#F2C300" },
        { label: "Versión", value: structuredCase ? `v${structuredCase.version}` : "v0", color: "#8B5CF6" },
      ].map((card) => (
        <article key={card.label} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 h-1.5 w-12 rounded-full" style={{ backgroundColor: card.color }} />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{card.label}</p>
          <p className="mt-1 break-words text-lg font-black text-[#0A4E84]">{card.value}</p>
        </article>
      ))}
    </section>
  );
}

export function EvidenceMiniList({ evidence }: { evidence: EvidenceRecord[] }) {
  if (!evidence.length) {
    return <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-xs text-slate-500">Aún no hay archivos locales. Puedes trabajar con referencias descriptivas.</div>;
  }

  return (
    <div className="space-y-2">
      {evidence.map((item) => (
        <div key={item.id} className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[#0A4E84]">{item.name}</span>
            <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-bold text-[#166534]">hash local</span>
          </div>
          <p className="mt-1 break-all font-mono text-[10px] text-slate-500">{item.sha256}</p>
        </div>
      ))}
    </div>
  );
}
