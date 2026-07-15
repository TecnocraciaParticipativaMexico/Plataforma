"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
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
import type {
  DossierQualityLevel,
  EvidenceItem,
  PrintableSectionId,
  SecurityReport,
  SecurityTab,
  TraceEvent,
  ValidationResult,
} from "@/lib/seguridad-ciudadana/types";

const tabs: { id: SecurityTab; label: string; description: string; accent: string }[] = [
  {
    id: "reporte",
    label: "Carpeta Ciudadana",
    description: "Captura, evidencias locales y carpeta imprimible.",
    accent: "#E5007D",
  },
  {
    id: "comites",
    label: "ComitÃ©s Ciudadanos",
    description: "RevisiÃ³n ciudadana mock por colonia, municipio, estado y federaciÃ³n.",
    accent: "#0054A6",
  },
  {
    id: "trazabilidad",
    label: "Trazabilidad",
    description: "Hash local, bitÃ¡cora verificable y eventos del expediente.",
    accent: "#702F8A",
  },
];

function getQualityLabel(level: DossierQualityLevel): string {
  const labels: Record<DossierQualityLevel, string> = {
    borrador: "Borrador",
    basico: "BÃ¡sico",
    completo: "Completo",
    listo_revision: "Listo para revisiÃ³n ciudadana",
  };
  return labels[level];
}

function validateReport(report: SecurityReport, evidence: EvidenceItem[], trace: TraceEvent[]): ValidationResult {
  const fieldChecks = [
    { label: "tipo de hecho", complete: Boolean(report.category) },
    { label: "narrativa mÃ­nima", complete: report.narrative.trim().length >= 80 },
    { label: "fecha aproximada", complete: Boolean(report.approximateDate) },
    { label: "ubicaciÃ³n aproximada", complete: Boolean(report.location.trim()) },
    {
      label: "evidencia adjunta o explicaciÃ³n de ausencia",
      complete: evidence.length > 0 || report.evidenceAbsenceExplanation.trim().length >= 20,
    },
    { label: "consentimiento de privacidad", complete: report.consentAccepted },
  ];

  const missingFields = fieldChecks.filter((field) => !field.complete).map((field) => field.label);
  const completedFields = fieldChecks.filter((field) => field.complete).map((field) => field.label);
  let qualityLevel: DossierQualityLevel = "borrador";

  if (completedFields.length >= 3) qualityLevel = "basico";
  if (missingFields.length <= 1 && report.falseReportWarningAccepted && report.thirdPartyPrivacyAccepted) qualityLevel = "completo";
  if (missingFields.length === 0 && evidence.length > 0 && trace.length >= 3 && report.falseReportWarningAccepted && report.thirdPartyPrivacyAccepted) {
    qualityLevel = "listo_revision";
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    completedFields,
    qualityLevel,
    qualityLabel: getQualityLabel(qualityLevel),
    integrityLevel: evidence.length > 0 && trace.length >= 3 ? "Alto" : missingFields.length <= 1 ? "Medio" : "Pendiente",
  };
}

