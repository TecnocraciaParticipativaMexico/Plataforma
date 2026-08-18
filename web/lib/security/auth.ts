import "server-only";

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { authenticateBearer, SecurityHttpError } from "./authCore";
import { bearerToken, createUserSupabase } from "./supabaseUser";
import type { User } from "@supabase/supabase-js";

export { SecurityHttpError } from "./authCore";

export function requireUser(request: Request): Promise<User> {
  return authenticateBearer(
    request.headers.get("authorization"),
    (token) => supabaseServer.auth.getUser(token),
  );
}

export async function requireUserContext(request: Request) {
  const token = bearerToken(request);
  const supabase = createUserSupabase(request);
  const user = await authenticateBearer(
    `Bearer ${token}`,
    (verifiedToken) => supabase.auth.getUser(verifiedToken),
  );
  return { user, supabase, token };
}

export function securityErrorResponse(error: unknown) {
  if (error instanceof SecurityHttpError) {
    const code = error.status === 401 ? "AUTH_REQUIRED" : error.status === 403 ? "FORBIDDEN" : "INVALID_REQUEST";
    return NextResponse.json({ ok: false, code, error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  return NextResponse.json({ ok: false, code: "SERVICE_UNAVAILABLE", error: "Service temporarily unavailable" }, { status: 503 });
}
