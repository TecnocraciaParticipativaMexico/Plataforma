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
    titulo: "Camara de Diputados",
    descripcion: "Ve curules y participacion publica.",
    etiqueta: `${curulesDiputadosCongresoCivico.length} curules`,
    clase: "bg-[#E4007C] text-white",
  },
  {
    titulo: "Senado",
    descripcion: "Consulta escanos y actividad reciente.",
    etiqueta: `${escanosSenadoCongresoCivico.length} escanos`,
    clase: "bg-[#0EA5E9] text-white",
  },
  {
    titulo: "Buscar mi representante",
    descripcion: "Usa estado, municipio, colonia o codigo postal.",
    etiqueta: "Disponible ahora",
    clase: "bg-[#F97316] text-white",
    href: "/congreso-civico/representacion/buscar",
  },
  {
    titulo: "Representacion por estado",
    descripcion: "Explora los estados disponibles.",
    etiqueta: `${estadosRepresentacionCongresoCivico.length} estados`,
    clase: "bg-[#16A34A] text-white",
    href: "/congreso-civico/representacion/estados/jalisco",
  },
  {
    titulo: "Registrar perfil de prueba",
    descripcion: "Genera una vista demo para entender el perfil ciudadano.",
    etiqueta: "Demo local",
    clase: "bg-[#8B5CF6] text-white",
    href: "/congreso-civico/representacion/registro",
  },
] as const;

const resumenRepresentacion = [
  {
    label: "Representantes cargados",
    valor: representantesMapaCongresoCivico.length,
    clase: "bg-[#E4007C] text-white",
  },
  {
    label: "Curules y escanos",
    valor: totalAsientos,
    clase: "bg-[#0A4E84] text-white",
  },
  {
    label: "Estados disponibles",
    valor: estadosRepresentacionCongresoCivico.length,
    clase: "bg-[#F2C300] text-[#1F2937]",
  },
  {
    label: "Alertas civicas",
    valor: alertasRepresentacionCongresoCivico.length,
    clase: "bg-[#8B5CF6] text-white",
  },
] as const;

export default function CongresoCivicoRepresentacionPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Civico
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="p-6 md:p-8">
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
              Congreso Civico
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Mapa de Representacion
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
              Encuentra quien te representa, como participa y que ha votado.
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {accesosRepresentacion.map((acceso) => {
            const cardContent = (
              <>
                <div className="mb-8 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                  {acceso.etiqueta}
                </div>
                <h2 className="text-2xl font-bold leading-tight">{acceso.titulo}</h2>
                <p className="mt-3 text-sm leading-6 opacity-95">{acceso.descripcion}</p>
              </>
            );

            if ("href" in acceso) {
              return (
                <Link
                  key={acceso.titulo}
                  href={acceso.href}
                  className={`${acceso.clase} block min-h-[190px] rounded-[28px] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <article
                key={acceso.titulo}
                className={`${acceso.clase} min-h-[190px] rounded-[28px] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                {cardContent}
              </article>
            );
          })}
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {resumenRepresentacion.map((item) => (
            <div key={item.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${item.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>
                {item.valor}
              </div>
              <div className="text-sm font-bold text-slate-700">{item.label}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[28px] bg-[#FFF1A8] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0A4E84]">Busqueda rapida</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Pronto podras buscar por estado, municipio, colonia o codigo postal.
            </p>
            <Link
              href="/congreso-civico/representacion/representantes/maria-teresa-lopez-garcia"
              className="mt-4 inline-flex rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9006B]"
            >
              Ver perfil completo -&gt;
            </Link>
          </div>

          <div className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
            <h2 className="text-2xl font-bold">Estados disponibles</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {estadosRepresentacionCongresoCivico.map((estado) => (
                <span key={estado.clave} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0A4E84]">
                  {estado.nombre}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
