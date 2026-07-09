import type { EvidenceRecord, FiscaliaFormState, StructuredCase } from "../types";
import { hashCaseContent } from "./hashService";

const riskyLanguage = ["culpable", "delincuente", "criminal", "condenar", "castigar", "sentencia"];

function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function splitEvidenceReferences(input: string): EvidenceRecord[] {
  return input
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((name, index) => ({
      id: createId("ev-ref"),
      name,
      size: 0,
      type: "referencia declarada",
      sha256: "pendiente de archivo local",
      registeredAt: new Date().toISOString(),
      source: `Referencia ${index + 1}`,
    }));
}

function inferClassification(form: FiscaliaFormState): string {
  const text = `${form.factType} ${form.narrative}`.toLowerCase();
  if (text.includes("recurso") || text.includes("presupuesto")) return "uso de recursos o gestion administrativa";
  if (text.includes("fuerza") || text.includes("detencion")) return "posible abuso en actuacion operativa";
  if (text.includes("discrimin")) return "trato diferenciado o discriminatorio";
  if (text.includes("omision") || text.includes("no atend")) return "omision institucional reportada";
  return "hecho civico a documentar";
}

function buildAlerts(form: FiscaliaFormState): string[] {
  const alerts = [
    "La IA ayuda a ordenar informacion. No sustituye asesoria legal ni determina responsabilidades.",
    "Evita incluir datos personales de terceros que no sean necesarios para comprender los hechos.",
  ];
  const lower = form.narrative.toLowerCase();
  if (riskyLanguage.some((word) => lower.includes(word))) {
    alerts.push("Se detecto lenguaje que podria afirmar responsabilidades. Considera describir hechos observables.");
  }
  if (form.narrative.length < 120) alerts.push("La narrativa es breve; agrega modo, tiempo, lugar y contexto si lo tienes.");
  if (!form.privacyConsent) alerts.push("Falta confirmar consentimiento de privacidad antes de compartir o imprimir.");
  return alerts;
}

export async function structureCitizenCase(form: FiscaliaFormState, localEvidence: EvidenceRecord[]): Promise<StructuredCase> {
  const referencedEvidence = splitEvidenceReferences(form.evidenceReference);
  const evidence = [...localEvidence, ...referencedEvidence];
  const contentHash = await hashCaseContent(form, evidence);
  const folio = `FFC-${new Date().getFullYear()}-${contentHash.slice(0, 8).toUpperCase()}`;
  const timestamp = new Date().toISOString();
  const location = [form.municipality, form.state].filter(Boolean).join(", ") || "Ubicacion no especificada";

  return {
    folio,
    timestamp,
    version: 1,
    contentHash,
    summary: `${form.factType} reportado en ${location}. El expediente ciudadano organiza narrativa, roles referidos, evidencia e historial local para revision civica o asesoria.`,
    structuredNarrative: form.narrative.trim(),
    preliminaryClassification: inferClassification(form),
    timeline: [
      {
        id: createId("tl"),
        label: "Hecho principal reportado",
        date: form.date,
        time: form.time,
        detail: form.narrative.trim() || "Narrativa pendiente.",
      },
      {
        id: createId("tl"),
        label: "Registro ciudadano",
        date: timestamp.slice(0, 10),
        time: timestamp.slice(11, 16),
        detail: "Se estructuro el expediente ciudadano con IA local/mock.",
      },
    ],
    roles: form.involvedRoles
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((description, index) => ({
        id: createId("role"),
        label: `Rol referido ${index + 1}`,
        description,
        caution: "Referencia descriptiva; no imputa responsabilidad.",
      })),
    evidence,
    checklist: [
      { id: "tipo", label: "Tipo de hecho capturado", complete: Boolean(form.factType), hint: "Selecciona el tipo mas cercano." },
      { id: "fecha", label: "Fecha y hora aproximadas", complete: Boolean(form.date && form.time), hint: "Usa aproximaciones si no tienes precision." },
      { id: "lugar", label: "Estado y municipio/localidad", complete: Boolean(form.state && form.municipality), hint: "Evita ubicaciones personales innecesarias." },
      { id: "narrativa", label: "Narrativa con contexto suficiente", complete: form.narrative.length >= 120, hint: "Incluye que ocurrio, quien participo y como se documento." },
      { id: "evidencia", label: "Evidencia referenciada o local", complete: evidence.length > 0, hint: "Puedes agregar archivos o referencias." },
      { id: "privacidad", label: "Consentimiento de privacidad", complete: form.privacyConsent, hint: "Confirma antes de imprimir o compartir." },
    ],
    alerts: buildAlerts(form),
    suggestedNextStep:
      "Revisar el documento con una persona abogada, comite ciudadano o acompanante de confianza antes de presentarlo ante autoridades competentes.",
    trace: [
      { id: createId("trace"), timestamp, label: "Expediente estructurado", detail: "Se genero folio ciudadano, resumen, cronologia y hash local del contenido." },
      { id: createId("trace"), timestamp, label: "IA local/mock aplicada", detail: "Se aplicaron reglas heuristicas sin API externa ni llaves privadas." },
    ],
  };
}
