import type { Spaces } from "./types";

export const spaceTokens: Record<Spaces, string> = {
  none: "0px",
  minuscule: "var(--space-minuscule)",
  slim: "var(--space-slim)",
  smallest: "var(--space-smallest)",
  smaller: "var(--space-smaller)",
  small: "var(--space-small)",
  base: "var(--space-base)",
  large: "var(--space-large)",
  larger: "var(--space-larger)",
  largest: "var(--space-largest)",
  extravagant: "var(--space-extravagant)",
};

export const getMappedAtlantisSpaceToken = (
  space: Spaces | (string & NonNullable<unknown>) | undefined,
) => {
  return spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space;
};
