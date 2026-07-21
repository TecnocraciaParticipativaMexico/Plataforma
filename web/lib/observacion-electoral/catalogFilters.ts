import type { CatalogSelection } from "./catalogTypes";

export const INITIAL_CATALOG_SELECTION: CatalogSelection = { mode: "demo", processId: "demo-local-2026", electionTypeId: "demo-ayuntamiento", stateId: "", districtType: "", districtId: "", municipalityId: "", sectionId: "", pollingStationId: "", contestantId: "", verificationStatus: "" };

const order: (keyof CatalogSelection)[] = ["mode", "processId", "electionTypeId", "stateId", "districtType", "districtId", "municipalityId", "sectionId", "pollingStationId", "contestantId", "verificationStatus"];

export function updateCatalogSelection(current: CatalogSelection, key: keyof CatalogSelection, value: string): CatalogSelection {
  const next = { ...current, [key]: value } as CatalogSelection;
  const index = order.indexOf(key);
  for (const descendant of order.slice(index + 1)) next[descendant] = "" as never;
  if (key === "mode") {
    next.processId = value === "demo" ? "demo-local-2026" : value === "national" ? "mge-structure-2026-01" : "";
    next.electionTypeId = value === "demo" ? "demo-ayuntamiento" : "";
  }
  return next;
}
