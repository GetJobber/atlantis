import React from "react";
import { ButtonProps } from "./Button.types";
import { useButton } from "./ButtonProvider";
import { Icon, IconProps } from "../Icon";
import { Typography, TypographyProps } from "../Typography";

/**
 * For backwards compatibility with the legacy button
 * @deprecated Used composed solution instead
 */
export function ButtonContent({
  label,
  icon,
  size = "base",
  iconOnRight = false,
}: Pick<ButtonProps, "label" | "icon" | "size" | "iconOnRight">) {
  return (
    <>
      {icon && !iconOnRight && <ButtonIcon name={icon} size={size} />}
      {label && <ButtonLabel size={size}>{label}</ButtonLabel>}
      {icon && iconOnRight && <ButtonIcon name={icon} size={size} />}
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

export function ButtonIcon({ size: sizeProp, ...props }: IconProps) {
  const { size: contextSize } = useButton();
  const size = sizeProp || contextSize;

  return <Icon {...props} size={size} />;
}

export function ButtonLabel({
  element = "span",
  fontWeight = "semiBold",
  fontFamily = "base",
  size: sizeProp,
  ...props
}: TypographyProps) {
  const { size: contextSize } = useButton();
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
