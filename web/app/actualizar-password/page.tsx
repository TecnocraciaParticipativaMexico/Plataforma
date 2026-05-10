"use client";

import { useState } from "react";
import { supabaseBrowser } from "../lib/supabaseBrowser";

export default function ActualizarPasswordPage() {
  const supabase = supabaseBrowser();
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function actualizar() {
    setLoading(true);
    setMensaje("");

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    setMensaje(
      error
        ? `❌ ${error.message}`
        : "✅ Contraseña actualizada. Ya puedes iniciar sesión."
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold">Actualizar contraseña</h1>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Nueva contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          />

          <button
            onClick={actualizar}
            disabled={loading || password.length < 6}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 font-bold text-[#1F2937] disabled:opacity-50"
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>

          {mensaje && <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">{mensaje}</div>}
        </section>
      </div>
    </main>
  );
}
