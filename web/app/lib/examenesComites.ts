import { modulosTecnocracia } from "./modulosTecnocracia";

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

function tecnicaModulo(moduleName: string): PreguntaBanco[] {
  return [
    {
      tipo: "tecnica",
      pregunta: `Para el módulo ${moduleName}, ¿qué debe revisar primero un dictamen técnico?`,
      opciones: [
        "La evidencia disponible, el problema público y la competencia del comité",
        "La popularidad de quien presenta la propuesta",
        "La presión en redes sociales",
        "La preferencia partidista de los integrantes",
      ],
      respuestaCorrecta: 0,
    },
    {
      tipo: "tecnica",
      pregunta: `En ${moduleName}, ¿cuál es una razón válida para pedir más información antes de votar?`,
      opciones: [
        "Faltan datos verificables para estimar impacto, viabilidad o riesgo",
        "La propuesta no menciona a un partido político",
        "El texto es demasiado breve para publicarse en redes",
        "El comité quiere retrasar toda decisión",
      ],
      respuestaCorrecta: 0,
    },
    {
      tipo: "tecnica",
      pregunta: `¿Qué indicador mejora la calidad de una propuesta en ${moduleName}?`,
      opciones: [
        "Objetivo medible, evidencia, población afectada y ruta de implementación",
        "Promesas generales sin responsables",
        "Lenguaje alarmista sin fuente",
        "Eliminar observaciones críticas",
      ],
      respuestaCorrecta: 0,
    },
    {
      tipo: "tecnica",
      pregunta: `¿Qué debe contener un voto técnico responsable sobre ${moduleName}?`,
      opciones: [
        "Una postura, razonamiento, evidencia considerada y posibles límites",
        "Solo la conclusión final",
        "Una opinión personal sin justificación",
        "Una instrucción de castigo directo",
      ],
      respuestaCorrecta: 0,
    },
    {
      tipo: "tecnica",
      pregunta: `Si una propuesta de ${moduleName} tiene beneficios pero alto riesgo de abuso, ¿qué respuesta es más adecuada?`,
      opciones: [
        "Aprobar sin condiciones",
        "Rechazar cualquier discusión",
        "Pedir salvaguardas, trazabilidad y revisión de riesgos antes de aprobar",
        "Ocultar el riesgo para no frenar la propuesta",
      ],
      respuestaCorrecta: 2,
    },
  ];
}

export const preguntasTecnicasPorModulo: Record<number, PreguntaBanco[]> = Object.fromEntries(
  modulosTecnocracia.map((modulo) => [modulo.id, tecnicaModulo(modulo.nombre)])
);

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
