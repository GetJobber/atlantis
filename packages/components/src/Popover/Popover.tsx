/* eslint-disable no-null/no-null */
import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePopper } from "react-popper";
import classnames from "classnames";
import styles from "./Popover.css";
import { ButtonDismiss } from "../ButtonDismiss";

// import classnames from "classnames";
// import styles from "./Popover.css";

interface PopoverProps {
  /**
   * Element the popover will attach to and point at.
   */
  readonly attachTo: Element | React.RefObject<Element | null>;

  /**
   * Whether or not the popover is dismissable.
   */
  readonly dismissible?: boolean;

  /**
   * Control popover viability.
   */
  readonly open?: boolean;

  /**
   * Pop-over content.
   */
  readonly children: React.ReactNode;

  /**
   * Callback executed when the user wants to close/dismiss the popover
   */
  readonly onRequestClose?: () => void;
}

export function Popover({
  onRequestClose,
  children,
  dismissible,
  attachTo,
  open,
}: PopoverProps) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    attachTo instanceof Element ? attachTo : attachTo.current,
    popperElement,
    {
      modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    },
  );

  const popperClassName = classnames(styles.tooltip, popperStyles.popper);
  const arrowClassName = classnames(styles.arrow, popperStyles.arrow);

  return (
    open && (
      <div
        ref={setPopperElement}
        className={popperClassName}
        {...attributes.popper}
      >
        {dismissible && (
          <ButtonDismiss onClick={onRequestClose} ariaLabel="Close modal" />
        )}
        {children}
        <div ref={setArrowElement} className={arrowClassName} />
      </div>
    )
  );
}
