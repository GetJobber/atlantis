import React from "react";
import type {
  ToastConfig,
  ToastConfigParams,
  ToastPosition,
} from "react-native-toast-message";
import Toast from "react-native-toast-message";
import { AccessibilityInfo, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStyles } from "./Toast.styles";
import { Text } from "../Text";
import { IconButton } from "../IconButton";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";
import { useAtlantisTheme } from "../AtlantisThemeContext";
import { tokens as staticTokens } from "../utils/design";

const MAX_TOAST_MESSAGE_LENGTH = 60;
const ANNOUNCEMENT_DELAY = 100;

function DefaultToast({ text1 }: ToastConfigParams<string>): JSX.Element {
  const { bottom } = useSafeAreaInsets();
  const { t } = useAtlantisI18n();
  const styles = useStyles();
  const toastContainerStyles = [styles.container, { paddingBottom: bottom }];
  const { tokens } = useAtlantisTheme();

  return (
    <View style={toastContainerStyles}>
      <View style={styles.toast}>
        <TouchableOpacity style={styles.toastMessage} accessibilityRole="alert">
          <Text reverseTheme>{text1}</Text>
        </TouchableOpacity>
        <View style={styles.toastIcon}>
          <IconButton
            onPress={Toast.hide}
            name="remove"
            customColor={tokens["color-greyBlue--light"]}
            accessibilityLabel={t("dismiss")}
          />
        </View>
      </View>
    </View>
  );
}

const toastConfig = {
  default: DefaultToast,
} as ToastConfig;

export interface JobberToastProps {
  /**
   * Offset from the bottom of the screen in px.
   * Has effect only when the position is "bottom".
   * @default 40
   */
  readonly bottomOffset?: number;
}

export function JobberToast({ bottomOffset }: JobberToastProps): JSX.Element {
  return <Toast bottomOffset={bottomOffset} config={toastConfig} />;
}

export interface ShowToastParams {
  /**
   * Message to be displayed in the toast
   */
  readonly message: string;

  /**
   * Indicates if the bottom tabs are being shown
   * It is equired to define the display position of the toast.
   */
  readonly bottomTabsVisible: boolean;

  /**
   * Where the toast will be positioned
   * @default "bottom"
   */
  readonly position?: ToastPosition;
}

export function showToast({
  message,
  bottomTabsVisible,
  position = "bottom",
}: ShowToastParams): void {
  const bottomOffset = getBottomTabsOffset(bottomTabsVisible);
  const maxDuration = 10000;
  const minDuration = 5000;

  let visibilityTime = message.length * 200;

  if (visibilityTime > maxDuration) {
    visibilityTime = maxDuration;
  } else if (visibilityTime < minDuration) {
    visibilityTime = minDuration;
  }

  if (message.length > MAX_TOAST_MESSAGE_LENGTH) {
    console.warn(
      `Jobber Design Warning: Message length limit exceeded, your current length is ${message.length}, the maximum allowed is ${MAX_TOAST_MESSAGE_LENGTH}. please talk with your designer`,
    );
  }

  Toast.show({
    type: "default",
    text1: message,
    visibilityTime,
    bottomOffset,
    position,
    onShow: () => {
      setTimeout(() => {
        AccessibilityInfo.announceForAccessibility(message || "");
      }, ANNOUNCEMENT_DELAY);
    },
  });
}

function getBottomTabsOffset(bottomTabsVisible: boolean) {
  const navBarHeight =
    staticTokens["space-largest"] + staticTokens["space-small"];
  const navBarBorderTopWidth = staticTokens["space-minuscule"];

  if (bottomTabsVisible) {
    return navBarHeight + navBarBorderTopWidth + staticTokens["space-base"];
  }

  return staticTokens["space-base"];
}
