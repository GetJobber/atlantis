import React from "react";
import { Avatar as AvatarProps } from "./ChipProps";
import { Avatar as BaseAvatar } from "../Avatar";

export function Avatar(props: AvatarProps) {
  return <BaseAvatar {...props} size="small" />;
}
