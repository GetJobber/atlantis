import React, { MutableRefObject } from "react";
import { ComboboxOption } from "./Combobox.types";

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
  readonly selected: ComboboxOption[];
  readonly selectionHandler: (option: ComboboxOption) => void;
  readonly open: boolean;
  readonly handleOpen: () => void;
  readonly handleClose: () => void;
  readonly shouldScroll: MutableRefObject<boolean>;
  readonly searchValue: string;
}

export const ComboboxContext = React.createContext(
  {} as Omit<ComboboxProviderProps, "children">,
);

export function ComboboxContextProvider({
  children,
  ...props
}: ComboboxProviderProps): JSX.Element {
  return (
    <ComboboxContext.Provider value={props}>
      {children}
    </ComboboxContext.Provider>
  );
}
