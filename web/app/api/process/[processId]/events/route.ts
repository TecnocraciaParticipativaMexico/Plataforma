import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(
  _req: Request,
  { params }: { params: { processId: string } }
) {
  try {
    const processId = String(params.processId || "").trim();
    if (!processId) {
      return NextResponse.json({ ok: false, error: "processId requerido" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("append_only_event")
      .select("event_id, created_at, event_type, entity_type, entity_id, parent_event_hash, current_event_hash, actor_hash, payload_json")
      .eq("entity_type", "ProcesoCivico")
      .eq("entity_id", processId)
      .order("created_at", { ascending: true });

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, events: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
  }
}