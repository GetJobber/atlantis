import React from "react";
import { Pressable, View } from "react-native";
import { BannerProps } from "./types";
import { BannerTypeStyles } from "./constants";
import { styles } from "./Banner.style";
import { BannerIcon } from "./components/BannerIcon/BannerIcon";
import { Content } from "../Content";
import { Text } from "../Text";
import { TextList } from "../TextList";
import { ActionLabel } from "../ActionLabel";

export function Banner({
  action,
  details,
  text,
  type,
  children,
  icon,
}: BannerProps): JSX.Element {
  return (
    <Pressable
      style={[styles.container, BannerTypeStyles[type].styles]}
      accessibilityRole="alert"
      onPress={action?.onPress}
    >
      <Content childSpacing="small">
        <View style={styles.bannerContent}>
          {icon && <BannerIcon icon={icon} />}
          <View style={styles.contentContainer}>
            {children}
            {text && (
              <div style={styles.textContainer}>
                <Text level="textSupporting">{text}</Text>
              </div>
            )}
            {details && <TextList items={details} level="textSupporting" />}
          </View>
        </View>
        {action && <ActionLabel align="start">{action.label}</ActionLabel>}
      </Content>
    </Pressable>
  );
}
