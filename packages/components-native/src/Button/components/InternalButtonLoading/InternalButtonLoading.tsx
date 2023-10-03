import React from "react";
import { ImageBackground, PixelRatio } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./InternalButtonLoading.style";
import { tokens } from "../../../utils/design";
import { ButtonType, ButtonVariation } from "../../types";

interface InternalButtonLoadingProps {
  readonly variation: ButtonVariation;
  readonly type: ButtonType;
}

const imageWidth = 96;
const offset = PixelRatio.roundToNearestPixel(imageWidth / PixelRatio.get());
const leftOffset = -1 * offset;

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

function InternalButtonLoadingInternal({
  variation,
  type,
}: InternalButtonLoadingProps): JSX.Element {
  const translateX = useSharedValue(0);
  translateX.value = withRepeat(
    withTiming(offset, {
      duration: tokens["timing-loading"],
      easing: Easing.linear,
    }),
    -1,
  );

  const opacity = useSharedValue(0);
  opacity.value = withDelay(
    tokens["timing-quick"],
    withTiming(1, {
      duration: tokens["timing-base"],
      easing: Easing.linear,
    }),
  );

  const animations = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <AnimatedImage
      testID="loadingImage"
      source={{ uri: getLoadingPattern({ variation, type }) }}
      resizeMode="repeat"
      style={[styles.image, { left: leftOffset }, animations]}
    />
  );
}

export const darkPattern =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAgMAAACf9p+rAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAAITgAACE4AUWWMWAAAAAMUExURQAAAEdwTAAAAAAAAKDh18UAAAAEdFJOUxkADQwimkzpAAAAtUlEQVRIx+3NqxHDQBRDUc0YuxyXokxgSkmT7sdgP++3YoYrqAsOYDto+7gfpwtfHy4Xfj7cLvw3sYlNbOINAoI4IIgTgrggiBuCIAThQyB8CIQLkXAhEi5EwoVIWEiEhURYSISFRMyQiRkyMUMmZsjECIUYoRAjFGKEQvRQiR4q0UMleqhECwuihQXRwoJoYUEQgiAEQQiCEAQhCEIQhCAIQRCCIARBCIIQBCEIQhCEIAhB8AEuzZ5wHe17xgAAAABJRU5ErkJggg==";
export const lightPattern =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAgMAAACf9p+rAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAAITgAACE4AUWWMWAAAAAJUExURf///0dwTP///0SistEAAAADdFJOU0AAILGCadYAAAC0SURBVEjH7c2pFcNAFENRHTMX4pKUE5hS0oT7NZjlbyNmOIJ64AK2g7aP+3G68PXhcuHnw+3CfxOb2MQm3iAgiAOCOCGIC4K4IQhCED4EwodAuBAJFyLhQiRciISFRFhIhIVEWEjEDJmYIRMzZGKGTIxQiBEKMUIhRihED5XooRI9VKKHSrSwIFpYEC0siBYWBCEIQhCEIAhBEIIgBEEIghAEIQhCEIQgCEEQgiAEQQiCEAQfva6WeBniVLgAAAAASUVORK5CYII=";

function getLoadingPattern({
  variation,
  type,
}: InternalButtonLoadingProps): string {
  if (variation === "cancel") return darkPattern;
  if (type === "primary") return lightPattern;
  return darkPattern;
}

export const InternalButtonLoading = React.memo(InternalButtonLoadingInternal);
