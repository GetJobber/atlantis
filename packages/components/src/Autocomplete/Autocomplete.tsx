import React, { Ref, forwardRef, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { XOR } from "ts-xor";
import styles from "./Autocomplete.css";
import { Menu } from "./Menu";
import { AnyOption, GroupOption, Option } from "./Option";
import { InputText, InputTextRef } from "../InputText";
import { FormFieldProps } from "../FormField";

type OptionCollection = XOR<Option[], GroupOption[]>;

interface AutocompleteProps
  extends Pick<
    FormFieldProps,
    | "invalid"
    | "name"
    | "onBlur"
    | "onFocus"
    | "prefix"
    | "size"
    | "suffix"
    | "validations"
  > {
  /**
   * @deprecated
   * Use `ref` instead.
   */
  readonly inputRef?: Ref<InputTextRef>;

  /**
   * Initial options to show when user first focuses the Autocomplete
   */
  readonly initialOptions?: OptionCollection;

  /**
   * Set Autocomplete value.
   */
  readonly value: Option | undefined;

  /**
   * Allow the autocomplete to use values not from the drop down menu.
   *
   * @default true
   */
  readonly allowFreeForm?: boolean;

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
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;
}

// Max statements increased to make room for the debounce functions
/* eslint max-statements: ["error", 14] */
function AutocompleteInternal(
  {
    initialOptions = [],
    value,
    allowFreeForm = true,
    size = undefined,
    debounce: debounceRate = 300,
    onChange,
    getOptions,
    placeholder,
    onBlur,
    onFocus,
    validations,
    ...inputProps
  }: AutocompleteProps,
  ref: Ref<InputTextRef>,
) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const autocompleteRef = useRef(null);

  const delayedSearch = debounce(updateSearch, debounceRate);

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [inputText]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <InputText
        ref={ref}
        autocomplete={false}
        size={size}
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        validations={validations}
        {...inputProps}
      />
      {menuVisible && (
        <Menu
          attachTo={autocompleteRef}
          visible={menuVisible && options.length > 0}
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

export const Autocomplete = forwardRef(AutocompleteInternal);
