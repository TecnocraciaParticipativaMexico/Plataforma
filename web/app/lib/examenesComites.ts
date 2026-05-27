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

const q = (pregunta: string, respuestaCorrecta: string, distractores: string[]): PreguntaTecnicaFuente => ({
  pregunta,
  respuestaCorrecta,
  distractores,
});

const preguntasTecnicasModulo01 = adaptarBancoTecnicoModulo01([
  { pregunta: "En una denuncia anónima sobre colusión entre policía municipal y crimen organizado, ¿cuál es el primer criterio técnico para decidir si puede integrarse a un expediente acumulativo sin exponer al denunciante?", opciones: ["Identificar civilmente al denunciante para confirmar su credibilidad antes de procesar el contenido.", "Separar identidad, contenido, metadatos y ubicación; preservar trazabilidad del hecho sin revelar a la persona.", "Publicar la denuncia completa para generar presión social inmediata.", "Enviar la denuncia directamente a la autoridad local señalada para solicitar aclaración."], correcta: 1 },
  { pregunta: "¿Qué combinación permite convertir denuncias ciudadanas aisladas en evidencia útil para detectar patrones criminales territoriales?", opciones: ["Volumen de denuncias, hashtags públicos y validación por mayoría simple.", "Georreferenciación agregada, consistencia temporal, corroboración cruzada y cadena de custodia digital.", "Identificación plena de denunciantes, publicación nominal y denuncia mediática.", "Votación ciudadana abierta, reacción en redes y presión política local."], correcta: 1 },
  { pregunta: "En el modelo de Seguridad Ciudadana, ¿por qué la IA no debe clasificar automáticamente a una persona como integrante de una red criminal?", opciones: ["Porque la IA solo puede trabajar con texto, no con datos geoespaciales.", "Porque la atribución de responsabilidad penal exige autoridad competente, debido proceso y valoración humana.", "Porque los modelos de IA no pueden detectar relaciones de redes.", "Porque la plataforma debe evitar cualquier uso de datos públicos."], correcta: 1 },
  { pregunta: "¿Cuál es el uso correcto del análisis de grafos en este módulo?", opciones: ["Determinar culpabilidad individual a partir de conexiones indirectas.", "Identificar estructuras, intermediarios, recurrencias y nodos de riesgo para revisión técnica humana.", "Sustituir carpetas de investigación formales.", "Publicar mapas nominales de servidores públicos y familiares."], correcta: 1 },
  { pregunta: "Una serie de denuncias anónimas reporta cobro de piso en mercados municipales. ¿Qué variable incrementa más su valor probatorio?", opciones: ["Que todas usen el mismo lenguaje narrativo.", "Que provengan de una sola fuente con alto detalle emocional.", "Que coincidan en ubicación, temporalidad, modus operandi y actores institucionales por rol.", "Que sean publicadas simultáneamente en redes sociales."], correcta: 2 },
]);

const preguntasTecnicasModulo02 = adaptarBancoTecnico([
  q("En una carpeta técnica ciudadana, ¿cuál es la función principal de la clasificación jurídica preliminar no vinculante?", "Orientar técnicamente la lectura de los hechos sin sustituir al Ministerio Público ni imputar responsabilidad penal.", ["Determinar formalmente el tipo penal aplicable y vincular jurídicamente a la autoridad competente.", "Sustituir la teoría del caso de la fiscalía cuando exista omisión institucional.", "Permitir que el comité ciudadano emita una acusación pública fundada."]),
  q("¿Qué elemento distingue una carpeta forense ciudadana jurídicamente utilizable de una simple recopilación de denuncias?", "Narrativa fáctica cronológica, evidencia vinculada a hechos, metadatos, control de integridad y metodología explícita.", ["Cantidad elevada de testimonios, presión mediática y respaldo ciudadano mayoritario.", "Publicación inmediata de los nombres de presuntos responsables y víctimas.", "Opinión técnica del comité sin necesidad de anexos probatorios."]),
  q("¿Por qué la IA del módulo no debe reinterpretar libremente testimonios orales?", "Porque debe preservar sentido original, contexto lingüístico y fidelidad semántica para no contaminar la evidencia.", ["Porque los testimonios orales carecen de valor técnico en expedientes forenses.", "Porque toda declaración debe convertirse primero en lenguaje jurídico formal.", "Porque la IA solo puede procesar documentos oficiales escritos."]),
  q("¿Cuál es el propósito técnico del hashing criptográfico en una carpeta ciudadana?", "Demostrar que un archivo o evidencia no fue alterado desde su incorporación o versión registrada.", ["Ocultar permanentemente el contenido de la evidencia a cualquier auditor externo.", "Validar automáticamente la veracidad material de los hechos denunciados.", "Sustituir la cadena de custodia documental mediante cifrado irreversible."]),
  q("En una investigación ciudadana sobre corrupción sistémica, ¿qué debe documentarse antes de formular cualquier análisis de patrón?", "Hechos verificables, fuentes, temporalidad, actores por rol institucional y evidencia específica asociada.", ["Conclusiones jurídicas preliminares, hipótesis política y responsables probables.", "Relatos agregados sin depuración para no perder espontaneidad testimonial.", "Percepción ciudadana, impacto mediático y narrativa pública dominante."]),
]);

