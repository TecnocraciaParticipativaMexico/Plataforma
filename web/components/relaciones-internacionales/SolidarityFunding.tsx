"use client";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { campaigns as initialCampaigns } from "@/lib/relaciones-internacionales/data";
import type { SolidarityCampaign } from "@/lib/relaciones-internacionales/types";
import { EmptyState, Notice, Panel, fieldClass, primaryButtonClass, secondaryButtonClass } from "./ui";
import { safeExternalUrl } from "@/lib/relaciones-internacionales/utils";
export function SolidarityFunding() {
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [query, setQuery] = useState("");
    const [cause, setCause] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", cause: "", location: "", owner: "", platform: "", url: "" });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const filtered = useMemo(() => campaigns.filter((item) => `${item.title} ${item.cause} ${item.location}`.toLowerCase().includes(query.toLowerCase()) && (!cause || item.cause === cause)), [campaigns, cause, query]);
    function submitProposal(event: FormEvent) {
        event.preventDefault();
        if (form.title.trim().length < 5 || !form.cause || !form.owner.trim()) {
            setError("Complete título, causa y responsable declarado.");
            return;
        }
        if (form.url && !safeExternalUrl(form.url)) {
            setError("El enlace debe utilizar HTTPS o dejarse vacío.");
            return;
        }
        const campaign: SolidarityCampaign = { id: `TEMP-${Date.now()}`, title: `${form.title.trim()} (campaña demostrativa)`, cause: form.cause, location: form.location.trim(), platform: form.platform.trim() || "Por definir", owner: form.owner.trim(), raised: 0, goal: 1, status: "Propuesta temporal pendiente de revisión", reviewDate: "Pendiente", reviewed: "Solo los campos declarados en esta sesión.", unverified: "Identidad, campaña externa, cifras y destino de recursos.", isTemporary: true };
        setCampaigns((current) => [campaign, ...current]);
        setShowForm(false);
        setError("");
        setForm({ title: "", cause: "", location: "", owner: "", platform: "", url: "" });
        setMessage("La campaña propuesta ya aparece como registro temporal de esta sesión.");
    }
    return <Panel eyebrow="Campañas demostrativas" title="Directorio de Financiamiento Solidario" description="Vincula campañas externas relacionadas con defensa de derechos, litigio estratégico, atención humanitaria y proyectos de la diáspora. La plataforma no recibe, administra ni garantiza fondos.">
    <Notice tone="amber">No recibimos fondos, procesamos pagos, custodiamos dinero ni certificamos su destino. Las cantidades son exclusivamente demostrativas y no se actualizan en tiempo real.</Notice>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_240px_auto]">
    <input aria-label="Buscar campañas" value={query} onChange={(event) => setQuery(event.target.value)} className={fieldClass} placeholder="Buscar causa, campaña o ubicación"/>
    <select aria-label="Filtrar causa" value={cause} onChange={(event) => setCause(event.target.value)} className={fieldClass}>
    <option value="">Todas las causas</option>{[...new Set(campaigns.map((item) => item.cause))].map((value) => <option key={value}>{value}</option>)}</select>
    <button type="button" onClick={() => setShowForm(true)} className={primaryButtonClass}>Proponer campaña</button>
    </div>{message ? <Notice tone="green" className="mt-4">{message}</Notice> : null}
        {filtered.length ? <div className="mt-5 grid gap-4 lg:grid-cols-2">{filtered.map((item) => {
                const progress = item.isTemporary ? 0 : Math.min(100, (item.raised / item.goal) * 100);
                return <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className="text-xs font-black uppercase tracking-wide text-emerald-700">{item.status}</span>
                <h3 className="mt-1 text-lg font-black text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.cause} · {item.location} · responsable: {item.owner}</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100" aria-label={`Progreso demostrativo ${Math.round(progress)}%`}>
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }}/>
                </div>
                <p className="mt-1 text-xs text-slate-500">{item.isTemporary ? "Sin cifras declaradas · registro temporal" : `Progreso demostrativo: $${item.raised.toLocaleString()} de $${item.goal.toLocaleString()} USD`}</p>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                <dt className="font-bold">Alcance de revisión · {item.reviewDate}</dt>
                <dd>{item.reviewed}</dd>
                </div>
                <div>
                <dt className="font-bold">Información no verificada</dt>
                <dd>{item.unverified}</dd>
                </div>
                </dl>
                <button disabled className="mt-4 min-h-11 cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-500">Enlace externo no disponible</button>
                </article>;
            })}</div> : <div className="mt-5">
        <EmptyState>No hay campañas que coincidan con la búsqueda.</EmptyState>
        </div>}
        {showForm ? <div role="dialog" aria-modal="true" aria-labelledby="campaign-title" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
        <form onSubmit={submitProposal} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <h3 id="campaign-title" className="text-xl font-black text-[#0A4E84]">Proponer campaña externa</h3>
        <p className="mt-1 text-sm text-slate-600">Se creará un registro temporal, sin consultar ni modificar la plataforma externa.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{([['title', 'Título'], ['cause', 'Causa'], ['location', 'Ubicación'], ['owner', 'Responsable declarado'], ['platform', 'Plataforma externa'], ['url', 'URL HTTPS opcional']] as const).map(([key, label]) => <label key={key} className="text-sm font-bold">{label}
            {key !== 'url' && key !== 'platform' ? ' *' : ''}<input required={key !== 'url' && key !== 'platform'} maxLength={160} value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} className={`mt-1 ${fieldClass}`}/>
            </label>)}</div>{error ? <p role="alert" className="mt-3 text-sm font-bold text-red-700">{error}</p> : null}<div className="mt-5 flex gap-3">
        <button className={primaryButtonClass}>Agregar propuesta temporal</button>
        <button type="button" onClick={() => setShowForm(false)} className={secondaryButtonClass}>Cancelar</button>
        </div>
        </form>
        </div> : null}</Panel>;
}
