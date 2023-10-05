import { useEffect, useRef, useState } from "react";
import { ComboboxOption } from "../Combobox.types";

interface useComboboxContent {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setFirstSelectedElement: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  filteredOptions: ComboboxOption[];
  optionsListRef: React.RefObject<HTMLUListElement>;
  selectedOptions: ComboboxOption[];
  setInternalSelected: (selected: ComboboxOption[]) => void;
}

export function useComboboxContent(
  options: ComboboxOption[],
  open: boolean,
  selected: ComboboxOption[],
  onClose: ((selection: ComboboxOption[]) => void) | undefined,
): useComboboxContent {
  const [searchValue, setSearchValue] = useState<string>("");
  const [firstSelectedElement, setFirstSelectedElement] =
    useState<HTMLElement | null>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const [internalSelected, setInternalSelected] =
    useState<ComboboxOption[]>(selected);
  const selectedOptions = onClose ? internalSelected : selected;

  useEffect(() => {
    if (!open && onClose) {
      onClose(selectedOptions);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (open && firstSelectedElement) {
      firstSelectedElement?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [open, firstSelectedElement]);

  useEffect(() => {
    if (selectedOptions.length === 0) {
      setFirstSelectedElement(null);
    }
  }, [selectedOptions]);

  return {
    searchValue,
    setSearchValue,
    setFirstSelectedElement,
    filteredOptions,
    optionsListRef,
    selectedOptions,
    setInternalSelected,
  };
}
