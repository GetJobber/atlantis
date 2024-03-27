import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { shineWidth, styles } from "./Glimmer.style";
import { tokens } from "../../../utils/design";

export function Glimmer() {
  const leftPosition = useRef(new Animated.Value(-shineWidth)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const shine = Animated.loop(
      Animated.timing(leftPosition, {
        toValue: width + shineWidth,
        duration: tokens["timing-loading--extended"],
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    );

    shine.start();

    return shine.stop;
  }, [width]);

  return (
    <View style={styles.container} onLayout={getWidth}>
      <Animated.View
        style={[styles.shine, { transform: [{ translateX: leftPosition }] }]}
      >
        <Svg>
          <Defs>
            <LinearGradient id="gradientShine" x1={0} y1={0.5} x2={1} y2={0.5}>
              <Stop
                offset="0%"
                stopColor={tokens["color-surface--background"]}
              />
              <Stop offset="50%" stopColor={tokens["color-surface"]} />
              <Stop
                offset="100%"
                stopColor={tokens["color-surface--background"]}
              />
            </LinearGradient>
          </Defs>
          <Rect fill="url(#gradientShine)" height="100%" width="100%" />
        </Svg>
      </Animated.View>
    </View>
  );

  function getWidth(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
  }
}
