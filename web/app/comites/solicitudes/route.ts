import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const actor_hash = body?.actor_hash;
  const module_id = Number(body?.module_id);
  const module_name = body?.module_name;
  const level = body?.level;
  const participation_type = body?.participation_type;
  const expertise_area = body?.expertise_area;
  const municipality = body?.municipality || null;
  const state = body?.state || null;
  const public_name = body?.public_name || null;
  const experience_summary = body?.experience_summary;
  const motivation = body?.motivation;

  if (
    !actor_hash ||
    !module_id ||
    !module_name ||
    !level ||
    !participation_type ||
    !expertise_area ||
    !experience_summary ||
    !motivation
  ) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("committee_applications").insert({
    actor_hash,
    module_id,
    module_name,
    level,
    participation_type,
    expertise_area,
    public_name,
    experience_summary,
    motivation,
    municipality,
    state,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
