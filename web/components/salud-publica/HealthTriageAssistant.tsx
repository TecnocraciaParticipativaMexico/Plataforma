"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { localHealthGuidanceProvider } from "@/lib/salud-publica/providers/localGuidanceProvider";
import { localMedicationSafetyProvider } from "@/lib/salud-publica/providers/medicationSafetyProvider";
import type {
  CareOrientationLevel,
  CarePlace,
  CitizenTriageResult,
  HealthCase,
  HealthChatMessage,
  HealthLanguage,
  MedicationEntry,
} from "@/lib/salud-publica/types";

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
type BrowserWithSpeechSynthesis = Window & typeof globalThis & {
  speechSynthesis?: SpeechSynthesis;
  SpeechSynthesisUtterance?: typeof SpeechSynthesisUtterance;
};

type Props = {
  selectedCase: HealthCase;
  onSaveResult: (result: CitizenTriageResult) => void;
  onOpenDirectory: () => void;
  onPrint: () => void;
};

type ConversationContext = {
  mainSymptom?: string;
  duration?: string;
  intensity?: string;
  accompanyingSignals?: string;
  medications?: string;
  allergies?: string;
  stage: number;
};

const languageOptions: Array<{ id: HealthLanguage; label: string; helper: string }> = [
  { id: "es", label: "Español", helper: "Respuesta principal" },
  { id: "nah", label: "Náhuatl", helper: "Demostración" },
  { id: "maya", label: "Maya", helper: "Demostración" },
  { id: "zapoteco", label: "Zapoteco", helper: "Demostración" },
];

const quickQuestions = [
  {
    title: "Reportar dolor de pecho o dificultad para respirar",
    subtitle: "Orientación urgente",
    prompt: "Tengo dolor fuerte en el pecho o dificultad para respirar. ¿Qué debo hacer?",
    tone: "rose",
  },
  {
    title: "Orientación sobre dengue y fiebre",
    subtitle: "Fiebre y señales de alarma",
    prompt: "Tengo fiebre y me preocupa dengue. ¿Qué señales debo observar y qué información preparo para consulta?",
    tone: "emerald",
  },
  {
    title: "Revisar posible reacción a medicamentos",
    subtitle: "Medicamentos y alergias",
    prompt: "Creo que tengo una posible reacción a medicamentos. Quiero revisar qué datos debo compartir con un profesional.",
    tone: "blue",
  },
] as const;

const quickQuestionStyles: Record<(typeof quickQuestions)[number]["tone"], string> = {
  rose: "hover:border-rose-200 hover:bg-rose-50",
  emerald: "hover:border-emerald-200 hover:bg-emerald-50",
  blue: "hover:border-blue-200 hover:bg-blue-50",
};

const knownMedicationTerms = [
  "paracetamol",
  "acetaminofen",
  "acetaminofén",
  "ibuprofeno",
  "naproxeno",
  "loratadina",
  "difenhidramina",
  "amoxicilina",
  "suplemento",
  "remedio",
];

const levelLabels: Record<CareOrientationLevel, string> = {
  autocuidado_vigilancia: "Autocuidado con vigilancia",
  consulta_general: "Consulta general",
  consulta_prioritaria: "Consulta prioritaria",
  urgencias: "Urgencias",
};

