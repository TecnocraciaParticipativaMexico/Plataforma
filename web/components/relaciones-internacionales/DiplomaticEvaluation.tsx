"use client";

import { useState } from "react";
import type {
  DiplomaticEvaluation as EvaluationForm,
  EvidenceItem,
} from "@/lib/relaciones-internacionales/types";
import { formatBytes, sha256 } from "@/lib/relaciones-internacionales/utils";
import {
  DocumentHeader,
  Notice,
  Panel,
  fieldClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "./ui";

const criteria = [
  "Idoneidad técnica",
  "Experiencia diplomática",
  "Protección consular",
  "Derechos humanos",
  "Cooperación internacional",
  "Atención a la diáspora",
  "Transparencia",
  "Posibles conflictos de interés",
  "Impacto reputacional",
  "Congruencia con compromisos internacionales",
];

const initialForm: EvaluationForm = {
  country: "",
  mission: "",
  kind: "Embajada",
  criterion: criteria[0],
  period: "",
  contribution: "",
  sources: "",
  notes: "",
};

type CivicReport = {
  folio: string;
  hash: string;
  createdAt: string;
  version: string;
};

function validateEvaluation(form: EvaluationForm) {
  const issues: string[] = [];
  if (!form.country.trim()) issues.push("Indique el país receptor.");
  if (!form.mission.trim()) issues.push("Indique la misión diplomática.");
  if (!form.period) issues.push("Indique el periodo evaluado.");
  if (form.contribution.trim().length < 80) {
    issues.push("La aportación debe contener al menos 80 caracteres.");
  }
  if (!form.sources.trim()) issues.push("Agregue al menos una fuente pública.");
  return issues;
}

export function DiplomaticEvaluation() {
  const [form, setForm] = useState<EvaluationForm>(initialForm);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [report, setReport] = useState<CivicReport | null>(null);
  const [message, setMessage] = useState("");

  function updateForm<Key extends keyof EvaluationForm>(
    key: Key,
    value: EvaluationForm[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function addFiles(files: FileList | null) {
    if (!files) return;

    const allowed = ["application/pdf", "image/png", "image/jpeg", "text/plain"];
    const accepted: EvidenceItem[] = [];
    const issues: string[] = [];

    Array.from(files).forEach((file) => {
      if (!allowed.includes(file.type)) {
        issues.push(`${file.name}: formato no permitido.`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        issues.push(`${file.name}: supera el límite de 5 MB.`);
        return;
      }
      if (evidence.some((item) => item.name === file.name && item.size === file.size)) {
        issues.push(`${file.name}: ya fue agregado.`);
        return;
      }
      accepted.push({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        addedAt: new Date().toLocaleString("es-MX"),
      });
    });

    setEvidence((current) => [...current, ...accepted]);
    setErrors(issues);
    if (accepted.length) setMessage(`${accepted.length} evidencia(s) agregadas localmente.`);
  }

  async function generateReport() {
    const issues = validateEvaluation(form);
    setErrors(issues);
    if (issues.length) return;

    const folio = `M30-EVAL-${new Date().getFullYear()}-${Date.now()
      .toString()
      .slice(-6)}`;
    const version = "1.0";
    const createdAt = new Date().toLocaleString("es-MX");
    const hash = await sha256(
      JSON.stringify({ folio, form, evidence, version, createdAt }),
    );
    setReport({ folio, hash, createdAt, version });
    setMessage("Borrador de dictamen cívico generado localmente.");
  }

  function clearForm() {
    if (!window.confirm("¿Borrar el formulario y sus evidencias locales?")) return;
    setForm(initialForm);
    setEvidence([]);
    setReport(null);
    setErrors([]);
    setMessage("Formulario local limpiado.");
  }

  const sourceList = form.sources
    .split("\n")
    .map((source) => source.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5">
      <div className={report ? "print:hidden" : ""}>
        <Panel
          eyebrow="Herramienta técnica ciudadana"
          title="Evaluación Cívica de Representación Diplomática"
          description="Dictaminación ciudadana y técnica sobre idoneidad, trayectoria, congruencia institucional y desempeño público de embajadas, consulados y misiones mexicanas."
        >
          <Notice tone="amber">
            Herramienta de evaluación ciudadana. No constituye una resolución
            oficial ni interviene en las facultades constitucionales de
            nombramiento y conducción de la política exterior.
          </Notice>

          <form
            className="mt-5 grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              void generateReport();
            }}
            noValidate
          >
            <label className="text-sm font-bold">
              País receptor *
              <input
                className={`mt-1 ${fieldClass}`}
                value={form.country}
                onChange={(event) => updateForm("country", event.target.value)}
                maxLength={80}
              />
            </label>
            <label className="text-sm font-bold">
              Misión diplomática *
              <input
                className={`mt-1 ${fieldClass}`}
                value={form.mission}
                onChange={(event) => updateForm("mission", event.target.value)}
                maxLength={120}
              />
            </label>
            <label className="text-sm font-bold">
              Tipo de representación
              <select
                className={`mt-1 ${fieldClass}`}
                value={form.kind}
                onChange={(event) => updateForm("kind", event.target.value)}
              >
                <option>Embajada</option>
                <option>Consulado</option>
                <option>Misión permanente</option>
                <option>Oficina de enlace</option>
              </select>
            </label>
            <label className="text-sm font-bold">
              Vector de análisis
              <select
                className={`mt-1 ${fieldClass}`}
                value={form.criterion}
                onChange={(event) => updateForm("criterion", event.target.value)}
              >
                {criteria.map((criterion) => (
                  <option key={criterion}>{criterion}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-bold">
              Periodo evaluado *
              <input
                type="month"
                className={`mt-1 ${fieldClass}`}
                value={form.period}
                onChange={(event) => updateForm("period", event.target.value)}
              />
            </label>

            <Notice tone="pink" className="sm:col-span-2">
              <strong>Aportación documentada con identidad protegida.</strong> La
              plataforma procura minimizar la exposición de datos, pero no
              garantiza anonimato absoluto. Evite incluir domicilios,
              información migratoria, identificaciones oficiales o datos
              sensibles innecesarios.
            </Notice>

            <label className="text-sm font-bold sm:col-span-2">
              Aportación documentada *
              <textarea
                className={`mt-1 ${fieldClass}`}
                rows={6}
                value={form.contribution}
                onChange={(event) => updateForm("contribution", event.target.value)}
                maxLength={3000}
              />
              <span className="mt-1 block text-xs font-normal text-slate-500">
                {form.contribution.length}/3000 · mínimo 80 caracteres
              </span>
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              Fuentes públicas *
              <textarea
                className={`mt-1 ${fieldClass}`}
                rows={3}
                value={form.sources}
                onChange={(event) => updateForm("sources", event.target.value)}
                placeholder="Una fuente por línea"
                maxLength={1500}
              />
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              Observaciones opcionales
              <textarea
                className={`mt-1 ${fieldClass}`}
                rows={3}
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
                maxLength={1200}
              />
            </label>
            <label className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-bold sm:col-span-2">
              Evidencias demostrativas (PDF, PNG, JPG o TXT; máximo 5 MB)
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.txt"
                className="mt-2 block w-full text-sm font-normal"
                onChange={(event) => addFiles(event.target.files)}
              />
              <span className="mt-2 block text-xs font-normal text-slate-500">
                Los archivos permanecen en memoria durante esta sesión. No se
                han enviado ni almacenado en un servidor.
              </span>
            </label>

            {evidence.length ? (
              <ul className="space-y-2 sm:col-span-2" aria-label="Evidencias locales">
                {evidence.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 text-xs"
                  >
                    <span>
                      <strong>{item.name}</strong> · {item.type} · {formatBytes(item.size)} · {item.addedAt} · estado local
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setEvidence((current) =>
                          current.filter((candidate) => candidate.id !== item.id),
                        )
                      }
                      className="min-h-10 rounded-lg px-3 font-bold text-[#B00061] hover:bg-pink-50"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {errors.length ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2"
              >
                <strong>Revise lo siguiente:</strong>
                <ul className="mt-1 list-disc pl-5">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button className={primaryButtonClass}>
                Generar borrador de dictamen cívico
              </button>
              <button
                type="button"
                onClick={clearForm}
                className={secondaryButtonClass}
              >
                Limpiar formulario
              </button>
            </div>
          </form>
        </Panel>
      </div>

      {report ? (
        <Panel
          title="Borrador de dictamen cívico"
          description="Documento local de apoyo, preparado para revisión humana."
          className="print:border-0 print:p-0 print:shadow-none"
        >
          <article className="space-y-5">
            <DocumentHeader
              title="Borrador de dictamen cívico"
              folio={report.folio}
              version={report.version}
            />
            <dl className="grid gap-3 sm:grid-cols-3">
              <div><dt className="text-xs font-bold text-slate-500">Folio</dt><dd className="font-mono text-sm">{report.folio}</dd></div>
              <div><dt className="text-xs font-bold text-slate-500">Fecha</dt><dd className="text-sm">{report.createdAt}</dd></div>
              <div><dt className="text-xs font-bold text-slate-500">Versión y alcance</dt><dd className="text-sm">{report.version} · evaluación ciudadana</dd></div>
            </dl>
            <section>
              <h3 className="font-black text-[#0A4E84]">Resumen ejecutivo</h3>
              <p className="mt-1 text-sm leading-6">
                La aportación analiza {form.criterion.toLowerCase()} en {form.mission}, {form.country}, durante {form.period}. Se incorporaron {evidence.length} evidencias locales y {sourceList.length} fuentes declaradas.
              </p>
            </section>
            <div className="grid gap-5 sm:grid-cols-2">
              <section><h3 className="font-black text-[#0A4E84]">Criterios y alcance</h3><p className="mt-1 text-sm leading-6">{form.kind} · {form.criterion}. Análisis limitado a la información aportada y fuentes públicas declaradas.</p></section>
              <section><h3 className="font-black text-[#0A4E84]">Aportaciones de la diáspora</h3><p className="mt-1 text-sm leading-6">{form.contribution}</p></section>
              <section><h3 className="font-black text-[#0A4E84]">Fortalezas detectadas</h3><p className="mt-1 text-sm leading-6">Existencia de una aportación estructurada, periodo definido y fuentes identificadas para contraste ciudadano.</p></section>
              <section><h3 className="font-black text-[#0A4E84]">Riesgos o brechas</h3><p className="mt-1 text-sm leading-6">Posibles sesgos, información no verificada y necesidad de contraste independiente por especialistas.</p></section>
            </div>
            <section><h3 className="font-black text-[#0A4E84]">Fuentes incorporadas</h3><ul className="mt-1 list-disc pl-5 text-sm leading-6">{sourceList.map((source) => <li key={source}>{source}</li>)}</ul></section>
            <section><h3 className="font-black text-[#0A4E84]">Recomendaciones</h3><p className="mt-1 text-sm leading-6">Contrastar las fuentes, solicitar revisión técnica y documentar consentimiento antes de cualquier actuación externa.</p></section>
            <section><h3 className="font-black text-[#0A4E84]">Limitaciones</h3><p className="mt-1 text-sm leading-6">No verifica hechos por sí mismo, no emite conclusiones oficiales y no sustituye revisión jurídica, diplomática ni institucional.</p></section>
            <p className="break-all rounded-xl bg-slate-50 p-3 font-mono text-[10px]"><strong>Huella SHA-256 local:</strong> {report.hash}</p>
            <Notice tone="amber">Borrador ciudadano sin carácter oficial, vinculante ni diplomático. Requiere revisión humana.</Notice>
            <footer className="hidden border-t pt-3 text-xs text-slate-500 print:block">Tecnocracia Participativa México 2030 · Módulo 30 · documento demostrativo.</footer>
            <div className="flex flex-wrap gap-3 print:hidden">
              <button type="button" onClick={() => window.print()} className={primaryButtonClass}>Imprimir / guardar como PDF</button>
              <button type="button" onClick={() => setReport(null)} className={secondaryButtonClass}>Volver a editar</button>
            </div>
          </article>
        </Panel>
      ) : null}

      <p aria-live="polite" className="sr-only">{message}</p>
    </div>
  );
}
