import { CATALOG_METADATA, CDMX_MUNICIPALITIES, DEMO_CONTESTANTS, ELECTION_TYPES, PROCESSES, STATES_CATALOG } from "./catalogData";
import type { ConsolidatedPollingStation } from "./resultsTypes";
import type { CatalogSelection, DistrictCatalog, ElectoralCatalogProvider, MunicipalityCatalog, PollingStationCatalog, SectionCatalog } from "./catalogTypes";

const slug = (value: string) => value.toLocaleLowerCase("es-MX").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const stateIdByName = (name: string) => STATES_CATALOG.find((state) => state.name === name)?.id;

export function createLocalElectoralCatalogProvider(demoRecords: ConsolidatedPollingStation[]): ElectoralCatalogProvider {
  const demoMunicipalities: MunicipalityCatalog[] = demoRecords.flatMap((record) => {
    const stateId = stateIdByName(record.state);
    return stateId ? [{ id: `demo-municipio-${slug(record.state)}-${slug(record.municipality)}`, stateId, officialCode: "DEMO", name: record.municipality, kind: "municipio" as const }] : [];
  }).filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id) === index);
  const demoDistricts: DistrictCatalog[] = demoRecords.flatMap((record) => {
    const stateId = stateIdByName(record.state);
    const electionType = ELECTION_TYPES.find((item) => item.processId === "demo-local-2026" && item.name === record.electionType);
    return stateId && electionType ? [{ id: `demo-distrito-${stateId}-${record.district}`, processId: "demo-local-2026", electionTypeId: electionType.id, stateId, type: "local" as const, officialCode: record.district, name: `Distrito local ${record.district}` }] : [];
  }).filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id) === index);
  const demoSections: SectionCatalog[] = demoRecords.flatMap((record) => {
    const stateId = stateIdByName(record.state);
    const municipality = demoMunicipalities.find((item) => item.stateId === stateId && item.name === record.municipality);
    const district = demoDistricts.find((item) => item.stateId === stateId && item.officialCode === record.district);
    return stateId && municipality ? [{ id: `demo-seccion-${stateId}-${record.section}`, stateId, districtId: district?.id, municipalityId: municipality.id, number: record.section, active: true, catalogVersion: "demo-local-v1" }] : [];
  }).filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id) === index);
  const demoPollingStations: PollingStationCatalog[] = demoRecords.flatMap((record) => {
    const section = demoSections.find((item) => item.stateId === stateIdByName(record.state) && item.number === record.section);
    return section ? [{ id: `demo-casilla-${slug(record.id)}`, processId: "demo-local-2026", sectionId: section.id, type: "basica" as const, number: `${record.pollingPlaceType} ${record.pollingPlaceNumber}` }] : [];
  });

  return {
    getProcesses: (mode) => PROCESSES.filter((process) => !mode || process.mode === mode),
    getElectionTypes: (processId) => ELECTION_TYPES.filter((item) => item.processId === processId),
    getStates: () => [...STATES_CATALOG].sort((a, b) => a.name.localeCompare(b.name, "es-MX")),
    getDistrictTypes: (processId, electionTypeId) => processId && electionTypeId ? [ELECTION_TYPES.find((item) => item.id === electionTypeId)?.scope === "federal" ? "federal" : "local"] : [],
    getDistricts: (filters) => filters.processId === "demo-local-2026" ? demoDistricts.filter((item) => item.electionTypeId === filters.electionTypeId && item.stateId === filters.stateId && item.type === filters.districtType) : [],
    getMunicipalities: (stateId, processId) => processId === "demo-local-2026" ? demoMunicipalities.filter((item) => item.stateId === stateId) : CDMX_MUNICIPALITIES.filter((item) => item.stateId === stateId),
    getSections: (filters) => filters.processId === "demo-local-2026" ? demoSections.filter((item) => item.stateId === filters.stateId && (!filters.districtId || item.districtId === filters.districtId) && (!filters.municipalityId || item.municipalityId === filters.municipalityId)) : [],
    getLocalities: () => [],
    getPollingStations: (filters) => filters.processId === "demo-local-2026" ? demoPollingStations.filter((item) => item.sectionId === filters.sectionId) : [],
    getContestants: (filters) => filters.processId === "demo-local-2026" ? DEMO_CONTESTANTS.filter((item) => item.electionTypeId === filters.electionTypeId) : [],
    getCatalogMetadata: () => CATALOG_METADATA,
  };
}

export const pollingCatalogAvailable = (selection: Pick<CatalogSelection, "processId">) => PROCESSES.find((process) => process.id === selection.processId)?.pollingStationsAvailable ?? false;
