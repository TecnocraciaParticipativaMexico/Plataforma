import { createInstitutionalPdf, downloadPdf, type InstitutionalPdfSection } from "@/lib/pdf/institutionalDocument";
import { createSha256 } from "./hash";
import type { CommitteeReview, HumanRightsCase, IntegrityRecord } from "./types";

const moduleLabel = "Módulo 04";
const moduleName = "Derechos Humanos y Contrapeso Institucional";
const legalBasis =
  "Se sustenta principalmente en los artículos 1, 6, 8, 16 y 20 de la Constitución Política de los Estados Unidos Mexicanos; en la Ley General de Víctimas, la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y los tratados internacionales de derechos humanos aplicables. Facilita documentación y participación ciudadana; no sustituye denuncias, investigaciones, peritajes, resoluciones ni procedimientos ante autoridades competentes.";

function statusLabel(status: HumanRightsCase["status"]) {
  const labels: Record<HumanRightsCase["status"], string> = {
    borrador: "Borrador",
    registrado: "Registrado",
    revision_pendiente: "Revisión pendiente",
    version_publica: "Versión pública",
    dossier_preparado: "Dossier preparado",
  };
  return labels[status];
}

function privacyLabel(level: HumanRightsCase["privacyLevel"]) {
  const labels: Record<HumanRightsCase["privacyLevel"], string> = {
    reservado: "Reservado",
    anonimizado: "Anonimizado",
    publico: "Público",
  };
  return labels[level];
}

function versionForCase(caseItem: HumanRightsCase) {
  if (caseItem.status === "dossier_preparado") return "dossier-tecnico-1";
  return caseItem.publicVersionReady ? "publica-demo-1" : "borrador-demo-1";
}

function rightsForCase(caseItem: HumanRightsCase) {
  const text = `${caseItem.caseType} ${caseItem.summary}`.toLowerCase();
  const rights = new Set<string>(["Derecho a la verdad y acceso a información", "Derecho a la protección de datos personales"]);

  if (text.includes("fuerza") || text.includes("integridad")) rights.add("Derecho a la integridad personal");
  if (text.includes("detencion") || text.includes("libertad")) rights.add("Derecho a la libertad personal y debido proceso");
  if (text.includes("periodista") || text.includes("informacion")) rights.add("Libertad de expresión y derecho a documentar");
  if (text.includes("defensor")) rights.add("Derechos de personas defensoras de derechos humanos");
  if (text.includes("omision") || text.includes("atencion")) rights.add("Derecho de acceso a la justicia y debida diligencia");
  if (text.includes("protesta")) rights.add("Derecho de reunión y protesta pacífica");

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
  if (!related.length) return ["No existen observaciones de comité registradas para este expediente demostrativo."];

  return related.flatMap((review) => [
    `Revisión ${review.id}. Estado: ${review.status.replace("_", " ")}. Siguiente paso: ${review.nextStep}`,
    ...review.observations.map((observation) => `Observación: ${observation}`),
  ]);
}

function internationalDossierNote(caseItem: HumanRightsCase) {
  return caseItem.status === "dossier_preparado"
    ? "El expediente fue marcado localmente como dossier preparado para organizar una versión técnica con alcance internacional."
    : "El expediente puede evolucionar a dossier internacional cuando exista versión pública anonimizada y revisión metodológica suficiente.";
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
        "Este expediente técnico ciudadano organiza información demostrativa con criterios de privacidad, trazabilidad local y no revictimización.",
      ],
    },
    {
      title: "Narrativa de hechos",
      items: timelineItems(caseItem),
    },
    {
      title: "Información general",
      fields: [
        { label: "Ubicación", value: caseItem.location },
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
      title: "Cronología del expediente",
      items: timelineItems(caseItem),
    },
    {
      title: "Observaciones del Comité de Ciudadanos Expertos",
      items: committeeItems(caseItem, reviews),
    },
    {
      title: "Fundamento legal",
      body: [legalBasis],
    },
    {
      title: "Avisos legales",
      body: [
        "Tecnocracia Participativa no sustituye autoridades, tribunales, ministerios públicos, comisiones oficiales, peritajes, asesoría jurídica ni representación legal.",
        "Este documento no acredita por sí mismo hechos, responsabilidades ni efectos procesales. Su finalidad es ordenar documentación ciudadana y facilitar revisión técnica posterior.",
      ],
    },
  ];

  const fileName = `${caseItem.id.toLowerCase()}-expediente-tecnico.pdf`;
  const bytes = await createInstitutionalPdf({
    fileName,
    title: "Expediente Técnico Ciudadano",
    subtitle: "Documentación Ciudadana de Posibles Violaciones a Derechos Humanos",
    moduleLabel,
    moduleName,
    folio: caseItem.id,
    date: caseItem.date,
    version,
    classification,
    generatedAt,
    integrityHash,
    integrityDescription:
      "Huella SHA-256 de los datos estructurados de esta versión del expediente. Es una referencia de integridad del contenido base utilizado para generar este documento; no constituye certificación oficial, firma electrónica gubernamental ni cadena de custodia legal.",
    sections,
    logoUrl: "/branding/logo-tecnocracia.png",
  });

  const integrity: IntegrityRecord = {
    folio: caseItem.id,
    version,
    hash: integrityHash,
    generatedAt,
    note: "SHA-256 de los datos estructurados de esta versión del expediente. No constituye certificación oficial, firma gubernamental ni cadena de custodia legal.",
  };

  return { bytes, fileName, integrity };
}

export async function downloadHumanRightsTechnicalPdf(caseItem: HumanRightsCase, reviews: CommitteeReview[]) {
  const result = await buildHumanRightsTechnicalPdf(caseItem, reviews);
  downloadPdf(result.bytes, result.fileName);
  return result.integrity;
}
