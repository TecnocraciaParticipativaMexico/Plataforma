export async function fetchWithSession(
  path: string,
  init: RequestInit,
  getToken: () => Promise<string | null>,
  send: typeof fetch,
): Promise<Response> {
  // Never forward a session to an external URL or a protocol-relative URL.
  if ((!path.startsWith("/api/") && path !== "/comites/dictamenes/cerrar") || path.includes("\\")) throw new Error("Invalid API path");
  const token = await getToken();
  if (!token) return Response.json({ ok: false, code: "AUTH_REQUIRED", error: "Inicia sesión para continuar." }, { status: 401 });
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  return send(path, { ...init, headers, cache: "no-store" });
}
