"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AuthGuard from "../../components/AuthGuard";

const ESTADOS_REVISION = [
  "Pendiente",
  "Revisión ética",
  "Revisión ética avanzada",
  "Revisión documental",
  "Observación comunitaria",
  "Apta",
  "Integrada",
  "Lista de espera",
  "Suspendida",
  "Rechazada",
  "Spam",
];

type Solicitud = {
  id: string;
  module_id: number;
  module_name: string;
  level: string;
  municipality: string | null;
  state: string | null;
  participation_type: string;
  public_name: string | null;
  expertise_area: string;
  experience_summary: string;
  motivation: string;
  created_at: string;
  review_status?: string | null;
  visibility_level?: string | null;
  conflict_interest?: string | null;
  curriculum_evidence?: string | null;
  ethics_accepted?: boolean | null;
  is_public_figure?: boolean | null;
};

export default function RevisionComitesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [modulo, setModulo] = useState("Todos");
  const [nivel, setNivel] = useState("Todos");
  const [estado, setEstado] = useState("Todos");

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  async function cargarSolicitudes() {
    try {
      const res = await fetch("/api/comites/solicitudes");
      const data = await res.json();

      if (data.ok) setSolicitudes(data.applications || []);
    } finally {
      setLoading(false);
    }
  }

  const modulos = Array.from(new Set(solicitudes.map((s) => s.module_name)));
  const estados = Array.from(
    new Set(solicitudes.map((s) => s.state).filter(Boolean))
  );

  const filtradas = useMemo(() => {
    return solicitudes.filter((s) => {
      const matchModulo = modulo === "Todos" || s.module_name === modulo;
      const matchNivel = nivel === "Todos" || s.level === nivel;
      const matchEstado = estado === "Todos" || s.state === estado;
      return matchModulo && matchNivel && matchEstado;
    });
  }, [solicitudes, modulo, nivel, estado]);

  async function cambiarEstadoSolicitud(id: string, nuevoEstado: string) {
    const res = await fetch("/api/comites/solicitudes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, review_status: nuevoEstado }),
    });

    const data = await res.json();

    if (!data.ok) {
      alert(data.error || "No se pudo actualizar el estado.");
      return;
    }

    setSolicitudes((actuales) =>
      actuales.map((s) =>
        s.id === id ? { ...s, review_status: nuevoEstado } : s
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/comites/panel" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al panel de miembro
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Revisión ética y técnica</h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Panel para revisar solicitudes de expertos, conflictos de interés,
          visibilidad pública y estado de integración al comité.
        </p>

        <section className="mb-6 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Filtros
          </div>

          <label className="mb-2 block font-semibold">Módulo</label>
          <select
            value={modulo}
            onChange={(e) => setModulo(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Todos</option>
            {modulos.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <label className="mb-2 block font-semibold">Nivel</label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Todos</option>
            <option>Municipal</option>
            <option>Estatal</option>
            <option>Federal</option>
          </select>

          <label className="mb-2 block font-semibold">Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full rounded-2xl border px-4 py-3"
          >
            <option>Todos</option>
            {estados.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-500">
            Solicitudes encontradas
          </div>

          <div className="mt-1 text-4xl font-extrabold">
            {filtradas.length}
          </div>
        </section>

        {loading ? (
          <div className="rounded-2xl bg-white p-5 text-sm shadow-sm">
            Cargando solicitudes...
          </div>
        ) : filtradas.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 text-sm shadow-sm">
            No hay solicitudes con estos filtros.
          </div>
        ) : (
          <section className="space-y-4">
            {filtradas.map((s) => (
              <div
                key={s.id}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-2 text-sm font-bold text-[#C2187A]">
                  Módulo {s.module_id}: {s.module_name}
                </div>

                <h2 className="mb-2 text-xl font-bold">{s.expertise_area}</h2>

                <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {s.level}
                  </span>
                  {s.state && (
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {s.state}
                    </span>
                  )}
                  {s.municipality && (
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {s.municipality}
                    </span>
                  )}
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-900">
                    {s.visibility_level || s.participation_type}
                  </span>
                </div>

                {s.public_name && (
                  <div className="mb-3 rounded-2xl bg-green-50 p-3 text-sm text-green-800">
                    Nombre público: {s.public_name}
                  </div>
                )}

                <div className="mb-3 text-sm">
                  <div className="font-bold">Experiencia</div>
                  <p className="mt-1 leading-6 text-slate-600">
                    {s.experience_summary}
                  </p>
                </div>

                <div className="mb-3 text-sm">
                  <div className="font-bold">Motivación</div>
                  <p className="mt-1 leading-6 text-slate-600">
                    {s.motivation}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="font-bold">Datos éticos</div>
                  <div className="mt-2">Figura pública: {s.is_public_figure ? "Sí" : "No"}</div>
                  <div className="mt-2">Código ético: {s.ethics_accepted ? "Aceptado" : "No registrado"}</div>

                  <div className="mt-3 font-semibold">Conflictos de interés</div>
                  <p className="mt-1 leading-6">{s.conflict_interest || "No registrado"}</p>

                  {s.curriculum_evidence && (
                    <>
                      <div className="mt-3 font-semibold">Evidencia curricular</div>
                      <p className="mt-1 whitespace-pre-wrap break-words leading-6">
                        {s.curriculum_evidence}
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-4 rounded-2xl bg-yellow-50 p-3 text-sm text-yellow-900">
                  <div className="font-bold">
                    Estado actual: {s.review_status || "Revisión ética"}
                  </div>

                  <label className="mt-3 block font-semibold">
                    Cambiar estado
                  </label>

                  <select
                    value={s.review_status || "Revisión ética"}
                    onChange={(e) => cambiarEstadoSolicitud(s.id, e.target.value)}
                    className="mt-2 w-full rounded-xl border px-3 py-2"
                  >
                    {ESTADOS_REVISION.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 text-xs text-slate-400">
                  Recibida: {new Date(s.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
