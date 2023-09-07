import React, { RefObject, useRef, useState } from "react";
import styles from "./Combobox.css";

export const ComboboxContext = React.createContext(
  {} as {
    open: boolean;
    setOpen: (open: boolean) => void;
    wrapperRef: RefObject<HTMLDivElement>;
  },
);

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
}

export function ComboboxContextProvider(
  props: ComboboxProviderProps,
): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <ComboboxContext.Provider value={{ open, setOpen, wrapperRef }}>
      <div ref={wrapperRef}>
        {open && (
          <div className={styles.overlay} onClick={() => setOpen(false)}></div>
        )}
        {props.children}
      </div>
    </ComboboxContext.Provider>
  );
}
