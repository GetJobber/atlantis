import React, { Key } from "react";

export interface ListBoxProviderProps {
  readonly children: React.ReactNode;
  readonly selectedKeys: Set<Key> | "all";
  readonly selectionHandler: (id: string) => void;
}

export const ListBoxContext = React.createContext(
  {} as Omit<ListBoxProviderProps, "children">,
);

export function ListBoxProvider({
  children,
  ...props
}: ListBoxProviderProps): JSX.Element {
  return (
    <ListBoxContext.Provider value={props}>{children}</ListBoxContext.Provider>
  );
}
