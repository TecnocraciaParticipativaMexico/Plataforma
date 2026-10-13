import test from "node:test";
import assert from "node:assert/strict";
import {
  appendVersion,
  validateArchive,
  encryptArchive,
  decryptArchive,
} from "./archive.ts";
import { emptyDossier } from "./model.ts";
const valid = () => ({
  ...emptyDossier(),
  title: "Prueba documental",
  issuer: "Emisor de prueba",
  date: "2026-01-01",
  source: "https://example.org/resolucion",
  summary: "Contenido documental de prueba",
  impact: "Impacto estructural documentado",
});
const archive = (records) => ({ format: "TP-TAI-WORKSPACE-1", records });
test("historial añade versiones sin modificar originales y evita cambios idénticos", async () => {
  const first = await appendVersion(valid());
  const next = await appendVersion(
    { ...valid(), impact: "Impacto actualizado" },
    first,
  );
  assert.equal(first.versions.length, 1);
  assert.equal(next.versions.length, 2);
  assert.equal(next.versions[1].previousHash, first.versions[0].hash);
  assert.equal((await appendVersion(next.dossier, next)).versions.length, 2);
  assert.deepEqual(await validateArchive(archive([next])), archive([next]));
});
test("detecta contenido, orden y enlace de historial manipulados", async () => {
  const first = await appendVersion(valid());
  const next = await appendVersion(
    { ...valid(), impact: "Otro impacto" },
    first,
  );
  for (const mutate of [
    (r) => {
      r.versions[0].dossier.title = "Alterado";
    },
    (r) => r.versions.reverse(),
    (r) => {
      r.versions[1].previousHash = "0".repeat(64);
    },
    (r) => {
      r.hash = "0".repeat(64);
    },
  ]) {
    const changed = structuredClone(next);
    mutate(changed);
    await assert.rejects(() => validateArchive(archive([changed])));
  }
  await assert.rejects(() => validateArchive(archive([first, first])));
});
test("respaldo AES-GCM recupera contenido e historial sin texto claro", async () => {
  const a = archive([await appendVersion(valid())]);
  const password = "Frase de prueba 2026 extensa";
  const encrypted = await encryptArchive(a, password);
  assert.equal(encrypted.includes("Prueba documental"), false);
  assert.deepEqual(await decryptArchive(encrypted, password), a);
  assert.notEqual(encrypted, await encryptArchive(a, password));
});
test("rechaza contraseña errónea, alteración, KDF manipulada y clave corta", async () => {
  const a = archive([await appendVersion(valid())]);
  const password = "Contraseña de prueba larga";
  const encrypted = await encryptArchive(a, password);
  await assert.rejects(() =>
    decryptArchive(encrypted, "Contraseña incorrecta"),
  );
  const changed = JSON.parse(encrypted);
  changed.data = (changed.data[0] === "A" ? "B" : "A") + changed.data.slice(1);
  await assert.rejects(() => decryptArchive(JSON.stringify(changed), password));
  changed.iterations = 1;
  await assert.rejects(() => decryptArchive(JSON.stringify(changed), password));
  await assert.rejects(() => encryptArchive(a, "corta"));
  await assert.rejects(() => decryptArchive("x".repeat(4000001), password));
});
test("recupera formulario incompleto cifrado sin presentarlo como expediente validado", async () => {
  const data = {
    ...emptyDossier(),
    title: "Trabajo parcial",
    source: "https://",
    summary: "Texto incompleto que no debe perderse",
  };
  const a = {
    format: "TP-TAI-WORKSPACE-1",
    records: [],
    draft: { data, editingId: null },
  };
  const recovered = await decryptArchive(
    await encryptArchive(a, "Frase de prueba para borradores"),
    "Frase de prueba para borradores",
  );
  assert.deepEqual(recovered, a);
  await assert.rejects(() => appendVersion(recovered.draft.data));
  await assert.rejects(() =>
    validateArchive({ ...a, draft: { ...a.draft, editingId: "no-existe" } }),
  );
});
