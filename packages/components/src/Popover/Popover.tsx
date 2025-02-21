import React, { CSSProperties, useState } from "react";
import { usePopper } from "react-popper";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import classnames from "classnames";
import ReactDOM from "react-dom";
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
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the Customizing components Guide.
   */
  readonly UNSAFE_className?: {
    container?: string;
    dismissButtonContainer?: string;
    arrow?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the Customizing components Guide.
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
    dismissButtonContainer?: CSSProperties;
    arrow?: CSSProperties;
  };
}

export function Popover({
  onRequestClose,
  children,
  attachTo,
  open,
  preferredPlacement = "auto",
  UNSAFE_className = {},
  UNSAFE_style = {},
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

  const popoverClassNames = classnames(
    classes.popover,
    UNSAFE_className.container,
  );
  const dismissButtonClassNames = classnames(
    classes.dismissButton,
    UNSAFE_className.dismissButtonContainer,
  );
  const arrowClassNames = classnames(classes.arrow, UNSAFE_className.arrow);
  const popoverContent = (
    <div
      role="dialog"
      data-elevation={"elevated"}
      ref={setPopperElement}
      style={{ ...popperStyles.popper, ...(UNSAFE_style.container ?? {}) }}
      className={popoverClassNames}
      {...attributes.popper}
      data-testid="popover-container"
    >
      <div
        className={dismissButtonClassNames}
        style={UNSAFE_style.dismissButtonContainer ?? {}}
        data-testid="popover-dismiss-button-container"
      >
        <ButtonDismiss onClick={onRequestClose} ariaLabel="Close dialog" />
      </div>
      {children}
      <div
        ref={setArrowElement}
        className={arrowClassNames}
        style={{ ...popperStyles.arrow, ...(UNSAFE_style.arrow ?? {}) }}
        data-testid="popover-arrow"
      />
    </div>
  );

  return <>{open && ReactDOM.createPortal(popoverContent, document.body)}</>;
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
