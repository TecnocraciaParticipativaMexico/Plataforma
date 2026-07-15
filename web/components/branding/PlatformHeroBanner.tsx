"use client";

import Image from "next/image";

type PlatformHeroBannerProps = {
  className?: string;
};

export function PlatformHeroBanner({ className = "" }: PlatformHeroBannerProps) {
  return (
    <section className={`overflow-hidden bg-white print:hidden ${className}`} aria-label="Encabezado institucional">
      <Image
        src="/branding/tecnocracia-encabezado.png"
        alt="Encabezado institucional de Tecnocracia Participativa"
        width={1815}
        height={495}
        className="h-auto w-full object-contain"
        priority
      />
    </section>
  );
}
