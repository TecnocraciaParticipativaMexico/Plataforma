"use client";

import type { ReactNode } from "react";

import { PlatformLogoHeader } from "./PlatformLogoHeader";

type ModuleIdentityHeaderProps = {
  label: string;
  title: string;
  description?: string;
  badges?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function ModuleIdentityHeader({
  label,
  title,
  description,
  badges,
  children,
  className = "",
}: ModuleIdentityHeaderProps) {
  return (
    <header className={`border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur print:hidden ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <PlatformLogoHeader className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E4007C] sm:text-xs">
              {label}
            </div>
            <h1 className="mt-1 text-balance text-xl font-black leading-tight tracking-tight text-[#0A4E84] sm:text-2xl lg:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-1 max-w-4xl text-sm font-medium leading-6 text-slate-600 sm:text-[15px]">
                {description}
              </p>
            ) : null}
            {badges ? <div className="mt-2 flex flex-wrap gap-2">{badges}</div> : null}
          </div>
        </div>
        {children ? <div className="min-w-0">{children}</div> : null}
      </div>
    </header>
  );
}
