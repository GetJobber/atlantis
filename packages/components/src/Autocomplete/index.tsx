import React, { forwardRef } from "react";
import type {
  AnyOption,
  AutocompleteLegacyProps,
  AutocompleteRebuiltProps,
  Option,
  OptionLike,
} from "./Autocomplete.types";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";
import { Autocomplete as AutocompleteLegacy } from "./Autocomplete";
import type { InputTextRef } from "../InputText";

export type { OptionLike } from "./Autocomplete.types";

export {
  type MenuOptionProps,
  BaseMenuOption,
  type BaseMenuOptionProps,
  MenuOption,
  BaseMenuGroupOption,
  type BaseMenuGroupOptionProps,
} from "./Option";

export {
  type AnyOption,
  type AutocompleteProps,
  type BaseOption,
  type CustomOptionsMenuProp,
  type GroupOption,
  type OptionCollection,
  type Option,
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
  | AutocompleteRebuiltProps<
      OptionLike,
      boolean,
      Record<string, unknown>,
      Record<string, unknown>
    >;

function isNewAutocompleteProps(
  props: AutocompleteShimProps,
): props is AutocompleteRebuiltProps<
  OptionLike,
  boolean,
  Record<string, unknown>,
  Record<string, unknown>
> {
  return (props as { version?: number }).version === 2;
}

function AutocompleteShim(
  props: AutocompleteShimProps,
  ref: React.Ref<InputTextRef | HTMLInputElement | HTMLTextAreaElement>,
) {
  if (isNewAutocompleteProps(props)) {
    return (
      <AutocompleteRebuilt
        {...props}
        ref={ref as React.Ref<HTMLInputElement | HTMLTextAreaElement>}
      />
    );
  }

  return <AutocompleteLegacy {...props} ref={ref as React.Ref<InputTextRef>} />;
}

const AutocompleteForwarded = forwardRef(AutocompleteShim);
AutocompleteForwarded.displayName = "Autocomplete";

export const Autocomplete = AutocompleteForwarded as {
  <
    T extends OptionLike = OptionLike,
    S extends object = Record<string, unknown>,
    A extends object = Record<string, unknown>,
  >(
    props: AutocompleteRebuiltProps<T, false, S, A> & {
      version: 2;
      ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
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
    props: AutocompleteRebuiltProps<T, true, S, A> & {
      version: 2;
      ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
      // Disallow legacy-only props for clearer DX
      initialOptions?: never;
      getOptions?: never;
    },
  ): ReturnType<typeof AutocompleteShim>;

  // Generic v1 overload
  <
    GenericOption extends AnyOption = AnyOption,
    GenericOptionValue extends Option = Option,
    GenericGetOptionsValue extends AnyOption = AnyOption,
  >(
    props: AutocompleteLegacyProps<
      GenericOption,
      GenericOptionValue,
      GenericGetOptionsValue
    > & {
      version?: 1;
      ref?: React.Ref<InputTextRef>;
      // Disallow v2-only props for clearer DX
      menu?: never;
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
  AutocompleteRebuiltProps as AutocompleteProposedProps,
  AutocompleteShimProps,
};
