export type ModuleView =
  | "resumen"
  | "evaluacion"
  | "diaspora"
  | "expedientes"
  | "financiamiento"
  | "trazabilidad";

export type EvidenceItem = {
  id: string;
  name: string;
  type: string;
  size: number;
  addedAt: string;
};

export type DiplomaticEvaluation = {
  country: string;
  mission: string;
  kind: string;
  criterion: string;
  period: string;
  contribution: string;
  sources: string;
  notes: string;
};

export type DiasporaRepresentative = {
  id: string;
  name: string;
  role: string;
  country: string;
  city: string;
  region: string;
  specialties: string[];
  languages: string[];
  experience: string;
  collaboration: string;
  biography: string;
  activities: string;
  status: string;
  reviewDate: string;
  conflict: string;
  isTemporary?: boolean;
};

export type InternationalCase = {
  id: string;
  title: string;
  summary: string;
  category: string;
  region: string;
  status: string;
  priority: string;
  committee: string;
  mechanism: string;
  pending: string[];
  timeline: { date: string; event: string }[];
  sources: string[];
  documents: string[];
};

export type SolidarityCampaign = {
  id: string;
  title: string;
  cause: string;
  location: string;
  platform: string;
  owner: string;
  raised: number;
  goal: number;
  status: string;
  reviewDate: string;
  reviewed: string;
  unverified: string;
  isTemporary?: boolean;
};

export type TraceabilityRecord = {
  folio: string;
  caseName: string;
  documentType: string;
  version: string;
  date: string;
  time: string;
  hash: string;
  status: string;
  committee: string;
  actor: string;
  action: string;
  notes: string;
};
