import type { ElectionRecord } from "./types";
import type { CitizenResultsSource } from "./resultsTypes";
import { consolidateRecords } from "./consolidation";

export interface CitizenResultsAdapter {
  load(records: ElectionRecord[]): CitizenResultsSource;
}

export const localDemonstrativeResultsAdapter: CitizenResultsAdapter = {
  load(records) {
    return {
      records: consolidateRecords(records),
      updatedAt: records.map((record) => record.createdAt).sort().at(-1) ?? new Date(0).toISOString(),
      demonstrative: true,
    };
  },
};
