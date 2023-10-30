import React, { RefObject, useRef, useState } from "react";
import styles from "./Combobox.css";
import { ComboboxOption } from "./Combobox.types";

export const ComboboxContext = React.createContext(
  {} as {
    multiselect: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    selected: ComboboxOption[];
    setSelected: (open: ComboboxOption[]) => void;
    wrapperRef: RefObject<HTMLDivElement>;
  },
);

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
  readonly multiselect?: boolean;
}

export function ComboboxContextProvider(
  props: ComboboxProviderProps,
): JSX.Element {
  const multiselect = props.multiselect || false;
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<ComboboxOption[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <ComboboxContext.Provider
      value={{ multiselect, open, setOpen, wrapperRef, selected, setSelected }}
    >
      <div ref={wrapperRef}>
        {open && (
          <div
            className={styles.overlay}
            onClick={() => setOpen(false)}
            data-testid="ATL-Combobox-Overlay"
          />
        )}
        {props.children}
      </div>
    </ComboboxContext.Provider>
  );
}
