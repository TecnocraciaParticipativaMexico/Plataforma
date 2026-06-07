import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";

type NivelPreliminar = "Aspirante" | "Colaborador" | "Experto" | "Especialista Senior";

type PreguntaEvaluacion = {
  numero: number;
  titulo: string;
  descripcion: string;
  tipo: "select" | "textarea" | "number" | "checkbox";
  opciones?: readonly string[];
};

const nivelesPreliminares: Array<{
  nivel: NivelPreliminar;
  descripcion: string;
  clase: string;
}> = [
  { nivel: "Aspirante", descripcion: "Perfil inicial con interés cívico y área de aprendizaje clara.", clase: "bg-[#E0F2FE] text-[#0369A1]" },
  { nivel: "Colaborador", descripcion: "Perfil con experiencia útil para apoyar revisión documental y trabajo por proyecto.", clase: "bg-[#DCFCE7] text-[#166534]" },
  { nivel: "Experto", descripcion: "Perfil con trayectoria técnica y capacidad de emitir análisis colegiado.", clase: "bg-[#FFF1A8] text-[#0A4E84]" },
  { nivel: "Especialista Senior", descripcion: "Perfil con experiencia amplia para coordinación metodológica y revisión avanzada.", clase: "bg-[#FCE7F3] text-[#BE185D]" },
];

