/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Dispatch,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  UseMakeComboboxHandlersReturn,
  useMakeComboboxHandlers,
} from "./useMakeComboboxHandlers";
import { ComboboxOption } from "../Combobox.types";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const debounce = (func: any, delay: any, { leading }: any = {}) => {
  let timerId: any;

  return (...args: any) => {
    if (!timerId && leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };
};

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
