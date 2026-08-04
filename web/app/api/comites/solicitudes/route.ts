import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireExamUser } from "@/app/lib/comites/examenes/server/auth";

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireExamUser(req);
    const body = await req.json();

    const {
      actor_hash,
      attempt_id,
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
      !actor_hash ||
      !attempt_id ||
      !Number.isInteger(module_id) ||
      module_id < 1 ||
      module_id > 30 ||
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

    const { data, error } = await supabase.rpc(
      "create_committee_application_with_attempt",
      {
        p_user_id: user.id,
        p_attempt_id: attempt_id,
        p_module_id: module_id,
        p_payload: {
          actor_hash,
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
          is_public_figure: Boolean(is_public_figure),
        },
      },
    );

    if (error) {
      const alreadyUsed = error.message.includes("ATTEMPT_ALREADY_USED");
      return NextResponse.json(
        {
          ok: false,
          error: alreadyUsed
            ? "El intento ya fue utilizado por otra solicitud"
            : "El intento aprobado no es válido para esta solicitud",
        },
        { status: alreadyUsed ? 409 : 403 },
      );
    }

    return NextResponse.json({
      ok: true,
      review_status: data?.review_status,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json(
        { ok: false, error: "Sesión requerida" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { ok: false, error: message },
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
