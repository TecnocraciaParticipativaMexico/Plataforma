import { NextResponse } from "next/server";
import { requireUserContext, securityErrorResponse } from "@/lib/security/auth";
import { rejectClientAuthority, requireObject } from "@/lib/security/routeSecurity";

export async function POST(req: Request) {
  try {
    const { supabase } = await requireUserContext(req);
    const body = requireObject(await req.json().catch(() => ({})));
    rejectClientAuthority(body);
    const { data, error } = await supabase.from("civic_processes")
      .select("id,process_type,title,status,state_version,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, processes: data ?? [] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
