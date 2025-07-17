import { AnyOption, GroupOption, Option } from "./Autocomplete.types";

export function isOptionSelected(
  selectedOption: Option | undefined,
  option: Option,
) {
  // label is required, value is not which is pretty weird and wrong.
  // maybe chagne that for v2
  return Boolean(selectedOption && selectedOption.label === option.label);
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
