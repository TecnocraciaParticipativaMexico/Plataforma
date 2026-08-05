import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertProcessOwner } from "@/lib/security/processOwnership";

export async function GET(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const user = await requireUser(req);
    const { processId } = await context.params;
    await assertProcessOwner(processId, user.id);
    const { data, error } = await supabaseServer.rpc("verify_chain_integrity_for_process", { p_process_id: processId });
    if (error) throw error;
    return NextResponse.json({ ok: true, result: data?.[0] ?? data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
