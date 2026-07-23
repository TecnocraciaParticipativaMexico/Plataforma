import type { ModuleView } from "@/lib/relaciones-internacionales/types";
import { Panel, primaryButtonClass } from "./ui";

const metrics = [
  { value: "12", label: "Países con participación", color: "text-[#0A4E84]" },
  { value: "24", label: "Perfiles de diáspora", color: "text-[#E4007C]" },
  { value: "6", label: "Evaluaciones en borrador", color: "text-amber-600" },
  { value: "9", label: "Expedientes en revisión", color: "text-[#0A4E84]" },
  { value: "4", label: "Dossiers preparados", color: "text-emerald-700" },
  { value: "3", label: "Campañas vinculadas", color: "text-[#E4007C]" },
  { value: "11", label: "Acciones registradas", color: "text-emerald-700" },
];

const shortcuts: { view: ModuleView; label: string }[] = [
  { view: "evaluacion", label: "Nueva evaluación" },
  { view: "expedientes", label: "Nuevo expediente" },
  { view: "diaspora", label: "Proponer representante" },
  { view: "financiamiento", label: "Vincular campaña" },
  { view: "trazabilidad", label: "Consultar trazabilidad" },
];

export function ModuleDashboard({
  onNavigate,
}: {
  onNavigate: (view: ModuleView) => void;
}) {
  return (
    <Panel
      eyebrow="Datos demostrativos"
      title="Articulación transnacional ciudadana"
      description="Panorama local de participación, documentación e incidencia. Estas cifras ilustran el funcionamiento del módulo y no representan actividad oficial ni información en tiempo real."
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className={`text-3xl font-black ${metric.color}`}>
              {metric.value}
            </div>
            <div className="mt-1 text-xs font-bold leading-5 text-slate-700">
              {metric.label}
            </div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Datos demostrativos
            </div>
          </article>
        ))}
      </div>
      <h3 className="mt-7 text-sm font-black uppercase tracking-wide text-[#0A4E84]">
        Accesos rápidos
      </h3>
      <div className="mt-3 flex flex-wrap gap-3">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.view}
            type="button"
            onClick={() => onNavigate(shortcut.view)}
            className={primaryButtonClass}
          >
            {shortcut.label}
          </button>
        ))}
      </div>
    </Panel>
  );
}
