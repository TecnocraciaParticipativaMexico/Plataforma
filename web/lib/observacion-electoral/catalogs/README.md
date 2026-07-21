# Ingestión de catálogos electorales

La estructura local usa como referencia el Sistema de Información Geográfica Electoral (SIGE) del INE. El Catálogo de Información Geoelectoral nacional con corte enero de 2026 pesa aproximadamente 180 MB en TXT y 340 MB en MDB, por lo que no debe incorporarse al bundle del navegador.

## Estrategia prevista

1. Descargar manualmente el producto oficial y conservar URL, fecha de corte, versión y checksum SHA-256.
2. Validar encabezados, codificación, claves y conteos antes de importar.
3. Normalizar por entidad en archivos versionados o tablas de servidor.
4. Mantener separados el catálogo geográfico permanente y los catálogos temporales de procesos, candidaturas y casillas.
5. Publicar índices pequeños por clave y cargar municipios, distritos, secciones y localidades bajo demanda.
6. No habilitar un nivel hasta que su fuente y fecha de corte sean verificables.

Este PR incluye únicamente las 32 entidades y las 16 alcaldías de Ciudad de México. No contiene distritos, secciones, localidades ni casillas nacionales inventadas.
