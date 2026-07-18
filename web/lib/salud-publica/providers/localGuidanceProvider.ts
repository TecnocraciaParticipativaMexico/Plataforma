import { HEALTH_LIMITATION_NOTICE } from "../constants";
import { triageRules } from "../rules/triageRules";
import type { AttentionLevel, GuidanceResult, HealthGuidanceProvider, RiskSignal } from "../types";

const levelRank: Record<AttentionLevel, number> = {
  orientacion_general: 1,
  seguimiento_recomendado: 2,
  consulta_prioritaria: 3,
  posible_emergencia: 4,
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function pickLevel(signals: RiskSignal[]): AttentionLevel {
  return signals.reduce<AttentionLevel>(
    (highest, signal) => (levelRank[signal.severity] > levelRank[highest] ? signal.severity : highest),
    "orientacion_general",
  );
}

export class LocalHealthGuidanceProvider implements HealthGuidanceProvider {
  generate(input: { caseId?: string; text: string; answers?: string[] }): GuidanceResult {
    const source = normalize([input.text, ...(input.answers ?? [])].join(" "));
    const matched = triageRules
      .map((rule) => {
        const matchedTerms = rule.terms.filter((term) => source.includes(normalize(term)));
        if (!matchedTerms.length) return null;
        return {
          rule,
          signal: { ...rule.signal, matchedTerms },
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const signals = matched.map((item) => item.signal);
    const level = pickLevel(signals);
    const actions = matched.map((item) => item.rule.action);
    const fallbackAction = {
      id: "action-general",
      title: "Organiza información para una consulta",
      description: "Describe síntomas, duración, cambios, antecedentes, alergias y medicamentos declarados.",
      priority: "informativa" as const,
      origin: "reglas_locales" as const,
    };

    return {
      id: `guidance-${Date.now()}`,
      caseId: input.caseId,
      level,
      title: level === "posible_emergencia" ? "Posible situación urgente" : level === "consulta_prioritaria" ? "Consulta prioritaria sugerida" : "Orientación informativa local",
      summary:
        level === "orientacion_general"
          ? "No se detectaron palabras asociadas a señales de alarma en las reglas locales. Organizar la información puede ayudar a una consulta profesional si hay duda, persistencia o cambios."
          : "Se detectaron términos declarados por el ciudadano asociados con señales preventivas. El resultado proviene de reglas locales y no constituye evaluación clínica.",
      signals,
      actions: actions.length ? actions : [fallbackAction],
      explanation: `${HEALTH_LIMITATION_NOTICE} Resultado generado mediante reglas locales deterministas sobre texto declarado por el ciudadano.`,
      generatedAt: new Date().toISOString(),
      provider: "local-rules",
    };
  }
}

export const localHealthGuidanceProvider = new LocalHealthGuidanceProvider();
