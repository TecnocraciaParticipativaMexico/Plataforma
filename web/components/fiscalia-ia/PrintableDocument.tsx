import type { StructuredCase } from "@/lib/fiscalia-ia/types";

type PrintableDocumentProps = {
  structuredCase: StructuredCase | null;
};

export function PrintableDocument({ structuredCase }: PrintableDocumentProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 shadow-xl shadow-black/40 print:border-0 print:bg-white print:p-0 print:shadow-none">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between print:hidden">
        <div>
          <h2 className="text-lg font-black uppercase text-white">Documento profesional imprimible</h2>
          <p className="mt-1 text-xs text-slate-400">Documento de apoyo para revisión con autoridades competentes, abogados, comités o acompañantes ciudadanos.</p>
        </div>
        <button type="button" onClick={() => window.print()} className="rounded-full bg-gradient-to-r from-[#E5007D] to-[#702F8A] px-5 py-2 text-sm font-black text-white shadow-lg shadow-pink-500/20">
          Imprimir o guardar PDF
        </button>
      </div>

      {!structuredCase ? (
        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center text-sm text-slate-400 print:hidden">Genera un expediente para preparar el documento imprimible.</div>
      ) : (
        <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 text-slate-950 shadow-2xl print:max-w-none print:rounded-none print:p-0 print:shadow-none">
          <section className="doc-section border-l-8 border-[#E5007D] pl-6 print:break-after-page">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E5007D]">Tecnocracia Participativa México 2030</p>
            <h1 className="mt-3 text-3xl font-black">Fiscalía Forense Ciudadana</h1>
            <p className="mt-2 text-lg font-semibold">Expediente ciudadano estructurado</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div><strong>Folio ciudadano:</strong> {structuredCase.folio}</div>
              <div><strong>Fecha:</strong> {new Date(structuredCase.timestamp).toLocaleString("es-MX")}</div>
              <div><strong>Versión:</strong> v{structuredCase.version}</div>
              <div><strong>Clasificación preliminar:</strong> {structuredCase.preliminaryClassification}</div>
            </div>
            <p className="mt-6 rounded-xl bg-slate-100 p-4 text-sm leading-6">
              Aviso: este documento es una guía de documentación y acompañamiento cívico. No sustituye asesoría legal ni determina responsabilidades.
            </p>
          </section>

          <section className="doc-section mt-8 border-l-8 border-[#0054A6] pl-6 print:break-after-page">
            <h2 className="text-xl font-black">Índice</h2>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm">
              <li>Datos generales y resumen ciudadano</li>
              <li>Narrativa y cronología</li>
              <li>Roles referidos e inventario de evidencia</li>
              <li>Registro de integridad digital y checklist</li>
              <li>Seguimiento sugerido e historial</li>
            </ol>
          </section>

          <section className="doc-section mt-8 border-l-8 border-[#39B54A] pl-6 print:break-after-page">
            <h2 className="text-xl font-black">Datos generales</h2>
            <p className="mt-3 text-sm leading-7">{structuredCase.summary}</p>
            <h3 className="mt-6 font-black">Narrativa ordenada</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{structuredCase.structuredNarrative}</p>
          </section>

          <section className="doc-section mt-8 border-l-8 border-[#702F8A] pl-6 print:break-after-page">
            <h2 className="text-xl font-black">Cronología y roles</h2>
            <ol className="mt-4 space-y-3">
              {structuredCase.timeline.map((event) => (
                <li key={event.id} className="text-sm leading-6"><strong>{event.date} {event.time} · {event.label}:</strong> {event.detail}</li>
              ))}
            </ol>
            <div className="mt-6 space-y-3">
              {structuredCase.roles.map((role) => (
                <div key={role.id} className="rounded-xl bg-slate-100 p-3 text-sm">
                  <strong>{role.label}:</strong> {role.description}
                  <p className="text-xs text-slate-600">{role.caution}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="doc-section mt-8 border-l-8 border-[#F7931E] pl-6 print:break-after-page">
            <h2 className="text-xl font-black">Evidencia e integridad digital</h2>
            <div className="mt-4 space-y-3">
              {structuredCase.evidence.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 p-3 text-sm">
                  <strong>{item.name}</strong>
                  <p>{item.type} · {item.source}</p>
                  <p className="break-all font-mono text-xs">SHA-256: {item.sha256}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 break-all rounded-xl bg-slate-100 p-3 font-mono text-xs">Hash del expediente: {structuredCase.contentHash}</p>
          </section>

          <section className="doc-section mt-8 border-l-8 border-[#FFC20E] pl-6">
            <h2 className="text-xl font-black">Checklist, seguimiento e historial</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {structuredCase.checklist.map((item) => (
                <li key={item.id}>{item.complete ? "Completo" : "Pendiente"} · {item.label}</li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-slate-100 p-4 text-sm leading-6">{structuredCase.suggestedNextStep}</p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="border-t border-slate-400 pt-3 text-center text-xs">Firma ciudadana opcional</div>
              <div className="border-t border-slate-400 pt-3 text-center text-xs">Acompañante cívico opcional</div>
            </div>
          </section>
        </article>
      )}

      <style>{`
        @media print {
          body { background: white !important; }
          header, nav, button, input, select, textarea, .print\\:hidden { display: none !important; }
          main { background: white !important; color: black !important; }
          .doc-section { margin: 0 0 24px 0; padding-top: 24px; min-height: 86vh; }
        }
      `}</style>
    </section>
  );
}
