import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function piiSuspected(text: string) {
  // filtro básico MVP (B lo haremos bien con redacción)
  const email = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phone = /\b(\+?\d[\d\s\-().]{8,}\d)\b/;
  return email.test(text) || phone.test(text);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ processId: string }> }
) {
  try {
    const { processId } = await context.params;
    const pid = String(processId || "").trim();
    if (!pid) return NextResponse.json({ ok: false, error: "processId requerido" }, { status: 400 });

    const body = await req.json();
    const event_type = String(body?.event_type || "").trim();
    const payload = body?.payload ?? {};

    // MVP actor_hash fijo; luego vendrá IdentidadCivicaAnonima
    const actor_hash = "anon";

    // Bloqueo básico anti-PII en notas (B lo hará más robusto)
    if (event_type === "CitizenNoteAdded") {
      const note = String(payload?.note || "").trim();
      if (!note) return NextResponse.json({ ok: false, error: "note requerida" }, { status: 400 });
      if (piiSuspected(note)) {
        return NextResponse.json(
          { ok: false, error: "PII sospechada (email/teléfono). No se registra. (MVP)" },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabaseServer.rpc("add_process_event", {
      p_process_id: pid,
      p_event_type: event_type,
      p_actor_hash: actor_hash,
      p_payload: payload,
    });

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, result: data?.[0] ?? data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
  }
}