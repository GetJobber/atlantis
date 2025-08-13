import React, { ReactNode } from "react";

export interface OptionGroupProps {
  readonly children?: ReactNode;
  readonly label: string;
  readonly disabled?: boolean;

  /**
   * Use at your own risk: Custom classnames for specific elements. This should only be used as a
   * last resort. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   *
   * Additional details: The provided class names are applied to the root
   * `<optgroup>` element. Native `optgroup` styling capabilities are limited and
   * inconsistent across browsers; prefer the default styles whenever possible.
   */
  readonly UNSAFE_className?: string;
  /**
   * Use at your own risk: Custom style for specific elements. This should only be used as a
   * last resort. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   *
   * Additional details: Styles are applied directly to the root `<optgroup>`
   * element via UNSAFE_style.container. Some CSS properties may not be supported or may render differently
   * across browsers when targeting `optgroup`.
   */
  readonly UNSAFE_style?: { container?: React.CSSProperties };
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
      style={UNSAFE_style?.container}
    >
      {children}
    </optgroup>
  );
}
