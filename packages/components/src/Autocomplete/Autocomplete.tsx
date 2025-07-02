import React, { Ref, RefAttributes, RefObject, forwardRef } from "react";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu/Menu";
import { AnyOption, AutocompleteProps, Option } from "./Autocomplete.types";
import { useAutocompleteFunctions } from "./useAutocompleteFunctions";
import { useAutocomplete } from "./useAutocomplete";
import { InputText, InputTextRef } from "../InputText";
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
    version,
    ...inputProps
  }: AutocompleteProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  >,
  ref: Ref<InputTextRef>,
) {
  const {
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleMenuChange,
    updateSearch,
    inputFocused,
    options,
    inputText,
    updateInput,
  } = useAutocompleteFunctions({
    getOptions,
    onChange: onChange as (newValue?: Option | undefined) => void,
    onBlur,
    onFocus,
    value,
    allowFreeForm,
    initialOptions,
  });
  const { autocompleteRef, inputRef } = useAutocomplete({
    value,
    updateSearch,
    debounceRate,
    inputText,
    updateInput,
  });

  return (
    <AutocompleteWrapper autocompleteRef={autocompleteRef}>
      <InputText
        ref={mergeRefs([ref, inputRef])}
        autocomplete={false}
        size={size}
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        version={version as 1}
        onBlur={handleInputBlur}
        validations={validations}
        {...inputProps}
      />
      <Menu
        attachTo={autocompleteRef}
        inputRef={inputRef}
        inputFocused={inputFocused}
        options={options as (GenericOption | GenericGetOptionsValue)[]}
        customRenderMenu={customRenderMenu}
        selectedOption={value}
        onOptionSelect={handleMenuChange}
      />
    </AutocompleteWrapper>
  );
}

export function AutocompleteWrapper({
  children,
  autocompleteRef,
}: {
  readonly children: React.ReactNode;
  readonly autocompleteRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      {children}
    </div>
  );
}

// Casts the Generics to the forward ref so autocomplete works as expected for consumers
export const Autocomplete = forwardRef(AutocompleteInternal) as <
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  props: AutocompleteProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > &
    RefAttributes<InputTextRef>,
) => ReturnType<typeof AutocompleteInternal>;
