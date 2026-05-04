import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const actorHash = req.nextUrl.searchParams.get("actor_hash");

  if (!actorHash) {
    return NextResponse.json({ ok: false, error: "Falta actor_hash" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("citizen_report_index")
    .select("process_id,title,category,created_at")
    .eq("actor_hash", actorHash)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, reports: data || [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const actor_hash = body?.actor_hash;
  const process_id = body?.process_id;
  const title = body?.title || "Denuncia ciudadana";
  const category = body?.category || "Otro";

  if (!actor_hash || !process_id) {
    return NextResponse.json({ ok: false, error: "Faltan datos" }, { status: 400 });
  }

  const { error } = await supabase.from("citizen_report_index").insert({
    actor_hash,
    process_id,
    title,
    category,
  });

  if (error && error.code !== "23505") {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
