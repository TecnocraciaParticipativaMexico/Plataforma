import { obtenerPreguntaPorId } from "../bancos";
import { EXAM_PASSING_SCORE } from "../constants";

export type StoredQuestion = {
  id: string;
  tipo: "etica" | "tecnica";
};

export type OptionOrder = Record<string, number[]>;
export type ExamResponses = Record<string, number>;

export function gradeAttempt(
  selection: StoredQuestion[],
  optionOrder: OptionOrder,
  responses: ExamResponses,
) {
  if (
    selection.length !== 10 ||
    Object.keys(responses).length !== selection.length
  ) {
    throw new Error("INCOMPLETE_RESPONSES");
  }

  let score = 0;
  let ethicsScore = 0;
  let technicalScore = 0;

  for (const selected of selection) {
    const question = obtenerPreguntaPorId(selected.id);
    const order = optionOrder[selected.id];
    const response = responses[selected.id];
    if (
      !question ||
      !order ||
      order.length !== 4 ||
      !Number.isInteger(response) ||
      response < 0 ||
      response >= order.length
    ) {
      throw new Error("INVALID_RESPONSE");
    }
    const correctDisplayedIndex = order.indexOf(question.respuestaCorrecta);
    if (response === correctDisplayedIndex) {
      score += 1;
      if (selected.tipo === "etica") ethicsScore += 1;
      else technicalScore += 1;
    }
  }

  return {
    score,
    ethicsScore,
    technicalScore,
    approved: score >= EXAM_PASSING_SCORE,
  };
}
