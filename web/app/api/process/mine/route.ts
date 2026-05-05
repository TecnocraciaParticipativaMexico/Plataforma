import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const actor_hash = body?.actor_hash;

    if (!actor_hash) {
      return NextResponse.json({
        ok: false,
        error: "actor_hash requerido",
      });
    }

    const { data, error } = await supabaseServer
      .from("append_only_event")
      .select("*")
      .eq("entity_type", "ProcesoCivico")
      .eq("actor_hash", actor_hash)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({
        ok: false,
        error: error.message,
      });
    }

    const procesos = new Map<string, any>();

    for (const evento of data || []) {
      const processId = evento.entity_id;

      if (!procesos.has(processId)) {
        procesos.set(processId, {
          process_id: processId,
          titulo:
            evento.payload_json?.tipo_proceso ||
            evento.payload_json?.title ||
            "Denuncia ciudadana",
          estado: "Recibido",
          created_at: evento.created_at,
        });
      }

      if (evento.event_type === "StatusChanged") {
        procesos.get(processId).estado =
          evento.payload_json?.label ||
          evento.payload_json?.status ||
          "Estado actualizado";
      }

      if (evento.event_type === "ProcessCreated") {
        procesos.get(processId).titulo =
          evento.payload_json?.tipo_proceso || "Denuncia ciudadana";
      }
    }

    return NextResponse.json({
      ok: true,
      denuncias: Array.from(procesos.values()),
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error?.message || "Error cargando denuncias",
    });
  }
}
