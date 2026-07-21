import { mockHealthDataset } from "../data/mock";
import type { HealthCase, HealthCaseRepository } from "../types";

export class MockHealthCaseRepository implements HealthCaseRepository {
  private cases: HealthCase[];

  constructor(seed: HealthCase[] = mockHealthDataset.cases) {
    this.cases = [...seed];
  }

  listCases() {
    return this.cases;
  }

  getCase(caseId: string) {
    return this.cases.find((item) => item.id === caseId);
  }

  saveCase(healthCase: HealthCase) {
    const exists = this.cases.some((item) => item.id === healthCase.id);
    this.cases = exists ? this.cases.map((item) => (item.id === healthCase.id ? healthCase : item)) : [healthCase, ...this.cases];
    return healthCase;
  }

  deleteCase(caseId: string) {
    this.cases = this.cases.filter((item) => item.id !== caseId);
  }
}
