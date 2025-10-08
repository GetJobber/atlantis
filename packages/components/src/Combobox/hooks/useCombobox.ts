import type { Dispatch, MutableRefObject } from "react";
import type React from "react";
import { useRef, useState } from "react";
import noop from "lodash/noop";
import { useDebounce } from "@jobber/hooks";
import type { UseMakeComboboxHandlersReturn } from "./useMakeComboboxHandlers";
import { useMakeComboboxHandlers } from "./useMakeComboboxHandlers";
import { type ComboboxOption } from "../Combobox.types";

type UseComboboxReturn = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
  open: boolean;
  selectedOptions: ComboboxOption[];
  selectedStateSetter: (selection: ComboboxOption[]) => void;
  shouldScroll: MutableRefObject<boolean>;
  internalFilteredOptions: ComboboxOption[];
  handleSearchChange: (value: string) => void;
} & UseMakeComboboxHandlersReturn;

export function useCombobox(
  selected: ComboboxOption[],
  onSelect: (selection: ComboboxOption[]) => void,
  options: ComboboxOption[],
  onClose?: () => void,
  multiSelect?: boolean,
  onSearch?: (searchValue: string) => void,
  debounceTime: number = 300,
): UseComboboxReturn {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchCallback = useDebounce(
    (value: string) => onSearch?.(value),
    debounceTime,
  );

  const { handleClose, handleSelection, handleOpen } = useMakeComboboxHandlers(
    setOpen,
    open,
    setSearchValue,
    selected,
    shouldScroll,
    onSelect,
    multiSelect,
    onClose,
    onSearch,
  );

  const internalFilteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return {
    wrapperRef,
    searchValue,
    setSearchValue,
    open,
    selectedOptions: selected,
    selectedStateSetter: onSelect,
    shouldScroll,
    handleClose,
    handleSelection,
    handleOpen,
    internalFilteredOptions,
    handleSearchChange: onSearch ? searchCallback : noop,
  };
}
