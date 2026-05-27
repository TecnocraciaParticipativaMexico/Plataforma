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

type PreguntaTecnicaFuente = {
  pregunta: string;
  respuestaCorrecta: string;
  distractores: string[];
};

function adaptarBancoTecnico(preguntas: PreguntaTecnicaFuente[]): PreguntaBanco[] {
  return preguntas.map((pregunta) => ({
    tipo: "tecnica",
    pregunta: pregunta.pregunta,
    opciones: [pregunta.respuestaCorrecta, ...pregunta.distractores],
    respuestaCorrecta: 0,
  }));
}

const preguntasTecnicasModulo2 = adaptarBancoTecnico([
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

const preguntasTecnicasModulo3 = adaptarBancoTecnico([
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

const preguntasTecnicasModulo4 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué distingue técnicamente una violación aislada de un patrón estructural de derechos humanos?",
    respuestaCorrecta: "La recurrencia verificable de conductas, tolerancia institucional, contexto sistemático y consistencia probatoria transversal.",
    distractores: [
      "La cobertura mediática nacional e internacional acumulada.",
      "La cantidad absoluta de víctimas registradas oficialmente.",
      "La participación de fuerzas federales en al menos un incidente.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal riesgo metodológico de documentar testimonios sin enfoque de no revictimización?",
    respuestaCorrecta: "Reproducir daño psicológico, contaminar evidencia y afectar validez ética y probatoria del expediente.",
    distractores: [
      "Reducir automáticamente el valor jurídico internacional del caso.",
      "Impedir la interoperabilidad técnica con sistemas de IA documental.",
      "Eliminar la posibilidad de trazabilidad criptográfica posterior.",
    ],
  },
  {
    pregunta: "¿Qué elemento fortalece más la admisibilidad internacional de un expediente ciudadano de derechos humanos?",
    respuestaCorrecta: "Cadena de trazabilidad verificable, contextualización jurídica y documentación consistente de patrones.",
    distractores: [
      "Publicación viral inmediata de los testimonios originales.",
      "Ratificación política de organizaciones partidistas.",
      "Número de observadores ciudadanos presentes durante entrevistas.",
    ],
  },
  {
    pregunta: "¿Qué función cumple el consentimiento informado dentro del módulo?",
    respuestaCorrecta: "Garantizar comprensión de riesgos, alcances, protección de datos y posibles usos del testimonio.",
    distractores: [
      "Transferir responsabilidad jurídica completa a la víctima participante.",
      "Permitir publicación automática de toda evidencia recibida.",
      "Sustituir obligaciones institucionales de confidencialidad.",
    ],
  },
  {
    pregunta: "¿Por qué el módulo evita imputaciones penales individuales directas?",
    respuestaCorrecta: "Porque su función es documentar estructuras, patrones y hechos sin sustituir procesos jurisdiccionales.",
    distractores: [
      "Porque los estándares internacionales prohíben identificar autoridades.",
      "Porque la evidencia testimonial carece de utilidad jurídica individual.",
      "Porque solo organismos internacionales pueden señalar responsables.",
    ],
  },
]);

const preguntasTecnicasModulo5 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué elemento convierte un hallazgo ciudadano en un indicio forense potencialmente utilizable?",
    respuestaCorrecta: "La preservación contextual, georreferenciación, trazabilidad documental y registro verificable del hallazgo.",
    distractores: [
      "La publicación inmediata del hallazgo en redes sociales.",
      "La presencia de múltiples testigos no documentados.",
      "La entrega informal del objeto a autoridades locales.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal riesgo de alterar una escena de hallazgo sin protocolo básico?",
    respuestaCorrecta: "Contaminar evidencia, romper trazabilidad y comprometer análisis posteriores de contexto forense.",
    distractores: [
      "Invalidar automáticamente cualquier testimonio relacionado.",
      "Eliminar valor jurídico internacional del expediente.",
      "Impedir clasificación geoespacial de la búsqueda.",
    ],
  },
  {
    pregunta: "¿Qué práctica fortalece más la protección de familias buscadoras?",
    respuestaCorrecta: "Separar datos sensibles, controlar metadatos y limitar exposición pública innecesaria.",
    distractores: [
      "Publicar todas las rutas de búsqueda en tiempo real.",
      "Centralizar información en plataformas abiertas sin cifrado.",
      "Difundir nombres completos de denunciantes comunitarios.",
    ],
  },
  {
    pregunta: "¿Qué hace metodológicamente sólido un mapa de zonas de interés forense?",
    respuestaCorrecta: "Cruzar testimonios, hallazgos, patrones territoriales, temporalidad y evidencia contextual verificable.",
    distractores: [
      "Priorizar rumores comunitarios de alta circulación.",
      "Basarse únicamente en percepción de riesgo regional.",
      "Usar exclusivamente imágenes satelitales sin validación local.",
    ],
  },
  {
    pregunta: "¿Por qué la documentación de omisiones estatales es relevante en desapariciones?",
    respuestaCorrecta: "Porque la inacción, dilación o negativa institucional forman parte del contexto probatorio del caso.",
    distractores: [
      "Porque sustituyen automáticamente la necesidad de búsqueda física.",
      "Porque invalidan cualquier cooperación posterior de autoridades.",
      "Porque convierten todo caso en crimen de lesa humanidad.",
    ],
  },
]);

