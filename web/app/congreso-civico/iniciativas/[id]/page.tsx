import Link from "next/link";
import { notFound } from "next/navigation";

type EstadoVisual = "loading" | "empty" | "error";
type EstadoIniciativa = "Recibida" | "En análisis" | "Con observaciones" | "Lista para seguimiento";

type IniciativaCivicaDetalle = {
  id: string;
  titulo: string;
  tema: string;
  estado: EstadoIniciativa;
  resumen: string;
  problemaPublico: string;
  propuesta: string;
  impactoEsperado: string;
  comiteTecnico: string;
  expertosRevisores: string[];
  observacionesTecnicas: string[];
  apoyoCiudadano: number;
  estadoLegislativoCivico: string;
  historialActividad: Array<{ fecha: string; actividad: string }>;
  color: string;
};

const estadoVisualActual = "ready" as EstadoVisual | "ready";

const iniciativasCivicas: IniciativaCivicaDetalle[] = [
  {
    id: "agua-y-servicios-locales",
    titulo: "Agua y servicios locales verificables",
    tema: "Agua",
    estado: "En análisis",
    resumen: "Seguimiento ciudadano a servicios de agua, mantenimiento y reportes territoriales.",
    problemaPublico: "La ciudadanía suele recibir información fragmentada sobre fallas, tiempos de respuesta y mantenimiento de servicios locales.",
    propuesta: "Crear fichas cívicas por territorio con reportes, evidencia disponible, tiempos de atención y prioridades comunitarias.",
    impactoEsperado: "Mejorar trazabilidad ciudadana, priorizar zonas con mayor necesidad y facilitar lectura pública de acciones locales.",
    comiteTecnico: "Comité de Presupuesto Territorial",
    expertosRevisores: ["Mariana Soto", "Rocío Padilla"],
    observacionesTecnicas: ["Definir fuente de reportes territoriales.", "Separar evidencia ciudadana de respuesta institucional.", "Evitar publicar datos personales sensibles."],
    apoyoCiudadano: 84,
    estadoLegislativoCivico: "Revisión técnica ciudadana inicial",
    historialActividad: [
      { fecha: "2 junio 2026", actividad: "Actualización de resumen ciudadano." },
      { fecha: "26 mayo 2026", actividad: "Asignación a comité técnico relacionado." },
      { fecha: "18 mayo 2026", actividad: "Recepción de propuesta demostrativa." },
    ],
    color: "bg-[#0EA5E9] text-white",
  },
  {
    id: "votaciones-legislativas-abiertas",
    titulo: "Votaciones legislativas abiertas",
    tema: "Transparencia",
    estado: "Con observaciones",
    resumen: "Fichas claras para explicar votaciones públicas, trazabilidad y lenguaje ciudadano.",
    problemaPublico: "Las votaciones públicas pueden ser difíciles de entender cuando no existe una síntesis ciudadana de tema, postura e impacto.",
    propuesta: "Crear fichas por votación con tema, sentido del voto, representantes relacionados y vínculos a evidencia pública.",
    impactoEsperado: "Fortalecer seguimiento ciudadano y reducir barreras de comprensión sobre actividad legislativa.",
    comiteTecnico: "Comité de Transparencia Legislativa",
    expertosRevisores: ["Ana Paula Rivera", "Luis Fernando Mora"],
    observacionesTecnicas: ["Precisar alcance de cada ficha.", "Incluir fecha y fuente verificable.", "Mantener lenguaje descriptivo y no acusatorio."],
    apoyoCiudadano: 91,
    estadoLegislativoCivico: "Con observaciones técnicas preliminares",
    historialActividad: [
      { fecha: "29 mayo 2026", actividad: "Carga de observaciones técnicas." },
      { fecha: "21 mayo 2026", actividad: "Revisión de lenguaje ciudadano." },
      { fecha: "12 mayo 2026", actividad: "Registro de iniciativa cívica." },
    ],
    color: "bg-[#E4007C] text-white",
  },
  {
    id: "participacion-accesible-barrios",
    titulo: "Participación accesible por barrios",
    tema: "Participación",
    estado: "Recibida",
    resumen: "Formatos simples para consultar propuestas ciudadanas por colonia y comunidad.",
    problemaPublico: "La participación puede excluir a personas cuando los formatos son largos, técnicos o poco accesibles.",
    propuesta: "Diseñar formatos breves por barrio con lectura clara, apoyo visual y consentimiento informado.",
    impactoEsperado: "Ampliar participación territorial y mejorar la calidad de propuestas ciudadanas recibidas.",
    comiteTecnico: "Comité de Derechos y Participación",
    expertosRevisores: ["Daniela Chávez", "Mateo Núñez"],
    observacionesTecnicas: ["Probar lenguaje con usuarios no especializados.", "Agregar criterios de privacidad.", "Separar opinión ciudadana de dictamen técnico."],
    apoyoCiudadano: 76,
    estadoLegislativoCivico: "Recibida para revisión inicial",
    historialActividad: [
      { fecha: "24 mayo 2026", actividad: "Recepción de propuesta demostrativa." },
      { fecha: "20 mayo 2026", actividad: "Registro de tema y comité sugerido." },
      { fecha: "14 mayo 2026", actividad: "Carga de resumen ciudadano." },
    ],
    color: "bg-[#16A34A] text-white",
  },
  {
    id: "presupuesto-visible-distrito",
    titulo: "Presupuesto visible por distrito",
    tema: "Presupuesto público",
    estado: "Lista para seguimiento",
    resumen: "Información presupuestal por territorio para facilitar revisión ciudadana.",
    problemaPublico: "La información presupuestal suele publicarse de forma agregada y dificulta seguimiento por distrito o comunidad.",
    propuesta: "Crear tablero cívico por distrito con montos, proyectos, fechas y fuentes verificables.",
    impactoEsperado: "Facilitar vigilancia ciudadana, comparación territorial y lectura clara de prioridades públicas.",
    comiteTecnico: "Comité de Presupuesto Territorial",
    expertosRevisores: ["Mariana Soto", "Ernesto Galván"],
    observacionesTecnicas: ["Estandarizar categorías presupuestales.", "Distinguir presupuesto aprobado y ejercido.", "Agregar fecha de actualización visible."],
    apoyoCiudadano: 88,
    estadoLegislativoCivico: "Lista para seguimiento ciudadano",
    historialActividad: [
      { fecha: "18 mayo 2026", actividad: "Validación de estructura demostrativa." },
      { fecha: "9 mayo 2026", actividad: "Revisión de criterios presupuestales." },
      { fecha: "1 mayo 2026", actividad: "Recepción de propuesta demostrativa." },
    ],
    color: "bg-[#F97316] text-white",
  },
];

