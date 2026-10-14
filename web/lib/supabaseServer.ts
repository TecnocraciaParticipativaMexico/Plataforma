import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SecurityHttpError } from "./security/authCore";

let client: SupabaseClient | undefined;

// Resolve configuration inside the handler so missing credentials reach its
// controlled 503 response instead of crashing route-module initialization.
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    if (!client) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !key) throw new SecurityHttpError(503, "Secure data service is unavailable");
      client = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });
    }
    const value = Reflect.get(client, property);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
