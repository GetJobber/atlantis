import { useEffect, useRef, useState } from "react";
import { ComboboxOption } from "../Combobox.types";

interface useComboboxContent {
  // searchValue: string;
  // setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setFirstSelectedElement: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  filteredOptions: ComboboxOption[];
  optionsListRef: React.RefObject<HTMLUListElement>;
  // selectedOptions: ComboboxOption[];
  // optionsSelectionHandler: (selected: ComboboxOption[]) => void;
}

export function useComboboxContent(
  options: ComboboxOption[],
  open: boolean,
  selected: ComboboxOption[],
  searchValue: string,
  // onClose: ((selection: ComboboxOption[]) => void) | undefined,
  // onSelect: ((selection: ComboboxOption[]) => void) | undefined,
): useComboboxContent {
  // const [searchValue, setSearchValue] = useState<string>("");
  const [firstSelectedElement, setFirstSelectedElement] =
    useState<HTMLElement | null>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // const [internalSelected, setInternalSelected] =
  //   useState<ComboboxOption[]>(selected);
  // const selectedOptions = onClose ? internalSelected : selected;

  // const optionsSelectionHandler = onSelect ? onSelect : setInternalSelected;

  // useEffect(() => {
  //   if (!open && onClose) {
  //     onClose(selectedOptions);
  //   }
  // }, [open, onClose, selectedOptions]);

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
