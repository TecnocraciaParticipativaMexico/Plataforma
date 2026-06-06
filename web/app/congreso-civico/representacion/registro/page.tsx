"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type TipoPerfil = "Diputado de prueba" | "Senador de prueba" | "Representante ciudadano de prueba";

type PerfilDemo = {
  nombrePublico: string;
  tipoPerfil: TipoPerfil;
  estado: string;
  distrito: string;
  municipio: string;
  temaPrincipal: string;
  biografia: string;
  correoDemo: string;
};

const tiposPerfil: TipoPerfil[] = ["Diputado de prueba", "Senador de prueba", "Representante ciudadano de prueba"];

const estadosDemo = ["Ciudad de México", "Jalisco", "Nuevo León", "Estado de México", "Veracruz", "Yucatán"];

const perfilesEjemplo = [
  {
    label: "Ver perfil ejemplo de diputada",
    href: "/congreso-civico/representacion/representantes/maria-teresa-lopez-garcia",
    color: "bg-[#E4007C]",
  },
  {
    label: "Ver perfil ejemplo de senadora",
    href: "/congreso-civico/representacion/representantes/senadora-metropolitana-norte",
    color: "bg-[#0EA5E9]",
  },
  {
    label: "Ver perfil ejemplo ciudadano",
    href: "/congreso-civico/representacion/representantes/representante-ciudadano-jalisco",
    color: "bg-[#8B5CF6]",
  },
] as const;

const perfilInicial: PerfilDemo = {
  nombrePublico: "",
  tipoPerfil: "Diputado de prueba",
  estado: "Jalisco",
  distrito: "Distrito 10",
  municipio: "Guadalajara",
  temaPrincipal: "Transparencia legislativa",
  biografia: "",
  correoDemo: "",
};

function obtenerIniciales(nombre: string) {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) {
    return "DP";
  }

  return partes.slice(0, 2).map((parte) => parte[0]?.toUpperCase()).join("");
}

function obtenerCargo(tipoPerfil: TipoPerfil) {
  if (tipoPerfil === "Senador de prueba") {
    return "Senado de la República";
  }

  if (tipoPerfil === "Representante ciudadano de prueba") {
    return "Representación ciudadana territorial";
  }

  return "Cámara de Diputados";
}

function obtenerTipoRepresentacion(tipoPerfil: TipoPerfil) {
  if (tipoPerfil === "Representante ciudadano de prueba") {
    return "Representante ciudadano por voto popular";
  }

  return "Elegido por voto directo";
}

