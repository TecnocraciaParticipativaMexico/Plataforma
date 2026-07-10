"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { modulosTecnocracia } from "../../lib/modulosTecnocracia";

const modulosDisponibles: Record<number, { href: string; cta: string; descripcion: string }> = {
  1: {
    href: "/seguridad-ciudadana",
    cta: "Entrar a Seguridad Ciudadana",
    descripcion: "Carpeta Ciudadana de Investigación Cívica con evidencia local, trazabilidad y documento de apoyo.",
  },
  2: {
    href: "/fiscalia-ia",
    cta: "Entrar a Fiscalía Forense con IA",
    descripcion: "Asistente ciudadano para estructurar expedientes, evidencia, cronologías y trazabilidad local.",
  },
  3: {
    href: "/congreso-civico",
    cta: "Entrar a Congreso Cívico",
    descripcion: "Seguimiento ciudadano de iniciativas, representantes, alertas cívicas y alineación territorial.",
  },
  5: {
    href: "/madres-buscadoras",
    cta: "Entrar a Madres Buscadoras",
    descripcion: "Sistema civico de busqueda, documentacion, seguimiento y acompanamiento para familias y colectivos.",
  },
};

export default function ModulosComitesPage() {
  const [busqueda, setBusqueda] = useState("");

  const modulos = useMemo(() => {
    return modulosTecnocracia.filter((m) =>
      `${m.id} ${m.nombre}`
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

        <h1 className="mb-2 text-3xl font-bold">
          Comités por módulo
        </h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Cada comité corresponde a uno de los 30 módulos de Tecnocracia
          Participativa. Puedes explorar módulos y solicitar participación
          según tu experiencia técnica.
          <span className="mt-2 block font-semibold text-[#0A4E84]">
            Por ahora, los Módulos 01, 02, 03 y 05 están disponibles.
          </span>
        </p>

        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#C2187A]">
            Buscar módulo
          </div>

          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej. seguridad, agua, salud, auditoría..."
            className="w-full rounded-2xl border border-[#0A4E84] bg-white px-4 py-3 text-base outline-none"
          />
        </div>

        <section className="mb-6 rounded-[28px] border border-[#0A4E84] bg-white p-5 shadow-sm">
          <div className="mb-2 text-sm font-bold text-[#C2187A]">Módulo 03</div>
          <h2 className="mb-3 text-2xl font-bold leading-tight">Congreso Cívico</h2>
          <p className="mb-5 text-sm leading-6 text-slate-600">
            Seguimiento ciudadano de iniciativas, representantes, alertas cívicas
            y alineación territorial.
          </p>
          <Link
            href="/congreso-civico"
            className="block w-full rounded-2xl bg-[#0A4E84] px-4 py-3 text-center text-sm font-bold text-white"
          >
            Entrar a Congreso Cívico
          </Link>
        </section>

        <div className="space-y-4">
          {modulos.map((modulo) => {
            const moduloDisponible = modulosDisponibles[modulo.id];

            return (
              <div
                key={modulo.id}
                className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-[#C2187A]">
                  <span>Módulo {modulo.id.toString().padStart(2, "0")}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${moduloDisponible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {moduloDisponible ? "Disponible" : "Próximamente"}
                  </span>
                </div>

                <h2 className="mb-3 text-2xl font-bold leading-tight">
                  {modulo.nombre}
                </h2>

                <p className="mb-4 text-sm leading-6 text-slate-600">
                  {moduloDisponible?.descripcion ??
                    "Comité experto ciudadano orientado a revisión técnica, trazabilidad, evidencia verificable y protección anti-captura política."}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    Municipal
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    Estatal
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    Federal
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <div>
                    <strong>Mínimo operativo:</strong> 3 integrantes.
                  </div>

                  <div>
                    <strong>Máximo:</strong> 15 integrantes.
                  </div>

                  <div>
                    <strong>Entrada:</strong> examen técnico + revisión ética.
                  </div>

                  <div>
                    <strong>Participación:</strong> pública, protegida o
                    colectiva.
                  </div>
                </div>

                {moduloDisponible ? (
                  <Link
                    href={moduloDisponible.href}
                    className="mt-5 block w-full rounded-2xl bg-[#0A4E84] px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    {moduloDisponible.cta}
                  </Link>
                ) : (
                  <div className="mt-5 block w-full rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-500">
                    Próximamente
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
