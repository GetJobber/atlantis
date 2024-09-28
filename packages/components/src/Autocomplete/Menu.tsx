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

export type MarkupCallback = (char: string) => JSX.Element;

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
                {buildMatchingCharMarkup(
                  option.label,
                  currentValue,
                  customMatchMarkup,
                )}
                {option.description !== undefined && (
                  // kind of awkward to use here
                  // I think a lower level matching function that can be used by both one that uses the
                  // results directly, and one that wraps it with a Text would be better
                  // I don't think we have to worry about any of this knowing about what type of search has been implemented
                  // if the results/options are still here, then we can assume they matched
                  <Text variation="subdued">
                    {buildMatchingCharMarkup(
                      option.description,
                      currentValue,
                      customMatchMarkup,
                      "subdued",
                    )}
                  </Text>
                )}
              </div>
              {/* we can make this match too */}
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
  markupCallback?: MarkupCallback,
  variation?: "subdued",
): React.ReactNode {
  // need to use semantic tokens for dark mode compatibility
  // that's one downside of using <b> directly
  // unless we use it within a context that gives it the correct styles anyway

  // black text with bold kinda works with both though tbh
  // maybe we don't need to worry about semantic token colored text?
  if (markupCallback === undefined) {
    return <Text variation={variation}>{label}</Text>;
  }

  // we need some aria-label to build the whole word for screen readers
  // worth noting the screen reader currently doesn't read the options, so we're technically not making it worse
  const customMatchingMarkup = label
    .split(new RegExp(`(${currentValue})`, "i"))
    .map((part, i) =>
      part.toLowerCase() === currentValue.toLowerCase() ? (
        React.cloneElement(markupCallback(part), { key: i })
      ) : (
        <Typography element="span" key={i} textColor="textSecondary">
          {part}
        </Typography>
      ),
    );

  return customMatchingMarkup;
}
