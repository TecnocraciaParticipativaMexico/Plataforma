"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const ReporteMap = dynamic(() => import("./ReporteMap"), {
  ssr: false,
});

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
  const [coordsValidadas, setCoordsValidadas] = useState<{ lat: number; lng: number } | null>(null);
  const [coordsConfirmadas, setCoordsConfirmadas] = useState<{ lat: number; lng: number } | null>(null);
  const [mostrarMapaConfirmacion, setMostrarMapaConfirmacion] = useState(false);
  const [mensajeMapa, setMensajeMapa] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [dictando, setDictando] = useState(false);
  const [textoInterino, setTextoInterino] = useState("");
  const textoInterinoRef = useRef("");
  const recognitionRef = useRef<any>(null);

  async function iniciarGrabacion() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioChunksRef.current = [];

const mimeType = MediaRecorder.isTypeSupported("audio/mp4")
  ? "audio/mp4"
  : MediaRecorder.isTypeSupported("audio/webm")
  ? "audio/webm"
  : "";

const recorder = new MediaRecorder(
  stream,
  mimeType ? { mimeType } : undefined
);

mediaRecorderRef.current = recorder;
audioChunksRef.current = [];

recorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    audioChunksRef.current.push(event.data);
  }
};

recorder.onstop = () => {
  const finalMimeType = recorder.mimeType || mimeType || "audio/mp4";
  const extension = finalMimeType.includes("mp4") ? "m4a" : "webm";

  const audioBlob = new Blob(audioChunksRef.current, {
    type: finalMimeType,
  });

  const audioFile = new File(
    [audioBlob],
    `nota-voz-${Date.now()}.${extension}`,
    { type: finalMimeType }
  );

  setArchivo(audioFile);
  setAudioUrl(URL.createObjectURL(audioBlob));
  setGrabando(false);

  stream.getTracks().forEach((track) => track.stop());
};

    recorder.start();
    setGrabando(true);
  } catch (error) {
    setResultado({
      ok: false,
      error:
        "No se pudo acceder al micrófono. Revisa los permisos del navegador.",
    });
  }
}

function detenerGrabacion() {
  const recorder = mediaRecorderRef.current;

  if (!recorder) {
    setGrabando(false);
    return;
  }

  if (recorder.state === "recording" || recorder.state === "paused") {
    recorder.stop();
  }

  setGrabando(false);
}

function iniciarDictado() {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Tu navegador no soporta dictado por voz");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "es-MX";
  recognition.continuous = false;
  recognition.interimResults = true;

  recognitionRef.current = recognition;

  recognition.onresult = (event: any) => {
    let final = "";
    let interino = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const texto = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        final += texto;
      } else {
        interino += texto;
      }
    }

    if (final.trim()) {
      setDescripcion((prev) =>
        prev.trim() ? `${prev.trim()} ${final.trim()}` : final.trim()
      );
      setTextoInterino("");
    } else {
      setTextoInterino(interino);
textoInterinoRef.current = interino;
    }
  };

  recognition.onerror = () => {
    setDictando(false);
    setTextoInterino("");
  };

  recognition.onend = () => {
    setDictando(false);
    setTextoInterino("");
  };

  recognition.start();
  setDictando(true);
}

function detenerDictado() {
  const pendiente = textoInterinoRef.current.trim();

  if (pendiente) {
    setDescripcion((prev) =>
      prev.trim() ? `${prev.trim()} ${pendiente}` : pendiente
    );
  }

  setTextoInterino("");
  textoInterinoRef.current = "";

  if (recognitionRef.current) {
    recognitionRef.current.stop();
  }

  setDictando(false);
}
  
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

    if (!calleNumero.trim() || !municipio.trim() || !estadoLugar.trim()) {
      setResultado({
        ok: false,
        error: "Completa al menos calle y número, municipio y estado.",
      });
      setLoading(false);
      return;
    }

    const direccionCompleta = `${calleNumero}, ${colonia}, ${municipio}, ${estadoLugar}, ${codigoPostal}`;

    const validacion = await fetch("/api/validar-direccion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direccion: direccionCompleta,
        mapsLink: mapsLink || null,
      }),
    });

    const dataValidacion = await validacion.json();

    if (!dataValidacion.ok) {
      setErrorUbicacion("La dirección no parece existir en el mapa. Revísala.");
      setLoading(false);
      return;
    }

    const latDir = Number(dataValidacion.result.direccionCoords.lat);
    const lngDir = Number(dataValidacion.result.direccionCoords.lon);

    setCoordsValidadas({ lat: latDir, lng: lngDir });

    const puntoConfirmado = coordsConfirmadas || { lat: latDir, lng: lngDir };
    setCoordsConfirmadas(puntoConfirmado);
    setMostrarMapaConfirmacion(true);

    let mensajeUbicacion = "Ubicación validada";

    if (dataValidacion.result.comparacion) {
      const comp = dataValidacion.result.comparacion;

      if (comp.estado === "coincide") {
        mensajeUbicacion = "Ubicación confirmada con Google Maps";
      } else if (comp.estado === "aproximado") {
        mensajeUbicacion = "Ubicación cercana al punto de Google Maps";
      } else {
        mensajeUbicacion = "⚠️ El punto de Google Maps no coincide con la dirección";
      }
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
      `Coords dirección: ${latDir}, ${lngDir}`,
      puntoConfirmado
        ? `Coords confirmadas: ${puntoConfirmado.lat}, ${puntoConfirmado.lng}`
        : "",
      mensajeUbicacion,
      mensajeMapa,
    ]
      .filter(Boolean)
      .join(", ");

