import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/**
 * MVP PII Guard (servidor)
 * - Bloquea emails y teléfonos
 * - Escanea strings dentro del payload (recursivo)
 * - Si detecta, rechaza el evento (append-only => no se debe guardar PII)
 */

function piiSuspected(text: string) {
  // Email
  const email = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

  // Teléfono (general). Detecta +52 +1, paréntesis, guiones, espacios, etc.
  // Nota: es un MVP; puede tener falsos positivos, pero es preferible a filtrar de más.
  const phone =
    /(\+?\d{1,3}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\b\d{10}\b/;

  return email.test(text) || phone.test(text);
}

function findPIIInAnyString(value: any): { found: boolean; sample?: string } {
  try {
    if (value == null) return { found: false };

    if (typeof value === "string") {
      const s = value.trim();
      if (!s) return { found: false };
      if (piiSuspected(s)) return { found: true, sample: s.slice(0, 120) };
      return { found: false };
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return { found: false };
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const r = findPIIInAnyString(item);
        if (r.found) return r;
      }
      return { found: false };
    }

    if (typeof value === "object") {
      for (const k of Object.keys(value)) {
        const r = findPIIInAnyString(value[k]);
        if (r.found) return r;
      }
      return { found: false };
    }

    return { found: false };
  } catch {
    // Si algo raro pasa, no bloqueamos por error interno del guard
    return { found: false };
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ processId: string }> }
) {
  try {
    const { processId } = await context.params;
    const pid = String(processId || "").trim();
    if (!pid) {
      return NextResponse.json(
        { ok: false, error: "processId requerido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const event_type = String(body?.event_type || "").trim();
    const payload = body?.payload ?? {};

    if (!event_type) {
      return NextResponse.json(
        { ok: false, error: "event_type requerido" },
        { status: 400 }
      );
    }

    // MVP actor_hash fijo; luego vendrá IdentidadCivicaAnonima
    const actor_hash = String(body?.actor_hash || "").trim();

if (!actor_hash) {
  return NextResponse.json(
    { ok: false, error: "actor_hash requerido" },
    { status: 400 }
  );
}

    // ✅ Bloqueo anti-PII (servidor) - aplica a TODO el payload
    // (y además hacemos validación específica para CitizenNoteAdded)
    if (event_type === "CitizenNoteAdded") {
      const note = String(payload?.note || "").trim();
      if (!note) {
        return NextResponse.json(
          { ok: false, error: "note requerida" },
          { status: 400 }
        );
      }
      if (piiSuspected(note)) {
        return NextResponse.json(
          {
            ok: false,
            error: "PII_DETECTED",
            message: "No se permite email/teléfono en notas. (MVP)",
          },
          { status: 400 }
        );
      }
    }

    // Escaneo general recursivo (por si meten PII en otro campo del payload)
    const pii = findPIIInAnyString(payload);
    if (pii.found) {
      return NextResponse.json(
        {
          ok: false,
          error: "PII_DETECTED",
          message:
            "Se detectó posible PII (email/teléfono) en el payload. No se registra el evento. (MVP)",
          sample: pii.sample,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer.rpc("add_process_event", {
      p_process_id: pid,
      p_event_type: event_type,
      p_actor_hash: actor_hash,
      p_payload: payload,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, result: data?.[0] ?? data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "error" },
      { status: 500 }
    );
  }
}