import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { direccion } = body;

    if (!direccion) {
      return NextResponse.json({
        ok: false,
        error: "Dirección vacía",
      });
    }

    // Llamada a OpenStreetMap (GRATIS)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      direccion
    )}&limit=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "tecnocracia-participativa-app",
      },
    });

    const data = await res.json();

    if (!data || data.length === 0) {
      return NextResponse.json({
        ok: false,
        error: "No se encontró la dirección",
      });
    }

    const lugar = data[0];

    return NextResponse.json({
      ok: true,
      result: {
        lat: lugar.lat,
        lon: lugar.lon,
        display_name: lugar.display_name,
      },
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: "Error validando dirección",
    });
  }
}
