import { NextResponse } from "next/server";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertProcessOwner } from "@/lib/security/processOwnership";

export async function POST(req: Request, context: { params: Promise<{ processId: string }> }) {
  try {
    const user = await requireUser(req);
    const { processId } = await context.params;
    await assertProcessOwner(processId, user.id);
    return NextResponse.json(
      { ok: false, error: "Evidence upload is disabled until the Storage bucket is verified private." },
      { status: 503 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
