"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommitteeReviewMock } from "@/components/seguridad-ciudadana/CommitteeReviewMock";
import { EvidenceUploader } from "@/components/seguridad-ciudadana/EvidenceUploader";
import { ForensicPreview } from "@/components/seguridad-ciudadana/ForensicPreview";
import { LocalAssistantPanel } from "@/components/seguridad-ciudadana/LocalAssistantPanel";
import { LocalDraftStatus } from "@/components/seguridad-ciudadana/LocalDraftStatus";
import { PrivacyConsentBox } from "@/components/seguridad-ciudadana/PrivacyConsentBox";
import { SecurityReportForm } from "@/components/seguridad-ciudadana/SecurityReportForm";
import { TraceabilityPanel } from "@/components/seguridad-ciudadana/TraceabilityPanel";
import { analyzeAbuseGuards, detectRapidLocalSubmission, registerLocalCompileAttempt } from "@/lib/seguridad-ciudadana/abuseGuards";
import { calculateDossierHash } from "@/lib/seguridad-ciudadana/hash";
import { analyzeCitizenNarrative } from "@/lib/seguridad-ciudadana/localAssistant";
import {
  clearLocalDraft,
  createLocalFolio,
  createTraceEvent,
  emptySecurityReport,
  readLocalDraft,
  saveLocalDraft,
} from "@/lib/seguridad-ciudadana/localDrafts";
import { createLocalVerificationRoot } from "@/lib/seguridad-ciudadana/merkle";
import type {
  EvidenceItem,
  LocalVerificationRoot,
  PrintableSectionId,
  SecurityReport,
  SecurityTab,
  TraceEvent,
  ValidationResult,
} from "@/lib/seguridad-ciudadana/types";

