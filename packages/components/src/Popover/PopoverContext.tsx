import React, { CSSProperties, createContext, useContext } from "react";
import { PopoverProps, PopoverProviderProps } from "./types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";

interface PopoverContextProps
  extends Pick<PopoverProps, "UNSAFE_className" | "UNSAFE_style"> {
  open: boolean;
  setPopperElement: (element: HTMLElement | null) => void;
  setArrowElement: (element: HTMLElement | null) => void;
  popperStyles: { [key: string]: CSSProperties };
  attributes: { [key: string]: { [key: string]: string } | undefined };
  popoverClassNames: string;
  dismissButtonClassNames: string;
  arrowClassNames: string;
}

const PopoverContext = createContext<PopoverContextProps>({
  open: false,
  popperStyles: {},
  attributes: {},
  setPopperElement: () => {
    // noop
  },
  setArrowElement: () => {
    // noop
  },
  popoverClassNames: "",
  dismissButtonClassNames: "",
  arrowClassNames: "",
});

export function usePopoverContext() {
  return useContext(PopoverContext);
}

export function PopoverProvider({
  children,
  preferredPlacement,
  attachTo,
  open,
  UNSAFE_className,
  UNSAFE_style,
}: PopoverProviderProps) {
  const { setPopperElement, setArrowElement, popperStyles, attributes } =
    usePopover({
      preferredPlacement,
      attachTo,
      open,
    });

  const { popoverClassNames, dismissButtonClassNames, arrowClassNames } =
    usePopoverStyles({ UNSAFE_className });

  if (!open) return null;

  return (
    <PopoverContext.Provider
      value={{
        open,
        setPopperElement,
        setArrowElement,
        popperStyles,
        attributes,
        popoverClassNames,
        dismissButtonClassNames,
        UNSAFE_className,
        UNSAFE_style,
        arrowClassNames,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}
