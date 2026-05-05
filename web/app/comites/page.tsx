"use client";

import Link from "next/link";

const comites = [
  {
    nombre: "Seguridad Ciudadana",
    modulo: "Módulo 1",
    descripcion:
      "Documenta denuncias, patrones de riesgo y alertas cívicas sin sustituir autoridades.",
  },
  {
    nombre: "Fiscalía Forense Ciudadana",
    modulo: "Módulo 2",
    descripcion:
      "Organiza evidencia ciudadana en expedientes técnicos trazables y verificables.",
  },
  {
    nombre: "Auditoría Cívica Local",
    modulo: "Módulo 8",
    descripcion:
      "Evalúa presupuestos, obras, servicios públicos y decisiones municipales o estatales.",
  },
];

export default function ComitesPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al inicio
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Comités ciudadanos</h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Los comités son espacios ciudadanos de revisión técnica. No sustituyen
          autoridades, no sancionan y no exponen identidad civil.
        </p>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Fase inicial
          </div>

          <h2 className="mb-3 text-2xl font-bold">
            Participación experta protegida
          </h2>

          <p className="text-sm leading-6 text-slate-600">
            En esta primera versión solo mostramos los comités base. Después se
            agregará solicitud de participación, revisión ciudadana y panel de
            comité.
          </p>
        </section>

        <section className="space-y-4">
          {comites.map((comite) => (
            <div
              key={comite.nombre}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 text-sm font-bold text-[#C2187A]">
                {comite.modulo}
              </div>

              <h3 className="mb-2 text-xl font-bold text-[#0A4E84]">
                {comite.nombre}
              </h3>

              <p className="mb-4 text-sm leading-6 text-slate-600">
                {comite.descripcion}
              </p>

              <button
                disabled
                className="w-full rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
              >
                Solicitud próximamente
              </button>
            </div>
          ))}
        </section>

        <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          Próximo bloque: formulario para solicitar participación en un comité,
          sin pedir INE, CURP, teléfono ni datos sensibles.
        </div>
      </div>
    </main>
  );
}
