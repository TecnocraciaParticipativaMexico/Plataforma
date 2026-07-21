import { promedio } from "./data";
import type { PerfilJudicial } from "./types";

type CitizenAssessmentProps = {
  selectedProfile: PerfilJudicial;
};

export function CitizenAssessment({ selectedProfile }: CitizenAssessmentProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">Dictamen ciudadano no vinculante</div>
        <h3 className="mt-2 text-2xl font-black text-[#0A4E84]">Evaluación técnica demostrativa</h3>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Con base en datos mock, el observatorio identifica un índice promedio de {promedio(selectedProfile)} puntos para {selectedProfile.nombre}. La recomendación ciudadana es mantener observación documental, publicar fuentes verificables y permitir derecho de réplica cuando existan alertas.
        </p>
        <div className="mt-5 rounded-2xl border-l-4 border-[#F2C300] bg-[#FFF8D8] p-4 text-sm leading-6 text-slate-700">
          Este dictamen es informativo y no vinculante. No reemplaza procedimientos disciplinarios, recursos judiciales, resoluciones jurisdiccionales ni funciones constitucionales del Poder Judicial, fiscalías u órganos competentes.
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Perfil evaluado", value: selectedProfile.tipo },
            { label: "Materia", value: selectedProfile.materia },
            { label: "Entidad", value: selectedProfile.entidad },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-black uppercase text-slate-500">{item.label}</div>
              <div className="mt-1 text-sm font-black text-[#0A4E84]">{item.value}</div>
            </div>
          ))}
        </div>
      </article>

      <aside className="rounded-[28px] bg-[#111827] p-6 text-white shadow-sm">
        <div className="text-xs font-black uppercase tracking-[0.16em] text-[#F2C300]">Bitácora simulada</div>
        <div className="mt-5 space-y-3">
          {[
            "Consulta de perfil y trayectoria",
            "Revisión de resoluciones relevantes",
            "Contraste de indicadores éticos",
            "Generación de síntesis ciudadana",
          ].map((item, index) => (
            <div key={item} className="rounded-2xl bg-white/10 p-4">
              <div className="text-xs font-black uppercase text-white/55">Fase {index + 1}</div>
              <div className="mt-1 text-sm font-bold">{item}</div>
              <div className="mt-2 break-all rounded-xl bg-black/20 p-2 font-mono text-[11px] text-white/70">
                sha256-demo-{selectedProfile.id}-{index + 1}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
