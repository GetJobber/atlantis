import type { MutableRefObject } from "react";
import React from "react";
import { type ComboboxOption } from "./Combobox.types";

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
  readonly selected: ComboboxOption[];
  readonly selectionHandler: (option: ComboboxOption) => void;
  readonly open: boolean;
  readonly handleClose: () => void;
  readonly handleOpen: () => void;
  readonly shouldScroll: MutableRefObject<boolean>;
  readonly searchValue: string;
  readonly label?: string;
  readonly onClear?: () => void;
  readonly onSelectAll?: (selection: ComboboxOption[]) => void;
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
