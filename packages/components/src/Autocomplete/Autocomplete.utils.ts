import { AnyOption, Option } from "./Autocomplete.types";

export function isOptionSelected(
  selectedOption: Option | undefined,
  option: Option,
) {
  return Boolean(selectedOption && selectedOption.value === option.value);
}

export function isGroup(option: AnyOption) {
  if ("options" in option) return true;

  return false;
}
