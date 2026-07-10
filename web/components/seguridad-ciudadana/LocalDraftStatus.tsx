type LocalDraftStatusProps = {
  folio: string;
  lastSavedAt: string | null;
  restored: boolean;
  onClearDraft: () => void;
};

function formatSavedDate(value: string | null): string {
  if (!value) return "Pendiente de guardar";
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function LocalDraftStatus({ folio, lastSavedAt, restored, onClearDraft }: LocalDraftStatusProps) {
  return (
    <aside className="h-full rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white shadow-md">
      <div className="inline-flex rounded-full bg-[#FFC20E] px-3 py-1 text-xs font-bold uppercase text-slate-950">Borrador local</div>
      <h2 className="mt-3 break-words font-mono text-lg font-bold">{folio}</h2>
      <p className="mt-2 text-sm leading-6 text-white/85">
        {restored ? "Borrador recuperado de este navegador." : "Borrador activo en este navegador."}
      </p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
        <div className="text-xs font-bold uppercase text-white/70">Último guardado</div>
        <div className="mt-1 text-sm font-semibold">{formatSavedDate(lastSavedAt)}</div>
      </div>
      <button
        type="button"
        onClick={onClearDraft}
        className="mt-4 w-full rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-[#FFC20E]"
      >
        Limpiar borrador
      </button>
    </aside>
  );
}
