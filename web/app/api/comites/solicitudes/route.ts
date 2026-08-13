import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { databaseErrorResponse, rejectClientAuthority, requireObject, requireRateLimitBoundary, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const { data, error } = await supabase
      .from("committee_applications")
      .select("id,module_id,module_name,level,municipality,state,participation_type,visibility_level,public_name,expertise_area,experience_summary,motivation,conflict_interest,curriculum_evidence,ethics_accepted,is_public_figure,review_status,created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, applications: data || [] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await requireUserContext(req);
    requireRateLimitBoundary("Committee applications");
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const { attempt_id, module_id, module_name, level, municipality, state,
      participation_type, visibility_level, public_name, expertise_area,
      experience_summary, motivation, conflict_interest, curriculum_evidence,
      ethics_accepted, is_public_figure } = body;
    if (!attempt_id || typeof module_id !== "number" || !Number.isInteger(module_id) || module_id < 1 || module_id > 30 ||
        !module_name || !level || !participation_type || !expertise_area ||
        !experience_summary || !motivation || !conflict_interest || !ethics_accepted) {
      return NextResponse.json({ ok: false, error: "Invalid application data" }, { status: 400 });
    }
    const { data, error } = await supabaseServer.rpc("create_committee_application_with_attempt", {
      p_user_id: user.id,
      p_attempt_id: requireUuid(attempt_id, "attempt ID"),
      p_module_id: module_id,
      p_payload: {
        actor_hash: user.id,
        module_name, level, municipality, state, participation_type,
        visibility_level, public_name, expertise_area, experience_summary,
        motivation, conflict_interest, curriculum_evidence, ethics_accepted,
        is_public_figure: Boolean(is_public_figure),
      },
    });
    if (error) return databaseErrorResponse(error, "Committee application could not be created");
    return NextResponse.json({ ok: true, review_status: data?.review_status });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireUserContext(req);
    return NextResponse.json(
      { ok: false, error: "Administrative review is not enabled securely yet." },
      { status: 403 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
