import type { AbuseGuardResult } from "./types";

const COMPILE_ATTEMPT_KEY = "tp-mx2030-seguridad-ciudadana-compile-attempts-v1";
const COOLDOWN_MS = 60_000;
const MAX_ATTEMPTS_IN_WINDOW = 4;

function words(value: string): string[] {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]{3,}/g) || [];
}

export function detectTooShortNarrative(narrative: string, minCharacters = 80): AbuseGuardResult | null {
  if (narrative.trim().length >= minCharacters) return null;
  return {
    id: "too_short",
    label: "Narrativa breve",
    severity: "suave",
    message: "Para proteger el proceso ciudadano contra spam o manipulación, te sugerimos ampliar la narrativa antes de compilar.",
  };
}

export function detectExcessiveCaps(narrative: string): AbuseGuardResult | null {
  const letters = narrative.replace(/[^a-záéíóúñüA-ZÁÉÍÓÚÑÜ]/g, "");
  if (letters.length < 40) return null;
  const uppercase = letters.replace(/[^A-ZÁÉÍÓÚÑÜ]/g, "").length;
  if (uppercase / letters.length < 0.65) return null;
  return {
    id: "caps",
    label: "Uso elevado de mayúsculas",
    severity: "suave",
    message: "Revisa si la narrativa puede escribirse con mayúsculas y minúsculas para facilitar la lectura cívica.",
  };
}

export function detectRepeatedText(narrative: string): AbuseGuardResult | null {
  const tokenList = words(narrative);
  if (tokenList.length < 30) return null;
  const uniqueCount = new Set(tokenList).size;
  if (uniqueCount / tokenList.length > 0.38) return null;
  return {
    id: "repeated",
    label: "Texto repetitivo",
    severity: "media",
    message: "Detectamos repetición inusual. Te sugerimos revisar la narrativa para que describa hechos concretos.",
  };
}

export function detectSuspiciousLinks(narrative: string): AbuseGuardResult | null {
  const linkCount = (narrative.match(/https?:\/\/|www\.|\.com\b|\.mx\b/gi) || []).length;
  if (linkCount <= 2) return null;
  return {
    id: "links",
    label: "Muchos enlaces",
    severity: "media",
    message: "Incluye solo enlaces indispensables y evita usar el reporte como listado de ligas.",
  };
}

function readAttempts(now: number): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(COMPILE_ATTEMPT_KEY);
    const attempts = raw ? (JSON.parse(raw) as number[]) : [];
    return attempts.filter((value) => Number.isFinite(value) && now - value < COOLDOWN_MS);
  } catch {
    return [];
  }
}

export function getLocalSubmissionCooldown(now = Date.now()): number {
  const attempts = readAttempts(now);
  if (attempts.length < MAX_ATTEMPTS_IN_WINDOW) return 0;
  return Math.max(0, COOLDOWN_MS - (now - attempts[0]));
}

export function detectRapidLocalSubmission(now = Date.now()): AbuseGuardResult | null {
  const cooldown = getLocalSubmissionCooldown(now);
  if (!cooldown) return null;
  return {
    id: "rapid_submission",
    label: "Compilaciones frecuentes",
    severity: "suave",
    message: `Te sugerimos esperar ${Math.ceil(cooldown / 1000)} segundos antes de volver a compilar para evitar ruido o envíos repetitivos.`,
  };
}

export function registerLocalCompileAttempt(now = Date.now()): void {
  if (typeof window === "undefined") return;
  const attempts = [...readAttempts(now), now].slice(-MAX_ATTEMPTS_IN_WINDOW);
  window.localStorage.setItem(COMPILE_ATTEMPT_KEY, JSON.stringify(attempts));
}

export function analyzeAbuseGuards(narrative: string): AbuseGuardResult[] {
  return [
    detectTooShortNarrative(narrative),
    detectExcessiveCaps(narrative),
    detectRepeatedText(narrative),
    detectSuspiciousLinks(narrative),
  ].filter((result): result is AbuseGuardResult => Boolean(result));
}
