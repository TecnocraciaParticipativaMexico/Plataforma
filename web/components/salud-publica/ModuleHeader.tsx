"use client";

import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { healthTabs, OFFICIAL_MODULE_DESCRIPTION, OFFICIAL_MODULE_NAME } from "@/lib/salud-publica/constants";
import type { HealthTab } from "@/lib/salud-publica/types";

type Props = {
  activeTab: HealthTab;
  onTabChange: (tab: HealthTab) => void;
};

export function SaludModuleHeader({ activeTab, onTabChange }: Props) {
  return (
    <ModuleIdentityHeader
      label="MÓDULO 10"
      title={OFFICIAL_MODULE_NAME}
      description={OFFICIAL_MODULE_DESCRIPTION}
      className="sticky top-0 z-40"
      badges={
        <>
          <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#166534]">Sistema ciudadano</span>
          <span className="rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0369A1]">Datos demostrativos</span>
          <span className="rounded-full bg-[#FFE4E6] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#BE123C]">Sin llamadas externas</span>
        </>
      }
    >
      <nav className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-[#F8FAFC] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Secciones de Salud y Bienestar Digital">
        {healthTabs.map((tab) => (
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
