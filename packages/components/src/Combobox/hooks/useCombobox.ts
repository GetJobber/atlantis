import React, {
  Dispatch,
  MutableRefObject,
  ReactElement,
  useRef,
  useState,
} from "react";
import { useComboboxValidation } from "./useComboboxValidation";
import {
  UseMakeComboboxHandlersReturn,
  useMakeComboboxHandlers,
} from "./useMakeComboboxHandlers";
import { ComboboxOption } from "../Combobox.types";

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
  selected: ComboboxOption[],
  onSelect: (selection: ComboboxOption[]) => void,
  children?: ReactElement | ReactElement[],
  onClose?: () => void,
  multiSelect?: boolean,
): UseComboboxReturn {
  const { optionElements, triggerElement, actionElements } =
    useComboboxValidation(children);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

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
    optionElements,
    triggerElement,
    actionElements,
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
