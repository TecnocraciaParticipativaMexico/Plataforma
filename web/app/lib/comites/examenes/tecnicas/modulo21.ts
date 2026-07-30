import { adaptarBancoTecnico } from "../helpers";

export const preguntasTecnicasModulo21 = adaptarBancoTecnico(21, [
{
    id: "mod21-001",
    modulo: 21,
    pregunta: "¿Qué distingue la verificación ciudadana del voto de un cómputo electoral oficial?",
    respuestaCorrecta: "La verificación ciudadana preserva evidencia agregada y detecta inconsistencias sin validar resultados oficiales.",
    distractores: [
      "La verificación ciudadana sustituye legalmente al cómputo distrital.",
      "La verificación ciudadana proclama ganadores cuando hay suficientes actas.",
      "La verificación ciudadana elimina la necesidad de autoridades electorales."
    ]
  },
  {
    id: "mod21-002",
    modulo: 21,
    pregunta: "¿Qué característica hace técnicamente válida una alerta electoral estadística?",
    respuestaCorrecta: "Identificar desviaciones significativas con metodología explícita, margen de error y nivel de confianza.",
    distractores: [
      "Basarse en percepción ciudadana generalizada.",
      "Detectar cualquier diferencia entre encuesta y resultado.",
      "Emitirse solo cuando exista denuncia partidista formal."
    ]
  },
  {
    id: "mod21-003",
    modulo: 21,
    pregunta: "¿Cuál es el principal límite operativo del INE Cívico?",
    respuestaCorrecta: "No organiza elecciones, no valida resultados oficiales ni sustituye al INE o tribunales electorales.",
    distractores: [
      "No puede documentar actas públicas de casilla.",
      "No puede analizar sobrerrepresentación legislativa.",
      "No puede generar mapas de anomalías electorales."
    ]
  },
  {
    id: "mod21-004",
    modulo: 21,
    pregunta: "¿Qué hace metodológicamente sólida la carga ciudadana de actas visibles de casilla?",
    respuestaCorrecta: "Georreferenciación declarativa, sello de tiempo, eliminación de metadatos y repositorio inmutable.",
    distractores: [
      "Identificación completa del ciudadano que sube el acta.",
      "Publicación inmediata sin control de duplicados.",
      "Validación automática del resultado por mayoría de usuarios."
    ]
  },
  {
    id: "mod21-005",
    modulo: 21,
    pregunta: "¿Qué riesgo existe si se registra el sentido individual del voto con identidad personal?",
    respuestaCorrecta: "Vulnerar secreto del voto, privacidad y seguridad de la persona participante.",
    distractores: [
      "Reducir precisión estadística del conteo cívico.",
      "Impedir comparación con resultados oficiales.",
      "Eliminar utilidad de actas públicas de casilla."
    ]
  },
  {
    id: "mod21-006",
    modulo: 21,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Clasificar reportes, detectar anomalías, comparar actas y visualizar patrones sin decidir resultados.",
    distractores: [
      "Declarar ganadores con base en evidencia ciudadana.",
      "Sustituir al órgano electoral en el cómputo oficial.",
      "Determinar automáticamente si hubo fraude electoral."
    ]
  },
  {
    id: "mod21-007",
    modulo: 21,
    pregunta: "¿Qué diferencia existe entre clima político cívico y encuesta electoral representativa?",
    respuestaCorrecta: "El clima cívico documenta percepciones voluntarias no pagadas con límites explícitos, sin pretender representar al electorado total.",
    distractores: [
      "El clima cívico reemplaza encuestas formales cuando tiene muchos participantes.",
      "La encuesta representativa no requiere metodología pública.",
      "Ambos instrumentos tienen el mismo valor inferencial."
    ]
  },
  {
    id: "mod21-008",
    modulo: 21,
    pregunta: "¿Qué característica vuelve robusto un expediente de irregularidad electoral?",
    respuestaCorrecta: "Evidencia documental, reportes estructurados, trazabilidad, criterios de inclusión y análisis territorial.",
    distractores: [
      "Número elevado de publicaciones en redes sociales.",
      "Denuncias partidistas coincidentes.",
      "Narrativa pública de fraude ampliamente difundida."
    ]
  },
  {
    id: "mod21-009",
    modulo: 21,
    pregunta: "¿Qué señal puede justificar una alerta técnica, no una conclusión de fraude?",
    respuestaCorrecta: "Divergencias significativas entre actas ciudadanas preservadas y datos oficiales agregados.",
    distractores: [
      "Resultado contrario a encuestas comerciales.",
      "Alta participación en una zona históricamente competitiva.",
      "Victoria amplia de una fuerza política."
    ]
  },
  {
    id: "mod21-010",
    modulo: 21,
    pregunta: "¿Qué práctica protege mejor el anonimato en la carga de fotografía de boleta?",
    respuestaCorrecta: "Eliminar metadatos, fragmentar criptográficamente la imagen y publicar solo patrones agregados.",
    distractores: [
      "Solicitar credencial de elector para evitar duplicados.",
      "Guardar rostro del votante en forma cifrada.",
      "Publicar la imagen completa con sección electoral exacta."
    ]
  },
  {
    id: "mod21-011",
    modulo: 21,
    pregunta: "¿Qué hace técnicamente consistente un análisis post-electoral de representación efectiva?",
    respuestaCorrecta: "Comparar voto emitido, reglas de asignación, distribución territorial y composición final del órgano.",
    distractores: [
      "Medir únicamente número total de curules por partido.",
      "Comparar resultados con encuestas de salida.",
      "Priorizar percepción ciudadana de legitimidad."
    ]
  },
  {
    id: "mod21-012",
    modulo: 21,
    pregunta: "¿Qué riesgo surge si una plataforma cívica publica resultados parciales como tendencia electoral?",
    respuestaCorrecta: "Puede influir indebidamente en el comportamiento electoral y vulnerar neutralidad del módulo.",
    distractores: [
      "Reduce automáticamente validez de actas oficiales.",
      "Impide análisis estadístico posterior.",
      "Elimina la posibilidad de observación internacional."
    ]
  },
  {
    id: "mod21-013",
    modulo: 21,
    pregunta: "¿Qué vuelve internacionalmente útil un informe de observación electoral ciudadana?",
    respuestaCorrecta: "Metodología clara, evidencia trazable, análisis de patrones y compatibilidad con estándares de observación.",
    distractores: [
      "Traducción del informe a varios idiomas.",
      "Participación de líderes políticos relevantes.",
      "Publicación durante la jornada electoral."
    ]
  },
  {
    id: "mod21-014",
    modulo: 21,
    pregunta: "¿Qué característica fortalece el análisis de inequidad pre-electoral?",
    respuestaCorrecta: "Documentar uso de recursos públicos, financiamiento opaco, intervención institucional y acceso desigual a medios.",
    distractores: [
      "Comparar únicamente intención de voto previa.",
      "Medir número de eventos de campaña.",
      "Priorizar volumen de propaganda digital."
    ]
  },
  {
    id: "mod21-015",
    modulo: 21,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodología, supervisar integridad de instrumentos y emitir dictámenes técnicos basados en evidencia.",
    distractores: [
      "Certificar legalmente resultados electorales.",
      "Resolver impugnaciones ciudadanas.",
      "Autorizar campañas de observación partidista."
    ]
  },
  {
    id: "mod21-016",
    modulo: 21,
    pregunta: "¿Qué hace metodológicamente sólido un mapa de anomalías electorales?",
    respuestaCorrecta: "Cruzar participación, resultados, demografía, series históricas y evidencia ciudadana georreferenciada.",
    distractores: [
      "Mostrar solo municipios con resultados extremos.",
      "Colorear secciones según partido ganador.",
      "Usar únicamente denuncias en redes sociales."
    ]
  },
  {
    id: "mod21-017",
    modulo: 21,
    pregunta: "¿Qué problema surge si se confunde anomalía estadística con prueba de fraude?",
    respuestaCorrecta: "Se excede el alcance técnico del análisis y se debilita credibilidad metodológica.",
    distractores: [
      "Se impide revisión humana posterior.",
      "Se elimina la utilidad de actas ciudadanas.",
      "Se invalida automáticamente el repositorio electoral."
    ]
  },
  {
    id: "mod21-018",
    modulo: 21,
    pregunta: "¿Qué característica fortalece una consulta cívica de percepción durante jornada electoral?",
    respuestaCorrecta: "Preguntar sobre libertad, presión, acceso y confianza sin registrar intención ni sentido del voto.",
    distractores: [
      "Solicitar preferencia electoral para comparar tendencias.",
      "Publicar resultados en tiempo real por casilla.",
      "Pedir identificación oficial para validar participación."
    ]
  },
  {
    id: "mod21-019",
    modulo: 21,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de actas, reportes, imágenes, versiones y evidencias electorales.",
    distractores: [
      "Validar automáticamente autenticidad material de cada acta.",
      "Sustituir cómputos oficiales.",
      "Resolver impugnaciones electorales automáticamente."
    ]
  },
  {
    id: "mod21-020",
    modulo: 21,
    pregunta: "¿Qué criterio diferencia observación electoral técnica de activismo partidista?",
    respuestaCorrecta: "Neutralidad metodológica, evidencia verificable, límites explícitos y ausencia de orientación del voto.",
    distractores: [
      "Mayor volumen de participación ciudadana.",
      "Publicación de denuncias contra un solo partido.",
      "Uso de lenguaje democrático general."
    ]
  },
  {
    id: "mod21-021",
    modulo: 21,
    pregunta: "¿Qué riesgo existe al recolectar fotografías de boletas sin diseño criptográfico y anonimización?",
    respuestaCorrecta: "Exponer preferencias individuales, facilitar coacción o permitir reconstrucción de identidad.",
    distractores: [
      "Reducir capacidad de conteo ciudadano agregado.",
      "Impedir análisis post-electoral de representación.",
      "Eliminar comparación con actas oficiales."
    ]
  },
  {
    id: "mod21-022",
    modulo: 21,
    pregunta: "¿Qué vuelve técnicamente consistente un análisis de sobrerrepresentación?",
    respuestaCorrecta: "Relacionar voto efectivo, fórmula legal de asignación, límites constitucionales y composición legislativa final.",
    distractores: [
      "Comparar únicamente número de legisladores por partido.",
      "Usar percepción pública de justicia electoral.",
      "Medir cobertura mediática del tema."
    ]
  },
  {
    id: "mod21-023",
    modulo: 21,
    pregunta: "¿Qué práctica reduce mejor el riesgo de duplicidad en actas ciudadanas?",
    respuestaCorrecta: "Huella criptográfica de imagen, sección declarada, control de versiones y comparación visual asistida.",
    distractores: [
      "Aceptar solo actas subidas por usuarios verificados nominalmente.",
      "Eliminar imágenes similares sin revisión.",
      "Publicar todas las copias para transparencia total."
    ]
  },
  {
    id: "mod21-024",
    modulo: 21,
    pregunta: "¿Qué hace sólida una alerta sobre participación electoral incompatible?",
    respuestaCorrecta: "Contrastar participación reportada con lista nominal, histórico, demografía y variación territorial razonable.",
    distractores: [
      "Comparar únicamente con encuestas pre-electorales.",
      "Usar percepción ciudadana de afluencia.",
      "Tomar como anomalía cualquier aumento de participación."
    ]
  },
  {
    id: "mod21-025",
    modulo: 21,
    pregunta: "¿Qué característica protege mejor legitimidad del conteo cívico agregado?",
    respuestaCorrecta: "Presentarlo como referencia no oficial con metodología, límites y trazabilidad completa.",
    distractores: [
      "Publicarlo como resultado alternativo definitivo.",
      "Ocultar márgenes de error para evitar confusión.",
      "Excluir actas que contradigan la tendencia esperada."
    ]
  },
  {
    id: "mod21-026",
    modulo: 21,
    pregunta: "¿Qué función cumple el reconocimiento progresivo de competencia cívica?",
    respuestaCorrecta: "Valorar revisión informada y consistencia contextual sin crear jerarquías permanentes de ciudadanía.",
    distractores: [
      "Dar más peso permanente al voto de usuarios expertos.",
      "Sustituir representación electoral formal.",
      "Excluir participantes sin experiencia técnica."
    ]
  },
  {
    id: "mod21-027",
    modulo: 21,
    pregunta: "¿Qué riesgo existe si el módulo interfiere físicamente en casillas o instruye a funcionarios?",
    respuestaCorrecta: "Invadir funciones electorales formales y comprometer legalidad y neutralidad de observación.",
    distractores: [
      "Reducir velocidad de carga de evidencia.",
      "Impedir análisis estadístico nacional.",
      "Eliminar utilidad de consultas cívicas."
    ]
  },
  {
    id: "mod21-028",
    modulo: 21,
    pregunta: "¿Qué característica fortalece un análisis de coacción o compra de voto?",
    respuestaCorrecta: "Reportes estructurados, patrón territorial, temporalidad, evidencia contextual y protección de denunciantes.",
    distractores: [
      "Publicación nominal de presuntos operadores.",
      "Número de rumores comunitarios similares.",
      "Declaraciones partidistas durante la campaña."
    ]
  },
  {
    id: "mod21-029",
    modulo: 21,
    pregunta: "¿Qué vuelve útil la observación electoral permanente y no solo episódica?",
    respuestaCorrecta: "Permite documentar condiciones pre-electorales, jornada, post-elección y representación resultante como proceso continuo.",
    distractores: [
      "Permite reemplazar observadores oficiales.",
      "Evita necesidad de análisis estadístico.",
      "Garantiza ausencia de irregularidades."
    ]
  },
  {
    id: "mod21-030",
    modulo: 21,
    pregunta: "¿Cuál es el principio rector del Módulo 21?",
    respuestaCorrecta: "Proteger legitimidad democrática mediante evidencia electoral trazable, memoria permanente y participación ciudadana no coercitiva.",
    distractores: [
      "Sustituir al INE mediante conteos ciudadanos digitales.",
      "Validar resultados electorales con inteligencia artificial.",
      "Convertir consultas cívicas en encuestas oficiales."
    ]
  }
]);
