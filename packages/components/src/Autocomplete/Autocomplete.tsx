import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import styles from "./Autocomplete.css";
import { Menu } from "./Menu";
import { Option } from "./Option";
import { InputText } from "../InputText";
import { FormFieldProps } from "../FormField";

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
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;

  /**
   * Turn off checkmarks on selected result elements.
   */
  readonly checkmarks?: boolean;

  /**
   * Hint adjusts the interface to either have small or large spacing.
   */
  readonly inputSize?: FormFieldProps["size"];

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

  /**
   * Optional additional blur behaviour (clicking away from the input text or
   * hitting escape)
   */
  onBlur?(): void;

  /**
   * Optional additional focus behaviour (clicking on the input text)
   */
  onFocus?(): void;
}

export function Autocomplete({
  initialOptions = [],
  value,
  checkmarks = true,
  inputSize = undefined,
  onChange,
  getOptions,
  placeholder,
  onBlur,
  onFocus,
}: AutocompleteProps) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState((value && value.label) || "");

  const debouncedSetOptions = useRef(debounce(setOptions, 150)).current;

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
        size={inputSize}
        autocomplete={"autocomplete-off"}
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <Menu
        visible={menuVisible}
        options={options}
        checkmarks={checkmarks}
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
    if (onBlur) {
      onBlur();
    }
  }

  function handleInputFocus() {
    setMenuVisible(true);
    if (onFocus) {
      onFocus();
    }
  }
}
