# Recuperación controlada de staging

Objetivo único inicial: restaurar jlbcgmgkmpiwrstkwcer, actualmente INACTIVE.
Requiere autorización específica; no ejecutar restore_project antes de ella.
No restaurar ni mutar principal evxokjcuzpeaoxrfumyh.

1. Autorizar Resume de staging y comprobar ACTIVE_HEALTHY. La ventana de
   restauración de Supabase es de 90 días desde la pausa; la fecha de creación no
   determina esa ventana. Si no es recuperable, conservar respaldo y solicitar
   un ambiente sustituto mediante autorización separada.
2. Inventariar sólo lectura: versión, historial de migraciones, columnas/tipos,
   constraints, funciones/search_path, grants, policies/RLS, buckets, policies
   Storage, Auth, integraciones y datos históricos sin revelar PII ni secretos.
3. Obtener un backup cifrado y demostrar su restauración en un ambiente
   descartable; registrar responsable, checksum y procedimiento de recuperación.
   No usar ni copiar datos personales productivos sin autorización específica.
4. Comparar el inventario con REMOTE-SUPABASE-PREFLIGHT.md,
   LEGACY-SCHEMA-BRIDGE.md y el runbook. Verificar qué migraciones ya existen,
   tanto registradas como cambios manuales; no reejecutar ciegamente.
5. Presentar el plan de migración para autorización separada, con scripts exactos,
   esquema objetivo, riesgos, ventana, backup verificado y rollback ensayado.
   Orden pendiente del catálogo: puente 20260804000000, core 20260805000100,
   RLS/Storage 20260805000200, RPC 20260805000300, hardening 20260818174804,
   revoke de escrituras legacy 20260914195151. No aplicar fixture histórico remoto.
6. Sólo tras autorizar migraciones staging: ejecutar las pendientes y verificar
   117 pgTAP, 22+19 HTTP, dos usuarios, separación de módulos/roles, voto
   concurrente, rate limit distribuido, Storage privado/cuarentena y rechazo de
   evidencia pending_scan. Ejecutar también navegación y flujos de los módulos.
7. Repetir advisors y auditar permisos de rls_auto_enable sin quitar el trigger
   automático de RLS. Revisar contraseñas filtradas, retención, alertas y scanner.
8. Revisar compatibilidad documental de propuestas/dictámenes y la secuencia
   proceso+nota+índice+evidencia. Un fallo parcial debe mostrarse y ser recuperable.
9. Obtener aprobación de release separada. Nada de lo anterior autoriza main,
   publicación, migraciones productivas ni acceso a datos reales para tests.

Referencias oficiales:
- https://supabase.com/docs/guides/platform/free-project-pausing
- https://supabase.com/docs/guides/local-development/restoring-downloaded-backup
- https://supabase.com/docs/guides/deployment/going-into-prod

El protocolo completa el runbook existente; no lo reemplaza ni evita sus puertas.

## Respaldo lógico gratuito verificado — 2026-10-21

El proyecto autorizado `TecnocraciaParticipativaMexico-Staging`
(`jlbcgmgkmpiwrstkwcer`) se confirmó `ACTIVE_HEALTHY`. La conexión PostgreSQL se
validó dentro de una transacción `READ ONLY`, comparando además la huella exacta
de ocho migraciones (última versión `20260914195400`). Producción no fue
consultada ni modificada.

### Herramientas y ubicación

- PostgreSQL `pg_dump`, `pg_dumpall`, `pg_restore`, `psql`, `initdb` y
  `postgres` 17.11, ya disponibles localmente.
- Protección DPAPI `CurrentUser`; la URI de conexión sólo se descifró en memoria.
- PostgreSQL descartable enlazado únicamente a `127.0.0.1`; se detuvo y eliminó
  después de verificar la restauración.
- Ruta privada, fuera del repositorio:
  `C:\Users\susan\AppData\Local\TPM2030\backups\staging-20261021-224728`.
- Fecha de creación: `2026-10-21T22:47:58.2244135Z`.
- Tamaño total del paquete y evidencias locales: 821,874 bytes.
- Costos adicionales: ninguno. No se instaló ni activó ningún recurso pagado.

