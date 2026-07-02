import { useRef, useState } from "react";
import { sha256File } from "@/lib/seguridad-ciudadana/hash";
import { createEvidenceLocalId, createId } from "@/lib/seguridad-ciudadana/localDrafts";
import type { EvidenceItem } from "@/lib/seguridad-ciudadana/types";

const MAX_FILES = 8;
const MAX_FILE_SIZE = 15 * 1024 * 1024;

type EvidenceUploaderProps = {
  evidence: EvidenceItem[];
  onEvidenceAdded: (items: EvidenceItem[]) => void;
  onEvidenceRemoved: (item: EvidenceItem) => void;
  onEvidenceUpdated: (item: EvidenceItem) => void;
};

function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function EvidenceUploader({ evidence, onEvidenceAdded, onEvidenceRemoved, onEvidenceUpdated }: EvidenceUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHashing, setIsHashing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [defaultSourceContext, setDefaultSourceContext] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    const availableSlots = MAX_FILES - evidence.length;
    const selected = Array.from(files).slice(0, Math.max(availableSlots, 0));
    const rejectedByCount = files.length > selected.length;
    const accepted = selected.filter((file) => file.size <= MAX_FILE_SIZE);
    const rejectedBySize = selected.length - accepted.length;

    if (!availableSlots) {
      setNotice(`Límite alcanzado: máximo ${MAX_FILES} archivos por borrador.`);
      return;
    }

    setIsHashing(true);
    try {
      const hashedItems = await Promise.all(
        accepted.map(async (file, index) => ({
          id: createId("ev"),
          localId: createEvidenceLocalId(evidence.length + index),
          name: file.name,
          size: file.size,
          type: file.type || "tipo no declarado",
          sha256: await sha256File(file),
          addedAt: new Date().toISOString(),
          sourceContext: defaultSourceContext.trim() || "Contexto no indicado",
          localStatus: "registrada_en_dispositivo" as const,
        })),
      );

      if (hashedItems.length) onEvidenceAdded(hashedItems);

      const notices = [
        rejectedByCount ? `Se omitieron archivos por exceder el máximo de ${MAX_FILES}.` : "",
        rejectedBySize ? `Se omitieron ${rejectedBySize} archivo(s) por superar 15 MB.` : "",
        hashedItems.length ? "Hash SHA-256 calculado localmente con Web Crypto API." : "",
      ].filter(Boolean);
      setNotice(notices.join(" ") || null);
    } finally {
      setIsHashing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-3 inline-flex rounded-full bg-[#39B54A]/15 px-3 py-1 text-xs font-bold uppercase text-[#1F5F24]">
        Evidencias locales
      </div>
      <h2 className="text-xl font-bold text-slate-950">Inventario de evidencias</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Los archivos permanecen en este dispositivo en esta versión MVP. Solo se guarda metadata y hash; no se suben archivos a servidor.
      </p>

      <div className="mt-5 rounded-2xl border border-dashed border-[#0054A6] bg-slate-50 p-5">
        <label className="block">
          <span className="text-sm font-bold text-slate-800">Fuente o contexto opcional</span>
          <input
            value={defaultSourceContext}
            onChange={(event) => setDefaultSourceContext(event.target.value.slice(0, 160))}
            placeholder="Ej. fotografía tomada por la persona reportante, documento recibido, captura de pantalla"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#E5007D] focus:ring-2 focus:ring-[#E5007D]/20"
          />
        </label>
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={(event) => void handleFiles(event.target.files)}
          className="mt-4 block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-[#E5007D] file:to-[#702F8A] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
        />
        <p className="mt-3 text-xs leading-5 text-slate-600">
          Máximo {MAX_FILES} archivos, 15 MB por archivo. El contenido se lee únicamente para calcular SHA-256 local. No se lee EXIF ni geolocalización.
        </p>
        {isHashing ? <p className="mt-3 text-sm font-bold text-[#E5007D]">Calculando hashes locales...</p> : null}
        {notice ? <p className="mt-3 rounded-xl bg-white p-3 text-sm font-semibold text-[#0054A6] ring-1 ring-slate-200">{notice}</p> : null}
      </div>

      <div className="mt-5 space-y-3">
        {evidence.length === 0 ? (
          <div className="rounded-2xl border-l-4 border-[#FFC20E] bg-[#FFC20E]/10 p-4 text-sm leading-6 text-slate-700">Todavía no hay evidencias agregadas.</div>
        ) : (
          evidence.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#0054A6] px-3 py-1 text-xs font-bold text-white">{item.localId}</span>
                    <span className="rounded-full bg-[#39B54A]/15 px-3 py-1 text-xs font-bold text-[#1F5F24]">Registrada en este dispositivo</span>
                  </div>
                  <h3 className="mt-3 break-words font-bold text-slate-950">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{formatBytes(item.size)} · {item.type} · {formatTimestamp(item.addedAt)}</p>
                  <label className="mt-3 block">
                    <span className="text-xs font-bold uppercase text-slate-500">Fuente/contexto</span>
                    <input
                      value={item.sourceContext}
                      onChange={(event) => onEvidenceUpdated({ ...item, sourceContext: event.target.value.slice(0, 160) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#E5007D]"
                    />
                  </label>
                  <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-700">SHA-256: {item.sha256}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onEvidenceRemoved(item)}
                  className="rounded-full bg-[#E5007D]/10 px-4 py-2 text-sm font-bold text-[#B00061] transition hover:bg-[#E5007D] hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
