import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, rejectClientAuthority, requestId, requireObject, requireRateLimitBoundary, requireUuid } from "@/lib/security/routeSecurity";

export async function POST(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    requireRateLimitBoundary("Committee report closure");
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    if (!Number.isSafeInteger(body.expected_version)) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("close_committee_report", {
      p_report_id: requireUuid(body.report_id, "report ID"),
      p_expected_version: body.expected_version,
      p_request_id: requestId(req),
    });
    if (error) return databaseErrorResponse(error);
    return NextResponse.json({ ok: true, result: data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
