import React, { PropsWithChildren, ReactElement } from "react";
import { Pressable, Text as RNText, View } from "react-native";
import { IconNames } from "@jobber/design";
import { BannerProps, BannerTypes } from "./types";
import { useStyles } from "./Banner.style";
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

  const shouldFlow =
    Boolean(React.Children.count(children) === 1 && !text && !details) ||
    Boolean(text && !details && !children);

  const styles = useStyles();

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
              <WrappingElement shouldFlow={shouldFlow} styles={styles}>
                <BannerChildren>{children}</BannerChildren>

                {text && <Text level="text">{text}</Text>}

                {details && <TextList items={details} level="text" />}

                {action && (
                  <RNText>
                    {shouldFlow && <Typography color="subdued"> | </Typography>}
                    <ActionLabel align="start">{action.label}</ActionLabel>
                  </RNText>
                )}
              </WrappingElement>
            </View>
          </View>
        </View>
      </Content>
    </Pressable>
  );
}

function BannerChildren({ children }: PropsWithChildren): JSX.Element {
  if (!children) return <></>;

  if (children && typeof children === "string") {
    return <Text level="text">{children}</Text>;
  }

  return <>{children}</>;
}

function WrappingElement({
  shouldFlow,
  children,
  styles,
}: PropsWithChildren<{
  readonly shouldFlow: boolean;
  readonly styles: ReturnType<typeof useStyles>;
}>): ReactElement {
  if (shouldFlow) {
    return <RNText testID="ATL-Banner-RNText">{children}</RNText>;
  }

  return (
    <View testID="ATL-Banner-View" style={styles.contentSpacing}>
      {children}
    </View>
  );
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
