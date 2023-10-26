import React, { Dispatch, RefObject, SetStateAction, useRef } from "react";
import styles from "./Combobox.css";
import { ComboboxOption } from "./Combobox.types";

export const ComboboxContext = React.createContext(
  {} as {
    // multiselect: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    wrapperRef: RefObject<HTMLDivElement>;
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
  // const multiselect = props.multiselect || false;
  // const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <ComboboxContext.Provider
      value={{
        // multiselect,
        open: props.open,
        setOpen: props.setOpen,
        wrapperRef,
        selected: props.selectedOptions,
        selectionHandler: props.selectionHandler,
      }}
    >
      <div ref={wrapperRef}>
        {props.open && (
          <div
            className={styles.overlay}
            onClick={() => props.setOpen(false)}
            data-testid="ATL-Combobox-Overlay"
          />
        )}
        {props.children}
      </div>
    </ComboboxContext.Provider>
  );
}
