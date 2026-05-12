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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const { data, error } = await supabase
        .from("committee_proposals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true, proposal: data });
    }

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
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}

function textoInvalido(texto: string) {
  const t = texto.toLowerCase().trim();

  const bloqueadas = [
    "ching",
    "pendej",
    "puto",
    "puta",
    "mierda",
    "verga",
    "jaja",
    "asdf",
    "qwerty",
    "test",
    "prueba",
    "tu mama",
    "tu mamá",
    "tu papa",
    "tu papá",
  ];

  if (t.length < 20) return true;

  if (bloqueadas.some((p) => t.includes(p))) {
    return true;
  }

  return false;
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
  !title ||
  !problem ||
  !solution ||
  !expected_impact ||
  !module_id ||
  !module_name ||
  !level
) {
  return NextResponse.json(
    {
      ok: false,
      error: "Completa todos los campos obligatorios.",
    },
    { status: 400 }
  );
}

if (
  textoInvalido(problem) ||
  textoInvalido(solution) ||
  textoInvalido(expected_impact)
) {
  return NextResponse.json(
    {
      ok: false,
      error:
        "La propuesta parece incompleta, inválida o contiene lenguaje no permitido.",
    },
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
