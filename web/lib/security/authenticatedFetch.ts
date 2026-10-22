"use client";

import { supabaseBrowser } from "@/app/lib/supabaseBrowser";
import { fetchWithSession } from "./authenticatedFetchCore";

export function authenticatedFetch(path: string, init: RequestInit = {}) {
  return fetchWithSession(path, init, async () => {
    const { data, error } = await supabaseBrowser().auth.getSession();
    return error ? null : data.session?.access_token ?? null;
  }, fetch);
}
