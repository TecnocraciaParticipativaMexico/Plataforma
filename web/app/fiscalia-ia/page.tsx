"use client";

import { useState } from "react";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { CaseGenerator } from "@/components/fiscalia-ia/CaseGenerator";
import { CasesExplorer } from "@/components/fiscalia-ia/CasesExplorer";
import { CommitteesPanel } from "@/components/fiscalia-ia/CommitteesPanel";
import { DashboardCards } from "@/components/fiscalia-ia/DashboardCards";
import { ModuleHeader } from "@/components/fiscalia-ia/ModuleHeader";
import { PrintableDocument } from "@/components/fiscalia-ia/PrintableDocument";
import { TraceabilityPanel } from "@/components/fiscalia-ia/TraceabilityPanel";
import { initialFiscaliaForm } from "@/lib/fiscalia-ia/data/mock";
import { structureCitizenCase } from "@/lib/fiscalia-ia/services/fiscaliaAiService";
import type { EvidenceRecord, FiscaliaFormState, FiscaliaTab, StructuredCase } from "@/lib/fiscalia-ia/types";

export default function FiscaliaIaPage() {
  const [activeTab, setActiveTab] = useState<FiscaliaTab>("generador");
  const [form, setForm] = useState<FiscaliaFormState>(initialFiscaliaForm);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);
  const [structuredCase, setStructuredCase] = useState<StructuredCase | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const showSummary = activeTab === "generador" || activeTab === "documento";

  function updateForm(patch: Partial<FiscaliaFormState>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  async function handleGenerate() {
    setLoading(true);
    setError("");
    try {
      const result = await structureCitizenCase(form, evidence);
      setStructuredCase(result);
      setActiveTab("documento");
    } catch {
      setError("No se pudo estructurar el expediente local. Revisa los campos y vuelve a intentar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#0A4E84] print:bg-white print:text-black">
      <ModuleHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-600">
          <strong className="text-[#0A4E84]">Asistente ciudadano:</strong> ayuda a estructurar expedientes ciudadanos, evidencia, cronologías y documentos de apoyo. No envía datos a autoridades ni sustituye asesoría legal.
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-6 md:pt-8 print:max-w-none print:px-0 print:py-0">
        <section className="max-w-3xl rounded-xl border-l-4 border-[#FFC20E] bg-[#FFC20E]/10 px-4 py-3 print:hidden">
          <div className="inline-flex rounded-full bg-[#FFC20E] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-950">
            FUNDAMENTO LEGAL
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
            Se sustenta en los artículos 6°, 8°, 17, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos, el Código Nacional de Procedimientos Penales y la Ley General de Víctimas. Permite estructurar información con fines ciudadanos conforme al derecho de acceso a la justicia, el derecho de petición, el derecho a la verdad y el acceso a la información. No sustituye autoridades ministeriales, periciales ni judiciales.
          </p>
        </section>

        {showSummary ? (
          <div className="print:hidden">
            <DashboardCards structuredCase={structuredCase} evidenceCount={evidence.length} />
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-[#F97316]/30 bg-[#FFF7ED] p-4 text-sm font-semibold text-[#9A3412] print:hidden">
            {error}
          </div>
        ) : null}

        {activeTab === "generador" ? (
          <CaseGenerator
            form={form}
            evidence={evidence}
            loading={loading}
            onFormChange={updateForm}
            onEvidenceAdd={(items) => setEvidence((current) => [...current, ...items])}
            onGenerate={handleGenerate}
            structuredCase={structuredCase}
          />
        ) : null}

        {activeTab === "expedientes" ? <CasesExplorer /> : null}
        {activeTab === "comites" ? <CommitteesPanel /> : null}
        {activeTab === "trazabilidad" ? <TraceabilityPanel structuredCase={structuredCase} evidence={evidence} /> : null}
        {activeTab === "documento" ? <PrintableDocument structuredCase={structuredCase} /> : null}

        <section className="grid gap-4 md:grid-cols-3 print:hidden">
          {[
            {
              title: "Privacidad",
              copy: "No se usa GPS automático, no se activa micrófono automático y no se suben archivos automáticamente.",
            },
            {
              title: "Seguridad futura",
              copy: "La arquitectura deja espacio para detección de spam, abuso coordinado, duplicados y bitácora de cambios.",
            },
            {
              title: "Datos locales/mock",
              copy: "Los datos de ejemplo no representan envío real a autoridades. El ciudadano decide qué guardar, imprimir o compartir.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-black uppercase text-[#0A4E84]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </section>

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />
    </main>
  );
}
