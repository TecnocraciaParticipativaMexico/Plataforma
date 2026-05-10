"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "../lib/supabaseBrowser";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const supabase = supabaseBrowser();
  const [checking, setChecking] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    async function revisarSesion() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/login";
        return;
      }

      setAutorizado(true);
      setChecking(false);
    }

    revisarSesion();
  }, []);

  if (checking) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-6 py-10 text-[#0A4E84]">
        Revisando acceso...
      </main>
    );
  }

  if (!autorizado) return null;

  return <>{children}</>;
}
