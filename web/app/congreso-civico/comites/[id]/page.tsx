import Link from "next/link";
import { notFound } from "next/navigation";

type EstadoComite = "Activo" | "En formación" | "En revisión";
type EstadoCarga = "loading" | "ready" | "empty" | "error";

type IntegranteComite = {
  nombre: string;
  rol: string;
  area: string;
};

type LineaTrabajo = {
  titulo: string;
  descripcion: string;
  estado: "Activa" | "En preparación" | "En revisión";
};

type DictamenComite = {
  titulo: string;
  fecha: string;
  estado: "Publicado" | "En revisión" | "Borrador ciudadano";
};

type PropuestaRelacionada = {
  titulo: string;
  tema: string;
  estado: "Recibida" | "En análisis" | "Canalizada";
};

type ComiteExpertoDetalle = {
  id: string;
  nombre: string;
  enfoque: string;
  descripcion: string;
  estado: EstadoComite;
  territorio: string;
  color: string;
  integrantes: IntegranteComite[];
  lineasTrabajo: LineaTrabajo[];
  dictamenesRecientes: DictamenComite[];
  propuestasRelacionadas: PropuestaRelacionada[];
};

const estadoCarga = "ready" as EstadoCarga;

const comitesExpertosCiudadanos: ComiteExpertoDetalle[] = [
  {
    id: "transparencia-legislativa",
    nombre: "Comité de Transparencia Legislativa",
    enfoque: "Votaciones, asistencia y rendición de cuentas",
    descripcion:
      "Revisa información pública para explicar de forma clara cómo participan los representantes y qué datos requieren seguimiento ciudadano.",
    estado: "Activo",
    territorio: "Nacional",
    color: "bg-[#E4007C] text-white",
    integrantes: [
      { nombre: "Ana Paula Rivera", rol: "Coordinación técnica", area: "Transparencia legislativa" },
      { nombre: "Luis Fernando Mora", rol: "Revisión documental", area: "Votaciones públicas" },
      { nombre: "Claudia Itzel Reyes", rol: "Lenguaje claro", area: "Comunicación ciudadana" },
    ],
    lineasTrabajo: [
      {
        titulo: "Lectura ciudadana de votaciones",
        descripcion: "Organiza votos, asistencia y posturas públicas en formatos fáciles de consultar.",
        estado: "Activa",
      },
      {
        titulo: "Criterios de trazabilidad",
        descripcion: "Define qué evidencia mínima debe acompañar una alerta o dictamen ciudadano.",
        estado: "En revisión",
      },
      {
        titulo: "Guía de seguimiento legislativo",
        descripcion: "Prepara materiales para que las personas identifiquen avances, pausas y respuestas públicas.",
        estado: "En preparación",
      },
    ],
    dictamenesRecientes: [
      { titulo: "Resumen de asistencia y votaciones públicas", fecha: "12 mayo 2026", estado: "Publicado" },
      { titulo: "Criterios para lectura de alertas cívicas", fecha: "28 abril 2026", estado: "En revisión" },
      { titulo: "Formato ciudadano de seguimiento a representantes", fecha: "10 abril 2026", estado: "Borrador ciudadano" },
    ],
    propuestasRelacionadas: [
      { titulo: "Tablero ciudadano de votaciones", tema: "Transparencia", estado: "En análisis" },
      { titulo: "Ficha pública de asistencia legislativa", tema: "Rendición de cuentas", estado: "Canalizada" },
      { titulo: "Glosario ciudadano legislativo", tema: "Lenguaje claro", estado: "Recibida" },
    ],
  },
  {
    id: "presupuesto-territorial",
    nombre: "Comité de Presupuesto Territorial",
    enfoque: "Gasto público, prioridades locales y seguimiento ciudadano",
    descripcion:
      "Organiza evidencia demostrativa sobre presupuesto, proyectos y necesidades territoriales para apoyar consultas ciudadanas informadas.",
    estado: "En revisión",
    territorio: "Estados piloto",
    color: "bg-[#0A4E84] text-white",
    integrantes: [
      { nombre: "Mariana Soto", rol: "Análisis presupuestal", area: "Finanzas públicas" },
      { nombre: "Ernesto Galván", rol: "Seguimiento territorial", area: "Planeación local" },
      { nombre: "Rocío Padilla", rol: "Revisión de evidencia", area: "Obra pública" },
    ],
    lineasTrabajo: [
      {
        titulo: "Mapa de prioridades locales",
        descripcion: "Ordena temas reportados por territorio para compararlos con gasto y proyectos públicos.",
        estado: "Activa",
      },
      {
        titulo: "Semáforo de proyectos",
        descripcion: "Presenta avance, documentación disponible y puntos que requieren revisión ciudadana.",
        estado: "En preparación",
      },
      {
        titulo: "Criterios de gasto verificable",
        descripcion: "Propone una lectura sencilla entre presupuesto, objetivo público y resultado esperado.",
        estado: "En revisión",
      },
    ],
    dictamenesRecientes: [
      { titulo: "Ficha demo de seguimiento presupuestal", fecha: "15 mayo 2026", estado: "Publicado" },
      { titulo: "Criterios para proyectos territoriales", fecha: "02 mayo 2026", estado: "En revisión" },
      { titulo: "Lectura ciudadana de prioridades locales", fecha: "19 abril 2026", estado: "Borrador ciudadano" },
    ],
    propuestasRelacionadas: [
      { titulo: "Presupuesto visible por distrito", tema: "Presupuesto público", estado: "En análisis" },
      { titulo: "Seguimiento de obras comunitarias", tema: "Infraestructura", estado: "Recibida" },
      { titulo: "Consulta de necesidades por colonia", tema: "Participación territorial", estado: "Canalizada" },
    ],
  },
  {
    id: "derechos-y-participacion",
    nombre: "Comité de Derechos y Participación",
    enfoque: "Iniciativas ciudadanas, accesibilidad y lenguaje claro",
    descripcion:
      "Acompaña propuestas ciudadanas para que sean comprensibles, trazables y respetuosas de derechos, sin sustituir instituciones formales.",
    estado: "En formación",
    territorio: "Comunidades participantes",
    color: "bg-[#16A34A] text-white",
    integrantes: [
      { nombre: "Daniela Chávez", rol: "Enfoque de derechos", area: "Participación ciudadana" },
      { nombre: "Mateo Núñez", rol: "Accesibilidad", area: "Diseño cívico" },
      { nombre: "Patricia Campos", rol: "Revisión comunitaria", area: "Organización territorial" },
    ],
    lineasTrabajo: [
      {
        titulo: "Guía de propuestas ciudadanas",
        descripcion: "Ayuda a estructurar propuestas con objetivo, evidencia y ruta de seguimiento.",
        estado: "Activa",
      },
      {
        titulo: "Accesibilidad de información cívica",
        descripcion: "Revisa textos y fichas para que puedan entenderse sin conocimiento técnico previo.",
        estado: "En preparación",
      },
      {
        titulo: "Criterios de participación segura",
        descripcion: "Promueve privacidad, consentimiento y lenguaje neutral en procesos ciudadanos.",
        estado: "En revisión",
      },
    ],
    dictamenesRecientes: [
      { titulo: "Formato demo de propuesta ciudadana", fecha: "18 mayo 2026", estado: "Publicado" },
      { titulo: "Checklist de lenguaje ciudadano", fecha: "03 mayo 2026", estado: "En revisión" },
      { titulo: "Guía de participación territorial", fecha: "22 abril 2026", estado: "Borrador ciudadano" },
    ],
    propuestasRelacionadas: [
      { titulo: "Consulta accesible para iniciativas", tema: "Participación", estado: "Recibida" },
      { titulo: "Fichas de lectura simple", tema: "Lenguaje claro", estado: "En análisis" },
      { titulo: "Protocolo de seguimiento ciudadano", tema: "Derechos", estado: "Canalizada" },
    ],
  },
];

