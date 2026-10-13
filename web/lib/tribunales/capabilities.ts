export const operationalGates = Object.freeze({
  authenticatedServer: false,
  resourceAuthorization: false,
  verifiedRls: false,
  persistentAudit: false,
  transactionalVoting: false,
  distributedAbuseControl: false,
  humanPublicationReview: false,
});
export const blockedOperations = [
  "accreditation",
  "assignment",
  "deliberation",
  "technical_vote",
  "citizen_priority",
  "publication",
  "ai_analysis",
] as const;
// Closed unconditionally. No environment flag or browser state can activate this API.
export function unavailableOperation() {
  return {
    ok: false as const,
    code: "MODULE07_OPERATIONS_UNAVAILABLE",
    message:
      "Operación institucional deshabilitada hasta verificar identidad, permisos, RLS, concurrencia, auditoría y revisión humana.",
  };
}
