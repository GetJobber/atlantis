import React, {
  Ref,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu";
import { AnyOption, Option } from "./Option";
import {
  AutocompleteInternalProps,
  AutocompleteProps,
} from "./Autocomplete.types";
import { useMenuFormField } from "./useMenuFormField";
import { InputText, InputTextRef } from "../InputText";
import { useDebounce } from "../utils/useDebounce";

// Max statements increased to make room for the debounce functions
/* eslint max-statements: ["error", 14] */
// eslint-disable-next-line max-statements
const AutocompleteInternal = forwardRef(function AutocompleteInternal(
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
    defaultValue,
    name,
    id,
    ...inputProps
  }: AutocompleteInternalProps,
  ref: Ref<InputTextRef>,
) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const autocompleteRef = useRef(null);
  const delayedSearch = useDebounce(updateSearch, debounceRate);

  const { onControllerChange } = useMenuFormField({
    nameProp: name,
    id,
    value: value,
    defaultValue: defaultValue,
    onChangeProp: onChange,
  });

  useEffect(() => {
    delayedSearch();
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
    onChange?.(chosenOption);
    updateInput(chosenOption.label);
    onControllerChange(chosenOption);
    setMenuVisible(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);

    if (allowFreeForm) {
      onControllerChange({ label: newText });
      onChange?.({ label: newText });
    }
  }

  function handleInputBlur() {
    setMenuVisible(false);

    if (value == undefined || value.label !== inputText) {
      setInputText("");
      onChange?.(undefined);
    }
    onBlur && onBlur();
  }

  function handleInputFocus() {
    setMenuVisible(true);

    if (onFocus) {
      onFocus();
    }
  }
});

function mapToOptions(items: AnyOption[]) {
  return items.reduce(function (result: AnyOption[], item) {
    result = result.concat([item]);

    if (item.options) {
      result = result.concat(item.options);
    }

    return result;
  }, []);
}

export const Autocomplete = forwardRef(function Autocomplete(
  props: AutocompleteProps,
  ref: Ref<InputTextRef>,
) {
  const id = useId();

  return <AutocompleteInternal {...props} ref={ref} id={id} />;
});
