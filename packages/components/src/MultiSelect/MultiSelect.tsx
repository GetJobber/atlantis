import React, {
  Dispatch,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { useOnKeyDown } from "@jobber/hooks";
import styles from "./MultiSelect.css";
import { DropDownMenu } from "./DropDownMenu";
import { Options } from "./types";
import { handleKeyboardShortcut } from "./utils";
import { Text } from "../Text";
import { Icon } from "../Icon";

interface MultiSelectProps {
  /**
   * The label to be displayed by default when no options are selected
   */
  readonly defaultLabel: string;

  /**
   * The label to be displayed when all options are selected
   */
  readonly allSelectedLabel: string;

  /**
   * List of options to be checked
   */
  readonly options: Options;

  /**
   * Text to be announced by screen readers
   */
  readonly ariaLabel?: string;

  /**
   * Change handler
   */
  onOptionsChange: Dispatch<React.SetStateAction<Options>>;
}

// eslint-disable-next-line max-statements
export function MultiSelect({
  defaultLabel,
  allSelectedLabel,
  options,
  ariaLabel,
  onOptionsChange,
}: MultiSelectProps) {
  const [label, setLabel] = useState(defaultLabel);
  const [menuVisible, setMenuVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const multiSelectContainer = useRef() as MutableRefObject<HTMLDivElement>;
  const multiSelectRef = useRef() as MutableRefObject<HTMLDivElement>;
  const multiSelectClass = classNames(styles.multiSelect, {
    [styles.active]: menuVisible,
  });

  function handleMenuVisibility() {
    multiSelectRef.current.focus();
    setMenuVisible(!menuVisible);
  }

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (!multiSelectContainer?.current?.contains(e.target as Node)) {
      setMenuVisible(false);
    }
  };

  function setupKeyListeners(key: string) {
    switch (key) {
      case "Enter":
      case " ": {
        if (focused) {
          setMenuVisible(!menuVisible);
        }
        break;
      }
      case "Escape": {
        multiSelectRef.current.focus();
        setMenuVisible(false);
        break;
      }
    }
  }

  useOnKeyDown(handleKeyboardShortcut(setupKeyListeners).callback, [
    "Enter",
    " ",
    "Escape",
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  useEffect(() => {
    const selected = options.filter(option => option.checked);

    if (selected.length === 0) {
      setLabel(defaultLabel);
    } else if (selected.length == options.length) {
      setLabel(allSelectedLabel);
    } else {
      const selectedLabels: string[] = [];
      selected.forEach(option => selectedLabels.push(option.label));
      setLabel(selectedLabels.join(", "));
    }
  }, [options]);

  return (
    <div ref={multiSelectContainer} className={styles.multiSelectContainer}>
      <div
        data-testid="multi-select"
        className={multiSelectClass}
        onClick={handleMenuVisibility}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
        ref={multiSelectRef}
        role="button"
        aria-label={ariaLabel}
        aria-multiselectable
        aria-haspopup
      >
        <Text>{label}</Text>
        <Icon name="arrowDown" />
      </div>
      {menuVisible && (
        <DropDownMenu options={options} setOptions={onOptionsChange} />
      )}
    </div>
  );
}
