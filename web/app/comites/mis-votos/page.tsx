"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Voto = {
  id: string;
  proposal_id: string;
  proposal_title: string | null;
  module_id: number | null;
  module_name: string | null;
  vote: string;
  comprehension_score: number;
  vote_weight: number;
  voter_type: string;
  created_at: string;
};

export default function MisVotosPage() {
  const [votos, setVotos] = useState<Voto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarVotos();
  }, []);

  async function cargarVotos() {
    let actorHash = localStorage.getItem("actor_hash");

    if (!actorHash) {
      actorHash = crypto.randomUUID();
      localStorage.setItem("actor_hash", actorHash);
    }

    const res = await fetch(`/api/comites/votos?actor_hash=${actorHash}`);
    const data = await res.json();

    if (data.ok) {
      setVotos(data.votes || []);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <Link href="/comites/panel" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al panel
        </Link>

        <h1 className="text-3xl font-bold">Mis votos</h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Aquí puedes consultar tus votos ponderados y el peso obtenido en cada propuesta.
        </p>

        {loading ? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            Cargando votos...
          </div>
        ) : votos.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            Todavía no tienes votos registrados.
          </div>
        ) : (
          <section className="mt-6 space-y-4">
            {votos.map((v) => (
              <div key={v.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="text-sm font-bold text-[#C2187A]">
                  {v.module_id ? `Módulo ${v.module_id}` : "Propuesta"}
                  {v.module_name ? `: ${v.module_name}` : ""}
                </div>

                <h2 className="mt-2 text-xl font-bold">
                  {v.proposal_title || "Propuesta sin título guardado"}
                </h2>

                <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
                  <div>
                    Voto: <strong>{v.vote}</strong>
                  </div>
                  <div>
                    Comprensión: <strong>{v.comprehension_score}/10</strong>
                  </div>
                  <div>
                    Peso ponderado: <strong>{Math.round(Number(v.vote_weight) * 100)}%</strong>
                  </div>
                  <div>
                    Tipo: <strong>{v.voter_type}</strong>
                  </div>
                </div>

                <Link
                  href={`/propuestas/${v.proposal_id}`}
                  className="mt-4 block rounded-xl border border-[#0A4E84] px-4 py-3 text-center font-bold text-[#0A4E84]"
                >
                  Ver propuesta pública
                </Link>

                <div className="mt-4 text-xs text-slate-400">
                  Votado: {new Date(v.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
