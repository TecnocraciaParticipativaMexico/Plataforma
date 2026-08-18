# Preflight read-only de Supabase remoto

Fecha: 2026-08-18  
Decisión: **SUPABASE BLOQUEADO PARA MIGRACIÓN**

## Alcance y garantías

La inspección se realizó exclusivamente sobre metadatos de PostgreSQL/Supabase y conteos agregados estrictamente necesarios. No se leyeron filas, expedientes, usuarios, votos, evidencias, reportes, objetos de Storage ni datos personales. No se ejecutó DDL ni DML, no se aplicaron migraciones, no se modificó Storage y no se usaron o reprodujeron credenciales.

El PR consolidado #112 permaneció Draft y no se realizó merge.

## Proyecto identificado

- Proyecto: `TecnocraciaParticipativaMexico`
- Referencia sanitizada: `evx…myh`
- Región: `us-west-2`
- Estado: `ACTIVE_HEALTHY`
- PostgreSQL: 17.6, canal GA
- Plan de organización: Free
- Schemas relevantes encontrados: `auth`, `public`, `storage`, `supabase_migrations`
- Schema `private`: ausente; está previsto que la migración de seguridad lo cree.

## Inventario remoto relevante

| Objeto | Filas agregadas | RLS | Observación |
|---|---:|---|---|
| `append_only_event` | 237 | habilitado, no forzado, sin policies | No tiene `owner_user_id`. |
| `citizen_report_index` | 3 | habilitado, no forzado, sin policies | No tiene `owner_user_id`. |
| `civic_reputation` | 2 | habilitado, no forzado, sin policies | Modelo heredado basado en `actor_hash`. |
| `committee_applications` | 7 | habilitado, no forzado, sin policies | 4 filas no tienen `user_id`; no existe `owner_user_id`. |
| `committee_exam_attempts` | 2 | habilitado, no forzado, sin policies | Estructura y RPC de la migración 202607 presentes. |
| `committee_proposals` | 3 | habilitado, no forzado, sin policies | No existe `owner_user_id`; las 3 tienen `user_id`. Estado agregado: `En estudio`. |
| `proposal_votes` | 2 | habilitado, no forzado, sin policies | 1 fila sin `user_id`; esquema legado exige campos que la RPC nueva no suministra. |
| `committee_reports` | 2 | habilitado, no forzado, sin policies | Estado agregado: `Dictamen preliminar`; faltan columnas del modelo nuevo. |
| `committee_report_events` | 2 | habilitado, no forzado, sin policies | Modelo heredado; no hay trigger sobre la superficie inspeccionada. |
| `committee_report_observations` | 0 | habilitado, no forzado, sin policies | Campos heredados obligatorios incompatibles con la RPC nueva. |
| `committee_technical_votes` | 0 | habilitado, no forzado, sin policies | Campos heredados obligatorios incompatibles con la RPC nueva. |
| `evidence_pointers` | 43 | habilitado, no forzado, sin policies | Faltan `owner_user_id` y `review_status`; 3 filas no cumplen la nueva allowlist MIME. |

Los objetos nuevos `profiles`, `platform_roles`, `user_platform_roles`, `committee_memberships`, `committee_member_conflicts`, `civic_processes`, `process_events`, `citizen_reports`, `committee_quorum_rules`, `reputation_events` y `security_audit_events` están ausentes, como se espera antes de la Fase 2.

### Grants actuales

`anon` y `authenticated` conservan privilegios amplios de tabla sobre todas las tablas heredadas inspeccionadas salvo `committee_exam_attempts`, que permanece accesible únicamente al rol de servicio. RLS está habilitado y no existen policies en esas tablas, por lo que el acceso directo ordinario queda actualmente fail-closed; aun así, los grants deben revocarse como defensa en profundidad.

### Funciones heredadas

Las dos RPC del examen existen con las firmas esperadas, `SECURITY DEFINER`, `search_path=public, pg_temp`, sin `EXECUTE` para `anon`/`authenticated` y con `EXECUTE` para `service_role`:

