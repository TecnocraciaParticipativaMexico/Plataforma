"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";

const rutasCongresoCivico = [
  { href: "/congreso-civico", label: "Inicio" },
  { href: "/congreso-civico/dashboard", label: "Dashboard" },
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
    <ModuleIdentityHeader
      label="MÓDULO 03"
      title="Congreso Cívico de Evaluación Legislativa"
      description="Participación, representación y seguimiento ciudadano de iniciativas, legisladores, comités y actividad legislativa."
      className="sticky top-0 z-30 border-[#F7C9DD]"
    >
      <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-wrap lg:pb-0" aria-label="Navegación de Congreso Cívico">
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
      </nav>
    </ModuleIdentityHeader>
  );
}
