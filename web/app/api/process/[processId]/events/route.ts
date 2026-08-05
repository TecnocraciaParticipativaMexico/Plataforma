import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertProcessOwner } from "@/lib/security/processOwnership";

export async function GET(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const user = await requireUser(req);
    const { processId } = await context.params;
    await assertProcessOwner(processId, user.id);
    const { data, error } = await supabaseServer.from("append_only_event").select("*")
      .eq("entity_id", processId).eq("entity_type", "ProcesoCivico").eq("actor_hash", user.id)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (error) {
    return securityErrorResponse(error);
  }
}
