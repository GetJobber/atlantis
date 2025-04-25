import React, { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import classnames from "classnames";
import { ButtonProps, HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";
import { ButtonProvider } from "./ButtonProvider";

type ButtonRefElement = HTMLButtonElement | HTMLAnchorElement;

// Type guards to check what type of button we're dealing with
const isAnchorElement = (props: ButtonProps): boolean => !!props.url;
const isLinkElement = (props: ButtonProps): boolean => !!props.to;

// Generic Button component to ensure proper event type inference
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

    if (isLinkElement(props)) {
      const linkProps: React.ComponentProps<typeof Link> = {
        ...commonProps,
        to: to as LinkProps["to"],
      };

      if (!disabled && onClick) {
        // Safe to do because we've verified this is a Link element
        linkProps.onClick =
          onClick as React.MouseEventHandler<HTMLAnchorElement>;
      }

      if (!disabled && onMouseDown) {
        linkProps.onMouseDown =
          onMouseDown as React.MouseEventHandler<HTMLAnchorElement>;
      }

      return <Link {...linkProps}>{buttonInternals}</Link>;
    }

    if (isAnchorElement(props)) {
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
        // Safe to do because we've verified this is an Anchor element
        anchorProps.onClick =
          onClick as React.MouseEventHandler<HTMLAnchorElement>;
      }

      if (!disabled && onMouseDown) {
        anchorProps.onMouseDown =
          onMouseDown as React.MouseEventHandler<HTMLAnchorElement>;
      }

      return <a {...anchorProps}>{buttonInternals}</a>;
    }

    // This is a regular button element
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
      // Safe to do because we've verified this is a Button element
      buttonProps.onClick =
        onClick as React.MouseEventHandler<HTMLButtonElement>;
    }

    if (!disabled && onMouseDown) {
      buttonProps.onMouseDown =
        onMouseDown as React.MouseEventHandler<HTMLButtonElement>;
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