- `create_committee_exam_attempt(uuid,smallint,text,timestamptz,jsonb,jsonb)`
- `create_committee_application_with_attempt(uuid,uuid,smallint,jsonb)`

También existen tres RPC heredadas `SECURITY DEFINER` sin `search_path` fijado y ejecutables por `anon` y `authenticated`:

- `create_process_with_event(text,text)`
- `add_process_event(text,text,text,jsonb)`
- `verify_chain_integrity_for_process(text)`

Las dos primeras confían en `actor_hash` aportado por el llamador y escriben con privilegios del definidor. `add_process_event` admite `StatusChanged`. Ninguna de las migraciones propuestas revoca estas firmas heredadas. Esto es una colisión crítica que debe resolverse antes del release.

### Storage

- Bucket `evidence`: ausente.
- Buckets totales observados: 0.
- Policies en `storage.objects` y `storage.buckets`: ninguna.
- RLS en las tablas de Storage: habilitado.

La creación privada del bucket sería conceptualmente compatible, pero las policies propuestas hacen referencia a columnas de `evidence_pointers` que no existen en el remoto.

## Historial de migraciones

Supabase reconoce únicamente:

| Versión | Nombre | Estado |
|---|---|---|
| `20260730000000` | `committee_exam_attempts` | Aplicada |

No se detectaron migraciones remotas ajenas a Git. Git contiene cuatro versiones que el remoto aún desconoce:

- `20260805000100_security_core_schema.sql`
- `20260805000200_security_rls_and_storage.sql`
- `20260805000300_security_transactional_rpcs.sql`
- `20260818174804_production_hardening.sql`

No se ejecutó `migration repair`.

## Compatibilidad por migración

### `20260730000000_committee_exam_attempts.sql` — COMPATIBLE

Ya está registrada y aplicada. Tabla, índices, constraints, firmas, grants y `search_path` de las dos RPC coinciden con el diseño esperado. No debe reaplicarse.

### `20260805000100_security_core_schema.sql` — CONFLICTO

La migración utiliza `CREATE TABLE IF NOT EXISTS` para tablas que ya existen con otra forma. PostgreSQL omitiría la definición nueva sin reconciliar columnas y constraints.

Conflictos confirmados:

- `evidence_pointers` carece de `owner_user_id` y `review_status`; la migración no los añade cuando la tabla ya existe.
- `evidence_pointers.actor_hash` es obligatorio, pero las RPC nuevas no lo insertan.
- `proposal_votes` conserva `vote`, `comprehension_score` y `vote_weight` obligatorios; la RPC nueva inserta `choice` y `computed_weight`, no esos campos heredados.
- `committee_report_observations` conserva `actor_hash` y `observation_type` obligatorios; la RPC nueva no los suministra.
- `committee_technical_votes` conserva `actor_hash` y `vote` obligatorios; la RPC nueva no los suministra.
- `committee_proposals` carece de `updated_at`; las filas usan el estado `En estudio`, mientras las RPC nuevas esperan `active`.
- `committee_reports` carece inicialmente de `state_version` y `closed_at`, y sus filas usan `Dictamen preliminar` mientras las RPC nuevas esperan `draft`, `under_review` o `closed`.
- Las columnas `owner_user_id` que sí se añaden quedan nulas y no existe backfill: 237 eventos, 3 índices ciudadanos y 7 solicitudes requieren una estrategia explícita. Cuatro solicitudes no tienen ni siquiera `user_id`.
- Una de las dos filas de `proposal_votes` no tiene `user_id`.

No se detectaron colisiones actuales en los índices únicos nuevos examinados, pero eso no corrige la incompatibilidad de columnas obligatorias.

### `20260805000200_security_rls_and_storage.sql` — CONFLICTO

