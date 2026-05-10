"use client";

import Link from "next/link";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabaseBrowser";

export default function LoginPage() {
  const supabase = supabaseBrowser();

  const [modo, setModo] = useState<"login" | "registro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function enviar() {
    setLoading(true);
    setMensaje("");

    const redirectTo = `${window.location.origin}/comites/panel`;

    const { error } =
      modo === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: redirectTo },
          });

    setLoading(false);

    if (error) {
      setMensaje(`❌ ${error.message}`);
      return;
    }

    if (modo === "registro") {
      setMensaje("✅ Cuenta creada. Revisa tu correo si Supabase pide confirmación.");
      return;
    }

    window.location.href = "/comites/panel";
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#0A4E84]">
      <div className="mx-auto max-w-md">
        <Link href="/comites" className="mb-4 inline-block text-sm font-semibold">
          ← Volver a comités
        </Link>

        <h1 className="text-3xl font-bold">Acceso de miembros</h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Inicia sesión para trabajar en tus comités desde celular, laptop u oficina.
          La sesión no se guarda permanentemente.
        </p>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="mb-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => setModo("login")}
              className={`rounded-xl px-4 py-3 font-bold ${
                modo === "login" ? "bg-[#0A4E84] text-white" : "bg-slate-100"
              }`}
            >
              Entrar
            </button>

            <button
              onClick={() => setModo("registro")}
              className={`rounded-xl px-4 py-3 font-bold ${
                modo === "registro" ? "bg-[#0A4E84] text-white" : "bg-slate-100"
              }`}
            >
              Crear cuenta
            </button>
          </div>

          <label className="mb-2 block font-semibold">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="correo@ejemplo.com"
          />

          <label className="mb-2 block font-semibold">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Mínimo 6 caracteres"
          />

          <button
            onClick={enviar}
            disabled={loading || !email || !password}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] disabled:opacity-50"
          >
            {loading ? "Procesando..." : modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>

          <Link
            href="/recuperar-password"
            className="mt-4 block text-center text-sm font-bold text-[#0A4E84]"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          {mensaje && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">
              {mensaje}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
