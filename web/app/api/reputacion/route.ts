import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function detectarSpam(texto: string) {
  const t = texto.toLowerCase();

  const patrones = [
    "jajaja",
    "asdf",
    "xxxxx",
    "12345",
    "no se",
    "nose",
    "hola",
    "test",
    "prueba",
    "aaa",
    "bbb",
  ];

  if (texto.trim().length < 20) return true;

  if (patrones.some((p) => t.includes(p))) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const actor_hash = searchParams.get("actor_hash");

  if (!actor_hash) {
    return NextResponse.json(
      { ok: false, error: "Falta actor_hash" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("civic_reputation")
    .select("*")
    .eq("actor_hash", actor_hash)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    reputacion: data || null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      actor_hash,
      respuestas,
      comprehension_score,
    } = body;

    if (!actor_hash) {
      return NextResponse.json(
        {
          ok: false,
          error: "Falta actor_hash",
        },
        { status: 400 }
      );
    }

    let spamDetectado = false;

    for (const r of respuestas || []) {
      if (detectarSpam(r || "")) {
        spamDetectado = true;
      }
    }

    const technicalScore = Number(comprehension_score || 0);

    const { data: existing } = await supabase
      .from("civic_reputation")
      .select("*")
      .eq("actor_hash", actor_hash)
      .single();

    if (!existing) {
      const { error } = await supabase
        .from("civic_reputation")
        .insert({
          actor_hash,
          technical_score: technicalScore,
          citizen_score: technicalScore,
          spam_flags: spamDetectado ? 1 : 0,
        });

      if (error) {
        return NextResponse.json(
          {
            ok: false,
            error: error.message,
          },
          { status: 500 }
        );
      }
    } else {
      const nuevosSpamFlags =
        Number(existing.spam_flags || 0) +
        (spamDetectado ? 1 : 0);

      const nuevoTechnical =
        Number(existing.technical_score || 0) +
        technicalScore;

      const suspension =
        nuevosSpamFlags >= 5
          ? new Date(
              Date.now() + 1000 * 60 * 60 * 24 * 30
            ).toISOString()
          : existing.suspension_until;

      const { error } = await supabase
        .from("civic_reputation")
        .update({
          technical_score: nuevoTechnical,
          citizen_score: nuevoTechnical,
          spam_flags: nuevosSpamFlags,
          suspension_until: suspension,
        })
        .eq("actor_hash", actor_hash);

      if (error) {
        return NextResponse.json(
          {
            ok: false,
            error: error.message,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      spam_detectado: spamDetectado,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Error reputación",
      },
      { status: 500 }
    );
  }
}
