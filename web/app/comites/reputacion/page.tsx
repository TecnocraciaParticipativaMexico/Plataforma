"use client";

import { authenticatedFetch } from "@/lib/security/authenticatedFetch";

import Link from "next/link";
import { useEffect, useState } from "react";

type Reputacion = { total: number; events: { points: number; rule_version: string; created_at: string }[] };

export default function ReputacionPage() {
  const [reputacion, setReputacion] = useState<Reputacion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarReputacion();
  }, []);

  async function cargarReputacion() {
    const res = await authenticatedFetch("/api/reputacion");
    const data = await res.json();

    if (data.ok) {
      setReputacion({ total: data.total, events: data.events });
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <Link href="/comites/panel" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al panel
        </Link>

        <h1 className="text-3xl font-bold">Mi reputación cívica</h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Este panel muestra eventos de reputación autorizados por el servidor.
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
                Puntaje registrado
              </div>

              <div className="mt-3 text-5xl font-extrabold">
                {Number(reputacion.total).toFixed(0)}
              </div>

              <div className="mt-2 text-sm text-slate-600">
                Acumulado de eventos verificados.
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
                Participación ciudadana
              </div>

              <div className="mt-3 text-5xl font-extrabold">
                {reputacion.events.length}
              </div>

              <div className="mt-2 text-sm text-slate-600">
                Número de eventos registrados.
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm"><p>El estado y las alertas institucionales requieren una fuente autorizada; no se deducen del navegador.</p></div>
          </section>
        )}
      </div>
    </main>
  );
}
