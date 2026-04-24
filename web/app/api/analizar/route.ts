import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const texto = (body.texto || "").toLowerCase();

  let riesgo = "BAJO";
  let credibilidad = "ALTA";
  let flags: string[] = [];

  // 🔥 Riesgo
  if (
    texto.includes("cuerpo") ||
    texto.includes("asesinato") ||
    texto.includes("narco")
  ) {
    riesgo = "ALTO";
  }

  // 🤡 Bromas / basura
  if (
    texto.includes("tu mama") ||
    texto.includes("lol") ||
    texto.includes("jaja")
  ) {
    credibilidad = "BAJA";
    flags.push("posible_broma");
  }

  // 📍 incoherencia simple
  if (texto.length < 10) {
    credibilidad = "BAJA";
    flags.push("descripcion_corta");
  }

  return NextResponse.json({
    riesgo,
    credibilidad,
    flags,
  });
}
