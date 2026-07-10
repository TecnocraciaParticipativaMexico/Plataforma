import { useEffect, useMemo, useRef, useState } from "react";
import type { EvidenceItem, SearchCase } from "@/lib/madres-buscadoras/types";
import { clearDraft, createCaseFromDraft, emptyDraft, filesToEvidence, readDraft, saveDraft, type NewCaseDraft } from "@/lib/madres-buscadoras/localService";
import { extractMentionedDates, privacyLabels, summarizeLocally, suggestTags } from "@/lib/madres-buscadoras/utils";

type Props = {
  caseCount: number;
  onCreated: (newCase: SearchCase, evidence: EvidenceItem[]) => void;
};

const steps = [
  "Consentimiento",
  "Persona",
  "Circunstancias",
  "Narrativa",
  "Indicios",
  "Gestiones",
  "Visibilidad",
  "Revision",
];

export function NewCaseWizard({ caseCount, onCreated }: Props) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<NewCaseDraft>(emptyDraft);
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const draftReadyRef = useRef(false);
  const skipNextSaveRef = useRef(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const saved = readDraft();
      draftReadyRef.current = true;
      if (saved) {
        setDraft(saved);
        setMessage("Borrador local restaurado desde este navegador.");
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!draftReadyRef.current) return;
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    saveDraft(draft);
  }, [draft]);

  const missing = useMemo(() => validateStep(step, draft), [draft, step]);
  const localSummary = summarizeLocally(`${draft.narrative} ${draft.testimony}`);
  const mentionedDates = extractMentionedDates(`${draft.narrative} ${draft.testimony} ${draft.actionsTaken}`);
  const suggestedTags = suggestTags({
    narrative: `${draft.narrative} ${draft.testimony} ${draft.indications}`,
    state: draft.state,
    municipality: draft.municipality,
    lastSeenPlace: draft.lastSeenPlace,
  });

  function update(patch: Partial<NewCaseDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function next() {
    if (missing.length) {
      setMessage(`Completa: ${missing.join(", ")}.`);
      return;
    }
    setMessage("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function create() {
    const allMissing = steps.flatMap((_, index) => validateStep(index, draft));
    if (allMissing.length) {
      setMessage(`Faltan datos minimos: ${Array.from(new Set(allMissing)).join(", ")}.`);
      return;
    }
    setCreating(true);
    try {
      const newCase = await createCaseFromDraft(draft, caseCount);
      const evidence = await filesToEvidence(files, newCase.id, draft.privacyLevel);
      clearDraft();
      skipNextSaveRef.current = true;
      setDraft(emptyDraft);
      setFiles(null);
      setMessage(`Expediente ${newCase.folio} creado en estado local.`);
      onCreated(newCase, evidence);
    } finally {
      setCreating(false);
    }
  }

  return (
    <section className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Nuevo registro</p>
          <h2 className="mt-1 text-2xl font-black text-[#0A4E84]">Flujo por pasos</h2>
        </div>
        <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#166534]">Guardado local demostrativo</span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs font-bold uppercase text-slate-500">
          <span>Paso {step + 1} de {steps.length}</span>
          <span>{steps[step]}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-[#E4007C]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
        {step === 0 ? (
          <div className="space-y-4">
            <Banner tone="info" text="Este MVP no transmite datos a servicios externos, no activa camara, microfono, GPS ni permisos. Usa datos locales o demostrativos." />
            <label className="flex items-start gap-3 rounded-2xl bg-white p-4">
              <input type="checkbox" checked={draft.consentAccepted} onChange={(event) => update({ consentAccepted: event.target.checked })} className="mt-1 h-5 w-5 accent-[#E4007C]" />
              <span className="text-sm leading-6 text-slate-700">Acepto capturar informacion sensible bajo mi responsabilidad y entiendo que este registro no sustituye procedimientos ante instituciones competentes.</span>
            </label>
            <Select label="Privacidad inicial" value={draft.privacyLevel} onChange={(value) => update({ privacyLevel: value as NewCaseDraft["privacyLevel"] })} options={Object.entries(privacyLabels)} />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-start gap-3 rounded-2xl bg-white p-4 md:col-span-2">
              <input type="checkbox" checked={draft.protectedName} onChange={(event) => update({ protectedName: event.target.checked })} className="mt-1 h-5 w-5 accent-[#E4007C]" />
              <span className="text-sm leading-6 text-slate-700">Usar nombre protegido en listados y documento demostrativo.</span>
            </label>
            <Input label="Nombre de la persona" value={draft.personName} onChange={(value) => update({ personName: value })} />
            <Input label="Edad" value={draft.age} onChange={(value) => update({ age: value.replace(/\D/g, "").slice(0, 3) })} />
            <Input label="Genero o descripcion" value={draft.gender} onChange={(value) => update({ gender: value })} />
            <Input label="Colectivo o acompanamiento" value={draft.collective} onChange={(value) => update({ collective: value })} />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Entidad federativa" value={draft.state} onChange={(value) => update({ state: value })} />
            <Input label="Municipio" value={draft.municipality} onChange={(value) => update({ municipality: value })} />
            <Input label="Fecha de ultima referencia" value={draft.lastSeenDate} onChange={(value) => update({ lastSeenDate: value })} type="date" />
            <Input label="Lugar aproximado" value={draft.lastSeenPlace} onChange={(value) => update({ lastSeenPlace: value })} />
            <Banner tone="warning" text="Registra lugares aproximados. No se solicita ubicacion precisa ni coordenadas en esta version." />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <Textarea label="Narrativa de hechos" value={draft.narrative} onChange={(value) => update({ narrative: value })} />
            <Textarea label="Testimonio o notas familiares" value={draft.testimony} onChange={(value) => update({ testimony: value })} />
            <Banner tone="info" text="Asistente local demostrativo. Revisa siempre sus sugerencias." />
            <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
              <strong>Resumen sugerido:</strong> {localSummary}
              <br />
              <strong>Fechas mencionadas:</strong> {mentionedDates.length ? mentionedDates.join(", ") : "sin fechas detectadas por reglas locales"}
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4">
            <Textarea label="Indicios, objetos, mensajes o contexto" value={draft.indications} onChange={(value) => update({ indications: value })} />
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Archivos locales demostrativos</span>
              <input type="file" multiple onChange={(event) => setFiles(event.target.files)} className="mt-1 block w-full rounded-2xl border border-dashed border-[#E4007C] bg-white p-4 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#E4007C] file:px-4 file:py-2 file:font-bold file:text-white" />
            </label>
            <Banner tone="warning" text="Archivo seleccionado localmente. No se afirma cifrado, resguardo ni eliminacion de metadatos. La sanitizacion real requerira el servicio de procesamiento." />
          </div>
        ) : null}

        {step === 5 ? (
          <Textarea label="Gestiones realizadas y pendientes" value={draft.actionsTaken} onChange={(value) => update({ actionsTaken: value })} />
        ) : null}

        {step === 6 ? (
          <div className="space-y-4">
            <Select label="Nivel de visibilidad general" value={draft.privacyLevel} onChange={(value) => update({ privacyLevel: value as NewCaseDraft["privacyLevel"] })} options={Object.entries(privacyLabels)} />
            <Banner tone="privacy" text="Puedes mantener datos sensibles en privado familiar y compartir solo resumen publico. Este MVP no transmite datos a servicios externos." />
          </div>
        ) : null}

        {step === 7 ? (
          <div className="space-y-4 text-sm leading-6 text-slate-700">
            <Banner tone="success" text="Revision local lista para generar expediente en el estado React de esta sesion." />
            <p><strong>Nombre visible:</strong> {draft.protectedName ? "Persona con nombre protegido" : draft.personName}</p>
            <p><strong>Territorio:</strong> {draft.municipality}, {draft.state}</p>
            <p><strong>Privacidad:</strong> {privacyLabels[draft.privacyLevel]}</p>
            <p><strong>Etiquetas sugeridas:</strong> {suggestedTags.length ? suggestedTags.join(", ") : "sin etiquetas sugeridas"}</p>
            <p><strong>Archivos seleccionados:</strong> {files?.length ?? 0}</p>
          </div>
        ) : null}
      </div>

      {message ? <div className="mt-4 rounded-2xl border-l-4 border-[#F97316] bg-[#FFF7ED] p-4 text-sm font-semibold text-[#9A3412]">{message}</div> : null}

      <div className="mt-5 flex flex-wrap justify-between gap-3">
        <button type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0} className="min-h-11 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50">Regresar</button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="min-h-11 rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white">Continuar</button>
        ) : (
          <button type="button" onClick={() => void create()} disabled={creating} className="min-h-11 rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {creating ? "Generando..." : "Generar expediente local"}
          </button>
        )}
      </div>
    </section>
  );
}

