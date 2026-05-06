"use client";

import Link from "next/link";

export default function ComitesPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al inicio
        </Link>

        <h1 className="mb-2 text-3xl font-bold">
          Comités ciudadanos expertos
        </h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Los comités están integrados por ciudadanos expertos con experiencia
          verificable. No sustituyen autoridades, no sancionan y pueden
          participar con identidad pública, protegida o colectiva según el nivel
          de riesgo y revisión ética.
        </p>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Modelo de participación
          </div>

          <h2 className="mb-3 text-2xl font-bold">
            Expertos legitimados y auditables
          </h2>

          <p className="text-sm leading-6 text-slate-600">
            Cada comité se basa en uno de los 30 módulos de Tecnocracia
            Participativa. Para ingresar se requiere examen técnico, revisión
            ética, declaración de conflictos de interés y trazabilidad.
          </p>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Reglas principales
          </div>

          <div className="space-y-3 text-sm leading-6 text-slate-700">
            <p>
              <strong>Mínimo operativo:</strong> 3 integrantes expertos.
            </p>

            <p>
              <strong>Máximo por comité:</strong> 15 integrantes expertos.
            </p>

            <p>
              <strong>Máximo por persona:</strong> 3 comités activos en
              diferentes módulos o niveles.
            </p>

            <p>
              <strong>Entrada:</strong> examen técnico mínimo 7/10 y revisión
              ética.
            </p>

            <p>
              <strong>Permanencia:</strong> participación activa, votaciones
              atendidas y cumplimiento ético.
            </p>
          </div>
        </section>

        <div className="grid gap-4">
          <Link
            href="/comites/examen"
            className="block rounded-2xl bg-[#F2C300] px-5 py-4 text-center text-lg font-bold text-[#1F2937] shadow-[0_6px_0_0_#8B6B00]"
          >
            Hacer examen técnico
          </Link>

          <Link
            href="/comites/solicitar"
            className="block rounded-2xl bg-[#0A4E84] px-5 py-4 text-center text-lg font-bold text-white"
          >
            Solicitar participación
          </Link>

          <Link
            href="/comites/panel"
            className="block rounded-2xl bg-[#E6007E] px-5 py-4 text-center text-lg font-extrabold text-white shadow-[0_6px_0_0_#8A0050]"
          >
            Entrar al panel de miembro
          </Link>

          <Link
            href="/comites/modulos"
            className="block rounded-2xl border border-[#0A4E84] bg-white px-5 py-4 text-center text-lg font-bold text-[#0A4E84]"
          >
            Ver comités por módulo
          </Link>
        </div>

        <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          Este espacio organiza participación experta ciudadana con límites,
          revisión ética, trazabilidad y reglas anti-captura.
        </div>
      </div>
    </main>
  );
}
