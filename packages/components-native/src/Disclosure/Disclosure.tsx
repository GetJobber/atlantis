import React, { useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { TouchableOpacity, View } from "react-native";
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { EASE_CUBIC_IN_OUT } from "./constants";
import { useStyles } from "./Disclosure.style";
import { tokens as staticTokens } from "../utils/design";
import { Icon } from "../Icon";
import { useAtlantisTheme } from "../AtlantisThemeContext";

const ReanimatedView = Reanimated.View;
const ReanimatedScrollView = Reanimated.ScrollView;

interface DisclosureProps {
  /**
   * Specifies the main content of the disclosure component.
   * It can be any React Node - simple text, JSX, or a complex React component.
   */
  readonly content: React.ReactNode;

  /**
   * Defines the header of the disclosure component.
   * Similar to `content`, it can be any React Node.
   */
  readonly header: React.ReactNode;

  /**
   * A boolean that determines whether the disclosure component is in an open or closed state.
   * If `open` is true, the disclosure is in an open state; if false, it's closed.
   */
  readonly open: boolean;

  /**
   * A boolean that indicates whether the disclosure component is empty or not.
   * If `isEmpty` is `true`, there is no content in the disclosure; if false, there is some content.
   */
  readonly isEmpty: boolean;

  /**
   * An optional property that determines the duration of the opening and closing animation of the disclosure component.
   * It's defined in milliseconds.
   * @default tokens["timing-slowest"]
   */
  readonly animationDuration?: number;

  /**
   * A function that is called whenever the disclosure component is toggled between its open and closed states.
   */
  onToggle(): void;
}

export function Disclosure({
  content,
  header,
  open,
  onToggle,
  isEmpty,
  animationDuration = staticTokens["timing-slowest"],
}: DisclosureProps): JSX.Element {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <DisclosureHeader
        {...{ header, onToggle, isEmpty, open, animationDuration, styles }}
      />
      <DisclosureContent {...{ content, open, animationDuration, styles }} />
    </View>
  );
}

type DisclosureHeaderProps = Pick<
  DisclosureProps,
  "header" | "onToggle" | "isEmpty" | "open" | "animationDuration"
> & {
  readonly styles: ReturnType<typeof useStyles>;
};

function DisclosureHeader({
  header,
  onToggle,
  isEmpty,
  open,
  animationDuration,
  styles,
}: DisclosureHeaderProps) {
  const rotateZ = useSharedValue(0);

  rotateZ.value = withTiming(open ? 0 : -180, {
    easing: Easing.bezier(...EASE_CUBIC_IN_OUT),
    duration: animationDuration,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotateZ.value}deg` }],
    };
  });

  const { tokens } = useAtlantisTheme();

  return (
    <TouchableOpacity
      activeOpacity={tokens["opacity-pressed"]}
      onPress={onToggle}
      disabled={isEmpty}
    >
      <View style={styles.headerContainer}>
        {header}
        {!isEmpty && (
          <ReanimatedView style={[animatedStyle]}>
            <Icon name={"arrowUp"} color="grey" />
          </ReanimatedView>
        )}
      </View>
    </TouchableOpacity>
  );
}

type DisclosureContentProps = Pick<
  DisclosureProps,
  "content" | "open" | "animationDuration"
> & {
  readonly styles: ReturnType<typeof useStyles>;
};

function DisclosureContent({
  content,
  open,
  animationDuration,
  styles,
}: DisclosureContentProps) {
  const [maxHeight, setMaxHeight] = useState(0);
  const height = useSharedValue(0);

  const onContentLayoutChange = (event: LayoutChangeEvent) => {
    const newHeight = event.nativeEvent.layout.height;
    setMaxHeight(newHeight);
  };

  height.value = withTiming(open ? maxHeight : 0, {
    duration: animationDuration,
    easing: Easing.bezier(...EASE_CUBIC_IN_OUT),
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);

  return (
    <ReanimatedScrollView
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[styles.contentContainer, animatedStyle]}
    >
      <View testID={"content"} onLayout={onContentLayoutChange}>
        {content}
      </View>
    </ReanimatedScrollView>
  );
}
