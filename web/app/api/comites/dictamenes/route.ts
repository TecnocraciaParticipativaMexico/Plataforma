import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    ok: true,
    reports: data || [],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      proposal_id,
      module_id,
      module_name,
      report_type,
      technical_summary,
      risks,
      impact_analysis,
      recommendations,
      consensus_result,
      created_by,
    } = body;

    if (!proposal_id) {
      return NextResponse.json({
        ok: false,
        error: "proposal_id requerido",
      });
    }

    const { data, error } = await supabase
      .from("committee_reports")
      .insert({
        proposal_id,
        module_id,
        module_name,
        report_type: report_type || "preliminar",
        technical_summary,
        risks,
        impact_analysis,
        recommendations,
        consensus_result,
        created_by,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        ok: false,
        error: error.message,
      });
    }

    return NextResponse.json({
      ok: true,
      report: data,
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err?.message || "Error interno",
    });
  }
}
