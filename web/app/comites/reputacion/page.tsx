"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Reputacion = {
  id: string;
  actor_hash: string;
  technical_score: number;
  citizen_score: number;
  spam_flags: number;
  ethical_flags: number;
  inactivity_flags: number;
  suspension_until: string | null;
  created_at: string;
};

export default function ReputacionPage() {
  const [reputacion, setReputacion] = useState<Reputacion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarReputacion();
  }, []);

  async function cargarReputacion() {
    let actorHash = localStorage.getItem("actor_hash");

    if (!actorHash) {
      actorHash = crypto.randomUUID();
      localStorage.setItem("actor_hash", actorHash);
    }

    const res = await fetch(`/api/reputacion?actor_hash=${actorHash}`);
    const data = await res.json();

    if (data.ok) {
      setReputacion(data.reputacion);
    }

    setLoading(false);
  }

  const suspendido =
    reputacion?.suspension_until &&
    new Date(reputacion.suspension_until) > new Date();

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <Link href="/comites/panel" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al panel
        </Link>

        <h1 className="text-3xl font-bold">Mi reputación cívica</h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Este panel muestra participación técnica, calidad de respuestas y alertas anti-abuso.
        </p>

        {loading ? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            Cargando reputación...
          </div>
        ) : !reputacion ? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            Aún no tienes reputación registrada. Participa votando propuestas.
          </div>
        ) : (
          <section className="mt-6 space-y-4">
            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
                Puntaje técnico
              </div>

              <div className="mt-3 text-5xl font-extrabold">
                {Number(reputacion.technical_score || 0).toFixed(0)}
              </div>

              <div className="mt-2 text-sm text-slate-600">
                Acumulado por comprensión demostrada en votaciones.
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
                Participación ciudadana
              </div>

              <div className="mt-3 text-5xl font-extrabold">
                {Number(reputacion.citizen_score || 0).toFixed(0)}
              </div>

              <div className="mt-2 text-sm text-slate-600">
                Refleja participación informada acumulada.
              </div>
            </div>

            <div
              className={`rounded-[28px] p-6 shadow-sm ${
                suspendido ? "bg-red-50 text-red-900" : "bg-green-50 text-green-900"
              }`}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em]">
                Estado
              </div>

              <div className="mt-3 text-2xl font-bold">
                {suspendido ? "Suspendido temporalmente" : "Activo"}
              </div>

              {suspendido && (
                <div className="mt-2 text-sm">
                  Hasta: {new Date(reputacion.suspension_until!).toLocaleString()}
                </div>
              )}
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
                Alertas
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <div>Spam flags: {reputacion.spam_flags || 0}</div>
                <div>Alertas éticas: {reputacion.ethical_flags || 0}</div>
                <div>Inactividad: {reputacion.inactivity_flags || 0}</div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
