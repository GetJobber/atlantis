import React from "react";
import { Avatar, AvatarProps } from "../Avatar";

type ChipAvatarBaseProps = Pick<
  AvatarProps,
  "imageUrl" | "name" | "initials" | "color"
>;

interface ChipAvatarWithImageProps extends ChipAvatarBaseProps {
  readonly imageUrl: string;
}

interface ChipAvatarWithInitialsProps extends ChipAvatarBaseProps {
  readonly initials: string;
}

export type ChipAvatarProps =
  | ChipAvatarWithImageProps
  | ChipAvatarWithInitialsProps;

export function ChipAvatar({
  imageUrl = "",
  initials = "",
  name,
  color,
}: ChipAvatarProps) {
  return (
    <Avatar
      imageUrl={imageUrl}
      initials={initials}
      name={name}
      color={color}
      size="small"
    />
  );
}
