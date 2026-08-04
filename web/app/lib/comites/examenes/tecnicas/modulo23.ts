import { adaptarBancoTecnico } from "../helpers";

export const preguntasTecnicasModulo23 = adaptarBancoTecnico(23, [
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
