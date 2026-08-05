import { NextRequest, NextResponse } from "next/server";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";

const forbidden = () => NextResponse.json(
  { ok: false, error: "Committee membership cannot be verified securely yet." },
  { status: 403 },
);

async function authenticatedForbidden(req: NextRequest) {
  try {
    await requireUser(req);
    return forbidden();
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export const GET = authenticatedForbidden;
export const POST = authenticatedForbidden;
