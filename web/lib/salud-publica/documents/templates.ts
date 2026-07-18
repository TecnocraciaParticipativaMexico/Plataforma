import { documentTypeLabels, HEALTH_LIMITATION_NOTICE, OFFICIAL_MODULE_NAME } from "../constants";
import type { HealthCase, HealthDocument, HealthDocumentType } from "../types";

export function buildDocument(caseItem: HealthCase, type: HealthDocumentType): HealthDocument {
  return {
    id: `doc-${type}-${caseItem.id}`,
    caseId: caseItem.id,
    type,
    title: documentTypeLabels[type],
    createdAt: new Date().toISOString(),
    version: caseItem.versions[0]?.version ?? "0.1",
    status: "generado",
    hash: "pendiente-sha-256-navegador",
  };
}

export function documentSections(caseItem: HealthCase, type: HealthDocumentType) {
  return [
    { title: "Modulo", body: OFFICIAL_MODULE_NAME },
    { title: "Advertencia", body: HEALTH_LIMITATION_NOTICE },
    { title: "Folio y estado", body: `${caseItem.folio} / ${caseItem.status} / version ${caseItem.versions[0]?.version ?? "0.1"}` },
    { title: "Informacion declarada", body: [caseItem.reason, ...caseItem.symptoms, ...caseItem.declaredHistory].join(". ") },
    { title: "Origen de información", body: "Declarada por el ciudadano, generada por reglas locales o sugerida por asistente mock. No validada clínicamente." },
    {
      title: documentTypeLabels[type],
      body:
        type === "plan_preventivo"
          ? "Incluye acciones generales de observacion, preparacion de consulta y autocuidado no farmacologico cuando procede."
          : type === "resumen_teleorientacion"
            ? "Resume una solicitud demostrativa de teleorientación, sin videollamada real ni prestadores conectados."
          : type === "reporte_abasto" || type === "ficha_incidencia"
            ? "Resume información demostrativa o reportada por ciudadanía que debe verificarse con la unidad médica correspondiente."
          : type === "evaluacion_politica"
            ? "Documento de evaluación ciudadana demostrativa. No sustituye auditorías ni evaluaciones institucionales."
          : type === "informe_impacto"
            ? "Tablero agregado y no identificable sobre acceso, barreras, continuidad y percepcion ciudadana."
          : type === "seguimiento_compromiso"
            ? "Seguimiento ciudadano demostrativo de compromisos publicos vinculados a salud."
          : type === "ficha_solidaria" || type === "transparencia_comunitaria"
            ? "Iniciativa solidaria voluntaria, transparente y complementaria. No maneja dinero real ni datos bancarios."
          : "Documento preparado para impresión ciudadana y consulta profesional informada.",
    },
    { title: "Historial", body: caseItem.timeline.map((event) => `${event.timestamp}: ${event.description}`).join(" | ") },
  ];
}
