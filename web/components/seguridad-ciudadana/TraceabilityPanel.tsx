import type { TraceEvent } from "@/lib/seguridad-ciudadana/types";

type TraceabilityPanelProps = {
  folio: string;
  dossierHash: string;
  trace: TraceEvent[];
};

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function TraceabilityPanel({ folio, dossierHash, trace }: TraceabilityPanelProps) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <div className="mb-3 inline-flex rounded-full bg-[#CEF7FA] px-3 py-1 text-xs font-bold uppercase text-[#006C73]">
        Sello local verificable
      </div>
      <h2 className="text-xl font-bold text-[#0A4E84]">Trazabilidad local</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Este sello es un hash local del expediente. No es blockchain real, no es certificación oficial y no acredita cadena de custodia oficial.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Folio cívico local</div>
          <div className="mt-1 break-words font-mono text-sm font-bold text-[#0A4E84]">{folio}</div>
        </div>
        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Hash del expediente</div>
          <div className="mt-1 break-all font-mono text-xs font-bold leading-5 text-[#0A4E84]">{dossierHash || "Calculando..."}</div>
        </div>
      </div>

      <ol className="mt-5 space-y-3">
        {trace.map((event) => (
          <li key={event.id} className="rounded-2xl bg-[#FFF8F0] p-4">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <h3 className="font-bold text-[#0A4E84]">{event.label}</h3>
              <time className="text-xs font-bold uppercase text-slate-500">{formatTimestamp(event.timestamp)}</time>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-700">{event.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