function validateStep(step: number, draft: NewCaseDraft): string[] {
  if (step === 0) return draft.consentAccepted ? [] : ["consentimiento"];
  if (step === 1) return draft.protectedName || draft.personName.trim().length >= 3 ? [] : ["nombre o nombre protegido"];
  if (step === 2) {
    return [
      draft.state.trim() ? "" : "entidad",
      draft.municipality.trim() ? "" : "municipio",
      draft.lastSeenDate ? "" : "fecha",
      draft.lastSeenPlace.trim() ? "" : "lugar aproximado",
    ].filter(Boolean);
  }
  if (step === 3) return draft.narrative.trim().length >= 40 ? [] : ["narrativa minima"];
  return [];
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/20" />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/20" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/20">
        {options.map(([optionValue, labelText]) => <option key={optionValue} value={optionValue}>{labelText}</option>)}
      </select>
    </label>
  );
}

function Banner({ tone, text }: { tone: "info" | "warning" | "success" | "privacy"; text: string }) {
  const classes = {
    info: "border-[#0EA5E9] bg-[#E0F2FE] text-[#0369A1]",
    warning: "border-[#F97316] bg-[#FFF7ED] text-[#9A3412]",
    success: "border-[#16A34A] bg-[#DCFCE7] text-[#166534]",
    privacy: "border-[#8B5CF6] bg-[#F3E8FF] text-[#6D28D9]",
  };
  return <div className={`rounded-2xl border-l-4 p-4 text-sm leading-6 ${classes[tone]}`}>{text}</div>;
}
