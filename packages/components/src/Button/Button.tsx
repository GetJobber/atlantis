import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ButtonProps, HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";

const Button = (props: ButtonProps) => {
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
  } = props;
  const { to, url } = props as { to?: string; url?: string };

  const { buttonWrapperStyles, buttonChildrenStyles } = useButtonStyles(props);

  const buttonType: HTMLButtonType = submit ? "submit" : "button";

  const tagProps = {
    className: classnames(buttonWrapperStyles, buttonChildrenStyles),
    disabled,
    id,
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

  const buttonInternals =
    "children" in props ? props.children : <ButtonContent {...props} />;

  if (to) {
    return (
      <Link {...tagProps} to={to}>
        {buttonInternals}
      </Link>
    );
  }

  const Tag = url ? "a" : "button";

  return <Tag {...tagProps}>{buttonInternals}</Tag>;
};

Button.Label = ButtonLabel;
Button.Icon = ButtonIcon;
export { Button, ButtonProps };
