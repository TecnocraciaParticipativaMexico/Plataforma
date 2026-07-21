"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { modulosTecnocracia } from "../lib/modulosTecnocracia";

const modulosDisponibles: Record<number, string> = {
  1: "/seguridad-ciudadana",
  2: "/fiscalia-ia",
  3: "/congreso-civico",
  5: "/madres-buscadoras",
  21: "/observacion-electoral",
};

function formatoModulo(id: number) {
  return String(id).padStart(2, "0");
}

export default function ModulosPage() {
  const [busqueda, setBusqueda] = useState("");

  const modulos = useMemo(() => {
    const consulta = busqueda.trim().toLowerCase();

    if (!consulta) {
      return modulosTecnocracia;
    }

    return modulosTecnocracia.filter((modulo) =>
      `${modulo.id} ${formatoModulo(modulo.id)} ${modulo.nombre}`
        .toLowerCase()
        .includes(consulta)
    );
  }, [busqueda]);

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-2xl px-4 pb-32 pt-6">
        <ModuleIdentityHeader
          label="DIRECTORIO DE MÓDULOS"
          title="Módulos oficiales"
          description="Consulta el índice de los módulos de Tecnocracia Participativa."
          className="mb-5 overflow-hidden rounded-[28px] border border-slate-200"
        >
          <Link href="/" className="inline-flex text-sm font-semibold text-[#E4007C]">
            Volver al inicio
          </Link>
        </ModuleIdentityHeader>

        <section className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <label
            htmlFor="buscar-modulo"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#C2187A]"
          >
            Buscar módulo
          </label>

          <input
            id="buscar-modulo"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej. Congreso Cívico, salud, agua..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-[#E6007E]"
          />
        </section>

        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
          {modulos.map((modulo) => {
            const ruta = modulosDisponibles[modulo.id];
            const disponible = Boolean(ruta);
            const contenido = (
              <>
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="w-8 shrink-0 text-sm font-extrabold text-[#E6007E]">
                    {formatoModulo(modulo.id)}
                  </span>
                  <span className="truncate text-sm font-semibold text-slate-800">
                    {modulo.nombre}
                  </span>
                </div>

                <span
                  className={
                    disponible
                      ? "shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
                      : "shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500"
                  }
                >
                  {disponible ? "Disponible" : "Próximamente"}
                </span>
              </>
            );

            if (ruta) {
              return (
                <Link
                  key={modulo.id}
                  href={ruta}
                  className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 transition hover:bg-pink-50 focus:bg-pink-50 focus:outline-none"
                >
                  {contenido}
                </Link>
              );
            }

            return (
              <div
                key={modulo.id}
                className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 opacity-80"
                aria-disabled="true"
              >
                {contenido}
              </div>
            );
          })}
        </section>

        {modulos.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-600">
            No encontramos un módulo con esa búsqueda.
          </div>
        ) : null}

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />
    </main>
  );
}
