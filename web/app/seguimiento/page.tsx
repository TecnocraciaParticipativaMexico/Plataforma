"use client";

import { useEffect, useState } from "react";

type Evento = {
  event_id: string;
  event_type: string;
  created_at: string;
  payload_json?: any;
};

export default function SeguimientoPage() {
  const [processId, setProcessId] = useState("");
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [verify, setVerify] = useState<any>(null);
  const [loadingEventos, setLoadingEventos] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [error, setError] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");
  const [enviandoNota, setEnviandoNota] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState("Draft");
const [cambiandoEstado, setCambiandoEstado] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("processId") || "";
    setProcessId(pid);
    if (pid) {
      cargarEventos(pid);
    }
  }, []);

  async function cargarEventos(pid?: string) {
    const id = pid || processId;
    if (!id) return;

    try {
      setLoadingEventos(true);
      setError("");
      const res = await fetch(`/api/process/${id}/events`);
      const data = await res.json();

      if (!Array.isArray(data)) {
        setEventos([]);
        setError("No se pudieron cargar los eventos.");
        return;
      }

      setEventos(data);
    } catch {
      setError("Error cargando seguimiento.");
    } finally {
      setLoadingEventos(false);
    }
  }

  async function agregarNota() {
    if (!processId || !nuevaNota.trim()) return;

    try {
      setEnviandoNota(true);
      setError("");

      const actorHash = localStorage.getItem("actor_hash") || "anon";

      const res = await fetch(`/api/process/${processId}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "CitizenNoteAdded",
          actor_hash: actorHash,
          payload: {
            note: nuevaNota.trim(),
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setError(data?.error || "No se pudo agregar la actualización.");
        return;
      }

      setNuevaNota("");
      await cargarEventos();
    } catch {
      setError("Error agregando actualización.");
    } finally {
      setEnviandoNota(false);
    }
  }

  async function cambiarEstado() {
  if (!processId) return;

  try {
    setCambiandoEstado(true);
    setError("");

    const actorHash = localStorage.getItem("actor_hash") || "anon";

    const res = await fetch(`/api/process/${processId}/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: "StatusChanged",
        actor_hash: actorHash,
        payload: {
          status: nuevoEstado,
          label:
            nuevoEstado === "Draft"
              ? "Recibido"
              : nuevoEstado === "Review"
              ? "En revisión"
              : nuevoEstado === "Published"
              ? "Resuelto"
              : nuevoEstado,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      setError(data?.error || "No se pudo cambiar estado");
      return;
    }

    await cargarEventos();
  } catch {
    setError("Error cambiando estado");
  } finally {
    setCambiandoEstado(false);
  }
}
  
  async function verificarIntegridad() {
    if (!processId) return;

    try {
      setLoadingVerify(true);
      const res = await fetch(`/api/process/${processId}/verify`);
      const data = await res.json();
      setVerify(data);
    } catch {
      setVerify({ ok: false, error: "Error verificando integridad" });
    } finally {
      setLoadingVerify(false);
    }
  }

function traducirEvento(tipo: string, index: number, eventos: any[]) {
  if (tipo === "ProcessCreated") return "Proceso creado";
  if (tipo === "EvidenceSubmitted") return "Evidencia subida";
  if (tipo === "StatusChanged") return "Estado actualizado";

  if (tipo === "CitizenNoteAdded") {
    const primeraNotaIndex = eventos.findIndex(
      (evento) => evento.event_type === "CitizenNoteAdded"
    );

    return index === primeraNotaIndex
      ? "Reporte inicial"
      : "Actualización ciudadana";
  }

  return tipo;
}

  const ultimoEstado = [...eventos]
    .reverse()
    .find((evento) => evento.event_type === "StatusChanged");

  const estadoActualLabel =
    ultimoEstado?.payload_json?.label ||
    ultimoEstado?.payload_json?.status ||
    "Sin estado";

  const estadoActualRaw = ultimoEstado?.payload_json?.status || "";
  
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <h1 className="mb-2 text-3xl font-bold">Seguimiento de Denuncia</h1>
        <p className="mb-6 text-sm text-slate-600">
          Consulta el historial verificable de tu reporte ciudadano.
        </p>

        <div className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">ID del proceso</label>
          <input
            value={processId}
            onChange={(e) => setProcessId(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Pega aquí tu process_id"
          />

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => cargarEventos()}
              disabled={loadingEventos || !processId}
              className="rounded-2xl border border-[#0A4E84] px-4 py-3 font-semibold text-[#0A4E84]"
            >
              {loadingEventos ? "Cargando..." : "Cargar seguimiento"}
            </button>

            <button
              onClick={verificarIntegridad}
              disabled={loadingVerify || !processId}
              className="rounded-2xl bg-[#0A4E84] px-4 py-3 font-semibold text-white"
            >
              {loadingVerify ? "Verificando..." : "Verificar integridad"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

                        {eventos.length > 0 && (
          <div className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-500">
                Estado actual
              </div>
              <div className="mt-1 text-2xl font-bold text-green-600">
                {estadoActualLabel}
              </div>
              {estadoActualRaw && (
                <div className="mt-1 text-xs text-slate-400">
                  Código interno: {estadoActualRaw}
                </div>
              )}
            </div>

            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-2 text-sm font-semibold text-slate-600">
                Agregar actualización
              </div>

<div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
  <div className="mb-2 text-sm font-semibold text-slate-600">
    Cambiar estado del caso
  </div>

  <select
    value={nuevoEstado}
    onChange={(e) => setNuevoEstado(e.target.value)}
    className="w-full rounded-xl border border-slate-300 p-2 text-sm"
  >
    <option value="Draft">Recibido</option>
    <option value="Review">En revisión</option>
    <option value="Published">Resuelto</option>
  </select>

  <button
    onClick={cambiarEstado}
    disabled={cambiandoEstado}
    className="mt-3 rounded-xl bg-green-600 px-4 py-2 text-white font-semibold"
  >
    {cambiandoEstado ? "Guardando..." : "Actualizar estado"}
  </button>
</div>
              
              <textarea
                value={nuevaNota}
                onChange={(e) => setNuevaNota(e.target.value)}
                placeholder="Escribe información adicional del caso..."
                className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                rows={4}
              />

              <button
                onClick={agregarNota}
                disabled={enviandoNota || !nuevaNota.trim()}
                className="mt-3 rounded-xl bg-[#0A4E84] px-4 py-2 font-semibold text-white disabled:opacity-50"
              >
                {enviandoNota ? "Enviando..." : "Agregar nota"}
              </button>
            </div>

            <h2 className="mb-4 text-xl font-bold">Línea de tiempo</h2>

            <div className="space-y-4">
              {eventos.map((evento, index) => (
<div
  key={evento.event_id}
  className="rounded-2xl border border-slate-200 p-4"
>
  <div className="mb-1 text-sm font-bold text-[#0A4E84]">
    {index + 1}. {traducirEvento(evento.event_type, index, eventos)}
  </div>

  <div className="mb-3 text-xs text-slate-500">
    {new Date(evento.created_at).toLocaleString()}
  </div>

  {evento.event_type === "ProcessCreated" && (
    <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
      <div>
        <span className="font-semibold">Proceso:</span>{" "}
        {evento.payload_json?.tipo_proceso || "Sin tipo"}
      </div>
      <div className="mt-2 break-all text-xs text-slate-500">
        ID: {evento.payload_json?.process_id || evento.event_id}
      </div>
    </div>
  )}

  {evento.event_type === "CitizenNoteAdded" && (
    <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
      <div className="font-semibold mb-1">Nota ciudadana</div>
      <div>{evento.payload_json?.note || "Sin contenido"}</div>
    </div>
  )}

  {evento.event_type === "EvidenceSubmitted" && (
  <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
    <div className="font-semibold mb-1">📸 Evidencia subida</div>

    <div className="mt-2">
      <div>Archivo: {evento.payload_json?.file_name}</div>
      <div>Tipo: {evento.payload_json?.mime_type}</div>
    </div>

    {evento.payload_json?.storage_path && (
      <img
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/evidence/${evento.payload_json.storage_path}`}
        className="mt-3 rounded-xl"
      />
    )}

    {evento.payload_json?.evidence_id && (
      <div className="mt-2 text-xs text-slate-500 break-all">
        Evidencia ID: {evento.payload_json.evidence_id}
      </div>
    )}
  </div>
)}

  {evento.event_type === "StatusChanged" && (
  <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
    <div className="font-semibold mb-1">Estado del caso</div>
    <div className="text-lg font-bold text-green-600">
      {evento.payload_json?.label || evento.payload_json?.status || "Estado actualizado"}
    </div>
  </div>
)}

{!["ProcessCreated", "CitizenNoteAdded", "EvidenceSubmitted", "StatusChanged"].includes(evento.event_type) && evento.payload_json && (
  <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
    {JSON.stringify(evento.payload_json, null, 2)}
  </pre>
)}
</div>
              ))}
            </div>
          </div>
        )}

        {verify?.result?.ok && (
          <div className="rounded-[28px] bg-white p-6 text-center shadow-sm">
            <div className="mb-2 text-xl font-bold text-green-600">
              ✅ Integridad verificada
            </div>
            <div className="text-sm text-slate-600">
              Eventos revisados: {verify.result.checked_events}
            </div>
          </div>
        )}

        {verify && !verify?.result?.ok && verify?.error && (
          <div className="rounded-2xl bg-red-50 p-4 text-red-700">
            ❌ {verify.error}
          </div>
        )}
      </div>
    </main>
  );
}
