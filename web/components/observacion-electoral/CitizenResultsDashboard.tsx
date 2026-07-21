"use client";

import { useMemo, useState } from "react";
import type { ElectionRecord } from "@/lib/observacion-electoral/types";
import type { ConsolidatedPollingStation, Evidence, VerificationStatus } from "@/lib/observacion-electoral/resultsTypes";
import { aggregateVotes, coverage, isEligibleForResults } from "@/lib/observacion-electoral/consolidation";
import { localDemonstrativeResultsAdapter } from "@/lib/observacion-electoral/resultsAdapter";
import { sha256File } from "@/lib/observacion-electoral/merkle";

const statusLabels: Record<VerificationStatus, string> = {
  recibida: "Recibida", pendiente_revision: "Pendiente de revisión", coincidencia_multiple: "Coincidencia múltiple",
  verificada_visualmente: "Verificada visualmente", con_discrepancia: "Con discrepancia", incompleta: "Incompleta",
  ilegible: "Ilegible", excluida: "Excluida del cálculo", cotejada_fuente_publica: "Cotejada con fuente pública",
};

type Filters = { election: string; state: string; district: string; municipality: string; section: string; polling: string; candidate: string; status: string };
const emptyFilters: Filters = { election: "", state: "", district: "", municipality: "", section: "", polling: "", candidate: "", status: "" };
const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));

export function CitizenResultsDashboard({ records }: { records: ElectionRecord[] }) {
  const source = useMemo(() => localDemonstrativeResultsAdapter.load(records), [records]);
  const [filters, setFilters] = useState(emptyFilters);
  const [selectedCandidate, setSelectedCandidate] = useState("Partido A");
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence>();
  const [verification, setVerification] = useState("");

  const filtered = useMemo(() => source.records.filter((record) =>
    (!filters.election || record.electionType === filters.election) && (!filters.state || record.state === filters.state) &&
    (!filters.district || record.district === filters.district) && (!filters.municipality || record.municipality === filters.municipality) &&
    (!filters.section || record.section === filters.section) && (!filters.polling || `${record.pollingPlaceType} ${record.pollingPlaceNumber}` === filters.polling) &&
    (!filters.status || record.status === filters.status)
  ), [filters, source.records]);
  const results = useMemo(() => aggregateVotes(filtered).filter((item) => !filters.candidate || item.name === filters.candidate), [filtered, filters.candidate]);
  const documentaryCoverage = coverage(filtered, source.expectedPollingStations);
  const maxVotes = Math.max(...results.map((item) => item.votes), 1);
  const eligible = filtered.filter((record) => isEligibleForResults(record.status));
  const selectedRecords = eligible.filter((record) => record.votes[selectedCandidate as keyof typeof record.votes] > 0);

  function setFilter(key: keyof Filters, value: string) { setFilters((current) => ({ ...current, [key]: value })); }
  async function verify(file?: File) {
    if (!file || !selectedEvidence) return;
    try {
      const calculated = await sha256File(file);
      if (!selectedEvidence.sha256) setVerification(`Huella calculada: ${calculated}. Pendiente de infraestructura: esta evidencia no tiene una huella registrada para comparar.`);
      else setVerification(calculated === selectedEvidence.sha256 ? "Integridad verificada" : "Archivo modificado o no coincidente");
    } catch { setVerification("Error de verificación"); }
  }

  return (
    <section aria-labelledby="citizen-results-title" className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#7C3AED]">Ampliación demostrativa</p><h2 id="citizen-results-title" className="mt-1 text-2xl font-black text-[#0A4E84]">Resultados ciudadanos basados en actas verificadas</h2></div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">Datos locales demostrativos</span>
      </div>
      <div className="rounded-2xl border-l-4 border-[#F97316] bg-orange-50 p-4 text-sm font-semibold leading-6 text-orange-950">
        Resultados ciudadanos parciales y no oficiales. Se calculan únicamente con las actas incorporadas y verificadas en esta plataforma. No constituyen PREP, conteo rápido, declaración de ganador ni resultado definitivo. La cobertura disponible puede no ser estadísticamente representativa. Consulte siempre los resultados publicados por la autoridad electoral competente.
      </div>

      <FiltersPanel records={source.records} filters={filters} onChange={setFilter} onClear={() => setFilters(emptyFilters)} />

      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <article className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
          <h3 className="font-black text-[#0A4E84]">Votación capturada</h3>
          <p className="mt-1 text-sm text-slate-600">Tendencia dentro de las actas disponibles. Selecciona una barra para rastrear su cifra.</p>
          <div className="mt-5 space-y-5">{results.map((item) => (
            <button key={item.name} type="button" onClick={() => setSelectedCandidate(item.name)} className="block w-full rounded-xl p-2 text-left focus:outline-none focus:ring-2 focus:ring-[#E4007C]" aria-pressed={selectedCandidate === item.name}>
              <span className="flex flex-wrap justify-between gap-2 text-sm"><b>{item.name}</b><span>{item.votes.toLocaleString("es-MX")} votos · {item.percentage.toFixed(1)} %</span></span>
              <span className="mt-2 block h-8 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-gradient-to-r from-[#E4007C] via-[#7C3AED] to-[#0A4E84]" style={{ width: `${(item.votes / maxVotes) * 100}%` }} /></span>
              <span className="mt-1 block text-xs text-slate-500">Diferencia con la siguiente opción: {item.difference.toLocaleString("es-MX")} · {item.records} acta(s)</span>
            </button>
          ))}{!results.length ? <p className="rounded-xl border border-dashed p-5 text-center text-sm">No hay registros elegibles para estos filtros.</p> : null}</div>
        </article>
        <CoveragePanel records={filtered} included={documentaryCoverage.included} expected={documentaryCoverage.expected} percentage={documentaryCoverage.percentage} updatedAt={source.updatedAt} />
      </div>

      <TraceBreakdown candidate={selectedCandidate} records={selectedRecords} onEvidence={setSelectedEvidence} />
      <IntegrityPanel evidence={selectedEvidence} verification={verification} onVerify={verify} />
    </section>
  );
}

