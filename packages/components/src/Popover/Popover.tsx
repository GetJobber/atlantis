import React, { PropsWithChildren } from "react";
import { PopoverProps } from "./types";
import { PopoverProvider, usePopoverContext } from "./PopoverContext";
import { ButtonDismiss } from "../ButtonDismiss";
import { AtlantisThemedPortal } from "../AtlantisThemedPortal";

export function Popover({
  onRequestClose,
  children,
  attachTo,
  open,
  preferredPlacement = "auto",
  UNSAFE_className,
  UNSAFE_style,
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

Popover.Provider = PopoverProvider;

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
    popperStyles,
    setPopperElement,
    popoverClassNames,
    attributes,
    UNSAFE_style,
  } = usePopoverContext();

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
