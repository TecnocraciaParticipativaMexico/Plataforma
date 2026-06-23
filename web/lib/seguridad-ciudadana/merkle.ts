import { sha256Text } from "./hash";
import type { EvidenceItem, LocalVerificationRoot } from "./types";

function pairHashes(hashes: string[]): string[] {
  const pairs: string[] = [];
  for (let index = 0; index < hashes.length; index += 2) {
    const left = hashes[index];
    const right = hashes[index + 1] || left;
    pairs.push(`${left}:${right}`);
  }
  return pairs;
}

export async function createEvidenceCombinedHash(evidence: EvidenceItem[]): Promise<string> {
  if (!evidence.length) return sha256Text("sin-evidencias-locales");
  const payload = evidence
    .map((item) => `${item.localId}|${item.sha256}|${item.size}|${item.type}|${item.localStatus}`)
    .sort()
    .join("\n");
  return sha256Text(payload);
}

export async function createLocalVerificationRoot(evidence: EvidenceItem[]): Promise<LocalVerificationRoot> {
  let level = evidence.length
    ? evidence.map((item) => `${item.localId}:${item.sha256}`).sort()
    : ["sin-evidencias-locales"];

  while (level.length > 1) {
    level = await Promise.all(pairHashes(level).map((pair) => sha256Text(pair)));
  }

  const evidenceCombinedHash = await createEvidenceCombinedHash(evidence);
  const rootHash = await sha256Text(`${evidenceCombinedHash}:${level[0]}`);

  return {
    evidenceCount: evidence.length,
    evidenceCombinedHash,
    rootHash,
    calculatedAt: new Date().toISOString(),
    method: "merkle_simplificada_local",
  };
}
