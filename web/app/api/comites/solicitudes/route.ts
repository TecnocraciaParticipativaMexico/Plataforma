import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCommitteeTerritory } from "@/app/lib/territorioComite";

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

    const territory = normalizeCommitteeTerritory({ level, municipality, state });
    if (territory.errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: "TERRITORIAL_SCOPE_INVALID", details: territory.errors },
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
      level: territory.level,
      municipality: territory.municipality,
      state: territory.state,
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

    return NextResponse.json({
      ok: true,
      review_status,
      territorial_scope: territory.territorial_scope,
    });
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
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}
