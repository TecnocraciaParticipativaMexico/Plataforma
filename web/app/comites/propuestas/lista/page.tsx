"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthGuard from "../../../components/AuthGuard";

type Propuesta = {
  id: string;
  module_id: number;
  module_name: string;
  level: string;
  municipality: string | null;
  state: string | null;
  title: string;
  problem: string;
  proposed_solution: string;
  evidence: string | null;
  expected_impact: string | null;
  urgency: string | null;
  estimated_cost: string | null;
  risks: string | null;
  ai_summary: string | null;
  status: string | null;
  created_at: string;
};

export default function ListaPropuestasPage() {
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPropuestas();
  }, []);

  async function cargarPropuestas() {
    try {
      const res = await fetch("/api/comites/propuestas");
      const data = await res.json();

      if (data.ok) {
        setPropuestas(data.proposals || []);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
        <div className="mx-auto max-w-md">
          <Link
            href="/comites/panel"
            className="mb-4 inline-block text-sm font-semibold"
          >
            ← Volver al panel
          </Link>

          <h1 className="text-3xl font-bold">Propuestas en estudio</h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Aquí aparecen las propuestas técnicas creadas por miembros del
            comité. Después se conectarán al voto ponderado con 10 preguntas.
          </p>

          <Link
            href="/comites/propuestas"
            className="mt-5 block rounded-2xl bg-[#0A4E84] px-4 py-3 text-center font-semibold text-white"
          >
            Crear nueva propuesta
          </Link>

          {loading ? (
            <div className="mt-6 rounded-2xl bg-white p-5 text-sm shadow-sm">
              Cargando propuestas...
            </div>
          ) : propuestas.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-5 text-sm shadow-sm">
              Todavía no hay propuestas registradas.
            </div>
          ) : (
            <section className="mt-6 space-y-4">
              {propuestas.map((p) => (
                <div
                  key={p.id}
                  className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-2 text-sm font-bold text-[#C2187A]">
                    Módulo {p.module_id}: {p.module_name}
                  </div>

                  <h2 className="text-xl font-bold leading-tight">
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

                  <div className="mt-4 text-sm leading-6 text-slate-700">
                    <div className="font-bold text-[#0A4E84]">Problema</div>
                    <p className="mt-1">{p.problem}</p>
                  </div>

                  <div className="mt-4 text-sm leading-6 text-slate-700">
                    <div className="font-bold text-[#0A4E84]">
                      Solución propuesta
                    </div>
                    <p className="mt-1">{p.proposed_solution}</p>
                  </div>

                  {p.ai_summary && (
                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                      <div className="font-bold text-[#0A4E84]">
                        Resumen técnico automático
                      </div>
                      <pre className="mt-2 whitespace-pre-wrap font-sans">
                        {p.ai_summary}
                      </pre>
                    </div>
                  )}

                  <Link
                    href={`/comites/propuestas/${p.id}`}
                    className="mt-4 block rounded-xl bg-[#E6007E] px-4 py-3 text-center font-bold text-white"
                  >
                    Estudiar propuesta y votar
                  </Link>

                  <div className="mt-4 text-xs text-slate-400">
                    Creada: {new Date(p.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
