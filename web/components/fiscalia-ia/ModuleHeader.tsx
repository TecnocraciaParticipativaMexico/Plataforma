import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import type { FiscaliaTab } from "@/lib/fiscalia-ia/types";

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
    <ModuleIdentityHeader
      label="MÓDULO 02"
      title="Fiscalía Forense Ciudadana con IA"
      description="Estructura hechos, evidencia, cronologías y documentos técnicos de apoyo ciudadano con trazabilidad local."
      className="sticky top-0 z-40"
      badges={
        <>
          <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#166534]">
            IA local activa
          </span>
          <span className="rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0369A1]">
            Tecnocracia Participativa
          </span>
        </>
      }
    >
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
            <span className={`mr-1.5 rounded px-1.5 py-0.5 text-[9px] ${activeTab === tab.id ? "bg-white/20" : "bg-[#F1F5F9] text-[#0A4E84]"}`}>
              {tab.mark}
            </span>
            {tab.label}
          </button>
        ))}
      </nav>
    </ModuleIdentityHeader>
  );
}
