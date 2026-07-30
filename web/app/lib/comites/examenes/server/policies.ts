export type AttemptAccess = {
  user_id: string;
  module_id: number;
  status: string;
  approved: boolean | null;
  expires_at: string;
  application_id?: string | null;
};

export function assertSubmittableAttempt(
  attempt: AttemptAccess,
  userId: string,
  now = new Date(),
) {
  if (attempt.user_id !== userId) throw new Error("FORBIDDEN");
  if (attempt.status !== "started") throw new Error("ALREADY_SUBMITTED");
  if (new Date(attempt.expires_at) <= now) throw new Error("ATTEMPT_EXPIRED");
}

export function assertApplicationAttempt(
  attempt: AttemptAccess,
  userId: string,
  moduleId: number,
  now = new Date(),
) {
  if (attempt.user_id !== userId) throw new Error("FORBIDDEN");
  if (attempt.module_id !== moduleId) throw new Error("MODULE_MISMATCH");
  if (attempt.status !== "submitted" || !attempt.approved) {
    throw new Error("ATTEMPT_NOT_APPROVED");
  }
  if (new Date(attempt.expires_at) <= now) throw new Error("ATTEMPT_EXPIRED");
  if (attempt.application_id) throw new Error("ATTEMPT_ALREADY_USED");
}
