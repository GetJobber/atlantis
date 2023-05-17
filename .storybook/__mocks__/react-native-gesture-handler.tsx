import React from "react";
import * as RNGestureHandler from "react-native-gesture-handler";

module.exports = {
  ...RNGestureHandler,
  GestureDetector: ({ children }) => {
    console.warn("hihihi", RNGestureHandler);
    return <>{children}</>;
  },
  Gesture: {
    Tap: () => undefined,
    Pan: () => undefined,
    Pinch: () => undefined,
    Rotation: () => undefined,
    Fling: () => undefined,
    LongPress: () => undefined,
    ForceTouch: () => undefined,
    Native: () => undefined,
    Manual: () => undefined,
    /**
     * Builds a composed gesture consisting of gestures provided as parameters.
     * The first one that becomes active cancels the rest of gestures.
     */
    Race: () => undefined,
    /**
     * Builds a composed gesture that allows all base gestures to run simultaneously.
     */
    Simultaneous: () => undefined,
    /**
     * Builds a composed gesture where only one of the provided gestures can become active.
     * Priority is decided through the order of gestures: the first one has higher priority
     * than the second one, second one has higher priority than the third one, and so on.
     * For example, to make a gesture that recognizes both single and double tap you need
     * to call Exclusive(doubleTap, singleTap).
     */
    Exclusive: () => undefined,
  }
};