Los `REVOKE` amplios y el bucket privado son deseables, pero la creación de policies de evidencia referencia `evidence_pointers.owner_user_id` y `review_status`, ausentes. La migración fallaría o quedaría imposibilitada por la Fase 2.1 incompleta. Además, no contiene revocación para las tres RPC heredadas inseguras.

### `20260805000300_security_transactional_rpcs.sql` — CONFLICTO

Las RPC propuestas dependen del modelo nuevo. Con el esquema remoto actual, las escrituras a evidencias, votos, observaciones y votos técnicos omitirían columnas heredadas `NOT NULL`; los flujos de propuestas y dictámenes tampoco reconocerían los estados históricos en español. Las RPC heredadas peligrosas continuarían coexistiendo.

### `20260818174804_production_hardening.sql` — CONFLICTO

Depende de `owner_user_id` y `review_status` en evidencias. Además, intenta añadir y validar inmediatamente una allowlist MIME que no cumplen 3 de las 43 filas históricas. El `ALTER TABLE ... ADD CONSTRAINT` abortaría mientras esas filas sigan incompatibles. No se detectaron hashes, tamaños ni rutas duplicadas incompatibles en los agregados revisados.

## Correcciones obligatorias antes de migrar

1. Diseñar una migración puente idempotente para reconciliar todas las tablas heredadas antes de crear policies o RPC.
2. Añadir explícitamente las columnas ausentes y definir nullability/defaults temporales compatibles con los datos históricos.
3. Diseñar un backfill verificable de `owner_user_id`. Nunca interpretar `actor_hash` como identidad ni copiarlo a UUID. Las 4 solicitudes sin `user_id`, los 237 eventos, los 3 índices ciudadanos y las 43 evidencias requieren una fuente autorizada de correspondencia o clasificación como legado no reclamable.
4. Definir un mapeo explícito de estados heredados a estados canónicos; no actualizar estados por inferencia silenciosa.
5. Resolver los 3 registros MIME fuera de allowlist mediante decisión de negocio y revisión segura, sin eliminar evidencia automáticamente.
6. Adaptar las RPC o retirar/nullabilizar controladamente las columnas heredadas obligatorias. Validar compatibilidad de lecturas antes de retirar campos.
7. Revocar `EXECUTE` a `anon` y `authenticated` sobre las tres RPC heredadas, fijar su `search_path` durante la transición y retirarlas o reemplazarlas tras confirmar dependencias.
8. Añadir pruebas de migración sobre el schema real heredado, no solo sobre el fixture mínimo actual.

## Puerta de backup

Estado: **BACKUP NO VERIFICADO**.

La organización está en plan Free. La documentación oficial recomienda que los proyectos Free generen exportaciones periódicas con `supabase db dump`; no debe asumirse que existe una restauración diaria accesible. PITR no está disponible en este plan.

Antes de cualquier cambio remoto debe completarse:

1. Backup lógico manual cifrado de roles, schema y datos mediante `supabase db dump`, ejecutado desde un entorno controlado sin registrar la cadena de conexión.
2. Inventario y exportación separada de objetos de Storage; los backups de base solo incluyen metadata de Storage. Actualmente no hay buckets, pero debe volver a verificarse inmediatamente antes de migrar.
3. Checksums y almacenamiento fuera del proyecto con control de acceso.
4. Restauración completa en una base PostgreSQL/Supabase descartable compatible.
5. Verificación de constraints, conteos agregados, funciones, policies y migration history restaurados.
6. Registro formal de fecha, operador, artefactos y prueba de restore.

Solo después de ese ejercicio puede declararse `BACKUP VERIFICADO`.

## Plan de staging y replay

