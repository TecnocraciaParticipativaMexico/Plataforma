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
    } = body;

    if (
      !proposal_id ||
      !vote ||
      comprehension_score === undefined
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Faltan datos obligatorios",
        },
        { status: 400 }
      );
    }

    const score = Number(comprehension_score);

    if (score < 0 || score > 10) {
      return NextResponse.json(
        {
          ok: false,
          error: "Score inválido",
        },
        { status: 400 }
      );
    }

    const vote_weight = calcularPeso(score);

    const { data, error } = await supabase
      .from("proposal_votes")
      .insert({
        proposal_id,
        user_id: user_id || null,
        actor_hash: actor_hash || null,
        voter_type: voter_type || "ciudadano",
        vote,
        comprehension_score: score,
        vote_weight,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      vote: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Error interno",
      },
      { status: 500 }
    );
  }
}
