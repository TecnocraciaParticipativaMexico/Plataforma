import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertProcessOwner } from "@/lib/security/processOwnership";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser(req);
    if (req.nextUrl.searchParams.has("actor_hash")) {
      return NextResponse.json({ ok: false, error: "Client-supplied identity is not allowed" }, { status: 400 });
    }
    const { data, error } = await supabaseServer.from("citizen_report_index")
      .select("process_id,title,category,created_at").eq("actor_hash", user.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, reports: data || [] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser(req);
    const body = await req.json();
    if (body?.actor_hash !== undefined || body?.user_id !== undefined) {
      return NextResponse.json({ ok: false, error: "Client-supplied identity is not allowed" }, { status: 400 });
    }
    const processId = String(body?.process_id ?? "").trim();
    if (!processId) return NextResponse.json({ ok: false, error: "process_id is required" }, { status: 400 });
    await assertProcessOwner(processId, user.id);
    const { error } = await supabaseServer.from("citizen_report_index").insert({
      actor_hash: user.id, process_id: processId,
      title: String(body?.title || "Denuncia ciudadana"), category: String(body?.category || "Otro"),
    });
    if (error && error.code !== "23505") throw error;
    return NextResponse.json({ ok: true }, { status: error ? 409 : 200 });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
