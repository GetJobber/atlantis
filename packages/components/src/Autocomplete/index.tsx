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

function AutocompleteShim(
  props: AutocompleteShimProps,
  ref: React.Ref<InputTextRef>,
) {
  if (isNewAutocompleteProps(props)) {
    return <AutocompleteRebuilt {...props} ref={ref} />;
  }

  return <AutocompleteLegacy {...props} ref={ref} />;
}

export const Autocomplete = forwardRef(AutocompleteShim) as {
  <
    T extends OptionLike = OptionLike,
    S extends object = Record<string, unknown>,
    A extends object = Record<string, unknown>,
  >(
    props: AutocompleteProposedProps<T, false, S, A> & {
      ref?: React.Ref<InputTextRef>;
    },
  ): ReturnType<typeof AutocompleteShim>;
  <
    T extends OptionLike = OptionLike,
    S extends object = Record<string, unknown>,
    A extends object = Record<string, unknown>,
  >(
    props: AutocompleteProposedProps<T, true, S, A> & {
      ref?: React.Ref<InputTextRef>;
    },
  ): ReturnType<typeof AutocompleteShim>;
  (props: AutocompleteLegacyProps): ReturnType<typeof AutocompleteShim>;
};
// Assign displayName on the function prior to casting
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(AutocompleteShim as unknown as { displayName: string }).displayName =
  "Autocomplete";

export type {
  AutocompleteLegacyProps,
  AutocompleteProposedProps,
  AutocompleteShimProps,
};
