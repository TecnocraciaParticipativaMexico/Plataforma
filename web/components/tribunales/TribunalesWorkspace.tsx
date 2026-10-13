"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import {
  courts,
  emptyDossier,
  fingerprint,
  report,
  validateDossier,
  type Dossier,
  type Finding,
} from "@/lib/tribunales/model";

type RecordEntry = { id: string; dossier: Dossier; hash: string };
const sections = [
  "Expedientes",
  "Nuevo expediente",
  "Comités y metodología",
  "Trazabilidad",
] as const;
const inputClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 focus:outline-2 focus:outline-pink-600";
const buttonClass =
  "rounded-xl bg-[#0A4E84] px-4 py-3 font-bold text-white disabled:opacity-50";
function download(content: string, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function TribunalesWorkspace() {
  const [tab, setTab] = useState<(typeof sections)[number]>("Expedientes");
  const [draft, setDraft] = useState<Dossier>(emptyDossier);
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const [activeId, setActiveId] = useState("");
  const [query, setQuery] = useState("");
  const [court, setCourt] = useState("Todos");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [consent, setConsent] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const active = records.find((r) => r.id === activeId);
  function update<K extends keyof Dossier>(key: K, value: Dossier[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }
  function updateFinding(index: number, patch: Partial<Finding>) {
    setDraft((prev) => ({
      ...prev,
      findings: prev.findings.map((f, i) =>
        i === index ? { ...f, ...patch } : f,
      ),
    }));
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError(
        "Confirma que utilizas exclusivamente información pública y anonimizada.",
      );
      return;
    }
    setBusy(true);
    try {
      const dossier = validateDossier(draft);
      const hash = await fingerprint(dossier);
      const entry = { id: editingId || crypto.randomUUID(), dossier, hash };
      setRecords((prev) => [entry, ...prev.filter((r) => r.id !== entry.id)]);
      setActiveId(entry.id);
      setNotice(
        "Borrador guardado en esta sesión. Exporta el JSON antes de cerrar o recargar la página.",
      );
      setEditingId(null);
      setDraft(emptyDossier());
      setConsent(false);
      setTab("Expedientes");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo guardar el borrador.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function importFile(file?: File) {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      if (file.size > 100000) throw new Error("El archivo excede 100 KB.");
      const parsed = JSON.parse(await file.text());
      if (parsed.format !== "TP-TAI-1" || typeof parsed.hash !== "string")
        throw new Error("Formato de expediente no admitido.");
      const dossier = validateDossier(parsed.dossier);
      const hash = await fingerprint(dossier);
      if (hash !== parsed.hash)
        throw new Error(
          "La huella no coincide: el contenido cambió o está dañado.",
        );
      setDraft(dossier);
      setEditingId(null);
      setConsent(false);
      setTab("Nuevo expediente");
      setNotice(
        "Contenido y huella coinciden. Revisa las fuentes y confirma el uso de información pública antes de guardar; la huella no acredita autenticidad.",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo importar.");
    } finally {
      setBusy(false);
    }
  }
  const visible = records.filter(
    (r) =>
      (court === "Todos" || r.dossier.court === court) &&
      `${r.dossier.title} ${r.dossier.issuer} ${r.dossier.summary}`
        .toLocaleLowerCase("es")
        .includes(query.toLocaleLowerCase("es")),
  );
  return (
    <main lang="es" className="min-h-screen bg-[#F7F7F5] text-slate-800">
      <ModuleIdentityHeader
        label="MÓDULO 07 · MÉXICO 2030"
        title="Tribunales de Alta Integridad"
        description="Contraste jurídico ciudadano de resoluciones de impacto estructural: técnico, documentado y no vinculante."
      >
        <nav
          aria-label="Navegación institucional"
          className="flex flex-wrap gap-4 text-sm font-bold text-[#E4007C]"
        >
          <Link href="/">Inicio</Link>
          <Link href="/modulos">Panel General de Módulos</Link>
          <Link href="/comites">Comités ciudadanos</Link>
        </nav>
      </ModuleIdentityHeader>
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 pb-32">
        <section className="rounded-2xl border-l-4 border-[#FFC20E] bg-white p-4 text-sm leading-6">
          <h2 className="font-bold text-[#0A4E84]">Fundamento y alcance</h2>
          <p>
            Los artículos 6º y 7º constitucionales protegen el acceso a
            información y la difusión de ideas; el 8º regula la petición
            pacífica y respetuosa. El contraste ciudadano no confiere facultades
            jurisdiccionales, no revoca resoluciones ni sustituye recursos
            legales.{" "}
            <a
              className="text-[#0A4E84] underline"
              href="https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Consultar Constitución
            </a>
            .
          </p>
        </section>
        <section className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6">
          <h2 className="font-bold">
            Herramientas documentales activas · Operación colegiada pendiente
          </h2>
          <p>
            Expedientes personales en memoria, matriz manual, importación,
            exportación y SHA-256 funcionan con tus datos. No hay casos
            simulados, votos oficiales, IA conectada ni dictámenes publicados.
            Al recargar se pierden los borradores sin exportar. Usa únicamente
            versiones públicas anonimizadas; no ingreses datos sensibles.
          </p>
        </section>
        <div role="status" aria-live="polite">
          {notice}
        </div>
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">
            {error}
          </p>
        )}
        <nav aria-label="Secciones del módulo" className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <button
              key={s}
              type="button"
              aria-current={tab === s ? "page" : undefined}
              onClick={() => setTab(s)}
              className={`${buttonClass} ${tab === s ? "bg-[#E4007C]" : ""}`}
            >
              {s}
            </button>
          ))}
        </nav>
        {tab === "Expedientes" && (
          <section className="space-y-4">
            <div className="grid gap-4 rounded-2xl bg-white p-5 sm:grid-cols-2">
              <label>
                Buscar expediente
                <input
                  className={inputClass}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <label>
                Filtrar por tribunal
                <select
                  className={inputClass}
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                >
                  {["Todos", ...courts].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Importar borrador JSON
                <input
                  className={inputClass}
                  type="file"
                  accept="application/json,.json"
                  disabled={busy}
                  onChange={(e) => {
                    void importFile(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </label>
              <button
                className={buttonClass}
                onClick={() => {
                  setEditingId(null);
                  setDraft(emptyDossier());
                  setConsent(false);
                  setTab("Nuevo expediente");
                }}
              >
                Crear expediente público
              </button>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
              <div className="space-y-3">
                {visible.length === 0 && (
                  <p className="rounded-2xl bg-white p-5">
                    No hay expedientes que coincidan. Crea uno con una fuente
                    pública verificable.
                  </p>
                )}
                {visible.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveId(r.id)}
                    aria-pressed={r.id === activeId}
                    className="w-full rounded-2xl border border-slate-300 bg-white p-5 text-left focus:outline-2 focus:outline-pink-600"
                  >
                    <strong className="block text-[#0A4E84]">
                      {r.dossier.title}
                    </strong>
                    <span>{r.dossier.court} · Borrador personal</span>
                  </button>
                ))}
              </div>
              {active && (
                <article className="min-w-0 space-y-4 rounded-2xl bg-white p-5">
                  <h2 className="text-xl font-bold text-[#0A4E84]">
                    {active.dossier.title}
                  </h2>
                  <p>
                    {active.dossier.issuer} · {active.dossier.date}
                  </p>
                  <a
                    href={active.dossier.source}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-[#0A4E84] underline"
                  >
                    Abrir fuente pública
                  </a>
                  <p className="whitespace-pre-wrap">
                    {active.dossier.summary}
                  </p>
                  <h3 className="font-bold">Impacto institucional</h3>
                  <p className="whitespace-pre-wrap">{active.dossier.impact}</p>
                  {active.dossier.ongoing && (
                    <p className="text-amber-800">
                      Asunto en curso: este borrador no debe interferir con
                      actos procesales.
                    </p>
                  )}
                  <h3 className="font-bold">
                    Matriz de consistencia · valoraciones aportadas por el
                    usuario
                  </h3>
                  {active.dossier.findings.map((f) => (
                    <section
                      key={f.layer}
                      className="rounded-xl border border-slate-200 p-3"
                    >
                      <h4 className="font-bold">
                        {f.layer} · {f.result}
                      </h4>
                      <p className="whitespace-pre-wrap">
                        {f.reasoning || "Razonamiento pendiente"}
                      </p>
                      {f.source && (
                        <a
                          href={f.source}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all underline"
                        >
                          Referencia pública
                        </a>
                      )}
                    </section>
                  ))}
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={buttonClass}
                      onClick={() => {
                        setEditingId(active.id);
                        setDraft(structuredClone(active.dossier));
                        setConsent(false);
                        setTab("Nuevo expediente");
                      }}
                    >
                      Editar borrador
                    </button>
                    <button
                      className={buttonClass}
                      onClick={() =>
                        download(
                          JSON.stringify(
                            {
                              format: "TP-TAI-1",
                              dossier: active.dossier,
                              hash: active.hash,
                            },
                            null,
                            2,
                          ),
                          "tribunales-borrador.json",
                          "application/json",
                        )
                      }
                    >
                      Exportar JSON
                    </button>
                    <button
                      className={buttonClass}
                      onClick={() =>
                        download(
                          report(active.dossier, active.hash),
                          "tribunales-informe.txt",
                          "text/plain;charset=utf-8",
                        )
                      }
                    >
                      Descargar informe
                    </button>
                    <button
                      className={buttonClass}
                      onClick={() => {
                        if (confirm("¿Eliminar este borrador de la sesión?")) {
                          setRecords((prev) =>
                            prev.filter((r) => r.id !== active.id),
                          );
                          setActiveId("");
                          setNotice("Borrador eliminado de la sesión.");
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              )}
            </div>
          </section>
        )}
        {tab === "Nuevo expediente" && (
          <form onSubmit={save} className="space-y-5 rounded-2xl bg-white p-5">
            <h2 className="text-xl font-bold text-[#0A4E84]">
              {editingId ? "Editar" : "Documentar"} resolución pública
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  { key: "title", label: "Título", max: 200 },
                  { key: "issuer", label: "Órgano emisor", max: 200 },
                  { key: "date", label: "Fecha de resolución", max: 10 },
                  {
                    key: "source",
                    label: "URL HTTPS de la resolución pública",
                    max: 2000,
                  },
                ] as const
              ).map((f) => (
                <label key={f.key}>
                  {f.label}
                  <input
                    className={inputClass}
                    required
                    type={f.key === "source" ? "url" : "text"}
                    placeholder={f.key === "date" ? "AAAA-MM-DD" : undefined}
                    pattern={f.key === "date" ? "[0-9]{4}-[0-9]{2}-[0-9]{2}" : undefined}
                    maxLength={f.max}
                    value={draft[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                  />
                </label>
              ))}
              <label>
                Tribunal
                <select
                  className={inputClass}
                  value={draft.court}
                  onChange={(e) =>
                    update("court", e.target.value as Dossier["court"])
                  }
                >
                  {courts.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              Síntesis pública
              <textarea
                className={inputClass}
                rows={4}
                required
                maxLength={12000}
                value={draft.summary}
                onChange={(e) => update("summary", e.target.value)}
              />
            </label>
            <label className="block">
              Justificación del impacto estructural y efectos institucionales
              <textarea
                className={inputClass}
                required
                rows={3}
                maxLength={4000}
                value={draft.impact}
                onChange={(e) => update("impact", e.target.value)}
              />
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={draft.ongoing}
                onChange={(e) => update("ongoing", e.target.checked)}
              />
              Asunto en curso; el análisis no interferirá con actuaciones
              procesales.
            </label>
            <h3 className="font-bold">Cinco capas de contraste</h3>
            <p>
              Documenta precedentes, pruebas y estándares con referencias
              verificables. Las valoraciones pendientes no producen conclusiones
              automáticas.
            </p>
            {draft.findings.map((f, i) => (
              <fieldset
                key={f.layer}
                className="space-y-3 rounded-xl border border-slate-200 p-4"
              >
                <legend className="px-2 font-bold">{f.layer}</legend>
                <label className="block">
                  Fuente o precedente público
                  <input
                    className={inputClass}
                    type="url"
                    maxLength={2000}
                    value={f.source}
                    onChange={(e) =>
                      updateFinding(i, { source: e.target.value })
                    }
                  />
                </label>
                <label className="block">
                  Razonamiento, omisiones y contraste
                  <textarea
                    className={inputClass}
                    rows={3}
                    maxLength={6000}
                    value={f.reasoning}
                    onChange={(e) =>
                      updateFinding(i, { reasoning: e.target.value })
                    }
                  />
                </label>
                <label className="block">
                  Valoración provisional
                  <select
                    className={inputClass}
                    value={f.result}
                    onChange={(e) =>
                      updateFinding(i, {
                        result: e.target.value as Finding["result"],
                      })
                    }
                  >
                    {["Pendiente", "Consistente", "Requiere contraste"].map(
                      (r) => (
                        <option key={r}>{r}</option>
                      ),
                    )}
                  </select>
                </label>
              </fieldset>
            ))}
            <label className="flex gap-2">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              Confirmo que la información es pública y anonimizada, sin datos
              personales sensibles ni imputaciones personales.
            </label>
            <button className={buttonClass} disabled={busy}>
              {busy
                ? "Verificando contenido…"
                : "Guardar borrador y calcular SHA-256"}
            </button>
          </form>
        )}
        {tab === "Comités y metodología" && (
          <section className="space-y-5 rounded-2xl bg-white p-5">
            <h2 className="text-xl font-bold text-[#0A4E84]">
              Deliberación humana e independencia
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {courts.map((c) => (
                <article
                  key={c}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <h3 className="font-bold">Tribunal {c}</h3>
                  <p>
                    {c === "Constitucional"
                      ? "Reformas, leyes y decisiones de impacto constitucional."
                      : c === "Electoral"
                        ? "Representación, validez, financiamiento y equidad electoral."
                        : "Contratación, concesiones, regulación y presupuesto."}
                  </p>
                </article>
              ))}
            </div>
            <p>
              Integración por asunto con 9 a 15 expertos; con 5 a 7, revisión
              cruzada y doble validación metodológica. Rotación obligatoria,
              evaluación técnica previa, declaraciones de conflictos
              actualizadas, suplencias acreditadas y código de ética.
            </p>
            <ol className="list-inside list-decimal space-y-2">
              <li>Análisis individual fundado y verificación de fuentes.</li>
              <li>Contraste técnico y deliberación metodológica.</li>
              <li>
                Dictamen colegiado y publicación de votos razonados,
                concurrentes y disidentes.
              </li>
            </ol>
            <p>
              La inconsistencia fuerte requiere un umbral documentado de entre
              60% y 70%, aprobado antes de deliberar. No hay voto de calidad ni
              presidencia permanente. La ponderación técnica debe ser limitada,
              definida previamente y auditable.
            </p>
            <p>
              La ciudadanía prioriza asuntos y audita el desempeño agregado; no
              decide el contenido técnico. IA pendiente de integración: no emite
              conclusiones ni autoriza acciones.
            </p>
            <p className="rounded-xl bg-amber-50 p-4">
              Acreditación, votos, deliberación y publicación oficial
              deshabilitados: faltan permisos por recurso, políticas RLS
              verificadas, registro de auditoría persistente y controles de
              repetición. Este módulo no reutiliza las rutas de votación
              existentes para esas operaciones.
            </p>
            <Link
              href="/comites"
              className="inline-block text-[#E4007C] underline"
            >
              Consultar el área general de comités
            </Link>
          </section>
        )}
        {tab === "Trazabilidad" && (
          <section className="space-y-4 rounded-2xl bg-white p-5">
            <h2 className="text-xl font-bold text-[#0A4E84]">
              Integridad documental verificable
            </h2>
            <p>
              SHA-256 se calcula sobre el JSON normalizado del expediente. La
              importación valida el esquema y recalcula la huella; rechaza
              contenido alterado. No es una firma digital, prueba de autoría,
              cadena inmutable ni sello de tiempo certificado. Las versiones
              anteriores deben conservarse mediante exportación.
            </p>
            {records.map((r) => (
              <article
                key={r.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <h3 className="font-bold">{r.dossier.title}</h3>
                <code className="block break-all text-sm">{r.hash}</code>
                <button
                  className="mt-3 text-[#0A4E84] underline"
                  onClick={async () => {
                    try {
                      setNotice(
                        (await fingerprint(r.dossier)) === r.hash
                          ? "Contenido de la sesión íntegro; autenticidad no certificada."
                          : "Contenido alterado.",
                      );
                    } catch {
                      setError("No fue posible comprobar la huella.");
                    }
                  }}
                >
                  Recalcular y verificar
                </button>
              </article>
            ))}
            {records.length === 0 && (
              <p>Aún no hay huellas: guarda un expediente para comenzar.</p>
            )}
          </section>
        )}
        <PlatformFooterBanner />
      </div>
      <PlatformBottomNav />
    </main>
  );
}
