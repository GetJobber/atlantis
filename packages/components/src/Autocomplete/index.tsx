import React, { forwardRef } from "react";
import {
  AutocompleteLegacyProps,
  AutocompleteProposedProps,
  OptionLike,
} from "./Autocomplete.types";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";
import { Autocomplete as AutocompleteLegacy } from "./Autocomplete";
import { InputTextRef } from "../InputText";

export {
  MenuOptionProps,
  BaseMenuOption,
  BaseMenuOptionProps,
  MenuOption,
  BaseMenuGroupOption,
  BaseMenuGroupOptionProps,
} from "./Option";

export {
  AnyOption,
  AutocompleteProps,
  BaseOption,
  CustomOptionsMenuProp,
  GroupOption,
  OptionCollection,
  Option,
} from "./Autocomplete.types";

export {
  KeyboardAction,
  getRequestedIndexChange,
  useKeyboardNavigation,
  useCustomKeyboardNavigation,
} from "./useKeyboardNavigation";

export { useRepositionMenu } from "./useRepositionMenu";

export {
  BaseAutocompleteMenuWrapper,
  useAutocompleteMenu,
} from "./Menu/MenuWrapper";

export { isOptionSelected, isOptionGroup } from "./Autocomplete.utils";

type AutocompleteShimProps =
  | AutocompleteLegacyProps
  | AutocompleteProposedProps<OptionLike>;

function isNewAutocompleteProps(
  props: AutocompleteShimProps,
): props is AutocompleteProposedProps<OptionLike> {
  return props.version === 2;
}

export const Autocomplete = forwardRef(function AutocompleteShim(
  props: AutocompleteShimProps,
  ref: React.Ref<InputTextRef>,
) {
  if (isNewAutocompleteProps(props)) {
    console.log("AutocompleteRebuilt", props);

    return <AutocompleteRebuilt {...props} ref={ref} />;
  }

  console.log("AutocompleteLegacy", props);

  return <AutocompleteLegacy {...props} ref={ref} />;
});

Autocomplete.displayName = "Autocomplete";

export type {
  AutocompleteLegacyProps,
  AutocompleteProposedProps,
  AutocompleteShimProps,
};
