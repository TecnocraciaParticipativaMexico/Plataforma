import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, idempotencyKey, rejectClientAuthority, requestId, requireObject, requireUuid } from "@/lib/security/routeSecurity";

const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE = /\b\d{10}\b/;

export async function POST(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const { supabase } = await requireUserContext(req);
    const { processId } = await context.params;
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    if (body.event_type !== undefined && body.event_type !== "CitizenNoteAdded") {
      return NextResponse.json({ ok: false, error: "This event type is not allowed" }, { status: 403 });
    }
    const payload = requireObject(body.payload ?? {});
    const note = String(payload.note ?? body.note ?? "").trim();
    if (!note) return NextResponse.json({ ok: false, error: "note is required" }, { status: 400 });
    if (EMAIL.test(note) || PHONE.test(note)) {
      return NextResponse.json({ ok: false, error: "PII_DETECTED" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("add_civic_process_note", {
      p_process_id: requireUuid(processId, "process ID"),
      p_note: note,
      p_idempotency_key: idempotencyKey(body.idempotency_key),
      p_request_id: requestId(req),
    });
    if (error) return databaseErrorResponse(error);
    return NextResponse.json({ ok: true, event_id: data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
