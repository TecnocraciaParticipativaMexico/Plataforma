import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import crypto from "crypto";

function sha256Hex(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
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

    // actor_hash (tu identidad anónima persistente)
    const actor_hash = String(form.get("actor_hash") || "").trim();
    if (!actor_hash) {
      return NextResponse.json({ ok: false, error: "actor_hash requerido" }, { status: 400 });
    }

    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "file requerido" }, { status: 400 });
    }

    // límites MVP (ajusta luego)
    const maxBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxBytes) {
      return NextResponse.json(
        { ok: false, error: "Archivo demasiado grande (max 10MB)" },
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
    const storage_path = `${pid}/${Date.now()}_${sha256.slice(0, 12)}_${safeName}`;

    // subir a bucket evidence
    const bucket = "evidence";
    const uploadRes = await supabaseServer.storage
      .from(bucket)
      .upload(storage_path, buf, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadRes.error) {
      return NextResponse.json({ ok: false, error: uploadRes.error.message }, { status: 500 });
    }

    // guardar puntero + hash en DB (NO guardamos el archivo en DB)
    const insertRes = await supabaseServer
      .from("evidence_pointers")
      .insert({
        process_id: pid,
        actor_hash,
        storage_bucket: bucket,
        storage_path,
        sha256,
        mime_type: file.type || null,
        size_bytes: file.size,
      })
      .select("id")
      .single();

    if (insertRes.error) {
      return NextResponse.json({ ok: false, error: insertRes.error.message }, { status: 500 });
    }

    const evidence_id = insertRes.data.id;

    // crear evento append-only EvidenceSubmitted (entra a tu hash-chain)
    const payload = {
      evidence_id,
      sha256,
      storage_bucket: bucket,
      storage_path,
      mime_type: file.type || null,
      size_bytes: file.size,
      note: "Evidence submitted (raw). Next phase: sanitize/redact + EXIF removal.",
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