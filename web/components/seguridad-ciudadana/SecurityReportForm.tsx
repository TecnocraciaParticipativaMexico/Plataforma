import { languageQuickOptions, reportCategories, riskLevels } from "@/lib/seguridad-ciudadana/mockData";
import { sanitizeLocation } from "@/lib/seguridad-ciudadana/hash";
import type { SecurityReport } from "@/lib/seguridad-ciudadana/types";

type SecurityReportFormProps = {
  report: SecurityReport;
  onChange: (patch: Partial<SecurityReport>) => void;
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#E5007D] focus:bg-white focus:ring-2 focus:ring-[#E5007D]/20";
const textareaClass =
  "mt-2 w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-[#E5007D] focus:bg-white focus:ring-2 focus:ring-[#E5007D]/20";

export function SecurityReportForm({ report, onChange }: SecurityReportFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-3 inline-flex rounded-full bg-[#0054A6]/10 px-3 py-1 text-xs font-bold uppercase text-[#0054A6]">
        Reporte inicial del expediente
      </div>
      <h2 className="text-xl font-bold text-slate-950">Reporte inicial y hechos narrados</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Describe lo ocurrido con lenguaje claro. No se recolecta IP, no se usa geolocalización automática y no se envía información a servidores.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-800">Tipo de hecho</span>
          <select
            value={report.category}
            onChange={(event) => onChange({ category: event.target.value as SecurityReport["category"] })}
            className={fieldClass}
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
          <span className="text-sm font-bold text-slate-800">Fecha aproximada</span>
          <input type="date" value={report.approximateDate} onChange={(event) => onChange({ approximateDate: event.target.value })} className={fieldClass} />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-800">Ubicación aproximada</span>
          <input
            value={report.location}
            onChange={(event) => onChange({ location: sanitizeLocation(event.target.value) })}
            placeholder="Colonia, municipio o referencia general"
            className={fieldClass}
          />
        </label>

        <div>
          <span className="text-sm font-bold text-slate-800">Idioma original</span>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {languageQuickOptions.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => onChange({ originalLanguage: language })}
                className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                  report.originalLanguage === language
                    ? "bg-[#E5007D] text-white"
                    : "bg-slate-50 text-[#0054A6] ring-1 ring-slate-300 hover:bg-white"
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
            className={fieldClass}
          />
          <p className="mt-1 text-xs leading-5 text-slate-500">No se realiza transcripción ni traducción automática.</p>
        </div>

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-slate-800">Nivel de riesgo percibido</span>
          <select
            value={report.riskLevel}
            onChange={(event) => onChange({ riskLevel: event.target.value as SecurityReport["riskLevel"] })}
            className={fieldClass}
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
          <span className="text-sm font-bold text-slate-800">Personas o instituciones relacionadas, si aplica</span>
          <textarea
            value={report.relatedPeopleInstitutions}
            onChange={(event) => onChange({ relatedPeopleInstitutions: event.target.value.slice(0, 1200) })}
            rows={3}
            placeholder="Incluye solo datos necesarios. Puedes usar descripciones generales si ayuda a proteger privacidad."
            className={textareaClass}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-slate-800">Narrativa de hechos</span>
          <textarea
            value={report.narrative}
            onChange={(event) => onChange({ narrative: event.target.value.slice(0, 6000) })}
            rows={8}
            placeholder="Qué ocurrió, cuándo, dónde de forma general, personas o instituciones involucradas si es estrictamente necesario, y qué evidencia existe."
            className={textareaClass}
          />
          <span className="mt-1 block text-xs text-slate-500">{report.narrative.length}/6000 caracteres</span>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-slate-800">Explicación si aún no hay evidencia adjunta</span>
          <textarea
            value={report.evidenceAbsenceExplanation}
            onChange={(event) => onChange({ evidenceAbsenceExplanation: event.target.value.slice(0, 1200) })}
            rows={3}
            placeholder="Ej. La evidencia está en otro dispositivo, se solicitará copia, o por seguridad se agregará después."
            className={textareaClass}
          />
          <p className="mt-1 text-xs leading-5 text-slate-500">Este campo ayuda a evaluar completitud si decides imprimir antes de adjuntar archivos.</p>
        </label>
      </div>
    </section>
  );
}
