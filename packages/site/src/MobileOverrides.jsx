/* eslint-disable react/prop-types */
// If you get an error in the live editor for mobile components, you'll need
// an override in this file. Try to match the shape of what the original code
// is trying to get from the mobile component. If you're not sure,
// dig into the source code of the original component to see what it's doing and
// try to replicate (or stub out) that behavior here.
import React, { forwardRef, useEffect } from "react";

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
export const useSharedValue = () => ({ value: 0 });
export const useAnimatedStyle = () => "";
export const withRepeat = () => "";
export const withTiming = () => 0;
export const withDelay = () => 0;
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
    this.children = props.children;
    this.viewBox = props.viewBox;
    this.testID = props.testID;
    this.style = props.style;
  }
  static createAnimatedComponent() {
    return "";
  }
  static View(props) {
    return props.children;
  }
  static ScrollView(props) {
    return props.chilren;
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
export { forwardRef };
// eslint-disable-next-line react/display-name
export const Modalize = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const updateOpen = () => {
    setOpen(o => !o);
  };
  useEffect(() => {
    ref.current = { ...ref.current, open: updateOpen };
  }, []);

  return (
    <div
      style={{ display: open ? "block" : "none" }}
      ref={ref}
      open={updateOpen}
    >
      {props.children}
    </div>
  );
});

export const ReanimatedView = props => {
  return props.children;
};

export const TouchableOpacity = props => {
  return props.children;
};
export const PlatformColor = () => "";
export const requireNativeComponent = () => false;

export const ReanimatedScrollView = props => {
  return props.children;
};
