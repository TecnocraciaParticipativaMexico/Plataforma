import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import crypto from "crypto";

function sha256Hex(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "application/pdf",
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/x-m4a",
  "audio/aac",
  "audio/webm",
  "video/mp4",
  "video/webm",
]);

function detectMime(buf: Buffer) {
  const hex = buf.subarray(0, 16).toString("hex");
  const ascii = buf.subarray(0, 16).toString("ascii");

  if (hex.startsWith("ffd8ff")) return "image/jpeg";
  if (hex.startsWith("89504e470d0a1a0a")) return "image/png";
  if (ascii.startsWith("%PDF")) return "application/pdf";
  if (buf.subarray(4, 8).toString("ascii") === "ftyp") return "video/mp4";
  if (ascii.startsWith("ID3") || hex.startsWith("fffb") || hex.startsWith("fff3")) {
    return "audio/mpeg";
  }

  return "application/octet-stream";
}

function mimeCompatible(declared: string, detected: string) {
  if (declared === detected) return true;
  if (declared === "audio/mp3" && detected === "audio/mpeg") return true;
  if ((declared === "audio/mp4" || declared === "audio/x-m4a") && detected === "video/mp4") return true;
  return false;
}

function stripJpegMetadata(buf: Buffer) {
  if (!buf.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return buf;

  const chunks = [buf.subarray(0, 2)];
  let offset = 2;

  while (offset < buf.length) {
    if (buf[offset] !== 0xff) break;

    const marker = buf[offset + 1];
    if (marker === 0xda) {
      chunks.push(buf.subarray(offset));
      break;
    }

    const length = buf.readUInt16BE(offset + 2);
    const end = offset + 2 + length;
    const isMetadata = marker >= 0xe0 && marker <= 0xef;

    if (!isMetadata) chunks.push(buf.subarray(offset, end));
    offset = end;
  }

  return Buffer.concat(chunks);
}

function maxBytesFor(mime: string) {
  if (mime.startsWith("image/")) return 10 * 1024 * 1024;
  if (mime === "application/pdf") return 15 * 1024 * 1024;
  if (mime.startsWith("audio/")) return 25 * 1024 * 1024;
  if (mime.startsWith("video/")) return 50 * 1024 * 1024;
  return 10 * 1024 * 1024;
}

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

    if (!ALLOWED_MIME.has(mime)) {
      return NextResponse.json(
        {
          ok: false,
          error: "FILE_TYPE_NOT_ALLOWED",
          message: "Tipo de archivo no permitido. Usa: JPG/PNG, PDF, MP3/M4A, WebM o MP4.",
          mime_type: mime,
        },
        { status: 400 }
      );
    }

    const maxBytes = maxBytesFor(mime);
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          ok: false,
          error: "FILE_TOO_LARGE",
          message: `Archivo demasiado grande. Límite para ${mime}: ${Math.round(maxBytes / (1024 * 1024))}MB`,
          size_bytes: file.size,
          max_bytes: maxBytes,
        },
        { status: 400 }
      );
    }

    const ab = await file.arrayBuffer();
    const buf = Buffer.from(ab);
    const detectedMime = detectMime(buf);

    if (!mimeCompatible(mime, detectedMime)) {
      return NextResponse.json(
        {
          ok: false,
          error: "FILE_SIGNATURE_MISMATCH",
          message: "La firma real del archivo no coincide con el tipo declarado.",
          mime_type: mime,
          detected_mime_type: detectedMime,
        },
        { status: 400 }
      );
    }

    const sanitized = detectedMime === "image/jpeg" ? stripJpegMetadata(buf) : buf;
    const sha256 = sha256Hex(sanitized);
    const safeName = (file.name || "evidence").replace(/[^\w.\-]+/g, "_");
    const kind = kindFor(mime);
    const storage_path = `${pid}/${kind}/${Date.now()}_${sha256.slice(0, 12)}_${safeName}`;
    const bucket = process.env.EVIDENCE_BUCKET || "evidence-private";

    const uploadRes = await supabaseServer.storage.from(bucket).upload(storage_path, sanitized, {
      contentType: mime,
      upsert: false,
    });

    if (uploadRes.error) {
      return NextResponse.json({ ok: false, error: uploadRes.error.message }, { status: 500 });
    }

    const insertRes = await supabaseServer
      .from("evidence_pointers")
      .insert({
        process_id: pid,
        actor_hash,
        storage_bucket: bucket,
        storage_path,
        sha256,
        mime_type: mime,
        size_bytes: sanitized.length,
      })
      .select("id")
      .single();

    if (insertRes.error) {
      return NextResponse.json({ ok: false, error: insertRes.error.message }, { status: 500 });
    }

    const evidence_id = insertRes.data.id;
    const payload = {
      evidence_id,
      sha256,
      storage_bucket: bucket,
      storage_path,
      mime_type: mime,
      size_bytes: sanitized.length,
      note: detectedMime === "image/jpeg"
        ? "Evidence submitted. JPEG metadata stripped before storage."
        : "Evidence submitted. Magic bytes validated before storage.",
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
