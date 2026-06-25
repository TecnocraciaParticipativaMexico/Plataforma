"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const modulosTecnocracia = [
  { id: 1, nombre: "Seguridad Ciudadana (Cero Corrupción)", ruta: "/seguridad-ciudadana" },
  { id: 2, nombre: "Fiscalía Forense con Inteligencia Artificial" },
  { id: 3, nombre: "Congreso Cívico de Evaluación Legislativa", ruta: "/congreso-civico" },
  { id: 4, nombre: "Derechos Humanos y Contrapeso Institucional" },
  { id: 5, nombre: "Madres Buscadoras y Búsqueda Forense" },
  { id: 6, nombre: "Sistema Judicial de Carrera" },
  { id: 7, nombre: "Tribunales de Alta Integridad" },
  { id: 8, nombre: "Auditoría Cívica de Gobiernos Estatales y Municipales" },
  { id: 9, nombre: "Ética Pública, Conflictos de Interés y Puertas Giratorias" },
  { id: 10, nombre: "Salud y Bienestar Digital" },
  { id: 11, nombre: "Educación y Capacitación Funcional" },
  { id: 12, nombre: "Infraestructura, Vivienda y Mantenimiento Predictivo" },
  { id: 13, nombre: "Movilidad, Transporte y Derecho a la Ciudad" },
  { id: 14, nombre: "Sistema DIF Cívico y Protección Social" },
  { id: 15, nombre: "Juventud, Futuro, Deporte y Protección Intergeneracional" },
  { id: 16, nombre: "Artes, Cultura, Patrimonio Vivo y Turismo Comunitario" },
  { id: 17, nombre: "Economía Regional e Inversión Cívica" },
  { id: 18, nombre: "Soberanía Energética y Recursos Estratégicos" },
  { id: 19, nombre: "Licitaciones Éticas y Fomento a MiPyMEs" },
  { id: 20, nombre: "Ciencia, Tecnología e Innovación Pública" },
  { id: 21, nombre: "INE Cívico y Observación Electoral Permanente" },
  { id: 22, nombre: "Anticorrupción e Inteligencia Financiera" },
  { id: 23, nombre: "Auditoría de Sistemas y Guardián del Código" },
  { id: 24, nombre: "Observatorio de Prensa Libre y Verdad Pública" },
  { id: 25, nombre: "Verdad Histórica, Memoria y No Repetición" },
  { id: 26, nombre: "Agricultura, Campo, Pesca y Soberanía Alimentaria" },
  { id: 27, nombre: "Agua, Territorio y Soberanía Hídrica" },
  { id: 28, nombre: "Medio Ambiente, Cambio Climático y Sustentabilidad Intergeneracional" },
  { id: 29, nombre: "Emergencias, Protección Civil y Resiliencia" },
  { id: 30, nombre: "Relaciones Internacionales, Derechos Humanos y Diáspora" },
];

function formatoModulo(id: number) {
  return String(id).padStart(2, "0");
}

export default function ModulosComitesPage() {
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
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/comites"
          className="mb-4 inline-block text-sm font-semibold"
        >
          ← Volver a comités
        </Link>

        <section className="mb-5 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E6007E]">
            Directorio de módulos
          </div>

          <h1 className="mb-3 text-3xl font-extrabold leading-tight">
            Módulos oficiales
          </h1>

          <p className="text-sm leading-6 text-slate-600">
            Consulta el índice de los 30 módulos de Tecnocracia Participativa.
            Por ahora, los Módulos 01 y 03 están disponibles.
          </p>
        </section>

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
            const disponible = Boolean(modulo.ruta);
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

            if (disponible && modulo.ruta) {
              return (
                <Link
                  key={modulo.id}
                  href={modulo.ruta}
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
      </div>
    </main>
  );
}
