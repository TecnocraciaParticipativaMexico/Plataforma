import type { EvidenceItem, SecurityReport } from "./types";

const encoder = new TextEncoder();

export async function sha256Buffer(buffer: BufferSource): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256Text(value: string): Promise<string> {
  return sha256Buffer(encoder.encode(value));
}

export async function sha256File(file: File): Promise<string> {
  return sha256Buffer(await file.arrayBuffer());
}

export function sanitizeLocation(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

export function normalizeReportForHash(report: SecurityReport, evidence: EvidenceItem[]): string {
  const payload = {
    category: report.category,
    approximateDate: report.approximateDate,
    location: sanitizeLocation(report.location),
    relatedPeopleInstitutions: report.relatedPeopleInstitutions.trim().replace(/\s+/g, " "),
    narrative: report.narrative.trim().replace(/\s+/g, " "),
    evidenceAbsenceExplanation: report.evidenceAbsenceExplanation.trim().replace(/\s+/g, " "),
    originalLanguage: report.originalLanguage.trim(),
    riskLevel: report.riskLevel,
    consentAccepted: report.consentAccepted,
    falseReportWarningAccepted: report.falseReportWarningAccepted,
    thirdPartyPrivacyAccepted: report.thirdPartyPrivacyAccepted,
    evidence: evidence
      .map((item) => ({
        localId: item.localId,
        name: item.name,
        size: item.size,
        type: item.type,
        sha256: item.sha256,
        sourceContext: item.sourceContext.trim(),
        localStatus: item.localStatus,
      }))
      .sort((a, b) => a.sha256.localeCompare(b.sha256)),
  };

  return JSON.stringify(payload);
}

export async function calculateDossierHash(report: SecurityReport, evidence: EvidenceItem[]): Promise<string> {
  return sha256Text(normalizeReportForHash(report, evidence));
}
