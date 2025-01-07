import React, { CSSProperties, useState } from "react";
import { usePopper } from "react-popper";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import classnames from "classnames";
import classes from "./Popover.module.css";
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

  /**
   * Custom className for the wrapping container.
   */
  readonly UNSAFE_className?: string;

  /**
   * Custom style for the wrapping container.
   */
  readonly UNSAFE_style?: CSSProperties;
}

export function Popover({
  onRequestClose,
  children,
  attachTo,
  open,
  preferredPlacement = "auto",
  UNSAFE_className,
  UNSAFE_style,
}: PopoverProps) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();
  const { styles: popperStyles, attributes } = usePopper(
    isHTMLElement(attachTo) ? attachTo : attachTo.current,
    popperElement,
    {
      modifiers: buildModifiers(arrowElement),
      placement: preferredPlacement,
    },
  );
  useRefocusOnActivator(open);

  const popoverClassNames = classnames(classes.popover, UNSAFE_className);

  return (
    <>
      {open && (
        <div
          role="dialog"
          data-elevation={"elevated"}
          ref={setPopperElement}
          style={{ ...popperStyles.popper, ...UNSAFE_style }}
          className={popoverClassNames}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHTMLElement(el: any): el is Element {
  return globalThis?.document && el instanceof Element;
}