const carePlaces: Record<CarePlace, string> = {
  autocuidado: "Autocuidado y vigilancia temporal",
  medicina_general: "Medicina general",
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

function createMessage(sender: HealthChatMessage["sender"], text: string, extras?: Pick<HealthChatMessage, "level" | "metadata">): HealthChatMessage {
  return {
    id: `chat-${sender}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    sender,
    text,
    timestamp: new Date().toISOString(),
    ...extras,
  };
}

function mapGuidanceToCare(resultLevel: string, text: string, medicationWarnings: number): { level: CareOrientationLevel; place: CarePlace; timeframe: string } {
  const source = normalize(text);
  if (resultLevel === "posible_emergencia" || source.includes("emergencia")) {
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

function extractMedications(text: string): MedicationEntry[] {
  const source = normalize(text);
  const matches = knownMedicationTerms.filter((term) => source.includes(normalize(term)));
  return [...new Set(matches)].map((name) => ({
    id: `med-chat-${name}-${Date.now()}`,
    name,
    startedAt: source.includes("hoy") || source.includes("ayer") || source.includes("reciente") ? "Inicio reciente declarado en conversación" : "",
    frequency: "",
    source: name === "suplemento" ? "suplemento" : name === "remedio" ? "remedio_tradicional" : "no_especificado",
  }));
}

function updateConversationContext(current: ConversationContext, text: string): ConversationContext {
  const source = normalize(text);
  const medications = extractMedications(text);
  return {
    ...current,
    mainSymptom: current.mainSymptom ?? text,
    duration: current.duration ?? (/(desde|hace|ayer|hoy|dias|días|semana|horas)/.test(source) ? text : undefined),
    intensity: current.intensity ?? (/(leve|moderad|intens|fuerte|insoportable|\b[1-9]\b|10)/.test(source) ? text : undefined),
    accompanyingSignals: current.accompanyingSignals ?? (/(fiebre|tos|vomit|vómit|diarrea|mareo|debilidad|sangrado|roncha|hinchazon|hinchazón|dificultad)/.test(source) ? text : undefined),
    medications: current.medications ?? (medications.length || source.includes("medicamento") || source.includes("suplemento") || source.includes("remedio") ? text : undefined),
    allergies: current.allergies ?? (/(alergia|alergico|alérgico|roncha|hinchazon|hinchazón)/.test(source) ? text : undefined),
    stage: current.stage + 1,
  };
}

function buildProgressiveQuestions(context: ConversationContext, result: CitizenTriageResult) {
  if (result.level === "urgencias") {
    return [
      "Si puedes hacerlo sin retrasar la atención, prepara edad aproximada, inicio de los síntomas, medicamentos tomados y alergias conocidas para compartirlo con personal de salud.",
    ];
  }
  const questions: string[] = [];
  if (!context.duration) questions.push("¿Desde cuándo comenzó y ha cambiado desde entonces?");
  if (!context.intensity) questions.push("¿Qué intensidad tiene y qué lo mejora o empeora?");
  if (!context.accompanyingSignals) questions.push("¿Hay fiebre, dificultad para respirar, mareo, vómito, diarrea, ronchas, sangrado u otros síntomas acompañantes?");
  if (context.medications) {
    questions.push("Sobre medicamentos: ¿cuál es el nombre, dosis conocida, frecuencia, última toma, fecha de inicio, motivo, si fue prescrito, otros productos y alergias?");
  } else {
    questions.push("¿Tomas medicamentos, suplementos o remedios, o tienes alergias conocidas?");
  }
  return questions.slice(0, context.stage <= 1 ? 3 : 2);
}

function buildAssistantText(
  result: CitizenTriageResult,
  language: HealthLanguage,
  context: ConversationContext,
) {
  const warningIntro =
    result.level === "urgencias"
      ? "Lo que describes puede corresponder a una situación urgente.\n\nBusca atención presencial inmediata o llama al 911.\n\nEsta plataforma no ha contactado a ningún servicio externo.\n\n"
      : "";
  const translationNotice =
    language === "es"
      ? ""
      : "\n\nNota de idioma: esta respuesta se mantiene en español con apoyo demostrativo de idioma seleccionado. Las traducciones demostrativas deben revisarse por hablantes y especialistas antes de utilizarse para decisiones de salud.\n";
  const medicationText = result.medicationSafety.declaredMedications.length
    ? `\n\nMedicamentos o productos mencionados:\n${result.medicationSafety.declaredMedications.map((item) => `- ${item.name}`).join("\n")}\n\n${result.medicationSafety.recommendedAction}\n\nPrecaución: con la información disponible solo puede señalarse una posible relación. La información es insuficiente para confirmar causa, interacción o seguridad; requiere revisión profesional.\n\nNo suspendas, combines ni cambies medicamentos sin consultar a un médico o profesional farmacéutico.`
    : "\n\nSi tomas medicamentos, suplementos o remedios, lleva la lista a consulta. Precaución: la información es insuficiente para valorar productos no declarados y requiere revisión profesional. No suspendas, combines ni cambies medicamentos sin consultar a un médico o profesional farmacéutico.";
  const progressiveQuestions = buildProgressiveQuestions(context, result);

  return `${warningIntro}Nivel orientativo: ${levelLabels[result.level]}.

Lugar sugerido: ${carePlaces[result.suggestedPlace]}.

Plazo sugerido: ${result.suggestedTimeframe}

Por qué aparece esta orientación:
${result.explanation}

Señales consideradas:
${result.consideredSignals.map((item) => `- ${item}`).join("\n")}
${medicationText}

Para continuar con una orientación más completa:
${progressiveQuestions.map((item) => `- ${item}`).join("\n")}

Próximos pasos:
${result.nextSteps.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Señales para escalar:
${result.escalationSignals.map((item) => `- ${item}`).join("\n")}
${translationNotice}

Límite: orientación inicial mediante reglas locales y datos demostrativos. No diagnostica, no prescribe y no sustituye una consulta médica.`;
}

function makeTriageResult(text: string, selectedCase: HealthCase): CitizenTriageResult {
  const medications = extractMedications(text);
  const medicationSafety = localMedicationSafetyProvider.review({ symptoms: text, allergies: text, medications });
  const warningCount = medicationSafety.adverseEffects.length + medicationSafety.interactionWarnings.length;
  const guidance = localHealthGuidanceProvider.generate({ caseId: selectedCase.id, text });
  const care = mapGuidanceToCare(guidance.level, text, warningCount);
  return {
    id: `triage-chat-${Date.now()}`,
    level: care.level,
    title: levelLabels[care.level],
    explanation:
      care.level === "autocuidado_vigilancia"
        ? "La orientación se basa únicamente en lo declarado y no garantiza que una situación sea leve. Busca consulta si hay duda, persistencia, cambios o señales de alarma."
        : "La orientación inicial sugiere valoración profesional según reglas locales y la información declarada.",
    consideredSignals: guidance.signals.length
      ? guidance.signals.map((signal) => `${signal.label}: ${signal.explanation}`)
      : ["Sin señales de alarma detectadas por reglas locales con la información disponible."],
    suggestedPlace: care.place,
    suggestedTimeframe: care.timeframe,
    nextSteps: [
      "Prepara una lista de síntomas, duración, intensidad, antecedentes, alergias y medicamentos declarados.",
      "No cambies ni suspendas medicamentos sin indicación médica.",
      care.place === "consultorio_anexo_farmacia"
        ? "Puedes considerar consultorios médicos anexos a farmacias disponibles en tu localidad, sin favorecer una empresa específica."
        : "Consulta opciones disponibles en tu localidad de forma manual.",
    ],
    escalationSignals: [
      "Dificultad respiratoria, dolor opresivo en pecho, desmayo, confusión repentina o debilidad de un lado.",
      "Sangrado abundante, convulsión, reacción alérgica con inflamación facial o dificultad para respirar.",
      "Fiebre con rigidez de cuello, embarazo con sangrado o dolor intenso, deterioro rápido o ideas de autolesión.",
    ],
    guidance,
    medicationSafety,
  };
}

function formatResponseText(text: string) {
  return text.split("\n").map((paragraph, index) => {
    if (!paragraph.trim()) return <div key={`gap-${index}`} className="h-2" />;
    return (
      <p key={`${paragraph}-${index}`} className="mb-1.5 leading-relaxed">
        {paragraph}
      </p>
    );
  });
}

export function HealthTriageAssistant({ selectedCase, onSaveResult, onOpenDirectory, onPrint }: Props) {
  const [messages, setMessages] = useState<HealthChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<HealthLanguage>("es");
  const [loading, setLoading] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "unsupported" | "error">("idle");
  const [speechNotice, setSpeechNotice] = useState("");
  const [lastResult, setLastResult] = useState<CitizenTriageResult | null>(null);
  const [savedResultId, setSavedResultId] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({ stage: 0 });
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const hasMessages = messages.length > 0;
  const lastAssistant = useMemo(() => [...messages].reverse().find((message) => message.sender === "assistant"), [messages]);

  function scrollToEnd() {
    window.setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 80);
  }

  function submitMessage(text: string) {
    const cleaned = text.trim();
    if (!cleaned || loading) return;
    const citizenMessage = createMessage("citizen", cleaned);
    setInput("");
    setLoading(true);
    setMessages((current) => [...current, citizenMessage]);
    scrollToEnd();

    window.setTimeout(() => {
      const fullContext = [...messages, citizenMessage].filter((message) => message.sender === "citizen").map((message) => message.text).join(" ");
      const nextContext = updateConversationContext(conversationContext, cleaned);
      const result = makeTriageResult(fullContext, selectedCase);
      const medicationWarnings = [
        ...result.medicationSafety.adverseEffects.map((item) => item.trigger),
        ...result.medicationSafety.interactionWarnings.map((item) => item.trigger),
      ];
      const assistantText = buildAssistantText(result, language, nextContext);
      const assistantLevel: HealthChatMessage["level"] = result.level === "urgencias" ? "urgent" : result.level === "consulta_prioritaria" ? "priority" : "general";
      const assistantMessage = createMessage("assistant", assistantText, {
        level: assistantLevel,
        metadata: {
          detectedSignals: result.consideredSignals,
          medicationWarnings,
          recommendedCare: `${levelLabels[result.level]} / ${carePlaces[result.suggestedPlace]}`,
        },
      });
      setConversationContext(nextContext);
      setLastResult(result);
      setSavedResultId("");
      setMessages((current) => [...current, assistantMessage]);
      setLoading(false);
      scrollToEnd();
    }, 420);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage(input);
  }

  function startVoiceInput() {
    if (typeof window === "undefined") return;
    const browserWindow = window as BrowserWithSpeech;
    const Recognition = browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceState("unsupported");
      setSpeechNotice("Tu navegador no ofrece reconocimiento de voz. Usa la entrada escrita.");
      return;
    }
    if (voiceState === "listening") {
      recognitionRef.current?.stop();
      setVoiceState("idle");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = language === "es" ? "es-MX" : "es-MX";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => event.results[index][0].transcript).join(" ");
      setInput((current) => [current, transcript].filter(Boolean).join(" ").trim());
      setSpeechNotice("Texto transcrito. Puedes editarlo antes de enviarlo.");
    };
    recognition.onerror = () => {
      setVoiceState("error");
      setSpeechNotice("No se pudo iniciar el micrófono. Puedes continuar por texto.");
    };
    recognition.onend = () => setVoiceState("idle");
    recognitionRef.current = recognition;
    setVoiceState("listening");
    setSpeechNotice("Escuchando... no se almacena audio.");
    recognition.start();
  }

  function speakLastResponse() {
    if (!lastAssistant || typeof window === "undefined") return;
    const browserWindow = window as BrowserWithSpeechSynthesis;
    if (!browserWindow.speechSynthesis || !browserWindow.SpeechSynthesisUtterance) {
      setSpeechNotice("La lectura en voz alta no está disponible en este navegador.");
      return;
    }
    if (speaking) {
      browserWindow.speechSynthesis.cancel();
      setSpeaking(false);
      setSpeechNotice("Lectura en voz alta detenida.");
      return;
    }
    browserWindow.speechSynthesis.cancel();
    const utterance = new browserWindow.SpeechSynthesisUtterance(lastAssistant.text);
    utterance.lang = "es-MX";
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    browserWindow.speechSynthesis.speak(utterance);
    setSpeaking(true);
    setSpeechNotice("Lectura en voz alta iniciada en el navegador. No se envía audio a servidores externos.");
  }

  function saveLastResult() {
    if (!lastResult) return;
    onSaveResult(lastResult);
    setSavedResultId(lastResult.id);
  }

  function resetConversation() {
    setMessages([]);
    setInput("");
    setLoading(false);
    setLastResult(null);
    setSavedResultId("");
    setSpeaking(false);
    setConversationContext({ stage: 0 });
    setSpeechNotice("");
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
      <div className="flex min-h-[680px] flex-col bg-[#F8FAFC] print:min-h-0 print:bg-white">
        <div className="border-b border-slate-100 bg-white px-4 py-3 sm:px-6 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <BotIcon />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Asistente local</p>
                <h2 className="text-base font-black text-slate-900">Atención Médica Preventiva Inteligente</h2>
              </div>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">Sin conexión a prestadores de salud</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {!hasMessages ? (
            <WelcomePanel onQuickQuestion={submitMessage} />
          ) : (
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.map((message) => (
                <HealthChatBubble key={message.id} message={message} />
              ))}
              {loading ? <ProcessingBubble /> : null}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {hasMessages && lastResult ? (
          <div className="border-t border-slate-100 bg-white px-4 py-3 sm:px-6 print:hidden">
            <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
              <button type="button" onClick={saveLastResult} className="rounded-xl bg-[#0A4E84] px-3 py-2 text-xs font-black uppercase text-white">
                {savedResultId === lastResult.id ? "Guardado en expediente mock" : "Guardar en expediente mock"}
              </button>
              <button type="button" onClick={onPrint} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-slate-600">Preparar resumen</button>
              <button type="button" onClick={onOpenDirectory} className="rounded-xl bg-[#E4007C] px-3 py-2 text-xs font-black uppercase text-white">¿Dónde puedo acudir?</button>
              <button type="button" onClick={resetConversation} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-slate-600">Limpiar conversación</button>
            </div>
          </div>
        ) : null}

        <LanguageBar language={language} onLanguageChange={setLanguage} onSpeak={speakLastResponse} canSpeak={Boolean(lastAssistant)} speaking={speaking} />

        <div className="border-t border-slate-100 bg-white p-4 shadow-sm sm:p-5 print:hidden">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl gap-3">
            <button
              type="button"
              onClick={startVoiceInput}
              aria-label={voiceState === "listening" ? "Detener entrada por voz" : "Iniciar entrada por voz"}
              aria-pressed={voiceState === "listening"}
              className="grid min-h-14 w-14 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-emerald-600"
              title="Entrada por voz"
            >
              <MicIcon active={voiceState === "listening"} />
            </button>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Describa sus síntomas o situación de salud"
              placeholder={language === "es" ? "Describa detalladamente sus síntomas o su situación..." : "Escriba aquí. La traducción es demostrativa y requiere revisión."}
              className="min-h-14 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 shadow-inner outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar mensaje al asistente"
              className="grid min-h-14 w-14 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-emerald-600 text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
              title="Enviar"
            >
              <SendIcon />
            </button>
          </form>
          <div className="mt-3 flex flex-col items-center justify-center gap-1 text-center text-[11px] leading-5 text-slate-400 sm:flex-row">
            <ShieldIcon />
            <span>Esta sesión demostrativa procesa la información localmente y no contacta servicios externos. Revisa y confirma antes de agregar información a un expediente. No se almacena audio.</span>
          </div>
          {speechNotice ? <p className="mt-2 text-center text-xs font-bold text-[#0A4E84]" aria-live="polite">{speechNotice}</p> : null}
        </div>
      </div>
    </section>
  );
}

function WelcomePanel({ onQuickQuestion }: { onQuickQuestion: (question: string) => void }) {
  return (
    <div className="mx-auto flex min-h-[430px] max-w-2xl flex-col items-center justify-center text-center">
      <div className="relative mb-8">
        <div className="grid size-28 place-items-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-inner sm:size-36">
          <BotIcon large />
        </div>
        <span className="absolute bottom-3 right-3 size-5 rounded-full border-2 border-white bg-emerald-500" />
      </div>
      <h3 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Atención Médica Preventiva Inteligente</h3>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
        Bienvenido al módulo de salud de <span className="font-bold text-blue-600">Tecnocracia Participativa</span>. Este espacio organiza información de salud pública en México y busca facilitar orientación preventiva con inclusión para todas las comunidades.
      </p>
      <div className="mt-9 grid w-full gap-3">
        {quickQuestions.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onQuickQuestion(item.prompt)}
            className={`group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm shadow-sm transition ${quickQuestionStyles[item.tone]}`}
          >
            <span>
              <span className="block font-black text-slate-800">{item.title}</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-slate-400">{item.subtitle}</span>
            </span>
            <ChevronRightIcon />
          </button>
        ))}
      </div>
    </div>
  );
}

function HealthChatBubble({ message }: { message: HealthChatMessage }) {
  const isCitizen = message.sender === "citizen";
  const urgent = message.level === "urgent";
  return (
    <div className={`flex ${isCitizen ? "justify-end" : "justify-start"}`}>
      <article
        role={urgent ? "alert" : undefined}
        aria-live={urgent ? "assertive" : undefined}
        className={`max-w-[88%] rounded-3xl border p-4 shadow-sm sm:max-w-[82%] sm:p-5 ${
          isCitizen
            ? "rounded-tr-md border-blue-600 bg-gradient-to-br from-blue-600 to-blue-700 text-white"
            : urgent
              ? "rounded-tl-md border-l-4 border-l-[#E4007C] border-rose-100 bg-white text-slate-800 shadow-md"
              : "rounded-tl-md border-slate-100 bg-white text-slate-800"
        }`}
      >
        <div className={`mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] ${isCitizen ? "text-blue-100" : "text-slate-400"}`}>
          {isCitizen ? <UserIcon /> : <BotIcon />}
          <span>{isCitizen ? "Tú" : "Asistente ciudadano"}</span>
        </div>
        <div className="whitespace-pre-wrap text-sm leading-7">{formatResponseText(message.text)}</div>
        <time className={`mt-3 block text-[10px] font-bold ${isCitizen ? "text-blue-100" : "text-slate-400"}`} dateTime={message.timestamp}>
          {new Date(message.timestamp).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
        </time>
        {!isCitizen && message.metadata ? (
          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            {message.metadata.recommendedCare ? <p><strong>Nivel:</strong> {message.metadata.recommendedCare}</p> : null}
            {message.metadata.medicationWarnings?.length ? <p className="mt-1"><strong>Medicamentos:</strong> revisión demostrativa recomendada.</p> : null}
          </div>
        ) : null}
      </article>
    </div>
  );
}

function ProcessingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3 rounded-3xl rounded-tl-md border border-slate-100 bg-white p-5 text-sm font-bold text-slate-500 shadow-sm" aria-live="polite">
        <span className="flex gap-1.5">
          <span className="size-2.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
          <span className="size-2.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
          <span className="size-2.5 animate-bounce rounded-full bg-emerald-500" />
        </span>
        Procesando localmente con reglas demostrativas...
      </div>
    </div>
  );
}

function LanguageBar({
  language,
  onLanguageChange,
  onSpeak,
  canSpeak,
  speaking,
}: {
  language: HealthLanguage;
  onLanguageChange: (language: HealthLanguage) => void;
  onSpeak: () => void;
  canSpeak: boolean;
  speaking: boolean;
}) {
  return (
    <div className="border-t border-slate-100 bg-white px-4 py-3 sm:px-6 print:hidden">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          <LanguageIcon /> Idioma de atención:
        </span>
        {languageOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onLanguageChange(item.id)}
            aria-pressed={language === item.id}
            className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${
              language === item.id ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
            }`}
            title={item.helper}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onSpeak}
          disabled={!canSpeak}
          aria-label={speaking ? "Detener lectura en voz alta" : "Escuchar última respuesta del asistente"}
          className="ml-auto rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500 transition hover:text-emerald-700 disabled:opacity-50"
        >
          {speaking ? "Detener lectura" : "Escuchar respuestas"}
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-xs leading-5 text-slate-500">
        Las traducciones demostrativas deben ser revisadas por hablantes y especialistas antes de utilizarse para decisiones de salud.
      </p>
    </div>
  );
}

function BotIcon({ large = false }: { large?: boolean }) {
  return (
    <svg className={large ? "size-14" : "size-5"} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="8" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V4M9 4h6M5 13H3M21 13h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 12v2M14 12v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon({ active }: { active: boolean }) {
  return (
    <svg className={`size-6 ${active ? "text-emerald-600" : ""}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m4 12 16-8-5 16-3-7-8-1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m12 13 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 2.8 8.4 7 10 4.2-1.6 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h9M9 3v2m0 0c-.5 3.5-2 6-5 8m5-8c.8 2.7 2.3 4.8 5 6M14 21l4-9 4 9m-6.8-3h5.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="size-5 text-slate-300 transition group-hover:text-slate-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
