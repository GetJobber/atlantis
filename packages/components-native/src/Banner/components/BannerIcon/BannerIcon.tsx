import React from "react";
import { IconNames } from "@jobber/design";
import { View } from "react-native";
import { styles } from "./BannerIcon.style";
import { Icon } from "../../../Icon";
import { BannerTypes } from "../../types";

export interface BannerIconProps {
  readonly icon: IconNames;
  readonly type: BannerTypes;
}

export function BannerIcon({ icon, type }: BannerIconProps): JSX.Element {
  return (
    <View style={[styles.bannerIcon, styles[type]]} testID="ATL-Banner-Icon">
      <Icon name={icon} color="white" size="small" />
    </View>
  );
}
