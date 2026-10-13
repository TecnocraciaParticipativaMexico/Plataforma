export const courts = [
  "Constitucional",
  "Electoral",
  "Administrativo y de Política Pública",
] as const;
export const layers = [
  "Competencia y procedimiento",
  "Motivación y fundamentación",
  "Precedentes y doctrina",
  "Proporcionalidad y razonabilidad",
  "Derechos humanos y compromisos internacionales",
] as const;
export type Court = (typeof courts)[number];
export type Finding = {
  layer: string;
  source: string;
  reasoning: string;
  result: "Pendiente" | "Consistente" | "Requiere contraste";
  reviewState?: "Pendiente" | "Preparada para revisión" | "Requiere aclaración";
  reviewNote?: string;
};
export type Dossier = {
  title: string;
  court: Court;
  issuer: string;
  date: string;
  source: string;
  summary: string;
  impact: string;
  ongoing: boolean;
  findings: Finding[];
};
export function emptyDossier(): Dossier {
  return {
    title: "",
    court: courts[0],
    issuer: "",
    date: "",
    source: "",
    summary: "",
    impact: "",
    ongoing: false,
    findings: layers.map((layer) => ({
      layer,
      source: "",
      reasoning: "",
      result: "Pendiente",
    })),
  };
}
export function publicUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return (
      u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      u.hostname.includes(".") &&
      !/^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(
        u.hostname,
      ) &&
      !u.hostname.includes(":")
    );
  } catch {
    return false;
  }
}
export function validateDossier(input: unknown): Dossier {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Expediente inválido.");
  const d = input as Record<string, unknown>;
  const text = (key: string, max: number) => {
    const v = d[key];
    if (typeof v !== "string" || !v.trim() || v.length > max)
      throw new Error(`Revisa el campo ${key} (máximo ${max} caracteres).`);
    return v.trim();
  };
  if (!courts.includes(d.court as Court))
    throw new Error("Tribunal no admitido.");
  const source = text("source", 2000);
  if (!publicUrl(source))
    throw new Error(
      "La fuente debe ser una URL pública HTTPS sin credenciales.",
    );
  const date = text("date", 10);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date ||
    date > new Date().toISOString().slice(0, 10)
  )
    throw new Error("Fecha de resolución inválida o futura.");
  if (
    typeof d.ongoing !== "boolean" ||
    !Array.isArray(d.findings) ||
    d.findings.length !== layers.length
  )
    throw new Error("Matriz incompleta.");
  const findings = d.findings.map((f: unknown, i: number): Finding => {
    if (!f || typeof f !== "object") throw new Error("Fila inválida.");
    const row = f as Finding;
    if (
      row.layer !== layers[i] ||
      !["Pendiente", "Consistente", "Requiere contraste"].includes(
        row.result,
      ) ||
      typeof row.source !== "string" ||
      row.source.length > 2000 ||
      typeof row.reasoning !== "string" ||
      row.reasoning.length > 6000
    )
      throw new Error("Fila de matriz inválida.");
    if (row.source && !publicUrl(row.source))
      throw new Error("La referencia de la matriz debe ser HTTPS pública.");
    if (
      row.result !== "Pendiente" &&
      (!row.source.trim() || row.reasoning.trim().length < 30)
    )
      throw new Error(
        "Cada valoración requiere fuente y al menos 30 caracteres de razonamiento.",
      );
    if (
      row.reviewState !== undefined &&
      !["Pendiente", "Preparada para revisión", "Requiere aclaración"].includes(
        row.reviewState,
      )
    )
      throw new Error(
        "No se admite validación colegiada desde un borrador personal.",
      );
    if (
      row.reviewNote !== undefined &&
      (typeof row.reviewNote !== "string" || row.reviewNote.length > 2000)
    )
      throw new Error("Nota de revisión inválida.");
    if (
      row.reviewState === "Preparada para revisión" &&
      (!row.source.trim() || row.reasoning.trim().length < 30)
    )
      throw new Error(
        "Preparar revisión requiere fuente y justificación técnica.",
      );
    return {
      layer: layers[i],
      source: row.source.trim(),
      reasoning: row.reasoning.trim(),
      result: row.result,
      ...(row.reviewState !== undefined
        ? { reviewState: row.reviewState }
        : {}),
      ...(row.reviewNote !== undefined
        ? { reviewNote: row.reviewNote.trim() }
        : {}),
    };
  });
  return {
    title: text("title", 200),
    court: d.court as Court,
    issuer: text("issuer", 200),
    date,
    source,
    summary: text("summary", 12000),
    impact: text("impact", 4000),
    ongoing: d.ongoing,
    findings,
  };
}
export async function fingerprint(dossier: Dossier): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(JSON.stringify(validateDossier(dossier))),
  );
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}
export function report(d: Dossier, hash: string): string {
  return [
    "TECNOCRACIA PARTICIPATIVA MÉXICO 2030",
    "Módulo 07 · Tribunales de Alta Integridad",
    "BORRADOR PERSONAL · NO VALIDADO NI PUBLICADO · NO VINCULANTE",
    d.title,
    `Tribunal: ${d.court}\nEmisor: ${d.issuer}\nFecha: ${d.date}\nFuente: ${d.source}`,
    `Síntesis: ${d.summary}`,
    `Impacto estructural: ${d.impact}`,
    d.ongoing
      ? "Asunto en curso: no interferir con actos procesales."
      : "Resolución aportada para contraste ciudadano.",
    ...d.findings.map(
      (f) =>
        `${f.layer}\nEstado: ${f.result}\nRevisión personal: ${f.reviewState || "Pendiente"}\nNota: ${f.reviewNote || "Pendiente"}\nReferencia: ${f.source || "Pendiente"}\nRazonamiento aportado: ${f.reasoning || "Pendiente"}`,
    ),
    `SHA-256 del contenido normalizado: ${hash}`,
    "Esta huella permite detectar cambios; no acredita autenticidad, sello de tiempo ni registro inmutable. No se utilizó IA. Requiere revisión humana, conflictos de interés y deliberación colegiada antes de cualquier dictamen.",
  ].join("\n\n");
}
