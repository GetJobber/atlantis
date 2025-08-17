import type { Dispatch, KeyboardEvent, MutableRefObject } from "react";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./MultiSelect.module.css";
import { DropDownMenu } from "./DropDownMenu";
import type { Options } from "./types";
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
   * Change handler
   */
  readonly onOptionsChange: Dispatch<React.SetStateAction<Options>>;

  /**
   * Adjusts the interface to either have small or large spacing.
   */
  readonly size?: "small" | "large";
}

export function MultiSelect({
  defaultLabel,
  allSelectedLabel,
  options,
  onOptionsChange,
  size,
}: MultiSelectProps) {
  const [label, setLabel] = useState(defaultLabel);
  const [menuVisible, setMenuVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const multiSelectContainer = useRef() as MutableRefObject<HTMLDivElement>;
  const multiSelectRef = useRef() as MutableRefObject<HTMLDivElement>;
  const multiSelectClass = classNames(styles.multiSelect, {
    [styles.active]: menuVisible,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
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

  function handleKeydown(event: KeyboardEvent<HTMLDivElement>) {
    const { key, metaKey, ctrlKey } = event;

    if (metaKey || ctrlKey) return;

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
    <div
      ref={multiSelectContainer}
      className={styles.multiSelectContainer}
      onKeyDown={handleKeydown}
    >
      <div
        data-testid="multi-select"
        className={multiSelectClass}
        onClick={handleMenuVisibility}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
        ref={multiSelectRef}
        role="button"
        aria-label={`${defaultLabel}: ${label}`}
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
