import React, { ReactNode } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  PressableStateCallbackType,
  View,
} from "react-native";
import { IconNames } from "@jobber/design";
import { XOR } from "ts-xor";
import { styles } from "./Card.style";
// eslint-disable-next-line import/no-internal-modules
import { InternalCardHeader } from "./components/InternalCardHeader";
import { ErrorMessageWrapper } from "../ErrorMessageWrapper";
import { ActionLabel } from "../ActionLabel";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

interface CardProps {
  /**
   * @deprecated Use <ActionItem /> with the title and onPress properties instead
   */
  readonly header?: HeaderProps;

  readonly footer?: FooterProps;
  readonly children?: ReactNode;
  readonly reportCardHeight?: (height: number) => void;
  readonly testID?: string;
  readonly error?: string;
  readonly elevation?: elevationProp;
}

type elevationProp = "none" | "low" | "base" | "high";

export type HeaderProps = HeaderCommonProps & HeaderActionProps;

interface FooterProps {
  readonly onPress: () => void;
  readonly title: string;
}

interface HeaderCommonProps {
  readonly title: string;
}

type HeaderActionProps =
  | {
      readonly onPress?: never;
      readonly actionItem?: never;
    }
  | {
      readonly onPress: () => void;
      readonly actionItem: ActionItem;
    };

interface IconAction {
  readonly iconName: IconNames;
}

interface ButtonAction {
  readonly label: string;
}

export type ActionItem = XOR<IconAction, ButtonAction>;

function getElevationStyle(elevation: elevationProp) {
  if (elevation === "none") {
    return undefined;
  }
  return styles[`${elevation}Elevation`];
}

export function Card({
  header,
  footer,
  children,
  reportCardHeight: onCardHeightChange,
  testID = "card",
  error,
  elevation = "none",
}: CardProps): JSX.Element {
  return (
    <ErrorMessageWrapper message={error} wrapFor="card">
      <View
        onLayout={handleLayoutChange}
        style={[styles.container, getElevationStyle(elevation)]}
        testID={testID}
      >
        {header && (
          <>
            <InternalCardHeader
              onPress={header.onPress}
              testID={`${testID}Header`}
              collapsable={!!children}
            >
              <View style={styles.headerTitle}>
                <Typography
                  color="heading"
                  fontFamily="base"
                  fontWeight="bold"
                  size="default"
                  lineHeight="base"
                  accessibilityRole="header"
                >
                  {header.title}
                </Typography>
              </View>
              <View style={styles.actionItem}>
                {!!header.actionItem?.label && (
                  <View style={styles.actionLabel}>
                    <ActionLabel type="cardTitle">
                      {header.actionItem.label}
                    </ActionLabel>
                  </View>
                )}

                {header.actionItem?.iconName && (
                  <Icon name={header.actionItem.iconName} color="interactive" />
                )}
              </View>
            </InternalCardHeader>
          </>
        )}
        {children}
        {footer && (
          <Pressable
            testID={`${testID}Footer`}
            onPress={footer.onPress}
            style={({ pressed }: PressableStateCallbackType) => [
              styles.footer,
              pressed && styles.pressed,
            ]}
            accessibilityRole={"button"}
          >
            <ActionLabel>{footer.title}</ActionLabel>
          </Pressable>
        )}
      </View>
    </ErrorMessageWrapper>
  );

  function handleLayoutChange(event: LayoutChangeEvent) {
    const { height } = event.nativeEvent.layout;
    onCardHeightChange?.(height);
  }
}
