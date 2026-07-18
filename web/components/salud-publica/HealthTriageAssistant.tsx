"use client";

import { useMemo, useRef, useState } from "react";
import { localHealthGuidanceProvider } from "@/lib/salud-publica/providers/localGuidanceProvider";
import { localMedicationSafetyProvider } from "@/lib/salud-publica/providers/medicationSafetyProvider";
import type { CareOrientationLevel, CarePlace, CitizenTriageResult, HealthCase, MedicationEntry } from "@/lib/salud-publica/types";

type SpeechAlternative = { transcript: string };
type SpeechResult = { 0: SpeechAlternative };
type SpeechResults = { [index: number]: SpeechResult; length: number };
type SpeechResultEvent = Event & { results: SpeechResults };
type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;
type BrowserWithSpeech = Window & typeof globalThis & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type Props = {
  selectedCase: HealthCase;
  onSaveResult: (result: CitizenTriageResult) => void;
  onOpenDirectory: () => void;
  onPrint: () => void;
};

const quickSuggestions = [
  "Dolor",
  "Fiebre",
  "Tos o dificultad para respirar",
  "Malestar estomacal",
  "Mareo o debilidad",
  "Reacción a un medicamento",
  "Tengo una emergencia",
  "Otro síntoma",
];

const sourceLabels: Record<MedicationEntry["source"], string> = {
  prescripcion: "Prescripción declarada",
  automedicacion: "Automedicación declarada",
  suplemento: "Suplemento",
  remedio_tradicional: "Remedio tradicional",
  no_especificado: "No especificado",
};

const levelStyles: Record<CareOrientationLevel, { label: string; className: string }> = {
  autocuidado_vigilancia: { label: "Verde — Autocuidado con vigilancia", className: "border-[#22C55E] bg-[#F0FDF4] text-[#166534]" },
  consulta_general: { label: "Azul — Consulta general", className: "border-[#0EA5E9] bg-[#E0F2FE] text-[#075985]" },
  consulta_prioritaria: { label: "Amarillo — Consulta prioritaria", className: "border-[#F59E0B] bg-[#FFFBEB] text-[#92400E]" },
  urgencias: { label: "Rojo — Urgencias", className: "border-[#E4007C] bg-[#FDF2F8] text-[#9D174D]" },
};

