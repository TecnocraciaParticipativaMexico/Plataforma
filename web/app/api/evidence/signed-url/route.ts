import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit } from "@/lib/security";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "evidence-signed-url", 30, 60_000);
  if (limited) return limited;

  const body = await req.json();
  const bucket = String(body?.bucket || process.env.EVIDENCE_BUCKET || "evidence-private");
  const path = String(body?.path || "");

  if (!path || path.includes("..") || path.startsWith("/")) {
    return NextResponse.json(
      { ok: false, error: "INVALID_STORAGE_PATH" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 10);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, signedUrl: data.signedUrl });
}
