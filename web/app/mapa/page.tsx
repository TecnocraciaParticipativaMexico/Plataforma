"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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
  if (estado === "Published") return "#16a34a"; // verde
  if (estado === "Review") return "#2563eb"; // azul
  return "#eab308"; // amarillo
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
        setReportes(data.reportes || []);
        if (data.reportes?.length) setSelected(data.reportes[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarReportes();
  }, []);

  const bbox = useMemo(() => {
    if (!reportes.length) return null;

    const lats = reportes.map((r) => r.lat);
    const lngs = reportes.map((r) => r.lng);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [reportes]);

  function project(lat: number, lng: number) {
    if (!bbox) return { x: 50, y: 50 };

    const lngRange = bbox.maxLng - bbox.minLng || 0.01;
    const latRange = bbox.maxLat - bbox.minLat || 0.01;

    const x = ((lng - bbox.minLng) / lngRange) * 100;
    const y = 100 - ((lat - bbox.minLat) / latRange) * 100;

    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    };
  }

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
              <h2 className="text-xl font-bold text-[#0A4E84]">Mapa de reportes</h2>
              <button
                onClick={cargarReportes}
                className="rounded-xl bg-[#0A4E84] px-4 py-2 font-semibold text-white"
              >
                {loading ? "Cargando..." : "Actualizar"}
              </button>
            </div>

            <div className="relative h-[520px] rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden">
              {!reportes.length && (
                <div className="flex h-full items-center justify-center text-slate-500">
                  No hay reportes con coordenadas todavía.
                </div>
              )}

              {!!reportes.length &&
                reportes.map((reporte) => {
                  const pos = project(reporte.lat, reporte.lng);
                  const active = selected?.process_id === reporte.process_id;

                  return (
                    <button
                      key={reporte.process_id}
                      onClick={() => setSelected(reporte)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                      }}
                      title={reporte.titulo}
                    >
                      <div
                        className={`h-5 w-5 rounded-full border-2 border-white shadow ${
                          active ? "scale-125" : ""
                        }`}
                        style={{
                          backgroundColor: colorEstado(reporte.estado_raw),
                        }}
                      />
                    </button>
                  );
                })}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                Recibido
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                En revisión
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-600" />
                Resuelto
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0A4E84]">Detalle del reporte</h2>

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
                  <div className="font-semibold text-slate-800">{selected.titulo}</div>
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
