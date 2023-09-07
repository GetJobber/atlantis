import { tokens } from "@jobber/design";

/**
 *  Grab the type from breakpoints const
 */
type ValuesOf<T extends readonly unknown[]> = T[number];

export type Breakpoints = ValuesOf<typeof BREAKPOINTS>;

export const EMPTY_RESULTS_MESSAGE = "List is looking empty";
export const EMPTY_FILTER_RESULTS_MESSAGE = "No results for selected filters";

/**
 * Breakpoints that we support
 */
export const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"] as const;

export const BREAKPOINT_SIZES: Record<Breakpoints, number> = {
  xs: 0,
  sm: 490,
  md: 768,
  lg: 1080,
  xl: 1440,
};

export const SEARCH_DEBOUNCE_DELAY = tokens["timing-slowest"];
