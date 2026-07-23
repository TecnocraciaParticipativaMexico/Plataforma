"use client";
import { useMemo, useState } from "react";
import { internationalCases } from "@/lib/relaciones-internacionales/data";
import type { InternationalCase } from "@/lib/relaciones-internacionales/types";
import { DocumentHeader, EmptyState, Notice, Panel, fieldClass, primaryButtonClass, secondaryButtonClass } from "./ui";
function buildLocalSuggestions(item: InternationalCase) {
    const suggestions: string[] = [];
    if (item.sources.length < 2)
        suggestions.push("Incorporar al menos una fuente primaria adicional.");
    if (item.timeline.length < 2)
        suggestions.push("Completar la cronología con fechas, actores y hechos verificables.");
    if (item.category === "Movilidad humana")
        suggestions.push("Revisar medidas de protección y mecanismos regionales aplicables.");
    if (item.priority === "Alta" || item.priority === "Crítica")
        suggestions.push("Documentar riesgos, consentimiento y medidas de minimización de datos.");
    suggestions.push("Confirmar el foro potencial con el comité experto antes de preparar el dossier.");
    return suggestions;
}
export function InternationalCases() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [selected, setSelected] = useState<InternationalCase | null>(null);
    const [assistantSuggestions, setAssistantSuggestions] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const filtered = useMemo(() => internationalCases.filter((item) => {
        const searchable = `${item.id} ${item.title} ${item.category} ${item.region}`.toLowerCase();
        return searchable.includes(query.toLowerCase()) && (!category || item.category === category) && (!status || item.status === status) && (!priority || item.priority === priority);
    }), [category, priority, query, status]);
    function openCase(item: InternationalCase) {
        setSelected(item);
        setAssistantSuggestions([]);
        setMessage("");
    }
    return (<Panel eyebrow="Expedientes demostrativos" title="Expedientes y Alertas Internacionales" description="Organiza documentación ciudadana, identifica mecanismos internacionales potencialmente aplicables y prepara materiales para revisión experta y decisión humana.">
      <Notice tone="amber">La plataforma prepara documentación de apoyo. La presentación ante autoridades u organismos requiere revisión, consentimiento y actuación humana fuera del sistema.</Notice>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input aria-label="Buscar expedientes" className={fieldClass} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar folio, título o región"/>
        <select aria-label="Filtrar categoría" className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)}>
    <option value="">Todas las categorías</option>{[...new Set(internationalCases.map((item) => item.category))].map((value) => <option key={value}>{value}</option>)}</select>
        <select aria-label="Filtrar estado" className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value)}>
    <option value="">Todos los estados</option>{[...new Set(internationalCases.map((item) => item.status))].map((value) => <option key={value}>{value}</option>)}</select>
        <select aria-label="Filtrar prioridad" className={fieldClass} value={priority} onChange={(event) => setPriority(event.target.value)}>
    <option value="">Todas las prioridades</option>{[...new Set(internationalCases.map((item) => item.priority))].map((value) => <option key={value}>{value}</option>)}</select>
      </div>
      {filtered.length ? <div className="mt-5 grid gap-4 lg:grid-cols-2">{filtered.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
            <div className="flex flex-wrap justify-between gap-3">
            <span className="font-mono text-xs font-bold text-[#0A4E84]">{item.id}</span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">Prioridad {item.priority}</span>
            </div>
            <h3 className="mt-2 text-lg font-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[#0A4E84]">{item.category}</span>
            <span className="rounded-full bg-pink-50 px-2 py-1 text-[#B00061]">{item.status}</span>
            <span className="rounded-full bg-slate-100 px-2 py-1">{item.region}</span>
            </div>
            <button type="button" onClick={() => openCase(item)} className="mt-4 min-h-10 font-black text-[#0A4E84]">Abrir expediente →</button>
            </article>)}</div> : <div className="mt-5">
        <EmptyState>No hay expedientes que coincidan con los filtros.</EmptyState>
        </div>}
      {selected ? <article className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 print:border-0 print:bg-white print:p-0">
        <DocumentHeader title="Dossier ciudadano internacional" folio={selected.id} version="1.0"/>
        <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
        <p className="font-mono text-xs font-bold text-[#E4007C]">{selected.id} · expediente demostrativo</p>
        <h3 className="mt-1 text-xl font-black text-[#0A4E84]">{selected.title}</h3>
        </div>
        <button type="button" onClick={() => setSelected(null)} className={`${secondaryButtonClass} print:hidden`}>Cerrar</button>
        </div>
        <p className="mt-3 text-sm leading-6">{selected.summary}</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
        <section>
        <h4 className="font-black text-[#0A4E84]">Comité y mecanismo potencial</h4>
        <p className="mt-1 text-sm">{selected.committee}</p>
        <p className="text-sm">{selected.mechanism}</p>
        <h4 className="mt-4 font-black text-[#0A4E84]">Fuentes</h4>
        <ul className="list-disc pl-5 text-sm">{selected.sources.map((source) => <li key={source}>{source}</li>)}</ul>
        <h4 className="mt-4 font-black text-[#0A4E84]">Documentos derivados</h4>
        <ul className="list-disc pl-5 text-sm">{selected.documents.map((document) => <li key={document}>{document}</li>)}</ul>
        </section>
        <section>
        <h4 className="font-black text-[#0A4E84]">Cronología</h4>{selected.timeline.map((entry) => <p key={`${entry.date}-${entry.event}`} className="mt-2 border-l-2 border-[#E4007C] pl-3 text-sm">
            <strong>{entry.date}</strong> · {entry.event}</p>)}<h4 className="mt-4 font-black text-[#0A4E84]">Acciones pendientes</h4>
        <ul className="list-disc pl-5 text-sm">{selected.pending.map((action) => <li key={action}>{action}</li>)}</ul>
        </section>
        </div>
        <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 print:hidden">
        <h4 className="font-black text-[#0A4E84]">Asistente local demostrativo</h4>
        <p className="mt-1 text-xs text-slate-600">Reglas locales, sin conexión a servicios externos y sin carácter de asesoría jurídica.</p>
        <button type="button" onClick={() => setAssistantSuggestions(buildLocalSuggestions(selected))} className={`mt-3 ${secondaryButtonClass}`}>Analizar información faltante</button>{assistantSuggestions.length ? <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{assistantSuggestions.map((suggestion) => <li key={suggestion}>{suggestion}</li>)}</ul> : null}</section>
        <Notice tone="amber" className="mt-5">La prioridad no activa comunicaciones ni presentaciones. Toda acción externa requiere decisión humana.</Notice>{message ? <Notice tone="green" className="mt-4 print:hidden">{message}</Notice> : null}<footer className="hidden border-t pt-3 text-xs print:mt-4 print:block">Tecnocracia Participativa México 2030 · Módulo 30 · dossier demostrativo</footer>
        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
        <button type="button" onClick={() => window.print()} className={primaryButtonClass}>Preparar dossier / imprimir</button>
        <button type="button" onClick={() => setMessage("Acción externa registrada únicamente en la bitácora temporal de esta sesión.")} className={secondaryButtonClass}>Registrar acción externa</button>
        </div>
        </article> : null}
      <p aria-live="polite" className="sr-only">{message}</p>
    </Panel>);
}
