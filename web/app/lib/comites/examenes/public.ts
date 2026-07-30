import type { PreguntaBanco, PreguntaPublica } from "./types";

export function toPublicQuestion(
  question: PreguntaBanco,
  order: number[],
): PreguntaPublica {
  if (
    order.length !== 4 ||
    new Set(order).size !== 4 ||
    order.some((index) => !Number.isInteger(index) || index < 0 || index > 3)
  ) {
    throw new Error("INVALID_STORED_ATTEMPT");
  }
  return {
    id: question.id,
    pregunta: question.pregunta,
    tipo: question.tipo,
    opciones: order.map((originalIndex) => question.opciones[originalIndex]),
  };
}

export function parseModuleParam(value: string | null): number | null {
  if (value === null || !/^(?:0?[1-9]|[12]\d|30)$/.test(value)) return null;
  return Number(value);
}
