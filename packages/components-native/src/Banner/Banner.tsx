import React from "react";
import { Pressable } from "react-native";
import { BannerProps } from "./types";
import { BannerTypeStyles } from "./constants";
import { styles } from "./Banner.style";
import { Content } from "../Content";
import { Text } from "../Text";
import { TextList } from "../TextList";
import { ActionLabel } from "../ActionLabel";

export function Banner({
  action,
  details,
  text,
  type,
}: BannerProps): JSX.Element {
  return (
    <Pressable
      style={[styles.container, BannerTypeStyles[type].styles]}
      accessibilityRole="alert"
      onPress={action?.onPress}
    >
      <Content childSpacing="small">
        <Text level="textSupporting">{text}</Text>
        {details && <TextList items={details} level="textSupporting" />}
        {action && <ActionLabel align="start">{action.label}</ActionLabel>}
      </Content>
    </Pressable>
  );
}
