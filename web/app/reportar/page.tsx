"use client";

import { useState } from "react";

function textoSospechoso(texto: string) {
  const t = texto.toLowerCase().trim();

  const bloqueadas = [
    "tu mama",
    "tu mamá",
    "ching",
    "jaja",
    "jajaja",
    "asdf",
    "xxxxx",
    "qwerty",
    "prueba",
    "test",
    "nsfw",
    "fake",
    "falso",
    "inventado",
  ];

  if (!t) return false;

  if (bloqueadas.some((palabra) => t.includes(palabra))) return true;

  // Solo símbolos o ruido
  if (/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(t)) return true;

  // Muy corto para ser dirección real
  if (t.length < 5) return true;

  return false;
}

function esLinkGoogleMapsValido(link: string) {
  if (!link.trim()) return true; // opcional, si viene vacío no falla

  try {
    const url = new URL(link);
    const host = url.hostname.toLowerCase();

    return (
      host.includes("google.com") ||
      host.includes("maps.app.goo.gl") ||
      host.includes("goo.gl")
    );
  } catch {
    return false;
  }
}

function extraerCoordenadasDeLink(link: string) {
  if (!link) return null;

  try {
    const decoded = decodeURIComponent(link);

    const match = decoded.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);

    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
      };
    }

    return null;
  } catch {
    return null;
  }
}

