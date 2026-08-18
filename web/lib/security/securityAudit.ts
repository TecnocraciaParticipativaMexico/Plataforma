import "server-only";

import { supabaseServer } from "@/lib/supabaseServer";
import { databaseErrorResponse } from "./routeSecurity";

type DatabaseError = { code?: string; message?: string };
type RejectionContext = {
  actorUserId: string;
  action: string;
  resourceType: string;
  resourceId: string | null;
  requestId: string;
};

export async function auditedDatabaseErrorResponse(
  error: DatabaseError,
  context: RejectionContext,
  fallback?: string,
) {
  const reasonCode = typeof error.code === "string" && /^[A-Z0-9]{4,10}$/.test(error.code)
    ? `DB_${error.code}`
    : "DB_REJECTED";
  try {
    await supabaseServer.rpc("record_security_rejection", {
      p_actor_user_id: context.actorUserId,
      p_action: context.action,
      p_resource_type: context.resourceType,
      p_resource_id: context.resourceId,
      p_reason_code: reasonCode,
      p_request_id: context.requestId,
    });
  } catch {
    // A best-effort rejection audit must not replace the original stable response.
  }
  return databaseErrorResponse(error, fallback);
}
