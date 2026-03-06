import type { OptionLike } from "./Autocomplete.types";

export const AUTOCOMPLETE_MAX_HEIGHT = 300;

/** Stable empty array for cleared/empty selection state. Reuse to avoid reference churn. */
export const EMPTY_SELECTED_VALUES: readonly OptionLike[] = [];
