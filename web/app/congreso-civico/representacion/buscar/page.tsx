"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ColoniaDemo = {
  nombre: string;
  codigoPostal: string;
};

type MunicipioDemo = {
  nombre: string;
  colonias: ColoniaDemo[];
};

type EstadoDemo = {
  nombre: string;
  clave: string;
  municipios: MunicipioDemo[];
};

type RepresentanteDemo = {
  id: string;
  nombre: string;
  iniciales: string;
  cargo: string;
  distrito: string;
  tipoRepresentacion: string;
  calificacionCiudadana: number;
  asistencia: number;
  alineacionTerritorial: number;
  color: string;
};

const estadosBase = [
  { nombre: "Aguascalientes", clave: "AGS", municipios: ["Aguascalientes", "Jesus Maria", "Calvillo"] },
  { nombre: "Baja California", clave: "BC", municipios: ["Tijuana", "Mexicali", "Ensenada"] },
  { nombre: "Baja California Sur", clave: "BCS", municipios: ["La Paz", "Los Cabos", "Comondu"] },
  { nombre: "Campeche", clave: "CAMP", municipios: ["Campeche", "Carmen", "Champoton"] },
  { nombre: "Coahuila", clave: "COAH", municipios: ["Saltillo", "Torreon", "Monclova"] },
  { nombre: "Colima", clave: "COL", municipios: ["Colima", "Manzanillo", "Tecoman"] },
  { nombre: "Chiapas", clave: "CHIS", municipios: ["Tuxtla Gutierrez", "Tapachula", "San Cristobal de las Casas"] },
  { nombre: "Chihuahua", clave: "CHIH", municipios: ["Chihuahua", "Juarez", "Delicias"] },
  { nombre: "Ciudad de Mexico", clave: "CDMX", municipios: ["Cuauhtemoc", "Coyoacan", "Iztapalapa"] },
  { nombre: "Durango", clave: "DGO", municipios: ["Durango", "Gomez Palacio", "Lerdo"] },
  { nombre: "Guanajuato", clave: "GTO", municipios: ["Leon", "Irapuato", "Celaya"] },
  { nombre: "Guerrero", clave: "GRO", municipios: ["Acapulco", "Chilpancingo", "Iguala"] },
  { nombre: "Hidalgo", clave: "HGO", municipios: ["Pachuca", "Tulancingo", "Tula"] },
  { nombre: "Jalisco", clave: "JAL", municipios: ["Guadalajara", "Zapopan", "Tlaquepaque"] },
  { nombre: "Mexico", clave: "MEX", municipios: ["Toluca", "Ecatepec", "Naucalpan"] },
  { nombre: "Michoacan", clave: "MICH", municipios: ["Morelia", "Uruapan", "Zamora"] },
  { nombre: "Morelos", clave: "MOR", municipios: ["Cuernavaca", "Jiutepec", "Cuautla"] },
  { nombre: "Nayarit", clave: "NAY", municipios: ["Tepic", "Bahia de Banderas", "Santiago Ixcuintla"] },
  { nombre: "Nuevo Leon", clave: "NL", municipios: ["Monterrey", "San Nicolas", "Guadalupe"] },
  { nombre: "Oaxaca", clave: "OAX", municipios: ["Oaxaca de Juarez", "Salina Cruz", "Juchitan"] },
  { nombre: "Puebla", clave: "PUE", municipios: ["Puebla", "Tehuacan", "Atlixco"] },
  { nombre: "Queretaro", clave: "QRO", municipios: ["Queretaro", "San Juan del Rio", "El Marques"] },
  { nombre: "Quintana Roo", clave: "QROO", municipios: ["Benito Juarez", "Solidaridad", "Othon P. Blanco"] },
  { nombre: "San Luis Potosi", clave: "SLP", municipios: ["San Luis Potosi", "Soledad", "Ciudad Valles"] },
  { nombre: "Sinaloa", clave: "SIN", municipios: ["Culiacan", "Mazatlan", "Ahome"] },
  { nombre: "Sonora", clave: "SON", municipios: ["Hermosillo", "Cajeme", "Nogales"] },
  { nombre: "Tabasco", clave: "TAB", municipios: ["Centro", "Cardenas", "Comalcalco"] },
  { nombre: "Tamaulipas", clave: "TAMPS", municipios: ["Tampico", "Reynosa", "Matamoros"] },
  { nombre: "Tlaxcala", clave: "TLAX", municipios: ["Tlaxcala", "Apizaco", "Huamantla"] },
  { nombre: "Veracruz", clave: "VER", municipios: ["Veracruz", "Xalapa", "Coatzacoalcos"] },
  { nombre: "Yucatan", clave: "YUC", municipios: ["Merida", "Valladolid", "Tizimin"] },
  { nombre: "Zacatecas", clave: "ZAC", municipios: ["Zacatecas", "Guadalupe", "Fresnillo"] },
] as const;

