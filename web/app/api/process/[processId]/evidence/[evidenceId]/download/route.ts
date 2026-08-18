import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { auditedDatabaseErrorResponse } from "@/lib/security/securityAudit";
import { rateLimitResponse, requestId, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(
  req: Request,
  context: { params: Promise<{ processId: string; evidenceId: string }> },
) {
  try {
    const { user, supabase } = await requireUserContext(req);
    const { processId, evidenceId } = await context.params;
    const validatedProcessId = requireUuid(processId, "process ID");
    const validatedEvidenceId = requireUuid(evidenceId, "evidence ID");
    const correlationId = requestId(req);
    const limited = await rateLimitResponse(supabase, "evidence.download", validatedEvidenceId, correlationId);
    if (limited) return limited;
    const { data: storagePath, error } = await supabase.rpc("authorize_evidence_download", {
      p_evidence_id: validatedEvidenceId,
      p_process_id: validatedProcessId,
      p_request_id: correlationId,
    });
    if (error) return auditedDatabaseErrorResponse(error, { actorUserId: user.id, action: "evidence.download", resourceType: "evidence", resourceId: validatedEvidenceId, requestId: correlationId }, "Evidence is unavailable");
    const { data, error: signedError } = await supabaseServer.storage
      .from("evidence").createSignedUrl(storagePath, 300, { download: true });
    if (signedError || !data?.signedUrl) {
      return auditedDatabaseErrorResponse(signedError ?? {}, { actorUserId: user.id, action: "evidence.sign", resourceType: "evidence", resourceId: validatedEvidenceId, requestId: correlationId }, "Evidence is unavailable");
    }
    return NextResponse.json({ ok: true, url: data.signedUrl, expires_in: 300 });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
