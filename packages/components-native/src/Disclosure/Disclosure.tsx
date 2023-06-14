import React, { useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { EASE_CUBIC_IN_OUT } from "./constants";
import { styles } from "./Disclosure.style";
import { tokens } from "../utils/design";
import { Icon } from "../Icon";

const ReanimatedView = Reanimated.createAnimatedComponent(View);
const ReanimatedScrollView = Reanimated.createAnimatedComponent(ScrollView);

interface DisclosureProps {
  readonly content: React.ReactNode;
  readonly header: React.ReactNode;
  readonly open: boolean;
  readonly isEmpty: boolean;
  readonly animationDuration?: number;
  onToggle(): void;
}

export function Disclosure({
  content,
  header,
  open,
  onToggle,
  isEmpty,
  animationDuration = tokens["timing-slowest"],
}: DisclosureProps): JSX.Element {
  return (
    <View style={styles.container}>
      <DisclosureHeader
        {...{ header, onToggle, isEmpty, open, animationDuration }}
      />
      <DisclosureContent {...{ content, open, animationDuration }} />
    </View>
  );
}

type DisclosureHeaderProps = Pick<
  DisclosureProps,
  "header" | "onToggle" | "isEmpty" | "open" | "animationDuration"
>;

function DisclosureHeader({
  header,
  onToggle,
  isEmpty,
  open,
  animationDuration,
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
>;

function DisclosureContent({
  content,
  open,
  animationDuration,
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
