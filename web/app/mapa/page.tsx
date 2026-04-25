"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { calcularPrioridad } from "@/lib/prioridad";

const MapaReportes = dynamic(() => import("./MapaReportes"), {
  ssr: false,
});

type Riesgo = "ALTO" | "MEDIO" | "BAJO";

type Reporte = {
  process_id: string;
  titulo: string;
  descripcion: string;
  estado_raw: string;
  estado_label: string;
  lat: number;
  lng: number;
  created_at: string | null;
  riesgo?: Riesgo;
};

const categorias = [
  "Baches",
  "Alumbrado Público",
  "Basura",
  "Agua",
  "Seguridad",
  "Corrupción",
  "Otro",
];

function clasificarRiesgo(texto: string): Riesgo {
  const t = (texto || "").toLowerCase();

  if (
    t.includes("cuerpo") ||
    t.includes("muerto") ||
    t.includes("narco") ||
    t.includes("asesinato") ||
    t.includes("balazo") ||
    t.includes("balazos")
  ) {
    return "ALTO";
  }

  if (
    t.includes("robo") ||
    t.includes("corrupcion") ||
    t.includes("corrupción") ||
    t.includes("amenaza")
  ) {
    return "MEDIO";
  }

  return "BAJO";
}

function pesoRiesgo(riesgo: Riesgo) {
  if (riesgo === "ALTO") return 3;
  if (riesgo === "MEDIO") return 2;
  return 1;
}

function obtenerCategoria(reporte: Reporte) {
  const titulo = reporte.titulo || "";

  const encontrada = categorias.find((cat) =>
    titulo.toLowerCase().startsWith(cat.toLowerCase())
  );

  return encontrada || "Otro";
}

function colorEstado(estado: string) {
  if (estado === "Published") return "#E62E8A";
  if (estado === "Review") return "#7C3AED";
  return "#38BDF8";
}

export default function MapaPage() {
  const [todosReportes, setTodosReportes] = useState<Reporte[]>([]);
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [selected, setSelected] = useState<Reporte | null>(null);
  const [loading, setLoading] = useState(false);

  const [filtrosRiesgo, setFiltrosRiesgo] = useState<Riesgo[]>([
    "ALTO",
    "MEDIO",
    "BAJO",
  ]);

  const [filtrosCategoria, setFiltrosCategoria] = useState<string[]>([
    ...categorias,
  ]);

  function ordenarReportes(lista: Reporte[]) {
    return [...lista].sort((a, b) => {
      const riesgoA = clasificarRiesgo(a.descripcion);
      const riesgoB = clasificarRiesgo(b.descripcion);

      const diferenciaRiesgo = pesoRiesgo(riesgoB) - pesoRiesgo(riesgoA);
      if (diferenciaRiesgo !== 0) return diferenciaRiesgo;

      return calcularPrioridad(b) - calcularPrioridad(a);
    });
  }

  function aplicarFiltros(
    lista: Reporte[],
    riesgos: Riesgo[],
    categoriasActivas: string[]
  ) {
    const filtrados = lista.filter((reporte) => {
      const riesgo = reporte.riesgo || clasificarRiesgo(reporte.descripcion);
      const categoria = obtenerCategoria(reporte);

      return (
        riesgos.includes(riesgo) && categoriasActivas.includes(categoria)
      );
    });

    const ordenados = ordenarReportes(filtrados);

    setReportes(ordenados);
    setSelected(ordenados[0] || null);
  }

  function toggleRiesgo(riesgo: Riesgo) {
    const nuevos = filtrosRiesgo.includes(riesgo)
      ? filtrosRiesgo.filter((r) => r !== riesgo)
      : [...filtrosRiesgo, riesgo];

    setFiltrosRiesgo(nuevos);
    aplicarFiltros(todosReportes, nuevos, filtrosCategoria);
  }

  function toggleCategoria(categoria: string) {
    const nuevos = filtrosCategoria.includes(categoria)
      ? filtrosCategoria.filter((c) => c !== categoria)
      : [...filtrosCategoria, categoria];

    setFiltrosCategoria(nuevos);
    aplicarFiltros(todosReportes, filtrosRiesgo, nuevos);
  }

  function seleccionarTodos() {
    setFiltrosRiesgo(["ALTO", "MEDIO", "BAJO"]);
    setFiltrosCategoria([...categorias]);
    aplicarFiltros(todosReportes, ["ALTO", "MEDIO", "BAJO"], [...categorias]);
  }

  async function cargarReportes() {
    try {
      setLoading(true);
      const res = await fetch("/api/mapa/reportes");
      const data = await res.json();

      if (data?.ok) {
const lista = ((data.reportes || []) as Reporte[]).map((reporte) => ({
  ...reporte,
  riesgo: clasificarRiesgo(reporte.descripcion),
}));

setTodosReportes(lista);
aplicarFiltros(lista, filtrosRiesgo, filtrosCategoria);
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
          Visualiza reportes ciudadanos por ubicación, riesgo y categoría.
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

            <div className="mb-4 rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 font-bold text-[#0A4E84]">
                Filtrar por riesgo
              </div>

              <div className="flex flex-wrap gap-2">
                {(["ALTO", "MEDIO", "BAJO"] as Riesgo[]).map((riesgo) => (
                  <button
                    key={riesgo}
                    onClick={() => toggleRiesgo(riesgo)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                      filtrosRiesgo.includes(riesgo)
                        ? "bg-[#0A4E84] text-white"
                        : "bg-white text-slate-600"
                    }`}
                  >
                    {riesgo === "ALTO"
                      ? "Riesgo alto"
                      : riesgo === "MEDIO"
                      ? "Riesgo medio"
                      : "Riesgo bajo"}
                  </button>
                ))}
              </div>

              <div className="mt-4 mb-2 font-bold text-[#0A4E84]">
                Filtrar por categoría
              </div>

              <div className="flex flex-wrap gap-2">
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    onClick={() => toggleCategoria(categoria)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                      filtrosCategoria.includes(categoria)
                        ? "bg-[#E62E8A] text-white"
                        : "bg-white text-slate-600"
                    }`}
                  >
                    {categoria}
                  </button>
                ))}

                <button
                  onClick={seleccionarTodos}
                  className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                >
                  Ver todo
                </button>
              </div>
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
                <span className="h-3 w-3 bg-orange-500" />
                Riesgo medio
              </div>

              <div className="flex items-center gap-2">
                <span
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderBottom: "13px solid #dc2626",
                  }}
                />
                Riesgo alto
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0A4E84]">
              Detalle del reporte
            </h2>

            {!selected && (
              <div className="mt-4 text-slate-500">
                No hay reportes visibles con los filtros seleccionados.
              </div>
            )}

            {selected && (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Riesgo IA</div>
                  <div className="text-2xl font-bold text-slate-800">
                    {clasificarRiesgo(selected.descripcion)}
                  </div>
                </div>

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
                  <div className="text-sm text-slate-500">Categoría</div>
                  <div className="font-semibold text-slate-800">
                    {obtenerCategoria(selected)}
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
