import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

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

    // MVP: actor_hash anónimo (sin identidad civil).
    // En la siguiente fase, esto vendrá de IdentidadCivicaAnonima.
    const actor_hash = "anon";

    const { data, error } = await supabaseServer.rpc("create_process_with_event", {
      p_tipo_proceso: tipo_proceso,
      p_actor_hash: actor_hash,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, result: data?.[0] ?? data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
  }
}