import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { auditedDatabaseErrorResponse } from "@/lib/security/securityAudit";
import { rateLimitResponse, rejectClientAuthority, requestId, requireObject, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const proposalId = req.nextUrl.searchParams.get("proposal_id");
    let query = supabase.from("committee_reports")
      .select("id,proposal_id,module_id,status,state_version,consensus_result,closed_at,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (proposalId) query = query.eq("proposal_id", requireUuid(proposalId, "proposal ID"));
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ ok: true, reports: data ?? [] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, supabase } = await requireUserContext(req);
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const proposalId = requireUuid(body.proposal_id, "proposal ID");
    const correlationId = requestId(req);
    const limited = await rateLimitResponse(supabase, "report.create", proposalId, correlationId);
    if (limited) return limited;
    const { data, error } = await supabase.rpc("create_committee_report", {
      p_proposal_id: proposalId,
      p_request_id: correlationId,
    });
    if (error) return auditedDatabaseErrorResponse(error, { actorUserId: user.id, action: "report.create", resourceType: "committee_proposal", resourceId: proposalId, requestId: correlationId });
    return NextResponse.json({ ok: true, report_id: data }, { status: 201 });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
