"use client";

import { supabaseBrowser } from "../lib/supabaseBrowser";

export default function LogoutButton() {
  const supabase = supabaseBrowser();

  async function cerrarSesion() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <button
      onClick={cerrarSesion}
      className="rounded-xl border border-[#0A4E84] px-4 py-2 text-sm font-bold text-[#0A4E84]"
    >
      Cerrar sesión
    </button>
  );
}
