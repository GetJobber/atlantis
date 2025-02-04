import React, { Ref, forwardRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Autocomplete.module.css";
import { AutocompleteProps } from "./types";
import { useAutoCompleteHandlers, useAutocomplete } from "./useAutoComplete";
import { useAutoCompleteMenu } from "./useAutocompleteMenu";
import { useRepositionMenu } from "./useRepositionMenu";
import { InputText, InputTextRef } from "../InputText";
import { Box } from "../Box";

function AutocompleteComposedInternal(
  {
    initialOptions = [],
    value,
    allowFreeForm = true,
    size = undefined,
    debounce,
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
  const {
    autocompleteRef,
    inputText,
    setMenuVisible,
    menuVisible,
    updateInput,
    setInputText,
    options,
  } = useAutocomplete({ initialOptions, value, debounce, getOptions });

  const {
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleMenuChange,
  } = useAutoCompleteHandlers({
    onChange,
    updateInput,
    setMenuVisible,
    allowFreeForm,
    value,
    inputText,
    setInputText,
    onBlur,
    onFocus,
    getOptions,
    placeholder,
  });

  const {
    menuRef,
    setMenuRef,
    styles: popperStyles,
    attributes,
    targetWidth,
  } = useRepositionMenu(autocompleteRef);

  const { mounted } = useAutoCompleteMenu({
    visible: menuVisible,
    menuRef,
    options,
    onOptionSelect: handleMenuChange,
  });

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
      {menuVisible &&
        options &&
        mounted.current &&
        createPortal(
          <div
            ref={setMenuRef}
            {...attributes.popper}
            style={{ ...popperStyles.popper, width: targetWidth }}
          >
            <Box>CUSTOM MENU INTERNALS</Box>
          </div>,
          document.body,
        )}
    </div>
  );
}

export const Autocomplete = forwardRef(AutocompleteComposedInternal);
