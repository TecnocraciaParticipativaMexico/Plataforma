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
    <aside className="rounded-[24px] bg-[#0A4E84] p-5 text-white shadow-sm">
      <div className="inline-flex rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold uppercase text-[#1F2937]">Borrador local</div>
      <h2 className="mt-3 text-xl font-bold">{folio}</h2>
      <p className="mt-2 text-sm leading-6 text-white/85">
        {restored ? "Borrador recuperado de este navegador." : "Borrador activo en este navegador."}
      </p>
      <div className="mt-4 rounded-2xl bg-white/10 p-4">
        <div className="text-xs font-bold uppercase text-white/70">Último guardado</div>
        <div className="mt-1 text-sm font-semibold">{formatSavedDate(lastSavedAt)}</div>
      </div>
      <button
        type="button"
        onClick={onClearDraft}
        className="mt-4 w-full rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0A4E84] transition hover:bg-[#E0F2FE]"
      >
        Limpiar borrador
      </button>
    </aside>
  );
}
