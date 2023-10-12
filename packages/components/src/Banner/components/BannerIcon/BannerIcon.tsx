import React from "react";
import { IconNames } from "@jobber/design";
import { Icon } from "../../../Icon";

export interface BannerIconProps {
  readonly icon: IconNames;
}

export function BannerIcon({ icon }: BannerIconProps): JSX.Element {
  return <Icon name={icon} color={"greyBlueDark"} />;
}
