import type { CitizenCase } from "./types";

type CasesWorkspaceProps = {
  cases: CitizenCase[];
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
  onRequestReview: () => void;
};

const statusLabels: Record<CitizenCase["status"], string> = {
  borrador: "Borrador",
  informacion_pendiente: "Información pendiente",
  listo_revision: "Listo para revisión",
  comite_ciudadano: "Enviado a comité ciudadano",
  dictamen_disponible: "Dictamen disponible",
  seguimiento: "Seguimiento",
  cerrado: "Cerrado por la persona usuaria",
};

const timelineDescriptions: Record<string, string> = {
  "Caso creado": "Se abrió un expediente ciudadano local con datos demostrativos.",
  "Hechos organizados": "La información fue ordenada para lectura y revisión humana.",
  "Documento agregado": "Se registró una evidencia de ejemplo sin carga remota.",
  "Borrador generado": "Se preparó un borrador ciudadano no oficial.",
  "Solicitud de revisión ciudadana": "Se pidió opinión técnica ciudadana no vinculante.",
  "Dictamen ciudadano recibido": "Se agregó una opinión demostrativa al expediente.",
};

export function CasesWorkspace({ cases, selectedCaseId, onSelectCase, onRequestReview }: CasesWorkspaceProps) {
  const selectedCase = cases.find((item) => item.id === selectedCaseId) ?? cases[0];

  return (
    <section className="grid gap-5 lg:grid-cols-[0.95fr_1.35fr]">
      <div className="space-y-4">
        <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Mis casos</p>
          <h2 className="mt-2 text-2xl font-black text-[#0A4E84]">Expedientes ciudadanos demostrativos</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Consulta borradores, próximas acciones y seguimientos locales. Ningún estado implica recepción, admisión o actuación de una autoridad oficial.
          </p>
        </div>

        <div className="space-y-3">
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCase(item.id)}
              className={`w-full rounded-[22px] border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                selectedCase.id === item.id ? "border-[#0A4E84] bg-sky-50" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black uppercase text-slate-500">{item.folio}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#0A4E84]">{statusLabels[item.status]}</span>
              </div>
              <h3 className="mt-2 text-base font-black text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.matter}</p>
              <p className="mt-3 text-sm font-semibold text-[#0A4E84]">{item.nextAction}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                <span>Creado: {item.createdAt}</span>
                <span>Actualizado: {item.updatedAt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">{selectedCase.folio}</p>
            <h2 className="mt-2 text-2xl font-black text-[#0A4E84]">{selectedCase.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{selectedCase.summary}</p>
          </div>
          <button
            type="button"
            onClick={onRequestReview}
            className="rounded-2xl bg-[#E4007C] px-4 py-3 text-sm font-black text-white transition hover:bg-[#C2187A] focus:outline-none focus:ring-2 focus:ring-[#E4007C]"
          >
            Solicitar revisión ciudadana
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Panel title="Participantes" items={selectedCase.participants} />
          <Panel title="Documentos" items={selectedCase.documents} />
          <Panel title="Notas" items={selectedCase.notes} />
          <Panel title="Historial de versiones" items={selectedCase.versions} />
        </div>

        <div className="mt-6 rounded-[22px] bg-slate-50 p-4">
          <h3 className="text-lg font-black text-[#0A4E84]">Línea de tiempo</h3>
          <ol className="mt-4 space-y-3">
            {selectedCase.timeline.map((event, index) => (
              <li key={`${event}-${index}`} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A4E84] text-sm font-black text-white">{index + 1}</span>
                <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                  <p className="font-black text-slate-900">{event}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{timelineDescriptions[event] ?? "Actividad ciudadana registrada en el expediente mock."}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Dictámenes ciudadanos:</strong> {selectedCase.opinions.join(" ")} Las opiniones son informativas, documentadas y no vinculantes.
        </div>
      </article>
    </section>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[22px] border border-slate-200 p-4">
      <h3 className="text-base font-black text-[#0A4E84]">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {(items.length ? items : ["Sin registro demostrativo todavía."]).map((item) => (
          <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
