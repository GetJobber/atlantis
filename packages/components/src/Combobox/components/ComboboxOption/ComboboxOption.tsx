import { useAssert } from "@jobber/hooks/useAssert";
import { ComboboxOption as ComboboxOptionType } from "../../Combobox.types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ComboboxOption(_: ComboboxOptionType) {
  useAssert(
    true,
    "Combobox.Option can only be used inside a Combobox component",
  );

  return null;
}
