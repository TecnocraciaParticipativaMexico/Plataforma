import { NextResponse } from "next/server";

const gone = () =>
  NextResponse.json(
    { ok: false, error: "Legacy committee applications endpoint has been removed" },
    { status: 410 },
  );

export const POST = gone;
export const PATCH = gone;
