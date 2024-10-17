import React, { useCallback } from "react";
import { ComboboxOption } from "../Combobox.types";

export interface UseMakeComboboxHandlersReturn {
  handleClose: () => void;
  handleOpen: () => void;
  handleSelection: (selection: ComboboxOption) => void;
}

export function useMakeComboboxHandlers(
  setOpen: (open: boolean) => void,
  setSearchValue: (searchValue: string) => void,
  selectedOptions: ComboboxOption[],
  shouldScroll: React.MutableRefObject<boolean>,
  selectedStateSetter: (selected: ComboboxOption[]) => void,
  multiSelect?: boolean,
  onClose?: () => void,
  onSearch?: (searchValue: string) => void,
): UseMakeComboboxHandlersReturn {
  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchValue("");

    onSearch && onSearch("");
    onClose && onClose();

    if (selectedOptions.length > 0) {
      shouldScroll.current = true;
    }
  }, [setOpen, setSearchValue, onClose, onSearch, selectedOptions.length]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleSelection = useCallback(
    (selection: ComboboxOption) => {
      if (multiSelect) {
        handleMultiSelect(selectedStateSetter, selectedOptions, selection);
      } else {
        handleSingleSelect(selectedStateSetter, selection);
      }
    },
    [multiSelect, selectedStateSetter, selectedOptions],
  );

  const handleSingleSelect = useCallback(
    (
      selectCallback: (selected: ComboboxOption[]) => void,
      selection: ComboboxOption,
    ) => {
      selectCallback([selection]);
      handleClose();
    },
    [],
  );

  return {
    handleClose,
    handleOpen,
    handleSelection,
  };
}

function handleMultiSelect(
  selectCallback: (selected: ComboboxOption[]) => void,
  selected: ComboboxOption[],
  selection: ComboboxOption,
) {
  if (selected.some(s => s.id === selection.id)) {
    selectCallback(selected.filter(s => s.id !== selection.id));
  } else {
    selectCallback([...selected, selection]);
  }
}