const preguntasTecnicasModulo6 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué elemento distingue un dictamen técnico cívico de una sentencia judicial formal?",
    respuestaCorrecta: "El dictamen carece de coerción ejecutoria, aunque mantiene razonamiento jurídico estructurado y trazabilidad probatoria.",
    distractores: [
      "El dictamen no puede utilizar estándares constitucionales ni jurisprudenciales.",
      "La sentencia siempre requiere votación ciudadana previa.",
      "El dictamen solo puede emitirse en controversias privadas.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal riesgo metodológico de omitir la delimitación precisa del objeto controvertido?",
    respuestaCorrecta: "Expandir artificialmente el análisis y contaminar etapas posteriores de valoración jurídica y probatoria.",
    distractores: [
      "Reducir interoperabilidad con mecanismos internacionales.",
      "Invalidar automáticamente cualquier evidencia documental.",
      "Eliminar posibilidad de mediación voluntaria posterior.",
    ],
  },
  {
    pregunta: "¿Qué práctica fortalece más la imparcialidad técnica de un comité jurídico colegiado?",
    respuestaCorrecta: "Contraste deliberativo entre especialistas independientes con control explícito de conflictos de interés.",
    distractores: [
      "Rotación aleatoria diaria de todos los integrantes.",
      "Exclusión de perfiles con experiencia jurisdiccional previa.",
      "Sustitución de deliberación humana por consenso automatizado.",
    ],
  },
  {
    pregunta: "¿Qué función cumple la fase de fijación de hechos?",
    respuestaCorrecta: "Ordenar cronológicamente hechos relevantes vinculándolos explícitamente con evidencia verificable.",
    distractores: [
      "Definir automáticamente responsabilidad jurídica preliminar.",
      "Eliminar contradicciones testimoniales mediante síntesis narrativa.",
      "Priorizar argumentos constitucionales sobre evidencia documental.",
    ],
  },
  {
    pregunta: "¿Por qué el módulo evita conocer casos en trámite sin consentimiento?",
    respuestaCorrecta: "Para no interferir procesalmente ni comprometer independencia judicial o derechos de las partes.",
    distractores: [
      "Porque la documentación privada carece de utilidad técnica.",
      "Porque solo pueden analizarse casos concluidos judicialmente.",
      "Porque los sistemas de IA no pueden procesar expedientes abiertos.",
    ],
  },
]);

