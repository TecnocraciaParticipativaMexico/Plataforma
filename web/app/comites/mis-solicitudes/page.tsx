"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

type Solicitud = {
  id: string;
  module_id: number;
  module_name: string;
  level: string;
  municipality: string | null;
  state: string | null;
  expertise_area: string;
  review_status: string | null;
  created_at: string;
};

export default function MisSolicitudesPage() {
  const supabase = supabaseBrowser();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  async function cargarSolicitudes() {
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;

    if (!userId) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/comites/solicitudes");
    const json = await res.json();

    if (json.ok) {
      setSolicitudes(
        (json.applications || []).filter((s: any) => s.user_id === userId)
      );
    }

    setLoading(false);
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
        <div className="mx-auto max-w-md">
          <Link href="/comites/panel" className="mb-4 inline-block text-sm font-semibold">
            ← Volver al panel
          </Link>

          <h1 className="text-3xl font-bold">Mis solicitudes</h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Aquí puedes consultar el estado de tus solicitudes para participar en comités.
          </p>

          {loading ? (
            <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
              Cargando solicitudes...
            </div>
          ) : solicitudes.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
              Todavía no tienes solicitudes enviadas.
            </div>
          ) : (
            <section className="mt-6 space-y-4">
              {solicitudes.map((s) => (
                <div key={s.id} className="rounded-[28px] bg-white p-5 shadow-sm">
                  <div className="text-sm font-bold text-[#C2187A]">
                    Módulo {s.module_id}: {s.module_name}
                  </div>

                  <h2 className="mt-2 text-xl font-bold">{s.expertise_area}</h2>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-slate-100 px-3 py-1">{s.level}</span>
                    {s.state && <span className="rounded-full bg-slate-100 px-3 py-1">{s.state}</span>}
                    {s.municipality && <span className="rounded-full bg-slate-100 px-3 py-1">{s.municipality}</span>}
                  </div>

                  <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm text-yellow-900">
                    Estado: <strong>{s.review_status || "Revisión ética"}</strong>
                  </div>

                  <div className="mt-4 text-xs text-slate-400">
                    Enviada: {new Date(s.created_at).toLocaleString()}
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
