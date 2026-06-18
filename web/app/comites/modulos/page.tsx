"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const modulosPrioritarios = [
  {
    id: "03",
    nombre: "Congreso Cívico",
    ruta: "/congreso-civico",
    descripcion:
      "Seguimiento ciudadano de iniciativas, representantes, alertas cívicas y alineación territorial.",
    estado: "MVP visual disponible",
    color: "#E6007E",
  },
];

export default function ModulosComitesPage() {
  const [busqueda, setBusqueda] = useState("");

  const modulos = useMemo(() => {
    return modulosPrioritarios.filter((modulo) =>
      `${modulo.id} ${modulo.nombre} ${modulo.descripcion}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  }, [busqueda]);

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link
          href="/comites"
          className="mb-4 inline-block text-sm font-semibold"
        >
          ← Volver a comités
        </Link>

        <div className="mb-6 rounded-[30px] bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#E6007E]">
            Directorio de módulos
          </div>

          <h1 className="mb-3 text-3xl font-extrabold leading-tight">
            Módulos de Tecnocracia Participativa
          </h1>

          <p className="text-sm leading-6 text-slate-600">
            Este directorio prepara la estructura para publicar los 30 módulos.
            Por ahora, Congreso Cívico queda visible como prioridad para entrar
            al MVP ciudadano.
          </p>
        </div>

        <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
          <label
            htmlFor="buscar-modulo"
            className="mb-2 block text-sm font-bold uppercase tracking-[0.15em] text-[#C2187A]"
          >
            Buscar módulo
          </label>

          <input
            id="buscar-modulo"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej. Congreso Cívico"
            className="w-full rounded-2xl border border-[#0A4E84] bg-white px-4 py-3 text-base outline-none focus:border-[#E6007E]"
          />
        </div>

        <div className="space-y-4">
          {modulos.map((modulo) => (
            <article
              key={modulo.id}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
            >
              <div
                className="h-2 w-full"
                style={{ backgroundColor: modulo.color }}
              />

              <div className="p-5">
                <div className="mb-2 text-sm font-extrabold text-[#E6007E]">
                  Módulo {modulo.id}
                </div>

                <h2 className="mb-3 text-2xl font-extrabold leading-tight text-[#0A4E84]">
                  {modulo.nombre}
                </h2>

                <p className="mb-4 text-sm leading-6 text-slate-600">
                  {modulo.descripcion}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#E6007E]">
                    {modulo.estado}
                  </span>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#0A4E84]">
                    Frontend ciudadano
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Navegación disponible
                  </span>
                </div>

                <Link
                  href={modulo.ruta}
                  className="block rounded-2xl bg-[#E6007E] px-5 py-4 text-center text-base font-extrabold text-white shadow-[0_6px_0_0_#9B0057]"
                >
                  Entrar a Congreso Cívico
                </Link>
              </div>
            </article>
          ))}
        </div>

        {modulos.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-600">
            No encontramos un módulo con esa búsqueda. Prueba con Congreso
            Cívico.
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          La lista completa de 30 módulos podrá incorporarse por etapas sin
          cambiar la estructura del directorio.
        </div>
      </div>
    </main>
  );
}
