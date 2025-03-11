import React from "react";
import { Link } from "react-router-dom";
import { ButtonProps, HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";
import { ButtonProvider } from "./ButtonProvider";

function Button(props: ButtonProps) {
  const { size } = props;

  return (
    <Button.Provider size={size}>
      <Button.Wrapper {...props} />
    </Button.Provider>
  );
}

Button.Wrapper = function ButtonWrapper(props: ButtonProps) {
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
  } = props;

  const { combined } = useButtonStyles(props);

  const buttonType: HTMLButtonType = submit ? "submit" : "button";

  const tagProps = {
    className: combined,
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

  const buttonInternals = props.children || <ButtonContent {...props} />;

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
Button.Provider = ButtonProvider;
export { Button, ButtonProps };
