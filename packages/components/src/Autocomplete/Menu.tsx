import React, { RefObject, useEffect, useLayoutEffect, useState } from "react";
import classnames from "classnames";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { AnyOption, Option } from "./Option";
import styles from "./Autocomplete.css";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Heading } from "../Heading";

enum IndexChange {
  Previous = -1,
  Next = 1,
}

interface MenuProps {
  readonly visible: boolean;
  readonly options: Option[];
  readonly selectedOption?: Option;
  /**
   * Element that it's attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  onOptionSelect(chosenOption: Option): void;
}

export function Menu({
  visible,
  options,
  selectedOption,
  onOptionSelect,
  attachTo,
}: MenuProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const {
    menuRef,
    setMenuRef,
    styles: popperStyles,
    attributes,
    targetWidth,
  } = useRepositionMenu(attachTo, visible);

  const detectSeparatorCondition = (option: Option) =>
    option.description || option.details;

  const detectGroups = (option: AnyOption) => option.options;

  const addSeparators = options.some(detectSeparatorCondition);

  const initialHighlight = options.some(detectGroups) ? 1 : 0;

  setupKeyListeners();

  useEffect(() => setHighlightedIndex(initialHighlight), [options]);

  const menu = (
    <div
      className={classnames(styles.options, { [styles.visible]: visible })}
      ref={setMenuRef}
      style={{ ...popperStyles.popper, width: targetWidth }}
      {...attributes.popper}
    >
      {options.map((option, index) => {
        const optionClass = classnames(styles.option, {
          [styles.active]: index === highlightedIndex,
          [styles.separator]: addSeparators,
        });

        if (isGroup(option)) {
          return (
            <div key={option.label} className={styles.heading}>
              <Heading level={5}>{option.label}</Heading>
            </div>
          );
        }

        return (
          <button
            className={optionClass}
            key={option.value}
            onMouseDown={onOptionSelect.bind(undefined, option)}
          >
            <div className={styles.icon}>
              {isOptionSelected(selectedOption, option) && (
                <Icon name="checkmark" size="small" />
              )}
            </div>
            <div className={styles.text}>
              <div className={styles.label}>
                <Text>{option.label}</Text>
                {option.description !== undefined && (
                  <Text variation="subdued">{option.description}</Text>
                )}
              </div>
              {option.details !== undefined && (
                <div className={styles.details}>
                  <Text>{option.details}</Text>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  return createPortal(menu, document.body);

  function setupKeyListeners() {
    useEffect(() => {
      menuRef?.children[highlightedIndex]?.scrollIntoView?.({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, [highlightedIndex]);

    useOnKeyDown("ArrowDown", (event: KeyboardEvent) => {
      const indexChange = arrowKeyPress(event, IndexChange.Next);

      if (indexChange) {
        setHighlightedIndex(
          Math.min(options.length - 1, highlightedIndex + indexChange),
        );
      }
    });

    useOnKeyDown("ArrowUp", (event: KeyboardEvent) => {
      const indexChange = arrowKeyPress(event, IndexChange.Previous);

      if (indexChange) {
        setHighlightedIndex(Math.max(0, highlightedIndex + indexChange));
      }
    });

    useOnKeyDown("Enter", (event: KeyboardEvent) => {
      if (!visible) return;
      if (isGroup(options[highlightedIndex])) return;

      event.preventDefault();
      onOptionSelect(options[highlightedIndex]);
    });
  }

  function arrowKeyPress(event: KeyboardEvent, direction: number) {
    if (!visible) return;
    event.preventDefault();
    const requestedIndex = options[highlightedIndex + direction];

    return requestedIndex && isGroup(requestedIndex)
      ? direction + direction
      : direction;
  }
}

function isOptionSelected(selectedOption: Option | undefined, option: Option) {
  return selectedOption && selectedOption.value === option.value;
}

// Split this out into a hooks package.
function useOnKeyDown(
  keyName: string,
  handler: (event: KeyboardEvent) => boolean | void,
) {
  const newHandler = (event: KeyboardEvent): void => {
    if (event.key === keyName) {
      handler(event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", newHandler);

    return () => {
      window.removeEventListener("keydown", newHandler);
    };
  }, [keyName, handler]);
}

function isGroup(option: AnyOption) {
  if (option.options) return true;

  return false;
}

function useRepositionMenu(attachTo: MenuProps["attachTo"], visible = false) {
  const [menuRef, setMenuRef] = useState<HTMLElement | null>();
  const popper = usePopper(attachTo.current, menuRef, {
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top"] } },
    ],
  });

  useLayoutEffect(() => {
    popper?.update?.();
  }, [visible]);

  const targetWidth = attachTo.current?.clientWidth;

  return { ...popper, menuRef, setMenuRef, targetWidth };
}
