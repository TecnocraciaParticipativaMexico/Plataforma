import type { CatalogMetadata, ContestantCatalog, ElectionTypeCatalog, ElectoralProcess, MunicipalityCatalog, StateCatalog } from "./catalogTypes";

export const CATALOG_METADATA: CatalogMetadata[] = [
  { source: "INE — Sistema de Información Geográfica Electoral (SIGE)", sourceUrl: "https://cartografia.ine.mx/sige8/productosCartograficos/catalogos", cutoff: "2026-01", version: "estructura-mge-2026-01-v1", importedAt: "2026-07-21", coverage: "32 entidades; sin importación masiva de municipios, distritos, secciones o localidades", geographicLevel: "entidad" },
  { source: "INEGI — Catálogo Único de Claves Geoestadísticas", sourceUrl: "https://www.inegi.org.mx/app/ageeml/default.html", cutoff: "2026-05", version: "cdmx-alcaldias-2026-05-v1", importedAt: "2026-07-21", coverage: "16 alcaldías de Ciudad de México", geographicLevel: "municipio o demarcación territorial" },
];

export const STATES_CATALOG: StateCatalog[] = [
  ["01","Aguascalientes","AGS"],["02","Baja California","BC"],["03","Baja California Sur","BCS"],["04","Campeche","CAM"],["07","Chiapas","CHIS"],["08","Chihuahua","CHIH"],["09","Ciudad de México","CDMX"],["05","Coahuila","COAH"],["06","Colima","COL"],["10","Durango","DGO"],["15","Estado de México","MEX"],["11","Guanajuato","GTO"],["12","Guerrero","GRO"],["13","Hidalgo","HGO"],["14","Jalisco","JAL"],["16","Michoacán","MICH"],["17","Morelos","MOR"],["18","Nayarit","NAY"],["19","Nuevo León","NL"],["20","Oaxaca","OAX"],["21","Puebla","PUE"],["22","Querétaro","QRO"],["23","Quintana Roo","QROO"],["24","San Luis Potosí","SLP"],["25","Sinaloa","SIN"],["26","Sonora","SON"],["27","Tabasco","TAB"],["28","Tamaulipas","TAMPS"],["29","Tlaxcala","TLAX"],["30","Veracruz","VER"],["31","Yucatán","YUC"],["32","Zacatecas","ZAC"]
].map(([officialCode,name,abbreviation]) => ({ id: `mx-${officialCode}`, officialCode, name, abbreviation }));

export const CDMX_MUNICIPALITIES: MunicipalityCatalog[] = [
  ["002","Azcapotzalco"],["003","Coyoacán"],["004","Cuajimalpa de Morelos"],["005","Gustavo A. Madero"],["006","Iztacalco"],["007","Iztapalapa"],["008","La Magdalena Contreras"],["009","Milpa Alta"],["010","Álvaro Obregón"],["011","Tláhuac"],["012","Tlalpan"],["013","Xochimilco"],["014","Benito Juárez"],["015","Cuauhtémoc"],["016","Miguel Hidalgo"],["017","Venustiano Carranza"]
].map(([officialCode,name]) => ({ id: `mx-09-${officialCode}`, stateId: "mx-09", officialCode, name, kind: "alcaldia" }));

export const PROCESSES: ElectoralProcess[] = [
  { id: "demo-local-2026", name: "Demostración local 2026", mode: "demo", configured: true, pollingStationsAvailable: true },
  { id: "mge-structure-2026-01", name: "Estructura nacional MGE — corte enero 2026", mode: "national", configured: true, pollingStationsAvailable: false },
];

const supportedElections = [["presidencia","Presidencia de la República","Presidencia","federal"],["senadurias","Senadurías","Senaduría","federal"],["diputaciones-federales","Diputaciones federales","Diputación federal","federal"],["gubernatura","Gubernatura o Jefatura de Gobierno","Gubernatura","estatal"],["diputaciones-locales","Diputaciones locales","Diputación local","estatal"],["presidencias-municipales","Presidencias municipales","Presidencia municipal","municipal"],["alcaldias","Alcaldías","Alcaldía","municipal"],["sindicaturas-regidurias","Sindicaturas y regidurías","Sindicatura o regiduría","municipal"]] as const;
export const ELECTION_TYPES: ElectionTypeCatalog[] = [
  { id: "demo-ayuntamiento", processId: "demo-local-2026", name: "Ayuntamiento", office: "Ayuntamiento", scope: "municipal" },
  { id: "demo-diputacion-local", processId: "demo-local-2026", name: "Diputación local", office: "Diputación local", scope: "estatal" },
  ...supportedElections.map(([id,name,office,scope]) => ({ id: `mge-${id}`, processId: "mge-structure-2026-01", name, office, scope })),
];

export const DEMO_CONTESTANTS: ContestantCatalog[] = ["Partido A","Partido B","Partido C"].map((name, index) => ({ id: `demo-party-${index + 1}`, processId: "demo-local-2026", electionTypeId: "demo-ayuntamiento", name, shortName: name, type: "partido", scope: "municipal", office: "Ayuntamiento", validFrom: "2026-01-01", color: ["#E4007C","#7C3AED","#0A4E84"][index], demo: true }));
