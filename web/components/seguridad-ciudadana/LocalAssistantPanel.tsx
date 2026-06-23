import type { AbuseGuardResult, LocalAssistantResult } from "@/lib/seguridad-ciudadana/types";

type LocalAssistantPanelProps = {
  result: LocalAssistantResult;
  abuseWarnings: AbuseGuardResult[];
};

function scoreTone(score: number): string {
  if (score >= 75) return "bg-[#D8F3DC] text-[#1F5F24]";
  if (score >= 45) return "bg-[#FFF1A8] text-[#7A5A00]";
  return "bg-[#FFE0DC] text-[#B43A32]";
}

function ListBlock({ empty, items, title }: { empty?: string; items: string[]; title: string }) {
  const visibleItems = items.length ? items : empty ? [empty] : [];
  return (
    <div className="rounded-2xl bg-[#F8FAFC] p-4">
      <h3 className="text-sm font-bold uppercase text-slate-500">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {visibleItems.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export function LocalAssistantPanel({ result, abuseWarnings }: LocalAssistantPanelProps) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD] print:hidden">
      <div className="mb-3 inline-flex rounded-full bg-[#CEF7FA] px-3 py-1 text-xs font-bold uppercase text-[#006C73]">
        Asistente local, sin conexión a servicios externos
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0A4E84]">Asistente de organización cívica</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Este asistente solo organiza información escrita por la persona ciudadana. No decide, no acusa y no valida legalmente los hechos.
          </p>
        </div>
        <div className={`rounded-2xl px-4 py-3 text-center text-sm font-bold ${scoreTone(result.nivelCompletitud)}`}>
          {result.nivelCompletitud}%<span className="block text-xs font-semibold">completitud</span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-[#FFF8F0] p-4">
        <h3 className="text-sm font-bold uppercase text-slate-500">Resumen local</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">{result.resumenCiudadano}</p>
      </div>

      {abuseWarnings.length ? (
        <div className="mt-4 rounded-2xl bg-[#FFE0DC] p-4">
          <h3 className="text-sm font-bold uppercase text-[#B43A32]">Alertas preventivas anti-spam</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {abuseWarnings.map((warning) => (
              <li key={warning.id}>
                <strong>{warning.label}:</strong> {warning.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ListBlock title="Checklist de completitud" items={result.hechosDetectados} />
        <ListBlock title="Preguntas sugeridas" items={result.preguntasParaMejorarReporte} empty="La narrativa ya cubre las preguntas básicas detectables localmente." />
        <ListBlock title="Riesgos de privacidad" items={result.riesgosPrivacidad.map((risk) => `${risk.label}: ${risk.message}`)} empty="No se detectaron señales básicas de datos sensibles." />
        <ListBlock title="Evidencias sugeridas" items={result.evidenciasSugeridas} />
        <ListBlock title="Fechas posibles" items={result.posiblesFechas} />
        <ListBlock title="Lugares posibles" items={result.posiblesLugares} />
      </div>

      <div className="mt-4 rounded-2xl bg-[#E0F2FE] p-4">
        <h3 className="text-sm font-bold uppercase text-[#0369A1]">Advertencias prudentes</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {result.advertenciasPrudentes.map((warning) => (
            <li key={warning}>• {warning}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
