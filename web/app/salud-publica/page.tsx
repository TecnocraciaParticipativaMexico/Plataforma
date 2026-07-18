"use client";

import { useMemo, useState } from "react";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { CasesWorkspace } from "@/components/salud-publica/CasesWorkspace";
import { HealthDashboard } from "@/components/salud-publica/Dashboard";
import { ConversationalGuidance, NewGuidanceWizard } from "@/components/salud-publica/GuidanceFlow";
import { SaludModuleHeader } from "@/components/salud-publica/ModuleHeader";
import {
  AuditPrivacyCenter,
  CommitteesCenter,
  DirectoryCenter,
  DocumentsCenter,
  IndicatorsCenter,
  ImpactBoard,
  LanguageAccessibilityCenter,
  PolicyEvaluationCenter,
  PreventivePlan,
  PublicCommitmentsCenter,
  SolidarityNetwork,
  SupplyCenter,
  TelehealthCenter,
  TimelinePanel,
} from "@/components/salud-publica/Sections";
import { LEGAL_BASIS } from "@/lib/salud-publica/constants";
import { mockHealthDataset } from "@/lib/salud-publica/data/mock";
import type { CitizenTriageResult, GuidanceResult, HealthDataset, HealthTab } from "@/lib/salud-publica/types";

export default function SaludPublicaPage() {
  const [activeTab, setActiveTab] = useState<HealthTab>("dashboard");
  const [dataset, setDataset] = useState<HealthDataset>(mockHealthDataset);
  const [selectedCaseId, setSelectedCaseId] = useState(mockHealthDataset.cases[0].id);
  const [notice, setNotice] = useState("");

  const selectedCase = useMemo(() => dataset.cases.find((item) => item.id === selectedCaseId) ?? dataset.cases[0], [dataset.cases, selectedCaseId]);

  function handleGuidanceResult(result: GuidanceResult) {
    setDataset((current) => ({
      ...current,
      audit: [
        {
          id: `audit-${Date.now()}`,
          timestamp: result.generatedAt,
          actor: "Motor local",
          action: "Orientación generada",
          entity: "GuidanceResult",
          version: "0.1",
          category: "orientacion",
          origin: "reglas_locales",
          detail: result.summary,
          hash: "demo-pendiente-sha",
        },
        ...current.audit,
      ],
    }));
    setNotice("Orientación local generada. No se contactó a ningún servicio externo.");
  }

  function handleSaveTriageResult(result: CitizenTriageResult) {
    const timestamp = new Date().toISOString();
    setDataset((current) => ({
      ...current,
      cases: current.cases.map((item) =>
        item.id === selectedCase.id
          ? {
              ...item,
              updatedAt: timestamp,
              status: result.guidance.level === "posible_emergencia" || result.guidance.level === "consulta_prioritaria" ? "listo_consulta" : "seguimiento",
              attentionLevel: result.guidance.level,
              declaredMedications: result.medicationSafety.declaredMedications.map((medication) => medication.name),
              guidance: [result.guidance, ...item.guidance],
              timeline: [
                {
                  id: `timeline-triage-${Date.now()}`,
                  caseId: item.id,
                  timestamp,
                  actor: "Ciudadanía",
                  origin: "reglas_locales",
                  category: "orientacion",
                  description: `Resultado de triaje guardado: ${result.title}`,
                  version: "0.2",
                },
                ...item.timeline,
              ],
            }
          : item,
      ),
      audit: [
        {
          id: `audit-triage-${Date.now()}`,
          caseId: selectedCase.id,
          timestamp,
          actor: "Ciudadanía",
          action: "Resultado de triaje guardado",
          entity: "CitizenTriageResult",
          version: "0.2",
          category: "orientacion",
          origin: "reglas_locales",
          detail: result.explanation,
          hash: "demo-triaje-local",
        },
        ...current.audit,
      ],
    }));
    setNotice("Resultado agregado al expediente mock de esta sesión.");
  }

  function printDocument() {
    setNotice("Vista de impresión preparada para documento ciudadano.");
    window.setTimeout(() => window.print(), 80);
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] text-[#0A4E84] print:bg-white print:text-black">
      <SaludModuleHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {notice ? (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border-l-4 border-[#E4007C] bg-white p-4 text-sm font-semibold text-slate-700 shadow-xl ring-1 ring-slate-200 print:hidden">
          {notice}
          <button type="button" onClick={() => setNotice("")} className="mt-2 block text-xs font-black uppercase text-[#E4007C]">Cerrar</button>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-6 md:pt-8 print:max-w-none print:px-0 print:py-0">
        <section className="max-w-4xl rounded-xl border-l-4 border-[#FFC20E] bg-[#FFC20E]/10 px-4 py-3 print:hidden">
          <div className="inline-flex rounded-full bg-[#FFC20E] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-950">FUNDAMENTO LEGAL ORIENTATIVO</div>
          <p className="mt-2 text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">{LEGAL_BASIS}</p>
        </section>

        {activeTab === "dashboard" ? <HealthDashboard dataset={dataset} selectedCase={selectedCase} onTabChange={setActiveTab} onOpenCase={(caseId) => { setSelectedCaseId(caseId); setActiveTab("expedientes"); }} onSaveTriageResult={handleSaveTriageResult} onPrint={printDocument} /> : null}
        {activeTab === "expedientes" ? <CasesWorkspace dataset={dataset} selectedCase={selectedCase} onSelectCase={setSelectedCaseId} onPrint={printDocument} /> : null}
        {activeTab === "nueva" ? <NewGuidanceWizard onResult={handleGuidanceResult} /> : null}
        {activeTab === "orientacion" ? <ConversationalGuidance selectedCase={selectedCase} onNote={(note) => setNotice(`Nota local preparada: ${note.slice(0, 90)}...`)} /> : null}
        {activeTab === "telemedicina" ? <TelehealthCenter dataset={dataset} selectedCase={selectedCase} /> : null}
        {activeTab === "abasto" ? <SupplyCenter dataset={dataset} /> : null}
        {activeTab === "politicas" ? <PolicyEvaluationCenter dataset={dataset} /> : null}
        {activeTab === "impacto" ? <ImpactBoard dataset={dataset} /> : null}
        {activeTab === "red_solidaria" ? <SolidarityNetwork dataset={dataset} /> : null}
        {activeTab === "compromisos" ? <PublicCommitmentsCenter dataset={dataset} /> : null}
        {activeTab === "seguimiento" ? <TimelinePanel selectedCase={selectedCase} /> : null}
        {activeTab === "plan" ? <PreventivePlan dataset={dataset} selectedCase={selectedCase} /> : null}
        {activeTab === "documentos" ? <DocumentsCenter selectedCase={selectedCase} onPrint={printDocument} /> : null}
        {activeTab === "idiomas" ? <LanguageAccessibilityCenter /> : null}
        {activeTab === "directorio" ? <DirectoryCenter dataset={dataset} /> : null}
        {activeTab === "comites" ? <CommitteesCenter dataset={dataset} /> : null}
        {activeTab === "indicadores" ? <IndicatorsCenter dataset={dataset} /> : null}
        {activeTab === "auditoria" ? <AuditPrivacyCenter dataset={dataset} selectedCase={selectedCase} mode="auditoria" /> : null}
        {activeTab === "privacidad" ? <AuditPrivacyCenter dataset={dataset} selectedCase={selectedCase} mode="privacidad" /> : null}

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />

      <style jsx global>{`
        @media print {
          nav,
          button,
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
          main {
            color: #111827 !important;
          }
          article,
          section {
            break-inside: avoid;
          }
          @page {
            margin: 14mm;
          }
        }
      `}</style>
    </main>
  );
}
