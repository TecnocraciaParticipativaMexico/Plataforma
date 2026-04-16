"use client";

import { useState } from "react";

export default function ReportarPage() {
  const [categoria, setCategoria] = useState("Baches");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function enviarReporte() {
    try {
      setLoading(true);
      setResultado(null);

      let actorHash = localStorage.getItem("actor_hash");
      if (!actorHash) {
        actorHash = crypto.randomUUID();
        localStorage.setItem("actor_hash", actorHash);
      }

      const tipoProceso = `${categoria}: ${titulo || "Sin título"}`;

      const res = await fetch("/api/process/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo_proceso: tipoProceso,
          actor_hash: actorHash,
        }),
      });

      const data = await res.json();
      setResultado(data);

      const processId = data?.result?.out_process_id;

      if (processId && descripcion.trim()) {
        await fetch(`/api/process/${processId}/event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actor_hash: actorHash,
            event_type: "CitizenNoteAdded",
            payload_json: {
              note: `${descripcion}\n\nUbicación: ${ubicacion || "No especificada"}`,
            },
          }),
        });
      }
    } catch (err: any) {
      setResultado({
        ok: false,
        error: err?.message || "Error creando reporte",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold">Crear Denuncia Ciudadana</h1>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Baches</option>
            <option>Alumbrado Público</option>
            <option>Basura</option>
            <option>Agua</option>
            <option>Seguridad</option>
            <option>Corrupción</option>
            <option>Otro</option>
          </select>

          <label className="mb-2 block font-semibold">Título breve</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. Bache enorme frente a primaria"
          />

          <label className="mb-2 block font-semibold">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="Describe el problema..."
          />

          <label className="mb-2 block font-semibold">Ubicación</label>
          <input
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="mb-6 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. Calle Morelos esquina Juárez"
          />

          <button
            onClick={enviarReporte}
            disabled={loading}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937]"
          >
            {loading ? "Enviando..." : "Enviar Denuncia"}
          </button>
        </div>

       {resultado && resultado.ok && (
  <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm text-center">
    <div className="text-green-600 text-xl font-bold mb-2">
      ✅ Tu denuncia fue creada
    </div>

    <div className="text-sm text-gray-600 mb-2">
      ID del proceso:
    </div>

    <div className="text-xs break-all mb-4 font-mono">
      {resultado.result?.out_process_id}
    </div>

    <a
      href={`/?processId=${resultado.result?.out_process_id}`}
      className="inline-block rounded-xl bg-[#0A4E84] px-4 py-2 text-white font-semibold"
    >
      Ver seguimiento
    </a>
  </div>
)}

{resultado && !resultado.ok && (
  <div className="mt-6 rounded-2xl bg-red-50 p-4 text-red-700">
    ❌ Error: {resultado.error}
  </div>
)}
