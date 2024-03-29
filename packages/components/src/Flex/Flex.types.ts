export type ColumnKeys = "shrink" | "grow";

export type Direction = "row" | "column";

export const spacing = [
  "none",
  "smallest",
  "smaller",
  "small",
  "base",
  "large",
] as const;

type ValuesOfSpacing<T extends typeof spacing> = T[number];
export type Spacing = ValuesOfSpacing<typeof spacing>;
