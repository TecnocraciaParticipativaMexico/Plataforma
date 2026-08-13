import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, idempotencyKey, rejectClientAuthority, requestId, requireObject, requireRateLimitBoundary, requireUuid } from "@/lib/security/routeSecurity";

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
    const { supabase } = await requireUserContext(req);
    requireRateLimitBoundary("Voting");
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const choice = String(body.choice ?? "");
    if (!['for','against','changes','abstain'].includes(choice)) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("cast_citizen_vote", {
      p_proposal_id: requireUuid(body.proposal_id, "proposal ID"),
      p_choice: choice,
      p_qualification_attempt_id: requireUuid(body.qualification_attempt_id ?? body.attempt_id, "qualification attempt ID"),
      p_idempotency_key: idempotencyKey(body.idempotency_key),
      p_request_id: requestId(req),
    });
    if (error) return databaseErrorResponse(error);
    return NextResponse.json({ ok: true, vote: data?.[0] ?? data }, { status: 201 });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
