import React from "react";
import classnames from "classnames";
import {
  PopoverArrowProps,
  PopoverDismissButtonProps,
  PopoverProps,
} from "./Popover.types";
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
      <Popover.DismissButton
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
        onClick={onRequestClose}
      />
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
      data-testid="ATL-Popover-Arrow"
    />
  );
};

Popover.DismissButton = function PopoverDismissButton(
  props: PopoverDismissButtonProps,
) {
  const { UNSAFE_className, UNSAFE_style, children, ...dismissButtonProps } =
    props;

  const popoverStyles = usePopoverStyles();
  const classes = classnames(
    popoverStyles.dismissButton,
    UNSAFE_className?.dismissButtonContainer,
  );

  return (
    <div
      className={classes}
      style={UNSAFE_style?.dismissButtonContainer ?? {}}
      data-testid="ATL-Popover-Dismiss-Button-Container"
    >
      {children ?? (
        <ButtonDismiss ariaLabel="Close dialog" {...dismissButtonProps} />
      )}
    </div>
  );
};
