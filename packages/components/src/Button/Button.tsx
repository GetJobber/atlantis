import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { type ButtonProps, type HTMLButtonType } from "./Button.types";
import { useButtonStyles } from "./useButtonStyles";
// eslint-disable-next-line import/no-deprecated
import { ButtonContent, ButtonIcon, ButtonLabel } from "./ButtonInternals";
import { ButtonProvider } from "./ButtonProvider";

const ButtonWrapper = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
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
      <Link {...tagProps} to={to} ref={ref as React.Ref<HTMLAnchorElement>}>
        {buttonInternals}
      </Link>
    );
  }

  const Tag = url ? "a" : "button";

  // Use createElement for proper ref typing (similar to Chip component)
  return React.createElement(Tag, { ...tagProps, ref }, buttonInternals);
});

ButtonWrapper.displayName = "ButtonWrapper";

const ButtonForwarded = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { size } = props;

  return (
    <ButtonProvider size={size}>
      <ButtonWrapper {...props} ref={ref} />
    </ButtonProvider>
  );
});

ButtonForwarded.displayName = "Button";

// Add function overloads for type-safe refs
export const Button = ButtonForwarded as unknown as {
  // Overload for button (no url, no to)
  (
    props: ButtonProps & {
      url?: never;
      to?: never;
      ref?: React.Ref<HTMLButtonElement>;
    },
  ): ReturnType<typeof ButtonForwarded>;

  // Overload for anchor (with url, no to)
  (
    props: ButtonProps & {
      url: string;
      to?: never;
      ref?: React.Ref<HTMLAnchorElement>;
    },
  ): ReturnType<typeof ButtonForwarded>;

  // Overload for Link (with to, no url)
  (
    props: ButtonProps & {
      to: string;
      url?: never;
      ref?: React.Ref<HTMLAnchorElement>;
    },
  ): ReturnType<typeof ButtonForwarded>;

  // Fallback for when ref is not provided (union type)
  (props: ButtonProps): ReturnType<typeof ButtonForwarded>;
} & {
  Label: typeof ButtonLabel;
  Icon: typeof ButtonIcon;
};

// Attach namespace components (preserving existing API)
Button.Label = ButtonLabel;
Button.Icon = ButtonIcon;

export type { ButtonProps };
