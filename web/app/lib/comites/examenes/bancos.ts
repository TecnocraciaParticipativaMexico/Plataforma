import { preguntasEticasGlobales } from "./eticas";
import { preguntasTecnicasModulo01 } from "./tecnicas/modulo01";
import { preguntasTecnicasModulo02 } from "./tecnicas/modulo02";
import { preguntasTecnicasModulo03 } from "./tecnicas/modulo03";
import { preguntasTecnicasModulo04 } from "./tecnicas/modulo04";
import { preguntasTecnicasModulo05 } from "./tecnicas/modulo05";
import { preguntasTecnicasModulo06 } from "./tecnicas/modulo06";
import { preguntasTecnicasModulo07 } from "./tecnicas/modulo07";
import { preguntasTecnicasModulo08 } from "./tecnicas/modulo08";
import { preguntasTecnicasModulo09 } from "./tecnicas/modulo09";
import { preguntasTecnicasModulo10 } from "./tecnicas/modulo10";
import { preguntasTecnicasModulo11 } from "./tecnicas/modulo11";
import { preguntasTecnicasModulo12 } from "./tecnicas/modulo12";
import { preguntasTecnicasModulo13 } from "./tecnicas/modulo13";
import { preguntasTecnicasModulo14 } from "./tecnicas/modulo14";
import { preguntasTecnicasModulo15 } from "./tecnicas/modulo15";
import { preguntasTecnicasModulo16 } from "./tecnicas/modulo16";
import { preguntasTecnicasModulo17 } from "./tecnicas/modulo17";
import { preguntasTecnicasModulo18 } from "./tecnicas/modulo18";
import { preguntasTecnicasModulo19 } from "./tecnicas/modulo19";
import { preguntasTecnicasModulo20 } from "./tecnicas/modulo20";
import { preguntasTecnicasModulo21 } from "./tecnicas/modulo21";
import { preguntasTecnicasModulo22 } from "./tecnicas/modulo22";
import { preguntasTecnicasModulo23 } from "./tecnicas/modulo23";
import { preguntasTecnicasModulo24 } from "./tecnicas/modulo24";
import { preguntasTecnicasModulo25 } from "./tecnicas/modulo25";
import { preguntasTecnicasModulo26 } from "./tecnicas/modulo26";
import { preguntasTecnicasModulo27 } from "./tecnicas/modulo27";
import { preguntasTecnicasModulo28 } from "./tecnicas/modulo28";
import { preguntasTecnicasModulo29 } from "./tecnicas/modulo29";
import { preguntasTecnicasModulo30 } from "./tecnicas/modulo30";
import type { PreguntaBanco } from "./types";

export { preguntasEticasGlobales };

export const preguntasTecnicasPorModulo: Record<number, PreguntaBanco[]> = {
  1: preguntasTecnicasModulo01,
  2: preguntasTecnicasModulo02,
  3: preguntasTecnicasModulo03,
  4: preguntasTecnicasModulo04,
  5: preguntasTecnicasModulo05,
  6: preguntasTecnicasModulo06,
  7: preguntasTecnicasModulo07,
  8: preguntasTecnicasModulo08,
  9: preguntasTecnicasModulo09,
  10: preguntasTecnicasModulo10,
  11: preguntasTecnicasModulo11,
  12: preguntasTecnicasModulo12,
  13: preguntasTecnicasModulo13,
  14: preguntasTecnicasModulo14,
  15: preguntasTecnicasModulo15,
  16: preguntasTecnicasModulo16,
  17: preguntasTecnicasModulo17,
  18: preguntasTecnicasModulo18,
  19: preguntasTecnicasModulo19,
  20: preguntasTecnicasModulo20,
  21: preguntasTecnicasModulo21,
  22: preguntasTecnicasModulo22,
  23: preguntasTecnicasModulo23,
  24: preguntasTecnicasModulo24,
  25: preguntasTecnicasModulo25,
  26: preguntasTecnicasModulo26,
  27: preguntasTecnicasModulo27,
  28: preguntasTecnicasModulo28,
  29: preguntasTecnicasModulo29,
  30: preguntasTecnicasModulo30,
};

export const obtenerBancoTecnico = (moduleId: number) => {
  const banco = preguntasTecnicasPorModulo[moduleId];
  if (!banco) throw new Error("Módulo de examen inválido");
  return banco;
};

export const obtenerPreguntaPorId = (id: string) => {
  if (id.startsWith("etica-")) {
    return preguntasEticasGlobales.find((pregunta) => pregunta.id === id);
  }
  const match = /^mod(\d{2})-/.exec(id);
  if (!match) return undefined;
  return preguntasTecnicasPorModulo[Number(match[1])]?.find(
    (pregunta) => pregunta.id === id,
  );
};
