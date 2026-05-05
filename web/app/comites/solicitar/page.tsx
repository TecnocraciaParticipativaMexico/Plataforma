"use client";

import Link from "next/link";
import { useState } from "react";

const modulos = [
  "Seguridad Ciudadana",
  "Fiscalía Forense Ciudadana",
  "Salud Pública",
  "Educación",
  "Infraestructura",
  "Medio Ambiente",
  "Transparencia",
  "Auditoría Cívica",
];

export default function SolicitarComitePage() {
  const [moduleId, setModuleId] = useState(1);
  const [level, setLevel] = useState("Municipal");
  const [participationType, setParticipationType] = useState("Protegida");
  const [publicName, setPublicName] = useState("");
  const [expertiseArea, setExpertiseArea] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function enviarSolicitud() {
    setLoading(true);
    setResult(null);

    let actorHash = localStorage.getItem("actor_hash");

    if (!actorHash) {
      actorHash = crypto.randomUUID();
      localStorage.setItem("actor_hash", actorHash);
    }

    const res = await fetch("/api/comites/solicitudes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actor_hash: actorHash,
        module_id: moduleId,
        module_name: modulos[moduleId - 1],
        level,
        participation_type: participationType,
        public_name: participationType === "Pública verificada" ? publicName : null,
        expertise_area: expertiseArea,
        experience_summary: experienceSummary,
        motivation,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/comites" className="mb-4 inline-block text-sm font-semibold">
          ← Volver a comités
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Solicitar participación</h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Puedes postularte como integrante protegido o como figura pública
          verificada. No pedimos INE, CURP, teléfono ni correo en esta fase.
        </p>

        <section className="rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Módulo</label>
          <select
            value={moduleId}
            onChange={(e) => setModuleId(Number(e.target.value))}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            {modulos.map((modulo, index) => (
              <option key={modulo} value={index + 1}>
                Módulo {index + 1}: {modulo}
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

          <label className="mb-2 block font-semibold">Tipo de participación</label>
          <select
            value={participationType}
            onChange={(e) => setParticipationType(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Protegida</option>
            <option>Pública verificada</option>
          </select>

          {participationType === "Pública verificada" && (
            <>
              <label className="mb-2 block font-semibold">
                Nombre público visible
              </label>
              <input
                value={publicName}
                onChange={(e) => setPublicName(e.target.value)}
                className="mb-4 w-full rounded-2xl border px-4 py-3"
                placeholder="Ej. nombre profesional o público"
              />
            </>
          )}

          <label className="mb-2 block font-semibold">Área de experiencia</label>
          <input
            value={expertiseArea}
            onChange={(e) => setExpertiseArea(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. derecho, seguridad, salud, finanzas públicas"
          />

          <label className="mb-2 block font-semibold">Resumen de experiencia</label>
          <textarea
            value={experienceSummary}
            onChange={(e) => setExperienceSummary(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="Describe tu experiencia sin compartir datos sensibles."
          />

          <label className="mb-2 block font-semibold">Motivación</label>
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="¿Por qué quieres participar en este comité?"
          />

          <button
            onClick={enviarSolicitud}
            disabled={loading}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] shadow-[0_6px_0_0_#8B6B00]"
          >
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>

          {result && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">
              {result.ok
                ? "✅ Solicitud recibida. En una fase futura será revisada por comité."
                : `❌ Error: ${result.error}`}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
