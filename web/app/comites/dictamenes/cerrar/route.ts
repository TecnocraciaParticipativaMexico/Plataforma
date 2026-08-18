import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { auditedDatabaseErrorResponse } from "@/lib/security/securityAudit";
import { rateLimitResponse, rejectClientAuthority, requestId, requireObject, requireUuid } from "@/lib/security/routeSecurity";

export async function POST(req: NextRequest) {
  try {
    const { user, supabase } = await requireUserContext(req);
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const reportId = requireUuid(body.report_id, "report ID");
    const correlationId = requestId(req);
    const limited = await rateLimitResponse(supabase, "report.close", reportId, correlationId);
    if (limited) return limited;
    if (!Number.isSafeInteger(body.expected_version)) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("close_committee_report", {
      p_report_id: reportId,
      p_expected_version: body.expected_version,
      p_request_id: correlationId,
    });
    if (error) return auditedDatabaseErrorResponse(error, { actorUserId: user.id, action: "report.close", resourceType: "committee_report", resourceId: reportId, requestId: correlationId });
    return NextResponse.json({ ok: true, result: data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
