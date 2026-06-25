import { printableSections } from "@/lib/seguridad-ciudadana/mockData";
import type { EvidenceItem, PrintableSectionId, SecurityReport, TraceEvent, ValidationResult } from "@/lib/seguridad-ciudadana/types";

type ForensicPreviewProps = {
  folio: string;
  report: SecurityReport;
  evidence: EvidenceItem[];
  trace: TraceEvent[];
  dossierHash: string;
  previousDossierHash: string;
  selectedSection: PrintableSectionId;
  validation: ValidationResult;
  onSectionChange: (section: PrintableSectionId) => void;
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

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function shouldShowSection(selected: PrintableSectionId, section: PrintableSectionId): boolean {
  return selected === "all" || selected === section;
}

function PrintSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="print-section rounded-2xl bg-white p-5 ring-1 ring-slate-200 print:rounded-none print:p-0 print:ring-0">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E4007C] print:text-black">Tecnocracia Participativa México 2030</p>
      <h2 className="mt-2 text-2xl font-bold text-[#0A4E84] print:text-black">{title}</h2>
      <div className="mt-4 text-slate-800 print:text-black">{children}</div>
    </section>
  );
}

export function ForensicPreview({
  folio,
  report,
  evidence,
  trace,
  dossierHash,
  previousDossierHash,
  selectedSection,
  validation,
  onSectionChange,
  onCompile,
  onPrint,
}: ForensicPreviewProps) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD] print:shadow-none print:ring-0">
      <div className="print:hidden">
        <div className="mb-3 inline-flex rounded-full bg-[#FFD6E9] px-3 py-1 text-xs font-bold uppercase text-[#B00061]">
          Impresión
        </div>
        <h2 className="text-xl font-bold text-[#0A4E84]">Paquete ciudadano imprimible</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Selecciona una sección o el paquete completo. Todo se genera localmente desde el navegador.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {printableSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                selectedSection === section.id
                  ? "bg-[#E4007C] text-white"
                  : "bg-[#F8FAFC] text-[#0A4E84] ring-1 ring-[#BFC8CF] hover:bg-[#E0F2FE]"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

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

      <article className="mt-6 space-y-5 rounded-2xl bg-[#F8FAFC] p-5 text-slate-800 print:mt-0 print:space-y-0 print:bg-white print:p-0">
        {shouldShowSection(selectedSection, "section1") ? (
          <PrintSection title="1. Acta ciudadana de hechos">
            <dl className="grid gap-3 md:grid-cols-2">
              <div><dt className="text-xs font-bold uppercase text-slate-500">Folio cívico local</dt><dd className="font-mono text-sm">{folio}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Fecha aproximada</dt><dd>{formatDate(report.approximateDate)}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Categoría</dt><dd>{report.category || "Sin categoría"}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Riesgo percibido</dt><dd>{report.riskLevel || "No indicado"}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Ubicación general</dt><dd>{report.location || "No indicada"}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Idioma original</dt><dd>{report.originalLanguage || "No indicado"}</dd></div>
            </dl>
            <h3 className="mt-5 text-sm font-bold uppercase text-slate-500">Narrativa de hechos</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{report.narrative || "Sin narrativa capturada."}</p>
            <p className="mt-5 rounded-xl bg-[#FFF8F0] p-4 text-sm leading-6">
              Este documento es un registro ciudadano auxiliar y una aportación organizada. No sustituye denuncia oficial, peritaje oficial ni asesoría legal.
            </p>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "section2") ? (
          <PrintSection title="2. Orientación general de derechos">
            <p className="text-sm leading-7">
              Esta sección ofrece orientación general para que la persona reportante conserve información, minimice riesgos y decida si presenta el registro ante la autoridad competente.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
              <li>Conservar archivos originales en el dispositivo o medio donde se encuentren.</li>
              <li>Evitar publicar datos personales de terceros que no sean necesarios.</li>
              <li>Solicitar apoyo profesional si existe riesgo alto, amenaza o urgencia.</li>
              <li>Presentar información con claridad, fechas aproximadas y contexto verificable cuando sea posible.</li>
            </ul>
            <p className="mt-4 rounded-xl bg-[#E0F2FE] p-4 text-sm leading-6">
              Esta orientación no constituye asesoría legal ni crea obligaciones para autoridad alguna.
            </p>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "section3") ? (
          <PrintSection title="3. Inventario local de evidencias">
            {evidence.length === 0 ? (
              <p className="text-sm leading-6">No se agregaron evidencias. La carpeta puede imprimirse sin anexos.</p>
            ) : (
              <div className="space-y-3">
                {evidence.map((item) => (
                  <div key={item.id} className="rounded-xl bg-[#F8FAFC] p-3 ring-1 ring-slate-200 print:bg-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#0A4E84] px-3 py-1 text-xs font-bold text-white print:bg-white print:text-black print:ring-1 print:ring-black">{item.localId}</span>
                      <span className="rounded-full bg-[#D8F3DC] px-3 py-1 text-xs font-bold text-[#1F5F24] print:bg-white print:text-black print:ring-1 print:ring-black">Registrada en este dispositivo</span>
                    </div>
                    <p className="mt-3 font-bold">{item.name}</p>
                    <p className="text-sm">{formatBytes(item.size)} · {item.type} · {formatTimestamp(item.addedAt)}</p>
                    <p className="mt-2 text-sm leading-6">Fuente/contexto: {item.sourceContext || "Contexto no indicado"}</p>
                    <p className="break-all font-mono text-xs">SHA-256: {item.sha256}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 rounded-xl bg-[#FFF8F0] p-4 text-sm leading-6">
              Los archivos no se adjuntan ni se suben en esta versión. El inventario conserva nombre, tamaño, tipo, fecha local y hash SHA-256 calculado en el navegador.
            </p>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "section4") ? (
          <PrintSection title="4. Resumen descriptivo de consistencia">
            <p className="text-sm leading-7">
              Este resumen no usa IA ni emite dictamen. Solo organiza los elementos capturados para facilitar una revisión humana posterior.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-[#F8FAFC] p-4 print:bg-white print:ring-1 print:ring-slate-300">
                <div className="text-xs font-bold uppercase text-slate-500">Narrativa mínima</div>
                <div className="mt-1 font-bold">{report.narrative.trim().length >= 40 ? "Capturada" : "Pendiente"}</div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] p-4 print:bg-white print:ring-1 print:ring-slate-300">
                <div className="text-xs font-bold uppercase text-slate-500">Evidencias inventariadas</div>
                <div className="mt-1 font-bold">{evidence.length}</div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] p-4 print:bg-white print:ring-1 print:ring-slate-300">
                <div className="text-xs font-bold uppercase text-slate-500">Hash actual</div>
                <div className="mt-1 break-all font-mono text-xs font-bold">{dossierHash || "Pendiente"}</div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] p-4 print:bg-white print:ring-1 print:ring-slate-300">
                <div className="text-xs font-bold uppercase text-slate-500">Hash previo local</div>
                <div className="mt-1 break-all font-mono text-xs font-bold">{previousDossierHash || "Sin hash previo"}</div>
              </div>
            </div>
            <h3 className="mt-5 text-sm font-bold uppercase text-slate-500">Eventos locales</h3>
            <ol className="mt-2 space-y-2 text-sm leading-6">
              {trace.map((event) => (
                <li key={event.id}>{formatTimestamp(event.timestamp)} · {event.label}: {event.detail}</li>
              ))}
            </ol>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "section5") ? (
          <PrintSection title="5. Guía de presentación ante autoridad competente">
            <p className="text-sm leading-7">
              Si la persona decide presentar este registro, puede usarlo como apoyo para ordenar hechos y evidencias ante la autoridad competente.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7">
              <li>Llevar archivos originales o copias en el medio que la autoridad indique.</li>
              <li>Explicar que este paquete es un registro ciudadano auxiliar generado localmente.</li>
              <li>Explicar que el hash solo ayuda a comparar archivos locales y no sustituye revisiones técnicas o resguardos institucionales.</li>
              <li>Solicitar acuse o constancia por los canales oficiales disponibles, si corresponde.</li>
            </ul>
            <p className="mt-4 rounded-xl bg-[#FFE0DC] p-4 text-sm leading-6">
              Este material no equivale a denuncia formal, expediente abierto, conclusión técnica institucional ni asesoría legal.
            </p>
          </PrintSection>
        ) : null}
      </article>

      <style>{`
        @media print {
          body { background: #ffffff !important; }
          .print\\:hidden, button, input, select, textarea { display: none !important; }
          .print-section { page-break-after: always; break-after: page; min-height: 92vh; }
          .print-section:last-child { page-break-after: auto; break-after: auto; }
        }
      `}</style>
    </section>
  );
}
