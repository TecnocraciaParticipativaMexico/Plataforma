import { NextRequest, NextResponse } from "next/server";
import { requireExamUser } from "@/app/lib/comites/examenes/server/auth";
import { createAttempt } from "@/app/lib/comites/examenes/server/attempts";

const statusFor = (message: string) => {
  if (message === "UNAUTHORIZED") return 401;
  if (message === "INVALID_MODULE") return 400;
  if (message === "ATTEMPT_LIMIT" || message === "RETRY_COOLDOWN") return 429;
  return 500;
};

const publicError = (error: unknown) => {
  const marker = error instanceof Error ? error.message : "";
  const known = new Set(["UNAUTHORIZED", "INVALID_MODULE", "ATTEMPT_LIMIT", "RETRY_COOLDOWN"]);
  return known.has(marker) ? marker : "SERVICE_UNAVAILABLE";
};

export async function POST(request: NextRequest) {
  try {
    const user = await requireExamUser(request);
    const body = await request.json();
    const attempt = await createAttempt(user.id, Number(body?.module_id));
    return NextResponse.json({ ok: true, attempt }, { status: 201 });
  } catch (error) {
    const message = publicError(error);
    return NextResponse.json(
      { ok: false, error: message },
      { status: statusFor(message) },
    );
  }
}
