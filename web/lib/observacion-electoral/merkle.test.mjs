import assert from "node:assert/strict";
import test from "node:test";
import { createMerkleManifest, merkleProof, merkleRoot, sha256File, verifyMerkleProof } from "./merkle.ts";

test("genera hojas SHA-256 desde bytes originales", async () => assert.equal((await sha256File(new Blob(["acta-a"]))).length, 64));
test("calcula raíz y prueba de inclusión", async () => {
  const leaves = await Promise.all(["a", "b", "c"].map((value) => sha256File(new Blob([value]))));
  const root = await merkleRoot(leaves);
  const proof = await merkleProof(leaves, 1);
  assert.equal(root.length, 64);
  assert.equal(await verifyMerkleProof(leaves[1], proof, root), true);
  assert.equal(await verifyMerkleProof(leaves[0], proof, root), false);
});
test("produce manifiesto de lote inmutable", async () => {
  const sha256 = await sha256File(new Blob(["acta"]));
  const manifest = await createMerkleManifest([{ evidenceId: "e-1", sha256 }], "2026-01-01T00:00:00.000Z");
  assert.equal(manifest.merkleRoot, sha256);
  assert.equal(Object.isFrozen(manifest), true);
  assert.equal(Object.isFrozen(manifest.evidenceHashes), true);
});
