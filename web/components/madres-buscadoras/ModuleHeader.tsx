import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
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
    <ModuleIdentityHeader
      label="MÓDULO 05"
      title="Madres Buscadoras y Búsqueda Forense"
      description="Tecnología, documentación ciudadana y herramientas forenses para apoyar la búsqueda de personas desaparecidas y preservar evidencia."
      className="sticky top-0 z-40"
      badges={
        <>
          <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#166534]">MVP civico</span>
          <span className="rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0369A1]">Datos demostrativos</span>
        </>
      }
    >
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
