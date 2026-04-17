import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Crear Proceso
 * - actor_hash viene del frontend como identidad anónima persistente
 * - Si viene note, se agrega como CitizenNoteAdded
 */

function piiSuspected(text: string) {
  const email = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phone =
    /(\+?\d{1,3}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\b\d{10}\b/;
  return email.test(text) || phone.test(text);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tipo_proceso = String(body?.tipo_proceso ?? "").trim();
    const note = String(body?.note ?? "").trim();

    if (!tipo_proceso) {
      return NextResponse.json(
        { ok: false, error: "tipo_proceso es requerido" },
        { status: 400 }
      );
    }

    if (piiSuspected(tipo_proceso)) {
      return NextResponse.json(
        {
          ok: false,
          error: "PII_DETECTED",
          message: "No se permite email/teléfono en tipo_proceso. (MVP)",
        },
        { status: 400 }
      );
    }

    const actor_hash = String(body?.actor_hash || "").trim();

    if (!actor_hash) {
      return NextResponse.json(
        { ok: false, error: "actor_hash requerido" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer.rpc("create_process_with_event", {
      p_tipo_proceso: tipo_proceso,
      p_actor_hash: actor_hash,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const result = data?.[0] ?? data;
    const process_id = result?.out_process_id;

    if (process_id && note) {
      const { error: noteError } = await supabaseServer.rpc("add_process_event", {
        p_process_id: process_id,
        p_event_type: "CitizenNoteAdded",
        p_actor_hash: actor_hash,
        p_payload: {
          note,
        },
      });

      if (noteError) {
        return NextResponse.json(
          { ok: false, error: noteError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true, result });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "error" },
      { status: 500 }
    );
  }
}