const placeLabels: Record<CarePlace, string> = {
  autocuidado: "Autocuidado y vigilancia temporal",
  medicina_general: "Consulta de medicina general",
  consultorio_anexo_farmacia: "Consultorio médico anexo a farmacia",
  centro_salud: "Centro de salud o clínica",
  teleorientacion: "Teleorientación profesional cuando esté disponible",
  urgencias: "Hospital o servicio de urgencias",
  emergencias_911: "Servicios oficiales de emergencia: 911",
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function pickQuestion(text: string) {
  const source = normalize(text);
  if (source.includes("fiebre")) return "¿Desde cuándo comenzó la fiebre y has notado rigidez de cuello, confusión o empeoramiento rápido?";
  if (source.includes("tos") || source.includes("respirar")) return "¿La tos viene con dificultad para respirar, dolor en pecho, fiebre o labios morados?";
  if (source.includes("medicamento") || source.includes("reaccion")) return "¿Comenzaste o cambiaste algún medicamento, suplemento o remedio recientemente?";
  if (source.includes("dolor")) return "¿En qué parte del cuerpo está el dolor, qué intensidad tiene y comenzó de forma súbita?";
  return "¿Cuándo comenzó, qué tan intenso es y ha empeorado desde entonces?";
}

function mapGuidanceToCare(resultLevel: string, text: string, medicationWarnings: number): { level: CareOrientationLevel; place: CarePlace; timeframe: string } {
  const source = normalize(text);
  if (resultLevel === "posible_emergencia" || source.includes("tengo una emergencia")) {
    return { level: "urgencias", place: "emergencias_911", timeframe: "Inmediato si existe peligro actual; busca atención presencial urgente." };
  }
  if (resultLevel === "consulta_prioritaria" || medicationWarnings > 0) {
    return { level: "consulta_prioritaria", place: "centro_salud", timeframe: "El mismo día o en un plazo breve, sin garantía de disponibilidad." };
  }
  if (resultLevel === "seguimiento_recomendado" || source.includes("medicamento") || source.includes("embarazo")) {
    return { level: "consulta_general", place: "medicina_general", timeframe: "Agenda consulta general o teleorientación profesional cuando esté disponible." };
  }
  if (!source.includes("desde") && !source.includes("hace") && !source.includes("ayer") && !source.includes("hoy")) {
    return { level: "consulta_general", place: "consultorio_anexo_farmacia", timeframe: "Busca orientación profesional si falta información, persiste o tienes duda." };
  }
  return { level: "autocuidado_vigilancia", place: "autocuidado", timeframe: "Vigilancia temporal con señales claras para escalar a consulta." };
}

function createEmptyMedication(): MedicationEntry {
  return {
    id: `med-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: "",
    dose: "",
    frequency: "",
    lastTakenAt: "",
    startedAt: "",
    reason: "",
    source: "no_especificado",
  };
}

export function HealthTriageAssistant({ selectedCase, onSaveResult, onOpenDirectory, onPrint }: Props) {
  const [input, setInput] = useState("");
  const [mainConcern, setMainConcern] = useState("");
  const [details, setDetails] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState<MedicationEntry[]>([createEmptyMedication()]);
  const [result, setResult] = useState<CitizenTriageResult | null>(null);
  const [messages, setMessages] = useState([
    "¿Qué síntoma o situación de salud te preocupa hoy?",
    "Describe lo que sientes y recibirás una orientación inicial mediante reglas locales.",
  ]);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "unsupported" | "error">("idle");
  const [saved, setSaved] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const nextQuestion = useMemo(() => pickQuestion(mainConcern || input), [input, mainConcern]);
  const activeMedications = medications.filter((item) => item.name.trim());

  function updateMedication(id: string, patch: Partial<MedicationEntry>) {
    setMedications((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function startVoiceInput() {
    if (typeof window === "undefined") return;
    const browserWindow = window as BrowserWithSpeech;
    const Recognition = browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceState("unsupported");
      return;
    }
    if (voiceState === "listening") {
      recognitionRef.current?.stop();
      setVoiceState("idle");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "es-MX";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => event.results[index][0].transcript).join(" ");
      setInput((current) => [current, transcript].filter(Boolean).join(" ").trim());
    };
    recognition.onerror = () => setVoiceState("error");
    recognition.onend = () => setVoiceState("idle");
    recognitionRef.current = recognition;
    setVoiceState("listening");
    recognition.start();
  }

  function analyze() {
    const concern = input.trim() || mainConcern.trim();
    if (!concern) return;
    const combinedText = [concern, details, allergies, activeMedications.map((item) => `${item.name} ${item.startedAt ?? ""}`).join(" ")].join(" ");
    const guidance = localHealthGuidanceProvider.generate({ caseId: selectedCase.id, text: combinedText });
    const medicationSafety = localMedicationSafetyProvider.review({ symptoms: combinedText, allergies, medications: activeMedications });
    const warningCount = medicationSafety.adverseEffects.length + medicationSafety.interactionWarnings.length;
    const care = mapGuidanceToCare(guidance.level, combinedText, warningCount);
    const urgent = care.level === "urgencias";

    setMainConcern(concern);
    setMessages((current) => [
      ...current,
      `Ciudadano: ${concern}`,
      urgent
        ? "Asistente: lo que describes puede corresponder a una situación urgente. Busca atención presencial inmediata o llama al 911. Esta plataforma no ha contactado a ningún servicio externo."
        : `Asistente: se preparó una orientación inicial. Posible nivel de atención: ${levelStyles[care.level].label}.`,
    ]);
    setResult({
      id: `triage-${Date.now()}`,
      level: care.level,
      title: levelStyles[care.level].label,
      explanation:
        care.level === "autocuidado_vigilancia"
          ? "La orientación se basa únicamente en lo declarado y no garantiza que una situación sea leve. Busca consulta si hay duda, persistencia, cambios o señales de alarma."
          : "La orientación inicial sugiere valoración profesional según las reglas locales y la información declarada.",
      consideredSignals: guidance.signals.length ? guidance.signals.map((signal) => `${signal.label}: ${signal.explanation}`) : ["Sin señales de alarma detectadas por reglas locales con la información disponible."],
      suggestedPlace: care.place,
      suggestedTimeframe: care.timeframe,
      nextSteps: [
        "Prepara una lista de síntomas, duración, intensidad, antecedentes, alergias y medicamentos declarados.",
        "No cambies ni suspendas medicamentos sin indicación médica.",
        care.place === "consultorio_anexo_farmacia" ? "Por ejemplo, consultorios anexos a farmacias disponibles en tu localidad, sin favorecer una empresa específica." : "Consulta opciones disponibles en tu localidad de forma manual.",
      ],
      escalationSignals: [
        "Dificultad respiratoria, dolor opresivo en pecho, desmayo, confusión repentina o debilidad de un lado.",
        "Sangrado abundante, convulsión, reacción alérgica con inflamación facial o dificultad para respirar.",
        "Fiebre con rigidez de cuello, embarazo con sangrado o dolor intenso, deterioro rápido o ideas de autolesión.",
      ],
      guidance,
      medicationSafety,
    });
    setInput("");
    setSaved(false);
  }

  function saveResult() {
    if (!result) return;
    onSaveResult(result);
    setSaved(true);
  }

  function reset() {
    setInput("");
    setMainConcern("");
    setDetails("");
    setAllergies("");
    setMedications([createEmptyMedication()]);
    setResult(null);
    setSaved(false);
    setMessages(["¿Qué síntoma o situación de salud te preocupa hoy?", "Tus respuestas permanecen en esta sesión demostrativa hasta que elijas agregarlas a un expediente."]);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#0A4E84] via-[#702F8A] to-[#E4007C] p-5 text-white">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl font-black">S</div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">Orientación inicial</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Asistente Ciudadano de Salud</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/90">Describe lo que sientes y recibe una orientación inicial para identificar el nivel de atención más adecuado.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="rounded-2xl bg-[#F8FAFC] p-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={`${message}-${index}`} className={`max-w-3xl rounded-2xl p-3 text-sm leading-6 ${message.startsWith("Ciudadano:") ? "ml-auto bg-[#E0F2FE] text-[#075985]" : "bg-white text-slate-700 ring-1 ring-slate-100"}`}>
                  {message}
                </div>
              ))}
            </div>
          </div>

          {!mainConcern ? (
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => setInput(suggestion)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-slate-600 hover:border-[#E4007C] hover:text-[#E4007C]">
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <div className="grid gap-3 rounded-2xl border border-slate-200 p-3">
            <label htmlFor="triage-input" className="text-xs font-black uppercase tracking-wide text-[#0A4E84]">
              ¿Qué síntoma o situación de salud te preocupa hoy?
            </label>
            <textarea
              id="triage-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ej. fiebre desde ayer, dolor de pecho, tos, mareo, reacción a un medicamento..."
              className="min-h-24 resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#E4007C]"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={startVoiceInput} className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-black text-[#0A4E84] hover:bg-[#E0F2FE]">
                {voiceState === "listening" ? "Detener micrófono" : "Micrófono"}
              </button>
              <button type="button" onClick={analyze} className="min-h-11 rounded-xl bg-[#E4007C] px-5 text-sm font-black uppercase text-white disabled:opacity-50" disabled={!input.trim() && !mainConcern.trim()}>
                Enviar
              </button>
              {voiceState === "listening" ? <span className="text-xs font-bold text-[#E4007C]">Escuchando… puedes editar antes de enviar.</span> : null}
              {voiceState === "unsupported" ? <span className="text-xs font-bold text-[#9A3412]">Tu navegador no ofrece reconocimiento de voz. Usa la entrada escrita.</span> : null}
              {voiceState === "error" ? <span className="text-xs font-bold text-[#BE123C]">No se pudo iniciar el micrófono. Puedes continuar por texto.</span> : null}
            </div>
            <p className="text-xs leading-5 text-slate-500">La entrada por voz solo se activa si presionas el micrófono y tu navegador la soporta. No se almacena audio; siempre puedes usar la entrada escrita.</p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Pregunta breve según lo declarado
              <textarea value={details} onChange={(event) => setDetails(event.target.value)} placeholder={nextQuestion} className="min-h-24 resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal outline-none focus:border-[#0EA5E9]" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Alergias conocidas, si deseas declararlas
              <textarea value={allergies} onChange={(event) => setAllergies(event.target.value)} placeholder="Ej. alergia declarada a penicilina, ibuprofeno, ningún dato..." className="min-h-24 resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal outline-none focus:border-[#0EA5E9]" />
            </label>
          </div>

          <MedicationReviewForm medications={medications} onAdd={() => setMedications((current) => [...current, createEmptyMedication()])} onChange={updateMedication} />

          {result ? (
            <TriageResultCard result={result} saved={saved} onSave={saveResult} onReset={reset} onPrint={onPrint} onOpenDirectory={onOpenDirectory} />
          ) : null}

          <div className="grid gap-3 rounded-2xl bg-[#F8FAFC] p-4 text-xs leading-5 text-slate-600 md:grid-cols-2">
            <p><strong className="text-[#0A4E84]">Privacidad:</strong> Tus respuestas permanecen en esta sesión demostrativa hasta que elijas agregarlas a un expediente.</p>
            <p><strong className="text-[#0A4E84]">Límites:</strong> Esta herramienta ofrece orientación inicial mediante reglas locales y datos demostrativos. No realiza diagnósticos ni sustituye una consulta médica.</p>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <UrgentGuidanceCard onOpenDirectory={onOpenDirectory} />
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-black uppercase text-[#0A4E84]">Expediente activo</h3>
          <p className="mt-2 font-black text-slate-900">{selectedCase.alias}</p>
          <p className="text-xs font-bold text-[#E4007C]">{selectedCase.folio}</p>
          <p className="mt-3 text-xs leading-5 text-slate-500">Puedes guardar explícitamente un resultado del asistente en este expediente mock.</p>
        </section>
      </aside>
    </div>
  );
}

function MedicationReviewForm({
  medications,
  onAdd,
  onChange,
}: {
  medications: MedicationEntry[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<MedicationEntry>) => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-[#0A4E84]">Medicamentos, suplementos o remedios</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">Registra solo lo que conozcas. No suspendas ni cambies medicamentos sin indicación médica.</p>
        </div>
        <button type="button" onClick={onAdd} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black uppercase text-[#0A4E84]">Agregar producto</button>
      </div>
      <div className="mt-4 grid gap-3">
        {medications.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-xl bg-[#F8FAFC] p-3 md:grid-cols-3">
            <input value={item.name} onChange={(event) => onChange(item.id, { name: event.target.value })} placeholder="Nombre declarado" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm" />
            <input value={item.dose ?? ""} onChange={(event) => onChange(item.id, { dose: event.target.value })} placeholder="Dosis, si la conoces" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm" />
            <input value={item.frequency ?? ""} onChange={(event) => onChange(item.id, { frequency: event.target.value })} placeholder="Frecuencia" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm" />
            <input value={item.lastTakenAt ?? ""} onChange={(event) => onChange(item.id, { lastTakenAt: event.target.value })} placeholder="Última toma" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm" />
            <input value={item.startedAt ?? ""} onChange={(event) => onChange(item.id, { startedAt: event.target.value })} placeholder="Inicio aproximado" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm" />
            <select value={item.source} onChange={(event) => onChange(item.id, { source: event.target.value as MedicationEntry["source"] })} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm">
              {Object.entries(sourceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <input value={item.reason ?? ""} onChange={(event) => onChange(item.id, { reason: event.target.value })} placeholder="Motivo declarado" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm md:col-span-3" />
          </div>
        ))}
      </div>
    </section>
  );
}

function UrgentGuidanceCard({ onOpenDirectory }: { onOpenDirectory: () => void }) {
  return (
    <section className="rounded-2xl border-l-4 border-[#E4007C] bg-[#FDF2F8] p-4 text-sm leading-6 text-[#9D174D] shadow-sm">
      <h3 className="font-black uppercase">Ayuda urgente</h3>
      <p className="mt-1">Si tienes una emergencia o peligro inmediato, llama al 911 o busca atención presencial urgente. Esta plataforma no realiza llamadas ni contacta servicios externos.</p>
      <button type="button" onClick={onOpenDirectory} className="mt-3 rounded-xl bg-[#E4007C] px-4 py-2 text-xs font-black uppercase text-white">Abrir directorio</button>
    </section>
  );
}

function TriageResultCard({
  result,
  saved,
  onSave,
  onReset,
  onPrint,
  onOpenDirectory,
}: {
  result: CitizenTriageResult;
  saved: boolean;
  onSave: () => void;
  onReset: () => void;
  onPrint: () => void;
  onOpenDirectory: () => void;
}) {
  const style = levelStyles[result.level];
  const urgent = result.level === "urgencias";
  return (
    <section className={`rounded-2xl border-l-4 p-4 shadow-sm ${style.className}`}>
      {urgent ? (
        <div className="mb-4 rounded-xl bg-white/75 p-3 text-sm font-bold leading-6">
          Lo que describes puede corresponder a una situación urgente. Busca atención presencial inmediata o llama al 911. Esta plataforma no ha contactado a ningún servicio externo.
        </div>
      ) : null}
      <p className="text-xs font-black uppercase tracking-wide">Resultado del triaje informativo local</p>
      <h3 className="mt-1 text-xl font-black">{result.title}</h3>
      <p className="mt-2 text-sm leading-6">{result.explanation}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <InfoBlock title="Lugar sugerido" items={[placeLabels[result.suggestedPlace], result.suggestedPlace === "consultorio_anexo_farmacia" ? "Por ejemplo, consultorios anexos a farmacias disponibles en tu localidad." : result.suggestedTimeframe]} />
        <InfoBlock title="Señales consideradas" items={result.consideredSignals} />
        <InfoBlock title="Medicamentos declarados" items={result.medicationSafety.declaredMedications.length ? result.medicationSafety.declaredMedications.map((item) => `${item.name}${item.frequency ? ` / ${item.frequency}` : ""}`) : ["No se declararon productos."]} />
        <InfoBlock title="Advertencias farmacológicas" items={[
          ...result.medicationSafety.adverseEffects.map((item) => `${item.trigger}: ${item.explanation}`),
          ...result.medicationSafety.interactionWarnings.map((item) => `${item.trigger}: ${item.explanation}`),
          result.medicationSafety.recommendedAction,
          result.medicationSafety.limitation,
        ]} />
        <InfoBlock title="Próximos pasos" items={result.nextSteps} />
        <InfoBlock title="Señales para escalar" items={result.escalationSignals} />
      </div>
      {result.medicationSafety.missingData.length ? <InfoBlock title="Datos faltantes" items={result.medicationSafety.missingData} /> : null}
      <div className="mt-4 flex flex-wrap gap-2 print:hidden">
        <button type="button" onClick={onReset} className="rounded-xl border border-current px-3 py-2 text-xs font-black uppercase">Iniciar de nuevo</button>
        <button type="button" onClick={onSave} className="rounded-xl bg-[#0A4E84] px-3 py-2 text-xs font-black uppercase text-white">{saved ? "Guardado en expediente mock" : "Guardar en expediente mock"}</button>
        <button type="button" onClick={onPrint} className="rounded-xl bg-white px-3 py-2 text-xs font-black uppercase text-[#0A4E84]">Preparar resumen / imprimir</button>
        <button type="button" onClick={onOpenDirectory} className="rounded-xl bg-[#E4007C] px-3 py-2 text-xs font-black uppercase text-white">¿Dónde puedo acudir?</button>
      </div>
    </section>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-3 rounded-xl bg-white/70 p-3 text-sm leading-6">
      <h4 className="text-xs font-black uppercase tracking-wide">{title}</h4>
      <ul className="mt-2 space-y-1">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
