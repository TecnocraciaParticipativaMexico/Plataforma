import type { ElectionRecord } from "./types";

export type VerificationStatus =
  | "recibida"
  | "pendiente_revision"
  | "coincidencia_multiple"
  | "verificada_visualmente"
  | "con_discrepancia"
  | "incompleta"
  | "ilegible"
  | "excluida"
  | "cotejada_fuente_publica";

export type AnchorStatus = "pendiente_infraestructura" | "pendiente_anclaje" | "enviado" | "confirmado" | "error";

export type Evidence = {
  id: string;
  pollingStationId: string;
  fileName?: string;
  sha256?: string;
  size?: number;
  mimeType?: string;
  receivedAt: string;
  hashingVersion: "sha256-original-bytes-v1";
  validationStatus: VerificationStatus;
  anchor: {
    status: AnchorStatus;
    batchId?: string;
    merkleRoot?: string;
    network?: string;
    transactionHash?: string;
    blockNumber?: number;
    confirmedAt?: string;
  };
};

export type ConsolidatedPollingStation = {
  id: string;
  process: string;
  electionType: string;
  state: string;
  district: string;
  municipality: string;
  section: string;
  pollingPlaceType: string;
  pollingPlaceNumber: string;
  votes: Record<"Partido A" | "Partido B" | "Partido C", number>;
  nullVotes: number;
  unregistered: number;
  status: VerificationStatus;
  evidences: Evidence[];
  sourceRecords: ElectionRecord[];
  resolution?: { actor: string; at: string; note: string };
};

export type CitizenResultsSource = {
  records: ConsolidatedPollingStation[];
  expectedPollingStations?: number;
  updatedAt: string;
  demonstrative: boolean;
};

export type MerkleManifest = {
  id: string;
  evidenceHashes: { evidenceId: string; sha256: string }[];
  merkleRoot: string;
  closedAt: string;
  schemaVersion: "merkle-manifest-v1";
  transaction?: { network: string; hash: string; blockNumber: number; confirmedAt: string };
};
