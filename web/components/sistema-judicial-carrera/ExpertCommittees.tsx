import { CitizenOpinionDocument } from "./CitizenOpinionDocument";
import type { ExpertCommittee } from "./types";

type ExpertCommitteesProps = {
  committees: ExpertCommittee[];
  selectedCommitteeId: string;
  reviewRequested: boolean;
  onSelectCommittee: (committeeId: string) => void;
  onRequestReview: () => void;
};

export function ExpertCommittees({ committees, selectedCommitteeId, reviewRequested, onSelectCommittee, onRequestReview }: ExpertCommitteesProps) {
  const selectedCommittee = committees.find((committee) => committee.id === selectedCommitteeId) ?? committees[0];

  return (
    <section className="space-y-5">
      <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Comités Expertos Ciudadanos</p>
        <h2 className="mt-2 text-2xl font-black text-[#0A4E84]">Revisión técnica ciudadana, documentada y no vinculante</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-2">
          <p>Los comités estarán formados por personas con experiencia profesional verificable y trazabilidad de sus intervenciones.</p>
          <p>Analizan información aportada voluntariamente, revelan posibles conflictos de interés y emiten opiniones ciudadanas no vinculantes.</p>
          <p>No sustituyen jueces, tribunales, fiscalías, defensorías, colegios profesionales ni asesoría jurídica personalizada.</p>
          <p className="font-semibold text-[#0A4E84]">Evaluación técnica demostrativa y proceso de revisión de competencias. No constituye certificación oficial.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {committees.map((committee) => (
          <article key={committee.id} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase text-slate-500">{committee.specialty}</p>
            <h3 className="mt-2 text-xl font-black text-[#0A4E84]">{committee.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{committee.description}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <Detail label="Integrantes" value={`${committee.members} personas`} />
              <Detail label="Estado" value={committee.reviewStatus} />
              <Detail label="Conflictos de interés" value={committee.conflicts} />
              <Detail label="Tiempo objetivo" value={committee.estimatedTime} />
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSelectCommittee(committee.id)}
                className="rounded-2xl border border-[#0A4E84] px-4 py-3 text-sm font-black text-[#0A4E84] focus:outline-none focus:ring-2 focus:ring-[#E4007C]"
              >
                Conocer el comité
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCommittee(committee.id);
                  onRequestReview();
                }}
                className="rounded-2xl bg-[#E4007C] px-4 py-3 text-sm font-black text-white focus:outline-none focus:ring-2 focus:ring-[#E4007C]"
              >
                Solicitar revisión ciudadana
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Comité seleccionado</p>
        <h3 className="mt-2 text-2xl font-black text-[#0A4E84]">{selectedCommittee.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{selectedCommittee.description}</p>
        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          La solicitud queda como evento demostrativo local. El análisis preliminar está sujeto a disponibilidad y complejidad; no promete resolver litigios ni sustituye vías oficiales.
        </p>
        {reviewRequested ? (
          <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-800">
            Solicitud ciudadana registrada en modo demostrativo. No se envió información a servidores ni a autoridad alguna.
          </p>
        ) : null}
      </section>

      <CitizenOpinionDocument />
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <dt className="font-black text-[#0A4E84]">{label}</dt>
      <dd className="mt-1 leading-6 text-slate-600">{value}</dd>
    </div>
  );
}
