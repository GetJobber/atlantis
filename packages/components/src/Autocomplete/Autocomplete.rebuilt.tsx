import React, {
  Ref,
  RefAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu/Menu";
import {
  AnyOption,
  AutocompleteRebuiltProps,
  Option,
} from "./Autocomplete.types";
import { isOptionGroup } from "./Autocomplete.utils";
import { InputText, InputTextRef } from "../InputText";
import { mergeRefs } from "../utils/mergeRefs";

function AutocompleteRebuiltInternal<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  {
    value,
    allowFreeForm = true,
    size = undefined,
    onChange,
    placeholder,
    onBlur,
    onFocus,
    options,
    error,
    onInputChange,
    customRenderMenu,
    // this spreading is somewhat risky
    ...inputProps
  }: AutocompleteRebuiltProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  >,
  ref: Ref<InputTextRef>,
) {
  const [inputFocused, setInputFocused] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const autocompleteRef = useRef(null);
  const inputRef = useRef<InputTextRef | null>(null);
  const mappedOptions = useMemo(() => mapToOptions(options), [options]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <InputText
        ref={mergeRefs([ref, inputRef])}
        autoComplete="off"
        size={size}
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        error={error}
        {...inputProps}
      />
      <Menu
        attachTo={autocompleteRef}
        inputRef={inputRef}
        inputFocused={inputFocused}
        options={mappedOptions}
        customRenderMenu={customRenderMenu}
        selectedOption={value}
        onOptionSelect={handleMenuChange}
      />
    </div>
  );

  function updateInput(newText: string) {
    setInputText(newText);
  }

  function handleMenuChange(chosenOption?: GenericOptionValue) {
    onChange(chosenOption);
    updateInput(chosenOption?.label ?? "");
    setInputFocused(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);
    // Is it right to call onChange here?
    // We don't know if this is a selection yet
    // it might be freeform e.g SomethingNew
    // or at this point it might be Happy Bir
    // and part of a search term
    onInputChange?.(newText);
  }

  function handleInputBlur() {
    setInputFocused(false);

    // this is different because now we are not assuming that the onChange firing constantly
    // has already set the value. hence the allowFreeForm check
    if (!allowFreeForm && inputText !== value?.label) {
      setInputText("");
      onChange(undefined);
    } else {
      // if we allow freeform, then we can inform the consumer of onChange with the current text value
      onChange({ label: inputText } as GenericOptionValue);
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
export const AutocompleteRebuilt = forwardRef(AutocompleteRebuiltInternal) as <
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  props: AutocompleteRebuiltProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > &
    RefAttributes<InputTextRef>,
) => ReturnType<typeof AutocompleteRebuiltInternal>;
