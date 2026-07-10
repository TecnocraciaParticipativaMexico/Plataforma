import { useMemo, useState } from "react";
import type { CommitteeReview, SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { createId, formatDateTime } from "@/lib/madres-buscadoras/utils";

type Props = {
  dataset: SearchCaseDataset;
  onAssignReview: (review: CommitteeReview) => void;
};

export function CommitteesDirectory({ dataset, onAssignReview }: Props) {
  const [level, setLevel] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [selectedCaseId, setSelectedCaseId] = useState(dataset.cases[0]?.id ?? "");
  const [selectedCommitteeId, setSelectedCommitteeId] = useState(dataset.committees[0]?.id ?? "");
  const [message, setMessage] = useState("");

  const committees = useMemo(
    () => dataset.committees.filter((item) => (level === "all" || item.level === level) && (availability === "all" || item.availability === availability)),
    [availability, dataset.committees, level],
  );

  function assign() {
    if (!selectedCaseId || !selectedCommitteeId) return;
    onAssignReview({
      id: createId("review"),
      caseId: selectedCaseId,
      committeeId: selectedCommitteeId,
      status: "pending",
      requestedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      summary: "Asignacion simulada para revision tecnica ciudadana y acompanamiento.",
      observations: ["Revisar privacidad por seccion.", "Validar cronologia con la familia antes de compartir."],
    });
    setMessage("Expediente asignado de forma simulada a cola de revision ciudadana.");
  }

  return (
    <section className="space-y-5">
      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Comites ciudadanos</p>
        <h2 className="mt-1 text-2xl font-black text-[#0A4E84]">Directorio y cola de revision</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-700">
          Los comites son espacios ciudadanos de revision tecnica, acompanamiento, opinion experta y validacion interna de la plataforma.
          No declaran responsabilidades ni sustituyen instituciones competentes.
        </p>
      </article>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="grid gap-3 md:grid-cols-2">
            <Select label="Nivel" value={level} onChange={setLevel} options={[["all", "Todos"], ["municipal", "Municipal"], ["state", "Estatal"], ["regional", "Regional"], ["national", "Nacional"]]} />
            <Select label="Disponibilidad" value={availability} onChange={setAvailability} options={[["all", "Todas"], ["available", "Disponible"], ["limited", "Limitada"], ["unavailable", "No disponible"]]} />
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {committees.map((item) => (
              <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#16A34A]/10 px-3 py-1 text-xs font-bold text-[#166534]">{item.availability}</span>
                  <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">{item.level}</span>
                </div>
                <h3 className="mt-2 font-black text-[#0A4E84]">{item.name}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.specialty}</p>
                <p className="text-sm leading-6 text-slate-600">{item.territory} | {item.caseCount} expedientes demostrativos</p>
                <p className="mt-2 rounded-xl bg-white p-3 text-xs font-bold uppercase text-slate-500 ring-1 ring-slate-200">{item.verificationLabel}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <h3 className="text-xl font-black text-[#0A4E84]">Asignacion simulada</h3>
          <div className="mt-4 space-y-4">
            <Select label="Expediente" value={selectedCaseId} onChange={setSelectedCaseId} options={dataset.cases.map((item) => [item.id, `${item.folio} - ${item.displayName}`])} />
            <Select label="Comite" value={selectedCommitteeId} onChange={setSelectedCommitteeId} options={dataset.committees.map((item) => [item.id, item.name])} />
            <button type="button" onClick={assign} className="min-h-11 rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white">Agregar a cola</button>
            {message ? <p className="rounded-2xl bg-[#DCFCE7] p-4 text-sm font-semibold text-[#166534]">{message}</p> : null}
          </div>

          <h3 className="mt-6 text-xl font-black text-[#0A4E84]">Cola de revision</h3>
          <div className="mt-4 space-y-3">
            {dataset.reviews.map((review) => {
              const linkedCase = dataset.cases.find((item) => item.id === review.caseId);
              const committee = dataset.committees.find((item) => item.id === review.committeeId);
              return (
                <div key={review.id} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="text-xs font-bold uppercase text-slate-500">{formatDateTime(review.updatedAt)}</div>
                  <h4 className="mt-1 font-black text-slate-900">{linkedCase?.folio} | {review.status}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{committee?.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{review.summary}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 min-h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/20">
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}
