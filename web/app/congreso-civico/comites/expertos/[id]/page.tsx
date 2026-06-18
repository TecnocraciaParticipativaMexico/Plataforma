import Link from "next/link";
import { notFound } from "next/navigation";

type EstadoVisual = "loading" | "empty" | "error";
type NivelTecnico = "Aspirante" | "Colaborador" | "Experto" | "Especialista Senior";
type EstadoValidacion = "Pendiente" | "En revisión" | "Validación cívica" | "Observación";

type ExpertoCiudadano = {
  id: string;
  nombre: string;
  comitePrincipal: string;
  especialidades: string[];
  nivelTecnico: NivelTecnico;
  puntajeTecnico: number;
  estadoValidacion: EstadoValidacion;
  ubicacion: string;
  aniosExperiencia: number;
  formacionAcademica: string;
  experienciaProfesional: string;
  participacionIniciativas: string[];
  contribucionesCongreso: string[];
  conflictosInteres: string;
  actividadReciente: Array<{ fecha: string; actividad: string }>;
  areasOpinionTecnica: string[];
  color: string;
};

const estadoVisualActual = "ready" as EstadoVisual | "ready";

const expertosCiudadanos: ExpertoCiudadano[] = [
  {
    id: "ana-paula-rivera",
    nombre: "Ana Paula Rivera",
    comitePrincipal: "Comité de Transparencia Legislativa",
    especialidades: ["Rendición de cuentas", "Datos legislativos", "Lenguaje claro"],
    nivelTecnico: "Experto",
    puntajeTecnico: 86,
    estadoValidacion: "Validación cívica",
    ubicacion: "Ciudad de México",
    aniosExperiencia: 9,
    formacionAcademica: "Maestría en políticas públicas y diplomado en transparencia institucional.",
    experienciaProfesional: "Ha trabajado en revisión documental, visualización de datos públicos y procesos de participación ciudadana.",
    participacionIniciativas: ["Tablero ciudadano de votaciones", "Ficha pública de asistencia legislativa", "Glosario ciudadano legislativo"],
    contribucionesCongreso: ["Definición de criterios de trazabilidad", "Revisión de formato ciudadano de votaciones", "Guía de lectura neutral para alertas cívicas"],
    conflictosInteres: "Sin conflictos declarados en esta versión demo.",
    actividadReciente: [
      { fecha: "28 mayo 2026", actividad: "Revisión de evidencia para ficha de asistencia." },
      { fecha: "20 mayo 2026", actividad: "Comentario técnico sobre trazabilidad de votaciones." },
      { fecha: "12 mayo 2026", actividad: "Sesión demo del comité de transparencia." },
    ],
    areasOpinionTecnica: ["Transparencia legislativa", "Asistencia y votaciones", "Trazabilidad documental", "Comunicación pública"],
    color: "bg-[#E4007C] text-white",
  },
  {
    id: "mariana-soto",
    nombre: "Mariana Soto",
    comitePrincipal: "Comité de Presupuesto Territorial",
    especialidades: ["Finanzas públicas", "Presupuesto territorial", "Planeación local"],
    nivelTecnico: "Especialista Senior",
    puntajeTecnico: 92,
    estadoValidacion: "En revisión",
    ubicacion: "Jalisco",
    aniosExperiencia: 14,
    formacionAcademica: "Doctorado en economía pública y experiencia en evaluación presupuestal territorial.",
    experienciaProfesional: "Ha coordinado análisis de gasto público, proyectos locales y metodologías de evaluación de impacto territorial.",
    participacionIniciativas: ["Presupuesto visible por distrito", "Seguimiento de obras comunitarias", "Consulta de necesidades por colonia"],
    contribucionesCongreso: ["Criterios de gasto verificable", "Ficha demo de seguimiento presupuestal", "Metodología de prioridades locales"],
    conflictosInteres: "Consultoría previa en proyectos de planeación local declarada para revisión cívica.",
    actividadReciente: [
      { fecha: "30 mayo 2026", actividad: "Lectura de prioridades presupuestales locales." },
      { fecha: "18 mayo 2026", actividad: "Revisión de matriz de proyectos territoriales." },
      { fecha: "04 mayo 2026", actividad: "Sesión demo de criterios presupuestales." },
    ],
    areasOpinionTecnica: ["Presupuesto público", "Obra pública", "Planeación territorial", "Evaluación de impacto"],
    color: "bg-[#0A4E84] text-white",
  },
  {
    id: "daniela-chavez",
    nombre: "Daniela Chávez",
    comitePrincipal: "Comité de Derechos y Participación",
    especialidades: ["Participación ciudadana", "Enfoque de derechos", "Accesibilidad"],
    nivelTecnico: "Colaborador",
    puntajeTecnico: 74,
    estadoValidacion: "Pendiente",
    ubicacion: "Nuevo León",
    aniosExperiencia: 6,
    formacionAcademica: "Licenciatura en derecho y formación continua en participación comunitaria.",
    experienciaProfesional: "Ha colaborado en procesos comunitarios, lectura accesible de propuestas y acompañamiento ciudadano.",
    participacionIniciativas: ["Consulta accesible para iniciativas", "Fichas de lectura simple", "Protocolo de seguimiento ciudadano"],
    contribucionesCongreso: ["Checklist de lenguaje ciudadano", "Guía de participación territorial", "Revisión de privacidad en propuestas"],
    conflictosInteres: "Sin conflictos declarados en esta versión demo.",
    actividadReciente: [
      { fecha: "25 mayo 2026", actividad: "Revisión de accesibilidad para una propuesta ciudadana." },
      { fecha: "15 mayo 2026", actividad: "Comentario sobre consentimiento informado en participación." },
      { fecha: "03 mayo 2026", actividad: "Sesión demo de lenguaje claro." },
    ],
    areasOpinionTecnica: ["Derechos ciudadanos", "Participación segura", "Lenguaje claro", "Accesibilidad cívica"],
    color: "bg-[#16A34A] text-white",
  },
];

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando perfil",
    descripcion: "La información del experto se está preparando para consulta ciudadana.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Perfil sin información",
    descripcion: "Cuando existan datos demostrativos aparecerán en esta sección.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar el perfil",
    descripcion: "Esta vista no se conecta a servicios externos; el estado sirve como referencia visual.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

