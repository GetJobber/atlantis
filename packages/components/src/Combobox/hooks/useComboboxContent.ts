import { useEffect, useRef, useState } from "react";
import { ComboboxOption } from "../Combobox.types";

export function useComboboxContent(
  options: ComboboxOption[],
  open: boolean,
): {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  filteredOptions: ComboboxOption[];
  optionsListRef: React.RefObject<HTMLUListElement>;
} {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null,
  );
  const optionsListRef = useRef<HTMLUListElement>(null);
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (open && selectedElement) {
      selectedElement?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [open, selectedElement]);

  return {
    searchValue,
    setSearchValue,
    setSelectedElement,
    filteredOptions,
    optionsListRef,
  };
}
