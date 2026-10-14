import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { queueEvidenceScan, validateEvidenceFile } from "@/lib/security/evidenceValidation";
import { databaseErrorResponse, rateLimitResponse, requestId, requireUuid } from "@/lib/security/routeSecurity";

export async function POST(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const { user, supabase } = await requireUserContext(req);
    const { processId } = await context.params;
    const validatedProcessId = requireUuid(processId, "process ID");
    const correlationId = requestId(req);
    const limited = await rateLimitResponse(supabase, "evidence.upload", validatedProcessId, correlationId);
    if (limited) return limited;
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, code: "INVALID_REQUEST", error: "Evidence file is required" }, { status: 400 });
    }
    const validated = await validateEvidenceFile(file);
    const { data: prepared, error: prepareError } = await supabase.rpc("prepare_evidence_upload", {
      p_process_id: validatedProcessId,
      p_sha256: validated.sha256,
      p_size_bytes: validated.size,
      p_mime_type: validated.mime,
      p_request_id: correlationId,
    });
    if (prepareError) return databaseErrorResponse(prepareError, "Evidence upload could not be prepared");
    const pointer = Array.isArray(prepared) ? prepared[0] : prepared;
    if (!pointer?.evidence_id || !pointer?.object_name) {
      return NextResponse.json({ ok: false, code: "EVIDENCE_PREPARE_FAILED", error: "Evidence upload could not be prepared" }, { status: 503 });
    }
    let stored = false;
    try {
      const { error: uploadError } = await supabaseServer.storage.from("evidence").upload(
        pointer.object_name,
        validated.bytes,
        { contentType: validated.mime, upsert: false },
      );
      if (uploadError) throw uploadError;
      stored = true;
      const { error: confirmError } = await supabaseServer.rpc("confirm_evidence_upload", {
        p_evidence_id: pointer.evidence_id,
        p_owner_user_id: user.id,
        p_request_id: correlationId,
      });
      if (confirmError) throw confirmError;
      const scan = await queueEvidenceScan();
      return NextResponse.json({ ok: true, evidence_id: pointer.evidence_id, status: scan.state }, { status: 202 });
    } catch {
      if (stored) await supabaseServer.storage.from("evidence").remove([pointer.object_name]);
      await supabaseServer.rpc("reject_evidence_upload", {
        p_evidence_id: pointer.evidence_id,
        p_owner_user_id: user.id,
        p_request_id: correlationId,
      });
      return NextResponse.json({ ok: false, code: "EVIDENCE_UPLOAD_FAILED", error: "Evidence upload could not be completed" }, { status: 503 });
    }
  } catch (error) {
    return securityErrorResponse(error);
  }
}
