# Auditoría del release de seguridad — 14 de octubre de 2026

## Decisión

PR #112 debe conservarse en borrador. El código se prepara para revisión; no se
autoriza merge, despliegue ni migración remota. No se ha incorporado #113.

## Referencias verificadas

| Referencia | SHA al iniciar | Estado |
|---|---|---|
| main | 960c10afe8a42f6b485928d7a47143b8b4f25b93 | protegido |
| develop | e40061bc86043367538f3bb00b6b92d07cc3edc2 | base de #113 |
| #112 | 9a29086c12b41979f5393dd3662eaef482540c85 | abierto, draft, mergeable con main |
| #113 | d3e84bee27dd395837415b775e4e1be6ae7e7a91 | abierto, draft, base develop |

El check histórico Security Supabase validation del head inicial #112 es
34897038009, SUCCESS. Su resultado no sustituye el check de estas correcciones.
La descripción antigua del PR hablaba de 75 pruebas SQL; el workflow real tiene
117 (31 autorización + 31 catálogo + 25 puente + 30 hardening).

## Correcciones de esta revisión

- Next y eslint-config-next: 16.3.1 → 16.4.1, sin cambio de versión mayor.
- Actualización acotada del lockfile para @humanfs/node, brace-expansion, js-yaml
  y source-map-js dentro de los rangos existentes. Sin audit fix --force.
- Cliente privilegiado server-only inicializado al usarlo: la falta de
  credenciales llega a una respuesta 503 controlada, no a un fallo de import.
- Cliente navegador también diferido: build sin credenciales ficticias.
- Código SERVICE_UNAVAILABLE correcto para errores de configuración.
- Transporte de sesión para pantallas de comités, seguimiento, reportes,
  expedientes propios, inicio y mapa. Destinos externos rechazados antes de leer
  la sesión. El servidor sigue validando el usuario; getSession del navegador no
  decide roles ni autoridad.
- Solicitud sin actor_hash del cliente; voto ciudadano con choice e intento
  aprobado del servidor; sin peso, puntaje, identidad o reputación enviados por
  el navegador. Voto técnico con choice; conflicto declarado detiene el envío.
- Cierre de dictamen usa su ruta existente y expected_version; después recarga
  el dictamen. Observaciones dejan de transmitir identidad del navegador.
- Adaptación de IDs, payloads, lista de expedientes, votos propios y reputación
  al contrato del servidor. No se simulan estados institucionales no disponibles.
- El reporte guarda su nota mediante el endpoint autorizado después de crear
  el proceso. Un fallo muestra el ID creado y conserva el texto; no afirma que
  toda la operación haya sido exitosa. Esta secuencia no es una sola transacción.
- CI usa las claves generadas por Supabase local descartable, en lugar de
  placeholders. La auditoría crítica runtime ahora bloquea CI.

## Verificación local

| Comprobación | Resultado |
|---|---|
| npm ci del lockfile corregido | éxito; instalación local con --ignore-scripts |
| Node seguridad | 38/38, 0 fallos, 0 omitidos (baseline real: 35) |
| Node regresión electoral existente | 19/19; runner incluido en npm test, total 57 |
| TypeScript | exit 0 |
| Build sin variables Supabase | exit 0; compilación, tipos y prerender completados |
| Lint de núcleo de seguridad, clientes Supabase y endpoints | exit 0 |
| Lint general | pendiente de limpieza heredada; 63 errores, 24 avisos |
| Lint baseline inicial con las mismas herramientas | 66 errores, 24 avisos |
| HTTP localhost sin sesión | 5/5 respuestas 401 |
| HTTP localhost con Bearer y configuración ausente | 5/5 respuestas 503 |
| git diff --check | éxito |
| Audit completo | 5 high, 0 critical/moderate/low |
| Audit --omit=dev | 0 vulnerabilidades |