function FiltersPanel({ records, filters, onChange, onClear }: { records: ConsolidatedPollingStation[]; filters: Filters; onChange: (key: keyof Filters, value: string) => void; onClear: () => void }) {
  const fields: { key: keyof Filters; label: string; options: string[] }[] = [
    { key: "election", label: "Tipo de elección", options: unique(records.map((r) => r.electionType)) }, { key: "state", label: "Entidad federativa", options: unique(records.map((r) => r.state)) },
    { key: "district", label: "Distrito electoral", options: unique(records.map((r) => r.district)) }, { key: "municipality", label: "Municipio o alcaldía", options: unique(records.map((r) => r.municipality)) },
    { key: "section", label: "Sección electoral", options: unique(records.map((r) => r.section)) }, { key: "polling", label: "Casilla", options: unique(records.map((r) => `${r.pollingPlaceType} ${r.pollingPlaceNumber}`)) },
    { key: "candidate", label: "Candidatura o partido", options: ["Partido A", "Partido B", "Partido C"] }, { key: "status", label: "Estado de verificación", options: Object.keys(statusLabels) },
  ];
  return <div className="rounded-2xl border bg-white p-4"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{fields.map((field) => <label key={field.key} className="text-sm font-bold text-slate-700">{field.label}<select value={filters[field.key]} onChange={(event) => onChange(field.key, event.target.value)} className="input mt-1"><option value="">Todo el ámbito disponible</option>{field.options.map((option) => <option key={option} value={option}>{field.key === "status" ? statusLabels[option as VerificationStatus] : option}</option>)}</select></label>)}</div><button type="button" onClick={onClear} className="mt-4 rounded-xl border border-[#E4007C] px-4 py-2 text-sm font-bold text-[#E4007C]">Limpiar filtros</button></div>;
}

function CoveragePanel({ records, included, expected, percentage, updatedAt }: { records: ConsolidatedPollingStation[]; included: number; expected?: number; percentage?: number; updatedAt: string }) {
  const pending = records.filter((r) => r.status === "recibida" || r.status === "pendiente_revision").length;
  const discrepancies = records.filter((r) => r.status === "con_discrepancia").length;
  const excluded = records.filter((r) => r.status === "ilegible" || r.status === "excluida").length;
  const includedEvidence = records.filter((record) => isEligibleForResults(record.status)).reduce((sum, record) => sum + record.evidences.length, 0);
  return <aside className="rounded-2xl border bg-white p-5 shadow-sm"><h3 className="font-black text-[#0A4E84]">Cobertura documental</h3><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><Metric label="Actas verificadas incluidas" value={includedEvidence}/><Metric label="Casillas únicas incluidas" value={included}/><Metric label="Casillas esperadas" value={expected ?? "Dato no disponible"}/><Metric label="Cobertura" value={percentage === undefined ? "No calculable" : `${percentage.toFixed(1)} %`}/><Metric label="Actas pendientes" value={pending}/><Metric label="Con discrepancias" value={discrepancies}/><Metric label="Ilegibles o excluidas" value={excluded}/><Metric label="Última actualización" value={updatedAt.startsWith("1970") ? "Sin registros" : new Date(updatedAt).toLocaleString("es-MX")}/></dl><p className="mt-4 rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-900">El porcentaje electoral describe la distribución de votos capturados; la cobertura indica cuántas casillas documentales están incluidas. Son conceptos distintos.</p></aside>;
}