// 🧠 Analizar denuncia con IA antes de enviar
const analisis = await fetch("/api/analizar", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    texto: `${titulo} ${descripcion} ${calleNumero} ${colonia} ${municipio} ${estadoLugar} ${referencia}`,
  }),
});

const resultadoIA = await analisis.json();

console.log("IA:", resultadoIA);

// 🚫 Bloquear si parece broma o basura
if (resultadoIA.credibilidad === "BAJA") {
  setResultado({
    ok: false,
    error: "La denuncia parece poco clara o no válida. Revísala antes de enviarla.",
  });
  setLoading(false);
  return;
}

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

        {!resultado?.ok && (
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
  className="mb-3 w-full rounded-2xl border px-4 py-3"
  rows={4}
  placeholder="Describe el problema..."
/>

<div className="mb-4">
  {!dictando ? (
    <button
      type="button"
      onClick={iniciarDictado}
      className="rounded-xl bg-[#0A4E84] px-4 py-2 text-white font-semibold"
    >
      🎤 Dictar denuncia
    </button>
  ) : (
    <button
      type="button"
      onClick={detenerDictado}
      className="rounded-xl bg-red-600 px-4 py-2 text-white font-semibold"
    >
      ⏹️ Detener dictado
    </button>
  )}

{dictando && (
  <div className="mt-2 text-sm font-semibold text-red-600">
    🎙️ Escuchando... habla ahora
  </div>
)}

{textoInterino && (
  <div className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
    Texto detectado: {textoInterino}
  </div>
)}
</div>

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

{mostrarMapaConfirmacion && coordsConfirmadas && (
  <div className="mb-6">
    <div className="mb-2 text-sm font-semibold text-[#0A4E84]">
      Confirma la ubicación del hecho
    </div>

    <p className="mb-3 text-sm text-slate-600">
      Si el punto no es correcto, toca el mapa o arrastra el marcador al lugar real.
    </p>

    <ReporteMap
      lat={coordsConfirmadas.lat}
      lng={coordsConfirmadas.lng}
      onChange={(lat, lng) => {
        setCoordsConfirmadas({ lat, lng });
        setMensajeMapa("Ubicación confirmada manualmente por la persona denunciante.");
      }}
    />

    <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
      <div className="font-semibold">Ubicación seleccionada</div>
      <div className="mt-1">Lat: {coordsConfirmadas.lat}</div>
      <div>Lng: {coordsConfirmadas.lng}</div>
    </div>
  </div>
)}          

          <label className="mb-2 block font-semibold">Evidencia (opcional)</label>
<input
  type="file"
  accept="image/*,application/pdf,audio/*,.mp3,.m4a,.wav,.webm"
  onChange={(e) => setArchivo(e.target.files?.[0] || null)}
  className="w-full rounded-2xl border border-[#0A4E84] px-5 py-4 text-lg"
/>

<p className="mt-2 text-sm text-slate-500">
  Puedes subir imagen, PDF o audio como evidencia. La voz ayuda cuando la persona no puede escribir fácilmente.
</p>

<div className="mt-4 rounded-2xl bg-slate-50 p-4">
  <div className="mb-2 font-semibold text-[#0A4E84]">
    Nota de voz
  </div>

  <p className="mb-3 text-sm text-slate-600">
    Puedes grabar tu denuncia hablando, como en WhatsApp.
  </p>

  {!grabando ? (
    <button
      type="button"
      onClick={iniciarGrabacion}
      className="rounded-xl bg-[#0A4E84] px-4 py-3 font-semibold text-white"
    >
      🎙️ Grabar nota de voz
    </button>
  ) : (
    <button
      type="button"
      onClick={detenerGrabacion}
      className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white"
    >
      ⏹️ Detener grabación
    </button>
  )}

{audioUrl && (
  <div className="mt-4">
    <div className="mb-2 text-sm font-semibold text-slate-700">
      Audio grabado:
    </div>

    <audio controls src={audioUrl} className="w-full" />

    <button
      type="button"
      onClick={() => {
        setDescripcion((prev) =>
          prev
            ? prev + " [Nota de voz incluida como evidencia]"
            : "[Denuncia enviada por nota de voz. Revisar audio adjunto]"
        );
      }}
      className="mt-3 rounded-xl bg-green-600 px-4 py-2 font-semibold text-white"
    >
      Usar audio como descripción
    </button>

    <button
      type="button"
      onClick={() => {
        setArchivo(null);
        setAudioUrl("");
      }}
      className="ml-2 mt-3 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white"
    >
      Eliminar audio
    </button>
  </div>
)}
</div>

<button
  onClick={enviarReporte}
            disabled={loading}
            className="w-full rounded-2xl bg-[#F2C300] px-4 py-4 text-lg font-bold text-[#1F2937]"
          >
            {loading ? "Enviando..." : "Enviar Denuncia"}
          </button>
        </div>
)}

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
