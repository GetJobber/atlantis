import React, { useCallback } from "react";
import { ComboboxOptionProps } from "../Combobox.types";

export interface UseMakeComboboxHandlersReturn {
  handleClose: () => void;
  handleSelection: (selection: ComboboxOptionProps) => void;
  handleOpen: () => void;
}

export function useMakeComboboxHandlers(
  setOpen: (open: boolean) => void,
  open: boolean,
  setSearchValue: (searchValue: string) => void,
  selectedOptions: ComboboxOptionProps[],
  shouldScroll: React.MutableRefObject<boolean>,
  selectedStateSetter: (selected: ComboboxOptionProps[]) => void,
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
    (selection: ComboboxOptionProps) => {
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
      selectCallback: (selected: ComboboxOptionProps[]) => void,
      selection: ComboboxOptionProps,
    ) => {
      selectCallback([selection]);
      handleClose();
    },
    [],
  );

  return {
    handleClose,
    handleSelection,
    handleOpen,
  };
}

function handleMultiSelect(
  selectCallback: (selected: ComboboxOptionProps[]) => void,
  selected: ComboboxOptionProps[],
  selection: ComboboxOptionProps,
) {
  if (selected.some(s => s.id === selection.id)) {
    selectCallback(selected.filter(s => s.id !== selection.id));
  } else {
    selectCallback([...selected, selection]);
  }
}
