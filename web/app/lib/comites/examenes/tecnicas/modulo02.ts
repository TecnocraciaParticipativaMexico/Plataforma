import { adaptarBancoTecnico } from "../helpers";

export const preguntasTecnicasModulo02 = adaptarBancoTecnico(2, [
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
