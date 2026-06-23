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
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <div className="mb-3 inline-flex rounded-full bg-[#CEF7FA] px-3 py-1 text-xs font-bold uppercase text-[#006C73]">
        Evidencias locales
      </div>
      <h2 className="text-xl font-bold text-[#0A4E84]">Inventario de evidencias</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Los archivos permanecen en este dispositivo en esta versión MVP. Solo se guarda metadata y hash; no se suben archivos a servidor.
      </p>

      <div className="mt-5 rounded-2xl border border-dashed border-[#00A6B2] bg-[#F8FAFC] p-5">
        <label className="block">
          <span className="text-sm font-bold text-[#0A4E84]">Fuente o contexto opcional</span>
          <input
            value={defaultSourceContext}
            onChange={(event) => setDefaultSourceContext(event.target.value.slice(0, 160))}
            placeholder="Ej. fotografía tomada por la persona reportante, documento recibido, captura de pantalla"
            className="mt-2 w-full rounded-2xl border border-[#BFC8CF] bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#E4007C]"
          />
        </label>
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={(event) => void handleFiles(event.target.files)}
          className="mt-4 block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-[#0A4E84] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#083E69]"
        />
        <p className="mt-3 text-xs leading-5 text-slate-600">
          Máximo {MAX_FILES} archivos, 15 MB por archivo. El contenido se lee únicamente para calcular SHA-256 local. No se lee EXIF ni geolocalización.
        </p>
        {isHashing ? <p className="mt-3 text-sm font-bold text-[#E4007C]">Calculando hashes locales...</p> : null}
        {notice ? <p className="mt-3 text-sm font-semibold text-[#0A4E84]">{notice}</p> : null}
      </div>

      <div className="mt-5 space-y-3">
        {evidence.length === 0 ? (
          <div className="rounded-2xl bg-[#FFF8F0] p-4 text-sm leading-6 text-slate-700">Todavía no hay evidencias agregadas.</div>
        ) : (
          evidence.map((item) => (
            <article key={item.id} className="rounded-2xl bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#0A4E84] px-3 py-1 text-xs font-bold text-white">{item.localId}</span>
                    <span className="rounded-full bg-[#D8F3DC] px-3 py-1 text-xs font-bold text-[#1F5F24]">Registrada en este dispositivo</span>
                  </div>
                  <h3 className="mt-3 break-words font-bold text-[#0A4E84]">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{formatBytes(item.size)} · {item.type} · {formatTimestamp(item.addedAt)}</p>
                  <label className="mt-3 block">
                    <span className="text-xs font-bold uppercase text-slate-500">Fuente/contexto</span>
                    <input
                      value={item.sourceContext}
                      onChange={(event) => onEvidenceUpdated({ ...item, sourceContext: event.target.value.slice(0, 160) })}
                      className="mt-1 w-full rounded-xl border border-[#BFC8CF] bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#E4007C]"
                    />
                  </label>
                  <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-700">SHA-256: {item.sha256}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onEvidenceRemoved(item)}
                  className="rounded-full bg-[#FFE0DC] px-4 py-2 text-sm font-bold text-[#B43A32] transition hover:bg-[#FFC9C2]"
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
