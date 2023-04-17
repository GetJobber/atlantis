import React, { useState } from "react";
import { usePopper } from "react-popper";
import { useRefocusOnActivator } from "@jobber/hooks/dist/useRefocusOnActivator";
import classes from "./Popover.css";
import { ButtonDismiss } from "../ButtonDismiss";

export interface PopoverProps {
  /**
   * Element the Popover will attach to and point at. A `useRef` must be attached to an html element
   * and passed as an attachTo prop in order for the Popover to function properly
   */
  readonly attachTo: Element | React.RefObject<Element | null>;

  /**
   * Popover content.
   */
  readonly children: React.ReactNode;

  /**
   * Control Popover visibility.
   */
  readonly open: boolean;

  /**
   * Callback executed when the user wants to close/dismiss the Popover
   */
  readonly onRequestClose?: () => void;

  /**
   * Describes the preferred placement of the Popover.
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
  useRefocusOnActivator(open);

  return (
    <>
      {open && (
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
      )}
    </>
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
        offset: [0, 10],
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
