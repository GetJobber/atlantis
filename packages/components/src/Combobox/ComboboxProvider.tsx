import React, { Dispatch, SetStateAction } from "react";
import { ComboboxOption } from "./Combobox.types";

export const ComboboxContext = React.createContext(
  {} as {
    open: boolean;
    setOpen: (open: boolean) => void;
    selected: ComboboxOption[];
    selectionHandler: (option: ComboboxOption) => void;
  },
);

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
  readonly multiselect?: boolean;
  readonly selectedOptions: ComboboxOption[];
  readonly selectionHandler: (option: ComboboxOption) => void;
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
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
      }}
    >
      {props.children}
    </ComboboxContext.Provider>
  );
}
