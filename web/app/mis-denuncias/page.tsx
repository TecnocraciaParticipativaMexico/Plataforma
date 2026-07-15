"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { PlatformLogoHeader } from "@/components/branding/PlatformLogoHeader";

type DenunciaGuardada = {
  process_id: string;
  titulo: string;
  categoria: string;
  fecha: string;
};

export default function MisDenunciasPage() {
  const [actorHash, setActorHash] = useState("");
const [denuncias, setDenuncias] = useState<DenunciaGuardada[]>([]);
const [loading, setLoading] = useState(true);

const totalDenuncias = denuncias.length;
const ultimaParticipacion =
  denuncias.length > 0
    ? new Date(denuncias[0].fecha).toLocaleString()
    : "Sin participación todavía";

const categoriasUnicas = Array.from(
  new Set(denuncias.map((d) => d.categoria || "Otro"))
);

  useEffect(() => {
    cargarPerfil();
  }, []);

  async function cargarPerfil() {
    let hash = localStorage.getItem("actor_hash");

    if (!hash) {
      hash = crypto.randomUUID();
      localStorage.setItem("actor_hash", hash);
    }

    setActorHash(hash);

    const locales: DenunciaGuardada[] = JSON.parse(
      localStorage.getItem("mis_denuncias") || "[]"
    );

    try {
const res = await fetch("/api/process/mine", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    actor_hash: hash,
  }),
});

const data = await res.json();

      const remotas: DenunciaGuardada[] = data?.ok
  ? data.denuncias.map((r: any) => ({
      process_id: r.process_id,
      titulo: r.titulo,
      categoria: r.titulo || "Otro",
      fecha: r.created_at,
    }))
  : [];

      const unidas = [...remotas, ...locales];
      const sinDuplicados = Array.from(
        new Map(unidas.map((d) => [d.process_id, d])).values()
      );

      sinDuplicados.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );

      setDenuncias(sinDuplicados);
      localStorage.setItem("mis_denuncias", JSON.stringify(sinDuplicados));
    } catch {
      setDenuncias(locales);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 pb-32 pt-6">
        <PlatformLogoHeader className="mb-4" />

        <Link href="/" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al inicio
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Mis denuncias</h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Este perfil ciudadano es anónimo y recupera tus denuncias vinculadas a
          este dispositivo.
        </p>

<section className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
    Perfil ciudadano básico
  </div>

  <div className="mb-4 rounded-2xl bg-slate-50 p-4">
    <div className="text-sm font-semibold text-slate-500">
      Actor hash local
    </div>

    <div className="mt-2 break-all text-xs text-slate-700">
      {actorHash || "Cargando..."}
    </div>
  </div>

  <div className="grid grid-cols-1 gap-3">
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="text-sm font-semibold text-slate-500">
        Denuncias creadas
      </div>
      <div className="mt-1 text-3xl font-extrabold text-[#0A4E84]">
        {totalDenuncias}
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="text-sm font-semibold text-slate-500">
        Última participación
      </div>
      <div className="mt-1 text-sm font-bold text-[#0A4E84]">
        {ultimaParticipacion}
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="text-sm font-semibold text-slate-500">
        Categorías reportadas
      </div>

      {categoriasUnicas.length === 0 ? (
        <div className="mt-1 text-sm text-slate-500">
          Ninguna todavía
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {categoriasUnicas.map((categoria) => (
            <span
              key={categoria}
              className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]"
            >
              {categoria}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>

  <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
    Próxima fase: recuperación con frase secreta para poder abrir este perfil
    desde otro dispositivo sin usar correo, teléfono, INE ni CURP.
  </div>
</section>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Historial propio</h2>

          {loading ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Cargando denuncias...
            </div>
          ) : denuncias.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Todavía no hay denuncias guardadas para este perfil.
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

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />
    </main>
  );
}
