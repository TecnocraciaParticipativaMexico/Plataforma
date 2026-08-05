import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertNoClientIdentity } from "@/lib/security/authCore";

export async function POST(req: Request) {
  try {
    const user = await requireUser(req);
    const body = await req.json();
    assertNoClientIdentity(body);
    const tipoProceso = String(body?.tipo_proceso ?? "").trim();
    if (!tipoProceso) return NextResponse.json({ ok: false, error: "tipo_proceso is required" }, { status: 400 });
    const { data, error } = await supabaseServer.rpc("create_process_with_event", {
      p_tipo_proceso: tipoProceso,
      p_actor_hash: user.id,
    });
    if (error) throw error;
    const result = data?.[0] ?? data;
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
