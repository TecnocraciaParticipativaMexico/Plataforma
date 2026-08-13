import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { requireUuid } from "@/lib/security/routeSecurity";

export async function GET(
  req: Request,
  context: { params: Promise<{ processId: string; evidenceId: string }> },
) {
  try {
    const { supabase } = await requireUserContext(req);
    const { processId, evidenceId } = await context.params;
    const { data: evidence, error } = await supabase.from("evidence_pointers")
      .select("id,storage_path")
      .eq("id", requireUuid(evidenceId, "evidence ID"))
      .eq("process_id", requireUuid(processId, "process ID"))
      .in("review_status", ["pending", "accepted"])
      .maybeSingle();
    if (error) throw error;
    if (!evidence) {
      return NextResponse.json({ ok: false, error: "Resource not found" }, { status: 404 });
    }
    const { data, error: signedError } = await supabase.storage
      .from("evidence").createSignedUrl(evidence.storage_path, 300);
    if (signedError || !data?.signedUrl) {
      return NextResponse.json({ ok: false, error: "Evidence is unavailable" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, url: data.signedUrl, expires_in: 300 });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
