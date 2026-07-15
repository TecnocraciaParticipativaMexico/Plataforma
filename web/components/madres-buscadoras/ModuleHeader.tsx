import Link from "next/link";
import { PlatformLogoHeader } from "@/components/branding/PlatformLogoHeader";
import type { ModuleTab } from "@/lib/madres-buscadoras/types";

type Props = {
  activeTab: ModuleTab;
  onTabChange: (tab: ModuleTab) => void;
};

const tabs: { id: ModuleTab; label: string; mark: string }[] = [
  { id: "dashboard", label: "Panel", mark: "01" },
  { id: "cases", label: "Expedientes", mark: "02" },
  { id: "new", label: "Nuevo registro", mark: "03" },
  { id: "genetics", label: "Referencias geneticas", mark: "04" },
  { id: "committees", label: "Comites", mark: "05" },
  { id: "audit", label: "Auditoria", mark: "06" },
];

export function ModuleHeader({ activeTab, onTabChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <PlatformLogoHeader />
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#E4007C] font-black text-white shadow-sm">05</div>
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#E4007C] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">Modulo 05</span>
                <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#166534]">MVP civico</span>
                <span className="rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0369A1]">Datos demostrativos</span>
              </div>
              <h1 className="mt-1 truncate text-xl font-black tracking-tight text-[#0A4E84] md:text-2xl">Madres Buscadoras</h1>
            </div>
          </Link>
        </div>

        <nav className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-[#F8FAFC] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Secciones de Madres Buscadoras">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`min-h-11 whitespace-nowrap rounded-xl px-2.5 py-2 text-left text-[11px] font-black uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] sm:px-3 sm:text-xs ${
                activeTab === tab.id ? "bg-[#E4007C] text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-100 hover:text-[#0A4E84]"
              }`}
            >
              <span className={`mr-1.5 rounded px-1.5 py-0.5 text-[9px] ${activeTab === tab.id ? "bg-white/20" : "bg-[#F1F5F9] text-[#0A4E84]"}`}>{tab.mark}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