1. Obtener un dump `schema-only` del remoto, sin filas ni Storage objects, usando una credencial temporal que no aparezca en logs.
2. Restaurarlo en un Supabase descartable con PostgreSQL 17 en CI aislado. El branch administrado actual no basta por sí solo: los branches replican migraciones, pero pueden omitir drift manual no registrado.
3. Reproducir únicamente agregados sintéticos que cubran cada forma heredada y los conflictos confirmados, sin copiar datos personales.
4. Marcar `20260730000000` como ya aplicada en el entorno descartable solo mediante una restauración fiel del historial; nunca reparar producción.
5. Aplicar primero la nueva migración puente y luego, en orden, `20260805000100`, `20260805000200`, `20260805000300` y `20260818174804`.
6. Ejecutar 75/75 SQL, catalog checks, concurrencia, 22/22 HTTP Fase 3, 19/19 HTTP Fase 4 y 34/34 Node.
7. Comparar columnas, constraints, índices, RLS, policies, grants, funciones, `search_path`, EXECUTE, triggers y Storage contra el estado esperado.
8. Ejecutar el replay dos veces para demostrar idempotencia o documentar explícitamente qué pasos son de una sola ejecución.

## Orden propuesto de aplicación

No aplicar nada hasta resolver los bloqueos y declarar `BACKUP VERIFICADO`.

Orden futuro propuesto:

1. Migración puente de compatibilidad y backfill controlado.
2. `20260805000100_security_core_schema.sql`, revisada para el baseline real.
3. `20260805000200_security_rls_and_storage.sql`, incluyendo contención de RPC heredadas.
4. `20260805000300_security_transactional_rpcs.sql`.
5. `20260818174804_production_hardening.sql`, después de sanear la allowlist histórica.

`20260730000000` ya está aplicada y no debe ejecutarse nuevamente.

## Smoke tests posteriores

- Migration history exacto y sin `repair`.
- RLS habilitado y policies exactas en todas las tablas expuestas.
- Ausencia de grants directos de escritura para `anon`/`authenticated`.
- RPC heredadas no ejecutables por clientes.
- Funciones nuevas con firmas, `SECURITY DEFINER`, `search_path` y EXECUTE exactos.
- Bucket `evidence` privado y sin URL pública.
- Evidencia `pending`/`pending_scan` no descargable.
- Identidad derivada de `auth.uid()`; rechazo de `user_id`, `actor_hash`, scores, pesos y estados del cliente.
- Voto único y rate limiting bajo concurrencia.
- Cadena verificable, revisión por rol y prohibición de auto-revisión.
- Conteos agregados antes/después conciliados y cero propietarios perdidos inesperadamente.

## Estrategia de merge y compatibilidad aplicación/base

No fusionar #112 antes de migrar: el nuevo código espera tablas, columnas y RPC inexistentes. Tampoco migrar y dejar indefinidamente la aplicación antigua con grants revocados.

Después de corregir y validar el plan, usar una ventana controlada:

1. Activar mantenimiento o congelar mutaciones sensibles.
2. Confirmar `BACKUP VERIFICADO` y replay verde.
3. Aplicar migraciones corregidas en una transacción o secuencia con puertas explícitas.
4. Ejecutar smoke tests de base inmediatamente.
5. Fusionar/desplegar #112 inmediatamente después, manteniendo cerradas las funciones deliberadamente contenidas.
6. Ejecutar smoke tests HTTP y observabilidad post-deploy.

## Rollback

- Si una migración falla antes del commit transaccional: abortar y conservar la aplicación anterior.
- Si falla un smoke test de base: no fusionar #112; revertir con scripts previamente ensayados o restaurar el backup verificado.
- Si la base pasa pero falla el despliegue: mantener mantenimiento, corregir/revertir la aplicación sin reabrir grants inseguros.
- Si se requiere restore: usar exclusivamente el procedimiento ensayado; la restauración puede implicar indisponibilidad y debe incluir la verificación separada de Storage.

## Decisión final

**SUPABASE BLOQUEADO PARA MIGRACIÓN** hasta que exista una migración puente validada contra el baseline real, se contengan las RPC heredadas, se resuelvan propiedad/estados/MIME históricos y se alcance la puerta `BACKUP VERIFICADO`.
