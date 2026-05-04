"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DenunciaGuardada = {
  process_id: string;
  titulo: string;
  categoria: string;
  fecha: string;
};

export default function MisDenunciasPage() {
  const [actorHash, setActorHash] = useState("");
  const [denuncias, setDenuncias] = useState<DenunciaGuardada[]>([]);

  useEffect(() => {
    let hash = localStorage.getItem("actor_hash");

    if (!hash) {
      hash = crypto.randomUUID();
      localStorage.setItem("actor_hash", hash);
    }

    setActorHash(hash);

    const guardadas = JSON.parse(
      localStorage.getItem("mis_denuncias") || "[]"
    );

    setDenuncias(guardadas);
  }, []);

  function borrarHistorialLocal() {
    const confirmar = confirm(
      "Esto solo borra el historial de este dispositivo. No borra eventos ni evidencia del sistema."
    );

    if (!confirmar) return;

    localStorage.removeItem("mis_denuncias");
    setDenuncias([]);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al inicio
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Mis denuncias</h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Este perfil ciudadano es anónimo. Solo usa el identificador guardado
          en este dispositivo para ayudarte a encontrar tus reportes.
        </p>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
            Perfil ciudadano básico
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-500">
              Actor hash local
            </div>

            <div className="mt-2 break-all text-xs text-slate-700">
              {actorHash || "Cargando..."}
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            No es CURP, INE, teléfono, correo ni identidad civil. Si cambias de
            navegador o dispositivo, este historial local puede no aparecer.
          </p>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Historial propio</h2>

            {denuncias.length > 0 && (
              <button
                onClick={borrarHistorialLocal}
                className="rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
              >
                Borrar local
              </button>
            )}
          </div>

          {denuncias.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Todavía no hay denuncias guardadas en este dispositivo.
            </div>
          ) : (
            <div className="space-y-3">
              {denuncias.map((denuncia) => (
                <div
                  key={denuncia.process_id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="mb-1 text-sm font-semibold text-[#C2187A]">
                    {denuncia.categoria}
                  </div>

                  <div className="mb-2 text-lg font-bold text-[#0A4E84]">
                    {denuncia.titulo}
                  </div>

                  <div className="mb-3 text-xs text-slate-500">
                    Creada: {new Date(denuncia.fecha).toLocaleString()}
                  </div>

                  <div className="mb-3 break-all rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                    ID: {denuncia.process_id}
                  </div>

                  <Link
                    href={`/seguimiento?processId=${denuncia.process_id}`}
                    className="block rounded-xl bg-[#0A4E84] px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Ver seguimiento
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <Link
          href="/reportar"
          className="block rounded-2xl bg-[#F2C300] px-4 py-4 text-center text-lg font-bold text-[#1F2937] shadow-[0_6px_0_0_#8B6B00]"
        >
          Crear nueva denuncia
        </Link>
      </div>
    </main>
  );
}
