import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { type ButtonProps, type HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";
import { ButtonProvider } from "./ButtonProvider";

const ButtonInner = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const { size } = props;

  return (
    <ButtonProvider size={size}>
      <ButtonWrapper {...props} ref={ref} />
    </ButtonProvider>
  );
});

const ButtonWrapper = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function ButtonWrapper(props, ref) {
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
    id,
    style: UNSAFE_style.container,
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHaspopup,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
    role: role,
  } as const;

  const buttonInternals = children || <ButtonContent {...props} />;

  // Link (react-router-dom) variant
  if (to) {
    return (
      <Link
        to={to}
        onClick={
          disabled
            ? undefined
            : (onClick as React.MouseEventHandler<HTMLAnchorElement>)
        }
        onMouseDown={
          disabled
            ? undefined
            : (onMouseDown as React.MouseEventHandler<HTMLAnchorElement>)
        }
        className={buttonClassNames}
        style={UNSAFE_style.container}
        aria-controls={ariaControls}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
        role={role}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {buttonInternals}
      </Link>
    );
  }

  // Anchor vs Button
  if (url) {
    return (
      <a
        href={disabled ? undefined : url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={
          disabled
            ? undefined
            : (onClick as React.MouseEventHandler<HTMLAnchorElement>)
        }
        onMouseDown={
          disabled
            ? undefined
            : (onMouseDown as React.MouseEventHandler<HTMLAnchorElement>)
        }
        {...commonProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {buttonInternals}
      </a>
    );
  }

  return (
    <button
      type={submit ? "submit" : buttonType}
      disabled={disabled}
      name={submit ? name : undefined}
      value={submit ? value : undefined}
      onClick={
        disabled
          ? undefined
          : (onClick as React.MouseEventHandler<HTMLButtonElement>)
      }
      onMouseDown={
        disabled
          ? undefined
          : (onMouseDown as React.MouseEventHandler<HTMLButtonElement>)
      }
      {...commonProps}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {buttonInternals}
    </button>
  );
});

export const Button = Object.assign(ButtonInner, {
  Label: ButtonLabel,
  Icon: ButtonIcon,
});

export type { ButtonProps };
