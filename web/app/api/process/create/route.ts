import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, idempotencyKey, rejectClientAuthority, requestId, requireObject, requireRateLimitBoundary } from "@/lib/security/routeSecurity";

export async function POST(req: Request) {
  try {
    const { supabase } = await requireUserContext(req);
    requireRateLimitBoundary("Process creation");
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const processType = String(body.process_type ?? body.tipo_proceso ?? "").trim();
    const title = typeof body.title === "string" ? body.title.trim() : null;
    if (!processType || processType.length > 120 || (title && title.length > 240)) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("create_civic_process", {
      p_process_type: processType,
      p_title: title || null,
      p_idempotency_key: idempotencyKey(body.idempotency_key),
      p_request_id: requestId(req),
    });
    if (error) return databaseErrorResponse(error);
    return NextResponse.json({ ok: true, process_id: data }, { status: 201 });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
