"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  alertasRepresentacionCongresoCivico,
  curulesDiputadosCongresoCivico,
  escanosSenadoCongresoCivico,
  estadosRepresentacionCongresoCivico,
  representantesMapaCongresoCivico,
  type CongresoCivicoCurulEscano,
  type CongresoCivicoTipoRepresentacion,
} from "../../lib/congresoCivicoRepresentacion";

type ColoniaOption = { nombre: string; codigoPostal: string };
type MunicipioOption = { nombre: string; colonias: ColoniaOption[] };
type EstadoOption = { estado: string; municipios: MunicipioOption[] };
type PostalLocation = { estado: EstadoOption; municipio: MunicipioOption; colonia: ColoniaOption };
type EstadoSeed = { estado: string; municipios: [string, string, string]; cpBase: number };

// TODO: reemplazar MEXICO_LOCATION_OPTIONS por dataset oficial/normalizado en PR posterior.
const MEXICO_LOCATION_SEEDS: EstadoSeed[] = [
  { estado: "Aguascalientes", municipios: ["Aguascalientes", "Jesús María", "Calvillo"], cpBase: 20000 },
  { estado: "Baja California", municipios: ["Tijuana", "Mexicali", "Ensenada"], cpBase: 22000 },
  { estado: "Baja California Sur", municipios: ["La Paz", "Los Cabos", "Comondú"], cpBase: 23000 },
  { estado: "Campeche", municipios: ["Campeche", "Carmen", "Champotón"], cpBase: 24000 },
  { estado: "Chiapas", municipios: ["Tuxtla Gutiérrez", "San Cristóbal de las Casas", "Tapachula"], cpBase: 29000 },
  { estado: "Chihuahua", municipios: ["Chihuahua", "Juárez", "Delicias"], cpBase: 31000 },
  { estado: "Ciudad de México", municipios: ["Cuauhtémoc", "Coyoacán", "Iztapalapa"], cpBase: 6000 },
  { estado: "Coahuila", municipios: ["Saltillo", "Torreón", "Monclova"], cpBase: 25000 },
  { estado: "Colima", municipios: ["Colima", "Manzanillo", "Tecomán"], cpBase: 28000 },
  { estado: "Durango", municipios: ["Durango", "Gómez Palacio", "Lerdo"], cpBase: 34000 },
  { estado: "Estado de México", municipios: ["Toluca", "Ecatepec", "Naucalpan"], cpBase: 50000 },
  { estado: "Guanajuato", municipios: ["León", "Irapuato", "Celaya"], cpBase: 37000 },
  { estado: "Guerrero", municipios: ["Acapulco", "Chilpancingo", "Iguala"], cpBase: 39000 },
  { estado: "Hidalgo", municipios: ["Pachuca", "Tulancingo", "Tula de Allende"], cpBase: 42000 },
  { estado: "Jalisco", municipios: ["Guadalajara", "Zapopan", "Tlaquepaque"], cpBase: 44100 },
  { estado: "Michoacán", municipios: ["Morelia", "Uruapan", "Zamora"], cpBase: 58000 },
  { estado: "Morelos", municipios: ["Cuernavaca", "Jiutepec", "Cuautla"], cpBase: 62000 },
  { estado: "Nayarit", municipios: ["Tepic", "Bahía de Banderas", "Santiago Ixcuintla"], cpBase: 63000 },
  { estado: "Nuevo León", municipios: ["Monterrey", "San Pedro Garza García", "Guadalupe"], cpBase: 64000 },
  { estado: "Oaxaca", municipios: ["Oaxaca de Juárez", "Tlacolula de Matamoros", "Juchitán de Zaragoza"], cpBase: 68000 },
  { estado: "Puebla", municipios: ["Puebla", "Tehuacán", "San Andrés Cholula"], cpBase: 72000 },
  { estado: "Querétaro", municipios: ["Querétaro", "San Juan del Río", "Corregidora"], cpBase: 76000 },
  { estado: "Quintana Roo", municipios: ["Benito Juárez", "Solidaridad", "Othón P. Blanco"], cpBase: 77000 },
  { estado: "San Luis Potosí", municipios: ["San Luis Potosí", "Soledad de Graciano Sánchez", "Ciudad Valles"], cpBase: 78000 },
  { estado: "Sinaloa", municipios: ["Culiacán", "Mazatlán", "Ahome"], cpBase: 80000 },
  { estado: "Sonora", municipios: ["Hermosillo", "Cajeme", "Nogales"], cpBase: 83000 },
  { estado: "Tabasco", municipios: ["Centro", "Cárdenas", "Comalcalco"], cpBase: 86000 },
  { estado: "Tamaulipas", municipios: ["Ciudad Victoria", "Reynosa", "Tampico"], cpBase: 87000 },
  { estado: "Tlaxcala", municipios: ["Tlaxcala", "Apizaco", "Huamantla"], cpBase: 90000 },
  { estado: "Veracruz", municipios: ["Veracruz", "Xalapa", "Coatzacoalcos"], cpBase: 91000 },
  { estado: "Yucatán", municipios: ["Mérida", "Valladolid", "Progreso"], cpBase: 97000 },
  { estado: "Zacatecas", municipios: ["Zacatecas", "Guadalupe", "Fresnillo"], cpBase: 98000 },
];

