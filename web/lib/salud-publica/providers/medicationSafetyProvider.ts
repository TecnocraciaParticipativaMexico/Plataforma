import type {
  MedicationEntry,
  MedicationSafetyProvider,
  MedicationSafetyResult,
  PotentialAdverseEffect,
  PotentialInteractionWarning,
} from "../types";

type MedicationCatalogItem = {
  activeIngredient: string;
  category: string;
  examples: string[];
};

const medicationCatalog: MedicationCatalogItem[] = [
  { activeIngredient: "paracetamol", category: "analgesico_antitermico", examples: ["paracetamol", "acetaminofen", "acetaminofén"] },
  { activeIngredient: "ibuprofeno", category: "antiinflamatorio", examples: ["ibuprofeno"] },
  { activeIngredient: "naproxeno", category: "antiinflamatorio", examples: ["naproxeno"] },
  { activeIngredient: "loratadina", category: "antihistaminico", examples: ["loratadina"] },
  { activeIngredient: "difenhidramina", category: "antihistaminico_sedante", examples: ["difenhidramina"] },
  { activeIngredient: "amoxicilina", category: "antibiotico", examples: ["amoxicilina"] },
];

const categoryRules = [
  {
    id: "antiinflamatorios-combinados",
    categories: ["antiinflamatorio"],
    trigger: "Más de un antiinflamatorio declarado",
    explanation: "El uso simultáneo de productos de la misma categoría puede requerir revisión profesional.",
  },
  {
    id: "antihistaminicos-sedantes",
    categories: ["antihistaminico", "antihistaminico_sedante"],
    trigger: "Antihistamínicos declarados en conjunto",
    explanation: "Algunos productos pueden causar somnolencia o requerir precaución según edad, actividades y otros tratamientos.",
  },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function catalogMatch(name: string) {
  const normalized = normalize(name);
  return medicationCatalog.find((item) => item.examples.some((example) => normalized.includes(normalize(example))));
}

function isRecentStart(startedAt?: string) {
  if (!startedAt) return false;
  const text = normalize(startedAt);
  return ["hoy", "ayer", "esta semana", "reciente", "hace 1 dia", "hace un dia", "hace 2 dias"].some((term) => text.includes(term));
}

export class LocalMedicationSafetyProvider implements MedicationSafetyProvider {
  review(input: { symptoms: string; allergies: string; medications: MedicationEntry[] }): MedicationSafetyResult {
    const missingData: string[] = [];
    const adverseEffects: PotentialAdverseEffect[] = [];
    const interactionWarnings: PotentialInteractionWarning[] = [];
    const declaredNames = input.medications.map((item) => normalize(item.name)).filter(Boolean);
    const allergies = normalize(input.allergies);

    if (!input.medications.length) {
      missingData.push("No se declararon medicamentos, suplementos ni remedios.");
    }

    input.medications.forEach((item) => {
      if (!item.name.trim()) missingData.push("Hay un producto sin nombre declarado.");
      if (!item.frequency?.trim()) missingData.push(`Falta frecuencia para ${item.name || "un producto declarado"}.`);
      if (!item.startedAt?.trim()) missingData.push(`Falta fecha aproximada de inicio para ${item.name || "un producto declarado"}.`);
      if (item.name && allergies && allergies.includes(normalize(item.name))) {
        adverseEffects.push({
          id: `allergy-${item.id}`,
          trigger: `Alergia declarada relacionada con ${item.name}`,
          explanation: "La persona declaró una alergia que coincide con un producto registrado.",
          cautionLevel: "revision_prioritaria",
        });
      }
      if (item.name && isRecentStart(item.startedAt)) {
        adverseEffects.push({
          id: `recent-${item.id}`,
          trigger: `Inicio reciente de ${item.name}`,
          explanation: "El inicio o cambio reciente coincide temporalmente con los síntomas declarados.",
          cautionLevel: "precaucion",
        });
      }
    });

    [...new Set(declaredNames)].forEach((name) => {
      const count = declaredNames.filter((item) => item === name).length;
      if (count > 1) {
        interactionWarnings.push({
          id: `duplicate-${name}`,
          trigger: `Nombre duplicado declarado: ${name}`,
          explanation: "Puede tratarse de un registro repetido o uso duplicado. Conviene revisar la lista con un profesional.",
          cautionLevel: "precaucion",
        });
      }
    });

    const catalogMatches = input.medications
      .map((item) => ({ item, match: catalogMatch(item.name) }))
      .filter((entry): entry is { item: MedicationEntry; match: MedicationCatalogItem } => Boolean(entry.match));

    const activeIngredientGroups = new Map<string, MedicationEntry[]>();
    catalogMatches.forEach(({ item, match }) => {
      const current = activeIngredientGroups.get(match.activeIngredient) ?? [];
      activeIngredientGroups.set(match.activeIngredient, [...current, item]);
    });

    activeIngredientGroups.forEach((items, activeIngredient) => {
      if (items.length > 1) {
        interactionWarnings.push({
          id: `ingredient-${activeIngredient}`,
          trigger: `Mismo ingrediente activo mock: ${activeIngredient}`,
          explanation: "El catálogo demostrativo detectó más de un producto con el mismo ingrediente activo.",
          cautionLevel: "precaucion",
        });
      }
    });

    categoryRules.forEach((rule) => {
      const matched = catalogMatches.filter(({ match }) => rule.categories.includes(match.category));
      if (matched.length > 1 || rule.categories.every((category) => catalogMatches.some(({ match }) => match.category === category))) {
        interactionWarnings.push({
          id: rule.id,
          trigger: rule.trigger,
          explanation: rule.explanation,
          cautionLevel: "precaucion",
        });
      }
    });

    if (input.medications.length && !adverseEffects.length && !interactionWarnings.length) {
      missingData.push("No se detectaron advertencias con el catálogo demostrativo, pero la revisión es incompleta.");
    }

    return {
      id: `med-review-${Date.now()}`,
      declaredMedications: input.medications.filter((item) => item.name.trim()),
      adverseEffects,
      interactionWarnings,
      missingData,
      recommendedAction:
        "Podría existir una relación entre tus síntomas y uno o más productos declarados. No suspendas ni cambies el tratamiento por tu cuenta. Consulta a un médico o profesional farmacéutico y lleva esta lista.",
      limitation:
        "Resultado demostrativo basado en reglas locales conservadoras. No confirma interacciones farmacológicas, no sustituye revisión profesional y no indica suspender medicamentos.",
      generatedAt: new Date().toISOString(),
    };
  }
}

export const localMedicationSafetyProvider = new LocalMedicationSafetyProvider();
