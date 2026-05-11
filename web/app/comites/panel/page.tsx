"use client";

import Link from "next/link";
import AuthGuard from "../../components/AuthGuard";
import LogoutButton from "../../components/LogoutButton";

const MIN_MIEMBROS_OPERATIVO = 3;
const MAX_MIEMBROS_COMITE = 15;
const MIN_APROBACION_EXAMEN = 7;
const DIAS_HABILES_INACTIVIDAD = 7;

export default function PanelComitePage() {
  return (
  <AuthGuard>
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/comites" className="mb-4 inline-block text-sm font-semibold">
          ← Volver a comités
        </Link>

<div className="mb-4">
  <LogoutButton />
</div>

        <h1 className="mb-2 text-3xl font-bold">Panel de miembro</h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Este espacio organizará tu participación como integrante o aspirante de
          comités ciudadanos expertos.
        </p>

        <section className="mb-6 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Reglas operativas
          </div>

          <div className="space-y-3 text-sm leading-6 text-slate-700">
            <p>
              <strong>Mínimo operativo:</strong> {MIN_MIEMBROS_OPERATIVO} integrantes expertos.
            </p>

            <p>
              <strong>Máximo por comité:</strong> {MAX_MIEMBROS_COMITE} integrantes expertos.
            </p>

            <p>
              <strong>Examen técnico:</strong> mínimo {MIN_APROBACION_EXAMEN}/10 respuestas correctas.
            </p>

            <p>
              <strong>Remoción:</strong> falta ética, escándalo verificable o inactividad mayor a{" "}
              {DIAS_HABILES_INACTIVIDAD} días hábiles.
            </p>
          </div>
        </section>

        <section className="space-y-4">

  <div className="rounded-[28px] bg-white p-5 shadow-sm">
    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
      Mis comités activos
    </div>

    <div className="mt-3 text-sm leading-6 text-slate-600">
      Aún no participas en comités activos.
    </div>

    <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
      Máximo permitido: 3 comités simultáneos en diferentes módulos o niveles.
    </div>
  </div>

  <div className="rounded-[28px] bg-white p-5 shadow-sm">
    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
      Solicitudes enviadas
    </div>

    <div className="mt-3 text-sm leading-6 text-slate-600">
      Aquí aparecerán tus solicitudes activas, estado ético,
      examen técnico y revisión documental.
    </div>

    <Link
  href="/comites/mis-solicitudes"
  className="mt-4 block rounded-xl bg-[#0A4E84] px-4 py-3 text-center font-semibold text-white"
>
  Ver mis solicitudes
</Link>

<Link
  href="/comites/solicitar"
  className="mt-3 block rounded-xl border border-[#0A4E84] bg-white px-4 py-3 text-center font-semibold text-[#0A4E84]"
>
  Nueva solicitud
</Link>

  <div className="rounded-[28px] bg-white p-5 shadow-sm">
    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
      Votaciones pendientes
    </div>

    <div className="mt-3 text-sm leading-6 text-slate-600">
      Las votaciones técnicas pendientes aparecerán aquí.
      No participar durante más de 7 días hábiles puede causar
      suspensión temporal.
    </div>
  </div>

  <div className="rounded-[28px] bg-white p-5 shadow-sm">
    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
      Propuestas del comité
    </div>

    <div className="mt-3 text-sm leading-6 text-slate-600">
      Aquí se mostrarán propuestas para estudio,
      resumen técnico con IA y voto ponderado.
    </div>

    <Link
      href="/comites/propuestas"
      className="mt-4 block rounded-xl bg-[#0A4E84] px-4 py-3 text-center font-semibold text-white"
    >
      Crear propuesta técnica
    </Link>
  </div>

<Link
  href="/comites/propuestas/lista"
  className="mt-3 block rounded-xl border border-[#0A4E84] bg-white px-4 py-3 text-center font-semibold text-[#0A4E84]"
>
  Ver propuestas en estudio
</Link>

  <div className="rounded-[28px] bg-white p-5 shadow-sm">
    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
      Reputación técnica
    </div>

    <ul className="mt-3 space-y-2 text-sm text-slate-700">
      <li>• Exámenes aprobados</li>
      <li>• Participación técnica</li>
      <li>• Calidad de dictámenes</li>
      <li>• Asistencia a votaciones</li>
      <li>• Historial ético</li>
      <li>• Peso ponderado de voto</li>
    </ul>
  </div>

  <Link
    href="/comites/revision"
    className="block rounded-2xl border border-[#0A4E84] bg-white px-5 py-4 text-center font-bold text-[#0A4E84]"
  >
    Ir a revisión ética y administración
  </Link>

</section>
      </div>
    </main>
  </AuthGuard>
  );
}