const tabs: { id: SecurityTab; label: string; description: string }[] = [
  { id: "reporte", label: "Reporte ciudadano", description: "Captura hechos, consentimiento y evidencias locales." },
  { id: "comites", label: "Comités", description: "Revisión cívica mock por especialidad." },
  { id: "trazabilidad", label: "Trazabilidad", description: "Bitácora local verificable y hashes." },
  { id: "impresion", label: "Impresión", description: "Paquete ciudadano imprimible por secciones." },
];

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
  const [activeTab, setActiveTab] = useState<SecurityTab>("reporte");
  const [selectedPrintSection, setSelectedPrintSection] = useState<PrintableSectionId>("all");
  const [folio, setFolio] = useState("");
  const [report, setReport] = useState<SecurityReport>(emptySecurityReport);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const [dossierHash, setDossierHash] = useState("");
  const [previousDossierHash, setPreviousDossierHash] = useState("");
  const [verificationRoot, setVerificationRoot] = useState<LocalVerificationRoot | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const lastDraftToastAtRef = useRef(0);

  const validation = useMemo(() => validateReport(report), [report]);
  const localAssistantResult = useMemo(
    () =>
      analyzeCitizenNarrative({
        narrative: report.narrative,
        category: report.category,
        language: report.originalLanguage,
        evidenceCount: evidence.length,
      }),
    [evidence.length, report.category, report.narrative, report.originalLanguage],
  );
  const abuseWarnings = useMemo(() => analyzeAbuseGuards(report.narrative), [report.narrative]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

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
        setPreviousDossierHash(savedDraft.previousDossierHash);
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
      if (cancelled) return;
      setDossierHash((currentHash) => {
        if (currentHash && currentHash !== hash) setPreviousDossierHash(currentHash);
        return hash;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [evidence, isReady, report]);

  useEffect(() => {
    if (!isReady) return;

    let cancelled = false;
    void createLocalVerificationRoot(evidence).then((root) => {
      if (!cancelled) setVerificationRoot(root);
    });

    return () => {
      cancelled = true;
    };
  }, [evidence, isReady]);

  useEffect(() => {
    if (!isReady || !folio) return;

    const timeout = window.setTimeout(() => {
      const updatedAt = new Date().toISOString();
      saveLocalDraft({ folio, report, evidence, trace, dossierHash, previousDossierHash, updatedAt });
      setLastSavedAt(updatedAt);

      const now = Date.now();
      if (now - lastDraftToastAtRef.current > 5000) {
        showToast("Borrador guardado localmente.");
        lastDraftToastAtRef.current = now;
      }
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [dossierHash, evidence, folio, isReady, previousDossierHash, report, showToast, trace]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  function updateReport(patch: Partial<SecurityReport>) {
    setReport((current) => ({ ...current, ...patch }));
  }

  function handleEvidenceAdded(items: EvidenceItem[]) {
    setEvidence((current) => [...current, ...items]);
    setTrace((current) => [
      ...current,
      ...items.map((item) => createTraceEvent("evidence_added", `${item.localId} · ${item.name} fue agregado con hash SHA-256 local.`)),
    ]);
    showToast(`${items.length} evidencia(s) agregada(s) localmente.`);
  }

  function handleEvidenceUpdated(item: EvidenceItem) {
    setEvidence((current) => current.map((candidate) => (candidate.id === item.id ? item : candidate)));
  }

  function handleEvidenceRemoved(item: EvidenceItem) {
    setEvidence((current) => current.filter((candidate) => candidate.id !== item.id));
    registerEvent("evidence_removed", `${item.localId} · ${item.name} fue retirado del inventario local.`);
    showToast("Evidencia eliminada del borrador local.");
  }

  function handleCompile() {
    const rapidSubmissionWarning = detectRapidLocalSubmission();
    if (rapidSubmissionWarning) {
      showToast(rapidSubmissionWarning.message);
    }

    if (!validation.isValid) {
      showToast("Faltan campos mínimos para compilar el reporte.");
      return;
    }
    registerLocalCompileAttempt();
    registerEvent("report_compiled", "Se compiló la vista imprimible del registro ciudadano auxiliar.");
    setActiveTab("impresion");
    showToast("Reporte compilado localmente.");
  }

  function handlePrint() {
    registerEvent("export_generated", "Se abrió el flujo de impresión o guardado PDF del navegador.");
    showToast("Impresión generada desde el navegador.");
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
    setPreviousDossierHash("");
    setVerificationRoot(null);
    setLastSavedAt(null);
    setRestored(false);
    showToast("Borrador local limpiado.");
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84] print:bg-white print:text-black">
      {toast ? (
        <div className="fixed right-4 top-4 z-50 max-w-sm rounded-2xl bg-white p-4 text-sm font-bold text-[#0A4E84] shadow-lg ring-1 ring-[#F7C9DD] print:hidden">
          {toast}
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 py-8 print:max-w-none print:px-0 print:py-0">
        <div className="print:hidden">
          <Link href="/" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
            {"<-"} Volver al inicio
          </Link>

          <section className="mb-6 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
            <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F2C300] via-[#00A6B2] to-[#0A4E84]" />
            <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">MVP frontend-first</div>
                <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">Seguridad Ciudadana</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                  Carpeta Forense Cívica para ordenar hechos, evidencias locales y trazabilidad verificable desde el navegador.
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  Es un registro ciudadano auxiliar: no sustituye denuncia oficial, peritaje oficial, asesoría legal ni resguardo institucional de evidencias.
                </p>
              </div>
              {folio ? <LocalDraftStatus folio={folio} lastSavedAt={lastSavedAt} restored={restored} onClearDraft={handleClearDraft} /> : null}
            </div>
          </section>

          <nav className="mb-6 grid gap-3 md:grid-cols-4" aria-label="Secciones de Seguridad Ciudadana">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-[22px] p-4 text-left shadow-sm ring-1 transition ${
                  activeTab === tab.id
                    ? "bg-[#0A4E84] text-white ring-[#0A4E84]"
                    : "bg-white text-[#0A4E84] ring-[#F7C9DD] hover:bg-[#E0F2FE]"
                }`}
              >
                <span className="block text-sm font-bold">{tab.label}</span>
                <span className={`mt-1 block text-xs leading-5 ${activeTab === tab.id ? "text-white/80" : "text-slate-600"}`}>{tab.description}</span>
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "reporte" ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] print:block">
            <div className="space-y-6 print:hidden">
              <SecurityReportForm report={report} onChange={updateReport} />
              <PrivacyConsentBox report={report} onChange={updateReport} />
              <EvidenceUploader
                evidence={evidence}
                onEvidenceAdded={handleEvidenceAdded}
                onEvidenceRemoved={handleEvidenceRemoved}
                onEvidenceUpdated={handleEvidenceUpdated}
              />
            </div>
            <div className="space-y-6">
              <LocalAssistantPanel result={localAssistantResult} abuseWarnings={abuseWarnings} />
              {folio ? (
                <TraceabilityPanel
                  folio={folio}
                  dossierHash={dossierHash}
                  previousDossierHash={previousDossierHash}
                  verificationRoot={verificationRoot}
                  trace={trace}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {activeTab === "comites" ? <CommitteeReviewMock /> : null}

        {activeTab === "trazabilidad" && folio ? (
          <TraceabilityPanel
            folio={folio}
            dossierHash={dossierHash}
            previousDossierHash={previousDossierHash}
            verificationRoot={verificationRoot}
            trace={trace}
          />
        ) : null}

        {activeTab === "impresion" && folio ? (
          <ForensicPreview
            folio={folio}
            report={report}
            evidence={evidence}
            trace={trace}
            dossierHash={dossierHash}
            previousDossierHash={previousDossierHash}
            selectedSection={selectedPrintSection}
            validation={validation}
            onSectionChange={setSelectedPrintSection}
            onCompile={handleCompile}
            onPrint={handlePrint}
          />
        ) : null}
      </div>
    </main>
  );
}
