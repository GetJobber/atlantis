import React, { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import classnames from "classnames";
import { ButtonProps, HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";
import { ButtonProvider } from "./ButtonProvider";

type ButtonRefElement = HTMLButtonElement | HTMLAnchorElement;

type ButtonEventHandler = React.MouseEventHandler<HTMLButtonElement>;
type AnchorEventHandler = React.MouseEventHandler<HTMLAnchorElement>;

const ButtonComponent = forwardRef<ButtonRefElement, ButtonProps>(
  (props, ref) => {
    const { size } = props;

    return (
      <ButtonProvider size={size}>
        <ButtonWrapper {...props} ref={ref} />
      </ButtonProvider>
    );
  },
);
ButtonComponent.displayName = "Button";

const ButtonWrapper = forwardRef<ButtonRefElement, ButtonProps>(
  // eslint-disable-next-line max-statements
  (props, ref) => {
    const {
      ariaControls,
      ariaHaspopup,
      ariaExpanded,
      ariaLabel,
      disabled = false,
      external,
      id,
      name,
      onClick,
      onMouseDown,
      role,
      value,
      submit,
      to,
      url,
      UNSAFE_className = {},
      UNSAFE_style = {},
      children,
    } = props;

    const { combined } = useButtonStyles(props);

    const buttonType: HTMLButtonType = submit ? "submit" : "button";

    const buttonClassNames = classnames(combined, UNSAFE_className.container);

    const commonProps = {
      className: buttonClassNames,
      disabled,
      id,
      style: UNSAFE_style.container,
      "aria-controls": ariaControls,
      "aria-haspopup": ariaHaspopup,
      "aria-expanded": ariaExpanded,
      "aria-label": ariaLabel,
      role: role,
    };

    const buttonInternals = children || <ButtonContent {...props} />;

    // comment to make a build trigger
    if (to) {
      const linkProps: React.ComponentProps<typeof Link> = {
        ...commonProps,
        to: to as LinkProps["to"],
      };

      if (!disabled && onClick) {
        linkProps.onClick = onClick as AnchorEventHandler;
      }

      if (!disabled && onMouseDown) {
        linkProps.onMouseDown = onMouseDown as AnchorEventHandler;
      }

      return <Link {...linkProps}>{buttonInternals}</Link>;
    }

    if (url) {
      const anchorProps: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      > = {
        ...commonProps,
        href: !disabled ? url : undefined,
        ...(external && { target: "_blank" }),
        ref: ref as React.ForwardedRef<HTMLAnchorElement>,
      };

      if (!disabled && onClick) {
        anchorProps.onClick = onClick as AnchorEventHandler;
      }

      if (!disabled && onMouseDown) {
        anchorProps.onMouseDown = onMouseDown as AnchorEventHandler;
      }

      return <a {...anchorProps}>{buttonInternals}</a>;
    }

    const buttonProps: React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > = {
      ...commonProps,
      type: buttonType,
      ...(submit && { name, value }),
      ref: ref as React.ForwardedRef<HTMLButtonElement>,
    };

    if (!disabled && onClick) {
      buttonProps.onClick = onClick as ButtonEventHandler;
    }

    if (!disabled && onMouseDown) {
      buttonProps.onMouseDown = onMouseDown as ButtonEventHandler;
    }

    // Explanation: "type" IS defined in the buttonProps object
    // eslint-disable-next-line react/button-has-type
    return <button {...buttonProps}>{buttonInternals}</button>;
  },
);
ButtonWrapper.displayName = "ButtonWrapper";

const ButtonNamespace = Object.assign(ButtonComponent, {
  Label: ButtonLabel,
  Icon: ButtonIcon,
});

export { ButtonNamespace as Button, ButtonProps };
