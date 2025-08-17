import type { Placement } from "@floating-ui/react";
import { FloatingPortal } from "@floating-ui/react";
import type { CSSProperties } from "react";
import React, { createContext, useContext } from "react";
import classnames from "classnames";
import type { PopoverProviderProps } from "./Popover.types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";
import { AtlantisPortalContent } from "../AtlantisPortalContent";

interface PopoverContextProps {
  setArrowElement: (element: HTMLElement | null) => void;
  floatingStyles: {
    float: CSSProperties;
    arrow?: {
      x?: number;
      y?: number;
    };
  };
  placement?: Placement;
}

const PopoverContext = createContext<PopoverContextProps>({
  floatingStyles: { float: {} },
  setArrowElement: () => {
    // noop
  },
});

export function usePopoverContext() {
  return useContext(PopoverContext);
}

export function PopoverProvider({
  children,
  preferredPlacement = "auto",
  attachTo,
  open,
  UNSAFE_className,
  UNSAFE_style,
}: PopoverProviderProps) {
  const { setFloatingElement, setArrowElement, floatingStyles, placement } =
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
        floatingStyles,
        placement,
      }}
    >
      <PopoverWrapper
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
        setFloatingElement={setFloatingElement}
        placement={placement}
      >
        {children}
      </PopoverWrapper>
    </PopoverContext.Provider>
  );
}

function PopoverWrapper({
  children,
  setFloatingElement,
  UNSAFE_className,
  UNSAFE_style,
  placement,
}: {
  readonly children: React.ReactNode;
  readonly setFloatingElement: (element: HTMLElement | null) => void;
  readonly placement?: Placement;
} & Pick<PopoverProviderProps, "UNSAFE_className" | "UNSAFE_style">) {
  const popoverStyles = usePopoverStyles();
  const { floatingStyles } = usePopoverContext();

  const classes = classnames(
    popoverStyles.container,
    UNSAFE_className?.container,
  );

  const content = (
    <AtlantisPortalContent>
      <div
        role="dialog"
        data-elevation="elevated"
        ref={setFloatingElement}
        style={{ ...floatingStyles.float, ...UNSAFE_style?.container }}
        className={classes}
        data-popover-placement={placement}
        data-testid="ATL-Popover-Container"
      >
        {children}
      </div>
    </AtlantisPortalContent>
  );

  return <FloatingPortal>{content}</FloatingPortal>;
}
