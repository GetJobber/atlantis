import { AnyOption, Option } from "./Autocomplete.types";

export function isOptionSelected(
  selectedOption: Option | undefined,
  option: Option,
) {
  return Boolean(selectedOption && selectedOption.value === option.value);
}

export function isGroup(option: AnyOption) {
  if (option.options) return true;

  return false;
}
