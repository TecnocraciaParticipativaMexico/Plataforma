"use client";

import { useMemo, useState } from "react";
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
              description: "Se genero un expediente local con datos capturados por la persona usuaria.",
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
          action: "Referencia genetica registrada",
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
        { ...current, reviews: [review, ...current.reviews] },
        {
          actorRole: "Acompanamiento civico",
          action: "Revision ciudadana solicitada",
          resource: review.id,
          version: "0.1",
          caseId: review.caseId,
          status: "recorded",
        },
      ),
    );
  }

  function printDocument() {
    setNotice("Impresion preparada: solo se mostrara el documento civico de apoyo.");
    window.setTimeout(() => window.print(), 80);
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] text-[#0A4E84] print:bg-white print:text-black">
      <ModuleHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <section className="border-b border-slate-200 bg-white px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-600">
          <strong className="text-[#0A4E84]">Alcance del MVP:</strong> sistema frontend con datos mock y estado local para busqueda,
          documentacion, seguimiento y acompanamiento. No realiza llamadas externas ni activa permisos del dispositivo.
        </div>
      </section>

      {notice ? (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border-l-4 border-[#E4007C] bg-white p-4 text-sm font-semibold text-slate-700 shadow-xl ring-1 ring-slate-200 print:hidden">
          {notice}
          <button type="button" onClick={() => setNotice("")} className="mt-2 block text-xs font-black uppercase text-[#E4007C]">Cerrar</button>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:py-8 print:hidden">
        {activeTab === "dashboard" ? <Dashboard dataset={dataset} onOpenCase={openCase} onNewCase={() => setActiveTab("new")} /> : null}

        {activeTab === "cases" ? (
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <CasesList cases={dataset.cases} dataset={dataset} selectedCaseId={selectedCase.id} onSelectCase={setSelectedCaseId} />
            <CaseDetail selectedCase={selectedCase} dataset={dataset} onPrint={printDocument} />
          </div>
        ) : null}

        {activeTab === "new" ? <NewCaseWizard caseCount={dataset.cases.length} onCreated={handleCreated} /> : null}
        {activeTab === "genetics" ? <GeneticReferencesPanel dataset={dataset} cases={dataset.cases} onAddReference={handleAddReference} /> : null}
        {activeTab === "committees" ? <CommitteesDirectory dataset={dataset} onAssignReview={handleAssignReview} /> : null}
        {activeTab === "audit" ? <AuditLog dataset={dataset} /> : null}
      </div>

      {selectedCase ? <PrintableDocument selectedCase={selectedCase} dataset={dataset} /> : null}

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
