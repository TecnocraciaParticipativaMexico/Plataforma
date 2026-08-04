export type TipoPregunta = "etica" | "tecnica";

export type PreguntaBancoSinId = {
  tipo: TipoPregunta;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
};

export type PreguntaBanco = PreguntaBancoSinId & {
  id: string;
  modulo?: number;
};

export type PreguntaTecnicaModulo01Fuente = {
  id?: string;
  modulo?: number;
  pregunta: string;
  opciones: string[];
  correcta: number;
};

export type PreguntaTecnicaFuente = {
  id?: string;
  modulo?: number;
  pregunta: string;
  respuestaCorrecta: string;
  distractores: string[];
};

export type PreguntaPublica = {
  id: string;
  pregunta: string;
  opciones: string[];
  tipo: TipoPregunta;
};
