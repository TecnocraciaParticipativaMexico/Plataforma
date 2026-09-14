import { NextResponse } from "next/server";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";

export async function GET(req: Request) {
  try {
    await requireUser(req);
    return NextResponse.json(
      { ok: false, error: "Public process mapping is disabled until a privacy-safe projection is defined." },
      { status: 403 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
