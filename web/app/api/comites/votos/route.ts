import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { auditedDatabaseErrorResponse } from "@/lib/security/securityAudit";
import { idempotencyKey, rateLimitResponse, rejectClientAuthority, requestId, requireObject, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const proposalId = req.nextUrl.searchParams.get("proposal_id");
    let query = supabase.from("proposal_votes").select("id,proposal_id,choice,computed_weight,created_at");
    if (proposalId) query = query.eq("proposal_id", requireUuid(proposalId, "proposal ID"));
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, votes: data || [] });
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
    const limited = await rateLimitResponse(supabase, "vote.citizen", proposalId, correlationId);
    if (limited) return limited;
    const choice = String(body.choice ?? "");
    if (!['for','against','changes','abstain'].includes(choice)) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("cast_citizen_vote", {
      p_proposal_id: proposalId,
      p_choice: choice,
      p_qualification_attempt_id: requireUuid(body.qualification_attempt_id ?? body.attempt_id, "qualification attempt ID"),
      p_idempotency_key: idempotencyKey(body.idempotency_key),
      p_request_id: correlationId,
    });
    if (error) return auditedDatabaseErrorResponse(error, { actorUserId: user.id, action: "vote.citizen", resourceType: "committee_proposal", resourceId: proposalId, requestId: correlationId });
    return NextResponse.json({ ok: true, vote: data?.[0] ?? data }, { status: 201 });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