function QualityPanel({ validation }: { validation: ValidationResult }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-3 inline-flex rounded-full bg-[#FFC20E]/25 px-3 py-1 text-xs font-bold uppercase text-[#7A4B00]">
        Calidad del expediente
      </div>
      <h2 className="text-xl font-bold text-[#0054A6]">{validation.qualityLabel}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        La completitud se calcula localmente con tipo de hecho, narrativa, fecha, ubicaciÃ³n, evidencia o explicaciÃ³n y consentimiento de privacidad.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Campos completos</div>
          <div className="mt-1 text-2xl font-bold text-[#0054A6]">{validation.completedFields.length}/6</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Nivel de integridad</div>
          <div className="mt-1 text-2xl font-bold text-[#0054A6]">{validation.integrityLevel}</div>
        </div>
      </div>
      {validation.missingFields.length ? (
        <p className="mt-4 rounded-2xl border-l-4 border-[#F7931E] bg-[#F7931E]/10 p-4 text-sm leading-6 text-slate-700">
          Pendiente: {validation.missingFields.join(", ")}.
        </p>
      ) : (
        <p className="mt-4 rounded-2xl border-l-4 border-[#39B54A] bg-[#39B54A]/10 p-4 text-sm font-semibold leading-6 text-[#1F5F24]">
          Campos mÃ­nimos completos. El expediente puede imprimirse como Expediente TÃ©cnico Ciudadano.
        </p>
      )}
    </section>
  );
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
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const lastDraftToastAtRef = useRef(0);

  const validation = useMemo(() => validateReport(report, evidence, trace), [evidence, report, trace]);

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
        setTrace([createTraceEvent("draft_created", "Se iniciÃ³ una carpeta ciudadana local en este navegador.")]);
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
      ...items.map((item) => createTraceEvent("evidence_added", `${item.localId} Â· ${item.name} fue agregado con hash SHA-256 local.`)),
    ]);
    showToast(`${items.length} evidencia(s) agregada(s) localmente.`);
  }

  function handleEvidenceUpdated(item: EvidenceItem) {
    setEvidence((current) => current.map((candidate) => (candidate.id === item.id ? item : candidate)));
  }

  function handleEvidenceRemoved(item: EvidenceItem) {
    setEvidence((current) => current.filter((candidate) => candidate.id !== item.id));
    registerEvent("evidence_removed", `${item.localId} Â· ${item.name} fue retirado del inventario local.`);
    showToast("Evidencia eliminada del borrador local.");
  }

  function handleCompile() {
    registerEvent("report_compiled", validation.isValid ? "Se compilÃ³ el Expediente TÃ©cnico Ciudadano." : "Se compilÃ³ una impresiÃ³n con marca BORRADOR INCOMPLETO.");
    setSelectedPrintSection("all");
    setActiveTab("reporte");
    showToast(validation.isValid ? "Expediente compilado localmente." : "ImpresiÃ³n preparada como borrador incompleto.");
  }

  function handlePrint() {
    registerEvent("export_generated", "Se abriÃ³ el flujo de impresiÃ³n o guardado PDF del navegador.");
    showToast("ImpresiÃ³n generada desde el navegador.");
    window.setTimeout(() => window.print(), 80);
  }

  function handleClearDraft() {
    clearLocalDraft();
    const nextFolio = createLocalFolio();
    setFolio(nextFolio);
    setReport(emptySecurityReport);
    setEvidence([]);
    setTrace([createTraceEvent("draft_created", "Se limpiÃ³ el borrador anterior y se iniciÃ³ una carpeta ciudadana nueva.")]);
    setDossierHash("");
    setPreviousDossierHash("");
    setLastSavedAt(null);
    setRestored(false);
    showToast("Borrador local limpiado.");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 print:bg-white print:text-black">
      {toast ? (
        <div className="fixed right-4 top-4 z-50 max-w-sm rounded-r-2xl border-l-4 border-[#E5007D] bg-white p-4 text-sm shadow-xl ring-1 ring-slate-200 print:hidden">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#E5007D]">Aviso local</div>
          <div className="mt-1 font-semibold text-slate-800">{toast}</div>
        </div>
      ) : null}

      <div className="print:hidden">
        <ModuleIdentityHeader
          label="MÓDULO 01 · SEGURIDAD CIUDADANA"
          title="Carpeta Ciudadana de Investigación Cívica"
          description="Expediente técnico ciudadano de hechos, evidencia y trazabilidad. Documento cívico de apoyo; no sustituye autoridades."
          className="sticky top-0 z-40"
          badges={
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#166534]">
              <span className="h-2 w-2 rounded-full bg-[#39B54A]" />
              Registro ciudadano
            </span>
          }
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-0">
        <div className="print:hidden">
          <section className="mb-6 grid gap-4 lg:grid-cols-12">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md lg:col-span-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#E5007D]/10 px-3 py-1 text-xs font-bold uppercase text-[#B00061]">Hash local</span>
                <span className="rounded-full bg-[#0054A6]/10 px-3 py-1 text-xs font-bold uppercase text-[#0054A6]">Trazabilidad local</span>
                <span className="rounded-full bg-[#39B54A]/10 px-3 py-1 text-xs font-bold uppercase text-[#1F5F24]">Control ciudadano</span>
              </div>
              <h2 className="mt-4 text-2xl font-black text-slate-950">Expediente local, prudente y verificable</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
                La persona conserva control del expediente. No se envÃ­an datos a servidor, no se usan APIs externas, geolocalizaciÃ³n automÃ¡tica ni micrÃ³fono.
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                No equivale a aval institucional ni produce efectos legales automÃ¡ticos.
              </p>
            </div>
            <div className="lg:col-span-4">
              {folio ? <LocalDraftStatus folio={folio} lastSavedAt={lastSavedAt} restored={restored} onClearDraft={handleClearDraft} /> : null}
            </div>
          </section>

          <nav className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-md" aria-label="Secciones de Seguridad Ciudadana">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-[210px] flex-1 rounded-xl border px-4 py-3 text-left transition ${
                  activeTab === tab.id
                    ? "border-transparent bg-slate-950 text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                }`}
              >
                <span className="mb-2 block h-1.5 w-12 rounded-full" style={{ backgroundColor: tab.accent }} />
                <span className="block text-sm font-black">{tab.label}</span>
                <span className={`mt-1 block text-xs leading-5 ${activeTab === tab.id ? "text-white/80" : "text-slate-600"}`}>{tab.description}</span>
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "reporte" ? (
          <div className="grid gap-6 lg:grid-cols-12 print:block">
            <div className="space-y-6 print:hidden lg:col-span-5">
              <SecurityReportForm report={report} onChange={updateReport} />
              <PrivacyConsentBox report={report} onChange={updateReport} />
              <EvidenceUploader
                evidence={evidence}
                onEvidenceAdded={handleEvidenceAdded}
                onEvidenceRemoved={handleEvidenceRemoved}
                onEvidenceUpdated={handleEvidenceUpdated}
              />
            </div>
            <div className="space-y-6 lg:col-span-7">
              <QualityPanel validation={validation} />
              {folio ? (
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
          </div>
        ) : null}

        {activeTab === "comites" ? <CommitteeReviewMock /> : null}

        {activeTab === "trazabilidad" && folio ? (
          <TraceabilityPanel folio={folio} dossierHash={dossierHash} previousDossierHash={previousDossierHash} trace={trace} />
        ) : null}

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />
    </main>
  );
}
