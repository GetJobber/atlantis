import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ButtonProps, HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";
import { ButtonProvider } from "./ButtonProvider";

function Button(props: ButtonProps) {
  const { size } = props;

  return (
    <ButtonProvider size={size}>
      <ButtonWrapper {...props} />
    </ButtonProvider>
  );
}

function ButtonWrapper(props: ButtonProps) {
  const {
    ariaControls,
    ariaHaspopup,
    ariaExpanded,
    ariaLabel,
    disabled = false,
    external,
    htmlButtonRef,
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

  const tagProps = {
    className: buttonClassNames,
    disabled,
    id,
    style: UNSAFE_style.container,
    ...(submit && { name, value }),
    ...(!disabled && { href: url }),
    ...(!disabled && { onClick: onClick }),
    ...(!disabled && { onMouseDown: onMouseDown }),
    ...(external && { target: "_blank" }),
    ...(url === undefined && to === undefined && { type: buttonType }),
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHaspopup,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
    role: role,
  };
  const refProp = url ? {} : { ref: htmlButtonRef };

  const buttonInternals = children || <ButtonContent {...props} />;

  if (to) {
    return (
      <Link {...tagProps} to={to}>
        {buttonInternals}
      </Link>
    );
  }

  if (url) {
    return <a {...tagProps}>{buttonInternals}</a>;
  }

  return (
    <button {...tagProps} {...refProp}>
      {buttonInternals}
    </button>
  );
}

Button.Label = ButtonLabel;
Button.Icon = ButtonIcon;
export { Button, ButtonProps };
