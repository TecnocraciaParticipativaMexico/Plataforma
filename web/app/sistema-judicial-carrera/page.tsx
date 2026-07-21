"use client";

import { useMemo, useState } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { CaseAssistant } from "@/components/sistema-judicial-carrera/CaseAssistant";
import { CasesWorkspace } from "@/components/sistema-judicial-carrera/CasesWorkspace";
import { CitizenAssessment } from "@/components/sistema-judicial-carrera/CitizenAssessment";
import { EvidencePanel } from "@/components/sistema-judicial-carrera/EvidencePanel";
import { ExpertCommittees } from "@/components/sistema-judicial-carrera/ExpertCommittees";
import { JudicialDashboard } from "@/components/sistema-judicial-carrera/JudicialDashboard";
import { ModuleHero } from "@/components/sistema-judicial-carrera/ModuleHero";
import { ModuleTabs } from "@/components/sistema-judicial-carrera/ModuleTabs";
import { ProfilesDirectory } from "@/components/sistema-judicial-carrera/ProfilesDirectory";
import { emptyCaseDraft, expertCommittees, mainSections, mockCases, perfiles, promedio, tabs } from "@/components/sistema-judicial-carrera/data";
import type { CaseDraft, CaseStepId, CitizenCase, InterfaceState, MainSectionId, TabId } from "@/components/sistema-judicial-carrera/types";

