import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";
import { useLinkButtonProps } from "./useLinkButtonProps";
import { ButtonProps, ButtonType } from "./Button.types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export function Button<ClientSideRouting extends boolean = false>(
  props: ButtonProps<ClientSideRouting>,
) {
  const {
    ariaControls,
    ariaHaspopup,
    ariaExpanded,
    ariaLabel,
    disabled = false,
    external,
    fullWidth,
    icon,
    label,
    iconOnRight,
    id,
    loading,
    name,
    onMouseDown,
    role,
    size = "base",
    type = "primary",
    url,
    to,
    value,
    variation = "work",
    submit,
  } = props;

  const buttonClassNames = classnames(styles.button, styles[size], {
    [styles.onlyIcon]: icon && !label,
    [styles.hasIconAndLabel]: icon && label,
    [styles.iconOnRight]: iconOnRight,
    [styles[variation]]: variation,
    [styles[type]]: type,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
    [styles.loading]: loading,
  });

  const buttonType: ButtonType = submit ? "submit" : "button";
  const { handleClick, href } = useLinkButtonProps(props);

  const tagProps = {
    className: buttonClassNames,
    disabled,
    id,
    ...(submit && { name, value }),
    ...(!disabled && { href }),
    ...(!disabled && { onClick: handleClick }),
    ...(!disabled && { onMouseDown: onMouseDown }),
    ...(external && { target: "_blank" }),
    ...(url === undefined && to === undefined && { type: buttonType }),
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHaspopup,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
    role: role,
  };

  const buttonInternals = <ButtonInternals {...props} />;

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

function ButtonInternals<ClientSideRouting extends boolean = false>({
  label,
  icon,
  size = "base",
}: ButtonProps<ClientSideRouting>) {
  return (
    <>
      {icon && <Icon name={icon} size={size} />}
      <Typography
        element="span"
        fontWeight="semiBold"
        fontFamily="base"
        size={getTypeSizes(size)}
      >
        {label}
      </Typography>
    </>
  );
}

function getTypeSizes(size: string) {
  switch (size) {
    case "small":
      return "base";
    case "large":
      return "large";
    default:
      return "base";
  }
}
