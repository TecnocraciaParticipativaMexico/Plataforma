import { NextResponse } from "next/server";
import { unavailableOperation } from "@/lib/tribunales/capabilities";

export function POST() {
  return NextResponse.json(unavailableOperation(), {
    status: 503,
    headers: { "Cache-Control": "no-store" },
  });
}
export const PUT = POST;
export const PATCH = POST;
export const DELETE = POST;
