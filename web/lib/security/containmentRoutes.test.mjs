import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = (path) => readFileSync(resolve(process.cwd(), path), "utf8");

test("la ruta heredada no permite crear ni modificar solicitudes", () => {
  const route = source("app/comites/solicitudes/route.ts");
  assert.match(route, /status:\s*410/);
  assert.doesNotMatch(route, /\.insert\(|\.update\(/);
});

test("la revisión administrativa usa RPC y el cierre de dictamen permanece transaccional", () => {
  const review = source("app/api/comites/solicitudes/route.ts");
  assert.match(review, /rpc\("review_committee_application"/);
  assert.match(review, /expected_version/);
  assert.doesNotMatch(review, /\.update\(/);
  const closure = source("app/comites/dictamenes/cerrar/route.ts");
  assert.match(closure, /rpc\("close_committee_report"/);
  assert.match(closure, /requireUserContext/);
  assert.doesNotMatch(closure, /\.update\(/);
});

test("votos y reputación no aceptan puntajes del navegador", () => {
  const votes = source("app/api/comites/votos/route.ts");
  assert.match(votes, /rejectClientAuthority/);
  assert.match(votes, /rpc\("cast_citizen_vote"/);
  assert.doesNotMatch(votes, /p_.*(score|weight)/);
  const reputation = source("app/api/reputacion/route.ts");
  assert.match(reputation, /rejectClientAuthority/);
  assert.match(reputation, /server-verified source event/);
});

test("la carga de evidencia valida bytes y no existen URLs públicas", () => {
  const upload = source("app/api/process/[processId]/evidence/upload/route.ts");
  assert.match(upload, /validateEvidenceFile/);
  assert.match(upload, /queueEvidenceScan/);
  assert.match(source("lib/security/evidenceValidation.ts"), /pending_scan/);
  assert.match(upload, /supabaseServer\.storage\.from\("evidence"\)\.upload/);
  assert.doesNotMatch(source("app/seguimiento/page.tsx"), /\/object\/public\//);
});

test("el mapa no expone expedientes sin una proyección pública segura", () => {
  const mapRoute = source("app/api/mapa/reportes/route.ts");
  assert.match(mapRoute, /requireUser/);
  assert.match(mapRoute, /status:\s*403/);
});

test("service role queda centralizado en módulo server-only", () => {
  const server = source("lib/supabaseServer.ts");
  assert.match(server, /import "server-only"/);
  assert.match(server, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(source("app/api/comites/propuestas/route.ts"), /SUPABASE_SERVICE_ROLE_KEY/);
});
