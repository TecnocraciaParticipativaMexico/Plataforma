import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function extraerTextoEntre(note: string, inicio: string, fin?: string) {
  const start = note.indexOf(inicio);
  if (start === -1) return "";

  const from = start + inicio.length;
  if (!fin) return note.slice(from).trim();

  const end = note.indexOf(fin, from);
  if (end === -1) return note.slice(from).trim();

  return note.slice(from, end).trim();
}

function extraerCoords(note: string) {
  const match = note.match(/Coords dirección:\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/i);
  if (!match) return null;

  return {
    lat: parseFloat(match[1]),
    lng: parseFloat(match[2]),
  };
}

function extraerEstado(events: any[]) {
  const ultimoEstado = [...events]
    .reverse()
    .find((e) => e.event_type === "StatusChanged");

  return {
    raw: ultimoEstado?.payload_json?.status || "Draft",
    label: ultimoEstado?.payload_json?.label || "Recibido",
  };
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("append_only_event")
      .select("*")
      .eq("entity_type", "ProcesoCivico")
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const grouped = new Map<string, any[]>();

    for (const ev of data || []) {
      const processId = ev.entity_id;
      if (!grouped.has(processId)) grouped.set(processId, []);
      grouped.get(processId)!.push(ev);
    }

    const reportes = Array.from(grouped.entries())
      .map(([processId, events]) => {
        const processCreated = events.find((e) => e.event_type === "ProcessCreated");
        const notaInicial = events.find((e) => e.event_type === "CitizenNoteAdded");
        const estado = extraerEstado(events);

        const note = notaInicial?.payload_json?.note || "";
        const coords = extraerCoords(note);

        if (!coords) return null;

        return {
          process_id: processId,
          titulo: processCreated?.payload_json?.tipo_proceso || "Reporte ciudadano",
          descripcion: note,
          estado_raw: estado.raw,
          estado_label: estado.label,
          lat: coords.lat,
          lng: coords.lng,
          created_at: processCreated?.created_at || events[0]?.created_at || null,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      ok: true,
      reportes,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Error cargando mapa" },
      { status: 500 }
    );
  }
}
