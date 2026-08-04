import { randomInt } from "node:crypto";

export function shuffleSecure<T>(values: readonly T[]): T[] {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

export const sampleSecure = <T>(values: readonly T[], count: number) => {
  if (count > values.length) throw new Error("Banco insuficiente");
  return shuffleSecure(values).slice(0, count);
};
