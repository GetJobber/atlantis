import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { type ButtonProps, type HTMLButtonType } from "./Button.types";
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
    id,
    name,
    onClick,
    onMouseDown,
    loading,
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
    ...(external && {
      target: "_blank",
      rel: "noopener noreferrer",
    }),
    ...(url === undefined && to === undefined && { type: buttonType }),
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHaspopup,
    "aria-busy": loading,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
    role: role,
  };

  const buttonInternals = children || <ButtonContent {...props} />;

  if (to) {
    return (
      <Link {...tagProps} to={to}>
        {buttonInternals}
      </Link>
    );
  }

  const Tag = url ? "a" : "button";

  return <Tag {...tagProps}>{buttonInternals}</Tag>;
}

Button.Label = ButtonLabel;
Button.Icon = ButtonIcon;
export type { ButtonProps };
export { Button };
