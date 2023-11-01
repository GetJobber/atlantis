import React from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { Link } from "react-router-dom";
import { IconNames } from "@jobber/design";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Button.css";
import { Typography } from "../Typography";
import { IconAnimated } from "../IconAnimated";

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
  readonly external?: boolean;
  readonly fullWidth?: boolean;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly id?: string;
  readonly label?: string;
  readonly loading?: boolean;
  readonly size?: "small" | "base" | "large";
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

interface ButtonLinkProps extends ButtonFoundationProps {
  /**
   * Used for client side routing. Only use when inside a routed component.
   */
  readonly to?: string;
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
  extends Omit<ButtonFoundationProps, "external" | "onClick"> {
  readonly type?: "primary";
  readonly submit: boolean;
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
    onClick,
    onMouseDown,
    role,
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
      {icon && <IconAnimated name={icon} size={size} />}
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.span
          key={label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Typography
            element="span"
            fontWeight="extraBold"
            fontFamily="base"
            size={getTypeSizes(size)}
          >
            {label}
          </Typography>
        </motion.span>
      </AnimatePresence>
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
