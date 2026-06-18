import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";
type NivelPreliminar = "Aspirante" | "Colaborador" | "Experto" | "Especialista Senior";
type EstadoValidacion = "Pendiente" | "En revisión" | "Validación cívica" | "Observación";

type ExpertoCiudadano = {
  nombre: string;
  comite: string;
  especialidad: string;
  nivel: NivelPreliminar;
  puntajeTecnico: number;
  estadoValidacion: EstadoValidacion;
  ubicacion: string;
  participacionReciente: string;
  conflictosDeclarados: string;
  color: string;
};

const expertosCiudadanos: ExpertoCiudadano[] = [
  {
    nombre: "Ana Paula Rivera",
    comite: "Transparencia Legislativa",
    especialidad: "Rendición de cuentas",
    nivel: "Experto",
    puntajeTecnico: 86,
    estadoValidacion: "Validación cívica",
    ubicacion: "Ciudad de México",
    participacionReciente: "Revisión de formato ciudadano de votaciones",
    conflictosDeclarados: "Sin conflictos declarados en esta versión demo",
    color: "bg-[#E4007C] text-white",
  },
  {
    nombre: "Mariana Soto",
    comite: "Presupuesto Territorial",
    especialidad: "Finanzas públicas",
    nivel: "Especialista Senior",
    puntajeTecnico: 92,
    estadoValidacion: "En revisión",
    ubicacion: "Jalisco",
    participacionReciente: "Análisis de prioridades presupuestales locales",
    conflictosDeclarados: "Consultoría previa en proyectos de planeación local",
    color: "bg-[#0A4E84] text-white",
  },
  {
    nombre: "Daniela Chávez",
    comite: "Derechos y Participación",
    especialidad: "Participación ciudadana",
    nivel: "Colaborador",
    puntajeTecnico: 74,
    estadoValidacion: "Pendiente",
    ubicacion: "Nuevo León",
    participacionReciente: "Lectura de accesibilidad para propuestas ciudadanas",
    conflictosDeclarados: "Sin conflictos declarados en esta versión demo",
    color: "bg-[#16A34A] text-white",
  },
  {
    nombre: "Luis Fernando Mora",
    comite: "Transparencia Legislativa",
    especialidad: "Datos legislativos",
    nivel: "Experto",
    puntajeTecnico: 83,
    estadoValidacion: "Observación",
    ubicacion: "Estado de México",
    participacionReciente: "Organización de evidencia pública de asistencia",
    conflictosDeclarados: "Vínculo académico con institución pública",
    color: "bg-[#0EA5E9] text-white",
  },
  {
    nombre: "Rocío Padilla",
    comite: "Presupuesto Territorial",
    especialidad: "Obra pública",
    nivel: "Colaborador",
    puntajeTecnico: 78,
    estadoValidacion: "En revisión",
    ubicacion: "Veracruz",
    participacionReciente: "Ficha demo de seguimiento a obras comunitarias",
    conflictosDeclarados: "Sin conflictos declarados en esta versión demo",
    color: "bg-[#F97316] text-white",
  },
  {
    nombre: "Mateo Núñez",
    comite: "Derechos y Participación",
    especialidad: "Diseño cívico accesible",
    nivel: "Aspirante",
    puntajeTecnico: 68,
    estadoValidacion: "Pendiente",
    ubicacion: "Yucatán",
    participacionReciente: "Propuesta de glosario ciudadano para iniciativas",
    conflictosDeclarados: "Participación en colectivo ciudadano local",
    color: "bg-[#8B5CF6] text-white",
  },
];

const filtros = [
  { label: "Comité", opciones: ["Todos", "Transparencia Legislativa", "Presupuesto Territorial", "Derechos y Participación"] },
  { label: "Especialidad", opciones: ["Todas", "Rendición de cuentas", "Finanzas públicas", "Participación ciudadana", "Datos legislativos", "Obra pública"] },
  { label: "Nivel", opciones: ["Todos", "Aspirante", "Colaborador", "Experto", "Especialista Senior"] },
  { label: "Estado de validación", opciones: ["Todos", "Pendiente", "En revisión", "Validación cívica", "Observación"] },
] as const;

