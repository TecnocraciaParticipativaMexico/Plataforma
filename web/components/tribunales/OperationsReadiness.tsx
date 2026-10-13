"use client";

import { operationalGates } from "@/lib/tribunales/capabilities";
export function OperationsReadiness() {
  const controls: Record<keyof typeof operationalGates, string> = {
    authenticatedServer: "Identidad verificada en servidor",
    resourceAuthorization: "Permisos por usuario, rol y asunto",
    verifiedRls: "Persistencia y RLS comprobadas",
    persistentAudit: "Auditoría persistente",
    transactionalVoting: "Votos únicos y concurrencia",
    distributedAbuseControl: "Control distribuido de abuso",
    humanPublicationReview: "Revisión humana de publicación",
  };
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-bold text-[#0A4E84]">
        Preparación de operación institucional
      </h2>
      <p>
        Los modelos de comités, priorización, deliberación y asistencia jurídica
        están preparados para integración. Los controles siguientes aún no han
        sido verificados para este módulo.
      </p>
      <dl className="grid gap-3 sm:grid-cols-2">
        {Object.entries(controls).map(([key, label]) => (
          <div
            key={key}
            className="rounded-xl border border-amber-200 bg-amber-50 p-3"
          >
            <dt className="font-bold">{label}</dt>
            <dd>Pendiente · operación bloqueada</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2">
        {[
          "Acreditar experto",
          "Asignar comité",
          "Emitir voto técnico",
          "Priorizar asunto",
          "Publicar dictamen",
          "Solicitar análisis IA",
        ].map((label) => (
          <button
            key={label}
            disabled
            type="button"
            title="Requiere controles institucionales verificados"
            className="rounded-xl bg-slate-200 p-3 text-slate-600"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm">
        No hay conteos de votación ni perfiles ficticios. Esta pantalla no
        habilita permisos y las rutas de operación rechazan las solicitudes.
      </p>
    </section>
  );
}