export default function CongresoCivicoRegistroPerfilDemoPage() {
  const [tipoActivo, setTipoActivo] = useState<TipoPerfil>("Diputado de prueba");
  const [formulario, setFormulario] = useState<PerfilDemo>(perfilInicial);
  const [perfilGenerado, setPerfilGenerado] = useState<PerfilDemo | null>(null);

  const iniciales = useMemo(() => obtenerIniciales(perfilGenerado?.nombrePublico ?? formulario.nombrePublico), [formulario.nombrePublico, perfilGenerado?.nombrePublico]);

  function actualizarCampo(campo: keyof PerfilDemo, valor: string) {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  }

  function cambiarTipo(tipoPerfil: TipoPerfil) {
    setTipoActivo(tipoPerfil);
    setFormulario((actual) => ({ ...actual, tipoPerfil }));
    setPerfilGenerado(null);
  }

  function generarPerfilDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPerfilGenerado({ ...formulario, tipoPerfil: tipoActivo });
  }

  const vistaPrevia = perfilGenerado ?? formulario;

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#0A4E84]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Link href="/congreso-civico/representacion" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver al Mapa de Representación
        </Link>

        <section className="mb-5 overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#8B5CF6]" />
          <div className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:p-7">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#E4007C]">Mapa de Representación</p>
              <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-[#111827] md:text-6xl">Registrar perfil de prueba</h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
                Crea un perfil demostrativo para visualizar cómo funcionará el seguimiento ciudadano.
              </p>
            </div>
            <article className="rounded-[22px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-[#0A4E84]">¿Por qué registrar un perfil?</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                Estos perfiles permitirán conectar representantes, actividad legislativa, propuestas ciudadanas, alertas cívicas y alineación territorial.
              </p>
            </article>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <section className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Formulario demo</div>
            <div className="p-5">
              <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                {tiposPerfil.map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => cambiarTipo(tipo)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black ${tipoActivo === tipo ? "bg-[#E4007C] text-white" : "bg-[#F8FAFC] text-slate-600 ring-1 ring-slate-100"}`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>

              <form onSubmit={generarPerfilDemo} className="grid gap-4">
                <label className="grid gap-1 text-sm font-bold text-slate-700">
                  Nombre público
                  <input value={formulario.nombrePublico} onChange={(event) => actualizarCampo("nombrePublico", event.target.value)} className="rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm text-slate-700" placeholder="Nombre visible del perfil" required />
                </label>

                <label className="grid gap-1 text-sm font-bold text-slate-700">
                  Tipo de perfil
                  <select value={tipoActivo} onChange={(event) => cambiarTipo(event.target.value as TipoPerfil)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-slate-700">
                    {tiposPerfil.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
                  </select>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1 text-sm font-bold text-slate-700">
                    Estado
                    <select value={formulario.estado} onChange={(event) => actualizarCampo("estado", event.target.value)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-slate-700">
                      {estadosDemo.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
                    </select>
                  </label>

                  <label className="grid gap-1 text-sm font-bold text-slate-700">
                    Distrito o circunscripción
                    <input value={formulario.distrito} onChange={(event) => actualizarCampo("distrito", event.target.value)} className="rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm text-slate-700" placeholder="Distrito, circunscripción o ámbito" />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1 text-sm font-bold text-slate-700">
                    Municipio
                    <input value={formulario.municipio} onChange={(event) => actualizarCampo("municipio", event.target.value)} className="rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm text-slate-700" placeholder="Municipio demo" />
                  </label>

                  <label className="grid gap-1 text-sm font-bold text-slate-700">
                    Tema principal
                    <input value={formulario.temaPrincipal} onChange={(event) => actualizarCampo("temaPrincipal", event.target.value)} className="rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm text-slate-700" placeholder="Transparencia, salud, movilidad..." />
                  </label>
                </div>

                <label className="grid gap-1 text-sm font-bold text-slate-700">
                  Biografía corta
                  <textarea value={formulario.biografia} onChange={(event) => actualizarCampo("biografia", event.target.value)} className="min-h-28 rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm text-slate-700" placeholder="Describe brevemente el perfil demostrativo" />
                </label>

                <label className="grid gap-1 text-sm font-bold text-slate-700">
                  Correo opcional demo
                  <input value={formulario.correoDemo} onChange={(event) => actualizarCampo("correoDemo", event.target.value)} className="rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm text-slate-700" placeholder="correo@demo.mx" type="email" />
                </label>

                <button type="submit" className="rounded-2xl bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-sm transition hover:bg-[#C9006B]">
                  Generar perfil demo
                </button>
              </form>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#0A4E84] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Vista previa</div>
              <div className="p-5">
                <div className="rounded-[22px] bg-[#F8FAFC] p-5 ring-1 ring-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E4007C] via-[#8B5CF6] to-[#0EA5E9] text-2xl font-black text-white shadow-sm">
                      {iniciales}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#111827]">{vistaPrevia.nombrePublico || "Nombre del perfil demo"}</h2>
                      <p className="mt-1 text-sm font-bold text-[#0A4E84]">{obtenerCargo(vistaPrevia.tipoPerfil)}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-600">{vistaPrevia.estado} · {vistaPrevia.distrito || "Distrito demo"}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-full bg-[#FCE7F3] px-4 py-2 text-xs font-black uppercase text-[#BE185D]">
                    {obtenerTipoRepresentacion(vistaPrevia.tipoPerfil)}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#FFF1A8] p-3"><div className="text-xs font-bold text-slate-600">Calificación ciudadana</div><div className="mt-1 text-2xl font-black text-[#0A4E84]">82/100</div></div>
                    <div className="rounded-2xl bg-[#DCFCE7] p-3"><div className="text-xs font-bold text-slate-600">Asistencia</div><div className="mt-1 text-2xl font-black text-[#16A34A]">91%</div></div>
                    <div className="rounded-2xl bg-[#EDE9FE] p-3"><div className="text-xs font-bold text-slate-600">Propuestas recibidas</div><div className="mt-1 text-2xl font-black text-[#8B5CF6]">6</div></div>
                    <div className="rounded-2xl bg-[#E0F2FE] p-3"><div className="text-xs font-bold text-slate-600">Alineación territorial</div><div className="mt-1 text-2xl font-black text-[#0EA5E9]">78%</div></div>
                  </div>

                  {perfilGenerado ? (
                    <p className="mt-4 rounded-2xl bg-[#FFF1A8] px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                      Este perfil es demostrativo. En una etapa posterior podrá guardarse con verificación cívica y trazabilidad.
                    </p>
                  ) : null}
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
              <div className="bg-[#E4007C] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">Perfiles ejemplo</div>
              <div className="grid gap-3 p-5">
                {perfilesEjemplo.map((perfil) => (
                  <Link key={perfil.href} href={perfil.href} className={`${perfil.color} rounded-2xl px-4 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}>
                    {perfil.label}
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
