import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("committee_applications")
      .select(
        "id,user_id,module_id,module_name,level,municipality,state,participation_type,visibility_level,public_name,expertise_area,experience_summary,motivation,conflict_interest,curriculum_evidence,ethics_accepted,is_public_figure,review_status,created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, applications: data || [] });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      user_id,
      actor_hash,
      module_id,
      module_name,
      level,
      municipality,
      state,
      participation_type,
      visibility_level,
      public_name,
      expertise_area,
      experience_summary,
      motivation,
      conflict_interest,
      curriculum_evidence,
      ethics_accepted,
      is_public_figure,
    } = body;

    if (
      !user_id ||
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
      user_id,
      actor_hash,
      module_id,
      module_name,
      level,
      municipality: municipality || null,
      state: state || null,
      participation_type,
      visibility_level: visibility_level || participation_type,
      public_name: public_name || null,
      expertise_area,
      experience_summary,
      motivation,
      conflict_interest,
      curriculum_evidence: curriculum_evidence || null,
      ethics_accepted,
      is_public_figure: Boolean(is_public_figure),
      review_status,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, review_status });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const id = body?.id;
    const review_status = body?.review_status;
    const reviewer_user_id = String(body?.reviewer_user_id || "").trim();
    const reviewer_actor_hash = String(body?.reviewer_actor_hash || "").trim();

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

    if (!reviewer_user_id && !reviewer_actor_hash) {
      return NextResponse.json(
        { ok: false, error: "REVIEWER_REQUIRED" },
        { status: 400 }
      );
    }

    if (!estadosPermitidos.includes(review_status)) {
      return NextResponse.json(
        { ok: false, error: "Estado no permitido" },
        { status: 400 }
      );
    }

    const { data: application, error: applicationError } = await supabase
      .from("committee_applications")
      .select("id,user_id,actor_hash")
      .eq("id", id)
      .single();

    if (applicationError || !application) {
      return NextResponse.json(
        { ok: false, error: applicationError?.message || "Solicitud no encontrada" },
        { status: 404 }
      );
    }

    const sameUser = reviewer_user_id && application.user_id === reviewer_user_id;
    const sameActor = reviewer_actor_hash && application.actor_hash === reviewer_actor_hash;

    if (sameUser || sameActor) {
      return NextResponse.json(
        {
          ok: false,
          error: "SELF_REVIEW_FORBIDDEN",
          message: "Nadie puede auto aprobarse, auto evaluarse o votar su propia admisión.",
        },
        { status: 403 }
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
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}
