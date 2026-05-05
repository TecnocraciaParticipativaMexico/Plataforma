"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ComiteLocal = {
  id: string;
  nombre: string;
  zona: string;
  tipoZona: string;
  created_at: string;
};

export default function ComitesPage() {
  const [nombre, setNombre] = useState("");
  const [zona, setZona] = useState("");
  const [tipoZona, setTipoZona] = useState("Colonia");
  const [comites, setComites] = useState<ComiteLocal[]>([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("mis_comites") || "[]");
    setComites(guardados);
  }, []);

  function crearComite() {
    if (!nombre.trim() || !zona.trim()) {
      alert("Escribe el nombre del comité y la zona que representa.");
      return;
    }

    const nuevoComite: ComiteLocal = {
      id: crypto.randomUUID(),
      nombre,
      zona,
      tipoZona,
      created_at: new Date().toISOString(),
    };

    const actualizados = [nuevoComite, ...comites];

    setComites(actualizados);
    localStorage.setItem("mis_comites", JSON.stringify(actualizados));

    setNombre("");
    setZona("");
    setTipoZona("Colonia");
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#0A4E84]">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al inicio
        </Link>

        <h1 className="text-4xl font-bold">Comités ciudadanos</h1>

        <p className="mt-3 text-slate-600">
          Los comités son grupos ciudadanos por colonia, municipio o comunidad
          que ayudan a revisar, priorizar y dar seguimiento a denuncias locales.
        </p>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Crear comité básico
          </div>

          <label className="mb-2 block font-semibold">Nombre del comité</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. Comité Colonia Roma Norte"
          />

          <label className="mb-2 block font-semibold">Tipo de zona</label>
          <select
            value={tipoZona}
            onChange={(e) => setTipoZona(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Colonia</option>
            <option>Municipio</option>
            <option>Comunidad</option>
            <option>Alcaldía</option>
            <option>Estado</option>
          </select>

          <label className="mb-2 block font-semibold">Zona que representa</label>
          <input
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. Roma Norte, Cuauhtémoc, CDMX"
          />

          <button
            onClick={crearComite}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] shadow-[0_6px_0_0_#8B6B00]"
          >
            Crear comité
          </button>
        </section>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">Mis comités</h2>

          {comites.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-600">
              Todavía no has creado comités en este dispositivo.
            </div>
          ) : (
            <div className="space-y-4">
              {comites.map((comite) => (
                <div
                  key={comite.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="text-sm font-semibold text-[#C2187A]">
                    {comite.tipoZona}
                  </div>

                  <div className="mt-1 text-xl font-bold text-[#0A4E84]">
                    {comite.nombre}
                  </div>

                  <div className="mt-2 text-sm text-slate-600">
                    Zona: {comite.zona}
                  </div>

                  <div className="mt-2 text-xs text-slate-500">
                    Creado: {new Date(comite.created_at).toLocaleString()}
                  </div>

                  <Link
                    href={`/comites/${comite.id}`}
                    className="mt-4 inline-block rounded-xl bg-[#0A4E84] px-4 py-2 font-semibold text-white"
                  >
                    Abrir comité
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          Esta primera versión guarda comités localmente para avanzar gratis.
          Después conectaremos comités a Supabase, roles y denuncias por zona.
        </div>
      </div>
    </main>
  );
}
