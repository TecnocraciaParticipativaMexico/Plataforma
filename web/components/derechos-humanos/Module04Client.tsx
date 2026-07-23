"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { committees, committeeReviews, demoNotice, dossiers, humanRightsCases, solidarityProjects, structuralPatterns } from "@/lib/derechos-humanos/mockData";
import { createDemoFolio, createSha256 } from "@/lib/derechos-humanos/hash";
import { downloadHumanRightsTechnicalPdf } from "@/lib/derechos-humanos/pdfExpediente";
import type { HumanRightsCase, IntegrityRecord, ModuleTab, NewCaseForm } from "@/lib/derechos-humanos/types";

const tabs: { id: ModuleTab; label: string; mark: string }[] = [
  { id: "expedientes", label: "Expedientes", mark: "01" },
  { id: "patrones", label: "Patrones y contexto", mark: "02" },
  { id: "comites", label: "Comités expertos", mark: "03" },
  { id: "red", label: "Red Solidaria", mark: "04" },
  { id: "dossiers", label: "Dossiers e informes", mark: "05" },
];

const emptyForm: NewCaseForm = {
  title: "",
  caseType: "Uso indebido de fuerza en contexto civil",
  location: "",
  date: "",
  summary: "",
  affectedGroup: "",
  privacyAccepted: false,
  sensitiveDataAccepted: false,
};

function statusLabel(status: HumanRightsCase["status"]) {
  const labels: Record<HumanRightsCase["status"], string> = {
    borrador: "Borrador",
    registrado: "Registrado",
    revision_pendiente: "Revisión pendiente",
    version_publica: "Versión pública",
    dossier_preparado: "Dossier preparado",
  };
  return labels[status];
}

function privacyLabel(level: HumanRightsCase["privacyLevel"]) {
  const labels: Record<HumanRightsCase["privacyLevel"], string> = {
    reservado: "Reservado",
    anonimizado: "Anonimizado",
    publico: "Público",
  };
  return labels[level];
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</section>;
}