const coloniasDemo = ["Centro Civico", "Las Flores", "San Miguel"] as const;

const MEXICO_LOCATION_OPTIONS: EstadoDemo[] = estadosBase.map((estado, estadoIndex) => ({
  nombre: estado.nombre,
  clave: estado.clave,
  municipios: estado.municipios.map((municipio, municipioIndex) => ({
    nombre: municipio,
    colonias: coloniasDemo.map((colonia, coloniaIndex) => ({
      nombre: colonia,
      codigoPostal: `${(10000 + estadoIndex * 100 + municipioIndex * 10 + coloniaIndex).toString()}`,
    })),
  })),
}));

const REPRESENTANTES_DEMO: RepresentanteDemo[] = [
  {
    id: "maria-teresa-lopez-garcia",
    nombre: "Maria Teresa Lopez Garcia",
    iniciales: "ML",
    cargo: "Diputada Federal",
    distrito: "Distrito 10",
    tipoRepresentacion: "Elegido por voto directo",
    calificacionCiudadana: 92,
    asistencia: 94,
    alineacionTerritorial: 78,
    color: "from-[#E4007C] to-[#8B5CF6]",
  },
  {
    id: "senadora-metropolitana-norte",
    nombre: "Senadora Metropolitana Norte",
    iniciales: "SM",
    cargo: "Senadora de la Republica",
    distrito: "Ambito estatal",
    tipoRepresentacion: "Legislador en funciones",
    calificacionCiudadana: 88,
    asistencia: 95,
    alineacionTerritorial: 84,
    color: "from-[#0EA5E9] to-[#16A34A]",
  },
  {
    id: "representante-ciudadano-jalisco",
    nombre: "Representante Ciudadano Jalisco",
    iniciales: "RJ",
    cargo: "Representante ciudadano",
    distrito: "Distrito ciudadano 03",
    tipoRepresentacion: "Representante ciudadano por voto popular",
    calificacionCiudadana: 76,
    asistencia: 89,
    alineacionTerritorial: 81,
    color: "from-[#F97316] to-[#F2C300]",
  },
];

function getMunicipiosByEstado(estado: string) {
  return MEXICO_LOCATION_OPTIONS.find((item) => item.nombre === estado)?.municipios ?? [];
}

function getColoniasByMunicipio(estado: string, municipio: string) {
  return getMunicipiosByEstado(estado).find((item) => item.nombre === municipio)?.colonias ?? [];
}

function findLocationByPostalCode(codigoPostal: string) {
  for (const estado of MEXICO_LOCATION_OPTIONS) {
    for (const municipio of estado.municipios) {
      const colonia = municipio.colonias.find((item) => item.codigoPostal === codigoPostal);
      if (colonia) {
        return { estado: estado.nombre, municipio: municipio.nombre, colonia: colonia.nombre, codigoPostal };
      }
    }
  }

  return null;
}

function getRepresentativeForState(estado: string) {
  if (estado === "Jalisco") return REPRESENTANTES_DEMO[0];
  if (estado === "Nuevo Leon") return REPRESENTANTES_DEMO[1];
  return REPRESENTANTES_DEMO[2];
}

