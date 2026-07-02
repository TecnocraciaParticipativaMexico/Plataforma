import type { ReactNode } from "react";
import { committeeReviews, printableSections } from "@/lib/seguridad-ciudadana/mockData";
import type { EvidenceItem, PrintableSectionId, SecurityReport, SectionStatus, TraceEvent, ValidationResult } from "@/lib/seguridad-ciudadana/types";

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

const sectionColor: Record<Exclude<PrintableSectionId, "all">, string> = {
  cover: "#E5007D",
  narrative: "#0054A6",
  evidence: "#39B54A",
  trace: "#702F8A",
  committees: "#F7931E",
  privacy: "#FFC20E",
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

function statusClass(status: SectionStatus): string {
  if (status === "Completa") return "bg-[#39B54A]/15 text-[#1F5F24]";
  if (status === "Incompleta") return "bg-[#FFC20E]/30 text-[#7A4B00]";
  return "bg-slate-100 text-slate-600";
}

function PrintSection({
  children,
  color,
  status,
  title,
}: {
  children: ReactNode;
  color: string;
  status: SectionStatus;
  title: string;
}) {
  return (
    <section className="print-section relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-md print:rounded-none print:border-0 print:p-0 print:shadow-none">
      <div className="absolute inset-y-0 left-0 w-1.5 print:w-2" style={{ backgroundColor: color }} />
      <div className="pl-4 print:pl-6">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between print:border-black">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E5007D] print:text-black">Tecnocracia Participativa México 2030</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 print:text-black">{title}</h2>
          </div>
          <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase print:bg-white print:text-black print:ring-1 print:ring-black ${statusClass(status)}`}>
            {status}
          </span>
        </div>
        <div className="mt-4 text-slate-800 print:text-black">{children}</div>
      </div>
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
  const sectionStatuses: Record<Exclude<PrintableSectionId, "all">, SectionStatus> = {
    cover: validation.isValid ? "Completa" : "Incompleta",
    narrative: report.narrative.trim().length >= 80 ? "Completa" : "Incompleta",
    evidence: evidence.length > 0 ? "Completa" : report.evidenceAbsenceExplanation.trim().length >= 20 ? "Incompleta" : "Pendiente",
    trace: dossierHash && trace.length > 0 ? "Completa" : "Pendiente",
    committees: "Pendiente",
    privacy: report.consentAccepted && report.falseReportWarningAccepted && report.thirdPartyPrivacyAccepted ? "Completa" : "Incompleta",
  };
  const printTitle = validation.isValid ? "Expediente Técnico Ciudadano" : "BORRADOR INCOMPLETO";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md print:border-0 print:p-0 print:shadow-none">
      <div className="print:hidden">
        <div className="mb-3 inline-flex rounded-full bg-[#E5007D]/10 px-3 py-1 text-xs font-bold uppercase text-[#B00061]">
          Carpeta imprimible
        </div>
        <h2 className="text-xl font-bold text-slate-950">Vista imprimible por secciones</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Puedes imprimir siempre. Si faltan campos mínimos, el paquete saldrá con la marca BORRADOR INCOMPLETO.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {printableSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                selectedSection === section.id
                  ? "border-transparent bg-slate-950 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-[#0054A6] hover:bg-white"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border-l-4 border-[#E5007D] bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <span className="font-bold text-slate-950">{printTitle}</span>
          {" · "}Calidad: {validation.qualityLabel}. Nivel de integridad: {validation.integrityLevel}.
          {validation.missingFields.length ? ` Pendiente: ${validation.missingFields.join(", ")}.` : ""}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCompile}
            className="rounded-full bg-gradient-to-r from-[#E5007D] to-[#702F8A] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
          >
            Compilar expediente
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="rounded-full bg-[#0054A6] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#003E7C]"
          >
            Imprimir o guardar PDF
          </button>
        </div>
      </div>

      <article className="mt-6 space-y-5 rounded-2xl bg-slate-100 p-4 text-slate-800 print:mt-0 print:space-y-0 print:bg-white print:p-0">
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-4 text-center text-lg font-bold uppercase text-slate-950 print:mb-5 print:border-black print:text-black">
          {printTitle}
        </div>

        {shouldShowSection(selectedSection, "cover") ? (
          <PrintSection title="1. Portada del expediente" status={sectionStatuses.cover} color={sectionColor.cover}>
            <dl className="grid gap-3 md:grid-cols-2">
              <div><dt className="text-xs font-bold uppercase text-slate-500">Nombre del módulo</dt><dd>Carpeta Ciudadana de Investigación Cívica</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Folio cívico local</dt><dd className="font-mono text-sm">{folio}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Tipo de hecho</dt><dd>{report.category || "Sin capturar"}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Calidad</dt><dd>{validation.qualityLabel}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Nivel de integridad</dt><dd>{validation.integrityLevel}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Fecha de generación</dt><dd>{formatTimestamp(new Date().toISOString())}</dd></div>
            </dl>
            <p className="mt-5 rounded-xl border-l-4 border-[#F7931E] bg-[#F7931E]/10 p-4 text-sm leading-6">
              Expediente técnico ciudadano de hechos, evidencia y trazabilidad. No pertenece a una autoridad ni sustituye denuncia, peritaje o asesoría legal.
            </p>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "narrative") ? (
          <PrintSection title="2. Narrativa de hechos" status={sectionStatuses.narrative} color={sectionColor.narrative}>
            <dl className="grid gap-3 md:grid-cols-2">
              <div><dt className="text-xs font-bold uppercase text-slate-500">Fecha aproximada</dt><dd>{formatDate(report.approximateDate)}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Lugar aproximado</dt><dd>{report.location || "No indicado"}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Riesgo percibido</dt><dd>{report.riskLevel || "No indicado"}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-slate-500">Idioma original</dt><dd>{report.originalLanguage || "No indicado"}</dd></div>
            </dl>
            <h3 className="mt-5 text-sm font-bold uppercase text-slate-500">Hechos narrados</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{report.narrative || "Sin narrativa capturada."}</p>
            <h3 className="mt-5 text-sm font-bold uppercase text-slate-500">Personas o instituciones relacionadas, si aplica</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{report.relatedPeopleInstitutions || "No indicado."}</p>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "evidence") ? (
          <PrintSection title="3. Evidencias aportadas" status={sectionStatuses.evidence} color={sectionColor.evidence}>
            {evidence.length === 0 ? (
              <div className="space-y-3 text-sm leading-6">
                <p>No se agregaron evidencias locales a esta versión del expediente.</p>
                <p>Explicación: {report.evidenceAbsenceExplanation || "Pendiente de explicar."}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {evidence.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 print:bg-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#0054A6] px-3 py-1 text-xs font-bold text-white print:bg-white print:text-black print:ring-1 print:ring-black">{item.localId}</span>
                      <span className="rounded-full bg-[#39B54A]/15 px-3 py-1 text-xs font-bold text-[#1F5F24] print:bg-white print:text-black print:ring-1 print:ring-black">Registrada en este dispositivo</span>
                    </div>
                    <p className="mt-3 font-bold">{item.name}</p>
                    <p className="text-sm">{formatBytes(item.size)} · {item.type} · {formatTimestamp(item.addedAt)}</p>
                    <p className="mt-2 text-sm leading-6">Fuente/contexto: {item.sourceContext || "Contexto no indicado"}</p>
                    <p className="break-all font-mono text-xs">SHA-256: {item.sha256}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 rounded-xl border-l-4 border-[#F7931E] bg-[#F7931E]/10 p-4 text-sm leading-6">
              Los archivos no se adjuntan ni se suben. El ciudadano conserva control del expediente y de los archivos originales.
            </p>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "trace") ? (
          <PrintSection title="4. Registro de trazabilidad local" status={sectionStatuses.trace} color={sectionColor.trace}>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 print:bg-white">
                <div className="text-xs font-bold uppercase text-slate-500">Hash SHA-256 actual</div>
                <div className="mt-1 break-all font-mono text-xs font-bold">{dossierHash || "Pendiente"}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 print:bg-white">
                <div className="text-xs font-bold uppercase text-slate-500">Hash previo local</div>
                <div className="mt-1 break-all font-mono text-xs font-bold">{previousDossierHash || "Sin hash previo"}</div>
              </div>
            </div>
            <p className="mt-4 rounded-xl border-l-4 border-[#702F8A] bg-[#702F8A]/10 p-4 text-sm leading-6">
              Este registro prueba integridad local del expediente, no equivale a aval institucional ni blockchain pública.
            </p>
            <h3 className="mt-5 text-sm font-bold uppercase text-slate-500">Historial local de cambios relevantes</h3>
            <ol className="mt-2 space-y-2 text-sm leading-6">
              {trace.map((event) => (
                <li key={event.id}>{formatTimestamp(event.timestamp)} · {event.label}: {event.detail}</li>
              ))}
            </ol>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "committees") ? (
          <PrintSection title="5. Revisión preliminar de comités ciudadanos mock" status={sectionStatuses.committees} color={sectionColor.committees}>
            <p className="text-sm leading-7">
              Flujo futuro sin backend real. Su función sería revisar consistencia, detectar patrones, sugerir rutas institucionales y proteger privacidad, sin acusar ni sustituir autoridades.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {committeeReviews.map((review) => (
                <article key={review.level} className="rounded-xl border border-slate-200 bg-slate-50 p-4 print:bg-white">
                  <h3 className="font-bold text-slate-950">{review.name}</h3>
                  <p className="mt-2 text-sm leading-6">{review.description}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#0054A6]">{review.nextStep}</p>
                </article>
              ))}
            </div>
          </PrintSection>
        ) : null}

        {shouldShowSection(selectedSection, "privacy") ? (
          <PrintSection title="6. Aviso de privacidad y límites legales" status={sectionStatuses.privacy} color={sectionColor.privacy}>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7">
              <li>No se envían datos a servidor ni se usan APIs externas.</li>
              <li>No se usa geolocalización automática, micrófono ni lectura de EXIF.</li>
              <li>No se pide nombre obligatorio.</li>
              <li>El borrador se guarda en localStorage del navegador.</li>
              <li>La persona conserva control del expediente y decide si lo presenta ante autoridad competente.</li>
              <li>Este material no sustituye denuncia formal, expediente institucional, conclusión técnica ni asesoría legal.</li>
            </ul>
          </PrintSection>
        ) : null}
      </article>

      <style>{`
        @media print {
          body { background: #ffffff !important; }
          header, nav, .print\\:hidden, button, input, select, textarea { display: none !important; }
          main { background: #ffffff !important; }
          .print-section { page-break-after: always; break-after: page; min-height: 92vh; padding: 2cm 1.6cm !important; }
          .print-section:last-child { page-break-after: auto; break-after: auto; }
        }
      `}</style>
    </section>
  );
}
