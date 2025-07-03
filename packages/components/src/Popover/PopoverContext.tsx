import React, { CSSProperties, createContext, useContext } from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { PopoverProviderProps } from "./Popover.types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";
import { AtlantisPortalContent } from "../AtlantisPortalContent";

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
  const { setPopperElement, setArrowElement, popperStyles } = usePopover({
    preferredPlacement,
    attachTo,
    open,
  });

  if (!open) return null;

  return (
    <PopoverContext.Provider
      value={{
        setArrowElement,
        popperStyles,
      }}
    >
      <PopoverWrapper
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
        setPopperElement={setPopperElement}
      >
        {children}
      </PopoverWrapper>
    </PopoverContext.Provider>
  );
}

function PopoverWrapper({
  children,
  setPopperElement,
  UNSAFE_className,
  UNSAFE_style,
}: {
  readonly children: React.ReactNode;
  readonly setPopperElement: (element: HTMLElement | null) => void;
} & Pick<PopoverProviderProps, "UNSAFE_className" | "UNSAFE_style">) {
  const popoverStyles = usePopoverStyles();
  const { popperStyles } = usePopoverContext();

  const classes = classnames(
    popoverStyles.container,
    UNSAFE_className?.container,
  );

  const content = (
    <AtlantisPortalContent>
      <div
        role="dialog"
        data-elevation="elevated"
        ref={setPopperElement}
        style={{ ...popperStyles.popper, ...UNSAFE_style?.container }}
        className={classes}
        data-testid="ATL-Popover-Container"
      >
        {children}
      </div>
    </AtlantisPortalContent>
  );

  return ReactDOM.createPortal(content, document.body);
}
