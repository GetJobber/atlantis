import React, { useState } from "react";
import { usePopper } from "react-popper";
import classes from "./Popover.css";
import { ButtonDismiss } from "../ButtonDismiss";

export interface PopoverProps {
  /**
   * Element the popover will attach to and point at. A `useRef` must be attached to an html element
   * and passed as an attachTo prop in order for the popover to function properly
   */
  readonly attachTo: Element | React.RefObject<Element | null>;

  /**
   * Pop-over content.
   */
  readonly children: React.ReactNode;

  /**
   * Control popover viability.
   */
  readonly open: boolean;

  /**
   * Callback executed when the user wants to close/dismiss the popover
   */
  readonly onRequestClose?: () => void;

  /**
   * Describes the preferred placement of the popper.  The first element in the placement array will be taken
   * as the preferred location with the rest of the array as fallback.
   * @default 'auto'
   */
  readonly preferredPlacement?: "top" | "bottom" | "left" | "right" | "auto";
}

export function Popover({
  onRequestClose,
  children,
  attachTo,
  open,
  preferredPlacement = "auto",
}: PopoverProps) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();
  const { styles: popperStyles, attributes } = usePopper(
    attachTo instanceof Element ? attachTo : attachTo.current,
    popperElement,
    {
      modifiers: buildModifiers(arrowElement),
      placement: preferredPlacement,
    },
  );

  return (
    open && (
      <div
        role="dialog"
        ref={setPopperElement}
        style={popperStyles.popper}
        className={classes.popover}
        {...attributes.popper}
      >
        <div className={classes.dismissButton}>
          <ButtonDismiss onClick={onRequestClose} ariaLabel="Close dialog" />
        </div>
        {children}
        <div
          ref={setArrowElement}
          className={classes.arrow}
          style={popperStyles.arrow}
        />
      </div>
    )
  );
}

function buildModifiers(arrowElement: HTMLElement | undefined | null) {
  const modifiers = [
    {
      name: "arrow",
      options: { element: arrowElement, padding: 10 },
    },
    {
      name: "offset",
      options: {
        offset: [0, 5],
      },
    },
    {
      name: "flip",
      options: {
        fallbackPlacements: ["auto"],
      },
    },
  ];
  return modifiers;
}
