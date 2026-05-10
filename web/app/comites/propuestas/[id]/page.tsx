"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "../../../components/AuthGuard";

type Proposal = {
  id: string;
  module_id: number;
  module_name: string;
  level: string;
  municipality: string | null;
  state: string | null;
  title: string;
  problem: string;
  proposed_solution: string;
  evidence: string | null;
  expected_impact: string | null;
  urgency: string | null;
  estimated_cost: string | null;
  risks: string | null;
  ai_summary: string | null;
  status: string | null;
  created_at: string;
};

const preguntasBase = [
  "¿Cuál es el problema principal que intenta resolver esta propuesta?",
  "¿Qué población sería la más impactada?",
  "¿Cuál es uno de los riesgos mencionados?",
  "¿Qué solución técnica se propone?",
  "¿Qué impacto positivo se espera?",
  "¿Cuál es el nivel territorial de la propuesta?",
  "¿Qué evidencia respalda la propuesta?",
  "¿Qué podría salir mal si se implementa incorrectamente?",
  "¿Qué recursos podrían necesitarse?",
  "¿Por qué esta propuesta requiere revisión técnica?",
];

export default function ProposalDetailPage() {
  const params = useParams();
  const proposalId = params?.id as string;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));
  const [score, setScore] = useState<number | null>(null);
  const [vote, setVote] = useState("");

  useEffect(() => {
    cargarPropuesta();
  }, []);

  async function cargarPropuesta() {
    try {
      const res = await fetch(
        `/api/comites/propuestas?id=${proposalId}`
      );

      const data = await res.json();

      if (data.ok) {
        setProposal(data.proposal);
      }
    } finally {
      setLoading(false);
    }
  }

  function evaluarRespuestas() {
    let correctas = 0;

    answers.forEach((a) => {
      if (a.trim().length > 20) {
        correctas += 1;
      }
    });

    setScore(correctas);
  }

  const porcentaje = score !== null ? score * 10 : 0;

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
        <div className="mx-auto max-w-md">

          <Link
            href="/comites/propuestas/lista"
            className="mb-4 inline-block text-sm font-semibold"
          >
            ← Volver a propuestas
          </Link>

          {loading ? (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              Cargando propuesta...
            </div>
          ) : !proposal ? (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              No se encontró la propuesta.
            </div>
          ) : (
            <>
              <div className="rounded-[28px] bg-white p-6 shadow-sm">

                <div className="mb-2 text-sm font-bold text-[#C2187A]">
                  Módulo {proposal.module_id}: {proposal.module_name}
                </div>

                <h1 className="text-3xl font-bold leading-tight">
                  {proposal.title}
                </h1>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">

                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {proposal.level}
                  </span>

                  {proposal.state && (
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {proposal.state}
                    </span>
                  )}

                  {proposal.municipality && (
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {proposal.municipality}
                    </span>
                  )}

                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-yellow-900">
                    Urgencia: {proposal.urgency || "Media"}
                  </span>

                </div>

                <div className="mt-6">
                  <div className="font-bold text-[#0A4E84]">
                    Problema detectado
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {proposal.problem}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="font-bold text-[#0A4E84]">
                    Solución propuesta
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {proposal.proposed_solution}
                  </p>
                </div>

                {proposal.ai_summary && (
                  <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                    <div className="font-bold text-[#0A4E84]">
                      Resumen técnico automático
                    </div>

                    <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700 font-sans">
                      {proposal.ai_summary}
                    </pre>

                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
                  Para votar, debes responder las 10 preguntas de comprensión.
                  El peso de tu voto dependerá de tu comprensión demostrada.
                </div>

              </div>

              <section className="mt-6 space-y-4">

                {preguntasBase.map((pregunta, index) => (
                  <div
                    key={index}
                    className="rounded-[28px] bg-white p-5 shadow-sm"
                  >

                    <div className="font-bold leading-6">
                      {index + 1}. {pregunta}
                    </div>

                    <textarea
                      value={answers[index]}
                      onChange={(e) => {
                        const copy = [...answers];
                        copy[index] = e.target.value;
                        setAnswers(copy);
                      }}
                      rows={3}
                      className="mt-3 w-full rounded-2xl border px-4 py-3"
                      placeholder="Responde con tus propias palabras..."
                    />

                  </div>
                ))}

                <button
                  onClick={evaluarRespuestas}
                  className="w-full rounded-2xl bg-[#0A4E84] px-4 py-4 text-lg font-bold text-white"
                >
                  Evaluar comprensión
                </button>

                {score !== null && (
                  <div className="rounded-[28px] bg-white p-6 shadow-sm">

                    <div className="text-xl font-bold">
                      Resultado de comprensión
                    </div>

                    <div className="mt-3 text-5xl font-extrabold text-[#E6007E]">
                      {score}/10
                    </div>

                    <div className="mt-3 text-sm leading-6 text-slate-700">
                      Tu voto tendrá un peso ponderado aproximado de:
                    </div>

                    <div className="mt-2 text-3xl font-extrabold">
                      {porcentaje}%
                    </div>

                    <div className="mt-5">
                      <label className="mb-2 block font-bold">
                        Emitir voto
                      </label>

                      <select
                        value={vote}
                        onChange={(e) => setVote(e.target.value)}
                        className="w-full rounded-2xl border px-4 py-3"
                      >
                        <option value="">Selecciona</option>
                        <option>A favor</option>
                        <option>En contra</option>
                        <option>Requiere cambios</option>
                        <option>Abstención</option>
                      </select>
                    </div>

                    {vote && (
                      <div className="mt-5 rounded-2xl bg-green-50 p-4 text-sm leading-6 text-green-800">
                        Tu voto será registrado con un peso aproximado del{" "}
                        <strong>{porcentaje}%</strong>.
                      </div>
                    )}

                  </div>
                )}

              </section>
            </>
          )}

        </div>
      </main>
    </AuthGuard>
  );
}
