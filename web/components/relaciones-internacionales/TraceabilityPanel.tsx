"use client";
import { useMemo, useState } from "react";
import { traceRecords } from "@/lib/relaciones-internacionales/data";
import type { TraceabilityRecord } from "@/lib/relaciones-internacionales/types";
import { DocumentHeader, EmptyState, Notice, Panel, fieldClass, primaryButtonClass, secondaryButtonClass } from "./ui";
export function TraceabilityPanel() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [selected, setSelected] = useState<TraceabilityRecord | null>(null);
    const rows = useMemo(() => traceRecords.filter((item) => `${item.folio} ${item.caseName} ${item.committee}`.toLowerCase().includes(query.toLowerCase()) && (!status || item.status === status) && (!documentType || item.documentType === documentType)), [documentType, query, status]);
    return <Panel eyebrow="Registros locales de demostración" title="Trazabilidad Documental e Incidencia" description="Consulta folios, versiones, huellas de integridad y acciones documentadas dentro del módulo.">
    <Notice tone="amber">La huella digital permite comparar versiones dentro de esta herramienta. No constituye certificación oficial, fe pública ni cadena de custodia.</Notice>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
    <input aria-label="Buscar trazabilidad" value={query} onChange={(event) => setQuery(event.target.value)} className={fieldClass} placeholder="Buscar folio, expediente o comité"/>
    <select aria-label="Filtrar estado" value={status} onChange={(event) => setStatus(event.target.value)} className={fieldClass}>
    <option value="">Todos los estados</option>{[...new Set(traceRecords.map((item) => item.status))].map((value) => <option key={value}>{value}</option>)}</select>
    <select aria-label="Filtrar tipo documental" value={documentType} onChange={(event) => setDocumentType(event.target.value)} className={fieldClass}>
    <option value="">Todos los documentos</option>{[...new Set(traceRecords.map((item) => item.documentType))].map((value) => <option key={value}>{value}</option>)}</select>
    </div>{rows.length ? <>
        <div className="mt-5 hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
        <thead>
        <tr className="border-b text-xs uppercase text-slate-500">
        <th className="p-3">Folio</th>
        <th>Expediente</th>
        <th>Documento</th>
        <th>Versión</th>
        <th>Fecha</th>
        <th>Estado</th>
        <th>Acción</th>
        </tr>
        </thead>
        <tbody>{rows.map((item) => <tr key={item.folio} className="border-b hover:bg-slate-50">
            <td className="p-3 font-mono text-xs">{item.folio}</td>
            <td>{item.caseName}</td>
            <td>{item.documentType}</td>
            <td>{item.version}</td>
            <td>{item.date}</td>
            <td>{item.status}</td>
            <td>
            <button type="button" onClick={() => setSelected(item)} className="min-h-10 font-bold text-[#0A4E84]">Detalle</button>
            </td>
            </tr>)}</tbody>
        </table>
        </div>
        <div className="mt-5 grid gap-3 md:hidden">{rows.map((item) => <article key={item.folio} className="rounded-xl border border-slate-200 p-4">
            <p className="font-mono text-xs font-bold text-[#E4007C]">{item.folio}</p>
            <h3 className="mt-1 font-black">{item.caseName}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.documentType} · v{item.version} · {item.status}</p>
            <button type="button" onClick={() => setSelected(item)} className="mt-2 min-h-10 font-bold text-[#0A4E84]">Ver comprobante</button>
            </article>)}</div>
        </> : <div className="mt-5">
        <EmptyState>No hay registros que coincidan con los filtros.</EmptyState>
        </div>}
        {selected ? <article className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 print:border-0 print:bg-white print:p-0">
        <DocumentHeader title="Comprobante local de trazabilidad" folio={selected.folio} version={selected.version}/>
        <div className="flex justify-between gap-3">
        <div>
        <p className="font-mono text-xs font-bold text-[#E4007C]">{selected.folio}</p>
        <h3 className="text-xl font-black text-[#0A4E84]">{selected.caseName}</h3>
        </div>
        <button type="button" onClick={() => setSelected(null)} className={`${secondaryButtonClass} print:hidden`}>Cerrar</button>
        </div>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
        <dt className="font-bold">Documento y versión</dt>
        <dd>{selected.documentType} · {selected.version}</dd>
        </div>
        <div>
        <dt className="font-bold">Fecha y hora</dt>
        <dd>{selected.date} · {selected.time}</dd>
        </div>
        <div>
        <dt className="font-bold">Comité / actor</dt>
        <dd>{selected.committee} · {selected.actor}</dd>
        </div>
        <div>
        <dt className="font-bold">Estado / acción</dt>
        <dd>{selected.status} · {selected.action}</dd>
        </div>
        <div className="sm:col-span-2">
        <dt className="font-bold">Observaciones e historial</dt>
        <dd>{selected.notes}</dd>
        </div>
        </dl>
        <p className="mt-4 break-all rounded-xl bg-white p-3 font-mono text-[10px]">Huella SHA-256: {selected.hash}</p>
        <Notice tone="amber" className="mt-4">Registro local de demostración. La huella permite comparación técnica, no certificación.</Notice>
        <footer className="hidden border-t pt-3 text-xs print:mt-4 print:block">Tecnocracia Participativa México 2030 · Módulo 30</footer>
        <button type="button" onClick={() => window.print()} className={`mt-4 ${primaryButtonClass} print:hidden`}>Imprimir comprobante</button>
        </article> : null}</Panel>;
}
