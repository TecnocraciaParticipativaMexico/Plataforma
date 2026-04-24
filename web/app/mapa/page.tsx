"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

function clasificarRiesgo(texto: string) {
  const t = texto.toLowerCase();

  if (
    t.includes("cuerpo") ||
    t.includes("muerto") ||
    t.includes("narco") ||
    t.includes("asesinato")
  ) {
    return "ALTO";
  }

  if (t.includes("robo") || t.includes("corrupcion")) {
    return "MEDIO";
  }

  return "BAJO";
}

const MapaReportes = dynamic(() => import("./MapaReportes"), {
  ssr: false,
});

type Reporte = {
  process_id: string;
  titulo: string;
  descripcion: string;
  estado_raw: string;
  estado_label: string;
  lat: number;
  lng: number;
  created_at: string | null;
};

function colorEstado(estado: string) {
  if (estado === "Published") return "#16a34a";
  if (estado === "Review") return "#2563eb";
  return "#eab308";
}

export default function MapaPage() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [selected, setSelected] = useState<Reporte | null>(null);
  const [loading, setLoading] = useState(false);

  async function cargarReportes() {
    try {
      setLoading(true);
      const res = await fetch("/api/mapa/reportes");
      const data = await res.json();

      if (data?.ok) {
        const seguros = (data.reportes || []).filter(
          (r: Reporte) => clasificarRiesgo(r.descripcion) !== "ALTO"
        );

        setReportes(seguros);
        if (seguros.length) setSelected(seguros[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarReportes();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-[#0A4E84]">Mapa ciudadano</h1>
        <p className="mt-2 text-slate-600">
          Visualiza reportes ciudadanos por ubicación del hecho.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-[28px] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0A4E84]">
                Mapa de reportes
              </h2>

              <button
                onClick={cargarReportes}
                className="rounded-xl bg-[#0A4E84] px-4 py-2 font-semibold text-white"
              >
                {loading ? "Cargando..." : "Actualizar"}
              </button>
            </div>

            <MapaReportes
              reportes={reportes}
              selected={selected}
              onSelect={setSelected}
            />

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
  <div className="flex items-center gap-2">
    <span className="h-3 w-3 rounded-full bg-yellow-400" />
    Riesgo bajo
  </div>
  <div className="flex items-center gap-2">
    <span className="h-3 w-3 rounded-full bg-orange-500" />
    Riesgo medio
  </div>
  <div className="flex items-center gap-2">
    <span className="h-3 w-3 rounded-full bg-red-600" />
    Riesgo alto
  </div>
</div>

          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0A4E84]">
              Detalle del reporte
            </h2>

            {!selected && (
              <div className="mt-4 text-slate-500">
                Selecciona un marcador para ver el detalle.
              </div>
            )}

            {selected && (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Estado</div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: colorEstado(selected.estado_raw) }}
                  >
                    {selected.estado_label}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Proceso</div>
                  <div className="font-semibold text-slate-800">
                    {selected.titulo}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">ID del proceso</div>
                  <div className="break-all text-sm text-slate-800">
                    {selected.process_id}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Coordenadas</div>
                  <div className="text-sm text-slate-800">
                    {selected.lat}, {selected.lng}
                  </div>
                </div>

                <Link
                  href={`/seguimiento?processId=${selected.process_id}`}
                  className="inline-block rounded-xl bg-[#0A4E84] px-4 py-3 font-semibold text-white"
                >
                  Ver seguimiento
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
