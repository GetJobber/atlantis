import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { ComboboxOption } from "./Combobox.types";

export const ComboboxContext = React.createContext(
  {} as {
    open: boolean;
    setOpen: (open: boolean) => void;
    selected: ComboboxOption[];
    selectionHandler: (option: ComboboxOption) => void;
    closeCombobox: () => void;
    shouldScroll: MutableRefObject<boolean>;
  },
);

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
  readonly multiselect?: boolean;
  readonly selectedOptions: ComboboxOption[];
  readonly selectionHandler: (option: ComboboxOption) => void;
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly closeCombobox: () => void;
  readonly shouldScroll: MutableRefObject<boolean>;
}

export function ComboboxContextProvider(
  props: ComboboxProviderProps,
): JSX.Element {
  return (
    <ComboboxContext.Provider
      value={{
        open: props.open,
        setOpen: props.setOpen,
        selected: props.selectedOptions,
        selectionHandler: props.selectionHandler,
        closeCombobox: props.closeCombobox,
        shouldScroll: props.shouldScroll,
      }}
    >
      {props.children}
    </ComboboxContext.Provider>
  );
}
