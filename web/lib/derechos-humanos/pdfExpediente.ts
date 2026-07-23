import { createInstitutionalPdf, downloadPdf, type InstitutionalPdfSection } from "@/lib/pdf/institutionalDocument";
import { createSha256 } from "./hash";
import type { CommitteeReview, HumanRightsCase, IntegrityRecord } from "./types";

const moduleLabel = "Modulo 04";
const moduleName = "Derechos Humanos y Contrapeso Institucional";
const legalBasis =
  "Se sustenta principalmente en los articulos 1, 6, 8, 16 y 20 de la Constitucion Politica de los Estados Unidos Mexicanos; en la Ley General de Victimas, la Ley General de Proteccion de Datos Personales en Posesion de Sujetos Obligados y los tratados internacionales de derechos humanos aplicables. Facilita documentacion y participacion ciudadana; no sustituye denuncias, investigaciones, peritajes, resoluciones ni procedimientos ante autoridades competentes.";

function statusLabel(status: HumanRightsCase["status"]) {
  const labels: Record<HumanRightsCase["status"], string> = {
    borrador: "Borrador",
    registrado: "Registrado",
    revision_pendiente: "Revision pendiente",
    version_publica: "Version publica",
    dossier_preparado: "Dossier preparado",
  };
  return labels[status];
}

function privacyLabel(level: HumanRightsCase["privacyLevel"]) {
  const labels: Record<HumanRightsCase["privacyLevel"], string> = {
    reservado: "Reservado",
    anonimizado: "Anonimizado",
    publico: "Publico",
  };
  return labels[level];
}

function versionForCase(caseItem: HumanRightsCase) {
  if (caseItem.status === "dossier_preparado") return "dossier-tecnico-1";
  return caseItem.publicVersionReady ? "publica-demo-1" : "borrador-demo-1";
}

function rightsForCase(caseItem: HumanRightsCase) {
  const text = `${caseItem.caseType} ${caseItem.summary}`.toLowerCase();
  const rights = new Set<string>(["Derecho a la verdad y acceso a informacion", "Derecho a la proteccion de datos personales"]);

  if (text.includes("fuerza") || text.includes("integridad")) rights.add("Derecho a la integridad personal");
  if (text.includes("detencion") || text.includes("libertad")) rights.add("Derecho a la libertad personal y debido proceso");
  if (text.includes("periodista") || text.includes("informacion")) rights.add("Libertad de expresion y derecho a documentar");
  if (text.includes("defensor")) rights.add("Derechos de personas defensoras de derechos humanos");
  if (text.includes("omision") || text.includes("atencion")) rights.add("Derecho de acceso a la justicia y debida diligencia");
  if (text.includes("protesta")) rights.add("Derecho de reunion y protesta pacifica");

  return Array.from(rights);
}

function evidenceItems(caseItem: HumanRightsCase) {
  if (!caseItem.evidence.length) return ["Sin evidencias adjuntas. El expediente conserva solo referencias ciudadanas pendientes de integrar."];
  return caseItem.evidence.map((item) => `${item.label} (${item.type}) - ${item.description}. Recibido: ${item.receivedAt}. Referencia local: ${item.localHash}. ${item.privacyNote}`);
}

function timelineItems(caseItem: HumanRightsCase) {
  return caseItem.timeline.map((entry) => `${entry.date} - ${entry.label}: ${entry.detail}`);
}

function committeeItems(caseItem: HumanRightsCase, reviews: CommitteeReview[]) {
  const related = reviews.filter((review) => review.caseId === caseItem.id);
  if (!related.length) return ["No existen observaciones de comite registradas para este expediente demostrativo."];

  return related.flatMap((review) => [
    `Revision ${review.id}. Estado: ${review.status.replace("_", " ")}. Siguiente paso: ${review.nextStep}`,
    ...review.observations.map((observation) => `Observacion: ${observation}`),
  ]);
}

