import React, { ReactNode } from "react";

export interface OptionGroupProps {
  readonly children?: ReactNode;
  readonly label: string;
  readonly disabled?: boolean;

  /**
   * Allows customization of the optgroup element styling.
   * Note: Native HTML optgroup styling is limited, especially cross-browser.
   */
  readonly UNSAFE_className?: string;
  readonly UNSAFE_style?: React.CSSProperties;
}

export function OptionGroup({
  children,
  label,
  disabled,
  UNSAFE_className,
  UNSAFE_style,
}: OptionGroupProps) {
  return (
    <optgroup
      label={label}
      disabled={disabled}
      className={UNSAFE_className}
      style={UNSAFE_style}
    >
      {children}
    </optgroup>
  );
}
