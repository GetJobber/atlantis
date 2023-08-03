import React from "react";
import { IconNames, tokens } from "@jobber/design";
import { View } from "react-native";
import { Icon } from "../../Icon";
import { styles } from "../Banner.style";

export interface BannerPrefixLabelProps {
  label: string;
}
export interface BannerPrefixProps {
  // focused: boolean;
  // hasMiniLabel: boolean;
  // inputInvalid: boolean;
  icon: IconNames;
}

export function BannerPrefix({ icon }: BannerPrefixProps): JSX.Element {
  return (
    <View style={styles.prefixIcon}>
      <Icon name={icon} customColor={tokens["color-greyBlue"]} />
    </View>
  );
}
