import { NextRequest, NextResponse } from "next/server";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";

export async function POST(req: NextRequest) {
  try {
    await requireUser(req);
    return NextResponse.json(
      { ok: false, error: "Committee authority cannot be verified securely yet." },
      { status: 403 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
