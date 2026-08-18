import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, idempotencyKey, rejectClientAuthority, requestId, requireObject, requireUuid } from "@/lib/security/routeSecurity";

export async function POST(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const { supabase } = await requireUserContext(req);
    const { processId } = await context.params;
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    if (typeof body.target_status !== "string" || !Number.isSafeInteger(body.expected_version)) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("transition_civic_process_state", {
      p_process_id: requireUuid(processId, "process ID"),
      p_target_status: body.target_status,
      p_expected_version: body.expected_version,
      p_idempotency_key: idempotencyKey(body.idempotency_key),
      p_request_id: requestId(req),
    });
    if (error) return databaseErrorResponse(error);
    return NextResponse.json({ ok: true, transition: data?.[0] ?? data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