const preguntasTecnicasModulo7 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué distingue a un Tribunal de Alta Integridad de un tribunal jurisdiccional formal?",
    respuestaCorrecta: "Produce análisis técnicos colegiados y no coercitivos sin facultad de ejecutar ni revocar resoluciones.",
    distractores: [
      "Opera exclusivamente con estándares internacionales y no nacionales.",
      "Sustituye funciones de control constitucional tradicional.",
      "Resuelve controversias privadas mediante arbitraje obligatorio.",
    ],
  },
  {
    pregunta: "¿Qué riesgo institucional surge cuando no existe escrutinio técnico externo sobre resoluciones estructurales?",
    respuestaCorrecta: "Normalización de inconsistencias argumentativas y debilitamiento progresivo de legitimidad institucional.",
    distractores: [
      "Desaparición automática del principio de división de poderes.",
      "Imposibilidad de aplicar precedentes internacionales.",
      "Reducción de participación ciudadana en procesos electorales.",
    ],
  },
  {
    pregunta: "¿Qué elemento fortalece más la integridad metodológica de un dictamen colegiado?",
    respuestaCorrecta: "Documentar razonamientos individuales, votos concurrentes y criterios de contraste utilizados.",
    distractores: [
      "Mantener confidencialidad absoluta de deliberaciones técnicas.",
      "Reducir número de integrantes para agilizar consensos.",
      "Excluir posiciones disidentes para preservar coherencia.",
    ],
  },
  {
    pregunta: "¿Por qué la rotación obligatoria por asunto reduce riesgos de captura?",
    respuestaCorrecta: "Porque impide consolidación de bloques estables y relaciones permanentes de influencia.",
    distractores: [
      "Porque elimina necesidad de declaraciones de conflicto de interés.",
      "Porque sustituye controles metodológicos colegiados.",
      "Porque garantiza unanimidad técnica en todos los casos.",
    ],
  },
  {
    pregunta: "¿Qué característica vuelve técnicamente sólido un análisis de proporcionalidad constitucional?",
    respuestaCorrecta: "Examinar idoneidad, necesidad y balance entre restricción de derechos y finalidad perseguida.",
    distractores: [
      "Priorizar estabilidad política sobre libertades fundamentales.",
      "Aplicar automáticamente precedentes internacionales similares.",
      "Reducir análisis a interpretación literal normativa.",
    ],
  },
]);

const preguntasTecnicasModulo8 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué característica convierte un análisis presupuestal ciudadano en una auditoría técnica utilizable?",
    respuestaCorrecta: "Trazabilidad documental, comparación metodológica y vinculación explícita entre gasto, objetivos y riesgos.",
    distractores: [
      "Aprobación mayoritaria de la ciudadanía afectada.",
      "Cobertura mediática permanente del proyecto.",
      "Publicación inmediata de contratos sin análisis contextual.",
    ],
  },
  {
    pregunta: "¿Qué indicador sugiere mayor riesgo de sobrecosto estructural en obra pública?",
    respuestaCorrecta: "Modificaciones recurrentes de alcance acompañadas de adjudicaciones concentradas y ampliaciones presupuestales sucesivas.",
    distractores: [
      "Existencia de múltiples subcontratistas locales.",
      "Duración extensa de ejecución física.",
      "Incremento generalizado de inflación anual.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite jurídico del módulo?",
    respuestaCorrecta: "No puede sustituir autoridades ejecutivas ni imponer coerción administrativa o presupuestal.",
    distractores: [
      "No puede analizar programas sociales federales.",
      "No puede emitir alertas de riesgo financiero.",
      "No puede utilizar evidencia ciudadana complementaria.",
    ],
  },
  {
    pregunta: "¿Qué vuelve técnicamente sólida una evaluación comparativa de infraestructura?",
    respuestaCorrecta: "Contrastar costos, impacto, demanda proyectada y desempeño histórico de proyectos equivalentes.",
    distractores: [
      "Priorizar proyectos con mayor respaldo político regional.",
      "Comparar únicamente montos presupuestales nominales.",
      "Excluir proyectos internacionales por diferencias regulatorias.",
    ],
  },
  {
    pregunta: "¿Qué riesgo existe cuando un municipio concentra contrataciones en pocos proveedores recurrentes?",
    respuestaCorrecta: "Aumentar probabilidad de colusión, captura contractual y reducción efectiva de competencia.",
    distractores: [
      "Reducir automáticamente eficiencia administrativa.",
      "Eliminar posibilidad de supervisión técnica externa.",
      "Impedir auditorías financieras tradicionales.",
    ],
  },
]);

