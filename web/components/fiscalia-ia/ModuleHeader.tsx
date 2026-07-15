import type { FiscaliaTab } from "@/lib/fiscalia-ia/types";
import { PlatformLogoHeader } from "@/components/branding/PlatformLogoHeader";

type ModuleHeaderProps = {
  activeTab: FiscaliaTab;
  onTabChange: (tab: FiscaliaTab) => void;
};

const tabs: { id: FiscaliaTab; label: string; mark: string }[] = [
  { id: "generador", label: "Generador", mark: "IA" },
  { id: "expedientes", label: "Expedientes", mark: "MOCK" },
  { id: "comites", label: "Comités", mark: "CIV" },
  { id: "trazabilidad", label: "Trazabilidad", mark: "SHA" },
  { id: "documento", label: "Documento", mark: "PDF" },
];

export function ModuleHeader({ activeTab, onTabChange }: ModuleHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <PlatformLogoHeader />
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#E4007C] font-black text-white shadow-sm">
            02
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#E4007C] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">Módulo 02</span>
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#166534]">IA local activa</span>
              <span className="rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0369A1]">Tecnocracia Participativa</span>
            </div>
            <h1 className="mt-1 text-xl font-black tracking-tight text-[#0A4E84] md:text-2xl">Fiscalía Forense Ciudadana</h1>
          </div>
        </div>

        <nav className="flex max-w-full gap-1 overflow-x-auto scroll-smooth rounded-2xl border border-slate-200 bg-[#F8FAFC] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap rounded-xl px-2.5 py-2 text-left text-[11px] font-black uppercase tracking-wide transition sm:px-3 sm:text-xs ${
                activeTab === tab.id
                  ? "bg-[#E4007C] text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-slate-100 hover:text-[#0A4E84]"
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
