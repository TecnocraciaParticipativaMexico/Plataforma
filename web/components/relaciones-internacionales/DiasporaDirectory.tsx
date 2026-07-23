"use client";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { representatives as initialRepresentatives } from "@/lib/relaciones-internacionales/data";
import type { DiasporaRepresentative } from "@/lib/relaciones-internacionales/types";
import { DocumentHeader, EmptyState, Notice, Panel, fieldClass, primaryButtonClass, secondaryButtonClass, } from "./ui";
type Proposal = {
    name: string;
    country: string;
    city: string;
    region: string;
    specialty: string;
    language: string;
    biography: string;
};
const emptyProposal: Proposal = { name: "", country: "", city: "", region: "", specialty: "", language: "", biography: "" };
export function DiasporaDirectory() {
    const [representatives, setRepresentatives] = useState(initialRepresentatives);
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({ country: "", region: "", specialty: "", language: "", status: "" });
    const [selected, setSelected] = useState<DiasporaRepresentative | null>(null);
    const [showProposal, setShowProposal] = useState(false);
    const [proposal, setProposal] = useState(emptyProposal);
    const [proposalError, setProposalError] = useState("");
    const [message, setMessage] = useState("");
    const options = useMemo(() => ({
        countries: [...new Set(representatives.map((item) => item.country))],
        regions: [...new Set(representatives.map((item) => item.region))],
        specialties: [...new Set(representatives.flatMap((item) => item.specialties))],
        languages: [...new Set(representatives.flatMap((item) => item.languages))],
        statuses: [...new Set(representatives.map((item) => item.status))],
    }), [representatives]);
    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return representatives.filter((item) => {
            const searchable = `${item.name} ${item.city} ${item.specialties.join(" ")} ${item.languages.join(" ")}`.toLowerCase();
            return (!normalizedQuery || searchable.includes(normalizedQuery)) &&
                (!filters.country || item.country === filters.country) &&
                (!filters.region || item.region === filters.region) &&
                (!filters.specialty || item.specialties.includes(filters.specialty)) &&
                (!filters.language || item.languages.includes(filters.language)) &&
                (!filters.status || item.status === filters.status);
        });
    }, [filters, query, representatives]);
    function updateProposal(key: keyof Proposal, value: string) {
        setProposal((current) => ({ ...current, [key]: value }));
    }
    function submitProposal(event: FormEvent) {
        event.preventDefault();
        if (proposal.name.trim().length < 3 || proposal.biography.trim().length < 60) {
            setProposalError("Indique un nombre público y una trayectoria de al menos 60 caracteres.");
            return;
        }
        const temporary: DiasporaRepresentative = {
            id: `temp-${Date.now()}`,
            name: `${proposal.name.trim()} (perfil ficticio de demostración)`,
            role: "Representante Cívico de la Diáspora",
            country: proposal.country.trim(), city: proposal.city.trim(), region: proposal.region.trim(),
            specialties: [proposal.specialty.trim()], languages: [proposal.language.trim()],
            experience: "Propuesta temporal pendiente de revisión", collaboration: proposal.specialty.trim(),
            biography: proposal.biography.trim(), activities: "Sin actividades revisadas.",
            status: "Revisión pendiente", reviewDate: "Pendiente", conflict: "No declarado en la propuesta.", isTemporary: true,
        };
        setRepresentatives((current) => [temporary, ...current]);
        setProposal(emptyProposal);
        setProposalError("");
        setShowProposal(false);
        setMessage("La propuesta temporal ya aparece en el directorio de esta sesión.");
    }
    return (<Panel eyebrow="Datos demostrativos" title="Representantes Cívicos y Enlaces de la Diáspora" description="Directorio ciudadano de personas con trayectoria profesional, comunitaria o técnica que colaboran en análisis, documentación y vinculación internacional.">
      <Notice tone="amber">Las denominaciones son exclusivamente ciudadanas y no constituyen cargos diplomáticos, consulares ni representación oficial del Estado mexicano.</Notice>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input aria-label="Buscar perfiles" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nombre, ciudad o especialidad" className={fieldClass}/>
        {(["country", "region", "specialty", "language", "status"] as const).map((key) => {
            const labels = { country: "país", region: "región", specialty: "especialidad", language: "idioma", status: "estado" };
            const values = key === "country" ? options.countries : key === "region" ? options.regions : key === "specialty" ? options.specialties : key === "language" ? options.languages : options.statuses;
            return <select key={key} aria-label={`Filtrar por ${labels[key]}`} value={filters[key]} onChange={(event) => setFilters((current) => ({ ...current, [key]: event.target.value }))} className={fieldClass}>
            <option value="">Todos: {labels[key]}</option>{values.map((value) => <option key={value}>{value}</option>)}</select>;
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{filtered.length} perfiles · datos demostrativos</p>
        <button type="button" onClick={() => setShowProposal(true)} className={primaryButtonClass}>Proponer representante</button>
      </div>
      {message ? <Notice tone="green" className="mt-4">{message}</Notice> : null}
      {filtered.length ? <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex gap-3">
            <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0A4E84] font-black text-white">{item.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</div>
            <div>
            <h3 className="font-black text-slate-900">{item.name}</h3>
            <p className="text-xs font-bold text-[#B00061]">{item.role}</p>
            <p className="text-xs text-slate-500">{item.city}, {item.country} · {item.region}</p>
            </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">{item.specialties.map((specialty) => <span key={specialty} className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-bold text-[#0A4E84]">{specialty}</span>)}</div>
            <p className="mt-3 text-xs text-slate-600">{item.status} · revisión: {item.reviewDate}</p>{item.isTemporary ? <span className="mt-2 inline-block rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold uppercase text-[#B00061]">Registro temporal de demostración</span> : null}<button type="button" onClick={() => setSelected(item)} className="mt-3 block min-h-10 font-black text-[#0A4E84]">Ver ficha →</button>
            </article>)}</div> : <div className="mt-4">
        <EmptyState>No hay perfiles que coincidan con los filtros seleccionados.</EmptyState>
        </div>}
      {selected ? <div role="dialog" aria-modal="true" aria-labelledby="profile-title" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 print:static print:block print:bg-white print:p-0">
        <article className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl print:max-h-none print:max-w-none print:overflow-visible print:rounded-none print:p-0 print:shadow-none">
        <DocumentHeader title="Ficha de representante cívico" folio={selected.id} version="1.0"/>
        <h3 id="profile-title" className="text-xl font-black text-[#0A4E84]">{selected.name}</h3>
        <p className="text-sm font-bold text-[#B00061]">{selected.role}</p>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
        <dt className="font-bold">Experiencia</dt>
        <dd>{selected.experience}</dd>
        </div>
        <div>
        <dt className="font-bold">Colaboración</dt>
        <dd>{selected.collaboration}</dd>
        </div>
        <div>
        <dt className="font-bold">Biografía</dt>
        <dd>{selected.biography}</dd>
        </div>
        <div>
        <dt className="font-bold">Actividades públicas</dt>
        <dd>{selected.activities}</dd>
        </div>
        <div>
        <dt className="font-bold">Idiomas</dt>
        <dd>{selected.languages.join(", ")}</dd>
        </div>
        <div>
        <dt className="font-bold">Conflicto declarado</dt>
        <dd>{selected.conflict}</dd>
        </div>
        </dl>
        <Notice tone="amber" className="mt-4">Ficha ciudadana demostrativa; no acredita representación diplomática ni consular.</Notice>
        <footer className="hidden border-t pt-3 text-xs print:mt-4 print:block">Tecnocracia Participativa México 2030 · Módulo 30</footer>
        <div className="mt-5 flex gap-3 print:hidden">
        <button type="button" onClick={() => window.print()} className={primaryButtonClass}>Imprimir ficha</button>
        <button type="button" onClick={() => setSelected(null)} className={secondaryButtonClass}>Cerrar</button>
        </div>
        </article>
        </div> : null}
      {showProposal ? <div role="dialog" aria-modal="true" aria-labelledby="proposal-title" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
        <form onSubmit={submitProposal} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <h3 id="proposal-title" className="text-xl font-black text-[#0A4E84]">Proponer representante</h3>
        <p className="mt-1 text-sm text-slate-600">La propuesta se conservará únicamente durante esta sesión.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{([['name', 'Nombre público o seudónimo'], ['country', 'País'], ['city', 'Ciudad'], ['region', 'Región'], ['specialty', 'Especialidad'], ['language', 'Idioma']] as [
                keyof Proposal,
                string
            ][]).map(([key, label]) => <label key={key} className="text-sm font-bold">{label} *<input required maxLength={100} value={proposal[key]} onChange={(event) => updateProposal(key, event.target.value)} className={`mt-1 ${fieldClass}`}/>
            </label>)}<label className="text-sm font-bold sm:col-span-2">Trayectoria pública *<textarea required minLength={60} maxLength={1000} rows={5} value={proposal.biography} onChange={(event) => updateProposal('biography', event.target.value)} className={`mt-1 ${fieldClass}`}/>
        </label>
        </div>
        <Notice tone="pink" className="mt-4">No incluya situación migratoria, identificaciones, domicilio, teléfono ni otros datos sensibles.</Notice>{proposalError ? <p role="alert" className="mt-3 text-sm font-bold text-red-700">{proposalError}</p> : null}<div className="mt-5 flex gap-3">
        <button className={primaryButtonClass}>Agregar propuesta temporal</button>
        <button type="button" onClick={() => setShowProposal(false)} className={secondaryButtonClass}>Cancelar</button>
        </div>
        </form>
        </div> : null}
      <p aria-live="polite" className="sr-only">{message}</p>
    </Panel>);
}
