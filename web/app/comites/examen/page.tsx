"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { modulosTecnocracia } from "../../lib/modulosTecnocracia";
import { obtenerExamenModulo } from "../../lib/examenesComites";

const MIN_APROBACION = 7;

export default function ExamenComitePage() {
  const [moduleId, setModuleId] = useState(1);
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [resultado, setResultado] = useState<{
    total: number;
    correctas: number;
    aprobado: boolean;
  } | null>(null);

  const preguntas = useMemo(() => obtenerExamenModulo(moduleId), [moduleId]);

  function calificar() {
    let correctas = 0;

    for (const pregunta of preguntas) {
      if (respuestas[pregunta.id] === pregunta.respuestaCorrecta) {
        correctas++;
      }
    }

    const aprobado = correctas >= MIN_APROBACION;

    const resultadoFinal = {
      total: preguntas.length,
      correctas,
      aprobado,
    };

    setResultado(resultadoFinal);

    localStorage.setItem(
      "ultimo_examen_comite",
      JSON.stringify({
        module_id: moduleId,
        module_name: modulosTecnocracia.find((m) => m.id === moduleId)?.nombre,
        ...resultadoFinal,
        created_at: new Date().toISOString(),
      })
    );
  }

  function reiniciar() {
    setRespuestas({});
    setResultado(null);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#0A4E84]">
      <div className="mx-auto max-w-3xl">
        <Link href="/comites" className="mb-4 inline-block text-sm font-semibold">
          ← Volver a comités
        </Link>

        <h1 className="text-4xl font-bold">Examen técnico</h1>

        <p className="mt-2 text-slate-600">
          Este examen inicial ayuda a filtrar solicitudes para comités ciudadanos
          expertos. Se requiere mínimo {MIN_APROBACION}/10.
        </p>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Módulo</label>
          <select
            value={moduleId}
            onChange={(e) => {
              setModuleId(Number(e.target.value));
              setRespuestas({});
              setResultado(null);
            }}
            className="w-full rounded-2xl border px-4 py-3"
          >
            {modulosTecnocracia.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                Módulo {modulo.id}: {modulo.nombre}
              </option>
            ))}
          </select>
        </section>

        <section className="mt-6 space-y-4">
          {preguntas.map((pregunta, index) => (
            <div
              key={pregunta.id}
              className="rounded-[24px] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 text-sm font-bold text-[#C2187A]">
                Pregunta {index + 1}
              </div>

              <h2 className="mb-4 text-lg font-bold">{pregunta.pregunta}</h2>

              <div className="space-y-3">
                {pregunta.opciones.map((opcion, opcionIndex) => (
                  <label
                    key={opcion}
                    className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 p-3 text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name={`pregunta-${pregunta.id}`}
                      checked={respuestas[pregunta.id] === opcionIndex}
                      onChange={() =>
                        setRespuestas((prev) => ({
                          ...prev,
                          [pregunta.id]: opcionIndex,
                        }))
                      }
                    />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-3">
          <button
            onClick={calificar}
            className="rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937]"
          >
            Calificar examen
          </button>

          <button
            onClick={reiniciar}
            className="rounded-2xl border border-[#0A4E84] px-4 py-4 font-semibold"
          >
            Reiniciar respuestas
          </button>
        </div>

        {resultado && (
          <section
            className={`mt-6 rounded-[28px] p-6 shadow-sm ${
              resultado.aprobado ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <h2
              className={`text-2xl font-bold ${
                resultado.aprobado ? "text-green-700" : "text-red-700"
              }`}
            >
              {resultado.aprobado ? "✅ Examen aprobado" : "❌ Examen no aprobado"}
            </h2>

            <p className="mt-2 text-slate-700">
              Resultado: {resultado.correctas}/{resultado.total} respuestas correctas.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {resultado.aprobado
                ? "Puedes continuar con la solicitud de participación."
                : "Puedes estudiar el módulo y volver a intentarlo."}
            </p>

            {resultado.aprobado && (
              <Link
                href="/comites/solicitar"
                className="mt-4 inline-block rounded-xl bg-[#0A4E84] px-4 py-3 font-semibold text-white"
              >
                Continuar solicitud
              </Link>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
