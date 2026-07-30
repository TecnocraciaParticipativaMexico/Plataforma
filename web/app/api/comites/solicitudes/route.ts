import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireExamUser } from "@/app/lib/comites/examenes/server/auth";
import { assertApplicationAttempt } from "@/app/lib/comites/examenes/server/policies";

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

    const { data: attempt, error: attemptError } = await supabase
      .from("committee_exam_attempts")
      .select(
        "id,user_id,module_id,status,approved,expires_at,application_id",
      )
      .eq("id", attempt_id)
      .single();

    if (attemptError || !attempt) {
      return NextResponse.json(
        { ok: false, error: "El intento aprobado no es válido para esta solicitud" },
        { status: 403 }
      );
    }
    try {
      assertApplicationAttempt(attempt, user.id, module_id);
    } catch {
      return NextResponse.json(
        { ok: false, error: "El intento aprobado no es válido para esta solicitud" },
        { status: 403 }
      );
    }

    const review_status = is_public_figure
      ? "Revisión ética avanzada"
      : "Revisión ética";

    const { data: application, error } = await supabase
      .from("committee_applications")
      .insert({
      user_id: user.id,
      actor_hash,
      exam_attempt_id: attempt.id,
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
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const { data: consumed, error: consumeError } = await supabase
      .from("committee_exam_attempts")
      .update({ application_id: application.id })
      .eq("id", attempt.id)
      .eq("user_id", user.id)
      .is("application_id", null)
      .select("id")
      .single();

    if (consumeError || !consumed) {
      await supabase.from("committee_applications").delete().eq("id", application.id);
      return NextResponse.json(
        { ok: false, error: "El intento ya fue utilizado por otra solicitud" },
        { status: 409 }
      );
    }

    return NextResponse.json({ ok: true, review_status });
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
