"use client";

import { useState } from "react";

export default function ReportarPage() {
  const [categoria, setCategoria] = useState("Baches");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null);

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
  note: `${descripcion} (Ubicación: ${ubicacion || "No especificada"})`,
})
});

      const data = await res.json();

const processId = data?.result?.out_process_id;

if (data?.ok && processId && archivo) {
  const formData = new FormData();
  formData.append("files", archivo);

  const uploadRes = await fetch(`/api/process/${processId}/evidence/upload`, {
    method: "POST",
    body: formData,
  });

  const uploadData = await uploadRes.json();

  setResultado({
    ...data,
    upload: uploadData,
  });
} else {
  setResultado(data);
}

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

          <label className="mb-2 block font-semibold">Evidencia (opcional)</label>
<input
  type="file"
  onChange={(e) => setArchivo(e.target.files?.[0] || null)}
  className="mb-6 w-full rounded-2xl border px-4 py-3"
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
    <div className="mb-2 text-xl font-bold text-green-600">
      ✅ Tu denuncia fue creada
    </div>

    <div className="mb-2 text-sm text-gray-600">ID del proceso:</div>

    <div className="mb-4 break-all font-mono text-xs">
      {resultado.result?.out_process_id}
    </div>

    {resultado.upload && (
      <div className="mb-4 rounded-xl bg-slate-50 p-3 text-left text-xs text-slate-700">
        <div className="mb-1 font-semibold">Resultado de evidencia</div>
        <pre className="overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(resultado.upload, null, 2)}
        </pre>
      </div>
    )}

    <a
      href={`/seguimiento?processId=${resultado.result?.out_process_id}`}
      className="inline-block rounded-xl bg-[#0A4E84] px-4 py-2 font-semibold text-white"
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
      </div>
    </main>
  );
}
