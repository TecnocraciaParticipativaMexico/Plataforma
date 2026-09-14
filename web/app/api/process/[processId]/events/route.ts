import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const { supabase } = await requireUserContext(req);
    const { processId } = await context.params;
    const validatedProcessId = requireUuid(processId, "process ID");
    const { data: visibleProcess, error: processError } = await supabase.from("civic_processes")
      .select("id").eq("id", validatedProcessId).maybeSingle();
    if (processError) throw processError;
    if (!visibleProcess) {
      return NextResponse.json({ ok: false, error: "Resource not found" }, { status: 404 });
    }
    const { data, error } = await supabase.from("process_events")
      .select("id,event_type,payload,created_at")
      .eq("process_id", validatedProcessId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (error) {
    return securityErrorResponse(error);
  }
}
