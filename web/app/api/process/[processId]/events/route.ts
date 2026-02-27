import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(
  _req: Request,
  context: { params: Promise<{ processId: string }> }
) {
  const { processId } = await context.params;

  const { data, error } = await supabaseServer
    .from("append_only_event")
    .select("*")
    .eq("entity_id", processId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({ ok: true, events: data });
}