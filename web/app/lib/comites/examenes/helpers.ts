import type {
  PreguntaBanco,
  PreguntaTecnicaFuente,
  PreguntaTecnicaModulo01Fuente,
} from "./types";

const idTecnico = (moduleId: number, index: number) =>
  `mod${String(moduleId).padStart(2, "0")}-${String(index + 1).padStart(3, "0")}`;

export function adaptarBancoTecnicoModulo01(
  moduleId: number,
  preguntas: PreguntaTecnicaModulo01Fuente[],
): PreguntaBanco[] {
  return preguntas.map((pregunta, index) => ({
    id: idTecnico(moduleId, index),
    modulo: moduleId,
    tipo: "tecnica",
    pregunta: pregunta.pregunta,
    opciones: pregunta.opciones,
    respuestaCorrecta: pregunta.correcta,
  }));
}

export function adaptarBancoTecnico(
  moduleId: number,
  preguntas: PreguntaTecnicaFuente[],
): PreguntaBanco[] {
  return preguntas.map((pregunta, index) => ({
    id: idTecnico(moduleId, index),
    modulo: moduleId,
    tipo: "tecnica",
    pregunta: pregunta.pregunta,
    opciones: [pregunta.respuestaCorrecta, ...pregunta.distractores],
    respuestaCorrecta: 0,
  }));
}

export const q = (
  pregunta: string,
  respuestaCorrecta: string,
  distractores: string[],
): PreguntaTecnicaFuente => ({ pregunta, respuestaCorrecta, distractores });
