import React, { RefObject } from "react";
import { InputTextRef } from "@jobber/components/InputText";
import { useModalContext } from "@jobber/components/Modal";
import { DefaultMenu, DefaultMenuProps } from "./DefaultMenu";
import { useAutocompleteMenu } from "./MenuWrapper";
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
  handleUpdateOptions,
  inputFocused,
  attachTo,
  inputRef,
  customRenderMenu,
}: MenuProps<GenericOption, GenericOptionValue>) {
  const { open: isWithinOpenModal } = useModalContext();

  /**
   * Experimental/temporary workaround for Autocompletes within Modals. This is only necessary
   * when an Autocomplete uses `customRenderMenu` and is rendered within the composable version
   * of Modal (aka Modal.Provider).
   *
   * If `customRenderMenu` contains clickable elements such as Buttons, the consumer must ALSO
   * replace any `onClick` handlers with `onMouseDown` handlers on those Buttons.
   *
   * The check below prevents Autocomplete from rendering the `customRenderMenu` when it's not visible
   * (when the input isn't focused). This prevents Modals (FloatingUI) from marking the Autocomplete's
   * menu as data-floating-ui-inert and aria-hidden="true". As a result, this prevents the bug where clicking
   * within its menu would cause FloatingUI to close the parent Modal because it determined the click was
   * outside of the Modal.
   */
  const specialModalWorkaround = isWithinOpenModal && customRenderMenu;
  if (specialModalWorkaround && !inputFocused) return null;

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
