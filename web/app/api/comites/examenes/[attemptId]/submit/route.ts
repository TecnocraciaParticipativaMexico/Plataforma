import { NextRequest, NextResponse } from "next/server";
import { requireExamUser } from "@/app/lib/comites/examenes/server/auth";
import { submitAttempt } from "@/app/lib/comites/examenes/server/attempts";

const statusFor = (message: string) => {
  if (message === "UNAUTHORIZED") return 401;
  if (message === "FORBIDDEN") return 403;
  if (message === "ATTEMPT_NOT_FOUND") return 404;
  if (
    message === "INCOMPLETE_RESPONSES" ||
    message === "INVALID_RESPONSE" ||
    message === "ATTEMPT_EXPIRED" ||
    message === "ALREADY_SUBMITTED"
  ) {
    return 409;
  }
  return 500;
};

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ attemptId: string }> },
) {
  try {
    const user = await requireExamUser(request);
    const { attemptId } = await context.params;
    const body = await request.json();
    const result = await submitAttempt(user.id, attemptId, body?.responses ?? {});
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "INTERNAL_ERROR";
    return NextResponse.json(
      { ok: false, error: message },
      { status: statusFor(message) },
    );
  }
}
