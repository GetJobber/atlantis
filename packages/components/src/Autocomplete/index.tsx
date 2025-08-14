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

// Use broad but specific defaults instead of any to satisfy linting
type AutocompleteShimProps =
  | AutocompleteLegacyProps
  | AutocompleteProposedProps<
      OptionLike,
      boolean,
      Record<string, unknown>,
      Record<string, unknown>
    >;

function isNewAutocompleteProps(
  props: AutocompleteShimProps,
): props is AutocompleteProposedProps<
  OptionLike,
  boolean,
  Record<string, unknown>,
  Record<string, unknown>
> {
  return (props as { version?: number }).version === 2;
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

const AutocompleteForwarded = forwardRef(AutocompleteShim);
AutocompleteForwarded.displayName = "Autocomplete";

export const Autocomplete = AutocompleteForwarded as {
  <
    T extends OptionLike = OptionLike,
    S extends object = Record<string, unknown>,
    A extends object = Record<string, unknown>,
  >(
    props: AutocompleteProposedProps<T, false, S, A> & {
      version: 2;
      ref?: React.Ref<InputTextRef>;
      // Disallow legacy-only props for clearer DX
      initialOptions?: never;
      getOptions?: never;
    },
  ): ReturnType<typeof AutocompleteShim>;
  <
    T extends OptionLike = OptionLike,
    S extends object = Record<string, unknown>,
    A extends object = Record<string, unknown>,
  >(
    props: AutocompleteProposedProps<T, true, S, A> & {
      version: 2;
      ref?: React.Ref<InputTextRef>;
      // Disallow legacy-only props for clearer DX
      initialOptions?: never;
      getOptions?: never;
    },
  ): ReturnType<typeof AutocompleteShim>;
  (
    props: AutocompleteLegacyProps & {
      version?: 1;
      ref?: React.Ref<InputTextRef>;
      // Disallow v2-only props for clearer DX
      menu?: never;
    },
  ): ReturnType<typeof AutocompleteShim>;
};

export type {
  AutocompleteLegacyProps,
  AutocompleteProposedProps,
  AutocompleteShimProps,
};
