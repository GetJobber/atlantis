import { useIsMounted } from "@jobber/hooks/useIsMounted";
import React, { RefObject, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MenuWrapper } from "./MenuWrapper";
import { AnyOption, Option } from "../Autocomplete.types";
import { isOptionSelected } from "../Autocomplete.utils";
import { MenuOption } from "../Option";
import {
  KeyboardAction,
  getRequestedIndexChange,
  useCustomKeyboardNavigation,
} from "../useKeyboardNavigation";
import { useRepositionMenu } from "../useRepositionMenu";

export interface DefaultMenuProps {
  readonly options: AnyOption[];
  readonly selectedOption?: Option;
  /**
   * Element that it's attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  onOptionSelect(chosenOption: Option): void;
  readonly visible?: boolean;
}

// eslint-disable-next-line max-statements
export function DefaultMenu({
  options,
  selectedOption,
  onOptionSelect,
  attachTo,
}: DefaultMenuProps) {
  const {
    menuRef,
    setMenuRef,
    styles: popperStyles,
    attributes,
    targetWidth,
  } = useRepositionMenu(attachTo, true);

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const detectSeparatorCondition = (option: Option) =>
    option.description || option.details;

  const detectGroups = (option: AnyOption) => "options" in option;

  const addSeparators = options.some(detectSeparatorCondition);

  const initialHighlight = options.some(detectGroups) ? 1 : 0;
  useEffect(() => setHighlightedIndex(initialHighlight), [options]);

  useEffect(() => {
    menuRef?.children[highlightedIndex]?.scrollIntoView?.({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [highlightedIndex]);

  const onRequestHighlightChange = useCallback(
    (event: KeyboardEvent, direction: KeyboardAction) => {
      const indexChange = getRequestedIndexChange({
        event,
        options,
        direction,
        highlightedIndex,
      });

      switch (direction) {
        case KeyboardAction.Previous:
          setHighlightedIndex(prev => Math.max(0, prev + indexChange));
          break;
        case KeyboardAction.Next:
          setHighlightedIndex(prev =>
            Math.min(options.length - 1, prev + indexChange),
          );
          break;
        case KeyboardAction.Select:
          onOptionSelect(options[highlightedIndex]);
          break;
      }
    },
    [highlightedIndex, options, onOptionSelect],
  );

  useCustomKeyboardNavigation({
    onRequestHighlightChange,
  });

  const mounted = useIsMounted();

  const menu = (
    <MenuWrapper
      {...{ setMenuRef, popperStyles, attributes, targetWidth, visible: true }}
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
    </MenuWrapper>
  );

  return mounted.current ? createPortal(menu, document.body) : menu;
}
