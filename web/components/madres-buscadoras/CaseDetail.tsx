import type { ReactNode } from "react";
import type { SearchCase, SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { formatBytes, formatDate, formatDateTime, privacyLabels, priorityLabels, statusLabels } from "@/lib/madres-buscadoras/utils";

type Props = {
  selectedCase: SearchCase;
  dataset: SearchCaseDataset;
  onPrint: () => void;
};

export function CaseDetail({ selectedCase, dataset, onPrint }: Props) {
  const events = dataset.events.filter((item) => item.caseId === selectedCase.id).sort((a, b) => a.occurredAt.localeCompare(b.occurredAt));
  const evidence = dataset.evidence.filter((item) => item.caseId === selectedCase.id);
  const actions = dataset.institutionalActions.filter((item) => item.caseId === selectedCase.id);
  const review = dataset.reviews.find((item) => item.caseId === selectedCase.id);
  const committee = dataset.committees.find((item) => item.id === selectedCase.committeeId);
  const documents = dataset.documents.filter((item) => item.caseId === selectedCase.id);
  const versions = dataset.versions.filter((item) => item.caseId === selectedCase.id);
  const audit = dataset.auditEvents.filter((item) => item.caseId === selectedCase.id);
  const related = selectedCase.relatedCaseIds.map((id) => dataset.cases.find((item) => item.id === id)).filter(Boolean) as SearchCase[];

  return (
    <section className="space-y-5">
      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#E4007C] px-3 py-1 text-xs font-black text-white">{selectedCase.folio}</span>
              <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">{statusLabels[selectedCase.status]}</span>
              <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-bold text-[#9A3412]">{priorityLabels[selectedCase.priority]}</span>
              <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#166534]">{privacyLabels[selectedCase.privacyLevel]}</span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-[#0A4E84]">{selectedCase.displayName}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">{selectedCase.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onPrint} className="min-h-11 rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#B00061] focus:outline-none focus:ring-2 focus:ring-[#E4007C]">Imprimir documento</button>
            <button type="button" className="min-h-11 rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#083E69] focus:outline-none focus:ring-2 focus:ring-[#E4007C]">Solicitar revision</button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Info label="Entidad" value={`${selectedCase.municipality}, ${selectedCase.state}`} />
          <Info label="Ultima fecha conocida" value={formatDate(selectedCase.lastSeenDate)} />
          <Info label="Ultimo lugar" value={selectedCase.lastSeenPlace} />
          <Info label="Colectivo" value={selectedCase.collective} />
        </div>
      </article>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <h3 className="text-xl font-black text-[#0A4E84]">Cronologia</h3>
          <div className="mt-4 space-y-3">
            {events.length ? events.map((event) => (
              <div key={event.id} className="rounded-2xl bg-[#F8FAFC] p-4">
                <div className="text-xs font-bold uppercase text-slate-500">{formatDateTime(event.occurredAt)} | {event.actorRole}</div>
                <h4 className="mt-1 font-black text-slate-900">{event.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{event.description}</p>
              </div>
            )) : <Empty copy="Este expediente aun no tiene eventos de timeline." />}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <h3 className="text-xl font-black text-[#0A4E84]">Privacidad por seccion</h3>
          <div className="mt-4 space-y-3">
            {["Datos de contacto", "Narrativa", "Evidencias", "Resumen publico"].map((label, index) => (
              <label key={label} className="flex items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                <span className="font-bold text-slate-700">{label}</span>
                <select defaultValue={index === 3 ? "public_summary" : selectedCase.privacyLevel} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  {Object.entries(privacyLabels).map(([value, optionLabel]) => <option key={value} value={value}>{optionLabel}</option>)}
                </select>
              </label>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-[#E0F2FE] p-4 text-sm leading-6 text-[#0369A1]">
            El MVP usa datos demostrativos o estado local. No transmite datos a servicios externos ni solicita ubicacion precisa.
          </p>
        </article>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Evidencias">
          {evidence.length ? evidence.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#16A34A]/10 px-3 py-1 text-xs font-bold text-[#166534]">{item.reviewStatus}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{privacyLabels[item.privacyLevel]}</span>
              </div>
              <h4 className="mt-2 break-words font-black text-slate-900">{item.name}</h4>
              <p className="mt-1 text-sm text-slate-600">{item.fileType} | {formatBytes(item.sizeBytes)} | {formatDate(item.addedAt)}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.localStatus}. {item.note}</p>
              {item.hash ? <p className="mt-2 break-all font-mono text-xs text-slate-500">SHA-256: {item.hash}</p> : null}
            </div>
          )) : <Empty copy="No hay evidencias asociadas." />}
        </Panel>

        <Panel title="Gestiones institucionales">
          {actions.length ? actions.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
              <div className="text-xs font-bold uppercase text-slate-500">{formatDate(item.requestedAt)} | {item.status}</div>
              <h4 className="mt-1 font-black text-slate-900">{item.institution}</h4>
              <p className="mt-1 text-sm text-slate-600">{item.actionType}{item.folioExternal ? ` | Folio externo: ${item.folioExternal}` : ""}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.nextStep}</p>
            </div>
          )) : <Empty copy="No hay gestiones registradas." />}
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Comite asignado">
          {committee && review ? (
            <div className="rounded-2xl bg-[#F8FAFC] p-4">
              <h4 className="font-black text-slate-900">{committee.name}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-600">{committee.specialty} | {committee.territory}</p>
              <p className="mt-2 text-sm font-bold text-[#E4007C]">Estado: {review.status}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {review.observations.map((observation) => <li key={observation}>- {observation}</li>)}
              </ul>
            </div>
          ) : <Empty copy="Sin comite ciudadano asignado." />}
        </Panel>
        <Panel title="Documentos">
          {documents.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
              <h4 className="font-black text-slate-900">{item.title}</h4>
              <p className="mt-1 text-sm text-slate-600">Version {item.version} | {formatDateTime(item.generatedAt)} | {item.status}</p>
            </div>
          ))}
          {!documents.length ? <Empty copy="No hay documentos generados." /> : null}
        </Panel>
        <Panel title="Relaciones informativas">
          {related.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
              <h4 className="font-black text-slate-900">{item.folio}</h4>
              <p className="mt-1 text-sm text-slate-600">{item.displayName} | {item.state}</p>
              <p className="mt-2 text-xs font-bold uppercase text-[#0A4E84]">Relacion informativa, no inferencia automatica</p>
            </div>
          ))}
          {!related.length ? <Empty copy="No hay relaciones informativas registradas." /> : null}
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Historial de versiones">
          {versions.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
              <div className="text-xs font-bold uppercase text-slate-500">Version {item.version} | {formatDateTime(item.createdAt)} | {item.actorRole}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
              {item.hash ? <p className="mt-2 break-all font-mono text-xs text-slate-500">{item.hash}</p> : null}
            </div>
          ))}
        </Panel>
        <Panel title="Bitacora relacionada">
          {audit.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
              <div className="text-xs font-bold uppercase text-slate-500">{formatDateTime(item.occurredAt)} | {item.actorRole}</div>
              <h4 className="mt-1 font-black text-slate-900">{item.action}</h4>
              <p className="mt-1 text-sm text-slate-600">Recurso {item.resource} | Version {item.version} | {item.status}</p>
            </div>
          ))}
          {!audit.length ? <Empty copy="Sin eventos tecnicos relacionados." /> : null}
        </Panel>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F8FAFC] p-4">
      <div className="text-xs font-bold uppercase text-slate-500">{label}</div>
      <div className="mt-1 font-black text-slate-900">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <h3 className="text-xl font-black text-[#0A4E84]">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </article>
  );
}

function Empty({ copy }: { copy: string }) {
  return <div className="rounded-2xl border-l-4 border-[#F97316] bg-[#FFF7ED] p-4 text-sm leading-6 text-[#9A3412]">{copy}</div>;
}
