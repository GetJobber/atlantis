/* eslint-disable react/prop-types */
// If you get an error in the live editor for mobile components, you'll need
// an override in this file. Try to match the shape of what the original code
// is trying to get from the mobile component. If you're not sure,
// dig into the source code of the original component to see what it's doing and
// try to replicate (or stub out) that behavior here.

import React from "react";

export const MobileOverrides = () => {
  return {
    GestureDetector: () => "",
  };
};

export const GestureDetector = ({ children }) => {
  return children;
};
export const Gesture = {
  Native: () => false,
};

export const Path = props => {
  return (
    <path d={props.d} fill={props.fill}>
      {props.children}
    </path>
  );
};
export const useSafeAreaInsets = () => "";
export const Modalize = () => "";
export const useSharedValue = () => ({ value: 0 });
export const useAnimatedStyle = () => "";
export const withRepeat = () => "";
export const withTiming = () => 0;
export const withDelay = () => "";
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Easing {
  static bezier = () => ({ value: "" });
}
export const ScrollView = () => "";
export const SafeAreaView = () => "";
export const Defs = () => "";
export const LinearGradient = () => "";
export const Stop = () => "";

export const Rect = rect => {
  console.log("RECT PROPS:", rect);

  return "";
};
export const KeyboardAwareScrollView = () => "";
export const useSafeAreaFrame = () => "";
export const Switch = () => "";

//React native SVG
export default class extends React.Component {
  static displayName = "Svg";
  children;
  style;
  testID;
  viewBox;
  constructor(props) {
    super(props);
    console.log("PROPS:", props);
    this.children = props.children;
    this.viewBox = props.viewBox;
    this.testID = props.testID;
    this.style = props.style;
  }
  static createAnimatedComponent() {
    return "";
  }
  render() {
    return (
      <svg viewBox={this.viewBox} data-test-id={this.testID} style={this.style}>
        {this.children}
      </svg>
    );
  }
}

export * from "react-native-web";
export const PlatformColor = () => "";
export const requireNativeComponent = () => false;
