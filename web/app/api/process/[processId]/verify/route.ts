import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { auditedDatabaseErrorResponse } from "@/lib/security/securityAudit";
import { rateLimitResponse, requestId, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const { user, supabase } = await requireUserContext(req);
    const { processId } = await context.params;
    const validatedProcessId = requireUuid(processId, "process ID");
    const correlationId = requestId(req);
    const limited = await rateLimitResponse(supabase, "process.verify", validatedProcessId, correlationId);
    if (limited) return limited;
    const { data, error } = await supabase.rpc("verify_process_chain", {
      p_process_id: validatedProcessId,
      p_request_id: correlationId,
    });
    if (error) return auditedDatabaseErrorResponse(error, { actorUserId: user.id, action: "process.verify", resourceType: "civic_process", resourceId: validatedProcessId, requestId: correlationId }, "Process verification is unavailable");
    return NextResponse.json({ ok: true, result: data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
