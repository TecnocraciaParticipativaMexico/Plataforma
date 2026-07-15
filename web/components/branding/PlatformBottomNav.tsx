"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Inicio",
    imageSrc: "/branding/nav-home.png",
    imageAlt: "Icono de Inicio",
  },
  {
    href: "/modulos",
    label: "Módulos",
    imageSrc: "/branding/nav-modulos.png",
    imageAlt: "Icono de Módulos",
  },
  {
    href: "/mis-denuncias",
    label: "Perfil",
    imageSrc: "/branding/nav-profile.png",
    imageAlt: "Icono de Perfil",
  },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PlatformBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navegacion principal"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1 px-3 py-2">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-1 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                active
                  ? "bg-[#E0F2FE] text-[#0A4E84]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#0A4E84]"
              }`}
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                width={64}
                height={64}
                className="h-7 w-7 object-contain"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
