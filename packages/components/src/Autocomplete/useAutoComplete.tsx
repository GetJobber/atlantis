import { useEffect, useRef, useState } from "react";
import {
  AnyOption,
  Option,
  UseAutocompleteHandlersProps,
  UseAutocompleteProps,
} from "./types";
import { useDebounce } from "../utils/useDebounce";

export const useAutoCompleteHandlers = ({
  onChange,
  updateInput,
  setMenuVisible,
  allowFreeForm,
  value,
  inputText,
  setInputText,
  onBlur,
  onFocus,
}: UseAutocompleteHandlersProps) => {
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

  return {
    handleMenuChange,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
  };
};

export const useAutocomplete = ({
  initialOptions,
  value,
  debounce = 300,
  getOptions,
}: UseAutocompleteProps) => {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const autocompleteRef = useRef(null);
  const delayedSearch = useDebounce(updateSearch, debounce);

  useEffect(() => {
    delayedSearch();
  }, [inputText]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  function updateInput(newText: string) {
    setInputText(newText);

    if (newText === "" && initialOptions) {
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

  return {
    options,
    menuVisible,
    autocompleteRef,
    setMenuVisible,
    inputText,
    setInputText,
    updateInput,
    updateSearch,
    delayedSearch,
  };
};

export function mapToOptions(items: AnyOption[]) {
  return items.reduce(function (result: AnyOption[], item) {
    result = result.concat([item]);

    if (item.options) {
      result = result.concat(item.options);
    }

    return result;
  }, []);
}
