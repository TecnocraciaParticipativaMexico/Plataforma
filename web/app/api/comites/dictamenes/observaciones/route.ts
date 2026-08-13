import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, idempotencyKey, rejectClientAuthority, requestId, requireObject, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const reportId = requireUuid(req.nextUrl.searchParams.get("report_id"), "report ID");
    const { data, error } = await supabase.from("committee_report_observations")
      .select("id,report_id,content,created_at").eq("report_id", reportId).order("created_at");
    if (error) throw error;
    return NextResponse.json({ ok: true, observations: data ?? [] });
  } catch (error) { return securityErrorResponse(error); }
}

export async function POST(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const content = String(body.content ?? "").trim();
    if (content.length < 20 || content.length > 5000) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("add_committee_observation", {
      p_report_id: requireUuid(body.report_id, "report ID"), p_content: content,
      p_idempotency_key: idempotencyKey(body.idempotency_key), p_request_id: requestId(req),
    });
    if (error) return databaseErrorResponse(error);
    return NextResponse.json({ ok: true, observation_id: data }, { status: 201 });
  } catch (error) { return securityErrorResponse(error); }
}
