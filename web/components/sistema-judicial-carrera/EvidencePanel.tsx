import type { PerfilJudicial } from "./types";

type EvidencePanelProps = {
  evidenceCount: number;
  perfiles: PerfilJudicial[];
};

export function EvidencePanel({ evidenceCount, perfiles }: EvidencePanelProps) {
  return (
    <section className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">Evidencia documental</div>
          <h3 className="mt-2 text-2xl font-black text-[#0A4E84]">Fuentes vinculadas a perfiles</h3>
        </div>
        <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-black text-[#0A4E84]">{evidenceCount} fuentes mock</span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {perfiles.map((perfil) => (
          <article key={perfil.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <div className="font-black text-[#0A4E84]">{perfil.nombre}</div>
            <div className="mt-1 text-xs font-bold uppercase text-slate-500">{perfil.materia}</div>
            <ul className="mt-3 space-y-2">
              {perfil.evidencias.map((evidencia) => (
                <li key={evidencia} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  {evidencia}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
