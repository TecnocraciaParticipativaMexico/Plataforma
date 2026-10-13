import assert from "node:assert/strict";
import { blockedOperations } from "../lib/tribunales/capabilities.ts";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3007");
if (
  origin.protocol !== "http:" ||
  !["localhost", "127.0.0.1"].includes(origin.hostname)
)
  throw new Error(
    "Esta prueba sólo admite la aplicación local, nunca producción.",
  );
let count = 0;
for (const action of blockedOperations) {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    const response = await fetch(
      new URL(`/api/tribunales/operations/${action}`, origin),
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer deliberately-invalid-test-token",
        },
        body: JSON.stringify({
          role: "platform_admin",
          actor_hash: "browser-forged",
          humanApproval: true,
          votes: 999999,
        }),
      },
    );
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(
      (await response.json()).code,
      "MODULE07_OPERATIONS_UNAVAILABLE",
    );
    count++;
  }
}
const response = await fetch(
  new URL("/api/tribunales/operations/publication", origin),
);
assert.equal(response.status, 405);
count++;
console.log(
  `${count} comprobaciones HTTP locales pasan: acciones privilegiadas cerradas y GET no admitido.`,
);
