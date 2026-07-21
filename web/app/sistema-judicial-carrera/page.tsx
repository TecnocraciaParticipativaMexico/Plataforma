"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ModuleIdentityHeader } from "@/components/branding/ModuleIdentityHeader";
import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";

type PerfilTipo = "Jueza" | "Fiscal" | "Magistrada" | "Magistrado";
type RiesgoEtico = "Excelente" | "Observación" | "Revisión prioritaria";
type TabId = "panorama" | "directorio" | "dictamen" | "evidencia";
type InterfaceState = "loading" | "empty" | "error";

type Resolucion = {
  titulo: string;
  materia: string;
  criterio: string;
  impacto: string;
};

type PerfilJudicial = {
  id: string;
  nombre: string;
  tipo: PerfilTipo;
  cargo: string;
  entidad: string;
  materia: string;
  experiencia: number;
  formacion: string[];
  desempeno: number;
  etica: number;
  transparencia: number;
  riesgoEtico: RiesgoEtico;
  sintesis: string;
  resoluciones: Resolucion[];
  evidencias: string[];
  observaciones: string[];
};

const tabs: { id: TabId; label: string; description: string }[] = [
  {
    id: "panorama",
    label: "Panorama",
    description: "Indicadores generales del observatorio.",
  },
  {
    id: "directorio",
    label: "Directorio",
    description: "Perfiles y trayectorias verificables.",
  },
  {
    id: "dictamen",
    label: "Dictamen",
    description: "Documento ciudadano no vinculante.",
  },
  {
    id: "evidencia",
    label: "Evidencia",
    description: "Fuentes documentales demostrativas.",
  },
];

const perfiles: PerfilJudicial[] = [
  {
    id: "scj-001",
    nombre: "Dra. Elvia Rosaura Ortiz Macías",
    tipo: "Jueza",
    cargo: "Jueza de Distrito especializada en control constitucional",
    entidad: "Ciudad de México",
    materia: "Constitucional y amparo",
    experiencia: 24,
    formacion: ["Doctorado en Derecho Constitucional", "Especialidad en argumentación judicial", "Curso de independencia judicial"],
    desempeno: 96,
    etica: 98,
    transparencia: 94,
    riesgoEtico: "Excelente",
    sintesis:
      "Trayectoria consistente en criterios de debido proceso, publicidad de actuaciones y protección judicial efectiva.",
    resoluciones: [
      {
        titulo: "Amparo en materia de acceso a información judicial",
        materia: "Transparencia",
        criterio: "Máxima publicidad con protección de datos personales",
        impacto: "Fortalece consulta pública de expedientes anonimizados.",
      },
      {
        titulo: "Suspensión en caso de dilación procesal",
        materia: "Acceso a la justicia",
        criterio: "La demora irrazonable puede constituir afectación autónoma",
        impacto: "Establece parámetros comparables para revisar retrasos.",
      },
    ],
    evidencias: ["Versión pública de sentencia", "Síntesis curricular oficial", "Registro de cursos judiciales"],
    observaciones: ["No registra sanciones administrativas en el conjunto mock.", "Lenguaje de sentencias claro y motivado."],
  },
  {
    id: "scj-002",
    nombre: "Mtro. Javier Alejandro Becerra Flores",
    tipo: "Fiscal",
    cargo: "Fiscal especializado en litigio administrativo y agrario",
    entidad: "Oaxaca",
    materia: "Administrativa y agraria",
    experiencia: 19,
    formacion: ["Maestría en Derecho Administrativo", "Diplomado en derecho agrario", "Capacitación en evidencia digital"],
    desempeno: 91,
    etica: 93,
    transparencia: 88,
    riesgoEtico: "Excelente",
    sintesis:
      "Perfil con experiencia en expedientes territoriales complejos, comunidades agrarias y preservación de evidencia.",
    resoluciones: [
      {
        titulo: "Criterio técnico sobre restitución de tierras comunales",
        materia: "Agraria",
        criterio: "Valoración reforzada de pruebas históricas y periciales",
        impacto: "Ordena cronologías probatorias más legibles para partes afectadas.",
      },
    ],
    evidencias: ["Currículum público", "Actas de audiencia", "Bitácora de cadena de custodia demostrativa"],
    observaciones: ["Requiere mejorar publicación sistemática de criterios.", "Alta consistencia en integración de expedientes."],
  },
  {
    id: "scj-003",
    nombre: "Mtra. Ximena Guadalupe Flores Ríos",
    tipo: "Magistrada",
    cargo: "Magistrada con experiencia en derechos humanos",
    entidad: "Jalisco",
    materia: "Derechos humanos",
    experiencia: 15,
    formacion: ["Maestría en Derechos Humanos", "Peritaje internacional", "Justicia con perspectiva de género"],
    desempeno: 87,
    etica: 82,
    transparencia: 90,
    riesgoEtico: "Observación",
    sintesis:
      "Perfil sólido en estándares internacionales, con una observación ciudadana abierta por tiempos de respuesta.",
    resoluciones: [
      {
        titulo: "Protección judicial a víctimas indirectas",
        materia: "Derechos humanos",
        criterio: "Debida diligencia reforzada y trato digno",
        impacto: "Mejora parámetros de motivación en medidas de protección.",
      },
    ],
    evidencias: ["Sentencia pública anonimizada", "Informe ciudadano de demora", "Cédula profesional verificada"],
    observaciones: ["Una observación se encuentra en revisión documental.", "Buen nivel de transparencia curricular."],
  },
  {
    id: "scj-004",
    nombre: "Lic. Carlos Alberto Méndez Luna",
    tipo: "Magistrado",
    cargo: "Magistrado civil y mercantil de carrera judicial",
    entidad: "Nuevo León",
    materia: "Civil y mercantil",
    experiencia: 21,
    formacion: ["Licenciatura en Derecho", "Especialidad en justicia oral mercantil", "Ética judicial aplicada"],
    desempeno: 94,
    etica: 97,
    transparencia: 91,
    riesgoEtico: "Excelente",
    sintesis:
      "Trayectoria estable en resoluciones mercantiles, cumplimiento de plazos y trato procesal equilibrado.",
    resoluciones: [
      {
        titulo: "Criterio sobre ejecución mercantil proporcional",
        materia: "Mercantil",
        criterio: "Control de proporcionalidad en medidas de apremio",
        impacto: "Evita afectaciones excesivas sin debilitar ejecución de resoluciones.",
      },
    ],
    evidencias: ["Estadística de tiempos procesales", "Versión pública de criterio", "Constancias de capacitación"],
    observaciones: ["Sin alertas éticas en los datos demostrativos.", "Buen desempeño comparado por materia."],
  },
];

