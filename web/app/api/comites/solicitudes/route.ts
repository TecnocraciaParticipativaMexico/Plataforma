import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      actor_hash,
      module_id,
      module_name,
      level,
      municipality,
      state,
      participation_type,
      public_name,
      expertise_area,
      experience_summary,
      motivation,
    } = body;

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

    const { error } = await supabase
      .from("committee_applications")
      .insert({
        actor_hash,
        module_id,
        module_name,
        level,
        municipality,
        state,
        participation_type,
        public_name,
        expertise_area,
        experience_summary,
        motivation,
      });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}
