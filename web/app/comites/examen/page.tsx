"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { modulosTecnocracia } from "../../lib/modulosTecnocracia";
import { supabaseBrowser } from "../../lib/supabaseBrowser";
import { parseModuleParam } from "../../lib/comites/examenes/public";

type PublicQuestion = {
  id: string;
  pregunta: string;
  opciones: string[];
  tipo: "etica" | "tecnica";
};

type Attempt = {
  attempt_id: string;
  module_id: number;
  expires_at: string;
  attempt_number: number;
  questions: PublicQuestion[];
};

type Result = {
  total: number;
  correctas: number;
  eticas_correctas: number;
  tecnicas_correctas: number;
  aprobado: boolean;
};

const errorMessage = (code?: string) => {
  const messages: Record<string, string> = {
    UNAUTHORIZED: "Inicia sesión para presentar el examen.",
    INVALID_MODULE: "El módulo seleccionado no es válido.",
    ATTEMPT_LIMIT: "Alcanzaste el máximo de tres intentos en 24 horas.",
    RETRY_COOLDOWN: "Espera 30 minutos después de reprobar antes de reintentar.",
    ATTEMPT_EXPIRED: "El intento venció. Inicia uno nuevo.",
    ALREADY_SUBMITTED: "Este intento ya fue enviado.",
    INCOMPLETE_RESPONSES: "Responde las diez preguntas antes de enviar.",
  };
  return messages[code ?? ""] ?? "No fue posible procesar el examen.";
};

function ExamContent() {
  const searchParams = useSearchParams();
  const initialModule = parseModuleParam(searchParams.get("modulo")) ?? 0;
  const [moduleId, setModuleId] = useState(initialModule);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selectedModule = useMemo(
    () => modulosTecnocracia.find((item) => item.id === moduleId),
    [moduleId],
  );
  const answered = Object.keys(answers).length;

  async function accessToken() {
    const { data } = await supabaseBrowser().auth.getSession();
    return data.session?.access_token;
  }

  async function startAttempt() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const token = await accessToken();
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const response = await fetch("/api/comites/examenes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ module_id: moduleId }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error);
      if (
        payload.attempt.questions.length !== 10 ||
        payload.attempt.questions.some(
          (question: PublicQuestion) => question.opciones.length !== 4,
        )
      ) {
        throw new Error("INVALID_EXAM_PAYLOAD");
      }
      setAttempt(payload.attempt);
      setAnswers({});
    } catch (caught) {
      setError(errorMessage(caught instanceof Error ? caught.message : ""));
    } finally {
      setLoading(false);
    }
  }

  async function submitAttempt() {
    if (!attempt || answered !== 10) {
      setError(errorMessage("INCOMPLETE_RESPONSES"));
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = await accessToken();
      if (!token) throw new Error("UNAUTHORIZED");
      const response = await fetch(
        `/api/comites/examenes/${attempt.attempt_id}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ responses: answers }),
        },
      );
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error);
      setResult(payload.result);
      if (payload.result.aprobado) {
        sessionStorage.setItem(
          "ultimo_intento_comite_aprobado",
          JSON.stringify({
            attempt_id: attempt.attempt_id,
            module_id: attempt.module_id,
            expires_at: attempt.expires_at,
          }),
        );
      }
    } catch (caught) {
      setError(errorMessage(caught instanceof Error ? caught.message : ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#0A4E84]">
      <div className="mx-auto max-w-3xl">
        <Link href="/comites" className="mb-4 inline-block text-sm font-semibold">
          ← Volver a comités
        </Link>
        <h1 className="text-4xl font-bold">Examen de admisión</h1>
        <p className="mt-2 text-slate-600">
          Cinco preguntas éticas y cinco técnicas. Calificación mínima: 7/10.
        </p>

        {!attempt && (
          <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
            <label htmlFor="module" className="mb-2 block font-semibold">
              Módulo
            </label>
            <select
              id="module"
              value={moduleId}
              onChange={(event) => setModuleId(Number(event.target.value))}
              className="w-full rounded-2xl border px-4 py-3"
            >
              <option value="" disabled>
                Selecciona un módulo
              </option>
              {modulosTecnocracia.map((item) => (
                <option key={item.id} value={item.id}>
                  Módulo {String(item.id).padStart(2, "0")}: {item.nombre}
                </option>
              ))}
            </select>
            <p className="mt-3 text-sm text-slate-600">{selectedModule?.nombre}</p>
            <button
              type="button"
              onClick={startAttempt}
              disabled={loading || !selectedModule}
              className="mt-5 w-full rounded-2xl bg-[#F2C300] px-4 py-4 font-bold text-[#1F2937] disabled:opacity-50"
            >
              {loading ? "Creando intento…" : "Iniciar examen"}
            </button>
          </section>
        )}

        {attempt && !result && (
          <>
            <div className="mt-6 flex flex-wrap justify-between gap-2 rounded-2xl bg-blue-50 p-4 text-sm">
              <span>Progreso: {answered}/10</span>
              <span>
                Vence: {new Date(attempt.expires_at).toLocaleTimeString()}
              </span>
            </div>
            <section className="mt-6 space-y-4">
              {attempt.questions.map((question, index) => (
                <fieldset
                  key={question.id}
                  className="rounded-[24px] bg-white p-5 shadow-sm"
                >
                  <legend className="px-1 text-sm font-bold text-[#C2187A]">
                    Pregunta {index + 1} ·{" "}
                    {question.tipo === "etica" ? "Ética" : "Técnica"}
                  </legend>
                  <p className="mb-4 mt-2 text-lg font-bold">{question.pregunta}</p>
                  <div className="space-y-3">
                    {question.opciones.map((option, optionIndex) => (
                      <label
                        key={`${question.id}-${optionIndex}`}
                        className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 p-3 text-sm text-slate-700 focus-within:ring-2 focus-within:ring-[#0A4E84]"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={answers[question.id] === optionIndex}
                          onChange={() =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: optionIndex,
                            }))
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </section>
            <button
              type="button"
              onClick={submitAttempt}
              disabled={loading || answered !== 10}
              className="mt-6 w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] disabled:opacity-50"
            >
              {loading ? "Calificando…" : "Enviar respuestas"}
            </button>
          </>
        )}

        {error && (
          <div role="alert" className="mt-6 rounded-2xl bg-red-50 p-4 text-red-800">
            {error}
          </div>
        )}

        {result && (
          <section
            className={`mt-6 rounded-[28px] p-6 ${
              result.aprobado ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <h2 className="text-2xl font-bold">
              {result.aprobado ? "✅ Examen aprobado" : "❌ Examen no aprobado"}
            </h2>
            <p className="mt-2">
              Resultado: {result.correctas}/{result.total}. Éticas:{" "}
              {result.eticas_correctas}/5. Técnicas: {result.tecnicas_correctas}/5.
            </p>
            {result.aprobado ? (
              <Link
                href={`/comites/solicitar?modulo=${moduleId}&attempt=${attempt?.attempt_id}`}
                className="mt-4 inline-block rounded-xl bg-[#0A4E84] px-4 py-3 font-semibold text-white"
              >
                Continuar solicitud
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAttempt(null);
                  setResult(null);
                  setAnswers({});
                }}
                className="mt-4 rounded-xl border border-[#0A4E84] px-4 py-3 font-semibold"
              >
                Volver
              </button>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default function ExamPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando examen…</div>}>
      <ExamContent />
    </Suspense>
  );
}
