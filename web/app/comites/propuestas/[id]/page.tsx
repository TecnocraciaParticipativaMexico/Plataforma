"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "../../../components/AuthGuard";
import { supabaseBrowser } from "../../../lib/supabaseBrowser";

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
  "¿Qué población o territorio sería el más impactado?",
  "¿Cuál es uno de los riesgos o efectos secundarios mencionados?",
  "¿Qué solución técnica o ciudadana se propone?",
  "¿Qué impacto positivo se espera si se implementa correctamente?",
  "¿Cuál es el nivel territorial de la propuesta?",
  "¿Qué evidencia o información respalda la propuesta?",
  "¿Qué podría salir mal si se implementa incorrectamente?",
  "¿Qué recursos, costos o coordinación podrían necesitarse?",
  "¿Por qué esta propuesta requiere revisión técnica antes de votarse?",
];

export default function ProposalDetailPage() {
  const params = useParams();
  const proposalId = params?.id as string;
  const supabase = supabaseBrowser();

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));
  const [score, setScore] = useState<number | null>(null);
  const [vote, setVote] = useState("");
  const [resultadoVoto, setResultadoVoto] = useState<any>(null);
  const [guardandoVoto, setGuardandoVoto] = useState(false);
  const [resumenVotos, setResumenVotos] = useState<any>(null);
  const [yaVoto, setYaVoto] = useState(false);
  const [startedAt] = useState(Date.now());

  useEffect(() => {
  cargarPropuesta();
  cargarVotos();
  verificarSiYaVoto();
}, []);

  async function cargarPropuesta() {
    try {
      const res = await fetch(`/api/comites/propuestas?id=${proposalId}`);
      const data = await res.json();

      if (data.ok) {
        setProposal(data.proposal);
      }
    } finally {
      setLoading(false);
    }
  }

  async function cargarVotos() {
    const res = await fetch(`/api/comites/votos?proposal_id=${proposalId}`);
    const data = await res.json();

    if (data.ok) {
      setResumenVotos(data.resumen);
    }
  }

  function evaluarRespuestas() {
    let correctas = 0;

    answers.forEach((a) => {
      if (a.trim().length >= 20) {
        correctas += 1;
      }
    });

    setScore(correctas);
    setResultadoVoto(null);
  }

  async function verificarSiYaVoto() {
  let actorHash = localStorage.getItem("actor_hash");

  if (!actorHash) return;

  const res = await fetch(
    `/api/comites/votos?proposal_id=${proposalId}&actor_hash=${actorHash}`
  );

  const data = await res.json();

  if (data.ok && data.yaVoto) {
    setYaVoto(true);
  }
}

async function guardarVoto() {
  try {
    setGuardandoVoto(true);
    setResultadoVoto(null);

    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;

    let actorHash = localStorage.getItem("actor_hash");

    if (!actorHash) {
      actorHash = crypto.randomUUID();
      localStorage.setItem("actor_hash", actorHash);
    }

    if (score === null) {
      setResultadoVoto({
        ok: false,
        error: "Primero debes evaluar tu comprensión.",
      });
      return;
    }

    if (!vote) {
      setResultadoVoto({
        ok: false,
        error: "Selecciona tu voto.",
      });
      return;
    }

    const res = await fetch("/api/comites/votos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proposal_id: proposalId,
        user_id: userId || null,
        actor_hash: actorHash,
        voter_type: userId ? "miembro_o_ciudadano_autenticado" : "ciudadano",
        vote,
        comprehension_score: score,
        proposal_title: proposal?.title,
        module_id: proposal?.module_id,
        module_name: proposal?.module_name,
        respuestas: answers,
        time_spent_seconds: Math.floor((Date.now() - startedAt) / 1000),
      }),
    });

    const responseData = await res.json();
    setResultadoVoto(responseData);

    if (responseData.ok) {
      await fetch("/api/reputacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actor_hash: actorHash,
          respuestas: answers,
          comprehension_score: score,
        }),
      });

      window.location.href = "/comites/mis-votos";
    }
  } catch (err: any) {
    setResultadoVoto({
      ok: false,
      error: err?.message || "Error guardando voto",
    });
  } finally {
    setGuardandoVoto(false);
  }
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

                    <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">
                      {proposal.ai_summary}
                    </pre>
                  </div>
                )}

                {resumenVotos && (
                  <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
                    <div className="font-bold">Resumen de votos ponderados</div>
                    <div>Total de votos: {resumenVotos.total}</div>
                    <div>A favor: {resumenVotos.favor}</div>
                    <div>En contra: {resumenVotos.contra}</div>
                    <div>Requiere cambios: {resumenVotos.requiereCambios}</div>
                    <div>Abstención: {resumenVotos.abstencion}</div>
                    <div className="mt-2 font-bold">
                      Peso a favor: {resumenVotos.pesoFavor.toFixed(2)}
                    </div>
                    <div className="font-bold">
                      Peso en contra: {resumenVotos.pesoContra.toFixed(2)}
                      <div className="mt-3 rounded-xl bg-yellow-50 p-3 text-yellow-900">
  Los votos sospechosos no cuentan en el peso ponderado hasta revisión.
</div>
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-yellow-50 p-4 text-sm leading-6 text-yellow-900">
                  Para votar, debes responder 10 preguntas de comprensión.
                  Tu voto no se elimina si sacas bajo puntaje, pero su peso se
                  ajusta: 1/10 = 10%, 10/10 = 100%.
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

                {yaVoto ? (
  <div className="rounded-[28px] bg-green-50 p-6 text-green-900 shadow-sm">
    <div className="text-xl font-bold">
      ✅ Ya registraste tu voto
    </div>

    <div className="mt-2 text-sm leading-6">
      Tu participación ya fue guardada y ponderada.
      No puedes modificar tu voto para mantener integridad democrática.
    </div>

    <Link
      href="/comites/mis-votos"
      className="mt-4 block rounded-2xl bg-[#0A4E84] px-4 py-3 text-center font-bold text-white"
    >
      Ver mis votos
    </Link>
  </div>
) : (
<>

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

                    <button
                      onClick={guardarVoto}
                      disabled={guardandoVoto || !vote}
                      className="mt-4 w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] disabled:opacity-50"
                    >
                      {guardandoVoto ? "Guardando voto..." : "Guardar voto ponderado"}
                    </button>

                    {resultadoVoto && (
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">
                        {resultadoVoto.ok
                          ? "✅ Voto ponderado registrado correctamente."
                          : `❌ Error: ${resultadoVoto.error}`}
                      </div>
                    )}
                  </div>
                )}
                </>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
