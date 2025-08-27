import type { RefObject } from "react";
import React from "react";
import type { InputTextRef } from "@jobber/components/InputText";
import type { DefaultMenuProps } from "./DefaultMenu";
import { DefaultMenu } from "./DefaultMenu";
import { useAutocompleteMenu } from "./MenuWrapper";
import {
  type AnyOption,
  type CustomOptionsMenuProp,
  type MenuProps,
  type Option,
} from "../Autocomplete.types";

export function Menu<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
>({
  options,
  selectedOption,
  onOptionSelect,
  handleUpdateOptions,
  inputFocused,
  attachTo,
  inputRef,
  customRenderMenu,
}: MenuProps<GenericOption, GenericOptionValue>) {
  if (customRenderMenu) {
    return (
      <CustomMenu
        attachTo={attachTo}
        inputFocused={inputFocused}
        inputRef={inputRef}
        customRenderMenu={customRenderMenu}
        options={options}
        onOptionSelect={onOptionSelect}
        handleUpdateOptions={handleUpdateOptions}
        selectedOption={selectedOption}
      />
    );
  }
  if (!inputFocused || !options.length) return null;

  return (
    <DefaultMenu
      attachTo={attachTo}
      options={options}
      onOptionSelect={onOptionSelect as DefaultMenuProps["onOptionSelect"]}
      selectedOption={selectedOption}
      visible={inputFocused}
    />
  );
}

interface InternalCustomMenuProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
> {
  readonly inputFocused: boolean;
  readonly options: GenericOption[];
  readonly selectedOption?: GenericOptionValue;
  readonly attachTo: MenuProps["attachTo"];
  readonly inputRef: RefObject<InputTextRef | null>;
  readonly handleUpdateOptions: (query: object | string) => void;
  readonly onOptionSelect: (chosenOption?: GenericOptionValue) => void;
  readonly customRenderMenu: (
    props: CustomOptionsMenuProp<GenericOption, GenericOptionValue>,
  ) => React.ReactElement;
}

/**
 * Renders the custom Menu for the Autocomplete component.
 * Provides the menuRef and MenuWrapper to the customRenderMenu function.
 */
function CustomMenu<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
>({
  options,
  selectedOption,
  onOptionSelect,
  customRenderMenu,
  attachTo,
  inputFocused,
  inputRef,
  handleUpdateOptions,
}: InternalCustomMenuProps<GenericOption, GenericOptionValue>) {
  const { MenuWrapper, menuRef } = useAutocompleteMenu({ attachTo });

  const menuContent = customRenderMenu({
    options,
    menuRef,
    onOptionSelect,
    selectedOption,
    inputFocused,
    handleUpdateOptions,
    MenuWrapper,
    inputRef,
  });

  return menuContent;
}
