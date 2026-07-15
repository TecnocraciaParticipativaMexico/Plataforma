"use client";

import Image from "next/image";
import Link from "next/link";

type PlatformLogoHeaderProps = {
  className?: string;
  homeHref?: string;
};

export function PlatformLogoHeader({ className = "", homeHref = "/" }: PlatformLogoHeaderProps) {
  return (
    <Link
      href={homeHref}
      aria-label="Ir al inicio de Tecnocracia Participativa"
      className={`inline-flex min-h-14 shrink-0 items-center rounded-2xl bg-white px-2 py-1 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E4007C] sm:min-h-[4.5rem] lg:min-h-20 ${className}`}
    >
      <Image
        src="/branding/logo-tecnocracia.png"
        alt="Logotipo de Tecnocracia Participativa"
        width={379}
        height={471}
        className="h-12 w-auto object-contain sm:h-16 lg:h-20"
        priority={false}
      />
    </Link>
  );
}