### Alcance e integridad

El paquete contiene roles sin contraseñas, esquema lógico completo, datos
lógicos completos, subconjuntos auxiliares de recuperación y un manifiesto
separado del bucket privado `evidence`. Todos los dumps permanecen cifrados con
DPAPI; no se copiaron al repositorio ni a GitHub.

| Artefacto privado | Bytes | SHA-256 cifrado |
| --- | ---: | --- |
| `roles.sql.dpapi` | 6,182 | `5a310cef38bc75e8af5c6563c8e47dacbe9c588ef4b1406653c14a76067f2ef3` |
| `schema.dump.dpapi` | 391,046 | `40bf83f6a0ffee2bf02b047ad67ea9eb8ad0dcdd4f9d6735fee9ae71d6df754a` |
| `data.dump.dpapi` | 52,598 | `bcb06c097904c8a363256662cbf27a9f5a85970eca3484f16b59a53875c40491` |
| `recovery-schema.dump.dpapi` | 311,206 | `b18fa9590fba814acbb251b764201f0f190dde0ca3c571911691a41686bacd11` |
| `recovery-data.dump.dpapi` | 50,054 | `fd0b53fc06bc7b4ad08dfa51e88935efa5e96b9f0ae5576e9def33ae9195f422` |
| `storage-evidence-manifest.json` | 126 | `7feccd8002a7b0998df15317ebc76197dbc87410c9cd4c896bbc6f5c58e3c9c0` |
| `restore-verification.json` | 735 | `fd3e8595f50a3c848506afddd50a25d6a0e6db8b616b199370d4a8d10216a3b4` |

El manifiesto final tiene SHA-256
`482d2afc1a7dba7a1fa168867a57d9eb1df0a37ecf2131dbc58d8f92196ac67b`.
Además conserva, sin publicar, la huella del contenido lógico descifrado para
detectar corrupción antes de cada recuperación.

### Ensayo de recuperación

Los hashes cifrados y lógicos se verificaron antes del restore. El dump completo
se restauró localmente para los esquemas `public`, `private`, `auth`, `storage` y
`supabase_migrations`. La comparación contra el inventario remoto de sólo lectura
fue exacta:

- 23 tablas públicas, 283 columnas, 103 constraints y 47 índices;
- 21 funciones públicas, 21 policies y RLS activo en las 23 tablas;
- 3 usuarios ficticios de Auth y 8 registros de historial de migración;
- 0 objetos y 0 bytes en el bucket privado `evidence`.

No hubo bytes de objetos Storage que descargar: el manifiesto demuestra que el
bucket existe, es privado y estaba vacío. Por ello la integridad de contenido es
`not-applicable-empty-bucket`, no una omisión silenciosa.

El SQL de roles se conservó íntegro y sin contraseñas. PostgreSQL local creó los
roles, pero no pudo reproducir algunas membresías cuyo grantor administrado es
`supabase_admin`; ese grantor sólo tiene las opciones especiales necesarias en
la plataforma alojada. Esta limitación queda registrada y no afecta la
restauración verificada de esquema, datos, RLS, policies ni historial.

### Exclusiones y recuperación

No forman parte de un dump PostgreSQL las claves API, secretos, configuración
del proyecto, ajustes externos de Auth, Edge Functions ni configuración del
servicio alojado. Deben inventariarse separadamente si una recuperación futura
los necesita. Las contraseñas de roles se excluyeron deliberadamente.

Para recuperar Staging: verificar primero los SHA-256, descifrar las copias con
la misma cuenta Windows, restaurar roles sin contraseñas y después esquema y
datos en un PostgreSQL 17 vacío. Validar los totales anteriores antes de apuntar
servicios a la base recuperada. Una restauración remota, cambios de membresías o
recreación de configuración administrada requieren autorización separada.

Este respaldo verifica la recuperación de **Staging únicamente**. No satisface
la puerta `BACKUP VERIFICADO` de Producción. Antes de cualquier migración remota
se debe conservar este paquete privado, revisar los advisors pendientes y
obtener autorización específica; este ensayo no autoriza merge, despliegue ni
cambios en Producción.
