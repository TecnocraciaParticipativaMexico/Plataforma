import { NextRequest, NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { rejectClientAuthority, requireObject, requireUuid } from "@/lib/security/routeSecurity";

export async function GET(req: NextRequest) {
  try {
    const { supabase } = await requireUserContext(req);
    const id = req.nextUrl.searchParams.get("id");
    let query = supabase.from("committee_proposals")
      .select("id,module_id,title,status,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (id) query = query.eq("id", requireUuid(id, "proposal ID"));
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ ok: true, proposals: data ?? [] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUserContext(req);
    const body = requireObject(await req.json().catch(() => ({})));
    rejectClientAuthority(body);
    return NextResponse.json(
      { ok: false, error: "Proposal creation authority is not defined" },
      { status: 403 },
    );
  } catch (error) {
    return securityErrorResponse(error);
  }
}
