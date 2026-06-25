import type { SecurityReport } from "@/lib/seguridad-ciudadana/types";

type PrivacyConsentBoxProps = {
  report: SecurityReport;
  onChange: (patch: Partial<SecurityReport>) => void;
};

export function PrivacyConsentBox({ report, onChange }: PrivacyConsentBoxProps) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <div className="mb-3 inline-flex rounded-full bg-[#FFE0DC] px-3 py-1 text-xs font-bold uppercase text-[#B43A32]">
        Privacidad y uso responsable
      </div>
      <h2 className="text-xl font-bold text-[#0A4E84]">Consentimiento informado</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Este MVP crea un registro ciudadano auxiliar en este dispositivo. No sustituye denuncia oficial, no sustituye peritaje oficial y no constituye asesoría legal.
      </p>

      <div className="mt-4 space-y-3">
        <label className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={report.consentAccepted}
            onChange={(event) => onChange({ consentAccepted: event.target.checked })}
            className="mt-1 h-4 w-4 accent-[#E4007C]"
          />
          <span>Acepto preparar una aportación organizada con datos locales y entiendo que los archivos permanecen en este dispositivo en esta versión MVP.</span>
        </label>
        <label className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={report.falseReportWarningAccepted}
            onChange={(event) => onChange({ falseReportWarningAccepted: event.target.checked })}
            className="mt-1 h-4 w-4 accent-[#E4007C]"
          />
          <span>Reconozco la advertencia contra denuncias falsas o narrativas fabricadas.</span>
        </label>
        <label className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={report.thirdPartyPrivacyAccepted}
            onChange={(event) => onChange({ thirdPartyPrivacyAccepted: event.target.checked })}
            className="mt-1 h-4 w-4 accent-[#E4007C]"
          />
          <span>Evitaré publicar datos personales de terceros que no sean necesarios para describir los hechos.</span>
        </label>
      </div>
    </section>
  );
}
