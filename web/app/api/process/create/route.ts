import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Crear Proceso
 * - Por ahora solo recibe tipo_proceso
 * - actor_hash = "anon" (luego será IdentidadCivicaAnonima)
 * - Incluye un guard mínimo por si en el futuro agregas payload textual
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

    if (!tipo_proceso) {
      return NextResponse.json(
        { ok: false, error: "tipo_proceso es requerido" },
        { status: 400 }
      );
    }

    // (Opcional) Si alguien intenta meter PII en tipo_proceso (no debería),
    // lo bloqueamos igual.
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

    // MVP: actor_hash anónimo (sin identidad civil).
    // En la siguiente fase, esto vendrá de IdentidadCivicaAnonima.
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
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, result: data?.[0] ?? data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "error" },
      { status: 500 }
    );
  }
}