const estados: Record<InterfaceState, { title: string; description: string; tone: string }> = {
  loading: {
    title: "Cargando observatorio",
    description: "La interfaz simula una carga de perfiles, criterios y evidencia documental.",
    tone: "border-sky-200 bg-sky-50 text-sky-800",
  },
  empty: {
    title: "Sin resultados",
    description: "Ajusta la búsqueda o cambia el filtro para consultar otros perfiles demostrativos.",
    tone: "border-amber-200 bg-amber-50 text-amber-800",
  },
  error: {
    title: "No se pudo consultar",
    description: "Este estado muestra cómo se vería una falla futura sin conectar servicios reales.",
    tone: "border-rose-200 bg-rose-50 text-rose-800",
  },
};

function promedio(perfil: PerfilJudicial) {
  return Math.round((perfil.desempeno + perfil.etica + perfil.transparencia) / 3);
}

function riskClass(riesgo: RiesgoEtico) {
  if (riesgo === "Excelente") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (riesgo === "Observación") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-rose-50 text-rose-700 ring-rose-200";
}

function scoreClass(score: number) {
  if (score >= 92) return "bg-[#0A4E84] text-white";
  if (score >= 85) return "bg-[#F2C300] text-slate-900";
  return "bg-[#E4007C] text-white";
}

