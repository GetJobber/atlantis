import React, { ReactNode } from "react";
import { ButtonProps } from "./Button.types";
import { Icon } from "../Icon";
import { Typography, TypographyOptions } from "../Typography";

/**
 * For backwards compatibility with the legacy button
 * @deprecated Used composed solution instead
 */
export function ButtonContent({ label, icon, size = "base" }: ButtonProps) {
  return (
    <>
      {icon && <ButtonIcon icon={icon} size={size} />}
      {label && <ButtonLabel size={size}>{label}</ButtonLabel>}
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
  icon,
  size = "base",
}: Required<Pick<ButtonProps, "icon" | "size">>) {
  return <Icon name={icon} size={size} />;
}

export function ButtonLabel({
  element = "span",
  fontWeight = "semiBold",
  fontFamily = "base",
  size = "base",
  ...props
}: TypographyOptions & { readonly children: ReactNode }) {
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
