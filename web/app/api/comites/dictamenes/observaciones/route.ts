import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function sha256(input: any) {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

async function registrarEvento(report_id: string, proposal_id: string, actor_hash: string, payload: any) {
  const { data: lastEvent } = await supabase
    .from("committee_report_events")
    .select("event_hash")
    .eq("report_id", report_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const previous_hash = lastEvent?.event_hash || null;

  const event_hash = sha256({
    report_id,
    proposal_id,
    event_type: "OBSERVACION_COLEGIADA_AGREGADA",
    actor_hash,
    payload,
    previous_hash,
    created_at: new Date().toISOString(),
  });

  await supabase.from("committee_report_events").insert({
    report_id,
    proposal_id,
    event_type: "OBSERVACION_COLEGIADA_AGREGADA",
    actor_hash,
    event_payload: payload,
    previous_hash,
    event_hash,
  });

  await supabase
    .from("committee_reports")
    .update({
      chain_head_hash: event_hash,
      updated_at: new Date().toISOString(),
    })
    .eq("id", report_id);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const report_id = searchParams.get("report_id");

  if (!report_id) {
    return NextResponse.json(
      { ok: false, error: "Falta report_id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("committee_report_observations")
    .select("*")
    .eq("report_id", report_id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    observations: data || [],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      report_id,
      proposal_id,
      actor_hash,
      module_id,
      observation_type,
      content,
    } = body;

    if (!report_id || !proposal_id || !actor_hash || !observation_type || !content) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    if (String(content).trim().length < 20) {
      return NextResponse.json(
        { ok: false, error: "La observación debe tener mínimo 20 caracteres." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("committee_report_observations")
      .insert({
        report_id,
        proposal_id,
        actor_hash,
        module_id: module_id || null,
        observation_type,
        content,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    await registrarEvento(report_id, proposal_id, actor_hash, {
      observation_id: data.id,
      observation_type,
      content,
    });

    return NextResponse.json({
      ok: true,
      observation: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error guardando observación" },
      { status: 500 }
    );
  }
}
