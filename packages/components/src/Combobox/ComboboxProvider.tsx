import React, { RefObject, useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <ComboboxContext.Provider value={{ open, setOpen, wrapperRef }}>
      <div ref={wrapperRef}>{props.children}</div>
    </ComboboxContext.Provider>
  );
}
