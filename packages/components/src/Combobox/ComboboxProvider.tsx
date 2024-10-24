import React, { MutableRefObject } from "react";
import { ComboboxOptionProps } from "./Combobox.types";

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
  readonly selected: ComboboxOptionProps[];
  readonly selectionHandler: (option: ComboboxOptionProps) => void;
  readonly open: boolean;
  readonly handleClose: () => void;
  readonly handleOpen: () => void;
  readonly shouldScroll: MutableRefObject<boolean>;
  readonly searchValue: string;
  readonly label?: string;
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
