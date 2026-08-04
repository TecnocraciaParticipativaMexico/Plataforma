import { preguntasEticasGlobales } from "./eticas";
import { preguntasTecnicasPorModulo } from "./bancos";
import type { PreguntaBanco } from "./types";

export type BankValidationReport = {
  ethics: number;
  technical: number;
  total: number;
  repeatedWording: { pregunta: string; modules: number[] }[];
};

const PLACEHOLDER =
  /(?:\blorem\b|\btodo\b|por definir|pregunta pendiente|placeholder)/i;

export function validateQuestionBanks(): BankValidationReport {
  const errors: string[] = [];
  const ids = new Set<string>();
  const wording = new Map<string, Set<number>>();

  const validateQuestion = (
    question: PreguntaBanco,
    expectedType: "etica" | "tecnica",
    expectedModule?: number,
  ) => {
    if (ids.has(question.id)) errors.push(`ID duplicado: ${question.id}`);
    ids.add(question.id);
    if (question.tipo !== expectedType) {
      errors.push(`Tipo inválido: ${question.id}`);
    }
    if (expectedModule !== undefined && question.modulo !== expectedModule) {
      errors.push(`Módulo inválido: ${question.id}`);
    }
    if (!question.pregunta.trim() || PLACEHOLDER.test(question.pregunta)) {
      errors.push(`Pregunta vacía o placeholder: ${question.id}`);
    }
    if (question.opciones.length !== 4) {
      errors.push(`No tiene cuatro opciones: ${question.id}`);
    }
    if (new Set(question.opciones.map((option) => option.trim())).size !== 4) {
      errors.push(`Opciones duplicadas: ${question.id}`);
    }
    if (question.opciones.some((option) => !option.trim())) {
      errors.push(`Opción vacía: ${question.id}`);
    }
    if (
      !Number.isInteger(question.respuestaCorrecta) ||
      question.respuestaCorrecta < 0 ||
      question.respuestaCorrecta >= question.opciones.length
    ) {
      errors.push(`Respuesta correcta inválida: ${question.id}`);
    }
  };

  if (preguntasEticasGlobales.length !== 30) {
    errors.push(`Se esperaban 30 éticas; hay ${preguntasEticasGlobales.length}`);
  }
  preguntasEticasGlobales.forEach((question) =>
    validateQuestion(question, "etica"),
  );

  for (let moduleId = 1; moduleId <= 30; moduleId += 1) {
    const questions = preguntasTecnicasPorModulo[moduleId];
    if (!questions) {
      errors.push(`Falta el módulo ${moduleId}`);
      continue;
    }
    if (questions.length !== 30) {
      errors.push(`Módulo ${moduleId}: ${questions.length}/30 preguntas`);
    }
    const localTexts = new Set<string>();
    for (const question of questions) {
      validateQuestion(question, "tecnica", moduleId);
      const normalized = question.pregunta.trim();
      if (localTexts.has(normalized)) {
        errors.push(`Duplicado dentro del módulo ${moduleId}: ${normalized}`);
      }
      localTexts.add(normalized);
      const modules = wording.get(normalized) ?? new Set<number>();
      modules.add(moduleId);
      wording.set(normalized, modules);
    }
  }

  const technical = Object.values(preguntasTecnicasPorModulo).reduce(
    (sum, questions) => sum + questions.length,
    0,
  );
  if (technical !== 900) errors.push(`Se esperaban 900 técnicas; hay ${technical}`);
  if (ids.size !== 930) errors.push(`Se esperaban 930 IDs únicos; hay ${ids.size}`);
  if (errors.length) {
    throw new Error(`Banco de exámenes inválido:\n- ${errors.join("\n- ")}`);
  }

  return {
    ethics: preguntasEticasGlobales.length,
    technical,
    total: preguntasEticasGlobales.length + technical,
    repeatedWording: [...wording.entries()]
      .filter(([, modules]) => modules.size > 1)
      .map(([pregunta, modules]) => ({
        pregunta,
        modules: [...modules],
      })),
  };
}
