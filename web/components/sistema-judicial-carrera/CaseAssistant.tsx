import { emptyCaseDraft, languageOptions, matterOptions } from "./data";
import type { CaseDraft, CaseStepId, EvidenceDraft } from "./types";

type CaseAssistantProps = {
  draft: CaseDraft;
  step: CaseStepId;
  onDraftChange: (patch: Partial<CaseDraft>) => void;
  onStepChange: (step: CaseStepId) => void;
  onSaveMockCase: () => void;
  onOpenCases: () => void;
};

const stepLabels: { id: CaseStepId; label: string }[] = [
  { id: 1, label: "Tipo" },
  { id: 2, label: "Hechos" },
  { id: 3, label: "Lengua" },
  { id: 4, label: "Personas" },
  { id: 5, label: "Fechas" },
  { id: 6, label: "Evidencia" },
  { id: 7, label: "Revisión IA" },
  { id: 8, label: "Resultado" },
];

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-black text-[#0A4E84]">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-pink-100"
      />
    </label>
  );
}

function createMockSummary(draft: CaseDraft) {
  const facts = draft.facts.trim() || "La persona usuaria aún debe completar la narración de hechos.";
  return [
    `Resumen de hechos: ${facts}`,
    `Categoría jurídica preliminar: ${draft.needsHelpChoosing ? "Sugerencia preliminar: administrativo o derechos humanos, según autoridad involucrada." : draft.matterType}`,
    `Personas involucradas: ${[draft.promoter, draft.counterpart, draft.authority, draft.community].filter(Boolean).join(", ") || "Pendiente de completar."}`,
    `Cronología: conflicto iniciado ${draft.conflictStart || "sin fecha definida"}; acciones realizadas: ${draft.actionsTaken || "pendiente de registrar"}.`,
    `Pretensión o resultado buscado: ordenar información para asesoría, escrito ciudadano o revisión de comité.`,
    `Documentos disponibles: ${draft.evidence.length ? draft.evidence.map((item) => item.name).join(", ") : "sin evidencias agregadas todavía"}.`,
    `Información faltante: datos de plazos, autoridad exacta, documentos base y revisión profesional.`,
    "Preguntas sugeridas: ¿existe plazo próximo?, ¿qué autoridad emitió el acto?, ¿qué documento prueba cada hecho?",
  ].join("\n\n");
}

function createCitizenDraft(draft: CaseDraft) {
  return [
    "BORRADOR CIUDADANO DE ESCRITO",
    "",
    `Materia preliminar: ${draft.matterType}`,
    `Persona promovente: ${draft.promoter || "Pendiente"}`,
    `Autoridad o institución relacionada: ${draft.authority || draft.institution || "Pendiente"}`,
    "",
    "Hechos organizados:",
    draft.aiSummary || createMockSummary(draft),
    "",
    "Documentos y evidencias referidas:",
    draft.evidence.length ? draft.evidence.map((item, index) => `${index + 1}. ${item.name} - ${item.description}`).join("\n") : "Pendiente de anexar.",
    "",
    "Preguntas para asesoría jurídica:",
    "1. ¿Existe un plazo legal cercano?",
    "2. ¿Cuál es la vía formal adecuada?",
    "3. ¿Qué documentos conviene reservar por privacidad?",
    "",
    "Este documento requiere revisión jurídica y presentación por los medios oficiales correspondientes.",
  ].join("\n");
}

function createTimelineDraft(draft: CaseDraft) {
  return [
    "CRONOLOGÍA CIUDADANA DEMOSTRATIVA",
    "",
    `Inicio del conflicto: ${draft.conflictStart || "Pendiente de precisar"}`,
    `Fecha límite o audiencia: ${draft.hearingOrDeadline || "No registrada"}`,
    `Acciones realizadas: ${draft.actionsTaken || "Pendiente de completar"}`,
    "",
    "Evidencias relacionadas:",
    draft.evidence.length ? draft.evidence.map((item, index) => `${index + 1}. ${item.name}`).join("\n") : "Sin evidencias agregadas.",
    "",
    "Aviso: esta cronología es un apoyo ciudadano y debe revisarse antes de compartirse.",
  ].join("\n");
}