export function generateStaticParams() {
  return comitesExpertosCiudadanos.map((comite) => ({ id: comite.id }));
}

function obtenerComite(id: string) {
  return comitesExpertosCiudadanos.find((comite) => comite.id === id);
}

function EstadoModulo({ tipo }: { tipo: Exclude<EstadoCarga, "ready"> }) {
  const contenido = {
    loading: {
      titulo: "Cargando comité",
      descripcion: "Estamos preparando la información demostrativa del comité ciudadano.",
      clase: "bg-[#E0F2FE] text-[#0369A1]",
    },
    empty: {
      titulo: "Comité sin información",
      descripcion: "Cuando exista información demostrativa aparecerá en esta sección.",
      clase: "bg-[#FFF1A8] text-[#0A4E84]",
    },
    error: {
      titulo: "No se pudo mostrar la información",
      descripcion: "Intenta consultar de nuevo. Esta vista no realiza conexión con servicios externos.",
      clase: "bg-[#FCE7F3] text-[#BE185D]",
    },
  }[tipo];

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/comites" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Comités
        </Link>
        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <span className={`${contenido.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{tipo}</span>
          <h1 className="mt-4 text-2xl font-bold text-[#0A4E84]">{contenido.titulo}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{contenido.descripcion}</p>
        </section>
      </div>
    </main>
  );
}

export default function CongresoCivicoComiteDetallePage({ params }: { params: { id: string } }) {
  if (estadoCarga !== "ready") {
    return <EstadoModulo tipo={estadoCarga} />;
  }

  const comite = obtenerComite(params.id);

  if (!comite) {
    notFound();
  }

  const metricas = [
    { label: "Integrantes", valor: comite.integrantes.length, clase: "bg-[#E4007C] text-white" },
    { label: "Líneas de trabajo", valor: comite.lineasTrabajo.length, clase: "bg-[#0EA5E9] text-white" },
    { label: "Dictámenes", valor: comite.dictamenesRecientes.length, clase: "bg-[#F2C300] text-[#1F2937]" },
    { label: "Propuestas", valor: comite.propuestasRelacionadas.length, clase: "bg-[#8B5CF6] text-white" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/comites" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Comités
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_0.8fr] md:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Comité ciudadano</div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">{comite.nombre}</h1>
              <p className="mt-4 text-base font-semibold text-[#0A4E84]">{comite.enfoque}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">{comite.descripcion}</p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <span className={`${comite.color} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{comite.estado}</span>
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Territorio</div>
              <div className="mt-2 text-xl font-bold text-[#0A4E84]">{comite.territorio}</div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Información demostrativa para visualizar cómo funcionarán los comités dentro de Congreso Cívico.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {metricas.map((item) => (
            <article key={item.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${item.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{item.valor}</div>
              <div className="text-sm font-bold text-slate-700">{item.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Integrantes</h2>
            <div className="mt-5 grid gap-3">
              {comite.integrantes.map((integrante) => (
                <div key={integrante.nombre} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="font-bold text-[#0A4E84]">{integrante.nombre}</div>
                  <div className="mt-1 text-sm text-slate-600">{integrante.rol}</div>
                  <div className="mt-2 inline-flex rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">{integrante.area}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Líneas de trabajo</h2>
            <div className="mt-5 grid gap-3">
              {comite.lineasTrabajo.map((linea) => (
                <div key={linea.titulo} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-[#0A4E84]">{linea.titulo}</h3>
                    <span className="rounded-full bg-[#FFF1A8] px-3 py-1 text-xs font-bold text-[#0A4E84]">{linea.estado}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{linea.descripcion}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Dictámenes recientes</h2>
            <div className="mt-5 space-y-3">
              {comite.dictamenesRecientes.map((dictamen) => (
                <div key={dictamen.titulo} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="text-sm font-bold text-[#0A4E84]">{dictamen.titulo}</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-white px-3 py-1 text-slate-600">{dictamen.fecha}</span>
                    <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-[#6D28D9]">{dictamen.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Propuestas relacionadas</h2>
            <div className="mt-5 space-y-3">
              {comite.propuestasRelacionadas.map((propuesta) => (
                <div key={propuesta.titulo} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="text-sm font-bold text-[#0A4E84]">{propuesta.titulo}</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-white px-3 py-1 text-slate-600">{propuesta.tema}</span>
                    <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-[#166534]">{propuesta.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