export default function SistemaJudicialCarreraPage() {
  const [activeTab, setActiveTab] = useState<TabId>("panorama");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(perfiles[0].id);
  const [estadoDemo, setEstadoDemo] = useState<InterfaceState | null>(null);

  const filteredProfiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return perfiles;

    return perfiles.filter((perfil) =>
      [perfil.nombre, perfil.tipo, perfil.cargo, perfil.entidad, perfil.materia, perfil.riesgoEtico]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const selectedProfile = perfiles.find((perfil) => perfil.id === selectedId) ?? perfiles[0];
  const avgScore = Math.round(perfiles.reduce((total, perfil) => total + promedio(perfil), 0) / perfiles.length);
  const excellentProfiles = perfiles.filter((perfil) => perfil.riesgoEtico === "Excelente").length;
  const evidenceCount = perfiles.reduce((total, perfil) => total + perfil.evidencias.length, 0);

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84] print:bg-white print:text-black">
      <ModuleIdentityHeader
        label="Módulo 06"
        title="Sistema Judicial de Carrera"
        description="Plataforma ciudadana para consultar y evaluar, mediante evidencia verificable, la trayectoria, experiencia, decisiones, ética profesional y desempeño de personas juzgadoras, fiscales y magistradas. Sus análisis y dictámenes ciudadanos son informativos y no vinculantes."
        badges={
          <>
            <span className="rounded-full bg-[#E4007C] px-3 py-1 text-xs font-black uppercase text-white">
              Observatorio técnico
            </span>
            <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-black uppercase text-slate-900">
              Dictamen no vinculante
            </span>
          </>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0A4E84] ring-1 ring-slate-200 transition hover:bg-slate-50">
            Inicio
          </Link>
          <Link href="/modulos" className="rounded-full bg-[#0A4E84] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#083E69]">
            Ver módulos
          </Link>
          <Link href="/mis-denuncias" className="rounded-full bg-[#E4007C] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#C2187A]">
            Perfil
          </Link>
        </div>
      </ModuleIdentityHeader>

      <section className="border-b border-slate-200 bg-white px-4 py-3 print:hidden">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-slate-600">
          <strong className="text-[#0A4E84]">Alcance ciudadano:</strong> las evaluaciones son informativas, documentadas y no vinculantes. No sustituyen resoluciones judiciales, procedimientos oficiales ni responsabilidades de autoridades competentes.
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-6 md:pt-8">
        <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#702F8A]" />
          <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr] lg:p-7">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Fundamento legal nacional</div>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[#0A4E84] md:text-4xl">
                Carrera judicial observable, comparable y verificable
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base">
                Fundamentado en los artículos 1, 6, 17, 20, 21, 94, 97, 100, 102 y 116 de la Constitución; la Ley General de Transparencia y Acceso a la Información Pública; la Ley General de Responsabilidades Administrativas; la Ley de Carrera Judicial del Poder Judicial de la Federación y la legislación aplicable en protección de datos personales.
              </p>
            </div>
            <aside className="rounded-[24px] bg-[#0A4E84] p-5 text-white shadow-sm">
              <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase text-[#F2C300]">
                Control cívico
              </div>
              <p className="mt-4 text-sm leading-6 text-white/90">
                El módulo compara trayectoria, resoluciones, tiempos, formación, evidencia y observaciones ciudadanas sin invadir la función jurisdiccional.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="text-2xl font-black">{perfiles.length}</div>
                  <div className="text-[11px] font-bold uppercase text-white/70">Perfiles</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="text-2xl font-black">{avgScore}</div>
                  <div className="text-[11px] font-bold uppercase text-white/70">Índice</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="text-2xl font-black">{evidenceCount}</div>
                  <div className="text-[11px] font-bold uppercase text-white/70">Fuentes</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <nav className="grid gap-2 rounded-[24px] bg-white p-2 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4 print:hidden" aria-label="Navegación interna del módulo">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={active}
                className={`rounded-2xl px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                  active ? "bg-[#E4007C] text-white shadow-sm" : "bg-slate-50 text-slate-700 hover:bg-[#E0F2FE]"
                }`}
              >
                <span className="block text-sm font-black">{tab.label}</span>
                <span className={`mt-1 block text-xs leading-5 ${active ? "text-white/80" : "text-slate-500"}`}>{tab.description}</span>
              </button>
            );
          })}
        </nav>

        {activeTab === "panorama" ? (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Índice promedio", value: avgScore, detail: "desempeño, ética y transparencia", className: "bg-[#0A4E84] text-white" },
                { label: "Perfiles excelentes", value: excellentProfiles, detail: "sin alertas abiertas en mocks", className: "bg-[#16A34A] text-white" },
                { label: "Resoluciones revisadas", value: perfiles.reduce((total, perfil) => total + perfil.resoluciones.length, 0), detail: "criterios demostrativos", className: "bg-[#F2C300] text-slate-900" },
                { label: "Observaciones", value: perfiles.reduce((total, perfil) => total + perfil.observaciones.length, 0), detail: "comentarios ciudadanos", className: "bg-[#E4007C] text-white" },
              ].map((item) => (
                <article key={item.label} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <div className={`mb-4 inline-flex h-14 min-w-14 items-center justify-center rounded-2xl px-4 text-2xl font-black ${item.className}`}>
                    {item.value}
                  </div>
                  <h3 className="font-black text-[#0A4E84]">{item.label}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-xl font-black text-[#0A4E84]">Estados de interfaz</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Vista demostrativa de carga, error y ausencia de datos para futuras integraciones.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(Object.keys(estados) as InterfaceState[]).map((estado) => (
                    <button
                      key={estado}
                      type="button"
                      onClick={() => setEstadoDemo((current) => (current === estado ? null : estado))}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#E4007C]"
                    >
                      {estados[estado].title}
                    </button>
                  ))}
                </div>
                {estadoDemo ? (
                  <div className={`mt-4 rounded-2xl border p-4 ${estados[estadoDemo].tone}`}>
                    <div className="font-black">{estados[estadoDemo].title}</div>
                    <p className="mt-1 text-sm leading-6">{estados[estadoDemo].description}</p>
                  </div>
                ) : null}
              </article>

              <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-xl font-black text-[#0A4E84]">Lectura técnica del observatorio</h3>
                <div className="mt-4 space-y-3">
                  {["Trayectoria profesional verificable", "Sentencias y criterios con fuente documental", "Desempeño comparado por materia", "Alertas éticas y derecho de réplica", "Dictamen ciudadano no vinculante"].map((item, index) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E4007C] text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div className="text-sm font-bold leading-6 text-slate-700">{item}</div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        ) : null}

        {activeTab === "directorio" ? (
          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <label htmlFor="buscar-perfil" className="block rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">Buscador de perfiles</span>
                <input
                  id="buscar-perfil"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por nombre, materia, entidad o cargo"
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#E4007C] focus:bg-white"
                />
              </label>

              {filteredProfiles.length ? (
                <div className="space-y-3">
                  {filteredProfiles.map((perfil) => {
                    const active = selectedProfile.id === perfil.id;
                    return (
                      <button
                        key={perfil.id}
                        type="button"
                        onClick={() => setSelectedId(perfil.id)}
                        className={`w-full rounded-[24px] p-4 text-left shadow-sm ring-1 transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                          active ? "bg-[#0A4E84] text-white ring-[#0A4E84]" : "bg-white text-slate-700 ring-slate-200 hover:bg-[#E0F2FE]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-black">{perfil.nombre}</div>
                            <div className={`mt-1 text-xs leading-5 ${active ? "text-white/75" : "text-slate-500"}`}>{perfil.tipo} - {perfil.entidad}</div>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-white/15 text-white" : scoreClass(promedio(perfil))}`}>
                            {promedio(perfil)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className={`rounded-2xl border p-4 ${estados.empty.tone}`}>
                  <div className="font-black">{estados.empty.title}</div>
                  <p className="mt-1 text-sm">{estados.empty.description}</p>
                </div>
              )}
            </div>

            <article className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">{selectedProfile.tipo}</div>
                  <h3 className="mt-1 text-2xl font-black text-[#0A4E84]">{selectedProfile.nombre}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{selectedProfile.cargo}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${riskClass(selectedProfile.riesgoEtico)}`}>
                  {selectedProfile.riesgoEtico}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Desempeño", value: selectedProfile.desempeno },
                  { label: "Ética", value: selectedProfile.etica },
                  { label: "Transparencia", value: selectedProfile.transparencia },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs font-black uppercase text-slate-500">{item.label}</div>
                    <div className="mt-1 text-3xl font-black text-[#0A4E84]">{item.value}</div>
                  </div>
                ))}
              </div>

              <p className="mt-5 rounded-2xl border-l-4 border-[#E4007C] bg-pink-50 p-4 text-sm leading-6 text-slate-700">
                {selectedProfile.sintesis}
              </p>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <section>
                  <h4 className="font-black text-[#0A4E84]">Trayectoria y formación</h4>
                  <div className="mt-3 text-sm leading-6 text-slate-600">{selectedProfile.experiencia} años de experiencia profesional.</div>
                  <ul className="mt-3 space-y-2">
                    {selectedProfile.formacion.map((item) => (
                      <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="font-black text-[#0A4E84]">Observaciones ciudadanas</h4>
                  <ul className="mt-3 space-y-2">
                    {selectedProfile.observaciones.map((item) => (
                      <li key={item} className="rounded-2xl bg-[#FFF7ED] px-4 py-3 text-sm font-semibold leading-6 text-slate-700">{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-5">
                <h4 className="font-black text-[#0A4E84]">Criterios, resoluciones o sentencias relevantes</h4>
                <div className="mt-3 grid gap-3">
                  {selectedProfile.resoluciones.map((resolucion) => (
                    <div key={resolucion.titulo} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="text-xs font-black uppercase text-[#E4007C]">{resolucion.materia}</div>
                      <h5 className="mt-1 font-black text-slate-800">{resolucion.titulo}</h5>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{resolucion.criterio}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#0A4E84]">{resolucion.impacto}</p>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </section>
        ) : null}

        {activeTab === "dictamen" ? (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">Dictamen ciudadano no vinculante</div>
              <h3 className="mt-2 text-2xl font-black text-[#0A4E84]">Evaluación técnica demostrativa</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Con base en datos mock, el observatorio identifica un índice promedio de {promedio(selectedProfile)} puntos para {selectedProfile.nombre}. La recomendación ciudadana es mantener observación documental, publicar fuentes verificables y permitir derecho de réplica cuando existan alertas.
              </p>
              <div className="mt-5 rounded-2xl border-l-4 border-[#F2C300] bg-[#FFF8D8] p-4 text-sm leading-6 text-slate-700">
                Este dictamen es informativo y no vinculante. No reemplaza procedimientos disciplinarios, recursos judiciales, resoluciones jurisdiccionales ni funciones constitucionales del Poder Judicial, fiscalías u órganos competentes.
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Perfil evaluado", value: selectedProfile.tipo },
                  { label: "Materia", value: selectedProfile.materia },
                  { label: "Entidad", value: selectedProfile.entidad },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs font-black uppercase text-slate-500">{item.label}</div>
                    <div className="mt-1 text-sm font-black text-[#0A4E84]">{item.value}</div>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-[28px] bg-[#111827] p-6 text-white shadow-sm">
              <div className="text-xs font-black uppercase tracking-[0.16em] text-[#F2C300]">Bitácora simulada</div>
              <div className="mt-5 space-y-3">
                {[
                  "Consulta de perfil y trayectoria",
                  "Revisión de resoluciones relevantes",
                  "Contraste de indicadores éticos",
                  "Generación de síntesis ciudadana",
                ].map((item, index) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4">
                    <div className="text-xs font-black uppercase text-white/55">Fase {index + 1}</div>
                    <div className="mt-1 text-sm font-bold">{item}</div>
                    <div className="mt-2 break-all rounded-xl bg-black/20 p-2 font-mono text-[11px] text-white/70">
                      sha256-demo-{selectedProfile.id}-{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        ) : null}

        {activeTab === "evidencia" ? (
          <section className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">Evidencia documental</div>
                <h3 className="mt-2 text-2xl font-black text-[#0A4E84]">Fuentes vinculadas a perfiles</h3>
              </div>
              <span className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-black text-[#0A4E84]">{evidenceCount} fuentes mock</span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {perfiles.map((perfil) => (
                <article key={perfil.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="font-black text-[#0A4E84]">{perfil.nombre}</div>
                  <div className="mt-1 text-xs font-bold uppercase text-slate-500">{perfil.materia}</div>
                  <ul className="mt-3 space-y-2">
                    {perfil.evidencias.map((evidencia) => (
                      <li key={evidencia} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                        {evidencia}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <PlatformFooterBanner />
      </div>

      <PlatformBottomNav />
    </main>
  );
}
