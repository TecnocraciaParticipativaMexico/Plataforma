# Módulo 07 — Tribunales de Alta Integridad

Ruta oficial: `/tribunales-alta-integridad`. Acceso desde `/modulos` y `/comites/modulos`. Continuación del mismo PR #113 hacia develop; no se fusiona ni se publica producción.

## Matriz de requisitos

| Requisito | Estado | Evidencia y límite |
|---|---|---|
| Crear, editar, eliminar, buscar y filtrar expedientes | Implementado y probado | Sesión personal; tres ámbitos, sin expedientes simulados |
| JSON individual y TXT | Implementado y probado | Compatibles con TP-TAI-1; se exportan sin cifrar |
| Respaldo y recuperación cifrados | Implementado y probado | AES-256-GCM, sal e IV aleatorios, PBKDF2-SHA256 de 600000 iteraciones; incluye versiones y formulario incompleto; sin localStorage ni claves persistidas |
| Prevención de pérdida accidental | Implementado y probado | Confirmación accesible al salir por enlaces, reemplazar, eliminar o recuperar; aviso de cierre/recarga; no bloquea absolutamente todas las navegaciones del navegador |
| Cinco capas, referencias, justificación y estados personales | Implementado y probado | Preparación personal no equivale a revisión colegiada; fuente y razonamiento obligatorios antes de valorar o preparar revisión |
| PDF institucional | Implementado y probado | Componente PDF compartido, logotipo y avisos no vinculantes; QA visual de documento largo; caracteres incompatibles se rechazan para evitar omisiones silenciosas |
| Historial local y SHA-256 | Implementado y probado | Instantáneas y enlaces recalculables conservados en archivo cifrado; fecha del dispositivo, sin firma o sello de tiempo institucional |
| Acreditación, especialidades y conflictos | Implementado pero pendiente de integración | Modelo puro, esquema cerrado y pruebas; ninguna acreditación real |
| Asignación, 9–15 o 5–7 reforzados, rotación y suplencias | Implementado pero pendiente de integración | Reglas aisladas y verificadas; no se forman comités reales |
| Deliberación, votos razonados y opiniones concurrentes/disidentes | Implementado pero pendiente de integración | Modelo secuencial, mayoría individual y ponderada, revisión humana; no se emiten dictámenes oficiales |
| Priorización ciudadana | Implementado pero pendiente de integración | Contrato sin autoridad del navegador y claves únicas SQL; no hay votos ni cifras ficticias |
| RPC transaccionales y concurrencia productiva | No implementado | Deben derivar identidad, comprobar versiones, bloquear filas y auditar atómicamente; los índices únicos no sustituyen este trabajo |
| Auditoría institucional persistente | Bloqueado por infraestructura | Tabla preparada, sin grants; falta conexión y sellado servidor verificable |
| Asistencia IA | Implementado pero pendiente de integración | Contratos por tarea, fuentes con SHA y citas verificables, rechazo de acciones privilegiadas; proveedor deliberadamente no disponible |
| Proveedor IA y ejecución real | No implementado | Requiere autorización, servicio, revisión de privacidad y controles servidor; ninguna llamada real |
| Persistencia Supabase, Auth y permisos operativos | Bloqueado por infraestructura | Proyectos principal y staging INACTIVE; sin reactivación, consulta de datos privados o migraciones remotas |
| Publicación en producción | Bloqueado por infraestructura y seguridad | Riesgo crítico Next.js, release #112 pendiente, conflictos entre ramas y autorización de publicación pendiente |

## Seguridad efectiva

Todas las mutaciones institucionales de `/api/tribunales/operations/[action]` devuelven 503, incluso con roles, votos o tokens enviados por navegador; GET devuelve 405. No existe interruptor de entorno o UI que active esas rutas. No se reutilizan rutas heredadas de votación ni claves service_role.

