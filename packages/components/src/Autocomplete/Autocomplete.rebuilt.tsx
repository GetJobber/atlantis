import React, { Ref, forwardRef, useEffect, useRef, useState } from "react";
import { XOR } from "ts-xor";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu";
import { AnyOption, GroupOption, Option } from "./Option";
import {
  AutoCompleteProvider,
  useAutocomplete,
  useControllableState,
} from "./AutocompleteRebuiltProvider";
import { FormFieldProps } from "../FormField";
import { InputText, InputTextRef } from "../InputText";
import { useDebounce } from "../utils/useDebounce";
import { InputTextRebuiltProps } from "../InputText/InputText.types";

type OptionCollection = XOR<Option[], GroupOption[]>;

interface AutocompletePropsRebuilt
  extends Pick<
    FormFieldProps,
    | "clearable"
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
   * Initial options to show when user first focuses the Autocomplete
   */
  readonly options?: OptionCollection;

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

  readonly inputTextValue?: string;

  readonly onInputTextChange?: (newText: string) => void;
}

// Max statements increased to make room for the debounce functions
/* eslint max-statements: ["error", 14] */
function AutocompleteRebuilt(
  {
    // initialOptions = [],
    options = [],
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
    inputTextValue,
    onInputTextChange,
    ...inputProps
  }: AutocompletePropsRebuilt,
  ref: Ref<InputTextRef>,
) {
  const [menuVisible, setMenuVisible] = useState(false);
  const autocompleteRef = useRef(null);
  const delayedSearch = useDebounce(updateSearch, debounceRate);
  const [searchInputValue, setSearchInputValue] = useControllableState({
    value: inputTextValue,
    onValueChange: onInputTextChange,
  });

  useEffect(() => {
    delayedSearch();
  }, [searchInputValue]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <InputText
        ref={ref}
        autocomplete={false}
        size={size}
        value={searchInputValue}
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
    setSearchInputValue(newText);

    if (newText === "") {
      // setOptions(mapToOptions(options));
    }
  }

  async function updateSearch() {
    const updatedOptions: AnyOption[] = await getOptions(inputText);
    const filteredOptions = updatedOptions.filter((option: AnyOption) =>
      "options" in option && option.options ? option.options.length > 0 : true,
    );
    // setOptions(mapToOptions(filteredOptions));
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
      updateInput("");
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

export const Autocomplete = forwardRef(AutocompleteRebuilt);

interface AutocompleteRebuiltProps {
  readonly value: Option | undefined;
  readonly options: OptionCollection | Promise<OptionCollection>;
  readonly defaultValue?: Option;
  readonly allowFreeForm?: boolean;
  readonly debounce?: number;
  readonly onChange: (newValue?: Option) => void;
  // readonly getOptions: (newInputText: string) => OptionCollection | Promise<OptionCollection>;
  readonly size?: InputTextRebuiltProps["size"];
  readonly placeholder: string;
  readonly inputTextValue?: string;
  readonly onInputTextChange?: (newText: string) => void;
  readonly inputTextExtraProps?: Omit<
    InputTextRebuiltProps,
    "onChange" | "value" | "placeholder"
  >;
  // readonly updateSearch?: (newSearch: string) => void;
}

function AutocompleteRebuiltActual({
  onChange,
  value,
  inputTextValue,
  onInputTextChange,
  defaultValue,
}: AutocompleteRebuiltProps) {
  return (
    <AutoCompleteProvider
      onSelectValue={onChange}
      selectedValue={value}
      defaultSelectedValue={defaultValue}
      onTextInputChange={onInputTextChange}
      textInputValue={inputTextValue}
    ></AutoCompleteProvider>
  );
}

function AutocompleteRebuiltFields({
  size,
  placeholder,
  inputTextExtraProps,
  options,
}: AutocompleteRebuiltProps) {
  const {
    handleSelectedValueChange,
    selectedValue,
    inputTextValue,
    name,
    onTextInputChange,
  } = useAutocomplete<AnyOption>();
  const [menuVisible, setMenuVisible] = useState(false);
  const autocompleteRef = useRef(null);
  // const delayedSearch = useDebounce(updateSearch, debounceRate);
  const actualOptions = Promise.resolve(options);

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <InputText
        // ref={ref}
        version={2}
        autocomplete={false}
        size={size}
        value={inputTextValue || ""}
        onChange={onTextInputChange}
        placeholder={placeholder}
        // onFocus={handleInputFocus}
        // onBlur={handleInputBlur}
        {...inputTextExtraProps}
      />
      {menuVisible && (
        <Menu
          attachTo={autocompleteRef}
          visible={menuVisible && options.length > 0}
          options={actualOptions}
          selectedOption={selectedValue}
          onOptionSelect={handleMenuChange}
        />
      )}
    </div>
  );
}
