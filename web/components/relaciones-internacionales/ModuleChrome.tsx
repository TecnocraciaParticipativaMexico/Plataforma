"use client";

import Link from "next/link";
import type { KeyboardEvent, ReactNode } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import type { ModuleView } from "@/lib/relaciones-internacionales/types";

export const views: { id: ModuleView; label: string }[] = [
  { id:"resumen", label:"Resumen" }, { id:"evaluacion", label:"Evaluación Diplomática" },
  { id:"diaspora", label:"Representantes de la Diáspora" }, { id:"expedientes", label:"Expedientes y Alertas" },
  { id:"financiamiento", label:"Financiamiento Solidario" }, { id:"trazabilidad", label:"Trazabilidad e Incidencia" },
];

export function ModuleChrome({ active, onChange }: { active: ModuleView; onChange: (view: ModuleView) => void }) {
  function handleTabKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const current = views.findIndex((view) => view.id === active);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = views[(current + direction + views.length) % views.length];
    onChange(next.id);
    window.setTimeout(() => document.getElementById(`tab-${next.id}`)?.focus(), 0);
  }
  return <>
    <ModuleIdentityHeader label="MÓDULO 30" title="Relaciones Internacionales, Derechos Humanos y Diáspora" description="Articula a la diáspora mexicana, especialistas y comités ciudadanos para evaluar la representación diplomática, documentar asuntos de interés público y preparar expedientes con proyección internacional. Facilita análisis técnico, trazabilidad y seguimiento sin sustituir a la Secretaría de Relaciones Exteriores ni a los organismos competentes." badges={<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Articulación transnacional ciudadana</span>}>
      <div className="flex flex-wrap gap-4 text-xs font-bold text-[#0A4E84]"><Link href="/">Inicio</Link><Link href="/modulos">Módulos</Link><Link href="/mis-denuncias">Perfil</Link></div>
    </ModuleIdentityHeader>
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur print:hidden" aria-label="Secciones del Módulo 30">
      <div role="tablist" aria-label="Herramientas transnacionales" onKeyDown={handleTabKey} className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
        {views.map((view) => <button key={view.id} id={`tab-${view.id}`} role="tab" aria-selected={active===view.id} aria-controls={`panel-${view.id}`} tabIndex={active===view.id?0:-1} onClick={()=>onChange(view.id)} className={`min-h-11 shrink-0 rounded-xl px-4 py-2 text-xs font-extrabold transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${active===view.id?"bg-[#0A4E84] text-white shadow":"bg-slate-50 text-slate-700 hover:bg-pink-50"}`}>{view.label}</button>)}
      </div>
    </nav>
  </>;
}

export function LegalFoundation() { return <section className="rounded-2xl border border-pink-200 bg-pink-50 p-5 shadow-sm"><div className="text-xs font-black uppercase tracking-[.14em] text-[#B00061]">Fundamento constitucional y convencional</div><p className="mt-2 text-sm leading-6 text-slate-700">Se sustenta en los artículos 1°, 6°, 8°, 35, 39, 89 y 133 de la Constitución Política de los Estados Unidos Mexicanos, así como en la Convención Americana sobre Derechos Humanos, el Pacto Internacional de Derechos Civiles y Políticos y la Ley del Servicio Exterior Mexicano. Facilita participación, documentación y petición ciudadana con proyección internacional. No sustituye las atribuciones del Ejecutivo federal, la Secretaría de Relaciones Exteriores ni el Servicio Exterior Mexicano.</p></section> }

export function Notice({ children, tone="blue" }: { children: ReactNode; tone?: "blue"|"pink"|"amber"|"green" }) { const colors={blue:"border-[#0A4E84] bg-blue-50",pink:"border-[#E4007C] bg-pink-50",amber:"border-amber-500 bg-amber-50",green:"border-emerald-600 bg-emerald-50"}; return <p className={`rounded-xl border-l-4 p-4 text-sm leading-6 text-slate-700 ${colors[tone]}`}>{children}</p> }

export function Panel({ title, description, children }: { title:string; description?:string; children:ReactNode }) { return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-xl font-black text-[#0A4E84] sm:text-2xl">{title}</h2>{description&&<p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{description}</p>}<div className="mt-5">{children}</div></section> }