const preguntasTecnicasModulo9 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué elemento convierte una coincidencia profesional en un posible conflicto de interés estructural?",
    respuestaCorrecta: "La correlación verificable entre decisiones públicas y beneficios recurrentes vinculados a relaciones previas o futuras.",
    distractores: [
      "La existencia de relaciones personales entre funcionarios.",
      "La participación de empresas privadas en procesos regulatorios.",
      "El cambio frecuente de empleo entre sectores.",
    ],
  },
  {
    pregunta: "¿Qué característica hace metodológicamente sólida una alerta temprana de puerta giratoria?",
    respuestaCorrecta: "La identificación longitudinal de trayectorias, decisiones regulatorias y beneficios correlacionados verificables.",
    distractores: [
      "La existencia de cobertura mediática internacional.",
      "La presencia de denuncias anónimas múltiples.",
      "La percepción pública negativa sobre funcionarios.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No puede sancionar ni imputar responsabilidades jurídicas individuales.",
    distractores: [
      "No puede analizar registros mercantiles públicos.",
      "No puede utilizar modelos de análisis de redes.",
      "No puede generar expedientes de memoria institucional.",
    ],
  },
  {
    pregunta: "¿Qué vuelve técnicamente relevante un patrón de captura regulatoria?",
    respuestaCorrecta: "La repetición consistente de decisiones favorables concentradas en actores con vínculos verificables.",
    distractores: [
      "La existencia de reuniones privadas entre funcionarios.",
      "El tamaño económico del sector regulado.",
      "La alternancia política en órganos administrativos.",
    ],
  },
  {
    pregunta: "¿Qué función cumple el análisis agregado y longitudinal?",
    respuestaCorrecta: "Distinguir recurrencias estructurales de coincidencias aisladas mediante comparación temporal y contextual.",
    distractores: [
      "Eliminar necesidad de validación metodológica.",
      "Sustituir auditorías administrativas tradicionales.",
      "Determinar automáticamente responsabilidad penal.",
    ],
  },
]);

const preguntasTecnicasModulo10 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué elemento convierte una Red Solidaria de Salud en un mecanismo técnicamente verificable y no asistencialista?",
    respuestaCorrecta: "La trazabilidad completa entre necesidad médica validada, origen del recurso, aplicación y resultado clínico documentado.",
    distractores: [
      "La participación exclusiva de hospitales privados certificados.",
      "La cobertura mediática de casos financiados.",
      "La existencia de donaciones internacionales recurrentes.",
    ],
  },
  {
    pregunta: "¿Qué riesgo ético existe cuando una plataforma de salud digital prioriza visibilidad mediática sobre urgencia clínica?",
    respuestaCorrecta: "Distorsionar asignación de recursos y comprometer principios de equidad y priorización médica objetiva.",
    distractores: [
      "Reducir interoperabilidad con sistemas hospitalarios.",
      "Eliminar validez jurídica de recetas digitales.",
      "Impedir auditoría financiera del crowdfunding.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye al sistema público de salud ni ejerce actos médicos reservados fuera de protocolos permitidos.",
    distractores: [
      "No puede utilizar telemedicina en primer contacto.",
      "No puede financiar medicamentos especializados.",
      "No puede generar evidencia internacionalizable.",
    ],
  },
  {
    pregunta: "¿Qué característica hace metodológicamente sólido un reporte de desabasto?",
    respuestaCorrecta: "Correlacionar evidencia documental, temporalidad, ubicación, medicamento específico y recurrencia verificable.",
    distractores: [
      "Acumular testimonios sin validación clínica.",
      "Publicar denuncias ciudadanas inmediatamente.",
      "Comparar únicamente inventarios oficiales.",
    ],
  },
  {
    pregunta: "¿Qué función cumple el consentimiento informado dentro de la Red Solidaria?",
    respuestaCorrecta: "Garantizar control del paciente sobre datos, apoyos y decisiones relacionadas con su atención.",
    distractores: [
      "Transferir responsabilidad médica completa al paciente.",
      "Autorizar difusión pública de expedientes clínicos.",
      "Sustituir validación ética de los comités.",
    ],
  },
]);

