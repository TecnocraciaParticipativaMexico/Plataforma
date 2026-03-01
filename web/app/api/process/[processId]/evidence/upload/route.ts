import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import crypto from "crypto";

function sha256Hex(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

// ✅ Allowlist MIME types (fácil para mexicanos + acorde al PDF)
const ALLOWED_MIME = new Set([
  // imágenes (WhatsApp / cámara)
  "image/jpeg",
  "image/png",

  // documentos (Word -> PDF)
  "application/pdf",

  // audio (WhatsApp / grabadora)
  "audio/mpeg", // mp3
  "audio/mp3",
  "audio/mp4", // m4a a veces llega así
  "audio/x-m4a",
  "audio/aac",

  // video (WhatsApp / cámara)
  "video/mp4",
]);

// límites por tipo (MVP)
function maxBytesFor(mime: string) {
  if (mime.startsWith("image/")) return 10 * 1024 * 1024; // 10MB
  if (mime === "application/pdf") return 15 * 1024 * 1024; // 15MB
  if (mime.startsWith("audio/")) return 25 * 1024 * 1024; // 25MB
  if (mime.startsWith("video/")) return 50 * 1024 * 1024; // 50MB
  return 10 * 1024 * 1024;
}

// solo para nombrar mejor en storage
function kindFor(mime: string) {
  if (mime.startsWith("image/")) return "img";
  if (mime === "application/pdf") return "pdf";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.startsWith("video/")) return "video";
  return "file";
}

export async function POST(
  req: Request,
  context: { params: Promise<{ processId: string }> }
) {
  try {
    const { processId } = await context.params;
    const pid = String(processId || "").trim();
    if (!pid) {
      return NextResponse.json({ ok: false, error: "processId requerido" }, { status: 400 });
    }

    const form = await req.formData();

    const actor_hash = String(form.get("actor_hash") || "").trim();
    if (!actor_hash) {
      return NextResponse.json({ ok: false, error: "actor_hash requerido" }, { status: 400 });
    }

    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "file requerido" }, { status: 400 });
    }

    const mime = String(file.type || "").trim() || "application/octet-stream";

    // ✅ Bloqueo por allowlist
    if (!ALLOWED_MIME.has(mime)) {
      return NextResponse.json(
        {
          ok: false,
          error: "FILE_TYPE_NOT_ALLOWED",
          message:
            "Tipo de archivo no permitido. Usa: JPG/PNG, PDF, MP3/M4A o MP4.",
          mime_type: mime,
        },
        { status: 400 }
      );
    }

    // ✅ Límite por tipo
    const maxBytes = maxBytesFor(mime);
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          ok: false,
          error: "FILE_TOO_LARGE",
          message: `Archivo demasiado grande. Límite para ${mime}: ${Math.round(
            maxBytes / (1024 * 1024)
          )}MB`,
          size_bytes: file.size,
          max_bytes: maxBytes,
        },
        { status: 400 }
      );
    }

    // leer bytes
    const ab = await file.arrayBuffer();
    const buf = Buffer.from(ab);

    // hash
    const sha256 = sha256Hex(buf);

    // ruta en storage (por proceso)
    const safeName = (file.name || "evidence").replace(/[^\w.\-]+/g, "_");
    const kind = kindFor(mime);
    const storage_path = `${pid}/${kind}/${Date.now()}_${sha256.slice(0, 12)}_${safeName}`;

    // subir a bucket evidence
    const bucket = "evidence";
    const uploadRes = await supabaseServer.storage.from(bucket).upload(storage_path, buf, {
      contentType: mime,
      upsert: false,
    });

    if (uploadRes.error) {
      return NextResponse.json({ ok: false, error: uploadRes.error.message }, { status: 500 });
    }

    // guardar puntero + hash en DB
    const insertRes = await supabaseServer
      .from("evidence_pointers")
      .insert({
        process_id: pid,
        actor_hash,
        storage_bucket: bucket,
        storage_path,
        sha256,
        mime_type: mime,
        size_bytes: file.size,
      })
      .select("id")
      .single();

    if (insertRes.error) {
      return NextResponse.json({ ok: false, error: insertRes.error.message }, { status: 500 });
    }

    const evidence_id = insertRes.data.id;

    // evento append-only
    const payload = {
      evidence_id,
      sha256,
      storage_bucket: bucket,
      storage_path,
      mime_type: mime,
      size_bytes: file.size,
      note: "Evidence submitted (raw). Next phase: sanitize/redact + metadata removal.",
    };

    const ev = await supabaseServer.rpc("add_process_event", {
      p_process_id: pid,
      p_event_type: "EvidenceSubmitted",
      p_actor_hash: actor_hash,
      p_payload: payload,
    });

    if (ev.error) {
      return NextResponse.json({ ok: false, error: ev.error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      result: {
        evidence_id,
        sha256,
        storage_bucket: bucket,
        storage_path,
        event: ev.data?.[0] ?? ev.data,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
  }
}