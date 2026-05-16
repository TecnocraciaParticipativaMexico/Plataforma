import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { rateLimit } from "@/lib/security";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function calcularPeso(score: number) {
  if (score <= 0) return 0;
  if (score > 10) return 1;
  return Number((score / 10).toFixed(2));
}

function detectarSpam(respuestas: string[]) {
  const bloqueadas = [
    "jajaja", "asdf", "qwerty", "xxxxx", "12345", "prueba", "test",
    "tu mama", "tu mamá", "tu papa", "tu papá", "ching", "pendej",
    "puta", "puto", "mierda", "verga", "no se", "no sé",
  ];

  return respuestas.some((r) => {
    const texto = String(r || "").toLowerCase().trim();
    if (texto.length < 20) return true;
    return bloqueadas.some((p) => texto.includes(p));
  });
}

function calcularRiesgo(params: {
  score: number;
  timeSpent: number;
  spam: boolean;
}) {
  let risk = 0;

  if (params.timeSpent < 60) risk += 50;
  if (params.timeSpent < 30) risk += 30;
  if (params.score < 4) risk += 25;
  if (params.spam) risk += 50;

  return Math.min(risk, 100);
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

  if (proposal_id && actor_hash) {
    return NextResponse.json({
      ok: true,
      yaVoto: votes.length > 0,
      votes,
    });
  }

  const normales = votes.filter((v) => v.review_status !== "sospechoso");

  const resumen = {
    total: votes.length,
    normales: normales.length,
    sospechosos: votes.filter((v) => v.review_status === "sospechoso").length,
    favor: normales.filter((v) => v.vote === "A favor").length,
    contra: normales.filter((v) => v.vote === "En contra").length,
    requiereCambios: normales.filter((v) => v.vote === "Requiere cambios").length,
    abstencion: normales.filter((v) => v.vote === "Abstención").length,
    pesoFavor: normales
      .filter((v) => v.vote === "A favor")
      .reduce((sum, v) => sum + Number(v.vote_weight || 0), 0),
    pesoContra: normales
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
      respuestas,
      time_spent_seconds,
    } = body;

    if (!proposal_id || !actor_hash || !vote || comprehension_score === undefined) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const limited = rateLimit(req, `proposal-vote:${proposal_id}:${actor_hash}`, 3, 10 * 60_000);
    if (limited) return limited;

    const score = Number(comprehension_score);
    const timeSpent = Number(time_spent_seconds || 0);
    const respuestasArray = Array.isArray(respuestas) ? respuestas : [];

    if (score < 0 || score > 10) {
      return NextResponse.json(
        { ok: false, error: "Score inválido" },
        { status: 400 }
      );
    }

    const spam = detectarSpam(respuestasArray);
    const riskScore = calcularRiesgo({
      score,
      timeSpent,
      spam,
    });

    const suspicious = riskScore >= 50;
    const vote_weight = suspicious ? 0 : calcularPeso(score);

    const { data: existingVote } = await supabase
      .from("proposal_votes")
      .select("id")
      .eq("proposal_id", proposal_id)
      .eq("actor_hash", actor_hash)
      .maybeSingle();

    if (existingVote) {
      return NextResponse.json(
        {
          ok: false,
          error: "Ya votaste esta propuesta. Puedes consultar tu voto en Mis votos.",
        },
        { status: 409 }
      );
    }

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
        time_spent_seconds: timeSpent,
        spam_flag: spam,
        suspicious_flag: suspicious,
        risk_score: riskScore,
        review_status: suspicious ? "sospechoso" : "normal",
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
      { ok: false, error: err.message || "Error interno" },
      { status: 500 }
    );
  }
}