function Metric({ label, value }: { label: string; value: string | number }) { return <div><dt className="font-bold text-slate-500">{label}</dt><dd className="mt-1 font-black text-slate-900">{value}</dd></div>; }

function TraceBreakdown({ candidate, records, onEvidence }: { candidate: string; records: ConsolidatedPollingStation[]; onEvidence: (evidence: Evidence) => void }) {
  return <article className="rounded-2xl border bg-white p-4 sm:p-6"><h3 className="font-black text-[#0A4E84]">Trazabilidad de la cifra · {candidate}</h3><p className="mt-1 text-sm text-slate-600">Desglose por entidad, distrito, municipio, sección, casilla, registro consolidado y evidencia.</p><div className="mt-4 space-y-3">{records.map((record) => <details key={record.id} className="rounded-xl border p-3"><summary className="cursor-pointer font-bold">{record.state} › Distrito {record.district} › {record.municipality} › Sección {record.section} › {record.pollingPlaceType} {record.pollingPlaceNumber}</summary><p className="mt-3 text-sm"><b>Registro consolidado:</b> {record.id}<br/><b>Votos:</b> {record.votes[candidate as keyof typeof record.votes]} · <b>Estado:</b> {statusLabels[record.status]}<br/><b>Evidencias:</b> {record.evidences.length === 1 ? "1 evidencia disponible" : record.status === "con_discrepancia" ? `${record.evidences.length} evidencias con discrepancias` : `${record.evidences.length} evidencias coincidentes`}</p><div className="mt-2 flex flex-wrap gap-2">{record.evidences.map((evidence) => <button type="button" key={evidence.id} onClick={() => onEvidence(evidence)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold">Consultar {evidence.id}</button>)}</div></details>)}{!records.length ? <p className="text-sm text-slate-500">No hay actas elegibles que respalden esta cifra con los filtros actuales.</p> : null}</div></article>;
}

function IntegrityPanel({ evidence, verification, onVerify }: { evidence?: Evidence; verification: string; onVerify: (file?: File) => void }) {
  const [file, setFile] = useState<File>();
  return <article className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4 sm:p-6"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-[#7C3AED]">Integridad protegida mediante blockchain</h3><span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-900">Diseño objetivo · pendiente de infraestructura</span></div><p className="mt-3 text-sm leading-6">Cada evidencia genera una huella criptográfica única. Las huellas de las actas verificadas se consolidan y anclan periódicamente en blockchain, permitiendo comprobar posteriormente que los archivos y resultados publicados no fueron alterados. Las imágenes permanecen almacenadas fuera de la cadena y protegidas conforme a las reglas de privacidad de la plataforma.</p><p className="mt-3 text-sm font-semibold leading-6">El anclaje blockchain acredita integridad temporal y detecta alteraciones posteriores; no certifica por sí mismo que el contenido capturado sea verdadero ni sustituye la revisión de las actas.</p><p className="mt-3 rounded-xl bg-white p-3 text-sm">En este MVP no existe proveedor, transacción ni llave de firma configurada. Huella criptográfica generada; anclaje blockchain pendiente.</p><div className="mt-3 flex flex-wrap gap-2 text-xs">{["Integridad verificada", "Archivo modificado o no coincidente", "Pendiente de anclaje", "Anclaje enviado", "Anclaje confirmado", "Error de verificación"].map((state) => <span key={state} className="rounded-full border border-violet-200 bg-white px-2 py-1">{state}</span>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]"><label className="text-sm font-bold">Verificar integridad de {evidence?.id ?? "una evidencia seleccionada"}<input type="file" onChange={(event) => setFile(event.target.files?.[0])} className="mt-1 block w-full text-sm" /></label><button type="button" disabled={!file || !evidence} onClick={() => onVerify(file)} className="self-end rounded-xl bg-[#7C3AED] px-4 py-3 font-bold text-white disabled:opacity-50">Verificar integridad</button></div>{verification ? <p aria-live="polite" className="mt-3 break-all rounded-xl bg-white p-3 text-xs leading-5">{verification}</p> : null}<dl className="mt-4 grid gap-2 text-xs sm:grid-cols-2"><Metric label="Estado de anclaje" value={evidence ? "Pendiente de infraestructura" : "Selecciona una evidencia"}/><Metric label="Red" value="No configurada"/><Metric label="Transaction hash" value="No existe"/><Metric label="Confirmaciones" value="No disponibles"/></dl></article>;
}
