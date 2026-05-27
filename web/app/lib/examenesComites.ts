export type PreguntaExamen = {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  tipo: "etica" | "tecnica";
};

type PreguntaBanco = Omit<PreguntaExamen, "id">;

export const preguntasEticasGlobales: PreguntaBanco[] = [
  {
    tipo: "etica",
    pregunta: "¿Qué debe hacer una persona integrante de comité si detecta un conflicto de interés propio?",
    opciones: [
      "Declararlo y abstenerse de evaluar o votar ese caso",
      "Ocultarlo si considera que puede ser imparcial",
      "Votar primero y declararlo después",
      "Pedir a otra persona que vote igual",
    ],
    respuestaCorrecta: 0,
  },
  {
    tipo: "etica",
    pregunta: "¿Cuál es el trato correcto para evidencia con datos personales sensibles?",
    opciones: [
      "Publicarla completa para presionar a autoridades",
      "Proteger identidad, minimizar exposición y revisar con trazabilidad",
      "Compartirla en redes si parece urgente",
      "Eliminarla sin dejar registro",
    ],
    respuestaCorrecta: 1,
  },
  {
    tipo: "etica",
    pregunta: "¿Qué principio debe guiar una revisión ciudadana colegiada?",
    opciones: [
      "Popularidad de la denuncia",
      "Afinidad partidista",
      "Evidencia, imparcialidad y trazabilidad",
      "Rapidez aunque falten datos",
    ],
    respuestaCorrecta: 2,
  },
  {
    tipo: "etica",
    pregunta: "¿Qué debe pasar con una opinión técnica minoritaria bien fundamentada?",
    opciones: [
      "Registrarse como disenso trazable",
      "Eliminarse para mostrar unanimidad",
      "Convertirse automáticamente en decisión final",
      "Ocultarse hasta que haya presión pública",
    ],
    respuestaCorrecta: 0,
  },
  {
    tipo: "etica",
    pregunta: "¿Qué señal amerita revisión ética avanzada de una candidatura?",
    opciones: [
      "Experiencia técnica demostrable",
      "Conflictos de interés, cargo público o exposición política relevante",
      "Vivir fuera de la capital del estado",
      "Usar lenguaje técnico en su solicitud",
    ],
    respuestaCorrecta: 1,
  },
  {
    tipo: "etica",
    pregunta: "¿Qué debe evitar un comité ciudadano al revisar propuestas públicas?",
    opciones: [
      "Pedir evidencia adicional",
      "Registrar razones de decisión",
      "Usar la revisión para castigos o favores personales",
      "Declarar límites de su competencia",
    ],
    respuestaCorrecta: 2,
  },
  {
    tipo: "etica",
    pregunta: "¿Cómo debe tratarse una acusación grave sin evidencia suficiente?",
    opciones: [
      "Como verdad final",
      "Como información no verificada que requiere corroboración",
      "Como motivo para sanción inmediata",
      "Como contenido que debe borrarse sin registro",
    ],
    respuestaCorrecta: 1,
  },
  {
    tipo: "etica",
    pregunta: "¿Qué práctica fortalece la confianza institucional del comité?",
    opciones: [
      "Decisiones opacas",
      "Rotación de criterios según conveniencia",
      "Trazabilidad, justificación pública y registro de votos",
      "Evaluaciones anónimas sin fundamento",
    ],
    respuestaCorrecta: 2,
  },
];

type PreguntaTecnicaModulo01Fuente = {
  pregunta: string;
  opciones: string[];
  correcta: number;
};

type PreguntaTecnicaFuente = {
  pregunta: string;
  respuestaCorrecta: string;
  distractores: string[];
};

function adaptarBancoTecnicoModulo01(preguntas: PreguntaTecnicaModulo01Fuente[]): PreguntaBanco[] {
  return preguntas.map((pregunta) => ({
    tipo: "tecnica",
    pregunta: pregunta.pregunta,
    opciones: pregunta.opciones,
    respuestaCorrecta: pregunta.correcta,
  }));
}

function adaptarBancoTecnico(preguntas: PreguntaTecnicaFuente[]): PreguntaBanco[] {
  return preguntas.map((pregunta) => ({
    tipo: "tecnica",
    pregunta: pregunta.pregunta,
    opciones: [pregunta.respuestaCorrecta, ...pregunta.distractores],
    respuestaCorrecta: 0,
  }));
}