Validación limitada y estricta de JSON al importar, guardar, calcular huella y recuperar versiones; tamaño máximo de archivos, campos y matrices. Un formulario cifrado incompleto tiene un esquema acotado, puede conservar URLs o fechas incompletas, pero no se convierte en expediente, enlace o informe hasta superar validación completa. React representa texto sin HTML interpretado. No hay descarga servidor de fuentes externas.

La huella SHA-256 permite detectar cambios del contenido normalizado, no autoría. La cadena local puede ser reconstruida por quien tenga el contenido: no es blockchain, firma legal, sello de tiempo certificado ni registro inmutable institucional. Los informes son borradores personales no publicados ni vinculantes. Las valoraciones jurídicas son aportadas por personas, sin conclusiones automáticas.

El respaldo se cifra en el dispositivo. La contraseña se borra del estado tras una operación exitosa, no se almacena ni se envía a servicios. Si se pierde la contraseña, no hay recuperación. Un equipo, navegador o aplicación comprometidos pueden leer los datos y la contraseña en memoria; el cifrado de un archivo no resuelve ese riesgo. Sigue vigente la advertencia de usar versiones públicas anonimizadas. La declaración del usuario no es un detector de datos personales. Los JSON individuales, TXT y PDF se descargan sin cifrar.

El marcador de respaldo indica generación o recuperación; la persona debe comprobar que la descarga se guardó. Límites: 20 expedientes, 50 versiones por expediente, 2.9 MB de contenido cifrable y 4 MB para importar respaldo.

## Esquema y compatibilidad con #112

La migración `web/supabase/migrations/20261013213210_module07_closed_foundation.sql` fue creada con Supabase CLI y probada sólo en PostgreSQL embebido local. Es aditiva y crea nueve tablas con RLS y FORCE RLS. Revoca todos los privilegios de public, anon, authenticated y service_role sobre estas tablas. Las políticas SELECT por propietario, asignación vigente o auditor están preparadas, sin conceder SELECT ni escrituras. No crea funciones SECURITY DEFINER, vistas públicas, buckets ni RPC productivas.

Se exige que existan las firmas `private.has_platform_role(text[])` y `private.has_committee_membership(integer,text[])` de la arquitectura completa #112. Comprobar las firmas no acredita por sí mismo que se haya aplicado o auditado el release: el procedimiento de activación debe comprobar migraciones, permisos y comportamiento efectivos.

Se inspeccionó #112, head `9a29086c12b41979f5393dd3662eaef482540c85`: autenticación Bearer con getUser en servidor, cliente ligado al token, rechazo de autoridad del navegador, permisos/RLS, rate limit distribuido, RPC con versiones/idempotencia y auditoría. No se fusionó ni se copió parcialmente su implementación. El módulo necesitará adaptadores servidor sobre esos contratos una vez integrado el release íntegro.

El análisis Git con merge-tree, sin alterar checkout o ramas, detecta conflictos de la línea develop con #112, entre otros en rutas heredadas, directorios de módulos, package.json y lockfile. Por tanto, compatibilidad de contratos no significa integración Git automática. La publicación conjunta requiere reconciliación y revisión, preservando el hardening.

Los tests SQL usan fixtures mínimos de Auth y firmas de helpers: verifican el esquema nuevo y su RLS, no auditan #112 ni una base real. La cantidad de integrantes efectivos, identidad acreditada, conflictos, pesos, rotación, hashes, cierre y publicación deben verificarse dentro de futuras RPC transaccionales, no confiar en columnas enviadas por cliente.

## Resultados locales de la continuación — 13 de octubre de 2026

