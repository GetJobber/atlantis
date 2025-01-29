import React, { CSSProperties, PropsWithChildren } from "react";
import { PopoverProps } from "./types";
import { usePopover } from "./usePopover";
import { usePopoverStyles } from "./usePopoverStyles";
import { ButtonDismiss } from "../ButtonDismiss";

export function Popover({
  onRequestClose,
  children,
  attachTo,
  open,
  preferredPlacement = "auto",
  UNSAFE_className = {},
  UNSAFE_style = {},
}: PopoverProps) {
  const { setPopperElement, setArrowElement, popperStyles, attributes } =
    usePopover({
      preferredPlacement,
      attachTo,
      open,
    });

  const { popoverClassNames, dismissButtonClassNames, arrowClassNames } =
    usePopoverStyles({ UNSAFE_className });
  if (!open) return null;

  return (
    <Popover.Wrapper
      UNSAFE_style={UNSAFE_style}
      setPopperElement={setPopperElement}
      popperStyles={popperStyles}
      popoverClassNames={popoverClassNames}
      attributes={attributes}
    >
      <Popover.DismissWrapper
        className={dismissButtonClassNames}
        style={UNSAFE_style.dismissButtonContainer}
      >
        <ButtonDismiss onClick={onRequestClose} ariaLabel="Close dialog" />
      </Popover.DismissWrapper>
      {children}
      <Popover.Arrow
        setArrowElement={setArrowElement}
        className={arrowClassNames}
        popperStyles={popperStyles}
        UNSAFE_style={UNSAFE_style}
      />
    </Popover.Wrapper>
  );
}

Popover.Arrow = function PopoverArrow({
  setArrowElement,
  className,
  popperStyles,
  UNSAFE_style,
}: Pick<PopoverProps, "UNSAFE_style"> & {
  readonly className: string;
  readonly setArrowElement: React.Dispatch<
    React.SetStateAction<HTMLElement | null | undefined>
  >;
  readonly popperStyles: { [key: string]: CSSProperties };
}) {
  return (
    <div
      ref={setArrowElement}
      className={className}
      style={{ ...popperStyles.arrow, ...(UNSAFE_style?.arrow ?? {}) }}
      data-testid="popover-arrow"
    />
  );
};

Popover.DismissWrapper = function PopoverDismissWrapper({
  children,
  className,
  style,
  testId = "popover-dismiss-button-container",
}: PropsWithChildren<{
  readonly className: string;
  readonly style?: CSSProperties;
  readonly testId?: string;
}>) {
  return (
    <div className={className} style={style ?? {}} data-testid={testId}>
      {children}
    </div>
  );
};

Popover.Wrapper = function PopoverWrapper({
  UNSAFE_style,
  setPopperElement,
  popperStyles,
  popoverClassNames,
  attributes,
  children,
}: PropsWithChildren<
  Pick<PopoverProps, "UNSAFE_style"> & {
    readonly setPopperElement?: React.Dispatch<
      React.SetStateAction<HTMLElement | null | undefined>
    >;
    readonly popperStyles: { [key: string]: CSSProperties };
    readonly popoverClassNames: string;
    readonly attributes: {
      [key: string]:
        | {
            [key: string]: string;
          }
        | undefined;
    };
  }
>) {
  return (
    <div
      role="dialog"
      data-elevation={"elevated"}
      ref={setPopperElement}
      style={{ ...popperStyles.popper, ...(UNSAFE_style?.container ?? {}) }}
      className={popoverClassNames}
      {...attributes.popper}
      data-testid="popover-container"
    >
      {children}
    </div>
  );
};
