import { courts, publicUrl, type Court } from "./model.ts";

// Pure domain rules. Inputs must come from server-verified database records in production.
// These functions confer no authentication, accreditation or publication authority.
export type Expert = {
  userId: string;
  specialties: Court[];
  status: "pending" | "accredited" | "suspended";
  accreditedBy: string;
  validUntil: string;
  ethicsAccepted: boolean;
};
export type ConflictDeclaration = {
  userId: string;
  caseId: string;
  status: "clear" | "declared" | "recused";
  declaredAt: string;
  reviewedBy: string;
};
export type Assignment = {
  expert: Expert;
  conflict: ConflictDeclaration;
  kind: "member" | "alternate";
  termEndsAt: string;
  previousCaseId: string | null;
  weight: number;
};
export type Panel = {
  caseId: string;
  court: Court;
  mode: "standard" | "reinforced";
  assignments: Assignment[];
  thresholdPercent: number;
  configuredAt: string;
  deliberationStartsAt: string;
  crossReview: boolean;
  doubleMethodValidation: boolean;
};
export type ReasonedVote = {
  userId: string;
  caseId: string;
  panelVersion: number;
  position: "consistent" | "strong_inconsistency" | "abstain";
  opinion: "majority" | "concurrent" | "dissent";
  reasoning: string;
  sources: string[];
};
function instant(value: string): number {
  const n = Date.parse(value);
  if (!Number.isFinite(n)) throw new Error("Fecha de control inválida.");
  return n;
}
function identity(value: string) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  )
    throw new Error("Identidad de referencia inválida.");
}
export function validatePanel(panel: Panel, now: string): Panel {
  identity(panel.caseId);
  if (
    !courts.includes(panel.court) ||
    !["standard", "reinforced"].includes(panel.mode)
  )
    throw new Error("Ámbito o modo inválido.");
  if (
    !Number.isInteger(panel.thresholdPercent) ||
    panel.thresholdPercent < 60 ||
    panel.thresholdPercent > 70
  )
    throw new Error("Mayoría calificada fuera de 60–70%.");
  if (
    instant(panel.configuredAt) >= instant(panel.deliberationStartsAt) ||
    instant(panel.configuredAt) > instant(now)
  )
    throw new Error("La regla debe fijarse antes de deliberar.");
  const members = panel.assignments.filter((a) => a.kind === "member");
  const size = members.length;
  if (panel.mode === "standard" ? size < 9 || size > 15 : size < 5 || size > 7)
    throw new Error("Integración fuera del tamaño admitido.");
  if (
    panel.mode === "reinforced" &&
    (!panel.crossReview || !panel.doubleMethodValidation)
  )
    throw new Error("Faltan revisiones reforzadas.");
  if (
    panel.assignments.length > 30 ||
    new Set(panel.assignments.map((a) => a.expert.userId)).size !==
      panel.assignments.length
  )
    throw new Error("Integrantes duplicados o excesivos.");
  for (const a of panel.assignments) {
    identity(a.expert.userId);
    identity(a.expert.accreditedBy);
    identity(a.conflict.reviewedBy);
    if (
      !["member", "alternate"].includes(a.kind) ||
      a.expert.status !== "accredited" ||
      !a.expert.ethicsAccepted ||
      !a.expert.specialties.includes(panel.court)
    )
      throw new Error("Experto no acreditado para la materia.");
    if (
      a.expert.accreditedBy === a.expert.userId ||
      a.conflict.reviewedBy === a.expert.userId
    )
      throw new Error("No se admite autoacreditación ni autorrevisión.");
    if (
      a.conflict.userId !== a.expert.userId ||
      a.conflict.caseId !== panel.caseId ||
      a.conflict.status !== "clear"
    )
      throw new Error("Conflicto no liberado para el asunto.");
    if (
      instant(a.conflict.declaredAt) > instant(panel.configuredAt) ||
      instant(a.conflict.declaredAt) < instant(now) - 90 * 86400000
    )
      throw new Error(
        "Declaración de conflicto vencida o posterior a integración.",
      );
    if (
      instant(a.expert.validUntil) <= instant(now) ||
      instant(a.termEndsAt) <= instant(now)
    )
      throw new Error("Acreditación o periodo vencido.");
    if (a.previousCaseId === panel.caseId)
      throw new Error("Asignación repetida en el mismo asunto.");
    if (!Number.isFinite(a.weight) || a.weight < 0.8 || a.weight > 1.2)
      throw new Error("Ponderación fuera del límite técnico.");
  }
  return structuredClone(panel);
}
export function validateVote(
  vote: ReasonedVote,
  panel: Panel,
  version: number,
): ReasonedVote {
  const member = panel.assignments.find(
    (a) => a.expert.userId === vote.userId && a.kind === "member",
  );
  if (
    !member ||
    vote.caseId !== panel.caseId ||
    !Number.isInteger(version) ||
    version < 1 ||
    vote.panelVersion !== version
  )
    throw new Error("Voto fuera de asignación o versión.");
  if (
    !["consistent", "strong_inconsistency", "abstain"].includes(
      vote.position,
    ) ||
    !["majority", "concurrent", "dissent"].includes(vote.opinion)
  )
    throw new Error("Voto inválido.");
  if (
    typeof vote.reasoning !== "string" ||
    vote.reasoning.trim().length < 80 ||
    vote.reasoning.length > 12000 ||
    !Array.isArray(vote.sources) ||
    vote.sources.length < 1 ||
    vote.sources.length > 20 ||
    vote.sources.some((s) => !publicUrl(s) || s.length > 2000)
  )
    throw new Error("El voto requiere fuentes y razonamiento verificables.");
  return {
    userId: vote.userId,
    caseId: vote.caseId,
    panelVersion: vote.panelVersion,
    position: vote.position,
    opinion: vote.opinion,
    reasoning: vote.reasoning.trim(),
    sources: [...new Set(vote.sources)],
  };
}
export function evaluateConsensus(
  panel: Panel,
  votes: ReasonedVote[],
  version: number,
  now: string,
) {
  validatePanel(panel, now);
  if (instant(now) < instant(panel.deliberationStartsAt))
    throw new Error("Deliberación no iniciada.");
  if (new Set(votes.map((v) => v.userId)).size !== votes.length)
    throw new Error("Voto duplicado.");
  const checked = votes.map((v) => validateVote(v, panel, version));
  const members = panel.assignments.filter((a) => a.kind === "member");
  const support = checked.filter((v) => v.position === "strong_inconsistency");
  const totalWeight = members.reduce((n, a) => n + a.weight, 0);
  const supportWeight = support.reduce(
    (n, v) => n + members.find((a) => a.expert.userId === v.userId)!.weight,
    0,
  );
  const required = Math.ceil((members.length * panel.thresholdPercent) / 100);
  return {
    members: members.length,
    received: checked.length,
    supporting: support.length,
    required,
    complete: checked.length === members.length,
    // Both individual and weighted thresholds must pass; no casting vote.
    eligibleForHumanReview:
      checked.length === members.length &&
      support.length >= required &&
      supportWeight * 100 + 1e-9 >= totalWeight * panel.thresholdPercent,
    opinions: checked.map((v) => ({
      userId: v.userId,
      opinion: v.opinion,
      reasoning: v.reasoning,
      sources: v.sources,
    })),
    officialDecision: false as const,
  };
}
export type CasePhase =
  | "draft"
  | "admissibility"
  | "individual_analysis"
  | "cross_review"
  | "deliberation"
  | "human_publication_review"
  | "published";
