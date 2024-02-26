import React, { ReactElement } from "react";
import { Pressable, Text as RNText, View } from "react-native";
import { IconNames } from "@jobber/design";
import { BannerProps, BannerTypes } from "./types";
import { styles } from "./Banner.style";
import { BannerIcon } from "./components/BannerIcon/BannerIcon";
import { Content } from "../Content";
import { Text } from "../Text";
import { TextList } from "../TextList";
import { ActionLabel } from "../ActionLabel";
import { Typography } from "../Typography";

export function Banner({
  action,
  details,
  text,
  type,
  children,
  icon,
}: BannerProps): JSX.Element {
  const bannerIcon = icon || getBannerIcon(type);

  return (
    <Pressable
      style={[styles.container]}
      accessibilityRole="alert"
      onPress={action?.onPress}
    >
      <Content childSpacing="small">
        <View style={styles.bannerContent}>
          {bannerIcon && <BannerIcon icon={bannerIcon} type={type} />}
          <View style={styles.contentContainer}>
            <View style={styles.childrenContainer}>
              <BannerChildren>
                <RNText>
                  {children}
                  {action && (
                    <RNText>
                      <Typography> | </Typography>
                      <ActionLabel align="start">{action.label}</ActionLabel>
                    </RNText>
                  )}
                </RNText>
              </BannerChildren>
            </View>
            {text && (
              <View style={styles.textContainer}>
                <Text level="text">{text}</Text>
              </View>
            )}
            {details && <TextList items={details} level="text" />}
          </View>
        </View>
      </Content>
    </Pressable>
  );
}

function BannerChildren({
  children,
}: {
  readonly children?: ReactElement | ReactElement[] | string;
}): JSX.Element {
  if (!children) return <></>;

  if (children && typeof children === "string") {
    return <Text level="text">{children}</Text>;
  }

  return <>{children}</>;
}

function getBannerIcon(type: BannerTypes): IconNames | undefined {
  switch (type) {
    case "notice":
      return "starburst";
    case "warning":
      return "help";
    case "error":
      return "alert";
  }
}
