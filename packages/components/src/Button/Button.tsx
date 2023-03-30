import React from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { Link } from "react-router-dom";
import { IconNames } from "@jobber/design";
import styles from "./Button.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

type ButtonType = "button" | "submit";

interface ButtonFoundationProps {
  /**
   * Used for screen readers. Will override label on screen
   * reader if present.
   */
  readonly ariaLabel?: string;
  readonly ariaControls?: string;
  readonly ariaHaspopup?: boolean;
  readonly ariaExpanded?: boolean;
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly id?: string;
  readonly label?: string;
  readonly loading?: boolean;
  readonly size?: "small" | "base" | "large";
  onMouseDown?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

interface ButtonIconProps {
  readonly icon: IconNames;
  readonly ariaLabel: string;
}
interface ButtonLabelProps extends ButtonFoundationProps {
  readonly label: string;
}

interface BaseActionProps {
  readonly variation?: "work" | "learning" | "subtle" | "destructive";
  readonly type?: "primary" | "secondary" | "tertiary";
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

interface ButtonAnchorProps extends BaseActionProps {
  /**
   * Used to create an 'href' on an anchor tag.
   */
  readonly url?: string;
  /**
   * Used to open a new tab instead of change the location of the current tab
   */
  readonly external?: boolean;
}

interface ButtonLinkProps extends BaseActionProps {
  /**
   * Used for client side routing. Only use when inside a routed component.
   */
  readonly to?: string;
}

interface SubmitButtonProps {
  /**
   * Allows the button to submit a form
   */
  submit: true;
  readonly type?: "primary";
  readonly variation?: "work";
}

/** This type ensures the button defines only one purpose */
type ButtonFunctionality = XOR<
  SubmitButtonProps,
  XOR<ButtonLinkProps, ButtonAnchorProps>
>;

/**This type ensures the button is identifiable to users*/
type ButtonIdentification = XOR<ButtonIconProps, ButtonLabelProps>;

export type ButtonProps = ButtonFoundationProps &
  ButtonFunctionality &
  ButtonIdentification;

export function Button(props: ButtonProps) {
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
    onClick,
    onMouseDown,
    size = "base",
    type = "primary",
    url,
    to,
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

  const tagProps = {
    className: buttonClassNames,
    disabled,
    id,
    ...(!disabled && { href: url }),
    ...(!disabled && { onClick: onClick }),
    ...(!disabled && { onMouseDown: onMouseDown }),
    ...(external && { target: "_blank" }),
    ...(url === undefined && to === undefined && { type: buttonType }),
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHaspopup,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
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

function ButtonInternals({ label, icon, size = "base" }: ButtonProps) {
  return (
    <>
      {icon && <Icon name={icon} size={size} />}
      <Typography
        element="span"
        fontWeight="extraBold"
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
      return "small";
    case "large":
      return "large";
    default:
      return "base";
  }
}