const preguntasTecnicasModulo11 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué característica convierte una evaluación educativa en una medición funcional real y no solo administrativa?",
    respuestaCorrecta: "Relacionar aprendizaje adquirido con capacidades aplicables verificables en contextos reales.",
    distractores: [
      "Incrementar cobertura escolar anual.",
      "Aumentar número de certificados emitidos.",
      "Expandir contenidos curriculares oficiales.",
    ],
  },
  {
    pregunta: "¿Qué riesgo estructural surge cuando un sistema educativo prioriza asistencia sobre competencias?",
    respuestaCorrecta: "Producir acreditación formal sin desarrollo efectivo de habilidades transferibles.",
    distractores: [
      "Reducir interoperabilidad entre niveles educativos.",
      "Eliminar necesidad de infraestructura digital.",
      "Impedir implementación de microcredenciales.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye autoridades educativas ni impone contenidos obligatorios fuera del marco legal.",
    distractores: [
      "No puede evaluar desempeño docente.",
      "No puede generar pilotos educativos comunitarios.",
      "No puede usar herramientas digitales de aprendizaje.",
    ],
  },
  {
    pregunta: "¿Qué hace metodológicamente sólido un diagnóstico de brecha educativa?",
    respuestaCorrecta: "Cruzar habilidades reales, infraestructura, contexto territorial y resultados funcionales verificables.",
    distractores: [
      "Comparar únicamente cobertura escolar oficial.",
      "Priorizar percepción pública de calidad educativa.",
      "Medir exclusivamente desempeño en exámenes estandarizados.",
    ],
  },
  {
    pregunta: "¿Qué función cumplen las microcredenciales dentro del módulo?",
    respuestaCorrecta: "Documentar competencias específicas verificables de manera flexible y acumulativa.",
    distractores: [
      "Sustituir completamente títulos profesionales.",
      "Eliminar necesidad de evaluación continua.",
      "Centralizar certificación educativa nacional.",
    ],
  },
]);

const preguntasTecnicasModulo12 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué característica convierte una alerta de deterioro urbano en un riesgo estructural técnicamente relevante?",
    respuestaCorrecta: "La convergencia verificable entre daño progresivo, patrones de uso y vulnerabilidad estructural documentada.",
    distractores: [
      "La frecuencia de reportes ciudadanos en redes sociales.",
      "La antigüedad visible de la infraestructura.",
      "La magnitud presupuestal de la obra original.",
    ],
  },
  {
    pregunta: "¿Qué riesgo sistémico evidencia el colapso recurrente de infraestructura pública crítica?",
    respuestaCorrecta: "Fallas acumulativas de supervisión, mantenimiento y control técnico preventivo.",
    distractores: [
      "Incremento inevitable de desgaste urbano.",
      "Insuficiencia exclusiva de inversión pública.",
      "Errores aislados de construcción sin patrón institucional.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye peritajes oficiales ni ejecuta directamente obra pública.",
    distractores: [
      "No puede analizar infraestructura ferroviaria.",
      "No puede emitir alertas preventivas.",
      "No puede documentar riesgos urbanos.",
    ],
  },
  {
    pregunta: "¿Qué hace metodológicamente sólido un análisis de riesgo estructural?",
    respuestaCorrecta: "Integrar cargas, materiales, historial de mantenimiento y condiciones ambientales verificables.",
    distractores: [
      "Comparar únicamente costos de construcción.",
      "Priorizar percepción ciudadana de inseguridad.",
      "Evaluar exclusivamente antigüedad de la estructura.",
    ],
  },
  {
    pregunta: "¿Qué función cumple el mantenimiento predictivo dentro del módulo?",
    respuestaCorrecta: "Priorizar intervenciones antes de fallas críticas mediante análisis de deterioro y uso acumulado.",
    distractores: [
      "Sustituir inspecciones físicas periódicas.",
      "Automatizar reparación estructural completa.",
      "Eliminar necesidad de supervisión humana.",
    ],
  },
]);

