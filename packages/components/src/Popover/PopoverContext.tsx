import { Side } from "@floating-ui/react";
import React, { CSSProperties, createContext, useContext } from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { PopoverProviderProps } from "./Popover.types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";
import { AtlantisPortalContent } from "../AtlantisPortalContent";

interface PopoverContextProps {
  setArrowElement: (element: HTMLElement | null) => void;
  popperStyles: {
    popper: CSSProperties;
    arrow?: {
      x?: number;
      y?: number;
    };
  };
  placement?: Side;
}

const PopoverContext = createContext<PopoverContextProps>({
  popperStyles: { popper: {} },
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
  const { setPopperElement, setArrowElement, popperStyles, placement } =
    usePopover({
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
        placement,
      }}
    >
      <PopoverWrapper
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
        setPopperElement={setPopperElement}
        placement={placement}
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
  placement,
}: {
  readonly children: React.ReactNode;
  readonly setPopperElement: (element: HTMLElement | null) => void;
  readonly placement?: Side;
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
        data-popper-placement={placement}
        data-testid="ATL-Popover-Container"
      >
        {children}
      </div>
    </AtlantisPortalContent>
  );

  return ReactDOM.createPortal(content, document.body);
}
