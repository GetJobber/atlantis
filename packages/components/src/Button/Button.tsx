import React from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { Link, LinkProps } from "react-router-dom";
import { IconNames } from "@jobber/design";
import styles from "./Button.module.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

type ButtonType = "button" | "submit";
export type ButtonSize = "small" | "base" | "large";

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
  readonly external?: boolean;
  readonly fullWidth?: boolean;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly id?: string;
  readonly label?: string;
  readonly loading?: boolean;
  readonly size?: ButtonSize;
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
  onMouseDown?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

interface ButtonIconProps extends ButtonFoundationProps {
  readonly icon: IconNames;
  readonly ariaLabel: string;
}

interface ButtonLabelProps extends ButtonFoundationProps {
  readonly label: string;
}

interface ButtonAnchorProps extends ButtonFoundationProps {
  /**
   * Used to create an 'href' on an anchor tag.
   */
  readonly url?: string;
}

interface ButtonLinkProps<S = unknown> extends ButtonFoundationProps {
  /**
   * **Deprecated**: to will be removed in the next major version
   * @deprecated
   */
  readonly to?: LinkProps<S>["to"];
}

interface BaseActionProps extends ButtonFoundationProps {
  readonly variation?: "work" | "learning" | "subtle" | "destructive";
  readonly type?: "primary" | "secondary" | "tertiary";
}

interface DestructiveActionProps extends ButtonFoundationProps {
  readonly variation: "destructive";
  readonly type?: "primary" | "secondary" | "tertiary";
}

interface SubmitActionProps
  extends Omit<BaseActionProps, "external" | "onClick"> {
  readonly name?: string;
  readonly submit: boolean;
  readonly type?: "primary" | "secondary" | "tertiary";
  readonly value?: string;
}

interface SubmitButtonProps
  extends Omit<ButtonFoundationProps, "external" | "onClick"> {
  /**
   * Allows the button to submit a form
   */
  submit: boolean;
}

interface BasicButtonProps extends ButtonFoundationProps {
  /**
   * Used to override the default button role.
   */
  readonly role?: string;
}

export type ButtonProps = XOR<
  BaseActionProps,
  XOR<DestructiveActionProps, SubmitActionProps>
> &
  XOR<
    XOR<SubmitButtonProps, BasicButtonProps>,
    XOR<ButtonLinkProps, ButtonAnchorProps>
  > &
  XOR<ButtonIconProps, ButtonLabelProps>;

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
    name,
    onClick,
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

  const tagProps = {
    className: buttonClassNames,
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
