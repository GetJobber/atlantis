import React, { RefObject, useEffect, useState } from "react";
import classnames from "classnames";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { AnyOption, Option } from "./Option";
import styles from "./Autocomplete.css";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Heading } from "../Heading";
import { Typography } from "../Typography";

export type MarkupCallback = (character: string) => JSX.Element;

enum IndexChange {
  Previous = -1,
  Next = 1,
}

interface MenuProps {
  readonly visible: boolean;
  readonly options: Option[];
  readonly selectedOption?: Option;
  readonly customMatchMarkup?: MarkupCallback;
  /**
   * Element that it's attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  onOptionSelect(chosenOption: Option): void;
  readonly currentValue: string;
}

// Adding useIsMounted is what tipped this to 13 statements.
// Any additions beyond useIsMounted should probably see this component refactored a bit
// eslint-disable-next-line max-statements
export function Menu({
  visible,
  options,
  selectedOption,
  customMatchMarkup,
  onOptionSelect,
  attachTo,
  currentValue,
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

  const mounted = useIsMounted();

  const menu = (
    <div
      className={classnames(styles.options, { [styles.visible]: visible })}
      ref={setMenuRef}
      style={{ ...popperStyles.popper, width: targetWidth }}
      data-elevation={"elevated"}
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
            type="button"
            onMouseDown={onOptionSelect.bind(undefined, option)}
          >
            <div className={styles.icon}>
              {isOptionSelected(selectedOption, option) && (
                <Icon name="checkmark" size="small" />
              )}
            </div>
            <div className={styles.text}>
              <div className={styles.label}>
                {customMatchMarkup === undefined ? (
                  // this fallback pattern is repeated
                  // make it part of the function? or is that doing too much?
                  <Text>{option.label}</Text>
                ) : (
                  buildMatchingCharMarkup(
                    option.label,
                    currentValue,
                    customMatchMarkup,
                    "text",
                  )
                )}
                {option.description !== undefined && (
                  <Text variation="subdued">
                    {/* here's the second one */}
                    {customMatchMarkup === undefined
                      ? option.description
                      : buildMatchingCharMarkup(
                          option.description,
                          currentValue,
                          customMatchMarkup,
                          "textSecondary",
                        )}
                  </Text>
                )}
              </div>
              {/* should this also be highlight-able? */}
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

  return mounted.current ? createPortal(menu, document.body) : menu;

  function setupKeyListeners() {
    useEffect(() => {
      menuRef?.children[highlightedIndex]?.scrollIntoView?.({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, [highlightedIndex]);

    useOnKeyDown((event: KeyboardEvent) => {
      const indexChange = arrowKeyPress(event, IndexChange.Next);

      if (indexChange) {
        setHighlightedIndex(
          Math.min(options.length - 1, highlightedIndex + indexChange),
        );
      }
    }, "ArrowDown");

    useOnKeyDown((event: KeyboardEvent) => {
      const indexChange = arrowKeyPress(event, IndexChange.Previous);

      if (indexChange) {
        setHighlightedIndex(Math.max(0, highlightedIndex + indexChange));
      }
    }, "ArrowUp");

    useOnKeyDown((event: KeyboardEvent) => {
      if (!visible) return;
      if (isGroup(options[highlightedIndex])) return;

      event.preventDefault();
      onOptionSelect(options[highlightedIndex]);
    }, "Enter");
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

  useSafeLayoutEffect(() => {
    popper?.update?.();
  }, [visible]);

  const targetWidth = attachTo.current?.clientWidth;

  return { ...popper, menuRef, setMenuRef, targetWidth };
}

function buildMatchingCharMarkup(
  label: string,
  currentValue: string,
  markupCallback: MarkupCallback,
  nonMatchTextColor: "textSecondary" | "text",
): React.ReactNode {
  // we can rely on the description, which is nested in some "subdued" text to provide the color of the matching text if not provided
  // however, the label is used directly and it won't inherit any semantic values AKA it'll not work in dark mode
  // this also means that the matching text will be different colors - one for label, one for description

  // is that good, or do we want it to be built in a way that it's easy for it to look nice?

  // we need some aria-label to build the whole word for screen readers
  // worth noting the screen reader currently doesn't read the options, so we're technically not making it worse
  const customMatchingMarkup = label
    .split(new RegExp(`(${currentValue})`, "i"))
    .map((part, i) =>
      part.toLowerCase() === currentValue.toLowerCase() ? (
        React.cloneElement(markupCallback(part), { key: i })
      ) : (
        <Typography element="span" key={i} textColor={nonMatchTextColor}>
          {part}
        </Typography>
      ),
    );

  return customMatchingMarkup;
}
