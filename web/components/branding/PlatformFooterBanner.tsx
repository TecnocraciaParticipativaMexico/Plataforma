"use client";

import Image from "next/image";

type PlatformFooterBannerProps = {
  className?: string;
};

export function PlatformFooterBanner({ className = "" }: PlatformFooterBannerProps) {
  return (
    <section className={`mb-28 mt-8 overflow-hidden bg-white print:hidden ${className}`} aria-label="Pie institucional">
      <Image
        src="/branding/tecnocracia-pie.png"
        alt="Pie panoramico de Tecnocracia Participativa"
        width={1706}
        height={536}
        className="h-auto w-full object-contain"
      />
    </section>
  );
}