const estadosVisuales: Array<{
  tipo: EstadoVisual;
  titulo: string;
  descripcion: string;
  clase: string;
}> = [
  {
    tipo: "loading",
    titulo: "Cargando directorio",
    descripcion: "La lista de perfiles se está preparando para consulta ciudadana.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  {
    tipo: "empty",
    titulo: "Sin expertos registrados",
    descripcion: "Cuando existan perfiles demostrativos aparecerán en esta sección.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  {
    tipo: "error",
    titulo: "No se pudo mostrar el directorio",
    descripcion: "Esta vista no se conecta a servicios externos; el estado sirve como referencia visual.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
];

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

export default function CongresoCivicoComitesExpertosPage() {
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
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Directorio de expertos</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Consulta perfiles demostrativos de personas que podrían apoyar análisis técnico, revisión documental y seguimiento ciudadano.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Datos locales demo</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Este directorio no valida identidad ni credenciales todavía. La revisión real requerirá criterios públicos y trazabilidad.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            { label: "Perfiles demo", valor: expertosCiudadanos.length, clase: "bg-[#E4007C] text-white" },
            { label: "Comités", valor: 3, clase: "bg-[#0EA5E9] text-white" },
            { label: "Especialidades", valor: 6, clase: "bg-[#F2C300] text-[#1F2937]" },
            { label: "En validación", valor: expertosCiudadanos.filter((experto) => experto.estadoValidacion !== "Validación cívica").length, clase: "bg-[#8B5CF6] text-white" },
          ].map((metrica) => (
            <article key={metrica.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${metrica.clase} mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-2xl font-bold`}>{metrica.valor}</div>
              <div className="text-sm font-bold text-slate-700">{metrica.label}</div>
            </article>
          ))}
        </section>

        <section className="mb-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[#E4007C]">Filtros visuales</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Controles mock para preparar una búsqueda real por comité, especialidad, nivel y validación.</p>
            </div>
            <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">Sin conexión externa</span>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {filtros.map((filtro) => (
              <label key={filtro.label} className="block">
                <span className="text-sm font-bold text-[#0A4E84]">{filtro.label}</span>
                <select className="mt-2 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]" defaultValue={filtro.opciones[0]}>
                  {filtro.opciones.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {expertosCiudadanos.map((experto) => (
            <article key={experto.nombre} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
              <div className={`${experto.color} p-5`}>
                <div className="mb-8 flex items-center justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-lg font-bold">{iniciales(experto.nombre)}</div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">{experto.nivel}</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight">{experto.nombre}</h2>
                <p className="mt-2 text-sm opacity-95">{experto.especialidad}</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[#F8FAFC] p-3">
                    <div className="text-xs font-bold uppercase text-slate-500">Comité</div>
                    <div className="mt-1 font-bold text-[#0A4E84]">{experto.comite}</div>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3">
                    <div className="text-xs font-bold uppercase text-slate-500">Puntaje</div>
                    <div className="mt-1 font-bold text-[#E4007C]">{experto.puntajeTecnico}/100</div>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3">
                    <div className="text-xs font-bold uppercase text-slate-500">Validación</div>
                    <div className="mt-1 font-bold text-[#0A4E84]">{experto.estadoValidacion}</div>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAFC] p-3">
                    <div className="text-xs font-bold uppercase text-slate-500">Ubicación</div>
                    <div className="mt-1 font-bold text-[#0A4E84]">{experto.ubicacion}</div>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-[#FFF8F0] p-4 text-sm leading-6 text-slate-700 ring-1 ring-[#F7C9DD]">
                  <strong className="text-[#0A4E84]">Participación reciente:</strong> {experto.participacionReciente}
                </div>
                <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-slate-700">
                  <strong className="text-[#0A4E84]">Conflictos declarados:</strong> {experto.conflictosDeclarados}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD]">
          <h2 className="text-xl font-bold text-[#E4007C]">Estados de interfaz</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {estadosVisuales.map((estado) => (
              <div key={estado.tipo} className="rounded-2xl bg-[#F8FAFC] p-4">
                <span className={`${estado.clase} inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase`}>{estado.tipo}</span>
                <div className="mt-3 font-bold text-[#0A4E84]">{estado.titulo}</div>
                <p className="mt-1 text-sm leading-6 text-slate-600">{estado.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
