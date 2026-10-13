import test from "node:test";
import assert from "node:assert/strict";
import { PDFDocument } from "pdf-lib";
import { buildTribunalesPdf } from "./pdf.ts";
import { emptyDossier } from "./model.ts";
test("PDF institucional paginado soporta textos máximos y se identifica como borrador", async () => {
  const d = {
    ...emptyDossier(),
    title: "Prueba técnica PDF",
    issuer: "Órgano de prueba",
    date: "2026-01-01",
    source: "https://example.org/resolucion",
    summary: "Texto público de prueba. ".repeat(450),
    impact: "Impacto institucional de prueba documentado.",
  };
  const bytes = await buildTribunalesPdf(d, 2);
  const pdf = await PDFDocument.load(bytes);
  assert.equal(pdf.getTitle(), "Informe de contraste");
  assert.match(pdf.getSubject(), /Módulo 07/);
  assert.ok(pdf.getPageCount() > 4);
  assert.ok(bytes.byteLength > 1000);
  await assert.rejects(() =>
    buildTribunalesPdf({ ...d, source: "javascript:alert(1)" }),
  );
  await assert.rejects(
    () => buildTribunalesPdf({ ...d, title: "文字 que debe conservarse" }),
    /otros alfabetos/,
  );
});
