import "server-only";

import { supabaseServer } from "@/lib/supabaseServer";
import { SecurityHttpError } from "./auth";

export async function assertProcessOwner(processId: string, userId: string) {
  const { data, error } = await supabaseServer
    .from("append_only_event")
    .select("entity_id")
    .eq("entity_type", "ProcesoCivico")
    .eq("entity_id", processId)
    .eq("event_type", "ProcessCreated")
    .eq("actor_hash", userId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new SecurityHttpError(404, "Process not found");
}
