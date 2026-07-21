import { estados } from "./data";
import type { InterfaceState } from "./types";

type ModuleStatesProps = {
  estadoDemo: InterfaceState | null;
  onToggleState: (estado: InterfaceState) => void;
};

export function ModuleStates({ estadoDemo, onToggleState }: ModuleStatesProps) {
  return (
    <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-xl font-black text-[#0A4E84]">Estados de interfaz</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Vista demostrativa de carga, error y ausencia de datos para futuras integraciones.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(estados) as InterfaceState[]).map((estado) => (
          <button
            key={estado}
            type="button"
            onClick={() => onToggleState(estado)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#E4007C]"
          >
            {estados[estado].title}
          </button>
        ))}
      </div>
      {estadoDemo ? (
        <div className={`mt-4 rounded-2xl border p-4 ${estados[estadoDemo].tone}`}>
          <div className="font-black">{estados[estadoDemo].title}</div>
          <p className="mt-1 text-sm leading-6">{estados[estadoDemo].description}</p>
        </div>
      ) : null}
    </article>
  );
}
