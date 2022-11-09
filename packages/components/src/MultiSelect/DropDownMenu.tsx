import React, { MouseEvent, useRef, useState } from "react";
import classNames from "classnames";
import { useOnKeyDown } from "@jobber/hooks";
import styles from "./DropDownMenu.css";
import { Option, Options } from "./types";
import { handleKeyboardShortcut } from "./utils";
import { Checkbox } from "../Checkbox";

interface DropDownMenuProps {
  /**
   * List of options to be selected
   * @default false
   */
  readonly options: Options;

  /**
   * Change handler.
   */
  onOptionSelect?(option: Option): void;
}

export function DropDownMenu({ options, onOptionSelect }: DropDownMenuProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const menuDiv = useRef() as React.MutableRefObject<HTMLDivElement>;

  function handleOptionClick(
    event: MouseEvent<HTMLDivElement>,
    option: Option,
  ) {
    event.preventDefault();
    onOptionSelect && onOptionSelect(option);
  }

  function handleOptionHover(event: MouseEvent<HTMLDivElement>, index: number) {
    event.preventDefault();
    setHighlightedIndex(index);
  }

  function scrollMenuIfItemNotInView(
    menuDivElement: HTMLDivElement,
    direction: "up" | "down",
  ) {
    const itemDiv = menuDivElement.querySelector(
      `:nth-child(${highlightedIndex + 1})`,
    ) as HTMLButtonElement;

    if (!itemDiv) return;

    const menuTop = menuDivElement.getBoundingClientRect().top;
    const {
      top: itemTop,
      height: itemHeight,
      bottom: itemBottom,
    } = itemDiv.getBoundingClientRect();
    const itemTrueBottom = itemBottom + itemHeight;
    const menuBottom = menuDivElement.getBoundingClientRect().bottom;
    if (direction == "up" && itemTop - itemHeight < menuTop) {
      menuDivElement.scrollTop -= itemHeight;
    } else if (direction == "down" && itemTrueBottom > menuBottom) {
      menuDivElement.scrollTop += itemHeight;
    }
  }

  function setupKeyListeners(key: string) {
    switch (key) {
      case "Enter": {
        if (highlightedIndex >= 0) {
          onOptionSelect && onOptionSelect(options[highlightedIndex]);
        }
        break;
      }
      case "ArrowDown": {
        setHighlightedIndex(Math.min(options.length - 1, highlightedIndex + 1));

        if (menuDiv.current) {
          scrollMenuIfItemNotInView(menuDiv.current, "down");
        }

        break;
      }
      case "ArrowUp": {
        setHighlightedIndex(Math.max(0, highlightedIndex - 1));

        if (menuDiv.current) {
          scrollMenuIfItemNotInView(menuDiv.current, "up");
        }

        break;
      }
    }
  }

  useOnKeyDown(handleKeyboardShortcut(setupKeyListeners).callback, [
    "Enter",
    "ArrowDown",
    "ArrowUp",
  ]);

  return (
    <div className={styles.dropDownMenuContainer} ref={menuDiv}>
      {options.map((option, index) => {
        const optionClass = classNames(styles.option, {
          [styles.active]: index === highlightedIndex,
        });

        return (
          <div
            key={`${index}-${option.label}`}
            className={optionClass}
            onClick={e => handleOptionClick(e, option)}
            onMouseOver={e => handleOptionHover(e, index)}
          >
            <Checkbox label={option.label} checked={option.checked} />
          </div>
        );
      })}
    </div>
  );
}
