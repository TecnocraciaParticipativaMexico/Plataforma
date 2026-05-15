"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "../../../components/AuthGuard";

type Dictamen = {
  id: string;
  proposal_id: string;
  module_id: number | null;
  module_name: string | null;
  proposal_title: string | null;
  folio: string | null;
  report_version: number | null;
  report_type: string | null;
  status: string | null;
  facts: string | null;
  evidence_summary: string | null;
  methodology: string | null;
  technical_analysis: string | null;
  legal_human_rights_basis: string | null;
  risks: string | null;
  impact_analysis: string | null;
  recommendations: string | null;
  public_summary: string | null;
  final_conclusion: string | null;
  conflict_of_interest_review: string | null;
  chain_of_custody_summary: string | null;
  document_hash: string | null;
  chain_head_hash: string | null;
  locked: boolean;
  created_at: string;
};

export default function DictamenDetallePage() {
  const params = useParams();
  const dictamenId = params?.id as string;

  const [dictamen, setDictamen] = useState<Dictamen | null>(null);
  const [loading, setLoading] = useState(true);
  const [observations, setObservations] = useState<any[]>([]);
  const [observationType, setObservationType] = useState("Observación técnica");
  const [observationContent, setObservationContent] = useState("");
  const [savingObservation, setSavingObservation] = useState(false);
  const [observationResult, setObservationResult] = useState<any>(null);
  const [technicalVotes, setTechnicalVotes] = useState<any[]>([]);
  const [technicalVoteSummary, setTechnicalVoteSummary] = useState<any>(null);
  const [technicalVote, setTechnicalVote] = useState("Aprobada técnicamente");
  const [technicalReasoning, setTechnicalReasoning] = useState("");
  const [conflictDeclared, setConflictDeclared] = useState(false);
  const [savingTechnicalVote, setSavingTechnicalVote] = useState(false);
  const [technicalVoteResult, setTechnicalVoteResult] = useState<any>(null);
  const [closingReport, setClosingReport] = useState(false);
  const [closeResult, setCloseResult] = useState<any>(null);

  useEffect(() => {
  cargarDictamen();
}, []);

  async function cargarDictamen() {
    const res = await fetch("/api/comites/dictamenes");
    const data = await res.json();

    if (data.ok) {
      const encontrado = (data.reports || []).find(
        (r: Dictamen) => r.id === dictamenId
      );
      setDictamen(encontrado || null);

if (encontrado) {
  await cargarObservaciones(encontrado.id);
  await cargarVotosTecnicos(encontrado.id);
}
}

setLoading(false);
}

  async function cargarObservaciones(reportId: string) {
  const res = await fetch(
    `/api/comites/dictamenes/observaciones?report_id=${reportId}`
  );
  const data = await res.json();

  if (data.ok) {
    setObservations(data.observations || []);
  }
}

async function cargarVotosTecnicos(reportId: string) {
  const res = await fetch(`/api/comites/dictamenes/votos?report_id=${reportId}`);
  const data = await res.json();

  if (data.ok) {
    setTechnicalVotes(data.votes || []);
    setTechnicalVoteSummary(data.resumen || null);
  }
}

async function emitirVotoTecnico() {
  if (!dictamen) return;

  try {
    setSavingTechnicalVote(true);
    setTechnicalVoteResult(null);

    let actorHash = localStorage.getItem("actor_hash");

    if (!actorHash) {
      actorHash = crypto.randomUUID();
      localStorage.setItem("actor_hash", actorHash);
    }

    const res = await fetch("/api/comites/dictamenes/votos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_id: dictamen.id,
        proposal_id: dictamen.proposal_id,
        actor_hash: actorHash,
        vote: technicalVote,
        reasoning: technicalReasoning,
        technical_weight: conflictDeclared ? 0 : 1,
        conflict_declared: conflictDeclared,
      }),
    });

    const data = await res.json();
    setTechnicalVoteResult(data);

    if (data.ok) {
      setTechnicalReasoning("");
      setConflictDeclared(false);
      await cargarVotosTecnicos(dictamen.id);
    }
  } finally {
    setSavingTechnicalVote(false);
  }
}

async function cerrarDictamen() {
  if (!dictamen) return;

  try {
    setClosingReport(true);
    setCloseResult(null);

    let actorHash = localStorage.getItem("actor_hash");

    if (!actorHash) {
      actorHash = crypto.randomUUID();
      localStorage.setItem("actor_hash", actorHash);
    }

    const res = await fetch("/api/comites/dictamenes/cerrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_id: dictamen.id,
        actor_hash: actorHash,
      }),
    });

    const data = await res.json();
    setCloseResult(data);

    if (data.ok) {
      setDictamen(data.report);
    }
  } finally {
    setClosingReport(false);
  }
}

