import React, { RefObject, useContext } from "react";
import { BaseAutocompleteMenuWrapper } from "./MenuWrapper";
import { AnyOption, Option } from "../Autocomplete.types";
import { isOptionSelected } from "../Autocomplete.utils";
import { MenuOption } from "../Option";
import { useRepositionMenu } from "../useRepositionMenu";
import { AutocompleteContext } from "../AutocompleteProvider";

export interface DefaultMenuProps {
  readonly options: AnyOption[];
  readonly selectedOption?: Option;
  /**
   * Element that it's attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  onOptionSelect(chosenOption?: Option): void;
  readonly visible?: boolean;
}

/**
 * Renders the default Menu for the Autocomplete component.
 */
export function DefaultMenu({
  options,
  selectedOption,
  onOptionSelect,
  attachTo,
  visible,
}: DefaultMenuProps) {
  const { menuRef, setMenuRef, highlightedIndex } =
    useContext(AutocompleteContext);
  const {
    styles: popperStyles,
    attributes,
    targetWidth,
  } = useRepositionMenu(attachTo, menuRef, visible);

  const detectSeparatorCondition = (option: Option) =>
    option.description || option.details;

  const addSeparators = options.some(detectSeparatorCondition);

  return (
    <BaseAutocompleteMenuWrapper
      {...{ setMenuRef, popperStyles, attributes, targetWidth, visible }}
    >
      {options?.map((option, index) => {
        return (
          <MenuOption
            key={index}
            option={option}
            isHighlighted={index === highlightedIndex}
            onOptionSelect={onOptionSelect}
            isSelected={isOptionSelected(selectedOption, option)}
            addSeparators={addSeparators}
          />
        );
      })}
    </BaseAutocompleteMenuWrapper>
  );
}
