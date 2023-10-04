export type ColumnKeys = "shrink" | "grow" | "auto" | "max-content";

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
