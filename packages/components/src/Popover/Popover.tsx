import React from "react";
import classnames from "classnames";
import { Side } from "@floating-ui/utils";
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
  const { setArrowElement, floatingStyles, placement } = usePopoverContext();
  const popoverStyles = usePopoverStyles();
  const classes = classnames(popoverStyles.arrow, UNSAFE_className?.arrow);

  // the arrow will get positioned opposite to the placement side
  const staticSideMap: Record<Side, Side> = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  } as const;

  const staticSide = staticSideMap[placement as Side];

  const arrowStyles: React.CSSProperties = {
    position: "absolute",
    // only left or top will be defined at a time
    left: floatingStyles.arrow?.x != null ? `${floatingStyles.arrow?.x}px` : "",
    top: floatingStyles.arrow?.y != null ? `${floatingStyles.arrow?.y}px` : "",
    right: "",
    bottom: "",
    [staticSide]: "var(--popover--position--offset)",
    width: "var(--base-unit)",
    height: "var(--base-unit)",
  };

  return (
    <div
      ref={setArrowElement}
      className={classes}
      style={{ ...arrowStyles, ...UNSAFE_style?.arrow }}
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
