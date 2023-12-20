import React from "react";
import { IconNames } from "@jobber/design";
import classNames from "classnames";
import { getAtlantisConfig } from "@jobber/components/utils/getAtlantisConfig";
import styles from "./BannerIcon.css";
import { Icon } from "../../../Icon";

export interface BannerIconProps {
  readonly icon?: IconNames;
}

export function BannerIcon({ icon }: BannerIconProps) {
  const { JOBBER_RETHEME } = getAtlantisConfig();

  if (!icon) return null;

  if (JOBBER_RETHEME) {
    return (
      <span className={classNames(styles.wrapper)}>
        <Icon name={icon} color={"white"} />
      </span>
    );
  }

  return <Icon name={icon} color={"greyBlueDark"} />;
}
