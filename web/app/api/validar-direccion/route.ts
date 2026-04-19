import { NextResponse } from "next/server";

function distanciaMetros(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function extraerCoordsDeTexto(texto: string) {
  const match = texto.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (!match) return null;

  return {
    lat: parseFloat(match[1]),
    lon: parseFloat(match[2]),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { direccion, mapsLink } = body;

    if (!direccion) {
      return NextResponse.json({ ok: false, error: "Dirección vacía" });
    }

    // 🔎 Buscar dirección real
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
        error: "La dirección no existe en el mapa",
      });
    }

    const lugar = data[0];

    const direccionCoords = {
      lat: parseFloat(lugar.lat),
      lon: parseFloat(lugar.lon),
    };

    // 🔎 Intentar sacar coords del link
    let comparacion = null;

    if (mapsLink) {
      const decoded = decodeURIComponent(mapsLink);
      const linkCoords = extraerCoordsDeTexto(decoded);

      if (linkCoords) {
        const dist = distanciaMetros(
          direccionCoords.lat,
          direccionCoords.lon,
          linkCoords.lat,
          linkCoords.lon
        );

        let estado = "coincide";
        if (dist > 1000) estado = "no_coincide";
        else if (dist > 200) estado = "aproximado";

        comparacion = {
          distancia_metros: Math.round(dist),
          estado,
        };
      }
    }

    return NextResponse.json({
      ok: true,
      result: {
        direccionCoords,
        display_name: lugar.display_name,
        comparacion,
      },
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: "Error validando ubicación",
    });
  }
}
