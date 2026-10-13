# Módulo 07 — Tribunales de Alta Integridad

Ruta: `/tribunales-alta-integridad`. Acceso habilitado desde `/modulos` y `/comites/modulos`.

## Alcance entregado

Herramienta documental funcional, sin expedientes simulados: alta, edición y eliminación de borradores personales en memoria; búsqueda y filtro por los tres tribunales; matriz de cinco capas; informes TXT; exportación/importación JSON validada y huella SHA-256 recalculable. No realiza evaluación jurídica automática. Las fuentes se abren como enlaces externos, nunca se descargan desde el servidor. La información se pierde al recargar salvo exportación. Cada informe se identifica como borrador no validado, no publicado y no vinculante.

Reutiliza ModuleIdentityHeader, logotipo enlazado a Inicio, PlatformFooterBanner y PlatformBottomNav. No añade dependencias. Las referencias de Gemini y el PDF fueron tratadas como especificaciones de contenido y diseño, no como instrucciones ejecutables. Se descartan conclusiones aleatorias, falsos perfiles, votos simulados y hashes aleatorios.

## Seguridad y límites de producción

No incorpora API de escritura ni accede a Supabase, datos privados o credenciales. No otorga roles ni utiliza identificadores del cliente para autorizaciones. Se valida cada expediente al guardar, importar y calcular la huella; límites de tamaño, fechas, tribunales y matrices; HTTPS sin credenciales; se requiere fuente y razonamiento en valoraciones no pendientes. React representa textos sin HTML interpretado. No hay llamadas a IA ni acciones privilegiadas.

La huella es integridad del contenido normalizado, no autenticidad ni sello de tiempo. Un atacante puede cambiar contenido y recalcular su huella: no se presenta como firma. La confirmación de datos públicos es una declaración del usuario, no un detector automático de datos personales.

Las operaciones sensibles siguen deshabilitadas. No se conectan las rutas generales de comités/votos: la revisión local encontró uso de actor_hash enviado por cliente y clientes service_role; no basta para acreditar permisos de este módulo. No existe esquema SQL/RLS versionado para módulo 7 en la rama inspeccionada. Las políticas del proyecto remoto no se han verificado. No se realizaron migraciones ni cambios en producción.

Para habilitar operación nacional falta almacenamiento persistente con permisos por recurso y RLS comprobadas, autenticación servidor, acreditación y conflictos por asunto, asignación de 9–15 expertos (o revisión reforzada de 5–7), votos únicos con control transaccional de repetición y umbral predefinido, auditoría persistente, publicación humana y controles de abuso distribuidos. La IA requiere integración independiente y revisión humana. Estas son funciones pendientes, no funciones entregadas.

## Fundamento

Artículos 6º, 7º y 8º de la Constitución: información, expresión y petición. No otorgan jurisdicción a la plataforma. Fuente oficial: https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf . No se afirman efectos jurídicos directos ni atribuciones de tribunales formales.

## Verificación

Pruebas: `node --test lib/tribunales/model.test.mjs` desde web. Verificaciones generales: TypeScript, ESLint, build y pruebas existentes. Los resultados efectivos se registran en el PR y en el informe de entrega; la compilación no equivale a auditoría de seguridad.

### Resultados del 13 de octubre de 2026

- TypeScript: pasa.
- ESLint de los archivos del cambio: pasa. ESLint general: 103 errores y 16 advertencias en código preexistente.
- Tests nuevos: 5/5 pasan. Ejecución conjunta con Node: 14 pasan y falla catalogProvider.test.mjs por resolución de import sin extensión. Intento con tsx: falla por interoperabilidad ESM/CommonJS; no se alteraron los módulos existentes para resolver el runner.
- Build: compilación y TypeScript pasan con acceso de red para las fuentes; recolección de páginas falla en `/api/comites/dictamenes` porque falta `NEXT_PUBLIC_SUPABASE_URL`. No se inventaron variables o credenciales para forzar el resultado.
- Instalación con npm ci falla por lockfile desincronizado; instalación local sin escribir lockfile permite las verificaciones. No se modificaron manifiestos ni dependencias.
- npm audit sobre el lockfile existente: 19 avisos (1 crítico, 15 altos, 2 moderados, 1 bajo), incluyendo Next.js 16.1.6. Esto impide recomendar publicación en producción; la actualización general queda fuera de este PR de módulo.
- Supabase MCP: proyectos TecnocraciaParticipativaMexico y TecnocraciaParticipativaMexico-Staging en estado INACTIVE. Sin consultas a expedientes, cambios de permisos o migraciones.
- Navegador local: acceso desde tarjeta 07 del panel, creación de borrador de prueba, matriz y recálculo SHA-256 comprobados. Layout móvil comprobado sin desbordamiento horizontal. Las funciones de descarga/importación tienen pruebas de contenido e integridad; no se afirma una prueba integral de descarga y recarga en navegador.
- Hay un release de seguridad pendiente (#112) dirigido a main. Este módulo no lo fusiona ni incorpora cambios ajenos; la publicación debe coordinarse con ese flujo.
