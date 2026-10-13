"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConfirmation, ConfirmationDialog } from "./ConfirmationDialog";
import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
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

import {
  appendVersion,
  encryptArchive,
  decryptArchive,
  type RecordEntry,
} from "@/lib/tribunales/archive";
import { buildTribunalesPdf } from "@/lib/tribunales/pdf";
import { downloadPdf } from "@/lib/pdf/institutionalDocument";
import { OperationsReadiness } from "./OperationsReadiness";
const sections = [
  "Expedientes",
  "Nuevo expediente",
  "Comités y metodología",
  "Trazabilidad",
  "Operación institucional",
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
  const router = useRouter();
  const confirmation = useConfirmation();
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
  const [password, setPassword] = useState("");
  const [backupCurrent, setBackupCurrent] = useState(false);
  const active = records.find((r) => r.id === activeId);
  const draftDirty = JSON.stringify(draft) !== JSON.stringify(emptyDossier());
  const atRisk = !backupCurrent && (draftDirty || records.length > 0);
  useEffect(() => {
    if (!atRisk) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [atRisk]);
  function guardNavigation(event: MouseEvent<HTMLElement>) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (atRisk && anchor && !anchor.target && href?.startsWith("/")) {
      event.preventDefault();
      event.stopPropagation();
      void confirmation
        .ask(
          "Hay borradores sin respaldo o cambios sin guardar. Exporta un archivo cifrado para conservarlos. ¿Salir de todas formas?",
        )
        .then((confirmed) => {
          if (confirmed) router.push(href);
        });
    }
  }
  async function resetDraft() {
    if (
      busy ||
      (draftDirty &&
        !(await confirmation.ask(
          "¿Descartar los cambios del formulario actual?",
        )))
    )
      return;
    setEditingId(null);
    setDraft(emptyDossier());
    setConsent(false);
    setTab("Nuevo expediente");
  }
  function update<K extends keyof Dossier>(key: K, value: Dossier[K]) {
    setBackupCurrent(false);
    setDraft((prev) => ({ ...prev, [key]: value }));
  }
  function updateFinding(index: number, patch: Partial<Finding>) {
    setBackupCurrent(false);
    setDraft((prev) => ({
      ...prev,
      findings: prev.findings.map((f, i) =>
        i === index ? { ...f, ...patch } : f,
      ),
    }));
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
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
      if (!editingId && records.length >= 20)
        throw new Error("Límite de 20 expedientes por archivo de trabajo.");
      const entry = await appendVersion(
        dossier,
        records.find((r) => r.id === editingId),
      );
      setRecords((prev) => [entry, ...prev.filter((r) => r.id !== entry.id)]);
      setBackupCurrent(false);
      setActiveId(entry.id);
      setNotice(
        "Borrador guardado en esta sesión. Descarga un respaldo cifrado o exporta el JSON antes de cerrar o recargar la página.",
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
    if (
      draftDirty &&
      !(await confirmation.ask(
        "¿Reemplazar los cambios del formulario con el expediente importado?",
      ))
    )
      return;
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
  async function backup() {
    setBusy(true);
    setError("");
    try {
      if (!records.length && !draftDirty)
        throw new Error("No hay expedientes o formulario para respaldar.");
      const encrypted = await encryptArchive(
        {
          format: "TP-TAI-WORKSPACE-1",
          records,
          ...(draftDirty ? { draft: { data: draft, editingId } } : {}),
        },
        password,
      );
      download(
        encrypted,
        "tribunales-trabajo-cifrado.json",
        "application/json",
      );
      setBackupCurrent(true);
      setPassword("");
      setNotice(
        "Archivo cifrado generado. Confirma que la descarga se guardó y conserva la contraseña por separado. No existe copia en el servidor.",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "No fue posible respaldar.");
    } finally {
      setBusy(false);
    }
  }
  async function restore(file?: File) {
    if (!file) return;
    if (
      (records.length || draftDirty) &&
      !(await confirmation.ask(
        "¿Reemplazar esta sesión por el archivo cifrado? Exporta primero cualquier cambio que quieras conservar.",
      ))
    )
      return;
    setBusy(true);
    setError("");
    try {
      if (file.size > 4000000) throw new Error("Archivo mayor de 4 MB.");
      const archive = await decryptArchive(await file.text(), password);
      setRecords(archive.records);
      setActiveId(archive.records[0]?.id ?? "");
      setDraft(archive.draft?.data ?? emptyDossier());
      setEditingId(archive.draft?.editingId ?? null);
      setConsent(false);
      setBackupCurrent(true);
      setPassword("");
      setTab(archive.draft ? "Nuevo expediente" : "Expedientes");
      setNotice(
        "Archivo cifrado recuperado y versiones locales verificadas. El formulario recuperado aún requiere validación al guardar. No es un registro institucional.",
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo recuperar el archivo.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function exportPdf(entry: RecordEntry) {
    setBusy(true);
    setError("");
    try {
      const bytes = await buildTribunalesPdf(
        entry.dossier,
        entry.versions.length,
        "/branding/logo-tecnocracia.png",
      );
      downloadPdf(bytes, "tribunales-informe.pdf");
      setNotice(
        "PDF institucional generado como borrador personal no vinculante.",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "No fue posible crear el PDF.");
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
    <main
      lang="es"
      onClickCapture={guardNavigation}
      className="min-h-screen bg-[#F7F7F5] text-slate-800"
    >
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
            Respalda los expedientes mediante archivo cifrado para recuperarlos;
            no se guardan en el navegador ni en el servidor. Usa únicamente
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
              disabled={busy}
              aria-current={tab === s ? "page" : undefined}
              onClick={() => setTab(s)}
              className={`${buttonClass} ${tab === s ? "bg-[#E4007C]" : ""}`}
            >
              {s}
            </button>
          ))}
        </nav>
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-[#0A4E84]">
            Respaldo cifrado de trabajo
          </h2>
          <p className="text-sm">
            Conserva los expedientes, sus versiones locales y el formulario
            actual, incluso incompleto, en un archivo protegido con AES-GCM. La
            contraseña permanece sólo en memoria y no puede recuperarse. El JSON
            individual y el PDF se exportan sin cifrar.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <label>
              Contraseña del archivo
              <input
                className={inputClass}
                type="password"
                autoComplete="off"
                minLength={12}
                maxLength={256}
                value={password}
                disabled={busy}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="button"
              className={buttonClass}
              disabled={busy || (records.length === 0 && !draftDirty)}
              onClick={() => void backup()}
            >
              Descargar respaldo cifrado
            </button>
            <label>
              Recuperar archivo cifrado
              <input
                type="file"
                className={inputClass}
                accept="application/json,.json"
                disabled={busy}
                onChange={(e) => {
                  void restore(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
          <p className="text-sm">
            {backupCurrent
              ? "Respaldo generado o recuperado; comprueba que conservas el archivo."
              : "Los expedientes de esta sesión aún requieren respaldo."}
          </p>
        </section>
        {tab === "Operación institucional" && <OperationsReadiness />}
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
                disabled={busy}
                onClick={resetDraft}
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
                      <p className="text-sm">
                        Preparación personal: {f.reviewState || "Pendiente"}.{" "}
                        {f.reviewNote}
                      </p>
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
                      onClick={async () => {
                        if (
                          busy ||
                          (draftDirty &&
                            !(await confirmation.ask(
                              "¿Descartar los cambios del formulario para editar este expediente?",
                            )))
                        )
                          return;
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
                      type="button"
                      className={buttonClass}
                      disabled={busy}
                      onClick={() => void exportPdf(active)}
                    >
                      Descargar PDF institucional
                    </button>
                    <button
                      className={buttonClass}
                      disabled={busy}
                      onClick={async () => {
                        if (
                          !busy &&
                          (await confirmation.ask(
                            "¿Eliminar este borrador de la sesión?",
                          ))
                        ) {
                          setRecords((prev) =>
                            prev.filter((r) => r.id !== active.id),
                          );
                          setActiveId("");
                          setBackupCurrent(false);
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
            <fieldset disabled={busy} className="space-y-5">
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
                      pattern={
                        f.key === "date"
                          ? "[0-9]{4}-[0-9]{2}-[0-9]{2}"
                          : undefined
                      }
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
                verificables. Las valoraciones pendientes no producen
                conclusiones automáticas.
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
                  <label className="block">
                    Estado de preparación personal
                    <select
                      className={inputClass}
                      value={f.reviewState || "Pendiente"}
                      onChange={(e) =>
                        updateFinding(i, {
                          reviewState: e.target.value as Finding["reviewState"],
                        })
                      }
                    >
                      {[
                        "Pendiente",
                        "Preparada para revisión",
                        "Requiere aclaración",
                      ].map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Justificación o preguntas para revisión
                    <textarea
                      className={inputClass}
                      rows={2}
                      maxLength={2000}
                      value={f.reviewNote || ""}
                      onChange={(e) =>
                        updateFinding(i, { reviewNote: e.target.value })
                      }
                    />
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
            </fieldset>
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
                <details className="mt-3">
                  <summary className="cursor-pointer font-bold">
                    {r.versions.length} versiones locales verificables
                  </summary>
                  <p className="text-sm">
                    Historial personal conservable en el archivo cifrado; no es
                    auditoría institucional ni sello de tiempo.
                  </p>
                  {r.versions.map((v) => (
                    <div key={v.number} className="mt-3 border-t pt-2">
                      <p>
                        Versión {v.number} · fecha del dispositivo:{" "}
                        {v.createdAt}
                      </p>
                      <code className="block break-all text-xs">
                        Contenido: {v.contentHash}
                      </code>
                      <code className="block break-all text-xs">
                        Cadena local: {v.hash}
                      </code>
                      <button
                        type="button"
                        className="mt-2 underline"
                        disabled={busy}
                        onClick={async () => {
                          if (
                            !draftDirty ||
                            (await confirmation.ask(
                              "¿Descartar el formulario actual y recuperar esta versión?",
                            ))
                          ) {
                            setDraft(structuredClone(v.dossier));
                            setEditingId(r.id);
                            setConsent(false);
                            setTab("Nuevo expediente");
                            setNotice(
                              "Versión recuperada al formulario; al guardar se añade una nueva versión, sin borrar el historial.",
                            );
                          }
                        }}
                      >
                        Recuperar versión al formulario
                      </button>
                    </div>
                  ))}
                </details>
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
        <ConfirmationDialog
          request={confirmation.request}
          finish={confirmation.finish}
        />
        <PlatformFooterBanner />
      </div>
      <PlatformBottomNav />
    </main>
  );
}
