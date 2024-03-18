import React from "react";
import { IconNames } from "@jobber/design";
import classNames from "classnames";
import { useAtlantisConfig } from "@jobber/components/utils/useAtlantisConfig";
import iconStyles from "./BannerIcon.css";
import bannerStyles from "../../Banner.css";
import { Icon } from "../../../Icon";
import { BannerType } from "../../Banner.types";

export interface BannerIconProps {
  readonly icon: IconNames;
  readonly type: BannerType;
}

export function BannerIcon({ icon, type }: BannerIconProps) {
  const { JOBBER_RETHEME } = useAtlantisConfig();

  if (JOBBER_RETHEME) {
    return (
      <span className={classNames(bannerStyles.iconWrapper, iconStyles[type])}>
        <Icon name={icon} color={"white"} size="small" />
      </span>
    );
  }

  return <Icon name={icon} color={"greyBlueDark"} />;
}
