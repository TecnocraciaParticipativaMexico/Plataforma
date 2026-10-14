import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { rejectClientAuthority, requireObject } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    if (req.nextUrl.searchParams.has("actor_hash") || req.nextUrl.searchParams.has("user_id")) {
      return NextResponse.json({ ok: false, error: "Client-supplied identity is not allowed" }, { status: 400 });
    }
    const { data, error } = await supabase.from("reputation_events")
      .select("points,rule_version,created_at").order("created_at", { ascending: false });
    if (error) throw error;
    const total = (data ?? []).reduce((sum, event) => sum + Number(event.points), 0);
    return NextResponse.json({ ok: true, total, events: data ?? [] });
  } catch (error) { return securityErrorResponse(error); }
}

export async function POST(req: NextRequest) {
  try {
    await requireUserContext(req);
    const body = requireObject(await req.json().catch(() => ({})));
    rejectClientAuthority(body);
    return NextResponse.json(
      { ok: false, error: "Reputation updates require a server-verified source event" },
      { status: 503 },
    );
  } catch (error) { return securityErrorResponse(error); }
}
