import type { EvidenceRecord, StructuredCase } from "@/lib/fiscalia-ia/types";

type TraceabilityPanelProps = {
  structuredCase: StructuredCase | null;
  evidence: EvidenceRecord[];
};

export function TraceabilityPanel({ structuredCase, evidence }: TraceabilityPanelProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 shadow-xl shadow-black/40">
      <div className="mb-5">
        <h2 className="text-lg font-black uppercase text-white">Trazabilidad local e historial</h2>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Registro de integridad digital con hash SHA-256 local cuando el navegador lo permite. No es una red pública distribuida ni un aval institucional.
        </p>
      </div>

      {!structuredCase ? (
        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center text-sm text-slate-400">Genera un expediente para ver folio, version, hash e historial.</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-[10px] font-black uppercase text-slate-500">Folio ciudadano</p>
            <p className="mt-1 break-words font-mono text-sm font-bold text-white">{structuredCase.folio}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-[10px] font-black uppercase text-slate-500">Timestamp</p>
            <p className="mt-1 font-mono text-sm font-bold text-white">{structuredCase.timestamp}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-[10px] font-black uppercase text-slate-500">Versión</p>
            <p className="mt-1 font-mono text-sm font-bold text-white">v{structuredCase.version}</p>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4 lg:col-span-3">
            <p className="text-[10px] font-black uppercase text-purple-200">Hash SHA-256 del contenido</p>
            <p className="mt-1 break-all font-mono text-xs text-purple-100">{structuredCase.contentHash}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 lg:col-span-2">
            <h3 className="text-xs font-black uppercase text-white">Historial de cambios</h3>
            <ol className="mt-3 space-y-3">
              {structuredCase.trace.map((event) => (
                <li key={event.id} className="border-l-2 border-[#39B54A] pl-3 text-xs leading-5 text-slate-300">
                  <strong className="block text-white">{event.label}</strong>
                  {event.timestamp} · {event.detail}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="text-xs font-black uppercase text-white">Inventario de evidencia</h3>
            <div className="mt-3 space-y-2">
              {[...evidence, ...structuredCase.evidence.filter((item) => item.sha256 === "pendiente de archivo local")].map((item) => (
                <div key={item.id} className="rounded-lg border border-zinc-800 bg-[#12141c] p-2 text-xs">
                  <p className="font-bold text-white">{item.name}</p>
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
