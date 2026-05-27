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

const preguntasTecnicasModulo20 = adaptarBancoTecnico([
  q("¿Qué distingue un indicador cívico verificable de una estadística pública opaca?", "Origen documentado, metodología reproducible, supuestos explícitos y trazabilidad de versiones.", ["Publicación en formato PDF institucional.", "Uso de lenguaje técnico especializado.", "Validación exclusiva por autoridad gubernamental."]),
  q("¿Qué riesgo surge cuando una política pública se fundamenta en datos sin metadatos verificables?", "Impedir auditoría, reproducibilidad y evaluación independiente de la decisión.", ["Reducir automáticamente precisión matemática.", "Eliminar toda utilidad estadística del dato.", "Impedir visualización en tableros públicos."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye instituciones científicas ni órganos técnicos; certifica metodología, trazabilidad y evidencia.", ["No puede normalizar datos abiertos.", "No puede generar escenarios prospectivos.", "No puede auditar estadísticas públicas."]),
  q("¿Qué hace metodológicamente sólida una auditoría estadística de política pública?", "Evaluar fuente, cobertura, sesgos, consistencia temporal, supuestos y reproducibilidad del análisis.", ["Comparar únicamente resultados finales publicados.", "Priorizar indicadores con mayor impacto mediático.", "Usar exclusivamente datos oficiales consolidados."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Asistir en limpieza, normalización, detección de anomalías y visualización sin decidir conclusiones políticas.", ["Determinar automáticamente qué política pública es correcta.", "Sustituir revisión metodológica de expertos.", "Certificar verdad científica sin auditoría humana."]),
]);

const preguntasTecnicasModulo21 = adaptarBancoTecnico([
  q("¿Qué distingue la verificación ciudadana del voto de un cómputo electoral oficial?", "La verificación ciudadana preserva evidencia agregada y detecta inconsistencias sin validar resultados oficiales.", ["La verificación ciudadana sustituye legalmente al cómputo distrital.", "La verificación ciudadana proclama ganadores cuando hay suficientes actas.", "La verificación ciudadana elimina la necesidad de autoridades electorales."]),
  q("¿Qué característica hace técnicamente válida una alerta electoral estadística?", "Identificar desviaciones significativas con metodología explícita, margen de error y nivel de confianza.", ["Basarse en percepción ciudadana generalizada.", "Detectar cualquier diferencia entre encuesta y resultado.", "Emitirse solo cuando exista denuncia partidista formal."]),
  q("¿Cuál es el principal límite operativo del INE Cívico?", "No organiza elecciones, no valida resultados oficiales ni sustituye al INE o tribunales electorales.", ["No puede documentar actas públicas de casilla.", "No puede analizar sobrerrepresentación legislativa.", "No puede generar mapas de anomalías electorales."]),
  q("¿Qué hace metodológicamente sólida la carga ciudadana de actas visibles de casilla?", "Georreferenciación declarativa, sello de tiempo, eliminación de metadatos y repositorio inmutable.", ["Identificación completa del ciudadano que sube el acta.", "Publicación inmediata sin control de duplicados.", "Validación automática del resultado por mayoría de usuarios."]),
  q("¿Qué riesgo existe si se registra el sentido individual del voto con identidad personal?", "Vulnerar secreto del voto, privacidad y seguridad de la persona participante.", ["Reducir precisión estadística del conteo cívico.", "Impedir comparación con resultados oficiales.", "Eliminar utilidad de actas públicas de casilla."]),
]);

const preguntasTecnicasModulo22 = adaptarBancoTecnico([
  q("¿Qué distingue una investigación financiera estructural de una denuncia mediática de corrupción?", "La capacidad de documentar flujos, beneficiarios, triangulaciones y patrones verificables de comportamiento financiero.", ["La cantidad de contratos públicos involucrados.", "La cobertura periodística del caso.", "La existencia de declaraciones patrimoniales públicas."]),
  q("¿Qué riesgo estructural surge cuando la contratación pública no tiene trazabilidad financiera verificable?", "Facilitar colusión, desvío de recursos y ocultamiento de beneficiarios reales.", ["Reducir velocidad administrativa de compras.", "Impedir auditorías presupuestales ordinarias.", "Eliminar competencia entre proveedores."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No imputa delitos, no sustituye fiscalías ni ejerce funciones coercitivas.", ["No puede analizar contratos públicos.", "No puede generar mapas financieros.", "No puede detectar empresas fachada."]),
  q("¿Qué hace metodológicamente sólido un expediente financiero ciudadano?", "Relacionar flujos, contratos, beneficiarios, temporalidad y patrones de riesgo verificables.", ["Comparar únicamente montos presupuestales.", "Priorizar filtraciones anónimas sin corroboración.", "Usar exclusivamente declaraciones patrimoniales."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Detectar anomalías, estructurar redes financieras y preservar evidencia documental trazable.", ["Determinar responsabilidad penal automáticamente.", "Sustituir auditorías forenses humanas.", "Emitir sanciones administrativas digitales."]),
]);

const preguntasTecnicasModulo23 = adaptarBancoTecnico([
  q("¿Qué distingue una plataforma auditable por diseño de una plataforma que solo declara ser segura?", "La posibilidad verificable de reproducir, inspeccionar y contrastar técnicamente su comportamiento real.", ["La existencia de políticas internas de privacidad.", "La contratación de empresas externas de ciberseguridad.", "La publicación periódica de reportes ejecutivos."]),
  q("¿Qué característica fortalece más una auditoría independiente de código fuente?", "Acceso verificable a versiones, compilaciones reproducibles y trazabilidad completa de cambios.", ["Validación exclusiva por el equipo desarrollador.", "Uso de infraestructura propietaria certificada.", "Publicación parcial de módulos no sensibles."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No desarrolla ni opera la plataforma; audita integridad, seguridad y coherencia técnica.", ["No puede revisar infraestructura criptográfica.", "No puede evaluar sesgos algorítmicos.", "No puede generar alertas críticas."]),
  q("¿Qué vuelve metodológicamente sólida una prueba de penetración ética?", "Definir alcance, registrar hallazgos reproducibles y evitar afectación real a usuarios o sistemas.", ["Intentar comprometer cualquier sistema disponible.", "Publicar inmediatamente vulnerabilidades críticas.", "Ejecutar pruebas sin autorización documental."]),
  q("¿Qué riesgo existe cuando las compilaciones no son reproducibles?", "Impedir verificar que el código auditado coincide realmente con el software desplegado.", ["Reducir velocidad de despliegue continuo.", "Eliminar compatibilidad multiplataforma.", "Aumentar tamaño del repositorio."]),
]);

const preguntasTecnicasModulo24 = adaptarBancoTecnico([
  q("¿Qué distingue un repositorio de memoria periodística verificable de una simple hemeroteca digital?", "La preservación trazable, contextualización técnica y vinculación con evidencia verificable de interés público.", ["La cantidad total de artículos almacenados.", "La publicación automática de noticias recientes.", "La indexación por popularidad mediática."]),
  q("¿Qué riesgo surge cuando investigaciones periodísticas relevantes dependen únicamente del ciclo noticioso?", "La pérdida progresiva de memoria pública y debilitamiento de rendición de cuentas documentada.", ["La reducción automática de libertad editorial.", "La imposibilidad de verificar hechos históricos.", "La eliminación total de acceso ciudadano."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No define una verdad oficial ni sustituye procesos judiciales o editoriales.", ["No puede preservar investigaciones periodísticas.", "No puede indexar material audiovisual.", "No puede detectar desinformación coordinada."]),
  q("¿Qué hace metodológicamente sólida una validación básica de contenido periodístico?", "Corroborar hechos verificables mediante fuentes abiertas y documentación pública independiente.", ["Confirmar alineación ideológica entre medios.", "Priorizar investigaciones con mayor impacto mediático.", "Verificar únicamente reputación histórica del periodista."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Clasificar, indexar, detectar alteraciones y relacionar evidencia preservada sin decidir qué es verdad.", ["Determinar automáticamente credibilidad absoluta de medios.", "Eliminar contenido considerado desinformación.", "Sustituir revisión periodística humana."]),
]);

const preguntasTecnicasModulo25 = adaptarBancoTecnico([
  q("¿Qué distingue una política de memoria democrática de una narrativa política conmemorativa?", "La documentación verificable de hechos, patrones y responsabilidades institucionales con metodología auditable.", ["La cantidad de actos públicos realizados anualmente.", "La difusión mediática de testimonios históricos.", "La aprobación legislativa de fechas conmemorativas."]),
  q("¿Qué riesgo estructural surge cuando hechos graves permanecen fragmentados o sin documentación sistemática?", "La repetición institucional de patrones de abuso, impunidad y negación pública.", ["La pérdida total de interés académico histórico.", "La reducción automática de archivos oficiales.", "La imposibilidad de generar memoria cultural."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No sustituye tribunales, fiscalías ni comisiones de la verdad oficiales.", ["No puede preservar testimonios ciudadanos.", "No puede estructurar líneas de tiempo.", "No puede integrar archivos públicos."]),
  q("¿Qué hace metodológicamente sólido un expediente histórico de no repetición?", "Integrar contexto, temporalidad, evidencia trazable, patrones estructurales y consecuencias verificables.", ["Acumular el mayor número posible de testimonios.", "Priorizar hechos con mayor cobertura mediática.", "Resumir únicamente conclusiones institucionales."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Estructurar archivos, detectar patrones y preservar integridad documental sin interpretar la historia.", ["Determinar automáticamente responsables históricos.", "Decidir qué versión de los hechos es verdadera.", "Sustituir análisis de historiadores y peritos."]),
]);

const preguntasTecnicasModulo26 = adaptarBancoTecnico([
  q("¿Qué distingue un análisis de soberanía alimentaria de un análisis agrícola meramente productivista?", "Integra producción, acceso, justicia territorial, resiliencia ambiental y control social de cadenas alimentarias.", ["Prioriza exclusivamente volumen de exportación agrícola.", "Evalúa únicamente rendimiento por hectárea cultivada.", "Mide solo autosuficiencia nacional en granos básicos."]),
  q("¿Qué criterio fortalece más un análisis de precio mínimo viable para productores?", "Costos reales de producción, riesgo climático, financiamiento, logística, margen justo y precio de mercado comparable.", ["Precio promedio nacional reportado por intermediarios.", "Valor de exportación total del cultivo.", "Precio final pagado por consumidores urbanos."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No fija precios por decreto ni sustituye secretarías, programas públicos o autoridades pesqueras.", ["No puede analizar cadenas de valor agrícolas.", "No puede documentar violencia rural.", "No puede comparar precios internacionales."]),
  q("¿Qué hace metodológicamente sólido un expediente de cadena de valor agroalimentaria?", "Vincular costos, intermediación, logística, precios, márgenes, riesgos y distribución de valor por actor.", ["Comparar únicamente producción anual y exportaciones.", "Priorizar testimonios de productores sin datos económicos.", "Medir solo precio final de venta al consumidor."]),
  q("¿Qué riesgo surge cuando se evalúa agroexportación sin analizar pago real al productor?", "Ocultar asimetrías de valor y presentar éxito comercial sin justicia económica territorial.", ["Reducir automáticamente competitividad internacional.", "Impedir análisis de tratados comerciales.", "Eliminar relevancia de precios internacionales."]),
]);

const preguntasTecnicasModulo27 = adaptarBancoTecnico([
  q("¿Qué distingue una crisis hídrica natural de una crisis hídrica estructuralmente inducida?", "La relación verificable entre escasez, sobreconcesión, mala planeación, contaminación y gobernanza deficiente.", ["La reducción temporal de lluvias en una región específica.", "El aumento estacional de consumo urbano.", "La existencia de sequía meteorológica declarada."]),
  q("¿Qué hace técnicamente sólido un expediente hídrico territorial?", "Integrar concesiones, disponibilidad, recarga, calidad, uso de suelo, impactos sociales y riesgos acumulativos.", ["Comparar únicamente volumen total de agua concesionada.", "Priorizar denuncias comunitarias sin datos técnicos.", "Usar solo mapas oficiales de disponibilidad anual."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No administra agua, no cancela concesiones ni sustituye autoridades hídricas.", ["No puede analizar acuíferos sobreexplotados.", "No puede emitir dictámenes territoriales.", "No puede documentar conflictos socioambientales."]),
  q("¿Qué indicador revela posible sobreconcesión hídrica estructural?", "Volumen concesionado superior a disponibilidad sustentable considerando recarga, extracción real y variabilidad climática.", ["Aumento de tarifas urbanas de agua potable.", "Presencia de pozos agrícolas en una zona rural.", "Reducción temporal de almacenamiento en presas."]),
  q("¿Qué riesgo metodológico existe al evaluar agua sin perspectiva de cuenca?", "Ignorar interdependencias hidrológicas, impactos aguas abajo y acumulación territorial de presiones.", ["Reducir precisión de reportes ciudadanos.", "Impedir análisis jurídico de concesiones.", "Eliminar posibilidad de visualización geográfica."]),
]);

const preguntasTecnicasModulo28 = adaptarBancoTecnico([
  q("¿Qué distingue una evaluación ambiental integral de una evaluación meramente procedimental?", "La integración verificable de impactos acumulativos, riesgos climáticos, irreversibilidad y consecuencias intergeneracionales.", ["La cantidad total de anexos técnicos presentados.", "La rapidez con la que se autoriza un proyecto.", "El cumplimiento formal de trámites administrativos."]),
  q("¿Qué riesgo estructural surge cuando el costo ambiental no se incorpora en decisiones productivas?", "Transferir daño ecológico, sanitario y climático a comunidades y generaciones futuras sin rendición de cuentas.", ["Reducir automáticamente inversión extranjera.", "Impedir crecimiento económico regional.", "Eliminar toda viabilidad energética."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No cancela proyectos ni sustituye autoridades ambientales o regulatorias.", ["No puede modelar escenarios climáticos.", "No puede analizar impacto acumulativo.", "No puede emitir dictámenes territoriales."]),
  q("¿Qué hace metodológicamente sólido un dictamen de impacto ambiental integral?", "Relacionar daño ecológico, riesgo climático, efectos acumulativos y alternativas sostenibles comparables.", ["Comparar únicamente emisiones directas del proyecto.", "Priorizar cumplimiento documental administrativo.", "Usar exclusivamente estudios financiados por el promovente."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Integrar datos satelitales, modelar riesgos y detectar patrones territoriales de degradación ambiental.", ["Autorizar automáticamente proyectos sustentables.", "Sustituir peritajes ambientales especializados.", "Decidir qué actividad económica debe prohibirse."]),
]);

const preguntasTecnicasModulo29 = adaptarBancoTecnico([
  q("¿Qué distingue una respuesta resiliente de una reacción improvisada ante emergencias?", "La coordinación verificable basada en información estructurada, trazabilidad y aprendizaje acumulativo.", ["La velocidad inicial de movilización espontánea.", "La cantidad total de voluntarios disponibles.", "La cobertura mediática del desastre."]),
  q("¿Qué riesgo estructural surge cuando la ayuda humanitaria no tiene trazabilidad?", "Duplicación, desvío, abandono territorial y pérdida de confianza pública.", ["Reducción automática de recursos donados.", "Eliminación de protocolos oficiales.", "Imposibilidad de generar mapas de riesgo."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No dirige operativos oficiales ni sustituye autoridades de protección civil.", ["No puede generar alertas tempranas.", "No puede coordinar ayuda solidaria.", "No puede documentar daños estructurales."]),
  q("¿Qué hace metodológicamente sólido un mapa dinámico de riesgo?", "Integrar amenazas naturales, infraestructura crítica, vulnerabilidad social y capacidad de respuesta.", ["Mostrar únicamente eventos históricos de desastre.", "Priorizar regiones con mayor densidad urbana.", "Usar solo información satelital climática."]),
  q("¿Qué función cumple la IA dentro del módulo?", "Clasificar reportes, priorizar riesgos y facilitar coordinación logística verificable.", ["Sustituir mandos de protección civil.", "Autorizar evacuaciones obligatorias.", "Tomar decisiones coercitivas automáticas."]),
]);

const preguntasTecnicasModulo30 = adaptarBancoTecnico([
  q("¿Qué distingue un dictamen cívico diplomático de una acusación política contra una embajada?", "El dictamen evalúa idoneidad, congruencia institucional y desempeño con evidencia pública verificable.", ["El dictamen busca remover al titular de la misión.", "El dictamen sustituye la evaluación del Poder Ejecutivo.", "El dictamen se basa principalmente en percepción de la diáspora."]),
  q("¿Cuál es el principal límite operativo del módulo?", "No nombra embajadores, no representa al Estado mexicano ni sustituye la política exterior oficial.", ["No puede analizar compromisos internacionales.", "No puede emitir dossiers por país.", "No puede incorporar participación de la diáspora."]),
  q("¿Qué hace metodológicamente sólida una evaluación de representación diplomática?", "Relacionar perfil, trayectoria, país receptor, compromisos internacionales y desempeño verificable.", ["Comparar únicamente currículum académico del embajador.", "Medir popularidad pública de la embajada.", "Evaluar solo declaraciones oficiales recientes."]),
  q("¿Qué riesgo institucional surge cuando cargos diplomáticos se usan como moneda política?", "Deterioro reputacional, pérdida de capacidad técnica y debilitamiento de credibilidad internacional.", ["Reducción automática de comercio bilateral.", "Cancelación inmediata de acuerdos internacionales.", "Pérdida formal de soberanía diplomática."]),
  q("¿Qué función cumple la diáspora mexicana dentro del módulo?", "Aportar contexto local, evidencia pública y observación cívica agregada sin exposición individual.", ["Elegir representantes diplomáticos alternativos.", "Dirigir relaciones bilaterales desde el exterior.", "Emitir sanciones reputacionales obligatorias."]),
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
