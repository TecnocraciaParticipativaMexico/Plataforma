import Link from "next/link";

type EstadoVisual = "loading" | "empty" | "error";

const comitesDeInteres = [
  "Comité de Transparencia Legislativa",
  "Comité de Presupuesto Territorial",
  "Comité de Derechos y Participación",
] as const;

const areasDeExperiencia = [
  "Derecho público",
  "Presupuesto y finanzas",
  "Participación ciudadana",
  "Datos y tecnología cívica",
  "Comunicación pública",
  "Trabajo comunitario",
] as const;

const disponibilidades = [
  "2 a 4 horas por semana",
  "5 a 8 horas por semana",
  "Sesiones quincenales",
  "Participación por proyecto",
] as const;

const estadosVisuales: Array<{
  tipo: EstadoVisual;
  titulo: string;
  descripcion: string;
  clase: string;
}> = [
  {
    tipo: "loading",
    titulo: "Cargando solicitud",
    descripcion: "El formulario se está preparando para mostrar la información disponible.",
    clase: "bg-[#E0F2FE] text-[#0369A1]",
  },
  {
    tipo: "empty",
    titulo: "Sin solicitudes registradas",
    descripcion: "Cuando existan solicitudes demostrativas aparecerán en este espacio.",
    clase: "bg-[#FFF1A8] text-[#0A4E84]",
  },
  {
    tipo: "error",
    titulo: "No se pudo mostrar la solicitud",
    descripcion: "Esta vista no se conecta a servicios externos; el estado sirve como referencia visual.",
    clase: "bg-[#FCE7F3] text-[#BE185D]",
  },
];

function CampoTexto({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#0A4E84]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]"
      />
    </label>
  );
}

function CampoSelect({ label, opciones, placeholder }: { label: string; opciones: readonly string[]; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#0A4E84]">{label}</span>
      <select className="mt-2 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]" defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function CongresoCivicoComitesSolicitudPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico/comites" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Comités
        </Link>

        <section className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">Comités de Expertos Ciudadanos</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Solicitud de ingreso</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                Comparte tu perfil para una futura revisión cívica de participación en comités ciudadanos.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <div className="inline-flex rounded-full bg-[#E4007C] px-3 py-1 text-xs font-bold uppercase text-white">Aviso importante</div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Esta es una solicitud cívica inicial y demostrativa. No constituye validación oficial ni incorporación formal todavía.
              </p>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <form className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#F7C9DD] md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-[#E4007C]">Datos de postulación</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Formulario visual con datos locales. No guarda ni envía información.</p>
              </div>
              <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-bold text-[#0369A1]">Demo frontend</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <CampoTexto label="Nombre" placeholder="Nombre público" />
              <CampoTexto label="Correo" placeholder="correo@ejemplo.mx" type="email" />
              <CampoTexto label="Ciudad / estado" placeholder="Ej. Guadalajara, Jalisco" />
              <CampoSelect label="Comité de interés" opciones={comitesDeInteres} placeholder="Selecciona un comité" />
              <CampoSelect label="Área de experiencia" opciones={areasDeExperiencia} placeholder="Selecciona un área" />
              <CampoTexto label="Años de experiencia" placeholder="Ej. 5" type="number" />
              <CampoSelect label="Disponibilidad" opciones={disponibilidades} placeholder="Selecciona disponibilidad" />
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-bold text-[#0A4E84]">Motivo de postulación</span>
              <textarea
                placeholder="Cuéntanos por qué quieres participar y qué experiencia podrías aportar."
                rows={6}
                className="mt-2 w-full rounded-2xl border border-[#F7C9DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#E4007C] focus:ring-2 focus:ring-[#F7C9DD]"
              />
            </label>

            <div className="mt-6 rounded-2xl bg-[#FFF8F0] p-4 text-sm leading-6 text-slate-700 ring-1 ring-[#F7C9DD]">
              Al continuar, la plataforma solo mostraría una vista demostrativa. La revisión real requerirá verificación cívica, criterios públicos y trazabilidad en una etapa posterior.
            </div>

            <button type="button" className="mt-6 inline-flex rounded-full bg-[#E4007C] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9006B]">
              Enviar solicitud demo
            </button>
          </form>

          <aside className="space-y-5">
            <section className="rounded-[28px] bg-[#0A4E84] p-6 text-white shadow-sm">
              <h2 className="text-xl font-bold">¿Qué sigue después?</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-white/90">
                <p>1. Registrar interés ciudadano.</p>
                <p>2. Revisar perfil con criterios públicos.</p>
                <p>3. Integrar comités con trazabilidad y rotación.</p>
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
