import React from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { DefaultMenu, DefaultMenuProps } from "./DefaultMenu";
import { MenuPopper } from "./MenuPopper";
import {
  AnyOption,
  CustomOptionsMenuProp,
  MenuProps,
  Option,
} from "../Autocomplete.types";
import { useRepositionMenu } from "../useRepositionMenu";

export function Menu<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
>({
  visible,
  options,
  selectedOption,
  onOptionSelect,
  attachTo,
  customRenderMenu,
}: MenuProps<GenericOption, GenericOptionValue>) {
  if (!visible) return null;

  if (customRenderMenu) {
    return (
      <InternalCustomMenu
        attachTo={attachTo}
        customRenderMenu={customRenderMenu}
        options={options}
        onOptionSelect={onOptionSelect}
        selectedOption={selectedOption}
      />
    );
  }

  return (
    <DefaultMenu
      attachTo={attachTo}
      options={options}
      onOptionSelect={onOptionSelect as DefaultMenuProps["onOptionSelect"]}
      selectedOption={selectedOption}
    />
  );
}

interface InternalCustomMenuProps<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
> {
  readonly options: GenericOption[];
  readonly selectedOption?: GenericOptionValue;
  readonly attachTo: MenuProps["attachTo"];
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
}: InternalCustomMenuProps<GenericOption, GenericOptionValue>) {
  const {
    menuRef,
    setMenuRef,
    styles: popperStyles,
    attributes,
    targetWidth,
  } = useRepositionMenu(attachTo, true);

  const menuContent = customRenderMenu({
    options,
    menuRef,
    onOptionSelect,
    selectedOption,
  });

  const menu = (
    <MenuPopper
      {...{
        setMenuRef,
        popperStyles,
        attributes,
        targetWidth,
        visible: true,
      }}
    >
      {menuContent}
    </MenuPopper>
  );
  const mounted = useIsMounted();

  return mounted.current ? createPortal(menu, document.body) : menu;
}
