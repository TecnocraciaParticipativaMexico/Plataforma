import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertProcessOwner } from "@/lib/security/processOwnership";
import { assertCitizenEvent, assertNoClientIdentity } from "@/lib/security/authCore";

const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE = /\b\d{10}\b/;

export async function POST(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const user = await requireUser(req);
    const { processId } = await context.params;
    await assertProcessOwner(processId, user.id);
    const body = await req.json();
    assertNoClientIdentity(body);
    assertCitizenEvent(body?.event_type);
    const note = String(body?.payload?.note ?? "").trim();
    if (!note) return NextResponse.json({ ok: false, error: "note is required" }, { status: 400 });
    if (EMAIL.test(note) || PHONE.test(note)) {
      return NextResponse.json({ ok: false, error: "PII_DETECTED" }, { status: 400 });
    }
    const { data, error } = await supabaseServer.rpc("add_process_event", {
      p_process_id: processId, p_event_type: "CitizenNoteAdded", p_actor_hash: user.id, p_payload: { note },
    });
    if (error) throw error;
    return NextResponse.json({ ok: true, result: data?.[0] ?? data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
