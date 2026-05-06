"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const modulos = modulosTecnocracia;

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
  "ching", "pendej", "puto", "puta", "mierda", "verga", "mamar", "mama", "papa",
  "tu mama", "tu mamá", "tu papa", "tu papá", "me la pellizcan", "madre", "padre",
  "jaja", "jajaja", "asdf", "qwerty", "xxxxx", "prueba", "test", "morena", "prian",
  "fake", "falso", "inventado", "no se", "no sé", "nada",
];

  if (t.length < 15) return true;
  if (bloqueadas.some((p) => t.includes(p))) return true;
  if (/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(t)) return true;

  return false;
}

type ResultadoExamenComite = {
  module_id: number;
  module_name: string;
  total: number;
  correctas: number;
  aprobado: boolean;
  created_at: string;
};

export default function SolicitarComitePage() {
  const searchParams = useSearchParams();
  
  const [moduleId, setModuleId] = useState(1);
  const [level, setLevel] = useState("Municipal");
  const [municipality, setMunicipality] = useState("");
  const [state, setState] = useState("");
  const [participationType, setParticipationType] = useState("Protegida");
  const [publicName, setPublicName] = useState("");
  const [expertiseArea, setExpertiseArea] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [visibilityLevel, setVisibilityLevel] = useState("Protegida");
  const [conflictInterest, setConflictInterest] = useState("");
  const [curriculumEvidence, setCurriculumEvidence] = useState("");
  const [ethicsAccepted, setEthicsAccepted] = useState(false);
  const [isPublicFigure, setIsPublicFigure] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [examen, setExamen] = useState<ResultadoExamenComite | null>(null);

  useEffect(() => {
  const moduloParam = Number(searchParams.get("modulo"));

  if (
    moduloParam &&
    modulos.some((modulo) => modulo.id === moduloParam)
  ) {
    setModuleId(moduloParam);
  }
}, [searchParams]);

  useEffect(() => {
  const guardado = localStorage.getItem("ultimo_examen_comite");

  if (!guardado) return;

  try {
    const parsed = JSON.parse(guardado);
    setExamen(parsed);
  } catch {
    setExamen(null);
  }
}, []);

  async function enviarSolicitud() {
    try {
      setLoading(true);
      setResult(null);

      if (!examen || !examen.aprobado || examen.module_id !== moduleId) {
  setResult({
    ok: false,
    error:
      "Debes aprobar el examen técnico del módulo seleccionado antes de enviar la solicitud.",
  });
  return;
}

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

if (textoInvalido(expertiseArea)) {
  setResult({
    ok: false,
    error: "El área de experiencia parece poco clara o inválida.",
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

    if (!conflictInterest.trim()) {
  setResult({
    ok: false,
    error: "Declara si tienes o no conflictos de interés.",
  });
  return;
}

if (!ethicsAccepted) {
  setResult({
    ok: false,
    error: "Debes aceptar el código ético para enviar la solicitud.",
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
          module_name: modulos[moduleId - 1]?.nombre,
          level,
          municipality: level === "Municipal" ? municipality : null,
          state: level === "Municipal" || level === "Estatal" ? state : null,
          participation_type: participationType,
          public_name:
            participationType === "Pública verificada" ? publicName : null,
          expertise_area: expertiseArea,
          experience_summary: experienceSummary,
          motivation,
          visibility_level: visibilityLevel,
          conflict_interest: conflictInterest,
          curriculum_evidence: curriculumEvidence,
          ethics_accepted: ethicsAccepted,
          is_public_figure: isPublicFigure,
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
              setExpertiseArea("");
            }}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            {modulos.map((modulo) => (
  <option key={modulo.id} value={modulo.id}>
    Módulo {modulo.id}: {modulo.nombre}
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

<label className="mb-2 block font-semibold">Área de experiencia específica</label>
<input
  value={expertiseArea}
  onChange={(e) => setExpertiseArea(e.target.value)}
  className="mb-4 w-full rounded-2xl border px-4 py-3"
  placeholder="Ej. derecho ambiental, finanzas públicas, seguridad comunitaria"
/>

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

<label className="mb-2 block font-semibold">
  Nivel de visibilidad
</label>
<select
  value={visibilityLevel}
  onChange={(e) => setVisibilityLevel(e.target.value)}
  className="mb-4 w-full rounded-2xl border px-4 py-3"
>
  <option>Protegida</option>
  <option>Pública verificada</option>
  <option>Colectiva / institucional</option>
</select>

<label className="mb-2 flex items-center gap-2 font-semibold">
  <input
    type="checkbox"
    checked={isPublicFigure}
    onChange={(e) => setIsPublicFigure(e.target.checked)}
  />
  Soy figura pública, servidora/servidor público, exfuncionario, periodista,
  activista reconocido o persona con exposición pública.
</label>

<label className="mb-2 block font-semibold">
  Conflictos de interés
</label>
<textarea
  value={conflictInterest}
  onChange={(e) => setConflictInterest(e.target.value)}
  className="mb-4 w-full rounded-2xl border px-4 py-3"
  rows={4}
  placeholder="Declara vínculos políticos, económicos, laborales, familiares o institucionales relevantes. Si no tienes, escribe: No tengo conflictos de interés."
/>

<label className="mb-2 block font-semibold">
  Evidencia curricular opcional
</label>
<textarea
  value={curriculumEvidence}
  onChange={(e) => setCurriculumEvidence(e.target.value)}
  className="mb-4 w-full rounded-2xl border px-4 py-3"
  rows={3}
  placeholder="Puedes pegar links a CV, publicaciones, experiencia, redes profesionales o referencias públicas."
/>

<label className="mb-4 flex items-start gap-2 text-sm text-slate-700">
  <input
    type="checkbox"
    checked={ethicsAccepted}
    onChange={(e) => setEthicsAccepted(e.target.checked)}
    className="mt-1"
  />
  <span>
    Acepto que mi solicitud sea revisada éticamente, incluyendo posibles
    conflictos de interés, historial público verificable y reglas de conducta
    del comité.
  </span>
</label>

<div
  className={`mb-4 rounded-2xl p-4 text-sm ${
    examen?.aprobado && examen.module_id === moduleId
      ? "bg-green-50 text-green-800"
      : "bg-yellow-50 text-yellow-900"
  }`}
>
  {examen?.aprobado && examen.module_id === moduleId ? (
    <div>
      ✅ Examen técnico aprobado: {examen.correctas}/{examen.total}
    </div>
  ) : (
    <div>
      ⚠️ Debes aprobar el examen técnico de este módulo antes de enviar la solicitud.
      <Link
        href={`/comites/examen?modulo=${moduleId}`}
        className="mt-2 block font-bold text-[#0A4E84]"
      >
        Ir al examen técnico
      </Link>
    </div>
  )}
</div>
          
          <button
            onClick={enviarSolicitud}
            disabled={
  loading || !examen?.aprobado || examen.module_id !== moduleId
}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937] shadow-[0_6px_0_0_#8B6B00] disabled:opacity-50"
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
