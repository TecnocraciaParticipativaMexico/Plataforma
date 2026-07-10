import type { CasePriority, CaseStatus, PrivacyLevel, SearchCase } from "./types";

export const statusLabels: Record<CaseStatus, string> = {
  draft: "Borrador",
  active: "Busqueda activa",
  committee_review: "Revision de comite",
  institutional_followup: "Seguimiento institucional",
  paused: "En pausa",
  closed: "Cerrado",
};

export const priorityLabels: Record<CasePriority, string> = {
  critical: "Critica",
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

export const privacyLabels: Record<PrivacyLevel, string> = {
  family_private: "Privado familiar",
  collective_shared: "Compartido con colectivo",
  committee_shared: "Compartido con comite",
  public_summary: "Resumen publico",
};

export function createId(prefix: string): string {
  const cryptoObject = globalThis.crypto;
  if (cryptoObject?.randomUUID) return `${prefix}-${cryptoObject.randomUUID().slice(0, 8)}`;
  return `${prefix}-${Date.now().toString(36)}`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(value));
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export async function sha256Text(value: string): Promise<string> {
  if (!globalThis.crypto?.subtle) return `demo-${value.length.toString(16)}-${Date.now().toString(36)}`;
  const encoded = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256File(file: File): Promise<string> {
  if (!globalThis.crypto?.subtle) return `demo-file-${file.size.toString(16)}-${Date.now().toString(36)}`;
  const digest = await globalThis.crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function summarizeLocally(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (!clean) return "Agrega una narrativa para generar un resumen demostrativo.";
  const sentences = clean.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 2).join(" ").slice(0, 260);
}

export function extractMentionedDates(text: string): string[] {
  const matches = text.match(/\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/g);
  return Array.from(new Set(matches ?? []));
}

export function suggestTags(caseDraft: Pick<SearchCase, "narrative" | "state" | "municipality" | "lastSeenPlace">): string[] {
  const text = `${caseDraft.narrative} ${caseDraft.state} ${caseDraft.municipality} ${caseDraft.lastSeenPlace}`.toLowerCase();
  const suggestions = [
    ["transporte", "transporte"],
    ["carretera", "carretera"],
    ["trabajo", "salida de trabajo"],
    ["testigo", "testimonio"],
    ["hospital", "salud"],
    ["detencion", "gestion institucional"],
    ["llamada", "comunicacion"],
  ] as const;
  return suggestions.filter(([needle]) => text.includes(needle)).map(([, tag]) => tag).slice(0, 5);
}
