import type { FiscaliaTab } from "@/lib/fiscalia-ia/types";

type ModuleHeaderProps = {
  activeTab: FiscaliaTab;
  onTabChange: (tab: FiscaliaTab) => void;
};

const tabs: { id: FiscaliaTab; label: string; mark: string }[] = [
  { id: "generador", label: "Generador de expediente", mark: "IA" },
  { id: "expedientes", label: "Expedientes", mark: "MOCK" },
  { id: "comites", label: "Comités", mark: "CIV" },
  { id: "trazabilidad", label: "Trazabilidad", mark: "SHA" },
  { id: "documento", label: "Documento", mark: "PDF" },
];

export function ModuleHeader({ activeTab, onTabChange }: ModuleHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-pink-500/20 bg-[#0e1017]/95 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#E5007D] via-[#702F8A] to-[#0054A6] font-black text-white shadow-lg shadow-pink-500/20">
            02
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#E5007D] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">Módulo 02</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-300">IA local activa</span>
              <span className="rounded-full border border-blue-500/30 bg-blue-950/40 px-2.5 py-0.5 text-[10px] font-bold uppercase text-blue-200">Tecnocracia Participativa</span>
            </div>
            <h1 className="mt-1 text-xl font-black tracking-tight text-white md:text-2xl">Fiscalía Forense Ciudadana</h1>
          </div>
        </div>

        <nav className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs font-black uppercase tracking-wide transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#E5007D] to-[#702F8A] text-white shadow-md shadow-pink-500/20"
                  : "text-slate-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <span className="mr-2 rounded bg-white/10 px-1.5 py-0.5 text-[9px]">{tab.mark}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
