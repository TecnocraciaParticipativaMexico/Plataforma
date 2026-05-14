import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function sha256(input: any) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex");
}

async function registrarEvento({
  report_id,
  proposal_id,
  actor_hash,
  payload,
}: {
  report_id: string;
  proposal_id: string;
  actor_hash: string;
  payload: any;
}) {
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
    actor_hash,
    payload,
    previous_hash,
    created_at: new Date().toISOString(),
  });

  await supabase.from("committee_report_events").insert({
    report_id,
    proposal_id,
    event_type: "VOTO_TECNICO_REGISTRADO",
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
    return NextResponse.json({
      ok: false,
      error: "Falta report_id",
    });
  }

  const { data, error } = await supabase
    .from("committee_technical_votes")
    .select("*")
    .eq("report_id", report_id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }

  const votes = data || [];

  const resumen = {
    total: votes.length,
    aprobada: votes.filter((v) => v.vote === "Aprobada técnicamente").length,
    revision: votes.filter((v) => v.vote === "Requiere revisión").length,
    inviable: votes.filter((v) => v.vote === "No viable").length,
  };

  return NextResponse.json({
    ok: true,
    votes,
    resumen,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      report_id,
      proposal_id,
      actor_hash,
      vote,
      reasoning,
      technical_weight,
      conflict_declared,
    } = body;

    if (
      !report_id ||
      !proposal_id ||
      !actor_hash ||
      !vote ||
      !reasoning
    ) {
      return NextResponse.json({
        ok: false,
        error: "Faltan datos obligatorios",
      });
    }

    if (String(reasoning).trim().length < 20) {
      return NextResponse.json({
        ok: false,
        error: "El razonamiento debe tener mínimo 20 caracteres.",
      });
    }

    const { data: existingVote } = await supabase
      .from("committee_technical_votes")
      .select("id")
      .eq("report_id", report_id)
      .eq("actor_hash", actor_hash)
      .maybeSingle();

    if (existingVote) {
      return NextResponse.json({
        ok: false,
        error: "Ya emitiste un voto técnico para este dictamen.",
      });
    }

    const { data, error } = await supabase
      .from("committee_technical_votes")
      .insert({
        report_id,
        proposal_id,
        actor_hash,
        vote,
        reasoning,
        technical_weight: technical_weight || 1,
        conflict_declared: Boolean(conflict_declared),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        ok: false,
        error: error.message,
      });
    }

    await registrarEvento({
      report_id,
      proposal_id,
      actor_hash,
      payload: {
        vote,
        reasoning,
        technical_weight,
        conflict_declared,
      },
    });

    return NextResponse.json({
      ok: true,
      technical_vote: data,
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err?.message || "Error interno",
    });
  }
}