const coloniasBase = ["Centro", "Jardines", "San Miguel"] as const;

const MEXICO_LOCATION_OPTIONS: EstadoOption[] = MEXICO_LOCATION_SEEDS.map((seed) => ({
  estado: seed.estado,
  municipios: seed.municipios.map((nombre, municipioIndex) => ({
    nombre,
    colonias: coloniasBase.map((colonia, coloniaIndex) => ({
      nombre: coloniaIndex === 0 ? colonia : `${colonia} ${nombre}`,
      codigoPostal: String(seed.cpBase + municipioIndex * 120 + coloniaIndex * 7).padStart(5, "0"),
    })),
  })),
}));

function getMunicipiosByEstado(estado: string): MunicipioOption[] {
  return MEXICO_LOCATION_OPTIONS.find((item) => item.estado === estado)?.municipios ?? MEXICO_LOCATION_OPTIONS[0].municipios;
}

function getColoniasByMunicipio(estado: string, municipio: string): ColoniaOption[] {
  const municipios = getMunicipiosByEstado(estado);
  return municipios.find((item) => item.nombre === municipio)?.colonias ?? municipios[0].colonias;
}

function findLocationByPostalCode(codigoPostal: string): PostalLocation | null {
  const normalized = codigoPostal.trim();

  for (const estado of MEXICO_LOCATION_OPTIONS) {
    for (const municipio of estado.municipios) {
      for (const colonia of municipio.colonias) {
        if (colonia.codigoPostal === normalized) {
          return { estado, municipio, colonia };
        }
      }
    }
  }

  return null;
}

const metricasRepresentacion = [
  { label: "Representantes registrados", valor: representantesMapaCongresoCivico.length, color: "bg-[#E4007C]", text: "text-[#E4007C]" },
  { label: "Curules de Diputados registradas", valor: curulesDiputadosCongresoCivico.length, color: "bg-[#0EA5E9]", text: "text-[#0EA5E9]" },
  { label: "Escaños del Senado registrados", valor: escanosSenadoCongresoCivico.length, color: "bg-[#F97316]", text: "text-[#F97316]" },
  { label: "Estados disponibles", valor: estadosRepresentacionCongresoCivico.length, color: "bg-[#16A34A]", text: "text-[#16A34A]" },
  { label: "Alertas cívicas activas", valor: alertasRepresentacionCongresoCivico.length, color: "bg-[#8B5CF6]", text: "text-[#8B5CF6]" },
] as const;

const tipoRepresentacionConfig: Record<CongresoCivicoTipoRepresentacion | "sin-datos", { label: string; dot: string; bg: string; text: string; hex: string }> = {
  "voto-directo": { label: "Elegido por voto directo", dot: "bg-[#E4007C]", bg: "bg-[#FCE7F3]", text: "text-[#E4007C]", hex: "#E4007C" },
  "representacion-proporcional": { label: "Representación proporcional", dot: "bg-[#0EA5E9]", bg: "bg-[#E0F2FE]", text: "text-[#0EA5E9]", hex: "#0EA5E9" },
  "disputa-ciudadana": { label: "Representación en disputa ciudadana", dot: "bg-[#F97316]", bg: "bg-[#FFEDD5]", text: "text-[#F97316]", hex: "#F97316" },
  "curul-socialmente-impugnada": { label: "Curul socialmente impugnada", dot: "bg-[#F2C300]", bg: "bg-[#FEF3C7]", text: "text-[#D97706]", hex: "#F2C300" },
  "representante-ciudadano": { label: "Representante ciudadano por voto popular", dot: "bg-[#8B5CF6]", bg: "bg-[#EDE9FE]", text: "text-[#8B5CF6]", hex: "#8B5CF6" },
  "legislador-funciones": { label: "Legislador en funciones", dot: "bg-[#16A34A]", bg: "bg-[#DCFCE7]", text: "text-[#16A34A]", hex: "#16A34A" },
  "sin-datos": { label: "Sin datos", dot: "bg-[#CBD5E1]", bg: "bg-slate-100", text: "text-slate-500", hex: "#CBD5E1" },
};

