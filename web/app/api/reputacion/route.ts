import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser(req);
    if (req.nextUrl.searchParams.has("actor_hash")) {
      return NextResponse.json({ ok: false, error: "Client-supplied identity is not allowed" }, { status: 400 });
    }
    const { data, error } = await supabaseServer.from("civic_reputation").select("*")
      .eq("actor_hash", user.id).maybeSingle();
    if (error) throw error;
    return NextResponse.json({ ok: true, reputacion: data || null });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUser(req);
    const body = await req.json().catch(() => ({}));
    if (body?.actor_hash !== undefined || body?.user_id !== undefined || body?.comprehension_score !== undefined) {
      return NextResponse.json({ ok: false, error: "Client-supplied identity or score is not allowed" }, { status: 400 });
    }
    return NextResponse.json(
      { ok: false, error: "Reputation updates require a server-verified source event." },
      { status: 503 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
