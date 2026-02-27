"use client";

import { useState } from "react";

type AnyJson = any;

export default function Home() {
  const [tipo, setTipo] = useState("Reporte");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<AnyJson>(null);

  const [processId, setProcessId] = useState("");
  const [events, setEvents] = useState<AnyJson[] | null>(null);
  const [loadingEvents, setLoadingEvents] = useState(false);

  async function crearProceso() {
    setLoading(true);
    setOut(null);
    setEvents(null);
    try {
      const res = await fetch("/api/process/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo_proceso: tipo }),
      });
      const json = await res.json();
      setOut(json);

      const pid = json?.result?.out_process_id;
      if (pid) setProcessId(pid);
    } finally {
      setLoading(false);
    }
  }

  async function cargarEventos() {
    const pid = processId.trim();
    if (!pid) return;

    setLoadingEvents(true);
    setEvents(null);
    try {
      const res = await fetch(`/api/process/${pid}/events`);
      const json = await res.json();
      if (json?.ok) setEvents(json.events ?? []);
      else setEvents([{ error: json?.error ?? "Error" }]);
    } finally {
      setLoadingEvents(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold">Tecnocracia Participativa</h1>
      <p className="mt-2 text-sm text-gray-600">
        MVP constitucional: ProcesoCivico + AppendOnlyEvent (hash-chain) — sin PII, sin admin.
      </p>

      <div className="mt-8 flex flex-col gap-3 max-w-xl">
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

        <hr className="my-4" />

        <label className="text-sm font-medium">Process ID (para ver timeline)</label>
        <input
          className="border rounded px-3 py-2"
          value={processId}
          onChange={(e) => setProcessId(e.target.value)}
          placeholder="pega aquí un out_process_id..."
        />

        <button
          onClick={cargarEventos}
          disabled={loadingEvents || !processId.trim()}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          {loadingEvents ? "Cargando..." : "Ver Timeline (Eventos)"}
        </button>

        {events && (
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
            {JSON.stringify(events, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}