const accesosRepresentacion = [
  { titulo: "Cámara de Diputados", descripcion: "Consulta las 500 curules y quiénes las ocupan.", href: "/congreso-civico/representacion/diputados", color: "bg-[#E4007C]", text: "text-[#E4007C]", icon: "●●●" },
  { titulo: "Senado de la República", descripcion: "Consulta los 128 escaños y quiénes los ocupan.", href: "/congreso-civico/representacion/senado", color: "bg-[#0EA5E9]", text: "text-[#0EA5E9]", icon: "●●" },
  { titulo: "Buscar mi representante", descripcion: "Prueba la búsqueda demo por estado, municipio, colonia o código postal.", href: "/congreso-civico/representacion/buscar", color: "bg-[#F97316]", text: "text-[#F97316]", icon: "⌕" },
  { titulo: "Representación por estado", descripcion: "Explora cómo se distribuyen los representantes en tu estado.", href: "/congreso-civico/representacion/estados", color: "bg-[#16A34A]", text: "text-[#16A34A]", icon: "◆" },
] as const;

const representantePrincipal = representantesMapaCongresoCivico[0];
const representanteConfig = tipoRepresentacionConfig[representantePrincipal.tipoRepresentacion];
const tabsRepresentante = ["Resumen", "Actividad Legislativa", "Votaciones", "Asistencia", "Propuestas Ciudadanas", "Alertas Cívicas", "Alineación Territorial"] as const;
const estadoInicial = MEXICO_LOCATION_OPTIONS.find((item) => item.estado === "Ciudad de México") ?? MEXICO_LOCATION_OPTIONS[0];
const municipioInicial = estadoInicial.municipios[0];
const coloniaInicial = municipioInicial.colonias[0];

function obtenerTipo(asiento: CongresoCivicoCurulEscano): CongresoCivicoTipoRepresentacion | "sin-datos" {
  return asiento.representanteId ? asiento.tipoRepresentacion : "sin-datos";
}

