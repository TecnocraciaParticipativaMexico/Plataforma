export type PreguntaExamen = {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
};

export const examenesComites: Record<number, PreguntaExamen[]> = {
  1: [
    {
      id: 1,
      pregunta: "¿Cuál es una función válida de un comité ciudadano experto?",
      opciones: [
        "Sustituir a la autoridad",
        "Revisar evidencia y emitir observaciones técnicas",
        "Sancionar directamente a personas",
        "Eliminar denuncias sin revisión",
      ],
      respuestaCorrecta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué debe priorizar una revisión de seguridad ciudadana?",
      opciones: [
        "Rumores virales",
        "Evidencia verificable y riesgo para la población",
        "Preferencias partidistas",
        "Castigo inmediato sin pruebas",
      ],
      respuestaCorrecta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué significa riesgo alto en una denuncia ciudadana?",
      opciones: [
        "Un problema menor",
        "Una situación que puede implicar daño grave o urgente",
        "Una queja estética",
        "Un comentario sin ubicación",
      ],
      respuestaCorrecta: 1,
    },
    {
      id: 4,
      pregunta: "¿Qué principio debe respetar un comité?",
      opciones: [
        "Anonimato cuando sea necesario",
        "Exposición obligatoria de víctimas",
        "Uso político de denuncias",
        "Eliminación de evidencia incómoda",
      ],
      respuestaCorrecta: 0,
    },
    {
      id: 5,
      pregunta: "¿Qué acción ayuda a prevenir corrupción?",
      opciones: [
        "Ocultar decisiones",
        "Registrar trazabilidad y conflictos de interés",
        "Concentrar decisiones en una persona",
        "Evitar auditorías",
      ],
      respuestaCorrecta: 1,
    },
    {
      id: 6,
      pregunta: "¿Qué debe hacer el comité ante una denuncia delicada?",
      opciones: [
        "Publicar datos personales",
        "Revisar evidencia con cautela y proteger identidad",
        "Ignorar la denuncia",
        "Compartirla en redes sin validar",
      ],
      respuestaCorrecta: 1,
    },
    {
      id: 7,
      pregunta: "¿Qué es un conflicto de interés?",
      opciones: [
        "Un desacuerdo normal",
        "Una relación que puede afectar imparcialidad",
        "Una opinión técnica",
        "Una denuncia sin pruebas",
      ],
      respuestaCorrecta: 1,
    },
    {
      id: 8,
      pregunta: "¿Cuál es una señal de manipulación política?",
      opciones: [
        "Evidencia clara",
        "Muchas denuncias coordinadas sin sustento",
        "Datos verificables",
        "Testigos independientes",
      ],
      respuestaCorrecta: 1,
    },
    {
      id: 9,
      pregunta: "¿Qué debe hacer un comité con información no verificada?",
      opciones: [
        "Marcarla como no verificada",
        "Presentarla como verdad final",
        "Eliminarla automáticamente",
        "Usarla para acusar públicamente",
      ],
      respuestaCorrecta: 0,
    },
    {
      id: 10,
      pregunta: "¿Cuál es el objetivo central del comité?",
      opciones: [
        "Popularidad",
        "Competencia técnica, ética y trazabilidad",
        "Control partidista",
        "Castigo inmediato",
      ],
      respuestaCorrecta: 1,
    },
  ],
};

export function obtenerExamenModulo(moduleId: number) {
  return examenesComites[moduleId] || examenesComites[1];
}
