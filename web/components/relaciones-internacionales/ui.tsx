import Image from "next/image";
import type { ReactNode } from "react";

export const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E4007C] focus:ring-2 focus:ring-pink-100";

export const primaryButtonClass =
  "min-h-11 rounded-xl bg-[#E4007C] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-[#B00061] focus:outline-none focus:ring-2 focus:ring-[#E4007C] focus:ring-offset-2";

export const secondaryButtonClass =
  "min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#0A4E84] hover:text-[#0A4E84] focus:outline-none focus:ring-2 focus:ring-[#0A4E84]";

export function Notice({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "pink" | "amber" | "green";
  className?: string;
}) {
  const colors = {
    blue: "border-[#0A4E84] bg-blue-50",
    pink: "border-[#E4007C] bg-pink-50",
    amber: "border-amber-500 bg-amber-50",
    green: "border-emerald-600 bg-emerald-50",
  };

  return (
    <div
      className={`rounded-xl border-l-4 p-4 text-sm leading-6 text-slate-700 ${colors[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

export function Panel({
  title,
  description,
  eyebrow,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-black leading-tight text-[#0A4E84] sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function DocumentHeader({
  title,
  folio,
  version,
}: {
  title: string;
  folio: string;
  version: string;
}) {
  return (
    <header className="mb-5 hidden items-center gap-4 border-b-2 border-[#0A4E84] pb-4 print:flex">
      <Image
        src="/branding/logo-tecnocracia.png"
        alt="Tecnocracia Participativa México 2030"
        width={92}
        height={92}
        className="h-16 w-16 object-contain"
      />
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-[#E4007C]">
          Tecnocracia Participativa México 2030 · Módulo 30
        </p>
        <h1 className="text-xl font-black text-[#0A4E84]">{title}</h1>
        <p className="text-xs text-slate-600">
          Folio {folio} · versión {version} · datos demostrativos
        </p>
      </div>
    </header>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}
