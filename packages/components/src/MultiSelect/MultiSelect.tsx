import React from "react";
import classNames from "classnames";
import { useOnKeyDown } from "@jobber/hooks";
import styles from "./MultiSelect.css";
import { DropDownMenu } from "./DropDownMenu";
import { Option, Options } from "./types";
import { handleKeyboardShortcut } from "./utils";
import { InputText } from "../InputText";

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
  onChange?(option: Option): void;
}

export function MultiSelect({
  defaultLabel,
  allSelectedLabel,
  options,
  onChange,
}: MultiSelectProps) {
  const [label, setLabel] = React.useState(defaultLabel);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const multiSelectContainerClass = classNames(styles.multiSelectContainer, {
    [styles.active]: menuVisible,
  });

  function handleMenuVisibility() {
    setMenuVisible(!menuVisible);
  }

  function setupKeyListeners(key: string) {
    switch (key) {
      case "Escape": {
        setMenuVisible(false);
        break;
      }
    }
  }

  useOnKeyDown(handleKeyboardShortcut(setupKeyListeners).callback, ["Escape"]);

  React.useEffect(() => {
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
    <div className={multiSelectContainerClass}>
      <div onClick={handleMenuVisibility}>
        <InputText
          value={label}
          suffix={{ icon: menuVisible ? "arrowUp" : "arrowDown" }}
        />
      </div>
      {menuVisible && (
        <DropDownMenu options={options} onOptionSelect={onChange} />
      )}
    </div>
  );
}
