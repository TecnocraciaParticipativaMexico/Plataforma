"use client";

import { useState } from "react";
import { documentTypeLabels, languageLabels, OFFICIAL_MODULE_NAME, PRIVACY_NOTICE, TRANSLATION_WARNING } from "@/lib/salud-publica/constants";
import { documentSections } from "@/lib/salud-publica/documents/templates";
import type { DirectoryEntry, HealthCase, HealthDataset, HealthDocumentType, SupplyItem } from "@/lib/salud-publica/types";
import { interfaceStateExamples, UiState } from "./UiState";

export function TimelinePanel({ selectedCase }: { selectedCase: HealthCase }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[#0A4E84]">Seguimiento y timeline</h2>
      <div className="mt-4 space-y-3">
        {selectedCase.timeline.map((event) => (
          <article key={event.id} className="grid gap-2 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 md:grid-cols-[160px_minmax(0,1fr)]">
            <div className="text-xs font-bold uppercase text-slate-500">{event.timestamp.slice(0, 10)}<br />{event.timestamp.slice(11, 16)}</div>
            <div>
              <h3 className="font-black text-slate-900">{event.description}</h3>
              <p className="text-sm leading-6 text-slate-600">Actor: {event.actor}. Origen: {event.origin}. Categoría: {event.category}. Versión: {event.version}.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PreventivePlan({ dataset, selectedCase }: { dataset: HealthDataset; selectedCase: HealthCase }) {
  const items = dataset.preventiveItems.filter((item) => item.caseId === selectedCase.id);
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-black text-[#0A4E84]">Plan preventivo</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">Acciones generales de observación y autocuidado no farmacológico cuando proceda. No prescribe medicamentos ni indica dosis.</p>
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <label key={item.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
              <input type="checkbox" defaultChecked={item.completed} className="mt-1 h-5 w-5 accent-[#E4007C]" />
              <span>
                <span className="block font-black text-slate-900">{item.title}</span>
                <span className="block text-sm leading-6 text-slate-600">{item.description}</span>
                <span className="block text-xs font-bold uppercase text-[#E4007C]">Seguimiento: {item.dueDate} / origen {item.origin}</span>
              </span>
            </label>
          ))}
          <UiState kind="datos_incompletos" title="Observaciones">Agrega hábitos, recordatorios simulados y próximos pasos sin sustituir consulta médica.</UiState>
        </div>
      </div>
      <aside className="space-y-3">
        {["Hidratación general cuando proceda", "Registrar cambios", "Preparar preguntas para consulta", "Evitar automedicación"].map((item) => <p key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm">{item}</p>)}
      </aside>
    </section>
  );
}

export function DocumentsCenter({ selectedCase, onPrint }: { selectedCase: HealthCase; onPrint: () => void }) {
  const [type, setType] = useState<HealthDocumentType>("resumen_ciudadano");
  const sections = documentSections(selectedCase, type);
  return (
    <section className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm print:hidden">
        <h2 className="font-black text-[#0A4E84]">Documentos profesionales</h2>
        {(Object.keys(documentTypeLabels) as HealthDocumentType[]).map((item) => (
          <button key={item} type="button" onClick={() => setType(item)} className={`w-full rounded-xl px-3 py-3 text-left text-sm font-bold ${type === item ? "bg-[#E4007C] text-white" : "bg-slate-50 text-slate-700"}`}>{documentTypeLabels[item]}</button>
        ))}
        <button type="button" onClick={onPrint} className="w-full rounded-xl bg-[#0A4E84] px-3 py-3 text-sm font-black uppercase text-white">Imprimir vista</button>
      </aside>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:border-0 print:shadow-none">
        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Tecnocracia Participativa México 2030 / {OFFICIAL_MODULE_NAME}</p>
          <h2 className="mt-1 text-3xl font-black text-[#0A4E84]">{documentTypeLabels[type]}</h2>
          <p className="mt-2 text-sm text-slate-600">Folio {selectedCase.folio} / versión {selectedCase.versions[0]?.version ?? "0.1"} / fecha {new Date().toISOString().slice(0, 10)}</p>
          <p className="mt-2 rounded-xl bg-[#FFF7ED] p-3 text-xs font-semibold leading-5 text-[#9A3412]">Hash demostrativo SHA-256 viable desde navegador. Representa integridad técnica demostrativa; no es registro oficial, resguardo legal ni constancia institucional.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm font-bold text-slate-600">
          {sections.map((section) => <li key={section.title}>{section.title}</li>)}
        </ol>
        <div className="mt-5 space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="break-inside-avoid rounded-xl border border-slate-200 p-4">
              <h3 className="font-black text-[#0A4E84]">{section.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{section.body}</p>
            </section>
          ))}
        </div>
        <footer className="mt-6 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">{OFFICIAL_MODULE_NAME}. Documento ciudadano demostrativo. Información declarada por el ciudadano, reglas locales y elementos sin validar clínicamente.</footer>
      </article>
    </section>
  );
}

export function LanguageAccessibilityCenter() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-black text-[#0A4E84]">Idiomas y accesibilidad</h2>
        <UiState kind="advertencia" title="Traducciones demostrativas">{TRANSLATION_WARNING}</UiState>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.entries(languageLabels).map(([key, label]) => <button key={key} type="button" className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-left text-sm font-black text-slate-700">{label}</button>)}
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-black text-[#0A4E84]">Preferencias simuladas</h3>
        {["Texto grande", "Alto contraste", "Lectura simplificada", "Reducción de movimiento", "Lectura en voz alta simulada"].map((item) => (
          <label key={item} className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
            {item}
            <input type="checkbox" className="h-5 w-5 accent-[#E4007C]" />
          </label>
        ))}
      </div>
    </section>
  );
}

export function TelehealthCenter({ dataset, selectedCase }: { dataset: HealthDataset; selectedCase: HealthCase }) {
  const [selectedProfessional, setSelectedProfessional] = useState(dataset.professionals[0]?.id ?? "");
  const professional = dataset.professionals.find((item) => item.id === selectedProfessional) ?? dataset.professionals[0];

  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase text-[#E4007C]">Demostración / Sin conexión actual con prestadores de salud</p>
        <h2 className="text-2xl font-black text-[#0A4E84]">Telemedicina y orientación profesional</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">Experiencia preparada para futuras integraciones. No implementa videollamada real, no afirma que existan médicos conectados y la disponibilidad mostrada es simulada.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {dataset.professionals.map((item) => (
            <button key={item.id} type="button" onClick={() => setSelectedProfessional(item.id)} className={`rounded-2xl border p-4 text-left ${item.id === selectedProfessional ? "border-[#E4007C] bg-[#FDF2F8]" : "border-slate-200 bg-[#F8FAFC]"}`}>
              <h3 className="font-black text-slate-900">{item.name}</h3>
              <p className="text-sm leading-6 text-slate-600">{item.specialty}</p>
              <p className="text-xs font-bold uppercase text-[#0A4E84]">{item.modality} / {item.simulatedAvailability}</p>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
            <h3 className="font-black text-[#0A4E84]">Solicitud de orientación</h3>
            <label className="mt-3 flex items-start gap-3 text-sm font-semibold text-slate-700">
              <input type="checkbox" className="mt-1 h-5 w-5 accent-[#E4007C]" defaultChecked />
              Acepto preparar un resumen local para una futura orientación profesional demostrativa.
            </label>
            <textarea className="mt-3 w-full rounded-xl border border-slate-200 p-3 text-sm" rows={4} defaultValue={`Caso: ${selectedCase.folio}. Motivo: ${selectedCase.reason}`} />
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="rounded-xl bg-[#E4007C] px-3 py-2 text-xs font-black uppercase text-white">Solicitar demo</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-slate-600">Cancelar</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-slate-600">Reprogramar</button>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-black text-[#0A4E84]">Resumen para profesional</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Profesional seleccionado: {professional?.name}. Especialidad: {professional?.specialty}. Idiomas: {professional?.languages.join(", ")}.</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {["Motivo de consulta", "Síntomas declarados", "Antecedentes", "Alergias", "Medicamentos declarados"].map((item) => <li key={item} className="rounded-xl bg-slate-50 p-2">{item}</li>)}
            </ul>
          </article>
        </div>
      </div>

      <aside className="space-y-3">
        <UiState kind="sin_conexion" title="Sala de espera demostrativa">No hay videollamada real ni prestador conectado.</UiState>
        {dataset.appointments.map((appointment) => (
          <article key={appointment.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase text-[#E4007C]">{appointment.folio}</p>
            <h3 className="font-black text-slate-900">{appointment.status}</h3>
            <p className="text-sm leading-6 text-slate-600">{appointment.waitingRoomStatus}</p>
            <p className="mt-2 text-xs font-bold text-slate-500">Agenda local: {appointment.scheduledAt.slice(0, 10)}. Historial y notas posteriores simuladas.</p>
          </article>
        ))}
      </aside>
    </section>
  );
}

export function SupplyCenter({ dataset }: { dataset: HealthDataset }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SupplyItem["availability"] | "todos">("todos");
  const results = dataset.supplyItems.filter((item) => {
    const text = `${item.name} ${item.unitName} ${item.state} ${item.municipality}`.toLowerCase();
    return (status === "todos" || item.availability === status) && text.includes(query.trim().toLowerCase());
  });
  const selected = results[0] ?? dataset.supplyItems[0];

  return (
    <section className="space-y-4">
      <UiState kind="advertencia" title="Abasto de medicamentos e insumos">Información demostrativa o reportada por la ciudadanía. Debe verificarse con la unidad médica correspondiente.</UiState>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-[#0A4E84]">Abasto de medicamentos e insumos</h2>
            <p className="text-sm leading-6 text-slate-600">No corresponde a inventarios oficiales en tiempo real.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar insumo o unidad" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm" />
            <select value={status} onChange={(event) => setStatus(event.target.value as SupplyItem["availability"] | "todos")} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm">
              <option value="todos">Todos</option>
              <option value="disponible">Disponible</option>
              <option value="disponibilidad_limitada">Disponibilidad limitada</option>
              <option value="desabasto_reportado">Desabasto reportado</option>
              <option value="en_verificacion">En verificación</option>
              <option value="reposicion_anunciada">Reposición anunciada</option>
              <option value="seguimiento_cerrado">Seguimiento cerrado</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {results.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"><p className="text-xs font-black uppercase text-[#E4007C]">{item.folio}</p><h3 className="font-black text-slate-900">{item.name}</h3><p className="text-sm leading-6 text-slate-600">{item.unitName} / {item.institution}</p><p className="text-xs font-bold text-slate-500">{item.state} / {item.municipality} / {item.availability} / tendencia {item.trend}</p></article>)}
        </div>

        {selected ? (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-xs font-black uppercase text-slate-500"><tr><th className="p-3">Folio</th><th className="p-3">Categoría</th><th className="p-3">Reporte</th><th className="p-3">Ciudadanía</th><th className="p-3">Evidencia demo</th><th className="p-3">Acciones</th></tr></thead>
              <tbody><tr><td className="p-3">{selected.folio}</td><td className="p-3">{selected.category}</td><td className="p-3">{selected.reportedAt}</td><td className="p-3">{selected.citizenReports} reportes</td><td className="p-3">{selected.evidence.join(", ")}</td><td className="p-3">Exportar / imprimir</td></tr></tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function PolicyEvaluationCenter({ dataset }: { dataset: HealthDataset }) {
  const [selectedId, setSelectedId] = useState(dataset.policyEvaluations[0]?.id ?? "");
  const selected = dataset.policyEvaluations.find((item) => item.id === selectedId) ?? dataset.policyEvaluations[0];
  return (
    <section className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-black text-[#0A4E84]">Evaluación ciudadana de políticas de salud</h2>
        {dataset.policyEvaluations.map((policy) => <button key={policy.id} type="button" onClick={() => setSelectedId(policy.id)} className={`w-full rounded-xl p-3 text-left text-sm font-bold ${selected?.id === policy.id ? "bg-[#E4007C] text-white" : "bg-slate-50 text-slate-700"}`}>{policy.name}</button>)}
      </aside>
      {selected ? (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase text-[#E4007C]">Evaluación ciudadana demostrativa / Datos simulados</p>
          <h3 className="text-2xl font-black text-[#0A4E84]">{selected.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">No sustituye auditorías ni evaluaciones institucionales. Autoridad responsable simulada: {selected.responsibleAuthority}.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Metodología", "Evidencia", "Comentarios ciudadanos", "Revisión de expertos", "Timeline", "Documento de evaluación"].map((item) => <section key={item} className="rounded-2xl bg-[#F8FAFC] p-4"><h4 className="font-black text-slate-900">{item}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{selected.status} / versión {selected.version}</p></section>)}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {selected.indicators.map((indicator) => <div key={indicator.label} className="rounded-2xl border border-slate-200 p-4"><h4 className="font-black text-[#0A4E84]">{indicator.label}</h4><p className="text-sm leading-6 text-slate-600">Objetivo: {indicator.target}. Resultado: {indicator.result}. Fuente: {indicator.source}.</p></div>)}
          </div>
        </article>
      ) : null}
    </section>
  );
}

export function ImpactBoard({ dataset }: { dataset: HealthDataset }) {
  const [state, setState] = useState("todos");
  const states = Array.from(new Set(dataset.impactIndicators.map((item) => item.state)));
  const indicators = dataset.impactIndicators.filter((item) => state === "todos" || item.state === state);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-[#0A4E84]">Impacto real sobre la población</h2>
          <p className="text-sm leading-6 text-slate-600">Información agregada, no identificable y con fuente visible por indicador.</p>
        </div>
        <select value={state} onChange={(event) => setState(event.target.value)} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm"><option value="todos">Todos los estados</option>{states.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {indicators.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"><p className="text-xs font-black uppercase text-[#E4007C]">{item.source}</p><h3 className="font-black text-slate-900">{item.label}</h3><p className="mt-1 text-2xl font-black text-[#0A4E84]">{item.value}</p><p className="text-xs font-bold text-slate-500">{item.state} / {item.period} / {item.population} / {item.trend}</p></article>)}
      </div>
    </section>
  );
}

export function SolidarityNetwork({ dataset }: { dataset: HealthDataset }) {
  return (
    <section className="space-y-4">
      <UiState kind="advertencia" title="Red solidaria y apoyo comunitario">Participación voluntaria, transparente y complementaria. No maneja dinero real, no solicita datos bancarios, no expone información clínica y no sustituye obligaciones públicas.</UiState>
      <div className="grid gap-4 md:grid-cols-2">
        {dataset.solidarityInitiatives.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-black uppercase text-[#E4007C]">{item.folio} / {item.status}</p><h2 className="text-xl font-black text-[#0A4E84]">{item.purpose}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{item.generalLocation} / responsable: {item.committee}</p><div className="mt-3 grid gap-2 text-sm text-slate-700"><p className="rounded-xl bg-slate-50 p-3">Necesidad: {item.need}</p><p className="rounded-xl bg-slate-50 p-3">Meta: {item.goal}</p><p className="rounded-xl bg-slate-50 p-3">Comprometido: {item.committedResources}</p><p className="rounded-xl bg-slate-50 p-3">Entregado: {item.deliveredResources}</p><p className="rounded-xl bg-[#FFF7ED] p-3 text-[#9A3412]">Comprobación: {item.verification}</p></div></article>)}
      </div>
    </section>
  );
}

export function PublicCommitmentsCenter({ dataset }: { dataset: HealthDataset }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[#0A4E84]">Compromisos y seguimiento institucional</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">Seguimiento ciudadano demostrativo integrado con abasto, políticas públicas, comités, indicadores, documentos y timeline.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {dataset.publicCommitments.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"><p className="text-xs font-black uppercase text-[#E4007C]">{item.folio} / {item.status}</p><h3 className="font-black text-slate-900">{item.commitment}</h3><p className="text-sm leading-6 text-slate-600">{item.institution} / {item.territory} / {item.topic}</p><div className="mt-3 h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-[#22C55E]" style={{ width: `${item.progress}%` }} /></div><p className="mt-2 text-xs font-bold text-slate-500">Plazo: {item.deadline}. Retrasos: {item.delays}. Reportes ciudadanos: {item.citizenReports}.</p></article>)}
      </div>
    </section>
  );
}

export function DirectoryCenter({ dataset }: { dataset: HealthDataset }) {
  const [state, setState] = useState("todos");
  const [municipality, setMunicipality] = useState("todos");
  const [type, setType] = useState<DirectoryEntry["type"] | "todos">("todos");
  const states = Array.from(new Set(dataset.directory.map((item) => item.state)));
  const municipalities = Array.from(new Set(dataset.directory.map((item) => item.municipality)));
  const results = dataset.directory.filter((item) => (state === "todos" || item.state === state) && (municipality === "todos" || item.municipality === municipality) && (type === "todos" || item.type === type));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[#0A4E84]">Directorio informativo demostrativo</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">Selección manual. No usa geolocalización automática y no afirma disponibilidad en tiempo real.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <select aria-label="Filtrar directorio por estado" value={state} onChange={(event) => setState(event.target.value)} className="min-h-11 rounded-xl border border-slate-200 px-3"><option value="todos">Todos los estados</option>{states.map((item) => <option key={item}>{item}</option>)}</select>
        <select aria-label="Filtrar directorio por municipio" value={municipality} onChange={(event) => setMunicipality(event.target.value)} className="min-h-11 rounded-xl border border-slate-200 px-3"><option value="todos">Todos los municipios</option>{municipalities.map((item) => <option key={item}>{item}</option>)}</select>
        <select aria-label="Filtrar directorio por tipo de servicio" value={type} onChange={(event) => setType(event.target.value as DirectoryEntry["type"] | "todos")} className="min-h-11 rounded-xl border border-slate-200 px-3"><option value="todos">Todos los servicios</option><option value="centro_salud">Centros de salud</option><option value="hospital">Hospitales</option><option value="telefono">Orientación telefónica</option><option value="comunitaria">Atención comunitaria</option><option value="comite">Comités</option><option value="emergencia">Emergencia oficial</option></select>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {results.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"><p className="text-xs font-black uppercase text-[#E4007C]">{item.type}</p><h3 className="font-black text-slate-900">{item.name}</h3><p className="text-sm leading-6 text-slate-600">{item.description}</p><p className="mt-2 text-xs font-bold text-slate-500">{item.state} / {item.municipality} / {item.phone}</p></article>)}
      </div>
    </section>
  );
}

export function CommitteesCenter({ dataset }: { dataset: HealthDataset }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[#0A4E84]">Comités ciudadanos de salud</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {dataset.committees.map((committee) => <article key={committee.id} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"><p className="text-xs font-black uppercase text-[#E4007C]">{committee.scope}</p><h3 className="font-black text-slate-900">{committee.name}</h3><p className="text-sm leading-6 text-slate-600">{committee.specialty}</p><p className="mt-2 text-xs font-bold text-slate-500">{committee.state} / {committee.matters} asuntos / sesión {committee.nextSession}</p><button type="button" className="mt-3 rounded-xl bg-white px-3 py-2 text-xs font-black uppercase text-[#0A4E84] ring-1 ring-slate-200">Propuestas</button></article>)}
      </div>
      <UiState kind="sin_resultados" title="Indicadores agregados">No se muestran datos personales. Solo asuntos comunitarios simulados.</UiState>
    </section>
  );
}

export function IndicatorsCenter({ dataset }: { dataset: HealthDataset }) {
  const metrics = dataset.metrics;
  return (
    <section className="space-y-4">
      <UiState kind="sin_conexion" title="Datos demostrativos">Información simulada para el MVP. Sin conexión a sistemas sanitarios oficiales.</UiState>
      <div className="grid gap-3 md:grid-cols-4">
        {[
          ["Expedientes activos", metrics.activeCases],
          ["Orientaciones", metrics.orientations],
          ["Seguimientos pendientes", metrics.pendingFollowups],
          ["Casos cerrados", metrics.closedCases],
        ].map(([label, value]) => <article key={label as string} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-3xl font-black text-[#0A4E84]">{value}</p><p className="text-xs font-bold uppercase text-slate-500">{label}</p></article>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Chart title="Distribución por estado" data={Object.entries(metrics.byStatus)} />
        <Chart title="Uso de idiomas" data={Object.entries(metrics.byLanguage)} />
      </div>
    </section>
  );
}

function Chart({ title, data }: { title: string; data: [string, number][] }) {
  const max = Math.max(...data.map(([, value]) => value), 1);
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-black text-[#0A4E84]">{title}</h3><div className="mt-3 space-y-3">{data.map(([label, value]) => <div key={label}><div className="flex justify-between text-sm font-bold"><span>{label}</span><span>{value}</span></div><div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#E4007C]" style={{ width: `${(value / max) * 100}%` }} /></div></div>)}</div></section>;
}

export function AuditPrivacyCenter({ dataset, selectedCase, mode }: { dataset: HealthDataset; selectedCase: HealthCase; mode: "auditoria" | "privacidad" }) {
  if (mode === "privacidad") {
    return (
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-[#0A4E84]">Centro de privacidad</h2>
          <p className="mt-2 rounded-xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">{PRIVACY_NOTICE}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Exportar mis datos", "Borrar conversación", "Eliminar expediente", "Ocultar información sensible", "Cambiar alias", "Controlar qué se agrega", "Revisar consentimiento", "Consultar actividad"].map((item) => <button key={item} type="button" className="rounded-xl border border-slate-200 bg-white p-3 text-left text-sm font-bold text-slate-700 hover:border-[#E4007C]">{item}</button>)}
          </div>
        </div>
        <aside className="space-y-3">{interfaceStateExamples.map((item) => <UiState key={item.kind} kind={item.kind} title={item.title}>{item.copy}</UiState>)}</aside>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[#0A4E84]">Auditoría y versionado</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="bg-[#F8FAFC] text-xs font-black uppercase text-slate-500"><tr><th className="p-3">ID</th><th className="p-3">Fecha</th><th className="p-3">Actor</th><th className="p-3">Acción</th><th className="p-3">Entidad</th><th className="p-3">Versión</th><th className="p-3">Hash</th></tr></thead>
          <tbody>{dataset.audit.map((event) => <tr key={event.id} className="border-t border-slate-100"><td className="p-3">{event.id}</td><td className="p-3">{event.timestamp.slice(0, 10)}</td><td className="p-3">{event.actor}</td><td className="p-3">{event.action}</td><td className="p-3">{event.entity}</td><td className="p-3">{event.version}</td><td className="p-3">{event.hash}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-3">{selectedCase.versions.map((version) => <p key={version.version} className="rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700">v{version.version}: {version.summary}</p>)}</div>
    </section>
  );
}
