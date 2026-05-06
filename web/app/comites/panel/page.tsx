"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const MAX_MIEMBROS_COMITE = 15;
const MIN_MIEMBROS_RECOMENDADO = 5;

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
};

export default function PanelComitePage() {
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

      if (data.ok) {
        setSolicitudes(data.applications);
      }
    } finally {
      setLoading(false);
    }
  }

  const filtradas = useMemo(() => {
    return solicitudes.filter((s) => {
      const matchModulo = modulo === "Todos" || s.module_name === modulo;
      const matchNivel = nivel === "Todos" || s.level === nivel;
      const matchEstado = estado === "Todos" || s.state === estado;

      return matchModulo && matchNivel && matchEstado;
    });
  }, [solicitudes, modulo, nivel, estado]);

  const modulos = Array.from(new Set(solicitudes.map((s) => s.module_name)));
  const estados = Array.from(
    new Set(solicitudes.map((s) => s.state).filter(Boolean))
  );

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/comites" className="mb-4 inline-block text-sm font-semibold">
          ← Volver a comités
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Panel de comité</h1>

        <section className="mb-6 rounded-[28px] bg-white p-5 shadow-sm">
  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
    Comité territorial
  </div>

  <h2 className="text-xl font-bold">
    Denuncias por zona
  </h2>

  <p className="mt-2 text-sm text-slate-600">
    Consulta reportes ciudadanos en el mapa para identificar riesgos en tiempo real en tu zona.
  </p>

  <div className="mt-4 grid gap-3">
    <Link
      href="/mapa"
      className="rounded-xl bg-[#0A4E84] px-4 py-3 text-center font-semibold text-white"
    >
      Ver mapa ciudadano en tiempo real
    </Link>

    <Link
      href="/reportar"
      className="rounded-xl bg-[#F2C300] px-4 py-3 text-center font-bold text-[#1F2937]"
    >
      Crear denuncia en la zona
    </Link>
  </div>
</section>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Revisión inicial de solicitudes ciudadanas. Este panel no aprueba,
          rechaza ni sanciona; solo organiza información para revisión futura.
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
    Solicitudes de expertos encontradas
  </div>

  <div className="mt-1 text-4xl font-extrabold text-[#0A4E84]">
    {filtradas.length}
  </div>

  <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
    Límite recomendado por comité: {MIN_MIEMBROS_RECOMENDADO} a{" "}
    {MAX_MIEMBROS_COMITE} integrantes expertos.
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

                <h2 className="mb-2 text-xl font-bold text-[#0A4E84]">
                  {s.expertise_area}
                </h2>

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
                    {s.participation_type}
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

                <div className="text-sm">
                  <div className="font-bold">Motivación</div>
                  <p className="mt-1 leading-6 text-slate-600">
                    {s.motivation}
                  </p>
                </div>

    <div className="mt-4 rounded-2xl bg-yellow-50 p-3 text-sm text-yellow-900">
  <div className="font-bold">Revisión ética pendiente</div>
  <div className="mt-1">
    Antes de integrarse al comité, esta persona debe revisar conflictos de
    interés, nivel de visibilidad pública y reglas de conducta.
  </div>
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
