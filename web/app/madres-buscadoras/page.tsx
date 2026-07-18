"use client";

import { useMemo, useState } from "react";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { AuditLog } from "@/components/madres-buscadoras/AuditLog";
import { CaseDetail } from "@/components/madres-buscadoras/CaseDetail";
import { CasesList } from "@/components/madres-buscadoras/CasesList";
import { CommitteesDirectory } from "@/components/madres-buscadoras/CommitteesDirectory";
import { Dashboard } from "@/components/madres-buscadoras/Dashboard";
import { GeneticReferencesPanel } from "@/components/madres-buscadoras/GeneticReferencesPanel";
import { ModuleHeader } from "@/components/madres-buscadoras/ModuleHeader";
import { NewCaseWizard } from "@/components/madres-buscadoras/NewCaseWizard";
import { PrintableDocument } from "@/components/madres-buscadoras/PrintableDocument";
import { demoDataset } from "@/lib/madres-buscadoras/mockData";
import type { CommitteeReview, EvidenceItem, GeneticReference, ModuleTab, SearchCase, SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { appendAudit } from "@/lib/madres-buscadoras/localService";

export default function MadresBuscadorasPage() {
  const [activeTab, setActiveTab] = useState<ModuleTab>("dashboard");
  const [dataset, setDataset] = useState<SearchCaseDataset>(demoDataset);
  const [selectedCaseId, setSelectedCaseId] = useState(demoDataset.cases[0].id);
  const [notice, setNotice] = useState("");

  const selectedCase = useMemo(
    () => dataset.cases.find((item) => item.id === selectedCaseId) ?? dataset.cases[0],
    [dataset.cases, selectedCaseId],
  );

  function openCase(caseId: string) {
    setSelectedCaseId(caseId);
    setActiveTab("cases");
  }

  function handleCreated(newCase: SearchCase, evidence: EvidenceItem[]) {
    setDataset((current) =>
      appendAudit(
        {
          ...current,
          cases: [newCase, ...current.cases],
          evidence: [...evidence, ...current.evidence],
          versions: [
            {
              id: `version-${newCase.id}`,
              caseId: newCase.id,
              version: "0.1",
              createdAt: newCase.createdAt,
              actorRole: "Familia",
              summary: "Expediente creado localmente desde el flujo por pasos.",
            },
            ...current.versions,
          ],
          events: [
            {
              id: `event-${newCase.id}`,
              caseId: newCase.id,
              type: "report",
              title: "Registro local creado",
              description: "Se generó un expediente local con datos capturados por la persona usuaria.",
              occurredAt: newCase.createdAt,
              actorRole: "Familia",
              privacyLevel: newCase.privacyLevel,
              relatedEvidenceIds: evidence.map((item) => item.id),
            },
            ...current.events,
          ],
        },
        {
          actorRole: "Familia",
          action: "Expediente local creado",
          resource: newCase.id,
          version: "0.1",
          caseId: newCase.id,
          status: "recorded",
        },
      ),
    );
    setSelectedCaseId(newCase.id);
    setNotice(`Expediente ${newCase.folio} creado localmente. Datos demostrativos del entorno de prueba.`);
    setActiveTab("cases");
  }

  function handleAddReference(reference: GeneticReference) {
    setDataset((current) =>
      appendAudit(
        { ...current, geneticReferences: [reference, ...current.geneticReferences] },
        {
          actorRole: "Familia",
          action: "Referencia genética registrada",
          resource: reference.id,
          version: "0.1",
          caseId: reference.caseId,
          status: "recorded",
        },
      ),
    );
  }

  function handleAssignReview(review: CommitteeReview) {
    setDataset((current) =>
      appendAudit(
        {
          ...current,
          cases: current.cases.map((item) =>
            item.id === review.caseId
              ? { ...item, committeeId: review.committeeId, status: "committee_review", updatedAt: review.updatedAt }
              : item,
          ),
          reviews: [review, ...current.reviews],
        },
        {
          actorRole: "Acompañamiento cívico",
          action: "Revisión ciudadana solicitada",
          resource: review.id,
          version: "0.1",
          caseId: review.caseId,
          status: "recorded",
        },
      ),
    );
  }

  function printDocument() {
    setNotice("Impresión preparada: solo se mostrará el documento cívico de apoyo.");
    window.setTimeout(() => window.print(), 80);
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] text-[#0A4E84] print:bg-white print:text-black">
      <ModuleHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <section className="border-b border-slate-200 bg-white px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-600">
          <strong className="text-[#0A4E84]">Alcance del MVP:</strong> sistema frontend con datos mock y estado local para búsqueda,
          documentación, seguimiento y acompañamiento. No realiza llamadas externas ni activa permisos del dispositivo.
        </div>
      </section>

      {notice ? (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border-l-4 border-[#E4007C] bg-white p-4 text-sm font-semibold text-slate-700 shadow-xl ring-1 ring-slate-200 print:hidden">
          {notice}
          <button type="button" onClick={() => setNotice("")} className="mt-2 block text-xs font-black uppercase text-[#E4007C]">Cerrar</button>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-6 md:pt-8 print:hidden">
        <section className="max-w-3xl rounded-xl border-l-4 border-[#FFC20E] bg-[#FFC20E]/10 px-4 py-3">
          <div className="inline-flex rounded-full bg-[#FFC20E] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-950">
            FUNDAMENTO LEGAL
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
            Se sustenta en los artículos 1°, 17 y 20 de la Constitución Política de los Estados Unidos Mexicanos, la Ley General en Materia de Desaparición Forzada de Personas y la Ley General de Víctimas. Fortalece el derecho a la verdad, la búsqueda y la justicia mediante documentación ciudadana. No sustituye las obligaciones legales de las autoridades responsables de la búsqueda e investigación.
          </p>
        </section>

        {activeTab === "dashboard" ? <Dashboard dataset={dataset} onOpenCase={openCase} onNewCase={() => setActiveTab("new")} /> : null}

        {activeTab === "cases" ? (
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <CasesList cases={dataset.cases} dataset={dataset} selectedCaseId={selectedCase.id} onSelectCase={setSelectedCaseId} />
            <CaseDetail
              selectedCase={selectedCase}
              dataset={dataset}
              onPrint={printDocument}
              onRequestReview={() => {
                setActiveTab("committees");
                setNotice("Selecciona el expediente y comité para agregarlo a la cola de revisión ciudadana.");
              }}
            />
          </div>
        ) : null}

        {activeTab === "new" ? <NewCaseWizard caseCount={dataset.cases.length} onCreated={handleCreated} /> : null}
        {activeTab === "genetics" ? <GeneticReferencesPanel dataset={dataset} cases={dataset.cases} onAddReference={handleAddReference} /> : null}
        {activeTab === "committees" ? <CommitteesDirectory dataset={dataset} onAssignReview={handleAssignReview} /> : null}
        {activeTab === "audit" ? <AuditLog dataset={dataset} /> : null}

        <PlatformFooterBanner />
      </div>

      {selectedCase ? <PrintableDocument selectedCase={selectedCase} dataset={dataset} /> : null}
      <PlatformBottomNav />

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #madres-print-document,
          #madres-print-document * {
            visibility: visible;
          }
          #madres-print-document {
            display: block !important;
            position: absolute;
            inset: 0;
            width: 100%;
          }
          @page {
            margin: 14mm;
          }
        }
      `}</style>
    </main>
  );
}
