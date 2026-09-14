import "server-only";

import { SecurityHttpError } from "./authCore";

export const MAX_EVIDENCE_BYTES = 10 * 1024 * 1024;

type EvidenceType = { mime: "image/jpeg" | "image/png" | "application/pdf"; extension: ".jpg" | ".jpeg" | ".png" | ".pdf" };

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

export function detectEvidenceType(bytes: Uint8Array, originalName: string): EvidenceType {
  const lowerName = originalName.toLowerCase();
  if (startsWith(bytes, [0xff, 0xd8, 0xff]) && (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg"))) {
    return { mime: "image/jpeg", extension: lowerName.endsWith(".jpeg") ? ".jpeg" : ".jpg" };
  }
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]) && lowerName.endsWith(".png")) {
    return { mime: "image/png", extension: ".png" };
  }
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]) && lowerName.endsWith(".pdf")) {
    return { mime: "application/pdf", extension: ".pdf" };
  }
  throw new SecurityHttpError(400, "Unsupported or inconsistent evidence file");
}

export async function validateEvidenceFile(file: File) {
  if (file.size < 1 || file.size > MAX_EVIDENCE_BYTES) {
    throw new SecurityHttpError(400, "Invalid evidence size");
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.byteLength !== file.size || bytes.byteLength > MAX_EVIDENCE_BYTES) {
    throw new SecurityHttpError(400, "Invalid evidence size");
  }
  const detected = detectEvidenceType(bytes, file.name);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const sha256 = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return { bytes, sha256, mime: detected.mime, size: bytes.byteLength };
}

export type EvidenceScanResult = { state: "pending_scan"; scanner: "not_configured" };

export async function queueEvidenceScan(): Promise<EvidenceScanResult> {
  return { state: "pending_scan", scanner: "not_configured" };
}