const preguntasTecnicasModulo13 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué característica convierte un problema de movilidad en una vulneración estructural del derecho a la ciudad?",
    respuestaCorrecta: "La limitación sistemática y desigual del acceso seguro y funcional a servicios y oportunidades urbanas.",
    distractores: [
      "La existencia de tráfico intenso en horarios pico.",
      "El aumento temporal de tarifas de transporte.",
      "La antigüedad del parque vehicular urbano.",
    ],
  },
  {
    pregunta: "¿Qué riesgo sistémico surge cuando la planeación urbana prioriza flujo vehicular sobre accesibilidad humana?",
    respuestaCorrecta: "Profundizar segregación territorial, inseguridad vial y dependencia estructural del automóvil.",
    distractores: [
      "Reducir competitividad económica regional.",
      "Eliminar interoperabilidad entre sistemas de transporte.",
      "Impedir expansión ferroviaria metropolitana.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye autoridades de transporte ni ejecuta decisiones administrativas obligatorias.",
    distractores: [
      "No puede analizar concesiones privadas.",
      "No puede emitir alertas preventivas.",
      "No puede evaluar proyectos ferroviarios.",
    ],
  },
  {
    pregunta: "¿Qué hace metodológicamente sólido un mapa de riesgo vial?",
    respuestaCorrecta: "Cruzar accidentes, velocidad, infraestructura, flujos y vulnerabilidad territorial verificable.",
    distractores: [
      "Comparar únicamente número de vehículos registrados.",
      "Priorizar percepción ciudadana de inseguridad.",
      "Evaluar exclusivamente daños materiales históricos.",
    ],
  },
  {
    pregunta: "¿Qué función cumple el análisis geoespacial dentro del módulo?",
    respuestaCorrecta: "Identificar patrones territoriales de movilidad, riesgo y desigualdad de acceso.",
    distractores: [
      "Sustituir auditorías de transporte físico.",
      "Automatizar rediseño vial completo.",
      "Eliminar necesidad de supervisión humana.",
    ],
  },
]);

