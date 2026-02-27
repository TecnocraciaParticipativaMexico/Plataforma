"use client";

import { useState } from "react";

export default function Home() {
  const [tipo, setTipo] = useState("Reporte");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<any>(null);

  async function crearProceso() {
    setLoading(true);
    setOut(null);
    try {
      const res = await fetch("/api/process/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo_proceso: tipo }),
      });
      const json = await res.json();
      setOut(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold">Tecnocracia Participativa</h1>
      <p className="mt-2 text-sm text-gray-600">
        MVP constitucional: ProcesoCivico + AppendOnlyEvent (hash-chain) — sin PII, sin admin.
      </p>

      <div className="mt-8 flex flex-col gap-3 max-w-md">
        <label className="text-sm font-medium">Tipo de Proceso</label>
        <input
          className="border rounded px-3 py-2"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          placeholder="Reporte / Consulta / Dictamen..."
        />

        <button
          onClick={crearProceso}
          disabled={loading}
          className="rounded bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear Proceso Cívico"}
        </button>

        {out && (
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
            {JSON.stringify(out, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}