const preguntasTecnicasModulo01 = adaptarBancoTecnicoModulo01([
  {
    pregunta: "En una denuncia anónima sobre colusión entre policía municipal y crimen organizado, ¿cuál es el primer criterio técnico para decidir si puede integrarse a un expediente acumulativo sin exponer al denunciante?",
    opciones: [
      "Identificar civilmente al denunciante para confirmar su credibilidad antes de procesar el contenido.",
      "Separar identidad, contenido, metadatos y ubicación; preservar trazabilidad del hecho sin revelar a la persona.",
      "Publicar la denuncia completa para generar presión social inmediata.",
      "Enviar la denuncia directamente a la autoridad local señalada para solicitar aclaración.",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué combinación permite convertir denuncias ciudadanas aisladas en evidencia útil para detectar patrones criminales territoriales?",
    opciones: [
      "Volumen de denuncias, hashtags públicos y validación por mayoría simple.",
      "Georreferenciación agregada, consistencia temporal, corroboración cruzada y cadena de custodia digital.",
      "Identificación plena de denunciantes, publicación nominal y denuncia mediática.",
      "Votación ciudadana abierta, reacción en redes y presión política local.",
    ],
    correcta: 1,
  },
  {
    pregunta: "En el modelo de Seguridad Ciudadana, ¿por qué la IA no debe clasificar automáticamente a una persona como integrante de una red criminal?",
    opciones: [
      "Porque la IA solo puede trabajar con texto, no con datos geoespaciales.",
      "Porque la atribución de responsabilidad penal exige autoridad competente, debido proceso y valoración humana.",
      "Porque los modelos de IA no pueden detectar relaciones de redes.",
      "Porque la plataforma debe evitar cualquier uso de datos públicos.",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el uso correcto del análisis de grafos en este módulo?",
    opciones: [
      "Determinar culpabilidad individual a partir de conexiones indirectas.",
      "Identificar estructuras, intermediarios, recurrencias y nodos de riesgo para revisión técnica humana.",
      "Sustituir carpetas de investigación formales.",
      "Publicar mapas nominales de servidores públicos y familiares.",
    ],
    correcta: 1,
  },
  {
    pregunta: "Una serie de denuncias anónimas reporta cobro de piso en mercados municipales. ¿Qué variable incrementa más su valor probatorio?",
    opciones: [
      "Que todas usen el mismo lenguaje narrativo.",
      "Que provengan de una sola fuente con alto detalle emocional.",
      "Que coincidan en ubicación, temporalidad, modus operandi y actores institucionales por rol.",
      "Que sean publicadas simultáneamente en redes sociales.",
    ],
    correcta: 2,
  },
]);

const preguntasTecnicasModulo02 = adaptarBancoTecnico([
  {
    pregunta: "En una carpeta técnica ciudadana, ¿cuál es la función principal de la clasificación jurídica preliminar no vinculante?",
    respuestaCorrecta: "Orientar técnicamente la lectura de los hechos sin sustituir al Ministerio Público ni imputar responsabilidad penal.",
    distractores: [
      "Determinar formalmente el tipo penal aplicable y vincular jurídicamente a la autoridad competente.",
      "Sustituir la teoría del caso de la fiscalía cuando exista omisión institucional.",
      "Permitir que el comité ciudadano emita una acusación pública fundada.",
    ],
  },
  {
    pregunta: "¿Qué elemento distingue una carpeta forense ciudadana jurídicamente utilizable de una simple recopilación de denuncias?",
    respuestaCorrecta: "Narrativa fáctica cronológica, evidencia vinculada a hechos, metadatos, control de integridad y metodología explícita.",
    distractores: [
      "Cantidad elevada de testimonios, presión mediática y respaldo ciudadano mayoritario.",
      "Publicación inmediata de los nombres de presuntos responsables y víctimas.",
      "Opinión técnica del comité sin necesidad de anexos probatorios.",
    ],
  },
  {
    pregunta: "¿Por qué la IA del módulo no debe reinterpretar libremente testimonios orales?",
    respuestaCorrecta: "Porque debe preservar sentido original, contexto lingüístico y fidelidad semántica para no contaminar la evidencia.",
    distractores: [
      "Porque los testimonios orales carecen de valor técnico en expedientes forenses.",
      "Porque toda declaración debe convertirse primero en lenguaje jurídico formal.",
      "Porque la IA solo puede procesar documentos oficiales escritos.",
    ],
  },
  {
    pregunta: "¿Cuál es el propósito técnico del hashing criptográfico en una carpeta ciudadana?",
    respuestaCorrecta: "Demostrar que un archivo o evidencia no fue alterado desde su incorporación o versión registrada.",
    distractores: [
      "Ocultar permanentemente el contenido de la evidencia a cualquier auditor externo.",
      "Validar automáticamente la veracidad material de los hechos denunciados.",
      "Sustituir la cadena de custodia documental mediante cifrado irreversible.",
    ],
  },
  {
    pregunta: "En una investigación ciudadana sobre corrupción sistémica, ¿qué debe documentarse antes de formular cualquier análisis de patrón?",
    respuestaCorrecta: "Hechos verificables, fuentes, temporalidad, actores por rol institucional y evidencia específica asociada.",
    distractores: [
      "Conclusiones jurídicas preliminares, hipótesis política y responsables probables.",
      "Relatos agregados sin depuración para no perder espontaneidad testimonial.",
      "Percepción ciudadana, impacto mediático y narrativa pública dominante.",
    ],
  },
]);

const preguntasTecnicasModulo03 = adaptarBancoTecnico([
  {
    pregunta: "¿Cuál es el principal riesgo democrático de la sobre-representación legislativa sostenida?",
    respuestaCorrecta: "La distorsión estructural entre voluntad electoral efectiva y capacidad real de producción normativa.",
    distractores: [
      "La disminución automática de competitividad económica regional.",
      "La imposibilidad técnica de formar coaliciones parlamentarias.",
      "La anulación constitucional inmediata de todas las reformas aprobadas.",
    ],
  },
  {
    pregunta: "¿Qué diferencia metodológica distingue al Congreso Cívico del Congreso formal?",
    respuestaCorrecta: "La trazabilidad pública integral del proceso deliberativo y la ponderación basada en representación proporcional real.",
    distractores: [
      "La capacidad de emitir normas vinculantes mediante voto digital.",
      "La sustitución del sistema electoral representativo por democracia directa.",
      "La eliminación de análisis constitucional en procesos legislativos.",
    ],
  },
  {
    pregunta: "¿Qué elemento fortalece técnicamente la legitimidad de un dictamen legislativo ciudadano?",
    respuestaCorrecta: "Metodología explícita, análisis comparativo, fundamentación constitucional y trazabilidad documental completa.",
    distractores: [
      "Cantidad de votos emocionales obtenidos durante deliberación pública.",
      "Apoyo mediático de actores políticos nacionales.",
      "Ratificación informal por legisladores partidistas.",
    ],
  },
  {
    pregunta: "¿Cuál es el límite jurídico central del Congreso Cívico?",
    respuestaCorrecta: "No puede sustituir formalmente al Poder Legislativo ni producir coerción normativa directa.",
    distractores: [
      "No puede analizar reformas constitucionales federales.",
      "No puede incorporar participación ciudadana internacional.",
      "No puede emitir opiniones técnicas sobre presupuestos.",
    ],
  },
  {
    pregunta: "¿Qué convierte un análisis legislativo ciudadano en evidencia democrática verificable?",
    respuestaCorrecta: "La documentación transparente de discrepancias entre legalidad formal, representación efectiva y estándares constitucionales.",
    distractores: [
      "La acumulación de firmas digitales sin validación metodológica.",
      "La oposición pública sistemática a toda reforma gubernamental.",
      "La transmisión abierta de debates sin estructuración técnica.",
    ],
  },
]);

const preguntasTecnicasModulo04 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo05 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo06 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo07 = preguntasTecnicasModulo03;
const preguntasTecnicasModulo08 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo09 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo10 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo11 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo12 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo13 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo14 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo15 = preguntasTecnicasModulo02;

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
};

function mezclar<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function tomarAleatorias(items: PreguntaBanco[], total: number) {
  return mezclar(items).slice(0, total);
}

export function obtenerExamenModulo(moduleId: number) {
  const tecnicas = preguntasTecnicasPorModulo[moduleId] || preguntasTecnicasPorModulo[1];
  const seleccionadas = [
    ...tomarAleatorias(preguntasEticasGlobales, 5),
    ...tomarAleatorias(tecnicas, 5),
  ];

  return mezclar(seleccionadas).map((pregunta, index) => ({
    ...pregunta,
    id: index + 1,
  }));
}
