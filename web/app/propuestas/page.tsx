"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Propuesta = {
  id: string;
  module_id: number;
  module_name: string;
  level: string;
  municipality: string | null;
  state: string | null;
  title: string;
  urgency: string | null;
  status: string | null;
  created_at: string;
};

export default function PropuestasPublicasPage() {
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPropuestas();
  }, []);

  async function cargarPropuestas() {
    const res = await fetch("/api/comites/propuestas");
    const data = await res.json();

    if (data.ok) {
      setPropuestas(data.proposals || []);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold">Propuestas públicas</h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Lee propuestas ciudadanas, revisa el resumen técnico y emite un voto
          informado. Tu voto es anónimo, ponderado por comprensión y se guarda
          solo en tu dispositivo mediante un identificador local.
        </p>

        <Link
          href="/comites/mis-votos"
          className="mt-5 block rounded-2xl border border-[#0A4E84] bg-white px-4 py-3 text-center font-bold text-[#0A4E84]"
        >
          Ver mis votos de este dispositivo
        </Link>

        {loading ? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            Cargando propuestas...
          </div>
        ) : propuestas.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            Todavía no hay propuestas públicas.
          </div>
        ) : (
          <section className="mt-6 space-y-4">
            {propuestas.map((p) => (
              <div key={p.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="text-sm font-bold text-[#C2187A]">
                  Módulo {p.module_id}: {p.module_name}
                </div>

                <h2 className="mt-2 text-xl font-bold leading-tight">
                  {p.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {p.level}
                  </span>

                  {p.state && (
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {p.state}
                    </span>
                  )}

                  {p.municipality && (
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {p.municipality}
                    </span>
                  )}

                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-yellow-900">
                    Urgencia: {p.urgency || "Media"}
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-900">
                    {p.status || "En estudio"}
                  </span>
                </div>

                <Link
                  href={`/propuestas/${p.id}`}
                  className="mt-4 block rounded-xl bg-[#0A4E84] px-4 py-3 text-center font-bold text-white"
                >
                  Leer y votar informado
                </Link>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
