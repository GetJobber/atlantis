import React from "react";
import { IconNames } from "@jobber/design";
import classNames from "classnames";
import iconStyles from "./BannerIcon.module.css";
import bannerStyles from "../../Banner.module.css";
import { Icon } from "../../../Icon";
import { type BannerType } from "../../Banner.types";

export interface BannerIconProps {
  readonly icon: IconNames;
  readonly type: BannerType;
}

export function BannerIcon({ icon, type }: BannerIconProps) {
  return (
    <span className={classNames(bannerStyles.iconWrapper, iconStyles[type])}>
      <Icon name={icon} color={"surface"} size="small" />
    </span>
  );
}
