import type { EvidenceRecord, StructuredCase } from "@/lib/fiscalia-ia/types";

type TraceabilityPanelProps = {
  structuredCase: StructuredCase | null;
  evidence: EvidenceRecord[];
};

export function TraceabilityPanel({ structuredCase, evidence }: TraceabilityPanelProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-black uppercase text-[#0A4E84]">Trazabilidad local e historial</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Registro de integridad digital con hash SHA-256 local cuando el navegador lo permite. No es una red pública distribuida ni un aval institucional.
        </p>
      </div>

      {!structuredCase ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-[#F8FAFC] p-8 text-center text-sm text-slate-500">Genera un expediente para ver folio, versión, hash e historial.</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
            <p className="text-[10px] font-black uppercase text-slate-500">Folio ciudadano</p>
            <p className="mt-1 break-words font-mono text-sm font-bold text-[#0A4E84]">{structuredCase.folio}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
            <p className="text-[10px] font-black uppercase text-slate-500">Timestamp</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#0A4E84]">{structuredCase.timestamp}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
            <p className="text-[10px] font-black uppercase text-slate-500">Versión</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#0A4E84]">v{structuredCase.version}</p>
          </div>
          <div className="rounded-2xl border border-[#DDD6FE] bg-[#F3E8FF] p-4 lg:col-span-3">
            <p className="text-[10px] font-black uppercase text-[#6D28D9]">Hash SHA-256 del contenido</p>
            <p className="mt-1 break-all font-mono text-xs text-[#4C1D95]">{structuredCase.contentHash}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 lg:col-span-2">
            <h3 className="text-xs font-black uppercase text-[#0A4E84]">Historial de cambios</h3>
            <ol className="mt-3 space-y-3">
              {structuredCase.trace.map((event) => (
                <li key={event.id} className="border-l-2 border-[#16A34A] pl-3 text-xs leading-5 text-slate-600">
                  <strong className="block text-[#0A4E84]">{event.label}</strong>
                  {event.timestamp} · {event.detail}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
            <h3 className="text-xs font-black uppercase text-[#0A4E84]">Inventario de evidencia</h3>
            <div className="mt-3 space-y-2">
              {[...evidence, ...structuredCase.evidence.filter((item) => item.sha256 === "pendiente de archivo local")].map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-2 text-xs">
                  <p className="font-bold text-[#0A4E84]">{item.name}</p>
                  <p className="break-all font-mono text-[10px] text-slate-500">{item.sha256}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
