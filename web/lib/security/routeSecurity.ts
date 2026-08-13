import "server-only";

import { NextResponse } from "next/server";
import { SecurityHttpError } from "./authCore";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const FORBIDDEN_AUTHORITY_FIELDS = new Set([
  "user_id", "userId", "actor_hash", "role", "voter_type", "comprehension_score",
  "technical_weight", "vote_weight", "weight", "score", "points", "reputation", "delta",
  "quorum", "result", "final_result", "final_status", "chain_head_hash",
]);

export function requireObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new SecurityHttpError(400, "Invalid request");
  }
  return value as Record<string, unknown>;
}

export function rejectClientAuthority(body: Record<string, unknown>) {
  const pending: unknown[] = [body];
  while (pending.length > 0) {
    const value = pending.pop();
    if (!value || typeof value !== "object") continue;
    if (Array.isArray(value)) {
      pending.push(...value);
      continue;
    }
    const object = value as Record<string, unknown>;
    for (const [field, nested] of Object.entries(object)) {
      if (FORBIDDEN_AUTHORITY_FIELDS.has(field)) {
        throw new SecurityHttpError(400, "Client-supplied authority is not allowed");
      }
      pending.push(nested);
    }
  }
}

export function requireUuid(value: unknown, label = "identifier"): string {
  if (typeof value !== "string" || !UUID.test(value)) {
    throw new SecurityHttpError(400, `Invalid ${label}`);
  }
  return value;
}

export function idempotencyKey(value: unknown): string {
  return value === undefined ? crypto.randomUUID() : requireUuid(value, "idempotency key");
}

export function requestId(request: Request): string {
  const supplied = request.headers.get("x-request-id");
  return supplied && UUID.test(supplied) ? supplied : crypto.randomUUID();
}

export function requireRateLimitBoundary(scope: string) {
  if (process.env.NODE_ENV === "production" && process.env.SECURITY_RATE_LIMIT_PROVIDER !== "upstream") {
    throw new SecurityHttpError(503, `${scope} is unavailable until distributed rate limiting is configured`);
  }
}

type DbError = { code?: string; message?: string };

export function databaseErrorResponse(error: DbError, fallback = "Request could not be completed") {
  const marker = error.message ?? "";
  if (error.code === "42501" || /FORBIDDEN|REQUIRED|ACTIVE_CONFLICT|QUALIFICATION_INVALID/.test(marker)) {
    return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 403 });
  }
  if (error.code === "P0002" || /NOT_FOUND|NOT_OPEN|NOT_ACTIVE/.test(marker)) {
    return NextResponse.json({ ok: false, error: "Resource not found" }, { status: 404 });
  }
  if (error.code === "40001" || /VERSION_CONFLICT/.test(marker)) {
    return NextResponse.json({ ok: false, error: "Resource version conflict" }, { status: 409 });
  }
  if (error.code === "23505" || /VOTE_CONFLICT|ALREADY_USED|EXISTS/.test(marker)) {
    return NextResponse.json({ ok: false, error: "Conflicting request" }, { status: 409 });
  }
  if (/QUORUM_RULE_NOT_CONFIGURED/.test(marker)) {
    return NextResponse.json({ ok: false, error: "Committee quorum policy is not active." }, { status: 503 });
  }
  if (error.code === "55000" || /QUORUM_NOT_MET/.test(marker)) {
    return NextResponse.json({ ok: false, error: "Committee quorum requirements are not met" }, { status: 422 });
  }
  if (error.code === "22023" || /INVALID_/.test(marker)) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  return NextResponse.json({ ok: false, error: fallback }, { status: 503 });
}