const preguntasTecnicasModulo14 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué distingue una política de protección social basada en derechos de una política asistencialista clientelar?",
    respuestaCorrecta: "La protección basada en derechos garantiza acceso verificable, dignidad, trazabilidad y no condicionamiento político.",
    distractores: [
      "La política asistencialista siempre tiene menor costo administrativo.",
      "La protección basada en derechos exige eliminar transferencias monetarias.",
      "El clientelismo solo ocurre cuando existe corrupción penal acreditada.",
    ],
  },
  {
    pregunta: "¿Qué indicador revela una falla estructural en programas sociales para adultos mayores?",
    respuestaCorrecta: "Retrasos recurrentes, tarjetas bloqueadas, intermediación indebida y falta de servicios complementarios de cuidado.",
    distractores: [
      "Incremento nominal del padrón de beneficiarios.",
      "Entrega periódica de apoyos económicos generales.",
      "Existencia de reglas de operación publicadas.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite operativo del Sistema DIF Cívico?",
    respuestaCorrecta: "No sustituye al DIF ni a instituciones formales, sino que documenta, evalúa y propone con evidencia.",
    distractores: [
      "No puede analizar programas sociales existentes.",
      "No puede recibir testimonios ciudadanos voluntarios.",
      "No puede generar mapas de vulnerabilidad social.",
    ],
  },
  {
    pregunta: "¿Qué hace técnicamente sólido un expediente de abuso patrimonial contra una persona adulta mayor?",
    respuestaCorrecta: "Evidencia de control indebido del recurso, contexto de vulnerabilidad, trazabilidad de pagos y consentimiento afectado.",
    distractores: [
      "La declaración pública de familiares inconformes.",
      "La existencia de una transferencia monetaria gubernamental.",
      "La edad avanzada de la persona beneficiaria por sí sola.",
    ],
  },
  {
    pregunta: "¿Qué criterio fortalece más una evaluación de impacto real de programas sociales?",
    respuestaCorrecta: "Medir cambios verificables en bienestar, autonomía, salud, seguridad y continuidad de derechos.",
    distractores: [
      "Comparar únicamente número de beneficiarios registrados.",
      "Priorizar montos presupuestales ejercidos.",
      "Medir satisfacción mediante encuestas aisladas.",
    ],
  },
]);

const preguntasTecnicasModulo15 = adaptarBancoTecnico([
  {
    pregunta: "¿Qué convierte una política pública de corto plazo en un riesgo intergeneracional técnicamente relevante?",
    respuestaCorrecta: "La transferencia verificable de costos fiscales, sociales, ambientales o sanitarios hacia generaciones futuras.",
    distractores: [
      "La baja popularidad pública de la política implementada.",
      "La ausencia de participación juvenil en redes sociales.",
      "El incremento temporal del gasto público anual.",
    ],
  },
  {
    pregunta: "¿Qué característica fortalece más una evaluación de justicia intergeneracional?",
    respuestaCorrecta: "Comparar beneficios inmediatos con impactos acumulativos proyectados a 10, 20 o 30 años.",
    distractores: [
      "Medir exclusivamente aprobación ciudadana actual.",
      "Evaluar solo el costo presupuestal del primer año.",
      "Priorizar indicadores políticos de corto plazo.",
    ],
  },
  {
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye procesos legislativos, presupuestales ni decisiones de autoridades competentes.",
    distractores: [
      "No puede analizar políticas deportivas.",
      "No puede utilizar modelos prospectivos.",
      "No puede emitir dictámenes ciudadanos.",
    ],
  },
  {
    pregunta: "¿Qué hace metodológicamente sólido un análisis de deuda social juvenil?",
    respuestaCorrecta: "Integrar educación, empleo, salud mental, seguridad, deporte, movilidad social y desigualdad territorial.",
    distractores: [
      "Comparar únicamente tasas de desempleo juvenil.",
      "Medir solo cobertura de becas educativas.",
      "Priorizar encuestas de percepción política.",
    ],
  },
  {
    pregunta: "¿Qué riesgo surge al abandonar el deporte comunitario como política preventiva?",
    respuestaCorrecta: "Aumentar vulnerabilidad ante violencia, enfermedades prevenibles, aislamiento social y deterioro psicoemocional.",
    distractores: [
      "Reducir competitividad internacional deportiva profesional.",
      "Disminuir inversión privada en clubes deportivos.",
      "Eliminar automáticamente cohesión comunitaria.",
    ],
  },
]);

export const preguntasTecnicasPorModulo: Record<number, PreguntaBanco[]> = {
  1: tecnicaModulo(modulosTecnocracia.find((modulo) => modulo.id === 1)?.nombre || "Módulo 1"),
  2: preguntasTecnicasModulo2,
  3: preguntasTecnicasModulo3,
  4: preguntasTecnicasModulo4,
  5: preguntasTecnicasModulo5,
  6: preguntasTecnicasModulo6,
  7: preguntasTecnicasModulo7,
  8: preguntasTecnicasModulo8,
  9: preguntasTecnicasModulo9,
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
