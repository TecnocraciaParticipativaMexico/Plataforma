"use client";

import Link from "next/link";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabaseBrowser";

export default function RecuperarPasswordPage() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function recuperar() {
    setLoading(true);
    setMensaje("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar-password`,
    });

    setLoading(false);

    setMensaje(
      error
        ? `❌ ${error.message}`
        : "✅ Revisa tu correo para cambiar tu contraseña."
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <Link href="/login" className="mb-4 inline-block text-sm font-semibold">
          ← Volver al login
        </Link>

        <h1 className="text-3xl font-bold">Recuperar contraseña</h1>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          />

          <button
            onClick={recuperar}
            disabled={loading || !email}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 font-bold text-[#1F2937] disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar recuperación"}
          </button>

          {mensaje && <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">{mensaje}</div>}
        </section>
      </div>
    </main>
  );
}
