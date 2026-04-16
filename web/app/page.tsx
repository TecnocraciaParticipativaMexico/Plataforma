"use client";

import { useState } from "react";

type AnyJson = any;

export default function Home() {
  const [tipo, setTipo] = useState("Reporte ciudadano");
  const [processId, setProcessId] = useState("");
  const [out, setOut] = useState<AnyJson>(null);
  const [timelineOut, setTimelineOut] = useState<AnyJson>(null);
  const [verifyOut, setVerifyOut] = useState<AnyJson>(null);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  async function loadTimeline() {
    if (!processId) return;
    try {
      setLoadingTimeline(true);
      setTimelineOut(null);

      const res = await fetch(`/api/process/${processId}/events`);
      const data = await res.json();
      setTimelineOut(data);
    } catch (err: any) {
      setTimelineOut({ ok: false, error: err?.message || "Error cargando timeline" });
    } finally {
      setLoadingTimeline(false);
    }
  }

  async function verifyChain() {
    if (!processId) return;
    try {
      setLoadingVerify(true);
      setVerifyOut(null);

      const res = await fetch(`/api/process/${processId}/verify`);
      const data = await res.json();
      setVerifyOut(data);
    } catch (err: any) {
      setVerifyOut({ ok: false, error: err?.message || "Error verificando integridad" });
    } finally {
      setLoadingVerify(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 pb-28 pt-6">
        <header className="mb-6 flex items-center justify-between">
          <button className="text-2xl text-[#0A4E84]">☰</button>
          <h1 className="text-lg font-bold">Tecnocracia Participativa</h1>
          <button className="text-lg">🌐</button>
        </header>

        <section className="mb-6 rounded-[28px] bg-gradient-to-br from-[#0B78A8] to-[#0A4E84] p-6 text-white shadow-lg">
          <div className="mb-3 inline-block rounded-full bg-[#F2C94C] px-3 py-1 text-xs font-bold tracking-wide text-[#1F2937]">
            PORTAL CIUDADANO
          </div>

          <h2 className="mb-4 text-4xl font-extrabold leading-tight">
            Bienvenido,
            <br />
            Ciudadano.
          </h2>

          <p className="mb-6 text-base leading-7 text-white/90">
            Tu voz construye el futuro de nuestra comunidad. Reporta incidencias,
            crea procesos verificables y consulta el avance con transparencia total.
          </p>

          <div className="flex gap-3">
            <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0A4E84] shadow">
              Perfil Ciudadano
            </button>
            <button className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30">
              Miembro de Comité
            </button>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-4">
          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
              Acción principal
            </div>

            <h3 className="mb-2 text-3xl font-bold text-[#0A4E84]">
              Crear Reporte Verificable
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-600">
              Inicia un proceso ciudadano append-only con hash-chain para dar
              seguimiento transparente a un caso real.
            </p>

            <label className="mb-2 block text-sm font-semibold text-[#0A4E84]">
              Tipo de proceso
            </label>

            <input
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0A4E84]"
              placeholder="Ej. Bache en calle Morelos"
            />

            <a
              href="/reportar"
              className="block w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-center text-lg font-bold text-[#1F2937] shadow-[0_6px_0_0_#8B6B00]"
            >
              Crear Denuncia
            </a>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Seguimiento
            </div>

            <label className="mb-2 block text-sm font-semibold text-[#0A4E84]">
              Process ID
            </label>

            <input
              value={processId}
              onChange={(e) => setProcessId(e.target.value)}
              className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-[#0A4E84]"
              placeholder="Pega aquí el process_id"
            />

            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={loadTimeline}
                disabled={loadingTimeline || !processId}
                className="rounded-2xl border border-[#0A4E84] bg-white px-4 py-3 font-semibold text-[#0A4E84]"
              >
                {loadingTimeline ? "Cargando..." : "Ver Timeline"}
              </button>

              <button
                onClick={verifyChain}
                disabled={loadingVerify || !processId}
                className="rounded-2xl bg-[#0A4E84] px-4 py-3 font-semibold text-white"
              >
                {loadingVerify ? "Verificando..." : "Verificar Integridad"}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="mb-2 text-4xl font-extrabold text-[#0A4E84]">01</div>
            <div className="text-lg font-bold text-black">Reportar</div>
            <p className="mt-2 text-sm text-slate-600">
              Crear procesos ciudadanos verificables.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="mb-2 text-4xl font-extrabold text-[#0A4E84]">02</div>
            <div className="text-lg font-bold text-black">Seguir</div>
            <p className="mt-2 text-sm text-slate-600">
              Revisar eventos y evidencia del proceso.
            </p>
          </div>
        </section>

        {out && (
          <section className="mb-4 rounded-[24px] bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-lg font-bold text-[#0A4E84]">
              Resultado de creación
            </h4>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-xs text-slate-800">
              {JSON.stringify(out, null, 2)}
            </pre>
          </section>
        )}

        {timelineOut && (
          <section className="mb-4 rounded-[24px] bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-lg font-bold text-[#0A4E84]">
              Timeline del proceso
            </h4>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-xs text-slate-800">
              {JSON.stringify(timelineOut, null, 2)}
            </pre>
          </section>
        )}

        {verifyOut && (
          <section className="mb-4 rounded-[24px] bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-lg font-bold text-[#0A4E84]">
              Verificación de integridad
            </h4>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-xs text-slate-800">
              {JSON.stringify(verifyOut, null, 2)}
            </pre>
          </section>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-md items-center justify-around px-4 py-3 text-xs">
          <div className="flex flex-col items-center text-[#0A4E84]">
            <span className="text-lg">🏠</span>
            <span>Inicio</span>
          </div>
          <div className="flex flex-col items-center text-slate-500">
            <span className="text-lg">🧩</span>
            <span>Módulos</span>
          </div>
          <div className="flex flex-col items-center text-slate-500">
            <span className="text-lg">👤</span>
            <span>Perfil</span>
          </div>
        </div>
      </nav>
    </main>
  );
}
