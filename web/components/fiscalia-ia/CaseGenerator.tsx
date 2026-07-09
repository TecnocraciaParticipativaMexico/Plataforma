import { useRef, useState } from "react";
import { factTypes, mexicanStates } from "@/lib/fiscalia-ia/data/mock";
import { sha256File } from "@/lib/fiscalia-ia/services/hashService";
import type { EvidenceRecord, FiscaliaFormState, StructuredCase } from "@/lib/fiscalia-ia/types";
import { EvidenceMiniList } from "./DashboardCards";

type CaseGeneratorProps = {
  form: FiscaliaFormState;
  evidence: EvidenceRecord[];
  loading: boolean;
  onFormChange: (patch: Partial<FiscaliaFormState>) => void;
  onEvidenceAdd: (items: EvidenceRecord[]) => void;
  onGenerate: () => void;
  structuredCase: StructuredCase | null;
};

export function CaseGenerator({ form, evidence, loading, onFormChange, onEvidenceAdd, onGenerate, structuredCase }: CaseGeneratorProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileNotice, setFileNotice] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const accepted = Array.from(files).slice(0, 6);
    const hashed = await Promise.all(
      accepted.map(async (file, index) => ({
        id: `ev-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type || "tipo no declarado",
        sha256: await sha256File(file),
        registeredAt: new Date().toISOString(),
        source: "Archivo seleccionado en este dispositivo",
      })),
    );
    onEvidenceAdd(hashed);
    setFileNotice(`Se calcularon ${hashed.length} hash(es) locales. No se subieron archivos.`);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-5">
        <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 shadow-xl shadow-black/40">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-black uppercase tracking-wide text-white"><span className="text-[#E5007D]">01.</span> Generador</h2>
            <span className="rounded-full border border-pink-500/30 bg-pink-950/50 px-2 py-0.5 text-[10px] font-bold uppercase text-pink-300">frontend local</span>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Identidad
                <select value={form.identityMode} onChange={(event) => onFormChange({ identityMode: event.target.value as FiscaliaFormState["identityMode"] })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]">
                  <option value="anonimo">Anónimo</option>
                  <option value="nombre_opcional">Nombre opcional</option>
                </select>
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nombre opcional
                <input value={form.optionalName} onChange={(event) => onFormChange({ optionalName: event.target.value.slice(0, 80) })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]" placeholder="No obligatorio" />
              </label>
            </div>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tipo de hecho
              <select value={form.factType} onChange={(event) => onFormChange({ factType: event.target.value })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]">
                {factTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Fecha
                <input type="date" value={form.date} onChange={(event) => onFormChange({ date: event.target.value })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]" />
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Hora
                <input type="time" value={form.time} onChange={(event) => onFormChange({ time: event.target.value })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]" />
              </label>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Estado
                <select value={form.state} onChange={(event) => onFormChange({ state: event.target.value })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]">
                  {mexicanStates.map((state) => <option key={state}>{state}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Municipio / localidad
                <input value={form.municipality} onChange={(event) => onFormChange({ municipality: event.target.value.slice(0, 120) })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]" />
              </label>
            </div>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Autoridades/cargos involucrados
              <input value={form.involvedRoles} onChange={(event) => onFormChange({ involvedRoles: event.target.value.slice(0, 500) })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]" placeholder="Describe roles de forma neutral" />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Narrativa libre
              <textarea value={form.narrative} onChange={(event) => onFormChange({ narrative: event.target.value.slice(0, 6000) })} rows={7} className="mt-1 w-full resize-y rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm leading-6 text-slate-100 outline-none focus:border-[#E5007D]" />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Evidencia referenciada
              <input value={form.evidenceReference} onChange={(event) => onFormChange({ evidenceReference: event.target.value.slice(0, 700) })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]" />
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Riesgo percibido
                <select value={form.riskLevel} onChange={(event) => onFormChange({ riskLevel: event.target.value as FiscaliaFormState["riskLevel"] })} className="mt-1 w-full rounded-xl border border-zinc-800 bg-[#090a0f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#E5007D]">
                  <option value="bajo">Bajo</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                  <option value="critico">Crítico</option>
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#090a0f] p-3 text-xs font-semibold text-slate-300">
                <input type="checkbox" checked={form.privacyConsent} onChange={(event) => onFormChange({ privacyConsent: event.target.checked })} className="h-4 w-4 accent-[#E5007D]" />
                Consentimiento de privacidad
              </label>
            </div>

            <button type="button" onClick={onGenerate} disabled={loading} className="rounded-xl bg-gradient-to-r from-[#E5007D] to-[#702F8A] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-pink-500/20 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70">
              {loading ? "Estructurando..." : "Estructurar expediente ciudadano"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 shadow-xl shadow-black/40">
          <h3 className="mb-3 text-sm font-black uppercase text-white">Registro de evidencia</h3>
          <input ref={inputRef} type="file" multiple onChange={(event) => void handleFiles(event.target.files)} className="block w-full text-xs text-slate-400 file:mr-3 file:rounded-full file:border-0 file:bg-[#0054A6] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white" />
          <p className="mt-2 text-[11px] leading-5 text-slate-500">No se suben archivos automáticamente. Los hashes se calculan localmente cuando el navegador lo permite.</p>
          {fileNotice ? <p className="mt-2 rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-2 text-xs text-emerald-300">{fileNotice}</p> : null}
          <div className="mt-4">
            <EvidenceMiniList evidence={evidence} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 shadow-xl shadow-black/40">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wide text-white"><span className="text-[#39B54A]">02.</span> Resultado estructurado</h2>
              <p className="mt-1 text-xs leading-5 text-slate-400">La IA ayuda a ordenar información. No sustituye asesoría legal ni determina responsabilidades.</p>
            </div>
            <span className="rounded-full bg-purple-950 px-2 py-1 text-[10px] font-bold uppercase text-purple-200">mock local</span>
          </div>

          {!structuredCase ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center">
              <p className="text-lg font-black text-white">Expediente pendiente</p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400">Completa los campos y genera un expediente ciudadano estructurado con resumen, cronología, roles, checklist y trazabilidad local.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-pink-500/20 bg-zinc-950 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E5007D] px-3 py-1 text-xs font-black text-white">{structuredCase.folio}</span>
                  <span className="rounded-full bg-blue-950 px-3 py-1 text-xs font-bold text-blue-200">{structuredCase.preliminaryClassification}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">{structuredCase.summary}</p>
                <p className="mt-2 break-all font-mono text-[11px] text-slate-500">SHA-256: {structuredCase.contentHash}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="text-xs font-black uppercase text-white">Cronología sugerida</h3>
                  <ol className="mt-3 space-y-3">
                    {structuredCase.timeline.map((event) => (
                      <li key={event.id} className="border-l-2 border-[#E5007D] pl-3 text-xs leading-5 text-slate-300">
                        <strong className="block text-white">{event.label}</strong>
                        {event.date} {event.time} · {event.detail}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="text-xs font-black uppercase text-white">Checklist</h3>
                  <div className="mt-3 space-y-2">
                    {structuredCase.checklist.map((item) => (
                      <div key={item.id} className="flex gap-2 text-xs text-slate-300">
                        <span className={item.complete ? "text-emerald-400" : "text-amber-300"}>{item.complete ? "OK" : "PEND"}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
                <h3 className="text-xs font-black uppercase text-amber-200">Alertas de privacidad y lenguaje</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-amber-100/80">
                  {structuredCase.alerts.map((alert) => <li key={alert}>{alert}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
