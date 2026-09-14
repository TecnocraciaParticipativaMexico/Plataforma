import "server-only";
import type { NextRequest } from "next/server";
import { requireUser } from "@/lib/security/auth";

export async function requireExamUser(request: NextRequest) {
  try {
    return await requireUser(request);
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}