export function nextPhase(
  current: CasePhase,
  evidence: {
    authenticated: boolean;
    authorized: boolean;
    expectedVersion: number;
    storedVersion: number;
    panelValid: boolean;
    individualComplete: boolean;
    crossReviewComplete: boolean;
    votesComplete: boolean;
    privacyReview: boolean;
    humanApproval: boolean;
  },
): CasePhase {
  if (!evidence.authenticated || !evidence.authorized)
    throw new Error("Operación no autorizada.");
  if (
    !Number.isInteger(evidence.expectedVersion) ||
    evidence.expectedVersion < 1 ||
    evidence.expectedVersion !== evidence.storedVersion
  )
    throw new Error("Conflicto de versión.");
  const phases: CasePhase[] = [
    "draft",
    "admissibility",
    "individual_analysis",
    "cross_review",
    "deliberation",
    "human_publication_review",
    "published",
  ];
  const index = phases.indexOf(current);
  if (index < 0 || index === phases.length - 1)
    throw new Error("Transición no permitida.");
  const checks = [
    true,
    evidence.panelValid,
    evidence.individualComplete,
    evidence.crossReviewComplete,
    evidence.votesComplete,
    evidence.privacyReview && evidence.humanApproval,
  ];
  if (!checks[index]) throw new Error("Revisión requerida pendiente.");
  return phases[index + 1];
}
export type PriorityCommand = {
  caseId: string;
  expectedVersion: number;
  idempotencyKey: string;
};
export function priorityCommand(input: unknown): PriorityCommand {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Solicitud inválida.");
  const obj = input as Record<string, unknown>;
  if (
    Object.keys(obj).some(
      (k) => !["caseId", "expectedVersion", "idempotencyKey"].includes(k),
    )
  )
    throw new Error("No se admite identidad, peso o autoridad del cliente.");
  identity(String(obj.caseId));
  identity(String(obj.idempotencyKey));
  if (
    !Number.isInteger(obj.expectedVersion) ||
    (obj.expectedVersion as number) < 1
  )
    throw new Error("Versión inválida.");
  return {
    caseId: String(obj.caseId),
    expectedVersion: obj.expectedVersion as number,
    idempotencyKey: String(obj.idempotencyKey),
  };
}
export function validateRotation(
  panel: Panel,
  previousPanels: Panel[],
  now: string,
) {
  validatePanel(panel, now);
  const current = panel.assignments
    .filter((a) => a.kind === "member")
    .map((a) => a.expert.userId)
    .sort();
  if (previousPanels.length > 100)
    throw new Error("Historial de rotación excesivo para validación aislada.");
  for (const prior of previousPanels) {
    if (prior.caseId === panel.caseId) continue; // Earlier versions belong to the same matter.
    const priorMembers = prior.assignments.filter((a) => a.kind === "member");
    if (
      priorMembers
        .map((a) => a.expert.userId)
        .sort()
        .join(",") === current.join(",")
    )
      throw new Error(
        "No se admite consolidar un bloque idéntico entre asuntos.",
      );
    if (
      priorMembers.some(
        (a) =>
          current.includes(a.expert.userId) &&
          instant(a.termEndsAt) > instant(now),
      )
    )
      throw new Error(
        "Integrante con asignación previa aún vigente: requiere rotación o suplencia.",
      );
  }
  return true;
}
export function substituteMember(
  panel: Panel,
  outgoingUserId: string,
  alternateUserId: string,
  votes: ReasonedVote[],
  now: string,
): Panel {
  validatePanel(panel, now);
  const outgoing = panel.assignments.find(
    (a) => a.expert.userId === outgoingUserId && a.kind === "member",
  );
  const incoming = panel.assignments.find(
    (a) => a.expert.userId === alternateUserId && a.kind === "alternate",
  );
  if (!outgoing || !incoming)
    throw new Error("Suplencia no acreditada para el asunto.");
  if (votes.length > 0 || instant(now) >= instant(panel.deliberationStartsAt))
    throw new Error(
      "Suplencia posterior al inicio exige nueva ronda versionada y revisión humana.",
    );
  const assignments = panel.assignments
    .filter((a) => a.expert.userId !== outgoingUserId)
    .map((a) =>
      a.expert.userId === alternateUserId
        ? { ...a, kind: "member" as const }
        : a,
    );
  return validatePanel({ ...panel, assignments }, now);
}
