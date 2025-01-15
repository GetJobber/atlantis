import React, { PropsWithChildren, useCallback } from "react";
import classnames from "classnames";
import { createPortal } from "react-dom";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { MenuProps, Option } from "./Autocomplete.types";
import styles from "./Autocomplete.module.css";
import { useKeyboardNavigation } from "./useKeyboardNavigation";
import { useRepositionMenu } from "./useRepositionMenu";
import { isOptionSelected } from "./Autocomplete.utils";
import { MenuOption } from "./Option";

// Adding useIsMounted is what tipped this to 13 statements.
// Any additions beyond useIsMounted should probably see this component refactored a bit
// eslint-disable-next-line max-statements
export function Menu({
  visible,
  options,
  selectedOption,
  onOptionSelect,
  attachTo,
}: MenuProps) {
  const {
    menuRef,
    setMenuRef,
    styles: popperStyles,
    attributes,
    targetWidth,
  } = useRepositionMenu(attachTo, visible);

  const detectSeparatorCondition = (option: Option) =>
    option.description || option.details;

  const addSeparators = options.some(detectSeparatorCondition);

  const onHighlightChange = useCallback(
    (newHighlightedIndex: number) => {
      menuRef?.children[newHighlightedIndex]?.scrollIntoView?.({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [menuRef],
  );

  const { highlightedIndex } = useKeyboardNavigation({
    options,
    visible,
    onOptionSelect,
    onHighlightChange,
  });

  const mounted = useIsMounted();

  const menu = (
    <MenuPopper
      {...{ setMenuRef, popperStyles, attributes, targetWidth, visible }}
    >
      {options.map((option, index) => {
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
    </MenuPopper>
  );

  return mounted.current ? createPortal(menu, document.body) : menu;
}

interface MenuPoppperProps {
  readonly setMenuRef: ReturnType<typeof useRepositionMenu>["setMenuRef"];
  readonly popperStyles: ReturnType<typeof useRepositionMenu>["styles"];
  readonly attributes: ReturnType<typeof useRepositionMenu>["attributes"];
  readonly targetWidth: ReturnType<typeof useRepositionMenu>["targetWidth"];
  readonly visible: boolean;
}

function MenuPopper({
  setMenuRef,
  popperStyles,
  attributes,
  targetWidth,
  visible,
  children,
}: PropsWithChildren<MenuPoppperProps>) {
  return (
    <div
      className={classnames(styles.options, { [styles.visible]: visible })}
      ref={setMenuRef}
      style={{ ...popperStyles.popper, width: targetWidth }}
      data-elevation={"elevated"}
      {...attributes.popper}
    >
      {children}
    </div>
  );
}
