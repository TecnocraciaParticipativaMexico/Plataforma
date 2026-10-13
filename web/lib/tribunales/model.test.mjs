import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyDossier,
  fingerprint,
  publicUrl,
  report,
  validateDossier,
} from "./model.ts";
const valid = () => ({
  ...emptyDossier(),
  title: "Resolución pública",
  issuer: "Órgano emisor",
  date: "2026-01-01",
  source: "https://www.scjn.gob.mx/resolucion",
  summary: "Síntesis aportada por la persona",
  impact: "Impacto estructural documentado",
});
test("admite expediente público y elimina propiedades ajenas", () => {
  const d = validateDossier({ ...valid(), role: "admin", published: true });
  assert.equal(d.findings.length, 5);
  assert.equal(d.role, undefined);
  assert.equal(d.published, undefined);
});
test("rechaza esquemas, fechas y tribunales manipulados", () => {
  for (const patch of [
    { court: "Penal" },
    { date: "2026-02-30" },
    { date: "2099-01-01" },
    { ongoing: "true" },
    { findings: [] },
    { title: "x".repeat(201) },
    { summary: "" },
  ])
    assert.throws(() => validateDossier({ ...valid(), ...patch }));
});
test("rechaza fuentes ejecutables, locales y con credenciales", () => {
  for (const url of [
    "javascript:alert(1)",
    "http://example.com",
    "https://user:pass@example.com",
    "https://localhost",
    "https://127.0.0.1",
    "https://192.168.1.1",
    "https://[::1]",
    "https://10.0.0.1",
  ])
    assert.equal(publicUrl(url), false);
  assert.equal(
    publicUrl("https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf"),
    true,
  );
});
test("no permite conclusiones sin evidencia y razonamiento", () => {
  const d = valid();
  d.findings[0].result = "Consistente";
  assert.throws(() => validateDossier(d));
  d.findings[0].source = "https://www.scjn.gob.mx/precedente";
  d.findings[0].reasoning =
    "Contraste razonado con el precedente público citado.";
  assert.doesNotThrow(() => validateDossier(d));
});
test("SHA-256 detecta manipulación y sobrevive exportación JSON", async () => {
  const d = valid();
  const hash = await fingerprint(d);
  assert.match(hash, /^[a-f0-9]{64}$/);
  assert.equal(await fingerprint(JSON.parse(JSON.stringify(d))), hash);
  assert.notEqual(
    await fingerprint({ ...d, impact: "Contenido modificado" }),
    hash,
  );
  assert.match(report(d, hash), /NO VALIDADO NI PUBLICADO/);
});