La ejecución Actions 38632232150 (7c443a1) verificó 117/117 pgTAP, 22/22 y 19/19
HTTP y ambas pruebas de concurrencia. Su build y TypeScript pasaron; falló el
lint de revisión por react-hooks/immutability. Se corrigió la carga dentro del
effect con cancelación al desmontar, y el lint completo exigido por CI pasa
localmente. El nuevo head requiere su propia ejecución final.

Los diez HTTP prueban process/create, comites/solicitudes, citizen/reports,
comites/votos y process/:id/event. No son pruebas con usuarios reales ni prueban
RLS remoto. Docker/psql no están disponibles en este host: SQL pgTAP, concurrencia
y las 41 pruebas HTTP con Supabase completo deben ejecutarse en el workflow
descartable del nuevo head. No se inventaron variables ni secretos.

## Dependencias pendientes

Los cinco avisos altos son la cadena dev eslint-config-next →
@next/eslint-plugin-next → fast-glob → micromatch → braces. El aviso raíz es
GHSA-vfj7-8cjw-p6xm (braces <=3.0.3). npm propone eslint-config-next 14.2.35,
incompatible con el framework fijado. No se aplica esa bajada ni se suprime el
aviso. Registrar y revisar una corrección compatible cuando exista.

El Next inicial también tenía avisos posteriores a agosto, incluidos
GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4 y GHSA-vcvr-r3jv-pc5j. La auditoría
del nuevo lockfile elimina los avisos runtime conocidos consultados hoy.

## Compatibilidad y límites

No se eliminan páginas, rutas ni módulos de main; se conservan componentes y
assets: las 79 páginas/endpoints de la base main siguen presentes. La comprobación de rutas y el build no equivalen a una prueba integral
con dos usuarios, miembros/revisores, almacenamiento y datos reales. Esa prueba
es puerta obligatoria en staging. Los campos documentales heredados de propuestas
y dictámenes necesitan revisión de proyección y esquema: no debe ampliarse un
SELECT a '*' para recuperar contenido potencialmente sensible.

Siguen deliberadamente cerrados creación de propuestas sin autoridad definida,
mutación de reputación, mapa sin proyección segura, evidencia sin escaneo aceptado
y mutaciones heredadas de solicitudes. No hay pérdida de datos por esta revisión,
pero no se promete disponibilidad de esas operaciones contenidas.

## Inventario reproducido de los 18 conflictos iniciales

Simulación con git merge-tree --write-tree sobre los SHAs anteriores, sin merge
de ramas ni checkout del árbol combinado. Los conflictos pertenecen a la línea
develop acumulada, no exclusivamente a los dos commits nuevos de #113.

