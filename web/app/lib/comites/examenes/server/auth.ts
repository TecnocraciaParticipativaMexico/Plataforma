import "server-only";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function requireExamUser(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) throw new Error("UNAUTHORIZED");

  const { data, error } = await supabaseServer.auth.getUser(token);
  if (error || !data.user) throw new Error("UNAUTHORIZED");
  return data.user;
}
