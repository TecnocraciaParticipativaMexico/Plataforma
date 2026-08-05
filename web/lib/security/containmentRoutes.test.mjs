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

test("la revisión administrativa y el cierre de dictamen fallan cerrados", () => {
  assert.match(source("app/api/comites/solicitudes/route.ts"), /Administrative review is not enabled securely yet/);
  assert.match(source("app/comites/dictamenes/cerrar/route.ts"), /status:\s*403/);
});

test("votos y reputación no aceptan puntajes del navegador", () => {
  const votes = source("app/api/comites/votos/route.ts");
  assert.match(votes, /assertNoClientScore/);
  assert.match(votes, /status:\s*503/);
  const reputation = source("app/api/reputacion/route.ts");
  assert.match(reputation, /comprehension_score/);
  assert.match(reputation, /server-verified source event/);
});

test("la carga de evidencia queda bloqueada y no existen URLs públicas", () => {
  assert.match(source("app/api/process/[processId]/evidence/upload/route.ts"), /status:\s*503/);
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
