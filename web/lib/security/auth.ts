import "server-only";

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { authenticateBearer, SecurityHttpError } from "./authCore";
import type { User } from "@supabase/supabase-js";

export { SecurityHttpError } from "./authCore";

export function requireUser(request: Request): Promise<User> {
  return authenticateBearer(
    request.headers.get("authorization"),
    (token) => supabaseServer.auth.getUser(token),
  );
}

export function securityErrorResponse(error: unknown) {
  if (error instanceof SecurityHttpError) {
    return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
  }
  return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
}
