import type { ReactNode } from "react";
import type { SearchCase, SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { formatDateTime, privacyLabels, priorityLabels, statusLabels } from "@/lib/madres-buscadoras/utils";

type Props = {
  selectedCase: SearchCase;
  dataset: SearchCaseDataset;
};

export function PrintableDocument({ selectedCase, dataset }: Props) {
  const events = dataset.events.filter((item) => item.caseId === selectedCase.id);
  const evidence = dataset.evidence.filter((item) => item.caseId === selectedCase.id);
  const actions = dataset.institutionalActions.filter((item) => item.caseId === selectedCase.id);
  const review = dataset.reviews.find((item) => item.caseId === selectedCase.id);
  const versions = dataset.versions.filter((item) => item.caseId === selectedCase.id);
  const document = dataset.documents.find((item) => item.caseId === selectedCase.id);
  const audit = dataset.auditEvents.find((item) => item.caseId === selectedCase.id && item.hash);

  return (
    <article id="madres-print-document" className="hidden bg-white text-black print:block">
      <div className="mx-auto max-w-4xl px-10 py-10">
        <header className="border-b-4 border-[#E4007C] pb-6">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A4E84]">Tecnocracia Participativa Mexico 2030</div>
          <h1 className="mt-2 text-3xl font-black">Documento civico de apoyo</h1>
          <p className="mt-2 text-sm leading-6">
            Expediente generado por la plataforma para organizacion documental. No sustituye denuncias, investigaciones, peritajes ni procedimientos de instituciones competentes.
          </p>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <DocField label="Folio" value={selectedCase.folio} />
          <DocField label="Version" value={document?.version ?? "Borrador local"} />
          <DocField label="Fecha de generacion" value={formatDateTime(new Date().toISOString())} />
          <DocField label="Estado" value={statusLabels[selectedCase.status]} />
          <DocField label="Prioridad" value={priorityLabels[selectedCase.priority]} />
          <DocField label="Privacidad" value={privacyLabels[selectedCase.privacyLevel]} />
        </section>

        <DocSection title="Indice de secciones">
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            <li>Datos del expediente</li>
            <li>Cronologia</li>
            <li>Evidencias</li>
            <li>Gestiones</li>
            <li>Privacidad y revisiones</li>
            <li>Historial e integridad tecnica</li>
            <li>Notas de alcance</li>
          </ol>
        </DocSection>

        <DocSection title="Datos del expediente">
          <p><strong>Persona:</strong> {selectedCase.displayName}</p>
          <p><strong>Edad:</strong> {selectedCase.age ?? "No indicada"} | <strong>Genero:</strong> {selectedCase.gender}</p>
          <p><strong>Ultimo lugar y fecha:</strong> {selectedCase.lastSeenPlace}, {selectedCase.lastSeenDate}</p>
          <p className="mt-2">{selectedCase.narrative}</p>
        </DocSection>

        <DocSection title="Cronologia">
          {events.map((event) => (
            <div key={event.id} className="mb-3 border-l-4 border-[#E4007C] pl-3">
              <p className="text-xs font-bold uppercase">{formatDateTime(event.occurredAt)} | {event.actorRole}</p>
              <p className="font-bold">{event.title}</p>
              <p>{event.description}</p>
            </div>
          ))}
          {!events.length ? <p>Sin eventos registrados.</p> : null}
        </DocSection>

        <DocSection title="Evidencias">
          {evidence.map((item) => (
            <div key={item.id} className="mb-3">
              <p className="font-bold">{item.name}</p>
              <p>{item.fileType} | {item.reviewStatus} | {privacyLabels[item.privacyLevel]}</p>
              {item.hash ? <p className="break-all font-mono text-xs">SHA-256: {item.hash}</p> : null}
              <p>{item.note}</p>
            </div>
          ))}
          {!evidence.length ? <p>Sin evidencias registradas.</p> : null}
        </DocSection>

        <DocSection title="Gestiones">
          {actions.map((item) => (
            <p key={item.id} className="mb-2">
              <strong>{item.institution}:</strong> {item.actionType}. Estado: {item.status}. Siguiente paso: {item.nextStep}
            </p>
          ))}
          {!actions.length ? <p>Sin gestiones registradas.</p> : null}
        </DocSection>

        <DocSection title="Privacidad y revisiones">
          <p>Nivel general: {privacyLabels[selectedCase.privacyLevel]}.</p>
          <p>Revision ciudadana: {review ? `${review.status}. ${review.summary}` : "Sin revision asignada"}.</p>
        </DocSection>

        <DocSection title="Historial e integridad tecnica">
          {versions.map((item) => (
            <p key={item.id} className="mb-2">
              <strong>Version {item.version}:</strong> {item.summary} ({formatDateTime(item.createdAt)}).
            </p>
          ))}
          <p className="break-all font-mono text-xs">Huella tecnica: {audit?.hash ?? document?.technicalHash ?? "Pendiente de generar en navegador"}.</p>
          <p className="mt-2 text-sm">Bitacora tecnica local con historial append-only simulado para fines de integridad demostrativa.</p>
        </DocSection>

        <DocSection title="Notas de alcance">
          <p>
            Este documento es una constancia de organizacion documental y acompanamiento civico. La plataforma no realiza identificaciones,
            calculos geneticos, peritajes, denuncias automaticas, resguardo externo ni procesamiento seguro de archivos en esta version.
          </p>
        </DocSection>

        <footer className="mt-8 border-t border-slate-300 pt-4 text-xs">
          Datos demostrativos del entorno de prueba. Impreso desde el navegador por decision de la persona usuaria.
        </footer>
      </div>
    </article>
  );
}

function DocField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-slate-300 p-3">
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-bold">{value}</div>
    </div>
  );
}

function DocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-2 border-b border-slate-300 pb-1 text-lg font-black text-[#0A4E84]">{title}</h2>
      <div className="text-sm leading-6">{children}</div>
    </section>
  );
}
