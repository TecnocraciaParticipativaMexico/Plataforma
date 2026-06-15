import Link from "next/link";
import {
  alertasRepresentacionCongresoCivico,
  curulesDiputadosCongresoCivico,
  escanosSenadoCongresoCivico,
  estadosRepresentacionCongresoCivico,
  representantesMapaCongresoCivico,
} from "../../lib/congresoCivicoRepresentacion";

const totalAsientos = curulesDiputadosCongresoCivico.length + escanosSenadoCongresoCivico.length;

const accesosRepresentacion = [
  {
    titulo: "Cámara de Diputados",
    descripcion: "Consulta las curules y quiénes las ocupan.",
    etiqueta: `${curulesDiputadosCongresoCivico.length} curules`,
    clase: "bg-[#E4007C] text-white",
    href: "/congreso-civico/representacion/diputados",
  },
  {
    titulo: "Senado",
    descripcion: "Consulta escaños y actividad reciente.",
    etiqueta: `${escanosSenadoCongresoCivico.length} escaños`,
    clase: "bg-[#0EA5E9] text-white",
    href: "/congreso-civico/representacion/senado",
  },
  {
    titulo: "Buscar representante",
    descripcion: "Usa estado, municipio, colonia o código postal.",
    etiqueta: "Búsqueda demo",
    clase: "bg-[#F97316] text-white",
    href: "/congreso-civico/representacion/busqueda",
  },
  {
    titulo: "Representación por estado",
    descripcion: "Explora los 32 estados disponibles.",
    etiqueta: `${estadosRepresentacionCongresoCivico.length} estados`,
    clase: "bg-[#16A34A] text-white",
    href: "/congreso-civico/representacion/estados",
  },
] as const;

const resumenRepresentacion = [
  {
    label: "Representantes cargados",
    valor: representantesMapaCongresoCivico.length,
    clase: "bg-[#E4007C] text-white",
  },
  {
    label: "Curules y escaños",
    valor: totalAsientos,
    clase: "bg-[#0A4E84] text-white",
  },
  {
    label: "Estados disponibles",
    valor: estadosRepresentacionCongresoCivico.length,
    clase: "bg-[#F2C300] text-[#1F2937]",
  },
  {
    label: "Alertas cívicas",
    valor: alertasRepresentacionCongresoCivico.length,
    clase: "bg-[#8B5CF6] text-white",
  },
] as const;

export default function CongresoCivicoRepresentacionPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Cívico
        </Link>

        <section className="mb-6 overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="p-5 md:p-7">
            <div className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
              Congreso Cívico
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              Mapa de Representación
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
              Encuentra quién te representa, cómo participa y qué ha votado.
            </p>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {accesosRepresentacion.map((acceso) => (
            <Link
              key={acceso.titulo}
              href={acceso.href}
              className={`${acceso.clase} block rounded-[24px] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="mb-6 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                {acceso.etiqueta}
              </div>
              <h2 className="text-xl font-bold leading-tight">{acceso.titulo}</h2>
              <p className="mt-3 text-sm leading-6 opacity-95">{acceso.descripcion}</p>
              <div className="mt-4 text-sm font-bold">Abrir -&gt;</div>
            </Link>
          ))}
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {resumenRepresentacion.map((item) => (
            <div key={item.label} className="rounded-[20px] bg-white p-4 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${item.clase} mb-3 inline-flex h-10 min-w-10 items-center justify-center rounded-2xl px-3 text-xl font-bold`}>
                {item.valor}
              </div>
              <div className="text-sm font-bold text-slate-700">{item.label}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] bg-[#FFF1A8] p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#0A4E84]">Búsqueda ciudadana</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Usa la búsqueda demo para ubicar representantes por datos territoriales de ejemplo.
            </p>
            <Link
              href="/congreso-civico/representacion/busqueda"
              className="mt-4 inline-flex rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9006B]"
            >
              Buscar representante -&gt;
            </Link>
          </div>

          <div className="rounded-[24px] bg-[#0A4E84] p-5 text-white shadow-sm">
            <h2 className="text-xl font-bold">Estados disponibles</h2>
            <div className="mt-4 flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
              {estadosRepresentacionCongresoCivico.map((estado) => (
                <span key={estado.clave} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0A4E84]">
                  {estado.nombre}
                </span>
              ))}
            </div>
            <Link href="/congreso-civico/representacion/estados" className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0A4E84]">
              Ver estados -&gt;
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
