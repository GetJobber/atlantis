import React, { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import classnames from "classnames";
import { ButtonProps, HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";
import { ButtonProvider } from "./ButtonProvider";

// Define the possible ref types
type ButtonRefElement = HTMLButtonElement | HTMLAnchorElement;

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

    // Base props common to all element types
    const commonProps = {
      className: buttonClassNames,
      disabled,
      id,
      style: UNSAFE_style.container,
      ...(!disabled && { onClick: onClick }),
      ...(!disabled && { onMouseDown: onMouseDown }),
      "aria-controls": ariaControls,
      "aria-haspopup": ariaHaspopup,
      "aria-expanded": ariaExpanded,
      "aria-label": ariaLabel,
      role: role,
    };

    const buttonInternals = children || <ButtonContent {...props} />;

    if (to) {
      // Props specific to Link
      const linkProps = {
        ...commonProps,
        to: to as LinkProps["to"],
      };

      return <Link {...linkProps}>{buttonInternals}</Link>;
    }

    if (url) {
      // Props specific to anchor
      const anchorProps = {
        ...commonProps,
        href: !disabled ? url : undefined,
        ...(external && { target: "_blank" }),
        ref: ref as React.ForwardedRef<HTMLAnchorElement>,
      };

      return <a {...anchorProps}>{buttonInternals}</a>;
    }

    // Props specific to button
    const buttonProps = {
      ...commonProps,
      type: buttonType,
      ...(submit && { name, value }),
      ref: ref as React.ForwardedRef<HTMLButtonElement>,
    };

    // Explanation: "type" IS defined in the buttonProps object
    // eslint-disable-next-line react/button-has-type
    return <button {...buttonProps}>{buttonInternals}</button>;
  },
);
ButtonWrapper.displayName = "ButtonWrappersss";

const ButtonNamespace = Object.assign(ButtonComponent, {
  Label: ButtonLabel,
  Icon: ButtonIcon,
});

export { ButtonNamespace as Button, ButtonProps };
