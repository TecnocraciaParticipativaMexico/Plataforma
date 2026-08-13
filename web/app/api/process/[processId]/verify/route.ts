import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    await requireUserContext(req);
    const { processId } = await context.params;
    requireUuid(processId, "process ID");
    return NextResponse.json(
      { ok: false, error: "Process verification is unavailable until a canonical verification RPC exists" },
      { status: 503 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
