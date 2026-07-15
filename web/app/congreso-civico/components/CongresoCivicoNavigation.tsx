"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlatformLogoHeader } from "@/components/branding/PlatformLogoHeader";

const rutasCongresoCivico = [
  { href: "/congreso-civico", label: "Inicio" },
  { href: "/congreso-civico/dashboard", label: "Dashboard" },
  { href: "/congreso-civico/actividad", label: "Actividad" },
  { href: "/congreso-civico/representacion", label: "Representación" },
  { href: "/congreso-civico/comites", label: "Comités" },
  { href: "/congreso-civico/comites/expertos", label: "Expertos" },
  { href: "/congreso-civico/iniciativas", label: "Iniciativas" },
  { href: "/congreso-civico/seguimiento", label: "Seguimiento" },
  { href: "/congreso-civico/proceso-legislativo", label: "Proceso" },
] as const;

function esRutaActiva(pathname: string, href: string) {
  if (href === "/congreso-civico") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CongresoCivicoNavigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 border-b border-[#F7C9DD] bg-white/95 backdrop-blur" aria-label="Navegación de Congreso Cívico">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <PlatformLogoHeader />
          <Link href="/congreso-civico" className="group inline-flex min-w-0 items-center gap-3 text-[#0A4E84]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E4007C] text-sm font-black text-white shadow-sm">CC</span>
            <span className="min-w-0">
              <span className="block text-sm font-black uppercase tracking-[0.12em] text-[#E4007C]">Congreso Cívico</span>
              <span className="block truncate text-xs font-semibold text-slate-500">Participación, representación y seguimiento</span>
            </span>
          </Link>
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
          {rutasCongresoCivico.map((ruta) => {
            const activa = esRutaActiva(pathname, ruta.href);

            return (
              <Link
                key={ruta.href}
                href={ruta.href}
                aria-current={activa ? "page" : undefined}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  activa
                    ? "bg-[#E4007C] text-white shadow-sm"
                    : "bg-[#FFF8F0] text-[#0A4E84] ring-1 ring-[#F7C9DD] hover:bg-[#FCE7F3] hover:text-[#BE185D]"
                }`}
              >
                {ruta.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
