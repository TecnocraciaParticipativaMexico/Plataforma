import type { SecurityReport } from "@/lib/seguridad-ciudadana/types";

type PrivacyConsentBoxProps = {
  report: SecurityReport;
  onChange: (patch: Partial<SecurityReport>) => void;
};

export function PrivacyConsentBox({ report, onChange }: PrivacyConsentBoxProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-3 inline-flex rounded-full bg-[#F7931E]/15 px-3 py-1 text-xs font-bold uppercase text-[#9A4F00]">
        Privacidad y uso responsable
      </div>
      <h2 className="text-xl font-bold text-slate-950">Consentimiento informado</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Esta carpeta se guarda localmente en este navegador. No se envían datos a servidor, no se usan APIs externas, geolocalización automática ni micrófono.
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        La persona conserva control del expediente. No se pide nombre obligatorio y el material no sustituye denuncia oficial, peritaje oficial ni asesoría legal.
      </p>

      <div className="mt-4 space-y-3">
        <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={report.consentAccepted}
            onChange={(event) => onChange({ consentAccepted: event.target.checked })}
            className="mt-1 h-4 w-4 accent-[#E5007D]"
          />
          <span>Acepto preparar una aportación organizada con datos locales y entiendo que los archivos permanecen en este dispositivo en esta versión MVP.</span>
        </label>
        <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={report.falseReportWarningAccepted}
            onChange={(event) => onChange({ falseReportWarningAccepted: event.target.checked })}
            className="mt-1 h-4 w-4 accent-[#E5007D]"
          />
          <span>Reconozco la advertencia contra denuncias falsas o narrativas fabricadas.</span>
        </label>
        <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={report.thirdPartyPrivacyAccepted}
            onChange={(event) => onChange({ thirdPartyPrivacyAccepted: event.target.checked })}
            className="mt-1 h-4 w-4 accent-[#E5007D]"
          />
          <span>Evitaré publicar datos personales de terceros que no sean necesarios para describir los hechos.</span>
        </label>
      </div>
    </section>
  );
}
