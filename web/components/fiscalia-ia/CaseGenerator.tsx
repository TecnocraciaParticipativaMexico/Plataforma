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

function getValidationErrors(form: FiscaliaFormState): string[] {
  const errors: string[] = [];
  if (!form.factType) errors.push("Selecciona una categoría de hecho.");
  if (!form.state && !form.municipality.trim()) errors.push("Indica al menos un estado, municipio o localidad aproximada.");
  if (!form.narrative.trim()) errors.push("Agrega una narrativa breve de los hechos.");
  if (!form.privacyConsent) errors.push("Confirma el consentimiento de privacidad antes de estructurar el expediente.");
  return errors;
}

export function CaseGenerator({ form, evidence, loading, onFormChange, onEvidenceAdd, onGenerate, structuredCase }: CaseGeneratorProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileNotice, setFileNotice] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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

  function handleGenerateClick() {
    const errors = getValidationErrors(form);
    setValidationErrors(errors);
    if (errors.length) return;
    onGenerate();
  }

  return (
    <section className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-5">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-black uppercase tracking-wide text-[#0A4E84]"><span className="text-[#E4007C]">01.</span> Generador</h2>
            <span className="rounded-full bg-[#F3E8FF] px-2 py-0.5 text-[10px] font-bold uppercase text-[#7E22CE]">frontend local</span>
          </div>

          {validationErrors.length ? (
            <div className="mb-4 rounded-xl border border-[#F97316]/30 bg-[#FFF7ED] p-3 text-xs leading-5 text-[#9A3412]">
              <p className="font-black uppercase">Faltan datos mínimos</p>
              <ul className="mt-1 list-disc pl-4">
                {validationErrors.map((error) => <li key={error}>{error}</li>)}
              </ul>
            </div>
          ) : null}

          <div className="grid gap-4">
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Identidad
                <select value={form.identityMode} onChange={(event) => onFormChange({ identityMode: event.target.value as FiscaliaFormState["identityMode"] })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15">
                  <option value="anonimo">Anónimo</option>
                  <option value="nombre_opcional">Nombre opcional</option>
                </select>
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Nombre opcional
                <input value={form.optionalName} onChange={(event) => onFormChange({ optionalName: event.target.value.slice(0, 80) })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15" placeholder="No obligatorio" />
              </label>
            </div>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Tipo de hecho
              <select value={form.factType} onChange={(event) => onFormChange({ factType: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15">
                <option value="">Selecciona una categoría</option>
                {factTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Fecha
                <input type="date" value={form.date} onChange={(event) => onFormChange({ date: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15" />
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Hora
                <input type="time" value={form.time} onChange={(event) => onFormChange({ time: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15" />
              </label>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Estado
                <select value={form.state} onChange={(event) => onFormChange({ state: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15">
                  <option value="">Selecciona un estado</option>
                  {mexicanStates.map((state) => <option key={state}>{state}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Municipio / localidad
                <input value={form.municipality} onChange={(event) => onFormChange({ municipality: event.target.value.slice(0, 120) })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15" placeholder="Ej. municipio, alcaldía o localidad" />
              </label>
            </div>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Autoridades/cargos involucrados
              <input value={form.involvedRoles} onChange={(event) => onFormChange({ involvedRoles: event.target.value.slice(0, 500) })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15" placeholder="Ej. cargo, dependencia o institución, si se conoce" />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Narrativa libre
              <textarea value={form.narrative} onChange={(event) => onFormChange({ narrative: event.target.value.slice(0, 6000) })} rows={7} className="mt-1 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15" placeholder="Describe qué ocurrió, cuándo, dónde y quiénes estuvieron presentes." />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Evidencia disponible o pendiente de adjuntar
              <input value={form.evidenceReference} onChange={(event) => onFormChange({ evidenceReference: event.target.value.slice(0, 700) })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15" placeholder="Ej. acta física pendiente de digitalizar, video en poder de un testigo o enlace público." />
              <span className="mt-1 block text-[11px] font-normal normal-case leading-5 tracking-normal text-slate-500">
                Describe pruebas que todavía no puedas cargar, como documentos físicos, videos en poder de otra persona, testimonios o enlaces que quieras registrar.
              </span>
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Riesgo percibido
                <select value={form.riskLevel} onChange={(event) => onFormChange({ riskLevel: event.target.value as FiscaliaFormState["riskLevel"] })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#E4007C] focus:ring-2 focus:ring-[#E4007C]/15">
                  <option value="">Selecciona un nivel</option>
                  <option value="bajo">Bajo</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                  <option value="critico">Crítico</option>
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-3 text-xs font-semibold text-slate-700">
                <input type="checkbox" checked={form.privacyConsent} onChange={(event) => onFormChange({ privacyConsent: event.target.checked })} className="h-4 w-4 accent-[#E4007C]" />
                Consentimiento de privacidad
              </label>
            </div>

            <button type="button" onClick={handleGenerateClick} disabled={loading} className="rounded-xl bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-sm transition hover:bg-[#BE185D] disabled:cursor-wait disabled:opacity-70">
              {loading ? "Estructurando..." : "Estructurar expediente ciudadano"}
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-black uppercase text-[#0A4E84]">Archivos locales</h3>
          <input ref={inputRef} type="file" multiple onChange={(event) => void handleFiles(event.target.files)} className="block w-full rounded-xl border border-dashed border-slate-300 bg-[#F8FAFC] p-3 text-xs text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#0A4E84] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white" />
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Selecciona archivos únicamente cuando decidas hacerlo. No se envían automáticamente; el hash se calcula localmente cuando el navegador lo permite.</p>
          {fileNotice ? <p className="mt-2 rounded-lg border border-[#16A34A]/20 bg-[#DCFCE7] p-2 text-xs text-[#166534]">{fileNotice}</p> : null}
          <div className="mt-4">
            <EvidenceMiniList evidence={evidence} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wide text-[#0A4E84]"><span className="text-[#16A34A]">02.</span> Resultado estructurado</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">La IA ayuda a ordenar información. No sustituye asesoría legal ni determina responsabilidades.</p>
            </div>
            <span className="rounded-full bg-[#F3E8FF] px-2 py-1 text-[10px] font-bold uppercase text-[#7E22CE]">mock local</span>
          </div>

          {!structuredCase ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-[#F8FAFC] p-8 text-center">
              <p className="text-lg font-black text-[#0A4E84]">Expediente pendiente</p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">Completa los campos mínimos y genera un expediente ciudadano estructurado con resumen, cronología, roles, checklist y trazabilidad local.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#F7C9DD] bg-[#FFF7FB] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E4007C] px-3 py-1 text-xs font-black text-white">{structuredCase.folio}</span>
                  <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">{structuredCase.preliminaryClassification}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{structuredCase.summary}</p>
                <p className="mt-2 break-all font-mono text-[11px] text-slate-500">SHA-256: {structuredCase.contentHash}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <h3 className="text-xs font-black uppercase text-[#0A4E84]">Cronología sugerida</h3>
                  <ol className="mt-3 space-y-3">
                    {structuredCase.timeline.map((event) => (
                      <li key={event.id} className="border-l-2 border-[#E4007C] pl-3 text-xs leading-5 text-slate-600">
                        <strong className="block text-[#0A4E84]">{event.label}</strong>
                        {event.date} {event.time} · {event.detail}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <h3 className="text-xs font-black uppercase text-[#0A4E84]">Checklist</h3>
                  <div className="mt-3 space-y-2">
                    {structuredCase.checklist.map((item) => (
                      <div key={item.id} className="flex gap-2 text-xs text-slate-600">
                        <span className={item.complete ? "text-[#16A34A]" : "text-[#F97316]"}>{item.complete ? "OK" : "PEND"}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#F97316]/20 bg-[#FFF7ED] p-4">
                <h3 className="text-xs font-black uppercase text-[#9A3412]">Alertas de privacidad y lenguaje</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-[#9A3412]">
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
