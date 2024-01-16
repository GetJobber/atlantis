import React, {
  Dispatch,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import debounce from "lodash/debounce";
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
} & UseMakeComboboxHandlersReturn;

export function useCombobox(
  selected: ComboboxOption[],
  onSelect: (selection: ComboboxOption[]) => void,
  onClose?: () => void,
  multiSelect?: boolean,
  onSearchChange?: (searchValue: string) => void,
  debounceTime: number = 300,
): UseComboboxReturn {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchChangeCallback = useCallback(
    debounce(
      (value: string) => onSearchChange && onSearchChange(value),
      debounceTime,
    ),
    [],
  );

  useEffect(() => {
    if (onSearchChange) {
      searchChangeCallback(searchValue);
    }
  }, [searchValue]);

  const { handleClose, handleSelection } = useMakeComboboxHandlers(
    setOpen,
    setSearchValue,
    selected,
    shouldScroll,
    onSelect,
    multiSelect,
    onClose,
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
  };
}
