import React from "react";
import { Icon, IconProps } from "../Icon";

export type ChipIconProps = Pick<IconProps, "name" | "color" | "customColor">;

export function ChipIcon(props: ChipIconProps) {
  return <Icon {...props} size="base" />;
}
