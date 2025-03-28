import React, { CSSProperties, PropsWithChildren, createContext } from "react";
import { PopoverProps } from "./types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";
import { ButtonDismiss } from "../ButtonDismiss";
import { AtlantisThemedPortal } from "../AtlantisThemedPortal";

export function Popover({
  onRequestClose,
  children,
  attachTo,
  open,
  preferredPlacement = "auto",
  UNSAFE_className = {},
  UNSAFE_style = {},
}: PopoverProps) {
  return (
    <Popover.Provider
      attachTo={attachTo}
      open={open}
      preferredPlacement={preferredPlacement}
      UNSAFE_className={UNSAFE_className}
      UNSAFE_style={UNSAFE_style}
    >
      <Popover.Wrapper>
        <Popover.DismissWrapper>
          <ButtonDismiss onClick={onRequestClose} ariaLabel="Close dialog" />
        </Popover.DismissWrapper>
        {children}
        <Popover.Arrow />
      </Popover.Wrapper>
    </Popover.Provider>
  );
}
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

const usePopoverContext = () => {
  return React.useContext(PopoverContext);
};

Popover.Provider = function PopoverProvider({
  children,
  preferredPlacement,
  attachTo,
  open,
  UNSAFE_className,
  UNSAFE_style,
}: PropsWithChildren<
  Pick<
    PopoverProps,
    | "UNSAFE_className"
    | "preferredPlacement"
    | "attachTo"
    | "open"
    | "UNSAFE_style"
  >
>) {
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
};

Popover.Arrow = function PopoverArrow() {
  const { setArrowElement, popperStyles, arrowClassNames, UNSAFE_style } =
    usePopoverContext();

  return (
    <div
      ref={setArrowElement}
      className={arrowClassNames}
      style={{ ...popperStyles.arrow, ...(UNSAFE_style?.arrow ?? {}) }}
      data-testid="popover-arrow"
    />
  );
};

Popover.DismissWrapper = function PopoverDismissWrapper({
  children,
  testId = "popover-dismiss-button-container",
}: PropsWithChildren<{
  readonly testId?: string;
}>) {
  const { dismissButtonClassNames, UNSAFE_style } = usePopoverContext();

  return (
    <div
      className={dismissButtonClassNames}
      style={UNSAFE_style?.dismissButtonContainer ?? {}}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

Popover.Wrapper = function PopoverWrapper({
  children,
}: PropsWithChildren<Pick<PopoverProps, "UNSAFE_style">>) {
  const {
    open,
    popperStyles,
    setPopperElement,
    popoverClassNames,
    attributes,
    UNSAFE_style,
  } = usePopoverContext();

  if (!open) return null;

  return (
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
  );
};