- 44 pruebas Node documentales pasan: 25 del módulo y 19 electorales existentes. El hook de resolución TypeScript sólo se usa al ejecutar tests; resuelve el fallo previo sin editar módulos electorales.
- 19 comprobaciones SQL locales pasan: requisito del release, RLS/FORCE RLS, ausencia de grants, aislamiento por propietario, asignación activa/revocada, duplicados, restricciones e imposibilidad de escritura de cliente.
- 29 comprobaciones HTTP pasan: siete operaciones por cuatro métodos devuelven 503; GET devuelve 405. Sólo localhost, sin producción.
- TypeScript y ESLint de archivos del módulo/scripts/rutas pasan. ESLint general en la instalación fijada: 74 errores y 17 advertencias heredados; no se han corregido masivamente.
- npm ci pasa. El lockfile fue sincronizado conservando las versiones de todos los paquetes preexistentes; incluye las dependencias ya declaradas que faltaban. No se añaden dependencias de aplicación. PGlite se instala aparte sólo para validación y CI.
- npm audit: 19 avisos (1 crítico, 15 altos, 2 moderados, 1 bajo). Next.js 16.1.6 sigue afectado; la reparación recomendada por npm es 16.4.0. También el #112 fija una versión anterior a ese parche. Se propone actualización de seguridad de plataforma separada, sin hacerla dentro de este PR.
- Build compila y supera TypeScript; la recolección completa falla en rutas heredadas por supabaseUrl ausente, por ejemplo `/api/evidence/signed-url`. No se fabricaron credenciales para forzar el resultado.
- Navegador: guardado, preparación de revisión, cancelación accesible de salida con conservación del texto, generación del respaldo y limpieza de contraseña verificados. Panel de operaciones deshabilitadas y diseño móvil sin desbordamiento horizontal comprobados. Descifrado, formularios incompletos, versiones e integridad tienen pruebas automatizadas; no se afirma una nueva prueba integral del archivo cifrado desde el selector de archivos del navegador.
- PDF largo renderizado e inspeccionado en PNG; se conserva texto y se agrupan secciones cortas mediante una opción explícita del generador compartido. Los módulos existentes conservan el valor por defecto.

## Secuencia para activar operación nacional

1. Revisar y resolver la integración entre main/develop y #112. No aprobar automáticamente su antiguo resultado de auditoría; verificar backup restaurado y puertas de release.
2. Preparar por separado la actualización compatible de Next.js y dependencias vulnerables; repetir pruebas de plataforma, lint, build y audit.
3. Obtener autorización para recuperar staging y ejecutar el preflight/migraciones revisadas. Aplicar el release íntegro y después el esquema 07, inicialmente cerrado.
4. Implementar adaptadores Auth y RPC de expediente, asignación, votos, priorización y auditoría: identidad servidor, permisos por recurso, versiones, row locks, idempotencia, rate limit y privacidad. Añadir pruebas de concurrencia y RLS con el esquema real.
5. Acreditar expertos mediante revisión humana, verificar conflictos, suplencias, rotación, umbrales y revisión de publicación. Integrar IA sólo como proveedor de borradores con controles independientes.
6. Verificar preview con sesión Vercel autorizada. Obtener aprobación explícita de publicación; activar operaciones gradualmente sólo tras superar los controles anteriores.

## Fuentes técnicas y fundamento

Artículos 6º, 7º y 8º de la Constitución: información, expresión y petición, sin conferir jurisdicción a la plataforma. Fuente oficial: https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf .

RLS: https://supabase.com/docs/guides/database/postgres/row-level-security . Cifrado y derivación: https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html y https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html . El changelog Supabase fue revisado; el esquema nuevo no usa ltree, btree_gist, cifrados PGP heredados ni operadores personalizados afectados por el aviso PostgreSQL 15.19/17.11.

## Comandos reproducibles

Desde web: `npm ci --ignore-scripts`, `npm run test:documental`, `npm run typecheck` y ESLint de los archivos del cambio. CI utiliza Node 24. SQL local: instalar `@electric-sql/pglite@0.3.14` en un directorio temporal separado y ejecutar `node scripts/test-module07-sql.mjs <ruta>/node_modules/@electric-sql/pglite/dist/index.js`. HTTP local: iniciar Next en puerto 3007 y ejecutar `node scripts/test-module07-http.mjs http://127.0.0.1:3007`.

La migración no debe ejecutarse remotamente por el hecho de existir. Este documento no autoriza una migración, cambios de grants ni una publicación.
