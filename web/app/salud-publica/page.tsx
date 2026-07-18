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
import { LEGAL_BASIS, LEGAL_BASIS_FULL, URGENT_NOTICE } from "@/lib/salud-publica/constants";
import { mockHealthDataset } from "@/lib/salud-publica/data/mock";
import type { GuidanceResult, HealthDataset, HealthTab } from "@/lib/salud-publica/types";

export default function SaludPublicaPage() {
  const [activeTab, setActiveTab] = useState<HealthTab>("dashboard");
  const [dataset, setDataset] = useState<HealthDataset>(mockHealthDataset);
  const [selectedCaseId, setSelectedCaseId] = useState(mockHealthDataset.cases[0].id);
  const [notice, setNotice] = useState("");
  const [urgentDismissed, setUrgentDismissed] = useState(false);

  const selectedCase = useMemo(() => dataset.cases.find((item) => item.id === selectedCaseId) ?? dataset.cases[0], [dataset.cases, selectedCaseId]);

  function handleGuidanceResult(result: GuidanceResult) {
    setDataset((current) => ({
      ...current,
      audit: [
        {
          id: `audit-${Date.now()}`,
          timestamp: result.generatedAt,
          actor: "Motor local",
          action: "Orientacion generada",
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
    setNotice("Orientacion local generada. No se contacto a ningun servicio externo.");
  }

  function printDocument() {
    setNotice("Vista de impresion preparada para documento ciudadano.");
    window.setTimeout(() => window.print(), 80);
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] text-[#0A4E84] print:bg-white print:text-black">
      <SaludModuleHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="border-b border-slate-200 bg-white px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-600">
          <strong className="text-[#0A4E84]">Alcance del MVP:</strong> sistema ciudadano frontend con datos mock, repositorios locales y reglas deterministas para salud individual, salud comunitaria, vigilancia ciudadana de servicios y politicas publicas, y cooperacion solidaria transparente. Sin API keys, sin backend nuevo, sin llamadas a proveedores externos y sin conexion a sistemas sanitarios oficiales.
        </div>
      </section>

      {!urgentDismissed ? (
        <div className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-3xl rounded-2xl border-l-4 border-[#E4007C] bg-white p-4 text-sm leading-6 text-slate-700 shadow-xl ring-1 ring-slate-200 print:hidden md:bottom-5">
          <strong className="text-[#E4007C]">Orientacion urgente:</strong> {URGENT_NOTICE}
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveTab("directorio")} className="rounded-xl bg-[#E4007C] px-3 py-2 text-xs font-black uppercase text-white">Ver informacion</button>
            <button type="button" onClick={() => setUrgentDismissed(true)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black uppercase text-slate-600">Cerrar</button>
          </div>
        </div>
      ) : null}

      {notice ? (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border-l-4 border-[#E4007C] bg-white p-4 text-sm font-semibold text-slate-700 shadow-xl ring-1 ring-slate-200 print:hidden">
          {notice}
          <button type="button" onClick={() => setNotice("")} className="mt-2 block text-xs font-black uppercase text-[#E4007C]">Cerrar</button>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-6 md:pt-8 print:max-w-none print:px-0 print:py-0">
        <section className="max-w-4xl rounded-xl border-l-4 border-[#FFC20E] bg-[#FFC20E]/10 px-4 py-3 print:hidden">
          <div className="inline-flex rounded-full bg-[#FFC20E] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-950">Fundamento legal orientativo</div>
          <p className="mt-2 text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">{LEGAL_BASIS}</p>
          <details className="mt-3 rounded-xl bg-white/70 p-3 text-xs leading-5 text-slate-700">
            <summary className="cursor-pointer font-black uppercase text-[#0A4E84]">Ver fundamento ampliado</summary>
            <div className="mt-2 space-y-2">
              {LEGAL_BASIS_FULL.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </details>
        </section>

        {activeTab === "dashboard" ? <HealthDashboard dataset={dataset} selectedCase={selectedCase} onTabChange={setActiveTab} onOpenCase={(caseId) => { setSelectedCaseId(caseId); setActiveTab("expedientes"); }} /> : null}
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
