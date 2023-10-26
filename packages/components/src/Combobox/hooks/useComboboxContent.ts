import { useEffect, useRef, useState } from "react";
import { ComboboxOption } from "../Combobox.types";

interface useComboboxContent {
  setFirstSelectedElement: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  filteredOptions: ComboboxOption[];
  optionsListRef: React.RefObject<HTMLUListElement>;
}

export function useComboboxContent(
  options: ComboboxOption[],
  open: boolean,
  selected: ComboboxOption[],
  searchValue: string,
): useComboboxContent {
  const [firstSelectedElement, setFirstSelectedElement] =
    useState<HTMLElement | null>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (open && firstSelectedElement) {
      firstSelectedElement?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [open, firstSelectedElement]);

  useEffect(() => {
    if (selected.length === 0) {
      setFirstSelectedElement(null);
    }
  }, [selected]);

  return {
    setFirstSelectedElement,
    filteredOptions,
    optionsListRef,
  };
}
