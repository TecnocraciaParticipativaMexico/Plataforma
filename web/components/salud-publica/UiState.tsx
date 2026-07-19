"use client";

type StateKind =
  | "carga"
  | "vacio"
  | "error"
  | "sin_resultados"
  | "sin_conexion"
  | "acceso_restringido"
  | "datos_incompletos"
  | "proveedor_no_disponible"
  | "documento_no_generado"
  | "archivado"
  | "cancelado"
  | "exito"
  | "advertencia";

const stateStyles: Record<StateKind, string> = {
  carga: "border-[#0EA5E9] bg-[#E0F2FE] text-[#0A4E84]",
  vacio: "border-slate-300 bg-white text-slate-600",
  error: "border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]",
  sin_resultados: "border-slate-300 bg-[#F8FAFC] text-slate-600",
  sin_conexion: "border-[#F97316] bg-[#FFF7ED] text-[#9A3412]",
  acceso_restringido: "border-[#702F8A] bg-[#F3E8FF] text-[#581C87]",
  datos_incompletos: "border-[#FFC20E] bg-[#FEF9C3] text-[#713F12]",
  proveedor_no_disponible: "border-[#64748B] bg-[#F1F5F9] text-slate-700",
  documento_no_generado: "border-[#64748B] bg-white text-slate-700",
  archivado: "border-slate-300 bg-slate-100 text-slate-600",
  cancelado: "border-[#F97316] bg-[#FFF7ED] text-[#9A3412]",
  exito: "border-[#22C55E] bg-[#F0FDF4] text-[#166534]",
  advertencia: "border-[#E4007C] bg-[#FDF2F8] text-[#9D174D]",
};

export function UiState({ kind, title, children }: { kind: StateKind; title: string; children?: React.ReactNode }) {
  return (
    <section className={`rounded-2xl border-l-4 p-4 text-sm leading-6 shadow-sm ${stateStyles[kind]}`}>
      <h3 className="font-black uppercase tracking-wide">{title}</h3>
      {children ? <div className="mt-1">{children}</div> : null}
    </section>
  );
}

export const interfaceStateExamples: { kind: StateKind; title: string; copy: string }[] = [
  { kind: "carga", title: "Carga", copy: "Preparando información local." },
  { kind: "vacio", title: "Vacío", copy: "Todavía no hay expedientes." },
  { kind: "error", title: "Error", copy: "No se pudo procesar la acción simulada." },
  { kind: "sin_resultados", title: "Sin resultados", copy: "Cambia filtros o busqueda." },
  { kind: "sin_conexion", title: "Sin conexión", copy: "El módulo funciona con reglas y datos locales." },
  { kind: "acceso_restringido", title: "Acceso restringido", copy: "Vista preparada para permisos futuros." },
  { kind: "datos_incompletos", title: "Datos incompletos", copy: "Puedes guardar borrador sin campos innecesarios." },
  { kind: "proveedor_no_disponible", title: "Proveedor no disponible", copy: "No hay IA externa configurada." },
  { kind: "documento_no_generado", title: "Documento no generado", copy: "Genera una vista imprimible cuando lo necesites." },
  { kind: "archivado", title: "Archivado", copy: "Expediente cerrado para consulta histórica." },
  { kind: "cancelado", title: "Acción cancelada", copy: "No se guardaron cambios nuevos." },
  { kind: "exito", title: "Éxito", copy: "Acción local completada." },
  { kind: "advertencia", title: "Advertencia", copy: "Revisa límites y origen de información." },
];
