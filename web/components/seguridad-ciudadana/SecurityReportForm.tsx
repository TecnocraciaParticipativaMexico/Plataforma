import { languageQuickOptions, reportCategories, riskLevels } from "@/lib/seguridad-ciudadana/mockData";
import { sanitizeLocation } from "@/lib/seguridad-ciudadana/hash";
import type { SecurityReport } from "@/lib/seguridad-ciudadana/types";

type SecurityReportFormProps = {
  report: SecurityReport;
  onChange: (patch: Partial<SecurityReport>) => void;
};

export function SecurityReportForm({ report, onChange }: SecurityReportFormProps) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <div className="mb-3 inline-flex rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold uppercase text-[#0369A1]">
        Reporte inicial del expediente
      </div>
      <h2 className="text-xl font-bold text-[#0A4E84]">Reporte inicial y hechos narrados</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Describe lo ocurrido con lenguaje claro. No se recolecta IP, no se usa geolocalización automática y no se envía información a servidores.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-[#0A4E84]">Tipo de hecho</span>
          <select
            value={report.category}
            onChange={(event) => onChange({ category: event.target.value as SecurityReport["category"] })}
            className="mt-2 w-full rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#E4007C]"
          >
            <option value="">Seleccionar tipo de hecho</option>
            {reportCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#0A4E84]">Fecha aproximada</span>
          <input
            type="date"
            value={report.approximateDate}
            onChange={(event) => onChange({ approximateDate: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#E4007C]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#0A4E84]">Ubicación aproximada</span>
          <input
            value={report.location}
            onChange={(event) => onChange({ location: sanitizeLocation(event.target.value) })}
            placeholder="Colonia, municipio o referencia general"
            className="mt-2 w-full rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#E4007C]"
          />
        </label>

        <div>
          <span className="text-sm font-bold text-[#0A4E84]">Idioma original</span>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {languageQuickOptions.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => onChange({ originalLanguage: language })}
                className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                  report.originalLanguage === language
                    ? "bg-[#E4007C] text-white"
                    : "bg-[#F8FAFC] text-[#0A4E84] ring-1 ring-[#BFC8CF] hover:bg-[#E0F2FE]"
                }`}
              >
                {language}
              </button>
            ))}
          </div>
          <input
            value={report.originalLanguage}
            onChange={(event) => onChange({ originalLanguage: event.target.value.slice(0, 40) })}
            placeholder="Idioma original"
            className="mt-2 w-full rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#E4007C]"
          />
          <p className="mt-1 text-xs leading-5 text-slate-500">No se realiza transcripción ni traducción automática.</p>
        </div>

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-[#0A4E84]">Nivel de riesgo percibido</span>
          <select
            value={report.riskLevel}
            onChange={(event) => onChange({ riskLevel: event.target.value as SecurityReport["riskLevel"] })}
            className="mt-2 w-full rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#E4007C]"
          >
            <option value="">Seleccionar nivel</option>
            {riskLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-[#0A4E84]">Personas o instituciones relacionadas, si aplica</span>
          <textarea
            value={report.relatedPeopleInstitutions}
            onChange={(event) => onChange({ relatedPeopleInstitutions: event.target.value.slice(0, 1200) })}
            rows={3}
            placeholder="Incluye solo datos necesarios. Puedes usar descripciones generales si ayuda a proteger privacidad."
            className="mt-2 w-full resize-y rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none focus:border-[#E4007C]"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-[#0A4E84]">Narrativa de hechos</span>
          <textarea
            value={report.narrative}
            onChange={(event) => onChange({ narrative: event.target.value.slice(0, 6000) })}
            rows={8}
            placeholder="Qué ocurrió, cuándo, dónde de forma general, personas o instituciones involucradas si es estrictamente necesario, y qué evidencia existe."
            className="mt-2 w-full resize-y rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none focus:border-[#E4007C]"
          />
          <span className="mt-1 block text-xs text-slate-500">{report.narrative.length}/6000 caracteres</span>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-[#0A4E84]">Explicación si aún no hay evidencia adjunta</span>
          <textarea
            value={report.evidenceAbsenceExplanation}
            onChange={(event) => onChange({ evidenceAbsenceExplanation: event.target.value.slice(0, 1200) })}
            rows={3}
            placeholder="Ej. La evidencia está en otro dispositivo, se solicitará copia, o por seguridad se agregará después."
            className="mt-2 w-full resize-y rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none focus:border-[#E4007C]"
          />
          <p className="mt-1 text-xs leading-5 text-slate-500">Este campo ayuda a evaluar completitud si decides imprimir antes de adjuntar archivos.</p>
        </label>
      </div>
    </section>
  );
}
