import React from "react";
import { type ButtonProps } from "./Button.types";
import { useButtonContext } from "./ButtonProvider";
import { Icon, type IconProps } from "../Icon";
import { Typography, type TypographyProps } from "../Typography";

/**
 * For backwards compatibility with the legacy button
 * @deprecated Used composed solution instead
 */
export function ButtonContent({
  label,
  icon,
  size = "base",
  iconOnRight = false,
  UNSAFE_className,
  UNSAFE_style,
}: Pick<
  ButtonProps,
  | "label"
  | "icon"
  | "size"
  | "iconOnRight"
  | "UNSAFE_className"
  | "UNSAFE_style"
>) {
  return (
    <>
      {icon && !iconOnRight && (
        <ButtonIcon
          name={icon}
          size={size}
          UNSAFE_className={UNSAFE_className?.buttonIcon}
          UNSAFE_style={UNSAFE_style?.buttonIcon}
        />
      )}
      {label && (
        <ButtonLabel
          size={size}
          UNSAFE_className={UNSAFE_className?.buttonLabel}
          UNSAFE_style={UNSAFE_style?.buttonLabel}
        >
          {label}
        </ButtonLabel>
      )}
      {icon && iconOnRight && (
        <ButtonIcon
          name={icon}
          size={size}
          UNSAFE_className={UNSAFE_className?.buttonIcon}
          UNSAFE_style={UNSAFE_style?.buttonIcon}
        />
      )}
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

export function ButtonIcon({
  size: sizeProp,
  ...props
}: Pick<
  IconProps,
  "size" | "name" | "testID" | "UNSAFE_className" | "UNSAFE_style"
>) {
  const { size: contextSize } = useButtonContext();
  const size = sizeProp || contextSize;

  return <Icon {...props} size={size} />;
}

export function ButtonLabel({
  element = "span",
  fontWeight = "semiBold",
  fontFamily = "base",
  size: sizeProp,
  ...props
}: Omit<TypographyProps, "textColor">) {
  const { size: contextSize } = useButtonContext();
  const size = sizeProp || contextSize;

  return (
    <Typography
      element={element}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      size={getTypeSizes(size)}
      {...props}
    />
  );
}
