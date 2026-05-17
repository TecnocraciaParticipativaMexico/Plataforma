export type CommitteeLevel = "Municipal" | "Estatal" | "Federal";

const VALID_LEVELS: CommitteeLevel[] = ["Municipal", "Estatal", "Federal"];

function clean(value: unknown) {
  return String(value || "").trim();
}

export function normalizeCommitteeTerritory(params: {
  level: unknown;
  municipality?: unknown;
  state?: unknown;
}) {
  const level = clean(params.level) as CommitteeLevel;
  const municipality = clean(params.municipality);
  const state = clean(params.state);
  const errors: string[] = [];

  if (!VALID_LEVELS.includes(level)) {
    errors.push("Nivel territorial no permitido.");
  }

  if (level === "Municipal") {
    if (!municipality) errors.push("El nivel municipal requiere un municipio principal.");
    if (!state) errors.push("El nivel municipal requiere estado correspondiente.");

    return {
      level,
      municipality: municipality || null,
      state: state || null,
      territorial_scope: municipality && state ? `${municipality}, ${state}` : null,
      errors,
    };
  }

  if (level === "Estatal") {
    if (!state) errors.push("El nivel estatal requiere estado correspondiente.");

    return {
      level,
      municipality: null,
      state: state || null,
      territorial_scope: state || null,
      errors,
    };
  }

  if (level === "Federal") {
    return {
      level,
      municipality: null,
      state: null,
      territorial_scope: "Nacional",
      errors,
    };
  }

  return {
    level,
    municipality: null,
    state: null,
    territorial_scope: null,
    errors,
  };
}
