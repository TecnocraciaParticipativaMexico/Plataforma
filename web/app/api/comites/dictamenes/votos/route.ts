import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, idempotencyKey, rejectClientAuthority, requestId, requireObject, requireRateLimitBoundary, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const reportId = requireUuid(req.nextUrl.searchParams.get("report_id"), "report ID");
    const { data, error } = await supabase.from("committee_technical_votes")
      .select("id,report_id,choice,reasoning,computed_weight,created_at").eq("report_id", reportId).order("created_at");
    if (error) throw error;
    return NextResponse.json({ ok: true, votes: data ?? [] });
  } catch (error) { return securityErrorResponse(error); }
}

export async function POST(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    requireRateLimitBoundary("Technical voting");
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const choice = String(body.choice ?? "");
    const reasoning = String(body.reasoning ?? "").trim();
    if (!['approve','revise','reject'].includes(choice) || reasoning.length < 20 || reasoning.length > 5000) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("cast_technical_vote", {
      p_report_id: requireUuid(body.report_id, "report ID"), p_choice: choice, p_reasoning: reasoning,
      p_idempotency_key: idempotencyKey(body.idempotency_key), p_request_id: requestId(req),
    });
    if (error) return databaseErrorResponse(error);
    return NextResponse.json({ ok: true, vote_id: data }, { status: 201 });
  } catch (error) { return securityErrorResponse(error); }
}
