import React from "react";

export const AutocompleteContext = React.createContext(
  {} as Omit<AutocompleteContextProviderProps, "children">,
);

interface AutocompleteContextProviderProps {
  readonly children: React.ReactNode;
  readonly menuRef: HTMLElement | null;
  readonly setMenuRef: (ref: HTMLElement | null) => void;
  readonly highlightedIndex: number;
}

export function AutocompleteContextProvider({
  children,
  ...props
}: AutocompleteContextProviderProps): JSX.Element {
  return (
    <AutocompleteContext.Provider value={props}>
      {children}
    </AutocompleteContext.Provider>
  );
}
