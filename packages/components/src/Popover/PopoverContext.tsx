import React, { CSSProperties, createContext, useContext } from "react";
import classnames from "classnames";
import { PopoverProviderProps } from "./types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";
import { AtlantisThemedPortal } from "../AtlantisThemedPortal";

interface PopoverContextProps {
  setArrowElement: (element: HTMLElement | null) => void;
  popperStyles: { [key: string]: CSSProperties };
}

const PopoverContext = createContext<PopoverContextProps>({
  popperStyles: {},
  setArrowElement: () => {
    // noop
  },
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

  const popoverStyles = usePopoverStyles();
  const classes = classnames(
    popoverStyles.container,
    UNSAFE_className?.container,
  );

  if (!open) return null;

  return (
    <PopoverContext.Provider
      value={{
        setArrowElement,
        popperStyles,
      }}
    >
      <AtlantisThemedPortal>
        <div
          role="dialog"
          data-elevation={"elevated"}
          ref={setPopperElement}
          style={{ ...popperStyles.popper, ...UNSAFE_style?.container }}
          className={classes}
          {...attributes.popper}
          data-testid="popover-container"
        >
          {children}
        </div>
      </AtlantisThemedPortal>
    </PopoverContext.Provider>
  );
}
