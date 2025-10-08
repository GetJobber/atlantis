import type {
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
} from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./DropDownMenu.module.css";
import type { Option, Options } from "./types";
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
  readonly setOptions: Dispatch<React.SetStateAction<Options>>;
}

export function DropDownMenu({ options, setOptions }: DropDownMenuProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  // @ts-expect-error - TODO: fix this
  const menuDiv = useRef() as MutableRefObject<HTMLUListElement>;

  const handleOptionClick = useCallback((clickedOption: Option) => {
    setOptions(current =>
      current.map(option => {
        if (option.label == clickedOption.label) {
          return { ...option, checked: !clickedOption.checked };
        }

        return option;
      }),
    );
  }, []);

  function handleOptionHover(event: MouseEvent<HTMLLIElement>, index: number) {
    event.preventDefault();
    setHighlightedIndex(index);
  }

  function handleOptionFocus(index: number) {
    setHighlightedIndex(index);

    if (menuDiv.current) {
      const option = menuDiv.current.children[index].querySelector("input");
      option?.focus();
    }
  }

  function scrollMenuIfItemNotInView(
    menuDivElement: HTMLUListElement,
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

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const { key, metaKey, ctrlKey } = event;

    if (metaKey || ctrlKey) return;

    switch (key) {
      case "Enter": {
        if (highlightedIndex >= 0) {
          handleOptionClick(options[highlightedIndex]);
        }
        break;
      }
      case "ArrowDown": {
        handlePressDown(event);
        break;
      }
      case "ArrowUp": {
        handlePressUp(event);
        break;
      }
    }
  }

  useEffect(() => {
    // focus first option
    handleOptionFocus(0);
  }, [menuDiv]);

  return (
    <ul
      data-testid="dropdown-menu"
      data-elevation={"elevated"}
      className={styles.dropDownMenuContainer}
      ref={menuDiv}
      onKeyDown={handleKeyDown}
    >
      {options.map((option, index) => {
        const optionClass = classNames(styles.option, {
          [styles.active]: index === highlightedIndex,
        });

        return (
          <li
            key={`${index}-${option.label}`}
            className={optionClass}
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              handleOptionClick(option);
            }}
            onMouseOver={e => handleOptionHover(e, index)}
          >
            <Checkbox
              label={option.label}
              checked={option.checked}
              onFocus={() => setHighlightedIndex(index)}
            />
          </li>
        );
      })}
    </ul>
  );

  function handlePressUp(event: React.KeyboardEvent<HTMLUListElement>) {
    event.preventDefault();
    const newIndex = Math.max(0, highlightedIndex - 1);

    handleOptionFocus(newIndex);
    scrollMenuIfItemNotInView(menuDiv.current, "up");
  }

  function handlePressDown(event: React.KeyboardEvent<HTMLUListElement>) {
    event.preventDefault();
    const newIndex = Math.min(options.length - 1, highlightedIndex + 1);

    handleOptionFocus(newIndex);
    scrollMenuIfItemNotInView(menuDiv.current, "down");
  }
}
