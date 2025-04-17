import {
  type AnyOption,
  type GroupOption,
  type Option,
} from "./Autocomplete.types";

export function isOptionSelected(
  selectedOption: Option | undefined,
  option: Option,
) {
  return Boolean(selectedOption && selectedOption.value === option.value);
}

/**
 * Helper function to determine if the option is a group. This is used to
 * determine if the option contains a list of options for rendering Section
 * Labels in the Autocomplete component.
 */
export function isOptionGroup<T extends AnyOption>(
  option: T,
): option is Extract<T, GroupOption> {
  return "options" in option;
}
