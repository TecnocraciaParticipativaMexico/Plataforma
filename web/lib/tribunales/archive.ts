import {
  courts,
  layers,
  fingerprint,
  validateDossier,
  type Dossier,
  type Finding,
} from "./model.ts";

export type LocalVersion = {
  number: number;
  createdAt: string;
  dossier: Dossier;
  contentHash: string;
  previousHash: string;
  hash: string;
};
export type RecordEntry = {
  id: string;
  dossier: Dossier;
  hash: string;
  versions: LocalVersion[];
};
export type WorkspaceArchive = {
  format: "TP-TAI-WORKSPACE-1";
  records: RecordEntry[];
  draft?: { data: Dossier; editingId: string | null };
};
function partialDraft(input: unknown): Dossier {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Formulario cifrado inválido.");
  const d = input as Record<string, unknown>;
  const text = (key: string, max: number) => {
    const value = d[key];
    if (typeof value !== "string" || value.length > max)
      throw new Error("Formulario cifrado fuera de límites.");
    return value;
  };
  if (
    !courts.includes(d.court as Dossier["court"]) ||
    typeof d.ongoing !== "boolean" ||
    !Array.isArray(d.findings) ||
    d.findings.length !== 5
  )
    throw new Error("Formulario cifrado fuera de esquema.");
  const findings = d.findings.map((value: unknown, i: number): Finding => {
    if (!value || typeof value !== "object")
      throw new Error("Matriz parcial inválida.");
    const f = value as Finding;
    if (
      f.layer !== layers[i] ||
      typeof f.source !== "string" ||
      f.source.length > 2000 ||
      typeof f.reasoning !== "string" ||
      f.reasoning.length > 6000 ||
      !["Pendiente", "Consistente", "Requiere contraste"].includes(f.result) ||
      (f.reviewState !== undefined &&
        ![
          "Pendiente",
          "Preparada para revisión",
          "Requiere aclaración",
        ].includes(f.reviewState)) ||
      (f.reviewNote !== undefined &&
        (typeof f.reviewNote !== "string" || f.reviewNote.length > 2000))
    )
      throw new Error("Matriz parcial fuera de límites.");
    return {
      layer: layers[i],
      source: f.source,
      reasoning: f.reasoning,
      result: f.result,
      ...(f.reviewState !== undefined ? { reviewState: f.reviewState } : {}),
      ...(f.reviewNote !== undefined ? { reviewNote: f.reviewNote } : {}),
    };
  });
  // A partial draft may contain unfinished URLs/dates. It is never used as a saved
  // dossier, rendered link, report or privileged command until validateDossier passes.
  return {
    title: text("title", 200),
    court: d.court as Dossier["court"],
    issuer: text("issuer", 200),
    date: text("date", 10),
    source: text("source", 2000),
    summary: text("summary", 12000),
    impact: text("impact", 4000),
    ongoing: d.ongoing,
    findings,
  };
}
const encoder = new TextEncoder();
async function sha(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}
export async function appendVersion(
  dossier: Dossier,
  previous?: RecordEntry,
): Promise<RecordEntry> {
  const checked = validateDossier(dossier);
  if (previous)
    await validateArchive({
      format: "TP-TAI-WORKSPACE-1",
      records: [previous],
    });
  const contentHash = await fingerprint(checked);
  if (previous && previous.hash === contentHash)
    return structuredClone(previous);
  if (previous && previous.versions.length >= 50)
    throw new Error(
      "Límite de 50 versiones locales. Exporta el archivo antes de iniciar otro expediente.",
    );
  const id = previous?.id ?? crypto.randomUUID();
  const versions = structuredClone(previous?.versions ?? []);
  const base = {
    number: versions.length + 1,
    createdAt: new Date().toISOString(),
    dossier: checked,
    contentHash,
    previousHash: versions.at(-1)?.hash ?? "",
  };
  const hash = await sha(JSON.stringify({ recordId: id, ...base }));
  return {
    id,
    dossier: checked,
    hash: contentHash,
    versions: [...versions, { ...base, hash }],
  };
}
export async function validateArchive(
  input: unknown,
): Promise<WorkspaceArchive> {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Archivo de trabajo inválido.");
  const a = input as WorkspaceArchive;
  if (
    a.format !== "TP-TAI-WORKSPACE-1" ||
    !Array.isArray(a.records) ||
    a.records.length > 20 ||
    new Set(a.records.map((r) => r?.id)).size !== a.records.length
  )
    throw new Error("Archivo de trabajo excesivo o duplicado.");
  const records: RecordEntry[] = [];
  for (const r of a.records) {
    if (
      !r ||
      typeof r.id !== "string" ||
      !/^[0-9a-f-]{36}$/.test(r.id) ||
      !Array.isArray(r.versions) ||
      r.versions.length < 1 ||
      r.versions.length > 50
    )
      throw new Error("Historial local inválido.");
    const versions: LocalVersion[] = [];
    for (const v of r.versions) {
      if (
        !v ||
        v.number !== versions.length + 1 ||
        typeof v.createdAt !== "string" ||
        !Number.isFinite(Date.parse(v.createdAt))
      )
        throw new Error("Secuencia local inválida.");
      const dossier = validateDossier(v.dossier);
      const contentHash = await fingerprint(dossier);
      const previousHash = versions.at(-1)?.hash ?? "";
      const base = {
        number: v.number,
        createdAt: v.createdAt,
        dossier,
        contentHash,
        previousHash,
      };
      const hash = await sha(JSON.stringify({ recordId: r.id, ...base }));
      if (
        v.contentHash !== contentHash ||
        v.previousHash !== previousHash ||
        v.hash !== hash
      )
        throw new Error("Cadena de versiones alterada.");
      versions.push({ ...base, hash });
    }
    const dossier = validateDossier(r.dossier);
    const hash = await fingerprint(dossier);
    if (r.hash !== hash || versions.at(-1)?.contentHash !== hash)
      throw new Error("La versión actual no coincide con el historial.");
    records.push({ id: r.id, dossier, hash, versions });
  }
  let draft: WorkspaceArchive["draft"];
  if (a.draft !== undefined) {
    if (
      !a.draft ||
      (a.draft.editingId !== null &&
        !records.some((r) => r.id === a.draft!.editingId))
    )
      throw new Error("Referencia de edición inválida.");
    draft = { data: partialDraft(a.draft.data), editingId: a.draft.editingId };
  }
  return { format: "TP-TAI-WORKSPACE-1", records, ...(draft ? { draft } : {}) };
}
function base64(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}
function bytes(value: unknown, max: number): Uint8Array {
  if (
    typeof value !== "string" ||
    value.length > max ||
    !/^[A-Za-z0-9+/]*={0,2}$/.test(value)
  )
    throw new Error("Datos cifrados inválidos.");
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}
async function derive(password: string, salt: Uint8Array<ArrayBuffer>) {
  if (password.length < 12 || password.length > 256)
    throw new Error(
      "Usa una contraseña de 12 a 256 caracteres; no puede recuperarse si la pierdes.",
    );
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 600000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}
export async function encryptArchive(
  input: WorkspaceArchive,
  password: string,
): Promise<string> {
  const archive = await validateArchive(input);
  const plaintext = encoder.encode(JSON.stringify(archive));
  if (plaintext.byteLength > 2900000)
    throw new Error(
      "El respaldo excede el límite recuperable de 2.9 MB; exporta expedientes individuales.",
    );
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await derive(password, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: encoder.encode("TP-TAI-VAULT-1") },
    key,
    plaintext,
  );
  return JSON.stringify({
    format: "TP-TAI-VAULT-1",
    kdf: "PBKDF2-SHA256",
    iterations: 600000,
    cipher: "AES-256-GCM",
    salt: base64(salt),
    iv: base64(iv),
    data: base64(new Uint8Array(encrypted)),
  });
}
export async function decryptArchive(
  serialized: string,
  password: string,
): Promise<WorkspaceArchive> {
  if (serialized.length > 4000000)
    throw new Error("Archivo cifrado mayor de 4 MB.");
  const v = JSON.parse(serialized);
  if (
    !v ||
    v.format !== "TP-TAI-VAULT-1" ||
    v.kdf !== "PBKDF2-SHA256" ||
    v.iterations !== 600000 ||
    v.cipher !== "AES-256-GCM"
  )
    throw new Error("Formato cifrado no admitido.");
  const salt = new Uint8Array(bytes(v.salt, 24));
  const iv = new Uint8Array(bytes(v.iv, 16));
  const data = new Uint8Array(bytes(v.data, 4000000));
  if (salt.length !== 16 || iv.length !== 12 || data.length < 16)
    throw new Error("Parámetros de cifrado inválidos.");
  const key = await derive(password, salt);
  let plaintext: ArrayBuffer;
  try {
    plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv, additionalData: encoder.encode("TP-TAI-VAULT-1") },
      key,
      data,
    );
  } catch {
    throw new Error("Contraseña incorrecta o archivo alterado.");
  }
  return validateArchive(JSON.parse(new TextDecoder().decode(plaintext)));
}
