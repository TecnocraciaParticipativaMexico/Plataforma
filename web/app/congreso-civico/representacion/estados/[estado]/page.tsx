import Link from "next/link";
import { notFound } from "next/navigation";

type SeveridadAlerta = "baja" | "media" | "alta";

type RepresentanteEstado = {
  nombre: string;
  iniciales: string;
  cargo: string;
  distrito: string;
  tipoRepresentacion: string;
  asistencia: number;
  alineacionTerritorial: number;
  alertas: number;
  perfilId: string;
  color: string;
};

type AlertaEstado = {
  titulo: string;
  severidad: SeveridadAlerta;
  descripcion: string;
};

type EstadoRepresentacion = {
  nombre: string;
  slug: string;
  representantesRegistrados: number;
  diputados: number;
  senadores: number;
  municipiosCoberturaDemo: string[];
  alertasCivicasActivas: number;
  alineacionTerritorial: number;
  calificacionCiudadanaPromedio: number;
  participacionCiudadana: number;
  representantes: RepresentanteEstado[];
  alertas: AlertaEstado[];
};

const estadosRepresentacion: EstadoRepresentacion[] = [
  {
    nombre: "Ciudad de México",
    slug: "ciudad-de-mexico",
    representantesRegistrados: 8,
    diputados: 6,
    senadores: 2,
    municipiosCoberturaDemo: ["Cuauhtémoc", "Coyoacán", "Iztapalapa", "Miguel Hidalgo"],
    alertasCivicasActivas: 3,
    alineacionTerritorial: 72,
    calificacionCiudadanaPromedio: 81,
    participacionCiudadana: 68,
    representantes: [
      {
        nombre: "Representante Metropolitana Centro",
        iniciales: "MC",
        cargo: "Diputada Federal",
        distrito: "Distrito urbano 04",
        tipoRepresentacion: "Legislador en funciones",
        asistencia: 91,
        alineacionTerritorial: 74,
        alertas: 1,
        perfilId: "maria-teresa-lopez-garcia",
        color: "from-[#E4007C] to-[#8B5CF6]",
      },
      {
        nombre: "Senadora Metropolitana Norte",
        iniciales: "SM",
        cargo: "Senadora de la República",
        distrito: "Ámbito metropolitano",
        tipoRepresentacion: "Legislador en funciones",
        asistencia: 95,
        alineacionTerritorial: 84,
        alertas: 1,
        perfilId: "senadora-metropolitana-norte",
        color: "from-[#0EA5E9] to-[#16A34A]",
      },
      {
        nombre: "Representante Ciudadano Capital",
        iniciales: "RC",
        cargo: "Representante ciudadano",
        distrito: "Distrito ciudadano 01",
        tipoRepresentacion: "Representante ciudadano por voto popular",
        asistencia: 88,
        alineacionTerritorial: 69,
        alertas: 1,
        perfilId: "representante-ciudadano-jalisco",
        color: "from-[#F97316] to-[#F2C300]",
      },
    ],
    alertas: [
      { titulo: "Seguimiento de compromisos metropolitanos", severidad: "media", descripcion: "Hay compromisos públicos con actualización pendiente de avance territorial." },
      { titulo: "Participación vecinal focalizada", severidad: "baja", descripcion: "La actividad ciudadana se concentra en zonas con mayor cobertura digital." },
      { titulo: "Respuesta legislativa por documentar", severidad: "alta", descripcion: "Algunas solicitudes ciudadanas requieren respuesta pública trazable." },
    ],
  },
  {
    nombre: "Jalisco",
    slug: "jalisco",
    representantesRegistrados: 9,
    diputados: 7,
    senadores: 2,
    municipiosCoberturaDemo: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tlajomulco"],
    alertasCivicasActivas: 4,
    alineacionTerritorial: 78,
    calificacionCiudadanaPromedio: 86,
    participacionCiudadana: 74,
    representantes: [
      {
        nombre: "María Teresa López García",
        iniciales: "ML",
        cargo: "Diputada Federal",
        distrito: "Distrito 10",
        tipoRepresentacion: "Elegido por voto directo",
        asistencia: 94,
        alineacionTerritorial: 78,
        alertas: 2,
        perfilId: "maria-teresa-lopez-garcia",
        color: "from-[#E4007C] to-[#8B5CF6]",
      },
      {
        nombre: "Representante Ciudadano Jalisco",
        iniciales: "RJ",
        cargo: "Representante ciudadano",
        distrito: "Distrito ciudadano 03",
        tipoRepresentacion: "Representante ciudadano por voto popular",
        asistencia: 89,
        alineacionTerritorial: 81,
        alertas: 1,
        perfilId: "representante-ciudadano-jalisco",
        color: "from-[#F97316] to-[#F2C300]",
      },
      {
        nombre: "Senadora Metropolitana Norte",
        iniciales: "SM",
        cargo: "Senadora de la República",
        distrito: "Circunscripción occidente demo",
        tipoRepresentacion: "Legislador en funciones",
        asistencia: 95,
        alineacionTerritorial: 84,
        alertas: 1,
        perfilId: "senadora-metropolitana-norte",
        color: "from-[#0EA5E9] to-[#16A34A]",
      },
    ],
    alertas: [
      { titulo: "Seguimiento de propuesta territorial", severidad: "media", descripcion: "Una propuesta ciudadana requiere actualización pública de avance." },
      { titulo: "Diferencia de prioridad local", severidad: "baja", descripcion: "Hay temas locales con seguimiento legislativo todavía limitado." },
      { titulo: "Respuesta pendiente a comité ciudadano", severidad: "alta", descripcion: "Se requiere cierre documental de una solicitud ciudadana prioritaria." },
    ],
  },
  {
    nombre: "Nuevo León",
    slug: "nuevo-leon",
    representantesRegistrados: 7,
    diputados: 5,
    senadores: 2,
    municipiosCoberturaDemo: ["Monterrey", "San Nicolás", "Guadalupe", "Apodaca"],
    alertasCivicasActivas: 2,
    alineacionTerritorial: 84,
    calificacionCiudadanaPromedio: 88,
    participacionCiudadana: 70,
    representantes: [
      {
        nombre: "Senadora Metropolitana Norte",
        iniciales: "SM",
        cargo: "Senadora de la República",
        distrito: "Ámbito estatal",
        tipoRepresentacion: "Legislador en funciones",
        asistencia: 95,
        alineacionTerritorial: 84,
        alertas: 1,
        perfilId: "senadora-metropolitana-norte",
        color: "from-[#0EA5E9] to-[#16A34A]",
      },
      {
        nombre: "Representante Industrial Norte",
        iniciales: "IN",
        cargo: "Diputado Federal",
        distrito: "Distrito 06",
        tipoRepresentacion: "Representación proporcional",
        asistencia: 90,
        alineacionTerritorial: 77,
        alertas: 1,
        perfilId: "maria-teresa-lopez-garcia",
        color: "from-[#8B5CF6] to-[#0EA5E9]",
      },
      {
        nombre: "Representante Ciudadana Metropolitana",
        iniciales: "CM",
        cargo: "Representante ciudadano",
        distrito: "Distrito ciudadano 02",
        tipoRepresentacion: "Representante ciudadano por voto popular",
        asistencia: 87,
        alineacionTerritorial: 80,
        alertas: 0,
        perfilId: "representante-ciudadano-jalisco",
        color: "from-[#16A34A] to-[#F2C300]",
      },
    ],
    alertas: [
      { titulo: "Alta participación ciudadana recibida", severidad: "baja", descripcion: "El volumen de propuestas exige seguimiento público constante." },
      { titulo: "Agenda territorial en revisión", severidad: "media", descripcion: "Algunas prioridades metropolitanas están en proceso de integración." },
      { titulo: "Canalización institucional pendiente", severidad: "alta", descripcion: "Una alerta local requiere canalización pública verificable." },
    ],
  },
  {
    nombre: "Estado de México",
    slug: "estado-de-mexico",
    representantesRegistrados: 10,
    diputados: 8,
    senadores: 2,
    municipiosCoberturaDemo: ["Toluca", "Ecatepec", "Naucalpan", "Nezahualcóyotl"],
    alertasCivicasActivas: 5,
    alineacionTerritorial: 69,
    calificacionCiudadanaPromedio: 77,
    participacionCiudadana: 63,
    representantes: [
      {
        nombre: "Representante Valle Oriente",
        iniciales: "VO",
        cargo: "Diputada Federal",
        distrito: "Distrito 13",
        tipoRepresentacion: "Legislador en funciones",
        asistencia: 86,
        alineacionTerritorial: 70,
        alertas: 2,
        perfilId: "maria-teresa-lopez-garcia",
        color: "from-[#E4007C] to-[#F97316]",
      },
      {
        nombre: "Senadora Metropolitana Norte",
        iniciales: "SM",
        cargo: "Senadora de la República",
        distrito: "Circunscripción centro demo",
        tipoRepresentacion: "Representación proporcional",
        asistencia: 95,
        alineacionTerritorial: 84,
        alertas: 1,
        perfilId: "senadora-metropolitana-norte",
        color: "from-[#0EA5E9] to-[#16A34A]",
      },
      {
        nombre: "Representante Ciudadano Jalisco",
        iniciales: "RJ",
        cargo: "Representante ciudadano",
        distrito: "Distrito ciudadano demo",
        tipoRepresentacion: "Representante ciudadano por voto popular",
        asistencia: 89,
        alineacionTerritorial: 81,
        alertas: 2,
        perfilId: "representante-ciudadano-jalisco",
        color: "from-[#F97316] to-[#F2C300]",
      },
    ],
    alertas: [
      { titulo: "Cobertura ciudadana desigual", severidad: "media", descripcion: "La participación se concentra en municipios con mayor actividad organizada." },
      { titulo: "Seguimiento legislativo pendiente", severidad: "alta", descripcion: "Hay solicitudes ciudadanas con actualización pública pendiente." },
      { titulo: "Agenda municipal en integración", severidad: "baja", descripcion: "Nuevos municipios se incorporarán por etapas demostrativas." },
    ],
  },
  {
    nombre: "Veracruz",
    slug: "veracruz",
    representantesRegistrados: 6,
    diputados: 4,
    senadores: 2,
    municipiosCoberturaDemo: ["Veracruz", "Xalapa", "Coatzacoalcos", "Poza Rica"],
    alertasCivicasActivas: 3,
    alineacionTerritorial: 73,
    calificacionCiudadanaPromedio: 79,
    participacionCiudadana: 66,
    representantes: [
      {
        nombre: "Representante Puerto Centro",
        iniciales: "PC",
        cargo: "Diputado Federal",
        distrito: "Distrito 04",
        tipoRepresentacion: "Elegido por voto directo",
        asistencia: 88,
        alineacionTerritorial: 72,
        alertas: 1,
        perfilId: "maria-teresa-lopez-garcia",
        color: "from-[#0EA5E9] to-[#8B5CF6]",
      },
      {
        nombre: "Senadora Metropolitana Norte",
        iniciales: "SM",
        cargo: "Senadora de la República",
        distrito: "Circunscripción golfo demo",
        tipoRepresentacion: "Legislador en funciones",
        asistencia: 95,
        alineacionTerritorial: 84,
        alertas: 1,
        perfilId: "senadora-metropolitana-norte",
        color: "from-[#16A34A] to-[#0EA5E9]",
      },
      {
        nombre: "Representante Ciudadano Costero",
        iniciales: "CC",
        cargo: "Representante ciudadano",
        distrito: "Distrito ciudadano 05",
        tipoRepresentacion: "Representante ciudadano por voto popular",
        asistencia: 85,
        alineacionTerritorial: 76,
        alertas: 1,
        perfilId: "representante-ciudadano-jalisco",
        color: "from-[#F97316] to-[#F2C300]",
      },
    ],
    alertas: [
      { titulo: "Seguimiento de servicios territoriales", severidad: "media", descripcion: "Se monitorean prioridades ciudadanas sobre servicios públicos." },
      { titulo: "Participación regional en aumento", severidad: "baja", descripcion: "Nuevas propuestas se agrupan para revisión cívica." },
      { titulo: "Respuesta pública por actualizar", severidad: "alta", descripcion: "Una alerta requiere nueva evidencia de seguimiento institucional." },
    ],
  },
  {
    nombre: "Yucatán",
    slug: "yucatan",
    representantesRegistrados: 5,
    diputados: 3,
    senadores: 2,
    municipiosCoberturaDemo: ["Mérida", "Valladolid", "Tizimín", "Progreso"],
    alertasCivicasActivas: 2,
    alineacionTerritorial: 82,
    calificacionCiudadanaPromedio: 85,
    participacionCiudadana: 71,
    representantes: [
      {
        nombre: "Representante Mérida Norte",
        iniciales: "MN",
        cargo: "Diputada Federal",
        distrito: "Distrito 03",
        tipoRepresentacion: "Elegido por voto directo",
        asistencia: 92,
        alineacionTerritorial: 83,
        alertas: 0,
        perfilId: "maria-teresa-lopez-garcia",
        color: "from-[#E4007C] to-[#0EA5E9]",
      },
      {
        nombre: "Senadora Metropolitana Norte",
        iniciales: "SM",
        cargo: "Senadora de la República",
        distrito: "Circunscripción sureste demo",
        tipoRepresentacion: "Legislador en funciones",
        asistencia: 95,
        alineacionTerritorial: 84,
        alertas: 1,
        perfilId: "senadora-metropolitana-norte",
        color: "from-[#0EA5E9] to-[#16A34A]",
      },
      {
        nombre: "Representante Ciudadano Peninsular",
        iniciales: "CP",
        cargo: "Representante ciudadano",
        distrito: "Distrito ciudadano 01",
        tipoRepresentacion: "Representante ciudadano por voto popular",
        asistencia: 90,
        alineacionTerritorial: 79,
        alertas: 1,
        perfilId: "representante-ciudadano-jalisco",
        color: "from-[#8B5CF6] to-[#F2C300]",
      },
    ],
    alertas: [
      { titulo: "Seguimiento de iniciativas locales", severidad: "baja", descripcion: "Las propuestas recibidas se encuentran en clasificación ciudadana." },
      { titulo: "Agenda territorial por completar", severidad: "media", descripcion: "Algunas prioridades requieren más participación municipal documentada." },
      { titulo: "Canal de respuesta en revisión", severidad: "alta", descripcion: "Se requiere mejorar trazabilidad de respuestas públicas." },
    ],
  },
];

