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

  const visibility_level = body?.visibility_level || participation_type;
  const conflict_interest = body?.conflict_interest || "";
  const curriculum_evidence = body?.curriculum_evidence || "";
  const ethics_accepted = Boolean(body?.ethics_accepted);
  const is_public_figure = Boolean(body?.is_public_figure);

  if (
    !actor_hash ||
    !module_id ||
    !module_name ||
    !level ||
    !participation_type ||
    !expertise_area ||
    !experience_summary ||
    !motivation ||
    !conflict_interest ||
    !ethics_accepted
  ) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios o aceptación ética" },
      { status: 400 }
    );
  }

  const review_status = is_public_figure
    ? "Revisión ética avanzada"
    : "Revisión ética";

  const { error } = await supabase.from("committee_applications").insert({
    actor_hash,
    module_id,
    module_name,
    level,
    participation_type,
    visibility_level,
    expertise_area,
    public_name,
    experience_summary,
    motivation,
    municipality,
    state,
    conflict_interest,
    curriculum_evidence,
    ethics_accepted,
    is_public_figure,
    review_status,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, review_status });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  const id = body?.id;
  const review_status = body?.review_status;

  const estadosPermitidos = [
    "Pendiente",
    "Revisión ética",
    "Revisión ética avanzada",
    "Revisión documental",
    "Observación comunitaria",
    "Apta",
    "Integrada",
    "Lista de espera",
    "Suspendida",
    "Rechazada",
    "Spam",
  ];

  if (!id || !review_status) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  if (!estadosPermitidos.includes(review_status)) {
    return NextResponse.json(
      { ok: false, error: "Estado no permitido" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("committee_applications")
    .update({ review_status })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
