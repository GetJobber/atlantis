import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import styles from "./Autocomplete.css";
import { Menu } from "./Menu";
import { Option } from "./Option";
import { InputText } from "../InputText";

interface AutocompleteProps {
  /**
   * Initial options to show when user first focuses the Autocomplete
   */
  readonly initialOptions?: Option[];

  /**
   * Set Autocomplete value.
   */
  readonly value: Option | undefined;

  /**
   * Debounce delay time for the setOptions requests
   */
  readonly debounceTime: number | undefined;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange(newValue?: Option): void;

  /**
   * Called as the user types in the input. The autocomplete will display what
   * is retuned from this method to the user as available options.
   * @param newInputText
   */
  getOptions(newInputText: string): Option[] | Promise<Option[]>;
}

export function Autocomplete({
  initialOptions = [],
  value,
  debounceTime,
  onChange,
  getOptions,
  placeholder,
}: AutocompleteProps) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState((value && value.label) || "");

  const debouncedSetOptions = debounceTime
    ? useRef(debounce(setOptions, debounceTime)).current
    : setOptions;

  useEffect(() => {
    if (value) {
      updateInput(value.label);
    } else {
      updateInput("");
    }
  }, [value]);

  return (
    <div className={styles.autocomplete}>
      <InputText
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <Menu
        visible={menuVisible}
        options={options}
        selectedOption={value}
        onOptionSelect={handleMenuChange}
      />
    </div>
  );

  async function updateInput(newText: string) {
    setInputText(newText);
    if (newText) {
      debouncedSetOptions(await getOptions(newText));
    } else {
      setOptions(initialOptions);
    }
  }

  function handleMenuChange(chosenOption: Option) {
    onChange(chosenOption);
    updateInput(chosenOption.label);
    setMenuVisible(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);
    setMenuVisible(true);
  }

  function handleInputBlur() {
    setMenuVisible(false);
    if (value == undefined || value.label !== inputText) {
      onChange(undefined);
    }
  }

  function handleInputFocus() {
    setMenuVisible(true);
  }
}
