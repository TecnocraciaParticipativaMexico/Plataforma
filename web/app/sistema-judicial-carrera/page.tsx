"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { CitizenAssessment } from "@/components/sistema-judicial-carrera/CitizenAssessment";
import { EvidencePanel } from "@/components/sistema-judicial-carrera/EvidencePanel";
import { JudicialDashboard } from "@/components/sistema-judicial-carrera/JudicialDashboard";
import { ModuleHero } from "@/components/sistema-judicial-carrera/ModuleHero";
import { ModuleTabs } from "@/components/sistema-judicial-carrera/ModuleTabs";
import { ProfilesDirectory } from "@/components/sistema-judicial-carrera/ProfilesDirectory";
import { perfiles, promedio, tabs } from "@/components/sistema-judicial-carrera/data";
import type { InterfaceState, TabId } from "@/components/sistema-judicial-carrera/types";

export default function SistemaJudicialCarreraPage() {
  const [activeTab, setActiveTab] = useState<TabId>("panorama");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(perfiles[0].id);
  const [estadoDemo, setEstadoDemo] = useState<InterfaceState | null>(null);

  const filteredProfiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return perfiles;

    return perfiles.filter((perfil) =>
      [perfil.nombre, perfil.tipo, perfil.cargo, perfil.entidad, perfil.materia, perfil.riesgoEtico]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const selectedProfile = perfiles.find((perfil) => perfil.id === selectedId) ?? perfiles[0];
  const avgScore = Math.round(perfiles.reduce((total, perfil) => total + promedio(perfil), 0) / perfiles.length);
  const excellentProfiles = perfiles.filter((perfil) => perfil.riesgoEtico === "Excelente").length;
  const evidenceCount = perfiles.reduce((total, perfil) => total + perfil.evidencias.length, 0);

  function toggleDemoState(estado: InterfaceState) {
    setEstadoDemo((current) => (current === estado ? null : estado));
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84] print:bg-white print:text-black">
      <ModuleIdentityHeader
        label="Módulo 06"
        title="Sistema Judicial de Carrera"
        description="Plataforma ciudadana para consultar y evaluar, mediante evidencia verificable, la trayectoria, experiencia, decisiones, ética profesional y desempeño de personas juzgadoras, fiscales y magistradas. Sus análisis y dictámenes ciudadanos son informativos y no vinculantes."
        badges={
          <>
            <span className="rounded-full bg-[#E4007C] px-3 py-1 text-xs font-black uppercase text-white">
              Observatorio técnico
            </span>
            <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-black uppercase text-slate-900">
              Dictamen no vinculante
            </span>
          </>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0A4E84] ring-1 ring-slate-200 transition hover:bg-slate-50">
            Inicio
          </Link>
          <Link href="/modulos" className="rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#083E69]">
            Ver módulos
          </Link>
          <Link href="/mis-denuncias" className="rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#C2187A]">
            Perfil
          </Link>
        </div>
      </ModuleIdentityHeader>

      <section className="border-b border-slate-200 bg-white px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-600">
          <strong className="text-[#0A4E84]">Alcance ciudadano:</strong> las evaluaciones son informativas, documentadas y no vinculantes. No sustituyen resoluciones judiciales, procedimientos oficiales ni responsabilidades de autoridades competentes.
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-6 md:pt-8">
        <ModuleHero perfilesCount={perfiles.length} avgScore={avgScore} evidenceCount={evidenceCount} />
        <ModuleTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />

        {activeTab === "panorama" ? (
          <JudicialDashboard
            avgScore={avgScore}
            excellentProfiles={excellentProfiles}
            estadoDemo={estadoDemo}
            perfiles={perfiles}
            onToggleState={toggleDemoState}
          />
        ) : null}

        {activeTab === "directorio" ? (
          <ProfilesDirectory
            filteredProfiles={filteredProfiles}
            query={query}
            selectedProfile={selectedProfile}
            onQueryChange={setQuery}
            onSelectProfile={setSelectedId}
          />
        ) : null}

        {activeTab === "dictamen" ? <CitizenAssessment selectedProfile={selectedProfile} /> : null}
        {activeTab === "evidencia" ? <EvidencePanel evidenceCount={evidenceCount} perfiles={perfiles} /> : null}

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />
    </main>
  );
}
