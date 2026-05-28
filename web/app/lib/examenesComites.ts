export type PreguntaExamen = {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  tipo: "etica" | "tecnica";
};

type PreguntaBanco = Omit<PreguntaExamen, "id">;

export const preguntasEticasGlobales: PreguntaBanco[] = [
  { tipo: "etica", pregunta: "Si un integrante del comité descubre información técnicamente relevante obtenida de manera ilegal pero imposible de verificar por otra vía, ¿cuál es la decisión éticamente más sólida?", opciones: ["No utilizarla como evidencia principal y buscar corroboración verificable e independiente.", "Publicarla inmediatamente por interés público.", "Ocultarla completamente aunque revele daño estructural.", "Filtrarla anónimamente para evitar responsabilidad."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué principio debe prevalecer cuando existe tensión entre transparencia pública y protección de personas vulnerables?", opciones: ["Minimización de daño sin sacrificar trazabilidad institucional verificable.", "Transparencia absoluta sin restricciones.", "Confidencialidad total de cualquier información sensible.", "Publicar únicamente información autorizada por autoridades."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué constituye un conflicto de interés estructural dentro de un comité ciudadano experto?", opciones: ["Participar en decisiones donde existen beneficios directos, indirectos o relaciones relevantes no declaradas.", "Tener opiniones políticas personales.", "Haber trabajado previamente en el sector evaluado.", "Discrepar metodológicamente con otros expertos."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué criterio ético fortalece más la legitimidad de un dictamen ciudadano?", opciones: ["Metodología verificable, independencia y límites explícitos del análisis realizado.", "Consenso unánime dentro del comité.", "Aprobación pública mayoritaria.", "Difusión masiva en medios y redes."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "Si un experto detecta un error metodológico que favorece ideológicamente su posición personal, ¿qué debe hacer?", opciones: ["Reportarlo y corregirlo aunque afecte la conclusión deseada.", "Mantenerlo si el objetivo final es socialmente positivo.", "Esperar a que otro integrante lo detecte.", "Modificar únicamente la redacción final del informe."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué riesgo ético surge cuando un comité confunde evidencia con activismo?", opciones: ["Debilitar credibilidad técnica y convertir el análisis en una postura previamente decidida.", "Reducir velocidad de deliberación.", "Eliminar participación ciudadana.", "Impedir análisis interdisciplinario."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué práctica protege mejor la imparcialidad deliberativa?", opciones: ["Separar hipótesis, evidencia, interpretación y recomendación de manera explícita.", "Evitar completamente opiniones divergentes.", "Limitar participación de expertos externos.", "Usar solo fuentes institucionales oficiales."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué constituye una manipulación ética de datos aunque las cifras sean reales?", opciones: ["Presentar información fuera de contexto para inducir conclusiones engañosas.", "Usar visualizaciones complejas.", "Incluir márgenes de error estadísticos.", "Comparar series históricas diferentes."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué obligación ética tiene un comité ante incertidumbre técnica significativa?", opciones: ["Explicitar límites metodológicos y evitar afirmaciones concluyentes no sustentadas.", "Suspender cualquier publicación pública.", "Delegar la decisión a autoridades externas.", "Simplificar resultados para evitar confusión."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué criterio ético debe aplicarse al uso de inteligencia artificial en dictámenes ciudadanos?", opciones: ["La IA debe asistir análisis verificables sin sustituir responsabilidad humana deliberativa.", "La IA debe maximizar eficiencia sobre transparencia.", "La IA debe tomar decisiones neutrales automáticamente.", "La IA debe reemplazar evaluaciones humanas subjetivas."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué riesgo ético implica publicar denuncias no corroboradas con identificación personal?", opciones: ["Exponer personas a daño irreversible sin debido estándar de verificación.", "Reducir velocidad de investigación.", "Eliminar trazabilidad documental.", "Impedir participación ciudadana futura."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué práctica fortalece más la independencia de un comité?", opciones: ["Diversidad metodológica y separación de intereses políticos, económicos y operativos.", "Rotación constante de integrantes.", "Aprobación institucional gubernamental.", "Uniformidad ideológica entre expertos."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué obligación ética existe al usar testimonios de víctimas o denunciantes?", opciones: ["Proteger identidad, consentimiento y contexto evitando revictimización.", "Publicar íntegramente testimonios para transparencia.", "Eliminar cualquier referencia emocional.", "Usar únicamente testimonios judicializados."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué constituye una deliberación ética técnicamente válida?", opciones: ["Evaluar argumentos y evidencia aunque contradigan preferencias previas del comité.", "Mantener coherencia ideológica permanente.", "Evitar desacuerdos para preservar legitimidad.", "Priorizar posiciones mayoritarias automáticamente."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué riesgo surge cuando un comité depende financieramente del actor evaluado?", opciones: ["Comprometer independencia real y percepción pública de imparcialidad.", "Reducir acceso a información técnica.", "Eliminar trazabilidad de resultados.", "Impedir análisis interdisciplinario."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué principio ético debe prevalecer frente a presión política externa?", opciones: ["Integridad metodológica y fidelidad a evidencia verificable.", "Neutralidad discursiva absoluta.", "Evitar cualquier conclusión controversial.", "Posponer indefinidamente el dictamen."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué hace éticamente válida una alerta pública preventiva?", opciones: ["Basarse en evidencia razonable y proporcionalidad frente al riesgo potencial.", "Generar máxima atención mediática.", "Publicarse únicamente tras unanimidad total.", "Usar lenguaje alarmista para acelerar reacción."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué riesgo ético existe al simplificar excesivamente problemas complejos?", opciones: ["Ocultar variables críticas y favorecer decisiones erróneas o manipulables.", "Reducir interés ciudadano.", "Eliminar necesidad de expertos.", "Impedir comunicación pública efectiva."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué práctica protege mejor la memoria institucional de los comités?", opciones: ["Documentar criterios, cambios metodológicos y fundamentos deliberativos verificables.", "Rotar completamente integrantes cada ciclo.", "Eliminar versiones preliminares de análisis.", "Centralizar decisiones en coordinadores técnicos."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué obligación ética existe ante errores detectados en dictámenes previos?", opciones: ["Corregir públicamente preservando trazabilidad histórica de cambios y razones.", "Eliminar versiones antiguas para evitar confusión.", "Esperar confirmación institucional externa.", "Corregir solo errores con impacto político."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué constituye captura institucional de un comité?", opciones: ["Cuando intereses externos condicionan metodología, prioridades o conclusiones sustantivas.", "Recibir críticas públicas frecuentes.", "Mantener relaciones con universidades.", "Publicar dictámenes controversiales."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué criterio ético fortalece más la participación ciudadana?", opciones: ["Permitir intervención significativa sin sacrificar rigor metodológico y protección de evidencia.", "Aceptar cualquier aportación sin filtros.", "Delegar decisiones técnicas a votación popular.", "Limitar participación a especialistas acreditados."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué riesgo ético implica usar métricas técnicamente correctas pero socialmente engañosas?", opciones: ["Generar conclusiones aparentemente objetivas que distorsionan realidad sustantiva.", "Reducir precisión estadística.", "Eliminar interoperabilidad de datos.", "Impedir análisis comparativo internacional."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué práctica fortalece más la justicia procedimental dentro de un comité?", opciones: ["Garantizar revisión crítica, trazabilidad y posibilidad razonada de disenso.", "Mantener votaciones secretas permanentes.", "Evitar participación interdisciplinaria.", "Centralizar validación metodológica."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué obligación ética existe respecto a sesgos algorítmicos detectados?", opciones: ["Documentarlos, mitigarlos y transparentar sus posibles efectos en resultados.", "Ocultarlos para evitar desconfianza pública.", "Eliminar automáticamente cualquier modelo automatizado.", "Delegar toda responsabilidad al desarrollador original."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué riesgo ético surge cuando la reputación de expertos pesa más que la evidencia?", opciones: ["Convertir autoridad percibida en sustituto de validación metodológica.", "Reducir eficiencia deliberativa.", "Eliminar necesidad de documentación técnica.", "Impedir participación ciudadana general."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué criterio ético debe aplicarse ante información técnicamente ambigua pero políticamente explosiva?", opciones: ["Evaluar proporcionalidad, verificabilidad y potencial de daño antes de difundirla.", "Publicarla inmediatamente por transparencia radical.", "Reservarla indefinidamente aunque exista riesgo público.", "Delegar decisión a actores políticos externos."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué práctica protege mejor legitimidad democrática de los comités?", opciones: ["Mantener independencia, transparencia metodológica y límites claros de competencia.", "Buscar aprobación constante de autoridades.", "Evitar cualquier posicionamiento técnico controversial.", "Limitar deliberaciones al ámbito interno."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Qué riesgo ético existe cuando la velocidad de publicación desplaza la validación rigurosa?", opciones: ["Normalizar errores, amplificar desinformación y erosionar confianza institucional.", "Reducir participación ciudadana activa.", "Eliminar necesidad de trazabilidad.", "Impedir análisis interdisciplinario."], respuestaCorrecta: 0 },
  { tipo: "etica", pregunta: "¿Cuál es el principio rector ético de los Comités Ciudadanos Expertos?", opciones: ["La legitimidad pública surge de evidencia verificable, independencia y responsabilidad metodológica.", "La neutralidad absoluta garantiza objetividad total.", "La mayoría ciudadana define automáticamente la verdad.", "La tecnología puede sustituir deliberación ética humana."], respuestaCorrecta: 0 },
];

type PreguntaTecnicaModulo01Fuente = {
  id?: string;
  modulo?: number;
  pregunta: string;
  opciones: string[];
  correcta: number;
};

type PreguntaTecnicaFuente = {
  id?: string;
  modulo?: number;
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

const q = (pregunta: string, respuestaCorrecta: string, distractores: string[]): PreguntaTecnicaFuente => ({
  pregunta,
  respuestaCorrecta,
  distractores,
});

const preguntasTecnicasModulo01 = adaptarBancoTecnicoModulo01([
{
    modulo: 1,
    pregunta: "En una denuncia anónima sobre colusión entre policía municipal y crimen organizado, ¿cuál es el primer criterio técnico para decidir si puede integrarse a un expediente acumulativo sin exponer al denunciante?",
    opciones: [
      "Identificar civilmente al denunciante para confirmar su credibilidad antes de procesar el contenido.",
      "Separar identidad, contenido, metadatos y ubicación; preservar trazabilidad del hecho sin revelar a la persona.",
      "Publicar la denuncia completa para generar presión social inmediata.",
      "Enviar la denuncia directamente a la autoridad local señalada para solicitar aclaración."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué combinación permite convertir denuncias ciudadanas aisladas en evidencia útil para detectar patrones criminales territoriales?",
    opciones: [
      "Volumen de denuncias, hashtags públicos y validación por mayoría simple.",
      "Georreferenciación agregada, consistencia temporal, corroboración cruzada y cadena de custodia digital.",
      "Identificación plena de denunciantes, publicación nominal y denuncia mediática.",
      "Votación ciudadana abierta, reacción en redes y presión política local."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "En el modelo de Seguridad Ciudadana, ¿por qué la IA no debe clasificar automáticamente a una persona como integrante de una red criminal?",
    opciones: [
      "Porque la IA solo puede trabajar con texto, no con datos geoespaciales.",
      "Porque la atribución de responsabilidad penal exige autoridad competente, debido proceso y valoración humana.",
      "Porque los modelos de IA no pueden detectar relaciones de redes.",
      "Porque la plataforma debe evitar cualquier uso de datos públicos."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Cuál es el uso correcto del análisis de grafos en este módulo?",
    opciones: [
      "Determinar culpabilidad individual a partir de conexiones indirectas.",
      "Identificar estructuras, intermediarios, recurrencias y nodos de riesgo para revisión técnica humana.",
      "Sustituir carpetas de investigación formales.",
      "Publicar mapas nominales de servidores públicos y familiares."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "Una serie de denuncias anónimas reporta cobro de piso en mercados municipales. ¿Qué variable incrementa más su valor probatorio?",
    opciones: [
      "Que todas usen el mismo lenguaje narrativo.",
      "Que provengan de una sola fuente con alto detalle emocional.",
      "Que coincidan en ubicación, temporalidad, modus operandi y actores institucionales por rol.",
      "Que sean publicadas simultáneamente en redes sociales."
    ],
    correcta: 2
  },
  {
    modulo: 1,
    pregunta: "¿Qué significa que el módulo tenga 'vinculatoriedad indirecta'?",
    opciones: [
      "Que puede ordenar detenciones si existe consenso ciudadano.",
      "Que sus dictámenes sustituyen investigaciones del Ministerio Público.",
      "Que la calidad técnica de la evidencia puede activar responsabilidades externas, presión institucional o procesos formales.",
      "Que puede imponer sanciones administrativas a funcionarios corruptos."
    ],
    correcta: 2
  },
  {
    modulo: 1,
    pregunta: "En un expediente sobre protección institucional al narcotráfico, ¿qué elemento permite escalar el caso a marcos internacionales?",
    opciones: [
      "La indignación pública acumulada.",
      "La demostración de patrones sistemáticos de omisión, tolerancia o aquiescencia estatal.",
      "La publicación viral del caso.",
      "La declaración política de un comité ciudadano."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Cuál es la diferencia técnica entre denuncia ciudadana y documentación forense ciudadana?",
    opciones: [
      "La denuncia relata hechos; la documentación forense estructura, preserva, verifica y vincula evidencia.",
      "La denuncia siempre es falsa hasta que la autoridad la valide.",
      "La documentación forense solo puede hacerla la policía armada.",
      "No existe diferencia técnica relevante."
    ],
    correcta: 0
  },
  {
    modulo: 1,
    pregunta: "¿Qué práctica sería incompatible con el principio 'no se persigue a personas, se documentan sistemas'?",
    opciones: [
      "Agregar denuncias por zona y periodo.",
      "Analizar patrones de omisión institucional.",
      "Publicar nombres de presuntos responsables sin validación legal ni debido proceso.",
      "Emitir alertas agregadas de riesgo territorial."
    ],
    correcta: 2
  },
  {
    modulo: 1,
    pregunta: "Para preservar evidencia digital de una denuncia, ¿qué secuencia es más sólida?",
    opciones: [
      "Captura de pantalla, edición para claridad, publicación y archivo.",
      "Ingesta, hash criptográfico, sello de tiempo, control de versiones y registro de cadena de custodia.",
      "Resumen manual, eliminación de metadatos y envío por chat.",
      "Impresión física y resguardo individual."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Cuál es el principal riesgo técnico de publicar mapas de criminalidad con precisión excesiva?",
    opciones: [
      "Reducir la calidad estadística del análisis.",
      "Exponer denunciantes, víctimas o comunidades vulnerables a represalias.",
      "Impedir el uso de sistemas GIS.",
      "Aumentar el costo de almacenamiento."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué enfoque geoespacial protege mejor a la ciudadanía y mantiene utilidad analítica?",
    opciones: [
      "Coordenadas exactas de cada denuncia.",
      "Mapas agregados por cuadrantes, ventanas temporales y niveles de confianza.",
      "Listados públicos de domicilios afectados.",
      "Mapas sin fuente ni metodología."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "En detección de lavado vinculado a crimen organizado, ¿qué señal es más útil como alerta inicial, no como prueba concluyente?",
    opciones: [
      "Una empresa nueva con crecimiento atípico, contratos repetidos, baja competencia y relaciones societarias opacas.",
      "Una empresa con alta facturación y sitio web moderno.",
      "Un comercio que opera en una zona insegura.",
      "Un proveedor que gana una licitación pública una sola vez."
    ],
    correcta: 0
  },
  {
    modulo: 1,
    pregunta: "¿Por qué el aprendizaje no supervisado es útil en seguridad ciudadana anticorrupción?",
    opciones: [
      "Porque permite condenar sin etiquetas previas.",
      "Porque puede detectar agrupamientos o anomalías cuando no existen suficientes casos confirmados.",
      "Porque elimina la necesidad de revisión humana.",
      "Porque identifica automáticamente delitos federales."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué indicador sugiere posible captura institucional local?",
    opciones: [
      "Reducción uniforme de denuncias en todos los delitos.",
      "Denuncias reiteradas de la misma zona que desaparecen administrativamente sin actuación verificable.",
      "Aumento de patrullajes anunciado públicamente.",
      "Rotación normal de mandos por cambio de administración."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Cuál debe ser la función de una Policía Ciudadana Técnica y Forense dentro del modelo?",
    opciones: [
      "Detener sospechosos cuando la autoridad no actúe.",
      "Realizar verificación no confrontativa, documentación, preservación de evidencia y acompañamiento a víctimas.",
      "Operar retenes comunitarios.",
      "Infiltrarse en grupos criminales."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué dato debe minimizarse o eliminarse antes de publicar una versión pública de un expediente?",
    opciones: [
      "Metodología de análisis.",
      "Patrones agregados.",
      "Datos personales, metadatos sensibles y detalles que permitan reidentificación.",
      "Nivel de confianza del dictamen."
    ],
    correcta: 2
  },
  {
    modulo: 1,
    pregunta: "¿Qué distingue una alerta cívica responsable de una acusación pública riesgosa?",
    opciones: [
      "La alerta usa evidencia agregada, lenguaje probabilístico, metodología y límites explícitos.",
      "La alerta identifica culpables para acelerar la presión social.",
      "La alerta evita explicar fuentes para proteger al comité.",
      "La alerta se basa en percepción ciudadana sin corroboración."
    ],
    correcta: 0
  },
  {
    modulo: 1,
    pregunta: "¿Qué estándar debe cumplir una denuncia oral en lengua indígena para integrarse al expediente?",
    opciones: [
      "Traducirse libremente al español, descartando matices locales.",
      "Transcribirse, conservar sentido original, documentar traducción y validar contexto con protección de identidad.",
      "Publicarse en audio original para transparencia plena.",
      "Excluirse por dificultad probatoria."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Cuál es la mejor razón para separar capas de datos en la arquitectura del módulo?",
    opciones: [
      "Facilitar que cualquier comité acceda a todo el expediente.",
      "Reducir costos de nube.",
      "Evitar que una filtración revele simultáneamente identidad, contenido, ubicación y trazabilidad.",
      "Permitir edición flexible de evidencias."
    ],
    correcta: 2
  },
  {
    modulo: 1,
    pregunta: "¿Qué métrica es más adecuada para evaluar confianza de un patrón de riesgo?",
    opciones: [
      "Número bruto de denuncias sin depuración.",
      "Coincidencia entre fuentes independientes, consistencia temporal, densidad territorial y ausencia de contradicciones críticas.",
      "Cantidad de comentarios en redes.",
      "Antigüedad del primer reporte."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué uso de datos públicos sería técnicamente legítimo dentro del módulo?",
    opciones: [
      "Cruzar contratos, presupuestos, nombramientos y denuncias agregadas para detectar anomalías institucionales.",
      "Publicar domicilios privados de funcionarios.",
      "Crear listas negras de personas sin procedimiento.",
      "Recolectar biométricos de denunciantes para evitar duplicidad."
    ],
    correcta: 0
  },
  {
    modulo: 1,
    pregunta: "¿Qué criterio evita que una denuncia falsa contamine el sistema?",
    opciones: [
      "Eliminar todas las denuncias anónimas.",
      "Asignar nivel de confianza, exigir corroboración gradual y activar revisión humana reforzada.",
      "Publicar primero y corregir después.",
      "Aceptar solo denuncias de expertos acreditados."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Cuál es la interpretación correcta de una correlación entre aumento de violencia y cambio de mando policial?",
    opciones: [
      "Prueba directa de colusión.",
      "Señal analítica que exige contrastar temporalidad, contexto, decisiones administrativas y otras fuentes.",
      "Dato irrelevante si no hay confesión.",
      "Base suficiente para acusación pública."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué entregable es más compatible con el enfoque legal del módulo?",
    opciones: [
      "Orden ciudadana de captura.",
      "Dictamen técnico de patrones, riesgos, evidencia y límites metodológicos.",
      "Lista pública de enemigos comunitarios.",
      "Sentencia ciudadana de responsabilidad penal."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué principio debe regir la interacción con autoridades potencialmente capturadas?",
    opciones: [
      "Enviarles automáticamente toda denuncia recibida.",
      "No compartir información sensible sin evaluación de riesgo, necesidad, legalidad y protección de víctimas.",
      "Bloquear cualquier interacción institucional.",
      "Publicar todo antes de notificar."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué señal puede indicar desplazamiento forzado por violencia organizada?",
    opciones: [
      "Variación estacional normal en movilidad.",
      "Salida repentina de familias, abandono de viviendas, cierre de escuelas y reportes coincidentes de amenazas.",
      "Aumento de turismo regional.",
      "Cambio de administración municipal."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Qué hace que un expediente sea útil para organismos internacionales?",
    opciones: [
      "Lenguaje político contundente.",
      "Evidencia verificable, metodología explícita, trazabilidad, análisis de patrones y estándares de derechos humanos.",
      "Cantidad de firmas digitales sin validación.",
      "Denuncias extensas sin estructura."
    ],
    correcta: 1
  },
  {
    modulo: 1,
    pregunta: "¿Cuál es el límite más importante de la IA forense en este módulo?",
    opciones: [
      "No puede resumir testimonios.",
      "No puede producir alertas geográficas.",
      "No debe decidir culpabilidad, ordenar acciones coercitivas ni sustituir revisión humana experta.",
      "No puede trabajar con información pública."
    ],
    correcta: 2
  },
  {
    modulo: 1,
    pregunta: "Ante un patrón de extorsión, omisión policial y contratos municipales anómalos, ¿cuál es la respuesta técnica más adecuada?",
    opciones: [
      "Publicar nombres de empresarios y policías vinculados por sospecha.",
      "Integrar expediente con capas separadas: violencia, omisión institucional, flujo financiero, contratación pública y nivel de confianza.",
      "Enviar patrullas ciudadanas a la zona.",
      "Cerrar el caso hasta tener sentencia judicial."
    ],
    correcta: 1
  }
]);

const preguntasTecnicasModulo02 = adaptarBancoTecnico([
{
    id: "mod02-001",
    modulo: 2,
    pregunta: "En una carpeta técnica ciudadana, ¿cuál es la función principal de la clasificación jurídica preliminar no vinculante?",
    respuestaCorrecta: "Orientar técnicamente la lectura de los hechos sin sustituir al Ministerio Público ni imputar responsabilidad penal.",
    distractores: [
      "Determinar formalmente el tipo penal aplicable y vincular jurídicamente a la autoridad competente.",
      "Sustituir la teoría del caso de la fiscalía cuando exista omisión institucional.",
      "Permitir que el comité ciudadano emita una acusación pública fundada."
    ]
  },
  {
    id: "mod02-002",
    modulo: 2,
    pregunta: "¿Qué elemento distingue una carpeta forense ciudadana jurídicamente utilizable de una simple recopilación de denuncias?",
    respuestaCorrecta: "Narrativa fáctica cronológica, evidencia vinculada a hechos, metadatos, control de integridad y metodología explícita.",
    distractores: [
      "Cantidad elevada de testimonios, presión mediática y respaldo ciudadano mayoritario.",
      "Publicación inmediata de los nombres de presuntos responsables y víctimas.",
      "Opinión técnica del comité sin necesidad de anexos probatorios."
    ]
  },
  {
    id: "mod02-003",
    modulo: 2,
    pregunta: "¿Por qué la IA del módulo no debe reinterpretar libremente testimonios orales?",
    respuestaCorrecta: "Porque debe preservar sentido original, contexto lingüístico y fidelidad semántica para no contaminar la evidencia.",
    distractores: [
      "Porque los testimonios orales carecen de valor técnico en expedientes forenses.",
      "Porque toda declaración debe convertirse primero en lenguaje jurídico formal.",
      "Porque la IA solo puede procesar documentos oficiales escritos."
    ]
  },
  {
    id: "mod02-004",
    modulo: 2,
    pregunta: "¿Cuál es el propósito técnico del hashing criptográfico en una carpeta ciudadana?",
    respuestaCorrecta: "Demostrar que un archivo o evidencia no fue alterado desde su incorporación o versión registrada.",
    distractores: [
      "Ocultar permanentemente el contenido de la evidencia a cualquier auditor externo.",
      "Validar automáticamente la veracidad material de los hechos denunciados.",
      "Sustituir la cadena de custodia documental mediante cifrado irreversible."
    ]
  },
  {
    id: "mod02-005",
    modulo: 2,
    pregunta: "En una investigación ciudadana sobre corrupción sistémica, ¿qué debe documentarse antes de formular cualquier análisis de patrón?",
    respuestaCorrecta: "Hechos verificables, fuentes, temporalidad, actores por rol institucional y evidencia específica asociada.",
    distractores: [
      "Conclusiones jurídicas preliminares, hipótesis política y responsables probables.",
      "Relatos agregados sin depuración para no perder espontaneidad testimonial.",
      "Percepción ciudadana, impacto mediático y narrativa pública dominante."
    ]
  },
  {
    id: "mod02-006",
    modulo: 2,
    pregunta: "¿Qué práctica preserva mejor la presunción de inocencia en este módulo?",
    respuestaCorrecta: "Identificar autoridades o personas por rol institucional y evitar imputaciones personales no determinadas por autoridad competente.",
    distractores: [
      "Omitir toda referencia a servidores públicos aunque sus actos sean relevantes.",
      "Publicar nombres completos cuando existan tres o más denuncias coincidentes.",
      "Permitir imputaciones personales si el comité experto aprueba el dictamen."
    ]
  },
  {
    id: "mod02-007",
    modulo: 2,
    pregunta: "¿Cuál es el valor probatorio de un sello de tiempo verificable?",
    respuestaCorrecta: "Acreditar que una evidencia o versión existía en un momento determinado y no fue incorporada retroactivamente.",
    distractores: [
      "Confirmar que el contenido de la evidencia es verdadero en términos materiales.",
      "Sustituir la validación humana de consistencia probatoria.",
      "Convertir automáticamente el expediente en prueba judicial plena."
    ]
  },
  {
    id: "mod02-008",
    modulo: 2,
    pregunta: "¿Qué debe contener el anexo probatorio de una carpeta técnica robusta?",
    respuestaCorrecta: "Evidencia catalogada, origen, fecha, integridad, versión, relación con hechos y referencias cruzadas.",
    distractores: [
      "Solo documentos oficiales, excluyendo testimonios ciudadanos por riesgo de sesgo.",
      "Una síntesis narrativa sin metadatos para proteger a las fuentes.",
      "Capturas de pantalla ordenadas cronológicamente sin hash ni control de versiones."
    ]
  },
  {
    id: "mod02-009",
    modulo: 2,
    pregunta: "¿Cuándo una carpeta puede ser útil ante mecanismos internacionales?",
    respuestaCorrecta: "Cuando documenta hechos, contexto, patrones sistemáticos, metodología, trazabilidad y estándares de derechos humanos aplicables.",
    distractores: [
      "Cuando contiene denuncias emocionalmente contundentes y presión social suficiente.",
      "Cuando acusa directamente a funcionarios para activar jurisdicción universal.",
      "Cuando evita referencias normativas nacionales para no politizar el caso."
    ]
  },
  {
    id: "mod02-010",
    modulo: 2,
    pregunta: "¿Cuál es el límite operativo más importante del Módulo 02?",
    respuestaCorrecta: "No ejerce acción penal, no juzga, no sentencia y no sustituye a fiscalías o tribunales.",
    distractores: [
      "Solo puede documentar hechos si existe denuncia formal previa ante fiscalía.",
      "Debe entregar automáticamente toda evidencia a autoridades locales.",
      "Puede emitir sanciones simbólicas cuando exista consenso ciudadano."
    ]
  },
  {
    id: "mod02-011",
    modulo: 2,
    pregunta: "¿Qué aporta el razonamiento lógico-temporal asistido por IA?",
    respuestaCorrecta: "Ordenar cronologías, detectar contradicciones temporales y relacionar hechos sin decidir culpabilidad.",
    distractores: [
      "Determinar automáticamente el móvil criminal más probable.",
      "Reemplazar la valoración jurídica de los comités expertos.",
      "Convertir testimonios contradictorios en una narrativa única obligatoria."
    ]
  },
  {
    id: "mod02-012",
    modulo: 2,
    pregunta: "¿Qué significa neutralidad jurídica activa en una carpeta ciudadana?",
    respuestaCorrecta: "Documentar hechos y relaciones verificables con rigor, evitando lenguaje político, dogmático o acusatorio.",
    distractores: [
      "Evitar cualquier conclusión técnica aunque la evidencia sea consistente.",
      "Tratar todas las versiones como igualmente válidas sin análisis probatorio.",
      "No incluir estándares legales para no invadir competencias estatales."
    ]
  },
  {
    id: "mod02-013",
    modulo: 2,
    pregunta: "¿Qué fuente puede integrarse legítimamente a una carpeta del módulo?",
    respuestaCorrecta: "Denuncias estructuradas, documentos públicos, auditorías, registros administrativos, periodismo verificable y peritajes independientes.",
    distractores: [
      "Filtraciones anónimas no verificadas presentadas como hechos concluyentes.",
      "Rumores comunitarios sin metadatos ni posibilidad de corroboración.",
      "Opiniones partidistas si coinciden con el patrón general del expediente."
    ]
  },
  {
    id: "mod02-014",
    modulo: 2,
    pregunta: "¿Qué debe hacer el sistema cuando detecta una inconsistencia crítica entre dos evidencias?",
    respuestaCorrecta: "Marcar la inconsistencia, preservar ambas versiones, documentar origen y activar revisión técnica humana.",
    distractores: [
      "Eliminar la evidencia menos reciente para mantener coherencia narrativa.",
      "Fusionar ambas versiones mediante IA para producir una síntesis plausible.",
      "Publicar la contradicción como prueba de falsedad de una de las partes."
    ]
  },
  {
    id: "mod02-015",
    modulo: 2,
    pregunta: "¿Cuál es la finalidad de separar capas de identidad, contenido y evidencia?",
    respuestaCorrecta: "Reducir riesgos de exposición, proteger participantes y mantener auditabilidad sin revelar datos sensibles.",
    distractores: [
      "Impedir que cualquier autoridad pueda consultar el expediente completo.",
      "Eliminar la necesidad de controles de acceso internos.",
      "Permitir que los comités trabajen sin trazabilidad de cambios."
    ]
  },
  {
    id: "mod02-016",
    modulo: 2,
    pregunta: "¿Qué característica hace que un expediente sea 'exportable' internacionalmente?",
    respuestaCorrecta: "Formato estandarizado, síntesis multilingüe, trazabilidad probatoria, marco normativo y metodología replicable.",
    distractores: [
      "Traducción automática completa sin revisión técnica.",
      "Narrativa política clara y nombres de responsables probables.",
      "Mayoría ciudadana validando la publicación del expediente."
    ]
  },
  {
    id: "mod02-017",
    modulo: 2,
    pregunta: "¿Cómo debe tratarse una nota de voz en lengua indígena con posible valor probatorio?",
    respuestaCorrecta: "Transcribir, traducir con control de fidelidad, preservar audio original protegido y documentar contexto lingüístico.",
    distractores: [
      "Convertirla directamente a español jurídico y descartar el audio por seguridad.",
      "Excluirla hasta que el denunciante ratifique presencialmente ante autoridad.",
      "Publicarla íntegra para permitir verificación comunitaria abierta."
    ]
  },
  {
    id: "mod02-018",
    modulo: 2,
    pregunta: "¿Qué rol cumplen los Comités de Ciudadanos Expertos en este módulo?",
    respuestaCorrecta: "Validan metodología, revisan consistencia probatoria y emiten dictámenes técnicos colectivos sin imputar responsabilidades.",
    distractores: [
      "Determinan responsabilidad penal cuando la fiscalía es omisa.",
      "Seleccionan públicamente a presuntos responsables para presión institucional.",
      "Sustituyen a peritos oficiales en procedimientos judiciales."
    ]
  },
  {
    id: "mod02-019",
    modulo: 2,
    pregunta: "¿Qué debe evitar una carpeta técnica para no ser desacreditada por sesgo político?",
    respuestaCorrecta: "Lenguaje conclusivo no sustentado, juicios de valor, imputaciones personales y omisión de límites metodológicos.",
    distractores: [
      "Referencias a estándares internacionales de derechos humanos.",
      "Anexos probatorios demasiado detallados.",
      "Cronologías verificables y clasificación preliminar no vinculante."
    ]
  },
  {
    id: "mod02-020",
    modulo: 2,
    pregunta: "¿Cuál es el criterio correcto para incorporar periodismo de investigación como fuente?",
    respuestaCorrecta: "Verificar autoría, fecha, fuentes citadas, documentos base, consistencia con otras evidencias y límites de uso.",
    distractores: [
      "Incorporarlo como prueba plena si proviene de un medio reconocido.",
      "Excluirlo siempre porque no es documento oficial.",
      "Usarlo únicamente como narrativa introductoria sin catalogación probatoria."
    ]
  },
  {
    id: "mod02-021",
    modulo: 2,
    pregunta: "¿Qué significa que la carpeta deba ordenar hechos antes de interpretarlos?",
    respuestaCorrecta: "Primero fijar cronología, fuentes, actores por rol y evidencia; después analizar contexto, patrones o hipótesis.",
    distractores: [
      "Primero definir el delito probable para seleccionar la evidencia relevante.",
      "Primero construir una narrativa coherente y después llenar vacíos documentales.",
      "Primero validar políticamente el caso y después sistematizar documentos."
    ]
  },
  {
    id: "mod02-022",
    modulo: 2,
    pregunta: "¿Qué permite la clasificación probatoria automatizada cuando se usa correctamente?",
    respuestaCorrecta: "Ordenar documentos por tipo, relación con hechos, confiabilidad inicial y necesidad de revisión humana.",
    distractores: [
      "Determinar admisibilidad judicial definitiva sin intervención experta.",
      "Descartar automáticamente pruebas de baja calidad narrativa.",
      "Asignar culpabilidad probable según frecuencia de menciones."
    ]
  },
  {
    id: "mod02-023",
    modulo: 2,
    pregunta: "¿Qué riesgo existe si la IA normaliza documentos 'mejorando' su redacción sin control?",
    respuestaCorrecta: "Puede alterar sentido, introducir inferencias no declaradas y contaminar la trazabilidad semántica.",
    distractores: [
      "Puede aumentar demasiado el tamaño del expediente.",
      "Puede hacer que el documento sea más fácil de leer para autoridades.",
      "Puede impedir que se aplique hashing criptográfico."
    ]
  },
  {
    id: "mod02-024",
    modulo: 2,
    pregunta: "¿Qué debe incluir una matriz de hechos y evidencia?",
    respuestaCorrecta: "Hecho afirmado, fuente, evidencia asociada, nivel de corroboración, contradicciones y referencia exacta.",
    distractores: [
      "Hecho afirmado, responsable probable, sanción sugerida y nivel de indignación social.",
      "Resumen narrativo, conclusión del comité y recomendación política.",
      "Lista de documentos sin relación explícita con hechos específicos."
    ]
  },
  {
    id: "mod02-025",
    modulo: 2,
    pregunta: "¿Cuándo un patrón puede considerarse metodológicamente más sólido?",
    respuestaCorrecta: "Cuando surge de fuentes independientes, recurrencia temporal, coherencia territorial y evidencia documental asociada.",
    distractores: [
      "Cuando muchas personas repiten la misma acusación en redes sociales.",
      "Cuando un testimonio principal contiene gran detalle emocional.",
      "Cuando coincide con una hipótesis política previamente aceptada."
    ]
  },
  {
    id: "mod02-026",
    modulo: 2,
    pregunta: "¿Cuál es la diferencia entre integridad probatoria y veracidad material?",
    respuestaCorrecta: "La integridad demuestra que la evidencia no fue alterada; la veracidad requiere corroboración y valoración del contenido.",
    distractores: [
      "Son equivalentes si existe hash criptográfico.",
      "La veracidad material se presume cuando la evidencia proviene de una víctima.",
      "La integridad probatoria solo aplica a documentos oficiales."
    ]
  },
  {
    id: "mod02-027",
    modulo: 2,
    pregunta: "¿Qué debe hacer el módulo ante datos personales sensibles dentro de evidencia relevante?",
    respuestaCorrecta: "Protegerlos, separar versión pública y reservada, aplicar minimización y mantener trazabilidad controlada.",
    distractores: [
      "Eliminar todo el documento aunque sea clave para el expediente.",
      "Publicarlos si ayudan a demostrar gravedad del caso.",
      "Sustituirlos con datos inventados para conservar fluidez narrativa."
    ]
  },
  {
    id: "mod02-028",
    modulo: 2,
    pregunta: "¿Qué hace que una omisión institucional sea relevante dentro de una carpeta forense?",
    respuestaCorrecta: "Que pueda documentarse como inacción, retraso, archivo, negligencia o tolerancia frente a hechos conocidos.",
    distractores: [
      "Que la ciudadanía perciba desconfianza general hacia la autoridad.",
      "Que una autoridad no responda públicamente a críticas en redes.",
      "Que exista alternancia política posterior al hecho denunciado."
    ]
  },
  {
    id: "mod02-029",
    modulo: 2,
    pregunta: "¿Qué entregable es más propio del Módulo 02?",
    respuestaCorrecta: "Carpeta técnica ciudadana con narrativa fáctica, anexo probatorio, trazabilidad, análisis contextual y límites metodológicos.",
    distractores: [
      "Sentencia ciudadana con determinación de culpabilidad.",
      "Denuncia pública viral con nombres, fotografías y acusaciones.",
      "Orden de investigación obligatoria dirigida a fiscalías."
    ]
  },
  {
    id: "mod02-030",
    modulo: 2,
    pregunta: "¿Cuál es el principio rector del uso de IA en la Fiscalía Forense ciudadana?",
    respuestaCorrecta: "Asistir en documentación, estructuración, detección de inconsistencias y resguardo; nunca acusar, juzgar o decidir.",
    distractores: [
      "Automatizar la imputación para compensar la ineficacia de fiscalías.",
      "Emitir conclusiones penales cuando el nivel de confianza sea alto.",
      "Reemplazar comités expertos en casos de evidencia abundante."
    ]
  }
]);

const preguntasTecnicasModulo03 = adaptarBancoTecnico([
{
    id: "mod03-001",
    modulo: 3,
    pregunta: "¿Cuál es el principal riesgo democrático de la sobre-representación legislativa sostenida?",
    respuestaCorrecta: "La distorsión estructural entre voluntad electoral efectiva y capacidad real de producción normativa.",
    distractores: [
      "La disminución automática de competitividad económica regional.",
      "La imposibilidad técnica de formar coaliciones parlamentarias.",
      "La anulación constitucional inmediata de todas las reformas aprobadas."
    ]
  },
  {
    id: "mod03-002",
    modulo: 3,
    pregunta: "¿Qué diferencia metodológica distingue al Congreso Cívico del Congreso formal?",
    respuestaCorrecta: "La trazabilidad pública integral del proceso deliberativo y la ponderación basada en representación proporcional real.",
    distractores: [
      "La capacidad de emitir normas vinculantes mediante voto digital.",
      "La sustitución del sistema electoral representativo por democracia directa.",
      "La eliminación de análisis constitucional en procesos legislativos."
    ]
  },
  {
    id: "mod03-003",
    modulo: 3,
    pregunta: "¿Qué elemento fortalece técnicamente la legitimidad de un dictamen legislativo ciudadano?",
    respuestaCorrecta: "Metodología explícita, análisis comparativo, fundamentación constitucional y trazabilidad documental completa.",
    distractores: [
      "Cantidad de votos emocionales obtenidos durante deliberación pública.",
      "Apoyo mediático de actores políticos nacionales.",
      "Ratificación informal por legisladores partidistas."
    ]
  },
  {
    id: "mod03-004",
    modulo: 3,
    pregunta: "¿Cuál es el límite jurídico central del Congreso Cívico?",
    respuestaCorrecta: "No puede sustituir formalmente al Poder Legislativo ni producir coerción normativa directa.",
    distractores: [
      "No puede analizar reformas constitucionales federales.",
      "No puede incorporar participación ciudadana internacional.",
      "No puede emitir opiniones técnicas sobre presupuestos."
    ]
  },
  {
    id: "mod03-005",
    modulo: 3,
    pregunta: "¿Qué convierte un análisis legislativo ciudadano en evidencia democrática verificable?",
    respuestaCorrecta: "La documentación transparente de discrepancias entre legalidad formal, representación efectiva y estándares constitucionales.",
    distractores: [
      "La acumulación de firmas digitales sin validación metodológica.",
      "La oposición pública sistemática a toda reforma gubernamental.",
      "La transmisión abierta de debates sin estructuración técnica."
    ]
  },
  {
    id: "mod03-006",
    modulo: 3,
    pregunta: "¿Por qué la IA del módulo no debe votar ni priorizar decisiones legislativas?",
    respuestaCorrecta: "Porque su función es estructurar análisis y preservar memoria deliberativa, no sustituir soberanía ciudadana.",
    distractores: [
      "Porque los modelos lingüísticos carecen de capacidad comparativa normativa.",
      "Porque la IA no puede procesar reformas constitucionales complejas.",
      "Porque cualquier automatización legislativa es inconstitucional per se."
    ]
  },
  {
    id: "mod03-007",
    modulo: 3,
    pregunta: "¿Qué característica hace más sólida una simulación de representación proporcional real?",
    respuestaCorrecta: "Usar resultados electorales efectivos, criterios transparentes de ponderación y trazabilidad reproducible.",
    distractores: [
      "Ajustar la representación según percepción pública de legitimidad.",
      "Compensar manualmente sesgos regionales mediante cuotas temporales.",
      "Excluir partidos minoritarios para estabilizar deliberaciones."
    ]
  },
  {
    id: "mod03-008",
    modulo: 3,
    pregunta: "¿Qué función cumple el voto informado dentro del módulo?",
    respuestaCorrecta: "Otorgar legitimidad deliberativa basada en comprensión técnica y acceso contextualizado a información verificable.",
    distractores: [
      "Reemplazar mecanismos constitucionales de representación popular.",
      "Convertir automáticamente dictámenes ciudadanos en jurisprudencia.",
      "Determinar responsabilidad política con efectos jurídicos obligatorios."
    ]
  },
  {
    id: "mod03-009",
    modulo: 3,
    pregunta: "¿Qué indicador revela mejor una ruptura entre representación formal y legitimidad democrática?",
    respuestaCorrecta: "Aprobación sistemática de reformas estructurales con correlación legislativa desalineada respecto al voto efectivo.",
    distractores: [
      "Incremento temporal de abstencionismo en elecciones locales.",
      "Disminución de productividad parlamentaria anual.",
      "Reducción de cobertura mediática de debates legislativos."
    ]
  },
  {
    id: "mod03-010",
    modulo: 3,
    pregunta: "¿Cuál es la principal utilidad internacional de los dictámenes legislativos ciudadanos?",
    respuestaCorrecta: "Documentar incompatibilidades normativas con estándares democráticos, constitucionales y de derechos humanos.",
    distractores: [
      "Invalidar automáticamente reformas ante organismos multilaterales.",
      "Sustituir mecanismos judiciales nacionales de control constitucional.",
      "Permitir sanciones diplomáticas inmediatas contra legisladores."
    ]
  },
  {
    id: "mod03-011",
    modulo: 3,
    pregunta: "¿Qué riesgo metodológico existe si un comité experto analiza una ley sin considerar impacto presupuestal?",
    respuestaCorrecta: "Producir dictámenes constitucionalmente incompletos e inviables desde perspectiva operativa y financiera.",
    distractores: [
      "Perder automáticamente legitimidad ciudadana participativa.",
      "Convertir el análisis en opinión política no especializada.",
      "Impedir cualquier deliberación pública posterior."
    ]
  },
  {
    id: "mod03-012",
    modulo: 3,
    pregunta: "¿Qué práctica fortalece la auditabilidad de deliberaciones legislativas ciudadanas?",
    respuestaCorrecta: "Registro íntegro de versiones, argumentos, votos, modificaciones y referencias normativas utilizadas.",
    distractores: [
      "Eliminación periódica de borradores para evitar manipulación política.",
      "Publicación exclusiva de conclusiones finales consolidadas.",
      "Anonimización completa de toda participación deliberativa."
    ]
  },
  {
    id: "mod03-013",
    modulo: 3,
    pregunta: "¿Qué diferencia existe entre legitimidad democrática y legalidad formal?",
    respuestaCorrecta: "La legalidad deriva del procedimiento vigente; la legitimidad exige congruencia material con representación y principios democráticos.",
    distractores: [
      "La legitimidad depende exclusivamente de aprobación judicial.",
      "La legalidad desaparece cuando existe oposición ciudadana significativa.",
      "Ambas categorías son equivalentes en democracias constitucionales."
    ]
  },
  {
    id: "mod03-014",
    modulo: 3,
    pregunta: "¿Qué criterio vuelve técnicamente más útil una comparación internacional legislativa?",
    respuestaCorrecta: "Comparar sistemas equivalentes considerando contexto constitucional, capacidad institucional y efectos reales de implementación.",
    distractores: [
      "Seleccionar únicamente democracias con sistemas parlamentarios consolidados.",
      "Priorizar países con mayor crecimiento económico reciente.",
      "Excluir modelos incompatibles ideológicamente con el contexto nacional."
    ]
  },
  {
    id: "mod03-015",
    modulo: 3,
    pregunta: "¿Cuál es la principal función de los Comités de Ciudadanos Expertos dentro del módulo?",
    respuestaCorrecta: "Validar rigor metodológico, riesgos normativos y consistencia constitucional de los dictámenes.",
    distractores: [
      "Sustituir votaciones ciudadanas cuando exista complejidad técnica.",
      "Emitir recomendaciones vinculantes para órganos jurisdiccionales.",
      "Aprobar directamente iniciativas de reforma ciudadana."
    ]
  },
  {
    id: "mod03-016",
    modulo: 3,
    pregunta: "¿Qué hace más vulnerable un dictamen legislativo ciudadano frente a impugnaciones?",
    respuestaCorrecta: "Ausencia de metodología reproducible, trazabilidad documental y delimitación clara de supuestos.",
    distractores: [
      "Uso de referencias internacionales comparadas.",
      "Participación de expertos multidisciplinarios independientes.",
      "Inclusión de análisis económico y constitucional simultáneo."
    ]
  },
  {
    id: "mod03-017",
    modulo: 3,
    pregunta: "¿Por qué la publicidad íntegra del proceso deliberativo es central en el módulo?",
    respuestaCorrecta: "Porque convierte la rendición de cuentas en un mecanismo permanente verificable por cualquier observador.",
    distractores: [
      "Porque sustituye la necesidad de fundamentación constitucional.",
      "Porque elimina completamente riesgos de captura política.",
      "Porque convierte automáticamente los dictámenes en vinculantes."
    ]
  },
  {
    id: "mod03-018",
    modulo: 3,
    pregunta: "¿Qué característica distingue una reforma técnicamente consistente de una políticamente conveniente?",
    respuestaCorrecta: "Su coherencia entre texto normativo, impacto operativo, sostenibilidad presupuestal y compatibilidad constitucional.",
    distractores: [
      "Su velocidad de aprobación parlamentaria.",
      "Su capacidad de movilización electoral inmediata.",
      "Su respaldo mayoritario en encuestas de opinión."
    ]
  },
  {
    id: "mod03-019",
    modulo: 3,
    pregunta: "¿Qué papel cumple el Artículo 71 en el alcance potencial del módulo?",
    respuestaCorrecta: "Permitir que documentación técnica ciudadana reduzca costos de estructuración de iniciativas constitucionalmente viables.",
    distractores: [
      "Otorgar facultad automática de iniciativa legislativa al Congreso Cívico.",
      "Permitir reformas constitucionales mediante consulta digital permanente.",
      "Convertir dictámenes ciudadanos en proyectos preferentes obligatorios."
    ]
  },
  {
    id: "mod03-020",
    modulo: 3,
    pregunta: "¿Qué práctica reduce más el riesgo de captura ideológica del Congreso Cívico?",
    respuestaCorrecta: "Metodologías públicas, trazabilidad argumentativa y revisión técnica plural multidisciplinaria.",
    distractores: [
      "Rotación semanal obligatoria de todos los participantes.",
      "Exclusión de legisladores con experiencia partidista previa.",
      "Limitación de participación ciudadana a especialistas acreditados."
    ]
  },
  {
    id: "mod03-021",
    modulo: 3,
    pregunta: "¿Qué significa que un dictamen tenga efectos vinculantes indirectos?",
    respuestaCorrecta: "Que puede influir institucional, reputacional o internacionalmente sin producir coerción jurídica inmediata.",
    distractores: [
      "Que puede invalidar leyes mediante presión ciudadana acumulada.",
      "Que obliga constitucionalmente a responder al Congreso formal.",
      "Que sustituye mecanismos judiciales de control normativo."
    ]
  },
  {
    id: "mod03-022",
    modulo: 3,
    pregunta: "¿Cuál es el mayor riesgo de usar IA generativa sin supervisión en análisis legislativo?",
    respuestaCorrecta: "Introducir inferencias normativas falsas, omitir contexto constitucional o fabricar coherencia argumentativa inexistente.",
    distractores: [
      "Reducir excesivamente la velocidad de procesamiento documental.",
      "Eliminar automáticamente contradicciones parlamentarias.",
      "Impedir participación deliberativa de expertos humanos."
    ]
  },
  {
    id: "mod03-023",
    modulo: 3,
    pregunta: "¿Qué elemento fortalece más la consistencia de una evaluación constitucional ciudadana?",
    respuestaCorrecta: "Contrastar texto normativo, precedentes, estándares internacionales y efectos materiales previsibles.",
    distractores: [
      "Usar exclusivamente interpretación literal del texto constitucional.",
      "Priorizar percepción pública de justicia social.",
      "Limitar el análisis a jurisprudencia nacional reciente."
    ]
  },
  {
    id: "mod03-024",
    modulo: 3,
    pregunta: "¿Qué riesgo surge cuando la deliberación ciudadana carece de insumos técnicos comparativos?",
    respuestaCorrecta: "Transformar el proceso en agregación de opiniones sin capacidad real de evaluación normativa compleja.",
    distractores: [
      "Eliminar completamente la diversidad ideológica participativa.",
      "Reducir la legitimidad jurídica de reformas vigentes.",
      "Impedir cualquier intervención de expertos constitucionalistas."
    ]
  },
  {
    id: "mod03-025",
    modulo: 3,
    pregunta: "¿Qué característica vuelve replicable un proceso de evaluación legislativa?",
    respuestaCorrecta: "Uso de criterios explícitos, documentación estructurada y metodología verificable por terceros independientes.",
    distractores: [
      "Participación constante de los mismos especialistas.",
      "Centralización de análisis en un comité único nacional.",
      "Limitación deliberativa a temas constitucionales."
    ]
  },
  {
    id: "mod03-026",
    modulo: 3,
    pregunta: "¿Qué consecuencia puede generar una reforma constitucional técnicamente inconsistente aunque sea formalmente válida?",
    respuestaCorrecta: "Conflictos sistémicos de implementación, litigiosidad estructural y deterioro de legitimidad institucional.",
    distractores: [
      "Anulación automática por tribunales internacionales.",
      "Pérdida inmediata de representación parlamentaria.",
      "Suspensión obligatoria de efectos presupuestales."
    ]
  },
  {
    id: "mod03-027",
    modulo: 3,
    pregunta: "¿Qué criterio debe prevalecer cuando existe conflicto entre popularidad política y viabilidad constitucional?",
    respuestaCorrecta: "Compatibilidad con principios constitucionales, derechos fundamentales y sostenibilidad institucional.",
    distractores: [
      "Mayoría circunstancial expresada en encuestas digitales.",
      "Capacidad de movilización electoral inmediata.",
      "Rentabilidad política de corto plazo."
    ]
  },
  {
    id: "mod03-028",
    modulo: 3,
    pregunta: "¿Qué función cumple la memoria institucional preservada por el módulo?",
    respuestaCorrecta: "Permitir auditoría histórica permanente de decisiones, argumentos, omisiones y cambios normativos.",
    distractores: [
      "Sustituir gacetas parlamentarias oficiales.",
      "Eliminar necesidad de transparencia gubernamental.",
      "Convertir deliberaciones en archivos reservados estratégicos."
    ]
  },
  {
    id: "mod03-029",
    modulo: 3,
    pregunta: "¿Qué práctica hace más robusto un análisis de impacto legislativo?",
    respuestaCorrecta: "Integrar variables jurídicas, presupuestales, regulatorias, operativas y de derechos humanos simultáneamente.",
    distractores: [
      "Priorizar únicamente efectos fiscales proyectados.",
      "Limitar evaluación a constitucionalidad abstracta.",
      "Concentrarse exclusivamente en impacto electoral."
    ]
  },
  {
    id: "mod03-030",
    modulo: 3,
    pregunta: "¿Cuál es el principio rector del Congreso Cívico de Evaluación Legislativa?",
    respuestaCorrecta: "Hacer visible y verificable la distancia entre legalidad formal y legitimidad democrática mediante documentación técnica pública.",
    distractores: [
      "Sustituir progresivamente al Congreso mexicano mediante representación digital.",
      "Centralizar la deliberación normativa en expertos certificados.",
      "Transformar votaciones ciudadanas en mecanismos legislativos vinculantes."
    ]
  }
]);

const preguntasTecnicasModulo04 = adaptarBancoTecnico([
  q("¿Qué distingue técnicamente una violación aislada de un patrón estructural de derechos humanos?", "La recurrencia verificable de conductas, tolerancia institucional, contexto sistemático y consistencia probatoria transversal.", ["La cobertura mediática nacional e internacional acumulada.", "La cantidad absoluta de víctimas registradas oficialmente.", "La participación de fuerzas federales en al menos un incidente."]),
  q("¿Cuál es el principal riesgo metodológico de documentar testimonios sin enfoque de no revictimización?", "Reproducir daño psicológico, contaminar evidencia y afectar validez ética y probatoria del expediente.", ["Reducir automáticamente el valor jurídico internacional del caso.", "Impedir la interoperabilidad técnica con sistemas de IA documental.", "Eliminar la posibilidad de trazabilidad criptográfica posterior."]),
  q("¿Qué elemento fortalece más la admisibilidad internacional de un expediente ciudadano de derechos humanos?", "Cadena de trazabilidad verificable, contextualización jurídica y documentación consistente de patrones.", ["Publicación viral inmediata de los testimonios originales.", "Ratificación política de organizaciones partidistas.", "Número de observadores ciudadanos presentes durante entrevistas."]),
  q("¿Qué función cumple el consentimiento informado dentro del módulo?", "Garantizar comprensión de riesgos, alcances, protección de datos y posibles usos del testimonio.", ["Transferir responsabilidad jurídica completa a la víctima participante.", "Permitir publicación automática de toda evidencia recibida.", "Sustituir obligaciones institucionales de confidencialidad."]),
  q("¿Por qué el módulo evita imputaciones penales individuales directas?", "Porque su función es documentar estructuras, patrones y hechos sin sustituir procesos jurisdiccionales.", ["Porque los estándares internacionales prohíben identificar autoridades.", "Porque la evidencia testimonial carece de utilidad jurídica individual.", "Porque solo organismos internacionales pueden señalar responsables."]),
  q("¿Qué característica hace metodológicamente sólida una documentación de desaparición forzada?", "Cronología verificable, contexto institucional, evidencia convergente y análisis de omisiones estatales.", ["Difusión inmediata del caso en plataformas digitales abiertas.", "Acumulación de testimonios indirectos sin corroboración temporal.", "Participación de múltiples organizaciones sin metodología unificada."]),
  q("¿Cuál es el mayor riesgo de publicar metadatos sensibles de víctimas?", "Permitir reidentificación, represalias, vigilancia o revictimización indirecta.", ["Reducir interoperabilidad con estándares ISO de preservación documental.", "Invalidar automáticamente sellos de tiempo criptográficos.", "Impedir clasificación automatizada mediante NLP."]),
  q("¿Qué convierte la omisión institucional en un elemento probatorio relevante?", "Que demuestra posible tolerancia, aquiescencia o incumplimiento del deber estatal de protección.", ["Que sustituye automáticamente la necesidad de evidencia material.", "Que transforma cualquier negligencia administrativa en crimen internacional.", "Que elimina requisitos de contextualización jurídica."]),
  q("¿Qué estándar internacional es clave para evaluar documentación de tortura?", "Consistencia narrativa, evidencia médica, contexto de custodia y preservación independiente de testimonios.", ["Número de declaraciones públicas emitidas por autoridades.", "Reconocimiento mediático de organizaciones acompañantes.", "Ratificación judicial nacional previa al expediente técnico."]),
  q("¿Por qué la IA no debe reinterpretar narrativas testimoniales complejas?", "Porque puede alterar sentido, introducir inferencias y comprometer fidelidad semántica probatoria.", ["Porque los modelos lingüísticos no pueden procesar lenguaje emocional.", "Porque la documentación oral carece de valor jurídico internacional.", "Porque toda traducción automatizada está prohibida en derechos humanos."]),
  q("¿Qué hace técnicamente robusto un análisis de militarización indebida?", "Contrastar funciones constitucionales, despliegue operativo, efectos civiles y evidencia de abuso sistemático.", ["Demostrar incremento presupuestal de fuerzas armadas exclusivamente.", "Identificar presencia militar en cualquier conflicto social.", "Documentar únicamente declaraciones políticas oficiales."]),
  q("¿Qué principio limita el uso de evidencia altamente sensible en versiones públicas?", "Minimización de daño, protección de víctimas y proporcionalidad informativa.", ["Neutralidad tecnológica frente a sistemas de anonimización.", "Presunción automática de confidencialidad estatal.", "Prioridad absoluta de transparencia sobre privacidad."]),
  q("¿Qué característica vuelve replicable un expediente ciudadano internacionalizable?", "Metodología explícita, referencias verificables y trazabilidad auditada por terceros independientes.", ["Aprobación política de organismos multilaterales.", "Participación exclusiva de expertos certificados internacionalmente.", "Publicación simultánea en múltiples idiomas."]),
  q("¿Qué riesgo surge cuando se mezclan testimonios sin delimitación contextual clara?", "Contaminación narrativa, pérdida de precisión temporal y debilitamiento de análisis estructural.", ["Reducción automática de interoperabilidad con blockchain.", "Imposibilidad de georreferenciar eventos complejos.", "Eliminación de validez estadística internacional."]),
  q("¿Qué práctica fortalece más el valor técnico de documentación sobre represión de protesta social?", "Cruzar cronologías, órdenes institucionales, patrones de fuerza y evidencia audiovisual verificable.", ["Priorizar declaraciones políticas de líderes sociales.", "Publicar listas nominales de mandos operativos presuntos.", "Centralizar testimonios en una sola narrativa colectiva."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No ejerce coerción penal ni sustituye organismos jurisdiccionales o comisiones oficiales.", ["No puede documentar violaciones cometidas por actores no estatales.", "No puede producir informes multilaterales comparativos.", "No puede utilizar análisis geoespacial avanzado."]),
  q("¿Qué elemento diferencia documentación técnica de activismo testimonial no estructurado?", "Estandarización metodológica, trazabilidad, análisis contextual y validación probatoria.", ["Neutralidad ideológica absoluta de las víctimas participantes.", "Difusión pública masiva desde el inicio del caso.", "Presencia permanente de observadores internacionales."]),
  q("¿Qué vuelve relevante internacionalmente un patrón de censura estatal?", "Persistencia sistemática, uso institucional coordinado y afectación estructural a libertades fundamentales.", ["Críticas internacionales emitidas en medios extranjeros.", "Popularidad pública de periodistas afectados.", "Existencia de legislación nacional controvertida."]),
  q("¿Por qué la separación entre identidad y evidencia pública es esencial?", "Porque protege seguridad de víctimas y preserva utilidad probatoria sin exponer información sensible.", ["Porque impide cualquier cooperación con autoridades nacionales.", "Porque elimina riesgos de contradicción testimonial.", "Porque vuelve innecesarios controles de acceso internos."]),
  q("¿Qué rol cumplen los Comités de Ciudadanos Expertos dentro del módulo?", "Validar consistencia metodológica, estándares jurídicos y solidez contextual de expedientes.", ["Determinar responsabilidad penal internacional preliminar.", "Sustituir órganos autónomos de derechos humanos.", "Autorizar judicialmente publicación de evidencia reservada."]),
  q("¿Qué característica hace más sólida una alerta temprana de riesgo institucional?", "Convergencia de indicadores temporales, geográficos y contextuales con evidencia documentada.", ["Cobertura mediática internacional sostenida.", "Número de publicaciones ciudadanas en redes sociales.", "Existencia de denuncias anónimas no clasificadas."]),
  q("¿Qué riesgo metodológico existe al documentar abusos sin análisis territorial?", "Perder capacidad de identificar concentración geográfica y patrones operativos institucionales.", ["Reducir automáticamente compatibilidad con estándares FATF.", "Eliminar validez jurídica de testimonios orales.", "Impedir el uso de tecnologías de hashing."]),
  q("¿Qué función cumplen los registros inmutables en expedientes de derechos humanos?", "Preservar evidencia verificable de integridad y cambios documentales auditables.", ["Confirmar automáticamente autenticidad material del contenido.", "Sustituir mecanismos humanos de revisión pericial.", "Garantizar anonimato irreversible de participantes."]),
  q("¿Qué criterio fortalece más una evaluación de responsabilidad internacional del Estado?", "Demostrar conocimiento institucional, omisión persistente y ausencia de medidas efectivas de protección.", ["Existencia de condena mediática nacional generalizada.", "Cantidad de funcionarios mencionados en testimonios.", "Reconocimiento político internacional del caso."]),
  q("¿Qué problema surge cuando los expedientes priorizan narrativa política sobre precisión factual?", "Debilitamiento de credibilidad, vulnerabilidad metodológica y riesgo de desacreditación internacional.", ["Reducción de interoperabilidad tecnológica documental.", "Imposibilidad de usar estándares criptográficos modernos.", "Pérdida automática de protección a víctimas."]),
  q("¿Qué característica vuelve más útil un dossier para mecanismos internacionales?", "Contextualización jurídica, patrones verificables y evidencia organizada conforme a estándares comparables.", ["Extensión narrativa amplia y detallada.", "Cantidad de organizaciones firmantes del informe.", "Cobertura audiovisual continua de los hechos."]),
  q("¿Qué práctica mejora más la protección digital de víctimas y testigos?", "Separación de capas de datos, cifrado robusto y control granular de metadatos.", ["Publicación descentralizada inmediata de todos los testimonios.", "Anonimización exclusivamente visual de documentos.", "Uso de plataformas públicas de almacenamiento abierto."]),
  q("¿Qué diferencia existe entre evidencia contextual y evidencia directa?", "La contextual demuestra entorno y patrones; la directa vincula hechos específicos concretos.", ["La contextual carece de relevancia jurídica internacional.", "La directa siempre prevalece sobre análisis estructural.", "La contextual solo puede utilizarse en investigaciones académicas."]),
  q("¿Qué hace técnicamente sólido un análisis de criminalización de defensores?", "Identificar recurrencia institucional, uso indebido normativo y correlación con actividad de defensa documentada.", ["Concentrar denuncias de actores políticos opositores.", "Comparar exclusivamente tasas de encarcelamiento nacionales.", "Priorizar cobertura internacional de organizaciones aliadas."]),
  q("¿Cuál es el principio rector del Módulo 4?", "Convertir memoria documentada y evidencia verificable en contrapeso institucional no violento y persistente.", ["Sustituir organismos autónomos mediante fiscalización ciudadana digital.", "Internacionalizar automáticamente cualquier denuncia de abuso estatal.", "Centralizar litigio estratégico en plataformas tecnocráticas."]),
]);

const preguntasTecnicasModulo05 = adaptarBancoTecnico([
  q("¿Qué elemento convierte un hallazgo ciudadano en un indicio forense potencialmente utilizable?", "La preservación contextual, georreferenciación, trazabilidad documental y registro verificable del hallazgo.", ["La publicación inmediata del hallazgo en redes sociales.", "La presencia de múltiples testigos no documentados.", "La entrega informal del objeto a autoridades locales."]),
  q("¿Cuál es el principal riesgo de alterar una escena de hallazgo sin protocolo básico?", "Contaminar evidencia, romper trazabilidad y comprometer análisis posteriores de contexto forense.", ["Invalidar automáticamente cualquier testimonio relacionado.", "Eliminar valor jurídico internacional del expediente.", "Impedir clasificación geoespacial de la búsqueda."]),
  q("¿Qué práctica fortalece más la protección de familias buscadoras?", "Separar datos sensibles, controlar metadatos y limitar exposición pública innecesaria.", ["Publicar todas las rutas de búsqueda en tiempo real.", "Centralizar información en plataformas abiertas sin cifrado.", "Difundir nombres completos de denunciantes comunitarios."]),
  q("¿Qué hace metodológicamente sólido un mapa de zonas de interés forense?", "Cruzar testimonios, hallazgos, patrones territoriales, temporalidad y evidencia contextual verificable.", ["Priorizar rumores comunitarios de alta circulación.", "Basarse únicamente en percepción de riesgo regional.", "Usar exclusivamente imágenes satelitales sin validación local."]),
  q("¿Por qué la documentación de omisiones estatales es relevante en desapariciones?", "Porque la inacción, dilación o negativa institucional forman parte del contexto probatorio del caso.", ["Porque sustituyen automáticamente la necesidad de búsqueda física.", "Porque invalidan cualquier cooperación posterior de autoridades.", "Porque convierten todo caso en crimen de lesa humanidad."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye autoridades forenses ni impone metodologías obligatorias a las familias.", ["No puede utilizar análisis geoespacial avanzado.", "No puede integrar información oral o comunitaria.", "No puede producir expedientes internacionalizables."]),
  q("¿Qué característica vuelve más útil una narrativa de desaparición?", "Precisión temporal, contexto territorial, relaciones verificables y delimitación clara de hechos.", ["Carga emocional intensa y difusión pública inmediata.", "Cantidad de personas entrevistadas informalmente.", "Uso predominante de hipótesis interpretativas."]),
  q("¿Qué riesgo existe al publicar coordenadas exactas de posibles fosas clandestinas?", "Exponer evidencia, familias y sitios sensibles a alteración, destrucción o represalias.", ["Reducir interoperabilidad con sistemas GIS.", "Impedir el uso de hashing criptográfico.", "Anular automáticamente valor probatorio internacional."]),
  q("¿Qué papel cumple la IA dentro del módulo?", "Asistir en organización, correlación y documentación sin sustituir decisiones humanas ni familiares.", ["Determinar automáticamente identidad de restos humanos.", "Emitir conclusiones periciales definitivas.", "Priorizar casos según impacto mediático."]),
  q("¿Qué característica fortalece más la trazabilidad de un hallazgo?", "Registro de origen, fecha, ubicación, responsables de documentación y control de integridad.", ["Difusión simultánea en múltiples plataformas digitales.", "Respaldo comunitario no documentado.", "Clasificación narrativa preliminar del hallazgo."]),
  q("¿Qué práctica evita la revictimización durante entrevistas a familias?", "Consentimiento informado, enfoque sensible al trauma y control de exposición pública.", ["Repetir entrevistas para confirmar consistencia emocional.", "Solicitar reconstrucciones gráficas obligatorias.", "Priorizar entrevistas colectivas abiertas."]),
  q("¿Qué hace técnicamente relevante un objeto encontrado en búsqueda territorial?", "Su relación contextual verificable con patrones, ubicación, temporalidad y otros indicios.", ["El nivel de deterioro físico del objeto.", "La cantidad de personas presentes durante el hallazgo.", "La cobertura mediática posterior del descubrimiento."]),
  q("¿Qué diferencia existe entre memoria testimonial y documentación forense?", "La documentación preserva contexto, trazabilidad y estructura verificable compatible con análisis técnico.", ["La memoria testimonial carece de valor probatorio potencial.", "La documentación forense requiere exclusivamente autoridades oficiales.", "La memoria testimonial solo sirve para acompañamiento psicológico."]),
  q("¿Qué criterio vuelve más robusta una correlación entre desapariciones?", "Coincidencias temporales, territoriales, operativas y contextuales sustentadas por evidencia convergente.", ["Difusión simultánea de los casos en medios nacionales.", "Percepción comunitaria de inseguridad regional.", "Existencia de denuncias anónimas sin clasificación."]),
  q("¿Qué función cumplen los sellos de tiempo verificables?", "Demostrar existencia documentada de evidencia en un momento determinado sin alteración posterior.", ["Validar automáticamente autenticidad material del hallazgo.", "Sustituir peritajes físicos especializados.", "Garantizar identificación positiva de restos."]),
  q("¿Qué riesgo metodológico existe al mezclar casos sin delimitación territorial clara?", "Generar asociaciones artificiales que debilitan análisis de patrones reales.", ["Reducir compatibilidad con sistemas de IA documental.", "Impedir clasificación internacional del expediente.", "Eliminar utilidad estadística de testimonios."]),
  q("¿Qué hace internacionalmente relevante un expediente de desaparición?", "Demostrar patrones sistemáticos, omisiones institucionales y documentación consistente de búsqueda.", ["Existencia de cobertura mediática internacional sostenida.", "Participación de organizaciones extranjeras en búsquedas.", "Difusión pública masiva de testimonios familiares."]),
  q("¿Por qué el conocimiento territorial comunitario tiene valor técnico?", "Porque aporta contexto operativo, rutas, patrones locales y referencias espaciales no institucionalizadas.", ["Porque sustituye automáticamente peritajes especializados.", "Porque elimina necesidad de validación documental.", "Porque convierte testimonios en evidencia concluyente."]),
  q("¿Qué característica hace más útil un expediente para fiscalías o mecanismos internacionales?", "Estructura clara, anexos probatorios, trazabilidad y delimitación precisa de hechos y omisiones.", ["Extensión narrativa amplia y emocional.", "Número elevado de testimonios indirectos.", "Aprobación comunitaria mayoritaria del contenido."]),
  q("¿Qué práctica protege mejor evidencia digital sensible?", "Cifrado robusto, control de acceso y separación entre información pública y reservada.", ["Publicación distribuida en servidores abiertos.", "Conversión automática de archivos a formatos públicos.", "Anonimización exclusivamente visual."]),
  q("¿Qué elemento fortalece un análisis de contexto territorial?", "Cruzar desapariciones, dinámicas criminales, omisiones institucionales y patrones geográficos.", ["Priorizar únicamente tasas oficiales de criminalidad.", "Usar exclusivamente percepción ciudadana regional.", "Comparar únicamente datos históricos nacionales."]),
  q("¿Qué riesgo existe si las familias pierden control sobre su información?", "Exposición indebida, pérdida de confianza y vulnerabilidad frente a criminalización o represalias.", ["Incompatibilidad automática con sistemas internacionales.", "Reducción de precisión geoespacial de expedientes.", "Imposibilidad de usar análisis temporal avanzado."]),
  q("¿Qué hace técnicamente sólido un registro de hallazgo?", "Descripción contextual, evidencia visual controlada, ubicación precisa y preservación de integridad.", ["Difusión inmediata en plataformas sociales.", "Narrativa testimonial extensa sin delimitación factual.", "Clasificación emocional del hallazgo por familiares."]),
  q("¿Qué función cumplen los Comités de Ciudadanos Expertos?", "Validar metodologías, revisar consistencia probatoria y fortalecer rigurosidad técnica de expedientes.", ["Determinar responsabilidad penal de autoridades.", "Autorizar judicialmente búsquedas territoriales.", "Sustituir servicios periciales estatales."]),
  q("¿Qué diferencia existe entre búsqueda humanitaria y búsqueda forense?", "La forense prioriza preservación técnica y valor probatorio además de localización.", ["La humanitaria carece de relevancia jurídica.", "La forense solo puede realizarla personal estatal.", "La humanitaria excluye análisis territoriales."]),
  q("¿Qué vuelve vulnerable una base de datos de desapariciones?", "Ausencia de control de versiones, protección de identidad y validación contextual.", ["Uso de múltiples idiomas en registros.", "Existencia de categorías territoriales complejas.", "Participación de organizaciones independientes."]),
  q("¿Qué característica mejora la correlación entre objetos, restos y casos?", "Normalización documental, clasificación contextual y referencias cruzadas verificables.", ["Publicación abierta de todos los hallazgos.", "Agrupación territorial basada en rumores locales.", "Priorización de objetos mediáticamente relevantes."]),
  q("¿Qué principio limita la publicación de imágenes sensibles?", "Dignidad humana, protección de familias y prevención de revictimización.", ["Neutralidad tecnológica documental.", "Obligación de transparencia absoluta.", "Compatibilidad con sistemas internacionales de archivo."]),
  q("¿Qué vuelve más útil un informe internacional sobre desapariciones?", "Patrones verificables, evidencia contextualizada y documentación consistente de omisiones estatales.", ["Cantidad de organizaciones firmantes.", "Cobertura mediática internacional del caso.", "Número de testimonios recopilados sin clasificación."]),
  q("¿Cuál es el principio rector del Módulo 5?", "Garantizar que cada búsqueda, hallazgo y ausencia quede preservada con dignidad, memoria y valor probatorio.", ["Sustituir institucionalmente fiscalías y comisiones de búsqueda.", "Centralizar nacionalmente todas las búsquedas ciudadanas.", "Automatizar identificación forense mediante inteligencia artificial."]),
]);
const preguntasTecnicasModulo06 = adaptarBancoTecnico([
  q("¿Qué elemento distingue un dictamen técnico cívico de una sentencia judicial formal?", "El dictamen carece de coerción ejecutoria, aunque mantiene razonamiento jurídico estructurado y trazabilidad probatoria.", ["El dictamen no puede utilizar estándares constitucionales ni jurisprudenciales.", "La sentencia siempre requiere votación ciudadana previa.", "El dictamen solo puede emitirse en controversias privadas."]),
  q("¿Cuál es el principal riesgo metodológico de omitir la delimitación precisa del objeto controvertido?", "Expandir artificialmente el análisis y contaminar etapas posteriores de valoración jurídica y probatoria.", ["Reducir interoperabilidad con mecanismos internacionales.", "Invalidar automáticamente cualquier evidencia documental.", "Eliminar posibilidad de mediación voluntaria posterior."]),
  q("¿Qué práctica fortalece más la imparcialidad técnica de un comité jurídico colegiado?", "Contraste deliberativo entre especialistas independientes con control explícito de conflictos de interés.", ["Rotación aleatoria diaria de todos los integrantes.", "Exclusión de perfiles con experiencia jurisdiccional previa.", "Sustitución de deliberación humana por consenso automatizado."]),
  q("¿Qué función cumple la fase de fijación de hechos?", "Ordenar cronológicamente hechos relevantes vinculándolos explícitamente con evidencia verificable.", ["Definir automáticamente responsabilidad jurídica preliminar.", "Eliminar contradicciones testimoniales mediante síntesis narrativa.", "Priorizar argumentos constitucionales sobre evidencia documental."]),
  q("¿Por qué el módulo evita conocer casos en trámite sin consentimiento?", "Para no interferir procesalmente ni comprometer independencia judicial o derechos de las partes.", ["Porque la documentación privada carece de utilidad técnica.", "Porque solo pueden analizarse casos concluidos judicialmente.", "Porque los sistemas de IA no pueden procesar expedientes abiertos."]),
  q("¿Qué vuelve técnicamente sólido un análisis de convencionalidad?", "Contrastar normas internas con tratados, criterios internacionales y obligaciones estatales aplicables.", ["Priorizar estándares extranjeros sobre Constitución nacional.", "Aplicar automáticamente precedentes internacionales no vinculantes.", "Excluir jurisprudencia local para evitar sesgo nacional."]),
  q("¿Qué característica hace más útil una matriz probatoria?", "Relacionar hechos específicos con evidencia concreta, nivel de consistencia y valoración argumentada.", ["Agrupar documentos por extensión narrativa.", "Clasificar pruebas según impacto mediático.", "Sustituir razonamiento jurídico mediante puntuación automática."]),
  q("¿Qué riesgo existe cuando la IA interpreta discrecionalmente hechos controvertidos?", "Introducir inferencias no verificables que comprometan imparcialidad y trazabilidad del razonamiento.", ["Reducir velocidad de emisión de dictámenes.", "Eliminar necesidad de cronologías procesales.", "Impedir aplicación de análisis constitucional."]),
  q("¿Qué criterio fortalece más un dictamen sobre denegación de justicia?", "Documentar dilación excesiva, falta de independencia y afectación efectiva al acceso a tutela judicial.", ["Identificar desacuerdo ciudadano con resoluciones judiciales.", "Comparar duración de procesos con encuestas públicas.", "Demostrar politización mediática del caso."]),
  q("¿Cuál es el principal límite jurídico del módulo?", "No puede emitir resoluciones coercitivas ni sustituir formalmente funciones jurisdiccionales del Estado.", ["No puede analizar constitucionalidad de normas vigentes.", "No puede utilizar evidencia documental privada.", "No puede generar informes internacionalizables."]),
  q("¿Qué hace técnicamente consistente una valoración probatoria?", "Explicar pertinencia, confiabilidad, contradicciones y fuerza relativa de cada elemento analizado.", ["Priorizar pruebas documentales sobre testimoniales automáticamente.", "Aplicar modelos estadísticos sin revisión humana.", "Excluir evidencia indirecta en controversias complejas."]),
  q("¿Qué práctica reduce mejor el riesgo de sesgo deliberativo colegiado?", "Fundamentación escrita individual previa y revisión cruzada argumentativa entre integrantes.", ["Decisiones rápidas sin deliberación extensa.", "Centralización de análisis en un solo coordinador.", "Rotación permanente de criterios jurídicos aplicables."]),
  q("¿Qué elemento vuelve internacionalmente relevante un dossier jurídico cívico?", "Trazabilidad verificable, documentación de patrones y compatibilidad con estándares de acceso a justicia.", ["Ratificación política de organizaciones extranjeras.", "Difusión pública masiva del caso analizado.", "Existencia de litigio mediático simultáneo."]),
  q("¿Qué riesgo metodológico surge al mezclar análisis político con razonamiento jurídico técnico?", "Debilitar objetividad argumentativa y vulnerar credibilidad del dictamen frente a terceros.", ["Reducir velocidad de análisis documental.", "Eliminar compatibilidad con herramientas criptográficas.", "Impedir clasificación temporal de hechos."]),
  q("¿Qué característica fortalece más la transparencia procesal del módulo?", "Registro verificable de etapas, criterios aplicados y trazabilidad del razonamiento jurídico.", ["Publicación íntegra de datos personales de las partes.", "Difusión pública obligatoria de deliberaciones privadas.", "Eliminación periódica de versiones preliminares."]),
  q("¿Qué función cumple el análisis temporal automatizado?", "Construir cronologías coherentes y detectar inconsistencias entre hechos y evidencia.", ["Determinar automáticamente culpabilidad procesal.", "Sustituir valoración jurídica colegiada.", "Eliminar necesidad de delimitación de controversia."]),
  q("¿Qué hace más robusta una recomendación de cumplimiento normativo?", "Vincular riesgos jurídicos concretos con escenarios operativos y rutas verificables de actuación.", ["Priorizar criterios reputacionales sobre legales.", "Emitir conclusiones amplias sin delimitación factual.", "Basarse únicamente en precedentes internacionales."]),
  q("¿Qué característica diferencia una opinión jurídica técnica de asesoría política?", "La fundamentación normativa explícita y la trazabilidad argumentativa verificable.", ["La participación exclusiva de exjueces.", "La ausencia total de interpretación constitucional.", "La utilización obligatoria de jurisprudencia internacional."]),
  q("¿Qué vuelve vulnerable un expediente jurídico cívico frente a revisión externa?", "Ausencia de delimitación metodológica, motivación insuficiente y referencias normativas ambiguas.", ["Uso de análisis comparado internacional.", "Participación multidisciplinaria de expertos.", "Integración de cronologías verificables."]),
  q("¿Qué principio limita la participación ciudadana en casos individuales?", "Preservar independencia técnica y evitar presión popular indebida sobre deliberación jurídica.", ["Evitar transparencia sobre desempeño agregado.", "Reducir legitimidad democrática del módulo.", "Impedir control social metodológico."]),
  q("¿Qué función cumplen los sellos de tiempo y hashes criptográficos?", "Garantizar integridad documental y trazabilidad verificable de modificaciones en expedientes.", ["Determinar autenticidad material automática de pruebas.", "Sustituir revisión pericial de evidencia compleja.", "Resolver contradicciones testimoniales automáticamente."]),
  q("¿Qué vuelve metodológicamente sólido un análisis constitucional complejo?", "Contrastar hechos, principios, precedentes y efectos materiales bajo razonamiento motivado.", ["Aplicar interpretación literal exclusiva del texto constitucional.", "Priorizar opinión pública mayoritaria sobre jurisprudencia.", "Excluir estándares internacionales comparativos."]),
  q("¿Qué riesgo existe al acelerar excesivamente etapas procesales?", "Reducir calidad deliberativa y comprometer exhaustividad de valoración jurídica y probatoria.", ["Eliminar compatibilidad con arbitrajes internacionales.", "Impedir integración de evidencia documental.", "Anular automáticamente legitimidad técnica."]),
  q("¿Qué característica fortalece más la independencia técnica del módulo?", "Evaluación periódica de desempeño, control de conflictos y deliberación colegiada trazable.", ["Rotación obligatoria de todos los integrantes cada mes.", "Participación ciudadana directa en decisiones jurídicas.", "Centralización interpretativa en coordinadores únicos."]),
  q("¿Qué vuelve más útil un informe jurídico exportable?", "Compatibilidad metodológica con estándares internacionales y estructura verificable de razonamiento.", ["Longitud extensa y narrativa detallada.", "Participación exclusiva de académicos internacionales.", "Cobertura pública simultánea del caso."]),
  q("¿Qué criterio hace técnicamente consistente una admisión de asunto?", "Verificar competencia material, claridad del planteamiento y suficiencia mínima de información.", ["Priorizar controversias de alta relevancia mediática.", "Aceptar cualquier asunto para evitar exclusión ciudadana.", "Determinar responsabilidad preliminar antes de admisión."]),
  q("¿Qué problema surge cuando los hechos acreditados no se separan de hipótesis interpretativas?", "Confusión argumentativa que debilita motivación y consistencia del dictamen.", ["Reducción de velocidad de clasificación documental.", "Imposibilidad de generar cronologías automatizadas.", "Incompatibilidad con estándares de mediación."]),
  q("¿Qué característica hace más útil un análisis comparado internacional?", "Contextualizar similitudes institucionales y efectos prácticos antes de trasladar criterios jurídicos.", ["Aplicar precedentes extranjeros automáticamente.", "Priorizar sistemas judiciales con mayor digitalización.", "Excluir criterios nacionales potencialmente contradictorios."]),
  q("¿Qué práctica protege mejor datos sensibles dentro del módulo?", "Separación entre identidad y contenido, cifrado robusto y control granular de acceso.", ["Publicación parcial de expedientes para auditoría abierta.", "Anonimización exclusivamente nominal de documentos.", "Difusión agregada de cronologías procesales completas."]),
  q("¿Cuál es el principio rector del Módulo 6?", "Producir justicia técnica rápida, fundada y colegiada sin coerción ni ruptura constitucional.", ["Sustituir progresivamente al Poder Judicial formal.", "Automatizar interpretación jurídica mediante inteligencia artificial.", "Convertir dictámenes ciudadanos en sentencias vinculantes."]),
]);
const preguntasTecnicasModulo07 = adaptarBancoTecnico([
  q("¿Qué distingue a un Tribunal de Alta Integridad de un tribunal jurisdiccional formal?", "Produce análisis técnicos colegiados y no coercitivos sin facultad de ejecutar ni revocar resoluciones.", ["Opera exclusivamente con estándares internacionales y no nacionales.", "Sustituye funciones de control constitucional tradicional.", "Resuelve controversias privadas mediante arbitraje obligatorio."]),
  q("¿Qué riesgo institucional surge cuando no existe escrutinio técnico externo sobre resoluciones estructurales?", "Normalización de inconsistencias argumentativas y debilitamiento progresivo de legitimidad institucional.", ["Desaparición automática del principio de división de poderes.", "Imposibilidad de aplicar precedentes internacionales.", "Reducción de participación ciudadana en procesos electorales."]),
  q("¿Qué elemento fortalece más la integridad metodológica de un dictamen colegiado?", "Documentar razonamientos individuales, votos concurrentes y criterios de contraste utilizados.", ["Mantener confidencialidad absoluta de deliberaciones técnicas.", "Reducir número de integrantes para agilizar consensos.", "Excluir posiciones disidentes para preservar coherencia."]),
  q("¿Por qué la rotación obligatoria por asunto reduce riesgos de captura?", "Porque impide consolidación de bloques estables y relaciones permanentes de influencia.", ["Porque elimina necesidad de declaraciones de conflicto de interés.", "Porque sustituye controles metodológicos colegiados.", "Porque garantiza unanimidad técnica en todos los casos."]),
  q("¿Qué característica vuelve técnicamente sólido un análisis de proporcionalidad constitucional?", "Examinar idoneidad, necesidad y balance entre restricción de derechos y finalidad perseguida.", ["Priorizar estabilidad política sobre libertades fundamentales.", "Aplicar automáticamente precedentes internacionales similares.", "Reducir análisis a interpretación literal normativa."]),
  q("¿Qué función cumple una matriz de consistencia jurisprudencial?", "Comparar razonamiento, precedentes y desviaciones argumentativas de forma verificable.", ["Determinar automáticamente nulidad de resoluciones.", "Sustituir deliberación jurídica colegiada.", "Clasificar votos judiciales por afinidad ideológica."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No ejerce coerción ni sustituye órganos jurisdiccionales constitucionalmente establecidos.", ["No puede analizar casos electorales complejos.", "No puede emitir informes internacionales comparativos.", "No puede utilizar IA en análisis argumentativo."]),
  q("¿Qué hace metodológicamente robusta una crítica a una resolución judicial?", "Fundamentar inconsistencias mediante evidencia documental, precedentes y razonamiento explícito.", ["Respaldar el análisis con mayoría ciudadana.", "Priorizar impacto político de la resolución.", "Utilizar únicamente interpretación doctrinal académica."]),
  q("¿Qué riesgo surge cuando la IA genera conclusiones jurídicas sin supervisión humana?", "Introducir inferencias normativas no verificadas y erosionar trazabilidad del razonamiento.", ["Reducir velocidad de revisión documental.", "Eliminar necesidad de matrices probatorias.", "Impedir análisis comparado internacional."]),
  q("¿Qué elemento fortalece más la legitimidad pública de un Tribunal de Alta Integridad?", "Publicidad trazable del razonamiento técnico y diversidad colegiada verificable.", ["Designación permanente de especialistas reconocidos.", "Participación ciudadana directa en deliberaciones internas.", "Capacidad de emitir sanciones reputacionales obligatorias."]),
  q("¿Qué diferencia existe entre legalidad formal e integridad constitucional efectiva?", "La integridad evalúa coherencia sustantiva con principios democráticos además del cumplimiento procedimental.", ["La legalidad formal excluye cualquier control de derechos humanos.", "La integridad constitucional sustituye el texto constitucional vigente.", "Ambas categorías son equivalentes en todo análisis judicial."]),
  q("¿Qué característica hace más sólida una alerta temprana de regresión institucional?", "Identificar recurrencias sistemáticas de desviación argumentativa y debilitamiento de controles democráticos.", ["Documentar desacuerdos políticos mediáticos recurrentes.", "Priorizar percepción pública de polarización.", "Comparar exclusivamente índices internacionales generales."]),
  q("¿Qué función cumple la revisión de competencia y procedimiento?", "Verificar que la autoridad actuó dentro de facultades y conforme a reglas aplicables.", ["Determinar automáticamente validez material de la resolución.", "Reemplazar control de convencionalidad posterior.", "Excluir cualquier análisis de razonabilidad."]),
  q("¿Qué práctica reduce mejor riesgos de sesgo metodológico?", "Deliberación secuencial con análisis individuales previos y contraste colegiado documentado.", ["Centralizar conclusiones en coordinadores permanentes.", "Eliminar votos disidentes para preservar estabilidad.", "Rotar criterios constitucionales por consenso político."]),
  q("¿Qué vuelve técnicamente relevante una ruptura con precedentes?", "La ausencia de motivación suficiente para justificar cambio interpretativo sustancial.", ["La existencia de críticas públicas a la resolución.", "La novedad política del asunto controvertido.", "La utilización de estándares comparados extranjeros."]),
  q("¿Qué característica fortalece más la auditabilidad del sistema?", "Registro trazable de versiones, deliberaciones, votos y fundamentos utilizados.", ["Publicación exclusiva de conclusiones finales resumidas.", "Limitación de acceso a razonamientos concurrentes.", "Anonimización completa de integrantes colegiados."]),
  q("¿Qué criterio justifica requerir mayoría calificada para inconsistencias fuertes?", "Asegurar consenso técnico robusto sin imponer unanimidad artificial.", ["Reducir participación de especialistas minoritarios.", "Evitar deliberación extensa en asuntos sensibles.", "Concentrar poder decisorio en perfiles senior."]),
  q("¿Qué función cumplen los votos concurrentes y disidentes?", "Hacer visible diversidad argumentativa y fortalecer transparencia del razonamiento colegiado.", ["Debilitar legitimidad institucional del tribunal.", "Permitir apelación automática de dictámenes.", "Sustituir necesidad de conclusiones colegiadas."]),
  q("¿Qué vuelve metodológicamente sólido un análisis electoral estructural?", "Contrastar representación efectiva, financiamiento, equidad y consistencia normativa verificable.", ["Priorizar percepción pública de legitimidad electoral.", "Comparar únicamente resultados numéricos finales.", "Analizar exclusivamente jurisprudencia nacional reciente."]),
  q("¿Qué característica diferencia observación técnica de opinión política?", "Fundamentación explícita, metodología reproducible y delimitación clara de supuestos analizados.", ["Participación exclusiva de académicos internacionales.", "Publicación simultánea en medios especializados.", "Uso predominante de lenguaje constitucional abstracto."]),
  q("¿Qué hace más útil un informe internacional exportable?", "Compatibilidad metodológica con estándares comparados y trazabilidad verificable de evidencia.", ["Extensión narrativa amplia y lenguaje diplomático.", "Participación de observadores mediáticos extranjeros.", "Número elevado de firmas institucionales."]),
  q("¿Qué riesgo existe cuando se personaliza el análisis técnico fuera de marcos legales?", "Transformar contraste institucional en persecución individual y debilitar legitimidad metodológica.", ["Reducir velocidad de análisis colegiado.", "Eliminar interoperabilidad con sistemas de IA.", "Impedir clasificación comparada de precedentes."]),
  q("¿Qué función cumplen los hashes criptográficos y sellos de tiempo?", "Preservar integridad documental y trazabilidad verificable de expedientes y versiones.", ["Determinar autenticidad material automática de resoluciones.", "Sustituir revisión humana de razonamiento jurídico.", "Resolver contradicciones entre precedentes."]),
  q("¿Qué característica fortalece la independencia técnica de los integrantes?", "Evaluación periódica, conflictos de interés públicos y ausencia de presidencias permanentes.", ["Nombramientos vitalicios para preservar estabilidad.", "Participación ciudadana directa en deliberaciones.", "Centralización metodológica en un coordinador único."]),
  q("¿Qué hace técnicamente consistente un análisis administrativo de política pública?", "Relacionar competencia legal, razonabilidad presupuestal y efectos materiales verificables.", ["Priorizar aceptación pública de la política analizada.", "Comparar exclusivamente niveles de gasto histórico.", "Limitar revisión a cumplimiento procedimental formal."]),
  q("¿Qué problema surge cuando se expanden prematuramente las competencias del sistema?", "Diluir calidad metodológica y aumentar riesgos de captura o inconsistencia colegiada.", ["Eliminar compatibilidad con estándares internacionales.", "Impedir integración de nuevos especialistas.", "Reducir capacidad de documentación probatoria."]),
  q("¿Qué criterio fortalece más el control de razonabilidad judicial?", "Examinar coherencia entre hechos acreditados, argumentos y consecuencias institucionales previsibles.", ["Aplicar precedentes históricos de manera automática.", "Priorizar estabilidad política sobre derechos fundamentales.", "Excluir consideraciones de impacto práctico."]),
  q("¿Qué práctica protege mejor la legitimidad democrática del módulo?", "Separar participación ciudadana agregada de deliberación técnica en casos concretos.", ["Permitir votaciones abiertas sobre resoluciones específicas.", "Centralizar decisiones en expertos senior permanentes.", "Someter dictámenes a aprobación partidista externa."]),
  q("¿Qué característica hace más útil una comparación internacional judicial?", "Contextualizar diferencias institucionales antes de trasladar estándares o precedentes comparados.", ["Aplicar automáticamente modelos extranjeros exitosos.", "Excluir jurisprudencia nacional potencialmente divergente.", "Priorizar sistemas con mayor digitalización judicial."]),
  q("¿Cuál es el principio rector del Módulo 7?", "Fortalecer democracia y Estado de derecho mediante contraste jurídico técnico, público y no coercitivo.", ["Sustituir gradualmente tribunales constitucionales formales.", "Automatizar control constitucional mediante inteligencia artificial.", "Convertir dictámenes ciudadanos en precedentes vinculantes."]),
]);
const preguntasTecnicasModulo08 = adaptarBancoTecnico([
  q("¿Qué característica convierte un análisis presupuestal ciudadano en una auditoría técnica utilizable?", "Trazabilidad documental, comparación metodológica y vinculación explícita entre gasto, objetivos y riesgos.", ["Aprobación mayoritaria de la ciudadanía afectada.", "Cobertura mediática permanente del proyecto.", "Publicación inmediata de contratos sin análisis contextual."]),
  q("¿Qué indicador sugiere mayor riesgo de sobrecosto estructural en obra pública?", "Modificaciones recurrentes de alcance acompañadas de adjudicaciones concentradas y ampliaciones presupuestales sucesivas.", ["Existencia de múltiples subcontratistas locales.", "Duración extensa de ejecución física.", "Incremento generalizado de inflación anual."]),
  q("¿Cuál es el principal límite jurídico del módulo?", "No puede sustituir autoridades ejecutivas ni imponer coerción administrativa o presupuestal.", ["No puede analizar programas sociales federales.", "No puede emitir alertas de riesgo financiero.", "No puede utilizar evidencia ciudadana complementaria."]),
  q("¿Qué vuelve técnicamente sólida una evaluación comparativa de infraestructura?", "Contrastar costos, impacto, demanda proyectada y desempeño histórico de proyectos equivalentes.", ["Priorizar proyectos con mayor respaldo político regional.", "Comparar únicamente montos presupuestales nominales.", "Excluir proyectos internacionales por diferencias regulatorias."]),
  q("¿Qué riesgo existe cuando un municipio concentra contrataciones en pocos proveedores recurrentes?", "Aumentar probabilidad de colusión, captura contractual y reducción efectiva de competencia.", ["Reducir automáticamente eficiencia administrativa.", "Eliminar posibilidad de supervisión técnica externa.", "Impedir auditorías financieras tradicionales."]),
  q("¿Qué función cumple el voto informado dentro del módulo?", "Documentar voluntad social contextualizada sin sustituir decisiones legales o administrativas formales.", ["Autorizar jurídicamente ejecución de proyectos locales.", "Sustituir procedimientos constitucionales de contratación.", "Determinar responsabilidad administrativa individual."]),
  q("¿Qué hace metodológicamente robusta una alerta temprana de riesgo financiero?", "Correlacionar endeudamiento, presión presupuestal, ingresos proyectados y obligaciones contingentes.", ["Identificar únicamente déficit presupuestales anuales.", "Comparar deuda pública con percepción ciudadana.", "Priorizar gasto operativo sobre inversión pública."]),
  q("¿Qué riesgo metodológico surge al analizar presupuestos sin contexto territorial?", "Perder capacidad de evaluar congruencia entre gasto y necesidades reales de la población afectada.", ["Reducir interoperabilidad con sistemas GIS.", "Eliminar trazabilidad criptográfica documental.", "Impedir clasificación automática de contratos."]),
  q("¿Qué práctica fortalece más la legitimidad técnica de los comités?", "Separar análisis especializado de preferencias políticas y documentar criterios metodológicos explícitos.", ["Mantener integración permanente de los mismos expertos.", "Someter conclusiones técnicas a votación pública directa.", "Excluir perfiles con experiencia gubernamental previa."]),
  q("¿Qué característica vuelve más útil un mapa de impacto territorial?", "Relacionar afectaciones sociales, ambientales y presupuestales con evidencia georreferenciada verificable.", ["Visualizar exclusivamente zonas con mayor densidad poblacional.", "Representar únicamente proyectos de alto presupuesto.", "Excluir variables ambientales para evitar sesgos regulatorios."]),
  q("¿Qué diferencia existe entre apoyo ciudadano documentado y legitimidad jurídica?", "El apoyo refleja validación social; la legitimidad jurídica depende del marco normativo aplicable.", ["La legitimidad jurídica depende exclusivamente de participación ciudadana.", "El apoyo documentado sustituye requisitos administrativos.", "Ambos conceptos producen efectos vinculantes equivalentes."]),
  q("¿Qué práctica reduce mejor riesgo de manipulación de datos presupuestales?", "Versionado verificable, hashing criptográfico y trazabilidad pública de modificaciones.", ["Publicación de presupuestos únicamente en PDF.", "Centralización documental en servidores internos.", "Anonimización de responsables administrativos."]),
  q("¿Qué hace internacionalmente relevante un informe de gobernanza local?", "Demostrar patrones verificables de transparencia, riesgo o desviación administrativa comparables internacionalmente.", ["Contar con observadores extranjeros permanentes.", "Difundir reportes en múltiples idiomas.", "Incluir únicamente métricas financieras globales."]),
  q("¿Qué característica fortalece más un análisis de endeudamiento municipal?", "Evaluar sostenibilidad fiscal, capacidad de pago y dependencia de ingresos extraordinarios.", ["Comparar deuda nominal con municipios vecinos.", "Priorizar volumen de obra pública ejecutada.", "Analizar exclusivamente obligaciones bancarias directas."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Estructurar información, detectar patrones de riesgo y acelerar auditoría documental sin decidir.", ["Aprobar automáticamente proyectos de bajo riesgo.", "Determinar responsabilidad administrativa individual.", "Sustituir deliberación de expertos financieros."]),
  q("¿Qué riesgo existe cuando programas sociales carecen de métricas verificables?", "Impedir evaluación objetiva de impacto y facilitar discrecionalidad política o presupuestal.", ["Reducir participación ciudadana territorial.", "Eliminar capacidad de georreferenciación.", "Impedir clasificación jurídica administrativa."]),
  q("¿Qué característica vuelve metodológicamente consistente un análisis ambiental local?", "Integrar externalidades, impacto acumulativo, mitigación y efectos territoriales verificables.", ["Priorizar crecimiento económico inmediato.", "Comparar exclusivamente emisiones directas estimadas.", "Excluir variables sociales para evitar complejidad."]),
  q("¿Qué problema surge cuando la ciudadanía vota sin información contextual suficiente?", "Transformar participación técnica en reacción emocional vulnerable a manipulación narrativa.", ["Reducir automáticamente legitimidad constitucional.", "Eliminar valor probatorio de los dictámenes.", "Impedir revisión posterior de proyectos."]),
  q("¿Qué hace técnicamente relevante una concesión pública?", "Su impacto financiero, regulatorio y territorial sobre bienes o servicios esenciales.", ["La duración contractual exclusivamente.", "La cantidad de participantes en la licitación.", "El nivel mediático del proyecto concesionado."]),
  q("¿Qué característica fortalece más la auditoría ciudadana en tiempo real?", "Acceso continuo a datos estructurados, comparables y verificables durante ejecución del gasto.", ["Publicación anual de informes consolidados.", "Difusión exclusiva mediante medios oficiales.", "Centralización de análisis en órganos técnicos."]),
  q("¿Qué práctica reduce mejor riesgo de captura política de los comités?", "Rotación metodológica, transparencia de conflictos y deliberación técnica colegiada.", ["Exclusión total de exfuncionarios públicos.", "Participación ciudadana directa en dictámenes técnicos.", "Concentración decisoria en especialistas senior."]),
  q("¿Qué diferencia existe entre inviabilidad técnica e impopularidad política?", "La inviabilidad surge de restricciones objetivas verificables; la impopularidad depende de percepción social.", ["Ambas categorías producen efectos administrativos equivalentes.", "La impopularidad invalida automáticamente proyectos públicos.", "La inviabilidad solo puede determinarla autoridad judicial."]),
  q("¿Qué hace más útil un análisis comparativo de políticas públicas?", "Evaluar desempeño real, costos y resultados en contextos institucionales comparables.", ["Aplicar automáticamente modelos internacionales exitosos.", "Comparar únicamente gasto per cápita.", "Excluir proyectos con diferencias regulatorias."]),
  q("¿Qué función cumplen los registros inmutables en auditoría cívica?", "Preservar historial verificable de documentos, modificaciones y decisiones metodológicas.", ["Determinar autenticidad material automática de contratos.", "Sustituir auditorías financieras tradicionales.", "Resolver contradicciones presupuestales automáticamente."]),
  q("¿Qué riesgo existe cuando un proyecto depende de proyecciones financieras irreales?", "Generar sostenibilidad artificial y trasladar costos futuros no documentados a la población.", ["Reducir participación ciudadana territorial.", "Eliminar trazabilidad documental del presupuesto.", "Impedir evaluación ambiental posterior."]),
  q("¿Qué característica vuelve más robusta una evaluación de obra pública?", "Relacionar costo, utilidad social, mantenimiento proyectado y riesgos de ejecución verificables.", ["Priorizar magnitud física de la infraestructura.", "Comparar exclusivamente tiempos de construcción.", "Valorar principalmente aceptación mediática."]),
  q("¿Qué criterio fortalece más el análisis de congruencia legal?", "Contrastar actos administrativos con marco normativo, competencia y finalidad pública explícita.", ["Comparar decisiones con preferencias electorales locales.", "Priorizar viabilidad política sobre legalidad.", "Aplicar criterios internacionales de forma automática."]),
  q("¿Qué problema surge cuando no se documentan alternativas técnicas?", "Limitar capacidad de comparación objetiva y favorecer decisiones discrecionales poco justificadas.", ["Reducir velocidad de votación ciudadana.", "Impedir clasificación presupuestal automatizada.", "Eliminar compatibilidad con estándares internacionales."]),
  q("¿Qué vuelve técnicamente consistente una alerta de corrupción sistémica?", "Detectar patrones repetitivos de adjudicación, sobrecosto y opacidad documental verificable.", ["Existencia de denuncias anónimas no corroboradas.", "Percepción pública negativa sobre autoridades locales.", "Cobertura mediática intensa de contratos específicos."]),
  q("¿Cuál es el principio rector del Módulo 8?", "Fortalecer vigilancia técnica ciudadana sobre decisiones locales sin sustituir instituciones constitucionales.", ["Centralizar aprobación presupuestal en ciudadanía digital.", "Convertir auditorías cívicas en sanciones ejecutorias.", "Automatizar evaluación gubernamental mediante IA."]),
]);
const preguntasTecnicasModulo09 = adaptarBancoTecnico([
  q("¿Qué elemento convierte una coincidencia profesional en un posible conflicto de interés estructural?", "La correlación verificable entre decisiones públicas y beneficios recurrentes vinculados a relaciones previas o futuras.", ["La existencia de relaciones personales entre funcionarios.", "La participación de empresas privadas en procesos regulatorios.", "El cambio frecuente de empleo entre sectores."]),
  q("¿Qué característica hace metodológicamente sólida una alerta temprana de puerta giratoria?", "La identificación longitudinal de trayectorias, decisiones regulatorias y beneficios correlacionados verificables.", ["La existencia de cobertura mediática internacional.", "La presencia de denuncias anónimas múltiples.", "La percepción pública negativa sobre funcionarios."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No puede sancionar ni imputar responsabilidades jurídicas individuales.", ["No puede analizar registros mercantiles públicos.", "No puede utilizar modelos de análisis de redes.", "No puede generar expedientes de memoria institucional."]),
  q("¿Qué vuelve técnicamente relevante un patrón de captura regulatoria?", "La repetición consistente de decisiones favorables concentradas en actores con vínculos verificables.", ["La existencia de reuniones privadas entre funcionarios.", "El tamaño económico del sector regulado.", "La alternancia política en órganos administrativos."]),
  q("¿Qué función cumple el análisis agregado y longitudinal?", "Distinguir recurrencias estructurales de coincidencias aisladas mediante comparación temporal y contextual.", ["Eliminar necesidad de validación metodológica.", "Sustituir auditorías administrativas tradicionales.", "Determinar automáticamente responsabilidad penal."]),
  q("¿Qué riesgo existe cuando el análisis ético se personaliza excesivamente?", "Transformar evaluación estructural en persecución individual debilitando legitimidad técnica.", ["Reducir precisión de análisis geoespacial.", "Eliminar trazabilidad documental de contratos.", "Impedir clasificación automatizada de riesgos."]),
  q("¿Qué característica fortalece más un mapa de redes de influencia?", "Relaciones verificables entre trayectorias, contratos, decisiones y vínculos societarios documentados.", ["Número elevado de nodos institucionales.", "Participación simultánea de actores internacionales.", "Cobertura periodística sostenida del caso."]),
  q("¿Qué hace técnicamente consistente un expediente de riesgo ético?", "Integrar evidencia documental, contexto institucional y metodología explícita de correlación.", ["Acumular denuncias ciudadanas no verificadas.", "Priorizar impacto mediático sobre trazabilidad.", "Utilizar únicamente declaraciones patrimoniales."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Detectar recurrencias, mapear relaciones y organizar evidencia sin concluir culpabilidad.", ["Emitir sanciones reputacionales automatizadas.", "Determinar intencionalidad subjetiva de funcionarios.", "Sustituir deliberación de expertos en ética pública."]),
  q("¿Qué característica vuelve más útil una visualización de captura institucional?", "Mostrar relaciones estructurales verificables sin exponer datos personales innecesarios.", ["Representar únicamente relaciones directas documentadas judicialmente.", "Priorizar complejidad gráfica sobre claridad interpretativa.", "Excluir vínculos societarios indirectos."]),
  q("¿Qué criterio fortalece más la prevención de conflictos de interés?", "Transparencia ex ante sobre trayectorias, vínculos y potenciales incompatibilidades decisionales.", ["Publicación anual agregada de contratos públicos.", "Rotación administrativa permanente de funcionarios.", "Limitación absoluta de experiencia privada previa."]),
  q("¿Qué diferencia existe entre conflicto de interés y corrupción consumada?", "El conflicto identifica riesgo estructural potencial; la corrupción implica conducta ilícita acreditada.", ["Ambos conceptos requieren sentencia judicial firme.", "La corrupción puede existir sin decisiones públicas.", "El conflicto de interés siempre constituye delito."]),
  q("¿Qué vuelve internacionalmente relevante un informe de integridad pública?", "Documentar riesgos estructurales comparables conforme a estándares multilaterales de gobernanza.", ["Difundir reportes en múltiples idiomas.", "Participación de medios internacionales especializados.", "Número de instituciones nacionales analizadas."]),
  q("¿Qué riesgo metodológico surge al usar datos abiertos sin validación contextual?", "Generar asociaciones artificiales o interpretaciones erróneas de relaciones institucionales.", ["Reducir compatibilidad con sistemas blockchain.", "Eliminar trazabilidad criptográfica documental.", "Impedir clasificación de contratos administrativos."]),
  q("¿Qué característica fortalece más una alerta de captura regulatoria?", "Coincidencias repetidas entre decisiones normativas y beneficios concentrados verificables.", ["Cambios frecuentes en liderazgo político.", "Existencia de lobby empresarial documentado.", "Participación de organismos internacionales."]),
  q("¿Qué práctica protege mejor legitimidad metodológica del módulo?", "Separar análisis técnico de valoraciones políticas o ideológicas.", ["Excluir completamente análisis económicos.", "Evitar participación ciudadana contextual.", "Limitar revisión a declaraciones patrimoniales."]),
  q("¿Qué característica vuelve más sólido un análisis de trayectorias públicas y privadas?", "Relacionar temporalidad, competencia institucional y decisiones relevantes documentadas.", ["Priorizar antigüedad profesional acumulada.", "Comparar únicamente ingresos declarados.", "Analizar exclusivamente relaciones corporativas directas."]),
  q("¿Qué problema surge cuando no existen registros públicos trazables de decisiones?", "Dificultar auditoría retrospectiva y análisis consistente de integridad institucional.", ["Reducir participación ciudadana en auditorías.", "Eliminar posibilidad de cooperación internacional.", "Impedir clasificación sectorial de riesgos."]),
  q("¿Qué función cumplen los hashes criptográficos y registros inmutables?", "Preservar integridad y trazabilidad verificable de expedientes y versiones documentales.", ["Determinar autenticidad material automática de contratos.", "Sustituir controles humanos de auditoría.", "Resolver contradicciones administrativas automáticamente."]),
  q("¿Qué característica fortalece más un sistema de alerta temprana institucional?", "Capacidad de identificar patrones repetitivos antes de consolidación de captura estructural.", ["Volumen masivo de denuncias ciudadanas.", "Frecuencia mediática de casos individuales.", "Cantidad de organismos participantes."]),
  q("¿Qué criterio diferencia una coincidencia fortuita de un patrón estructural?", "La recurrencia sistemática acompañada de correlaciones verificables y continuidad temporal.", ["La gravedad pública de los casos analizados.", "La existencia de vínculos personales indirectos.", "La magnitud económica de contratos relacionados."]),
  q("¿Qué característica vuelve metodológicamente consistente un análisis comparado internacional?", "Contextualizar diferencias regulatorias antes de trasladar estándares de integridad pública.", ["Aplicar automáticamente modelos extranjeros exitosos.", "Priorizar países con menor percepción de corrupción.", "Excluir variables políticas nacionales."]),
  q("¿Qué riesgo existe cuando la ciudadanía interpreta alertas técnicas como culpabilidad definitiva?", "Confundir prevención estructural con imputación jurídica individual.", ["Reducir trazabilidad documental de expedientes.", "Eliminar utilidad comparativa internacional.", "Impedir análisis automatizado de recurrencias."]),
  q("¿Qué característica fortalece más la memoria institucional anticorrupción?", "Mantener registros longitudinales verificables de decisiones, vínculos y patrones recurrentes.", ["Publicar únicamente informes anuales resumidos.", "Eliminar información histórica de baja relevancia mediática.", "Centralizar documentación en organismos estatales."]),
  q("¿Qué hace técnicamente relevante un análisis de beneficiarios recurrentes?", "Identificar concentraciones sistemáticas de ventaja vinculadas a decisiones públicas verificables.", ["Comparar exclusivamente montos económicos absolutos.", "Priorizar contratos con mayor cobertura mediática.", "Analizar únicamente licitaciones federales."]),
  q("¿Qué práctica reduce mejor riesgo de captura metodológica de los comités?", "Pluralidad disciplinaria, revisión cruzada y transparencia sobre conflictos de interés.", ["Integración permanente de especialistas senior.", "Participación ciudadana directa en análisis individuales.", "Exclusión de expertos con experiencia pública previa."]),
  q("¿Qué vuelve más útil un análisis de concentración de contratos?", "Relacionar adjudicaciones repetidas con redes societarias y decisiones administrativas correlacionadas.", ["Comparar exclusivamente volumen financiero anual.", "Evaluar únicamente duración contractual.", "Priorizar percepción pública de corrupción."]),
  q("¿Qué problema surge cuando no se separan datos sensibles de información pública?", "Exposición indebida que puede vulnerar privacidad y debilitar legitimidad del análisis.", ["Reducir precisión de modelos predictivos.", "Eliminar trazabilidad documental institucional.", "Impedir interoperabilidad internacional."]),
  q("¿Qué característica fortalece más la utilidad preventiva del módulo?", "Detectar riesgos ex ante antes de consolidación irreversible de dinámicas de captura.", ["Emitir conclusiones públicas inmediatas.", "Priorizar casos con alta presión mediática.", "Centralizar decisiones en especialistas únicos."]),
  q("¿Cuál es el principio rector del Módulo 9?", "Proteger integridad pública mediante memoria institucional, análisis preventivo y evidencia verificable.", ["Sustituir órganos formales de control anticorrupción.", "Automatizar detección de corrupción mediante IA decisoria.", "Convertir alertas éticas en sanciones administrativas."]),
]);
const preguntasTecnicasModulo10 = adaptarBancoTecnico([
  q("¿Qué elemento convierte una Red Solidaria de Salud en un mecanismo técnicamente verificable y no asistencialista?", "La trazabilidad completa entre necesidad médica validada, origen del recurso, aplicación y resultado clínico documentado.", ["La participación exclusiva de hospitales privados certificados.", "La cobertura mediática de casos financiados.", "La existencia de donaciones internacionales recurrentes."]),
  q("¿Qué riesgo ético existe cuando una plataforma de salud digital prioriza visibilidad mediática sobre urgencia clínica?", "Distorsionar asignación de recursos y comprometer principios de equidad y priorización médica objetiva.", ["Reducir interoperabilidad con sistemas hospitalarios.", "Eliminar validez jurídica de recetas digitales.", "Impedir auditoría financiera del crowdfunding."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye al sistema público de salud ni ejerce actos médicos reservados fuera de protocolos permitidos.", ["No puede utilizar telemedicina en primer contacto.", "No puede financiar medicamentos especializados.", "No puede generar evidencia internacionalizable."]),
  q("¿Qué característica hace metodológicamente sólido un reporte de desabasto?", "Correlacionar evidencia documental, temporalidad, ubicación, medicamento específico y recurrencia verificable.", ["Acumular testimonios sin validación clínica.", "Publicar denuncias ciudadanas inmediatamente.", "Comparar únicamente inventarios oficiales."]),
  q("¿Qué función cumple el consentimiento informado dentro de la Red Solidaria?", "Garantizar control del paciente sobre datos, apoyos y decisiones relacionadas con su atención.", ["Transferir responsabilidad médica completa al paciente.", "Autorizar difusión pública de expedientes clínicos.", "Sustituir validación ética de los comités."]),
  q("¿Qué hace técnicamente consistente una priorización de casos médicos?", "Aplicar criterios verificables de riesgo vital, urgencia, vulnerabilidad y posibilidad real de intervención.", ["Priorizar enfermedades con mayor visibilidad pública.", "Distribuir recursos equitativamente sin criterios clínicos.", "Asignar apoyos según volumen de donaciones recibidas."]),
  q("¿Qué característica fortalece más una plataforma de recetas digitales auditables?", "Registro verificable de profesional, diagnóstico permitido, medicamento emitido y trazabilidad temporal.", ["Acceso libre a recetas sin autenticación médica.", "Integración automática con todas las farmacias privadas.", "Publicación abierta de historiales clínicos."]),
  q("¿Qué riesgo metodológico existe cuando se mezclan casos clínicos sin clasificación de gravedad?", "Distorsionar asignación de recursos y perder capacidad de respuesta prioritaria efectiva.", ["Reducir compatibilidad con blockchain médico.", "Eliminar interoperabilidad farmacéutica.", "Impedir análisis presupuestal regional."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Asistir en organización, priorización logística y detección de patrones sin sustituir decisiones médicas.", ["Emitir diagnósticos definitivos automatizados.", "Autorizar cirugías y tratamientos complejos.", "Sustituir deliberación bioética de expertos."]),
  q("¿Qué hace internacionalmente relevante un expediente de desabasto sistemático?", "Demostrar incumplimiento persistente del derecho a la salud mediante evidencia verificable y daño documentado.", ["La cobertura mediática internacional del caso.", "La participación de fundaciones extranjeras.", "El volumen total de medicamentos faltantes."]),
  q("¿Qué práctica reduce mejor riesgo de fraude en crowdfunding médico?", "Validación clínica independiente, trazabilidad financiera y auditoría verificable de resultados.", ["Publicación abierta de expedientes clínicos completos.", "Centralización absoluta de donaciones internacionales.", "Distribución automática de recursos sin revisión."]),
  q("¿Qué característica vuelve metodológicamente sólida una segunda opinión médica remota?", "Protocolos delimitados, documentación clínica suficiente y derivación inmediata de casos complejos.", ["Sustituir automáticamente consultas presenciales.", "Priorizar rapidez sobre validación médica.", "Permitir diagnósticos ilimitados por IA."]),
  q("¿Qué diferencia existe entre teleorientación médica y acto clínico especializado?", "La teleorientación limita alcance diagnóstico y canaliza condiciones fuera de protocolos permitidos.", ["La teleorientación carece completamente de utilidad clínica.", "El acto especializado puede automatizarse totalmente.", "Ambos conceptos son jurídicamente equivalentes."]),
  q("¿Qué característica fortalece más la legitimidad ética del módulo?", "Separar priorización clínica, financiamiento solidario y decisiones ciudadanas no médicas.", ["Permitir votación pública sobre tratamientos individuales.", "Centralizar decisiones en patrocinadores privados.", "Excluir criterios socioeconómicos de evaluación."]),
  q("¿Qué riesgo existe cuando la ciudadanía interpreta ayuda solidaria como sustitución permanente del Estado?", "Normalizar omisiones estructurales y desplazar responsabilidades públicas obligatorias.", ["Reducir interoperabilidad hospitalaria.", "Eliminar trazabilidad clínica digital.", "Impedir auditoría de medicamentos."]),
  q("¿Qué función cumplen los hashes criptográficos y registros inmutables?", "Preservar integridad verificable de consultas, donaciones, recetas y apoyos médicos.", ["Determinar autenticidad clínica automática.", "Sustituir auditorías sanitarias.", "Resolver discrepancias diagnósticas."]),
  q("¿Qué hace técnicamente robusto un mapa de acceso desigual a salud?", "Integrar disponibilidad médica, tiempos de espera, cobertura territorial y desabasto documentado.", ["Comparar únicamente gasto estatal agregado.", "Priorizar hospitales con mayor capacidad instalada.", "Excluir variables socioeconómicas complejas."]),
  q("¿Qué característica vuelve útil un análisis de eficiencia presupuestal sanitaria?", "Relacionar gasto ejecutado con resultados clínicos verificables y cobertura efectiva.", ["Comparar únicamente montos presupuestales históricos.", "Priorizar número de hospitales construidos.", "Evaluar exclusivamente percepción ciudadana."]),
  q("¿Qué problema surge cuando no existe trazabilidad en entrega de medicamentos?", "Dificultar auditoría, facilitar desvíos y debilitar confianza del sistema solidario.", ["Reducir interoperabilidad farmacéutica internacional.", "Eliminar compatibilidad con telemedicina.", "Impedir clasificación de enfermedades."]),
  q("¿Qué característica fortalece más una red de hospitales privados solidarios?", "Convenios verificables, criterios transparentes de acceso y seguimiento clínico auditado.", ["Cobertura mediática permanente de tratamientos.", "Participación exclusiva de hospitales internacionales.", "Centralización de todos los casos críticos."]),
  q("¿Qué práctica protege mejor datos sensibles de pacientes?", "Separación entre identidad y expediente clínico, cifrado y acceso granular controlado.", ["Anonimización exclusivamente nominal.", "Publicación parcial de historiales médicos.", "Acceso abierto a investigadores externos."]),
  q("¿Qué vuelve metodológicamente consistente un análisis de daño evitable?", "Relacionar retraso, desabasto u omisión con consecuencias clínicas verificables y prevenibles.", ["Comparar únicamente mortalidad hospitalaria.", "Priorizar enfermedades mediáticamente visibles.", "Excluir casos sin sentencia judicial."]),
  q("¿Qué función cumplen los Comités de Ciudadanos Expertos?", "Definir criterios de priorización, validar metodologías y auditar impacto sistémico.", ["Autorizar individualmente todos los tratamientos médicos.", "Emitir recetas digitales automatizadas.", "Sustituir órganos regulatorios sanitarios."]),
  q("¿Qué riesgo existe cuando la IA prioriza casos sin supervisión humana?", "Introducir sesgos clínicos o socioeconómicos incompatibles con principios bioéticos.", ["Reducir velocidad de atención médica.", "Eliminar trazabilidad financiera.", "Impedir interoperabilidad hospitalaria."]),
  q("¿Qué característica fortalece más una auditoría de resultados solidarios?", "Relacionar recursos aplicados con mejoras clínicas verificables y tiempos de respuesta.", ["Priorizar volumen de donaciones recibidas.", "Comparar únicamente costos operativos.", "Publicar historias individuales de pacientes."]),
  q("¿Qué hace internacionalmente útil un informe del módulo?", "Documentar brechas estructurales y soluciones verificables compatibles con estándares de derechos humanos.", ["Difundir reportes en múltiples idiomas.", "Integrar únicamente indicadores OMS.", "Comparar exclusivamente gasto público regional."]),
  q("¿Qué criterio fortalece más la legitimidad de recetas subsidiadas mediante crowdfunding?", "Verificación médica acreditada, control de duplicidades y trazabilidad financiera completa.", ["Distribución libre de medicamentos esenciales.", "Aprobación ciudadana mayoritaria del caso.", "Cobertura mediática de la enfermedad."]),
  q("¿Qué problema surge cuando no se documenta seguimiento clínico básico?", "Impedir evaluación real de impacto y efectividad de intervenciones financiadas.", ["Reducir compatibilidad con sistemas blockchain.", "Eliminar trazabilidad presupuestal.", "Impedir clasificación regional de desabasto."]),
  q("¿Qué característica vuelve más robusta una plataforma médica gratuita de primer contacto?", "Protocolos clínicos delimitados, referencia escalonada y auditoría continua de calidad.", ["Automatización completa de diagnósticos comunes.", "Atención universal sin clasificación de riesgo.", "Eliminación de validación médica humana."]),
  q("¿Cuál es el principio rector del Módulo 10?", "Convertir solidaridad verificable y tecnología ética en acceso real, inmediato y documentado al derecho a la salud.", ["Sustituir estructuralmente al sistema público de salud.", "Automatizar atención médica mediante inteligencia artificial.", "Centralizar financiamiento sanitario en plataformas digitales."]),
]);
const preguntasTecnicasModulo11 = adaptarBancoTecnico([
  q("¿Qué característica convierte una evaluación educativa en una medición funcional real y no solo administrativa?", "Relacionar aprendizaje adquirido con capacidades aplicables verificables en contextos reales.", ["Incrementar cobertura escolar anual.", "Aumentar número de certificados emitidos.", "Expandir contenidos curriculares oficiales."]),
  q("¿Qué riesgo estructural surge cuando un sistema educativo prioriza asistencia sobre competencias?", "Producir acreditación formal sin desarrollo efectivo de habilidades transferibles.", ["Reducir interoperabilidad entre niveles educativos.", "Eliminar necesidad de infraestructura digital.", "Impedir implementación de microcredenciales."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye autoridades educativas ni impone contenidos obligatorios fuera del marco legal.", ["No puede evaluar desempeño docente.", "No puede generar pilotos educativos comunitarios.", "No puede usar herramientas digitales de aprendizaje."]),
  q("¿Qué hace metodológicamente sólido un diagnóstico de brecha educativa?", "Cruzar habilidades reales, infraestructura, contexto territorial y resultados funcionales verificables.", ["Comparar únicamente cobertura escolar oficial.", "Priorizar percepción pública de calidad educativa.", "Medir exclusivamente desempeño en exámenes estandarizados."]),
  q("¿Qué función cumplen las microcredenciales dentro del módulo?", "Documentar competencias específicas verificables de manera flexible y acumulativa.", ["Sustituir completamente títulos profesionales.", "Eliminar necesidad de evaluación continua.", "Centralizar certificación educativa nacional."]),
  q("¿Qué característica fortalece más un modelo de aprendizaje híbrido comunitario?", "Combinar acompañamiento humano, tecnología accesible y seguimiento basado en progreso real.", ["Automatizar completamente la enseñanza.", "Eliminar interacción presencial con docentes.", "Uniformar contenidos para todas las regiones."]),
  q("¿Qué riesgo metodológico existe cuando se evalúan estudiantes sin contexto territorial?", "Confundir rezago estructural con desempeño individual aislado.", ["Reducir precisión de herramientas geoespaciales.", "Eliminar trazabilidad de evaluaciones.", "Impedir integración de plataformas digitales."]),
  q("¿Qué vuelve técnicamente consistente una medición de habilidades socioemocionales?", "Utilizar instrumentos longitudinales validados y evidencia observable de comportamiento y convivencia.", ["Priorizar autoevaluaciones subjetivas.", "Medir únicamente percepción de bienestar.", "Aplicar encuestas aisladas sin seguimiento."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Asistir en personalización, detección de brechas y evaluación de impacto sin sustituir docentes.", ["Determinar automáticamente contenidos obligatorios.", "Emitir acreditaciones académicas oficiales.", "Reemplazar acompañamiento pedagógico humano."]),
  q("¿Qué característica fortalece más un laboratorio de modelos educativos funcionales?", "Pilotos medibles, evaluación continua y trazabilidad de resultados comparables.", ["Aplicación simultánea nacional obligatoria.", "Sustitución de currículos oficiales existentes.", "Centralización de decisiones pedagógicas."]),
  q("¿Qué diferencia existe entre alfabetización digital y simple acceso tecnológico?", "La alfabetización implica capacidad crítica y funcional para usar tecnología de forma efectiva.", ["El acceso tecnológico garantiza habilidades digitales.", "La alfabetización depende exclusivamente de conectividad.", "Ambos conceptos son equivalentes educativamente."]),
  q("¿Qué práctica reduce mejor riesgo de manipulación de resultados educativos?", "Versionado verificable, métricas transparentes y trazabilidad metodológica auditable.", ["Publicación exclusiva de resultados agregados.", "Centralización de evaluaciones en organismos únicos.", "Eliminación de retroalimentación comunitaria."]),
  q("¿Qué hace internacionalmente relevante un informe educativo funcional?", "Demostrar impacto verificable en competencias y movilidad social con metodología replicable.", ["Traducir contenidos educativos a varios idiomas.", "Comparar únicamente rankings académicos globales.", "Participación de organismos multilaterales."]),
  q("¿Qué riesgo existe cuando la educación se diseña sin pertinencia social?", "Generar formación desconectada de necesidades productivas, comunitarias y cívicas reales.", ["Reducir velocidad de digitalización escolar.", "Eliminar capacidad de evaluación comparativa.", "Impedir integración de microcredenciales."]),
  q("¿Qué característica vuelve metodológicamente sólido un piloto educativo comunitario?", "Definir línea base, métricas verificables y evaluación longitudinal antes y después de intervención.", ["Aplicar el mismo currículo en todas las comunidades.", "Priorizar cobertura territorial sobre evaluación.", "Eliminar adaptaciones culturales locales."]),
  q("¿Qué función cumplen los Kioscos Comunitarios de Aprendizaje?", "Reducir brechas de acceso combinando acompañamiento presencial y aprendizaje digital funcional.", ["Sustituir permanentemente escuelas públicas.", "Centralizar contenidos educativos nacionales.", "Eliminar necesidad de conectividad regional."]),
  q("¿Qué criterio fortalece más una ruta de capacitación laboral funcional?", "Relacionar habilidades enseñadas con demanda productiva verificable y capacidades transferibles.", ["Priorizar certificaciones académicas tradicionales.", "Uniformar competencias para todos los sectores.", "Eliminar formación socioemocional complementaria."]),
  q("¿Qué problema surge cuando la evaluación educativa se usa para castigar?", "Desincentivar mejora continua y distorsionar incentivos pedagógicos reales.", ["Reducir interoperabilidad tecnológica educativa.", "Eliminar trazabilidad de competencias.", "Impedir implementación de plataformas híbridas."]),
  q("¿Qué hace técnicamente robusta una evaluación de convivencia escolar?", "Combinar indicadores conductuales, clima escolar y seguimiento longitudinal verificable.", ["Priorizar percepción pública de disciplina.", "Comparar únicamente reportes administrativos.", "Medir exclusivamente desempeño académico."]),
  q("¿Qué característica fortalece más la protección de menores dentro del módulo?", "Anonimato por defecto, consentimiento informado y uso agregado de información sensible.", ["Publicación parcial de resultados individuales.", "Centralización abierta de expedientes educativos.", "Acceso libre a evaluaciones comunitarias."]),
  q("¿Qué función cumplen los hashes y sellos de tiempo en evaluaciones educativas?", "Preservar integridad y trazabilidad verificable de resultados y versiones metodológicas.", ["Determinar autenticidad académica automática.", "Sustituir validación pedagógica humana.", "Resolver discrepancias entre docentes."]),
  q("¿Qué característica vuelve más útil una evaluación de impacto educativo?", "Comparar cambios reales en capacidades funcionales antes y después de la intervención.", ["Incrementar número de participantes evaluados.", "Priorizar resultados de percepción subjetiva.", "Comparar exclusivamente gasto educativo."]),
  q("¿Qué riesgo existe cuando la IA recomienda rutas educativas sin supervisión humana?", "Reproducir sesgos socioeconómicos o limitar trayectorias potenciales de aprendizaje.", ["Reducir velocidad de evaluación educativa.", "Eliminar interoperabilidad curricular.", "Impedir trazabilidad de resultados."]),
  q("¿Qué característica fortalece más la pertinencia territorial de un currículo?", "Integrar contexto productivo, cultural y comunitario en diseño de habilidades aplicables.", ["Uniformar contenidos nacionales obligatorios.", "Priorizar estándares internacionales exclusivamente.", "Eliminar adaptaciones lingüísticas locales."]),
  q("¿Qué diferencia existe entre cobertura educativa y aprendizaje verificable?", "La cobertura mide acceso; el aprendizaje demuestra competencias efectivamente adquiridas.", ["El aprendizaje depende exclusivamente de infraestructura.", "La cobertura garantiza movilidad social.", "Ambos conceptos producen resultados equivalentes."]),
  q("¿Qué hace técnicamente consistente un programa de mentorías personalizadas?", "Seguimiento continuo, adaptación individual y métricas claras de progreso funcional.", ["Aplicar el mismo ritmo para todos los estudiantes.", "Eliminar evaluación periódica de desempeño.", "Priorizar interacción tecnológica sobre acompañamiento."]),
  q("¿Qué característica fortalece más una estrategia contra rezago educativo?", "Identificar causas diferenciadas y diseñar intervenciones específicas medibles y adaptativas.", ["Expandir únicamente tiempo escolar obligatorio.", "Incrementar volumen de tareas académicas.", "Uniformar procesos de evaluación nacional."]),
  q("¿Qué problema surge cuando los modelos educativos cambian sin evaluación continua?", "Acumular reformas ideológicas sin evidencia verificable de efectividad real.", ["Reducir compatibilidad digital educativa.", "Eliminar trazabilidad curricular histórica.", "Impedir participación ciudadana territorial."]),
  q("¿Qué característica vuelve más útil un observatorio de desempeño educativo?", "Integrar datos comparables de habilidades, infraestructura, permanencia y contexto territorial.", ["Comparar únicamente resultados de exámenes oficiales.", "Priorizar indicadores administrativos agregados.", "Excluir variables socioemocionales complejas."]),
  q("¿Cuál es el principio rector del Módulo 11?", "Convertir la educación en capacidades reales verificables para la vida, el trabajo y la ciudadanía.", ["Sustituir completamente el sistema educativo oficial.", "Automatizar enseñanza mediante inteligencia artificial.", "Centralizar contenidos educativos funcionales."]),
]);
const preguntasTecnicasModulo12 = adaptarBancoTecnico([
  q("¿Qué característica convierte una alerta de deterioro urbano en un riesgo estructural técnicamente relevante?", "La convergencia verificable entre daño progresivo, patrones de uso y vulnerabilidad estructural documentada.", ["La frecuencia de reportes ciudadanos en redes sociales.", "La antigüedad visible de la infraestructura.", "La magnitud presupuestal de la obra original."]),
  q("¿Qué riesgo sistémico evidencia el colapso recurrente de infraestructura pública crítica?", "Fallas acumulativas de supervisión, mantenimiento y control técnico preventivo.", ["Incremento inevitable de desgaste urbano.", "Insuficiencia exclusiva de inversión pública.", "Errores aislados de construcción sin patrón institucional."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye peritajes oficiales ni ejecuta directamente obra pública.", ["No puede analizar infraestructura ferroviaria.", "No puede emitir alertas preventivas.", "No puede documentar riesgos urbanos."]),
  q("¿Qué hace metodológicamente sólido un análisis de riesgo estructural?", "Integrar cargas, materiales, historial de mantenimiento y condiciones ambientales verificables.", ["Comparar únicamente costos de construcción.", "Priorizar percepción ciudadana de inseguridad.", "Evaluar exclusivamente antigüedad de la estructura."]),
  q("¿Qué función cumple el mantenimiento predictivo dentro del módulo?", "Priorizar intervenciones antes de fallas críticas mediante análisis de deterioro y uso acumulado.", ["Sustituir inspecciones físicas periódicas.", "Automatizar reparación estructural completa.", "Eliminar necesidad de supervisión humana."]),
  q("¿Qué característica fortalece más una evaluación de vivienda social?", "Relacionar seguridad estructural, resiliencia ambiental y habitabilidad verificable.", ["Incrementar densidad urbana máxima permitida.", "Reducir costos de materiales prioritariamente.", "Uniformar modelos arquitectónicos nacionales."]),
  q("¿Qué riesgo metodológico existe cuando se prioriza infraestructura por presión política y no por riesgo técnico?", "Desviar recursos de zonas críticas y aumentar probabilidad de fallas catastróficas prevenibles.", ["Reducir interoperabilidad geoespacial.", "Eliminar trazabilidad presupuestal.", "Impedir clasificación de materiales."]),
  q("¿Qué vuelve técnicamente consistente un sistema de monitoreo urbano ciudadano?", "Georreferenciación verificable, evidencia contextual y seguimiento longitudinal de anomalías.", ["Acumulación masiva de denuncias no clasificadas.", "Publicación inmediata de reportes sin validación.", "Comparación exclusiva de daños visibles."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Detectar patrones de deterioro, simular riesgos y asistir comparaciones técnicas auditables.", ["Emitir dictámenes estructurales definitivos automáticos.", "Sustituir supervisión de ingenieros civiles.", "Autorizar ejecución inmediata de proyectos."]),
  q("¿Qué característica fortalece más un análisis de sobrecostos de obra pública?", "Contrastar modificaciones contractuales, costos reales y estándares técnicos comparables.", ["Comparar únicamente inflación acumulada.", "Priorizar percepción pública de corrupción.", "Analizar exclusivamente contratos federales."]),
  q("¿Qué diferencia existe entre mantenimiento correctivo y predictivo?", "El predictivo interviene antes del fallo mediante análisis anticipatorio verificable.", ["El correctivo requiere menos supervisión técnica.", "El predictivo elimina necesidad de inspecciones.", "Ambos producen costos equivalentes a largo plazo."]),
  q("¿Qué práctica reduce mejor riesgo de corrupción en financiamiento solidario?", "Separar decisiones técnicas de administración financiera con trazabilidad auditable permanente.", ["Publicar únicamente montos agregados donados.", "Centralizar aprobación de proyectos en patrocinadores.", "Eliminar anonimato de todos los donantes."]),
  q("¿Qué hace internacionalmente relevante un informe de negligencia estructural?", "Demostrar patrones verificables de omisión, riesgo prevenible y daño acumulativo documentado.", ["Difundir reportes en varios idiomas.", "Comparar exclusivamente estándares europeos.", "Participación de organismos multilaterales."]),
  q("¿Qué riesgo existe cuando infraestructura crítica carece de historial de mantenimiento trazable?", "Impedir evaluación preventiva confiable y ocultar deterioro progresivo acumulado.", ["Reducir interoperabilidad con plataformas BIM.", "Eliminar compatibilidad con sensores urbanos.", "Impedir clasificación presupuestal."]),
  q("¿Qué característica vuelve metodológicamente sólida una propuesta técnica comparativa?", "Explicar desempeño estructural, costos del ciclo de vida y resiliencia verificable.", ["Priorizar menor costo inicial exclusivamente.", "Comparar únicamente tiempos de construcción.", "Eliminar variables ambientales complejas."]),
  q("¿Qué función cumplen los registros inmutables y hashes criptográficos?", "Preservar integridad y trazabilidad verificable de evaluaciones y financiamiento.", ["Determinar autenticidad material automática de estructuras.", "Sustituir auditorías técnicas humanas.", "Resolver discrepancias de diseño estructural."]),
  q("¿Qué criterio fortalece más una evaluación antisísmica?", "Relacionar diseño estructural, materiales, normatividad y comportamiento dinámico esperado.", ["Comparar únicamente altura del inmueble.", "Priorizar costos de reforzamiento mínimos.", "Evaluar exclusivamente daños visibles previos."]),
  q("¿Qué problema surge cuando se construye infraestructura sin considerar resiliencia climática?", "Incrementar vulnerabilidad futura ante fenómenos extremos previsibles y acumulativos.", ["Reducir interoperabilidad territorial.", "Eliminar trazabilidad presupuestal histórica.", "Impedir clasificación de riesgos urbanos."]),
  q("¿Qué hace técnicamente robusto un banco de propuestas de reconstrucción post-desastre?", "Comparar seguridad, costo total, sostenibilidad y velocidad de implementación verificable.", ["Priorizar diseños arquitectónicos innovadores.", "Uniformar materiales para todas las regiones.", "Reducir supervisión técnica comunitaria."]),
  q("¿Qué característica fortalece más la evaluación de transporte público crítico?", "Analizar cargas operativas, mantenimiento, fatiga estructural y seguridad sistémica.", ["Comparar únicamente tiempos de traslado.", "Priorizar expansión territorial inmediata.", "Evaluar exclusivamente volumen de usuarios."]),
  q("¿Qué práctica protege mejor legitimidad técnica del módulo?", "Separar criterios profesionales de presión política y financiamiento solidario.", ["Permitir votación ciudadana sobre diseños estructurales.", "Centralizar evaluaciones en autoridades locales.", "Excluir especialistas privados independientes."]),
  q("¿Qué característica vuelve más útil un mapa geoespacial de riesgo urbano?", "Integrar vulnerabilidad estructural, densidad poblacional y exposición ambiental verificable.", ["Representar únicamente daños históricos visibles.", "Priorizar infraestructura de mayor costo.", "Excluir zonas rurales de baja densidad."]),
  q("¿Qué riesgo existe cuando el crowdfunding se mezcla con decisiones técnicas?", "Distorsionar priorización profesional mediante presión emocional o financiera.", ["Reducir trazabilidad de materiales utilizados.", "Eliminar compatibilidad con auditorías públicas.", "Impedir simulaciones de falla estructural."]),
  q("¿Qué característica fortalece más un análisis de infraestructura hospitalaria?", "Evaluar continuidad operativa, resiliencia estructural y funcionalidad crítica en emergencias.", ["Comparar únicamente capacidad de camas.", "Priorizar costos de mantenimiento mínimos.", "Evaluar exclusivamente antigüedad del edificio."]),
  q("¿Qué diferencia existe entre costo inicial y costo de ciclo de vida?", "El ciclo de vida integra mantenimiento, operación y resiliencia a largo plazo.", ["El costo inicial determina automáticamente sostenibilidad.", "El ciclo de vida excluye costos ambientales.", "Ambos conceptos producen resultados equivalentes."]),
  q("¿Qué hace metodológicamente consistente un análisis de hundimientos urbanos?", "Relacionar condiciones geotécnicas, extracción hídrica y comportamiento estructural acumulativo.", ["Comparar únicamente edad de construcciones.", "Priorizar percepción visual de daños.", "Excluir variables hidrológicas complejas."]),
  q("¿Qué característica fortalece más la reconstrucción de escuelas post-desastre?", "Diseños resilientes auditables con seguridad estructural y funcionalidad educativa verificable.", ["Reducir tiempos de construcción al mínimo.", "Uniformar modelos arquitectónicos nacionales.", "Priorizar estética sobre desempeño técnico."]),
  q("¿Qué problema surge cuando las modificaciones contractuales no son transparentes?", "Dificultar auditoría técnica y facilitar desviaciones presupuestales injustificadas.", ["Reducir interoperabilidad entre municipios.", "Eliminar trazabilidad de mantenimiento predictivo.", "Impedir clasificación de proveedores."]),
  q("¿Qué característica vuelve más útil una alerta temprana preventiva?", "Detectar deterioro crítico antes de que el riesgo se convierta en daño irreversible.", ["Maximizar cantidad de reportes ciudadanos.", "Priorizar infraestructura mediáticamente visible.", "Centralizar validación exclusivamente estatal."]),
  q("¿Cuál es el principio rector del Módulo 12?", "La infraestructura segura no es opcional: prevenir fallas salva vidas y evita tragedias repetibles.", ["La reconstrucción debe priorizar rapidez sobre resiliencia.", "El menor costo inicial define la mejor infraestructura.", "La tecnología puede sustituir supervisión humana estructural."]),
]);
const preguntasTecnicasModulo13 = adaptarBancoTecnico([
  q("¿Qué característica convierte un problema de movilidad en una vulneración estructural del derecho a la ciudad?", "La limitación sistemática y desigual del acceso seguro y funcional a servicios y oportunidades urbanas.", ["La existencia de tráfico intenso en horarios pico.", "El aumento temporal de tarifas de transporte.", "La antigüedad del parque vehicular urbano."]),
  q("¿Qué riesgo sistémico surge cuando la planeación urbana prioriza flujo vehicular sobre accesibilidad humana?", "Profundizar segregación territorial, inseguridad vial y dependencia estructural del automóvil.", ["Reducir competitividad económica regional.", "Eliminar interoperabilidad entre sistemas de transporte.", "Impedir expansión ferroviaria metropolitana."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye autoridades de transporte ni ejecuta decisiones administrativas obligatorias.", ["No puede analizar concesiones privadas.", "No puede emitir alertas preventivas.", "No puede evaluar proyectos ferroviarios."]),
  q("¿Qué hace metodológicamente sólido un mapa de riesgo vial?", "Cruzar accidentes, velocidad, infraestructura, flujos y vulnerabilidad territorial verificable.", ["Comparar únicamente número de vehículos registrados.", "Priorizar percepción ciudadana de inseguridad.", "Evaluar exclusivamente daños materiales históricos."]),
  q("¿Qué función cumple el análisis geoespacial dentro del módulo?", "Identificar patrones territoriales de movilidad, riesgo y desigualdad de acceso.", ["Sustituir auditorías de transporte físico.", "Automatizar rediseño vial completo.", "Eliminar necesidad de supervisión humana."]),
  q("¿Qué característica fortalece más una evaluación de transporte público?", "Relacionar seguridad, cobertura, accesibilidad y tiempos reales de traslado verificables.", ["Priorizar cantidad de unidades en operación.", "Comparar únicamente tarifas oficiales.", "Uniformar estándares de movilidad nacional."]),
  q("¿Qué riesgo metodológico existe cuando se diseñan obras viales sin análisis de movilidad inducida?", "Generar expansión futura del tráfico y dependencia creciente del transporte motorizado.", ["Reducir precisión de sistemas GPS urbanos.", "Eliminar trazabilidad de contratos públicos.", "Impedir interoperabilidad ferroviaria."]),
  q("¿Qué vuelve técnicamente consistente una evaluación de accesibilidad universal?", "Verificar desplazamiento seguro y autónomo para personas con distintas capacidades y condiciones.", ["Comparar exclusivamente dimensiones de banquetas.", "Priorizar accesibilidad vehicular sobre peatonal.", "Evaluar únicamente estaciones principales."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Simular escenarios urbanos, detectar patrones de riesgo y estructurar información técnica verificable.", ["Decidir automáticamente políticas de movilidad.", "Autorizar concesiones de transporte público.", "Sustituir planeación urbana humana."]),
  q("¿Qué característica fortalece más una auditoría de concesiones de transporte?", "Contrastar desempeño operativo, seguridad, cobertura y cumplimiento contractual verificable.", ["Comparar únicamente tarifas cobradas.", "Priorizar antigüedad de concesionarios.", "Evaluar exclusivamente rentabilidad económica."]),
  q("¿Qué diferencia existe entre movilidad eficiente y movilidad equitativa?", "La equitativa garantiza acceso funcional y seguro independientemente del territorio o condición social.", ["La eficiente elimina necesidad de transporte público.", "La equitativa depende exclusivamente de subsidios.", "Ambas categorías producen resultados equivalentes."]),
  q("¿Qué práctica reduce mejor riesgo de manipulación de estudios de impacto urbano?", "Versionado verificable, metodología pública y trazabilidad documental auditable.", ["Centralizar estudios en organismos privados.", "Publicar únicamente conclusiones ejecutivas.", "Eliminar revisión ciudadana técnica."]),
  q("¿Qué hace internacionalmente relevante un informe de movilidad urbana?", "Demostrar incumplimientos verificables de seguridad vial, accesibilidad y sostenibilidad territorial.", ["Traducir estudios a múltiples idiomas.", "Comparar únicamente emisiones vehiculares.", "Participación de consultoras internacionales."]),
  q("¿Qué riesgo existe cuando el transporte público se planea sin integración territorial?", "Aumentar exclusión espacial y tiempos de traslado desproporcionados para zonas periféricas.", ["Reducir interoperabilidad tarifaria.", "Eliminar trazabilidad presupuestal.", "Impedir clasificación de rutas urbanas."]),
  q("¿Qué característica vuelve metodológicamente sólida una evaluación de infraestructura ciclista?", "Analizar continuidad, seguridad física, conectividad y reducción verificable de riesgo vial.", ["Comparar únicamente longitud total de ciclovías.", "Priorizar estética urbana sobre funcionalidad.", "Evaluar exclusivamente densidad de usuarios."]),
  q("¿Qué función cumplen los registros inmutables y hashes criptográficos?", "Preservar integridad verificable de estudios, dictámenes y evidencia territorial.", ["Determinar autenticidad automática de accidentes.", "Sustituir auditorías de infraestructura.", "Resolver discrepancias urbanísticas automáticamente."]),
  q("¿Qué criterio fortalece más una evaluación de seguridad peatonal?", "Relacionar velocidad vehicular, cruces, visibilidad y protección efectiva del peatón.", ["Comparar únicamente flujo de automóviles.", "Priorizar capacidad vial máxima.", "Evaluar exclusivamente iluminación urbana."]),
  q("¿Qué problema surge cuando las ciudades crecen sin planeación de movilidad integrada?", "Consolidar dependencia territorial, desigualdad de acceso y vulnerabilidad ambiental acumulativa.", ["Reducir interoperabilidad entre municipios.", "Eliminar trazabilidad de proyectos viales.", "Impedir expansión de infraestructura ferroviaria."]),
  q("¿Qué hace técnicamente robusto un análisis de accidentes recurrentes?", "Identificar factores sistémicos de diseño vial, operación y comportamiento territorial verificable.", ["Comparar únicamente número anual de colisiones.", "Priorizar percepción ciudadana de riesgo.", "Evaluar exclusivamente daños materiales."]),
  q("¿Qué característica fortalece más una evaluación de impacto ambiental del transporte?", "Relacionar emisiones, uso territorial y exposición poblacional acumulativa verificable.", ["Comparar únicamente número de vehículos eléctricos.", "Priorizar velocidad de traslado sobre sostenibilidad.", "Evaluar exclusivamente calidad del pavimento."]),
  q("¿Qué práctica protege mejor legitimidad técnica del módulo?", "Separar priorización ciudadana de decisiones técnicas especializadas de diseño y seguridad.", ["Permitir votación pública sobre ingeniería vial.", "Centralizar análisis en autoridades locales.", "Excluir especialistas independientes privados."]),
  q("¿Qué característica vuelve más útil un diagnóstico territorial de movilidad?", "Integrar tiempos reales, conectividad, accesibilidad y desigualdad espacial verificable.", ["Representar únicamente densidad poblacional.", "Priorizar zonas de alta actividad económica.", "Excluir asentamientos periféricos complejos."]),
  q("¿Qué riesgo existe cuando las decisiones de movilidad se basan exclusivamente en flujo vehicular?", "Ignorar seguridad humana, sostenibilidad y derecho efectivo al acceso urbano.", ["Reducir interoperabilidad ferroviaria.", "Eliminar trazabilidad presupuestal.", "Impedir clasificación de infraestructura vial."]),
  q("¿Qué característica fortalece más una evaluación de proyectos ferroviarios?", "Analizar seguridad operacional, mantenimiento, impacto territorial y resiliencia técnica verificable.", ["Comparar únicamente velocidad máxima de operación.", "Priorizar expansión territorial inmediata.", "Evaluar exclusivamente rentabilidad financiera."]),
  q("¿Qué diferencia existe entre accesibilidad y conectividad?", "La accesibilidad mide capacidad real de llegar funcionalmente a destinos esenciales.", ["La conectividad elimina necesidad de infraestructura pública.", "La accesibilidad depende exclusivamente del ingreso económico.", "Ambos conceptos representan el mismo indicador."]),
  q("¿Qué hace metodológicamente consistente un análisis de tarifas de transporte?", "Relacionar costo, ingreso promedio, cobertura y calidad efectiva del servicio.", ["Comparar únicamente subsidios gubernamentales.", "Priorizar rentabilidad empresarial del sistema.", "Excluir variables territoriales complejas."]),
  q("¿Qué característica fortalece más la movilidad sustentable?", "Integrar transporte público eficiente, accesibilidad peatonal y reducción de emisiones acumulativas.", ["Expandir capacidad vial para automóviles.", "Incrementar velocidad promedio urbana.", "Priorizar infraestructura privada concesionada."]),
  q("¿Qué problema surge cuando no existe trazabilidad técnica en modificaciones de obra vial?", "Dificultar auditoría preventiva y ocultar riesgos estructurales o presupuestales relevantes.", ["Reducir interoperabilidad entre sistemas de transporte.", "Eliminar trazabilidad geoespacial urbana.", "Impedir simulaciones de flujo vehicular."]),
  q("¿Qué característica vuelve más útil una alerta preventiva de movilidad?", "Detectar patrones de riesgo antes de que deriven en lesiones graves o pérdidas humanas.", ["Maximizar cantidad de reportes ciudadanos.", "Priorizar infraestructura mediáticamente visible.", "Centralizar validación exclusivamente estatal."]),
  q("¿Cuál es el principio rector del Módulo 13?", "La movilidad segura y equitativa es un derecho habilitador que protege vidas y reduce desigualdad.", ["La velocidad urbana debe priorizarse sobre accesibilidad.", "La infraestructura vial define automáticamente desarrollo humano.", "La movilidad puede resolverse únicamente con expansión carretera."]),
]);
const preguntasTecnicasModulo14 = adaptarBancoTecnico([
  q("¿Qué distingue una política de protección social basada en derechos de una política asistencialista clientelar?", "La protección basada en derechos garantiza acceso verificable, dignidad, trazabilidad y no condicionamiento político.", ["La política asistencialista siempre tiene menor costo administrativo.", "La protección basada en derechos exige eliminar transferencias monetarias.", "El clientelismo solo ocurre cuando existe corrupción penal acreditada."]),
  q("¿Qué indicador revela una falla estructural en programas sociales para adultos mayores?", "Retrasos recurrentes, tarjetas bloqueadas, intermediación indebida y falta de servicios complementarios de cuidado.", ["Incremento nominal del padrón de beneficiarios.", "Entrega periódica de apoyos económicos generales.", "Existencia de reglas de operación publicadas."]),
  q("¿Cuál es el principal límite operativo del Sistema DIF Cívico?", "No sustituye al DIF ni a instituciones formales, sino que documenta, evalúa y propone con evidencia.", ["No puede analizar programas sociales existentes.", "No puede recibir testimonios ciudadanos voluntarios.", "No puede generar mapas de vulnerabilidad social."]),
  q("¿Qué hace técnicamente sólido un expediente de abuso patrimonial contra una persona adulta mayor?", "Evidencia de control indebido del recurso, contexto de vulnerabilidad, trazabilidad de pagos y consentimiento afectado.", ["La declaración pública de familiares inconformes.", "La existencia de una transferencia monetaria gubernamental.", "La edad avanzada de la persona beneficiaria por sí sola."]),
  q("¿Qué criterio fortalece más una evaluación de impacto real de programas sociales?", "Medir cambios verificables en bienestar, autonomía, salud, seguridad y continuidad de derechos.", ["Comparar únicamente número de beneficiarios registrados.", "Priorizar montos presupuestales ejercidos.", "Medir satisfacción mediante encuestas aisladas."]),
  q("¿Qué riesgo existe cuando los padrones sociales se usan sin auditoría ciudadana ni protección de datos?", "Facilitar clientelismo, exclusión arbitraria, uso político y exposición de población vulnerable.", ["Reducir automáticamente cobertura territorial.", "Impedir operación de transferencias bancarias.", "Eliminar capacidad de evaluación presupuestal."]),
  q("¿Qué función cumple la IA en este módulo?", "Estructurar reportes, detectar patrones de riesgo y auditar apoyos sin sustituir juicio profesional.", ["Decidir automáticamente quién recibe apoyos sociales.", "Sustituir trabajadores sociales y psicólogos.", "Emitir resoluciones administrativas vinculantes."]),
  q("¿Qué característica vuelve técnicamente útil un mapa de vulnerabilidad social?", "Integrar riesgos territoriales, demografía, acceso a servicios, violencia, salud y brechas de protección.", ["Mostrar únicamente densidad poblacional por municipio.", "Priorizar zonas con mayor cobertura mediática.", "Usar solo datos agregados de pobreza monetaria."]),
  q("¿Qué diferencia existe entre cobertura nominal y protección efectiva?", "La cobertura nominal registra acceso formal; la protección efectiva verifica bienestar real y continuidad de derechos.", ["Ambas categorías son equivalentes si el padrón es público.", "La protección efectiva depende solo del monto entregado.", "La cobertura nominal elimina necesidad de seguimiento."]),
  q("¿Qué práctica protege mejor a niñas, niños y adolescentes dentro del módulo?", "Anonimato reforzado, consentimiento informado de tutores, minimización de datos y enfoque de interés superior.", ["Publicar casos ejemplares para generar presión social.", "Centralizar expedientes completos en bases abiertas.", "Permitir votación ciudadana sobre casos individuales."]),
  q("¿Qué vuelve metodológicamente sólida una evaluación de becas juveniles?", "Relacionar apoyo recibido con permanencia, aprendizaje, empleabilidad, autonomía y trayectoria verificable.", ["Medir exclusivamente número de becas entregadas.", "Comparar montos mensuales con inflación anual.", "Priorizar percepción positiva del programa."]),
  q("¿Qué riesgo surge cuando la ayuda solidaria se canaliza sin trazabilidad?", "Facilitar duplicidades, desvíos, captura clientelar y pérdida de confianza pública.", ["Reducir cobertura mediática del caso.", "Impedir uso de aportaciones ciudadanas.", "Eliminar posibilidad de atención comunitaria."]),
  q("¿Qué hace internacionalmente relevante un informe de protección social?", "Documentar brechas verificables entre derechos reconocidos y cumplimiento efectivo en poblaciones vulnerables.", ["Traducir el informe a varios idiomas.", "Incluir testimonios emotivos extensos.", "Comparar únicamente gasto social agregado."]),
  q("¿Qué característica fortalece más un sistema de prevención de abandono institucional?", "Detección temprana de riesgo, seguimiento territorial, coordinación de cuidado y documentación trazable.", ["Aumento generalizado de padrones sociales.", "Centralización de reportes en una sola autoridad.", "Publicación mensual de beneficiarios."]),
  q("¿Qué principio debe guiar la intervención con mujeres en situación de violencia?", "Protección, confidencialidad, no revictimización y canalización segura con consentimiento informado.", ["Publicación inmediata para generar presión comunitaria.", "Mediación obligatoria con agresores familiares.", "Votación ciudadana sobre prioridad del caso."]),
  q("¿Qué función cumplen los Comités de Ciudadanos Expertos?", "Validar metodologías, evaluar impacto social y emitir dictámenes técnicos con enfoque de derechos.", ["Asignar directamente apoyos económicos públicos.", "Resolver jurídicamente disputas familiares.", "Sustituir servicios profesionales de protección social."]),
  q("¿Qué riesgo metodológico existe al evaluar programas sociales solo por presupuesto ejercido?", "Confundir gasto administrativo con bienestar efectivo y restitución real de derechos.", ["Reducir comparabilidad financiera anual.", "Eliminar trazabilidad de padrones.", "Impedir análisis territorial."]),
  q("¿Qué vuelve técnicamente consistente un análisis de exclusión de programas sociales?", "Documentar criterios de elegibilidad, barreras de acceso, perfil afectado y patrones territoriales.", ["Comparar únicamente número total de rechazos.", "Priorizar casos con mayor presión mediática.", "Usar testimonios sin clasificación contextual."]),
  q("¿Qué práctica evita que la protección social se convierta en propaganda?", "Separar ayuda, evidencia, auditoría y comunicación pública de cualquier intermediación partidista.", ["Aumentar visibilidad de autoridades promotoras.", "Publicar historias personales de beneficiarios.", "Centralizar distribución en operadores territoriales."]),
  q("¿Qué característica fortalece una política de cuidado comunitario?", "Redes verificables de apoyo, capacitación, seguimiento y corresponsabilidad sin explotación familiar invisible.", ["Transferencias económicas sin servicios complementarios.", "Delegar cuidado exclusivamente a familiares mujeres.", "Reducir intervención profesional para bajar costos."]),
  q("¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?", "Preservar integridad de reportes, apoyos, versiones y evidencia de seguimiento social.", ["Determinar automáticamente veracidad de testimonios.", "Sustituir evaluación profesional de casos.", "Resolver conflictos familiares sensibles."]),
  q("¿Qué hace robusto un modelo de mérito juvenil dentro de protección social?", "Documentar capacidades, trayectoria, impacto social y apoyos orientados a autonomía verificable.", ["Premiar únicamente calificaciones escolares altas.", "Distribuir apoyos según popularidad comunitaria.", "Eliminar criterios socioeconómicos de contexto."]),
  q("¿Qué problema surge al intervenir casos sensibles mediante votación ciudadana directa?", "Vulnerar privacidad, dignidad y criterios profesionales de protección especializada.", ["Reducir transparencia presupuestal.", "Eliminar legitimidad democrática agregada.", "Impedir auditoría de programas sociales."]),
  q("¿Qué criterio fortalece más una evaluación de suficiencia de apoyos económicos?", "Comparar monto, necesidades reales, costos de cuidado, salud, alimentación y contexto territorial.", ["Comparar únicamente monto nominal anual.", "Priorizar número de beneficiarios nuevos.", "Medir satisfacción general del padrón."]),
  q("¿Qué vuelve metodológicamente sólida una alerta de riesgo para personas con discapacidad?", "Identificar barreras de acceso, dependencia de cuidado, discriminación y falta de ajustes razonables.", ["Registrar únicamente diagnóstico médico.", "Medir número de apoyos económicos recibidos.", "Priorizar discapacidad visible sobre funcionalidad."]),
  q("¿Qué diferencia existe entre caridad y protección social basada en derechos?", "La protección basada en derechos exige obligaciones, continuidad, dignidad y rendición de cuentas.", ["La caridad siempre es ilegal en política social.", "La protección basada en derechos excluye solidaridad ciudadana.", "Ambas dependen de voluntad discrecional."]),
  q("¿Qué característica vuelve útil una evaluación de programas para niñez?", "Medir nutrición, salud, cuidado, permanencia escolar, seguridad y desarrollo integral verificable.", ["Comparar únicamente becas entregadas.", "Priorizar cobertura administrativa.", "Medir asistencia escolar sin contexto familiar."]),
  q("¿Qué riesgo existe cuando la IA prioriza casos sin control humano especializado?", "Reproducir sesgos contra poblaciones vulnerables y afectar decisiones de protección sensible.", ["Reducir velocidad de análisis territorial.", "Eliminar trazabilidad de apoyos solidarios.", "Impedir interoperabilidad de padrones."]),
  q("¿Qué característica fortalece más la canalización solidaria de apoyos críticos?", "Validación técnica, consentimiento, trazabilidad financiera y seguimiento del resultado humano.", ["Entrega rápida sin verificación documental.", "Difusión pública de casos urgentes.", "Asignación por prioridad emocional."]),
  q("¿Cuál es el principio rector del Módulo 14?", "La protección social es una obligación de dignidad, autonomía y derechos, no caridad ni clientelismo.", ["La asistencia económica sustituye servicios de cuidado.", "La solidaridad ciudadana reemplaza responsabilidades estatales.", "La política social debe medirse solo por cobertura."]),
]);
const preguntasTecnicasModulo15 = adaptarBancoTecnico([
  q("¿Qué convierte una política pública de corto plazo en un riesgo intergeneracional técnicamente relevante?", "La transferencia verificable de costos fiscales, sociales, ambientales o sanitarios hacia generaciones futuras.", ["La baja popularidad pública de la política implementada.", "La ausencia de participación juvenil en redes sociales.", "El incremento temporal del gasto público anual."]),
  q("¿Qué característica fortalece más una evaluación de justicia intergeneracional?", "Comparar beneficios inmediatos con impactos acumulativos proyectados a 10, 20 o 30 años.", ["Medir exclusivamente aprobación ciudadana actual.", "Evaluar solo el costo presupuestal del primer año.", "Priorizar indicadores políticos de corto plazo."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye procesos legislativos, presupuestales ni decisiones de autoridades competentes.", ["No puede analizar políticas deportivas.", "No puede utilizar modelos prospectivos.", "No puede emitir dictámenes ciudadanos."]),
  q("¿Qué hace metodológicamente sólido un análisis de deuda social juvenil?", "Integrar educación, empleo, salud mental, seguridad, deporte, movilidad social y desigualdad territorial.", ["Comparar únicamente tasas de desempleo juvenil.", "Medir solo cobertura de becas educativas.", "Priorizar encuestas de percepción política."]),
  q("¿Qué riesgo surge al abandonar el deporte comunitario como política preventiva?", "Aumentar vulnerabilidad ante violencia, enfermedades prevenibles, aislamiento social y deterioro psicoemocional.", ["Reducir competitividad internacional deportiva profesional.", "Disminuir inversión privada en clubes deportivos.", "Eliminar automáticamente cohesión comunitaria."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Simular escenarios futuros, detectar riesgos acumulativos y preservar trazabilidad de supuestos y versiones.", ["Decidir automáticamente qué generación debe priorizarse.", "Sustituir deliberación democrática sobre presupuestos.", "Emitir obligaciones legales vinculantes."]),
  q("¿Qué diferencia existe entre gasto juvenil y inversión intergeneracional?", "La inversión intergeneracional produce capacidades, resiliencia y beneficios verificables de largo plazo.", ["El gasto juvenil siempre es improductivo.", "La inversión intergeneracional solo aplica a educación superior.", "Ambos conceptos son presupuestalmente equivalentes."]),
  q("¿Qué característica vuelve robusta una evaluación de infraestructura deportiva comunitaria?", "Relacionar acceso territorial, uso efectivo, mantenimiento, seguridad y efectos preventivos medibles.", ["Medir únicamente número de canchas construidas.", "Priorizar infraestructura de alto rendimiento profesional.", "Comparar exclusivamente costo de construcción inicial."]),
  q("¿Qué indicador revela una política que beneficia al presente a costa del futuro?", "Ahorro inmediato acompañado de deterioro proyectado en capacidades, derechos o sostenibilidad.", ["Incremento de aprobación pública temporal.", "Reducción de gasto administrativo anual.", "Mayor rapidez de ejecución presupuestal."]),
  q("¿Qué hace internacionalmente relevante un dictamen sobre juventud y futuro?", "Documentar impactos previsibles sobre derechos de niñez, juventud y desarrollo sostenible.", ["Traducir el informe a varios idiomas.", "Incluir testimonios juveniles extensos.", "Comparar rankings deportivos internacionales."]),
  q("¿Qué riesgo metodológico existe al usar proyecciones demográficas sin análisis territorial?", "Ocultar desigualdades regionales y necesidades diferenciadas de jóvenes y niñez.", ["Reducir precisión de sellos de tiempo.", "Eliminar posibilidad de participación ciudadana.", "Impedir evaluación ambiental."]),
  q("¿Qué práctica fortalece la trazabilidad de un análisis prospectivo?", "Registrar supuestos, fuentes, escenarios, versiones y sensibilidad de resultados.", ["Publicar únicamente conclusiones ejecutivas.", "Usar un solo escenario central.", "Eliminar modelos alternativos para evitar confusión."]),
  q("¿Qué característica fortalece más una política juvenil de empleabilidad futura?", "Vincular habilidades transferibles, demanda productiva, formación técnica y movilidad social verificable.", ["Aumentar temporalmente subsidios de contratación.", "Crear más campañas de orientación vocacional.", "Medir únicamente número de jóvenes inscritos."]),
  q("¿Qué problema surge cuando una evaluación ignora salud mental juvenil?", "Subestimar costos futuros de abandono educativo, violencia, precariedad y pérdida de bienestar.", ["Reducir comparabilidad deportiva municipal.", "Eliminar trazabilidad presupuestal.", "Impedir análisis de deuda pública."]),
  q("¿Qué función cumplen los Comités de Ciudadanos Expertos?", "Validar metodologías prospectivas, revisar supuestos y emitir dictámenes técnicos intergeneracionales.", ["Asignar directamente presupuesto juvenil.", "Sustituir autoridades deportivas y educativas.", "Decidir legalmente reformas de largo plazo."]),
  q("¿Qué vuelve técnicamente consistente un análisis de riesgo climático intergeneracional?", "Relacionar emisiones, exposición territorial, vulnerabilidad social y costos acumulativos futuros.", ["Comparar únicamente temperatura promedio nacional.", "Priorizar percepción ambiental de jóvenes.", "Medir solo gasto público ambiental anual."]),
  q("¿Qué riesgo existe cuando se priorizan megaproyectos sin evaluación intergeneracional?", "Comprometer recursos, territorio y oportunidades futuras mediante costos irreversibles o subestimados.", ["Reducir participación mediática juvenil.", "Eliminar automáticamente sostenibilidad fiscal.", "Impedir cualquier beneficio económico presente."]),
  q("¿Qué característica fortalece más un indicador de deuda intergeneracional?", "Integrar obligaciones financieras, deterioro ambiental, rezago educativo y déficit de infraestructura social.", ["Medir únicamente deuda pública per cápita.", "Comparar gasto anual en programas juveniles.", "Priorizar opinión de expertos económicos."]),
  q("¿Qué práctica reduce mejor la politización del análisis de futuro?", "Usar escenarios comparables, supuestos públicos y metodología auditada por especialistas plurales.", ["Excluir temas controversiales del análisis.", "Concentrar evaluación en jóvenes universitarios.", "Usar solo datos oficiales gubernamentales."]),
  q("¿Qué característica vuelve útil una evaluación de recreación y espacio público?", "Medir acceso seguro, uso comunitario, mantenimiento, inclusión y efectos preventivos.", ["Comparar únicamente metros cuadrados construidos.", "Priorizar diseño estético urbano.", "Medir solo inversión inicial."]),
  q("¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?", "Preservar integridad de supuestos, proyecciones, versiones y dictámenes de largo plazo.", ["Garantizar exactitud automática de predicciones.", "Sustituir revisión técnica de escenarios.", "Determinar obligaciones presupuestales."]),
  q("¿Qué diferencia existe entre prevención social y reacción punitiva en juventud?", "La prevención reduce factores de riesgo antes del daño; la reacción interviene después de la crisis.", ["La prevención solo aplica al deporte comunitario.", "La reacción punitiva es siempre más barata.", "Ambas producen resultados equivalentes."]),
  q("¿Qué hace robusta una evaluación de presupuesto con impacto juvenil?", "Identificar quién recibe beneficios presentes y quién absorbe costos futuros verificables.", ["Comparar únicamente gasto destinado a becas.", "Medir popularidad de programas juveniles.", "Priorizar ejecución rápida del presupuesto."]),
  q("¿Qué riesgo existe si la ciudadanía vota prioridades de futuro sin información técnica?", "Convertir la deliberación en preferencia inmediata vulnerable a manipulación narrativa.", ["Eliminar valor legal de dictámenes.", "Impedir participación juvenil.", "Reducir cobertura deportiva."]),
  q("¿Qué característica fortalece más la participación juvenil informada?", "Acceso a escenarios claros, impactos comparados y lenguaje comprensible sin simplificar evidencia.", ["Votación masiva sin filtros técnicos.", "Participación exclusiva de jóvenes universitarios.", "Encuestas rápidas en redes sociales."]),
  q("¿Qué vuelve técnicamente sólido un análisis de irreversibilidad?", "Identificar daños o costos que no pueden revertirse razonablemente en el horizonte generacional evaluado.", ["Medir únicamente pérdidas económicas inmediatas.", "Priorizar consecuencias políticas del proyecto.", "Comparar solo indicadores anuales."]),
  q("¿Qué criterio fortalece más una política deportiva como prevención social?", "Integrar acceso territorial, continuidad, acompañamiento comunitario y medición de salud y convivencia.", ["Financiar principalmente deporte profesional.", "Construir infraestructura sin operación permanente.", "Medir únicamente número de torneos realizados."]),
  q("¿Qué problema surge cuando se ignora a generaciones que aún no votan?", "Se normaliza la transferencia de costos y riesgos a personas sin representación política efectiva.", ["Se reduce automáticamente la participación electoral actual.", "Se elimina capacidad de planeación democrática.", "Se impide cualquier política de corto plazo."]),
  q("¿Qué hace metodológicamente sólido un dictamen de sostenibilidad futura?", "Comparar escenarios alternativos, costos acumulados, riesgos irreversibles y distribución intergeneracional.", ["Priorizar el escenario más optimista disponible.", "Medir únicamente viabilidad presupuestal anual.", "Usar proyecciones sin análisis de sensibilidad."]),
  q("¿Cuál es el principio rector del Módulo 15?", "Las generaciones futuras no votan hoy, pero tienen derecho a no heredar costos evitables del presente.", ["La juventud debe priorizarse sobre todos los demás grupos.", "El deporte debe sustituir políticas educativas y laborales.", "Las decisiones presentes no pueden evaluarse técnicamente por efectos futuros."]),
]);

const preguntasTecnicasModulo16 = adaptarBancoTecnico([
{
    id: "mod16-001",
    modulo: 16,
    pregunta: "¿Qué distingue un modelo de turismo comunitario sostenible de un modelo turístico extractivo?",
    respuestaCorrecta: "La gobernanza local, distribución justa de beneficios, consentimiento comunitario y preservación territorial verificable.",
    distractores: [
      "La cantidad de visitantes internacionales recibidos.",
      "La rentabilidad inmediata de prestadores turísticos externos.",
      "La promoción digital centralizada del destino."
    ]
  },
  {
    id: "mod16-002",
    modulo: 16,
    pregunta: "¿Qué riesgo surge cuando una política cultural se basa en apoyos discrecionales sin trazabilidad?",
    respuestaCorrecta: "Facilitar clientelismo, exclusión territorial y captura de recursos culturales por intermediarios.",
    distractores: [
      "Reducir automáticamente la diversidad artística.",
      "Eliminar toda posibilidad de cooperación internacional.",
      "Impedir la creación de circuitos turísticos."
    ]
  },
  {
    id: "mod16-003",
    modulo: 16,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No censura contenidos, no impone modelos turísticos ni sustituye instituciones culturales o turísticas.",
    distractores: [
      "No puede evaluar políticas culturales.",
      "No puede mapear proyectos comunitarios.",
      "No puede documentar patrimonio en riesgo."
    ]
  },
  {
    id: "mod16-004",
    modulo: 16,
    pregunta: "¿Qué hace metodológicamente sólido un diagnóstico cultural territorial?",
    respuestaCorrecta: "Integrar patrimonio material e inmaterial, actores locales, financiamiento, riesgos y beneficios comunitarios.",
    distractores: [
      "Medir únicamente asistencia a eventos culturales.",
      "Priorizar proyectos con mayor atractivo comercial.",
      "Comparar solo presupuestos públicos ejercidos."
    ]
  },
  {
    id: "mod16-005",
    modulo: 16,
    pregunta: "¿Qué criterio protege mejor el patrimonio vivo de pueblos indígenas y comunidades locales?",
    respuestaCorrecta: "Consentimiento comunitario, control sobre uso cultural y distribución justa de beneficios.",
    distractores: [
      "Registro gubernamental centralizado de expresiones culturales.",
      "Promoción turística masiva del territorio.",
      "Digitalización abierta de todas las prácticas tradicionales."
    ]
  },
  {
    id: "mod16-006",
    modulo: 16,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Mapear proyectos, detectar exclusión de recursos, preservar memoria y trazar financiamiento sin valorar el arte.",
    distractores: [
      "Calificar automáticamente calidad artística.",
      "Decidir qué comunidades deben recibir turismo.",
      "Sustituir curaduría humana y deliberación comunitaria."
    ]
  },
  {
    id: "mod16-007",
    modulo: 16,
    pregunta: "¿Qué diferencia existe entre evaluación de impacto cultural y juicio estético?",
    respuestaCorrecta: "La evaluación mide efectos sociales, territoriales y de derechos; el juicio estético valora preferencias artísticas.",
    distractores: [
      "Ambas funciones son equivalentes en política cultural.",
      "El juicio estético es obligatorio para asignar fondos públicos.",
      "La evaluación cultural debe excluir variables comunitarias."
    ]
  },
  {
    id: "mod16-008",
    modulo: 16,
    pregunta: "¿Qué característica vuelve robusto un mapa de riesgo patrimonial?",
    respuestaCorrecta: "Relacionar amenazas territoriales, deterioro, presión turística, pérdida de transmisión y vulnerabilidad comunitaria.",
    distractores: [
      "Ubicar únicamente monumentos históricos oficiales.",
      "Priorizar sitios con mayor afluencia turística.",
      "Registrar solo daños físicos visibles."
    ]
  },
  {
    id: "mod16-009",
    modulo: 16,
    pregunta: "¿Qué riesgo implica la gentrificación cultural no documentada?",
    respuestaCorrecta: "Desplazar comunidades creadoras y convertir patrimonio vivo en mercancía desconectada del territorio.",
    distractores: [
      "Incrementar necesariamente la diversidad artística.",
      "Reducir toda actividad económica local.",
      "Eliminar automáticamente el turismo comunitario."
    ]
  },
  {
    id: "mod16-010",
    modulo: 16,
    pregunta: "¿Qué hace técnicamente consistente una evaluación de financiamiento cultural?",
    respuestaCorrecta: "Analizar concentración territorial, criterios de asignación, transparencia, resultados e inclusión de comunidades.",
    distractores: [
      "Comparar únicamente montos totales entregados.",
      "Priorizar proyectos con mayor visibilidad mediática.",
      "Evaluar solo cumplimiento administrativo."
    ]
  },
  {
    id: "mod16-011",
    modulo: 16,
    pregunta: "¿Qué vuelve internacionalmente relevante un informe sobre patrimonio cultural en riesgo?",
    respuestaCorrecta: "Documentar amenazas verificables, contexto comunitario, consentimiento y medidas preventivas comparables.",
    distractores: [
      "Traducir el informe a varios idiomas.",
      "Incluir fotografías atractivas del territorio.",
      "Promover el destino ante agencias turísticas."
    ]
  },
  {
    id: "mod16-012",
    modulo: 16,
    pregunta: "¿Qué práctica reduce mejor el riesgo de extractivismo cultural?",
    respuestaCorrecta: "Garantizar participación comunitaria, control de uso simbólico y beneficios económicos verificables.",
    distractores: [
      "Aumentar visitantes mediante campañas nacionales.",
      "Centralizar la promoción cultural en autoridades estatales.",
      "Digitalizar expresiones culturales sin restricciones."
    ]
  },
  {
    id: "mod16-013",
    modulo: 16,
    pregunta: "¿Qué característica fortalece más una política de economía cultural comunitaria?",
    respuestaCorrecta: "Articular creación, distribución justa, propiedad intelectual, formación y sostenibilidad local.",
    distractores: [
      "Priorizar industrias creativas de alta rentabilidad.",
      "Concentrar apoyos en capitales estatales.",
      "Medir solo ingresos por taquilla."
    ]
  },
  {
    id: "mod16-014",
    modulo: 16,
    pregunta: "¿Qué riesgo surge al confundir promoción turística con protección cultural?",
    respuestaCorrecta: "Aumentar visibilidad sin garantizar preservación, derechos comunitarios ni sostenibilidad territorial.",
    distractores: [
      "Reducir automáticamente ingresos locales.",
      "Impedir cooperación internacional.",
      "Eliminar toda participación artística."
    ]
  },
  {
    id: "mod16-015",
    modulo: 16,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodologías de impacto, preservación, sostenibilidad y asignación cultural sin imponer criterios estéticos.",
    distractores: [
      "Decidir qué expresiones artísticas son superiores.",
      "Administrar directamente destinos turísticos.",
      "Censurar contenidos incompatibles con valores comunitarios."
    ]
  },
  {
    id: "mod16-016",
    modulo: 16,
    pregunta: "¿Qué hace sólida una evaluación de censura indirecta?",
    respuestaCorrecta: "Documentar exclusión, presión, condicionamiento de recursos o restricciones no explícitas a la libertad creativa.",
    distractores: [
      "Registrar únicamente prohibiciones formales.",
      "Medir desacuerdos públicos con obras artísticas.",
      "Priorizar controversias mediáticas recientes."
    ]
  },
  {
    id: "mod16-017",
    modulo: 16,
    pregunta: "¿Qué criterio fortalece más la protección de autoría colectiva?",
    respuestaCorrecta: "Reconocer titularidad comunitaria, consentimiento, uso autorizado y mecanismos de beneficio compartido.",
    distractores: [
      "Registrar la obra a nombre de un gestor cultural.",
      "Permitir uso libre por tratarse de patrimonio público.",
      "Centralizar derechos en instituciones gubernamentales."
    ]
  },
  {
    id: "mod16-018",
    modulo: 16,
    pregunta: "¿Qué problema surge cuando un destino turístico se evalúa solo por derrama económica?",
    respuestaCorrecta: "Se invisibilizan costos culturales, ambientales, territoriales y distributivos para la comunidad local.",
    distractores: [
      "Se reduce precisión de datos financieros.",
      "Se elimina participación empresarial.",
      "Se impide cualquier estrategia de promoción."
    ]
  },
  {
    id: "mod16-019",
    modulo: 16,
    pregunta: "¿Qué característica vuelve útil un registro público de proyectos culturales?",
    respuestaCorrecta: "Documentar territorio, disciplina, necesidades, impacto, financiamiento y trazabilidad de apoyos.",
    distractores: [
      "Ordenar proyectos por popularidad digital.",
      "Publicar únicamente nombres de artistas.",
      "Priorizar obras con mayor valor comercial."
    ]
  },
  {
    id: "mod16-020",
    modulo: 16,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad de financiamiento, dictámenes, versiones y registros patrimoniales digitales.",
    distractores: [
      "Determinar automáticamente autenticidad artística.",
      "Sustituir consentimiento comunitario.",
      "Resolver disputas de autoría sin revisión humana."
    ]
  },
  {
    id: "mod16-021",
    modulo: 16,
    pregunta: "¿Qué riesgo existe cuando la ciudadanía vota proyectos culturales sin información contextual?",
    respuestaCorrecta: "Favorecer popularidad inmediata sobre diversidad, preservación y justicia territorial.",
    distractores: [
      "Eliminar valor jurídico del dictamen.",
      "Impedir participación artística.",
      "Reducir acceso a datos públicos."
    ]
  },
  {
    id: "mod16-022",
    modulo: 16,
    pregunta: "¿Qué característica fortalece más un modelo de turismo comunitario replicable?",
    respuestaCorrecta: "Gobernanza local, límites de carga, distribución de ingresos, preservación y evaluación continua.",
    distractores: [
      "Aumento acelerado de visitantes.",
      "Estandarización nacional de experiencias turísticas.",
      "Alianza exclusiva con grandes operadores."
    ]
  },
  {
    id: "mod16-023",
    modulo: 16,
    pregunta: "¿Qué hace metodológicamente sólido un análisis de concentración de recursos culturales?",
    respuestaCorrecta: "Comparar asignaciones por territorio, disciplina, población beneficiaria y criterios públicos de selección.",
    distractores: [
      "Medir únicamente presupuesto nacional total.",
      "Evaluar solo número de convocatorias abiertas.",
      "Priorizar instituciones con mayor trayectoria."
    ]
  },
  {
    id: "mod16-024",
    modulo: 16,
    pregunta: "¿Qué principio debe guiar la digitalización de patrimonio vivo?",
    respuestaCorrecta: "Consentimiento, control comunitario, protección de autoría y prevención de uso extractivo.",
    distractores: [
      "Acceso abierto irrestricto por interés público.",
      "Monetización inmediata para financiar archivos.",
      "Centralización técnica en plataformas privadas."
    ]
  },
  {
    id: "mod16-025",
    modulo: 16,
    pregunta: "¿Qué diferencia existe entre patrimonio material e inmaterial en términos de riesgo?",
    respuestaCorrecta: "El inmaterial depende de transmisión viva, contexto comunitario y continuidad cultural.",
    distractores: [
      "El inmaterial no requiere protección jurídica.",
      "El material solo depende de promoción turística.",
      "Ambos se preservan igual mediante digitalización."
    ]
  },
  {
    id: "mod16-026",
    modulo: 16,
    pregunta: "¿Qué vuelve sólida una evaluación de impacto ambiental turístico?",
    respuestaCorrecta: "Integrar carga turística, recursos naturales, residuos, movilidad, territorio y capacidad comunitaria.",
    distractores: [
      "Medir únicamente número de visitantes.",
      "Comparar ingresos hoteleros anuales.",
      "Priorizar promoción internacional del destino."
    ]
  },
  {
    id: "mod16-027",
    modulo: 16,
    pregunta: "¿Qué práctica protege mejor libertad creativa dentro del módulo?",
    respuestaCorrecta: "Separar evaluación de impacto y transparencia financiera de cualquier juicio ideológico o estético.",
    distractores: [
      "Validar contenidos mediante comités culturales.",
      "Priorizar obras alineadas con identidad oficial.",
      "Someter contenido artístico a votación pública."
    ]
  },
  {
    id: "mod16-028",
    modulo: 16,
    pregunta: "¿Qué característica fortalece la cooperación cultural internacional responsable?",
    respuestaCorrecta: "Evidencia de necesidades, consentimiento comunitario, trazabilidad de recursos y beneficios compartidos.",
    distractores: [
      "Promoción turística masiva en ferias globales.",
      "Exportación de expresiones culturales sin restricciones.",
      "Uso de intermediarios comerciales internacionales."
    ]
  },
  {
    id: "mod16-029",
    modulo: 16,
    pregunta: "¿Qué problema surge cuando se excluye a representantes territoriales del análisis cultural?",
    respuestaCorrecta: "Se desconecta la política cultural del contexto vivo, derechos comunitarios y efectos reales.",
    distractores: [
      "Se reduce calidad estética de los proyectos.",
      "Se impide toda cooperación técnica externa.",
      "Se elimina automáticamente financiamiento público."
    ]
  },
  {
    id: "mod16-030",
    modulo: 16,
    pregunta: "¿Cuál es el principio rector del Módulo 16?",
    respuestaCorrecta: "La cultura y el patrimonio vivo son derechos comunitarios, memoria social y futuro territorial, no mercancía extractiva.",
    distractores: [
      "La cultura debe gestionarse principalmente como industria turística.",
      "El patrimonio comunitario debe abrirse sin restricciones al mercado.",
      "La promoción cultural sustituye la protección de derechos culturales."
    ]
  }
]);

const preguntasTecnicasModulo17 = adaptarBancoTecnico([
{
    id: "mod17-001",
    modulo: 17,
    pregunta: "¿Qué distingue una inversión cívica regional de una donación dispersa sin impacto estructural?",
    respuestaCorrecta: "La evaluación técnica previa, trazabilidad financiera, seguimiento público y medición verificable de resultados.",
    distractores: [
      "La participación exclusiva de inversionistas de la diáspora.",
      "La concentración de recursos en proyectos de alta visibilidad.",
      "La ausencia de retorno económico para evitar riesgos."
    ]
  },
  {
    id: "mod17-002",
    modulo: 17,
    pregunta: "¿Qué criterio fortalece más la viabilidad económica de un proyecto regional?",
    respuestaCorrecta: "Demanda verificable, estructura de costos realista, gobernanza clara y capacidad operativa local.",
    distractores: [
      "Popularidad comunitaria del emprendimiento.",
      "Monto inicial elevado de financiamiento.",
      "Respaldo público de autoridades locales."
    ]
  },
  {
    id: "mod17-003",
    modulo: 17,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye banca, regulación financiera ni política económica formal.",
    distractores: [
      "No puede evaluar proyectos productivos.",
      "No puede recibir inversión de la diáspora.",
      "No puede generar tableros de impacto."
    ]
  },
  {
    id: "mod17-004",
    modulo: 17,
    pregunta: "¿Qué vuelve técnicamente sólido un mercado cívico de inversión?",
    respuestaCorrecta: "Publicar proyectos con riesgos, gobernanza, métricas de impacto, uso de recursos y seguimiento auditable.",
    distractores: [
      "Aceptar todos los proyectos para maximizar participación.",
      "Prometer retornos mínimos para atraer capital.",
      "Priorizar proyectos con narrativa emocional."
    ]
  },
  {
    id: "mod17-005",
    modulo: 17,
    pregunta: "¿Qué riesgo existe cuando evaluación técnica y financiamiento no están separados?",
    respuestaCorrecta: "Captura de criterios de viabilidad por intereses de inversionistas o promotores.",
    distractores: [
      "Reducción automática de participación ciudadana.",
      "Imposibilidad de usar análisis geoespacial.",
      "Eliminación de impacto social medible."
    ]
  },
  {
    id: "mod17-006",
    modulo: 17,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Analizar viabilidad, detectar anomalías, monitorear ejecución y reducir asimetrías de información.",
    distractores: [
      "Decidir automáticamente qué proyectos reciben inversión.",
      "Garantizar rentabilidad financiera de proyectos aprobados.",
      "Sustituir auditoría humana y comités expertos."
    ]
  },
  {
    id: "mod17-007",
    modulo: 17,
    pregunta: "¿Qué diferencia existe entre impacto económico local y simple captación de capital?",
    respuestaCorrecta: "El impacto local se mide por empleo, ingresos, encadenamientos productivos y permanencia territorial.",
    distractores: [
      "La captación de capital siempre genera desarrollo regional.",
      "El impacto local depende solo del monto invertido.",
      "Ambos conceptos son equivalentes si existe crowdfunding."
    ]
  },
  {
    id: "mod17-008",
    modulo: 17,
    pregunta: "¿Qué característica fortalece más un esquema de deuda social?",
    respuestaCorrecta: "Condiciones transparentes, riesgo explícito, destino productivo verificable y capacidad real de pago.",
    distractores: [
      "Promesa de retorno garantizado por solidaridad comunitaria.",
      "Ausencia de intereses para eliminar riesgo financiero.",
      "Participación exclusiva de inversionistas pequeños."
    ]
  },
  {
    id: "mod17-009",
    modulo: 17,
    pregunta: "¿Qué hace metodológicamente robusta una evaluación de impacto regional?",
    respuestaCorrecta: "Medir empleo, ingresos locales, proveedores regionales, sostenibilidad y reducción de brechas.",
    distractores: [
      "Comparar únicamente monto total recaudado.",
      "Medir número de inversionistas participantes.",
      "Priorizar popularidad del proyecto en redes."
    ]
  },
  {
    id: "mod17-010",
    modulo: 17,
    pregunta: "¿Qué riesgo surge al financiar proyectos sin gobernanza verificable?",
    respuestaCorrecta: "Desvío de recursos, captura local, incumplimiento operativo y pérdida de confianza colectiva.",
    distractores: [
      "Reducción automática de rentabilidad social.",
      "Imposibilidad de recibir fondos internacionales.",
      "Eliminación de participación comunitaria."
    ]
  },
  {
    id: "mod17-011",
    modulo: 17,
    pregunta: "¿Qué vuelve internacionalmente relevante un informe de inversión cívica?",
    respuestaCorrecta: "Evidencia verificable de impacto, trazabilidad financiera y alineación con estándares de inversión responsable.",
    distractores: [
      "Traducción del informe a varios idiomas.",
      "Participación de inversionistas extranjeros.",
      "Monto total acumulado de donaciones."
    ]
  },
  {
    id: "mod17-012",
    modulo: 17,
    pregunta: "¿Qué práctica reduce mejor riesgo de fraude en proyectos financiados por crowdfunding?",
    respuestaCorrecta: "Validación técnica previa, desembolsos condicionados, trazabilidad transaccional y auditoría continua.",
    distractores: [
      "Publicación de testimonios de promotores.",
      "Recaudación rápida antes de evaluar viabilidad.",
      "Confianza basada en identidad comunitaria."
    ]
  },
  {
    id: "mod17-013",
    modulo: 17,
    pregunta: "¿Qué criterio protege mejor a inversionistas ciudadanos no sofisticados?",
    respuestaCorrecta: "Divulgación clara de riesgos, límites de concentración y ausencia de promesas de rentabilidad garantizada.",
    distractores: [
      "Priorizar proyectos con mayor entusiasmo comunitario.",
      "Permitir inversión sin información para reducir fricción.",
      "Usar lenguaje financiero complejo para precisión técnica."
    ]
  },
  {
    id: "mod17-014",
    modulo: 17,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de transacciones, reportes, versiones y avances del proyecto.",
    distractores: [
      "Garantizar automáticamente rentabilidad futura.",
      "Sustituir evaluación financiera profesional.",
      "Resolver incumplimientos contractuales sin intervención."
    ]
  },
  {
    id: "mod17-015",
    modulo: 17,
    pregunta: "¿Qué vuelve sólido un análisis de encadenamientos productivos?",
    respuestaCorrecta: "Identificar proveedores, empleo, insumos, distribución de valor y capacidad de arraigo regional.",
    distractores: [
      "Medir únicamente ventas proyectadas.",
      "Priorizar exportación inmediata.",
      "Comparar solo margen de utilidad."
    ]
  },
  {
    id: "mod17-016",
    modulo: 17,
    pregunta: "¿Qué problema surge cuando el capital de la diáspora se canaliza sin mecanismos de rendición de cuentas?",
    respuestaCorrecta: "Aumenta el riesgo de intermediación opaca, frustración comunitaria y pérdida de confianza transnacional.",
    distractores: [
      "Se elimina automáticamente el impacto local.",
      "Se impide toda cooperación internacional.",
      "Se reduce la participación de PYMES."
    ]
  },
  {
    id: "mod17-017",
    modulo: 17,
    pregunta: "¿Qué característica fortalece más la sostenibilidad de un proyecto productivo comunitario?",
    respuestaCorrecta: "Modelo financiero viable, gobernanza local, capacidad técnica y mercado real identificado.",
    distractores: [
      "Alta recaudación inicial de donaciones.",
      "Respaldo simbólico de líderes comunitarios.",
      "Promoción digital intensa durante el lanzamiento."
    ]
  },
  {
    id: "mod17-018",
    modulo: 17,
    pregunta: "¿Qué riesgo metodológico existe al priorizar proyectos solo por rentabilidad financiera?",
    respuestaCorrecta: "Excluir impacto social, sostenibilidad territorial y reducción de desigualdad regional.",
    distractores: [
      "Reducir eficiencia de inversión.",
      "Impedir trazabilidad financiera.",
      "Eliminar participación de expertos."
    ]
  },
  {
    id: "mod17-019",
    modulo: 17,
    pregunta: "¿Qué hace técnicamente consistente un tablero público de seguimiento?",
    respuestaCorrecta: "Mostrar recursos recibidos, hitos, gasto ejecutado, resultados y desviaciones verificables.",
    distractores: [
      "Publicar únicamente fotografías de avance.",
      "Reportar solo montos agregados trimestrales.",
      "Ocultar desviaciones para proteger reputación."
    ]
  },
  {
    id: "mod17-020",
    modulo: 17,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Evaluar viabilidad, riesgos, gobernanza, sostenibilidad e impacto antes y durante la ejecución.",
    distractores: [
      "Administrar directamente empresas financiadas.",
      "Garantizar retorno económico a inversionistas.",
      "Sustituir regulación financiera nacional."
    ]
  },
  {
    id: "mod17-021",
    modulo: 17,
    pregunta: "¿Qué caracteriza a un proyecto con alto riesgo de captura política?",
    respuestaCorrecta: "Dependencia de intermediarios partidistas, beneficiarios opacos y asignación discrecional de recursos.",
    distractores: [
      "Participación de cooperativas locales.",
      "Financiamiento de múltiples pequeños inversionistas.",
      "Publicación de indicadores de impacto."
    ]
  },
  {
    id: "mod17-022",
    modulo: 17,
    pregunta: "¿Qué vuelve útil el análisis geoespacial en inversión cívica?",
    respuestaCorrecta: "Permite mapear brechas, vocaciones productivas, infraestructura disponible e impacto territorial.",
    distractores: [
      "Determina automáticamente qué proyecto será rentable.",
      "Sustituye estudios de mercado.",
      "Elimina necesidad de auditoría financiera."
    ]
  },
  {
    id: "mod17-023",
    modulo: 17,
    pregunta: "¿Qué diferencia existe entre filantropía estratégica e inversión cívica con seguimiento?",
    respuestaCorrecta: "La inversión cívica vincula recursos a proyectos productivos con métricas, trazabilidad y resultados medibles.",
    distractores: [
      "La filantropía estratégica carece de impacto social.",
      "La inversión cívica siempre exige retorno financiero.",
      "Ambas funcionan igual si hay donantes suficientes."
    ]
  },
  {
    id: "mod17-024",
    modulo: 17,
    pregunta: "¿Qué práctica reduce mejor la concentración indebida de capital en pocos proyectos?",
    respuestaCorrecta: "Límites de concentración, diversificación sectorial y reglas transparentes de priorización.",
    distractores: [
      "Permitir que inversionistas mayores decidan prioridades.",
      "Financiar solo proyectos con mayor rentabilidad esperada.",
      "Eliminar proyectos pequeños por costos administrativos."
    ]
  },
  {
    id: "mod17-025",
    modulo: 17,
    pregunta: "¿Qué criterio fortalece más una cartera regional de proyectos?",
    respuestaCorrecta: "Diversidad sectorial, complementariedad productiva, viabilidad y alineación con vocaciones territoriales.",
    distractores: [
      "Máxima homogeneidad de proyectos para facilitar gestión.",
      "Concentración en un solo sector exitoso.",
      "Selección basada en visibilidad pública."
    ]
  },
  {
    id: "mod17-026",
    modulo: 17,
    pregunta: "¿Qué problema surge al publicar información financiera sensible sin salvaguardas?",
    respuestaCorrecta: "Exponer a emprendedores, inversionistas o comunidades a fraude, presión o competencia indebida.",
    distractores: [
      "Eliminar la posibilidad de auditoría pública.",
      "Reducir automáticamente el impacto social.",
      "Impedir la inversión de la diáspora."
    ]
  },
  {
    id: "mod17-027",
    modulo: 17,
    pregunta: "¿Qué hace sólida una evaluación de sostenibilidad de proyecto regional?",
    respuestaCorrecta: "Integrar impacto ambiental, continuidad financiera, empleo digno y resiliencia operativa.",
    distractores: [
      "Medir únicamente utilidad esperada.",
      "Priorizar velocidad de ejecución.",
      "Evaluar solo número de empleos iniciales."
    ]
  },
  {
    id: "mod17-028",
    modulo: 17,
    pregunta: "¿Qué riesgo existe cuando se promete rentabilidad garantizada en inversión cívica?",
    respuestaCorrecta: "Inducir decisiones desinformadas y convertir solidaridad en riesgo financiero mal representado.",
    distractores: [
      "Reducir participación de grandes inversionistas.",
      "Impedir participación comunitaria.",
      "Eliminar impacto regional del proyecto."
    ]
  },
  {
    id: "mod17-029",
    modulo: 17,
    pregunta: "¿Qué característica fortalece más la cooperación con la diáspora?",
    respuestaCorrecta: "Canales confiables, trazabilidad del recurso, resultados verificables y vínculo territorial transparente.",
    distractores: [
      "Campañas emocionales de identidad regional.",
      "Eventos públicos de recaudación masiva.",
      "Intermediación de liderazgos políticos locales."
    ]
  },
  {
    id: "mod17-030",
    modulo: 17,
    pregunta: "¿Cuál es el principio rector del Módulo 17?",
    respuestaCorrecta: "El desarrollo regional requiere capital con rumbo, confianza verificable, trazabilidad e impacto medible.",
    distractores: [
      "La inversión ciudadana debe sustituir política económica formal.",
      "El capital privado siempre genera bienestar regional.",
      "La diáspora debe financiar proyectos sin evaluación técnica."
    ]
  }
]);

const preguntasTecnicasModulo18 = adaptarBancoTecnico([
{
    id: "mod18-001",
    modulo: 18,
    pregunta: "¿Qué distingue un proyecto energéticamente soberano de un proyecto políticamente dependiente?",
    respuestaCorrecta: "La capacidad verificable de garantizar seguridad energética, resiliencia y beneficio social sin dependencia crítica externa.",
    distractores: [
      "La propiedad estatal mayoritaria del proyecto.",
      "La aprobación política del proyecto por mayoría legislativa.",
      "El uso exclusivo de recursos fósiles nacionales."
    ]
  },
  {
    id: "mod18-002",
    modulo: 18,
    pregunta: "¿Qué característica fortalece más una evaluación energética de ciclo de vida?",
    respuestaCorrecta: "Integrar construcción, operación, mantenimiento, emisiones, desmantelamiento y externalidades acumulativas.",
    distractores: [
      "Comparar únicamente costos iniciales de infraestructura.",
      "Priorizar generación energética anual máxima.",
      "Medir solo precio final de electricidad."
    ]
  },
  {
    id: "mod18-003",
    modulo: 18,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No autoriza, cancela ni ejecuta proyectos energéticos o extractivos.",
    distractores: [
      "No puede evaluar hidrocarburos.",
      "No puede emitir dictámenes públicos.",
      "No puede comparar tecnologías energéticas."
    ]
  },
  {
    id: "mod18-004",
    modulo: 18,
    pregunta: "¿Qué hace metodológicamente sólido un dictamen de transición energética?",
    respuestaCorrecta: "Comparar confiabilidad, emisiones, costos, almacenamiento, resiliencia y seguridad de suministro.",
    distractores: [
      "Priorizar únicamente energías renovables.",
      "Eliminar análisis económico para evitar sesgos.",
      "Comparar exclusivamente capacidad instalada."
    ]
  },
  {
    id: "mod18-005",
    modulo: 18,
    pregunta: "¿Qué riesgo surge cuando la política energética depende de decisiones de corto plazo?",
    respuestaCorrecta: "Generar vulnerabilidad estructural, sobrecostos y dependencia tecnológica acumulativa.",
    distractores: [
      "Reducir automáticamente inversión privada.",
      "Eliminar participación ciudadana energética.",
      "Impedir exportación de hidrocarburos."
    ]
  },
  {
    id: "mod18-006",
    modulo: 18,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Comparar escenarios, detectar inconsistencias y modelar impactos energéticos y ambientales.",
    distractores: [
      "Decidir automáticamente qué proyectos deben aprobarse.",
      "Sustituir peritajes ambientales humanos.",
      "Emitir autorizaciones regulatorias vinculantes."
    ]
  },
  {
    id: "mod18-007",
    modulo: 18,
    pregunta: "¿Qué diferencia existe entre independencia energética y soberanía energética?",
    respuestaCorrecta: "La soberanía integra seguridad, resiliencia, beneficio social y control estratégico sostenible.",
    distractores: [
      "La independencia energética elimina necesidad de importaciones.",
      "La soberanía depende únicamente de producción petrolera.",
      "Ambos conceptos son equivalentes técnicamente."
    ]
  },
  {
    id: "mod18-008",
    modulo: 18,
    pregunta: "¿Qué característica vuelve robusta una evaluación de impacto acumulativo?",
    respuestaCorrecta: "Relacionar múltiples proyectos, recursos compartidos y efectos ambientales de largo plazo.",
    distractores: [
      "Medir únicamente emisiones directas individuales.",
      "Priorizar proyectos de menor tamaño.",
      "Comparar exclusivamente cumplimiento documental."
    ]
  },
  {
    id: "mod18-009",
    modulo: 18,
    pregunta: "¿Qué riesgo metodológico existe al evaluar minería sin análisis hídrico integral?",
    respuestaCorrecta: "Subestimar impactos territoriales, competencia por agua y degradación ambiental irreversible.",
    distractores: [
      "Reducir precisión de modelos financieros.",
      "Eliminar trazabilidad de permisos.",
      "Impedir análisis geológico comparativo."
    ]
  },
  {
    id: "mod18-010",
    modulo: 18,
    pregunta: "¿Qué hace técnicamente consistente un análisis de beneficio social energético?",
    respuestaCorrecta: "Medir empleo local, tarifas, acceso, transferencia tecnológica y efectos territoriales verificables.",
    distractores: [
      "Comparar únicamente inversión total anunciada.",
      "Priorizar generación eléctrica absoluta.",
      "Evaluar solo impacto fiscal inmediato."
    ]
  },
  {
    id: "mod18-011",
    modulo: 18,
    pregunta: "¿Qué vuelve internacionalmente relevante un dictamen energético ciudadano?",
    respuestaCorrecta: "Documentar riesgos y beneficios conforme a estándares climáticos, ambientales y de gobernanza reconocidos.",
    distractores: [
      "Traducir informes a múltiples idiomas.",
      "Participación de consultoras extranjeras.",
      "Comparar únicamente precios internacionales."
    ]
  },
  {
    id: "mod18-012",
    modulo: 18,
    pregunta: "¿Qué práctica reduce mejor el riesgo de captura política de proyectos estratégicos?",
    respuestaCorrecta: "Separar evaluación técnica, financiamiento y deliberación política mediante trazabilidad pública.",
    distractores: [
      "Centralizar decisiones energéticas en una sola institución.",
      "Limitar acceso ciudadano a estudios técnicos.",
      "Priorizar velocidad de aprobación."
    ]
  },
  {
    id: "mod18-013",
    modulo: 18,
    pregunta: "¿Qué característica fortalece más la resiliencia de un sistema eléctrico?",
    respuestaCorrecta: "Diversificación energética, almacenamiento, redundancia y capacidad de respuesta ante interrupciones.",
    distractores: [
      "Dependencia de una fuente energética dominante.",
      "Priorizar generación de menor costo inmediato.",
      "Incrementar importaciones de electricidad."
    ]
  },
  {
    id: "mod18-014",
    modulo: 18,
    pregunta: "¿Qué problema surge al comparar tecnologías energéticas sin costos de ciclo de vida?",
    respuestaCorrecta: "Ocultar mantenimiento, externalidades y dependencia futura de infraestructura o combustibles.",
    distractores: [
      "Reducir capacidad de generación instalada.",
      "Eliminar compatibilidad regulatoria.",
      "Impedir financiamiento internacional."
    ]
  },
  {
    id: "mod18-015",
    modulo: 18,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodologías, revisar escenarios y emitir dictámenes comparativos técnicamente auditables.",
    distractores: [
      "Autorizar directamente proyectos extractivos.",
      "Administrar operación energética nacional.",
      "Sustituir órganos reguladores existentes."
    ]
  },
  {
    id: "mod18-016",
    modulo: 18,
    pregunta: "¿Qué hace sólida una evaluación de transición energética justa?",
    respuestaCorrecta: "Integrar reducción de emisiones con empleo, acceso equitativo y adaptación territorial.",
    distractores: [
      "Cerrar infraestructura fósil inmediatamente.",
      "Priorizar solo metas internacionales climáticas.",
      "Eliminar subsidios energéticos sin gradualidad."
    ]
  },
  {
    id: "mod18-017",
    modulo: 18,
    pregunta: "¿Qué riesgo existe cuando un megaproyecto energético ignora comunidades territoriales?",
    respuestaCorrecta: "Incrementar conflicto social, pérdida de legitimidad y vulnerabilidad operativa del proyecto.",
    distractores: [
      "Reducir generación energética máxima.",
      "Eliminar toda rentabilidad financiera.",
      "Impedir exportación de energía."
    ]
  },
  {
    id: "mod18-018",
    modulo: 18,
    pregunta: "¿Qué característica fortalece más un análisis de minería estratégica?",
    respuestaCorrecta: "Relacionar extracción, valor agregado nacional, impactos ambientales y dependencia tecnológica.",
    distractores: [
      "Comparar únicamente volumen de extracción.",
      "Priorizar exportaciones inmediatas.",
      "Medir solo inversión extranjera recibida."
    ]
  },
  {
    id: "mod18-019",
    modulo: 18,
    pregunta: "¿Qué práctica protege mejor legitimidad técnica del módulo?",
    respuestaCorrecta: "Usar metodologías públicas, escenarios comparables y revisión interdisciplinaria transparente.",
    distractores: [
      "Excluir proyectos políticamente sensibles.",
      "Centralizar análisis en una sola disciplina.",
      "Publicar únicamente conclusiones resumidas."
    ]
  },
  {
    id: "mod18-020",
    modulo: 18,
    pregunta: "¿Qué vuelve técnicamente útil un mapa geoespacial energético?",
    respuestaCorrecta: "Integrar demanda, recursos, vulnerabilidad climática, infraestructura y conflictos territoriales.",
    distractores: [
      "Mostrar únicamente ubicación de plantas eléctricas.",
      "Priorizar regiones de alta rentabilidad.",
      "Excluir variables sociales complejas."
    ]
  },
  {
    id: "mod18-021",
    modulo: 18,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de estudios, versiones y trazabilidad documental energética.",
    distractores: [
      "Garantizar precisión automática de escenarios.",
      "Sustituir auditorías técnicas ambientales.",
      "Resolver disputas regulatorias automáticamente."
    ]
  },
  {
    id: "mod18-022",
    modulo: 18,
    pregunta: "¿Qué diferencia existe entre energía barata y energía sostenible?",
    respuestaCorrecta: "La sostenibilidad incorpora costos ambientales, resiliencia y continuidad de largo plazo.",
    distractores: [
      "La energía barata siempre es ambientalmente dañina.",
      "La sostenibilidad depende únicamente de renovables.",
      "Ambos conceptos son equivalentes financieramente."
    ]
  },
  {
    id: "mod18-023",
    modulo: 18,
    pregunta: "¿Qué hace metodológicamente consistente un análisis de dependencia energética?",
    respuestaCorrecta: "Evaluar importaciones críticas, vulnerabilidad tecnológica y capacidad nacional de respuesta.",
    distractores: [
      "Comparar únicamente reservas de hidrocarburos.",
      "Medir solo capacidad de refinación.",
      "Priorizar costos de generación anual."
    ]
  },
  {
    id: "mod18-024",
    modulo: 18,
    pregunta: "¿Qué riesgo surge cuando las consultas energéticas son solo simbólicas?",
    respuestaCorrecta: "Deslegitimar participación social y ocultar decisiones tomadas sin deliberación técnica real.",
    distractores: [
      "Reducir producción energética nacional.",
      "Eliminar inversión privada extranjera.",
      "Impedir innovación tecnológica."
    ]
  },
  {
    id: "mod18-025",
    modulo: 18,
    pregunta: "¿Qué característica fortalece más una estrategia de almacenamiento energético?",
    respuestaCorrecta: "Integrar estabilidad de red, respaldo operativo y capacidad de adaptación ante demanda variable.",
    distractores: [
      "Priorizar únicamente capacidad máxima instalada.",
      "Reducir toda generación fósil inmediatamente.",
      "Comparar solo costos iniciales de baterías."
    ]
  },
  {
    id: "mod18-026",
    modulo: 18,
    pregunta: "¿Qué vuelve robusta una evaluación ambiental energética?",
    respuestaCorrecta: "Relacionar emisiones, agua, biodiversidad, residuos, territorio y resiliencia climática acumulativa.",
    distractores: [
      "Medir exclusivamente emisiones directas.",
      "Priorizar cumplimiento documental administrativo.",
      "Comparar solo consumo energético bruto."
    ]
  },
  {
    id: "mod18-027",
    modulo: 18,
    pregunta: "¿Qué problema surge cuando el beneficio social no es verificable?",
    respuestaCorrecta: "Se facilita propaganda energética sin evidencia de mejoras reales para la población.",
    distractores: [
      "Se elimina capacidad de exportación.",
      "Se reduce automáticamente la inversión.",
      "Se impide operación técnica del proyecto."
    ]
  },
  {
    id: "mod18-028",
    modulo: 18,
    pregunta: "¿Qué criterio fortalece más una política de recursos estratégicos?",
    respuestaCorrecta: "Equilibrar seguridad nacional, sostenibilidad ambiental y valor agregado territorial.",
    distractores: [
      "Maximizar extracción de recursos a corto plazo.",
      "Priorizar únicamente ingresos fiscales inmediatos.",
      "Reducir participación comunitaria para acelerar proyectos."
    ]
  },
  {
    id: "mod18-029",
    modulo: 18,
    pregunta: "¿Qué característica vuelve útil una comparación entre proyectos y alternativas?",
    respuestaCorrecta: "Permitir identificar opciones superiores en costo, impacto, resiliencia y beneficio social.",
    distractores: [
      "Eliminar decisiones políticas del sector energético.",
      "Garantizar aprobación automática de renovables.",
      "Sustituir regulación ambiental vigente."
    ]
  },
  {
    id: "mod18-030",
    modulo: 18,
    pregunta: "¿Cuál es el principio rector del Módulo 18?",
    respuestaCorrecta: "La soberanía energética se demuestra con decisiones técnicas, sostenibles y socialmente verificables.",
    distractores: [
      "La autosuficiencia energética justifica cualquier impacto ambiental.",
      "La transición energética debe ignorar costos sociales.",
      "Los recursos estratégicos deben explotarse sin evaluación comparativa."
    ]
  }
]);

const preguntasTecnicasModulo19 = adaptarBancoTecnico([
{
    id: "mod19-001",
    modulo: 19,
    pregunta: "¿Qué característica convierte una licitación aparentemente abierta en un proceso estructuralmente excluyente?",
    respuestaCorrecta: "Requisitos desproporcionados que limitan competencia efectiva sin justificación técnica verificable.",
    distractores: [
      "La existencia de juntas de aclaraciones múltiples.",
      "La participación de empresas internacionales.",
      "La publicación digital de bases concursales."
    ]
  },
  {
    id: "mod19-002",
    modulo: 19,
    pregunta: "¿Qué criterio fortalece más una licitación pro-MiPyME sin comprometer calidad?",
    respuestaCorrecta: "Lotificación técnica, garantías proporcionales y criterios objetivos de desempeño verificable.",
    distractores: [
      "Reducción generalizada de requisitos técnicos.",
      "Asignación preferencial automática a empresas locales.",
      "Eliminación de validaciones financieras mínimas."
    ]
  },
  {
    id: "mod19-003",
    modulo: 19,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No adjudica contratos públicos ni sustituye autoridades competentes.",
    distractores: [
      "No puede analizar bases de licitación.",
      "No puede simular escenarios comparativos.",
      "No puede documentar riesgos de colusión."
    ]
  },
  {
    id: "mod19-004",
    modulo: 19,
    pregunta: "¿Qué vuelve metodológicamente sólida una simulación de concurso público?",
    respuestaCorrecta: "Comparar escenarios alternativos usando métricas verificables de competencia, costo y cumplimiento.",
    distractores: [
      "Eliminar restricciones legales para atraer más participantes.",
      "Permitir ajustes discrecionales durante evaluación.",
      "Priorizar propuestas con menor costo inmediato."
    ]
  },
  {
    id: "mod19-005",
    modulo: 19,
    pregunta: "¿Qué riesgo existe cuando los criterios técnicos son ambiguos o subjetivos?",
    respuestaCorrecta: "Facilitar discrecionalidad, simulación de competencia y direccionamiento encubierto.",
    distractores: [
      "Reducir automáticamente calidad del servicio.",
      "Eliminar participación de empresas grandes.",
      "Impedir evaluación financiera comparativa."
    ]
  },
  {
    id: "mod19-006",
    modulo: 19,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Detectar cláusulas excluyentes, modelar escenarios y comparar integridad competitiva.",
    distractores: [
      "Decidir automáticamente adjudicaciones.",
      "Sustituir comités de evaluación humana.",
      "Garantizar ausencia absoluta de corrupción."
    ]
  },
  {
    id: "mod19-007",
    modulo: 19,
    pregunta: "¿Qué diferencia existe entre precio más bajo y mejor valor público?",
    respuestaCorrecta: "El mejor valor integra calidad, sostenibilidad, cumplimiento y costo total verificable.",
    distractores: [
      "El precio más bajo siempre maximiza eficiencia pública.",
      "El mejor valor depende solo de innovación tecnológica.",
      "Ambos conceptos son equivalentes presupuestalmente."
    ]
  },
  {
    id: "mod19-008",
    modulo: 19,
    pregunta: "¿Qué característica fortalece más una auditoría de competencia efectiva?",
    respuestaCorrecta: "Analizar número real de participantes, barreras de entrada y concentración recurrente.",
    distractores: [
      "Comparar únicamente montos adjudicados.",
      "Priorizar rapidez de contratación pública.",
      "Medir solo volumen de contratos emitidos."
    ]
  },
  {
    id: "mod19-009",
    modulo: 19,
    pregunta: "¿Qué riesgo metodológico surge cuando una licitación se diseña para un proveedor específico?",
    respuestaCorrecta: "Reducir competencia, elevar costos y deteriorar legitimidad institucional verificable.",
    distractores: [
      "Aumentar capacidad de cumplimiento técnico.",
      "Eliminar incertidumbre operativa del contrato.",
      "Reducir tiempo administrativo de evaluación."
    ]
  },
  {
    id: "mod19-010",
    modulo: 19,
    pregunta: "¿Qué hace técnicamente consistente un análisis de sobreprecio?",
    respuestaCorrecta: "Comparar precios históricos, mercado relevante, especificaciones y costos de ciclo de vida.",
    distractores: [
      "Evaluar únicamente monto final adjudicado.",
      "Comparar precios sin contexto técnico.",
      "Priorizar percepción pública de corrupción."
    ]
  },
  {
    id: "mod19-011",
    modulo: 19,
    pregunta: "¿Qué vuelve internacionalmente relevante un informe de contratación pública?",
    respuestaCorrecta: "Documentar competencia, trazabilidad y cumplimiento conforme a estándares de Open Contracting.",
    distractores: [
      "Traducir documentos contractuales a varios idiomas.",
      "Incluir únicamente montos de adjudicación.",
      "Comparar contratos con otros países."
    ]
  },
  {
    id: "mod19-012",
    modulo: 19,
    pregunta: "¿Qué práctica reduce mejor riesgo de colusión entre proveedores?",
    respuestaCorrecta: "Detectar patrones repetitivos de participación, precios y distribución de contratos.",
    distractores: [
      "Limitar número de participantes por concurso.",
      "Reducir transparencia de propuestas económicas.",
      "Centralizar contratos en proveedores certificados."
    ]
  },
  {
    id: "mod19-013",
    modulo: 19,
    pregunta: "¿Qué criterio fortalece más pagos oportunos para MiPyMEs?",
    respuestaCorrecta: "Calendarios verificables, garantías proporcionales y seguimiento transparente de cumplimiento.",
    distractores: [
      "Eliminar completamente requisitos administrativos.",
      "Permitir pagos discrecionales por desempeño subjetivo.",
      "Priorizar contratos de gran escala."
    ]
  },
  {
    id: "mod19-014",
    modulo: 19,
    pregunta: "¿Qué problema surge cuando se exigen capacidades financieras desproporcionadas?",
    respuestaCorrecta: "Excluir MiPyMEs viables y concentrar contratos en pocos actores dominantes.",
    distractores: [
      "Reducir calidad técnica de participantes.",
      "Eliminar trazabilidad contractual.",
      "Impedir evaluación de desempeño."
    ]
  },
  {
    id: "mod19-015",
    modulo: 19,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodologías, revisar simulaciones y emitir dictámenes técnicos auditables.",
    distractores: [
      "Adjudicar directamente concursos públicos.",
      "Garantizar contratos a MiPyMEs participantes.",
      "Sustituir órganos internos de control."
    ]
  },
  {
    id: "mod19-016",
    modulo: 19,
    pregunta: "¿Qué hace sólida una evaluación de integridad de bases de licitación?",
    respuestaCorrecta: "Analizar proporcionalidad de requisitos, claridad de criterios y apertura competitiva verificable.",
    distractores: [
      "Comparar únicamente extensión de las bases.",
      "Priorizar requisitos técnicos más estrictos.",
      "Medir solo número de aclaraciones recibidas."
    ]
  },
  {
    id: "mod19-017",
    modulo: 19,
    pregunta: "¿Qué riesgo existe cuando la ciudadanía interpreta simulaciones como adjudicaciones reales?",
    respuestaCorrecta: "Confundir análisis comparativo con facultades legales inexistentes del módulo.",
    distractores: [
      "Reducir transparencia de resultados.",
      "Eliminar participación de MiPyMEs.",
      "Impedir auditorías externas."
    ]
  },
  {
    id: "mod19-018",
    modulo: 19,
    pregunta: "¿Qué característica fortalece más un modelo de compras públicas éticas?",
    respuestaCorrecta: "Competencia efectiva, trazabilidad, criterios objetivos y seguimiento verificable del cumplimiento.",
    distractores: [
      "Centralización absoluta de adquisiciones.",
      "Priorizar únicamente ahorro inmediato.",
      "Eliminar evaluación técnica especializada."
    ]
  },
  {
    id: "mod19-019",
    modulo: 19,
    pregunta: "¿Qué práctica protege mejor legitimidad del módulo?",
    respuestaCorrecta: "Separar análisis técnico de intereses comerciales y publicar conflictos de interés.",
    distractores: [
      "Excluir completamente empresas privadas.",
      "Centralizar decisiones metodológicas.",
      "Publicar únicamente resultados agregados."
    ]
  },
  {
    id: "mod19-020",
    modulo: 19,
    pregunta: "¿Qué vuelve útil un análisis geoespacial de contratación pública?",
    respuestaCorrecta: "Identificar concentración territorial, brechas regionales y participación efectiva de MiPyMEs.",
    distractores: [
      "Determinar automáticamente corrupción contractual.",
      "Eliminar necesidad de auditoría financiera.",
      "Sustituir evaluación legal administrativa."
    ]
  },
  {
    id: "mod19-021",
    modulo: 19,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de versiones, contratos, simulaciones y dictámenes.",
    distractores: [
      "Garantizar adjudicaciones libres de corrupción.",
      "Sustituir revisión jurídica especializada.",
      "Resolver controversias administrativas automáticamente."
    ]
  },
  {
    id: "mod19-022",
    modulo: 19,
    pregunta: "¿Qué diferencia existe entre transparencia formal y transparencia efectiva?",
    respuestaCorrecta: "La transparencia efectiva permite análisis comprensible, comparable y verificable de decisiones.",
    distractores: [
      "La transparencia formal elimina corrupción automáticamente.",
      "La transparencia efectiva depende solo de tecnología digital.",
      "Ambos conceptos son equivalentes jurídicamente."
    ]
  },
  {
    id: "mod19-023",
    modulo: 19,
    pregunta: "¿Qué hace metodológicamente consistente un laboratorio pro-MiPyMEs?",
    respuestaCorrecta: "Experimentar modelos comparables que reduzcan barreras sin deteriorar calidad ni cumplimiento.",
    distractores: [
      "Eliminar competencia de grandes empresas.",
      "Asignar contratos exclusivos a empresas locales.",
      "Reducir estándares técnicos para ampliar acceso."
    ]
  },
  {
    id: "mod19-024",
    modulo: 19,
    pregunta: "¿Qué riesgo surge cuando el criterio principal es la relación política del proveedor?",
    respuestaCorrecta: "Distorsionar competencia y elevar costos mediante captura institucional de contratación.",
    distractores: [
      "Reducir automáticamente capacidad operativa.",
      "Eliminar participación ciudadana.",
      "Impedir financiamiento internacional."
    ]
  },
  {
    id: "mod19-025",
    modulo: 19,
    pregunta: "¿Qué característica fortalece más una evaluación de cumplimiento contractual?",
    respuestaCorrecta: "Comparar entregables, tiempos, calidad y desviaciones respecto a condiciones originales.",
    distractores: [
      "Medir únicamente monto adjudicado.",
      "Priorizar rapidez de firma contractual.",
      "Comparar solo número de modificaciones."
    ]
  },
  {
    id: "mod19-026",
    modulo: 19,
    pregunta: "¿Qué vuelve robusta una estrategia de lotificación?",
    respuestaCorrecta: "Dividir contratos técnicamente sin fragmentación artificial ni pérdida de eficiencia operativa.",
    distractores: [
      "Crear el mayor número posible de contratos.",
      "Eliminar contratos integrales complejos.",
      "Asignar lotes según capacidad política regional."
    ]
  },
  {
    id: "mod19-027",
    modulo: 19,
    pregunta: "¿Qué problema surge cuando no existen métricas comparables de desempeño?",
    respuestaCorrecta: "Impedir evaluación objetiva y facilitar adjudicaciones discrecionales repetitivas.",
    distractores: [
      "Reducir participación de MiPyMEs.",
      "Eliminar capacidad jurídica de contratación.",
      "Impedir digitalización de concursos."
    ]
  },
  {
    id: "mod19-028",
    modulo: 19,
    pregunta: "¿Qué criterio fortalece más una plataforma cívica voluntaria para MiPyMEs?",
    respuestaCorrecta: "Verificación operativa, trazabilidad financiera y reglas abiertas auditables.",
    distractores: [
      "Asignación automática de proyectos comunitarios.",
      "Promesas de contratación pública futura.",
      "Priorización por popularidad empresarial."
    ]
  },
  {
    id: "mod19-029",
    modulo: 19,
    pregunta: "¿Qué característica vuelve útil una comparación entre procesos reales y simulados?",
    respuestaCorrecta: "Demostrar alternativas más competitivas, transparentes y eficientes con evidencia verificable.",
    distractores: [
      "Eliminar necesidad de regulación pública.",
      "Garantizar reducción automática de corrupción.",
      "Sustituir completamente licitaciones formales."
    ]
  },
  {
    id: "mod19-030",
    modulo: 19,
    pregunta: "¿Cuál es el principio rector del Módulo 19?",
    respuestaCorrecta: "La contratación pública justa se demuestra mediante competencia verificable, apertura y rendición de cuentas.",
    distractores: [
      "La eficiencia contractual depende solo del menor precio.",
      "Las MiPyMEs deben recibir contratos sin evaluación técnica.",
      "La transparencia por sí sola elimina corrupción."
    ]
  }
]);

const preguntasTecnicasModulo20 = adaptarBancoTecnico([
{
    id: "mod20-001",
    modulo: 20,
    pregunta: "¿Qué distingue un indicador cívico verificable de una estadística pública opaca?",
    respuestaCorrecta: "Origen documentado, metodología reproducible, supuestos explícitos y trazabilidad de versiones.",
    distractores: [
      "Publicación en formato PDF institucional.",
      "Uso de lenguaje técnico especializado.",
      "Validación exclusiva por autoridad gubernamental."
    ]
  },
  {
    id: "mod20-002",
    modulo: 20,
    pregunta: "¿Qué riesgo surge cuando una política pública se fundamenta en datos sin metadatos verificables?",
    respuestaCorrecta: "Impedir auditoría, reproducibilidad y evaluación independiente de la decisión.",
    distractores: [
      "Reducir automáticamente precisión matemática.",
      "Eliminar toda utilidad estadística del dato.",
      "Impedir visualización en tableros públicos."
    ]
  },
  {
    id: "mod20-003",
    modulo: 20,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye instituciones científicas ni órganos técnicos; certifica metodología, trazabilidad y evidencia.",
    distractores: [
      "No puede normalizar datos abiertos.",
      "No puede generar escenarios prospectivos.",
      "No puede auditar estadísticas públicas."
    ]
  },
  {
    id: "mod20-004",
    modulo: 20,
    pregunta: "¿Qué hace metodológicamente sólida una auditoría estadística de política pública?",
    respuestaCorrecta: "Evaluar fuente, cobertura, sesgos, consistencia temporal, supuestos y reproducibilidad del análisis.",
    distractores: [
      "Comparar únicamente resultados finales publicados.",
      "Priorizar indicadores con mayor impacto mediático.",
      "Usar exclusivamente datos oficiales consolidados."
    ]
  },
  {
    id: "mod20-005",
    modulo: 20,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Asistir en limpieza, normalización, detección de anomalías y visualización sin decidir conclusiones políticas.",
    distractores: [
      "Determinar automáticamente qué política pública es correcta.",
      "Sustituir revisión metodológica de expertos.",
      "Certificar verdad científica sin auditoría humana."
    ]
  },
  {
    id: "mod20-006",
    modulo: 20,
    pregunta: "¿Qué caracteriza una inferencia no sustentada en análisis público?",
    respuestaCorrecta: "Derivar conclusiones que exceden alcance, calidad o diseño de los datos disponibles.",
    distractores: [
      "Usar modelos estadísticos complejos.",
      "Incluir márgenes de error visibles.",
      "Comparar series históricas largas."
    ]
  },
  {
    id: "mod20-007",
    modulo: 20,
    pregunta: "¿Qué diferencia existe entre dato abierto y dato útil para decisión pública?",
    respuestaCorrecta: "El dato útil está documentado, estructurado, contextualizado y es metodológicamente interpretable.",
    distractores: [
      "El dato abierto siempre es suficiente para decidir.",
      "El dato útil debe permanecer reservado.",
      "Ambos conceptos son equivalentes si el archivo es descargable."
    ]
  },
  {
    id: "mod20-008",
    modulo: 20,
    pregunta: "¿Qué práctica reduce mejor el riesgo de manipulación estadística?",
    respuestaCorrecta: "Publicar fuentes, código, supuestos, transformaciones, versiones y márgenes de incertidumbre.",
    distractores: [
      "Publicar solo indicadores finales consolidados.",
      "Usar visualizaciones simplificadas sin metodología.",
      "Centralizar análisis en una sola institución."
    ]
  },
  {
    id: "mod20-009",
    modulo: 20,
    pregunta: "¿Qué vuelve técnicamente robusto un tablero de evidencia pública?",
    respuestaCorrecta: "Indicadores comparables, actualización trazable, fuentes verificables y límites interpretativos visibles.",
    distractores: [
      "Diseño visual atractivo y narrativa clara.",
      "Uso de datos en tiempo real sin validación.",
      "Priorización de métricas políticamente relevantes."
    ]
  },
  {
    id: "mod20-010",
    modulo: 20,
    pregunta: "¿Qué riesgo existe al combinar bases de datos sin normalización metodológica?",
    respuestaCorrecta: "Generar comparaciones inválidas por diferencias de definición, cobertura o periodicidad.",
    distractores: [
      "Aumentar excesivamente el tamaño del dataset.",
      "Reducir velocidad de visualización.",
      "Impedir uso de modelos exploratorios."
    ]
  },
  {
    id: "mod20-011",
    modulo: 20,
    pregunta: "¿Qué hace internacionalmente relevante un dataset cívico documentado?",
    respuestaCorrecta: "Metadatos completos, estándares comparables, reproducibilidad y trazabilidad de origen.",
    distractores: [
      "Traducción automática a varios idiomas.",
      "Uso de gráficos interactivos avanzados.",
      "Publicación en una plataforma gubernamental."
    ]
  },
  {
    id: "mod20-012",
    modulo: 20,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de datasets, modelos, versiones y resultados publicados.",
    distractores: [
      "Garantizar exactitud automática de los datos.",
      "Sustituir validación estadística humana.",
      "Corregir sesgos de muestreo automáticamente."
    ]
  },
  {
    id: "mod20-013",
    modulo: 20,
    pregunta: "¿Qué criterio fortalece más un modelo de escenarios para política pública?",
    respuestaCorrecta: "Supuestos explícitos, sensibilidad, intervalos de incertidumbre y comparación de alternativas.",
    distractores: [
      "Un solo escenario central presentado con claridad.",
      "Mayor complejidad algorítmica posible.",
      "Uso exclusivo de datos históricos oficiales."
    ]
  },
  {
    id: "mod20-014",
    modulo: 20,
    pregunta: "¿Qué problema surge cuando la técnica se usa como argumento de autoridad sin escrutinio?",
    respuestaCorrecta: "Se convierte la evidencia en blindaje político y se impide evaluación pública de supuestos.",
    distractores: [
      "Se reduce automáticamente calidad científica.",
      "Se impide toda innovación tecnológica.",
      "Se elimina participación de expertos."
    ]
  },
  {
    id: "mod20-015",
    modulo: 20,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar modelos, criterios, supuestos, calidad de datos y reproducibilidad metodológica.",
    distractores: [
      "Decidir políticas públicas finales.",
      "Sustituir universidades y centros científicos.",
      "Emitir sanciones por manipulación estadística."
    ]
  },
  {
    id: "mod20-016",
    modulo: 20,
    pregunta: "¿Qué vuelve metodológicamente consistente una detección de anomalías?",
    respuestaCorrecta: "Definir línea base, variabilidad esperada, criterios de alerta y revisión contextual humana.",
    distractores: [
      "Marcar todo valor extremo como manipulación.",
      "Usar algoritmos sin explicar umbrales.",
      "Eliminar datos atípicos automáticamente."
    ]
  },
  {
    id: "mod20-017",
    modulo: 20,
    pregunta: "¿Qué riesgo existe al publicar datos sensibles sin agregación o anonimización adecuada?",
    respuestaCorrecta: "Reidentificación, daño a personas o comunidades y pérdida de legitimidad ética del análisis.",
    distractores: [
      "Reducción de precisión estadística inevitable.",
      "Imposibilidad de usar herramientas de IA.",
      "Eliminación de trazabilidad documental."
    ]
  },
  {
    id: "mod20-018",
    modulo: 20,
    pregunta: "¿Qué caracteriza una metodología científica cívicamente auditable?",
    respuestaCorrecta: "Puede ser revisada, reproducida, cuestionada y actualizada con evidencia verificable.",
    distractores: [
      "Debe ser aprobada por mayoría ciudadana.",
      "Debe evitar tecnicismos por completo.",
      "Debe depender solo de expertos gubernamentales."
    ]
  },
  {
    id: "mod20-019",
    modulo: 20,
    pregunta: "¿Qué hace sólido un análisis de impacto basado en datos?",
    respuestaCorrecta: "Vincular intervención, línea base, contrafactual razonable, métricas y efectos observables.",
    distractores: [
      "Comparar indicadores antes y después sin control contextual.",
      "Usar testimonios positivos como evidencia principal.",
      "Priorizar correlaciones visualmente claras."
    ]
  },
  {
    id: "mod20-020",
    modulo: 20,
    pregunta: "¿Qué riesgo metodológico existe al confundir correlación con causalidad?",
    respuestaCorrecta: "Atribuir efectos a políticas sin demostrar relación causal razonable o controlar factores alternativos.",
    distractores: [
      "Reducir volumen de datos disponible.",
      "Eliminar capacidad de visualización pública.",
      "Impedir auditoría de fuentes oficiales."
    ]
  },
  {
    id: "mod20-021",
    modulo: 20,
    pregunta: "¿Qué característica fortalece más la interoperabilidad de datos entre módulos?",
    respuestaCorrecta: "Estándares comunes de definición, formato, metadatos, calidad y versionado.",
    distractores: [
      "Uso de una sola base central sin documentación.",
      "Conversión de todos los datos a PDF.",
      "Eliminación de variables sectoriales."
    ]
  },
  {
    id: "mod20-022",
    modulo: 20,
    pregunta: "¿Qué vuelve útil una auditoría de indicadores gubernamentales?",
    respuestaCorrecta: "Revisar cambios de definición, series históricas, cobertura, incentivos y consistencia estadística.",
    distractores: [
      "Comparar únicamente metas oficiales cumplidas.",
      "Medir aceptación pública del indicador.",
      "Usar solo datos del último ejercicio fiscal."
    ]
  },
  {
    id: "mod20-023",
    modulo: 20,
    pregunta: "¿Qué práctica protege mejor la integridad científica del módulo?",
    respuestaCorrecta: "Separar análisis de opinión política y publicar límites, sesgos e incertidumbre.",
    distractores: [
      "Ocultar incertidumbre para evitar confusión ciudadana.",
      "Elegir indicadores que confirmen hipótesis previas.",
      "Reducir participación de metodólogos externos."
    ]
  },
  {
    id: "mod20-024",
    modulo: 20,
    pregunta: "¿Qué problema surge cuando se eliminan datos atípicos sin justificación documentada?",
    respuestaCorrecta: "Se puede distorsionar la evidencia y ocultar fenómenos críticos o errores relevantes.",
    distractores: [
      "Se incrementa automáticamente el error estándar.",
      "Se impide toda modelación estadística.",
      "Se elimina trazabilidad criptográfica."
    ]
  },
  {
    id: "mod20-025",
    modulo: 20,
    pregunta: "¿Qué característica vuelve confiable un modelo exploratorio de política pública?",
    respuestaCorrecta: "Presentar resultados como hipótesis evaluables, no como conclusiones definitivas.",
    distractores: [
      "Usar el algoritmo más avanzado disponible.",
      "Eliminar revisión humana para evitar sesgos.",
      "Producir una sola recomendación ejecutiva."
    ]
  },
  {
    id: "mod20-026",
    modulo: 20,
    pregunta: "¿Qué criterio fortalece más una visualización pública de datos complejos?",
    respuestaCorrecta: "Mostrar contexto, escala, fuente, incertidumbre y evitar inferencias engañosas.",
    distractores: [
      "Reducir todos los resultados a un ranking.",
      "Usar colores intensos para enfatizar diferencias.",
      "Eliminar márgenes de error para simplificar."
    ]
  },
  {
    id: "mod20-027",
    modulo: 20,
    pregunta: "¿Qué riesgo existe cuando la ciudadanía prioriza análisis sin claridad metodológica?",
    respuestaCorrecta: "Dirigir recursos analíticos hacia preguntas políticamente atractivas pero técnicamente mal formuladas.",
    distractores: [
      "Eliminar participación cívica en ciencia pública.",
      "Impedir el uso de datos abiertos.",
      "Reducir automáticamente validez estadística."
    ]
  },
  {
    id: "mod20-028",
    modulo: 20,
    pregunta: "¿Qué hace técnicamente sólido un sistema de ciencia abierta cívica?",
    respuestaCorrecta: "Acceso a datos, código, metodología, revisión independiente y protección de información sensible.",
    distractores: [
      "Publicación sin restricciones de todos los datos.",
      "Eliminación de revisión experta.",
      "Uso exclusivo de plataformas privadas."
    ]
  },
  {
    id: "mod20-029",
    modulo: 20,
    pregunta: "¿Qué característica fortalece más la capacidad transversal del módulo?",
    respuestaCorrecta: "Proveer estándares comunes de evidencia que otros módulos puedan reutilizar y auditar.",
    distractores: [
      "Centralizar todos los dictámenes sectoriales.",
      "Sustituir comités expertos de otros módulos.",
      "Priorizar exclusivamente datos tecnológicos."
    ]
  },
  {
    id: "mod20-030",
    modulo: 20,
    pregunta: "¿Cuál es el principio rector del Módulo 20?",
    respuestaCorrecta: "Sin datos confiables, trazables y auditables, ninguna decisión pública puede considerarse plenamente legítima.",
    distractores: [
      "La ciencia debe sustituir la deliberación democrática.",
      "La inteligencia artificial puede resolver neutralmente toda política pública.",
      "Los datos oficiales son suficientes si provienen de autoridad competente."
    ]
  }
]);

const preguntasTecnicasModulo21 = adaptarBancoTecnico([
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

const preguntasTecnicasModulo22 = adaptarBancoTecnico([
{
    id: "mod22-001",
    modulo: 22,
    pregunta: "¿Qué distingue una investigación financiera estructural de una denuncia mediática de corrupción?",
    respuestaCorrecta: "La capacidad de documentar flujos, beneficiarios, triangulaciones y patrones verificables de comportamiento financiero.",
    distractores: [
      "La cantidad de contratos públicos involucrados.",
      "La cobertura periodística del caso.",
      "La existencia de declaraciones patrimoniales públicas."
    ]
  },
  {
    id: "mod22-002",
    modulo: 22,
    pregunta: "¿Qué riesgo estructural surge cuando la contratación pública no tiene trazabilidad financiera verificable?",
    respuestaCorrecta: "Facilitar colusión, desvío de recursos y ocultamiento de beneficiarios reales.",
    distractores: [
      "Reducir velocidad administrativa de compras.",
      "Impedir auditorías presupuestales ordinarias.",
      "Eliminar competencia entre proveedores."
    ]
  },
  {
    id: "mod22-003",
    modulo: 22,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No imputa delitos, no sustituye fiscalías ni ejerce funciones coercitivas.",
    distractores: [
      "No puede analizar contratos públicos.",
      "No puede generar mapas financieros.",
      "No puede detectar empresas fachada."
    ]
  },
  {
    id: "mod22-004",
    modulo: 22,
    pregunta: "¿Qué hace metodológicamente sólido un expediente financiero ciudadano?",
    respuestaCorrecta: "Relacionar flujos, contratos, beneficiarios, temporalidad y patrones de riesgo verificables.",
    distractores: [
      "Comparar únicamente montos presupuestales.",
      "Priorizar filtraciones anónimas sin corroboración.",
      "Usar exclusivamente declaraciones patrimoniales."
    ]
  },
  {
    id: "mod22-005",
    modulo: 22,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Detectar anomalías, estructurar redes financieras y preservar evidencia documental trazable.",
    distractores: [
      "Determinar responsabilidad penal automáticamente.",
      "Sustituir auditorías forenses humanas.",
      "Emitir sanciones administrativas digitales."
    ]
  },
  {
    id: "mod22-006",
    modulo: 22,
    pregunta: "¿Qué diferencia existe entre irregularidad administrativa y patrón financiero de corrupción?",
    respuestaCorrecta: "El patrón financiero muestra recurrencia estructural, beneficiarios y mecanismos de ocultamiento verificables.",
    distractores: [
      "La irregularidad administrativa siempre implica delito.",
      "El patrón financiero requiere sentencia judicial previa.",
      "Ambos conceptos son equivalentes técnicamente."
    ]
  },
  {
    id: "mod22-007",
    modulo: 22,
    pregunta: "¿Qué vuelve robusto un análisis de triangulación financiera?",
    respuestaCorrecta: "Relacionar transferencias, temporalidad, intermediarios, contratos y beneficiarios finales.",
    distractores: [
      "Comparar únicamente montos transferidos.",
      "Priorizar operaciones internacionales complejas.",
      "Analizar solo cuentas bancarias oficiales."
    ]
  },
  {
    id: "mod22-008",
    modulo: 22,
    pregunta: "¿Qué práctica reduce mejor el riesgo de falsos positivos en inteligencia financiera ciudadana?",
    respuestaCorrecta: "Validación multicapa, trazabilidad documental y separación entre hipótesis y evidencia corroborada.",
    distractores: [
      "Publicar automáticamente cualquier anomalía detectada.",
      "Priorizar denuncias con mayor atención mediática.",
      "Usar únicamente algoritmos de riesgo automatizados."
    ]
  },
  {
    id: "mod22-009",
    modulo: 22,
    pregunta: "¿Qué hace técnicamente consistente un análisis de enriquecimiento incongruente?",
    respuestaCorrecta: "Comparar ingresos verificables, evolución patrimonial, vínculos financieros y capacidad económica razonable.",
    distractores: [
      "Medir únicamente incremento patrimonial absoluto.",
      "Priorizar propiedades de alto valor comercial.",
      "Comparar solo declaraciones anuales."
    ]
  },
  {
    id: "mod22-010",
    modulo: 22,
    pregunta: "¿Qué riesgo metodológico existe al analizar contratos públicos sin contexto presupuestal?",
    respuestaCorrecta: "Interpretar anomalías aisladas sin identificar recurrencia, concentración o captura sistémica.",
    distractores: [
      "Reducir velocidad de auditoría documental.",
      "Eliminar interoperabilidad de datos.",
      "Impedir clasificación automática de contratos."
    ]
  },
  {
    id: "mod22-011",
    modulo: 22,
    pregunta: "¿Qué vuelve internacionalmente relevante un dossier anticorrupción?",
    respuestaCorrecta: "Compatibilidad con estándares FATF/GAFI, compliance y trazabilidad financiera verificable.",
    distractores: [
      "Publicación simultánea en medios internacionales.",
      "Participación de firmas auditoras privadas.",
      "Volumen total de operaciones documentadas."
    ]
  },
  {
    id: "mod22-012",
    modulo: 22,
    pregunta: "¿Qué función cumplen hashes criptográficos y sellos de tiempo?",
    respuestaCorrecta: "Preservar integridad verificable de expedientes, contratos y análisis financieros.",
    distractores: [
      "Certificar automáticamente autenticidad patrimonial.",
      "Sustituir peritajes financieros especializados.",
      "Eliminar necesidad de revisión documental humana."
    ]
  },
  {
    id: "mod22-013",
    modulo: 22,
    pregunta: "¿Qué criterio fortalece más una evaluación de riesgo de corrupción en compras públicas?",
    respuestaCorrecta: "Analizar concentración de proveedores, adjudicaciones recurrentes y vínculos financieros indirectos.",
    distractores: [
      "Comparar únicamente precios unitarios.",
      "Medir solo tiempo de adjudicación.",
      "Priorizar contratos de mayor monto."
    ]
  },
  {
    id: "mod22-014",
    modulo: 22,
    pregunta: "¿Qué problema surge cuando las empresas fachada no se analizan como red?",
    respuestaCorrecta: "Se invisibilizan beneficiarios reales y mecanismos de dispersión financiera coordinada.",
    distractores: [
      "Se reduce precisión de análisis presupuestal.",
      "Se elimina trazabilidad temporal.",
      "Se impide auditoría documental básica."
    ]
  },
  {
    id: "mod22-015",
    modulo: 22,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodologías, revisar patrones financieros y emitir dictámenes colegiados verificables.",
    distractores: [
      "Autorizar investigaciones penales formales.",
      "Congelar cuentas o recursos sospechosos.",
      "Sustituir unidades oficiales de inteligencia financiera."
    ]
  },
  {
    id: "mod22-016",
    modulo: 22,
    pregunta: "¿Qué hace sólida una detección de colusión público-privada?",
    respuestaCorrecta: "Relacionar contratos, vínculos societarios, decisiones administrativas y beneficiarios recurrentes.",
    distractores: [
      "Comparar únicamente montos de adjudicación.",
      "Priorizar empresas recientemente creadas.",
      "Usar solo denuncias periodísticas."
    ]
  },
  {
    id: "mod22-017",
    modulo: 22,
    pregunta: "¿Qué riesgo existe cuando se publican nombres sin estándar técnico suficiente?",
    respuestaCorrecta: "Comprometer legitimidad metodológica y generar señalamientos prematuros no verificables.",
    distractores: [
      "Reducir interoperabilidad internacional.",
      "Eliminar trazabilidad documental.",
      "Impedir análisis temporal."
    ]
  },
  {
    id: "mod22-018",
    modulo: 22,
    pregunta: "¿Qué caracteriza una inteligencia financiera cívica técnicamente útil?",
    respuestaCorrecta: "La capacidad de convertir datos dispersos en patrones verificables y comparables.",
    distractores: [
      "La acumulación masiva de contratos públicos.",
      "La automatización completa del análisis financiero.",
      "La difusión inmediata de cualquier hallazgo."
    ]
  },
  {
    id: "mod22-019",
    modulo: 22,
    pregunta: "¿Qué vuelve técnicamente útil un mapa de riesgo financiero?",
    respuestaCorrecta: "Relacionar actores, flujos, contratos, temporalidad y niveles de exposición sistémica.",
    distractores: [
      "Mostrar únicamente montos presupuestales por dependencia.",
      "Comparar contratos por entidad federativa.",
      "Priorizar operaciones de alto perfil mediático."
    ]
  },
  {
    id: "mod22-020",
    modulo: 22,
    pregunta: "¿Qué riesgo metodológico existe al depender solo de filtraciones anónimas?",
    respuestaCorrecta: "Construir hipótesis sin trazabilidad suficiente ni validación documental independiente.",
    distractores: [
      "Reducir capacidad de análisis de grafos.",
      "Eliminar interoperabilidad con otros módulos.",
      "Impedir monitoreo temporal."
    ]
  },
  {
    id: "mod22-021",
    modulo: 22,
    pregunta: "¿Qué característica fortalece más un análisis de beneficiarios finales?",
    respuestaCorrecta: "Cruzar estructuras societarias, control efectivo, relaciones indirectas y transferencias recurrentes.",
    distractores: [
      "Comparar únicamente accionistas registrados.",
      "Priorizar empresas extranjeras complejas.",
      "Medir solo capital social declarado."
    ]
  },
  {
    id: "mod22-022",
    modulo: 22,
    pregunta: "¿Qué vuelve robusta una detección de anomalías financieras temporales?",
    respuestaCorrecta: "Comparar comportamiento histórico, recurrencia, sincronización y desviaciones estadísticamente relevantes.",
    distractores: [
      "Detectar cualquier operación inusual automáticamente.",
      "Priorizar transacciones de gran monto.",
      "Usar únicamente reglas fijas de monitoreo."
    ]
  },
  {
    id: "mod22-023",
    modulo: 22,
    pregunta: "¿Qué práctica protege mejor identidades sensibles dentro del módulo?",
    respuestaCorrecta: "Separar datos personales, anonimizar aportaciones y limitar exposición innecesaria.",
    distractores: [
      "Publicar expedientes completos para transparencia total.",
      "Centralizar identidades en repositorios abiertos.",
      "Exigir verificación pública de denunciantes."
    ]
  },
  {
    id: "mod22-024",
    modulo: 22,
    pregunta: "¿Qué problema surge cuando la corrupción se analiza solo como casos individuales?",
    respuestaCorrecta: "Se pierde capacidad de identificar redes, patrones recurrentes y captura institucional.",
    distractores: [
      "Se reduce precisión de análisis presupuestal.",
      "Se elimina valor probatorio documental.",
      "Se impide trazabilidad temporal."
    ]
  },
  {
    id: "mod22-025",
    modulo: 22,
    pregunta: "¿Qué característica fortalece un análisis de compliance internacional?",
    respuestaCorrecta: "Compatibilidad con estándares AML/CFT, debida diligencia y trazabilidad documental verificable.",
    distractores: [
      "Uso exclusivo de auditorías privadas.",
      "Participación de organismos multilaterales.",
      "Publicación automática de hallazgos."
    ]
  },
  {
    id: "mod22-026",
    modulo: 22,
    pregunta: "¿Qué criterio fortalece más una auditoría de contratos públicos?",
    respuestaCorrecta: "Analizar competencia real, modificaciones recurrentes, concentración y cumplimiento verificable.",
    distractores: [
      "Comparar únicamente tiempo de ejecución.",
      "Priorizar contratos con mayor presupuesto.",
      "Usar solo observaciones administrativas previas."
    ]
  },
  {
    id: "mod22-027",
    modulo: 22,
    pregunta: "¿Qué hace técnicamente sólida una correlación entre financiamiento político y contratación pública?",
    respuestaCorrecta: "Relacionar temporalidad, beneficiarios, adjudicaciones y patrones de retorno financiero documentado.",
    distractores: [
      "Comparar únicamente aportaciones declaradas.",
      "Usar percepción pública de favoritismo.",
      "Priorizar casos con cobertura mediática."
    ]
  },
  {
    id: "mod22-028",
    modulo: 22,
    pregunta: "¿Qué característica vuelve útil un ledger distribuido dentro del módulo?",
    respuestaCorrecta: "Permitir trazabilidad inmutable y auditoría verificable de modificaciones y evidencia.",
    distractores: [
      "Eliminar necesidad de almacenamiento seguro.",
      "Garantizar autenticidad de toda información cargada.",
      "Sustituir validación humana de expedientes."
    ]
  },
  {
    id: "mod22-029",
    modulo: 22,
    pregunta: "¿Qué riesgo existe cuando la evidencia financiera no conserva contexto temporal?",
    respuestaCorrecta: "Dificultar reconstrucción de patrones y comprensión de relaciones causales relevantes.",
    distractores: [
      "Reducir interoperabilidad internacional.",
      "Eliminar capacidad de cifrado.",
      "Impedir clasificación por dependencia."
    ]
  },
  {
    id: "mod22-030",
    modulo: 22,
    pregunta: "¿Cuál es el principio rector del Módulo 22?",
    respuestaCorrecta: "La corrupción sistémica se revela siguiendo el dinero con método, trazabilidad y memoria verificable.",
    distractores: [
      "Toda irregularidad financiera implica automáticamente delito.",
      "La inteligencia artificial puede sustituir auditorías humanas.",
      "La transparencia presupuestal elimina por sí sola la corrupción."
    ]
  }
]);

const preguntasTecnicasModulo23 = adaptarBancoTecnico([
{
    id: "mod23-001",
    modulo: 23,
    pregunta: "¿Qué distingue una plataforma auditable por diseño de una plataforma que solo declara ser segura?",
    respuestaCorrecta: "La posibilidad verificable de reproducir, inspeccionar y contrastar técnicamente su comportamiento real.",
    distractores: [
      "La existencia de políticas internas de privacidad.",
      "La contratación de empresas externas de ciberseguridad.",
      "La publicación periódica de reportes ejecutivos."
    ]
  },
  {
    id: "mod23-002",
    modulo: 23,
    pregunta: "¿Qué característica fortalece más una auditoría independiente de código fuente?",
    respuestaCorrecta: "Acceso verificable a versiones, compilaciones reproducibles y trazabilidad completa de cambios.",
    distractores: [
      "Validación exclusiva por el equipo desarrollador.",
      "Uso de infraestructura propietaria certificada.",
      "Publicación parcial de módulos no sensibles."
    ]
  },
  {
    id: "mod23-003",
    modulo: 23,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No desarrolla ni opera la plataforma; audita integridad, seguridad y coherencia técnica.",
    distractores: [
      "No puede revisar infraestructura criptográfica.",
      "No puede evaluar sesgos algorítmicos.",
      "No puede generar alertas críticas."
    ]
  },
  {
    id: "mod23-004",
    modulo: 23,
    pregunta: "¿Qué vuelve metodológicamente sólida una prueba de penetración ética?",
    respuestaCorrecta: "Definir alcance, registrar hallazgos reproducibles y evitar afectación real a usuarios o sistemas.",
    distractores: [
      "Intentar comprometer cualquier sistema disponible.",
      "Publicar inmediatamente vulnerabilidades críticas.",
      "Ejecutar pruebas sin autorización documental."
    ]
  },
  {
    id: "mod23-005",
    modulo: 23,
    pregunta: "¿Qué riesgo existe cuando las compilaciones no son reproducibles?",
    respuestaCorrecta: "Impedir verificar que el código auditado coincide realmente con el software desplegado.",
    distractores: [
      "Reducir velocidad de despliegue continuo.",
      "Eliminar compatibilidad multiplataforma.",
      "Aumentar tamaño del repositorio."
    ]
  },
  {
    id: "mod23-006",
    modulo: 23,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Detectar patrones inseguros, dependencias vulnerables y anomalías entre versiones y flujos.",
    distractores: [
      "Aprobar automáticamente despliegues en producción.",
      "Garantizar ausencia total de vulnerabilidades.",
      "Sustituir auditorías humanas independientes."
    ]
  },
  {
    id: "mod23-007",
    modulo: 23,
    pregunta: "¿Qué diferencia existe entre privacidad declarativa y anonimato verificable?",
    respuestaCorrecta: "El anonimato verificable puede demostrarse técnicamente mediante diseño y pruebas auditables.",
    distractores: [
      "La privacidad declarativa siempre es suficiente jurídicamente.",
      "El anonimato verificable depende solo del cifrado.",
      "Ambos conceptos son equivalentes en seguridad."
    ]
  },
  {
    id: "mod23-008",
    modulo: 23,
    pregunta: "¿Qué práctica reduce mejor el riesgo de puertas traseras ocultas?",
    respuestaCorrecta: "Revisión independiente de dependencias, compilaciones reproducibles y monitoreo de cambios críticos.",
    distractores: [
      "Confiar únicamente en proveedores reconocidos.",
      "Restringir acceso al código fuente completo.",
      "Usar infraestructura privada centralizada."
    ]
  },
  {
    id: "mod23-009",
    modulo: 23,
    pregunta: "¿Qué hace técnicamente robusta una auditoría de flujos de datos?",
    respuestaCorrecta: "Verificar origen, transformación, almacenamiento, acceso y eliminación de información sensible.",
    distractores: [
      "Medir únicamente velocidad de transferencia.",
      "Priorizar capacidad máxima de almacenamiento.",
      "Comparar interfaces gráficas entre versiones."
    ]
  },
  {
    id: "mod23-010",
    modulo: 23,
    pregunta: "¿Qué riesgo metodológico existe al auditar solo documentación y no implementación real?",
    respuestaCorrecta: "Permitir discrepancias críticas entre diseño declarado y comportamiento efectivo en producción.",
    distractores: [
      "Reducir capacidad de monitoreo en tiempo real.",
      "Eliminar compatibilidad con software libre.",
      "Impedir análisis criptográfico posterior."
    ]
  },
  {
    id: "mod23-011",
    modulo: 23,
    pregunta: "¿Qué vuelve internacionalmente relevante una auditoría de infraestructura cívica digital?",
    respuestaCorrecta: "Cumplimiento verificable de estándares abiertos, privacidad por defecto y trazabilidad técnica.",
    distractores: [
      "Participación de empresas multinacionales.",
      "Publicación del código en varios idiomas.",
      "Uso de proveedores de nube internacionales."
    ]
  },
  {
    id: "mod23-012",
    modulo: 23,
    pregunta: "¿Qué función cumplen hashes criptográficos y sellos de tiempo?",
    respuestaCorrecta: "Preservar integridad verificable de versiones, evidencia técnica y cadena de custodia digital.",
    distractores: [
      "Impedir cualquier vulnerabilidad futura.",
      "Sustituir controles de acceso internos.",
      "Eliminar necesidad de respaldo de datos."
    ]
  },
  {
    id: "mod23-013",
    modulo: 23,
    pregunta: "¿Qué criterio fortalece más la independencia de un comité auditor?",
    respuestaCorrecta: "Separación estructural respecto al desarrollo, operación y financiamiento auditado.",
    distractores: [
      "Participación exclusiva de programadores senior.",
      "Auditorías confidenciales no publicables.",
      "Validación interna por líderes técnicos."
    ]
  },
  {
    id: "mod23-014",
    modulo: 23,
    pregunta: "¿Qué problema surge cuando una plataforma depende críticamente de librerías no auditadas?",
    respuestaCorrecta: "Aumenta riesgo sistémico de vulnerabilidades heredadas o código malicioso no detectado.",
    distractores: [
      "Reduce interoperabilidad entre módulos.",
      "Elimina capacidad de análisis algorítmico.",
      "Impide actualización continua del sistema."
    ]
  },
  {
    id: "mod23-015",
    modulo: 23,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar auditorías, revisar arquitectura, detectar riesgos y certificar integridad metodológica.",
    distractores: [
      "Administrar directamente infraestructura crítica.",
      "Autorizar legalmente despliegues productivos.",
      "Resolver controversias políticas digitales."
    ]
  },
  {
    id: "mod23-016",
    modulo: 23,
    pregunta: "¿Qué vuelve metodológicamente consistente una auditoría de sesgo algorítmico?",
    respuestaCorrecta: "Comparar resultados entre contextos, variables y grupos bajo métricas auditables y reproducibles.",
    distractores: [
      "Eliminar cualquier diferencia estadística observada.",
      "Usar únicamente datasets sintéticos.",
      "Auditar exclusivamente modelos de IA generativa."
    ]
  },
  {
    id: "mod23-017",
    modulo: 23,
    pregunta: "¿Qué riesgo existe cuando un sistema centraliza excesivamente privilegios administrativos?",
    respuestaCorrecta: "Facilitar captura interna, abuso de poder y compromiso sistémico de la infraestructura.",
    distractores: [
      "Reducir velocidad de despliegue.",
      "Eliminar redundancia de servidores.",
      "Impedir actualización de dependencias."
    ]
  },
  {
    id: "mod23-018",
    modulo: 23,
    pregunta: "¿Qué caracteriza una divulgación responsable de vulnerabilidades?",
    respuestaCorrecta: "Reportar hallazgos con mitigación coordinada antes de exposición pública explotable.",
    distractores: [
      "Publicar inmediatamente cualquier falla crítica.",
      "Ocultar permanentemente vulnerabilidades detectadas.",
      "Entregar hallazgos solo a autoridades políticas."
    ]
  },
  {
    id: "mod23-019",
    modulo: 23,
    pregunta: "¿Qué hace sólida una auditoría de anonimización?",
    respuestaCorrecta: "Evaluar riesgo de reidentificación, correlación indirecta y filtración de metadatos.",
    distractores: [
      "Cifrar únicamente bases de datos finales.",
      "Eliminar nombres visibles de usuarios.",
      "Usar servidores distribuidos automáticamente."
    ]
  },
  {
    id: "mod23-020",
    modulo: 23,
    pregunta: "¿Qué riesgo metodológico existe al usar IA para auditoría sin revisión humana?",
    respuestaCorrecta: "Pasar por alto contexto, falsos positivos críticos o vulnerabilidades semánticas complejas.",
    distractores: [
      "Reducir capacidad de procesamiento masivo.",
      "Eliminar trazabilidad criptográfica.",
      "Impedir monitoreo continuo."
    ]
  },
  {
    id: "mod23-021",
    modulo: 23,
    pregunta: "¿Qué característica fortalece más la resiliencia ante censura digital?",
    respuestaCorrecta: "Infraestructura distribuida, redundancia verificable y mecanismos descentralizados de preservación.",
    distractores: [
      "Centralización de servidores en una sola región.",
      "Restricción total de acceso externo.",
      "Uso exclusivo de proveedores privados."
    ]
  },
  {
    id: "mod23-022",
    modulo: 23,
    pregunta: "¿Qué vuelve técnicamente consistente un análisis de integridad de despliegue?",
    respuestaCorrecta: "Comparar artefactos compilados, firmas criptográficas y configuración efectiva en producción.",
    distractores: [
      "Verificar únicamente documentación técnica publicada.",
      "Comparar velocidad entre versiones.",
      "Priorizar compatibilidad visual del sistema."
    ]
  },
  {
    id: "mod23-023",
    modulo: 23,
    pregunta: "¿Qué práctica protege mejor la legitimidad pública de la plataforma?",
    respuestaCorrecta: "Auditorías periódicas abiertas, replicables y metodológicamente transparentes.",
    distractores: [
      "Confiar en reputación histórica del equipo técnico.",
      "Publicar únicamente resúmenes ejecutivos.",
      "Restringir acceso a hallazgos complejos."
    ]
  },
  {
    id: "mod23-024",
    modulo: 23,
    pregunta: "¿Qué problema surge cuando existen discrepancias entre entorno auditado y entorno productivo?",
    respuestaCorrecta: "La auditoría pierde capacidad de garantizar comportamiento real del sistema desplegado.",
    distractores: [
      "Aumenta costo computacional de auditoría.",
      "Reduce velocidad de revisión de código.",
      "Impide pruebas de rendimiento."
    ]
  },
  {
    id: "mod23-025",
    modulo: 23,
    pregunta: "¿Qué característica fortalece más la modularidad segura de la plataforma?",
    respuestaCorrecta: "Interfaces auditables, aislamiento funcional y revisión técnica previa de integraciones.",
    distractores: [
      "Integración inmediata de nuevos módulos.",
      "Dependencia compartida de infraestructura crítica.",
      "Actualizaciones automáticas sin validación."
    ]
  },
  {
    id: "mod23-026",
    modulo: 23,
    pregunta: "¿Qué vuelve robusta una auditoría de dependencias externas?",
    respuestaCorrecta: "Evaluar origen, mantenimiento, historial de vulnerabilidades y nivel de confianza verificable.",
    distractores: [
      "Usar únicamente librerías populares.",
      "Eliminar todas las dependencias de terceros.",
      "Actualizar automáticamente cada versión disponible."
    ]
  },
  {
    id: "mod23-027",
    modulo: 23,
    pregunta: "¿Qué riesgo existe cuando una plataforma concentra trazabilidad sin controles de acceso adecuados?",
    respuestaCorrecta: "Exponer patrones sensibles y permitir correlaciones indebidas entre usuarios y actividades.",
    distractores: [
      "Reducir capacidad de auditoría pública.",
      "Eliminar integridad criptográfica.",
      "Impedir compilaciones reproducibles."
    ]
  },
  {
    id: "mod23-028",
    modulo: 23,
    pregunta: "¿Qué criterio fortalece más la protección contra captura tecnológica?",
    respuestaCorrecta: "Diversificación de revisión, transparencia metodológica y separación de poderes técnicos.",
    distractores: [
      "Centralizar decisiones en arquitectos principales.",
      "Mantener código cerrado para mayor control.",
      "Reducir participación de auditores externos."
    ]
  },
  {
    id: "mod23-029",
    modulo: 23,
    pregunta: "¿Qué hace técnicamente útil una certificación temporal de integridad?",
    respuestaCorrecta: "Reconocer que la seguridad debe verificarse continuamente frente a cambios y nuevas amenazas.",
    distractores: [
      "Garantizar seguridad definitiva del sistema.",
      "Eliminar necesidad de futuras auditorías.",
      "Sustituir monitoreo permanente."
    ]
  },
  {
    id: "mod23-030",
    modulo: 23,
    pregunta: "¿Cuál es el principio rector del Módulo 23?",
    respuestaCorrecta: "La confianza tecnológica legítima solo existe cuando el sistema puede auditarse de forma independiente y verificable.",
    distractores: [
      "La seguridad depende principalmente del secreto del código.",
      "La inteligencia artificial puede sustituir auditorías humanas.",
      "Las plataformas cívicas deben priorizar funcionalidad sobre verificabilidad."
    ]
  }
]);

const preguntasTecnicasModulo24 = adaptarBancoTecnico([
{
    id: "mod24-001",
    modulo: 24,
    pregunta: "¿Qué distingue un repositorio de memoria periodística verificable de una simple hemeroteca digital?",
    respuestaCorrecta: "La preservación trazable, contextualización técnica y vinculación con evidencia verificable de interés público.",
    distractores: [
      "La cantidad total de artículos almacenados.",
      "La publicación automática de noticias recientes.",
      "La indexación por popularidad mediática."
    ]
  },
  {
    id: "mod24-002",
    modulo: 24,
    pregunta: "¿Qué riesgo surge cuando investigaciones periodísticas relevantes dependen únicamente del ciclo noticioso?",
    respuestaCorrecta: "La pérdida progresiva de memoria pública y debilitamiento de rendición de cuentas documentada.",
    distractores: [
      "La reducción automática de libertad editorial.",
      "La imposibilidad de verificar hechos históricos.",
      "La eliminación total de acceso ciudadano."
    ]
  },
  {
    id: "mod24-003",
    modulo: 24,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No define una verdad oficial ni sustituye procesos judiciales o editoriales.",
    distractores: [
      "No puede preservar investigaciones periodísticas.",
      "No puede indexar material audiovisual.",
      "No puede detectar desinformación coordinada."
    ]
  },
  {
    id: "mod24-004",
    modulo: 24,
    pregunta: "¿Qué hace metodológicamente sólida una validación básica de contenido periodístico?",
    respuestaCorrecta: "Corroborar hechos verificables mediante fuentes abiertas y documentación pública independiente.",
    distractores: [
      "Confirmar alineación ideológica entre medios.",
      "Priorizar investigaciones con mayor impacto mediático.",
      "Verificar únicamente reputación histórica del periodista."
    ]
  },
  {
    id: "mod24-005",
    modulo: 24,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Clasificar, indexar, detectar alteraciones y relacionar evidencia preservada sin decidir qué es verdad.",
    distractores: [
      "Determinar automáticamente credibilidad absoluta de medios.",
      "Eliminar contenido considerado desinformación.",
      "Sustituir revisión periodística humana."
    ]
  },
  {
    id: "mod24-006",
    modulo: 24,
    pregunta: "¿Qué diferencia existe entre preservación periodística y censura inversa?",
    respuestaCorrecta: "La preservación conserva evidencia documentada sin modificar ni imponer interpretación editorial.",
    distractores: [
      "La censura inversa protege únicamente medios independientes.",
      "La preservación requiere validación gubernamental previa.",
      "Ambos conceptos son equivalentes técnicamente."
    ]
  },
  {
    id: "mod24-007",
    modulo: 24,
    pregunta: "¿Qué característica vuelve técnicamente robusto un expediente periodístico temático?",
    respuestaCorrecta: "Integrar contexto, fuentes, temporalidad, evidencia asociada y trazabilidad documental verificable.",
    distractores: [
      "Acumular artículos relacionados por popularidad.",
      "Conservar únicamente versiones resumidas.",
      "Eliminar contenido audiovisual para reducir riesgos."
    ]
  },
  {
    id: "mod24-008",
    modulo: 24,
    pregunta: "¿Qué práctica reduce mejor el riesgo de desinformación persistente?",
    respuestaCorrecta: "Contrastar información mediante validación cruzada y etiquetado contextual verificable.",
    distractores: [
      "Eliminar publicaciones controvertidas automáticamente.",
      "Priorizar fuentes oficiales sobre todas las demás.",
      "Permitir corrección comunitaria sin trazabilidad."
    ]
  },
  {
    id: "mod24-009",
    modulo: 24,
    pregunta: "¿Qué hace técnicamente consistente un análisis de censura indirecta?",
    respuestaCorrecta: "Documentar patrones de presión económica, eliminación sistemática o silenciamiento reiterado.",
    distractores: [
      "Comparar únicamente líneas editoriales.",
      "Medir volumen de notas publicadas diariamente.",
      "Analizar solo casos judicializados."
    ]
  },
  {
    id: "mod24-010",
    modulo: 24,
    pregunta: "¿Qué riesgo metodológico existe al mezclar opinión y hecho documentado sin distinción?",
    respuestaCorrecta: "Debilitar verificabilidad y contaminar el valor probatorio del expediente preservado.",
    distractores: [
      "Reducir velocidad de indexación semántica.",
      "Eliminar compatibilidad con archivos históricos.",
      "Impedir clasificación temática automatizada."
    ]
  },
  {
    id: "mod24-011",
    modulo: 24,
    pregunta: "¿Qué vuelve internacionalmente útil un dossier de libertad de prensa?",
    respuestaCorrecta: "Evidencia trazable, temporalidad verificable y documentación compatible con estándares de derechos humanos.",
    distractores: [
      "Publicación en varios idiomas.",
      "Participación de medios internacionales reconocidos.",
      "Volumen elevado de investigaciones archivadas."
    ]
  },
  {
    id: "mod24-012",
    modulo: 24,
    pregunta: "¿Qué función cumplen hashes criptográficos y sellos de tiempo?",
    respuestaCorrecta: "Garantizar integridad verificable y detectar alteraciones o eliminaciones posteriores del contenido preservado.",
    distractores: [
      "Certificar veracidad absoluta de investigaciones.",
      "Sustituir validación editorial humana.",
      "Eliminar necesidad de respaldo documental."
    ]
  },
  {
    id: "mod24-013",
    modulo: 24,
    pregunta: "¿Qué criterio fortalece más la resiliencia digital de investigaciones periodísticas?",
    respuestaCorrecta: "Replicación distribuida, preservación verificable y control de integridad documental.",
    distractores: [
      "Centralizar todos los contenidos en un solo servidor.",
      "Publicar únicamente resúmenes ejecutivos.",
      "Eliminar metadatos históricos del contenido."
    ]
  },
  {
    id: "mod24-014",
    modulo: 24,
    pregunta: "¿Qué problema surge cuando plataformas eliminan contenido sin trazabilidad pública?",
    respuestaCorrecta: "Dificultar auditoría histórica y facilitar borrado selectivo de información relevante.",
    distractores: [
      "Reducir calidad periodística automáticamente.",
      "Eliminar acceso a medios independientes.",
      "Impedir clasificación temática futura."
    ]
  },
  {
    id: "mod24-015",
    modulo: 24,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Definir criterios de preservación, validación mínima y publicación responsable.",
    distractores: [
      "Determinar qué medios son políticamente legítimos.",
      "Editar investigaciones periodísticas preservadas.",
      "Resolver controversias judiciales por difamación."
    ]
  },
  {
    id: "mod24-016",
    modulo: 24,
    pregunta: "¿Qué hace metodológicamente sólida una detección automatizada de desinformación coordinada?",
    respuestaCorrecta: "Analizar patrones de repetición, sincronización, origen y comportamiento anómalo verificable.",
    distractores: [
      "Eliminar automáticamente contenido viral.",
      "Marcar cualquier publicación crítica como sospechosa.",
      "Usar únicamente listas negras manuales."
    ]
  },
  {
    id: "mod24-017",
    modulo: 24,
    pregunta: "¿Qué riesgo existe cuando una plataforma preserva información sin protección de fuentes sensibles?",
    respuestaCorrecta: "Exponer periodistas, denunciantes o colaboradores a represalias o violencia.",
    distractores: [
      "Reducir interoperabilidad documental.",
      "Eliminar capacidad de indexación semántica.",
      "Impedir actualización de expedientes."
    ]
  },
  {
    id: "mod24-018",
    modulo: 24,
    pregunta: "¿Qué caracteriza una publicación responsable de contenido sensible?",
    respuestaCorrecta: "Separar interés público de exposición innecesaria y minimizar riesgos verificables.",
    distractores: [
      "Publicar íntegramente todo material disponible.",
      "Eliminar contexto para evitar controversias.",
      "Restringir acceso únicamente a expertos."
    ]
  },
  {
    id: "mod24-019",
    modulo: 24,
    pregunta: "¿Qué vuelve sólido un análisis temporal de borrado o alteración informativa?",
    respuestaCorrecta: "Comparar versiones históricas, fechas, cambios estructurales y trazabilidad documental.",
    distractores: [
      "Medir únicamente tráfico web del contenido.",
      "Comparar líneas editoriales entre medios.",
      "Priorizar investigaciones recientes."
    ]
  },
  {
    id: "mod24-020",
    modulo: 24,
    pregunta: "¿Qué riesgo metodológico existe al preservar contenido sin contexto temporal?",
    respuestaCorrecta: "Distorsionar interpretación pública y dificultar reconstrucción verificable de hechos.",
    distractores: [
      "Reducir capacidad de almacenamiento.",
      "Eliminar compatibilidad multimedia.",
      "Impedir clasificación algorítmica."
    ]
  },
  {
    id: "mod24-021",
    modulo: 24,
    pregunta: "¿Qué característica fortalece más la memoria pública verificable?",
    respuestaCorrecta: "Conservar contenido íntegro, trazable y accesible junto con contexto y fuentes relacionadas.",
    distractores: [
      "Reducir contenido a resúmenes ejecutivos.",
      "Publicar únicamente notas confirmadas judicialmente.",
      "Centralizar preservación en instituciones estatales."
    ]
  },
  {
    id: "mod24-022",
    modulo: 24,
    pregunta: "¿Qué vuelve técnicamente consistente un análisis de ataques a la prensa?",
    respuestaCorrecta: "Relacionar amenazas, censura, violencia, contexto territorial y patrones documentados.",
    distractores: [
      "Comparar únicamente número de periodistas afectados.",
      "Medir volumen de cobertura mediática internacional.",
      "Analizar solo ataques físicos confirmados."
    ]
  },
  {
    id: "mod24-023",
    modulo: 24,
    pregunta: "¿Qué práctica protege mejor legitimidad del observatorio?",
    respuestaCorrecta: "Separar preservación documental de posicionamientos editoriales o partidistas.",
    distractores: [
      "Priorizar medios con mayor audiencia.",
      "Excluir investigaciones políticamente controversiales.",
      "Centralizar validación en un solo comité."
    ]
  },
  {
    id: "mod24-024",
    modulo: 24,
    pregunta: "¿Qué problema surge cuando un sistema automatizado clasifica erróneamente sátira como desinformación?",
    respuestaCorrecta: "Generar falsos positivos y deteriorar confianza metodológica en la clasificación.",
    distractores: [
      "Eliminar integridad criptográfica del expediente.",
      "Reducir capacidad de almacenamiento documental.",
      "Impedir auditoría temporal del contenido."
    ]
  },
  {
    id: "mod24-025",
    modulo: 24,
    pregunta: "¿Qué característica fortalece más la interoperabilidad con otros módulos?",
    respuestaCorrecta: "Expedientes estructurados, metadatos consistentes y trazabilidad verificable de fuentes.",
    distractores: [
      "Centralizar todos los contenidos audiovisuales.",
      "Convertir investigaciones en reportes estadísticos.",
      "Eliminar referencias editoriales originales."
    ]
  },
  {
    id: "mod24-026",
    modulo: 24,
    pregunta: "¿Qué vuelve robusta una detección de granjas de bots o ataques Sybil?",
    respuestaCorrecta: "Analizar sincronización, comportamiento repetitivo, patrones de red y anomalías de interacción.",
    distractores: [
      "Eliminar cuentas nuevas automáticamente.",
      "Bloquear cualquier contenido altamente viral.",
      "Permitir únicamente usuarios verificados oficialmente."
    ]
  },
  {
    id: "mod24-027",
    modulo: 24,
    pregunta: "¿Qué riesgo existe cuando el sistema preserva contenido alterado sin detección de integridad?",
    respuestaCorrecta: "Normalizar información manipulada y comprometer confiabilidad del repositorio.",
    distractores: [
      "Reducir velocidad de búsqueda semántica.",
      "Eliminar compatibilidad internacional.",
      "Impedir clasificación temática."
    ]
  },
  {
    id: "mod24-028",
    modulo: 24,
    pregunta: "¿Qué criterio fortalece más la protección de derechos de autor dentro del módulo?",
    respuestaCorrecta: "Preservar contenido con atribución, trazabilidad y uso compatible con interés público documentado.",
    distractores: [
      "Publicar íntegramente cualquier contenido disponible.",
      "Eliminar referencias al autor original.",
      "Centralizar propiedad intelectual en la plataforma."
    ]
  },
  {
    id: "mod24-029",
    modulo: 24,
    pregunta: "¿Qué hace técnicamente útil un expediente periodístico para litigio estratégico o auditoría pública?",
    respuestaCorrecta: "La organización verificable de hechos, evidencia, temporalidad y vínculos documentales relacionados.",
    distractores: [
      "La popularidad pública de la investigación.",
      "El volumen total de artículos archivados.",
      "La orientación editorial del medio original."
    ]
  },
  {
    id: "mod24-030",
    modulo: 24,
    pregunta: "¿Cuál es el principio rector del Módulo 24?",
    respuestaCorrecta: "La verdad pública requiere memoria verificable, preservación responsable y acceso ciudadano sostenido.",
    distractores: [
      "La prensa libre debe ser regulada centralmente para evitar desinformación.",
      "Toda información viral debe preservarse automáticamente.",
      "La inteligencia artificial puede determinar objetivamente la verdad periodística."
    ]
  }
]);

const preguntasTecnicasModulo25 = adaptarBancoTecnico([
{
    id: "mod25-001",
    modulo: 25,
    pregunta: "¿Qué distingue una política de memoria democrática de una narrativa política conmemorativa?",
    respuestaCorrecta: "La documentación verificable de hechos, patrones y responsabilidades institucionales con metodología auditable.",
    distractores: [
      "La cantidad de actos públicos realizados anualmente.",
      "La difusión mediática de testimonios históricos.",
      "La aprobación legislativa de fechas conmemorativas."
    ]
  },
  {
    id: "mod25-002",
    modulo: 25,
    pregunta: "¿Qué riesgo estructural surge cuando hechos graves permanecen fragmentados o sin documentación sistemática?",
    respuestaCorrecta: "La repetición institucional de patrones de abuso, impunidad y negación pública.",
    distractores: [
      "La pérdida total de interés académico histórico.",
      "La reducción automática de archivos oficiales.",
      "La imposibilidad de generar memoria cultural."
    ]
  },
  {
    id: "mod25-003",
    modulo: 25,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No sustituye tribunales, fiscalías ni comisiones de la verdad oficiales.",
    distractores: [
      "No puede preservar testimonios ciudadanos.",
      "No puede estructurar líneas de tiempo.",
      "No puede integrar archivos públicos."
    ]
  },
  {
    id: "mod25-004",
    modulo: 25,
    pregunta: "¿Qué hace metodológicamente sólido un expediente histórico de no repetición?",
    respuestaCorrecta: "Integrar contexto, temporalidad, evidencia trazable, patrones estructurales y consecuencias verificables.",
    distractores: [
      "Acumular el mayor número posible de testimonios.",
      "Priorizar hechos con mayor cobertura mediática.",
      "Resumir únicamente conclusiones institucionales."
    ]
  },
  {
    id: "mod25-005",
    modulo: 25,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Estructurar archivos, detectar patrones y preservar integridad documental sin interpretar la historia.",
    distractores: [
      "Determinar automáticamente responsables históricos.",
      "Decidir qué versión de los hechos es verdadera.",
      "Sustituir análisis de historiadores y peritos."
    ]
  },
  {
    id: "mod25-006",
    modulo: 25,
    pregunta: "¿Qué diferencia existe entre memoria documentada y propaganda retrospectiva?",
    respuestaCorrecta: "La memoria documentada se basa en evidencia verificable y metodología transparente.",
    distractores: [
      "La propaganda retrospectiva siempre contiene información falsa.",
      "La memoria documentada requiere unanimidad política.",
      "Ambos conceptos son equivalentes si existen archivos oficiales."
    ]
  },
  {
    id: "mod25-007",
    modulo: 25,
    pregunta: "¿Qué característica vuelve robusto un análisis de patrones históricos?",
    respuestaCorrecta: "Relacionar eventos, instituciones, omisiones y condiciones estructurales repetitivas.",
    distractores: [
      "Comparar únicamente fechas y lugares.",
      "Priorizar testimonios emocionalmente impactantes.",
      "Registrar solo hechos judicializados."
    ]
  },
  {
    id: "mod25-008",
    modulo: 25,
    pregunta: "¿Qué práctica reduce mejor el riesgo de negacionismo institucional?",
    respuestaCorrecta: "Preservar evidencia trazable, accesible y metodológicamente verificable.",
    distractores: [
      "Centralizar memoria histórica en archivos reservados.",
      "Publicar únicamente informes resumidos.",
      "Limitar acceso a investigadores certificados."
    ]
  },
  {
    id: "mod25-009",
    modulo: 25,
    pregunta: "¿Qué hace técnicamente consistente una línea de tiempo histórica?",
    respuestaCorrecta: "Vincular hechos, documentos, actores y consecuencias mediante secuencia verificable.",
    distractores: [
      "Ordenar eventos únicamente por relevancia política.",
      "Usar exclusivamente archivos oficiales gubernamentales.",
      "Eliminar eventos con evidencia incompleta."
    ]
  },
  {
    id: "mod25-010",
    modulo: 25,
    pregunta: "¿Qué riesgo metodológico existe al interpretar testimonios sin contexto estructural?",
    respuestaCorrecta: "Reducir hechos complejos a narrativas aisladas sin capacidad preventiva ni comparativa.",
    distractores: [
      "Eliminar valor jurídico de los testimonios.",
      "Impedir reconstrucción cronológica.",
      "Reducir interoperabilidad documental."
    ]
  },
  {
    id: "mod25-011",
    modulo: 25,
    pregunta: "¿Qué vuelve internacionalmente relevante un dossier de verdad histórica?",
    respuestaCorrecta: "Compatibilidad metodológica con estándares de derechos humanos y garantías de no repetición.",
    distractores: [
      "Participación de observadores internacionales.",
      "Volumen total de expedientes preservados.",
      "Publicación en varios idiomas."
    ]
  },
  {
    id: "mod25-012",
    modulo: 25,
    pregunta: "¿Qué función cumplen hashes criptográficos y sellos de tiempo?",
    respuestaCorrecta: "Preservar integridad verificable y detectar alteraciones posteriores en evidencia histórica.",
    distractores: [
      "Certificar veracidad absoluta de testimonios.",
      "Sustituir revisión historiográfica humana.",
      "Eliminar necesidad de respaldo físico."
    ]
  },
  {
    id: "mod25-013",
    modulo: 25,
    pregunta: "¿Qué criterio fortalece más un análisis de responsabilidad institucional?",
    respuestaCorrecta: "Evaluar acción, omisión, capacidad de prevención y repetición estructural verificable.",
    distractores: [
      "Comparar únicamente declaraciones públicas oficiales.",
      "Priorizar actores políticamente relevantes.",
      "Medir impacto mediático de los hechos."
    ]
  },
  {
    id: "mod25-014",
    modulo: 25,
    pregunta: "¿Qué problema surge cuando los archivos históricos dependen de coyunturas políticas?",
    respuestaCorrecta: "Facilitar manipulación narrativa, ocultamiento selectivo y pérdida de continuidad documental.",
    distractores: [
      "Reducir precisión cronológica automáticamente.",
      "Eliminar participación académica externa.",
      "Impedir reconstrucción territorial."
    ]
  },
  {
    id: "mod25-015",
    modulo: 25,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodología, trazabilidad, consistencia documental y análisis comparativo.",
    distractores: [
      "Emitir sentencias históricas vinculantes.",
      "Sustituir tribunales internacionales.",
      "Determinar reparaciones obligatorias."
    ]
  },
  {
    id: "mod25-016",
    modulo: 25,
    pregunta: "¿Qué hace metodológicamente sólida una reconstrucción de secuencia histórica?",
    respuestaCorrecta: "Cruzar testimonios, archivos, temporalidad y evidencia contextual verificable.",
    distractores: [
      "Usar únicamente testimonios coincidentes.",
      "Eliminar versiones contradictorias automáticamente.",
      "Priorizar fuentes institucionales oficiales."
    ]
  },
  {
    id: "mod25-017",
    modulo: 25,
    pregunta: "¿Qué riesgo existe cuando el módulo expone identidades sensibles sin protección?",
    respuestaCorrecta: "Revictimización, intimidación y afectación a seguridad de víctimas o testigos.",
    distractores: [
      "Reducción de capacidad archivística.",
      "Eliminación de interoperabilidad entre módulos.",
      "Impedimento de clasificación cronológica."
    ]
  },
  {
    id: "mod25-018",
    modulo: 25,
    pregunta: "¿Qué caracteriza una memoria democrática técnicamente útil?",
    respuestaCorrecta: "La capacidad de convertir hechos documentados en insumos preventivos y de aprendizaje institucional.",
    distractores: [
      "La acumulación de conmemoraciones oficiales.",
      "La centralización de archivos nacionales.",
      "La existencia de testimonios audiovisuales."
    ]
  },
  {
    id: "mod25-019",
    modulo: 25,
    pregunta: "¿Qué vuelve sólido un análisis comparativo entre eventos históricos?",
    respuestaCorrecta: "Identificar patrones recurrentes de conducta institucional y condiciones estructurales similares.",
    distractores: [
      "Comparar únicamente número de víctimas.",
      "Relacionar hechos solo por cercanía temporal.",
      "Priorizar eventos de alta cobertura mediática."
    ]
  },
  {
    id: "mod25-020",
    modulo: 25,
    pregunta: "¿Qué riesgo metodológico existe al preservar archivos sin control de metadatos?",
    respuestaCorrecta: "Exponer información sensible o permitir reconstrucción indebida de identidades protegidas.",
    distractores: [
      "Reducir velocidad de búsqueda documental.",
      "Eliminar compatibilidad internacional.",
      "Impedir generación de líneas de tiempo."
    ]
  },
  {
    id: "mod25-021",
    modulo: 25,
    pregunta: "¿Qué característica fortalece más la legitimidad pública del módulo?",
    respuestaCorrecta: "Pluralidad disciplinaria, transparencia metodológica y trazabilidad verificable de fuentes.",
    distractores: [
      "Concentrar validación en autoridades gubernamentales.",
      "Priorizar archivos de mayor impacto político.",
      "Publicar únicamente síntesis ejecutivas."
    ]
  },
  {
    id: "mod25-022",
    modulo: 25,
    pregunta: "¿Qué vuelve técnicamente consistente una alerta de repetición estructural?",
    respuestaCorrecta: "Detectar condiciones institucionales similares a eventos históricos previamente documentados.",
    distractores: [
      "Comparar únicamente discursos políticos actuales.",
      "Usar percepción ciudadana sin evidencia contextual.",
      "Relacionar hechos solo por coincidencia territorial."
    ]
  },
  {
    id: "mod25-023",
    modulo: 25,
    pregunta: "¿Qué práctica protege mejor la separación entre memoria y propaganda política?",
    respuestaCorrecta: "Priorizar evidencia verificable y análisis estructural sobre narrativas partidistas.",
    distractores: [
      "Excluir hechos políticamente controversiales.",
      "Centralizar interpretación histórica oficial.",
      "Limitar participación académica independiente."
    ]
  },
  {
    id: "mod25-024",
    modulo: 25,
    pregunta: "¿Qué problema surge cuando una sociedad pierde acceso a memoria documentada?",
    respuestaCorrecta: "Se debilita la capacidad colectiva de identificar y prevenir patrones de abuso repetitivo.",
    distractores: [
      "Desaparecen automáticamente los archivos históricos.",
      "Se elimina participación ciudadana en democracia.",
      "Se impide reconstrucción cronológica básica."
    ]
  },
  {
    id: "mod25-025",
    modulo: 25,
    pregunta: "¿Qué característica fortalece más un repositorio público de memoria histórica?",
    respuestaCorrecta: "Acceso verificable, integridad documental y contextualización metodológica permanente.",
    distractores: [
      "Almacenamiento exclusivo de documentos oficiales.",
      "Publicación únicamente de casos concluidos judicialmente.",
      "Clasificación basada en relevancia mediática."
    ]
  },
  {
    id: "mod25-026",
    modulo: 25,
    pregunta: "¿Qué vuelve robusta una síntesis pública de hechos históricos complejos?",
    respuestaCorrecta: "Separar hechos corroborados, hipótesis y límites interpretativos de manera transparente.",
    distractores: [
      "Reducir todos los eventos a una narrativa simplificada.",
      "Excluir información contradictoria.",
      "Usar exclusivamente lenguaje técnico especializado."
    ]
  },
  {
    id: "mod25-027",
    modulo: 25,
    pregunta: "¿Qué riesgo existe cuando se destruyen o alteran archivos históricos sensibles?",
    respuestaCorrecta: "Comprometer verdad documentada y facilitar negación o reescritura de hechos graves.",
    distractores: [
      "Reducir interoperabilidad tecnológica.",
      "Eliminar participación académica externa.",
      "Impedir clasificación temporal automatizada."
    ]
  },
  {
    id: "mod25-028",
    modulo: 25,
    pregunta: "¿Qué criterio fortalece más la utilidad preventiva del módulo?",
    respuestaCorrecta: "Relacionar memoria histórica con evaluación contemporánea de riesgos institucionales.",
    distractores: [
      "Concentrarse exclusivamente en eventos pasados.",
      "Priorizar únicamente casos emblemáticos.",
      "Limitar acceso a especialistas acreditados."
    ]
  },
  {
    id: "mod25-029",
    modulo: 25,
    pregunta: "¿Qué hace técnicamente útil un expediente histórico para litigio estratégico o reforma institucional?",
    respuestaCorrecta: "La organización verificable de evidencia, patrones y contexto institucional documentado.",
    distractores: [
      "La popularidad pública del caso.",
      "La antigüedad histórica de los hechos.",
      "La orientación ideológica de los investigadores."
    ]
  },
  {
    id: "mod25-030",
    modulo: 25,
    pregunta: "¿Cuál es el principio rector del Módulo 25?",
    respuestaCorrecta: "La memoria rigurosa y verificable es una herramienta democrática para prevenir la repetición del daño.",
    distractores: [
      "La memoria histórica debe subordinarse a estabilidad política.",
      "El pasado solo tiene valor académico y no preventivo.",
      "La inteligencia artificial puede interpretar objetivamente la historia."
    ]
  }
]);

const preguntasTecnicasModulo26 = adaptarBancoTecnico([
{
    id: "mod26-001",
    modulo: 26,
    pregunta: "¿Qué distingue un análisis de soberanía alimentaria de un análisis agrícola meramente productivista?",
    respuestaCorrecta: "Integra producción, acceso, justicia territorial, resiliencia ambiental y control social de cadenas alimentarias.",
    distractores: [
      "Prioriza exclusivamente volumen de exportación agrícola.",
      "Evalúa únicamente rendimiento por hectárea cultivada.",
      "Mide solo autosuficiencia nacional en granos básicos."
    ]
  },
  {
    id: "mod26-002",
    modulo: 26,
    pregunta: "¿Qué criterio fortalece más un análisis de precio mínimo viable para productores?",
    respuestaCorrecta: "Costos reales de producción, riesgo climático, financiamiento, logística, margen justo y precio de mercado comparable.",
    distractores: [
      "Precio promedio nacional reportado por intermediarios.",
      "Valor de exportación total del cultivo.",
      "Precio final pagado por consumidores urbanos."
    ]
  },
  {
    id: "mod26-003",
    modulo: 26,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No fija precios por decreto ni sustituye secretarías, programas públicos o autoridades pesqueras.",
    distractores: [
      "No puede analizar cadenas de valor agrícolas.",
      "No puede documentar violencia rural.",
      "No puede comparar precios internacionales."
    ]
  },
  {
    id: "mod26-004",
    modulo: 26,
    pregunta: "¿Qué hace metodológicamente sólido un expediente de cadena de valor agroalimentaria?",
    respuestaCorrecta: "Vincular costos, intermediación, logística, precios, márgenes, riesgos y distribución de valor por actor.",
    distractores: [
      "Comparar únicamente producción anual y exportaciones.",
      "Priorizar testimonios de productores sin datos económicos.",
      "Medir solo precio final de venta al consumidor."
    ]
  },
  {
    id: "mod26-005",
    modulo: 26,
    pregunta: "¿Qué riesgo surge cuando se evalúa agroexportación sin analizar pago real al productor?",
    respuestaCorrecta: "Ocultar asimetrías de valor y presentar éxito comercial sin justicia económica territorial.",
    distractores: [
      "Reducir automáticamente competitividad internacional.",
      "Impedir análisis de tratados comerciales.",
      "Eliminar relevancia de precios internacionales."
    ]
  },
  {
    id: "mod26-006",
    modulo: 26,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Analizar costos, precios, márgenes, estrés hídrico, rutas comerciales y patrones de riesgo territorial.",
    distractores: [
      "Fijar precios agrícolas óptimos automáticamente.",
      "Sustituir decisiones de productores y cooperativas.",
      "Autorizar subsidios o programas agropecuarios."
    ]
  },
  {
    id: "mod26-007",
    modulo: 26,
    pregunta: "¿Qué diferencia existe entre seguridad alimentaria y soberanía alimentaria?",
    respuestaCorrecta: "La soberanía incorpora control territorial, justicia productiva y capacidad social de decidir sistemas alimentarios.",
    distractores: [
      "La seguridad alimentaria solo aplica a importaciones.",
      "La soberanía alimentaria exige cerrar comercio exterior.",
      "Ambas categorías son equivalentes técnicamente."
    ]
  },
  {
    id: "mod26-008",
    modulo: 26,
    pregunta: "¿Qué vuelve robusto un mapa de riesgo agroterritorial?",
    respuestaCorrecta: "Integrar productividad, agua, clima, violencia, tenencia de tierra, logística y vulnerabilidad social.",
    distractores: [
      "Mostrar únicamente superficie sembrada por cultivo.",
      "Priorizar regiones con mayor exportación.",
      "Usar solo datos climáticos históricos."
    ]
  },
  {
    id: "mod26-009",
    modulo: 26,
    pregunta: "¿Qué riesgo metodológico existe al evaluar políticas agrícolas sin incorporar estrés hídrico?",
    respuestaCorrecta: "Subestimar inviabilidad productiva, conflicto territorial y daño ambiental acumulativo.",
    distractores: [
      "Reducir precisión de precios internacionales.",
      "Impedir análisis de intermediación comercial.",
      "Eliminar comparabilidad entre cultivos."
    ]
  },
  {
    id: "mod26-010",
    modulo: 26,
    pregunta: "¿Qué hace técnicamente consistente un análisis de intermediación abusiva?",
    respuestaCorrecta: "Comparar precio pagado al productor, costos logísticos, márgenes por eslabón y alternativas de comercialización.",
    distractores: [
      "Medir únicamente precio final en supermercados.",
      "Priorizar percepción comunitaria de abuso.",
      "Comparar solo volumen de ventas regionales."
    ]
  },
  {
    id: "mod26-011",
    modulo: 26,
    pregunta: "¿Qué vuelve internacionalmente relevante un informe de comercio agrícola injusto?",
    respuestaCorrecta: "Documentar brechas verificables entre valor exportado, pago al productor y condiciones de producción.",
    distractores: [
      "Traducir el informe a varios idiomas.",
      "Mostrar crecimiento de exportaciones nacionales.",
      "Incluir fotografías de comunidades rurales."
    ]
  },
  {
    id: "mod26-012",
    modulo: 26,
    pregunta: "¿Qué práctica protege mejor a productores que reportan extorsión o derecho de piso?",
    respuestaCorrecta: "Anonimato por defecto, publicación agregada, control de localización y trazabilidad reservada.",
    distractores: [
      "Publicar nombres de comunidades afectadas para presión social.",
      "Centralizar denuncias en autoridades locales señaladas.",
      "Exigir identificación pública para validar testimonios."
    ]
  },
  {
    id: "mod26-013",
    modulo: 26,
    pregunta: "¿Qué característica fortalece más una evaluación de política pesquera?",
    respuestaCorrecta: "Integrar sostenibilidad del recurso, ingreso de pescadores, trazabilidad, vedas y presión ambiental.",
    distractores: [
      "Comparar únicamente toneladas capturadas.",
      "Priorizar exportación de especies de alto valor.",
      "Medir solo permisos pesqueros emitidos."
    ]
  },
  {
    id: "mod26-014",
    modulo: 26,
    pregunta: "¿Qué problema surge cuando se mide éxito rural solo por exportaciones?",
    respuestaCorrecta: "Se invisibilizan precariedad productiva, agotamiento ambiental y captura de valor por intermediarios.",
    distractores: [
      "Se elimina capacidad de comercio exterior.",
      "Se reduce automáticamente la inversión agrícola.",
      "Se impide análisis de productividad."
    ]
  },
  {
    id: "mod26-015",
    modulo: 26,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodologías, evaluar cadenas productivas, precios, riesgos ambientales y condiciones territoriales.",
    distractores: [
      "Fijar precios obligatorios para cultivos prioritarios.",
      "Administrar subsidios agropecuarios.",
      "Sustituir autoridades sanitarias y pesqueras."
    ]
  },
  {
    id: "mod26-016",
    modulo: 26,
    pregunta: "¿Qué hace sólida una evaluación de precios de garantía?",
    respuestaCorrecta: "Contrastar costos reales, volatilidad, productividad regional, capacidad fiscal y efectos distributivos.",
    distractores: [
      "Fijar precios sobre el promedio nacional simple.",
      "Ignorar diferencias regionales para mantener uniformidad.",
      "Basarse únicamente en precios internacionales."
    ]
  },
  {
    id: "mod26-017",
    modulo: 26,
    pregunta: "¿Qué riesgo existe cuando reformas hídricas se evalúan sin perspectiva campesina?",
    respuestaCorrecta: "Afectar derechos productivos, tenencia social y viabilidad de sistemas alimentarios locales.",
    distractores: [
      "Reducir precisión de análisis comercial.",
      "Eliminar impacto de exportaciones.",
      "Impedir evaluación de pesca marítima."
    ]
  },
  {
    id: "mod26-018",
    modulo: 26,
    pregunta: "¿Qué caracteriza una política agroalimentaria territorialmente justa?",
    respuestaCorrecta: "Reconoce diversidad productiva, costos regionales, derechos comunitarios y sostenibilidad ecológica.",
    distractores: [
      "Uniforma reglas de producción para todo el país.",
      "Prioriza cultivos con mayor rentabilidad global.",
      "Subordina sistemas tradicionales a agroexportación."
    ]
  },
  {
    id: "mod26-019",
    modulo: 26,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de reportes, precios, testimonios, mapas y expedientes técnicos.",
    distractores: [
      "Garantizar exactitud automática de precios reportados.",
      "Sustituir auditorías agropecuarias humanas.",
      "Resolver disputas comerciales entre productores."
    ]
  },
  {
    id: "mod26-020",
    modulo: 26,
    pregunta: "¿Qué vuelve técnicamente útil un análisis de violencia rural?",
    respuestaCorrecta: "Relacionar extorsión, rutas comerciales, territorios productivos, omisiones institucionales y efectos económicos.",
    distractores: [
      "Contar únicamente denuncias penales abiertas.",
      "Publicar nombres de grupos presuntamente responsables.",
      "Medir solo percepción de inseguridad."
    ]
  },
  {
    id: "mod26-021",
    modulo: 26,
    pregunta: "¿Qué práctica reduce mejor el riesgo de criminalizar la protesta rural?",
    respuestaCorrecta: "Documentar causas estructurales, evidencia económica y contexto territorial sin personalizar acusaciones.",
    distractores: [
      "Excluir reportes de bloqueos o movilizaciones.",
      "Publicar únicamente versiones oficiales.",
      "Clasificar protestas según impacto vial."
    ]
  },
  {
    id: "mod26-022",
    modulo: 26,
    pregunta: "¿Qué vuelve robusto un análisis de comercio justo agrícola?",
    respuestaCorrecta: "Comparar distribución de valor, poder de negociación, riesgos asumidos y condiciones contractuales.",
    distractores: [
      "Medir únicamente certificaciones internacionales.",
      "Priorizar productos con mayor precio final.",
      "Comparar solo volumen exportado."
    ]
  },
  {
    id: "mod26-023",
    modulo: 26,
    pregunta: "¿Qué riesgo existe al publicar ubicaciones exactas de productores vulnerables?",
    respuestaCorrecta: "Exponerlos a represalias, extorsión, robo de cosecha o presión de intermediarios.",
    distractores: [
      "Reducir precisión de mapas territoriales.",
      "Eliminar trazabilidad de expedientes.",
      "Impedir análisis climático."
    ]
  },
  {
    id: "mod26-024",
    modulo: 26,
    pregunta: "¿Qué característica fortalece una evaluación de agricultura sostenible?",
    respuestaCorrecta: "Integrar suelo, agua, biodiversidad, productividad, rentabilidad y resiliencia climática.",
    distractores: [
      "Medir únicamente rendimiento por hectárea.",
      "Priorizar cultivos de exportación.",
      "Comparar solo uso de fertilizantes."
    ]
  },
  {
    id: "mod26-025",
    modulo: 26,
    pregunta: "¿Qué problema surge cuando se desconoce conocimiento productivo tradicional?",
    respuestaCorrecta: "Se pierden prácticas adaptativas locales y se debilita resiliencia agroecológica territorial.",
    distractores: [
      "Se reduce automáticamente productividad industrial.",
      "Se elimina comercio internacional.",
      "Se impide análisis de precios."
    ]
  },
  {
    id: "mod26-026",
    modulo: 26,
    pregunta: "¿Qué criterio fortalece más una evaluación de subsidios agrícolas?",
    respuestaCorrecta: "Analizar focalización, impacto productivo, equidad territorial, sostenibilidad y captura por intermediarios.",
    distractores: [
      "Comparar únicamente monto total asignado.",
      "Priorizar número de beneficiarios registrados.",
      "Medir solo velocidad de dispersión del recurso."
    ]
  },
  {
    id: "mod26-027",
    modulo: 26,
    pregunta: "¿Qué hace técnicamente sólida una comparación de precios internacionales y locales?",
    respuestaCorrecta: "Ajustar por calidad, logística, tipo de cambio, estacionalidad, riesgos y estructura de mercado.",
    distractores: [
      "Comparar precios nominales sin ajustes.",
      "Usar únicamente cotizaciones internacionales.",
      "Tomar el precio de exportación como precio justo."
    ]
  },
  {
    id: "mod26-028",
    modulo: 26,
    pregunta: "¿Qué característica vuelve útil una evaluación de cooperativas rurales?",
    respuestaCorrecta: "Analizar gobernanza, capacidad de negociación, distribución de beneficios y sostenibilidad operativa.",
    distractores: [
      "Medir solo número de integrantes inscritos.",
      "Priorizar antigüedad de la organización.",
      "Comparar únicamente volumen producido."
    ]
  },
  {
    id: "mod26-029",
    modulo: 26,
    pregunta: "¿Qué riesgo existe cuando la política alimentaria depende excesivamente de importaciones estratégicas?",
    respuestaCorrecta: "Aumentar vulnerabilidad ante choques externos, precios internacionales y rupturas logísticas.",
    distractores: [
      "Eliminar automáticamente exportaciones nacionales.",
      "Reducir toda competitividad agrícola local.",
      "Impedir diversificación productiva."
    ]
  },
  {
    id: "mod26-030",
    modulo: 26,
    pregunta: "¿Cuál es el principio rector del Módulo 26?",
    respuestaCorrecta: "No hay soberanía alimentaria sin productores dignos, territorio protegido y cadenas de valor justas.",
    distractores: [
      "La soberanía alimentaria exige autosuficiencia absoluta.",
      "La agroexportación debe priorizarse sobre el consumo interno.",
      "El mercado por sí solo garantiza justicia rural."
    ]
  }
]);

const preguntasTecnicasModulo27 = adaptarBancoTecnico([
{
    id: "mod27-001",
    modulo: 27,
    pregunta: "¿Qué distingue una crisis hídrica natural de una crisis hídrica estructuralmente inducida?",
    respuestaCorrecta: "La relación verificable entre escasez, sobreconcesión, mala planeación, contaminación y gobernanza deficiente.",
    distractores: [
      "La reducción temporal de lluvias en una región específica.",
      "El aumento estacional de consumo urbano.",
      "La existencia de sequía meteorológica declarada."
    ]
  },
  {
    id: "mod27-002",
    modulo: 27,
    pregunta: "¿Qué hace técnicamente sólido un expediente hídrico territorial?",
    respuestaCorrecta: "Integrar concesiones, disponibilidad, recarga, calidad, uso de suelo, impactos sociales y riesgos acumulativos.",
    distractores: [
      "Comparar únicamente volumen total de agua concesionada.",
      "Priorizar denuncias comunitarias sin datos técnicos.",
      "Usar solo mapas oficiales de disponibilidad anual."
    ]
  },
  {
    id: "mod27-003",
    modulo: 27,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No administra agua, no cancela concesiones ni sustituye autoridades hídricas.",
    distractores: [
      "No puede analizar acuíferos sobreexplotados.",
      "No puede emitir dictámenes territoriales.",
      "No puede documentar conflictos socioambientales."
    ]
  },
  {
    id: "mod27-004",
    modulo: 27,
    pregunta: "¿Qué indicador revela posible sobreconcesión hídrica estructural?",
    respuestaCorrecta: "Volumen concesionado superior a disponibilidad sustentable considerando recarga, extracción real y variabilidad climática.",
    distractores: [
      "Aumento de tarifas urbanas de agua potable.",
      "Presencia de pozos agrícolas en una zona rural.",
      "Reducción temporal de almacenamiento en presas."
    ]
  },
  {
    id: "mod27-005",
    modulo: 27,
    pregunta: "¿Qué riesgo metodológico existe al evaluar agua sin perspectiva de cuenca?",
    respuestaCorrecta: "Ignorar interdependencias hidrológicas, impactos aguas abajo y acumulación territorial de presiones.",
    distractores: [
      "Reducir precisión de reportes ciudadanos.",
      "Impedir análisis jurídico de concesiones.",
      "Eliminar posibilidad de visualización geográfica."
    ]
  },
  {
    id: "mod27-006",
    modulo: 27,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Modelar estrés hídrico, detectar anomalías en concesiones y visualizar riesgos territoriales.",
    distractores: [
      "Asignar automáticamente derechos de agua.",
      "Sustituir estudios hidrológicos especializados.",
      "Cancelar permisos cuando detecta sobreuso."
    ]
  },
  {
    id: "mod27-007",
    modulo: 27,
    pregunta: "¿Qué diferencia existe entre disponibilidad legal y disponibilidad hidrológica real?",
    respuestaCorrecta: "La legal deriva de autorizaciones; la real depende de recarga, extracción, calidad y límites ecológicos.",
    distractores: [
      "Ambas son equivalentes si existen concesiones vigentes.",
      "La disponibilidad real solo depende de lluvia anual.",
      "La disponibilidad legal prevalece sobre cualquier límite físico."
    ]
  },
  {
    id: "mod27-008",
    modulo: 27,
    pregunta: "¿Qué vuelve robusto un mapa de estrés hídrico?",
    respuestaCorrecta: "Cruzar disponibilidad, demanda, calidad, recarga, extracción, vulnerabilidad social y cambio climático.",
    distractores: [
      "Mostrar únicamente ubicación de presas y ríos.",
      "Priorizar municipios con mayor población.",
      "Usar solo datos históricos de precipitación."
    ]
  },
  {
    id: "mod27-009",
    modulo: 27,
    pregunta: "¿Qué riesgo surge cuando megaproyectos se evalúan sin balance hídrico integral?",
    respuestaCorrecta: "Subestimar competencia por agua, impactos acumulativos y conflictos territoriales previsibles.",
    distractores: [
      "Reducir automáticamente rentabilidad del proyecto.",
      "Impedir participación de inversionistas privados.",
      "Eliminar necesidad de permisos ambientales."
    ]
  },
  {
    id: "mod27-010",
    modulo: 27,
    pregunta: "¿Qué hace técnicamente consistente un análisis de contaminación hídrica crónica?",
    respuestaCorrecta: "Relacionar fuentes, concentración, exposición, temporalidad, afectación ecosistémica y riesgo sanitario.",
    distractores: [
      "Medir únicamente color, olor o turbidez visible.",
      "Comparar solo reportes ciudadanos recientes.",
      "Priorizar zonas con mayor cobertura mediática."
    ]
  },
  {
    id: "mod27-011",
    modulo: 27,
    pregunta: "¿Qué vuelve internacionalmente relevante un informe sobre derecho humano al agua?",
    respuestaCorrecta: "Documentar acceso insuficiente, discriminación territorial, contaminación y omisiones estatales verificables.",
    distractores: [
      "Traducir el informe a varios idiomas.",
      "Comparar únicamente consumo per cápita nacional.",
      "Incluir fotografías de cuerpos de agua afectados."
    ]
  },
  {
    id: "mod27-012",
    modulo: 27,
    pregunta: "¿Qué práctica protege mejor a defensores del agua y comunidades denunciantes?",
    respuestaCorrecta: "Anonimato por defecto, publicación agregada, control de metadatos y protección de localización sensible.",
    distractores: [
      "Publicar nombres para fortalecer presión pública.",
      "Enviar denuncias completas a autoridades locales señaladas.",
      "Exigir identificación pública para validar reportes."
    ]
  },
  {
    id: "mod27-013",
    modulo: 27,
    pregunta: "¿Qué criterio fortalece más una evaluación de concesiones hídricas?",
    respuestaCorrecta: "Analizar volumen, uso, titularidad, concentración, disponibilidad real, impacto territorial y cumplimiento.",
    distractores: [
      "Contar únicamente número de concesiones vigentes.",
      "Comparar solo usos agrícolas e industriales.",
      "Priorizar concesiones con mayor antigüedad."
    ]
  },
  {
    id: "mod27-014",
    modulo: 27,
    pregunta: "¿Qué problema surge cuando la gestión del agua se analiza separada del uso de suelo?",
    respuestaCorrecta: "Se invisibiliza cómo urbanización, industria, agricultura y extractivismo alteran la demanda y recarga.",
    distractores: [
      "Se reduce velocidad de modelación hidrológica.",
      "Se elimina trazabilidad documental.",
      "Se impide análisis de calidad del agua."
    ]
  },
  {
    id: "mod27-015",
    modulo: 27,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodologías, evaluar cuencas, concesiones, impactos acumulativos y riesgos territoriales.",
    distractores: [
      "Asignar agua entre usuarios en conflicto.",
      "Sustituir a organismos operadores.",
      "Emitir permisos de explotación hídrica."
    ]
  },
  {
    id: "mod27-016",
    modulo: 27,
    pregunta: "¿Qué hace sólida una evaluación de justicia hídrica?",
    respuestaCorrecta: "Comparar acceso humano, usos productivos, concentración de concesiones y afectación a comunidades vulnerables.",
    distractores: [
      "Medir únicamente litros disponibles por habitante.",
      "Priorizar consumo industrial por eficiencia económica.",
      "Analizar solo infraestructura hidráulica existente."
    ]
  },
  {
    id: "mod27-017",
    modulo: 27,
    pregunta: "¿Qué riesgo existe cuando se privilegia infraestructura hídrica sin reducir pérdidas de red?",
    respuestaCorrecta: "Aumentar oferta aparente sin corregir ineficiencias, fugas y desigualdad de distribución.",
    distractores: [
      "Eliminar necesidad de plantas potabilizadoras.",
      "Reducir automáticamente la demanda urbana.",
      "Impedir análisis de concesiones agrícolas."
    ]
  },
  {
    id: "mod27-018",
    modulo: 27,
    pregunta: "¿Qué caracteriza una política hídrica territorialmente sustentable?",
    respuestaCorrecta: "Respeta límites de cuenca, prioriza derecho humano, protege ecosistemas y equilibra usos productivos.",
    distractores: [
      "Maximiza extracción para desarrollo económico inmediato.",
      "Centraliza decisiones sin consulta local.",
      "Depende exclusivamente de grandes trasvases."
    ]
  },
  {
    id: "mod27-019",
    modulo: 27,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de datos, mapas, reportes comunitarios y dictámenes hídricos.",
    distractores: [
      "Garantizar exactitud automática de mediciones hidrológicas.",
      "Sustituir monitoreo de campo.",
      "Resolver conflictos por concesiones."
    ]
  },
  {
    id: "mod27-020",
    modulo: 27,
    pregunta: "¿Qué vuelve técnicamente útil un diagnóstico por cuenca?",
    respuestaCorrecta: "Permite evaluar flujos, recarga, extracción, contaminación y conflictos como sistema interdependiente.",
    distractores: [
      "Facilita comparar municipios por población.",
      "Permite excluir actividades agrícolas menores.",
      "Reduce necesidad de información histórica."
    ]
  },
  {
    id: "mod27-021",
    modulo: 27,
    pregunta: "¿Qué práctica reduce mejor la criminalización de la defensa del agua?",
    respuestaCorrecta: "Documentar impactos estructurales y decisiones institucionales sin exponer liderazgos comunitarios.",
    distractores: [
      "Publicar rostros de defensores para generar solidaridad.",
      "Eliminar denuncias de comunidades en conflicto.",
      "Clasificar protestas como evidencia principal."
    ]
  },
  {
    id: "mod27-022",
    modulo: 27,
    pregunta: "¿Qué vuelve robusto un análisis de privatización de facto del agua?",
    respuestaCorrecta: "Identificar concentración de acceso, control económico, uso excluyente y captura regulatoria verificable.",
    distractores: [
      "Demostrar que existe inversión privada en infraestructura.",
      "Contar concesiones otorgadas a empresas.",
      "Comparar tarifas urbanas entre municipios."
    ]
  },
  {
    id: "mod27-023",
    modulo: 27,
    pregunta: "¿Qué riesgo existe al publicar ubicaciones exactas de fuentes comunitarias vulnerables?",
    respuestaCorrecta: "Exponerlas a presión, acaparamiento, sabotaje, represalias o explotación indebida.",
    distractores: [
      "Reducir precisión de mapas públicos.",
      "Eliminar trazabilidad de expedientes.",
      "Impedir análisis de calidad."
    ]
  },
  {
    id: "mod27-024",
    modulo: 27,
    pregunta: "¿Qué característica fortalece una evaluación de alternativas hídricas?",
    respuestaCorrecta: "Comparar eficiencia, costo de ciclo de vida, impacto ambiental, equidad y resiliencia climática.",
    distractores: [
      "Priorizar la obra de mayor capacidad nominal.",
      "Elegir siempre la tecnología más moderna.",
      "Comparar únicamente costo inicial."
    ]
  },
  {
    id: "mod27-025",
    modulo: 27,
    pregunta: "¿Qué problema surge cuando se ignoran saberes comunitarios sobre agua y territorio?",
    respuestaCorrecta: "Se pierden señales locales de cambio, manejo histórico y riesgos no capturados por datos formales.",
    distractores: [
      "Se reduce automáticamente validez jurídica.",
      "Se elimina capacidad de modelación satelital.",
      "Se impide análisis de concesiones."
    ]
  },
  {
    id: "mod27-026",
    modulo: 27,
    pregunta: "¿Qué criterio fortalece más una auditoría de infraestructura hidráulica?",
    respuestaCorrecta: "Evaluar fugas, mantenimiento, cobertura, calidad, resiliencia, costos y equidad de distribución.",
    distractores: [
      "Medir únicamente capacidad instalada.",
      "Comparar solo inversión total ejecutada.",
      "Priorizar obras nuevas sobre rehabilitación."
    ]
  },
  {
    id: "mod27-027",
    modulo: 27,
    pregunta: "¿Qué hace técnicamente sólida una correlación entre concesiones e impacto ambiental?",
    respuestaCorrecta: "Ajustar por temporalidad, volumen, ubicación, uso, condiciones de cuenca y otras presiones concurrentes.",
    distractores: [
      "Relacionar cualquier concesión con cualquier daño cercano.",
      "Usar solo percepción comunitaria de afectación.",
      "Comparar municipios sin controlar disponibilidad."
    ]
  },
  {
    id: "mod27-028",
    modulo: 27,
    pregunta: "¿Qué característica vuelve útil un análisis de conflicto sociohídrico?",
    respuestaCorrecta: "Relacionar acceso desigual, usos competidores, decisiones administrativas, impacto social y contexto territorial.",
    distractores: [
      "Contar únicamente protestas registradas.",
      "Priorizar conflictos con cobertura nacional.",
      "Publicar nombres de actores comunitarios."
    ]
  },
  {
    id: "mod27-029",
    modulo: 27,
    pregunta: "¿Qué riesgo existe cuando se trata la escasez de agua como fenómeno puramente climático?",
    respuestaCorrecta: "Ocultar causas institucionales, concesiones insostenibles, contaminación y mala planeación territorial.",
    distractores: [
      "Reducir interés público en sequías.",
      "Impedir toda cooperación internacional.",
      "Eliminar utilidad de datos meteorológicos."
    ]
  },
  {
    id: "mod27-030",
    modulo: 27,
    pregunta: "¿Cuál es el principio rector del Módulo 27?",
    respuestaCorrecta: "Sin agua gestionada con evidencia, equidad y límites territoriales, no hay vida, economía ni paz social.",
    distractores: [
      "La tecnología puede resolver la escasez sin cambios de gobernanza.",
      "La soberanía hídrica exige excluir todo uso productivo privado.",
      "La infraestructura nueva sustituye la planeación territorial."
    ]
  }
]);

const preguntasTecnicasModulo28 = adaptarBancoTecnico([
{
    id: "mod28-001",
    modulo: 28,
    pregunta: "¿Qué distingue una evaluación ambiental integral de una evaluación meramente procedimental?",
    respuestaCorrecta: "La integración verificable de impactos acumulativos, riesgos climáticos, irreversibilidad y consecuencias intergeneracionales.",
    distractores: [
      "La cantidad total de anexos técnicos presentados.",
      "La rapidez con la que se autoriza un proyecto.",
      "El cumplimiento formal de trámites administrativos."
    ]
  },
  {
    id: "mod28-002",
    modulo: 28,
    pregunta: "¿Qué riesgo estructural surge cuando el costo ambiental no se incorpora en decisiones productivas?",
    respuestaCorrecta: "Transferir daño ecológico, sanitario y climático a comunidades y generaciones futuras sin rendición de cuentas.",
    distractores: [
      "Reducir automáticamente inversión extranjera.",
      "Impedir crecimiento económico regional.",
      "Eliminar toda viabilidad energética."
    ]
  },
  {
    id: "mod28-003",
    modulo: 28,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No cancela proyectos ni sustituye autoridades ambientales o regulatorias.",
    distractores: [
      "No puede modelar escenarios climáticos.",
      "No puede analizar impacto acumulativo.",
      "No puede emitir dictámenes territoriales."
    ]
  },
  {
    id: "mod28-004",
    modulo: 28,
    pregunta: "¿Qué hace metodológicamente sólido un dictamen de impacto ambiental integral?",
    respuestaCorrecta: "Relacionar daño ecológico, riesgo climático, efectos acumulativos y alternativas sostenibles comparables.",
    distractores: [
      "Comparar únicamente emisiones directas del proyecto.",
      "Priorizar cumplimiento documental administrativo.",
      "Usar exclusivamente estudios financiados por el promovente."
    ]
  },
  {
    id: "mod28-005",
    modulo: 28,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Integrar datos satelitales, modelar riesgos y detectar patrones territoriales de degradación ambiental.",
    distractores: [
      "Autorizar automáticamente proyectos sustentables.",
      "Sustituir peritajes ambientales especializados.",
      "Decidir qué actividad económica debe prohibirse."
    ]
  },
  {
    id: "mod28-006",
    modulo: 28,
    pregunta: "¿Qué diferencia existe entre impacto ambiental aislado e impacto acumulativo?",
    respuestaCorrecta: "El acumulativo considera interacción temporal y territorial de múltiples proyectos y omisiones.",
    distractores: [
      "El impacto aislado siempre es irreversible.",
      "El impacto acumulativo depende solo del tamaño del proyecto.",
      "Ambos conceptos son equivalentes técnicamente."
    ]
  },
  {
    id: "mod28-007",
    modulo: 28,
    pregunta: "¿Qué vuelve robusto un mapa de riesgo climático territorial?",
    respuestaCorrecta: "Integrar temperatura, agua, vulnerabilidad social, biodiversidad, eventos extremos y presión productiva.",
    distractores: [
      "Mostrar únicamente zonas con sequía histórica.",
      "Priorizar regiones urbanas de alta densidad.",
      "Usar solo promedios nacionales de temperatura."
    ]
  },
  {
    id: "mod28-008",
    modulo: 28,
    pregunta: "¿Qué práctica reduce mejor el riesgo de greenwashing institucional?",
    respuestaCorrecta: "Exigir trazabilidad metodológica, métricas comparables y evidencia verificable de reducción de daño.",
    distractores: [
      "Publicar campañas ambientales corporativas.",
      "Usar términos de neutralidad climática sin auditoría.",
      "Incrementar difusión de reportes de sustentabilidad."
    ]
  },
  {
    id: "mod28-009",
    modulo: 28,
    pregunta: "¿Qué hace técnicamente consistente un análisis de irreversibilidad ambiental?",
    respuestaCorrecta: "Evaluar capacidad de recuperación ecológica, temporalidad del daño y pérdida funcional del ecosistema.",
    distractores: [
      "Comparar únicamente costos de remediación.",
      "Priorizar percepción pública del daño.",
      "Medir solo superficie afectada."
    ]
  },
  {
    id: "mod28-010",
    modulo: 28,
    pregunta: "¿Qué riesgo metodológico existe al evaluar proyectos sin considerar escenarios climáticos futuros?",
    respuestaCorrecta: "Subestimar vulnerabilidad territorial y costos ambientales de largo plazo.",
    distractores: [
      "Reducir precisión de estudios económicos.",
      "Eliminar capacidad de monitoreo satelital.",
      "Impedir análisis jurídico de permisos."
    ]
  },
  {
    id: "mod28-011",
    modulo: 28,
    pregunta: "¿Qué vuelve internacionalmente relevante un informe ambiental ciudadano?",
    respuestaCorrecta: "Compatibilidad metodológica con estándares climáticos, ambientales y de derechos humanos.",
    distractores: [
      "Publicación del informe en varios idiomas.",
      "Participación de organizaciones internacionales.",
      "Uso de plataformas digitales globales."
    ]
  },
  {
    id: "mod28-012",
    modulo: 28,
    pregunta: "¿Qué función cumplen hashes criptográficos y sellos de tiempo?",
    respuestaCorrecta: "Preservar integridad verificable de evidencia ambiental, mapas y dictámenes técnicos.",
    distractores: [
      "Garantizar exactitud automática de modelos climáticos.",
      "Sustituir monitoreo ambiental de campo.",
      "Eliminar necesidad de auditoría independiente."
    ]
  },
  {
    id: "mod28-013",
    modulo: 28,
    pregunta: "¿Qué criterio fortalece más una evaluación de alternativas sostenibles?",
    respuestaCorrecta: "Comparar impactos, resiliencia, costos de ciclo de vida y efectos intergeneracionales.",
    distractores: [
      "Seleccionar la alternativa de menor costo inicial.",
      "Priorizar la tecnología más reciente disponible.",
      "Elegir la opción con menor tiempo de implementación."
    ]
  },
  {
    id: "mod28-014",
    modulo: 28,
    pregunta: "¿Qué problema surge cuando el daño ambiental se fragmenta en trámites separados?",
    respuestaCorrecta: "Se invisibiliza el efecto acumulativo y se debilita la prevención sistémica del daño.",
    distractores: [
      "Se reduce velocidad de autorización administrativa.",
      "Se elimina capacidad de participación ciudadana.",
      "Se impide análisis satelital regional."
    ]
  },
  {
    id: "mod28-015",
    modulo: 28,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar metodologías, escenarios climáticos y evaluaciones de impacto ambiental integral.",
    distractores: [
      "Emitir permisos ambientales obligatorios.",
      "Sustituir agencias regulatorias.",
      "Determinar sanciones penales ambientales."
    ]
  },
  {
    id: "mod28-016",
    modulo: 28,
    pregunta: "¿Qué hace sólida una evaluación de vulnerabilidad climática?",
    respuestaCorrecta: "Relacionar exposición, capacidad adaptativa, sensibilidad ecológica y condiciones socioeconómicas.",
    distractores: [
      "Comparar únicamente temperatura promedio anual.",
      "Priorizar regiones con más infraestructura.",
      "Usar exclusivamente datos históricos meteorológicos."
    ]
  },
  {
    id: "mod28-017",
    modulo: 28,
    pregunta: "¿Qué riesgo existe cuando proyectos se aprueban sin análisis de biodiversidad funcional?",
    respuestaCorrecta: "Perder resiliencia ecológica y alterar procesos ecosistémicos críticos no visibles inmediatamente.",
    distractores: [
      "Reducir precisión financiera del proyecto.",
      "Eliminar capacidad de monitoreo comunitario.",
      "Impedir evaluación de emisiones."
    ]
  },
  {
    id: "mod28-018",
    modulo: 28,
    pregunta: "¿Qué caracteriza una política ambiental preventivamente robusta?",
    respuestaCorrecta: "Actuar antes de daños irreversibles mediante evidencia científica y evaluación acumulativa.",
    distractores: [
      "Priorizar compensaciones económicas posteriores.",
      "Concentrarse exclusivamente en remediación.",
      "Depender únicamente de denuncias ciudadanas."
    ]
  },
  {
    id: "mod28-019",
    modulo: 28,
    pregunta: "¿Qué vuelve técnicamente útil un análisis de deforestación estructural?",
    respuestaCorrecta: "Relacionar pérdida de cobertura, cambio de uso de suelo, infraestructura y presión económica.",
    distractores: [
      "Contar únicamente hectáreas desmontadas.",
      "Priorizar zonas de alto valor turístico.",
      "Medir solo pérdida de árboles adultos."
    ]
  },
  {
    id: "mod28-020",
    modulo: 28,
    pregunta: "¿Qué riesgo metodológico existe al medir contaminación solo mediante promedios anuales?",
    respuestaCorrecta: "Ocultar picos críticos de exposición y afectaciones severas de corto plazo.",
    distractores: [
      "Reducir capacidad de modelación climática.",
      "Eliminar interoperabilidad geoespacial.",
      "Impedir evaluación jurídica de permisos."
    ]
  },
  {
    id: "mod28-021",
    modulo: 28,
    pregunta: "¿Qué característica fortalece más la justicia intergeneracional?",
    respuestaCorrecta: "Incorporar efectos futuros y límites ecológicos en decisiones presentes verificables.",
    distractores: [
      "Priorizar crecimiento económico inmediato.",
      "Concentrarse solo en daños visibles actuales.",
      "Reducir análisis a costos presupuestales."
    ]
  },
  {
    id: "mod28-022",
    modulo: 28,
    pregunta: "¿Qué vuelve robusta una evaluación de emisiones industriales?",
    respuestaCorrecta: "Analizar cantidad, persistencia, dispersión, exposición poblacional y efectos acumulativos.",
    distractores: [
      "Comparar únicamente emisiones declaradas.",
      "Medir solo emisiones visibles.",
      "Priorizar percepción comunitaria de contaminación."
    ]
  },
  {
    id: "mod28-023",
    modulo: 28,
    pregunta: "¿Qué práctica protege mejor a denunciantes ambientales?",
    respuestaCorrecta: "Anonimización por defecto, publicación agregada y control estricto de datos sensibles.",
    distractores: [
      "Publicar identidad para fortalecer credibilidad.",
      "Enviar reportes completos a autoridades locales.",
      "Exigir validación pública de denuncias."
    ]
  },
  {
    id: "mod28-024",
    modulo: 28,
    pregunta: "¿Qué problema surge cuando se ignoran alternativas menos dañinas técnicamente viables?",
    respuestaCorrecta: "Se incrementa injustificadamente el costo ecológico y climático de las decisiones.",
    distractores: [
      "Reducir velocidad de ejecución del proyecto.",
      "Eliminar viabilidad financiera inmediata.",
      "Impedir autorización regulatoria."
    ]
  },
  {
    id: "mod28-025",
    modulo: 28,
    pregunta: "¿Qué característica fortalece un análisis de salud ambiental?",
    respuestaCorrecta: "Relacionar contaminación, exposición prolongada, vulnerabilidad poblacional y efectos epidemiológicos.",
    distractores: [
      "Comparar únicamente consultas médicas registradas.",
      "Priorizar enfermedades de alta mortalidad.",
      "Usar solo percepción subjetiva de riesgo."
    ]
  },
  {
    id: "mod28-026",
    modulo: 28,
    pregunta: "¿Qué criterio fortalece más una evaluación territorial de megaproyectos?",
    respuestaCorrecta: "Integrar ecosistemas, agua, clima, movilidad, comunidades y efectos acumulativos regionales.",
    distractores: [
      "Medir únicamente superficie intervenida.",
      "Priorizar impacto económico esperado.",
      "Comparar solo emisiones directas del proyecto."
    ]
  },
  {
    id: "mod28-027",
    modulo: 28,
    pregunta: "¿Qué hace técnicamente sólida una alerta temprana de degradación ambiental?",
    respuestaCorrecta: "Detectar tendencias verificables antes de umbrales irreversibles mediante monitoreo continuo.",
    distractores: [
      "Publicar cualquier anomalía satelital automáticamente.",
      "Usar exclusivamente denuncias comunitarias.",
      "Comparar únicamente datos históricos pasados."
    ]
  },
  {
    id: "mod28-028",
    modulo: 28,
    pregunta: "¿Qué característica vuelve útil una evaluación de resiliencia ecosistémica?",
    respuestaCorrecta: "Analizar capacidad de recuperación frente a perturbaciones climáticas y presión humana acumulativa.",
    distractores: [
      "Medir únicamente biodiversidad visible.",
      "Comparar solo extensión territorial protegida.",
      "Priorizar ecosistemas con valor turístico."
    ]
  },
  {
    id: "mod28-029",
    modulo: 28,
    pregunta: "¿Qué riesgo existe cuando el daño ambiental se normaliza como costo inevitable del desarrollo?",
    respuestaCorrecta: "Debilitar prevención, invisibilizar impactos acumulativos y transferir riesgos a futuras generaciones.",
    distractores: [
      "Reducir capacidad de inversión internacional.",
      "Eliminar innovación tecnológica ambiental.",
      "Impedir evaluación climática futura."
    ]
  },
  {
    id: "mod28-030",
    modulo: 28,
    pregunta: "¿Cuál es el principio rector del Módulo 28?",
    respuestaCorrecta: "La sustentabilidad es una obligación presente para proteger derechos, ecosistemas y generaciones futuras.",
    distractores: [
      "El crecimiento económico debe prevalecer sobre límites ecológicos.",
      "La tecnología resolverá automáticamente cualquier daño ambiental.",
      "La protección ambiental depende exclusivamente de autoridades regulatorias."
    ]
  }
]);

const preguntasTecnicasModulo29 = adaptarBancoTecnico([
{
    id: "mod29-001",
    modulo: 29,
    pregunta: "¿Qué distingue una respuesta resiliente de una reacción improvisada ante emergencias?",
    respuestaCorrecta: "La coordinación verificable basada en información estructurada, trazabilidad y aprendizaje acumulativo.",
    distractores: [
      "La velocidad inicial de movilización espontánea.",
      "La cantidad total de voluntarios disponibles.",
      "La cobertura mediática del desastre."
    ]
  },
  {
    id: "mod29-002",
    modulo: 29,
    pregunta: "¿Qué riesgo estructural surge cuando la ayuda humanitaria no tiene trazabilidad?",
    respuestaCorrecta: "Duplicación, desvío, abandono territorial y pérdida de confianza pública.",
    distractores: [
      "Reducción automática de recursos donados.",
      "Eliminación de protocolos oficiales.",
      "Imposibilidad de generar mapas de riesgo."
    ]
  },
  {
    id: "mod29-003",
    modulo: 29,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No dirige operativos oficiales ni sustituye autoridades de protección civil.",
    distractores: [
      "No puede generar alertas tempranas.",
      "No puede coordinar ayuda solidaria.",
      "No puede documentar daños estructurales."
    ]
  },
  {
    id: "mod29-004",
    modulo: 29,
    pregunta: "¿Qué hace metodológicamente sólido un mapa dinámico de riesgo?",
    respuestaCorrecta: "Integrar amenazas naturales, infraestructura crítica, vulnerabilidad social y capacidad de respuesta.",
    distractores: [
      "Mostrar únicamente eventos históricos de desastre.",
      "Priorizar regiones con mayor densidad urbana.",
      "Usar solo información satelital climática."
    ]
  },
  {
    id: "mod29-005",
    modulo: 29,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Clasificar reportes, priorizar riesgos y facilitar coordinación logística verificable.",
    distractores: [
      "Sustituir mandos de protección civil.",
      "Autorizar evacuaciones obligatorias.",
      "Tomar decisiones coercitivas automáticas."
    ]
  },
  {
    id: "mod29-006",
    modulo: 29,
    pregunta: "¿Qué diferencia existe entre vulnerabilidad y exposición al riesgo?",
    respuestaCorrecta: "La exposición describe amenaza potencial; la vulnerabilidad incorpora capacidad de respuesta y resiliencia.",
    distractores: [
      "La vulnerabilidad depende únicamente del nivel económico.",
      "La exposición implica siempre daño irreversible.",
      "Ambos conceptos son equivalentes técnicamente."
    ]
  },
  {
    id: "mod29-007",
    modulo: 29,
    pregunta: "¿Qué vuelve robusto un sistema ciudadano de alertas?",
    respuestaCorrecta: "Validación multicapa, priorización territorial y difusión responsable basada en evidencia.",
    distractores: [
      "Publicación inmediata de cualquier reporte recibido.",
      "Difusión masiva sin filtros de gravedad.",
      "Centralización exclusiva en operadores humanos."
    ]
  },
  {
    id: "mod29-008",
    modulo: 29,
    pregunta: "¿Qué práctica reduce mejor el riesgo de caos informativo durante una emergencia?",
    respuestaCorrecta: "Estructurar reportes por gravedad, ubicación, temporalidad y consistencia verificable.",
    distractores: [
      "Publicar todos los mensajes ciudadanos sin clasificación.",
      "Eliminar reportes no confirmados automáticamente.",
      "Priorizar únicamente fuentes gubernamentales."
    ]
  },
  {
    id: "mod29-009",
    modulo: 29,
    pregunta: "¿Qué hace técnicamente consistente una auditoría post-desastre?",
    respuestaCorrecta: "Relacionar alertas, tiempos de respuesta, recursos movilizados y resultados observables.",
    distractores: [
      "Comparar únicamente gasto público ejecutado.",
      "Medir solo percepción social de la respuesta.",
      "Priorizar zonas con mayor cobertura mediática."
    ]
  },
  {
    id: "mod29-010",
    modulo: 29,
    pregunta: "¿Qué riesgo metodológico existe al evaluar emergencias solo durante la fase crítica?",
    respuestaCorrecta: "Ignorar prevención estructural y fallas persistentes en reconstrucción y resiliencia.",
    distractores: [
      "Reducir precisión de modelos meteorológicos.",
      "Eliminar interoperabilidad entre plataformas.",
      "Impedir coordinación logística básica."
    ]
  },
  {
    id: "mod29-011",
    modulo: 29,
    pregunta: "¿Qué vuelve internacionalmente relevante un informe de gestión de emergencias?",
    respuestaCorrecta: "Compatibilidad metodológica con estándares humanitarios y de reducción de riesgo de desastres.",
    distractores: [
      "Participación de organizaciones extranjeras.",
      "Difusión mediática internacional.",
      "Publicación en varios idiomas."
    ]
  },
  {
    id: "mod29-012",
    modulo: 29,
    pregunta: "¿Qué función cumplen hashes criptográficos y sellos de tiempo?",
    respuestaCorrecta: "Preservar integridad verificable de reportes, alertas, entregas y decisiones registradas.",
    distractores: [
      "Garantizar exactitud automática de reportes ciudadanos.",
      "Sustituir validación humana de daños.",
      "Eliminar necesidad de auditoría posterior."
    ]
  },
  {
    id: "mod29-013",
    modulo: 29,
    pregunta: "¿Qué criterio fortalece más una evaluación de infraestructura crítica?",
    respuestaCorrecta: "Analizar redundancia, vulnerabilidad, dependencia sistémica y capacidad de recuperación.",
    distractores: [
      "Comparar únicamente antigüedad de instalaciones.",
      "Priorizar infraestructura con mayor costo.",
      "Medir solo capacidad nominal operativa."
    ]
  },
  {
    id: "mod29-014",
    modulo: 29,
    pregunta: "¿Qué problema surge cuando la reconstrucción se enfoca solo en rapidez?",
    respuestaCorrecta: "Reproducir vulnerabilidades estructurales y aumentar riesgo de futuros desastres.",
    distractores: [
      "Reducir inversión privada regional.",
      "Eliminar participación comunitaria.",
      "Impedir acceso a financiamiento internacional."
    ]
  },
  {
    id: "mod29-015",
    modulo: 29,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Validar riesgos, protocolos, análisis de daños y criterios de resiliencia territorial.",
    distractores: [
      "Dirigir operativos de rescate.",
      "Sustituir autoridades militares o civiles.",
      "Administrar recursos de ayuda humanitaria."
    ]
  },
  {
    id: "mod29-016",
    modulo: 29,
    pregunta: "¿Qué hace sólida una evaluación de resiliencia comunitaria?",
    respuestaCorrecta: "Relacionar preparación, redes sociales, infraestructura, conocimiento local y capacidad adaptativa.",
    distractores: [
      "Comparar únicamente ingresos económicos.",
      "Priorizar disponibilidad de seguros privados.",
      "Usar solo densidad poblacional."
    ]
  },
  {
    id: "mod29-017",
    modulo: 29,
    pregunta: "¿Qué riesgo existe cuando los sistemas de alerta temprana dependen de una sola fuente?",
    respuestaCorrecta: "Incrementar vulnerabilidad ante fallas técnicas, saturación o manipulación informativa.",
    distractores: [
      "Reducir velocidad de evacuación.",
      "Eliminar interoperabilidad territorial.",
      "Impedir reconstrucción posterior."
    ]
  },
  {
    id: "mod29-018",
    modulo: 29,
    pregunta: "¿Qué caracteriza una logística humanitaria técnicamente eficiente?",
    respuestaCorrecta: "Asignar recursos según urgencia, proximidad, capacidad y trazabilidad verificable.",
    distractores: [
      "Distribuir ayuda por orden de llegada.",
      "Priorizar zonas con mayor cobertura mediática.",
      "Centralizar toda entrega en un único punto."
    ]
  },
  {
    id: "mod29-019",
    modulo: 29,
    pregunta: "¿Qué vuelve técnicamente útil un análisis de fallas institucionales en emergencias?",
    respuestaCorrecta: "Identificar retrasos, vacíos de coordinación, cuellos logísticos y omisiones documentadas.",
    distractores: [
      "Comparar únicamente declaraciones oficiales.",
      "Medir solo recursos económicos utilizados.",
      "Priorizar percepción pública de liderazgo."
    ]
  },
  {
    id: "mod29-020",
    modulo: 29,
    pregunta: "¿Qué riesgo metodológico existe al publicar reportes sensibles sin agregación?",
    respuestaCorrecta: "Exponer personas afectadas, generar pánico o facilitar explotación indebida de información.",
    distractores: [
      "Reducir precisión de análisis territorial.",
      "Eliminar compatibilidad geoespacial.",
      "Impedir actualización de mapas."
    ]
  },
  {
    id: "mod29-021",
    modulo: 29,
    pregunta: "¿Qué característica fortalece más la coordinación solidaria distribuida?",
    respuestaCorrecta: "Interoperabilidad, validación comunitaria y asignación transparente de apoyos.",
    distractores: [
      "Centralización total de decisiones logísticas.",
      "Priorizar únicamente grandes donantes.",
      "Eliminar participación ciudadana espontánea."
    ]
  },
  {
    id: "mod29-022",
    modulo: 29,
    pregunta: "¿Qué vuelve robusta una evaluación de riesgo urbano ante inundaciones?",
    respuestaCorrecta: "Integrar drenaje, uso de suelo, impermeabilización, densidad y escenarios climáticos.",
    distractores: [
      "Comparar únicamente precipitación anual.",
      "Medir solo profundidad histórica de inundaciones.",
      "Priorizar colonias de alto valor económico."
    ]
  },
  {
    id: "mod29-023",
    modulo: 29,
    pregunta: "¿Qué práctica protege mejor a personas afectadas durante una emergencia?",
    respuestaCorrecta: "Anonimización de datos sensibles y publicación agregada de necesidades y daños.",
    distractores: [
      "Publicar identidades para facilitar ayuda directa.",
      "Compartir ubicación exacta de víctimas públicamente.",
      "Exigir verificación pública antes de registrar apoyos."
    ]
  },
  {
    id: "mod29-024",
    modulo: 29,
    pregunta: "¿Qué problema surge cuando la ayuda humanitaria se politiza?",
    respuestaCorrecta: "Se distorsiona asignación de recursos y se debilita confianza pública en la coordinación.",
    distractores: [
      "Se elimina interoperabilidad logística.",
      "Se reduce precisión de análisis climático.",
      "Se impide monitoreo geoespacial."
    ]
  },
  {
    id: "mod29-025",
    modulo: 29,
    pregunta: "¿Qué característica fortalece un análisis de resiliencia territorial?",
    respuestaCorrecta: "Evaluar capacidad adaptativa, infraestructura, cohesión social y exposición sistémica.",
    distractores: [
      "Comparar únicamente inversión pública regional.",
      "Priorizar territorios con mayor densidad poblacional.",
      "Usar solo indicadores económicos."
    ]
  },
  {
    id: "mod29-026",
    modulo: 29,
    pregunta: "¿Qué criterio fortalece más una evaluación de refugios temporales?",
    respuestaCorrecta: "Capacidad, accesibilidad, seguridad sanitaria, resiliencia y proximidad a población vulnerable.",
    distractores: [
      "Comparar únicamente tamaño físico disponible.",
      "Priorizar refugios con menor costo operativo.",
      "Usar solo cercanía a centros urbanos."
    ]
  },
  {
    id: "mod29-027",
    modulo: 29,
    pregunta: "¿Qué hace técnicamente sólida una correlación entre desastres y cambio climático?",
    respuestaCorrecta: "Analizar tendencias, escenarios probabilísticos y aumento verificable de eventos extremos.",
    distractores: [
      "Relacionar cualquier desastre con calentamiento global.",
      "Usar únicamente percepción pública del clima.",
      "Comparar eventos aislados sin contexto histórico."
    ]
  },
  {
    id: "mod29-028",
    modulo: 29,
    pregunta: "¿Qué característica vuelve útil una Red Solidaria Cívica?",
    respuestaCorrecta: "Coordinar necesidades y apoyos de manera trazable, descentralizada y verificable.",
    distractores: [
      "Centralizar toda ayuda en autoridades gubernamentales.",
      "Priorizar únicamente apoyo económico monetario.",
      "Operar sin registros para agilizar entregas."
    ]
  },
  {
    id: "mod29-029",
    modulo: 29,
    pregunta: "¿Qué riesgo existe cuando la memoria del desastre no se documenta?",
    respuestaCorrecta: "Repetir errores institucionales y perder aprendizaje colectivo para futuras emergencias.",
    distractores: [
      "Reducir precisión de sistemas meteorológicos.",
      "Eliminar cooperación internacional.",
      "Impedir generación de alertas tempranas."
    ]
  },
  {
    id: "mod29-030",
    modulo: 29,
    pregunta: "¿Cuál es el principio rector del Módulo 29?",
    respuestaCorrecta: "En emergencias, la información coordinada y verificable salva vidas y fortalece resiliencia colectiva.",
    distractores: [
      "La improvisación comunitaria es suficiente ante cualquier desastre.",
      "La respuesta oficial debe operar sin supervisión ciudadana.",
      "La tecnología puede sustituir completamente la acción humana."
    ]
  }
]);

const preguntasTecnicasModulo30 = adaptarBancoTecnico([
{
    id: "mod30-001",
    modulo: 30,
    pregunta: "¿Qué distingue un dictamen cívico diplomático de una acusación política contra una embajada?",
    respuestaCorrecta: "El dictamen evalúa idoneidad, congruencia institucional y desempeño con evidencia pública verificable.",
    distractores: [
      "El dictamen busca remover al titular de la misión.",
      "El dictamen sustituye la evaluación del Poder Ejecutivo.",
      "El dictamen se basa principalmente en percepción de la diáspora."
    ]
  },
  {
    id: "mod30-002",
    modulo: 30,
    pregunta: "¿Cuál es el principal límite operativo del módulo?",
    respuestaCorrecta: "No nombra embajadores, no representa al Estado mexicano ni sustituye la política exterior oficial.",
    distractores: [
      "No puede analizar compromisos internacionales.",
      "No puede emitir dossiers por país.",
      "No puede incorporar participación de la diáspora."
    ]
  },
  {
    id: "mod30-003",
    modulo: 30,
    pregunta: "¿Qué hace metodológicamente sólida una evaluación de representación diplomática?",
    respuestaCorrecta: "Relacionar perfil, trayectoria, país receptor, compromisos internacionales y desempeño verificable.",
    distractores: [
      "Comparar únicamente currículum académico del embajador.",
      "Medir popularidad pública de la embajada.",
      "Evaluar solo declaraciones oficiales recientes."
    ]
  },
  {
    id: "mod30-004",
    modulo: 30,
    pregunta: "¿Qué riesgo institucional surge cuando cargos diplomáticos se usan como moneda política?",
    respuestaCorrecta: "Deterioro reputacional, pérdida de capacidad técnica y debilitamiento de credibilidad internacional.",
    distractores: [
      "Reducción automática de comercio bilateral.",
      "Cancelación inmediata de acuerdos internacionales.",
      "Pérdida formal de soberanía diplomática."
    ]
  },
  {
    id: "mod30-005",
    modulo: 30,
    pregunta: "¿Qué función cumple la diáspora mexicana dentro del módulo?",
    respuestaCorrecta: "Aportar contexto local, evidencia pública y observación cívica agregada sin exposición individual.",
    distractores: [
      "Elegir representantes diplomáticos alternativos.",
      "Dirigir relaciones bilaterales desde el exterior.",
      "Emitir sanciones reputacionales obligatorias."
    ]
  },
  {
    id: "mod30-006",
    modulo: 30,
    pregunta: "¿Qué función cumple la IA dentro del módulo?",
    respuestaCorrecta: "Traducir jurídicamente, estructurar evidencia, cruzar obligaciones internacionales y preservar trazabilidad.",
    distractores: [
      "Representar formalmente a México ante organismos internacionales.",
      "Emitir posicionamientos diplomáticos automáticos.",
      "Determinar responsabilidad internacional definitiva."
    ]
  },
  {
    id: "mod30-007",
    modulo: 30,
    pregunta: "¿Qué diferencia existe entre crítica diplomática personalista y evaluación institucional estructural?",
    respuestaCorrecta: "La evaluación estructural analiza funciones, idoneidad, congruencia y efectos institucionales documentados.",
    distractores: [
      "La crítica personalista siempre es ilegal.",
      "La evaluación institucional evita cualquier referencia al titular.",
      "Ambas categorías son equivalentes si existe evidencia pública."
    ]
  },
  {
    id: "mod30-008",
    modulo: 30,
    pregunta: "¿Qué característica vuelve robusto un dossier internacional por país?",
    respuestaCorrecta: "Contexto bilateral, obligaciones aplicables, evidencia trazable, riesgos reputacionales y estándares comparables.",
    distractores: [
      "Extensión narrativa amplia y lenguaje diplomático.",
      "Cantidad de notas de prensa citadas.",
      "Opiniones agregadas de residentes mexicanos."
    ]
  },
  {
    id: "mod30-009",
    modulo: 30,
    pregunta: "¿Qué riesgo existe si la diáspora participa sin anonimato ni agregación?",
    respuestaCorrecta: "Exponer a personas a represalias laborales, migratorias, diplomáticas o comunitarias.",
    distractores: [
      "Reducir legitimidad del análisis comparado.",
      "Impedir traducción jurídica internacional.",
      "Eliminar valor técnico de los dictámenes."
    ]
  },
  {
    id: "mod30-010",
    modulo: 30,
    pregunta: "¿Qué hace técnicamente consistente una alerta reputacional diplomática?",
    respuestaCorrecta: "Documentar hechos públicos, impacto institucional, recurrencia y estándares internacionales afectados.",
    distractores: [
      "Basarse en cobertura mediática negativa.",
      "Emitirse ante cualquier controversia pública.",
      "Priorizar percepción de actores políticos nacionales."
    ]
  },
  {
    id: "mod30-011",
    modulo: 30,
    pregunta: "¿Qué vuelve internacionalmente útil un dictamen ciudadano?",
    respuestaCorrecta: "Ser verificable, traducible a estándares comparados y comprensible para organismos externos.",
    distractores: [
      "Estar firmado por muchas personas.",
      "Usar lenguaje diplomático severo.",
      "Ser publicado simultáneamente en redes sociales."
    ]
  },
  {
    id: "mod30-012",
    modulo: 30,
    pregunta: "¿Qué práctica protege mejor la neutralidad del módulo?",
    respuestaCorrecta: "Separar contexto de diáspora, deliberación ciudadana y análisis experto con criterios públicos.",
    distractores: [
      "Excluir toda participación ciudadana.",
      "Aceptar solo información gubernamental.",
      "Centralizar dictámenes en un vocero diplomático."
    ]
  },
  {
    id: "mod30-013",
    modulo: 30,
    pregunta: "¿Qué función cumplen hashes, sellos de tiempo y registros inmutables?",
    respuestaCorrecta: "Preservar integridad verificable de dictámenes, evidencia, versiones y entregas internacionales.",
    distractores: [
      "Validar automáticamente veracidad diplomática.",
      "Sustituir análisis jurídico internacional.",
      "Garantizar respuesta de organismos multilaterales."
    ]
  },
  {
    id: "mod30-014",
    modulo: 30,
    pregunta: "¿Qué criterio fortalece más una evaluación de idoneidad diplomática?",
    respuestaCorrecta: "Coherencia entre experiencia relevante, relación estratégica del país receptor y responsabilidades de la misión.",
    distractores: [
      "Afinidad política con el gobierno en turno.",
      "Reconocimiento público nacional del titular.",
      "Antigüedad en cargos partidistas o legislativos."
    ]
  },
  {
    id: "mod30-015",
    modulo: 30,
    pregunta: "¿Qué función cumplen los Comités de Ciudadanos Expertos?",
    respuestaCorrecta: "Definir metodologías, validar evidencia, contextualizar riesgos y emitir dictámenes comparables.",
    distractores: [
      "Nombrar representantes diplomáticos ciudadanos.",
      "Sustituir a la Secretaría de Relaciones Exteriores.",
      "Autorizar comunicaciones oficiales con otros Estados."
    ]
  },
  {
    id: "mod30-016",
    modulo: 30,
    pregunta: "¿Qué hace sólida una evaluación de compromisos internacionales incumplidos?",
    respuestaCorrecta: "Cruzar obligaciones asumidas, evidencia documentada, temporalidad y respuesta institucional verificable.",
    distractores: [
      "Comparar únicamente discursos oficiales.",
      "Medir número de tratados firmados.",
      "Priorizar opiniones de analistas internacionales."
    ]
  },
  {
    id: "mod30-017",
    modulo: 30,
    pregunta: "¿Qué riesgo existe cuando un dictamen se presenta como denuncia política y no como evaluación técnica?",
    respuestaCorrecta: "Pierde credibilidad internacional y puede ser interpretado como confrontación partidista.",
    distractores: [
      "Reduce automáticamente su valor documental.",
      "Impide toda traducción jurídica.",
      "Elimina participación de la diáspora."
    ]
  },
  {
    id: "mod30-018",
    modulo: 30,
    pregunta: "¿Qué caracteriza una salida crítica internacional responsable?",
    respuestaCorrecta: "Envío cifrado, evidencia validada, criterios de gravedad y destinatarios institucionalmente pertinentes.",
    distractores: [
      "Difusión pública inmediata de todos los documentos.",
      "Envío masivo a medios y gobiernos extranjeros.",
      "Activación automática por cualquier queja ciudadana."
    ]
  },
  {
    id: "mod30-019",
    modulo: 30,
    pregunta: "¿Qué vuelve técnicamente útil un mapa de compromisos internacionales?",
    respuestaCorrecta: "Relacionar obligaciones, evidencia de cumplimiento, brechas institucionales y riesgos por país o foro.",
    distractores: [
      "Mostrar únicamente tratados ratificados por México.",
      "Ordenar países por importancia comercial.",
      "Priorizar misiones diplomáticas con mayor personal."
    ]
  },
  {
    id: "mod30-020",
    modulo: 30,
    pregunta: "¿Qué riesgo metodológico existe al evaluar embajadas solo por actividad pública visible?",
    respuestaCorrecta: "Confundir presencia comunicacional con desempeño diplomático, consular e institucional verificable.",
    distractores: [
      "Reducir análisis de comunicación pública.",
      "Impedir evaluación de derechos humanos.",
      "Eliminar contexto de país receptor."
    ]
  },
  {
    id: "mod30-021",
    modulo: 30,
    pregunta: "¿Qué característica fortalece la participación de consejos regionales de diáspora?",
    respuestaCorrecta: "Experiencia local, anonimato, evidencia pública y contextualización técnica no partidista.",
    distractores: [
      "Representación proporcional por afinidad política.",
      "Control directo sobre dictámenes finales.",
      "Votación pública sobre desempeño personal."
    ]
  },
  {
    id: "mod30-022",
    modulo: 30,
    pregunta: "¿Qué vuelve robusta una evaluación de desempeño consular?",
    respuestaCorrecta: "Analizar acceso, protección, tiempos de respuesta, trato, cobertura territorial y atención a población vulnerable.",
    distractores: [
      "Medir únicamente número de trámites emitidos.",
      "Comparar publicaciones en redes sociales.",
      "Priorizar eventos culturales organizados."
    ]
  },
  {
    id: "mod30-023",
    modulo: 30,
    pregunta: "¿Qué problema surge cuando se ignoran estándares reales del país receptor?",
    respuestaCorrecta: "Se evalúa la representación sin contexto comparado ni expectativas institucionales aplicables.",
    distractores: [
      "Se reduce automáticamente cooperación bilateral.",
      "Se elimina valor de tratados internacionales.",
      "Se impide participación de la diáspora."
    ]
  },
  {
    id: "mod30-024",
    modulo: 30,
    pregunta: "¿Qué práctica reduce mejor el riesgo de confrontación diplomática indebida?",
    respuestaCorrecta: "Usar lenguaje técnico, evidencia pública, límites explícitos y enfoque institucional no personalista.",
    distractores: [
      "Publicar señalamientos personales directos.",
      "Enviar alertas sin revisión experta.",
      "Omitir hechos sensibles para evitar incomodidad."
    ]
  },
  {
    id: "mod30-025",
    modulo: 30,
    pregunta: "¿Qué criterio fortalece más una evaluación de congruencia internacional?",
    respuestaCorrecta: "Comparar discurso exterior, obligaciones asumidas y conducta documentada del Estado mexicano.",
    distractores: [
      "Comparar únicamente declaraciones presidenciales.",
      "Medir presencia en foros multilaterales.",
      "Priorizar relaciones comerciales estratégicas."
    ]
  },
  {
    id: "mod30-026",
    modulo: 30,
    pregunta: "¿Qué función tiene la vinculatoriedad externa acumulativa?",
    respuestaCorrecta: "Elevar progresivamente costos reputacionales, diplomáticos y financieros mediante evidencia persistente.",
    distractores: [
      "Obligar jurídicamente al Ejecutivo a modificar nombramientos.",
      "Sustituir sanciones internacionales formales.",
      "Convertir dictámenes en decisiones diplomáticas vinculantes."
    ]
  },
  {
    id: "mod30-027",
    modulo: 30,
    pregunta: "¿Qué vuelve sólida una evaluación de riesgo país desde dictámenes ciudadanos?",
    respuestaCorrecta: "Conectar violaciones, corrupción sistémica o incumplimientos con evidencia técnica y estándares ESG/derechos humanos.",
    distractores: [
      "Publicar críticas diplomáticas en medios extranjeros.",
      "Medir percepción de inversionistas sin evidencia.",
      "Comparar únicamente indicadores macroeconómicos."
    ]
  },
  {
    id: "mod30-028",
    modulo: 30,
    pregunta: "¿Qué riesgo existe si la IA adapta dictámenes sin revisión jurídica humana?",
    respuestaCorrecta: "Puede alterar matices legales, exceder alcance probatorio o generar traducciones institucionalmente imprecisas.",
    distractores: [
      "Reducir velocidad de entrega internacional.",
      "Eliminar trazabilidad criptográfica.",
      "Impedir publicación multilingüe."
    ]
  },
  {
    id: "mod30-029",
    modulo: 30,
    pregunta: "¿Qué característica fortalece más un dictamen diplomático comparable entre países?",
    respuestaCorrecta: "Criterios comunes, variables contextualizadas, fuentes públicas y metodología replicable.",
    distractores: [
      "Uso del mismo texto para todas las misiones.",
      "Comparación exclusiva de perfiles curriculares.",
      "Calificación numérica sin explicación contextual."
    ]
  },
  {
    id: "mod30-030",
    modulo: 30,
    pregunta: "¿Cuál es el principio rector del Módulo 30?",
    respuestaCorrecta: "La diáspora y la evidencia internacional convierten compromisos diplomáticos en estándares verificables y exigibles.",
    distractores: [
      "La ciudadanía debe sustituir la política exterior formal.",
      "Las embajadas deben responder directamente a comités ciudadanos.",
      "La presión internacional debe reemplazar instituciones nacionales."
    ]
  }
]);

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

function mezclar<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function tomarAleatorias(items: PreguntaBanco[], total: number) {
  return mezclar(items).slice(0, total);
}

function prepararPreguntaParaIntento(pregunta: PreguntaBanco): PreguntaBanco {
  const respuesta = pregunta.opciones[pregunta.respuestaCorrecta];
  const opciones = mezclar(pregunta.opciones);

  return {
    ...pregunta,
    opciones,
    respuestaCorrecta: opciones.indexOf(respuesta),
  };
}

export function obtenerExamenModulo(moduleId: number) {
  const tecnicas = preguntasTecnicasPorModulo[moduleId] || preguntasTecnicasPorModulo[1];
  const seleccionadas = [
    ...tomarAleatorias(preguntasEticasGlobales, 5),
    ...tomarAleatorias(tecnicas, 5),
  ];

  return mezclar(seleccionadas).map((pregunta, index) => ({
    ...prepararPreguntaParaIntento(pregunta),
    id: index + 1,
  }));
}