const estadosVisuales: Array<{
  tipo: EstadoVisual;
  titulo: string;
  descripcion: string;
  clase: string;
}> = [
  {
    tipo: "loading",
    titulo: "Cargando evaluación",
    descripcion: "El cuestionario se está preparando para mostrar los campos disponibles.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  {
    tipo: "empty",
    titulo: "Sin evaluaciones registradas",
    descripcion: "Cuando existan respuestas demostrativas aparecerán en este espacio.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  {
    tipo: "error",
    titulo: "No se pudo mostrar la evaluación",
    descripcion: "Esta vista no se conecta a servicios externos; el estado sirve como referencia visual.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
];

const preguntasEvaluacion: PreguntaEvaluacion[] = [
  {
    numero: 1,
    titulo: "Área principal de especialización",
    descripcion: "Selecciona el campo donde podrías aportar revisión técnica.",
    tipo: "select",
    opciones: ["Derecho público", "Presupuesto público", "Salud", "Educación", "Infraestructura", "Datos cívicos"],
  },
  {
    numero: 2,
    titulo: "Nivel máximo de estudios",
    descripcion: "Indica tu nivel formativo más alto o equivalente por trayectoria.",
    tipo: "select",
    opciones: ["Licenciatura", "Especialidad", "Maestría", "Doctorado", "Trayectoria equivalente"],
  },
  {
    numero: 3,
    titulo: "Años de experiencia",
    descripcion: "Incluye experiencia profesional, académica, comunitaria o técnica verificable.",
    tipo: "number",
  },
  {
    numero: 4,
    titulo: "Experiencia profesional relevante",
    descripcion: "Resume los proyectos, cargos o actividades más vinculadas al comité.",
    tipo: "textarea",
  },
  {
    numero: 5,
    titulo: "Participación en proyectos públicos o sociales",
    descripcion: "Describe participación en proyectos con impacto público, social o comunitario.",
    tipo: "textarea",
  },
  {
    numero: 6,
    titulo: "Publicaciones, investigaciones o proyectos destacados",
    descripcion: "Agrega referencias que ayuden a conocer tu trabajo técnico o cívico.",
    tipo: "textarea",
  },
  {
    numero: 7,
    titulo: "Declaración de posibles conflictos de interés",
    descripcion: "Señala vínculos profesionales, institucionales o personales que deban transparentarse.",
    tipo: "textarea",
  },
  {
    numero: 8,
    titulo: "Caso práctico breve para análisis técnico",
    descripcion: "Explica cómo revisarías una iniciativa ciudadana con evidencia incompleta y alto interés público.",
    tipo: "textarea",
  },
  {
    numero: 9,
    titulo: "Compromiso con evidencia y datos verificables",
    descripcion: "Confirma que tu análisis priorizaría evidencia, trazabilidad y lenguaje neutral.",
    tipo: "checkbox",
  },
  {
    numero: 10,
    titulo: "Disponibilidad para colaborar en el comité",
    descripcion: "Selecciona la forma de colaboración que podrías sostener.",
    tipo: "select",
    opciones: ["Sesiones semanales", "Sesiones quincenales", "Revisión por proyecto", "Disponibilidad limitada"],
  },
];

function CampoPregunta({ pregunta }: { pregunta: PreguntaEvaluacion }) {
  const label = `${pregunta.numero}. ${pregunta.titulo}`;

  if (pregunta.tipo === "select") {
    return (
      <label className="block rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <span className="text-base font-bold text-[#0A4E84]">{label}</span>
        <p className="mt-2 text-sm leading-6 text-slate-600">{pregunta.descripcion}</p>
        <select className="mt-4 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]" defaultValue="">
          <option value="" disabled>
            Selecciona una opción
          </option>
          {pregunta.opciones?.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (pregunta.tipo === "number") {
    return (
      <label className="block rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <span className="text-base font-bold text-[#0A4E84]">{label}</span>
        <p className="mt-2 text-sm leading-6 text-slate-600">{pregunta.descripcion}</p>
        <input
          type="number"
          placeholder="Ej. 8"
          className="mt-4 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]"
        />
      </label>
    );
  }

  if (pregunta.tipo === "checkbox") {
    return (
      <label className="flex gap-4 rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
        <input type="checkbox" className="mt-1 h-5 w-5 rounded border-[#F7C9DD] accent-[#E4007C]" />
        <span>
          <span className="block text-base font-bold text-[#0A4E84]">{label}</span>
          <span className="mt-2 block text-sm leading-6 text-slate-600">{pregunta.descripcion}</span>
        </span>
      </label>
    );
  }

  return (
    <label className="block rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <span className="text-base font-bold text-[#0A4E84]">{label}</span>
      <p className="mt-2 text-sm leading-6 text-slate-600">{pregunta.descripcion}</p>
      <textarea
        rows={5}
        placeholder="Escribe una respuesta breve y verificable."
        className="mt-4 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]"
      />
    </label>
  );
}

export default function CongresoCivicoComitesEvaluacionPage() {
  const puntajeMock = 82;
  const nivelMock: NivelPreliminar = "Experto";
  const nivelActivo = nivelesPreliminares.find((nivel) => nivel.nivel === nivelMock);

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/comites" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Comités
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Comités de Expertos Ciudadanos</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Evaluación inicial</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Cuestionario demostrativo para conocer experiencia, enfoque técnico y disponibilidad de colaboración cívica.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Sin conexión a base de datos</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta evaluación usa datos mock locales. No guarda respuestas ni representa una validación oficial todavía.
              </p>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <form className="space-y-4">
            {preguntasEvaluacion.map((pregunta) => (
              <CampoPregunta key={pregunta.numero} pregunta={pregunta} />
            ))}

            <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
              <h2 className="text-2xl font-bold text-[#E4007C]">Resultado preliminar mock</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-[0.4fr_0.6fr]">
                <div className="rounded-[24px] bg-[#0A4E84] p-5 text-white">
                  <div className="text-sm font-bold uppercase tracking-[0.12em] text-white/80">Puntaje</div>
                  <div className="mt-2 text-5xl font-bold">{puntajeMock}</div>
                  <div className="mt-1 text-sm text-white/80">de 100 puntos</div>
                </div>
                <div className="rounded-[24px] bg-[#F8FAFC] p-5">
                  <span className={`${nivelActivo?.clase ?? "bg-[#E0F2FE] text-[#0369A1]"} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>
                    {nivelMock}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-slate-700">
                    {nivelActivo?.descripcion} Este resultado es solo una vista demostrativa para futura revisión cívica con criterios públicos.
                  </p>
                </div>
              </div>
              <button type="button" className="mt-6 inline-flex rounded-full bg-[#E4007C] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9006B]">
                Calcular evaluación demo
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <section className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
              <h2 className="text-xl font-bold">Niveles preliminares</h2>
              <div className="mt-5 space-y-3">
                {nivelesPreliminares.map((nivel) => (
                  <div key={nivel.nivel} className="rounded-2xl bg-white/10 p-4">
                    <span className={`${nivel.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{nivel.nivel}</span>
                    <p className="mt-3 text-sm leading-6 text-white/90">{nivel.descripcion}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
              <h2 className="text-xl font-bold text-[#E4007C]">Estados de interfaz</h2>
              <div className="mt-4 space-y-3">
                {estadosVisuales.map((estado) => (
                  <div key={estado.tipo} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <span className={`${estado.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{estado.tipo}</span>
                    <div className="mt-3 font-bold text-[#0A4E84]">{estado.titulo}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{estado.descripcion}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