export default function ReportarPage() {
  const [categoria, setCategoria] = useState("Baches");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [calleNumero, setCalleNumero] = useState("");
  const [colonia, setColonia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estadoLugar, setEstadoLugar] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [referencia, setReferencia] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [errorUbicacion, setErrorUbicacion] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null);

  async function enviarReporte() {
    try {
      setLoading(true);
      setResultado(null);

            setErrorUbicacion("");

      const textoUbicacionParaValidar = [
        calleNumero,
        colonia,
        municipio,
        estadoLugar,
        codigoPostal,
        referencia,
      ]
        .filter(Boolean)
        .join(" ");

      if (textoSospechoso(textoUbicacionParaValidar)) {
        setErrorUbicacion(
          "La ubicación parece inválida o poco seria. Revisa la dirección del hecho."
        );
        setLoading(false);
        return;
      }

      if (!esLinkGoogleMapsValido(mapsLink)) {
        setErrorUbicacion(
          "El enlace proporcionado no parece ser un link válido de Google Maps."
        );
        setLoading(false);
        return;
      }

    const coords = extraerCoordenadasDeLink(mapsLink);

      if (mapsLink && !coords) {
        console.warn("No se pudieron extraer coordenadas del link de Maps");
      }

      if (!calleNumero.trim() || !municipio.trim() || !estadoLugar.trim()) {
        setResultado({
          ok: false,
          error: "Completa al menos calle y número, municipio y estado.",
        });
        setLoading(false);
        return;
      }

      let actorHash = localStorage.getItem("actor_hash");
      if (!actorHash) {
        actorHash = crypto.randomUUID();
        localStorage.setItem("actor_hash", actorHash);
      }

      const tipoProceso = `${categoria}: ${titulo || "Sin título"}`;

      const ubicacionFinal = [
        calleNumero,
        colonia,
        municipio,
        estadoLugar,
        codigoPostal ? `CP ${codigoPostal}` : "",
        referencia ? `Referencia: ${referencia}` : "",
        mapsLink ? `Google Maps: ${mapsLink}` : "",
        coords ? `Coords: ${coords.lat}, ${coords.lng}` : "",
      ]
        .filter(Boolean)
        .join(", ");

      const res = await fetch("/api/process/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo_proceso: tipoProceso,
          actor_hash: actorHash,
          note: `${descripcion} (Ubicación: ${ubicacionFinal || "No especificada"})`,
        }),
      });

      const data = await res.json();
      const processId = data?.result?.out_process_id;

      if (data?.ok && processId && archivo) {
        const formData = new FormData();
        formData.append("file", archivo);
        formData.append("actor_hash", actorHash);

        const uploadRes = await fetch(`/api/process/${processId}/evidence/upload`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        setResultado({
          ...data,
          upload: uploadData,
        });
      } else {
        setResultado(data);
      }

    } catch (err: any) {
      setResultado({
        ok: false,
        error: err?.message || "Error creando reporte",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#0A4E84]">
      <div className="mx-auto max-w-md px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold">Crear Denuncia Ciudadana</h1>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <label className="mb-2 block font-semibold">Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
          >
            <option>Baches</option>
            <option>Alumbrado Público</option>
            <option>Basura</option>
            <option>Agua</option>
            <option>Seguridad</option>
            <option>Corrupción</option>
            <option>Otro</option>
          </select>

          <label className="mb-2 block font-semibold">Título breve</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            placeholder="Ej. Bache enorme frente a primaria"
          />

          <label className="mb-2 block font-semibold">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mb-4 w-full rounded-2xl border px-4 py-3"
            rows={4}
            placeholder="Describe el problema..."
          />

                    <label className="mb-2 block font-semibold">Ubicación del hecho</label>
          <p className="mb-3 text-sm text-slate-500">
            Escribe la ubicación del hecho. No pedimos tu ubicación en vivo.
            También puedes pegar un link de Google Maps del lugar.
          </p>

          <input
            value={calleNumero}
            onChange={(e) => {
  setCalleNumero(e.target.value);
  setErrorUbicacion("");
}}
            className="mb-3 w-full rounded-2xl border px-4 py-3"
            placeholder="Calle y número"
          />

          <input
            value={colonia}
            onChange={(e) => setColonia(e.target.value)}
            className="mb-3 w-full rounded-2xl border px-4 py-3"
            placeholder="Colonia"
          />

          <input
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            className="mb-3 w-full rounded-2xl border px-4 py-3"
            placeholder="Municipio o alcaldía"
          />

          <input
            value={estadoLugar}
            onChange={(e) => setEstadoLugar(e.target.value)}
            className="mb-3 w-full rounded-2xl border px-4 py-3"
            placeholder="Estado"
          />

          <input
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
            className="mb-3 w-full rounded-2xl border px-4 py-3"
            placeholder="Código postal"
          />

          <textarea
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            className="mb-6 w-full rounded-2xl border px-4 py-3"
            rows={3}
            placeholder="Referencia opcional (ej. frente a la primaria, esquina con...)"
          />
<input
  value={mapsLink}
onChange={(e) => {
  setMapsLink(e.target.value);
  setErrorUbicacion("");
}}
  className="mb-2 w-full rounded-2xl border px-4 py-3"
  placeholder="Link de Google Maps (opcional)"
/>

<p className="mb-2 text-xs text-slate-500">
  Puedes pegar aquí el enlace del lugar en Google Maps para ubicar mejor el hecho.
</p>

{errorUbicacion && (
  <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
    {errorUbicacion}
  </div>
)}

{!errorUbicacion && mapsLink.trim() && esLinkGoogleMapsValido(mapsLink) && (
  <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
    Link de Google Maps válido.
  </div>
)}

          <label className="mb-2 block font-semibold">Evidencia (opcional)</label>
<input
  type="file"
  onChange={(e) => setArchivo(e.target.files?.[0] || null)}
  className="mb-6 w-full rounded-2xl border px-4 py-3"
/>

          <button
            onClick={enviarReporte}
            disabled={loading}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937]"
          >
            {loading ? "Enviando..." : "Enviar Denuncia"}
          </button>
        </div>

{resultado && resultado.ok && (
  <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm text-center">
    <div className="mb-2 text-xl font-bold text-green-600">
      ✅ Tu denuncia fue creada
    </div>

    <div className="mb-2 text-sm text-gray-600">ID del proceso:</div>

    <div className="mb-4 break-all font-mono text-xs">
      {resultado.result?.out_process_id}
    </div>

    {resultado.upload && (
  <div className="mb-4 text-sm text-slate-700">
    📸 Evidencia subida correctamente
  </div>
)}

    <a
      href={`/seguimiento?processId=${resultado.result?.out_process_id}`}
      className="inline-block rounded-xl bg-[#0A4E84] px-4 py-2 font-semibold text-white"
    >
      Ver seguimiento
    </a>
  </div>
)}

        {resultado && !resultado.ok && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-red-700">
            ❌ Error: {resultado.error}
          </div>
        )}
      </div>
    </main>
  );
}
