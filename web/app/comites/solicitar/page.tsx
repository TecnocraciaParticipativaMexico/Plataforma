"use client";

import Link from "next/link";
import { useState } from "react";

const modulos = [
  "Seguridad Ciudadana",
  "Fiscalía Forense Ciudadana",
  "Congreso Cívico",
  "Derechos Humanos",
  "Madres Buscadoras",
  "Sistema Judicial",
  "Tribunales de Alta Integridad",
  "Auditoría Cívica Local",
  "Ética Pública",
  "Salud y Bienestar",
  "Educación",
  "Infraestructura y Vivienda",
  "Movilidad",
  "DIF Cívico",
  "Juventud y Deporte",
  "Cultura y Turismo",
  "Economía Regional",
  "Energía",
  "Licitaciones Éticas",
  "Ciencia y Tecnología",
  "INE Cívico",
  "Anticorrupción",
  "Auditoría de Sistemas",
  "Prensa Libre",
  "Verdad Histórica",
  "Campo y Soberanía Alimentaria",
  "Agua y Territorio",
  "Medio Ambiente",
  "Protección Civil",
  "Relaciones Internacionales",
];

const estados = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
  "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
  "Zacatecas",
];

function textoInvalido(texto: string) {
  const t = texto.toLowerCase().trim();

  const bloqueadas = [
    "ching", "pendej", "puto", "puta", "mierda", "jaja", "jajaja",
    "asdf", "qwerty", "xxxxx", "prueba", "test", "fake", "falso",
    "inventado", "no se", "no sé", "nada",
  ];

  if (t.length < 15) return true;
  if (bloqueadas.some((p) => t.includes(p))) return true;
  if (/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(t)) return true;

  return false;
}

export default function SolicitarComitePage() {
  const [moduleId, setModuleId] = useState(1);
  const [level, setLevel] = useState("Municipal");
  const [municipality, setMunicipality] = useState("");
  const [state, setState] = useState("");
  const [participationType, setParticipationType] = useState("Protegida");
  const [publicName, setPublicName] = useState("");
  const [expertiseArea, setExpertiseArea] = useState("Seguridad Ciudadana");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function enviarSolicitud() {
    try {
      setLoading(true);
      setResult(null);

      if (level === "Municipal" && !municipality.trim()) {
        setResult({ ok: false, error: "Escribe el municipio." });
        return;
      }

      if ((level === "Municipal" || level === "Estatal") && !state.trim()) {
        setResult({ ok: false, error: "Selecciona el estado." });
        return;
      }

      if (participationType === "Pública verificada" && !publicName.trim()) {
        setResult({ ok: false, error: "Escribe el nombre público visible." });
        return;
      }

      if (textoInvalido(experienceSummary)) {
        setResult({
          ok: false,
          error: "El resumen de experiencia parece muy corto, poco claro o inválido.",
        });
        return;
      }

      if (textoInvalido(motivation)) {
        setResult({
          ok: false,
          error: "La motivación parece muy corta, poco clara o inválida.",
        });
        return;
      }

      let actorHash = localStorage.getItem("actor_hash");

      if (!actorHash) {
        actorHash = crypto.randomUUID();
        localStorage.setItem("actor_hash", actorHash);
      }

      const res = await fetch("/api/comites/solicitudes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actor_hash: actorHash,
          module_id: moduleId,
          module_name: modulos[moduleId - 1],
          level,
          municipality: level === "Municipal" ? municipality : null,
          state: level === "Municipal" || level === "Estatal" ? state : null,
          participation_type: participationType,
          public_name:
            participationType === "Pública verificada" ? publicName : null,
          expertise_area: expertiseArea,
          experience_summary: experienceSummary,
          motivation,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        ok: false,
        error: err?.message || "Error enviando solicitud",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <Link href="/comites" className="mb-4 inline-block text-sm font-semibold">
          ← Volver a comités
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Solicitar participación</h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          Tu solicitud se guarda en Supabase para revisión futura. No se envía a
          autoridades, correos ni terceros.
        </p>

        <section className="rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Módulo</label>
          <select
            value={moduleId}
            onChange={(e) => {
              const id = Number(e.target.value);
              setModuleId(id);
              setExpertiseArea(modulos[id - 1]);
            }}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            {modulos.map((modulo, index) => (
              <option key={modulo} value={index + 1}>
                Módulo {index + 1}: {modulo}
              </option>
            ))}
          </select>

          <label className="mb-2 block font-semibold">Nivel territorial</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Municipal</option>
            <option>Estatal</option>
            <option>Federal</option>
          </select>

          {level === "Municipal" && (
            <>
              <label className="mb-2 block font-semibold">Municipio</label>
              <input
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="mb-4 w-full rounded-2xl border px-4 py-3"
                placeholder="Ej. Guadalajara, Monterrey, Mérida"
              />
            </>
          )}

          {(level === "Municipal" || level === "Estatal") && (
            <>
              <label className="mb-2 block font-semibold">Estado</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mb-4 w-full rounded-2xl border px-4 py-3"
              >
                <option value="">Selecciona estado</option>
                {estados.map((estado) => (
                  <option key={estado}>{estado}</option>
                ))}
              </select>
            </>
          )}

          <label className="mb-2 block font-semibold">Tipo de participación</label>
          <select
            value={participationType}
            onChange={(e) => setParticipationType(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Protegida</option>
            <option>Pública verificada</option>
          </select>

          {participationType === "Pública verificada" && (
            <>
              <label className="mb-2 block font-semibold">
                Nombre público visible
              </label>
              <input
                value={publicName}
                onChange={(e) => setPublicName(e.target.value)}
                className="mb-4 w-full rounded-2xl border px-4 py-3"
                placeholder="Ej. nombre profesional o público"
              />
            </>
          )}

          <label className="mb-2 block font-semibold">Área de experiencia</label>
          <select
            value={expertiseArea}
            onChange={(e) => setExpertiseArea(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            {modulos.map((modulo) => (
              <option key={modulo}>{modulo}</option>
            ))}
          </select>

          <label className="mb-2 block font-semibold">Resumen de experiencia</label>
          <textarea
            value={experienceSummary}
            onChange={(e) => setExperienceSummary(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="Describe tu experiencia real. Mínimo 15 caracteres."
          />

          <label className="mb-2 block font-semibold">Motivación</label>
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="Explica por qué quieres participar. Mínimo 15 caracteres."
          />

          <button
            onClick={enviarSolicitud}
            disabled={loading}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] shadow-[0_6px_0_0_#8B6B00]"
          >
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>

          {result && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">
              {result.ok
                ? "✅ Solicitud recibida. Será revisada en una fase futura del panel de comité."
                : `❌ Error: ${result.error}`}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
