import React, { useCallback } from "react";
import classnames from "classnames";
import { createPortal } from "react-dom";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { MenuProps, Option } from "./Autocomplete.types";
import styles from "./Autocomplete.module.css";
import { useKeyboardNavigation } from "./useKeyboardNavigation";
import { useRepositionMenu } from "./useRepositionMenu";
import { isGroup, isOptionSelected } from "./Autocomplete.utils";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Heading } from "../Heading";

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

  return mounted.current ? createPortal(menu, document.body) : menu;
}
