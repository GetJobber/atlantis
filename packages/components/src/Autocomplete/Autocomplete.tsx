import type { Ref, RefAttributes } from "react";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@jobber/hooks/useDebounce";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu/Menu";
import {
  type AnyOption,
  type AutocompleteProps as AutocompleteLegacyProps,
  type Option,
} from "./Autocomplete.types";
import { isOptionGroup } from "./Autocomplete.utils";
import type { InputTextRef } from "../InputText";
import { InputText } from "../InputText";
import { mergeRefs } from "../utils/mergeRefs";

// Max statements increased to make room for the debounce functions
// eslint-disable-next-line max-statements
function AutocompleteInternal<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
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
    customRenderMenu,
    ...inputProps
  }: AutocompleteLegacyProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  >,
  ref: Ref<InputTextRef>,
) {
  const initialOptionsMemo = useMemo(
    () => mapToOptions(initialOptions),
    [initialOptions],
  );
  const [options, setOptions] =
    useState<Array<GenericOption | GenericGetOptionsValue>>(initialOptionsMemo);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const [autocompleteRef, setAutocompleteRef] = useState<HTMLDivElement | null>(
    null,
  );
  const delayedSearch = useDebounce(updateSearch, debounceRate);
  const inputRef = useRef<InputTextRef | null>(null);

  useEffect(() => {
    delayedSearch();
  }, [inputText]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return (
    <div className={styles.autocomplete} ref={setAutocompleteRef}>
      <InputText
        ref={mergeRefs([ref, inputRef])}
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
      <Menu
        attachTo={autocompleteRef}
        inputRef={inputRef}
        inputFocused={inputFocused}
        options={options}
        customRenderMenu={customRenderMenu}
        selectedOption={value}
        onOptionSelect={handleMenuChange}
      />
    </div>
  );

  function updateInput(newText: string) {
    setInputText(newText);

    if (newText === "") {
      setOptions(mapToOptions(initialOptions));
    }
  }

  async function updateSearch() {
    const updatedOptions = await getOptions(inputText);
    const filteredOptions = updatedOptions.filter(option =>
      isOptionGroup(option) ? option.options.length > 0 : true,
    );

    setOptions(mapToOptions(filteredOptions));
  }

  function handleMenuChange(chosenOption?: GenericOptionValue) {
    onChange(chosenOption);
    updateInput(chosenOption?.label ?? "");
    setInputFocused(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);

    if (allowFreeForm) {
      onChange({ label: newText } as GenericOptionValue);
    }
  }

  function handleInputBlur() {
    setInputFocused(false);

    if (value == undefined || value.label !== inputText) {
      setInputText("");
      onChange(undefined);
    }
    onBlur && onBlur();
  }

  function handleInputFocus() {
    setInputFocused(true);

    if (onFocus) {
      onFocus();
    }
  }
}

function mapToOptions<GenericOption extends AnyOption = AnyOption>(
  items: GenericOption[],
) {
  const retVal = items.reduce<GenericOption[]>((result, item) => {
    result.push(item);

    if (isOptionGroup(item) && item.options) {
      result = result.concat(item.options as GenericOption[]);
    }

    return result;
  }, []);

  return retVal;
}

// Casts the Generics to the forward ref so autocomplete works as expected for consumers
export const Autocomplete = forwardRef(AutocompleteInternal) as <
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  props: AutocompleteLegacyProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > &
    RefAttributes<InputTextRef>,
) => ReturnType<typeof AutocompleteInternal>;
