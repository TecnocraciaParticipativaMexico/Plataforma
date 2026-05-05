"use client";

import Link from "next/link";

const modulos = [
  { id: 1, nombre: "Seguridad Ciudadana", descripcion: "Denuncias, patrones de riesgo y alertas cívicas verificables." },
  { id: 2, nombre: "Fiscalía Forense Ciudadana", descripcion: "Estructuración técnica de evidencia ciudadana." },
  { id: 3, nombre: "Salud Pública", descripcion: "Seguimiento ciudadano a servicios de salud." },
  { id: 4, nombre: "Educación", descripcion: "Condiciones escolares, infraestructura y acceso." },
  { id: 5, nombre: "Infraestructura", descripcion: "Calles, transporte, obras públicas." },
  { id: 6, nombre: "Medio Ambiente", descripcion: "Agua, aire, residuos, impacto ecológico." },
  { id: 7, nombre: "Transparencia", descripcion: "Acceso a información y opacidad institucional." },
  { id: 8, nombre: "Auditoría Cívica", descripcion: "Revisión ciudadana de gasto público." },
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
            En esta primera versión mostramos la estructura de comités. Después
            se agregará revisión ciudadana y panel de comité.
          </p>
        </section>

        <section className="space-y-4">
          {modulos.map((modulo) => (
            <div
              key={modulo.id}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 text-sm font-bold text-[#C2187A]">
                Módulo {modulo.id}
              </div>

              <h3 className="mb-2 text-xl font-bold text-[#0A4E84]">
                {modulo.nombre}
              </h3>

              <p className="mb-4 text-sm leading-6 text-slate-600">
                {modulo.descripcion}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Municipal</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Estatal</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Federal</span>
              </div>

              <div className="mb-4 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">
                  Integrantes verificados
                </div>
                <div className="text-sm text-slate-400">Próximamente</div>

                <div className="mt-3 text-xs font-bold text-slate-500 uppercase">
                  Integrantes protegidos
                </div>
                <div className="text-sm text-slate-400">
                  Participación anónima disponible
                </div>

                <div className="mt-3 text-xs font-bold text-slate-500 uppercase">
                  Invitaciones sugeridas
                </div>
                <div className="text-sm text-slate-400">
                  Figuras públicas propuestas por la ciudadanía
                </div>
              </div>

              <Link
                href="/comites/solicitar"
                className="block w-full rounded-xl bg-[#0A4E84] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Solicitar participación
              </Link>
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
