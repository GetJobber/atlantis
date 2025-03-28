import React from "react";
import classnames from "classnames";
import {
  PopoverArrowProps,
  PopoverDismissWrapperProps,
  PopoverProps,
} from "./types";
import { PopoverProvider, usePopoverContext } from "./PopoverContext";
import { usePopoverStyles } from "./usePopoverStyles";
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
      <Popover.DismissWrapper
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      >
        <ButtonDismiss onClick={onRequestClose} ariaLabel="Close dialog" />
      </Popover.DismissWrapper>
      {children}
      <Popover.Arrow
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      />
    </Popover.Provider>
  );
}

Popover.Provider = PopoverProvider;

Popover.Arrow = function PopoverArrow({
  UNSAFE_className,
  UNSAFE_style,
}: PopoverArrowProps) {
  const { setArrowElement, popperStyles } = usePopoverContext();
  const popoverStyles = usePopoverStyles();
  const classes = classnames(popoverStyles.arrow, UNSAFE_className?.arrow);

  return (
    <div
      ref={setArrowElement}
      className={classes}
      style={{ ...popperStyles.arrow, ...UNSAFE_style?.arrow }}
      data-testid="popover-arrow"
    />
  );
};

Popover.DismissWrapper = function PopoverDismissWrapper({
  children,
  UNSAFE_className,
  UNSAFE_style,
}: PopoverDismissWrapperProps) {
  const popoverStyles = usePopoverStyles();
  const classes = classnames(
    popoverStyles.dismissButton,
    UNSAFE_className?.dismissButtonContainer,
  );

  return (
    <div
      className={classes}
      style={UNSAFE_style?.dismissButtonContainer ?? {}}
      data-testid="popover-dismiss-button-container"
    >
      {children}
    </div>
  );
};
