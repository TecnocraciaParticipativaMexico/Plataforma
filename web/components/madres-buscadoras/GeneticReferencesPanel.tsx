import { useState } from "react";
import type { GeneticReference, SearchCase, SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { createId, formatDateTime } from "@/lib/madres-buscadoras/utils";

type Props = {
  dataset: SearchCaseDataset;
  cases: SearchCase[];
  onAddReference: (reference: GeneticReference) => void;
};

export function GeneticReferencesPanel({ dataset, cases, onAddReference }: Props) {
  const [caseId, setCaseId] = useState(cases[0]?.id ?? "");
  const [relationship, setRelationship] = useState("");
  const [originInstitution, setOriginInstitution] = useState("");
  const [externalFolio, setExternalFolio] = useState("");
  const [message, setMessage] = useState("");

  function addReference() {
    if (!caseId || !relationship.trim() || !originInstitution.trim()) {
      setMessage("Completa expediente, relacion e institucion o laboratorio de origen.");
      return;
    }
    onAddReference({
      id: createId("gen"),
      caseId,
      referenceType: "Referencia familiar documentada",
      relationship: relationship.trim(),
      originInstitution: originInstitution.trim(),
      externalFolio: externalFolio.trim() || "Sin folio externo",
      registeredAt: new Date().toISOString(),
      consentStatus: "pending",
      requestStatus: "consent_pending",
      custodyInstitution: "Pendiente de confirmar",
      linkedDocumentIds: [],
      followUp: "Documentar consentimiento, resguardo y siguiente fecha de seguimiento. No capturar secuencias geneticas.",
    });
    setMessage("Referencia registrada localmente como metadato demostrativo.");
    setRelationship("");
    setOriginInstitution("");
    setExternalFolio("");
  }

  return (
    <section className="space-y-5">
      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Referencias geneticas</p>
        <h2 className="mt-1 text-2xl font-black text-[#0A4E84]">Registro de Referencias Geneticas y Solicitudes de Comparacion</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-700">
          Esta seccion registra metadatos de consentimiento, origen, resguardo y seguimiento. No solicita secuencias completas de ADN,
          no calcula compatibilidad y no presenta hallazgos periciales.
        </p>
        <div className="mt-4 rounded-2xl border-l-4 border-[#F97316] bg-[#FFF7ED] p-4 text-sm font-semibold leading-6 text-[#9A3412]">
          Simulacion informativa. No constituye estudio genetico, pericial ni identificacion.
        </div>
      </article>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1fr]">
        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <h3 className="text-xl font-black text-[#0A4E84]">Registrar metadatos</h3>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Expediente relacionado</span>
              <select value={caseId} onChange={(event) => setCaseId(event.target.value)} className="mt-1 min-h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm">
                {cases.map((item) => <option key={item.id} value={item.id}>{item.folio} - {item.displayName}</option>)}
              </select>
            </label>
            <Input label="Relacion con expediente" value={relationship} onChange={setRelationship} />
            <Input label="Institucion o laboratorio de origen" value={originInstitution} onChange={setOriginInstitution} />
            <Input label="Folio externo" value={externalFolio} onChange={setExternalFolio} />
            <button type="button" onClick={addReference} className="min-h-11 rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white">Registrar referencia</button>
            {message ? <p className="rounded-2xl bg-[#E0F2FE] p-4 text-sm font-semibold text-[#0369A1]">{message}</p> : null}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
          <h3 className="text-xl font-black text-[#0A4E84]">Solicitudes registradas</h3>
          <div className="mt-4 space-y-3">
            {dataset.geneticReferences.map((item) => {
              const linkedCase = cases.find((candidate) => candidate.id === item.caseId);
              return (
                <div key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#E4007C]/10 px-3 py-1 text-xs font-black text-[#B00061]">{item.requestStatus}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{item.consentStatus}</span>
                  </div>
                  <h4 className="mt-2 font-black text-slate-900">{item.id} | {linkedCase?.folio}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.referenceType} | Relacion: {item.relationship}</p>
                  <p className="text-sm leading-6 text-slate-600">Origen: {item.originInstitution} | Folio: {item.externalFolio}</p>
                  <p className="text-sm leading-6 text-slate-600">Resguardo: {item.custodyInstitution}</p>
                  <p className="mt-2 text-xs font-bold uppercase text-slate-500">{formatDateTime(item.registeredAt)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.followUp}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 min-h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/20" />
    </label>
  );
}