export default function SistemaJudicialCarreraPage() {
  const [activeSection, setActiveSection] = useState<MainSectionId>("mi-caso");
  const [activeTab, setActiveTab] = useState<TabId>("panorama");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(perfiles[0].id);
  const [estadoDemo, setEstadoDemo] = useState<InterfaceState | null>(null);
  const [caseStep, setCaseStep] = useState<CaseStepId>(1);
  const [caseDraft, setCaseDraft] = useState<CaseDraft>({ ...emptyCaseDraft });
  const [cases, setCases] = useState<CitizenCase[]>(mockCases);
  const [selectedCaseId, setSelectedCaseId] = useState(mockCases[0].id);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState(expertCommittees[0].id);
  const [reviewRequested, setReviewRequested] = useState(false);

  const filteredProfiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return perfiles;

    return perfiles.filter((perfil) =>
      [perfil.nombre, perfil.tipo, perfil.cargo, perfil.entidad, perfil.materia, perfil.riesgoEtico]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const selectedProfile = perfiles.find((perfil) => perfil.id === selectedId) ?? perfiles[0];
  const avgScore = Math.round(perfiles.reduce((total, perfil) => total + promedio(perfil), 0) / perfiles.length);
  const excellentProfiles = perfiles.filter((perfil) => perfil.riesgoEtico === "Excelente").length;
  const evidenceCount = perfiles.reduce((total, perfil) => total + perfil.evidencias.length, 0);

  function toggleDemoState(estado: InterfaceState) {
    setEstadoDemo((current) => (current === estado ? null : estado));
  }

  function updateCaseDraft(patch: Partial<CaseDraft>) {
    setCaseDraft((current) => ({ ...current, ...patch }));
  }

  function saveMockCase() {
    const today = new Date().toISOString().slice(0, 10);
    const nextNumber = String(cases.length + 1).padStart(3, "0");
    const nextCase: CitizenCase = {
      id: `case-local-${Date.now()}`,
      folio: `SCJ-06-2026-${nextNumber}`,
      title: caseDraft.facts.trim().slice(0, 70) || `Caso ciudadano sobre ${caseDraft.matterType}`,
      matter: caseDraft.matterType,
      createdAt: today,
      updatedAt: today,
      status: caseDraft.generatedResult ? "listo_revision" : "informacion_pendiente",
      nextAction: caseDraft.generatedResult ? "Revisar el borrador ciudadano antes de compartir información." : "Completar hechos, evidencias y revisión asistida.",
      summary: caseDraft.aiSummary || caseDraft.facts || "Expediente ciudadano guardado como demostración local.",
      timeline: ["Caso creado", "Hechos organizados", caseDraft.evidence.length ? "Documento agregado" : "Borrador generado"],
      participants: [caseDraft.promoter, caseDraft.counterpart, caseDraft.authority, caseDraft.institution, caseDraft.community].filter(Boolean),
      documents: caseDraft.evidence.length ? caseDraft.evidence.map((item) => item.name) : ["Sin documentos demostrativos agregados"],
      notes: ["Registro local mock. Nada se publica ni se envía automáticamente.", "Requiere revisión jurídica profesional antes de cualquier presentación oficial."],
      versions: ["v0.1 Expediente ciudadano local"],
      opinions: ["Sin dictamen ciudadano emitido todavía."],
    };

    setCases((current) => [nextCase, ...current]);
    setSelectedCaseId(nextCase.id);
    setActiveSection("mis-casos");
  }

  function requestCitizenReview() {
    setReviewRequested(true);
    setActiveSection("comites");
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84] print:bg-white print:text-black">
      <ModuleIdentityHeader
        label="Módulo 06"
        title="Sistema Judicial de Carrera"
        description="Plataforma ciudadana para organizar casos, preparar borradores de escritos, integrar evidencias y dar seguimiento a conflictos con apoyo tecnológico accesible. También permite consultar trayectorias y evaluaciones documentadas de personas juzgadoras, fiscales y magistradas. Sus análisis y dictámenes son informativos y no vinculantes."
        badges={
          <>
            <span className="rounded-full bg-[#E4007C] px-3 py-1 text-xs font-black uppercase text-white">
              Asistencia ciudadana
            </span>
            <span className="rounded-full bg-[#0A4E84] px-3 py-1 text-xs font-black uppercase text-white">
              Observatorio técnico
            </span>
            <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-black uppercase text-slate-900">
              No vinculante
            </span>
          </>
        }
      />

      <section className="border-b border-slate-200 bg-white px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-600">
          <strong className="text-[#0A4E84]">Alcance ciudadano:</strong> Esta herramienta organiza información y genera borradores y análisis ciudadanos. No presenta demandas automáticamente, no sustituye asesoría jurídica ni reemplaza a los tribunales o autoridades competentes.
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-6 md:pt-8">
        <nav className="rounded-[24px] bg-white p-2 shadow-sm ring-1 ring-slate-200 print:hidden" aria-label="Secciones del módulo">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {mainSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`min-w-44 rounded-2xl px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                  activeSection === section.id ? "bg-[#0A4E84] text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="block text-sm font-black">{section.label}</span>
                <span className={`mt-1 block text-xs leading-5 ${activeSection === section.id ? "text-sky-100" : "text-slate-500"}`}>{section.description}</span>
              </button>
            ))}
          </div>
        </nav>

        {activeSection === "mi-caso" ? (
          <CaseAssistant
            draft={caseDraft}
            step={caseStep}
            onDraftChange={updateCaseDraft}
            onStepChange={setCaseStep}
            onSaveMockCase={saveMockCase}
            onOpenCases={() => setActiveSection("mis-casos")}
          />
        ) : null}

        {activeSection === "mis-casos" ? (
          <CasesWorkspace cases={cases} selectedCaseId={selectedCaseId} onSelectCase={setSelectedCaseId} onRequestReview={requestCitizenReview} />
        ) : null}

        {activeSection === "comites" ? (
          <ExpertCommittees
            committees={expertCommittees}
            selectedCommitteeId={selectedCommitteeId}
            reviewRequested={reviewRequested}
            onSelectCommittee={setSelectedCommitteeId}
            onRequestReview={() => setReviewRequested(true)}
          />
        ) : null}

        {activeSection === "observatorio" ? (
          <section className="space-y-6">
            <ModuleHero perfilesCount={perfiles.length} avgScore={avgScore} evidenceCount={evidenceCount} />
            <ModuleTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />

            {activeTab === "panorama" ? (
              <JudicialDashboard
                avgScore={avgScore}
                excellentProfiles={excellentProfiles}
                estadoDemo={estadoDemo}
                perfiles={perfiles}
                onToggleState={toggleDemoState}
              />
            ) : null}

            {activeTab === "directorio" ? (
              <ProfilesDirectory
                filteredProfiles={filteredProfiles}
                query={query}
                selectedProfile={selectedProfile}
                onQueryChange={setQuery}
                onSelectProfile={setSelectedId}
              />
            ) : null}

            {activeTab === "dictamen" ? <CitizenAssessment selectedProfile={selectedProfile} /> : null}
            {activeTab === "evidencia" ? <EvidencePanel evidenceCount={evidenceCount} perfiles={perfiles} /> : null}
          </section>
        ) : null}

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />
    </main>
  );
}
