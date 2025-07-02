import { useEffect, useRef } from "react";
import { Option } from "./Autocomplete.types";
import { useDebounce } from "../utils/useDebounce";
import { InputTextRef } from "../InputText";

export function useAutocomplete({
  value,
  updateSearch,
  debounceRate,
  inputText,
  updateInput,
}: {
  value?: Option;
  updateSearch: () => void;
  debounceRate: number;
  inputText: string;
  updateInput: (value: string) => void;
}) {
  const autocompleteRef = useRef(null);
  const delayedSearch = useDebounce(updateSearch, debounceRate);
  const inputRef = useRef<InputTextRef | null>(null);

  useEffect(() => {
    delayedSearch();
  }, [inputText]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return {
    autocompleteRef,
    inputRef,
  };
}
