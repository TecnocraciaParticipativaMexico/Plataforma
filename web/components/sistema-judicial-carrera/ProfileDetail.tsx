import { promedio, riskClass } from "./data";
import type { PerfilJudicial } from "./types";

type ProfileDetailProps = {
  selectedProfile: PerfilJudicial;
};

export function ProfileDetail({ selectedProfile }: ProfileDetailProps) {
  return (
    <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">{selectedProfile.tipo}</div>
          <h3 className="mt-1 text-2xl font-black text-[#0A4E84]">{selectedProfile.nombre}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{selectedProfile.cargo}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${riskClass(selectedProfile.riesgoEtico)}`}>
          {selectedProfile.riesgoEtico}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Desempeño", value: selectedProfile.desempeno },
          { label: "Ética", value: selectedProfile.etica },
          { label: "Transparencia", value: selectedProfile.transparencia },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs font-black uppercase text-slate-500">{item.label}</div>
            <div className="mt-1 text-3xl font-black text-[#0A4E84]">{item.value}</div>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-2xl border-l-4 border-[#E4007C] bg-pink-50 p-4 text-sm leading-6 text-slate-700">
        {selectedProfile.sintesis}
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section>
          <h4 className="font-black text-[#0A4E84]">Trayectoria y formación</h4>
          <div className="mt-3 text-sm leading-6 text-slate-600">{selectedProfile.experiencia} años de experiencia profesional.</div>
          <ul className="mt-3 space-y-2">
            {selectedProfile.formacion.map((item) => (
              <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="font-black text-[#0A4E84]">Observaciones ciudadanas</h4>
          <ul className="mt-3 space-y-2">
            {selectedProfile.observaciones.map((item) => (
              <li key={item} className="rounded-2xl bg-[#FFF7ED] px-4 py-3 text-sm font-semibold leading-6 text-slate-700">{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-5">
        <h4 className="font-black text-[#0A4E84]">Criterios, resoluciones o sentencias relevantes</h4>
        <div className="mt-3 grid gap-3">
          {selectedProfile.resoluciones.map((resolucion) => (
            <div key={resolucion.titulo} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-black uppercase text-[#E4007C]">{resolucion.materia}</div>
              <h5 className="mt-1 font-black text-slate-800">{resolucion.titulo}</h5>
              <p className="mt-2 text-sm leading-6 text-slate-600">{resolucion.criterio}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#0A4E84]">{resolucion.impacto}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sr-only">Índice técnico promedio: {promedio(selectedProfile)} puntos.</div>
    </article>
  );
}
