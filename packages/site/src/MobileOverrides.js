// If you get an error in the live editor for mobile components, you'll need
// an override in this file. Try to match the shape of what the original code
// is trying to get from the mobile component. If you're not sure,
// dig into the source code of the original component to see what it's doing and
// try to replicate (or stub out) that behavior here.

export const MobileOverrides = () => {
  return {
    GestureDetector: () => ({}),
  };
};

export const GestureDetector = ({ children }) => {
  return children;
};
export const Gesture = {
  Native: () => false,
};
export const Path = () => ({});
export const useSafeAreaInsets = () => ({});
export const Modalize = () => ({});
export const useSharedValue = () => ({});
export const useAnimatedStyle = () => ({});
export const withRepeat = () => ({});
export const withTiming = () => ({});
export const withDelay = () => ({});
export const Easing = () => ({});
export const ScrollView = () => ({});
export const SafeAreaView = () => ({});
export const Defs = () => ({});
export const LinearGradient = () => ({});
export const Stop = () => ({});
export const Rect = () => ({});
export const KeyboardAwareScrollView = () => ({});
export const useSafeAreaFrame = () => ({});
export const Switch = () => ({});

//React native SVG
export default {
  createAnimatedComponent: () => ({}),
};
