import React from "react";
import { Icon as IconNames } from "./ChipProps";
import { Icon as BaseIcon } from "../Icon";

interface IconProps {
  name: IconNames;
}
export function Icon({ name }: IconProps) {
  return <BaseIcon name={name} />;
}
