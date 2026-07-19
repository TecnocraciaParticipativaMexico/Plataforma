"use client";

import { useMemo, useState } from "react";
import { HEALTH_LIMITATION_NOTICE, languageLabels, URGENT_NOTICE } from "@/lib/salud-publica/constants";
import { localHealthGuidanceProvider } from "@/lib/salud-publica/providers/localGuidanceProvider";
import type { GuidanceResult, HealthCase, HealthLanguage } from "@/lib/salud-publica/types";
import { UiState } from "./UiState";

const steps = ["Motivo", "Síntomas", "Duración", "Señales", "Antecedentes", "Medicamentos", "Accesibilidad", "Revisión", "Resultado"];

type Draft = {
  reason: string;
  symptoms: string;
  duration: string;
  alarmSignals: string;
  history: string;
  medications: string;
  language: HealthLanguage;
  accessibility: string;
};

const initialDraft: Draft = {
  reason: "",
  symptoms: "",
  duration: "",
  alarmSignals: "",
  history: "",
  medications: "",
  language: "es",
  accessibility: "Lectura clara",
};

export function NewGuidanceWizard({ onResult }: { onResult: (result: GuidanceResult) => void }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [saved, setSaved] = useState(false);
  const [result, setResult] = useState<GuidanceResult | null>(null);
  const progress = Math.round(((step + 1) / steps.length) * 100);

  function update(field: keyof Draft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function finish() {
    const generated = localHealthGuidanceProvider.generate({
      text: [draft.reason, draft.symptoms, draft.duration, draft.alarmSignals, draft.history, draft.medications].join(" "),
    });
    setResult(generated);
    onResult(generated);
    setStep(8);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-[#E4007C]">Wizard accesible</p>
          <h2 className="text-2xl font-black text-[#0A4E84]">Nueva orientación informativa</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">No solicita ubicación, cámara, micrófono ni datos personales automáticamente.</p>
        </div>
        <button type="button" onClick={() => { setDraft(initialDraft); setStep(0); setResult(null); }} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black uppercase text-slate-600">Reiniciar</button>
      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#E4007C]" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 flex gap-1 overflow-x-auto text-[11px] font-bold uppercase text-slate-500">
        {steps.map((item, index) => <span key={item} className={`rounded-full px-2 py-1 ${index === step ? "bg-[#E4007C] text-white" : "bg-slate-100"}`}>{item}</span>)}
      </div>

      <div className="mt-5">
        {step <= 6 ? (
          <WizardField step={step} draft={draft} update={update} />
        ) : step === 7 ? (
          <section className="space-y-3 text-sm leading-6 text-slate-700">
            <UiState kind="datos_incompletos" title="Revisión sin campos obligatorios innecesarios">Puedes finalizar con información parcial o guardar borrador local simulado.</UiState>
            {Object.entries(draft).map(([key, value]) => <p key={key} className="rounded-xl bg-slate-50 p-3"><strong>{key}:</strong> {value || "Sin capturar"}</p>)}
          </section>
        ) : (
          <GuidanceResultPanel result={result} />
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="min-h-11 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40">Regresar</button>
        <button type="button" onClick={() => { setSaved(true); window.localStorage?.setItem("salud-publica-borrador", JSON.stringify(draft)); }} className="min-h-11 rounded-xl border border-[#0EA5E9] px-4 py-2 text-sm font-bold text-[#0A4E84]">Guardar borrador local</button>
        {step < 7 ? <button type="button" onClick={() => setStep((current) => current + 1)} className="min-h-11 rounded-xl bg-[#E4007C] px-4 py-2 text-sm font-black text-white">Continuar</button> : null}
        {step === 7 ? <button type="button" onClick={finish} className="min-h-11 rounded-xl bg-[#E4007C] px-4 py-2 text-sm font-black text-white">Finalizar orientación</button> : null}
        <button type="button" onClick={() => setStep(0)} className="min-h-11 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">Cancelar</button>
      </div>
      {saved ? <p className="mt-3 text-xs font-bold text-[#166534]">Borrador guardado localmente en este navegador.</p> : null}
    </section>
  );
}

function WizardField({ step, draft, update }: { step: number; draft: Draft; update: (field: keyof Draft, value: string) => void }) {
  const fields: Array<{ key: keyof Draft; label: string; placeholder: string }> = [
    { key: "reason", label: "Motivo de orientación", placeholder: "Ej. fiebre alta desde ayer, quiero preparar consulta" },
    { key: "symptoms", label: "Síntomas declarados", placeholder: "Lista síntomas con tus palabras" },
    { key: "duration", label: "Duración y evolución", placeholder: "Cuándo inició, si mejora, empeora o cambia" },
    { key: "alarmSignals", label: "Señales de alarma", placeholder: "Dolor de pecho, falta de aire, confusión, etc. si aplica" },
    { key: "history", label: "Antecedentes relevantes", placeholder: "Antecedentes declarados, condiciones previas o ningún dato" },
    { key: "medications", label: "Medicamentos y alergias declaradas", placeholder: "No indiques dosis si no estás seguro; prepara información para consulta" },
    { key: "accessibility", label: "Contexto de accesibilidad", placeholder: "Texto grande, lectura simplificada, idioma, apoyo de familiar" },
  ];
  const field = fields[step];

  if (step === 6) {
    return (
      <div className="grid gap-3 md:grid-cols-[1fr_260px]">
        <textarea value={draft.accessibility} onChange={(event) => update("accessibility", event.target.value)} rows={6} placeholder={field.placeholder} className="rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-[#E4007C]" />
        <select value={draft.language} onChange={(event) => update("language", event.target.value)} className="h-12 rounded-xl border border-slate-200 px-3 text-sm">
          {(Object.keys(languageLabels) as HealthLanguage[]).map((language) => <option key={language} value={language}>{languageLabels[language]}</option>)}
        </select>
      </div>
    );
  }

  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-wide text-[#0A4E84]">{field.label}</span>
      <textarea value={draft[field.key]} onChange={(event) => update(field.key, event.target.value)} rows={7} placeholder={field.placeholder} className="mt-2 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-[#E4007C]" />
    </label>
  );
}

function GuidanceResultPanel({ result }: { result: GuidanceResult | null }) {
  if (!result) return <UiState kind="documento_no_generado" title="Resultado pendiente">Finaliza la revisión para generar orientación local.</UiState>;
  return (
    <section className="space-y-3">
      {result.level === "posible_emergencia" ? <UiState kind="advertencia" title="Posible emergencia">{URGENT_NOTICE}<br /><button type="button" className="mt-2 rounded-xl bg-white px-3 py-2 text-xs font-black uppercase text-[#E4007C]">Cerrar advertencia y continuar</button></UiState> : null}
      <div className="rounded-2xl border border-[#0EA5E9]/30 bg-[#E0F2FE] p-4 text-sm leading-6 text-[#0A4E84]">
        <h3 className="text-lg font-black">{result.title}</h3>
        <p>{result.summary}</p>
        <p className="mt-2 text-xs font-semibold">{result.explanation}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {result.actions.map((action) => (
          <article key={action.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-black uppercase text-[#E4007C]">{action.priority}</p>
            <h4 className="font-black text-[#0A4E84]">{action.title}</h4>
            <p className="text-sm leading-6 text-slate-600">{action.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

type Message = { id: string; sender: "ciudadano" | "asistente"; text: string };

export function ConversationalGuidance({ selectedCase, onNote }: { selectedCase: HealthCase; onNote: (note: string) => void }) {
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", sender: "asistente", text: `Contexto local cargado para ${selectedCase.folio}. ${HEALTH_LIMITATION_NOTICE}` },
  ]);
  const suggestions = useMemo(() => ["Qué información llevo a consulta?", "Cómo reconozco señales de alarma?", "Genera resumen del expediente"], []);

  function send(text: string) {
    if (!text.trim()) return;
    setProcessing(true);
    const result = localHealthGuidanceProvider.generate({ caseId: selectedCase.id, text: `${selectedCase.reason} ${text}` });
    const reply = `${result.title}: ${result.summary} Acción sugerida: ${result.actions[0]?.title ?? "organizar información"}.`;
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: `u-${Date.now()}`, sender: "ciudadano", text }, { id: `a-${Date.now()}`, sender: "asistente", text: reply }]);
      setInput("");
      setProcessing(false);
    }, 350);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <h2 className="text-xl font-black text-[#0A4E84]">Centro de orientación conversacional</h2>
          <p className="text-sm leading-6 text-slate-600">Conversación mock local. No consulta guías oficiales en tiempo real y no guarda información sensible fuera del estado local.</p>
        </div>
        <div className="max-h-[520px] space-y-3 overflow-y-auto bg-[#F8FAFC] p-4">
          {messages.map((message) => (
            <div key={message.id} className={`max-w-[86%] rounded-2xl p-3 text-sm leading-6 ${message.sender === "asistente" ? "bg-white text-slate-700 shadow-sm" : "ml-auto bg-[#0A4E84] text-white"}`}>
              {message.text}
            </div>
          ))}
          {processing ? <div className="rounded-2xl bg-white p-3 text-sm font-bold text-slate-500 shadow-sm">Procesando localmente...</div> : null}
        </div>
        <div className="space-y-3 border-t border-slate-100 p-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((item) => <button key={item} type="button" onClick={() => send(item)} className="rounded-full bg-[#E0F2FE] px-3 py-2 text-xs font-bold text-[#0A4E84]">{item}</button>)}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escribe una pregunta informativa" className="min-h-11 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#E4007C]" />
            <button type="button" onClick={() => send(input)} className="rounded-xl bg-[#E4007C] px-4 py-2 text-sm font-black text-white">Enviar</button>
          </div>
        </div>
      </div>
      <aside className="space-y-3">
        <UiState kind="sin_conexion" title="Modo sin conexión">Todas las respuestas son locales y predefinidas por reglas.</UiState>
        <button type="button" onClick={() => onNote(messages.map((item) => `${item.sender}: ${item.text}`).join("\n"))} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left text-sm font-bold text-slate-700">Convertir conversación en nota</button>
        <button type="button" onClick={() => onNote(`Resumen local de ${selectedCase.folio}: ${selectedCase.reason}`)} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left text-sm font-bold text-slate-700">Generar resumen</button>
        <button type="button" onClick={() => setMessages([])} className="w-full rounded-xl border border-[#E4007C] bg-white p-3 text-left text-sm font-bold text-[#E4007C]">Limpiar conversación</button>
        <UiState kind="error" title="Manejo de error">Si falla el proveedor futuro, se mostrará esta ruta segura.</UiState>
      </aside>
    </section>
  );
}
