import React from "react";
import { IconNames } from "@jobber/design";
import classNames from "classnames";
import { getAtlantisConfig } from "@jobber/components/utils/getAtlantisConfig";
import styles from "./BannerIcon.css";
import { Icon } from "../../../Icon";
import { BannerType } from "../../Banner.types";

export interface BannerIconProps {
  readonly icon: IconNames;
  readonly type: BannerType;
}

export function BannerIcon({ icon, type }: BannerIconProps) {
  const { JOBBER_RETHEME } = getAtlantisConfig();

  if (JOBBER_RETHEME) {
    return (
      <span className={classNames(styles.wrapper, styles[type])}>
        <Icon name={icon} color={"white"} size="small" />
      </span>
    );
  }

  return <Icon name={icon} color={"greyBlueDark"} />;
}
