import Link from "next/link";

const camposBusqueda = ["Estado", "Municipio", "Colonia", "Código postal"] as const;

export default function CongresoCivicoRepresentacionBusquedaPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representación
        </Link>

        <section className="mb-6 overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] to-[#0EA5E9]" />
          <div className="p-5 md:p-7">
            <div className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Búsqueda demo</div>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">Buscar representante</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
              Vista frontend de ejemplo para preparar la búsqueda por ubicación. No consulta bases de datos ni promete cobertura nacional completa todavía.
            </p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <form className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
            <div className="grid gap-4 md:grid-cols-2">
              {camposBusqueda.map((campo) => (
                <label key={campo} className="text-sm font-bold text-slate-700">
                  {campo}
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#F7C9DD] bg-[#FFF8F0] px-4 py-3 text-sm text-[#0A4E84] outline-none focus:border-[#E4007C]"
                    placeholder={`${campo} demo`}
                  />
                </label>
              ))}
            </div>
            <button type="button" className="mt-5 rounded-full bg-[#E4007C] px-5 py-3 text-sm font-bold text-white shadow-sm">
              Buscar representante
            </button>
          </form>

          <aside className="rounded-[24px] bg-[#0A4E84] p-5 text-white shadow-sm">
            <h2 className="text-xl font-bold text-[#F2C300]">Versión demostrativa</h2>
            <p className="mt-3 text-sm leading-6 text-white/85">
              Esta pantalla evita enlaces rotos y deja listo el espacio para una integración posterior con datos territoriales verificados.
            </p>
            <Link href="/congreso-civico/representacion/buscar" className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0A4E84]">
              Ir al buscador demo actual -&gt;
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
