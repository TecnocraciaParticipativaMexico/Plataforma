import type { User } from "@supabase/supabase-js";

export class SecurityHttpError extends Error {
  readonly status: 400 | 401 | 403 | 404 | 409 | 410 | 503;

  constructor(status: 400 | 401 | 403 | 404 | 409 | 410 | 503, message: string) {
    super(message);
    this.status = status;
  }
}

export type GetUserResult = Promise<{
  data: { user: User | null };
  error: unknown;
}>;

export async function authenticateBearer(
  authorization: string | null,
  getUser: (token: string) => GetUserResult,
): Promise<User> {
  const match = authorization?.match(/^Bearer\s+([^\s]+)$/i);
  if (!match) throw new SecurityHttpError(401, "Authentication required");
  const { data, error } = await getUser(match[1]);
  if (error || !data.user) throw new SecurityHttpError(401, "Invalid authentication");
  return data.user;
}

export function assertNoClientIdentity(body: unknown) {
  if (!body || typeof body !== "object") return;
  const value = body as Record<string, unknown>;
  if (value.user_id !== undefined || value.actor_hash !== undefined || value.role !== undefined) {
    throw new SecurityHttpError(400, "Client-supplied identity is not allowed");
  }
}

export function assertNoClientScore(body: unknown) {
  if (!body || typeof body !== "object") return;
  const value = body as Record<string, unknown>;
  if (value.comprehension_score !== undefined || value.vote_weight !== undefined || value.technical_weight !== undefined) {
    throw new SecurityHttpError(400, "Client-supplied scores or weights are not allowed");
  }
}

export function assertOwner(ownerId: string | null, userId: string) {
  if (!ownerId || ownerId !== userId) throw new SecurityHttpError(404, "Resource not found");
}

export function assertCitizenEvent(eventType: string) {
  if (eventType !== "CitizenNoteAdded") {
    throw new SecurityHttpError(403, "This event type is not allowed for citizens");
  }
}
