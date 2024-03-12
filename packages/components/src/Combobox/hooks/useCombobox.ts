import React, {
  Dispatch,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import debounce from "lodash-es/debounce";
import noop from "lodash-es/noop";
import {
  UseMakeComboboxHandlersReturn,
  useMakeComboboxHandlers,
} from "./useMakeComboboxHandlers";
import { ComboboxOption } from "../Combobox.types";

type UseComboboxReturn = {
  wrapperRef: React.RefObject<HTMLDivElement>;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
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

  const searchCallback = useCallback(
    debounce((value: string) => onSearch?.(value), debounceTime),
    [onSearch, debounceTime],
  );

  const { handleClose, handleSelection } = useMakeComboboxHandlers(
    setOpen,
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
    setOpen,
    selectedOptions: selected,
    selectedStateSetter: onSelect,
    shouldScroll,
    handleClose,
    handleSelection,
    internalFilteredOptions,
    handleSearchChange: onSearch ? searchCallback : noop,
  };
}
