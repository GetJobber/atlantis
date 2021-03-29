/* eslint-disable no-null/no-null */
import { Placement } from "@popperjs/core";
import React, { CSSProperties, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePopper } from "react-popper";
import classnames from "classnames";
import classes from "./Popover.css";
import { Typography } from "../Typography";
import { ButtonDismiss } from "../ButtonDismiss";

// import classnames from "classnames";
// import styles from "./Popover.css";

interface PopoverProps {
  /**
   * Element the popover will attach to and point at.
   */
  readonly attachTo: Element | React.RefObject<Element | null>;

  /**
   * Pop-over content.
   */
  readonly children: React.ReactNode;

  /**
   * Whether or not the popover is dismissable via the header close button.
   */
  readonly dismissible?: boolean;

  /**
   * Offset modifier lets you displace a popper element from its reference element.
   */
  readonly offset?: [number | null | undefined, number | null | undefined];
  /**
   * Control popover viability.
   */
  readonly open?: boolean;

  /**
   * Callback executed when the user wants to close/dismiss the popover
   */
  readonly onRequestClose?: () => void;

  /**
   * Describes the preferred placement of the popper.
   */
  readonly placement?: Placement;

  /**
   * The title of the popover
   */
  readonly title: string;
}

export function Popover({
  onRequestClose,
  children,
  dismissible,
  attachTo,
  offset,
  open,
  placement,
  title,
}: PopoverProps) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    attachTo instanceof Element ? attachTo : attachTo.current,
    popperElement,
    {
      modifiers: [
        {
          name: "arrow",
          options: { element: arrowElement, padding: 10 },
        },
        {
          name: "offset",
          options: {
            offset: offset,
          },
        },
      ],
      placement: placement || "auto",
    },
  );

  const popperClassName = classnames(classes.popover);
  const arrowClassName = classnames(classes.arrow);
  const headerClassName = classnames(classes.header);

  const somethingstyle: CSSProperties = popperStyles.popper as any;
  const arrowStyle: CSSProperties = popperStyles.arrow as any;

  return (
    open && (
      <div
        ref={setPopperElement}
        style={somethingstyle}
        className={popperClassName}
        {...attributes.popper}
      >
        {dismissible && (
          <div className={headerClassName}>
            <Typography
              element="h3"
              size="large"
              textCase="uppercase"
              fontWeight="extraBold"
            >
              {title}
            </Typography>
            <ButtonDismiss onClick={onRequestClose} ariaLabel="Close modal" />
          </div>
        )}
        {children}
        <div
          ref={setArrowElement}
          className={arrowClassName}
          style={arrowStyle}
        />
      </div>
    )
  );
}