export function Module04Client() {
  const [activeTab, setActiveTab] = useState<ModuleTab>("expedientes");
  const [cases, setCases] = useState<HumanRightsCase[]>(humanRightsCases);
  const [selectedCaseId, setSelectedCaseId] = useState(humanRightsCases[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<NewCaseForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [demoError, setDemoError] = useState("");
  const [integrity, setIntegrity] = useState<IntegrityRecord | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfGenerationRef = useRef(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 250);
    return () => window.clearTimeout(timeout);
  }, []);

  const filteredCases = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return cases;
    return cases.filter((item) => `${item.id} ${item.title} ${item.caseType} ${item.location} ${item.summary}`.toLowerCase().includes(term));
  }, [cases, query]);

  const selectedCase = cases.find((item) => item.id === selectedCaseId) ?? cases[0];

  async function refreshIntegrity(caseItem: HumanRightsCase) {
    const hash = await createSha256(JSON.stringify({ id: caseItem.id, title: caseItem.title, summary: caseItem.summary, evidence: caseItem.evidence }));
    setIntegrity({
      folio: caseItem.id,
      version: caseItem.publicVersionReady ? "publica-demo-1" : "borrador-demo-1",
      hash,
      generatedAt: new Date().toISOString(),
      note: "SHA-256 local demostrativo calculado en el navegador. No acredita resguardo probatorio de autoridad.",
    });
  }

  async function handleCreateCase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSuccess("");

    const missing = [
      !form.title.trim() ? "título" : "",
      !form.location.trim() ? "ubicación general" : "",
      !form.date ? "fecha aproximada" : "",
      form.summary.trim().length < 80 ? "narrativa mínima de 80 caracteres" : "",
      !form.privacyAccepted ? "aviso de privacidad" : "",
      !form.sensitiveDataAccepted ? "control de datos sensibles" : "",
    ].filter(Boolean);

    if (missing.length) {
      setFormError(`Formulario incompleto: falta ${missing.join(", ")}.`);
      return;
    }

    const id = createDemoFolio();
    const hash = await createSha256(JSON.stringify(form));
    const nextCase: HumanRightsCase = {
      id,
      title: form.title.trim(),
      caseType: form.caseType,
      status: "registrado",
      privacyLevel: "reservado",
      location: form.location.trim(),
      date: form.date,
      summary: form.summary.trim(),
      affectedGroup: form.affectedGroup.trim() || "Grupo reservado",
      evidence: [],
      timeline: [
        {
          id: `${id}-T1`,
          type: "registro",
          label: "Registro creado",
          date: new Date().toISOString().slice(0, 10),
          detail: "Se creó un expediente ciudadano local con consentimiento y aviso de alcance.",
        },
      ],
      patternIds: [],
      integrityHash: hash,
      publicVersionReady: false,
    };

    setCases((current) => [nextCase, ...current]);
    setSelectedCaseId(id);
    setForm(emptyForm);
    setSuccess("Registro creado localmente. La revisión queda pendiente y la publicación requiere versión anonimizada.");
    await refreshIntegrity(nextCase);
  }

  function preparePublicVersion() {
    if (!selectedCase) return;
    const updated: HumanRightsCase = {
      ...selectedCase,
      status: "version_publica",
      privacyLevel: "anonimizado",
      publicVersionReady: true,
      timeline: [
        ...selectedCase.timeline,
        {
          id: `${selectedCase.id}-PUBLIC`,
          type: "privacidad",
          label: "Versión pública preparada",
          date: new Date().toISOString().slice(0, 10),
          detail: "Se marcó una versión demostrativa sin nombres completos ni ubicación exacta.",
        },
      ],
    };
    setCases((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setSuccess("Versión pública anonimizada preparada.");
    void refreshIntegrity(updated);
  }

  function prepareDossier() {
    if (!selectedCase) return;
    const updated: HumanRightsCase = {
      ...selectedCase,
      status: "dossier_preparado",
      timeline: [
        ...selectedCase.timeline,
        {
          id: `${selectedCase.id}-DOS`,
          type: "dossier",
          label: "Documento preparado",
          date: new Date().toISOString().slice(0, 10),
          detail: "Se preparó un dossier imprimible demostrativo con avisos legales y trazabilidad local.",
        },
      ],
    };
    setCases((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setActiveTab("dossiers");
    setSuccess("Dossier internacional demostrativo preparado localmente. Debe adaptarse a los requisitos de la institucion receptora.");
    void refreshIntegrity(updated);
  }

  function simulateLoadError() {
    setDemoError("Error demostrativo: no se pudo cargar una fuente externa. El módulo funciona con datos locales mock.");
  }

  async function handleDownloadPdf(caseItem: HumanRightsCase) {
    if (pdfGenerationRef.current) return;
    pdfGenerationRef.current = true;
    setIsGeneratingPdf(true);
    setSuccess("");
    setDemoError("");
    try {
      const nextIntegrity = await downloadHumanRightsTechnicalPdf(caseItem, committeeReviews);
      setIntegrity(nextIntegrity);
      setSuccess("Expediente tecnico ciudadano descargado en PDF con identidad institucional y SHA-256 local.");
    } catch {
      setDemoError("No se pudo generar el expediente tecnico en PDF. Verifica que el navegador permita descargas locales.");
    } finally {
      pdfGenerationRef.current = false;
      setIsGeneratingPdf(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] pb-28 text-[#0A4E84] print:bg-white print:pb-0 print:text-black">
      <div className="print:hidden">
        <ModuleIdentityHeader
          label="Módulo 04"
          title="Derechos Humanos y Contrapeso Institucional"
          description="Documenta posibles violaciones a derechos humanos, preserva testimonios y evidencias y organiza expedientes técnicos ciudadanos con protección de datos."
          badges={
            <>
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#166534]">México 2030</span>
              <span className="rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0369A1]">Datos demostrativos</span>
              <span className="rounded-full bg-[#FFC20E]/25 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#604400]">No sustituye autoridades</span>
            </>
          }
        >
          <nav className="flex max-w-full gap-2 overflow-x-auto text-sm font-bold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Navegación global">
            <Link className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:text-[#0A4E84] focus:outline-none focus:ring-2 focus:ring-[#E4007C]" href="/">Inicio</Link>
            <Link className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:text-[#0A4E84] focus:outline-none focus:ring-2 focus:ring-[#E4007C]" href="/modulos">Módulos</Link>
            <Link className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:text-[#0A4E84] focus:outline-none focus:ring-2 focus:ring-[#E4007C]" href="/mis-denuncias">Perfil</Link>
          </nav>
        </ModuleIdentityHeader>

        <section className="border-b border-slate-200 bg-slate-950 px-4 py-6 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FFC20E]">Herramienta ciudadana, legal y no violenta</p>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-200">
              Documenta posibles violaciones a derechos humanos, preserva testimonios y evidencias y organiza expedientes técnicos ciudadanos con protección de datos. Facilita la revisión por comités de expertos, la elaboración de dossiers y el acceso a redes externas de apoyo, sin sustituir a las autoridades competentes.
            </p>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-4">
          <div className="mx-auto max-w-7xl rounded-2xl border-l-4 border-[#E4007C] bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
            <strong className="text-[#0A4E84]">Fundamento legal compacto: </strong>
            Se sustenta principalmente en los artículos 1°, 6°, 8°, 16 y 20 de la Constitución Política de los Estados Unidos Mexicanos; en la Ley General de Víctimas, la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y los tratados internacionales de derechos humanos aplicables. Facilita documentación y participación ciudadana; no sustituye denuncias, investigaciones, peritajes, resoluciones ni procedimientos ante autoridades competentes.
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-0">
        <div className="print:hidden">
          <p className="mb-4 rounded-2xl border border-[#FFC20E]/60 bg-[#FFC20E]/20 p-3 text-sm font-semibold text-[#4A3600]">{demoNotice}</p>

          <nav className="mb-6 flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Secciones del Módulo 04">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-11 whitespace-nowrap rounded-xl px-3 py-2 text-left text-xs font-black uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                  activeTab === tab.id ? "bg-[#E4007C] text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-100 hover:text-[#0A4E84]"
                }`}
              >
                <span className={`mr-1.5 rounded px-1.5 py-0.5 text-[9px] ${activeTab === tab.id ? "bg-white/20" : "bg-[#F1F5F9] text-[#0A4E84]"}`}>{tab.mark}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {success ? <div className="mb-5 rounded-2xl border-l-4 border-[#39B54A] bg-[#39B54A]/10 p-4 text-sm font-semibold text-[#1F5F24] print:hidden">{success}</div> : null}
        {demoError ? <div className="mb-5 rounded-2xl border-l-4 border-[#F7931E] bg-[#F7931E]/10 p-4 text-sm font-semibold text-[#9A3412] print:hidden">{demoError}</div> : null}

        {activeTab === "expedientes" ? (
          <div className="grid gap-6 lg:grid-cols-12 print:block">
            <div className="space-y-6 lg:col-span-5 print:hidden">
              <Card>
                <h2 className="text-xl font-black text-[#0A4E84]">Registro de expediente</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Captura hechos mínimos, consentimiento y nivel de privacidad. Todo queda como simulación local del frontend.</p>
                <form className="mt-5 space-y-4" onSubmit={handleCreateCase}>
                  <div>
                    <label htmlFor="case-title" className="mb-1 block text-xs font-bold uppercase text-slate-600">Título ciudadano</label>
                    <input id="case-title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E4007C]" placeholder="Expediente demostrativo reservado" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="case-type" className="mb-1 block text-xs font-bold uppercase text-slate-600">Tipo de hecho</label>
                      <select id="case-type" value={form.caseType} onChange={(event) => setForm({ ...form, caseType: event.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E4007C]">
                        <option>Uso indebido de fuerza en contexto civil</option>
                        <option>Detención arbitraria o retención irregular</option>
                        <option>Obstaculización a personas defensoras o periodistas</option>
                        <option>Omisión de investigación o atención</option>
                        <option>Riesgo a protesta pacífica</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="case-date" className="mb-1 block text-xs font-bold uppercase text-slate-600">Fecha aproximada</label>
                      <input id="case-date" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E4007C]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="case-location" className="mb-1 block text-xs font-bold uppercase text-slate-600">Ubicación general protegida</label>
                    <input id="case-location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E4007C]" placeholder="Municipio reservado, estado" />
                  </div>
                  <div>
                    <label htmlFor="case-summary" className="mb-1 block text-xs font-bold uppercase text-slate-600">Narrativa fáctica</label>
                    <textarea id="case-summary" rows={5} value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E4007C]" placeholder="Describe hechos observados, fechas aproximadas, fuentes voluntarias y datos que deban reservarse." />
                  </div>
                  <div>
                    <label htmlFor="affected-group" className="mb-1 block text-xs font-bold uppercase text-slate-600">Grupo afectado</label>
                    <input id="affected-group" value={form.affectedGroup} onChange={(event) => setForm({ ...form, affectedGroup: event.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E4007C]" placeholder="Familiares, periodistas, comunidad, reservado..." />
                  </div>
                  <label className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    <input type="checkbox" checked={form.privacyAccepted} onChange={(event) => setForm({ ...form, privacyAccepted: event.target.checked })} className="mt-1 h-4 w-4" />
                    Acepto trabajar con datos voluntarios y preparar versiones públicas anonimizadas cuando corresponda.
                  </label>
                  <label className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    <input type="checkbox" checked={form.sensitiveDataAccepted} onChange={(event) => setForm({ ...form, sensitiveDataAccepted: event.target.checked })} className="mt-1 h-4 w-4" />
                    Entiendo que el módulo no sustituye denuncia, queja, investigación, peritaje, asesoría jurídica ni representación legal.
                  </label>
                  {formError ? <p id="case-form-error" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{formError}</p> : null}
                  <button type="submit" aria-describedby={formError ? "case-form-error" : undefined} className="w-full rounded-xl bg-[#E4007C] px-4 py-3 text-sm font-black uppercase text-white shadow-sm transition hover:bg-[#C2187A] focus:outline-none focus:ring-2 focus:ring-[#E4007C] focus:ring-offset-2">Registrar expediente</button>
                </form>
              </Card>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <Card className="print:hidden">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#0A4E84]">Listado y detalle</h2>
                    <p className="mt-1 text-sm text-slate-600">Incluye estados de carga, vacío y filtro sin resultados.</p>
                  </div>
                  <button type="button" onClick={simulateLoadError} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Simular error</button>
                </div>
                <label htmlFor="case-search" className="mt-4 block text-xs font-bold uppercase text-slate-600">Buscar expediente</label>
                <input id="case-search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E4007C]" placeholder="Folio, tipo, ubicación o resumen" />

                {isLoading ? <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">Cargando expedientes demostrativos...</p> : null}
                {!isLoading && cases.length === 0 ? <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">No hay expedientes registrados.</p> : null}
                {!isLoading && cases.length > 0 && filteredCases.length === 0 ? <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">No hay resultados para ese filtro.</p> : null}

                <div className="mt-4 grid gap-3">
                  {filteredCases.map((item) => (
                    <button key={item.id} type="button" onClick={() => { setSelectedCaseId(item.id); void refreshIntegrity(item); }} className={`rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${selectedCase?.id === item.id ? "border-[#E4007C] bg-[#E4007C]/5" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#0A4E84] px-2.5 py-1 text-xs font-black text-white">{item.id}</span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{statusLabel(item.status)}</span>
                        <span className="rounded-full bg-[#FFC20E]/25 px-2.5 py-1 text-xs font-bold text-[#604400]">{privacyLabel(item.privacyLevel)}</span>
                      </div>
                      <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</p>
                    </button>
                  ))}
                </div>
              </Card>

              {selectedCase ? (
                <Card>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Detalle de expediente</p>
                      <h2 className="mt-1 text-2xl font-black text-slate-950">{selectedCase.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{selectedCase.summary}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleDownloadPdf(selectedCase)}
                      disabled={isGeneratingPdf}
                      className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-400 print:hidden"
                    >
                      {isGeneratingPdf ? "Generando PDF..." : "📄 Descargar Expediente Técnico (PDF)"}
                    </button>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs font-bold uppercase text-slate-500">Ubicación</div><div className="mt-1 text-sm font-bold text-slate-800">{selectedCase.location}</div></div>
                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs font-bold uppercase text-slate-500">Fecha</div><div className="mt-1 text-sm font-bold text-slate-800">{selectedCase.date}</div></div>
                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs font-bold uppercase text-slate-500">Grupo</div><div className="mt-1 text-sm font-bold text-slate-800">{selectedCase.affectedGroup}</div></div>
                  </div>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row print:hidden">
                    <button type="button" onClick={preparePublicVersion} className="rounded-xl border border-[#0A4E84] px-4 py-3 text-sm font-black text-[#0A4E84]">Preparar versión pública</button>
                    <button type="button" onClick={prepareDossier} className="rounded-xl bg-[#39B54A] px-4 py-3 text-sm font-black text-white">🌐 Preparar dossier internacional</button>
                  </div>
                  <p className="mt-3 text-xs font-semibold leading-5 text-slate-500 print:hidden">Documento ciudadano de apoyo. Debe adaptarse a los requisitos de la institución receptora.</p>
                  <div className="mt-5">
                    <h3 className="text-sm font-black uppercase text-slate-700">Trazabilidad y privacidad</h3>
                    <div className="mt-3 space-y-2">
                      {selectedCase.timeline.map((entry) => (
                        <div key={entry.id} className="rounded-xl border border-slate-200 p-3 text-sm leading-6 text-slate-700">
                          <strong className="text-[#0A4E84]">{entry.date} · {entry.label}:</strong> {entry.detail}
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 break-all rounded-xl bg-slate-50 p-3 font-mono text-xs text-slate-700">Hash local actual: {integrity?.hash ?? selectedCase.integrityHash}</p>
                  </div>
                </Card>
              ) : null}
            </div>
          </div>
        ) : null}

        {activeTab === "patrones" ? (
          <div className="grid gap-4 md:grid-cols-3">
            {structuralPatterns.map((pattern) => (
              <Card key={pattern.id}>
                <span className="rounded-full bg-[#0A4E84]/10 px-3 py-1 text-xs font-black uppercase text-[#0A4E84]">Riesgo {pattern.riskLevel}</span>
                <h2 className="mt-3 text-lg font-black text-slate-950">{pattern.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{pattern.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {pattern.signals.map((signal) => <li key={signal} className="rounded-xl bg-slate-50 p-2">{signal}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        ) : null}

        {activeTab === "comites" ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {committees.map((committee) => (
              <Card key={committee.id}>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">{committee.scope}</p>
                <h2 className="mt-2 text-xl font-black text-slate-950">{committee.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{committee.note}</p>
                <div className="mt-4 flex flex-wrap gap-2">{committee.specialties.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{item}</span>)}</div>
                <p className="mt-4 text-sm font-bold text-[#0A4E84]">Revisiones pendientes: {committee.queue}</p>
              </Card>
            ))}
            <Card className="lg:col-span-2">
              <h2 className="text-xl font-black text-[#0A4E84]">Observaciones metodológicas</h2>
              {committeeReviews.map((review) => (
                <div key={review.id} className="mt-4 rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-black text-slate-950">{review.id} · {review.status.replace("_", " ")}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">{review.observations.map((item) => <li key={item}>• {item}</li>)}</ul>
                  <p className="mt-3 text-sm font-semibold text-[#0A4E84]">Siguiente paso: {review.nextStep}</p>
                </div>
              ))}
            </Card>
          </div>
        ) : null}

        {activeTab === "red" ? (
          <div className="grid gap-5 md:grid-cols-2">
            {solidarityProjects.map((project) => (
              <Card key={project.id}>
                <span className="rounded-full bg-[#39B54A]/10 px-3 py-1 text-xs font-black uppercase text-[#1F5F24]">{project.status.replace("_", " ")}</span>
                <h2 className="mt-3 text-xl font-black text-slate-950">{project.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{project.need}</p>
                <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">{project.publicNote}</p>
                <button type="button" onClick={() => setSuccess("Ficha de referencia externa preparada localmente. No se contactó a ninguna organización.")} className="mt-4 rounded-xl border border-[#39B54A] px-4 py-3 text-sm font-black text-[#1F5F24]">Preparar ficha local</button>
              </Card>
            ))}
          </div>
        ) : null}

        {activeTab === "dossiers" ? (
          <div className="space-y-5">
            <Card>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">Dossiers e informes imprimibles</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Documentos de apoyo con alcance ciudadano, avisos de privacidad y trazabilidad local.</p>
                </div>
                {selectedCase ? (
                  <button
                    type="button"
                    onClick={() => void handleDownloadPdf(selectedCase)}
                    disabled={isGeneratingPdf}
                    className="rounded-xl bg-[#E4007C] px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-400 print:hidden"
                  >
                    {isGeneratingPdf ? "Generando PDF..." : "📄 Descargar Expediente Técnico (PDF)"}
                  </button>
                ) : null}
              </div>
            </Card>
            {[...dossiers, ...(selectedCase?.status === "dossier_preparado" ? [{ id: `DOS-${selectedCase.id}`, caseId: selectedCase.id, title: `Dossier de ${selectedCase.title}`, version: "v1.0-local", status: "preparado" as const, preparedAt: new Date().toISOString().slice(0, 10), sections: ["Resumen", "Cronología", "Privacidad", "Trazabilidad local", "Alcance legal"] }] : [])].map((dossier) => (
              <Card key={dossier.id}>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">{dossier.id} · {dossier.version}</p>
                <h3 className="mt-2 text-xl font-black text-slate-950">{dossier.title}</h3>
                <p className="mt-2 text-sm text-slate-600">Preparado: {dossier.preparedAt}. Estado: {dossier.status}.</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{dossier.sections.map((section) => <span key={section} className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">{section}</span>)}</div>
                <p className="mt-4 rounded-xl border-l-4 border-[#0A4E84] bg-[#0A4E84]/5 p-3 text-sm leading-6 text-slate-700">Este documento es un insumo ciudadano. No acredita por sí mismo hechos, responsabilidades ni efectos procesales.</p>
              </Card>
            ))}
          </div>
        ) : null}
      </div>

      <PlatformFooterBanner className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 shadow-sm" />
      <PlatformBottomNav />
    </main>
  );
}
