import React, { RefObject } from "react";
import { InputTextRef } from "@jobber/components/InputText";
import { DefaultMenu, DefaultMenuProps } from "./DefaultMenu";
import { useMenuWrapper } from "./MenuWrapper";
import {
  AnyOption,
  CustomOptionsMenuProp,
  MenuProps,
  Option,
} from "../Autocomplete.types";

export function Menu<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
>({
  options,
  selectedOption,
  onOptionSelect,
  inputFocused,
  attachTo,
  inputRef,
  customRenderMenu,
}: MenuProps<GenericOption, GenericOptionValue>) {
  if (customRenderMenu) {
    return (
      <InternalCustomMenu
        attachTo={attachTo}
        inputFocused={inputFocused}
        inputRef={inputRef}
        customRenderMenu={customRenderMenu}
        options={options}
        onOptionSelect={onOptionSelect}
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
  readonly onOptionSelect: (chosenOption?: GenericOptionValue) => void;
  readonly customRenderMenu: (
    props: CustomOptionsMenuProp<GenericOption, GenericOptionValue>,
  ) => React.ReactElement;
}

function InternalCustomMenu<
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
}: InternalCustomMenuProps<GenericOption, GenericOptionValue>) {
  const { MenuWrapper, menuRef } = useMenuWrapper({ attachTo });

  const menuContent = customRenderMenu({
    options,
    menuRef,
    onOptionSelect,
    selectedOption,
    inputFocused,
    MenuWrapper,
    inputRef,
  });

  return menuContent;
}
