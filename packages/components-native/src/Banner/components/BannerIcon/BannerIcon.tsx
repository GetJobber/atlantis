import React from "react";
import type { IconNames } from "@jobber/design";
import { View } from "react-native";
import { useStyles } from "./BannerIcon.style";
import { Icon } from "../../../Icon";
import type { BannerTypes } from "../../types";

export interface BannerIconProps {
  readonly icon: IconNames;
  readonly type: BannerTypes;
}

export function BannerIcon({ icon, type }: BannerIconProps) {
  const styles = useStyles();

  return (
    <View style={[styles.bannerIcon, styles[type]]} testID="ATL-Banner-Icon">
      <Icon name={icon} color="white" size="small" />
    </View>
  );
}
