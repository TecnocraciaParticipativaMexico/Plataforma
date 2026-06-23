import type { EvidenceItem, SecurityReport, TraceEvent, ValidationResult } from "@/lib/seguridad-ciudadana/types";

type ForensicPreviewProps = {
  folio: string;
  report: SecurityReport;
  evidence: EvidenceItem[];
  trace: TraceEvent[];
  dossierHash: string;
  validation: ValidationResult;
  onCompile: () => void;
  onPrint: () => void;
};

function formatDate(value: string): string {
  if (!value) return "Sin fecha capturada";
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(new Date(`${value}T00:00:00`));
}

function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function ForensicPreview({ folio, report, evidence, trace, dossierHash, validation, onCompile, onPrint }: ForensicPreviewProps) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD] print:shadow-none print:ring-0">
      <div className="print:hidden">
        <div className="mb-3 inline-flex rounded-full bg-[#FFD6E9] px-3 py-1 text-xs font-bold uppercase text-[#B00061]">
          Vista imprimible
        </div>
        <h2 className="text-xl font-bold text-[#0A4E84]">Carpeta Forense Cívica</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Compila una aportación organizada para imprimir o guardar como PDF desde el navegador.
        </p>
        {!validation.isValid ? (
          <div className="mt-4 rounded-2xl bg-[#FFF1A8] p-4 text-sm leading-6 text-[#0A4E84]">
            Campos mínimos pendientes: {validation.missingFields.join(", ")}.
          </div>
        ) : null}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCompile}
            className="rounded-full bg-[#E4007C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B00061]"
          >
            Compilar reporte
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="rounded-full bg-[#0A4E84] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#083E69]"
          >
            Imprimir o guardar PDF
          </button>
        </div>
      </div>

      <article className="mt-6 rounded-2xl bg-[#F8FAFC] p-5 text-slate-800 print:mt-0 print:bg-white print:p-0">
        <header className="border-b border-slate-200 pb-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C] print:text-black">Tecnocracia Participativa México 2030</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0A4E84] print:text-black">Acta ciudadana de hechos</h1>
          <p className="mt-2 font-mono text-sm">Folio cívico local: {folio}</p>
          <p className="mt-1 break-all font-mono text-xs">Sello local verificable: {dossierHash || "Pendiente"}</p>
        </header>

        <section className="mt-5">
          <h2 className="text-lg font-bold text-[#0A4E84] print:text-black">1. Registro ciudadano auxiliar</h2>
          <dl className="mt-3 grid gap-3 md:grid-cols-2">
            <div><dt className="text-xs font-bold uppercase text-slate-500">Categoría</dt><dd>{report.category || "Sin categoría"}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-slate-500">Fecha aproximada</dt><dd>{formatDate(report.approximateDate)}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-slate-500">Ubicación general</dt><dd>{report.location || "No indicada"}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-slate-500">Idioma original</dt><dd>{report.originalLanguage || "No indicado"}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-slate-500">Riesgo percibido</dt><dd>{report.riskLevel || "No indicado"}</dd></div>
          </dl>
          <h3 className="mt-4 text-sm font-bold uppercase text-slate-500">Narrativa de hechos</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{report.narrative || "Sin narrativa capturada."}</p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-[#0A4E84] print:text-black">2. Inventario de evidencias</h2>
          {evidence.length === 0 ? (
            <p className="mt-2 text-sm leading-6">No se agregaron evidencias. La carpeta puede imprimirse sin anexos.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {evidence.map((item, index) => (
                <div key={item.id} className="rounded-xl bg-white p-3 ring-1 ring-slate-200 print:ring-0">
                  <p className="font-bold">{index + 1}. {item.name}</p>
                  <p className="text-sm">{formatBytes(item.size)} · {item.type}</p>
                  <p className="break-all font-mono text-xs">SHA-256: {item.sha256}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-[#0A4E84] print:text-black">3. Aviso de privacidad y consentimiento</h2>
          <p className="mt-2 text-sm leading-7">
            Los archivos permanecen en este dispositivo en esta versión MVP. Este documento es una aportación organizada y no sustituye denuncia oficial, peritaje oficial, asesoría legal ni resolución de autoridad competente.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-[#0A4E84] print:text-black">4. Bitácora de trazabilidad local</h2>
          <ol className="mt-3 space-y-2 text-sm leading-6">
            {trace.map((event) => (
              <li key={event.id}>{new Date(event.timestamp).toLocaleString("es-MX")} · {event.label}: {event.detail}</li>
            ))}
          </ol>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-[#0A4E84] print:text-black">5. Recomendaciones de presentación</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7">
            <li>Presentar este registro ciudadano auxiliar ante la autoridad competente si la persona lo decide.</li>
            <li>Conservar archivos originales en el dispositivo o medio seguro donde se encuentren.</li>
            <li>No publicar datos personales de terceros innecesarios.</li>
            <li>Solicitar orientación profesional cuando exista riesgo alto o dudas legales.</li>
          </ul>
        </section>
      </article>
    </section>
  );
}
