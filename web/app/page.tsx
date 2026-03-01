"use client";

import { useState } from "react";

function getOrCreateActorHash() {
  if (typeof window === "undefined") return "";

  let actor = localStorage.getItem("tp_actor_hash");
  if (!actor) {
    actor = crypto.randomUUID();
    localStorage.setItem("tp_actor_hash", actor);
  }
  return actor;
}

type AnyJson = any;

export default function Home() {
  const actorHash = getOrCreateActorHash();

  const [tipo, setTipo] = useState("Reporte");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<AnyJson>(null);

  const [processId, setProcessId] = useState("");
  const [events, setEvents] = useState<AnyJson[] | null>(null);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const [verifyOut, setVerifyOut] = useState<AnyJson | null>(null);
  const [verifying, setVerifying] = useState(false);

  const [status, setStatus] = useState("Draft");
  const [note, setNote] = useState("");
  const [eventOut, setEventOut] = useState<any>(null);
  const [sendingEvent, setSendingEvent] = useState(false);

const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
const [uploadingEvidence, setUploadingEvidence] = useState(false);
const [evidenceOut, setEvidenceOut] = useState<any>(null);
  
  async function crearProceso() {
    setLoading(true);
    setOut(null);
    setEvents(null);
    setVerifyOut(null);
    setEventOut(null);

    try {
      const res = await fetch("/api/process/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tipo_proceso: tipo,
    actor_hash: actorHash,
  }),
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

  async function verificarCadena() {
  const pid = processId.trim();
  if (!pid) return;

  setVerifying(true);
  setVerifyOut(null);

  try {
    const res = await fetch(`/api/process/${pid}/verify`);
    const json = await res.json();
    setVerifyOut(json);
  } finally {
    setVerifying(false);
  }
}

async function enviarEvento(event_type: string, payload: any) {
  const pid = processId.trim();
  if (!pid) return;

  setSendingEvent(true);
  setEventOut(null);

  try {
    const res = await fetch(`/api/process/${pid}/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type,
        actor_hash: actorHash,
        payload,
      }),
    });

    const json = await res.json();
    setEventOut(json);
  } finally {
    setSendingEvent(false);
  }
}

async function subirEvidencia() {
  const pid = processId.trim();
  if (!pid) {
    setEvidenceOut({ ok: false, error: "Primero crea o pega un Process ID" });
    return;
  }
  if (!evidenceFiles || evidenceFiles.length === 0) {
    setEvidenceOut({ ok: false, error: "Selecciona uno o más archivos" });
    return;
  }

  setUploadingEvidence(true);
  setEvidenceOut(null);

  const results: any[] = [];

  try {
    for (const file of evidenceFiles) {
      const fd = new FormData();
      fd.append("actor_hash", actorHash);
      fd.append("file", file);

      const res = await fetch(`/api/process/${pid}/evidence/upload`, {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      results.push({
        file_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        response: json,
      });

      // si alguno falla, seguimos con los demás (más amigable)
    }

    setEvidenceOut({ ok: true, uploaded: results });
    setEvidenceFiles([]); // limpia selección al final
  } finally {
    setUploadingEvidence(false);
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

        <hr className="my-6" />

        <label className="text-sm font-medium">
          Process ID (para ver timeline o verificar integridad)
        </label>
        <input
          className="border rounded px-3 py-2"
          value={processId}
          onChange={(e) => setProcessId(e.target.value)}
          placeholder="pega aquí un out_process_id..."
        />

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={cargarEventos}
            disabled={loadingEvents || !processId.trim()}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            {loadingEvents ? "Cargando..." : "Ver Timeline (Eventos)"}
          </button>

          <button
            onClick={verificarCadena}
            disabled={verifying || !processId.trim()}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            {verifying ? "Verificando..." : "Verificar Integridad (hash-chain)"}
          </button>
        </div>

        <hr className="my-6" />

        <h2 className="text-lg font-semibold">Agregar Eventos al Proceso</h2>
        <p className="text-sm text-gray-600">
          MVP A: StatusChanged + CitizenNoteAdded (append-only, hash-chain por proceso).
        </p>

        <div className="mt-3 flex flex-col gap-3">
          <label className="text-sm font-medium">Cambiar Estado</label>
          <select
            className="border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Draft">Draft</option>
            <option value="Evidence">Evidence</option>
            <option value="Deliberation">Deliberation</option>
            <option value="Review">Review</option>
            <option value="Published">Published</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={() => enviarEvento("StatusChanged", { status })}
            disabled={sendingEvent || !processId.trim()}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            {sendingEvent ? "Enviando..." : "Guardar StatusChanged"}
          </button>

          <label className="text-sm font-medium">Nota ciudadana (sin PII)</label>
          <textarea
            className="border rounded px-3 py-2 min-h-[90px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Escribe una nota (evita emails/teléfonos)."
          />

          <button
            onClick={() => {
              const n = note.trim();
              if (!n) return;
              enviarEvento("CitizenNoteAdded", { note: n });
              setNote("");
            }}
            disabled={sendingEvent || !processId.trim() || !note.trim()}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            {sendingEvent ? "Enviando..." : "Guardar CitizenNoteAdded"}
          </button>

          {eventOut && (
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
              {JSON.stringify(eventOut, null, 2)}
            </pre>
          )}
        </div>

<hr className="my-8" />

<section className="space-y-3">
  <h2 className="text-lg font-semibold">Subir Evidencia (Documento de Verdad)</h2>

  {/* Input real, oculto */}
  <input
    id="evidenceInput"
    type="file"
    multiple
    className="hidden"
    accept="image/jpeg,image/png,application/pdf,audio/mpeg,audio/mp4,audio/x-m4a,video/mp4"
    onChange={(e) => setEvidenceFiles(Array.from(e.target.files ?? []))}
  />

  {/* Botón que abre el selector (rápido) */}
  <div className="flex items-center gap-3">
    <label
      htmlFor="evidenceInput"
      className="inline-block rounded border px-4 py-2 cursor-pointer"
    >
      Elegir archivos
    </label>

    <button
      className="rounded border px-4 py-2 disabled:opacity-50"
      onClick={subirEvidencia}
      disabled={uploadingEvidence || !processId.trim() || evidenceFiles.length === 0}
    >
      {uploadingEvidence ? "Subiendo..." : "Subir evidencia"}
    </button>
  </div>

  {/* Vista rápida de selección */}
  <div className="text-sm text-gray-600">
    {evidenceFiles.length > 0 ? (
      <div>
        <div className="font-medium">
          {evidenceFiles.length} archivo(s) seleccionado(s):
        </div>
        <ul className="list-disc pl-5">
          {evidenceFiles.slice(0, 8).map((f, idx) => (
            <li key={idx}>
              {f.name} ({Math.round(f.size / 1024)} KB)
            </li>
          ))}
          {evidenceFiles.length > 8 && <li>… y {evidenceFiles.length - 8} más</li>}
        </ul>
      </div>
    ) : (
      <div>No hay archivos seleccionados.</div>
    )}
  </div>

  {evidenceOut && (
    <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
      {JSON.stringify(evidenceOut, null, 2)}
    </pre>
  )}
</section>

        {events && (
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
            {JSON.stringify(events, null, 2)}
          </pre>
        )}

        {verifyOut && (
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
            {JSON.stringify(verifyOut, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