export function generateStaticParams() {
  return expertosCiudadanos.map((experto) => ({ id: experto.id }));
}

function obtenerExperto(id: string) {
  return expertosCiudadanos.find((experto) => experto.id === id);
}

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

function EstadoPerfil({ tipo }: { tipo: EstadoVisual }) {
  const estado = estadosVisuales[tipo];

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/comites/expertos" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al directorio
        </Link>
        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <span className={`${estado.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{tipo}</span>
          <h1 className="mt-4 text-2xl font-bold text-[#0A4E84]">{estado.titulo}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{estado.descripcion}</p>
        </section>
      </div>
    </main>
  );
}

function ListaCompacta({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-[#F8FAFC] px-3 py-1 text-xs font-bold text-[#0A4E84] ring-1 ring-slate-100">
          {item}
        </span>
      ))}
    </div>
  );
}

export default function CongresoCivicoExpertoPerfilPage({ params }: { params: { id: string } }) {
  if (estadoVisualActual !== "ready") {
    return <EstadoPerfil tipo={estadoVisualActual} />;
  }

  const experto = obtenerExperto(params.id);

  if (!experto) {
    notFound();
  }

  const metricas = [
    { label: "Puntaje técnico", valor: `${experto.puntajeTecnico}/100`, clase: "bg-[#E4007C] text-white" },
    { label: "Nivel técnico", valor: experto.nivelTecnico, clase: "bg-[#0EA5E9] text-white" },
    { label: "Experiencia", valor: `${experto.aniosExperiencia} años`, clase: "bg-[#F2C300] text-[#1F2937]" },
    { label: "Validación", valor: experto.estadoValidacion, clase: "bg-[#8B5CF6] text-white" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/comites/expertos" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al directorio
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
            <aside className={`${experto.color} rounded-[28px] p-6`}>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-3xl font-bold">{iniciales(experto.nombre)}</div>
              <div className="mt-6 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">{experto.estadoValidacion}</div>
              <h1 className="mt-4 text-4xl font-bold leading-tight">{experto.nombre}</h1>
              <p className="mt-3 text-sm leading-6 opacity-95">{experto.comitePrincipal}</p>
            </aside>
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Perfil de Experto Ciudadano</div>
              <h2 className="text-3xl font-bold leading-tight text-[#0A4E84]">Resumen del perfil</h2>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Perfil demostrativo para visualizar experiencia, contribuciones, transparencia y áreas donde una persona podría emitir opinión técnica dentro de los comités ciudadanos.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="text-xs font-bold uppercase text-slate-500">Ubicación</div>
                  <div className="mt-1 font-bold text-[#0A4E84]">{experto.ubicacion}</div>
                </div>
                <div className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="text-xs font-bold uppercase text-slate-500">Nivel técnico</div>
                  <div className="mt-1 font-bold text-[#0A4E84]">{experto.nivelTecnico}</div>
                </div>
              </div>
              <ListaCompacta items={experto.especialidades} />
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {metricas.map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex min-h-12 items-center justify-center rounded-2xl px-4 py-3 text-lg font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Resumen</h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">{experto.experienciaProfesional}</p>
            <h3 className="mt-6 text-lg font-bold text-[#0A4E84]">Áreas donde puede emitir opinión técnica</h3>
            <ListaCompacta items={experto.areasOpinionTecnica} />
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Experiencia</h2>
            <div className="mt-4 rounded-2xl bg-[#F8FAFC] p-4">
              <div className="text-xs font-bold uppercase text-slate-500">Formación académica</div>
              <p className="mt-2 text-sm leading-6 text-slate-700">{experto.formacionAcademica}</p>
            </div>
            <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-4">
              <div className="text-xs font-bold uppercase text-slate-500">Experiencia profesional</div>
              <p className="mt-2 text-sm leading-6 text-slate-700">{experto.experienciaProfesional}</p>
            </div>
          </article>
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Actividad</h2>
            <div className="mt-5 space-y-3">
              {experto.actividadReciente.map((actividad) => (
                <div key={`${actividad.fecha}-${actividad.actividad}`} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="text-xs font-bold uppercase text-slate-500">{actividad.fecha}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{actividad.actividad}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-6 text-lg font-bold text-[#0A4E84]">Participación en iniciativas</h3>
            <ListaCompacta items={experto.participacionIniciativas} />
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Transparencia</h2>
            <div className="mt-4 rounded-2xl bg-[#FFF8F0] p-4 text-sm leading-6 text-slate-700 ring-1 ring-[#F7C9DD]">
              <strong className="text-[#0A4E84]">Conflictos de interés declarados:</strong> {experto.conflictosInteres}
            </div>
            <h3 className="mt-6 text-lg font-bold text-[#0A4E84]">Contribuciones al Congreso Cívico</h3>
            <div className="mt-4 space-y-3">
              {experto.contribucionesCongreso.map((contribucion) => (
                <div key={contribucion} className="rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
                  {contribucion}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <h2 className="text-xl font-bold text-[#E4007C]">Estados de interfaz</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {(Object.keys(estadosVisuales) as EstadoVisual[]).map((tipo) => {
              const estado = estadosVisuales[tipo];
              return (
                <div key={tipo} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <span className={`${estado.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{tipo}</span>
                  <div className="mt-3 font-bold text-[#0A4E84]">{estado.titulo}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{estado.descripcion}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
