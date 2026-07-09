"use client";

import { useState } from "react";
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
    <main className="min-h-screen bg-[#090a0f] text-slate-100 print:bg-white print:text-black">
      <ModuleHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="border-b border-pink-500/20 bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-blue-950/40 px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-300">
          <strong className="text-white">Asistente ciudadano:</strong> ayuda a estructurar expedientes ciudadanos, evidencia, cronologías y documentos de apoyo. No envía datos a autoridades ni sustituye asesoría legal.
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:py-8 print:max-w-none print:px-0 print:py-0">
        <div className="print:hidden">
          <DashboardCards structuredCase={structuredCase} evidenceCount={evidence.length} />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-sm font-semibold text-red-100 print:hidden">
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
            <article key={item.title} className="rounded-2xl border border-zinc-800 bg-[#12141c] p-4 shadow-lg shadow-black/30">
              <h3 className="font-black uppercase text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.copy}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
