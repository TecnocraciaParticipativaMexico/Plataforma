import { ModuleStates } from "./ModuleStates";
import type { InterfaceState, PerfilJudicial } from "./types";

type JudicialDashboardProps = {
  avgScore: number;
  excellentProfiles: number;
  estadoDemo: InterfaceState | null;
  perfiles: PerfilJudicial[];
  onToggleState: (estado: InterfaceState) => void;
};

export function JudicialDashboard({ avgScore, excellentProfiles, estadoDemo, perfiles, onToggleState }: JudicialDashboardProps) {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Índice promedio", value: avgScore, detail: "desempeño, ética y transparencia", className: "bg-[#0A4E84] text-white" },
          { label: "Perfiles excelentes", value: excellentProfiles, detail: "sin alertas abiertas en mocks", className: "bg-[#16A34A] text-white" },
          { label: "Resoluciones revisadas", value: perfiles.reduce((total, perfil) => total + perfil.resoluciones.length, 0), detail: "criterios demostrativos", className: "bg-[#F2C300] text-slate-900" },
          { label: "Observaciones", value: perfiles.reduce((total, perfil) => total + perfil.observaciones.length, 0), detail: "comentarios ciudadanos", className: "bg-[#E4007C] text-white" },
        ].map((item) => (
          <article key={item.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className={`mb-4 inline-flex h-14 min-w-14 items-center justify-center rounded-2xl px-4 text-2xl font-black ${item.className}`}>
              {item.value}
            </div>
            <h3 className="font-black text-[#0A4E84]">{item.label}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ModuleStates estadoDemo={estadoDemo} onToggleState={onToggleState} />

        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-black text-[#0A4E84]">Lectura técnica del observatorio</h3>
          <div className="mt-4 space-y-3">
            {["Trayectoria profesional verificable", "Sentencias y criterios con fuente documental", "Desempeño comparado por materia", "Alertas éticas y derecho de réplica", "Dictamen ciudadano no vinculante"].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E4007C] text-sm font-black text-white">
                  {index + 1}
                </span>
                <div className="text-sm font-bold leading-6 text-slate-700">{item}</div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
