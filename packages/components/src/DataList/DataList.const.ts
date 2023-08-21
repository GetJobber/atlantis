/**
 *  Grab the type from breakpoints const
 */
type ValuesOf<T extends readonly unknown[]> = T[number];

export type Breakpoints = ValuesOf<typeof BREAKPOINTS>;

export const EMPTY_FILTER_RESULTS_MESSAGE = "No Results for Selected Filters";
export const EMPTY_FILTER_RESULTS_ACTION_LABEL = "Clear Filters";

/**
 * Breakpoints that we support
 */
export const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"] as const;
