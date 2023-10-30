import React, {
  Dispatch,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useComboboxValidation } from "./useComboboxValidation";
import {
  UseMakeComboboxHandlersReturn,
  useMakeComboboxHandlers,
} from "./useMakeComboboxHandlers";
import { ComboboxOption, ComboboxSelectionTiming } from "../Combobox.types";

type UseComboboxReturn = {
  optionElements?: ReactElement[];
  triggerElement?: ReactElement;
  actionElements?: ReactElement[];
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
  children: ReactElement | ReactElement[],
  selected: ComboboxOption[],
  onSelect: (selection: ComboboxOption[]) => void,
  selectionTiming?: ComboboxSelectionTiming,
  onClose?: () => void,
  multiSelect?: boolean,
): UseComboboxReturn {
  const waitUntilClose = selectionTiming === "onClose";
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(children);
  const [internalSelected, setInternalSelected] =
    useState<ComboboxOption[]>(selected);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef<boolean>(false);
  const selectedOptions = waitUntilClose ? internalSelected : selected;
  const selectedStateSetter = waitUntilClose ? setInternalSelected : onSelect;
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const { handleClose, handleSelection } = useMakeComboboxHandlers(
    setOpen,
    setSearchValue,
    selectedOptions,
    shouldScroll,
    selectedStateSetter,
    multiSelect,
    onClose,
  );

  useEffect(() => {
    if (!open && waitUntilClose) {
      onSelect(selectedOptions);
    }
  }, [open, waitUntilClose, selectedOptions]);

  return {
    optionElements,
    triggerElement,
    actionElements,
    wrapperRef,
    searchValue,
    setSearchValue,
    open,
    setOpen,
    selectedOptions,
    selectedStateSetter,
    shouldScroll,
    handleClose,
    handleSelection,
  };
}
