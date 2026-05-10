import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function crearResumenAutomatico(data: any) {
  return `
Resumen ejecutivo:
${data.title}

Problema:
${data.problem}

Solución propuesta:
${data.proposed_solution}

Impacto esperado:
${data.expected_impact || "No especificado"}

Riesgos:
${data.risks || "No especificados"}

Urgencia:
${data.urgency || "Media"}

Puntos críticos:
- Revisar evidencia disponible.
- Evaluar costo social y costo económico.
- Confirmar impacto territorial.
- Someter a estudio técnico y voto ponderado.
`.trim();
}

export async function GET() {
  const { data, error } = await supabase
    .from("committee_proposals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, proposals: data || [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    user_id,
    actor_hash,
    module_id,
    module_name,
    level,
    municipality,
    state,
    title,
    problem,
    proposed_solution,
    evidence,
    expected_impact,
    urgency,
    estimated_cost,
    risks,
  } = body;

  if (
    !user_id ||
    !module_id ||
    !module_name ||
    !level ||
    !title ||
    !problem ||
    !proposed_solution
  ) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  const ai_summary = crearResumenAutomatico(body);

  const { data, error } = await supabase
    .from("committee_proposals")
    .insert({
      user_id,
      actor_hash: actor_hash || null,
      module_id,
      module_name,
      level,
      municipality: municipality || null,
      state: state || null,
      title,
      problem,
      proposed_solution,
      evidence: evidence || null,
      expected_impact: expected_impact || null,
      urgency: urgency || "Media",
      estimated_cost: estimated_cost || null,
      risks: risks || null,
      ai_summary,
      status: "En estudio",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, proposal: data });
}
