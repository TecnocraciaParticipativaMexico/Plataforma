export function calcularPrioridad(reporte: {
  descripcion: string;
  created_at: string | null;
}) {
  const texto = (reporte.descripcion || "").toLowerCase();

  let score = 0;

  // 🔥 Riesgo
  if (
    texto.includes("cuerpo") ||
    texto.includes("asesinato") ||
    texto.includes("narco")
  ) {
    score += 100;
  }

  if (texto.includes("robo") || texto.includes("corrupcion")) {
    score += 50;
  }

  // ⏱️ Reciente = más importante
  if (reporte.created_at) {
    const fecha = new Date(reporte.created_at).getTime();
    const ahora = Date.now();
    const horas = (ahora - fecha) / (1000 * 60 * 60);

    if (horas < 24) score += 40;
    else if (horas < 72) score += 20;
  }

  return score;
}