async function agregarObservacion() {
  if (!dictamen) return;

  try {
    setSavingObservation(true);
    setObservationResult(null);

    let actorHash = localStorage.getItem("actor_hash");

    if (!actorHash) {
      actorHash = crypto.randomUUID();
      localStorage.setItem("actor_hash", actorHash);
    }

    const res = await fetch("/api/comites/dictamenes/observaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_id: dictamen.id,
        proposal_id: dictamen.proposal_id,
        actor_hash: actorHash,
        module_id: dictamen.module_id,
        observation_type: observationType,
        content: observationContent,
      }),
    });

    const data = await res.json();
    setObservationResult(data);

    if (data.ok) {
      setObservationContent("");
      await cargarObservaciones(dictamen.id);
    }
  } finally {
    setSavingObservation(false);
  }
}

  function Section({
    title,
    content,
  }: {
    title: string;
    content: string | null;
  }) {
    if (!content) return null;

    return (
      <div className="rounded-[24px] bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
          {title}
        </div>

        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">
          {content}
        </pre>
      </div>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
        <div className="mx-auto max-w-md">
          <Link
            href="/comites/panel"
            className="mb-4 inline-block text-sm font-semibold"
          >
            ← Volver al panel
          </Link>

          {loading ? (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              Cargando dictamen...
            </div>
          ) : !dictamen ? (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              No se encontró el dictamen.
            </div>
          ) : (
            <>
              <section className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="text-sm font-bold text-[#C2187A]">
                  Dictamen técnico colegiado
                </div>

                <h1 className="mt-2 text-3xl font-bold leading-tight">
                  {dictamen.proposal_title || "Dictamen sin título"}
                </h1>

                <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <div>
                    Folio: <strong>{dictamen.folio}</strong>
                  </div>
                  <div>
                    Estado: <strong>{dictamen.status}</strong>
                  </div>
                  <div>
                    Versión: <strong>{dictamen.report_version || 1}</strong>
                  </div>
                  <div>
                    Módulo:{" "}
                    <strong>
                      {dictamen.module_id} {dictamen.module_name}
                    </strong>
                  </div>
                  <div>
                    Creado:{" "}
                    <strong>
                      {new Date(dictamen.created_at).toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-xs leading-6 text-blue-900">
                  Este dictamen preliminar organiza hechos, evidencia,
                  metodología, riesgos y recomendaciones. No sustituye autoridad
                  competente ni peritaje judicial formal.
                </div>
              </section>

              <section className="mt-6 space-y-4">
                <Section title="Hechos identificados" content={dictamen.facts} />
                <Section title="Evidencia disponible" content={dictamen.evidence_summary} />
                <Section title="Metodología" content={dictamen.methodology} />
                <Section title="Análisis técnico" content={dictamen.technical_analysis} />
                <Section title="Base jurídica y DDHH" content={dictamen.legal_human_rights_basis} />
                <Section title="Riesgos" content={dictamen.risks} />
                <Section title="Impacto" content={dictamen.impact_analysis} />
                <Section title="Recomendaciones" content={dictamen.recommendations} />
                <Section title="Conflictos de interés" content={dictamen.conflict_of_interest_review} />
                <Section title="Cadena de custodia" content={dictamen.chain_of_custody_summary} />
                <Section title="Resumen público" content={dictamen.public_summary} />
                <Section title="Conclusión" content={dictamen.final_conclusion} />

                <div className="rounded-[24px] bg-white p-5 shadow-sm">
  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
    Observaciones colegiadas
  </div>

  <div className="mt-4 space-y-3">
    {observations.length === 0 ? (
      <div className="text-sm text-slate-600">
        Aún no hay observaciones técnicas registradas.
      </div>
    ) : (
      observations.map((obs) => (
        <div
          key={obs.id}
          className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
        >
          <div className="font-bold text-[#0A4E84]">
            {obs.observation_type}
          </div>

          <div className="mt-2 whitespace-pre-wrap">{obs.content}</div>

          <div className="mt-2 text-xs text-slate-400">
            {new Date(obs.created_at).toLocaleString()}
          </div>
        </div>
      ))
    )}
  </div>

  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
    <label className="mb-2 block text-sm font-bold">
      Tipo de observación
    </label>

    <select
      value={observationType}
      onChange={(e) => setObservationType(e.target.value)}
      className="mb-3 w-full rounded-2xl border px-4 py-3 text-sm"
    >
      <option>Observación técnica</option>
      <option>Riesgo crítico</option>
      <option>Solicitud de evidencia</option>
      <option>Objeción razonada</option>
      <option>Recomendación</option>
      <option>Conflicto de interés</option>
    </select>

    <label className="mb-2 block text-sm font-bold">
      Contenido
    </label>

    <textarea
      value={observationContent}
      onChange={(e) => setObservationContent(e.target.value)}
      rows={5}
      className="w-full rounded-2xl border px-4 py-3 text-sm"
      placeholder="Escribe una observación técnica clara, con razones y evidencia si aplica..."
    />

    <button
      onClick={agregarObservacion}
      disabled={savingObservation || observationContent.trim().length < 20}
      className="mt-4 w-full rounded-2xl bg-[#0A4E84] px-4 py-3 font-bold text-white disabled:opacity-50"
    >
      {savingObservation ? "Guardando..." : "Agregar observación colegiada"}
    </button>

    {observationResult && (
      <div className="mt-3 rounded-2xl bg-white p-3 text-sm">
        {observationResult.ok
          ? "✅ Observación registrada con trazabilidad."
          : `❌ Error: ${observationResult.error}`}
      </div>
    )}
  </div>
</div>

                <div className="rounded-[24px] bg-white p-5 shadow-sm">
  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
    Votación técnica colegiada
  </div>

  {technicalVoteSummary && (
    <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
      <div>Total de votos técnicos: {technicalVoteSummary.total}</div>
      <div>Aprobada técnicamente: {technicalVoteSummary.aprobada}</div>
      <div>Requiere revisión: {technicalVoteSummary.revision}</div>
      <div>No viable: {technicalVoteSummary.inviable}</div>
    </div>
  )}

  <div className="mt-4 space-y-3">
    {technicalVotes.length === 0 ? (
      <div className="text-sm text-slate-600">
        Aún no hay votos técnicos registrados.
      </div>
    ) : (
      technicalVotes.map((v) => (
        <div
          key={v.id}
          className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
        >
          <div className="font-bold text-[#0A4E84]">
            {v.vote}
          </div>

          <div className="mt-2 whitespace-pre-wrap">{v.reasoning}</div>

          {v.conflict_declared && (
            <div className="mt-2 rounded-xl bg-yellow-50 p-3 text-yellow-900">
              Conflicto declarado: este voto tiene peso técnico 0.
            </div>
          )}

          <div className="mt-2 text-xs text-slate-400">
            {new Date(v.created_at).toLocaleString()}
          </div>
        </div>
      ))
    )}
  </div>

  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
    <label className="mb-2 block text-sm font-bold">
      Voto técnico
    </label>

    <select
      value={technicalVote}
      onChange={(e) => setTechnicalVote(e.target.value)}
      className="mb-3 w-full rounded-2xl border px-4 py-3 text-sm"
    >
      <option>Aprobada técnicamente</option>
      <option>Requiere revisión</option>
      <option>No viable</option>
    </select>

    <label className="mb-2 block text-sm font-bold">
      Razonamiento técnico
    </label>

    <textarea
      value={technicalReasoning}
      onChange={(e) => setTechnicalReasoning(e.target.value)}
      rows={5}
      className="w-full rounded-2xl border px-4 py-3 text-sm"
      placeholder="Explica tu voto técnico con razones, evidencia, riesgos o metodología..."
    />

    <label className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-700">
      <input
        type="checkbox"
        checked={conflictDeclared}
        onChange={(e) => setConflictDeclared(e.target.checked)}
        className="mt-1"
      />
      <span>
        Declaro posible conflicto de interés. Mi voto quedará registrado con
        peso técnico 0, pero visible para trazabilidad.
      </span>
    </label>

    <button
      onClick={emitirVotoTecnico}
      disabled={savingTechnicalVote || technicalReasoning.trim().length < 20}
      className="mt-4 w-full rounded-2xl bg-[#F2C300] px-4 py-3 font-bold text-[#1F2937] disabled:opacity-50"
    >
      {savingTechnicalVote ? "Guardando..." : "Emitir voto técnico"}
    </button>

    {technicalVoteResult && (
      <div className="mt-3 rounded-2xl bg-white p-3 text-sm">
        {technicalVoteResult.ok
          ? "✅ Voto técnico registrado con trazabilidad."
          : `❌ Error: ${technicalVoteResult.error}`}
      </div>
    )}
  </div>
</div>

<div className="mt-5 rounded-2xl bg-blue-50 p-4">
  <div className="font-bold text-blue-900">
    Cierre del dictamen
  </div>

  <div className="mt-2 text-sm leading-6 text-blue-900">
    El cierre consolida los votos técnicos válidos, registra disensos,
    actualiza la conclusión final y bloquea el dictamen.
  </div>

  <button
    onClick={cerrarDictamen}
    disabled={closingReport || dictamen.locked || technicalVotes.length === 0}
    className="mt-4 w-full rounded-2xl bg-[#0A4E84] px-4 py-3 font-bold text-white disabled:opacity-50"
  >
    {dictamen.locked
      ? "Dictamen cerrado"
      : closingReport
      ? "Cerrando..."
      : "Cerrar dictamen"}
  </button>

  {closeResult && (
    <div className="mt-3 rounded-2xl bg-white p-3 text-sm">
      {closeResult.ok
        ? "✅ Dictamen cerrado con consenso técnico."
        : `❌ Error: ${closeResult.error}`}
    </div>
  )}
</div>

                <div className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
                    Integridad
                  </div>

                  <div className="mt-3 break-words text-xs leading-6 text-slate-700">
                    <div>
                      Hash documental:
                      <br />
                      <strong>{dictamen.document_hash || "Pendiente"}</strong>
                    </div>

                    <div className="mt-3">
                      Chain head:
                      <br />
                      <strong>{dictamen.chain_head_hash || "Pendiente"}</strong>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
