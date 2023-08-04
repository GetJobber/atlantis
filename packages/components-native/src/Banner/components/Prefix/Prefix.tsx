import React from "react";
import { IconNames, tokens } from "@jobber/design";
import { View } from "react-native";
import { Icon } from "../../../Icon";
import { styles } from "../../Banner.style";

export interface BannerPrefixProps {
  icon: IconNames;
}

export function BannerPrefix({ icon }: BannerPrefixProps): JSX.Element {
  return (
    <View style={styles.prefixIcon}>
      <Icon name={icon} customColor={tokens["color-greyBlue"]} />
    </View>
  );
}
