import { mockSupplyItems } from "../data/mock";
import type { SupplyItem, SupplyRepository } from "../types";

export class MockSupplyRepository implements SupplyRepository {
  constructor(private readonly items: SupplyItem[] = mockSupplyItems) {}

  listSupplyItems() {
    return this.items;
  }

  getSupplyItem(itemId: string) {
    return this.items.find((item) => item.id === itemId);
  }
}

export const mockSupplyRepository = new MockSupplyRepository();
