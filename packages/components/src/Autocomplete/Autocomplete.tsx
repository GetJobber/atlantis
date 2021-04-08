import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { XOR } from "ts-xor";
import styles from "./Autocomplete.css";
import { Menu } from "./Menu";
import { AnyOption, GroupOption, Option } from "./Option";
import { InputText } from "../InputText";
import { FormFieldProps } from "../FormField";

type OptionCollection = XOR<Option[], GroupOption[]>;

interface AutocompleteProps {
  /**
   * Initial options to show when user first focuses the Autocomplete
   */
  readonly initialOptions?: OptionCollection;

  /**
   * Name of the input
   */
  readonly name: string;

  /**
   * Set Autocomplete value.
   */
  readonly value: Option | undefined;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;

  /**
   * Allow the autocomplete to use values not from the drop down menu.
   *
   * @default true
   */
  readonly allowFreeForm?: boolean;

  /**
   * Adjusts the input text box to either have small or large height.
   */
  readonly size?: FormFieldProps["size"];

  /**
   * Highlights the field red to indicate an error.
   */
  readonly invalid?: FormFieldProps["invalid"];

  /**
   * Debounce in milliseconds for getOptions
   *
   * @default 300
   */
  readonly debounce?: number;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange(newValue?: Option): void;

  /**
   * Called as the user types in the input. The autocomplete will display what
   * is returned from this method to the user as available options.
   * @param newInputText
   */
  getOptions(
    newInputText: string,
  ): OptionCollection | Promise<OptionCollection>;

  /**
   * Blur behaviour (clicking away from the input text or
   * hitting escape)
   */
  onBlur?(): void;

  /**
   * Focus behaviour (clicking on the input text)
   */
  onFocus?(): void;
}

/**
 * Max statements disabled here to make room for the
 * debounce functions.
 */
// eslint-disable-next-line max-statements
export function Autocomplete({
  initialOptions = [],
  value,
  name,
  allowFreeForm = true,
  size = undefined,
  invalid,
  debounce: debounceRate = 300,
  onChange,
  getOptions,
  placeholder,
  onBlur,
  onFocus,
}: AutocompleteProps) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState((value && value.label) || "");

  const delayedSearch = debounce(updateSearch, debounceRate);

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [inputText]);

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
        autocomplete={false}
        size={size}
        invalid={invalid}
        value={inputText}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {menuVisible && (
        <Menu
          visible={true}
          options={options}
          selectedOption={value}
          onOptionSelect={handleMenuChange}
        />
      )}
    </div>
  );

  function updateInput(newText: string) {
    setInputText(newText);
    if (newText === "") {
      setOptions(mapToOptions(initialOptions));
    }
  }

  async function updateSearch() {
    const updatedOptions: AnyOption[] = await getOptions(inputText);
    const filteredOptions = updatedOptions.filter((option: AnyOption) =>
      "options" in option && option.options ? option.options.length > 0 : true,
    );
    setOptions(mapToOptions(filteredOptions));
  }

  function handleMenuChange(chosenOption: Option) {
    onChange(chosenOption);
    updateInput(chosenOption.label);
    setMenuVisible(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);
    if (allowFreeForm) {
      onChange({ label: newText });
    }
    setMenuVisible(true);
  }

  function handleInputBlur() {
    setMenuVisible(false);
    if (value == undefined || value.label !== inputText) {
      setInputText("");
      onChange(undefined);
    }
    onBlur && onBlur();
  }

  function handleInputFocus() {
    setMenuVisible(true);
    if (onFocus) {
      onFocus();
    }
  }
}

function mapToOptions(items: AnyOption[]) {
  return items.reduce(function (result: AnyOption[], item) {
    result = result.concat([item]);
    if (item.options) {
      result = result.concat(item.options);
    }
    return result;
  }, []);
}
