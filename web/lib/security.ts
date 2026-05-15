import { NextRequest, NextResponse } from "next/server";
import { createClient, type User } from "@supabase/supabase-js";
import crypto from "crypto";

import { supabaseServer } from "@/lib/supabaseServer";

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateStore = new Map<string, RateEntry>();

function authClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

export function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimit(
  req: NextRequest,
  scope: string,
  limit = 20,
  windowMs = 60_000
) {
  const now = Date.now();
  const key = `${scope}:${clientIp(req)}`;
  const current = rateStore.get(key);

  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;

  if (current.count > limit) {
    return NextResponse.json(
      {
        ok: false,
        error: "RATE_LIMITED",
        message: "Demasiadas solicitudes. Intenta de nuevo en un momento.",
      },
      { status: 429 }
    );
  }

  return null;
}

export function bearerToken(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const [type, token] = auth.split(" ");
  return type?.toLowerCase() === "bearer" && token ? token : null;
}

export async function getUserFromRequest(req: NextRequest) {
  const token = bearerToken(req);
  if (!token) return null;

  const { data, error } = await authClient().auth.getUser(token);
  if (error || !data.user) return null;

  return data.user;
}

export async function requireUser(req: NextRequest) {
  const user = await getUserFromRequest(req);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { ok: false, error: "AUTH_REQUIRED" },
        { status: 401 }
      ),
    };
  }

  return { user, response: null };
}

export function isAdminUser(user: User | null) {
  if (!user?.email) return false;

  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return admins.includes(user.email.toLowerCase());
}

export async function requireAdmin(req: NextRequest) {
  const { user, response } = await requireUser(req);
  if (response) return { user: null, response };

  if (!isAdminUser(user)) {
    return {
      user: null,
      response: NextResponse.json(
        { ok: false, error: "ADMIN_REQUIRED" },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}

export async function requireCommitteeActor(actorHash: string, moduleId?: number) {
  if (!actorHash) {
    return NextResponse.json(
      { ok: false, error: "actor_hash requerido" },
      { status: 400 }
    );
  }

  let query = supabaseServer
    .from("committee_applications")
    .select("id")
    .eq("actor_hash", actorHash)
    .in("review_status", ["Apta", "Integrada"])
    .limit(1);

  if (moduleId) query = query.eq("module_id", moduleId);

  const { data, error } = await query;

  if (error || !data?.length) {
    return NextResponse.json(
      { ok: false, error: "COMMITTEE_ROLE_REQUIRED" },
      { status: 403 }
    );
  }

  return null;
}

export async function assertReportOpen(reportId: string) {
  const { data, error } = await supabaseServer
    .from("committee_reports")
    .select("id,proposal_id,module_id,locked,status,report_version")
    .eq("id", reportId)
    .single();

  if (error || !data) {
    return {
      report: null,
      response: NextResponse.json(
        { ok: false, error: error?.message || "Dictamen no encontrado" },
        { status: 404 }
      ),
    };
  }

  if (data.locked) {
    return {
      report: data,
      response: NextResponse.json(
        { ok: false, error: "DICTAMEN_LOCKED" },
        { status: 423 }
      ),
    };
  }

  return { report: data, response: null };
}

export function publicHash(value: string) {
  const secret =
    process.env.CIVIC_HASH_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "dev-secret";

  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}