const preguntasTecnicasModulo03 = adaptarBancoTecnico([
  q("¿Cuál es el principal riesgo democrático de la sobre-representación legislativa sostenida?", "La distorsión estructural entre voluntad electoral efectiva y capacidad real de producción normativa.", ["La disminución automática de competitividad económica regional.", "La imposibilidad técnica de formar coaliciones parlamentarias.", "La anulación constitucional inmediata de todas las reformas aprobadas."]),
  q("¿Qué diferencia metodológica distingue al Congreso Cívico del Congreso formal?", "La trazabilidad pública integral del proceso deliberativo y la ponderación basada en representación proporcional real.", ["La capacidad de emitir normas vinculantes mediante voto digital.", "La sustitución del sistema electoral representativo por democracia directa.", "La eliminación de análisis constitucional en procesos legislativos."]),
  q("¿Qué elemento fortalece técnicamente la legitimidad de un dictamen legislativo ciudadano?", "Metodología explícita, análisis comparativo, fundamentación constitucional y trazabilidad documental completa.", ["Cantidad de votos emocionales obtenidos durante deliberación pública.", "Apoyo mediático de actores políticos nacionales.", "Ratificación informal por legisladores partidistas."]),
  q("¿Cuál es el límite jurídico central del Congreso Cívico?", "No puede sustituir formalmente al Poder Legislativo ni producir coerción normativa directa.", ["No puede analizar reformas constitucionales federales.", "No puede incorporar participación ciudadana internacional.", "No puede emitir opiniones técnicas sobre presupuestos."]),
  q("¿Qué convierte un análisis legislativo ciudadano en evidencia democrática verificable?", "La documentación transparente de discrepancias entre legalidad formal, representación efectiva y estándares constitucionales.", ["La acumulación de firmas digitales sin validación metodológica.", "La oposición pública sistemática a toda reforma gubernamental.", "La transmisión abierta de debates sin estructuración técnica."]),
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

const preguntasTecnicasModulo16 = adaptarBancoTecnico([
  q("¿Qué distingue un modelo de turismo comunitario sostenible de un modelo turístico extractivo?", "La gobernanza local, distribución justa de beneficios, consentimiento comunitario y preservación territorial verificable.", ["La cantidad de visitantes internacionales recibidos.", "La rentabilidad inmediata de prestadores turísticos externos.", "La promoción digital centralizada del destino."]),
  q("¿Qué riesgo surge cuando una política cultural se basa en apoyos discrecionales sin trazabilidad?", "Facilitar clientelismo, exclusión territorial y captura de recursos culturales por intermediarios.", ["Reducir automáticamente la diversidad artística.", "Eliminar toda posibilidad de cooperación internacional.", "Impedir la creación de circuitos turísticos."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No censura contenidos, no impone modelos turísticos ni sustituye instituciones culturales o turísticas.", ["No puede evaluar políticas culturales.", "No puede mapear proyectos comunitarios.", "No puede documentar patrimonio en riesgo."]),
  q("¿Qué hace metodológicamente sólido un diagnóstico cultural territorial?", "Integrar patrimonio material e inmaterial, actores locales, financiamiento, riesgos y beneficios comunitarios.", ["Medir únicamente asistencia a eventos culturales.", "Priorizar proyectos con mayor atractivo comercial.", "Comparar solo presupuestos públicos ejercidos."]),
  q("¿Qué criterio protege mejor el patrimonio vivo de pueblos indígenas y comunidades locales?", "Consentimiento comunitario, control sobre uso cultural y distribución justa de beneficios.", ["Registro gubernamental centralizado de expresiones culturales.", "Promoción turística masiva del territorio.", "Digitalización abierta de todas las prácticas tradicionales."]),
]);

const preguntasTecnicasModulo17 = adaptarBancoTecnico([
  q("¿Qué distingue una inversión cívica regional de una donación dispersa sin impacto estructural?", "La evaluación técnica previa, trazabilidad financiera, seguimiento público y medición verificable de resultados.", ["La participación exclusiva de inversionistas de la diáspora.", "La concentración de recursos en proyectos de alta visibilidad.", "La ausencia de retorno económico para evitar riesgos."]),
  q("¿Qué criterio fortalece más la viabilidad económica de un proyecto regional?", "Demanda verificable, estructura de costos realista, gobernanza clara y capacidad operativa local.", ["Popularidad comunitaria del emprendimiento.", "Monto inicial elevado de financiamiento.", "Respaldo público de autoridades locales."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye banca, regulación financiera ni política económica formal.", ["No puede evaluar proyectos productivos.", "No puede recibir inversión de la diáspora.", "No puede generar tableros de impacto."]),
  q("¿Qué vuelve técnicamente sólido un mercado cívico de inversión?", "Publicar proyectos con riesgos, gobernanza, métricas de impacto, uso de recursos y seguimiento auditable.", ["Aceptar todos los proyectos para maximizar participación.", "Prometer retornos mínimos para atraer capital.", "Priorizar proyectos con narrativa emocional."]),
  q("¿Qué riesgo existe cuando evaluación técnica y financiamiento no están separados?", "Captura de criterios de viabilidad por intereses de inversionistas o promotores.", ["Reducción automática de participación ciudadana.", "Imposibilidad de usar análisis geoespacial.", "Eliminación de impacto social medible."]),
]);

const preguntasTecnicasModulo18 = adaptarBancoTecnico([
  q("¿Qué distingue un proyecto energéticamente soberano de un proyecto políticamente dependiente?", "La capacidad verificable de garantizar seguridad energética, resiliencia y beneficio social sin dependencia crítica externa.", ["La propiedad estatal mayoritaria del proyecto.", "La aprobación política del proyecto por mayoría legislativa.", "El uso exclusivo de recursos fósiles nacionales."]),
  q("¿Qué característica fortalece más una evaluación energética de ciclo de vida?", "Integrar construcción, operación, mantenimiento, emisiones, desmantelamiento y externalidades acumulativas.", ["Comparar únicamente costos iniciales de infraestructura.", "Priorizar generación energética anual máxima.", "Medir solo precio final de electricidad."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No autoriza, cancela ni ejecuta proyectos energéticos o extractivos.", ["No puede evaluar hidrocarburos.", "No puede emitir dictámenes públicos.", "No puede comparar tecnologías energéticas."]),
  q("¿Qué hace metodológicamente sólido un dictamen de transición energética?", "Comparar confiabilidad, emisiones, costos, almacenamiento, resiliencia y seguridad de suministro.", ["Priorizar únicamente energías renovables.", "Eliminar análisis económico para evitar sesgos.", "Comparar exclusivamente capacidad instalada."]),
  q("¿Qué riesgo surge cuando la política energética depende de decisiones de corto plazo?", "Generar vulnerabilidad estructural, sobrecostos y dependencia tecnológica acumulativa.", ["Reducir automáticamente inversión privada.", "Eliminar participación ciudadana energética.", "Impedir exportación de hidrocarburos."]),
]);

const preguntasTecnicasModulo19 = adaptarBancoTecnico([
  q("¿Qué característica convierte una licitación aparentemente abierta en un proceso estructuralmente excluyente?", "Requisitos desproporcionados que limitan competencia efectiva sin justificación técnica verificable.", ["La existencia de juntas de aclaraciones múltiples.", "La participación de empresas internacionales.", "La publicación digital de bases concursales."]),
  q("¿Qué criterio fortalece más una licitación pro-MiPyME sin comprometer calidad?", "Lotificación técnica, garantías proporcionales y criterios objetivos de desempeño verificable.", ["Reducción generalizada de requisitos técnicos.", "Asignación preferencial automática a empresas locales.", "Eliminación de validaciones financieras mínimas."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No adjudica contratos públicos ni sustituye autoridades competentes.", ["No puede analizar bases de licitación.", "No puede simular escenarios comparativos.", "No puede documentar riesgos de colusión."]),
  q("¿Qué vuelve metodológicamente sólida una simulación de concurso público?", "Comparar escenarios alternativos usando métricas verificables de competencia, costo y cumplimiento.", ["Eliminar restricciones legales para atraer más participantes.", "Permitir ajustes discrecionales durante evaluación.", "Priorizar propuestas con menor costo inmediato."]),
  q("¿Qué riesgo existe cuando los criterios técnicos son ambiguos o subjetivos?", "Facilitar discrecionalidad, simulación de competencia y direccionamiento encubierto.", ["Reducir automáticamente calidad del servicio.", "Eliminar participación de empresas grandes.", "Impedir evaluación financiera comparativa."]),
]);

const preguntasTecnicasModulo20 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo21 = preguntasTecnicasModulo03;
const preguntasTecnicasModulo22 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo23 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo24 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo25 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo26 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo27 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo28 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo29 = preguntasTecnicasModulo02;
const preguntasTecnicasModulo30 = preguntasTecnicasModulo02;

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
