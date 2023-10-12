import React from "react";
import { IconNames, tokens } from "@jobber/design";
import { View } from "react-native";
import { Icon } from "../../../Icon";
import { styles } from "../../Banner.style";

export interface BannerIconProps {
  readonly icon: IconNames;
}

export function BannerIcon({ icon }: BannerIconProps): JSX.Element {
  return (
    <View style={styles.bannerIcon}>
      <Icon name={icon} customColor={tokens["color-text"]} />
    </View>
  );
}
