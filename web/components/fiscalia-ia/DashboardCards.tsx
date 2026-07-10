import type { EvidenceRecord, StructuredCase } from "@/lib/fiscalia-ia/types";

type DashboardCardsProps = {
  structuredCase: StructuredCase | null;
  evidenceCount: number;
};

export function DashboardCards({ structuredCase, evidenceCount }: DashboardCardsProps) {
  const checklistDone = structuredCase?.checklist.filter((item) => item.complete).length ?? 0;
  const cards = [
    { label: "Folio", desktopLabel: "Folio ciudadano", value: structuredCase?.folio ?? "Pendiente", color: "#E4007C" },
    { label: "Archivos", desktopLabel: "Evidencia local", value: `${evidenceCount}`, color: "#16A34A" },
    { label: "Checklist", desktopLabel: "Checklist", value: structuredCase ? `${checklistDone}/${structuredCase.checklist.length}` : "Sin generar", color: "#F2C300" },
    { label: "Versión", desktopLabel: "Versión", value: structuredCase ? `v${structuredCase.version}` : "v0", color: "#8B5CF6" },
  ];

  return (
    <section className="print:hidden">
      <article className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm md:hidden">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-xs font-black uppercase tracking-wide text-[#0A4E84]">Resumen del expediente</h2>
          <span className="rounded-full bg-[#F8FAFC] px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">local</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {cards.map((card) => (
            <div key={card.desktopLabel} className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-2">
              <div className="mb-1 h-1 w-8 rounded-full" style={{ backgroundColor: card.color }} />
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">{card.label}</p>
              <p className="mt-0.5 break-words text-sm font-black leading-tight text-[#0A4E84]">{card.value}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="hidden gap-3 md:grid md:grid-cols-4">
        {cards.map((card) => (
          <article key={card.desktopLabel} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 h-1.5 w-12 rounded-full" style={{ backgroundColor: card.color }} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{card.desktopLabel}</p>
            <p className="mt-1 break-words text-lg font-black text-[#0A4E84]">{card.desktopLabel === "Evidencia local" ? `${card.value} archivo(s)` : card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EvidenceMiniList({ evidence }: { evidence: EvidenceRecord[] }) {
  if (!evidence.length) {
    return <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-xs text-slate-500">Aún no hay archivos locales. Puedes trabajar con evidencias descritas o pendientes de adjuntar.</div>;
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