function internationalDossierNote(caseItem: HumanRightsCase) {
  return caseItem.status === "dossier_preparado"
    ? "El expediente fue marcado localmente como dossier preparado para organizar una version tecnica con alcance internacional."
    : "El expediente puede evolucionar a dossier internacional cuando exista version publica anonimizada y revision metodologica suficiente.";
}

export async function buildHumanRightsTechnicalPdf(caseItem: HumanRightsCase, reviews: CommitteeReview[]) {
  const generatedAt = new Date().toISOString();
  const version = versionForCase(caseItem);
  const classification = privacyLabel(caseItem.privacyLevel);
  const integritySource = {
    module: moduleLabel,
    caseId: caseItem.id,
    title: caseItem.title,
    summary: caseItem.summary,
    evidence: caseItem.evidence,
    timeline: caseItem.timeline,
    generatedAt,
    version,
    classification,
  };
  const integrityHash = await createSha256(JSON.stringify(integritySource));

  const sections: InstitutionalPdfSection[] = [
    {
      title: "Resumen Ejecutivo",
      body: [
        caseItem.summary,
        internationalDossierNote(caseItem),
        "Este expediente tecnico ciudadano organiza informacion demostrativa con criterios de privacidad, trazabilidad local y no revictimizacion.",
      ],
    },
    {
      title: "Narrativa de hechos",
      items: timelineItems(caseItem),
    },
    {
      title: "Informacion general",
      fields: [
        { label: "Ubicacion", value: caseItem.location },
        { label: "Periodo", value: caseItem.date },
        { label: "Tipo de hecho", value: caseItem.caseType },
        { label: "Grupo afectado", value: caseItem.affectedGroup },
        { label: "Estado", value: statusLabel(caseItem.status) },
        { label: "Nivel de privacidad", value: classification },
      ],
    },
    {
      title: "Derechos posiblemente afectados",
      items: rightsForCase(caseItem),
    },
    {
      title: "Evidencias registradas",
      body: ["No se incrustan archivos. Esta seccion conserva solo referencias y notas de privacidad."],
      items: evidenceItems(caseItem),
    },
    {
      title: "Cronologia del expediente",
      items: timelineItems(caseItem),
    },
    {
      title: "Observaciones del Comite de Ciudadanos Expertos",
      items: committeeItems(caseItem, reviews),
    },
    {
      title: "Fundamento legal",
      body: [legalBasis],
    },
    {
      title: "Avisos legales",
      body: [
        "Tecnocracia Participativa no sustituye autoridades, tribunales, ministerios publicos, comisiones oficiales, peritajes, asesoria juridica ni representacion legal.",
        "Este documento no acredita por si mismo hechos, responsabilidades ni efectos procesales. Su finalidad es ordenar documentacion ciudadana y facilitar revision tecnica posterior.",
      ],
    },
  ];

  const fileName = `${caseItem.id.toLowerCase()}-expediente-tecnico.pdf`;
  const bytes = await createInstitutionalPdf({
    fileName,
    title: "Expediente Tecnico Ciudadano",
    subtitle: "Documentacion Ciudadana de Posibles Violaciones a Derechos Humanos",
    moduleLabel,
    moduleName,
    folio: caseItem.id,
    date: caseItem.date,
    version,
    classification,
    generatedAt,
    integrityHash,
    sections,
    logoUrl: "/branding/logo-tecnocracia.png",
  });

  const integrity: IntegrityRecord = {
    folio: caseItem.id,
    version,
    hash: integrityHash,
    generatedAt,
    note: "SHA-256 local del expediente tecnico. No constituye certificacion oficial, firma gubernamental ni cadena de custodia legal.",
  };

  return { bytes, fileName, integrity };
}

export async function downloadHumanRightsTechnicalPdf(caseItem: HumanRightsCase, reviews: CommitteeReview[]) {
  const result = await buildHumanRightsTechnicalPdf(caseItem, reviews);
  downloadPdf(result.bytes, result.fileName);
  return result.integrity;
}
