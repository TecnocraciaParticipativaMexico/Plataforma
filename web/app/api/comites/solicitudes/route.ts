import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { auditedDatabaseErrorResponse } from "@/lib/security/securityAudit";
import { databaseErrorResponse, idempotencyKey, rateLimitResponse, rejectClientAuthority, requestId, requireObject, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const { data, error } = await supabase
      .from("committee_applications")
      .select("id,module_id,module_name,level,municipality,state,participation_type,visibility_level,public_name,expertise_area,experience_summary,motivation,conflict_interest,curriculum_evidence,ethics_accepted,is_public_figure,review_status,state_version,created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, applications: data || [] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, supabase } = await requireUserContext(req);
    const correlationId = requestId(req);
    const limited = await rateLimitResponse(supabase, "application.create", null, correlationId);
    if (limited) return limited;
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
    const { user, supabase } = await requireUserContext(req);
    const body = requireObject(await req.json());
    rejectClientAuthority(body);
    const applicationId = requireUuid(body.id ?? body.application_id, "application ID");
    const correlationId = requestId(req);
    const limited = await rateLimitResponse(supabase, "application.review", applicationId, correlationId);
    if (limited) return limited;
    if (typeof body.action !== "string" || !Number.isSafeInteger(body.expected_version)) {
      return NextResponse.json({ ok: false, code: "INVALID_REQUEST", error: "Invalid request" }, { status: 400 });
    }
    const { data, error } = await supabase.rpc("review_committee_application", {
      p_application_id: applicationId,
      p_action: body.action,
      p_expected_version: body.expected_version,
      p_idempotency_key: idempotencyKey(body.idempotency_key),
      p_request_id: correlationId,
    });
    if (error) return auditedDatabaseErrorResponse(error, { actorUserId: user.id, action: "application.review", resourceType: "committee_application", resourceId: applicationId, requestId: correlationId });
    return NextResponse.json({ ok: true, review: data?.[0] ?? data });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
