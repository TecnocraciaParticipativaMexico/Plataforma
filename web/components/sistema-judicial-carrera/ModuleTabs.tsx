import type { TabId } from "./types";

type ModuleTabsProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  tabs: { id: TabId; label: string; description: string }[];
};

export function ModuleTabs({ activeTab, onTabChange, tabs }: ModuleTabsProps) {
  return (
    <nav className="grid gap-2 rounded-[24px] bg-white p-2 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4 print:hidden" aria-label="Navegación interna del módulo">
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-pressed={active}
            className={`rounded-2xl px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
              active ? "bg-[#E4007C] text-white shadow-sm" : "bg-slate-50 text-slate-700 hover:bg-[#E0F2FE]"
            }`}
          >
            <span className="block text-sm font-black">{tab.label}</span>
            <span className={`mt-1 block text-xs leading-5 ${active ? "text-white/80" : "text-slate-500"}`}>{tab.description}</span>
          </button>
        );
      })}
    </nav>
  );
}
