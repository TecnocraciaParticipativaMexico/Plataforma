import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { rateLimit, requireCommitteeActor } from "@/lib/security";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MIN_QUORUM_TECNICO = 3;

function sha256(input: any) {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

function calcularResultado(votes: any[]) {
  const validVotes = votes.filter((v) => !v.conflict_declared);

  const aprobada = validVotes.filter((v) => v.vote === "Aprobada técnicamente").length;
  const revision = validVotes.filter((v) => v.vote === "Requiere revisión").length;
  const inviable = validVotes.filter((v) => v.vote === "No viable").length;

  const max = Math.max(aprobada, revision, inviable);

  if (max === 0) return "Sin votos técnicos válidos";
  if (aprobada === max) return "Aprobada técnicamente";
  if (revision === max) return "Requiere revisión";
  return "No viable";
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
    event_type: "DICTAMEN_CERRADO",
    actor_hash,
    payload,
    previous_hash,
    created_at: new Date().toISOString(),
  });

  await supabase.from("committee_report_events").insert({
    report_id,
    proposal_id,
    event_type: "DICTAMEN_CERRADO",
    actor_hash,
    event_payload: payload,
    previous_hash,
    event_hash,
  });

  return event_hash;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { report_id, actor_hash } = body;

    const limited = rateLimit(req, `close-report:${report_id}:${actor_hash}`, 2, 10 * 60_000);
    if (limited) return limited;

    if (!report_id) {
      return NextResponse.json(
        { ok: false, error: "Falta report_id" },
        { status: 400 }
      );
    }

    const { data: report, error: reportError } = await supabase
      .from("committee_reports")
      .select("*")
      .eq("id", report_id)
      .single();

    if (reportError || !report) {
      return NextResponse.json(
        { ok: false, error: reportError?.message || "Dictamen no encontrado" },
        { status: 404 }
      );
    }

    if (report.locked) {
      return NextResponse.json({
        ok: true,
        report,
        already_locked: true,
      });
    }

    const committee = await requireCommitteeActor(actor_hash || "", Number(report.module_id));
    if (committee) return committee;

    const { data: votes, error: votesError } = await supabase
      .from("committee_technical_votes")
      .select("*")
      .eq("report_id", report_id);

    if (votesError) {
      return NextResponse.json(
        { ok: false, error: votesError.message },
        { status: 500 }
      );
    }

    const validVotes = (votes || []).filter((v) => !v.conflict_declared);

    if (validVotes.length < MIN_QUORUM_TECNICO) {
      return NextResponse.json(
        {
          ok: false,
          error: `Quórum insuficiente: se requieren ${MIN_QUORUM_TECNICO} votos técnicos válidos para cerrar el dictamen.`,
        },
        { status: 400 }
      );
    }

    const resultado = calcularResultado(votes || []);

    const dissentNotes = (votes || [])
      .filter((v) => v.vote !== resultado)
      .map((v) => `- ${v.vote}: ${v.reasoning}`)
      .join("\n");

    const finalConclusion = `
Resultado colegiado: ${resultado}

Total de votos técnicos válidos: ${validVotes.length}

Este cierre se basa en los votos técnicos registrados, excluyendo votos con conflicto de interés declarado.
`.trim();

    const eventHash = await registrarEvento(
      report.id,
      report.proposal_id,
      actor_hash || "sistema",
      {
        resultado,
        valid_votes: validVotes.length,
      }
    );

    const { data: updated, error: updateError } = await supabase
      .from("committee_reports")
      .update({
        status: resultado,
        consensus_result: resultado,
        dissent_notes: dissentNotes || "Sin disensos registrados.",
        final_conclusion: finalConclusion,
        locked: true,
        chain_head_hash: eventHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", report_id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { ok: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      report: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Error cerrando dictamen" },
      { status: 500 }
    );
  }
}
