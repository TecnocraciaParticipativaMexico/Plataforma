import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertNoClientIdentity, assertNoClientScore } from "@/lib/security/authCore";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser(req);
    const proposalId = req.nextUrl.searchParams.get("proposal_id");
    let query = supabaseServer.from("proposal_votes").select("*").eq("user_id", user.id);
    if (proposalId) query = query.eq("proposal_id", proposalId);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, votes: data || [] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUser(req);
    const body = await req.json();
    assertNoClientIdentity(body);
    if (body?.voter_type !== undefined) {
      return NextResponse.json({ ok: false, error: "Client-supplied identity or role is not allowed" }, { status: 400 });
    }
    assertNoClientScore(body);
    return NextResponse.json(
      { ok: false, error: "Voting is temporarily unavailable until a server-verified qualification can be linked." },
      { status: 503 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
