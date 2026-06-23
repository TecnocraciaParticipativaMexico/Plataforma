"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CommitteeReviewMock } from "@/components/seguridad-ciudadana/CommitteeReviewMock";
import { EvidenceUploader } from "@/components/seguridad-ciudadana/EvidenceUploader";
import { ForensicPreview } from "@/components/seguridad-ciudadana/ForensicPreview";
import { LocalDraftStatus } from "@/components/seguridad-ciudadana/LocalDraftStatus";
import { PrivacyConsentBox } from "@/components/seguridad-ciudadana/PrivacyConsentBox";
import { SecurityReportForm } from "@/components/seguridad-ciudadana/SecurityReportForm";
import { TraceabilityPanel } from "@/components/seguridad-ciudadana/TraceabilityPanel";
import { calculateDossierHash } from "@/lib/seguridad-ciudadana/hash";
import {
  clearLocalDraft,
  createLocalFolio,
  createTraceEvent,
  emptySecurityReport,
  readLocalDraft,
  saveLocalDraft,
} from "@/lib/seguridad-ciudadana/localDrafts";
import type { EvidenceItem, SecurityReport, TraceEvent, ValidationResult } from "@/lib/seguridad-ciudadana/types";

function validateReport(report: SecurityReport): ValidationResult {
  const missingFields = [
    !report.category ? "categoría" : "",
    !report.approximateDate ? "fecha aproximada" : "",
    report.narrative.trim().length < 40 ? "narrativa mínima" : "",
    !report.originalLanguage.trim() ? "idioma original" : "",
    !report.riskLevel ? "riesgo percibido" : "",
    !report.consentAccepted ? "consentimiento informado" : "",
    !report.falseReportWarningAccepted ? "advertencia contra denuncias falsas" : "",
    !report.thirdPartyPrivacyAccepted ? "privacidad de terceros" : "",
  ].filter(Boolean);

  return { isValid: missingFields.length === 0, missingFields };
}

export default function SeguridadCiudadanaPage() {
  const [folio, setFolio] = useState("");
  const [report, setReport] = useState<SecurityReport>(emptySecurityReport);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const [dossierHash, setDossierHash] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [restored, setRestored] = useState(false);

  const validation = useMemo(() => validateReport(report), [report]);

  const registerEvent = useCallback((type: TraceEvent["type"], detail: string) => {
    setTrace((current) => [...current, createTraceEvent(type, detail)]);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const savedDraft = readLocalDraft();

      if (savedDraft) {
        setFolio(savedDraft.folio);
        setReport(savedDraft.report);
        setEvidence(savedDraft.evidence);
        setTrace(savedDraft.trace);
        setDossierHash(savedDraft.dossierHash);
        setLastSavedAt(savedDraft.updatedAt);
        setRestored(true);
      } else {
        const initialFolio = createLocalFolio();
        setFolio(initialFolio);
        setTrace([createTraceEvent("draft_created", "Se inició un borrador local en este navegador.")]);
      }

      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    let cancelled = false;
    void calculateDossierHash(report, evidence).then((hash) => {
      if (!cancelled) setDossierHash(hash);
    });

    return () => {
      cancelled = true;
    };
  }, [evidence, isReady, report]);

  useEffect(() => {
    if (!isReady || !folio) return;

    const timeout = window.setTimeout(() => {
      const updatedAt = new Date().toISOString();
      saveLocalDraft({ folio, report, evidence, trace, dossierHash, updatedAt });
      setLastSavedAt(updatedAt);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [dossierHash, evidence, folio, isReady, report, trace]);

  function updateReport(patch: Partial<SecurityReport>) {
    setReport((current) => ({ ...current, ...patch }));
  }

  function handleEvidenceAdded(items: EvidenceItem[]) {
    setEvidence((current) => [...current, ...items]);
    setTrace((current) => [
      ...current,
      ...items.map((item) => createTraceEvent("evidence_added", `${item.name} fue agregado con hash SHA-256 local.`)),
    ]);
  }

  function handleEvidenceRemoved(item: EvidenceItem) {
    setEvidence((current) => current.filter((candidate) => candidate.id !== item.id));
    registerEvent("evidence_removed", `${item.name} fue retirado del inventario local.`);
  }

  function handleCompile() {
    if (!validation.isValid) return;
    registerEvent("report_compiled", "Se compiló la vista imprimible del registro ciudadano auxiliar.");
  }

  function handlePrint() {
    registerEvent("export_generated", "Se abrió el flujo de impresión o guardado PDF del navegador.");
    window.setTimeout(() => window.print(), 80);
  }

  function handleClearDraft() {
    clearLocalDraft();
    const nextFolio = createLocalFolio();
    setFolio(nextFolio);
    setReport(emptySecurityReport);
    setEvidence([]);
    setTrace([createTraceEvent("draft_created", "Se limpió el borrador anterior y se inició uno nuevo.")]);
    setDossierHash("");
    setLastSavedAt(null);
    setRestored(false);
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84] print:bg-white print:text-black">
      <div className="mx-auto max-w-7xl px-4 py-8 print:max-w-none print:px-0 print:py-0">
        <div className="print:hidden">
          <Link href="/" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
            {"<-"} Volver al inicio
          </Link>

          <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
            <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F2C300] via-[#00A6B2] to-[#0A4E84]" />
            <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">MVP frontend-first</div>
                <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">Seguridad Ciudadana</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                  Carpeta Forense Cívica para ordenar hechos, evidencias locales y trazabilidad verificable desde el navegador.
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  Es un registro ciudadano auxiliar: no sustituye denuncia oficial, peritaje oficial, asesoría legal ni cadena de custodia oficial.
                </p>
              </div>
              {folio ? <LocalDraftStatus folio={folio} lastSavedAt={lastSavedAt} restored={restored} onClearDraft={handleClearDraft} /> : null}
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] print:block">
          <div className="space-y-6 print:hidden">
            <SecurityReportForm report={report} onChange={updateReport} />
            <PrivacyConsentBox report={report} onChange={updateReport} />
            <EvidenceUploader evidence={evidence} onEvidenceAdded={handleEvidenceAdded} onEvidenceRemoved={handleEvidenceRemoved} />
            <CommitteeReviewMock />
          </div>

          <div className="space-y-6">
            {folio ? <TraceabilityPanel folio={folio} dossierHash={dossierHash} trace={trace} /> : null}
            {folio ? (
              <ForensicPreview
                folio={folio}
                report={report}
                evidence={evidence}
                trace={trace}
                dossierHash={dossierHash}
                validation={validation}
                onCompile={handleCompile}
                onPrint={handlePrint}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
