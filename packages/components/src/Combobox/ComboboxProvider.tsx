import React, { useEffect, useRef, useState } from "react";

export const ComboboxContext = React.createContext(
  {} as { open: boolean; setOpen: (open: boolean) => void },
);

export interface ComboboxProviderProps {
  readonly children: React.ReactNode;
}

export function ComboboxContextProvider(
  props: ComboboxProviderProps,
): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contentRef]);

  return (
    <ComboboxContext.Provider value={{ open, setOpen }}>
      <div ref={contentRef}>{props.children}</div>
    </ComboboxContext.Provider>
  );
}
