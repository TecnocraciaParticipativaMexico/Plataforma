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

function crearFolio(moduleId: number) {
  const year = new Date().getUTCFullYear();
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `DICT-TP-M${moduleId}-${year}-${random}`;
}

function generarDictamenLocal(propuesta: any) {
  return {
    facts: `
Hechos identificados:
- Se recibió una propuesta ciudadana titulada: "${propuesta.title}".
- Módulo: ${propuesta.module_id} - ${propuesta.module_name}.
- Nivel territorial: ${propuesta.level}.
- Estado: ${propuesta.state || "No aplica"}.
- Municipio: ${propuesta.municipality || "No aplica"}.
- Problema reportado: ${propuesta.problem}.
`.trim(),

    evidence_summary: `
Evidencia disponible:
${propuesta.evidence || "No se adjuntó evidencia documental suficiente en esta etapa."}

Observación:
Este dictamen preliminar no sustituye una pericial formal ni una resolución de autoridad competente.
`.trim(),

    methodology: `
Metodología preliminar:
1. Identificación del problema público.
2. Separación entre hechos, inferencias y recomendaciones.
3. Revisión básica de impacto territorial.
4. Revisión de riesgos declarados.
5. Apertura a observaciones colegiadas del comité.
6. Voto técnico ponderado y trazable.
7. Generación de versión pública resumida.
`.trim(),

    technical_analysis: `
Análisis técnico preliminar:
La solución propuesta es: ${propuesta.proposed_solution}.

Impacto esperado:
${propuesta.expected_impact || "No especificado"}.

Costo estimado:
${propuesta.estimated_cost || "No especificado"}.

Este análisis requiere revisión colegiada antes de considerarse dictamen final.
`.trim(),

    legal_human_rights_basis: `
Base jurídico-institucional preliminar:
- Principios de transparencia, participación pública y rendición de cuentas.
- Derecho de acceso a la información.
- Principio de no discriminación.
- Principio de debida diligencia.
- Separación entre evidencia, inferencia técnica y recomendación.
- Protección de datos personales y participación cívica segura.

Nota:
Las referencias legales específicas deberán ser revisadas por especialistas jurídicos antes de uso judicial o internacional.
`.trim(),

    risks: `
Riesgos preliminares:
- Evidencia insuficiente.
- Subestimación de costos.
- Falta de validación territorial.
- Posible conflicto de interés no declarado.
- Implementación incompleta.
${propuesta.risks ? `- Riesgo declarado: ${propuesta.risks}` : ""}
`.trim(),

    impact_analysis: `
Impacto preliminar:
La propuesta podría impactar a población del nivel ${propuesta.level}.
Se requiere valorar costo social, costo económico, factibilidad operativa y posibles externalidades.
`.trim(),

    recommendations: `
Recomendaciones preliminares:
- Solicitar evidencia adicional.
- Abrir observaciones colegiadas.
- Revisar conflictos de interés.
- Someter a voto técnico ponderado.
- Publicar versión ciudadana resumida.
- No presentar como dictamen final hasta completar revisión técnica.
`.trim(),

    public_summary: `
Resumen público:
Esta propuesta fue recibida para análisis técnico preliminar. El comité deberá revisar evidencia, riesgos, impacto y viabilidad antes de emitir una conclusión final.
`.trim(),

    conflict_of_interest_review: `
Revisión de conflictos:
Pendiente de revisión colegiada. Todo participante técnico deberá declarar conflicto de interés antes de emitir voto o recomendación.
`.trim(),

    chain_of_custody_summary: `
Cadena de custodia:
Este dictamen se crea con folio único, timestamp, hash documental y eventos append-only para permitir trazabilidad posterior.
`.trim(),

    final_conclusion: `
Conclusión preliminar:
En revisión. No constituye dictamen final.
`.trim(),
  };
}

async function registrarEvento({
  report_id,
  proposal_id,
  event_type,
  actor_hash,
  payload,
}: {
  report_id: string;
  proposal_id: string;
  event_type: string;
  actor_hash?: string;
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
    event_type,
    actor_hash: actor_hash || null,
    payload,
    previous_hash,
    created_at: new Date().toISOString(),
  });

  await supabase.from("committee_report_events").insert({
    report_id,
    proposal_id,
    event_type,
    actor_hash: actor_hash || null,
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

  return event_hash;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const proposal_id = searchParams.get("proposal_id");

  let query = supabase
    .from("committee_reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (proposal_id) {
    query = query.eq("proposal_id", proposal_id);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    reports: data || [],
    report: proposal_id ? data?.[0] || null : null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { proposal_id, actor_hash } = body;

    if (!proposal_id) {
      return NextResponse.json(
        { ok: false, error: "Falta proposal_id" },
        { status: 400 }
      );
    }

    const { data: propuesta, error: propuestaError } = await supabase
      .from("committee_proposals")
      .select("*")
      .eq("id", proposal_id)
      .single();

    if (propuestaError || !propuesta) {
      return NextResponse.json(
        { ok: false, error: propuestaError?.message || "Propuesta no encontrada" },
        { status: 404 }
      );
    }

    const { data: existente } = await supabase
      .from("committee_reports")
      .select("*")
      .eq("proposal_id", proposal_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existente) {
      return NextResponse.json({
        ok: true,
        report: existente,
        already_exists: true,
      });
    }

    const generado = generarDictamenLocal(propuesta);
    const folio = crearFolio(propuesta.module_id);

    const document_hash = sha256({
      folio,
      proposal_id,
      module_id: propuesta.module_id,
      module_name: propuesta.module_name,
      proposal_title: propuesta.title,
      ...generado,
      created_at: new Date().toISOString(),
    });

    const { data: report, error } = await supabase
      .from("committee_reports")
      .insert({
        proposal_id,
        module_id: propuesta.module_id,
        module_name: propuesta.module_name,
        proposal_title: propuesta.title,
        folio,
        report_type: "preliminar",
        status: "Dictamen preliminar",
        facts: generado.facts,
        evidence_summary: generado.evidence_summary,
        methodology: generado.methodology,
        technical_analysis: generado.technical_analysis,
        legal_human_rights_basis: generado.legal_human_rights_basis,
        risks: generado.risks,
        impact_analysis: generado.impact_analysis,
        recommendations: generado.recommendations,
        public_summary: generado.public_summary,
        conflict_of_interest_review: generado.conflict_of_interest_review,
        chain_of_custody_summary: generado.chain_of_custody_summary,
        final_conclusion: generado.final_conclusion,
        document_hash,
        created_by: actor_hash || "sistema",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    await registrarEvento({
      report_id: report.id,
      proposal_id,
      event_type: "DICTAMEN_PRELIMINAR_CREADO",
      actor_hash: actor_hash || "sistema",
      payload: {
        folio,
        document_hash,
        status: "Dictamen preliminar",
      },
    });

    return NextResponse.json({
      ok: true,
      report,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error creando dictamen" },
      { status: 500 }
    );
  }
}
