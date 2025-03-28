import React from "react";
import { PopoverDismissWrapperProps, PopoverProps } from "./types";
import { PopoverProvider, usePopoverContext } from "./PopoverContext";
import { ButtonDismiss } from "../ButtonDismiss";

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
      <Popover.DismissWrapper>
        <ButtonDismiss onClick={onRequestClose} ariaLabel="Close dialog" />
      </Popover.DismissWrapper>
      {children}
      <Popover.Arrow />
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
}: PopoverDismissWrapperProps) {
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
