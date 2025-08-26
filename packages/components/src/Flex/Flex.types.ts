export type ColumnKeys = "shrink" | "grow";

export type Direction = "row" | "column";

export const spacing = [
  "none",
  "minuscule",
  "smallest",
  "smaller",
  "small",
  "slim",
  "base",
  "large",
  "larger",
  "largest",
  "extravagant",
] as const;

type ValuesOfSpacing<T extends typeof spacing> = T[number];
export type Spacing = ValuesOfSpacing<typeof spacing>;
