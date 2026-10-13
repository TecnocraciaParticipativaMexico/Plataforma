"use client";
import { useEffect, useRef, useState } from "react";

export function useConfirmation() {
  const [request, setRequest] = useState<{
    message: string;
    resolve: (confirmed: boolean) => void;
  } | null>(null);
  function ask(message: string): Promise<boolean> {
    if (request) return Promise.resolve(false);
    return new Promise((resolve) => setRequest({ message, resolve }));
  }
  function finish(confirmed: boolean) {
    request?.resolve(confirmed);
    setRequest(null);
  }
  return { ask, request, finish };
}
export function ConfirmationDialog({
  request,
  finish,
}: Pick<ReturnType<typeof useConfirmation>, "request" | "finish">) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (request) ref.current?.showModal();
    else ref.current?.close();
  }, [request]);
  return (
    <dialog
      ref={ref}
      aria-labelledby="tai-confirm-title"
      aria-describedby="tai-confirm-message"
      onCancel={(event) => {
        event.preventDefault();
        finish(false);
      }}
      className="m-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-xl backdrop:bg-slate-900/50"
    >
      <h2 id="tai-confirm-title" className="text-xl font-bold text-[#0A4E84]">
        Conservar borradores
      </h2>
      <p id="tai-confirm-message" className="my-4">
        {request?.message}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          autoFocus
          type="button"
          className="rounded-xl border border-slate-300 px-4 py-3 font-bold"
          onClick={() => finish(false)}
        >
          Cancelar y conservar
        </button>
        <button
          type="button"
          className="rounded-xl bg-[#0A4E84] px-4 py-3 font-bold text-white"
          onClick={() => finish(true)}
        >
          Continuar
        </button>
      </div>
    </dialog>
  );
}
