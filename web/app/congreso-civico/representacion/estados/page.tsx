import Link from "next/link";

const estadosMexico = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Estado de México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
] as const;

export default function CongresoCivicoRepresentacionEstadosPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representación
        </Link>

        <section className="mb-6 overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] to-[#0EA5E9]" />
          <div className="p-5 md:p-7">
            <div className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Representación por estado</div>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">32 estados disponibles</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
              Vista frontend de ejemplo para explorar representación territorial. La información detallada se integrará por etapas.
            </p>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {estadosMexico.map((estado, index) => (
            <article key={estado} className="rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#E4007C] text-sm font-bold text-white">
                {index + 1}
              </div>
              <h2 className="text-base font-bold text-[#0A4E84]">{estado}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Cobertura demo preparada para integración territorial posterior.</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
