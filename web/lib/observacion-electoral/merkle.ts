export type MerkleProofStep = { hash: string; position: "left" | "right" };

const bytesToHex = (bytes: Uint8Array) => [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
const hexToBytes = (hex: string) => Uint8Array.from(hex.match(/.{2}/g)?.map((value) => Number.parseInt(value, 16)) ?? []);

async function digest(bytes: BufferSource) {
  if (!globalThis.crypto?.subtle) throw new Error("Web Crypto no está disponible.");
  return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
}

export const sha256File = async (file: Blob) => digest(await file.arrayBuffer());

export async function hashPair(left: string, right: string) {
  const leftBytes = hexToBytes(left);
  const rightBytes = hexToBytes(right);
  const combined = new Uint8Array(leftBytes.length + rightBytes.length);
  combined.set(leftBytes);
  combined.set(rightBytes, leftBytes.length);
  return digest(combined);
}

export async function merkleRoot(leaves: string[]) {
  if (!leaves.length) throw new Error("Se requiere al menos una hoja Merkle.");
  let level = [...leaves];
  while (level.length > 1) {
    const next: string[] = [];
    for (let index = 0; index < level.length; index += 2) next.push(await hashPair(level[index], level[index + 1] ?? level[index]));
    level = next;
  }
  return level[0];
}

export async function merkleProof(leaves: string[], leafIndex: number) {
  if (leafIndex < 0 || leafIndex >= leaves.length) throw new Error("Índice de hoja fuera de rango.");
  const proof: MerkleProofStep[] = [];
  let index = leafIndex;
  let level = [...leaves];
  while (level.length > 1) {
    const isRight = index % 2 === 1;
    const siblingIndex = isRight ? index - 1 : index + 1;
    proof.push({ hash: level[siblingIndex] ?? level[index], position: isRight ? "left" : "right" });
    const next: string[] = [];
    for (let cursor = 0; cursor < level.length; cursor += 2) next.push(await hashPair(level[cursor], level[cursor + 1] ?? level[cursor]));
    index = Math.floor(index / 2);
    level = next;
  }
  return proof;
}

export async function verifyMerkleProof(leaf: string, proof: MerkleProofStep[], expectedRoot: string) {
  let current = leaf;
  for (const step of proof) current = step.position === "left" ? await hashPair(step.hash, current) : await hashPair(current, step.hash);
  return current === expectedRoot;
}

export async function createMerkleManifest(evidences: { evidenceId: string; sha256: string }[], closedAt = new Date().toISOString()) {
  if (!evidences.length) throw new Error("El lote requiere evidencias con huella.");
  const manifest = {
    id: `lote-${closedAt}`,
    evidenceHashes: evidences.map((evidence) => Object.freeze({ ...evidence })),
    merkleRoot: await merkleRoot(evidences.map((evidence) => evidence.sha256)),
    closedAt,
    schemaVersion: "merkle-manifest-v1" as const,
  };
  return Object.freeze({ ...manifest, evidenceHashes: Object.freeze(manifest.evidenceHashes) });
}
