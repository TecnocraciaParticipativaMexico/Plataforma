export type CatalogMode = "demo" | "national" | "configured";
export type DistrictType = "federal" | "local";
export type ContestantType = "partido" | "coalicion" | "candidatura" | "independiente" | "candidatura_comun";

export type CatalogMetadata = { source: string; sourceUrl: string; cutoff?: string; version: string; importedAt: string; coverage: string; geographicLevel: string; sourceChecksum?: string };
export type ElectoralProcess = { id: string; name: string; mode: CatalogMode; configured: boolean; pollingStationsAvailable: boolean };
export type ElectionTypeCatalog = { id: string; processId: string; name: string; office: string; scope: "federal" | "estatal" | "municipal" };
export type StateCatalog = { id: string; officialCode: string; name: string; abbreviation: string };
export type MunicipalityCatalog = { id: string; stateId: string; officialCode: string; name: string; kind: "municipio" | "alcaldia" };
export type DistrictCatalog = { id: string; processId: string; electionTypeId: string; stateId: string; type: DistrictType; officialCode: string; name: string };
export type SectionCatalog = { id: string; stateId: string; districtId?: string; municipalityId: string; number: string; sectionType?: string; active: boolean; catalogVersion: string };
export type LocalityCatalog = { id: string; stateId: string; municipalityId: string; officialCode: string; name: string; kind?: string; catalogVersion: string };
export type PollingStationCatalog = { id: string; processId: string; sectionId: string; type: "basica" | "contigua" | "extraordinaria" | "especial"; number?: string; publicLocation?: string };
export type ContestantCatalog = { id: string; processId: string; electionTypeId: string; name: string; shortName: string; type: ContestantType; memberPartyIds?: string[]; scope: "federal" | "estatal" | "municipal"; office: string; stateId?: string; districtId?: string; municipalityId?: string; validFrom: string; validTo?: string; color: string; ballotOrder?: number; demo?: boolean };

export type CatalogSelection = { mode: CatalogMode; processId: string; electionTypeId: string; stateId: string; districtType: DistrictType | ""; districtId: string; municipalityId: string; sectionId: string; pollingStationId: string; contestantId: string; verificationStatus: string };

export interface ElectoralCatalogProvider {
  getProcesses(mode?: CatalogMode): ElectoralProcess[];
  getElectionTypes(processId: string): ElectionTypeCatalog[];
  getStates(): StateCatalog[];
  getDistrictTypes(processId: string, electionTypeId: string): DistrictType[];
  getDistricts(filters: Pick<CatalogSelection, "processId" | "electionTypeId" | "stateId" | "districtType">): DistrictCatalog[];
  getMunicipalities(stateId: string, processId?: string): MunicipalityCatalog[];
  getSections(filters: Pick<CatalogSelection, "processId" | "stateId" | "districtId" | "municipalityId">): SectionCatalog[];
  getLocalities(stateId: string, municipalityId: string): LocalityCatalog[];
  getPollingStations(filters: Pick<CatalogSelection, "processId" | "sectionId">): PollingStationCatalog[];
  getContestants(filters: Pick<CatalogSelection, "processId" | "electionTypeId" | "stateId" | "districtId" | "municipalityId">): ContestantCatalog[];
  getCatalogMetadata(): CatalogMetadata[];
}