function HemicicloVisual({ asientos, total, label, compact = false }: { asientos: CongresoCivicoCurulEscano[]; total: number; label: string; compact?: boolean }) {
  const puntos = asientos.map((asiento, index) => {
    const totalPuntos = Math.max(asientos.length - 1, 1);
    const angulo = Math.PI - (Math.PI * index) / totalPuntos;
    const radioX = compact ? 42 : 45;
    const radioY = compact ? 42 : 49;
    const x = 50 + radioX * Math.cos(angulo);
    const y = 65 - radioY * Math.sin(angulo);

    return { asiento, x, y };
  });

  return (
    <div className={`relative mx-auto ${compact ? "h-32 max-w-[240px]" : "h-56 max-w-[420px]"}`}>
      <div className="absolute inset-x-[8%] bottom-4 h-[76%] rounded-t-full bg-[#F8FAFC] shadow-inner" />
      {puntos.map(({ asiento, x, y }) => {
        const config = tipoRepresentacionConfig[obtenerTipo(asiento)];
        return (
          <span
            key={asiento.id}
            className="absolute rounded-full shadow-sm ring-2 ring-white"
            style={{
              backgroundColor: config.hex,
              height: compact ? 11 : 15,
              width: compact ? 11 : 15,
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={config.label}
          />
        );
      })}
      <div className={`absolute left-1/2 -translate-x-1/2 rounded-t-full bg-[#0A4E84] ${compact ? "bottom-8 h-5 w-16" : "bottom-11 h-8 w-28"}`} />
      <div className={`absolute left-1/2 -translate-x-1/2 rounded-2xl bg-white text-center shadow-sm ring-1 ring-[#E5E7EB] ${compact ? "bottom-1 w-20 px-2 py-1" : "bottom-1 w-28 px-3 py-2"}`}>
        <div className={`${compact ? "text-lg" : "text-2xl"} font-black leading-none text-[#111827]`}>{total}</div>
        <div className="mt-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-slate-600">{label}</div>
      </div>
    </div>
  );
}

function EstadoPlaceholder() {
  const puntos = [
    "left-[18%] top-[30%] bg-[#E4007C]",
    "left-[32%] top-[42%] bg-[#0EA5E9]",
    "left-[46%] top-[36%] bg-[#F97316]",
    "left-[58%] top-[55%] bg-[#16A34A]",
    "left-[69%] top-[43%] bg-[#8B5CF6]",
    "left-[80%] top-[64%] bg-[#F2C300]",
  ];

  return (
    <div className="relative h-52 overflow-hidden rounded-2xl bg-[#F8FAFC] shadow-inner">
      <div className="absolute inset-5 rounded-[32px] border border-dashed border-slate-300 bg-white/70" />
      <div className="absolute inset-x-8 top-12 h-20 rounded-full bg-slate-200/70" />
      <div className="absolute left-[42%] top-[44%] h-14 w-32 rotate-[18deg] rounded-full bg-slate-200/70" />
      {puntos.map((clase, index) => <span key={index} className={`absolute h-4 w-4 rounded-full shadow-sm ring-4 ring-white ${clase}`} />)}
      <div className="absolute bottom-4 left-4 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-[#E5E7EB]">
        <div className="text-sm font-black text-[#111827]">Mapa nacional en preparación</div>
        <div className="mt-1 text-xs font-bold text-slate-600">32 estados disponibles en el buscador</div>
      </div>
    </div>
  );
}

export default function CongresoCivicoRepresentacionPage() {
  const [estado, setEstado] = useState(estadoInicial.estado);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(municipioInicial.nombre);
  const [coloniaSeleccionada, setColoniaSeleccionada] = useState(coloniaInicial.nombre);
  const [codigoPostal, setCodigoPostal] = useState(coloniaInicial.codigoPostal);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [postalNoDisponible, setPostalNoDisponible] = useState(false);

  const municipios = useMemo(() => getMunicipiosByEstado(estado), [estado]);
  const colonias = useMemo(() => getColoniasByMunicipio(estado, municipioSeleccionado), [estado, municipioSeleccionado]);
  const municipioActual = municipios.find((item) => item.nombre === municipioSeleccionado) ?? municipios[0];
  const coloniaActual = colonias.find((item) => item.nombre === coloniaSeleccionada) ?? colonias[0];

  function resetResultado() {
    setMostrarResultado(false);
    setPostalNoDisponible(false);
  }

  function actualizarEstado(nuevoEstado: string) {
    const siguientesMunicipios = getMunicipiosByEstado(nuevoEstado);
    const siguienteMunicipio = siguientesMunicipios[0];
    const siguienteColonia = siguienteMunicipio.colonias[0];
    setEstado(nuevoEstado);
    setMunicipioSeleccionado(siguienteMunicipio.nombre);
    setColoniaSeleccionada(siguienteColonia.nombre);
    setCodigoPostal(siguienteColonia.codigoPostal);
    resetResultado();
  }

  function actualizarMunicipio(nuevoMunicipio: string) {
    const siguienteColonia = getColoniasByMunicipio(estado, nuevoMunicipio)[0];
    setMunicipioSeleccionado(nuevoMunicipio);
    setColoniaSeleccionada(siguienteColonia.nombre);
    setCodigoPostal(siguienteColonia.codigoPostal);
    resetResultado();
  }

  function actualizarColonia(nuevaColonia: string) {
    const siguienteColonia = colonias.find((item) => item.nombre === nuevaColonia) ?? colonias[0];
    setColoniaSeleccionada(siguienteColonia.nombre);
    setCodigoPostal(siguienteColonia.codigoPostal);
    resetResultado();
  }

  function actualizarCodigoPostal(nuevoCodigoPostal: string) {
    const limpio = nuevoCodigoPostal.replace(/\D/g, "").slice(0, 5);
    setCodigoPostal(limpio);
    resetResultado();

    if (limpio.length === 5) {
      const ubicacion = findLocationByPostalCode(limpio);
      if (ubicacion) {
        setEstado(ubicacion.estado.estado);
        setMunicipioSeleccionado(ubicacion.municipio.nombre);
        setColoniaSeleccionada(ubicacion.colonia.nombre);
      }
    }
  }

  function buscarRepresentante() {
    const ubicacion = findLocationByPostalCode(codigoPostal);
    if (!ubicacion) {
      setMostrarResultado(false);
      setPostalNoDisponible(true);
      return;
    }

    setEstado(ubicacion.estado.estado);
    setMunicipioSeleccionado(ubicacion.municipio.nombre);
    setColoniaSeleccionada(ubicacion.colonia.nombre);
    setPostalNoDisponible(false);
    setMostrarResultado(true);
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#0A4E84]">
      <div className="mx-auto max-w-[1500px] px-4 py-5">
        <Link href="/congreso-civico" className="mb-4 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Cívico
        </Link>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <section className="relative overflow-hidden rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#E5E7EB] md:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(228,0,124,0.10),transparent_24%),radial-gradient(circle_at_72%_78%,rgba(14,165,233,0.10),transparent_26%)]" />
              <div className="relative grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div>
                  <h1 className="text-5xl font-black uppercase leading-none tracking-tight text-[#111827] md:text-7xl">
                    Mapa de <span className="block text-[#E4007C]">Representación</span>
                  </h1>
                  <p className="mt-4 max-w-md text-xl font-semibold leading-8 text-slate-700">
                    Encuentra quién te representa, cómo participa y qué ha votado.
                  </p>
                </div>

                <div className="flex min-h-[260px] items-center justify-center">
                  <HemicicloVisual asientos={curulesDiputadosCongresoCivico} total={500} label="Curules" />
                </div>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {accesosRepresentacion.map((acceso) => (
                <Link key={acceso.titulo} href={acceso.href} className="group min-h-[190px] rounded-[18px] bg-white p-5 shadow-sm ring-1 ring-[#E5E7EB] transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className={`${acceso.color} mb-4 flex h-14 w-14 items-center justify-center rounded-full text-base font-black text-white shadow-sm`}>{acceso.icon}</div>
                  <h2 className={`${acceso.text} text-xl font-black uppercase leading-tight`}>{acceso.titulo}</h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{acceso.descripcion}</p>
                  <div className={`${acceso.color} ml-auto mt-4 flex h-9 w-9 items-center justify-center rounded-full text-lg font-black text-white transition group-hover:translate-x-1`}>→</div>
                </Link>
              ))}
            </section>

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {metricasRepresentacion.map((item) => (
                <div key={item.label} className="rounded-[16px] bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <span className={`${item.color} h-10 w-10 shrink-0 rounded-2xl`} />
                    <div>
                      <div className={`${item.text} text-2xl font-black`}>{item.valor}</div>
                      <div className="text-[11px] font-bold leading-4 text-slate-600">{item.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">
                Ficha de representante - vista general
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-4 rounded-[16px] bg-[#F8FAFC] p-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E4007C] to-[#8B5CF6] text-2xl font-black text-white shadow-sm">RM</div>
                    <div>
                      <h2 className="text-2xl font-black text-[#111827]">Representante Norte Metropolitano</h2>
                      <p className="mt-1 text-sm font-bold text-[#0A4E84]">Diputación Federal · Distrito 01 · CDMX</p>
                      <p className="mt-1 text-sm font-semibold text-slate-600">Grupo cívico azul</p>
                    </div>
                  </div>
                  <div className={`${representanteConfig.bg} ${representanteConfig.text} rounded-full px-4 py-2 text-xs font-black uppercase`}>{representanteConfig.label}</div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl bg-[#FFF1A8] p-3"><div className="text-xs font-bold text-slate-600">Calificación ciudadana</div><div className="mt-1 text-2xl font-black text-[#0A4E84]">82/100</div></div>
                  <div className="rounded-2xl bg-[#DCFCE7] p-3"><div className="text-xs font-bold text-slate-600">Asistencia</div><div className="mt-1 text-2xl font-black text-[#16A34A]">92%</div></div>
                  <div className="rounded-2xl bg-[#E0F2FE] p-3"><div className="text-xs font-bold text-slate-600">Votos a favor</div><div className="mt-1 text-2xl font-black text-[#0EA5E9]">31</div></div>
                  <div className="rounded-2xl bg-[#EDE9FE] p-3"><div className="text-xs font-bold text-slate-600">Propuestas ciudadanas</div><div className="mt-1 text-2xl font-black text-[#8B5CF6]">2</div></div>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {tabsRepresentante.map((tab, index) => (
                    <span key={tab} className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-black ${index === 0 ? "bg-[#E4007C] text-white" : "bg-[#F8FAFC] text-slate-600"}`}>{tab}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Vistas del mapa</div>
              <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-1">
                <article className="rounded-[16px] bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
                  <h3 className="text-sm font-black uppercase text-[#111827]">Cámara de Diputados</h3>
                  <HemicicloVisual asientos={curulesDiputadosCongresoCivico} total={500} label="Curules" compact />
                </article>
                <article className="rounded-[16px] bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
                  <h3 className="text-sm font-black uppercase text-[#111827]">Senado de la República</h3>
                  <HemicicloVisual asientos={escanosSenadoCongresoCivico} total={128} label="Escaños" compact />
                </article>
              </div>
            </section>

            <section className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Por estado</div>
              <div className="p-4">
                <EstadoPlaceholder />
                <p className="mt-3 text-sm font-semibold text-slate-600">Selecciona tu estado para ver la distribución de representantes.</p>
              </div>
            </section>

            <section className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Buscar mi representante</div>
              <div className="p-4">
                <p className="mb-3 rounded-2xl bg-[#FFF1A8] px-3 py-2 text-[11px] font-bold leading-4 text-slate-700">
                  Versión demo con datos de ejemplo. La búsqueda nacional completa por código postal se integrará en una siguiente etapa.
                </p>
                <form className="grid gap-2.5">
                  <label className="grid gap-1 text-xs font-bold text-slate-600">Estado
                    <select value={estado} onChange={(event) => actualizarEstado(event.target.value)} className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-slate-700">
                      {MEXICO_LOCATION_OPTIONS.map((item) => <option key={item.estado} value={item.estado}>{item.estado}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-1 text-xs font-bold text-slate-600">Municipio
                    <select value={municipioActual.nombre} onChange={(event) => actualizarMunicipio(event.target.value)} className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-slate-700">
                      {municipios.map((item) => <option key={item.nombre} value={item.nombre}>{item.nombre}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-1 text-xs font-bold text-slate-600">Colonia
                    <select value={coloniaActual.nombre} onChange={(event) => actualizarColonia(event.target.value)} className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-slate-700">
                      {colonias.map((item) => <option key={item.nombre} value={item.nombre}>{item.nombre}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-1 text-xs font-bold text-slate-600">Código Postal
                    <input value={codigoPostal} onChange={(event) => actualizarCodigoPostal(event.target.value)} className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm text-slate-700" inputMode="numeric" />
                  </label>
                  <button type="button" onClick={buscarRepresentante} className="mt-1 rounded-xl bg-[#E4007C] px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-[#C9006B]">Buscar</button>
                </form>

                {postalNoDisponible ? (
                  <div className="mt-4 rounded-2xl bg-[#FFF1A8] p-4 ring-1 ring-[#F2C300]/40">
                    <div className="text-sm font-black text-[#111827]">Código postal aún no disponible en esta versión demo.</div>
                    <p className="mt-1 text-sm font-semibold text-slate-700">Prueba con un estado, municipio o colonia disponible.</p>
                  </div>
                ) : null}

                {mostrarResultado ? (
                  <div className="mt-4 rounded-2xl bg-[#FCE7F3] p-4 ring-1 ring-[#F7C9DD]">
                    <div className="text-xs font-black uppercase tracking-[0.12em] text-[#E4007C]">Resultado preliminar</div>
                    <div className="mt-1 text-lg font-black text-[#111827]">Representante encontrado por zona</div>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{coloniaActual.nombre}, {municipioActual.nombre}, {estado} · CP {codigoPostal}</p>
                    <button type="button" className="mt-3 rounded-full bg-[#0A4E84] px-4 py-2 text-xs font-black text-white">Ver perfil</button>
                  </div>
                ) : null}
              </div>
            </section>
          </aside>
        </div>

        <section className="mt-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]">
          <h2 className="text-xs font-black uppercase tracking-[0.12em] text-[#E4007C]">Leyenda de categorías</h2>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(tipoRepresentacionConfig).map(([id, config]) => (
              <div key={id} className={`${config.bg} flex items-center gap-2 rounded-xl px-2 py-1.5`}>
                <span className={`${config.dot} h-2.5 w-2.5 shrink-0 rounded-full`} />
                <span className="text-[11px] font-bold leading-4 text-slate-700">{config.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
