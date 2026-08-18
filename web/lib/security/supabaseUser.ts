import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SecurityHttpError } from "./authCore";

export function bearerToken(request: Request): string {
  const match = request.headers.get("authorization")?.match(/^Bearer\s+([^\s]+)$/i);
  if (!match) throw new SecurityHttpError(401, "Authentication required");
  return match[1];
}

export function createUserSupabase(request: Request): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new SecurityHttpError(503, "Secure data service is unavailable");
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { Authorization: `Bearer ${bearerToken(request)}` } },
  });
}
