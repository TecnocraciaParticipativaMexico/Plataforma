"use client";
import { useState } from "react";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import type { ModuleView } from "@/lib/relaciones-internacionales/types";
import { DiplomaticEvaluation } from "./DiplomaticEvaluation";
import { DiasporaDirectory } from "./DiasporaDirectory";
import { InternationalCases } from "./InternationalCases";
import { ModuleDashboard } from "./ModuleDashboard";
import { LegalFoundation, ModuleChrome } from "./ModuleChrome";
import { SolidarityFunding } from "./SolidarityFunding";
import { TraceabilityPanel } from "./TraceabilityPanel";

export function InternationalRelationsWorkspace() {
  const [active, setActive] = useState<ModuleView>("resumen");

  function changeView(view: ModuleView) {
    setActive(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 print:bg-white">
      <ModuleChrome active={active} onChange={changeView} />
      <div
        id={`panel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="mx-auto max-w-7xl space-y-5 px-4 pb-32 pt-6 sm:px-6 lg:px-8 print:max-w-none print:p-0"
      >
        {active === "resumen" ? (
          <>
            <LegalFoundation />
            <ModuleDashboard onNavigate={changeView} />
          </>
        ) : null}
        {active === "evaluacion" ? <DiplomaticEvaluation /> : null}
        {active === "diaspora" ? <DiasporaDirectory /> : null}
        {active === "expedientes" ? <InternationalCases /> : null}
        {active === "financiamiento" ? <SolidarityFunding /> : null}
        {active === "trazabilidad" ? <TraceabilityPanel /> : null}
        <PlatformFooterBanner />
      </div>
      <PlatformBottomNav />
    </main>
  );
}
