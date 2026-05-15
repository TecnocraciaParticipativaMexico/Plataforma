"use client";

import Link from "next/link";
import { useState } from "react";
import { modulosTecnocracia } from "../../lib/modulosTecnocracia";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

const estados = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
  "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
  "Zacatecas",
];

export default function PropuestasComitePage() {
  const supabase = supabaseBrowser();

  const [moduleId, setModuleId] = useState(1);
  const [level, setLevel] = useState("Municipal");
  const [municipality, setMunicipality] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [evidence, setEvidence] = useState("");
  const [expectedImpact, setExpectedImpact] = useState("");
  const [urgency, setUrgency] = useState("Media");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [risks, setRisks] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function crearPropuesta() {
    try {
      setLoading(true);
      setResult(null);

      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user?.id;

      if (!userId) {
        window.location.href = "/login";
        return;
      }

      if (!title.trim() || !problem.trim() || !proposedSolution.trim()) {
        setResult({
          ok: false,
          error: "Faltan título, problema o solución propuesta.",
        });
        return;
      }

      if (level === "Municipal" && !municipality.trim()) {
        setResult({ ok: false, error: "Escribe el municipio." });
        return;
      }

      if ((level === "Municipal" || level === "Estatal") && !state.trim()) {
        setResult({ ok: false, error: "Selecciona el estado." });
        return;
      }

      let actorHash = localStorage.getItem("actor_hash");

      if (!actorHash) {
        actorHash = crypto.randomUUID();
        localStorage.setItem("actor_hash", actorHash);
      }

      const modulo = modulosTecnocracia.find((m) => m.id === moduleId);

      const res = await fetch("/api/comites/propuestas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          actor_hash: actorHash,
          module_id: moduleId,
          module_name: modulo?.nombre,
          level,
          municipality: level === "Municipal" ? municipality : null,
          state: level === "Municipal" || level === "Estatal" ? state : null,
          title,
          problem,
          proposed_solution: proposedSolution,
          evidence,
          expected_impact: expectedImpact,
          urgency,
          estimated_cost: estimatedCost,
          risks,
        }),
      });

      const responseData = await res.json();
      setResult(responseData);

      if (responseData.ok) {
        setTitle("");
        setProblem("");
        setProposedSolution("");
        setEvidence("");
        setExpectedImpact("");
        setEstimatedCost("");
        setRisks("");
      }
    } catch (err: any) {
      setResult({
        ok: false,
        error: err?.message || "Error creando propuesta",
      });
    } finally {
      setLoading(false);
    }
  }

  const proposalId = result?.proposal?.id;
  const territorialHref = `/propuestas?level=${encodeURIComponent(level)}&state=${encodeURIComponent(state)}&municipality=${encodeURIComponent(municipality)}`;

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <Link href="/comites/panel" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al panel
        </Link>

        <h1 className="text-3xl font-bold">Crear propuesta técnica</h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Las propuestas serán estudiadas por el comité y podrán abrirse a voto
          ciudadano informado con examen de comprensión.
        </p>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Módulo</label>
          <select
            value={moduleId}
            onChange={(e) => setModuleId(Number(e.target.value))}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            {modulosTecnocracia.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                Módulo {modulo.id}: {modulo.nombre}
              </option>
            ))}
          </select>

          <label className="mb-2 block font-semibold">Nivel territorial</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Municipal</option>
            <option>Estatal</option>
            <option>Federal</option>
          </select>

          {level === "Municipal" && (
            <>
              <label className="mb-2 block font-semibold">Municipio</label>
              <input
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="mb-4 w-full rounded-2xl border px-4 py-3"
                placeholder="Ej. Cuernavaca"
              />
            </>
          )}

          {(level === "Municipal" || level === "Estatal") && (
            <>
              <label className="mb-2 block font-semibold">Estado</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mb-4 w-full rounded-2xl border px-4 py-3"
              >
                <option value="">Selecciona estado</option>
                {estados.map((estado) => (
                  <option key={estado}>{estado}</option>
                ))}
              </select>
            </>
          )}

          <label className="mb-2 block font-semibold">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. Repavimentación urgente de avenida principal"
          />

          <label className="mb-2 block font-semibold">Problema</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="Describe el problema, a quién afecta y dónde ocurre."
          />

          <label className="mb-2 block font-semibold">Solución propuesta</label>
          <textarea
            value={proposedSolution}
            onChange={(e) => setProposedSolution(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="Describe la solución técnica o ciudadana propuesta."
          />

          <label className="mb-2 block font-semibold">Evidencia</label>
          <textarea
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={3}
            placeholder="Links, datos, reportes, fotos, referencias."
          />

          <label className="mb-2 block font-semibold">Impacto esperado</label>
          <textarea
            value={expectedImpact}
            onChange={(e) => setExpectedImpact(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={3}
            placeholder="Qué mejoraría y para quién."
          />

          <label className="mb-2 block font-semibold">Urgencia</label>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
            <option>Crítica</option>
          </select>

          <label className="mb-2 block font-semibold">Costo estimado</label>
          <input
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. Bajo, medio, alto, requiere cotización"
          />

          <label className="mb-2 block font-semibold">Riesgos o efectos secundarios</label>
          <textarea
            value={risks}
            onChange={(e) => setRisks(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={3}
            placeholder="Riesgos, costos sociales, tradeoffs o posibles problemas."
          />

          <button
            onClick={crearPropuesta}
            disabled={loading}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear propuesta"}
          </button>

          {result && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">
              {result.ok
                ? "✅ Propuesta creada y puesta en estudio."
                : `❌ Error: ${result.error}`}
            </div>
          )}

          {proposalId && (
            <div className="mt-4 grid gap-3">
              <Link
                href="/comites/propuestas/lista"
                className="rounded-xl bg-[#0A4E84] px-4 py-3 text-center font-semibold text-white"
              >
                Ir a mis propuestas
              </Link>

              <Link
                href={territorialHref}
                className="rounded-xl border border-[#0A4E84] bg-white px-4 py-3 text-center font-semibold text-[#0A4E84]"
              >
                Ver propuestas territoriales
              </Link>

              <Link
                href={`/propuestas/${proposalId}`}
                className="rounded-xl bg-[#E6007E] px-4 py-3 text-center font-semibold text-white"
              >
                Votar propuestas relacionadas
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
