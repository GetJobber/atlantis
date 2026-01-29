import type { PropsWithChildren } from "react";
import React from "react";
import type { TypographyOptions, TypographyProps } from "../Typography";
import { Typography } from "../Typography";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";

type TextElement = Extract<
  TypographyProps["element"],
  "p" | "b" | "em" | "dd" | "dt" | "strong" | "span"
>;

export interface TextProps {
  /**
   * The HTML element to render the text as.
   * @default "p"
   */
  readonly element?: TextElement;

  readonly maxLines?:
    | "single"
    | "small"
    | "base"
    | "large"
    | "larger"
    | "unlimited";

  readonly variation?:
    | "default"
    | "subdued"
    | "success"
    | "error"
    | "warn"
    | "info"
    | "disabled";

  readonly align?: "start" | "center" | "end";

  readonly size?: "small" | "base" | "large";

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: TypographyProps["UNSAFE_className"];

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: TypographyProps["UNSAFE_style"];
}

type TextColor = Extract<TypographyOptions, "textColor">;

export function Text({
  variation = "default",
  size = "base",
  align = "start",
  element = "p",
  children,
  maxLines = "unlimited",
  UNSAFE_className,
  UNSAFE_style,
  ...rest
}: PropsWithChildren<TextProps>) {
  const dataAttributes = filterDataAttributes(rest);
  const textColors = {
    default: "text",
    subdued: "textSecondary",
    success: "success",
    error: "critical",
    warn: "warning",
    info: "informative",
    disabled: "disabled",
  };

  const maxLineToNumber = {
    single: 1,
    small: 2,
    base: 4,
    large: 8,
    larger: 16,
    unlimited: undefined,
  };

  return (
    <Typography
      element={element}
      textColor={textColors[variation] as TextColor}
      size={size}
      numberOfLines={maxLineToNumber[maxLines]}
      align={align}
      UNSAFE_className={UNSAFE_className}
      UNSAFE_style={UNSAFE_style}
      {...dataAttributes}
    >
      {children}
    </Typography>
  );
}
