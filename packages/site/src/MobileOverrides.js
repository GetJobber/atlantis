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
