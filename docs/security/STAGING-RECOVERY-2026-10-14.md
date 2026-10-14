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
