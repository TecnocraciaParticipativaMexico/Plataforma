import type { EvidenceRecord, FiscaliaFormState } from "../types";

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function fallbackHash(input: string): string {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `local-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export async function sha256Text(input: string): Promise<string> {
  if (typeof window === "undefined" || !window.crypto?.subtle) return fallbackHash(input);
  const encoded = new TextEncoder().encode(input);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);
  return toHex(digest);
}

export async function sha256File(file: File): Promise<string> {
  if (typeof window === "undefined" || !window.crypto?.subtle) return fallbackHash(`${file.name}-${file.size}-${file.type}`);
  const digest = await window.crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return toHex(digest);
}

export async function hashCaseContent(form: FiscaliaFormState, evidence: EvidenceRecord[]): Promise<string> {
  const safePayload = JSON.stringify({
    identityMode: form.identityMode,
    factType: form.factType,
    date: form.date,
    time: form.time,
    state: form.state,
    municipality: form.municipality,
    involvedRoles: form.involvedRoles,
    narrative: form.narrative,
    evidenceReference: form.evidenceReference,
    riskLevel: form.riskLevel,
    evidenceHashes: evidence.map((item) => item.sha256),
  });
  return sha256Text(safePayload);
}