function createCommitteeSheet(draft: CaseDraft) {
  return [
    "FICHA PARA SOLICITAR REVISIÓN DE COMITÉ EXPERTO CIUDADANO",
    "",
    `Materia preliminar: ${draft.matterType}`,
    `Idioma o lengua: ${draft.languageMode}${draft.languageMode.includes("lengua") ? ` (${draft.indigenousLanguage})` : ""}`,
    `Participantes referidos: ${[draft.promoter, draft.counterpart, draft.authority, draft.institution, draft.community].filter(Boolean).join(", ") || "Pendiente"}`,
    "",
    "Resumen editable:",
    draft.aiSummary || createMockSummary(draft),
    "",
    "Información faltante para revisión:",
    "- Confirmar plazos.",
    "- Revisar documentos originales.",
    "- Eliminar datos sensibles innecesarios antes de compartir.",
    "",
    "Comprobante local del expediente: generado en modo demostrativo. No se envió a servidores ni a autoridades.",
  ].join("\n");
}

export function CaseAssistant({ draft, step, onDraftChange, onStepChange, onSaveMockCase, onOpenCases }: CaseAssistantProps) {
  function addEvidence(type: EvidenceDraft["type"]) {
    const next: EvidenceDraft = {
      id: `ev-${Date.now()}`,
      type,
      name: `${type} demostrativo ${draft.evidence.length + 1}`,
      description: "Registro local de ejemplo. No se carga a servidores ni constituye cadena de custodia oficial.",
    };
    onDraftChange({ evidence: [...draft.evidence, next] });
  }

  function removeEvidence(id: string) {
    onDraftChange({ evidence: draft.evidence.filter((item) => item.id !== id) });
  }

  function goNext() {
    onStepChange(Math.min(8, step + 1) as CaseStepId);
  }

  function goBack() {
    onStepChange(Math.max(1, step - 1) as CaseStepId);
  }

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] to-[#0EA5E9]" />
        <div className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr] lg:p-7">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Asistente Ciudadano de Casos</div>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#0A4E84]">Organiza tu conflicto paso a paso</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Captura hechos, participantes, fechas y evidencias para preparar un expediente ciudadano, un borrador de escrito y preguntas para asesoría jurídica.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onStepChange(1)}
                className="rounded-2xl bg-[#E4007C] px-5 py-3 text-base font-black text-white shadow-sm transition hover:bg-[#C2187A] focus:outline-none focus:ring-2 focus:ring-[#E4007C]"
              >
                Iniciar mi caso
              </button>
              <button
                type="button"
                onClick={onOpenCases}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-base font-black text-[#0A4E84] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E4007C]"
              >
                Mis casos
              </button>
            </div>
          </div>
          <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Advertencia:</strong> Esta herramienta organiza información y genera borradores y análisis ciudadanos. No presenta demandas automáticamente, no sustituye asesoría jurídica ni reemplaza a los tribunales o autoridades competentes.
            <p className="mt-3 font-semibold text-slate-700">Tus datos permanecen bajo tu control. Nada se publica ni se envía automáticamente. Revisa y confirma antes de compartir información.</p>
          </aside>
        </div>
      </div>

      <div className="rounded-[24px] bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Pasos del asistente">
          {stepLabels.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onStepChange(item.id)}
              className={`min-w-28 rounded-2xl px-3 py-2 text-sm font-black focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                step === item.id ? "bg-[#0A4E84] text-white" : "bg-slate-50 text-slate-600"
              }`}
            >
              {item.id}. {item.label}
            </button>
          ))}
        </div>
      </div>

      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        {step === 1 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 1 — Tipo de asunto</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {matterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onDraftChange({ matterType: option, needsHelpChoosing: option.startsWith("No sé") })}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                    draft.matterType === option ? "border-[#0A4E84] bg-[#E0F2FE] text-[#0A4E84]" : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => onDraftChange({ needsHelpChoosing: true, matterType: "No sé qué tipo de asunto es" })} className="rounded-2xl border border-[#E4007C] px-4 py-3 text-sm font-black text-[#E4007C]">
              No sé cuál elegir; ayúdame a identificarlo
            </button>
            {draft.needsHelpChoosing ? <p className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-900">Sugerencia preliminar. Requiere revisión profesional.</p> : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 2 — Cuéntanos qué ocurrió</h3>
            <label htmlFor="case-facts" className="block">
              <span className="text-sm font-black text-[#0A4E84]">Describe los hechos con tus palabras</span>
              <textarea id="case-facts" value={draft.facts} onChange={(event) => onDraftChange({ facts: event.target.value })} rows={7} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#E4007C]" />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <button type="button" onClick={() => onDraftChange({ voiceNoteStatus: "simulada" })} className="rounded-2xl bg-[#0A4E84] px-4 py-3 text-sm font-black text-white">Simular nota de voz voluntaria</button>
              <button type="button" onClick={() => addEvidence("Documento")} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#0A4E84]">Agregar archivo demostrativo</button>
            </div>
            <p className="text-sm leading-6 text-slate-600">No se activa el micrófono automáticamente. La nota de voz es una simulación accesible; no hay transcripción real en esta versión.</p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 3 — Idioma o lengua</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {["Español", "Lengua indígena", "Español y lengua indígena"].map((option) => (
                <button key={option} type="button" onClick={() => onDraftChange({ languageMode: option })} className={`rounded-2xl px-4 py-3 text-sm font-black ${draft.languageMode === option ? "bg-[#0A4E84] text-white" : "bg-slate-50 text-slate-700"}`}>{option}</button>
              ))}
            </div>
            <label htmlFor="indigenous-language" className="block">
              <span className="text-sm font-black text-[#0A4E84]">Lengua representativa</span>
              <select id="indigenous-language" value={draft.indigenousLanguage} onChange={(event) => onDraftChange({ indigenousLanguage: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                {languageOptions.map((language) => <option key={language}>{language}</option>)}
              </select>
            </label>
            <p className="rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-sky-900">Puedes expresarte en español o en tu lengua. La traducción automática, cuando esté disponible, deberá ser revisada por la persona usuaria o por una persona intérprete.</p>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 4 — Personas y autoridades relacionadas</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="promoter" label="Persona promovente" value={draft.promoter} onChange={(value) => onDraftChange({ promoter: value })} />
              <Field id="counterpart" label="Contraparte" value={draft.counterpart} onChange={(value) => onDraftChange({ counterpart: value })} />
              <Field id="authority" label="Autoridad relacionada" value={draft.authority} onChange={(value) => onDraftChange({ authority: value })} />
              <Field id="institution" label="Juzgado o institución, si se conoce" value={draft.institution} onChange={(value) => onDraftChange({ institution: value })} />
              <Field id="community" label="Comunidad o colectivo" value={draft.community} onChange={(value) => onDraftChange({ community: value })} />
            </div>
            <p className="text-sm leading-6 text-slate-600">No solicitamos CURP, identificación oficial, domicilio completo ni datos sensibles innecesarios.</p>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 5 — Fechas y situación actual</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="conflict-start" label="¿Cuándo comenzó el conflicto?" value={draft.conflictStart} onChange={(value) => onDraftChange({ conflictStart: value })} placeholder="Ej. febrero de 2026" />
              <Field id="deadline" label="Audiencia o fecha límite" value={draft.hearingOrDeadline} onChange={(value) => onDraftChange({ hearingOrDeadline: value })} placeholder="Ej. esta semana, 30/07/2026" />
              <Field id="existing-file" label="¿Ya existe expediente?" value={draft.hasExistingFile} onChange={(value) => onDraftChange({ hasExistingFile: value })} />
            </div>
            <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
              <input type="checkbox" checked={draft.urgentRisk} onChange={(event) => onDraftChange({ urgentRisk: event.target.checked })} className="mt-1 h-5 w-5" />
              Existe riesgo urgente o una fecha cercana.
            </label>
            <label htmlFor="actions-taken" className="block">
              <span className="text-sm font-black text-[#0A4E84]">Acciones realizadas</span>
              <textarea id="actions-taken" value={draft.actionsTaken} onChange={(event) => onDraftChange({ actionsTaken: event.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
            </label>
            {(draft.urgentRisk || draft.hearingOrDeadline.trim()) ? <p className="rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-800">Podría existir un plazo legal. Considera obtener asesoría profesional inmediata.</p> : null}
          </div>
        ) : null}

        {step === 6 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 6 — Evidencias y documentos</h3>
            <p className="text-sm leading-6 text-slate-600">Los archivos son demostrativos y no se cargan a servidores. Puedes retirarlos antes de confirmar. Esto no constituye cadena de custodia oficial.</p>
            <div className="flex flex-wrap gap-2">
              {(["PDF", "Imagen", "Documento", "Audio", "Descripción manual"] as EvidenceDraft["type"][]).map((type) => (
                <button key={type} type="button" onClick={() => addEvidence(type)} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-[#0A4E84]">{type}</button>
              ))}
            </div>
            <div className="space-y-2">
              {draft.evidence.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3">
                  <div><strong>{item.name}</strong><p className="text-sm text-slate-600">{item.description}</p></div>
                  <button type="button" onClick={() => removeEvidence(item.id)} className="rounded-full bg-rose-50 px-3 py-1 text-sm font-black text-rose-700">Retirar</button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {step === 7 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 7 — Revisión asistida por IA</h3>
            <p className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-900">Análisis preliminar generado como apoyo. Revisa y corrige la información antes de continuar.</p>
            <button type="button" onClick={() => onDraftChange({ aiSummary: createMockSummary(draft) })} className="rounded-2xl bg-[#0A4E84] px-4 py-3 text-sm font-black text-white">Organizar información con IA mock</button>
            <textarea aria-label="Resumen editable generado por IA mock" value={draft.aiSummary} onChange={(event) => onDraftChange({ aiSummary: event.target.value })} rows={10} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
          </div>
        ) : null}

        {step === 8 ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#0A4E84]">Paso 8 — Resultado ciudadano</h3>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onDraftChange({ generatedResult: createMockSummary(draft) })} className="rounded-2xl border border-[#0A4E84] px-4 py-3 text-sm font-black text-[#0A4E84]">Generar resumen del caso</button>
              <button type="button" onClick={() => onDraftChange({ generatedResult: createTimelineDraft(draft) })} className="rounded-2xl border border-[#0A4E84] px-4 py-3 text-sm font-black text-[#0A4E84]">Generar cronología</button>
              <button type="button" onClick={() => onDraftChange({ generatedResult: createCommitteeSheet(draft) })} className="rounded-2xl border border-[#0A4E84] px-4 py-3 text-sm font-black text-[#0A4E84]">Ficha para comité experto</button>
              <button type="button" onClick={() => onDraftChange({ generatedResult: createCitizenDraft(draft) })} className="rounded-2xl bg-[#E4007C] px-4 py-3 text-sm font-black text-white">Generar borrador ciudadano de escrito</button>
              <button type="button" onClick={onSaveMockCase} className="rounded-2xl border border-[#0A4E84] px-4 py-3 text-sm font-black text-[#0A4E84]">Guardar caso mock</button>
              <button type="button" onClick={() => onDraftChange({ ...emptyCaseDraft })} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">Limpiar borrador</button>
            </div>
            <pre className="min-h-48 whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-white">{draft.generatedResult || "Genera un resumen, cronología, lista de evidencias, borrador ciudadano de escrito, preguntas para asesoría jurídica, ficha para comité y comprobante local del expediente."}</pre>
            <p className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-900">Este documento requiere revisión jurídica y presentación por los medios oficiales correspondientes.</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={goBack} disabled={step === 1} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 disabled:opacity-40">Regresar</button>
          <button type="button" onClick={goNext} disabled={step === 8} className="rounded-2xl bg-[#0A4E84] px-4 py-3 text-sm font-black text-white disabled:opacity-40">Continuar</button>
        </div>
      </article>
    </section>
  );
}
