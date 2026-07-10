export type CaseStatus = "draft" | "active" | "committee_review" | "institutional_followup" | "paused" | "closed";

export type CasePriority = "critical" | "high" | "medium" | "low";

export type PrivacyLevel = "family_private" | "collective_shared" | "committee_shared" | "public_summary";

export type EventType = "report" | "sighting" | "evidence" | "institutional_action" | "committee" | "document" | "privacy" | "follow_up";

export type EvidenceCategory = "document" | "image" | "audio_note" | "message" | "location_context" | "other";

export type ReviewStatus = "pending" | "accepted" | "in_analysis" | "observations" | "concluded";

export type GeneticReferenceStatus = "consent_pending" | "registered" | "comparison_requested" | "in_custody" | "closed";

export type AlertSeverity = "info" | "warning" | "urgent" | "success";

export type SearchCase = {
  id: string;
  folio: string;
  protectedName: boolean;
  personName: string;
  displayName: string;
  age: number | null;
  gender: string;
  status: CaseStatus;
  priority: CasePriority;
  privacyLevel: PrivacyLevel;
  state: string;
  municipality: string;
  collective: string;
  committeeId: string | null;
  summary: string;
  narrative: string;
  lastSeenDate: string;
  lastSeenPlace: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  relatedCaseIds: string[];
};

export type CaseEvent = {
  id: string;
  caseId: string;
  type: EventType;
  title: string;
  description: string;
  occurredAt: string;
  actorRole: string;
  privacyLevel: PrivacyLevel;
  relatedEvidenceIds: string[];
};

export type EvidenceItem = {
  id: string;
  caseId: string;
  name: string;
  category: EvidenceCategory;
  fileType: string;
  sizeBytes: number;
  addedAt: string;
  privacyLevel: PrivacyLevel;
  reviewStatus: ReviewStatus;
  localStatus: string;
  hash?: string;
  note: string;
};

export type InstitutionalAction = {
  id: string;
  caseId: string;
  institution: string;
  actionType: string;
  folioExternal?: string;
  requestedAt: string;
  status: "pending" | "in_progress" | "responded" | "needs_follow_up";
  nextStep: string;
};

export type Committee = {
  id: string;
  name: string;
  specialty: string;
  territory: string;
  level: "municipal" | "state" | "regional" | "national";
  availability: "available" | "limited" | "unavailable";
  caseCount: number;
  verificationLabel: string;
};

export type CommitteeReview = {
  id: string;
  caseId: string;
  committeeId: string;
  status: ReviewStatus;
  requestedAt: string;
  updatedAt: string;
  summary: string;
  observations: string[];
};

export type GeneticReference = {
  id: string;
  caseId: string;
  referenceType: string;
  relationship: string;
  originInstitution: string;
  externalFolio: string;
  registeredAt: string;
  consentStatus: "pending" | "signed" | "revoked";
  requestStatus: GeneticReferenceStatus;
  custodyInstitution: string;
  linkedDocumentIds: string[];
  followUp: string;
};

export type GeneratedDocument = {
  id: string;
  caseId: string;
  title: string;
  version: string;
  generatedAt: string;
  status: "draft" | "ready" | "printed";
  technicalHash?: string;
};

export type AuditEvent = {
  id: string;
  occurredAt: string;
  actorRole: string;
  action: string;
  resource: string;
  version: string;
  caseId?: string;
  hash?: string;
  status: "recorded" | "pending" | "completed";
};

export type CaseVersion = {
  id: string;
  caseId: string;
  version: string;
  createdAt: string;
  actorRole: string;
  summary: string;
  hash?: string;
};

export type AlertItem = {
  id: string;
  caseId?: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  createdAt: string;
  status: "open" | "acknowledged" | "resolved";
};

export type SearchCaseDataset = {
  cases: SearchCase[];
  events: CaseEvent[];
  evidence: EvidenceItem[];
  institutionalActions: InstitutionalAction[];
  committees: Committee[];
  reviews: CommitteeReview[];
  geneticReferences: GeneticReference[];
  documents: GeneratedDocument[];
  auditEvents: AuditEvent[];
  versions: CaseVersion[];
  alerts: AlertItem[];
};

export type ModuleTab = "dashboard" | "cases" | "new" | "genetics" | "committees" | "audit";
