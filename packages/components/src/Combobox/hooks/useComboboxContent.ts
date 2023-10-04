import { useEffect, useRef, useState } from "react";
import { ComboboxOption } from "../Combobox.types";

export function useComboboxContent(
  options: ComboboxOption[],
  open: boolean,
): {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setFirstSelectedElement: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  filteredOptions: ComboboxOption[];
  optionsListRef: React.RefObject<HTMLUListElement>;
} {
  const [searchValue, setSearchValue] = useState<string>("");
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

  return {
    searchValue,
    setSearchValue,
    setFirstSelectedElement,
    filteredOptions,
    optionsListRef,
  };
}