| # | Archivo (prefijo web/) | Funciones/área | Resolución revisada propuesta |
|---|---|---|---|
| 1 | app/api/comites/dictamenes/observaciones/route.ts | GET/POST, registrarEvento | conservar RLS y add_committee_observation; adaptar UI |
| 2 | app/api/comites/dictamenes/votos/route.ts | GET/POST, voto técnico | conservar cast_technical_vote y peso servidor |
| 3 | app/api/comites/propuestas/route.ts | GET/POST | conservar cierre de creación; revisar proyección documental |
| 4 | app/api/comites/solicitudes/route.ts | GET/POST/PATCH | conservar examen, revisión RPC y versiones; portar validación territorial/temática sin autoridad cliente |
| 5 | app/api/comites/votos/route.ts | GET/POST, calcularPeso/detectarSpam/calcularRiesgo | conservar cast_citizen_vote, intento servidor e índices únicos |
| 6 | app/api/process/[processId]/event/route.ts | POST, PII/eventos | conservar add_civic_process_note, dueño y eventos permitidos; revisar alcance PII |
| 7 | app/api/process/[processId]/evidence/upload/route.ts | POST, Storage | conservar bytes/hash, cuarentena y acceso privado |
| 8 | app/comites/dictamenes/cerrar/route.ts | POST, quorum | conservar close_committee_report y expected_version |
| 9 | app/comites/modulos/page.tsx | directorio | añadir acceso 07 sólo al integrar #113; conservar los otros accesos |
| 10 | app/congreso-civico/components/CongresoCivicoNavigation.tsx | navegación, add/add | unir enlaces válidos tras verificar rutas; conservar Actividad |
| 11 | app/congreso-civico/representacion/page.tsx | representación, add/add | reconciliar búsquedas, cámaras, estados y registro sin reemplazar toda la página |
| 12 | app/lib/examenesComites.ts | banco/respuestas, modify/delete | mantener fuera del bundle cliente; portar nuevas preguntas sólo al banco server-only |
| 13 | app/modulos/page.tsx | directorio, add/add | conservar catálogo y añadir 07 documental |
| 14 | app/seguimiento/page.tsx | eventos, notas, estado/evidencias | conservar sesión, payload canónico y descarga privada; no reabrir StatusChanged cliente |
| 15 | components/observacion-electoral/ObservationWorkspace.tsx | workspace, add/add | conservar funcionalidades electorales y cambio de UI aislado; ejecutar sus 19 tests |
| 16 | lib/pdf/institutionalDocument.ts | drawSection, add/add | portar keepTogether opt-in; conservar comportamiento por defecto |
| 17 | package-lock.json | resolución dependencias | regenerar desde manifiesto reconciliado, nunca elegir un lado completo |
| 18 | package.json | scripts/versiones | conservar seguridad y versiones parcheadas; sumar sólo scripts documentales al integrar #113 |

Orden: revisar #112 con CI completo → recuperar y validar staging → aprobar
release y coordinar app/esquema → reconciliar seguridad con develop archivo por
archivo → revalidar #113 sobre esa base. No fusionar #113 primero ni copiar
endpoints antiguos sobre controles nuevos. Recalcular conflictos después de cada
cambio de head; este inventario fija el punto inicial reproducible.
La simulación repetida después del commit 7c443a1 conserva 18 conflictos.

## Supabase: comprobación de sólo lectura

- Principal evxokjcuzpeaoxrfumyh: ACTIVE_HEALTHY, PostgreSQL 17.6.1.063.
- Staging jlbcgmgkmpiwrstkwcer: INACTIVE, PostgreSQL 17.6.1.155.
- Historial principal: sólo 20260730000000 committee_exam_attempts. Esto no prueba
  ausencia de cambios DDL manuales; el catálogo actual sí confirma RPC antiguas.
- Tres RPC legacy SECURITY DEFINER tienen EXECUTE anon/authenticated y
  search_path sin fijar: add_process_event, create_process_with_event y
  verify_chain_integrity_for_process. El puente del PR ya prepara sus revokes y
  search_path fijo, pero todavía no está aplicado allí.
- rls_auto_enable tiene EXECUTE cliente y search_path=pg_catalog, pero retorna
  event_trigger: no debe presentarse como una RPC ordinaria explotable. Revisar
  grants y dependencia del trigger en staging antes de una corrección remota.
- Advisor: 16 tablas con RLS sin políticas (INFO, acceso cliente cerrado por
  defecto), 3 search_path WARN, 4 funciones con EXECUTE anon y 4 authenticated
  WARN, protección de contraseñas filtradas desactivada WARN.
- Bucket evidence privado; límites MIME/tamaño no configurados en principal.
  La migración revisada prepara límite 10 MiB y JPEG/PNG/PDF.

No se restauraron proyectos, no se ejecutó SQL de escritura ni se cambiaron
datos, Auth, policies, grants o Storage remoto.

## Puertas y siguiente autorización

Ver STAGING-RECOVERY-2026-10-14.md. Primero autorizar exclusivamente la
reactivación de staging, después inventario de sólo lectura y backup/restore.
La autorización no incluye migraciones, main ni producción. La aplicación
segura y el esquema deben publicarse mediante un plan coordinado posterior.
