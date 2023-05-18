import React from "react";
import * as RNGestureHandler from "react-native-gesture-handler";

// eslint-disable-next-line import/no-default-export
export default {
  ...RNGestureHandler,
  GestureDetector: ({ children }) => <>{ children}</>
};
