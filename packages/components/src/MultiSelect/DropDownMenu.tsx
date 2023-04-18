import React, {
  Dispatch,
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
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
  setOptions: Dispatch<React.SetStateAction<Options>>;
}

export function DropDownMenu({ options, setOptions }: DropDownMenuProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
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

  function setupKeyListeners(key: string) {
    switch (key) {
      case "Enter":
      case " ": {
        if (highlightedIndex >= 0) {
          handleOptionClick(options[highlightedIndex]);
        }
        break;
      }
      case "ArrowDown": {
        const newIndex = Math.min(options.length - 1, highlightedIndex + 1);

        handleOptionFocus(newIndex);
        scrollMenuIfItemNotInView(menuDiv.current, "down");
        break;
      }
      case "ArrowUp": {
        const newIndex = Math.max(0, highlightedIndex - 1);

        handleOptionFocus(newIndex);
        scrollMenuIfItemNotInView(menuDiv.current, "up");
        break;
      }
    }
  }

  useOnKeyDown(handleKeyboardShortcut(setupKeyListeners).callback, [
    "Enter",
    " ",
    "ArrowDown",
    "ArrowUp",
  ]);

  useEffect(() => {
    // focus first option
    handleOptionFocus(0);
  }, [menuDiv]);

  return (
    <ul
      data-testid="dropdown-menu"
      className={styles.dropDownMenuContainer}
      ref={menuDiv}
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
}