const alertaConfig: Record<SeveridadAlerta, string> = {
  baja: "bg-[#E0F2FE] text-[#0369A1]",
  media: "bg-[#FEF3C7] text-[#92400E]",
  alta: "bg-[#FFEDD5] text-[#C2410C]",
};

function getEstado(slug: string) {
  return estadosRepresentacion.find((estado) => estado.slug === slug);
}

export function generateStaticParams() {
  return estadosRepresentacion.map((estado) => ({ estado: estado.slug }));
}

export default function RepresentacionPorEstadoPage({ params }: { params: { estado: string } }) {
  const estado = getEstado(params.estado);

  if (!estado) {
    notFound();
  }

  const metricas = [
    { label: "Representantes registrados", valor: estado.representantesRegistrados, color: "bg-[#E4007C] text-white" },
    { label: "Diputados", valor: estado.diputados, color: "bg-[#0EA5E9] text-white" },
    { label: "Senadores", valor: estado.senadores, color: "bg-[#8B5CF6] text-white" },
    { label: "Alertas activas", valor: estado.alertasCivicasActivas, color: "bg-[#F97316] text-white" },
    { label: "Alineación territorial", valor: `${estado.alineacionTerritorial}%`, color: "bg-[#16A34A] text-white" },
    { label: "Participación ciudadana", valor: `${estado.participacionCiudadana}%`, color: "bg-[#F2C300] text-[#1F2937]" },
  ];

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representación
        </Link>

        <section className="mb-5 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-5 p-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:p-8">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.16em] text-[#E4007C]">Mapa de Representación</div>
              <h1 className="mt-3 text-4xl font-black leading-tight text-[#111827] md:text-6xl">REPRESENTACIÓN POR ESTADO</h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
                Consulta representantes, actividad legislativa y alertas cívicas de {estado.nombre}.
              </p>
            </div>
            <div className="rounded-[24px] bg-[#FFF1A8] p-5 text-sm font-bold leading-7 text-slate-700">
              Vista demostrativa con datos de ejemplo. La cobertura territorial completa se integrará por etapas.
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {metricas.map((metrica) => (
            <article key={metrica.label} className="rounded-[20px] bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
              <div className={`${metrica.color} rounded-2xl px-3 py-3 text-2xl font-black`}>{metrica.valor}</div>
              <div className="mt-2 text-xs font-black uppercase leading-4 text-slate-600">{metrica.label}</div>
            </article>
          ))}
        </section>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Mapa estatal demo</div>
              <div className="p-5">
                <div className="relative min-h-[260px] overflow-hidden rounded-[26px] bg-[#EEF2F7] p-6">
                  <div className="absolute left-8 top-10 h-4 w-4 rounded-full bg-[#E4007C]" />
                  <div className="absolute right-16 top-16 h-3 w-3 rounded-full bg-[#0EA5E9]" />
                  <div className="absolute bottom-16 left-20 h-3.5 w-3.5 rounded-full bg-[#16A34A]" />
                  <div className="absolute bottom-10 right-24 h-4 w-4 rounded-full bg-[#F97316]" />
                  <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]" />
                  <div className="flex min-h-[210px] flex-col items-center justify-center text-center">
                    <div className="text-2xl font-black text-[#111827]">Mapa estatal interactivo en preparación</div>
                    <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-slate-600">
                      La cobertura territorial completa se integrará por etapas.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#0A4E84] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Municipios con cobertura demo</div>
              <div className="flex flex-wrap gap-3 p-5">
                {estado.municipiosCoberturaDemo.map((municipio) => (
                  <span key={municipio} className="rounded-full bg-[#E0F2FE] px-4 py-2 text-sm font-black text-[#0369A1]">
                    {municipio}
                  </span>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#16A34A] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Cómo leer esta página</div>
              <div className="p-5">
                <p className="text-sm font-semibold leading-7 text-slate-700">
                  Esta vista organiza información territorial para que la ciudadanía pueda identificar representantes, revisar actividad pública y dar seguimiento a alertas cívicas locales.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Representantes del estado</div>
              <div className="grid gap-4 p-5">
                {estado.representantes.map((representante) => (
                  <article key={representante.nombre} className="rounded-[24px] bg-[#F8FAFC] p-4 ring-1 ring-[#E5E7EB]">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${representante.color} text-xl font-black text-white shadow-sm`}>
                          {representante.iniciales}
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-[#111827]">{representante.nombre}</h2>
                          <p className="mt-1 text-sm font-bold text-[#0A4E84]">{representante.cargo}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-600">{representante.distrito}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#E0F2FE] px-3 py-2 text-xs font-black text-[#0369A1]">{representante.tipoRepresentacion}</span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white p-3">
                        <div className="text-xs font-bold text-slate-500">Asistencia</div>
                        <div className="mt-1 text-2xl font-black text-[#16A34A]">{representante.asistencia}%</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <div className="text-xs font-bold text-slate-500">Alineación territorial</div>
                        <div className="mt-1 text-2xl font-black text-[#8B5CF6]">{representante.alineacionTerritorial}%</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <div className="text-xs font-bold text-slate-500">Alertas</div>
                        <div className="mt-1 text-2xl font-black text-[#F97316]">{representante.alertas}</div>
                      </div>
                    </div>

                    <Link href={`/congreso-civico/representacion/representantes/${representante.perfilId}`} className="mt-4 inline-flex rounded-full bg-[#E4007C] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#C9006B]">
                      Ver perfil completo →
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#F97316] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Alertas cívicas del estado</div>
              <div className="grid gap-3 p-5">
                {estado.alertas.map((alerta) => (
                  <article key={alerta.titulo} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <span className={`${alertaConfig[alerta.severidad]} rounded-full px-3 py-1 text-xs font-black uppercase`}>{alerta.severidad}</span>
                    <h2 className="mt-3 font-black text-[#111827]">{alerta.titulo}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{alerta.descripcion}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
