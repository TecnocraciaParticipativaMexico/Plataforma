import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function calcularPeso(score: number) {
  if (score <= 0) return 0;
  if (score > 10) return 1;
  return Number((score / 10).toFixed(2));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const proposal_id = searchParams.get("proposal_id");
  const actor_hash = searchParams.get("actor_hash");

  let query = supabase
    .from("proposal_votes")
    .select("*")
    .order("created_at", { ascending: false });

  if (proposal_id) query = query.eq("proposal_id", proposal_id);
  if (actor_hash) query = query.eq("actor_hash", actor_hash);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const votes = data || [];

  const resumen = {
    total: votes.length,
    favor: votes.filter((v) => v.vote === "A favor").length,
    contra: votes.filter((v) => v.vote === "En contra").length,
    requiereCambios: votes.filter((v) => v.vote === "Requiere cambios").length,
    abstencion: votes.filter((v) => v.vote === "Abstención").length,
    pesoFavor: votes
      .filter((v) => v.vote === "A favor")
      .reduce((sum, v) => sum + Number(v.vote_weight || 0), 0),
    pesoContra: votes
      .filter((v) => v.vote === "En contra")
      .reduce((sum, v) => sum + Number(v.vote_weight || 0), 0),
  };

  return NextResponse.json({ ok: true, votes, resumen });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      proposal_id,
      user_id,
      actor_hash,
      voter_type,
      vote,
      comprehension_score,
      proposal_title,
      module_id,
      module_name,
    } = body;

    if (!proposal_id || !actor_hash || !vote || comprehension_score === undefined) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const score = Number(comprehension_score);

    if (score < 0 || score > 10) {
      return NextResponse.json(
        { ok: false, error: "Score inválido" },
        { status: 400 }
      );
    }

    const vote_weight = calcularPeso(score);

    const { data, error } = await supabase
      .from("proposal_votes")
      .insert({
        proposal_id,
        user_id: user_id || null,
        actor_hash,
        voter_type: voter_type || "ciudadano",
        vote,
        comprehension_score: score,
        vote_weight,
        proposal_title: proposal_title || null,
        module_id: module_id || null,
        module_name: module_name || null,
      })
      .select()
      .single();

    if (error) {
      const duplicate =
        error.message.includes("duplicate") ||
        error.message.includes("unique") ||
        error.code === "23505";

      return NextResponse.json(
        {
          ok: false,
          error: duplicate
            ? "Ya votaste esta propuesta. Puedes consultar tu voto en Mis votos."
            : error.message,
        },
        { status: duplicate ? 409 : 500 }
      );
    }

    return NextResponse.json({ ok: true, vote: data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}
