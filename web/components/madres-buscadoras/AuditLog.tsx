import type { SearchCaseDataset } from "@/lib/madres-buscadoras/types";
import { formatDateTime } from "@/lib/madres-buscadoras/utils";

type Props = {
  dataset: SearchCaseDataset;
};

export function AuditLog({ dataset }: Props) {
  return (
    <section className="space-y-5">
      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Auditoria e integridad</p>
        <h2 className="mt-1 text-2xl font-black text-[#0A4E84]">Bitacora tecnica</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-700">
          Historial append-only simulado y registro local de integridad. Cuando exista una huella SHA-256, se muestra como dato tecnico generado
          o precargado en el entorno de prueba. Esta vista no garantiza resguardo externo ni verificacion independiente.
        </p>
      </article>

      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-500">
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Actor</th>
                <th className="px-3 py-2">Accion</th>
                <th className="px-3 py-2">Recurso</th>
                <th className="px-3 py-2">Version</th>
                <th className="px-3 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {dataset.auditEvents.map((event) => (
                <tr key={event.id} className="bg-[#F8FAFC]">
                  <td className="rounded-l-2xl px-3 py-3 font-mono text-xs">{event.id}</td>
                  <td className="px-3 py-3">{formatDateTime(event.occurredAt)}</td>
                  <td className="px-3 py-3">{event.actorRole}</td>
                  <td className="px-3 py-3 font-bold text-[#0A4E84]">{event.action}</td>
                  <td className="px-3 py-3">{event.resource}</td>
                  <td className="px-3 py-3">{event.version}</td>
                  <td className="rounded-r-2xl px-3 py-3">{event.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <h3 className="text-xl font-black text-[#0A4E84]">Huellas tecnicas disponibles</h3>
        <div className="mt-4 space-y-3">
          {dataset.auditEvents.filter((event) => event.hash).map((event) => (
            <div key={event.id} className="rounded-2xl bg-[#F8FAFC] p-4">
              <div className="text-xs font-bold uppercase text-slate-500">{event.resource} | {event.version}</div>
              <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-700">{event.hash}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