export default function BuscarRepresentantePage() {
  const estadoInicial = MEXICO_LOCATION_OPTIONS[13];
  const municipioInicial = estadoInicial.municipios[0];
  const coloniaInicial = municipioInicial.colonias[0];

  const [estado, setEstado] = useState(estadoInicial.nombre);
  const [municipio, setMunicipio] = useState(municipioInicial.nombre);
  const [colonia, setColonia] = useState(coloniaInicial.nombre);
  const [codigoPostal, setCodigoPostal] = useState(coloniaInicial.codigoPostal);
  const [mensaje, setMensaje] = useState("Resultado con datos de ejemplo.");
  const [resultadoVisible, setResultadoVisible] = useState(true);

  const municipios = useMemo(() => getMunicipiosByEstado(estado), [estado]);
  const colonias = useMemo(() => getColoniasByMunicipio(estado, municipio), [estado, municipio]);
  const representante = getRepresentativeForState(estado);
  const coloniaSeleccionada = colonias.find((item) => item.nombre === colonia) ?? colonias[0];

  function handleEstadoChange(nextEstado: string) {
    const nextMunicipio = getMunicipiosByEstado(nextEstado)[0];
    const nextColonia = nextMunicipio?.colonias[0];
    setEstado(nextEstado);
    setMunicipio(nextMunicipio?.nombre ?? "");
    setColonia(nextColonia?.nombre ?? "");
    setCodigoPostal(nextColonia?.codigoPostal ?? "");
    setMensaje("Resultado con datos de ejemplo.");
    setResultadoVisible(true);
  }

  function handleMunicipioChange(nextMunicipio: string) {
    const nextColonia = getColoniasByMunicipio(estado, nextMunicipio)[0];
    setMunicipio(nextMunicipio);
    setColonia(nextColonia?.nombre ?? "");
    setCodigoPostal(nextColonia?.codigoPostal ?? "");
    setMensaje("Resultado con datos de ejemplo.");
    setResultadoVisible(true);
  }

  function handleColoniaChange(nextColonia: string) {
    const selected = colonias.find((item) => item.nombre === nextColonia);
    setColonia(nextColonia);
    setCodigoPostal(selected?.codigoPostal ?? "");
    setMensaje("Resultado con datos de ejemplo.");
    setResultadoVisible(true);
  }

  function handlePostalCodeChange(nextPostalCode: string) {
    setCodigoPostal(nextPostalCode);
    const location = findLocationByPostalCode(nextPostalCode);

    if (location) {
      setEstado(location.estado);
      setMunicipio(location.municipio);
      setColonia(location.colonia);
      setMensaje("Ubicacion encontrada en datos de ejemplo.");
      setResultadoVisible(true);
      return;
    }

    if (nextPostalCode.length >= 5) {
      setMensaje("Codigo postal aun no disponible en esta version demostrativa. Prueba con un estado, municipio o colonia disponible.");
      setResultadoVisible(false);
    } else {
      setMensaje("Version demostrativa con datos de ejemplo.");
      setResultadoVisible(true);
    }
  }

  function handleBuscar() {
    const location = findLocationByPostalCode(codigoPostal);

    if (codigoPostal && !location) {
      setMensaje("Codigo postal aun no disponible en esta version demostrativa. Prueba con un estado, municipio o colonia disponible.");
      setResultadoVisible(false);
      return;
    }

    setMensaje("Representante encontrado con datos de ejemplo.");
    setResultadoVisible(true);
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representacion
        </Link>

        <section className="mb-5 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-5 p-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:p-8">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.16em] text-[#E4007C]">Mapa de Representacion</div>
              <h1 className="mt-3 text-4xl font-black leading-tight text-[#111827] md:text-6xl">BUSCAR MI REPRESENTANTE</h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
                Encuentra quien te representa en tu territorio.
              </p>
            </div>
            <div className="rounded-[24px] bg-[#FFF1A8] p-5 text-sm font-bold leading-7 text-slate-700">
              Version demostrativa con datos de ejemplo. La busqueda nacional completa por codigo postal se integrara en una siguiente etapa.
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <article className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Ubicacion</div>
              <div className="grid gap-4 p-5">
                <label className="grid gap-2 text-sm font-black text-[#111827]">
                  Estado
                  <select value={estado} onChange={(event) => handleEstadoChange(event.target.value)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#E4007C]">
                    {MEXICO_LOCATION_OPTIONS.map((item) => (
                      <option key={item.clave} value={item.nombre}>{item.nombre}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-black text-[#111827]">
                  Municipio
                  <select value={municipio} onChange={(event) => handleMunicipioChange(event.target.value)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#E4007C]">
                    {municipios.map((item) => (
                      <option key={item.nombre} value={item.nombre}>{item.nombre}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-black text-[#111827]">
                  Colonia
                  <select value={colonia} onChange={(event) => handleColoniaChange(event.target.value)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#E4007C]">
                    {colonias.map((item) => (
                      <option key={`${item.nombre}-${item.codigoPostal}`} value={item.nombre}>{item.nombre}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-black text-[#111827]">
                  Codigo Postal
                  <input value={codigoPostal} onChange={(event) => handlePostalCodeChange(event.target.value)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#E4007C]" inputMode="numeric" />
                </label>

                <button type="button" onClick={handleBuscar} className="rounded-full bg-[#E4007C] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#C9006B]">
                  Buscar representante
                </button>

                <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${resultadoVisible ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEF3C7] text-[#92400E]"}`}>
                  {mensaje}
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#0A4E84] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Como funciona</div>
              <div className="grid gap-3 p-5">
                {["Selecciona tu ubicacion", "Encuentra representantes relacionados", "Consulta actividad y votaciones", "Participa en iniciativas ciudadanas"].map((paso, index) => (
                  <div key={paso} className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4007C] text-sm font-black text-white">{index + 1}</span>
                    <span className="text-sm font-black text-[#111827]">{paso}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Representante encontrado</div>
            {resultadoVisible ? (
              <div className="p-5">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${representante.color} text-3xl font-black text-white shadow-sm`}>
                      {representante.iniciales}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black leading-tight text-[#111827]">{representante.nombre}</h2>
                      <p className="mt-2 text-sm font-black text-[#0A4E84]">{representante.cargo}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-600">{estado} - {representante.distrito}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#E0F2FE] px-4 py-2 text-xs font-black text-[#0369A1]">{representante.tipoRepresentacion}</span>
                </div>

                <div className="mt-5 rounded-[22px] bg-[#F8FAFC] p-4 text-sm font-semibold leading-7 text-slate-700">
                  Resultado asociado a {coloniaSeleccionada?.nombre ?? colonia}, {municipio}, {estado}. Esta relacion usa datos de ejemplo para mostrar el flujo ciudadano.
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-[#FFF1A8] p-4">
                    <div className="text-xs font-bold text-slate-600">Calificacion ciudadana</div>
                    <div className="mt-1 text-3xl font-black text-[#0A4E84]">{representante.calificacionCiudadana}/100</div>
                  </div>
                  <div className="rounded-2xl bg-[#DCFCE7] p-4">
                    <div className="text-xs font-bold text-slate-600">Asistencia</div>
                    <div className="mt-1 text-3xl font-black text-[#16A34A]">{representante.asistencia}%</div>
                  </div>
                  <div className="rounded-2xl bg-[#EDE9FE] p-4">
                    <div className="text-xs font-bold text-slate-600">Alineacion territorial</div>
                    <div className="mt-1 text-3xl font-black text-[#8B5CF6]">{representante.alineacionTerritorial}%</div>
                  </div>
                </div>

                <Link href={`/congreso-civico/representacion/representantes/${representante.id}`} className="mt-5 inline-flex rounded-full bg-[#E4007C] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#C9006B]">
                  Ver perfil completo
                </Link>
              </div>
            ) : (
              <div className="p-5">
                <div className="rounded-[22px] bg-[#FEF3C7] p-5 text-sm font-bold leading-7 text-[#92400E]">
                  No se muestra resultado falso para codigos postales fuera de los datos de ejemplo. Selecciona una ubicacion disponible para continuar.
                </div>
              </div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}
