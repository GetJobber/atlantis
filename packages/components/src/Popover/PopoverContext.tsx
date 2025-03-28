import React, { CSSProperties, createContext, useContext } from "react";
import { PopoverProps, PopoverProviderProps } from "./types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";
import { AtlantisThemedPortal } from "../AtlantisThemedPortal";

interface PopoverContextProps
  extends Pick<PopoverProps, "UNSAFE_className" | "UNSAFE_style"> {
  setPopperElement: (element: HTMLElement | null) => void;
  setArrowElement: (element: HTMLElement | null) => void;
  popperStyles: { [key: string]: CSSProperties };
  dismissButtonClassNames: string;
  arrowClassNames: string;
}

const PopoverContext = createContext<PopoverContextProps>({
  popperStyles: {},
  setPopperElement: () => {
    // noop
  },
  setArrowElement: () => {
    // noop
  },
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
        setPopperElement,
        setArrowElement,
        popperStyles,
        dismissButtonClassNames,
        UNSAFE_className,
        UNSAFE_style,
        arrowClassNames,
      }}
    >
      <AtlantisThemedPortal>
        <div
          role="dialog"
          data-elevation={"elevated"}
          ref={setPopperElement}
          style={{ ...popperStyles.popper, ...(UNSAFE_style?.container ?? {}) }}
          className={popoverClassNames}
          {...attributes.popper}
          data-testid="popover-container"
        >
          {children}
        </div>
      </AtlantisThemedPortal>
    </PopoverContext.Provider>
  );
}
