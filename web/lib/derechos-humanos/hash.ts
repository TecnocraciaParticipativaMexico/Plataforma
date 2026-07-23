export async function createSha256(input: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(input);
    const digest = await window.crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  return `SHA-256 no disponible en este navegador (${input.length} caracteres evaluados localmente)`;
}

export function createDemoFolio(prefix = "DDHH"): string {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const suffix =
    typeof window !== "undefined" && window.crypto?.randomUUID
      ? window.crypto.randomUUID().slice(0, 8).toUpperCase()
      : String(date.getTime()).slice(-8);
  return `${prefix}-${stamp}-${suffix}`;
}