const estadosVisuales: Record<EstadoVisual, { titulo: string; descripcion: string; clase: string }> = {
  loading: {
    titulo: "Cargando iniciativa",
    descripcion: "La información de la iniciativa se está preparando para consulta ciudadana.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  empty: {
    titulo: "Iniciativa sin información",
    descripcion: "Cuando existan datos demostrativos aparecerán en esta sección.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  error: {
    titulo: "No se pudo mostrar la iniciativa",
    descripcion: "Esta vista no se conecta a servicios externos; el estado sirve como referencia visual.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
};

export function generateStaticParams() {
  return iniciativasCivicas.map((iniciativa) => ({ id: iniciativa.id }));
}

function obtenerIniciativa(id: string) {
  return iniciativasCivicas.find((iniciativa) => iniciativa.id === id);
}

function EstadoDetalle({ tipo }: { tipo: EstadoVisual }) {
  const estado = estadosVisuales[tipo];

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/iniciativas" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a iniciativas
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

export default function CongresoCivicoIniciativaDetallePage({ params }: { params: { id: string } }) {
  if (estadoVisualActual !== "ready") {
    return <EstadoDetalle tipo={estadoVisualActual} />;
  }

  const iniciativa = obtenerIniciativa(params.id);

  if (!iniciativa) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/iniciativas" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a iniciativas
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Iniciativa Cívica</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{iniciativa.titulo}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{iniciativa.resumen}</p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <span className={`${iniciativa.color} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{iniciativa.estado}</span>
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Apoyo ciudadano mock</div>
              <div className="mt-2 text-4xl font-bold text-[#E4007C]">{iniciativa.apoyoCiudadano}%</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{iniciativa.estadoLegislativoCivico}</p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            { label: "Tema", valor: iniciativa.tema, clase: "bg-[#E4007C] text-white" },
            { label: "Comité", valor: iniciativa.comiteTecnico, clase: "bg-[#0EA5E9] text-white" },
            { label: "Revisores", valor: iniciativa.expertosRevisores.length, clase: "bg-[#F2C300] text-[#1F2937]" },
            { label: "Estado", valor: iniciativa.estado, clase: "bg-[#8B5CF6] text-white" },
          ].map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex min-h-12 items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-3">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Problema público</h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">{iniciativa.problemaPublico}</p>
          </article>
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Propuesta</h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">{iniciativa.propuesta}</p>
          </article>
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Impacto esperado</h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">{iniciativa.impactoEsperado}</p>
          </article>
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Revisión técnica</h2>
            <div className="mt-4 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
              <strong className="text-[#0A4E84]">Comité relacionado:</strong> {iniciativa.comiteTecnico}
            </div>
            <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
              <strong className="text-[#0A4E84]">Expertos revisores:</strong> {iniciativa.expertosRevisores.join(", ")}
            </div>
            <h3 className="mt-6 text-lg font-bold text-[#0A4E84]">Observaciones técnicas</h3>
            <div className="mt-4 space-y-3">
              {iniciativa.observacionesTecnicas.map((observacion) => (
                <div key={observacion} className="rounded-2xl bg-[#FFF8F0] p-4 text-sm leading-6 text-slate-700 ring-1 ring-[#F7C9DD]">
                  {observacion}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
            <h2 className="text-2xl font-bold text-[#E4007C]">Historial de actividad</h2>
            <div className="mt-5 space-y-3">
              {iniciativa.historialActividad.map((evento) => (
                <div key={`${evento.fecha}-${evento.actividad}`} className="rounded-2xl bg-[#F8FAFC] p-4">
                  <div className="text-xs font-bold uppercase text-slate-500">{evento.fecha}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{evento.actividad}</p>
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
