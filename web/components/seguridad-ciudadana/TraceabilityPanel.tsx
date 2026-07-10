import type { TraceEvent } from "@/lib/seguridad-ciudadana/types";

type TraceabilityPanelProps = {
  folio: string;
  dossierHash: string;
  previousDossierHash: string;
  trace: TraceEvent[];
};

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function TraceabilityPanel({ folio, dossierHash, previousDossierHash, trace }: TraceabilityPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-3 inline-flex rounded-full bg-[#702F8A]/10 px-3 py-1 text-xs font-bold uppercase text-[#702F8A]">
        Bitácora local verificable
      </div>
      <h2 className="text-xl font-bold text-slate-950">Trazabilidad local del expediente</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Este registro prueba integridad local del expediente, no equivale a aval institucional ni blockchain pública.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Folio cívico local</div>
          <div className="mt-1 break-words font-mono text-sm font-bold text-[#0054A6]">{folio}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Hash actual del expediente</div>
          <div className="mt-1 break-all font-mono text-xs font-bold leading-5 text-[#702F8A]">{dossierHash || "Calculando..."}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Hash previo local</div>
          <div className="mt-1 break-all font-mono text-xs font-bold leading-5 text-[#702F8A]">{previousDossierHash || "Sin hash previo"}</div>
        </div>
      </div>

      <ol className="mt-5 space-y-3">
        {trace.map((event) => (
          <li key={event.id} className="rounded-2xl border-l-4 border-[#702F8A] bg-slate-50 p-4">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <h3 className="font-bold text-slate-950">{event.label}</h3>
              <time className="text-xs font-bold uppercase text-slate-500">{formatTimestamp(event.timestamp)}</time>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-700">{event.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
