import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireUser, securityErrorResponse } from "@/lib/security/auth";
import { assertNoClientIdentity } from "@/lib/security/authCore";

export async function POST(req: Request) {
  try {
    const user = await requireUser(req);
    const body = await req.json().catch(() => ({}));
    assertNoClientIdentity(body);
    const { data, error } = await supabaseServer.from("append_only_event").select("*")
      .eq("entity_type", "ProcesoCivico").eq("actor_hash", user.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    const processes = new Map<string, { process_id: string; titulo: string; estado: string; created_at: string }>();
    for (const event of data || []) {
      const current = processes.get(event.entity_id) ?? {
        process_id: event.entity_id, titulo: "Denuncia ciudadana", estado: "Recibido", created_at: event.created_at,
      };
      if (event.event_type === "ProcessCreated") current.titulo = event.payload_json?.tipo_proceso || current.titulo;
      processes.set(event.entity_id, current);
    }
    return NextResponse.json({ ok: true, denuncias: [...processes.values()] });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
