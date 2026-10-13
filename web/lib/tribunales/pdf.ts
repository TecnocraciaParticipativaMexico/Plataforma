import {
  createInstitutionalPdf,
  type InstitutionalPdfSection,
} from "../pdf/institutionalDocument.ts";
import { fingerprint, validateDossier, type Dossier } from "./model.ts";

// Bound paragraph sizes avoid passing unbounded user text into the shared paginator.
function paragraphs(value: string): string[] {
  const parts: string[] = [];
  let remaining = value.trim();
  while (remaining.length > 240) {
    const space = remaining.lastIndexOf(" ", 240);
    const end = space > 0 ? space : 240;
    parts.push(remaining.slice(0, end));
    remaining = remaining.slice(end).trimStart();
  }
  if (remaining) parts.push(remaining);
  return parts.length ? parts : ["Pendiente"];
}
export async function buildTribunalesPdf(
  input: Dossier,
  localVersion = 1,
  logoUrl?: string,
) {
  const d = validateDossier(input);
  if (/[^\n\r\t\x20-\x7e\u00a1-\u00ff“”‘’•·–—]/.test(JSON.stringify(d)))
    throw new Error(
      "El PDF institucional usa tipografía latina. Para conservar caracteres de otros alfabetos, exporta JSON o TXT; no se omite contenido silenciosamente.",
    );
  if (!Number.isInteger(localVersion) || localVersion < 1 || localVersion > 50)
    throw new Error("Versión local inválida.");
  const hash = await fingerprint(d);
  const sections: InstitutionalPdfSection[] = [
    {
      title: "Alcance y revisión pendiente",
      body: [
        "BORRADOR PERSONAL - NO VALIDADO NI PUBLICADO - NO VINCULANTE",
        "Este informe organiza información aportada por el usuario. No emite conclusiones judiciales ni incorpora análisis de IA. Requiere revisión de fuentes, metodología, conflictos de interés y deliberación colegiada.",
        ...paragraphs(d.title),
      ],
    },
    {
      title: "Resolución pública",
      fields: [
        { label: "Tribunal", value: d.court },
        { label: "Órgano emisor", value: d.issuer },
        { label: "Fecha", value: d.date },
      ],
      body: paragraphs(`Fuente pública: ${d.source}`),
    },
    { title: "Síntesis documental", body: paragraphs(d.summary) },
    {
      title: "Impacto institucional",
      body: [
        ...paragraphs(d.impact),
        d.ongoing
          ? "Asunto en curso: no interferir con actos procesales ni sustituir resoluciones jurisdiccionales."
          : "Resolución aportada para contraste ciudadano.",
      ],
    },
    ...d.findings.map((f, i) => ({
      title: `Capa ${i + 1} - ${f.layer}`,
      body: [
        `Valoración provisional aportada: ${f.result}. Revisión colegiada pendiente.`,
        `Preparación personal: ${f.reviewState || "Pendiente"}.`,
        ...paragraphs(f.reviewNote || "Nota de preparación pendiente."),
        ...paragraphs(`Referencia: ${f.source || "Pendiente"}`),
        ...paragraphs(f.reasoning || "Razonamiento pendiente."),
      ],
    })),
    {
      title: "Fundamento y límites",
      body: [
        "Artículos 6º y 7º constitucionales: acceso a información y difusión de ideas. Artículo 8º: petición pacífica y respetuosa. No confieren jurisdicción a la plataforma ni facultad de revocar resoluciones.",
        "Fuente normativa: https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf",
        "No utilizar datos personales sensibles. No es una denuncia, recurso legal, sentencia ni dictamen oficial. Las referencias deben verificarse por personas expertas.",
      ],
    },
  ];
  return createInstitutionalPdf({
    fileName: "tribunales-informe.pdf",
    title: "Informe de contraste",
    subtitle: "Tribunales de Alta Integridad - borrador personal",
    moduleLabel: "Módulo 07",
    moduleName: "Tribunales de Alta Integridad",
    folio: `LOCAL-${hash.slice(0, 12).toUpperCase()}`,
    date: d.date,
    version: `Local ${localVersion}`,
    classification: "Borrador personal",
    generatedAt: new Date().toISOString(),
    integrityHash: hash,
    integrityDescription:
      "SHA-256 del expediente JSON normalizado, no de los bytes PDF. No acredita autenticidad, firma digital, sello de tiempo certificado ni registro institucional inmutable. El folio y la versión son referencias locales.",
    sections: sections.map((section) => ({ ...section, keepTogether: true })),
    logoUrl,
  });
}
